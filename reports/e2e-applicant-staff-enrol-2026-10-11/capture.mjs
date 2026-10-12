/**
 * Hosted Demo E2E capture: staged admissions
 * Applicant submit → Bursary payment → QA documents → Confirm → Offer → Accept → Student.
 *
 *   node docs/reports/e2e-applicant-staff-enrol-2026-10-11/capture.mjs
 */
import { chromium } from "../../../../applicant-portal/node_modules/playwright/index.mjs"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const shots = path.join(here, "screenshots")
const credentialsDir = path.resolve(here, "../../../.credentials")
mkdirSync(shots, { recursive: true })

const applicants = JSON.parse(readFileSync(path.join(credentialsDir, "demo-applicants.json"), "utf8"))
const students = JSON.parse(readFileSync(path.join(credentialsDir, "demo-students.json"), "utf8"))
const keychainMaster =
  process.env.RAISD_KEYCHAIN_MASTER ||
  (() => {
    try {
      return JSON.parse(readFileSync(path.join(credentialsDir, "demo-keychain.json"), "utf8")).masterPassword
    } catch {
      return null
    }
  })()
const staffCreds = (() => {
  try {
    return JSON.parse(readFileSync(path.join(credentialsDir, "demo-staff.json"), "utf8"))
  } catch {
    return null
  }
})()
const bursaryPassword = process.env.RAISD_STAFF_BURSARY_PASSWORD || staffCreds?.bursary || null
const registryPassword =
  process.env.RAISD_STAFF_REGISTRY_PASSWORD || staffCreds?.registry || "registry2026"
if (!keychainMaster || !bursaryPassword) {
  throw new Error(
    "Missing Demo Keychain / Bursary passwords. Set RAISD_KEYCHAIN_MASTER and RAISD_STAFF_BURSARY_PASSWORD, or add .credentials/demo-keychain.json and demo-staff.json",
  )
}

const APPLICANT = "https://raisd-applicant-portal.vercel.app"
const STAFF = "https://raisd-staff-portal.vercel.app"
const STUDENT = "https://raisd-student-portal.vercel.app"
const KEYCHAIN = "https://raisd-keychain.vercel.app"

const steps = []

async function shot(page, id, title) {
  const file = `${id}.png`
  await page.screenshot({ path: path.join(shots, file), fullPage: true })
  steps.push({ id, title, file })
  console.log("captured", id, title)
}

async function staffSignIn(page, context, username, password) {
  await context.clearCookies()
  await page.goto(`${STAFF}/sign-in`, { waitUntil: "networkidle" })
  await page.evaluate(() => {
    try {
      sessionStorage.clear()
      localStorage.clear()
    } catch {
      /* ignore */
    }
  })
  await page.reload({ waitUntil: "networkidle" })
  const logout = page.getByRole("button", { name: /log out/i })
  if (await logout.count()) {
    await logout.click()
    await page.waitForTimeout(800)
    await page.goto(`${STAFF}/sign-in`, { waitUntil: "networkidle" })
  }
  await page.getByLabel(/^username$/i).waitFor({ state: "visible", timeout: 15000 })
  await page.getByLabel(/^username$/i).fill(username)
  await page.getByLabel(/^password$/i).fill(password)
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(2000)
  await page.goto(`${STAFF}/payments`, { waitUntil: "networkidle" })
  await page.getByRole("heading", { name: /admissions review|payment verification/i }).waitFor()
  await page.waitForTimeout(1500)
}

async function applicantSignOut(page, context) {
  await context.clearCookies()
  await page.goto(`${APPLICANT}/`, { waitUntil: "networkidle" })
  await page.evaluate(() => {
    try {
      sessionStorage.clear()
      localStorage.clear()
    } catch {
      /* ignore */
    }
  })
}

async function selectDraftRow(page) {
  const draftRow = page.getByRole("row", { name: /demo draft applicant/i })
  if (await draftRow.count()) await draftRow.click()
  await page.waitForTimeout(500)
  return draftRow
}

async function clickWhenEnabled(page, button, label) {
  await button.waitFor({ state: "visible" })
  for (let i = 0; i < 6 && !(await button.isEnabled()); i++) {
    await selectDraftRow(page)
    await page.getByRole("button", { name: /^refresh$/i }).click().catch(() => {})
    await page.waitForTimeout(1200)
  }
  if (!(await button.isEnabled())) {
    throw new Error(`${label} stayed disabled`)
  }
  await button.click()
}

