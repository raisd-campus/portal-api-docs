/**
 * Capture Demo role playback screenshots (and optional WebMs).
 *
 *   node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs
 *   node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs --screens-only
 *   node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs --only=app-signin,bur-pay
 *
 * Default is --screens-only (storyboard player). Uses Demo Keychain SSO passwords.
 */
import { chromium } from "../../../../applicant-portal/node_modules/playwright/index.mjs"
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  unlinkSync,
  statSync,
  copyFileSync,
} from "node:fs"
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
const SCREENS_ONLY = !process.argv.includes("--video")
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

function readJson(name) {
  try {
    return JSON.parse(readFileSync(path.join(credentialsDir, name), "utf8"))
  } catch {
    return null
  }
}

const students = readJson("demo-students.json") || { "first-semester-registration": "alya2026" }

/** Demo Keychain catalog passwords. */
const KEYCHAIN_USERS = {
  applicant: { email: "completed@raisd.demo", password: "completed2026" },
  faculty: { email: "lesotho.faculty@raisd.demo", password: "lesotho2026" },
  qa: { email: "lesotho.qa@raisd.demo", password: "lesotho2026" },
  bursary: { email: "lesotho.bursary@raisd.demo", password: "lesotho2026" },
  registry: { email: "lesotho.registry@raisd.demo", password: "lesotho2026" },
  "year-leader": { email: "lesotho.yearleader@raisd.demo", password: "lesotho2026" },
  student: { email: "alya@raisd.demo", password: students["first-semester-registration"] || "alya2026" },
  control: { email: "sso.admin@raisd.demo", password: "admin2026" },
}

const ROLE_SIGNIN = {
  applicant: "applicant",
  faculty: "faculty",
  qa: "qa",
  bursary: "bursary",
  registry: "registry",
  "year-leader": "year-leader",
  student: "student",
  control: "control",
}

async function dwell(page, ms = 1800) {
  await page.waitForTimeout(ms)
}

async function safeClick(locator) {
  if ((await locator.count()) === 0) return false
  try {
    await locator.first().click({ timeout: 8000 })
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
  await page.waitForTimeout(700)
}

function onAuthChrome(url) {
  return /sso\.raisd\.co\/login|\/sign-in(?:\?|$)/i.test(url)
}

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
    throw new Error(`SSO login failed for ${email}: ${result.body?.error || result.status}`)
  }
  await gotoSafe(page, result.body.redirectTo)
  // Wait until the portal consumes ?code= and leaves login/sign-in chrome.
  await page
    .waitForFunction(
      () => {
        const u = location.href
        if (/[?&]code=/.test(u)) return false
        if (/sso\.raisd\.co\/login/i.test(u)) return false
        if (/\/sign-in(?:\?|$)/i.test(u)) return false
        return /raisd\.co/i.test(u)
      },
      null,
      { timeout: 60000 },
    )
    .catch(() => {})
  await page.waitForTimeout(1500)
  if (onAuthChrome(page.url())) {
    throw new Error(`SSO session did not stick for ${email}; still on ${page.url()}`)
  }
}

