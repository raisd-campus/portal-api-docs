/**
 * Record per-scene WebM clips for Demo role playback.
 *
 *   node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs
 *   node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs --only=app-signin,bur-pay
 *
 * Requires Playwright (applicant-portal node_modules) and Demo credentials under .credentials/.
 */
import { chromium } from "../../../../applicant-portal/node_modules/playwright/index.mjs"
import { mkdirSync, readFileSync, writeFileSync, renameSync, existsSync, readdirSync, statSync, unlinkSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { ROLES, SCENE_URLS, flattenScenes } from "./demo-role-playback.js"

const here = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(here, "playback-videos")
const tmpDir = path.join(outDir, "_tmp")
const credentialsDir = path.resolve(here, "../../../.credentials")
mkdirSync(outDir, { recursive: true })
mkdirSync(tmpDir, { recursive: true })

const APPLICANT = "https://apply.lesotho.raisd.co"
const STAFF = "https://staff.lesotho.raisd.co"
const STUDENT = "https://student.lesotho.raisd.co"
const CONTROL = "https://control.raisd.co"
const KEYCHAIN = "https://keychain.raisd.co"
const SSO = "https://sso.raisd.co"
const VIEWPORT = { width: 1280, height: 720 }

function readJson(name) {
  try {
    return JSON.parse(readFileSync(path.join(credentialsDir, name), "utf8"))
  } catch {
    return null
  }
}

const students = readJson("demo-students.json") || { "first-semester-registration": "alya2026" }
const keychainMaster =
  process.env.RAISD_KEYCHAIN_MASTER || readJson("demo-keychain.json")?.masterPassword || null

/** Passwords match Demo Keychain catalog (keychain.raisd.co), not stale .credentials draft*. */
const KEYCHAIN_USERS = {
  applicant: { email: "completed@raisd.demo", password: "completed2026", label: "Applicant completed" },
  faculty: { email: "lesotho.faculty@raisd.demo", password: "lesotho2026", label: "Lesotho Faculty" },
  qa: { email: "lesotho.qa@raisd.demo", password: "lesotho2026", label: "Lesotho QA" },
  bursary: { email: "lesotho.bursary@raisd.demo", password: "lesotho2026", label: "Lesotho Bursary" },
  registry: { email: "lesotho.registry@raisd.demo", password: "lesotho2026", label: "Lesotho Registry" },
  "year-leader": {
    email: "lesotho.yearleader@raisd.demo",
    password: "lesotho2026",
    label: "Lesotho Year Leader",
  },
  student: { email: "alya@raisd.demo", password: students["first-semester-registration"] || "alya2026" },
  control: { email: "sso.admin@raisd.demo", password: "admin2026", label: "Control demo" },
}

const onlyArg = process.argv.find((a) => a.startsWith("--only="))
const onlyIds = onlyArg
  ? new Set(
      onlyArg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null

async function dwell(page, ms = 1800) {
  await page.waitForTimeout(ms)
}

async function safeClick(locator, opts = {}) {
  if ((await locator.count()) === 0) return false
  try {
    await locator.first().click({ timeout: opts.timeout ?? 8000 })
    return true
  } catch {
    return false
  }
}

async function gotoSafe(page, url) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (!/ERR_ABORTED|interrupted/i.test(msg)) throw err
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {})
  }
  await page.waitForTimeout(600)
}

async function clearSite(page, context, origin) {
  await context.clearCookies()
  await gotoSafe(page, origin)
  await page
    .evaluate(() => {
      try {
        sessionStorage.clear()
        localStorage.clear()
      } catch {
        /* ignore */
      }
    })
    .catch(() => {})
}

async function dismissErrorDialog(page) {
  const dialog = page.getByRole("dialog")
  if (await dialog.count()) {
    await safeClick(dialog.getByRole("button", { name: /^ok$/i }))
    await page.waitForTimeout(400)
  }
}

