/**
 * Hosted Demo E2E capture: Applicant fee submit → Staff approve → Student.
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
const bursaryPassword =
  process.env.RAISD_STAFF_BURSARY_PASSWORD ||
  (() => {
    try {
      return JSON.parse(readFileSync(path.join(credentialsDir, "demo-staff.json"), "utf8")).bursary
    } catch {
      return null
    }
  })()
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
  await shot(page, "01-keychain-unlocked", "Demo Keychain unlocked — desks and students")

  // 02–05 Applicant: completed draft → fee → submit
  await page.goto(`${APPLICANT}/`, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /draft ready to submit/i }).click()
  await page.getByLabel(/^password$/i).fill(applicants.completed)
  await shot(page, "02-applicant-sign-in", "Applicant Portal — Draft ready to submit")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByRole("heading", { name: /my applications/i }).waitFor({ timeout: 30000 })
  await page.waitForTimeout(1000)
  await shot(page, "03-applicant-home", "Applicant home — draft application card")

  // Open draft editor (fee step)
  const resume = page.getByRole("button", { name: /resume draft|application no/i }).first()
  if (await resume.count()) {
    await resume.click()
  } else {
    await page.locator("text=Not submitted").first().click()
  }
  await page.waitForTimeout(2000)
  // Ensure fee step
  const feeStep = page.getByRole("button", { name: /application fee|fee/i }).first()
  if (await feeStep.count()) await feeStep.click().catch(() => {})
  await page.waitForTimeout(800)

  const bank = page.getByLabel(/bank reference number/i)
  if (await bank.count()) {
    const current = await bank.inputValue().catch(() => "")
    if (!current) await bank.fill(`E2E-${Date.now()}`)
  }
  // Seed usually already has payment.pdf; upload only when the field is empty.
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
  // Confirm in popup footer
  const confirm = page.getByRole("dialog").getByRole("button", { name: /^submit application$/i })
  if (await confirm.count()) {
    await confirm.click()
  } else {
    await page.getByRole("button", { name: /^submit application$/i }).last().click()
  }
  await page.getByRole("heading", { name: /my applications/i }).waitFor({ timeout: 45000 })
  await page.waitForTimeout(1500)
  await shot(page, "05-applicant-submitted", "Submitted — payment proof under review")

  // Open submitted detail for richer shot (optional replace 05b)
  const viewApp = page.getByRole("button", { name: /view application/i }).first()
  if (await viewApp.count()) {
    await viewApp.click()
    await page.waitForTimeout(1500)
    await shot(page, "05b-applicant-submitted-detail", "Submitted application detail awaiting Bursary")
    await page.goto(`${APPLICANT}/applications`, { waitUntil: "networkidle" })
  }

  // 06–08 Staff approve
  await context.clearCookies()
  await page.goto(`${STAFF}/sign-in`, { waitUntil: "networkidle" })
  await page.getByLabel(/^username$/i).fill("bursary")
  await page.getByLabel(/^password$/i).fill(bursaryPassword)
  await shot(page, "06-staff-sign-in", "Staff Portal — Bursary desk credentials")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(2000)
  await page.goto(`${STAFF}/payments`, { waitUntil: "networkidle" })
  await page.getByRole("heading", { name: /payment verification/i }).waitFor()
  await page.waitForTimeout(2000)

  const draftRow = page.getByRole("row", { name: /demo draft applicant/i })
  if (await draftRow.count()) await draftRow.click()
  await page.waitForTimeout(500)
  await shot(page, "07-staff-payment-queue", "Staff payment queue — pending Demo Draft Applicant")

  const approve = page.getByRole("button", { name: /approve payment/i })
  await approve.waitFor({ state: "visible" })
  // Force enable check
  for (let i = 0; i < 5 && !(await approve.isEnabled()); i++) {
    if (await draftRow.count()) await draftRow.click()
    await page.getByRole("button", { name: /^refresh$/i }).click().catch(() => {})
    await page.waitForTimeout(1500)
  }
  if (!(await approve.isEnabled())) {
    throw new Error("Approve button stayed disabled — expected pending_verification for completed scenario")
  }
  await approve.click()
  // Wait for success banner or enrolled status
  await page.waitForFunction(
    () => {
      const text = document.body.innerText
      return /Applicant is now a student|Continue as|enrolled/i.test(text) && !/Please correct the highlighted fields/i.test(text)
    },
    { timeout: 60000 },
  ).catch(async () => {
    const alert = await page.locator('[role="alert"]').allInnerTexts().catch(() => [])
    throw new Error(`Approve did not complete. Alerts: ${alert.join(" | ")}`)
  })
  await page.waitForTimeout(1500)
  await shot(page, "08-staff-approved", "Staff approved — applicant enrolled as Demo student")

  // 09 Applicant after enrol
  await context.clearCookies()
  await page.goto(`${APPLICANT}/`, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /draft ready to submit|verified application|completed/i }).first().click()
  // Prefer completed account to see accepted state; if UI shows verified card use that
  const approvedCard = page.getByRole("button", { name: /verified application ready to accept/i })
  // Stay on completed for post-enrol of the same scenario
  await page.getByRole("button", { name: /draft ready to submit/i }).click().catch(() => {})
  await page.getByLabel(/^password$/i).fill(applicants.completed)
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(3000)
  // If still on sign-in (wrong), try approved
  if (await page.getByRole("heading", { name: /sign in to applicant/i }).count()) {
    if (await approvedCard.count()) await approvedCard.click()
    await page.getByLabel(/^password$/i).fill(applicants.approved)
    await page.getByRole("button", { name: /^sign in$/i }).click()
    await page.waitForTimeout(2500)
  }
  await shot(page, "09-applicant-after-enrol", "Applicant after enrolment — accepted / student path")

  // 10–11 Student
  await context.clearCookies()
  await page.goto(STUDENT, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /alya putri/i }).click()
  await page.getByLabel(/student number/i).fill("10029841")
  await page.getByLabel(/^password$/i).fill(students["first-semester-registration"])
  await shot(page, "10-student-sign-in", "Student Portal — Alya Putri (Registration Week)")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(5000)
  // Wait for dashboard chrome
  await page.getByRole("link", { name: /dashboard/i }).first().waitFor({ timeout: 30000 }).catch(() => {})
  await page.waitForTimeout(2000)
  await shot(page, "11-student-home", "Student Portal dashboard after enrolment path")

  writeFileSync(path.join(here, "steps.json"), JSON.stringify({ capturedAt: new Date().toISOString(), steps }, null, 2))
  await browser.close()
  console.log(`done — ${steps.length} screenshots`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