async function ensureRoleSession(page, context, roleId) {
  const key = ROLE_SIGNIN[roleId]
  const acct = KEYCHAIN_USERS[key]
  if (!acct) throw new Error(`No Keychain user for role ${roleId}`)

  if (roleId === "applicant") {
    await context.clearCookies()
    await ssoApiSignIn(page, acct.email, acct.password, `${APPLICANT}/applications`)
    if (!/apply\.lesotho\.raisd\.co\/applications/i.test(page.url())) {
      await gotoSafe(page, `${APPLICANT}/applications`)
    }
    await page.getByText(/my applications|application no|enrolment accepted|add application/i).first().waitFor({ timeout: 45000 })
    return
  }
  if (roleId === "student") {
    await context.clearCookies()
    await ssoApiSignIn(page, acct.email, acct.password, `${STUDENT}/`)
    await page.waitForFunction(() => !/[?&]code=/.test(location.search), null, { timeout: 45000 }).catch(() => {})
    if (!/student\.lesotho\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url())) {
      await gotoSafe(page, `${STUDENT}/`)
    }
    await page.getByText(/dashboard|registration|finance|modules|welcome/i).first().waitFor({ timeout: 30000 }).catch(() => {})
    await dwell(page, 2000)
    return
  }
  if (roleId === "control") {
    await context.clearCookies()
    await ssoApiSignIn(page, acct.email, acct.password, `${CONTROL}/flows/admissions/campus-lesotho`)
    if (!/control\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url())) {
      await gotoSafe(page, `${CONTROL}/flows/admissions/campus-lesotho`)
    }
    await dwell(page, 1500)
    return
  }
  // staff desks
  await context.clearCookies()
  await ssoApiSignIn(page, acct.email, acct.password, `${STAFF}/admin`)
  if (!/staff\.lesotho\.raisd\.co\/admin/i.test(page.url())) {
    await gotoSafe(page, `${STAFF}/admin`)
  }
  await page.getByText(/overview|applicants|campus|admin|staff|payments|students/i).first().waitFor({ timeout: 30000 }).catch(() => {})
  await dwell(page, 1200)
}

async function openApplicantCase(page) {
  const card = page.getByText(/application no\.?\s*0/i).first()
  if (await card.count()) {
    await card.click().catch(() => {})
    await dwell(page, 1200)
  }
  await safeClick(page.getByRole("button", { name: /view application|resume draft|application no/i }))
  await dwell(page, 1000)
}

async function selectQueueRow(page) {
  const row = page.locator("table tbody tr, [role='row']").nth(1)
  if (await row.count()) {
    await row.click().catch(() => {})
    await dwell(page, 900)
  }
}

async function applicantsEmpty(page) {
  const text = ((await page.locator("body").innerText().catch(() => "")) || "").toLowerCase()
  if (/no submitted (payment proofs|applications)|not available/.test(text)) return true
  if (/\b0\s+applications?\b/.test(text)) return true
  // Admin overview card: big "0" above "Submitted applications"
  if (/\b0\b[\s\S]{0,40}submitted applications/.test(text)) return true
  const rows = await page.locator("table tbody tr").count().catch(() => 0)
  if (rows === 0 && /admissions review|applicants|applications/.test(text)) return true
  return false
}

async function paymentsQueueReady(page) {
  const text = ((await page.locator("body").innerText().catch(() => "")) || "").toLowerCase()
  if (!/admissions review/.test(text)) return false
  if (/no submitted payment proofs/.test(text)) return false
  const rows = await page.locator("table tbody tr").count().catch(() => 0)
  return rows > 0
}

/** Open completed applicant case so Portal API materializes payment proofs into the Demo queue. */
async function warmDemoPaymentQueue(browser) {
  const context = await browser.newContext({ viewport: VIEWPORT, ignoreHTTPSErrors: true })
  const page = await context.newPage()
  page.setDefaultTimeout(40000)
  try {
    const acct = KEYCHAIN_USERS.applicant
    await ssoApiSignIn(page, acct.email, acct.password, `${APPLICANT}/applications`)
    await gotoSafe(page, `${APPLICANT}/applications`)
    await page.getByText(/my applications|application no|enrolment accepted/i).first().waitFor({ timeout: 45000 }).catch(() => {})
    await openApplicantCase(page)
    await gotoSafe(page, `${APPLICANT}/applications/application-scenario-completed`)
    await dwell(page, 2000)
    console.log("  warmed Demo payment queue via completed applicant case")
  } catch (err) {
    console.warn("  warm queue warning:", err instanceof Error ? err.message : err)
  } finally {
    await context.close()
  }
}