/** Demo Keychain SSO password channel → portal consumes ?code=. */
async function ssoApiSignIn(page, email, password, returnUrl) {
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
    { sso: SSO, email, password, returnUrl },
  )
  if (!result.ok || !result.body?.redirectTo) {
    throw new Error(
      `SSO login failed for ${email}: ${result.body?.error || result.status || "no redirect"}`,
    )
  }
  await gotoSafe(page, result.body.redirectTo)
  // Let the portal exchange ?code= before navigating elsewhere.
  await page.waitForFunction(() => !/[?&]code=/.test(location.search), null, { timeout: 45000 }).catch(() => {})
  await page.waitForTimeout(2500)
  if (/sso\.raisd\.co\/login/i.test(page.url())) {
    throw new Error(`SSO session did not stick for ${email}; still on ${page.url()}`)
  }
}

async function applicantSignIn(page, context) {
  const acct = KEYCHAIN_USERS.applicant
  await context.clearCookies()
  await ssoApiSignIn(page, acct.email, acct.password, `${APPLICANT}/`)
  if (!/apply\.lesotho\.raisd\.co/i.test(page.url())) {
    await gotoSafe(page, `${APPLICANT}/applications`)
  }
  await page.waitForTimeout(2000)
  await page
    .getByText(/my applications|application no|enrolment accepted|add application/i)
    .first()
    .waitFor({ timeout: 45000 })
  await dwell(page, 2000)
}

async function staffSignInUi(page, context, roleKey) {
  const acct = KEYCHAIN_USERS[roleKey]
  if (!acct) throw new Error(`Unknown staff role ${roleKey}`)
  await context.clearCookies()
  await ssoApiSignIn(page, acct.email, acct.password, `${STAFF}/`)
  if (!/staff\.lesotho\.raisd\.co\/admin/i.test(page.url())) {
    await gotoSafe(page, `${STAFF}/admin`)
  }
  await page.waitForTimeout(2000)
  // Soft assert — Demo staff chrome varies by desk; don't fail the clip on copy.
  await page.getByText(/overview|applicants|campus|admin|bursary|registry|faculty|qa/i).first().waitFor({ timeout: 20000 }).catch(() => {})
  await page.waitForTimeout(1500)
}

async function studentSignIn(page, context) {
  const acct = KEYCHAIN_USERS.student
  await context.clearCookies()
  await ssoApiSignIn(page, acct.email, acct.password, `${STUDENT}/`)
  if (!/student\.lesotho\.raisd\.co/i.test(page.url())) {
    await gotoSafe(page, `${STUDENT}/`)
  }
  await page.waitForTimeout(2500)
}

async function controlSignIn(page, context) {
  const acct = KEYCHAIN_USERS.control
  await context.clearCookies()
  await ssoApiSignIn(page, acct.email, acct.password, `${CONTROL}/`)
  await gotoSafe(page, `${CONTROL}/flows/admissions/campus-lesotho`)
  await page.waitForTimeout(1500)
}

async function openApplicantCase(page) {
  const resume = page.getByRole("button", { name: /resume draft|view application|application no/i }).first()
  if (await resume.count()) {
    await resume.click()
    await dwell(page, 1500)
  }
}

async function selectQueueRow(page) {
  const row = page.getByRole("row").nth(1)
  if (await row.count()) {
    await row.click().catch(() => {})
    await dwell(page, 800)
  }
}

/**
 * Scene action runners. Best-effort: always navigate; click when possible.
 * Returns a short status string for the manifest.
 */
