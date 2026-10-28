/**
 * Re-capture desks that missed (finance + students) with strict URL checks.
 */
import { chromium } from "../../../../../applicant-portal/node_modules/playwright/index.mjs"
import { mkdirSync, writeFileSync, existsSync, statSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(here, "captures")
const STAFF = "https://staff.lesotho.raisd.co"
const SSO = "https://sso.raisd.co"
mkdirSync(outDir, { recursive: true })

const ACCOUNTS = {
  bursary: { email: "lesotho.bursary@raisd.demo", password: "lesotho2026" },
  registry: { email: "lesotho.registry@raisd.demo", password: "lesotho2026" },
}

const DESKS = [
  { id: "payments", role: "bursary", path: "/admin/payments", title: /payments/i },
  { id: "fees", role: "bursary", path: "/admin/fees", title: /fees|fines|catalogue|application fee/i },
  { id: "registrations", role: "bursary", path: "/admin/registrations", title: /registration/i },
  { id: "sponsors", role: "bursary", path: "/admin/sponsors", title: /sponsor/i },
  { id: "students", role: "registry", path: "/admin/students", title: /students|enrolled/i },
  {
    id: "student-file",
    role: "registry",
    path: "/admin/students",
    title: /students|enrolled|academics/i,
    openFile: true,
  },
]

async function gotoSafe(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {})
  await page.waitForTimeout(1000)
}

async function signIn(page, context, role) {
  const acct = ACCOUNTS[role]
  await context.clearCookies()
  await gotoSafe(page, SSO)
  const result = await page.evaluate(
    async ({ sso, email, password, returnUrl }) => {
      const r = await fetch(`${sso}/v1/auth/channels/password/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnUrl }),
      })
      return { ok: r.ok, status: r.status, body: await r.json().catch(() => ({})) }
    },
    { sso: SSO, email: acct.email, password: acct.password, returnUrl: `${STAFF}${DESKS.find((d) => d.role === role)?.path || "/admin"}` },
  )
  if (!result.ok || !result.body?.redirectTo) throw new Error(`SSO fail ${role}: ${result.status}`)
  await gotoSafe(page, result.body.redirectTo)
  await page.waitForFunction(() => !/[?&]code=/.test(location.search) && !/sso\.raisd\.co\/login/i.test(location.href), null, { timeout: 60000 }).catch(() => {})
  await page.waitForTimeout(2000)
  console.log(`  signed in ${role} → ${page.url()}`)
}

async function openFile(page) {
  const byLabel = page.getByRole("button", { name: /open file for|view details/i })
  if (await byLabel.count()) {
    await byLabel.first().click({ timeout: 8000 })
  } else {
    const row = page.locator("table tbody tr").filter({ hasText: /demo lesotho student|DEMO-LS/i }).first()
    if (await row.count()) await row.click({ timeout: 8000 })
    else await page.getByText(/demo lesotho student/i).first().click({ timeout: 8000 })
  }
  await page.getByRole("tab", { name: /^academics$/i }).waitFor({ timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(1000)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  let role = null
  const results = []

  for (const desk of DESKS) {
    process.stdout.write(`· ${desk.id} … `)
    try {
      if (desk.role !== role) {
        await signIn(page, context, desk.role)
        role = desk.role
      }
      await gotoSafe(page, `${STAFF}${desk.path}`)
      // Retry once if redirected away from target path
      if (!page.url().includes(desk.path)) {
        console.log(`(redirected to ${page.url()}, retry)`)
        await gotoSafe(page, `${STAFF}${desk.path}`)
      }
      await page.getByText(desk.title).first().waitFor({ timeout: 20000 }).catch(() => {})
      await page.waitForTimeout(1500)
      if (desk.openFile) await openFile(page)
      const file = path.join(outDir, `${desk.id}.png`)
      await page.screenshot({ path: file, type: "png", fullPage: false })
      const bytes = statSync(file).size
      results.push({ id: desk.id, ok: true, bytes, url: page.url() })
      console.log(`${Math.round(bytes / 1024)} KiB · ${page.url()}`)
    } catch (err) {
      console.log(`FAIL ${err.message || err}`)
      results.push({ id: desk.id, ok: false, error: String(err.message || err) })
    }
  }

  const manifestPath = path.join(outDir, "manifest.json")
  const prev = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : { desks: [] }
  const byId = new Map((prev.desks || []).map((d) => [d.id, d]))
  for (const r of results) {
    byId.set(r.id, { ...(byId.get(r.id) || {}), ...r, capturedAt: new Date().toISOString() })
  }
  writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        ...prev,
        recapturedAt: new Date().toISOString(),
        desks: [...byId.values()],
      },
      null,
      2,
    ),
  )
  await browser.close()
  console.log(`Done. ok=${results.filter((r) => r.ok).length}/${results.length}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