/** Lesotho faculty/QA Applicants is campus-empty; use bursary Hosted Demo admissions desk. */
async function openBursaryAdmissionsDesk(page, context) {
  await context.clearCookies()
  const bur = KEYCHAIN_USERS.bursary
  await ssoApiSignIn(page, bur.email, bur.password, `${STAFF}/admin/payments`)
  await gotoSafe(page, `${STAFF}/admin/payments`)
  if (!/\/admin\/payments/i.test(page.url())) {
    await gotoSafe(page, `${STAFF}/admin/payments`)
  }
  await safeClick(page.getByRole("button", { name: /^reload|^refresh/i }))
  await dwell(page, 2000)
  await page.getByText(/admissions review/i).first().waitFor({ timeout: 20000 })
  if (!(await paymentsQueueReady(page))) {
    throw new Error("Bursary Demo payment queue empty")
  }
  await selectQueueRow(page)
  await dwell(page, 900)
  return "/admin/payments (bursary demo queue)"
}

const QUEUE_FALLBACK_SCENES = new Set([
  "fac-open",
  "fac-rank",
  "fac-rec",
  "qa-open",
  "qa-extract",
  "qa-verify",
  "reg-offer",
])

function useGoldenAdmissionsPoster(sceneId) {
  const golden = path.join(outDir, "bur-pay.poster.jpg")
  const dest = path.join(outDir, `${sceneId}.poster.jpg`)
  if (!existsSync(golden) || sceneId === "bur-pay") return false
  copyFileSync(golden, dest)
  return true
}

/**
 * Prefer a queue that actually has Demo rows.
 * Lesotho faculty/QA/registry Applicants is often empty (campus-scoped); the
 * bursary Hosted Demo payments desk still shows the Cyberjaya demo cases.
 */
async function openStaffAdmissionsQueue(page, context, preferredPath) {
  await gotoSafe(page, `${STAFF}${preferredPath}`)
  await safeClick(page.getByRole("button", { name: /^reload/i }))
  await dwell(page, 1500)
  if (!(await applicantsEmpty(page))) {
    await selectQueueRow(page)
    return preferredPath
  }
  // Same staff session: try payments (bursary/registry may have it).
  await gotoSafe(page, `${STAFF}/admin/payments`)
  await dwell(page, 1500)
  if (await paymentsQueueReady(page)) {
    await selectQueueRow(page)
    return "/admin/payments"
  }
  // Re-auth as bursary for the Hosted Demo admissions review with rows.
  await context.clearCookies()
  const bur = KEYCHAIN_USERS.bursary
  await ssoApiSignIn(page, bur.email, bur.password, `${STAFF}/admin/payments`)
  await gotoSafe(page, `${STAFF}/admin/payments`)
  if (!/\/admin\/payments/i.test(page.url())) {
    await gotoSafe(page, `${STAFF}/admin/payments`)
  }
  await safeClick(page.getByRole("button", { name: /^reload|^refresh/i }))
  await dwell(page, 2000)
  await page.getByText(/admissions review/i).first().waitFor({ timeout: 20000 }).catch(() => {})
  if (!(await paymentsQueueReady(page))) {
    throw new Error("Bursary Demo payment queue still empty after warm/fallback")
  }
  await selectQueueRow(page)
  await dwell(page, 900)
  return "/admin/payments (bursary demo queue)"
}

async function captureShot(page, sceneId) {
  // If auth bounced, jump to target once more after caller re-authed.
  if (onAuthChrome(page.url()) && SCENE_URLS[sceneId]) {
    await gotoSafe(page, SCENE_URLS[sceneId])
    await dwell(page, 1500)
  }
  const posterPath = path.join(outDir, `${sceneId}.poster.jpg`)
  await page.screenshot({ path: posterPath, type: "jpeg", quality: 78, fullPage: false })
  return posterPath
}