async function runSceneActions(page, context, sceneId, roleId) {
  const url = SCENE_URLS[sceneId] || ROLES.find((r) => r.id === roleId)?.portal

  switch (sceneId) {
    case "app-signin": {
      await applicantSignIn(page, context)
      return "applicant signed in"
    }
    case "app-draft": {
      try {
        if (!(await page.getByRole("heading", { name: /my applications|applications/i }).count())) {
          await applicantSignIn(page, context)
        }
      } catch {
        await applicantSignIn(page, context)
      }
      await gotoSafe(page, `${APPLICANT}/applications`)
      await dwell(page, 1200)
      await openApplicantCase(page)
      await dwell(page, 2500)
      return "applicant draft view"
    }
    case "app-fee": {
      try {
        if (!(await page.getByRole("heading", { name: /my applications|applications|application/i }).count())) {
          await applicantSignIn(page, context)
        }
      } catch {
        await applicantSignIn(page, context)
      }
      await gotoSafe(page, `${APPLICANT}/applications`)
      await openApplicantCase(page)
      await safeClick(page.getByRole("button", { name: /application fee|fee|view application/i }))
      await page.mouse.wheel(0, 400).catch(() => {})
      await dwell(page, 2800)
      return "applicant fee step"
    }
    case "app-eligibility": {
      if (!(await page.getByRole("heading", { name: /my applications|applications|application/i }).count())) {
        await applicantSignIn(page, context)
      }
      await openApplicantCase(page)
      await safeClick(page.getByRole("button", { name: /confirm and continue|confirm eligibility/i }))
      await dwell(page, 2800)
      return "applicant eligibility"
    }
    case "app-offer": {
      if (!(await page.getByRole("heading", { name: /my applications|applications|application/i }).count())) {
        await applicantSignIn(page, context)
      }
      await openApplicantCase(page)
      await safeClick(page.getByRole("button", { name: /accept enrolment|offer|confirm and accept/i }))
      await dwell(page, 2800)
      return "applicant offer"
    }
    case "fac-open": {
      await staffSignInUi(page, context, "faculty")
      await page.goto(`${STAFF}/admin/applicants`, { waitUntil: "networkidle" })
      await selectQueueRow(page)
      await dwell(page, 2000)
      return "faculty applicants"
    }
    case "fac-rank":
    case "fac-rec": {
      await page.goto(`${STAFF}/admin/applicants`, { waitUntil: "networkidle" })
      await selectQueueRow(page)
      await dwell(page, 2200)
      return `faculty ${sceneId}`
    }
    case "qa-open": {
      await staffSignInUi(page, context, "qa")
      await page.goto(`${STAFF}/admin/document-review`, { waitUntil: "networkidle" }).catch(async () => {
        await page.goto(`${STAFF}/admin/applicants`, { waitUntil: "networkidle" })
      })
      await selectQueueRow(page)
      await dwell(page, 2000)
      return "qa open"
    }
    case "qa-extract":
    case "qa-verify": {
      await page.goto(url, { waitUntil: "networkidle" }).catch(async () => {
        await page.goto(`${STAFF}/admin/applicants`, { waitUntil: "networkidle" })
      })
      await selectQueueRow(page)
      await safeClick(page.getByRole("button", { name: /extract|verify documents/i }))
      await dwell(page, 2200)
      return sceneId
    }
    case "bur-pay": {
      await staffSignInUi(page, context, "bursary")
      await page.goto(`${STAFF}/admin/payments`, { waitUntil: "networkidle" }).catch(async () => {
        await page.goto(`${STAFF}/payments`, { waitUntil: "networkidle" })
      })
      await selectQueueRow(page)
      await dwell(page, 2000)
      return "bursary payments"
    }
    case "bur-fees": {
      await page.goto(`${STAFF}/admin/fees`, { waitUntil: "networkidle" }).catch(async () => {
        await page.goto(`${STAFF}/fees`, { waitUntil: "networkidle" })
      })
      await dwell(page, 2500)
      return "bursary fees"
    }
    case "bur-reg": {
      await page.goto(`${STAFF}/admin/registrations`, { waitUntil: "networkidle" }).catch(async () => {
        await page.goto(`${STAFF}/registrations`, { waitUntil: "networkidle" })
      })
      await selectQueueRow(page)
      await dwell(page, 2200)
      return "bursary registrations"
    }
    case "reg-offer": {
      await staffSignInUi(page, context, "registry")
      await page.goto(`${STAFF}/admin/applicants`, { waitUntil: "networkidle" })
      await selectQueueRow(page)
      await dwell(page, 2000)
      return "registry offer desk"
    }
    case "reg-queue": {
      await page.goto(`${STAFF}/admin/registrations`, { waitUntil: "networkidle" }).catch(async () => {
        await page.goto(`${STAFF}/registrations`, { waitUntil: "networkidle" })
      })
      await selectQueueRow(page)
      await dwell(page, 2200)
      return "registry registrations"
    }
    case "reg-list": {
      await page.goto(`${STAFF}/admin/students`, { waitUntil: "networkidle" })
      await dwell(page, 2200)
      return "registry students"
    }
    case "reg-file-academics":
    case "reg-file-sponsors": {
      await page.goto(`${STAFF}/admin/students`, { waitUntil: "networkidle" })
      await selectQueueRow(page)
      const tabName = sceneId.includes("sponsors") ? /sponsors/i : /academics/i
      await safeClick(page.getByRole("tab", { name: tabName }))
      await safeClick(page.getByRole("button", { name: tabName }))
      await dwell(page, 2200)
      return sceneId
    }
    case "yl-signin": {
      await staffSignInUi(page, context, "year-leader")
      await page.goto(`${STAFF}/admin`, { waitUntil: "networkidle" })
      await dwell(page, 2000)
      return "year leader home"
    }
    case "yl-list": {
      await page.goto(`${STAFF}/admin/students`, { waitUntil: "networkidle" })
      await dwell(page, 2200)
      return "year leader list"
    }
    case "yl-file": {
      await page.goto(`${STAFF}/admin/students`, { waitUntil: "networkidle" })
      await selectQueueRow(page)
      await dwell(page, 2200)
      return "year leader file"
    }
    case "stu-signin": {
      await studentSignIn(page, context)
      await dwell(page, 2000)
      return "student signed in"
    }
    case "stu-reg": {
      await page.goto(`${STUDENT}/registration`, { waitUntil: "networkidle" })
      await dwell(page, 2500)
      return "student registration"
    }
    case "stu-finance": {
      await page.goto(`${STUDENT}/finance`, { waitUntil: "networkidle" })
      await dwell(page, 2500)
      return "student finance"
    }
    case "ctl-flows": {
      await controlSignIn(page, context)
      await page.goto(`${CONTROL}/flows/admissions/campus-lesotho`, { waitUntil: "networkidle" })
      await dwell(page, 2500)
      return "control flows"
    }
    case "ctl-review": {
      await page.goto(`${CONTROL}/flows/admissions/campus-lesotho`, { waitUntil: "networkidle" })
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35)).catch(() => {})
      await dwell(page, 2200)
      return "control desk review"
    }
    case "ctl-catalogues": {
      await page.goto(`${CONTROL}/flows/admissions/campus-lesotho`, { waitUntil: "networkidle" })
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55)).catch(() => {})
      await dwell(page, 2200)
      return "control catalogues"
    }
    case "ctl-positions": {
      await page.goto(`${CONTROL}/campuses/campus-lesotho`, { waitUntil: "networkidle" })
      await dwell(page, 2500)
      return "control campus"
    }
    default: {
      if (url) await page.goto(url, { waitUntil: "networkidle" })
      await dwell(page, 2000)
      return "navigated"
    }
  }
}

