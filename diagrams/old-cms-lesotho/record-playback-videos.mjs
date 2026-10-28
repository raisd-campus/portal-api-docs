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

/** Wait until Control Lesotho Admissions policy settings are painted (not the loading stub). */
async function openControlAdmissionsFlow(page) {
  await gotoSafe(page, `${CONTROL}/flows/admissions/campus-lesotho`)
  await page
    .getByText(/loading admissions policy/i)
    .waitFor({ state: "hidden", timeout: 60000 })
    .catch(() => {})
  await page
    .getByText(/desk review \(lesotho\)|eligibility and documents|admissions campus workflow/i)
    .first()
    .waitFor({ timeout: 60000 })
  // Extra beat for toggles/lists after the heading paints.
  await dwell(page, 1200)
  if (await page.getByText(/loading admissions policy/i).count()) {
    throw new Error("Control Admissions policy still loading")
  }
}

/** Open Demo Lesotho student registry file (FM-07). DataTable may be 1 body row. */
async function openRegistryStudentFile(page) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const byLabel = page.getByRole("button", { name: /open file for|view details/i })
    if (await byLabel.count()) {
      await byLabel.first().click({ timeout: 8000 })
    } else {
      const row = page.locator("table tbody tr").filter({ hasText: /demo lesotho student|DEMO-LS/i }).first()
      if (await row.count()) {
        await row.click({ timeout: 8000 })
      } else {
        const anyRow = page.locator("table tbody tr").first()
        if (await anyRow.count()) await anyRow.click({ timeout: 8000 })
        else await page.getByText(/demo lesotho student/i).first().click({ timeout: 8000 })
      }
    }
    try {
      await page.getByRole("tab", { name: /^academics$/i }).waitFor({ timeout: 12000 })
      await dwell(page, 1000)
      return
    } catch (err) {
      if (attempt === 1) throw err
      await gotoSafe(page, `${STAFF}/admin/students`)
      await page.getByText(/enrolled students|demo lesotho student/i).first().waitFor({ timeout: 20000 })
      await dwell(page, 1200)
    }
  }
}

/** Open the admissions Review action dropdown and pick a labelled option. */
async function selectReviewAction(page, actionLabel) {
  const trigger = page.getByRole("button", { name: /review action/i })
  if ((await trigger.count()) === 0) {
    // Detail pane may be below the fold after selecting a row.
    await page.getByText(/review action/i).first().scrollIntoViewIfNeeded().catch(() => {})
    await dwell(page, 400)
  }
  if ((await trigger.count()) === 0) return false
  await trigger.first().scrollIntoViewIfNeeded().catch(() => {})
  await trigger.first().click({ timeout: 8000 }).catch(() => {})
  await dwell(page, 400)
  const option = page.getByRole("menuitemradio", { name: actionLabel }).or(
    page.getByRole("menuitem", { name: actionLabel }),
  )
  if ((await option.count()) === 0) {
    // Close menu if the action is not offered for this desk/case.
    await page.keyboard.press("Escape").catch(() => {})
    return false
  }
  await option.first().click({ timeout: 8000 })
  await dwell(page, 700)
  await page.getByText(/review action/i).first().scrollIntoViewIfNeeded().catch(() => {})
  return true
}

async function fillReviewNote(page, note) {
  const input = page.locator("#review-note")
  if ((await input.count()) === 0) return
  await input.fill(note).catch(() => {})
}

