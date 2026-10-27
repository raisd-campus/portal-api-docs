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
const VIEWPORT = { width: 1280, height: 720 }

function readJson(name) {
  try {
    return JSON.parse(readFileSync(path.join(credentialsDir, name), "utf8"))
  } catch {
    return null
  }
}

const applicants = readJson("demo-applicants.json") || { completed: "draft2026" }
const students = readJson("demo-students.json") || { "first-semester-registration": "alya2026" }
const staffCreds = readJson("demo-staff.json") || {}
const keychainMaster =
  process.env.RAISD_KEYCHAIN_MASTER || readJson("demo-keychain.json")?.masterPassword || null

const STAFF_ACCOUNTS = {
  faculty: { email: "lesotho.faculty@raisd.demo", password: "lesotho2026", username: "faculty" },
  qa: { email: "lesotho.qa@raisd.demo", password: "lesotho2026", username: "qa" },
  bursary: {
    email: "lesotho.bursary@raisd.demo",
    password: process.env.RAISD_STAFF_BURSARY_PASSWORD || staffCreds.bursary || "lesotho2026",
    username: "bursary",
  },
  registry: {
    email: "lesotho.registry@raisd.demo",
    password: process.env.RAISD_STAFF_REGISTRY_PASSWORD || staffCreds.registry || "lesotho2026",
    username: "registry",
  },
  "year-leader": {
    email: "lesotho.yearleader@raisd.demo",
    password: "lesotho2026",
    username: "yearleader",
  },
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

async function applicantSignIn(page, context) {
  await clearSite(page, context, APPLICANT)
  await gotoSafe(page, `${APPLICANT}/`)
  await page.waitForTimeout(1000)
  const draftBtn = page.getByRole("button", { name: /draft ready to submit|completed/i })
  if (await draftBtn.count()) {
    await draftBtn.first().click()
  } else {
    await page.getByLabel(/email|username/i).fill("completed@raisd.demo").catch(() => {})
  }
  await page.getByLabel(/^password$/i).fill(applicants.completed || "draft2026")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByRole("heading", { name: /my applications|applications/i }).waitFor({ timeout: 45000 }).catch(() => {})
  await dwell(page, 1200)
}

async function staffSignInUi(page, context, roleKey) {
  const acct = STAFF_ACCOUNTS[roleKey]
  if (!acct) throw new Error(`Unknown staff role ${roleKey}`)
  // Fresh context already has empty cookies — avoid clearSite race on SSO redirects.
  await gotoSafe(page, `${STAFF}/sign-in`)
  const user = page.getByLabel(/^username$/i)
  const email = page.getByLabel(/^email$/i)
  if (await user.count()) {
    await user.fill(acct.username)
  } else if (await email.count()) {
    await email.fill(acct.email)
  } else {
    const input = page.locator('input[type="text"], input[type="email"]').first()
    if (await input.count()) await input.fill(acct.email)
  }
  const pw = page.getByLabel(/^password$/i)
  if (await pw.count()) await pw.fill(acct.password)
  await safeClick(page.getByRole("button", { name: /^sign in$/i }))
  await page.waitForTimeout(2500)
  // SSO password / role picker may appear after redirect
  if (/sso|keycloak|auth/i.test(page.url()) || (await page.getByLabel(/email/i).count())) {
    await page.getByLabel(/email/i).fill(acct.email).catch(() => {})
    await page.getByLabel(/^password$/i).fill(acct.password).catch(() => {})
    await safeClick(page.getByRole("button", { name: /sign in|continue|log in/i }))
    await page.waitForTimeout(3000)
  }
  await gotoSafe(page, `${STAFF}/admin`)
  await page.waitForTimeout(1200)
}

async function studentSignIn(page, context) {
  await gotoSafe(page, `${STUDENT}/`)
  const alya = page.getByRole("button", { name: /alya putri/i })
  if (await alya.count()) await alya.click()
  const studentNo = page.getByLabel(/student number/i)
  if (await studentNo.count()) await studentNo.fill("10029841")
  await page.getByLabel(/^password$/i).fill(students["first-semester-registration"] || "alya2026")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(4000)
}

async function controlSignIn(page, context) {
  await gotoSafe(page, `${CONTROL}/sign-in`)
  const email = page.getByLabel(/email/i)
  if (await email.count()) await email.fill("sso.admin@raisd.demo")
  else {
    const input = page.locator('input[type="email"], input[type="text"]').first()
    if (await input.count()) await input.fill("sso.admin@raisd.demo")
  }
  const pw = page.getByLabel(/^password$/i)
  if (await pw.count()) await pw.fill("admin2026")
  await safeClick(page.getByRole("button", { name: /sign in|continue|log in/i }))
  await page.waitForTimeout(3500)
  if (/sso|auth/i.test(page.url())) {
    await page.getByLabel(/email/i).fill("sso.admin@raisd.demo").catch(() => {})
    await page.getByLabel(/^password$/i).fill("admin2026").catch(() => {})
    await safeClick(page.getByRole("button", { name: /sign in|continue|log in/i }))
    await page.waitForTimeout(3000)
  }
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
      if (!(await page.getByRole("heading", { name: /my applications|applications/i }).count())) {
        await applicantSignIn(page, context)
      }
      await page.goto(`${APPLICANT}/applications`, { waitUntil: "domcontentloaded" }).catch(() => {})
      await dwell(page, 1200)
      await openApplicantCase(page)
      await dwell(page, 2500)
      return "applicant draft view"
    }
    case "app-fee": {
      if (!(await page.getByRole("heading", { name: /my applications|applications|application/i }).count())) {
        await applicantSignIn(page, context)
      }
      await openApplicantCase(page)
      await safeClick(page.getByRole("button", { name: /application fee|fee/i }))
      await page.mouse.wheel(0, 400)
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