function pickNewestWebm(dir) {
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => ({ f, m: statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m)
  return files[0]?.f ? path.join(dir, files[0].f) : null
}

async function recordScene(browser, entry, storageStatePath) {
  const { scene, role } = entry
  const sceneTmp = path.join(tmpDir, scene.id)
  mkdirSync(sceneTmp, { recursive: true })

  const contextOptions = {
    viewport: VIEWPORT,
    ignoreHTTPSErrors: true,
    recordVideo: { dir: sceneTmp, size: VIEWPORT },
  }
  if (storageStatePath && existsSync(storageStatePath)) {
    contextOptions.storageState = storageStatePath
  }

  const context = await browser.newContext(contextOptions)
  const page = await context.newPage()
  page.setDefaultTimeout(40000)

  let detail = ""
  let error = null
  try {
    detail = await runSceneActions(page, context, scene.id, role.id)
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
    console.warn(`  scene ${scene.id} action warning:`, error)
    // Still capture whatever is on screen
    await page.goto(SCENE_URLS[scene.id] || role.portal, { waitUntil: "domcontentloaded" }).catch(() => {})
    await dwell(page, 1500)
  }

  // Prefer an authenticated URL for the closing frame when still on SSO login chrome.
  try {
    const u = page.url()
    if (/sso\.raisd\.co|\/login|\/sign-in/i.test(u)) {
      const target = SCENE_URLS[scene.id]
      if (target) await gotoSafe(page, target)
      await page.waitForTimeout(2000)
    }
  } catch {
    /* ignore */
  }
  const posterPath = path.join(outDir, `${scene.id}.poster.jpg`)
  await page.screenshot({ path: posterPath, type: "jpeg", quality: 72 }).catch(() => {})

  const nextState = path.join(tmpDir, `state-${role.id}.json`)
  await context.storageState({ path: nextState }).catch(() => {})
  await context.close()

  const raw = pickNewestWebm(sceneTmp)
  const dest = path.join(outDir, `${scene.id}.webm`)
  if (raw && existsSync(raw)) {
    if (existsSync(dest)) unlinkSync(dest)
    renameSync(raw, dest)
  }
  // cleanup tmp webms
  for (const f of readdirSync(sceneTmp)) {
    try {
      unlinkSync(path.join(sceneTmp, f))
    } catch {
      /* ignore */
    }
  }

  const bytes = existsSync(dest) ? statSync(dest).size : 0
  return {
    sceneId: scene.id,
    roleId: role.id,
    title: scene.title,
    fm: scene.fm || [],
    file: `${scene.id}.webm`,
    poster: existsSync(posterPath) ? `${scene.id}.poster.jpg` : undefined,
    bytes,
    detail,
    error,
    recordedAt: new Date().toISOString(),
  }
}

/** Roles that should start with a fresh browser storage (new sign-in). */
const FRESH_LOGIN_SCENES = new Set([
  "app-signin",
  "fac-open",
  "qa-open",
  "bur-pay",
  "reg-offer",
  "yl-signin",
  "stu-signin",
  "ctl-flows",
])

async function main() {
  const flat = flattenScenes(ROLES).filter((e) => !onlyIds || onlyIds.has(e.scene.id))
  console.log(`Recording ${flat.length} scenes → ${outDir}`)

  if (keychainMaster) {
    console.log("Keychain master available (optional unlock scene skipped; portals use direct sign-in).")
  }

  const browser = await chromium.launch({ headless: true })
  const scenes = []

  for (const entry of flat) {
    const statePath = path.join(tmpDir, `state-${entry.role.id}.json`)
    const useState = !FRESH_LOGIN_SCENES.has(entry.scene.id) && existsSync(statePath)
    console.log(`→ ${entry.scene.id} (${entry.role.label})${useState ? " [resume state]" : " [fresh]"}`)
    const meta = await recordScene(browser, entry, useState ? statePath : null)
    scenes.push(meta)
    console.log(`  ${meta.bytes ? `${Math.round(meta.bytes / 1024)} KiB` : "NO VIDEO"} · ${meta.detail || meta.error || ""}`)
  }

  await browser.close()

  let previous = []
  try {
    previous = JSON.parse(readFileSync(path.join(outDir, "manifest.json"), "utf8")).scenes || []
  } catch {
    previous = []
  }
  const byId = new Map(previous.map((s) => [s.sceneId, s]))
  for (const s of scenes) byId.set(s.sceneId, s)
  const merged = flattenScenes(ROLES)
    .map((e) => byId.get(e.scene.id))
    .filter(Boolean)

  const manifest = {
    recordedAt: new Date().toISOString(),
    host: {
      applicant: APPLICANT,
      staff: STAFF,
      student: STUDENT,
      control: CONTROL,
      keychain: KEYCHAIN,
    },
    scenes: merged,
  }
  writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2))
  console.log(`Wrote manifest with ${merged.length} scenes (${scenes.length} recorded this run)`)
  console.log(`Player: ${pathToFileURL(path.join(here, "demo-role-playback.html")).href}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