/** Prefer a Lesotho Demo applicant row (0/3) over empty pending shells. */
async function selectLesothoDemoRow(page) {
  const preferred = page
    .locator("table tbody tr")
    .filter({ hasText: /demo lesotho applicant/i })
    .filter({ hasText: /0\/3|pending review/i })
    .first()
  if (await preferred.count()) {
    await preferred.click().catch(() => {})
    await dwell(page, 1000)
    return
  }
  await selectQueueRow(page)
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

/** Minimal valid Demo PDF (issuedLetterSchema requires %PDF- after atob). */
const DEMO_LETTER_PDF_B64 =
  "JVBERi0xLjEKMSAwIG9iajw8IC9UeXBlIC9DYXRhbG9nIC9QYWdlcyAyIDAgUiA+PmVuZG9iagoyIDAgb2JqPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj5lbmRvYmoKMyAwIG9iajw8IC9UeXBlIC9QYWdlIC9QYXJlbnQgMiAwIFIgL01lZGlhQm94IFswIDAgMzAwIDE0NF0gL0NvbnRlbnRzIDQgMCBSID4+ZW5kb2JqCjQgMCBvYmo8PCAvTGVuZ3RoIDQ0ID4+c3RyZWFtCkJUIC9GMSAxMiBUZiA0MCAxMDAgVGQgKERFTU8gTEVUVEVSKSBUaiBFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDIwNiAwMDAwMCBuIAp0cmFpbGVyPDwgL1NpemUgNSAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKMzAwCiUlRU9G"

function demoLetter(kind) {
  const eligibility = kind !== "offer"
  return {
    id: eligibility ? "letter-eligibility-demo" : "letter-offer-demo",
    kind: eligibility ? "eligibility" : "offer",
    department: eligibility ? "Quality Assurance" : "Registry",
    fileName: eligibility ? "eligibility-letter-1.pdf" : "offer-letter-1.pdf",
    releasedAt: "2026-10-13T08:00:00.000Z",
    pdfBase64: DEMO_LETTER_PDF_B64,
  }
}

function reshapeApplicantForLetterScene(record, mode) {
  if (!record || typeof record !== "object") return record
  const next = structuredClone(record)
  next.status = "approved"
  next.acceptance = null
  // Prefer classic letter workflow UI over Lesotho flow stages for these storyboard shots.
  next.flow = null
  next.verification = {
    ...(next.verification || {}),
    paymentVerifiedAt: next.verification?.paymentVerifiedAt || "2026-10-13T07:00:00.000Z",
    documentsVerifiedAt: next.verification?.documentsVerifiedAt || "2026-10-13T07:30:00.000Z",
  }
  if (mode === "eligibility") {
    next.letters = {
      eligibility: demoLetter("eligibility"),
      eligibilityConfirmedAt: null,
      offer: null,
    }
  } else {
    next.letters = {
      eligibility: demoLetter("eligibility"),
      eligibilityConfirmedAt: "2026-10-13T09:00:00.000Z",
      offer: demoLetter("offer"),
    }
  }
  return next
}

/**
 * Demo applicants are often already Enrolment Accepted, so Confirm/Accept popups never appear.
 * Rewrite getApplications / getApplication RPC payloads for storyboard-only mid-flow letter UIs.
 * Install only after a live session is already on /applications — mocking during SSO exchange
 * can bounce the portal back to campus login.
 */
async function withApplicantLetterMock(page, mode, run) {
  const handler = async (route) => {
    try {
      const response = await route.fetch()
      const text = await response.text()
      let body
      try {
        body = JSON.parse(text)
      } catch {
        await route.fulfill({ response })
        return
      }
      if (body?.result) {
        if (Array.isArray(body.result)) {
          body.result = body.result.map((row) => reshapeApplicantForLetterScene(row, mode))
        } else if (typeof body.result === "object") {
          body.result = reshapeApplicantForLetterScene(body.result, mode)
        }
      }
      await route.fulfill({
        status: response.status(),
        contentType: "application/json",
        body: JSON.stringify(body),
      })
    } catch {
      await route.continue().catch(() => {})
    }
  }
  await page.route("**/v1/applicant/getApplications", handler)
  await page.route("**/v1/applicant/getApplication", handler)
  try {
    return await run()
  } finally {
    await page.unroute("**/v1/applicant/getApplications", handler).catch(() => {})
    await page.unroute("**/v1/applicant/getApplication", handler).catch(() => {})
  }
}

async function ensureApplicantApplications(page, context) {
  if (onAuthChrome(page.url()) || !/apply\.lesotho\.raisd\.co/i.test(page.url())) {
    await ensureRoleSession(page, context, "applicant")
  }
  if (!/apply\.lesotho\.raisd\.co\/applications/i.test(page.url())) {
    await gotoSafe(page, `${APPLICANT}/applications`)
  }
  await page
    .getByText(/my applications|application no|enrolment accepted|add application/i)
    .first()
    .waitFor({ timeout: 45000 })
}

async function openApplicantLetterPopup(page, context, mode, sceneId) {
  // 1) Land with a real accepted session (no mock yet).
  await ensureApplicantApplications(page, context)
  // 2) Mock mid-flow letters, open popup, and screenshot before unroute
  //    (unrouting can refetch the accepted case and dismiss the dialog).
  await withApplicantLetterMock(page, mode, async () => {
    // Soft refetch via list navigation — avoid full document goto (can bounce SSO).
    await safeClick(page.getByRole("button", { name: /^my applications$/i }))
    await safeClick(page.getByRole("link", { name: /^my applications$/i }))
    await dwell(page, 1500)
    await openApplicantCase(page)
    await dwell(page, 1200)
    const openLabel =
      mode === "offer"
        ? /confirm and accept enrolment/i
        : /confirm and continue enrolment/i
    const cta = page.getByRole("button", { name: openLabel }).first()
    await cta.scrollIntoViewIfNeeded().catch(() => {})
    await dwell(page, 400)
    let opened = false
    try {
      await cta.click({ timeout: 8000 })
      opened = true
    } catch {
      opened = await safeClick(page.getByRole("button", { name: /confirm and (continue|accept)/i }))
    }
    if (opened) {
      await page.getByRole("dialog").waitFor({ timeout: 15000 })
      await dwell(page, 1200)
    } else {
      // Still capture the mid-flow letter desk even if the popup did not open.
      await dwell(page, 1000)
    }
    await page.screenshot({
      path: path.join(outDir, `${sceneId}.poster.jpg`),
      type: "jpeg",
      quality: 78,
      fullPage: false,
    })
  })
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
      await openApplicantLetterPopup(page, context, "eligibility", sceneId)
      return "applicant eligibility · Confirm Eligibility Letter popup · poster-captured"
    case "app-offer":
      await openApplicantLetterPopup(page, context, "offer", sceneId)
      return "applicant offer · Accept Enrolment popup · poster-captured"
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
      await selectLesothoDemoRow(page)
      if (sceneId === "fac-open") {
        // Queue + selected case detail (no review form yet).
        await page.getByText(/demo lesotho applicant/i).first().scrollIntoViewIfNeeded().catch(() => {})
        await dwell(page, 1200)
        return "fac-open @ /admin/applicants (case selected)"
      }
      if (sceneId === "fac-rank") {
        const ok = await selectReviewAction(page, /set rank\s*\/\s*score/i)
        if (ok) {
          await page.locator("#review-rank").fill("2").catch(() => {})
          await page.locator("#review-score").fill("78.5").catch(() => {})
          await fillReviewNote(page, "Demo faculty rank/score for storyboard")
          await dwell(page, 1200)
        }
        return ok
          ? "fac-rank @ /admin/applicants (Set rank / score form)"
          : "fac-rank @ /admin/applicants (action unavailable)"
      }
      if (sceneId === "fac-rec") {
        const ok = await selectReviewAction(page, /record desk recommendation/i)
        if (ok) {
          // Leave outcome on Recommended; show the review form prominently.
          await fillReviewNote(page, "Demo faculty recommendation — approve for QA")
          await dwell(page, 1200)
        }
        return ok
          ? "fac-rec @ /admin/applicants (Record desk recommendation form)"
          : "fac-rec @ /admin/applicants (action unavailable)"
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
      await selectLesothoDemoRow(page)
      if (sceneId === "qa-open") {
        await page.getByText(/document review|demo lesotho applicant/i).first().scrollIntoViewIfNeeded().catch(() => {})
        await dwell(page, 1200)
        return "qa-open @ document-review (case selected)"
      }
      if (sceneId === "qa-extract") {
        const ok = await selectReviewAction(page, /extract certificate/i)
        if (ok) {
          await page.locator("#extract-cert").fill("LGCSE-DEMO-1").catch(() => {})
          await page.locator("#extract-institution").fill("Demo High School (Maseru)").catch(() => {})
          await page.locator("#extract-subjects").fill("Sesotho | B; Mathematics | C; English | C").catch(() => {})
          await fillReviewNote(page, "Demo LGCSE extract for storyboard")
          await dwell(page, 1200)
        }
        return ok
          ? "qa-extract @ document-review (Extract certificate form)"
          : "qa-extract @ document-review (action unavailable)"
      }
      if (sceneId === "qa-verify") {
        const ok = await selectReviewAction(page, /verify eligibility and documents/i)
        if (ok) {
          await fillReviewNote(page, "Demo QA verify documents for storyboard")
          await dwell(page, 1200)
        }
        return ok
          ? "qa-verify @ document-review (Verify eligibility form)"
          : "qa-verify @ document-review (action unavailable)"
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
      await page.getByText(/enrolled students|demo registry file/i).first().waitFor({ timeout: 20000 }).catch(() => {})
      await dwell(page, 1800)
      return "registry students list"
    case "reg-file-academics":
    case "reg-file-sponsors": {
      await gotoSafe(page, `${STAFF}/admin/students`)
      await page.getByText(/enrolled students|demo lesotho student/i).first().waitFor({ timeout: 20000 })
      await openRegistryStudentFile(page)
      const sponsors = sceneId.includes("sponsors")
      const tabName = sponsors ? /^sponsors$/i : /^academics$/i
      await page.getByRole("tab", { name: tabName }).click({ timeout: 8000 })
      await dwell(page, 900)
      // Bring the open file (below the list) into the 720px storyboard viewport.
      await page
        .getByRole("heading", { name: /demo lesotho student/i })
        .first()
        .scrollIntoViewIfNeeded()
        .catch(() => {})
      if (sponsors) {
        await page.getByText(/sponsors \(nmds\)/i).first().scrollIntoViewIfNeeded().catch(() => {})
      } else {
        await page.getByText(/^modules$/i).first().scrollIntoViewIfNeeded().catch(() => {})
      }
      await dwell(page, 1200)
      return sponsors
        ? "registry student file · Sponsors (NMDS)"
        : "registry student file · Academics"
    }
    case "yl-signin":
      await gotoSafe(page, `${STAFF}/admin`)
      await dwell(page, 1800)
      return "year leader home"
    case "yl-list":
      await gotoSafe(page, `${STAFF}/admin/students`)
      await page.getByText(/enrolled students|demo registry file/i).first().waitFor({ timeout: 20000 }).catch(() => {})
      await dwell(page, 1800)
      return "year leader students list"
    case "yl-file": {
      await gotoSafe(page, `${STAFF}/admin/students`)
      await page.getByText(/enrolled students|demo lesotho student/i).first().waitFor({ timeout: 20000 })
      await openRegistryStudentFile(page)
      await page.getByRole("tab", { name: /^academics$/i }).click({ timeout: 8000 }).catch(() => {})
      await dwell(page, 700)
      await page
        .getByRole("heading", { name: /demo lesotho student/i })
        .first()
        .scrollIntoViewIfNeeded()
        .catch(() => {})
      await page.getByText(/^modules$/i).first().scrollIntoViewIfNeeded().catch(() => {})
      await dwell(page, 1200)
      return "year leader student file · Academics (read)"
    }
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
      await openControlAdmissionsFlow(page)
      await page.getByText(/admissions campus workflow|eligibility and documents/i).first().scrollIntoViewIfNeeded().catch(() => {})
      await dwell(page, 1500)
      return "control flows · Lesotho admissions settings"
    case "ctl-review":
      await openControlAdmissionsFlow(page)
      await page.getByText(/desk review \(lesotho\)/i).first().scrollIntoViewIfNeeded()
      await page.getByText(/show rank and score|document extract required|use faculty/i).first().waitFor({ timeout: 10000 })
      await dwell(page, 1500)
      return "control flows · Desk review (Lesotho) flags"
    case "ctl-catalogues":
      await openControlAdmissionsFlow(page)
      await page.getByText(/admissions catalogues \(demo\)/i).first().scrollIntoViewIfNeeded()
      await page.getByRole("button", { name: /load lesotho demo catalogues/i }).waitFor({ timeout: 10000 }).catch(() => {})
      await dwell(page, 1500)
      return "control flows · Admissions catalogues (Demo)"
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
    } else if (/\bposter-captured\b/.test(detail || "")) {
      // Scene already wrote the poster (e.g. letter popup while mock still active).
      posterPath = path.join(outDir, `${scene.id}.poster.jpg`)
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