async function runSceneActions(page, context, sceneId) {
  switch (sceneId) {
    case "app-signin":
      // Already signed in on applications — avoid a hard reload that bounces to campus SSO.
      if (!/apply\.lesotho\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url())) {
        await gotoSafe(page, `${APPLICANT}/applications`)
      }
      await page.getByText(/my applications|application no|enrolment accepted/i).first().waitFor({ timeout: 20000 }).catch(() => {})
      await dwell(page, 1800)
      return "applicant applications"
    case "app-draft":
      if (!/apply\.lesotho\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url())) {
        await gotoSafe(page, `${APPLICANT}/applications`)
      }
      await openApplicantCase(page)
      await dwell(page, 2000)
      return "applicant case"
    case "app-fee":
      if (!/apply\.lesotho\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url())) {
        await gotoSafe(page, `${APPLICANT}/applications`)
      }
      await openApplicantCase(page)
      await safeClick(page.getByRole("button", { name: /fee|payment|view application/i }))
      await page.mouse.wheel(0, 360).catch(() => {})
      await dwell(page, 2000)
      return "applicant fee"
    case "app-eligibility":
      if (!/apply\.lesotho\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url())) {
        await gotoSafe(page, `${APPLICANT}/applications`)
      }
      await openApplicantCase(page)
      await safeClick(page.getByRole("button", { name: /eligib|confirm and continue|view application/i }))
      await dwell(page, 2000)
      return "applicant eligibility"
    case "app-offer":
      if (!/apply\.lesotho\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url())) {
        await gotoSafe(page, `${APPLICANT}/applications`)
      }
      await openApplicantCase(page)
      await safeClick(page.getByRole("button", { name: /offer|accept enrolment|view application/i }))
      await dwell(page, 2000)
      return "applicant offer"
    case "fac-open":
    case "fac-rank":
    case "fac-rec": {
      await gotoSafe(page, `${STAFF}/admin/applicants`)
      await safeClick(page.getByRole("button", { name: /^reload/i }))
      await dwell(page, 1500)
      if (await applicantsEmpty(page)) {
        const path = await openBursaryAdmissionsDesk(page, context)
        return `${sceneId} @ ${path}`
      }
      await selectQueueRow(page)
      if (sceneId === "fac-rank") {
        await page.getByLabel(/^rank$/i).fill("2").catch(() => {})
        await page.getByLabel(/^score$/i).fill("78.5").catch(() => {})
        await safeClick(page.getByRole("button", { name: /set rank|save metrics|apply metrics/i }))
      }
      if (sceneId === "fac-rec") {
        await safeClick(page.getByRole("button", { name: /recommend|record recommendation/i }))
      }
      await dwell(page, 1800)
      return `${sceneId} @ /admin/applicants`
    }
    case "qa-open":
    case "qa-extract":
    case "qa-verify": {
      await gotoSafe(page, `${STAFF}/admin/document-review`)
      await safeClick(page.getByRole("button", { name: /^reload/i }))
      await dwell(page, 1500)
      if (onAuthChrome(page.url()) || (await page.getByText(/not found|404/i).count()) || (await applicantsEmpty(page))) {
        await gotoSafe(page, `${STAFF}/admin/applicants`)
        await dwell(page, 1200)
      }
      if (await applicantsEmpty(page)) {
        const path = await openBursaryAdmissionsDesk(page, context)
        return `${sceneId} @ ${path}`
      }
      await selectQueueRow(page)
      if (sceneId === "qa-extract") {
        await page.getByLabel(/certificate/i).fill("LGCSE-DEMO-1").catch(() => {})
        await page.getByLabel(/institution/i).fill("Demo High School (Maseru)").catch(() => {})
        await safeClick(page.getByRole("button", { name: /extract/i }))
      }
      if (sceneId === "qa-verify") {
        await safeClick(page.getByRole("button", { name: /verify documents/i }))
      }
      await dwell(page, 1800)
      return `${sceneId} @ document-review`
    }
    case "bur-pay":
      await gotoSafe(page, `${STAFF}/admin/payments`)
      if (onAuthChrome(page.url())) await gotoSafe(page, `${STAFF}/payments`)
      await selectQueueRow(page)
      await dwell(page, 1800)
      return "bursary payments"
    case "bur-fees":
      await gotoSafe(page, `${STAFF}/admin/fees`)
      if (onAuthChrome(page.url())) await gotoSafe(page, `${STAFF}/fees`)
      await dwell(page, 2000)
      return "bursary fees"
    case "bur-reg":
      await gotoSafe(page, `${STAFF}/admin/registrations`)
      if (onAuthChrome(page.url())) await gotoSafe(page, `${STAFF}/registrations`)
      await selectQueueRow(page)
      await dwell(page, 1800)
      return "bursary registrations"
    case "reg-offer": {
      await gotoSafe(page, `${STAFF}/admin/applicants`)
      await safeClick(page.getByRole("button", { name: /^reload/i }))
      await dwell(page, 1500)
      if (await applicantsEmpty(page)) {
        const path = await openBursaryAdmissionsDesk(page, context)
        return `registry offer desk @ ${path}`
      }
      await selectQueueRow(page)
      await safeClick(page.getByRole("button", { name: /release offer|offer letter/i }))
      await dwell(page, 1800)
      return "registry offer desk @ /admin/applicants"
    }
    case "reg-queue":
      await gotoSafe(page, `${STAFF}/admin/registrations`)
      await selectQueueRow(page)
      await dwell(page, 1800)
      return "registry registrations"
    case "reg-list":
      await gotoSafe(page, `${STAFF}/admin/students`)
      await dwell(page, 1800)
      return "registry students"
    case "reg-file-academics":
    case "reg-file-sponsors": {
      await gotoSafe(page, `${STAFF}/admin/students`)
      await selectQueueRow(page)
      const tab = sceneId.includes("sponsors") ? /sponsors/i : /academics/i
      await safeClick(page.getByRole("tab", { name: tab }))
      await safeClick(page.getByRole("button", { name: tab }))
      await dwell(page, 1800)
      return sceneId
    }
    case "yl-signin":
      await gotoSafe(page, `${STAFF}/admin`)
      await dwell(page, 1800)
      return "year leader home"
    case "yl-list":
      await gotoSafe(page, `${STAFF}/admin/students`)
      await dwell(page, 1800)
      return "year leader list"
    case "yl-file":
      await gotoSafe(page, `${STAFF}/admin/students`)
      await selectQueueRow(page)
      await dwell(page, 1800)
      return "year leader file"
    case "stu-signin":
      if (!/student\.lesotho\.raisd\.co/i.test(page.url()) || onAuthChrome(page.url()) || /[?&]code=/.test(page.url())) {
        await page.waitForFunction(() => !/[?&]code=/.test(location.search), null, { timeout: 20000 }).catch(() => {})
      }
      await dwell(page, 2500)
      return "student home"
    case "stu-reg":
      if (!(await safeClick(page.getByRole("link", { name: /registration/i })))) {
        await safeClick(page.getByRole("button", { name: /registration/i }))
      }
      await dwell(page, 2500)
      return "student registration"
    case "stu-finance":
      if (!(await safeClick(page.getByRole("link", { name: /finance/i })))) {
        await safeClick(page.getByRole("button", { name: /finance/i }))
      }
      await dwell(page, 2500)
      return "student finance"
    case "ctl-flows":
      await gotoSafe(page, `${CONTROL}/flows/admissions/campus-lesotho`)
      await page.getByText(/loading admissions policy/i).waitFor({ state: "hidden", timeout: 30000 }).catch(() => {})
      await dwell(page, 2500)
      return "control flows"
    case "ctl-review":
      await gotoSafe(page, `${CONTROL}/flows/admissions/campus-lesotho`)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35)).catch(() => {})
      await dwell(page, 1800)
      return "control review"
    case "ctl-catalogues":
      await gotoSafe(page, `${CONTROL}/flows/admissions/campus-lesotho`)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55)).catch(() => {})
      await dwell(page, 1800)
      return "control catalogues"
    case "ctl-positions":
      await gotoSafe(page, `${CONTROL}/campuses/campus-lesotho`)
      await dwell(page, 2000)
      return "control campus"
    default:
      if (SCENE_URLS[sceneId]) await gotoSafe(page, SCENE_URLS[sceneId])
      await dwell(page, 1500)
      return "navigated"
  }
}