async function applicantSignInCompleted(page, context) {
  await applicantSignOut(page, context)
  await page.goto(`${APPLICANT}/`, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /draft ready to submit/i }).click()
  await page.getByLabel(/^password$/i).fill(applicants.completed)
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByRole("heading", { name: /my applications/i }).waitFor({ timeout: 45000 })
  await page.waitForTimeout(1000)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    ignoreHTTPSErrors: true,
  })
  const page = await context.newPage()
  page.setDefaultTimeout(45000)

  // 01 Keychain unlock
  await page.goto(KEYCHAIN, { waitUntil: "networkidle" })
  await page.getByLabel(/master password/i).fill(keychainMaster)
  await page.getByRole("button", { name: /^unlock$/i }).click()
  await page.getByRole("heading", { name: /demo keychain/i }).waitFor()
  await shot(page, "01-keychain-unlocked", "Demo Keychain unlocked — Start here admissions sequence")

  // 02–05 Applicant: completed draft → fee → submit
  await page.goto(`${APPLICANT}/`, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /draft ready to submit/i }).click()
  await page.getByLabel(/^password$/i).fill(applicants.completed)
  await shot(page, "02-applicant-sign-in", "Applicant Portal — Draft ready to submit")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByRole("heading", { name: /my applications/i }).waitFor({ timeout: 30000 })
  await page.waitForTimeout(1000)
  await shot(page, "03-applicant-home", "Applicant home — draft application card")

  const resume = page.getByRole("button", { name: /resume draft|application no/i }).first()
  if (await resume.count()) {
    await resume.click()
  } else {
    await page.locator("text=Not submitted").first().click()
  }
  await page.waitForTimeout(2000)
  const feeStep = page.getByRole("button", { name: /application fee|fee/i }).first()
  if (await feeStep.count()) await feeStep.click().catch(() => {})
  await page.waitForTimeout(800)

  const bank = page.getByLabel(/bank reference number/i)
  if (await bank.count()) {
    const current = await bank.inputValue().catch(() => "")
    if (!current) await bank.fill(`E2E-${Date.now()}`)
  }
  const hasProof = await page.getByText(/payment\.pdf/i).count()
  const fileInput = page.locator('input[type="file"]')
  if (!hasProof && (await fileInput.count())) {
    const proofPath = path.join(shots, "_e2e-proof.pdf")
    writeFileSync(
      proofPath,
      Buffer.from(
        "%PDF-1.1\n1 0 obj<<>>endobj\n2 0 obj<< /Length 44 >>stream\nBT /F1 12 Tf 100 700 Td (E2E proof) Tj ET\nendstream\nendobj\ntrailer<<>>\n%%EOF\n",
        "utf8",
      ),
    )
    await fileInput.first().setInputFiles(proofPath)
    await page.waitForTimeout(500)
  }
  await shot(page, "04-applicant-fee", "Application fee step — bank reference and proof")

  const submitBtn = page.getByRole("button", { name: /^submit application$/i }).first()
  await submitBtn.click()
  await page.getByRole("heading", { name: /submit application/i }).waitFor({ timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(500)
  const confirmSubmit = page.getByRole("dialog").getByRole("button", { name: /^submit application$/i })
  if (await confirmSubmit.count()) {
    await confirmSubmit.click()
  } else {
    await page.getByRole("button", { name: /^submit application$/i }).last().click()
  }
  await page.getByRole("heading", { name: /my applications/i }).waitFor({ timeout: 45000 })
  await page.waitForTimeout(1500)
  await shot(page, "05-applicant-submitted", "Submitted — payment proof under review")

  const viewApp = page.getByRole("button", { name: /view application/i }).first()
  if (await viewApp.count()) {
    await viewApp.click()
    await page.waitForTimeout(1500)
    await shot(page, "05b-applicant-submitted-detail", "Submitted application detail awaiting Bursary")
  }

  // 06–08 Bursary approve payment only
  await page.goto(`${STAFF}/sign-in`, { waitUntil: "networkidle" })
  await page.getByLabel(/^username$/i).fill("bursary")
  await page.getByLabel(/^password$/i).fill(bursaryPassword)
  await shot(page, "06-staff-sign-in", "Staff Portal — Bursary desk credentials")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(2000)
  await page.goto(`${STAFF}/payments`, { waitUntil: "networkidle" })
  await page.getByRole("heading", { name: /admissions review|payment verification/i }).waitFor()
  await page.waitForTimeout(2000)

  await selectDraftRow(page)
  await shot(page, "07-staff-payment-queue", "Staff admissions queue — pending payment desk")

  const approve = page.getByRole("button", { name: /^approve payment$/i })
  await clickWhenEnabled(page, approve, "Approve payment")
  await page.waitForFunction(
    () => /QA|verify documents|payment verified|Documents/i.test(document.body.innerText),
    { timeout: 60000 },
  )
  await page.waitForTimeout(1200)
  await shot(page, "08-staff-payment-approved", "Bursary approved payment — next desk QA")

  // 08b Registry / QA verify documents
  await staffSignIn(page, context, "registry", registryPassword)
  await selectDraftRow(page)
  const verifyDocs = page.getByRole("button", { name: /verify documents/i })
  await clickWhenEnabled(page, verifyDocs, "Verify documents (QA)")
  await page.waitForFunction(
    () => /confirm Eligibility|Eligibility|applicant confirm/i.test(document.body.innerText),
    { timeout: 60000 },
  )
  await page.waitForTimeout(1200)
  await shot(page, "08b-staff-qa-verified", "QA verified documents — Eligibility released")

  // 08c Applicant confirm eligibility
  await applicantSignInCompleted(page, context)
  const openSubmitted = page.getByRole("button", { name: /view application|application no/i }).first()
  if (await openSubmitted.count()) await openSubmitted.click()
  await page.waitForTimeout(1500)
  const confirmElig = page.getByRole("button", { name: /confirm and continue|confirm eligibility/i }).first()
  if (await confirmElig.count()) {
    await confirmElig.click()
    await page.waitForTimeout(800)
    await shot(page, "08c-applicant-confirm-eligibility", "Applicant Confirm Eligibility Letter popup")
    const dialogConfirm = page
      .getByRole("dialog")
      .getByRole("button", { name: /^(confirm|continue|accept)$/i })
      .last()
    if (await dialogConfirm.count()) await dialogConfirm.click()
    await page.getByRole("dialog").waitFor({ state: "hidden", timeout: 60000 }).catch(() => {})
    await page.waitForTimeout(1500)
  } else {
    await shot(page, "08c-applicant-confirm-eligibility", "Applicant Confirm Eligibility Letter popup")
  }

  // 08d Registry release offer
  await staffSignIn(page, context, "registry", registryPassword)
  await selectDraftRow(page)
  const releaseOffer = page.getByRole("button", { name: /release offer/i })
  await clickWhenEnabled(page, releaseOffer, "Release Offer Letter")
  await page.waitForFunction(
    () => /Accept Enrolment|Offer Letter|offer released/i.test(document.body.innerText),
    { timeout: 60000 },
  )
  await page.waitForTimeout(1200)
  await shot(page, "08d-staff-offer-released", "Registry released Offer Letter")

  // 08e Applicant accept enrolment
  await applicantSignInCompleted(page, context)
  const openForAccept = page.getByRole("button", { name: /view application|application no/i }).first()
  if (await openForAccept.count()) await openForAccept.click()
  await page.waitForTimeout(1500)
  const accept = page.getByRole("button", { name: /accept enrolment|confirm and accept/i }).first()
  if (await accept.count()) {
    await accept.click()
    await page.waitForTimeout(800)
    await shot(page, "08e-applicant-accepted", "Applicant Accept Enrolment popup")
    const dialogAccept = page.getByRole("dialog").getByRole("button", { name: /^accept$/i }).last()
    if (await dialogAccept.count()) await dialogAccept.click()
    await page
      .waitForFunction(
        () => /Enrolment Accepted|Sign in to Applicant|sign in again/i.test(document.body.innerText),
        { timeout: 60000 },
      )
      .catch(() => {})
    await page.waitForTimeout(1500)
  } else {
    await shot(page, "08e-applicant-accepted", "Applicant Accept Enrolment popup")
  }

  // Home / sign-in after accept
  if (await page.getByRole("heading", { name: /sign in/i }).count()) {
    await page.getByRole("button", { name: /draft ready to submit/i }).click().catch(() => {})
    await page.getByLabel(/^password$/i).fill(applicants.completed)
    await page.getByRole("button", { name: /^sign in$/i }).click()
    await page.waitForTimeout(2500)
  }
  await shot(page, "09-applicant-after-enrol", "Applicant after Accept Enrolment — Enrolment Accepted")

  // 10–11 Student
  await context.clearCookies()
  await page.goto(STUDENT, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /alya putri/i }).click()
  await page.getByLabel(/student number/i).fill("10029841")
  await page.getByLabel(/^password$/i).fill(students["first-semester-registration"])
  await shot(page, "10-student-sign-in", "Student Portal — Alya Putri (Registration Week)")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(5000)
  await page.getByRole("link", { name: /dashboard/i }).first().waitFor({ timeout: 30000 }).catch(() => {})
  await page.waitForTimeout(2000)
  await shot(page, "11-student-home", "Student Portal dashboard after staged admissions path")

  writeFileSync(path.join(here, "steps.json"), JSON.stringify({ capturedAt: new Date().toISOString(), steps }, null, 2))
  await browser.close()
  console.log(`done — ${steps.length} screenshots`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
