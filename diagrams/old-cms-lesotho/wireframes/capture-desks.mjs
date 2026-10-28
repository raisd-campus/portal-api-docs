/**
 * Capture live Staff Admin desks for Lesotho wireframes (DS 0.19.8 + two-level side).
 *
 *   node docs/diagrams/old-cms-lesotho/wireframes/capture-desks.mjs
 *
 * Writes PNG/JPEG under ./captures/ and a manifest.json. Uses Demo Keychain SSO.
 */
import { chromium } from "../../../../../applicant-portal/node_modules/playwright/index.mjs"
import {
  mkdirSync,
  writeFileSync,
  existsSync,
  statSync,
} from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(here, "captures")
const STAFF = "https://staff.lesotho.raisd.co"
const SSO = "https://sso.raisd.co"
const VIEWPORT = { width: 1440, height: 900 }

mkdirSync(outDir, { recursive: true })

const ACCOUNTS = {
  registry: { email: "lesotho.registry@raisd.demo", password: "lesotho2026" },
  bursary: { email: "lesotho.bursary@raisd.demo", password: "lesotho2026" },
  faculty: { email: "lesotho.faculty@raisd.demo", password: "lesotho2026" },
  qa: { email: "lesotho.qa@raisd.demo", password: "lesotho2026" },
}

/** Wireframe desk id → route (+ optional post-nav). */
const DESKS = [
  { id: "applicants", title: "Applicants", role: "faculty", path: "/admin/applicants", wait: /applicants|under review|demo lesotho/i },
  { id: "document-review", title: "Document review", role: "qa", path: "/admin/document-review", wait: /document review|extract|verify|applicants/i },
  { id: "payments", title: "Payments", role: "bursary", path: "/admin/payments", wait: /payments|receipt|tuition|fee|payment/i },
  { id: "fees", title: "Fees & Fines", role: "bursary", path: "/admin/fees", wait: /fees|catalogue|application fee|finance/i },
  { id: "registrations", title: "Registrations", role: "bursary", path: "/admin/registrations", wait: /registration|enrol|module/i },
  { id: "sponsors", title: "Sponsors", role: "bursary", path: "/admin/sponsors", wait: /sponsor|nmds|scheme/i },
  { id: "students", title: "Students list", role: "registry", path: "/admin/students", wait: /students|enrolled|demo lesotho/i },
  {
    id: "student-file",
    title: "Student file",
    role: "registry",
    path: "/admin/students",
    wait: /students|enrolled|demo lesotho/i,
    after: "open-student-file",
  },
  { id: "graduations", title: "Graduations", role: "registry", path: "/admin/graduations", wait: /graduation|ceremony|hood/i },
  { id: "certificates", title: "Certificates", role: "registry", path: "/admin/certificates", wait: /certificate|print|batch|qr/i },
  { id: "remarks", title: "Remarks", role: "registry", path: "/admin/remarks", wait: /remark|re-assess|module/i },
  { id: "academic", title: "Academic", role: "registry", path: "/admin/academic", wait: /academic|attendance|grade|module/i },
  { id: "timetable", title: "Timetable", role: "registry", path: "/admin/timetable", wait: /timetable|venue|session/i },
  { id: "analytics", title: "Analytics", role: "registry", path: "/admin/analytics", wait: /analytics|summary|enrol|applicant/i },
  { id: "discipline", title: "Discipline", role: "registry", path: "/admin/discipline", wait: /discipline|case|misconduct/i },
]

async function gotoSafe(page, url) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (!/ERR_ABORTED|interrupted/i.test(msg)) throw err
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {})
  }
  await page.waitForTimeout(800)
}

async function ssoSignIn(page, context, role) {
  const account = ACCOUNTS[role] || ACCOUNTS.registry
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
    {
      sso: SSO,
      email: account.email,
      password: account.password,
      returnUrl: `${STAFF}/admin`,
    },
  )
  if (!result.ok || !result.body?.redirectTo) {
    throw new Error(`SSO login failed: ${result.body?.error || result.status}`)
  }
  await gotoSafe(page, result.body.redirectTo)
  await page
    .waitForFunction(
      () => {
        const u = location.href
        if (/[?&]code=/.test(u)) return false
        if (/sso\.raisd\.co\/login/i.test(u)) return false
        if (/\/sign-in(?:\?|$)/i.test(u)) return false
        return /staff\.lesotho\.raisd\.co/i.test(u)
      },
      null,
      { timeout: 60000 },
    )
    .catch(() => {})
  await page.waitForTimeout(1500)
  if (!/staff\.lesotho\.raisd\.co/i.test(page.url())) {
    await gotoSafe(page, `${STAFF}/admin`)
  }
  await page
    .getByText(/overview|applicants|students|admin|campus/i)
    .first()
    .waitFor({ timeout: 30000 })
    .catch(() => {})
}

async function openStudentFile(page) {
  const row = page.getByText(/demo lesotho student|demo-ls-001/i).first()
  if (await row.count()) {
    await row.click({ timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(1500)
  }
  // Prefer clicking the whole table row button/link if present
  const openBtn = page.getByRole("button", { name: /demo lesotho student|open|view/i }).first()
  if (await openBtn.count()) {
    await openBtn.click({ timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(1200)
  }
  const tab = page.getByRole("tab", { name: /academics/i }).first()
  if (await tab.count()) {
    await tab.click().catch(() => {})
    await page.waitForTimeout(800)
  }
  await page.getByText(/academics|programme|gpa|student file|demo lesotho student/i).first().waitFor({ timeout: 10000 }).catch(() => {})
}

async function captureDesk(page, desk) {
  const url = `${STAFF}${desk.path}`
  await gotoSafe(page, url)
  await page.getByText(desk.wait).first().waitFor({ timeout: 25000 }).catch(() => {})
  await page.waitForTimeout(1200)
  if (desk.after === "open-student-file") {
    await openStudentFile(page)
  }
  // Prefer full shell including two-level side.
  const file = path.join(outDir, `${desk.id}.png`)
  await page.screenshot({ path: file, type: "png", fullPage: false })
  const bytes = existsSync(file) ? statSync(file).size : 0
  return { ...desk, file: `captures/${desk.id}.png`, bytes, url: page.url() }
}

async function main() {
  console.log(`Capturing ${DESKS.length} desks → ${outDir}`)
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  let currentRole = null
  const results = []
  for (const desk of DESKS) {
    process.stdout.write(`· ${desk.id} (${desk.role}) … `)
    try {
      if (desk.role !== currentRole) {
        await ssoSignIn(page, context, desk.role)
        currentRole = desk.role
      }
      const row = await captureDesk(page, desk)
      results.push({ ...row, ok: true, role: desk.role })
      console.log(`${Math.round(row.bytes / 1024)} KiB · ${row.url}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      results.push({ id: desk.id, title: desk.title, ok: false, error: msg, role: desk.role })
      console.log(`FAIL ${msg}`)
    }
  }

  const manifest = {
    capturedAt: new Date().toISOString(),
    viewport: VIEWPORT,
    designSystem: "0.19.8",
    roles: Object.fromEntries(Object.entries(ACCOUNTS).map(([k, v]) => [k, v.email])),
    portal: STAFF,
    desks: results,
  }
  writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2))
  await browser.close()

  const ok = results.filter((r) => r.ok).length
  console.log(`\nDone ${ok}/${results.length}. Manifest: captures/manifest.json`)
  if (ok < results.length) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