async function captureRole(browser, role, scenes) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    ignoreHTTPSErrors: true,
  })
  const page = await context.newPage()
  page.setDefaultTimeout(40000)

  const results = []
  try {
    await ensureRoleSession(page, context, role.id)
  } catch (err) {
    console.warn(`  role ${role.id} sign-in warning:`, err instanceof Error ? err.message : err)
  }

  for (const scene of scenes) {
    if (onlyIds && !onlyIds.has(scene.id)) continue
    console.log(`→ ${scene.id} (${role.label})`)
    let detail = ""
    let error = null
    try {
      if (onAuthChrome(page.url())) {
        await ensureRoleSession(page, context, role.id)
      }
      detail = await runSceneActions(page, context, scene.id)
      if (onAuthChrome(page.url())) {
        await ensureRoleSession(page, context, role.id)
        detail = await runSceneActions(page, context, scene.id)
      }
    } catch (err) {
      error = err instanceof Error ? err.message : String(err)
      console.warn(`  scene ${scene.id} warning:`, error)
    }

    let posterPath
    let usedGolden = false
    if (error && QUEUE_FALLBACK_SCENES.has(scene.id) && useGoldenAdmissionsPoster(scene.id)) {
      posterPath = path.join(outDir, `${scene.id}.poster.jpg`)
      usedGolden = true
      detail = `${detail || error} · golden bur-pay poster`
    } else {
      try {
        posterPath = await captureShot(page, scene.id)
        // Only replace with bursary golden when the live desk is still empty.
        if (QUEUE_FALLBACK_SCENES.has(scene.id) && (await applicantsEmpty(page)) && useGoldenAdmissionsPoster(scene.id)) {
          usedGolden = true
          detail = `${detail || "empty live desk"} · golden bur-pay poster`
        }
      } catch (shotErr) {
        if (QUEUE_FALLBACK_SCENES.has(scene.id) && useGoldenAdmissionsPoster(scene.id)) {
          posterPath = path.join(outDir, `${scene.id}.poster.jpg`)
          usedGolden = true
          detail = `screenshot failed · golden bur-pay poster`
          error = shotErr instanceof Error ? shotErr.message : String(shotErr)
        } else {
          throw shotErr
        }
      }
    }
    const bytes = existsSync(posterPath) ? statSync(posterPath).size : 0
    console.log(
      `  ${Math.round(bytes / 1024)} KiB poster · ${detail || error || ""}${usedGolden ? " ⭐" : ""} · ${page.url()}`,
    )
    results.push({
      sceneId: scene.id,
      roleId: role.id,
      title: scene.title,
      fm: scene.fm || [],
      poster: `${scene.id}.poster.jpg`,
      bytes,
      detail,
      error,
      url: page.url(),
      recordedAt: new Date().toISOString(),
    })
  }

  await context.close()
  return results
}

