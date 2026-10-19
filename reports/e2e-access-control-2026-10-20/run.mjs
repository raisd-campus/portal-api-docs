#!/usr/bin/env node
/**
 * Idempotent hosted access walkthrough.
 *
 * Control creates a campus Admin. That Admin grants student, staff, and lecturer
 * access, each account signs in, then the Admin revokes the access and sign-in stops.
 * Fixed emails are reset on every run, so the script can be repeated.
 *
 *   node docs/reports/e2e-access-control-2026-10-20/run.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const SSO = (process.env.SSO_BASE || "https://sso.raisd.co").replace(/\/$/, "")
const API = (process.env.PORTAL_API_BASE || "https://api.raisd.co").replace(/\/$/, "")
const PASSWORD = "raisd2026"
const CAMPUS = "campus-lesotho"
const RETURN = "https://lesotho.raisd.co/?sso=1"
const HERE = dirname(fileURLToPath(import.meta.url))

const STUDENT_PERMISSIONS = ["portal.student", "student.study", "student.register", "student.pay", "student.results", "student.support"]
const STAFF_PERMISSIONS = ["portal.lecturer", "staff.dashboard", "staff.directory", "staff.community"]
const LECTURER_PERMISSIONS = ["portal.lecturer", "lecturer.classrooms", "lecturer.materials", "lecturer.attendance", "lecturer.marking"]

const ACCOUNTS = {
  control: { email: "iman.suherman@raisd.co", password: PASSWORD, roleKey: "control" },
  admin: { email: "e2e.access.admin@raisd.demo", displayName: "E2E Campus Admin", password: PASSWORD, roleKey: "admin" },
  student: { email: "e2e.access.student@raisd.demo", displayName: "E2E Student", password: PASSWORD, roleKey: "student" },
  staff: { email: "e2e.access.staff@raisd.demo", displayName: "E2E Staff", password: PASSWORD, roleKey: "lecturer" },
  lecturer: { email: "e2e.access.lecturer@raisd.demo", displayName: "E2E Lecturer", password: PASSWORD, roleKey: "lecturer" },
}

const steps = []

function assignment(roleKey, permissions, deskTags) {
  return {
    roleKey,
    campusIds: [CAMPUS],
    ...(deskTags ? { deskTags } : {}),
    ...(permissions ? { permissions } : {}),
  }
}

async function request(method, url, { token, body } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      accept: "application/json",
      ...(body ? { "content-type": "application/json" } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text.slice(0, 180) }
  }
  return { status: response.status, data }
}

function record(step) {
  steps.push(step)
  const mark = step.ok ? "ok" : "FAIL"
  console.log(`${mark}  ${step.id}  ${step.title}  ${step.detail}`)
  if (!step.ok) throw new Error(`${step.id} ${step.title}: ${step.detail}`)
}

function hasAll(actual, expected) {
  const set = new Set(actual || [])
  return expected.every((item) => set.has(item))
}

function lacks(actual, forbidden) {
  const set = new Set(actual || [])
  return forbidden.every((item) => !set.has(item))
}

async function login(email, password, roleKey) {
  const started = await request("POST", `${SSO}/v1/auth/channels/password/login`, {
    body: { email, password, returnUrl: RETURN },
  })
  if (started.status !== 200) return { status: started.status, error: started.data?.error || "login failed" }
  let redirect = started.data.redirectTo
  if (String(redirect).includes("step=roles")) {
    const session = new URL(redirect).searchParams.get("session")
    const pending = await request("GET", `${SSO}/v1/session/pending-roles?session=${encodeURIComponent(session)}`)
    const role = (pending.data?.roles || []).find((item) => item.roleKey === roleKey) || pending.data?.roles?.[0]
    if (!role) return { status: 409, error: "No matching role on the picker." }
    const completed = await request("POST", `${SSO}/v1/session/complete-login`, {
      body: { sessionId: session, roleAssignmentId: role.id, returnUrl: RETURN },
    })
    if (completed.status !== 200) return { status: completed.status, error: completed.data?.error || "role selection failed" }
    redirect = completed.data.redirectTo
  }
  const code = new URL(redirect).searchParams.get("code")
  if (!code) return { status: 502, error: "Login did not return an authorization code." }
  const token = await request("POST", `${SSO}/v1/oauth/token`, {
    body: { grant_type: "authorization_code", code },
  })
  if (token.status !== 200) return { status: token.status, error: token.data?.error || "token exchange failed" }
  return {
    status: 200,
    accessToken: token.data.access_token,
    roleKey: token.data.active_role?.roleKey,
    permissions: token.data.active_role?.permissions || [],
    campusIds: token.data.active_role?.campusIds || [],
    deskTags: token.data.active_role?.deskTags || [],
  }
}

async function setDemoPassword(email) {
  const forgot = await request("POST", `${SSO}/v1/auth/channels/password/forgot`, {
    body: { email, returnUrl: RETURN },
  })
  const last = await request("GET", `${SSO}/v1/dev/last-password-reset`)
  if (last.data?.email !== email) {
    throw new Error(`Password reset for ${email} was not the latest reset (${last.data?.email || "none"}).`)
  }
  const token = new URL(last.data.url).searchParams.get("token")
  const reset = await request("POST", `${SSO}/v1/auth/channels/password/reset`, {
    body: { token, password: PASSWORD },
  })
  if (reset.status !== 200) throw new Error(reset.data?.error || `Password reset failed (${reset.status}).`)
  return forgot.status
}

async function findPerson(token, email) {
  const listed = await request("GET", `${SSO}/v1/control/people?q=${encodeURIComponent(email)}`, { token })
  if (listed.status !== 200) throw new Error(listed.data?.error || `List people failed (${listed.status}).`)
  return (listed.data.people || []).find((person) => person.email === email) || null
}

async function ensurePerson(token, spec, assignments) {
  let person = await findPerson(token, spec.email)
  let action = "updated"
  if (!person) {
    const created = await request("POST", `${SSO}/v1/control/people`, {
      token,
      body: { email: spec.email, displayName: spec.displayName, assignments },
    })
    if (created.status === 201 || created.status === 409) {
      person = created.data.person
      action = created.status === 201 ? "created" : "already present"
    } else {
      throw new Error(created.data?.error || `Create failed (${created.status}).`)
    }
  }
  const updated = await request("PUT", `${SSO}/v1/control/people/${encodeURIComponent(person.personId)}/roles`, {
    token,
    body: { assignments },
  })
  if (updated.status !== 200) throw new Error(updated.data?.error || `Role update failed (${updated.status}).`)
  return { person: updated.data.person, action }
}

async function main() {
  const startedAt = new Date().toISOString()

  const health = await request("GET", `${SSO}/health`)
  record({
    id: "01",
    title: "SSO is up",
    ok: health.status === 200 && health.data?.ok === true,
    detail: `GET /health ${health.status}`,
  })

  const control = await login(ACCOUNTS.control.email, ACCOUNTS.control.password, "control")
  record({
    id: "02",
    title: "Control signs in",
    ok: control.status === 200 && control.roleKey === "control" && control.permissions.includes("sso.provision"),
    detail: `${ACCOUNTS.control.email} active role ${control.roleKey || "none"}`,
    actor: ACCOUNTS.control.email,
  })

  const denied = await request("POST", `${SSO}/v1/control/people`, {
    token: control.accessToken,
    body: {
      email: "e2e.access.control-denied@raisd.demo",
      displayName: "E2E Control Denied",
      assignments: [assignment("student", STUDENT_PERMISSIONS)],
    },
  })
  record({
    id: "03",
    title: "Control cannot create a student",
    ok: denied.status === 403,
    detail: denied.data?.error || `HTTP ${denied.status}`,
    actor: ACCOUNTS.control.email,
  })

  const admin = await ensurePerson(control.accessToken, ACCOUNTS.admin, [assignment("admin")])
  const adminRole = admin.person.roles.find((role) => role.roleKey === "admin")
  record({
    id: "04",
    title: "Control creates or refreshes the campus Admin",
    ok: Boolean(adminRole) && adminRole.campusIds.includes(CAMPUS),
    detail: `${admin.action} ${ACCOUNTS.admin.email} on ${CAMPUS}`,
    actor: ACCOUNTS.control.email,
  })

  await setDemoPassword(ACCOUNTS.admin.email)
  const adminLogin = await login(ACCOUNTS.admin.email, PASSWORD, "admin")
  record({
    id: "05",
    title: "Campus Admin signs in",
    ok: adminLogin.status === 200 && adminLogin.roleKey === "admin" && adminLogin.permissions.includes("sso.manage_learners"),
    detail: `active role ${adminLogin.roleKey}, manage learners ${adminLogin.permissions?.includes("sso.manage_learners")}`,
    actor: ACCOUNTS.admin.email,
  })

  const hadLearnerRole = admin.person.roles.some((role) => role.roleKey !== "admin" && role.roleKey !== "control")
  let adminToken = adminLogin.accessToken
  if (hadLearnerRole) {
    const cleared = await request("PUT", `${SSO}/v1/control/people/${encodeURIComponent(admin.person.personId)}/roles`, {
      token: adminLogin.accessToken,
      body: { assignments: [] },
    })
    const stillAdmin = (cleared.data?.person?.roles || []).some((role) => role.roleKey === "admin")
    const learnerLeft = (cleared.data?.person?.roles || []).some((role) => role.roleKey !== "admin" && role.roleKey !== "control")
    record({
      id: "06",
      title: "Campus Admin keeps Admin and drops any learner role on the same account",
      ok: cleared.status === 200 && stillAdmin && !learnerLeft,
      detail: `roles ${(cleared.data?.person?.roles || []).map((role) => role.roleKey).join(", ") || "none"}`,
      actor: ACCOUNTS.admin.email,
    })
    const refreshed = await login(ACCOUNTS.admin.email, PASSWORD, "admin")
    adminToken = refreshed.accessToken
    record({
      id: "06b",
      title: "Campus Admin signs in again after the role id change",
      ok: refreshed.status === 200 && refreshed.roleKey === "admin",
      detail: `active role ${refreshed.roleKey || "none"}`,
      actor: ACCOUNTS.admin.email,
    })
  } else {
    record({
      id: "06",
      title: "Campus Admin account has only the Admin role",
      ok: true,
      detail: "No learner role to remove, so the current Admin token stays valid.",
      actor: ACCOUNTS.admin.email,
    })
  }

  const learners = [
    { key: "student", label: "Student", permissions: STUDENT_PERMISSIONS, forbidden: ["portal.lecturer", "sso.manage_learners"], portalError: "SSO student identity is not linked to a Demo student record." },
    { key: "staff", label: "Staff", permissions: STAFF_PERMISSIONS, forbidden: ["lecturer.classrooms", "sso.manage_learners"], portalError: "SSO lecturer identity is not linked to a Demo teaching record." },
    { key: "lecturer", label: "Lecturer", permissions: LECTURER_PERMISSIONS, forbidden: ["staff.dashboard", "sso.manage_learners"], portalError: "SSO lecturer identity is not linked to a Demo teaching record." },
  ]

  const granted = []
  for (const learner of learners) {
    const spec = ACCOUNTS[learner.key]
    const person = await ensurePerson(adminToken, spec, [assignment(spec.roleKey, learner.permissions)])
    const role = person.person.roles.find((item) => item.roleKey === spec.roleKey)
    const permissions = role?.permissions || []
    record({
      id: `grant-${learner.key}`,
      title: `Campus Admin grants ${learner.label}`,
      ok: person.person.roles.length === 1 && hasAll(permissions, learner.permissions) && lacks(permissions, learner.forbidden) && role.campusIds.includes(CAMPUS),
      detail: `${person.action} ${spec.email} · ${spec.roleKey} · ${permissions.join(", ")}`,
      actor: ACCOUNTS.admin.email,
    })
    await setDemoPassword(spec.email)
    const signedIn = await login(spec.email, PASSWORD, spec.roleKey)
    record({
      id: `login-${learner.key}`,
      title: `${learner.label} signs in`,
      ok: signedIn.status === 200 && signedIn.roleKey === spec.roleKey && hasAll(signedIn.permissions, learner.permissions),
      detail: `${spec.email} active role ${signedIn.roleKey || "none"}`,
      actor: spec.email,
    })
    const exchange = await request("POST", `${API}/v1/auth/sso/exchange`, { body: { accessToken: signedIn.accessToken } })
    record({
      id: `portal-${learner.key}`,
      title: `${learner.label} portal exchange stays on the access boundary`,
      ok: exchange.status === 403 && exchange.data?.error === learner.portalError,
      detail: exchange.data?.error || `HTTP ${exchange.status}`,
      actor: spec.email,
    })
    const manage = await request("GET", `${SSO}/v1/control/people`, { token: signedIn.accessToken })
    record({
      id: `deny-${learner.key}`,
      title: `${learner.label} cannot manage access`,
      ok: manage.status === 403,
      detail: manage.data?.error || `HTTP ${manage.status}`,
      actor: spec.email,
    })
    granted.push({ ...learner, personId: person.person.personId, email: spec.email })
  }

  const adminExchange = await request("POST", `${API}/v1/auth/sso/exchange`, { body: { accessToken: adminToken } })
  record({
    id: "07",
    title: "Campus Admin exchanges into the staff Admin session",
    ok: adminExchange.status === 200 && adminExchange.data?.portal === "admin" && adminExchange.data?.role === "registry",
    detail: `portal ${adminExchange.data?.portal || "none"}, desk ${adminExchange.data?.role || "none"}`,
    actor: ACCOUNTS.admin.email,
  })

  for (const learner of granted) {
    const revoked = await request("PUT", `${SSO}/v1/control/people/${encodeURIComponent(learner.personId)}/roles`, {
      token: adminToken,
      body: { assignments: [] },
    })
    const roles = revoked.data?.person?.roles || []
    record({
      id: `revoke-${learner.key}`,
      title: `Campus Admin revokes ${learner.label}`,
      ok: revoked.status === 200 && roles.length === 0,
      detail: `${learner.email} roles left: ${roles.length}`,
      actor: ACCOUNTS.admin.email,
    })
    const blocked = await login(learner.email, PASSWORD, learner.roleKey)
    record({
      id: `revoked-login-${learner.key}`,
      title: `${learner.label} sign-in stops after revoke`,
      ok: blocked.status === 401,
      detail: blocked.error || `HTTP ${blocked.status}`,
      actor: learner.email,
    })
  }

  const finishedAt = new Date().toISOString()
  const report = {
    title: "E2E access control",
    startedAt,
    finishedAt,
    sso: SSO,
    api: API,
    campusId: CAMPUS,
    password: PASSWORD,
    accounts: Object.fromEntries(Object.entries(ACCOUNTS).map(([key, value]) => [key, value.email])),
    steps,
  }
  mkdirSync(HERE, { recursive: true })
  writeFileSync(join(HERE, "steps.json"), `${JSON.stringify(report, null, 2)}\n`)
  writeFileSync(join(HERE, "index.html"), render(report))
  writeFileSync(join(HERE, "README.md"), readme(report))
  console.log(`PASS  ${steps.length} steps  ${HERE}`)
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function render(report) {
  const rows = report.steps.map((step) => `<tr><td><code>${esc(step.id)}</code></td><td>${esc(step.title)}</td><td>${esc(step.actor || "")}</td><td><span class="status ok">Passed</span></td><td>${esc(step.detail)}</td></tr>`).join("\n")
  const flow = report.steps.map((step) => `<li><strong>${esc(step.title)}.</strong> ${esc(step.detail)}</li>`).join("\n")
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Raisd Campus — E2E access control</title>
<style>
  :root { --ink:#122028; --ink-soft:#334650; --muted:#62747e; --line:#d5e0e5; --accent:#0f6b5d; --accent-deep:#0a4a41; --accent-soft:#e3f2ee; --green:#166534; --green-soft:#dcfce7; --bg:#eef3f6; --panel:#fff; }
  * { box-sizing:border-box; }
  body { margin:0; color:var(--ink); background:var(--bg); font-family:"Source Sans 3","Segoe UI",Calibri,sans-serif; font-size:15px; line-height:1.5; }
  header { background:linear-gradient(135deg,#0a1a1f 0%,#0f3d36 55%,#0f6b5d 100%); color:#f3faf8; padding:2rem 1.5rem 1.75rem; }
  header .wrap, main, footer .wrap { max-width:1040px; margin:0 auto; }
  .kicker { font-size:.74rem; letter-spacing:.14em; text-transform:uppercase; color:#9dcdc2; font-weight:600; margin:0 0 .35rem; }
  header h1 { margin:0 0 .55rem; font-size:1.65rem; font-weight:700; color:#fff; }
  .lede { margin:0; color:#d7ebe6; max-width:48rem; }
  .doc-meta { margin:.95rem 0 0; padding:.9rem 1.05rem; border-radius:8px; background:#fff; border:1px solid #d7e3df; color:#122028; font-size:.95rem; }
  .doc-meta p { margin:0 0 .4rem; } .doc-meta p:last-child { margin:0; } .doc-meta strong { color:#0a4a41; }
  main { padding:1.5rem 1.25rem 2.5rem; }
  section { background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:1.25rem 1.4rem; margin:0 0 1.1rem; }
  h2 { margin:0 0 .75rem; font-size:1.22rem; border-bottom:2px solid var(--accent); padding-bottom:.35rem; }
  p, li { color:var(--ink-soft); }
  table { border-collapse:collapse; width:100%; margin:.75rem 0; font-size:.9rem; }
  th, td { border:1px solid var(--line); padding:.48rem .6rem; text-align:left; vertical-align:top; }
  th { background:var(--accent-soft); color:var(--accent-deep); font-size:.74rem; letter-spacing:.03em; text-transform:uppercase; }
  code { font-family:ui-monospace,Consolas,monospace; font-size:.86em; }
  a { color:var(--accent-deep); }
  .status { display:inline-block; padding:.1rem .45rem; border-radius:4px; font-size:.74rem; font-weight:700; }
  .ok { background:var(--green-soft); color:var(--green); }
  ol.flow { margin:.2rem 0 0; padding-left:1.2rem; } ol.flow li { margin:.35rem 0; }
  footer { color:var(--muted); font-size:.85rem; padding:0 1.25rem 2rem; }
</style>
</head>
<body>
<header><div class="wrap">
  <p class="kicker">Hosted Demo · Lesotho · ${esc(report.finishedAt.slice(0, 10))}</p>
  <h1>Access control, from Control to revoke</h1>
  <p class="lede">Control creates a campus Admin. That Admin grants student, staff, and lecturer access, each person signs in, then the Admin revokes the access and sign-in stops. The same accounts are reset on every run.</p>
  <div class="doc-meta">
    <p><strong>Run:</strong> ${esc(report.startedAt)} → ${esc(report.finishedAt)}</p>
    <p><strong>SSO:</strong> ${esc(report.sso)} · <strong>Portal API:</strong> ${esc(report.api)} · <strong>Campus:</strong> ${esc(report.campusId)}</p>
    <p><strong>Repeat:</strong> <code>node docs/reports/e2e-access-control-2026-10-20/run.mjs</code></p>
  </div>
</div></header>
<main>
  <section>
    <h2>Accounts</h2>
    <p>Every fixture except Control uses the password <code>${esc(report.password)}</code>. Control signs in as <code>${esc(report.accounts.control)}</code> with the same demo password. Staff and Lecturer are both role <code>lecturer</code>. Staff receives the staff preset. Lecturer receives the classroom preset. They are separate people because one role key holds one permission set.</p>
    <table>
      <thead><tr><th>Who</th><th>Email</th><th>What they do</th></tr></thead>
      <tbody>
        <tr><td>Control</td><td><code>${esc(report.accounts.control)}</code></td><td>Creates the campus Admin. Cannot create a student.</td></tr>
        <tr><td>Campus Admin</td><td><code>${esc(report.accounts.admin)}</code></td><td>Grants and revokes student, staff, and lecturer access on ${esc(report.campusId)}.</td></tr>
        <tr><td>Student</td><td><code>${esc(report.accounts.student)}</code></td><td>Signs in with the student preset, then loses access.</td></tr>
        <tr><td>Staff</td><td><code>${esc(report.accounts.staff)}</code></td><td>Signs in with dashboard, directory, and community.</td></tr>
        <tr><td>Lecturer</td><td><code>${esc(report.accounts.lecturer)}</code></td><td>Signs in with classrooms, materials, attendance, and marking.</td></tr>
      </tbody>
    </table>
  </section>
  <section>
    <h2>Flow</h2>
    <ol class="flow">
      ${flow}
    </ol>
  </section>
  <section>
    <h2>Result · ${report.steps.length} passed</h2>
    <table>
      <thead><tr><th>Step</th><th>Action</th><th>Actor</th><th>Result</th><th>Observed</th></tr></thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <p>Student, staff, and lecturer sign-in proves the SSO role. Portal API exchange returns 403 for these fixtures because they are not linked to a Demo student record or a Demo teaching record. The campus Admin exchange opens the staff Admin session as Registry. After revoke, the same password is rejected.</p>
  </section>
</main>
<footer><div class="wrap">Demo access evidence. Checklist Live remains 0%.</div></footer>
</body>
</html>
`
}

function readme(report) {
  return `# E2E Demo — Control Admin, campus access, revoke (${report.finishedAt.slice(0, 10)})

Hosted walkthrough of user creation, sign-in, assignment, and revoke.

- **HTML:** [index.html](./index.html)
- **Live Pages:** https://raisd-campus.github.io/portal-api-docs/reports/e2e-access-control-2026-10-20/
- **Docs:** https://docs.raisd.co/reports/e2e-access-control-2026-10-20/
- **Repeat:** \`node docs/reports/e2e-access-control-2026-10-20/run.mjs\`

The script uses fixed emails. Each run grants the three presets again, checks sign-in, then revokes them. A second run starts from the revoked accounts and passes the same way.

Demo ≠ Live.
`
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
