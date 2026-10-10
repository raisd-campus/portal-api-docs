/**
 * Hosted Demo E2E: Student module registration → Staff Bursary/Faculty → units enrolled.
 *
 *   node docs/reports/e2e-student-module-enrol-2026-10-11/capture.mjs
 */
import { chromium } from "../../../../applicant-portal/node_modules/playwright/index.mjs"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const shots = path.join(here, "screenshots")
const credentialsDir = path.resolve(here, "../../../.credentials")
mkdirSync(shots, { recursive: true })

const students = JSON.parse(readFileSync(path.join(credentialsDir, "demo-students.json"), "utf8"))
const staff = JSON.parse(readFileSync(path.join(credentialsDir, "demo-staff.json"), "utf8"))

const STUDENT = "https://raisd-student-portal.vercel.app"
const STAFF = "https://raisd-staff-portal.vercel.app"
const LECTURER = "https://raisd-lecturer-portal.vercel.app"

const steps = []

async function shot(page, id, title) {
  const file = `${id}.png`
  await page.screenshot({ path: path.join(shots, file), fullPage: true })
  steps.push({ id, title, file })
  console.log("captured", id, title)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } })
  const page = await context.newPage()
  page.setDefaultTimeout(60000)

  // 01 Student sign-in
  await page.goto(STUDENT, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /alya putri/i }).click()
  await page.getByLabel(/student number/i).fill("10029841")
  await page.getByLabel(/^password$/i).fill(students["first-semester-registration"])
  await shot(page, "01-student-sign-in", "Student Portal — Alya Registration Week")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByText("Alya Putri").first().waitFor({ timeout: 45000 })
  await page.waitForTimeout(2000)
  await shot(page, "02-student-home", "Student dashboard before module confirmation")

  // 02 Module registration — prefer in-app nav, fall back to URL with session cookies
  const academic = page.getByText(/^Academic$/i).first()
  if (await academic.count()) await academic.click()
  await page.waitForTimeout(500)
  const modReg = page.getByText(/Module Registration/i).first()
  if (await modReg.count()) await modReg.click()
  else {
    await page.evaluate(() => {
      window.history.pushState({}, "", "/academic/module-registration")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
  }
  await page.waitForTimeout(3500)
  await shot(page, "03-module-registration", "Module Registration — draft selection")

  // Confirm if available
  const confirm = page.getByRole("button", { name: /confirm registration/i })
  if (await confirm.count() && (await confirm.isEnabled())) {
    await confirm.click()
    await page.waitForTimeout(1500)
    await shot(page, "04-confirm-fee-preview", "Confirm registration — fee preview")
    const confirmSubmit = page.getByRole("dialog").getByRole("button", { name: /confirm|submit|register/i }).last()
    if (await confirmSubmit.count()) {
      await confirmSubmit.click()
      await page.waitForTimeout(4000)
    }
  } else {
    // Already submitted / completed — still capture state
    console.log("confirm unavailable — capturing current state")
  }
  await shot(page, "05-registration-submitted", "Registration under review / submitted")

  // Finance invoices (payment path)
  const finance = page.getByText(/^Finance$/i).first()
  if (await finance.count()) {
    await finance.click()
    await page.waitForTimeout(2500)
    await shot(page, "06-finance-invoices", "Finance — registration invoices / payment")
  }

  // Staff Bursary
  await context.clearCookies()
  await page.goto(`${STAFF}/sign-in`, { waitUntil: "networkidle" })
  await page.getByLabel(/^username$/i).fill("bursary")
  await page.getByLabel(/^password$/i).fill(staff.bursary)
  await shot(page, "07-staff-bursary-sign-in", "Staff Portal — Bursary sign-in")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(2000)
  await page.goto(`${STAFF}/registrations`, { waitUntil: "networkidle" })
  await page.waitForTimeout(2500)
  await shot(page, "08-staff-registration-queue", "Staff Registrations — pending Bursary")

  const bursaryApprove = page.getByRole("button", { name: /approve bursary/i })
  if (await bursaryApprove.count() && (await bursaryApprove.isEnabled())) {
    await bursaryApprove.click()
    await page.waitForTimeout(4000)
  }
  await shot(page, "09-staff-bursary-cleared", "Bursary clearance approved")

  // Faculty academic approval — Registry desk (Demo Faculty stand-in)
  await context.clearCookies()
  await page.goto(`${STAFF}/sign-in`, { waitUntil: "networkidle" })
  await page.getByLabel(/^username$/i).fill("registry")
  await page.getByLabel(/^password$/i).fill(staff.registry)
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.waitForTimeout(2000)
  await page.goto(`${STAFF}/registrations`, { waitUntil: "networkidle" })
  await page.waitForTimeout(2500)
  await shot(page, "10-staff-faculty-queue", "Staff Registrations — Faculty approval (Registry)")

  const facultyApprove = page.getByRole("button", { name: /approve faculty|enrol units/i })
  if (await facultyApprove.count() && (await facultyApprove.isEnabled())) {
    await facultyApprove.click()
    await page.waitForTimeout(4000)
  }
  await shot(page, "11-staff-units-enrolled", "Faculty approved — units enrolled")

  // Student modules + materials
  await context.clearCookies()
  await page.goto(STUDENT, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /alya putri/i }).click()
  await page.getByLabel(/student number/i).fill("10029841")
  await page.getByLabel(/^password$/i).fill(students["first-semester-registration"])
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByText("Alya Putri").first().waitFor({ timeout: 45000 })
  await page.waitForTimeout(1500)

  const academic2 = page.getByText(/^Academic$/i).first()
  if (await academic2.count()) await academic2.click()
  await page.waitForTimeout(500)
  const modulesLink = page.getByText(/^Modules$/i).first()
  if (await modulesLink.count()) await modulesLink.click()
  else {
    await page.evaluate(() => {
      window.history.pushState({}, "", "/academic/modules")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
  }
  await page.waitForTimeout(3000)
  await shot(page, "12-student-modules", "Student Modules — registered units")

  const moduleCard = page.locator("a, button").filter({ hasText: /Design|Visual|Communication|Module/i }).first()
  if (await moduleCard.count()) {
    await moduleCard.click()
    await page.waitForTimeout(2000)
    const materialsTab = page.getByText(/Materials|Learning files|Resources/i).first()
    if (await materialsTab.count()) await materialsTab.click()
    await page.waitForTimeout(1500)
  }
  await shot(page, "13-student-materials", "Unit materials available for teaching delivery")

  // Lecturer placeholder
  await page.goto(LECTURER, { waitUntil: "networkidle" })
  await page.waitForTimeout(1500)
  await shot(page, "14-lecturer-placeholder", "Lecturer Portal — Demo placeholder (materials authoring not Live yet)")

  writeFileSync(path.join(here, "steps.json"), JSON.stringify({ capturedAt: new Date().toISOString(), steps }, null, 2))
  await browser.close()
  console.log(`done — ${steps.length} screenshots`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