async function main() {
  const roles = ROLES.map((role) => ({
    ...role,
    scenes: role.scenes.filter((s) => !onlyIds || onlyIds.has(s.id)),
  })).filter((r) => r.scenes.length)

  console.log(
    `Capturing ${roles.reduce((n, r) => n + r.scenes.length, 0)} screens (${SCREENS_ONLY ? "screens-only" : "with video"}) → ${outDir}`,
  )

  const browser = await chromium.launch({ headless: true })
  const needsWarm = roles.some((r) =>
    r.scenes.some((s) => /^(fac-|qa-|reg-offer|bur-pay)/.test(s.id)),
  )
  if (needsWarm) await warmDemoPaymentQueue(browser)

  const scenes = []
  for (const role of roles) {
    const batch = await captureRole(browser, role, role.scenes)
    scenes.push(...batch)
  }
  await browser.close()

  // cleanup tmp
  for (const f of readdirSync(tmpDir)) {
    try {
      unlinkSync(path.join(tmpDir, f))
    } catch {
      /* ignore */
    }
  }

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

  writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify(
      {
        recordedAt: new Date().toISOString(),
        mode: SCREENS_ONLY ? "screens-only" : "video",
        host: { applicant: APPLICANT, staff: STAFF, student: STUDENT, control: CONTROL, keychain: KEYCHAIN },
        scenes: merged,
      },
      null,
      2,
    ),
  )
  console.log(`Wrote manifest with ${merged.length} scenes (${scenes.length} this run)`)
  console.log(`Player: ${pathToFileURL(path.join(here, "demo-role-playback.html")).href}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
