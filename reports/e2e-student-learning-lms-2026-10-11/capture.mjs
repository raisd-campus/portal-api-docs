/**
 * Hosted Demo E2E: Lecturer publishes LMS materials → Student opens Materials.
 *
 *   node docs/reports/e2e-student-learning-lms-2026-10-11/capture.mjs
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
const lecturers = JSON.parse(readFileSync(path.join(credentialsDir, "demo-lecturers.json"), "utf8"))

const STUDENT = "https://raisd-student-portal.vercel.app"
const LECTURER = "https://raisd-lecturer-portal.vercel.app"
const API = "https://raisd-portal-api.vercel.app"

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

  // 01 Lecturer sign-in
  await page.goto(`${LECTURER}/sign-in`, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /adam watson/i }).click()
  await page.getByLabel(/^password$/i).fill(lecturers.adam)
  await shot(page, "01-lecturer-sign-in", "Lecturer Portal — Prof. Adam Watson")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByRole("heading", { name: /lecturer workspace/i }).waitFor({ timeout: 45000 })
  await page.waitForTimeout(3000)
  await shot(page, "02-lecturer-workspace", "Lecturer workspace — teaching modules")

  // 02 Materials desk — select FDN101 Alya offering and publish
  await page.goto(`${LECTURER}/materials`, { waitUntil: "networkidle" })
  await page.waitForTimeout(3000)
  const fdnRow = page.locator("tr").filter({ hasText: /FDN101/i }).filter({ hasText: /Alya/i }).first()
  if (await fdnRow.count()) await fdnRow.click()
  else {
    const anyFdn = page.locator("tr").filter({ hasText: /FDN101/i }).first()
    if (await anyFdn.count()) await anyFdn.click()
  }
  await page.waitForTimeout(1000)
  await shot(page, "03-lecturer-materials-desk", "Materials desk — FDN101 selected")

  const title = `Week 1 — Visual systems studio notes ${Date.now().toString().slice(-4)}`
  await page.locator("#title").fill(title)
  await page.locator("#week").fill("1")
  await page.locator("#kind").selectOption("lecture-note")
  await page.getByRole("button", { name: /publish to student materials/i }).click()
  await page.waitForTimeout(4000)
  await shot(page, "04-lecturer-published", "Lecturer published lecture notes to Materials")

  // 03 Student opens Materials
  await context.clearCookies()
  await page.goto(STUDENT, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /alya putri/i }).click()
  await page.getByLabel(/student number/i).fill("10029841")
  await page.getByLabel(/^password$/i).fill(students["first-semester-registration"])
  await shot(page, "05-student-sign-in", "Student Portal — Alya after enrolment")
  await page.getByRole("button", { name: /^sign in$/i }).click()
  await page.getByRole("button", { name: /log out/i }).waitFor({ timeout: 45000 })
  await page.waitForTimeout(2000)

  await page.evaluate(() => {
    window.history.pushState(
      {},
      "",
      "/academic/modules/module-fdn101?semesterId=academic-term-alya-s1&tab=materials",
    )
    window.dispatchEvent(new PopStateEvent("popstate"))
  })
  await page.waitForTimeout(5000)
  await shot(page, "06-student-materials", "Student Materials — FDN101 LMS weeks")

  const weekTrigger = page.getByRole("button", { name: /week 1/i }).first()
  if (await weekTrigger.count()) {
    await weekTrigger.click()
    await page.waitForTimeout(1500)
  } else {
    const week1 = page.getByText(/Week 1/i).first()
    if (await week1.count()) await week1.click()
    await page.waitForTimeout(1500)
  }
  await shot(page, "07-student-week-open", "Student Materials — published item visible")

  // LMS meta catalogue
  await page.goto(`${API}/v1/meta/lms`, { waitUntil: "networkidle" })
  await page.waitForTimeout(500)
  await shot(page, "08-lms-meta-catalogue", "Portal API GET /v1/meta/lms — Demo LMS catalogue")

  writeFileSync(path.join(here, "steps.json"), JSON.stringify({ capturedAt: new Date().toISOString(), steps }, null, 2))
  await browser.close()
  console.log(`done — ${steps.length} screenshots`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
