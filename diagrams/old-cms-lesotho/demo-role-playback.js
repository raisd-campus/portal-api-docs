/**
 * Lesotho Raisd Demo W1–W3 role-by-role storyboard playback.
 * Each scene includes how it is executed on Demo hosts (not Live CMS).
 */
export const ROLES = [
  {
    id: "applicant",
    label: "Applicant",
    portal: "https://apply.lesotho.raisd.co",
    account: "Keychain · completed@raisd.demo (or fresh@raisd.demo)",
    summary: "Apply → fee proof → offer accept (FM-02 / FM-09)",
    scenes: [
      {
        id: "app-signin",
        title: "Sign in to Applicant",
        route: "/sign-in",
        fm: ["FM-01", "FM-02", "FM-14"],
        body: "Open the Lesotho Applicant host and enter via Keychain or SSO.",
        steps: [
          "Open https://apply.lesotho.raisd.co (or Keychain → Applicant Lesotho).",
          "Pick completed@raisd.demo to continue a prepared Demo case, or fresh@raisd.demo for an empty draft.",
          "Land on the Applicant shell — Demo ≠ Live CMS.",
        ],
        durationMs: 7000,
      },
      {
        id: "app-draft",
        title: "Draft and submit application",
        route: "/apply",
        fm: ["FM-02", "FM-05"],
        body: "Complete Lesotho study preferences and submit so the Admissions policy pins.",
        steps: [
          "Open Apply / continue draft.",
          "Set campus to Lesotho; complete personal, academic, and document sections required by the Demo form.",
          "Submit. The case pins campus-lesotho Admissions policy (review flags + catalogues).",
        ],
        durationMs: 7500,
      },
      {
        id: "app-fee",
        title: "Application fee proof",
        route: "/apply · payment",
        fm: ["FM-09", "FM-02"],
        body: "Upload bank proof for the profile-backed LSL application fee (Demo LSL 300).",
        steps: [
          "When the flow asks for payment proof, enter a bank reference.",
          "Upload any small Demo PDF/image as proof (not a real bank receipt).",
          "Save — queue moves to Bursary verification (FM-09).",
        ],
        durationMs: 7000,
      },
      {
        id: "app-eligibility",
        title: "Confirm eligibility",
        route: "/apply · eligibility",
        fm: ["FM-02", "FM-03"],
        body: "After QA verifies documents, confirm eligibility and continue to Offer.",
        steps: [
          "Wait until Staff QA has verified documents (see QA role scenes).",
          "Open the eligibility confirmation popup (intake / faculty / programme).",
          "Confirm — does not enrol yet; unlocks Registry Offer release.",
        ],
        durationMs: 7000,
      },
      {
        id: "app-offer",
        title: "Accept Offer Letter",
        route: "/apply · offer",
        fm: ["FM-02"],
        body: "After Registry releases the Demo Offer, accept enrolment and hand off to Student.",
        steps: [
          "Wait until Registry releases the Offer (Registry role).",
          "Preview / download the DEMO Offer PDF.",
          "Accept Enrolment — Applicant signs out; open Student with the new Demo account.",
        ],
        durationMs: 7500,
      },
    ],
  },
  {
    id: "faculty",
    label: "Faculty Review",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.faculty@raisd.demo",
    summary: "Rank / score / recommendation desk (FM-03 / FM-05 / FM-15)",
    scenes: [
      {
        id: "fac-open",
        title: "Open Admissions review",
        route: "/admin/applicants",
        fm: ["FM-03", "FM-15"],
        body: "Sign in as Lesotho Faculty Review and open the submitted application.",
        steps: [
          "Keychain → lesotho.faculty@raisd.demo → staff.lesotho.raisd.co.",
          "Open Admin → Applicants (Admissions workspace).",
          "Select the submitted Lesotho application from the queue.",
        ],
        durationMs: 7000,
      },
      {
        id: "fac-rank",
        title: "Set rank and score",
        route: "/admin/applicants · review",
        fm: ["FM-03", "FM-05"],
        body: "Lesotho policy enables showRankScore — record Demo rank and score.",
        steps: [
          "On the case detail, find Rank / Score fields (FM-05 flag).",
          "Enter Demo values (any integers in range).",
          "Save the review fields before recording the recommendation.",
        ],
        durationMs: 7000,
      },
      {
        id: "fac-rec",
        title: "Record faculty recommendation",
        route: "/admin/applicants · recommendation",
        fm: ["FM-03", "FM-05"],
        body: "Complete desk 1 of 3 in the faculty → QA → Registry chain.",
        steps: [
          "Choose recommendation outcome (approve / action-required).",
          "Add a short Demo note.",
          "Submit — Progress shows 1/3; next desk is QA.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "qa",
    label: "QA",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.qa@raisd.demo",
    summary: "LGCSE extract and document verify (FM-04 / FM-03)",
    scenes: [
      {
        id: "qa-open",
        title: "Open Document review",
        route: "/admin/document-review",
        fm: ["FM-04", "FM-15"],
        body: "Sign in as Lesotho QA and open the case awaiting extract / verify.",
        steps: [
          "Keychain → lesotho.qa@raisd.demo → staff.lesotho.raisd.co.",
          "Open Admin → Document review (or Applicants → documents desk).",
          "Select the same Lesotho application Faculty just recommended.",
        ],
        durationMs: 7000,
      },
      {
        id: "qa-extract",
        title: "Run LGCSE extract",
        route: "/admin/document-review · extract",
        fm: ["FM-04", "FM-05"],
        body: "Policy sets extractRequired — record Demo LGCSE subject rows.",
        steps: [
          "Trigger extract-document / open extract panel.",
          "Confirm Demo LGCSE (or COSC) certificate rows appear.",
          "Save extract — required before verify-documents succeeds.",
        ],
        durationMs: 7500,
      },
      {
        id: "qa-verify",
        title: "Verify documents",
        route: "/admin/document-review · verify",
        fm: ["FM-04", "FM-03"],
        body: "Complete QA verify so eligibility can proceed for the applicant.",
        steps: [
          "Ensure faculty recommendation and extract are present.",
          "Run Verify documents on the case.",
          "Record QA recommendation if still required for n/3 — Progress moves toward Registry.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "bursary",
    label: "Bursary",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.bursary@raisd.demo",
    summary: "Fee verify, Fees & Fines preview, registration clearance (FM-09 / FM-08)",
    scenes: [
      {
        id: "bur-pay",
        title: "Verify application payment",
        route: "/admin/payments",
        fm: ["FM-09", "FM-03"],
        body: "Approve the Demo application-fee proof in the payments queue.",
        steps: [
          "Keychain → lesotho.bursary@raisd.demo → staff.lesotho.raisd.co.",
          "Open Admin → Payments (Admissions payment reviews).",
          "Select the pending proof → Approve payment (Demo stub — not Live CMS).",
        ],
        durationMs: 7000,
      },
      {
        id: "bur-fees",
        title: "Fees & Fines catalogue preview",
        route: "/admin/fees",
        fm: ["FM-09"],
        body: "Open the Demo LSL catalogue from the campus finance profile.",
        steps: [
          "Open Admin → Fees & Fines.",
          "Confirm Application LSL 300, AcceptanceFee 550, Registration Fee 550, plus walk seeds.",
          "Note: Configure rates / banks / plans are not Live yet.",
        ],
        durationMs: 7000,
      },
      {
        id: "bur-reg",
        title: "Bursary registration clearance",
        route: "/admin/registrations",
        fm: ["FM-08", "FM-09"],
        body: "Clear a student module-registration request; capture NMDS fields when shown.",
        steps: [
          "Open Admin → Registrations → Module requests.",
          "Select a pending request (Lesotho student preferred).",
          "Choose verified-payment or approved-arrangement, add note, approve Bursary desk — watch sponsor/borrower columns.",
        ],
        durationMs: 8000,
      },
    ],
  },
  {
    id: "registry",
    label: "Registry",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.registry@raisd.demo",
    summary: "Offer release, registration desk, 12-tab file (FM-03 / FM-08 / FM-07)",
    scenes: [
      {
        id: "reg-offer",
        title: "Release Offer Letter",
        route: "/admin/applicants · offer",
        fm: ["FM-03"],
        body: "Release the Demo Offer after eligibility + n/3 desks.",
        steps: [
          "Keychain → lesotho.registry@raisd.demo → staff.lesotho.raisd.co.",
          "Open Applicants; select the case with eligibility confirmed and desks complete.",
          "Release Offer Letter — Applicant can now Accept Enrolment.",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-queue",
        title: "Module registration desk",
        route: "/admin/registrations",
        fm: ["FM-08"],
        body: "Complete Faculty side after Bursary clearance; NMDS columns visible.",
        steps: [
          "Open Registrations → Module requests.",
          "If next desk is faculty, approve modules / availability with a note.",
          "Confirm sponsorCode / borrowerReference display for NMDS Demo requests.",
        ],
        durationMs: 7500,
      },
      {
        id: "reg-list",
        title: "Students list",
        route: "/admin/students",
        fm: ["FM-07"],
        body: "Open the Demo registry list from the record graph.",
        steps: [
          "Open Admin → Students.",
          "Confirm Demo enrolled students load (including Lesotho fixture when seeded).",
          "Click a row to open the 12-tab registry file.",
        ],
        durationMs: 6500,
      },
      {
        id: "reg-file-academics",
        title: "Student file — Academics",
        route: "/admin/students · Academics",
        fm: ["FM-07"],
        body: "Walk the Academics tab: programme, term, module grid.",
        steps: [
          "On the open file, select Academics.",
          "Read programme status, term, and module grid (Code / Name / Status / Cr / Mk / Gd).",
          "Remember: Demo graph projection — not Live CAP-53.",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-file-sponsors",
        title: "Student file — Sponsors / Registration",
        route: "/admin/students · Sponsors",
        fm: ["FM-07", "FM-08"],
        body: "Confirm NMDS awards and registration request sponsor fields.",
        steps: [
          "Open Sponsors — funding awards + borrower reference.",
          "Open Registration — requests list with sponsorCode / clearance.",
          "Optionally skim Finance / Documents / Audit tabs for Demo projections.",
        ],
        durationMs: 7500,
      },
    ],
  },
  {
    id: "year-leader",
    label: "Year Leader",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.yearleader@raisd.demo",
    summary: "Narrow Students view (FM-07 / FM-15)",
    scenes: [
      {
        id: "yl-signin",
        title: "Sign in as Year Leader",
        route: "/sign-in",
        fm: ["FM-01", "FM-15"],
        body: "Use the narrow Lesotho Year Leader custom role.",
        steps: [
          "Keychain → lesotho.yearleader@raisd.demo.",
          "Land on staff.lesotho.raisd.co Admin with Overview + Students only (no Access).",
          "Confirm Payments / Access menus are hidden.",
        ],
        durationMs: 6500,
      },
      {
        id: "yl-list",
        title: "Browse enrolled students",
        route: "/admin/students",
        fm: ["FM-07"],
        body: "Open the Demo Students list in campus scope.",
        steps: [
          "Open Admin → Students.",
          "Scan list for programme / term / sponsor columns.",
          "Select a student for read follow-up.",
        ],
        durationMs: 6500,
      },
      {
        id: "yl-file",
        title: "Read registry file",
        route: "/admin/students · file",
        fm: ["FM-07", "FM-15"],
        body: "Open the same 12-tab Demo file read-only for year follow-up.",
        steps: [
          "Open the selected student file.",
          "Step through Academics → Student → Registration tabs.",
          "No Live CAP-53 write — Demo read shell only.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "student",
    label: "Student",
    portal: "https://student.lesotho.raisd.co",
    account: "Keychain · alya@raisd.demo or Lesotho DEV student after accept",
    summary: "Registration with NMDS + finance / CAF (FM-06 / FM-08 / FM-09)",
    scenes: [
      {
        id: "stu-signin",
        title: "Sign in to Student",
        route: "/sign-in",
        fm: ["FM-01", "FM-06", "FM-14"],
        body: "Open the Lesotho Student host with a Demo student account.",
        steps: [
          "Open https://student.lesotho.raisd.co (Keychain Student).",
          "Use alya@raisd.demo or the account created by Accept Enrolment / Lesotho fixture.",
          "Confirm Dashboard loads for the Demo enrolment.",
        ],
        durationMs: 6500,
      },
      {
        id: "stu-reg",
        title: "Submit module registration",
        route: "/registration",
        fm: ["FM-06", "FM-08"],
        body: "Select modules and, when NMDS applies, enter sponsor + borrower.",
        steps: [
          "Open Registration / module selection for the current term.",
          "Choose modules allowed by Demo curriculum rules.",
          "If prompted, enter sponsorCode (e.g. nmds) and borrowerReference — Submit for Staff clearance.",
        ],
        durationMs: 8000,
      },
      {
        id: "stu-finance",
        title: "Finance and CAF",
        route: "/finance",
        fm: ["FM-06", "FM-09"],
        body: "After Staff clearance, review Demo invoices / CAF.",
        steps: [
          "Complete Bursary + Faculty clearance on Staff (see those roles).",
          "Return to Student → Finance / documents.",
          "Open CAF / invoice artefacts labelled DEMO — amounts from finance profile JSON.",
        ],
        durationMs: 7500,
      },
    ],
  },
  {
    id: "control",
    label: "Control",
    portal: "https://control.raisd.co",
    account: "Keychain · sso.admin@raisd.demo (flows.configure)",
    summary: "Lesotho Flows catalogues and position seeds (FM-05 / FM-15)",
    scenes: [
      {
        id: "ctl-flows",
        title: "Open Lesotho Admissions Flows",
        route: "/flows/admissions/campus-lesotho",
        fm: ["FM-05"],
        body: "Open the Control Admissions policy editor for campus-lesotho.",
        steps: [
          "Keychain → sso.admin@raisd.demo → control.raisd.co.",
          "Open Flows → Admissions → Lesotho.",
          "Load current / draft settings (Demo storage).",
        ],
        durationMs: 7000,
      },
      {
        id: "ctl-review",
        title: "Desk review flags",
        route: "/flows · Desk review",
        fm: ["FM-05"],
        body: "Confirm Lesotho review flags for rank, extract, and n/3 desks.",
        steps: [
          "Scroll to Desk review (Lesotho).",
          "Ensure showRankScore and extractRequired are on.",
          "Confirm recommendation desks: faculty → qa → registry (or Use faculty → QA → Registry).",
        ],
        durationMs: 7000,
      },
      {
        id: "ctl-catalogues",
        title: "Load Demo catalogues",
        route: "/flows · Admissions catalogues",
        fm: ["FM-05"],
        body: "Load intake / certificate / subject / school / entry Demo lists.",
        steps: [
          "Open Admissions catalogues (Demo) card.",
          "Click Load Lesotho Demo catalogues.",
          "Validate draft (optional) — publish only if you intend to bump the Demo policy version.",
        ],
        durationMs: 7500,
      },
      {
        id: "ctl-positions",
        title: "Positions note",
        route: "/campuses · roles",
        fm: ["FM-15", "FM-01"],
        body: "Lesotho desk roles are seeded in SSO + Keychain for Demo.",
        steps: [
          "Open Campus members / roles for Lesotho (or rely on Keychain presets).",
          "Confirm custom roles: Registry, QA, Bursary, Faculty Review, Year Leader.",
          "Publishing a Flow never grants portal access — assignments stay on Members.",
        ],
        durationMs: 7500,
      },
    ],
  },
]

/** Portal lookalike frames keyed by scene id (HTML mock, not Live screenshots). */
const UI = {
  "app-signin": {
    url: "https://keychain.raisd.co/",
    toast: "Opening Applicant Demo…",
    html: () => keychainFrame("completed@raisd.demo", "Applicant · Lesotho"),
  },
  "app-draft": {
    url: "https://apply.lesotho.raisd.co/apply",
    toast: "Application submitted",
    html: () =>
      applicantFrame({
        step: 1,
        title: "Draft application",
        body: formCard(
          ["Campus: Lesotho", "Programme: BSc Demo", "Documents: 2 uploaded"],
          "Submit application",
          [0, 1, 2]
        ),
      }),
  },
  "app-fee": {
    url: "https://apply.lesotho.raisd.co/apply?step=payment",
    toast: "Fee proof saved · LSL 300",
    html: () =>
      applicantFrame({
        step: 2,
        title: "Application fee proof",
        body: `
          <div class="card">
            <h4>Bank proof · Demo LSL 300</h4>
            <div class="row"><div class="field hot" data-hot="0">Bank ref: DEMO-REF-8841</div></div>
            <div class="row"><div class="field hot" data-hot="1">📎 payment.pdf</div></div>
            <div class="row"><button class="btn hot" data-hot="2">Save proof</button></div>
          </div>`,
      }),
  },
  "app-eligibility": {
    url: "https://apply.lesotho.raisd.co/apply?step=eligibility",
    toast: "Eligibility confirmed",
    html: () =>
      applicantFrame({
        step: 3,
        title: "Confirm eligibility",
        body: `
          <div class="card">
            <h4>Intake · Faculty · Programme</h4>
            <p class="sub">QA verified documents. Confirm to unlock Offer release.</p>
            <div class="row"><span class="pill hot" data-hot="0">Awaiting confirm</span></div>
            <div class="row"><button class="btn hot" data-hot="1">Open confirmation</button>
            <button class="btn hot" data-hot="2">Confirm eligibility</button></div>
          </div>`,
      }),
  },
  "app-offer": {
    url: "https://apply.lesotho.raisd.co/apply?step=offer",
    toast: "Enrolment accepted → Student",
    html: () =>
      applicantFrame({
        step: 4,
        title: "Offer Letter",
        body: `
          <div class="card">
            <h4>DEMO Offer Letter</h4>
            <p class="sub">Registry released · PDF ready</p>
            <div class="row"><button class="btn ghost hot" data-hot="0">Preview PDF</button>
            <button class="btn hot" data-hot="1">Download</button>
            <button class="btn hot" data-hot="2">Accept Enrolment</button></div>
          </div>`,
      }),
  },
  "fac-open": {
    url: "https://staff.lesotho.raisd.co/admin/applicants",
    toast: "Case opened",
    html: () =>
      staffFrame({
        nav: "Applicants",
        role: "Faculty Review",
        title: "Admissions · Applicants",
        body: tableCard(
          ["Applicant", "Campus", "Status", "Desk"],
          [
            ["Alya M.", "Lesotho", "Submitted", "Faculty"],
            ["Demo Case", "Lesotho", "Draft", "—"],
          ],
          0,
          [0, 1, 0]
        ),
      }),
  },
  "fac-rank": {
    url: "https://staff.lesotho.raisd.co/admin/applicants/review",
    toast: "Rank / score saved",
    html: () =>
      staffFrame({
        nav: "Applicants",
        role: "Faculty Review",
        title: "Review · Rank & score",
        body: `
          <div class="card">
            <h4>showRankScore · Lesotho policy</h4>
            <div class="row"><div class="field hot" data-hot="0">Rank: 12</div>
            <div class="field hot" data-hot="1">Score: 78</div></div>
            <div class="row"><button class="btn hot" data-hot="2">Save review fields</button></div>
          </div>`,
      }),
  },
  "fac-rec": {
    url: "https://staff.lesotho.raisd.co/admin/applicants/recommendation",
    toast: "Recommendation 1/3",
    html: () =>
      staffFrame({
        nav: "Applicants",
        role: "Faculty Review",
        title: "Faculty recommendation",
        body: `
          <div class="card">
            <h4>Desk 1 of 3 · faculty → QA → Registry</h4>
            <div class="row"><button class="btn hot" data-hot="0">Approve</button>
            <button class="btn ghost hot" data-hot="1">Action required</button></div>
            <div class="row"><div class="field hot" data-hot="2">Note: Demo faculty OK</div>
            <button class="btn hot" data-hot="2">Submit</button></div>
            <p class="sub"><span class="pill">Progress 1/3</span></p>
          </div>`,
      }),
  },
  "qa-open": {
    url: "https://staff.lesotho.raisd.co/admin/document-review",
    toast: "Document desk",
    html: () =>
      staffFrame({
        nav: "Documents",
        role: "QA",
        title: "Document review",
        body: tableCard(
          ["Applicant", "Extract", "Verify", "Desk"],
          [["Alya M.", "Pending", "—", "QA"]],
          0,
          [0, 1, 0]
        ),
      }),
  },
  "qa-extract": {
    url: "https://staff.lesotho.raisd.co/admin/document-review?panel=extract",
    toast: "LGCSE extract saved",
    html: () =>
      staffFrame({
        nav: "Documents",
        role: "QA",
        title: "LGCSE extract",
        body: `
          <div class="card">
            <h4>extractRequired · Demo certificate rows</h4>
            <div class="row"><button class="btn hot" data-hot="0">Run extract</button></div>
            <table class="table hot" data-hot="1"><thead><tr><th>Subject</th><th>Grade</th></tr></thead>
            <tbody><tr><td>Mathematics</td><td>B</td></tr><tr><td>English</td><td>C</td></tr></tbody></table>
            <div class="row"><button class="btn hot" data-hot="2">Save extract</button></div>
          </div>`,
      }),
  },
  "qa-verify": {
    url: "https://staff.lesotho.raisd.co/admin/document-review?panel=verify",
    toast: "Documents verified",
    html: () =>
      staffFrame({
        nav: "Documents",
        role: "QA",
        title: "Verify documents",
        body: `
          <div class="card">
            <div class="row"><span class="pill hot" data-hot="0">Faculty ✓ · Extract ✓</span></div>
            <div class="row"><button class="btn hot" data-hot="1">Verify documents</button>
            <button class="btn ghost hot" data-hot="2">QA recommendation</button></div>
          </div>`,
      }),
  },
  "bur-pay": {
    url: "https://staff.lesotho.raisd.co/admin/payments",
    toast: "Payment approved",
    html: () =>
      staffFrame({
        nav: "Payments",
        role: "Bursary",
        title: "Application payments",
        body: tableCard(
          ["Ref", "Amount", "Proof", "Action"],
          [["DEMO-REF-8841", "LSL 300", "payment.pdf", "Pending"]],
          0,
          [0, 1, 2],
          `<div class="row" style="margin-top:8px"><button class="btn hot" data-hot="2">Approve payment</button></div>`
        ),
      }),
  },
  "bur-fees": {
    url: "https://staff.lesotho.raisd.co/admin/fees",
    toast: "Catalogue · LSL",
    html: () =>
      staffFrame({
        nav: "Fees",
        role: "Bursary",
        title: "Fees & Fines · Lesotho",
        body: `
          <div class="card hot" data-hot="0">
            <h4>Campus finance profile</h4>
            <table class="table"><thead><tr><th>Fee</th><th>Amount</th></tr></thead>
            <tbody>
              <tr class="hot" data-hot="1"><td>Application</td><td>LSL 300</td></tr>
              <tr><td>AcceptanceFee</td><td>LSL 550</td></tr>
              <tr class="hot" data-hot="2"><td>Registration Fee</td><td>LSL 550</td></tr>
            </tbody></table>
            <p class="sub">Configure rates / banks — not Live yet</p>
          </div>`,
      }),
  },
  "bur-reg": {
    url: "https://staff.lesotho.raisd.co/admin/registrations",
    toast: "Bursary clearance OK",
    html: () =>
      staffFrame({
        nav: "Registrations",
        role: "Bursary",
        title: "Module registration · Bursary desk",
        body: `
          <div class="card">
            <table class="table"><thead><tr><th>Student</th><th>Sponsor</th><th>Borrower</th><th>Desk</th></tr></thead>
            <tbody><tr class="hot" data-hot="0" data-sel="true"><td>10029841</td><td>nmds</td><td>BR-4421</td><td>Bursary</td></tr></tbody></table>
            <div class="row"><button class="btn ghost hot" data-hot="1">verified-payment</button>
            <button class="btn hot" data-hot="2">Approve Bursary</button></div>
          </div>`,
      }),
  },
  "reg-offer": {
    url: "https://staff.lesotho.raisd.co/admin/applicants?view=offer",
    toast: "Offer released",
    html: () =>
      staffFrame({
        nav: "Applicants",
        role: "Registry",
        title: "Release Offer Letter",
        body: `
          <div class="card">
            <div class="row"><span class="pill hot" data-hot="0">Eligibility ✓ · Desks 3/3</span></div>
            <div class="row"><button class="btn hot" data-hot="1">Select case</button>
            <button class="btn hot" data-hot="2">Release Offer Letter</button></div>
          </div>`,
      }),
  },
  "reg-queue": {
    url: "https://staff.lesotho.raisd.co/admin/registrations",
    toast: "Faculty desk cleared",
    html: () =>
      staffFrame({
        nav: "Registrations",
        role: "Registry",
        title: "Module requests · Faculty desk",
        body: `
          <div class="card">
            <table class="table hot" data-hot="0"><thead><tr><th>Student</th><th>sponsorCode</th><th>Next</th></tr></thead>
            <tbody><tr data-sel="true"><td>10029841</td><td>nmds</td><td>Faculty</td></tr></tbody></table>
            <div class="row"><button class="btn hot" data-hot="1">Approve modules</button>
            <span class="pill blue hot" data-hot="2">NMDS columns</span></div>
          </div>`,
      }),
  },
  "reg-list": {
    url: "https://staff.lesotho.raisd.co/admin/students",
    toast: "Registry list",
    html: () =>
      staffFrame({
        nav: "Students",
        role: "Registry",
        title: "Students · Demo registry",
        body: tableCard(
          ["ID", "Name", "Programme", "Term"],
          [
            ["10029841", "Alya M.", "BSc Demo", "2026-1"],
            ["10029100", "Lesotho DEV", "Dip Demo", "2026-1"],
          ],
          0,
          [0, 1, 0]
        ),
      }),
  },
  "reg-file-academics": {
    url: "https://staff.lesotho.raisd.co/admin/students/10029841?tab=academics",
    toast: "Academics tab",
    html: () =>
      staffFrame({
        nav: "Students",
        role: "Registry",
        title: "Student file · 10029841",
        body: fileTabs(
          "Academics",
          `
          <div class="card hot" data-hot="0">
            <h4>Programme · term · modules</h4>
            <table class="table hot" data-hot="1"><thead><tr><th>Code</th><th>Name</th><th>Status</th><th>Cr</th></tr></thead>
            <tbody><tr><td>CS101</td><td>Intro</td><td>Active</td><td>12</td></tr></tbody></table>
            <p class="sub hot" data-hot="2">Demo graph · not Live CAP-53</p>
          </div>`
        ),
      }),
  },
  "reg-file-sponsors": {
    url: "https://staff.lesotho.raisd.co/admin/students/10029841?tab=sponsors",
    toast: "Sponsors / Registration",
    html: () =>
      staffFrame({
        nav: "Students",
        role: "Registry",
        title: "Student file · Sponsors",
        body: fileTabs(
          "Sponsors",
          `
          <div class="card">
            <h4 class="hot" data-hot="0">NMDS awards · borrower BR-4421</h4>
            <p class="sub hot" data-hot="1">Registration requests · sponsorCode nmds</p>
            <div class="row"><span class="pill hot" data-hot="2">Finance</span>
            <span class="pill">Documents</span><span class="pill">Audit</span></div>
          </div>`
        ),
      }),
  },
  "yl-signin": {
    url: "https://staff.lesotho.raisd.co/admin",
    toast: "Year Leader shell",
    html: () =>
      staffFrame({
        nav: "Overview",
        role: "Year Leader",
        narrow: true,
        title: "Admin · narrow role",
        body: `
          <div class="card">
            <div class="row"><span class="pill hot" data-hot="0">lesotho.yearleader@raisd.demo</span></div>
            <div class="row"><span class="pill hot" data-hot="1">Overview + Students only</span>
            <span class="pill amber hot" data-hot="2">Payments / Access hidden</span></div>
          </div>`,
      }),
  },
  "yl-list": {
    url: "https://staff.lesotho.raisd.co/admin/students",
    toast: "Students list",
    html: () =>
      staffFrame({
        nav: "Students",
        role: "Year Leader",
        narrow: true,
        title: "Enrolled students",
        body: tableCard(
          ["ID", "Programme", "Term", "Sponsor"],
          [["10029841", "BSc Demo", "2026-1", "nmds"]],
          0,
          [0, 1, 0]
        ),
      }),
  },
  "yl-file": {
    url: "https://staff.lesotho.raisd.co/admin/students/10029841",
    toast: "Read-only file",
    html: () =>
      staffFrame({
        nav: "Students",
        role: "Year Leader",
        narrow: true,
        title: "Student file · read",
        body: fileTabs(
          "Academics",
          `
          <div class="card">
            <div class="row"><span class="pill hot" data-hot="0">File open</span></div>
            <div class="row"><span class="tab hot" data-hot="1" data-on="true">Academics</span>
            <span class="tab">Student</span><span class="tab hot" data-hot="1">Registration</span></div>
            <p class="sub hot" data-hot="2">No Live CAP-53 write</p>
          </div>`
        ),
      }),
  },
  "stu-signin": {
    url: "https://student.lesotho.raisd.co/",
    toast: "Dashboard loaded",
    html: () =>
      studentFrame({
        nav: "Dashboard",
        title: "Student dashboard",
        body: `
          <div class="card">
            <div class="row"><span class="pill hot" data-hot="0">student.lesotho.raisd.co</span></div>
            <div class="row"><div class="field hot" data-hot="1">alya@raisd.demo · 10029841</div></div>
            <div class="row"><span class="pill hot" data-hot="2">Enrolment active · Demo</span></div>
          </div>`,
      }),
  },
  "stu-reg": {
    url: "https://student.lesotho.raisd.co/registration",
    toast: "Registration submitted",
    html: () =>
      studentFrame({
        nav: "Registration",
        title: "Module registration",
        body: `
          <div class="card">
            <div class="row"><div class="field hot" data-hot="0">Term 2026-1 · select modules</div></div>
            <div class="row"><label class="field hot" data-hot="1"><input type="checkbox" checked disabled> CS101 Intro</label>
            <label class="field"><input type="checkbox" checked disabled> CS102 Lab</label></div>
            <div class="row"><div class="field hot" data-hot="2">sponsorCode: nmds</div>
            <div class="field hot" data-hot="2">borrower: BR-4421</div>
            <button class="btn hot" data-hot="2">Submit</button></div>
          </div>`,
      }),
  },
  "stu-finance": {
    url: "https://student.lesotho.raisd.co/finance",
    toast: "CAF / invoice · DEMO",
    html: () =>
      studentFrame({
        nav: "Finance",
        title: "Finance & CAF",
        body: `
          <div class="card">
            <div class="row"><span class="pill amber hot" data-hot="0">Awaiting Staff clearance…</span></div>
            <div class="row"><button class="btn ghost hot" data-hot="1">Open Finance</button></div>
            <div class="row"><div class="field hot" data-hot="2">CAF · DEMO · LSL from finance profile</div></div>
          </div>`,
      }),
  },
  "ctl-flows": {
    url: "https://control.raisd.co/flows/admissions/campus-lesotho",
    toast: "Lesotho Flows",
    html: () =>
      controlFrame({
        nav: "Flows",
        title: "Admissions · campus-lesotho",
        body: `
          <div class="card">
            <div class="row"><span class="pill hot" data-hot="0">sso.admin@raisd.demo</span></div>
            <div class="row"><button class="btn hot" data-hot="1">Flows → Admissions → Lesotho</button></div>
            <div class="row"><span class="pill blue hot" data-hot="2">Draft settings loaded</span></div>
          </div>`,
      }),
  },
  "ctl-review": {
    url: "https://control.raisd.co/flows/admissions/campus-lesotho#desk-review",
    toast: "Desk flags OK",
    html: () =>
      controlFrame({
        nav: "Flows",
        title: "Desk review · Lesotho",
        body: `
          <div class="card hot" data-hot="0">
            <h4>Desk review flags</h4>
            <div class="row"><label class="field hot" data-hot="1"><input type="checkbox" checked disabled> showRankScore</label>
            <label class="field hot" data-hot="1"><input type="checkbox" checked disabled> extractRequired</label></div>
            <p class="sub hot" data-hot="2">Desks: faculty → qa → registry</p>
          </div>`,
      }),
  },
  "ctl-catalogues": {
    url: "https://control.raisd.co/flows/admissions/campus-lesotho#catalogues",
    toast: "Demo catalogues loaded",
    html: () =>
      controlFrame({
        nav: "Flows",
        title: "Admissions catalogues",
        body: `
          <div class="card">
            <h4 class="hot" data-hot="0">Intake · certificate · subject · school · entry</h4>
            <div class="row"><button class="btn hot" data-hot="1">Load Lesotho Demo catalogues</button></div>
            <div class="row"><button class="btn ghost hot" data-hot="2">Validate draft</button></div>
          </div>`,
      }),
  },
  "ctl-positions": {
    url: "https://control.raisd.co/campuses/lesotho/roles",
    toast: "Roles seeded via Keychain",
    html: () =>
      controlFrame({
        nav: "Campuses",
        title: "Lesotho · members / roles",
        body: `
          <div class="card">
            <div class="row"><button class="btn ghost hot" data-hot="0">Open campus roles</button></div>
            <div class="row"><span class="pill hot" data-hot="1">Registry</span>
            <span class="pill hot" data-hot="1">QA</span>
            <span class="pill hot" data-hot="1">Bursary</span>
            <span class="pill hot" data-hot="1">Faculty</span>
            <span class="pill hot" data-hot="1">Year Leader</span></div>
            <p class="sub hot" data-hot="2">Publishing Flow ≠ granting access</p>
          </div>`,
      }),
  },
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formCard(fields, cta, hotIdx) {
  const rows = fields
    .map(
      (f, i) =>
        `<div class="row"><div class="field hot" data-hot="${hotIdx[i] ?? i}">${esc(f)}</div></div>`
    )
    .join("")
  return `<div class="card">${rows}<div class="row"><button class="btn hot" data-hot="${hotIdx[hotIdx.length - 1] ?? 2}">${esc(cta)}</button></div></div>`
}

function tableCard(headers, rows, sel, hotMap, extra = "") {
  const th = headers.map((h) => `<th>${esc(h)}</th>`).join("")
  const body = rows
    .map((r, ri) => {
      const cells = r.map((c) => `<td>${esc(c)}</td>`).join("")
      const hot = hotMap?.[ri] != null ? ` class="hot" data-hot="${hotMap[ri]}"` : ""
      const selAttr = ri === sel ? ` data-sel="true"` : ""
      return `<tr${hot}${selAttr}>${cells}</tr>`
    })
    .join("")
  return `<div class="card"><table class="table"><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table>${extra}</div>`
}

function fileTabs(active, inner) {
  const tabs = [
    "Student",
    "Academics",
    "Registration",
    "Sponsors",
    "Finance",
    "Documents",
  ]
  const bar = tabs
    .map(
      (t) =>
        `<span class="tab${t === active ? " hot" : ""}" data-hot="${t === active ? "0" : ""}" data-on="${t === active ? "true" : "false"}">${t}</span>`
    )
    .join("")
  return `<div class="tabs">${bar}</div>${inner}`
}

function keychainFrame(account, portalLabel) {
  return `
    <div class="pshell" data-layout="top">
      <div class="ptop"><strong>Raisd Keychain</strong><span>Demo accounts</span></div>
      <div class="pmain">
        <h3>Pick a Demo account</h3>
        <p class="sub">Demo ≠ Live · one-click portal handoff</p>
        <div class="kc-grid">
          <div class="kc-card hot" data-hot="0"><strong>${esc(account)}</strong><span>${esc(portalLabel)}</span></div>
          <div class="kc-card hot" data-hot="1"><strong>fresh@raisd.demo</strong><span>Empty draft</span></div>
          <div class="kc-card hot" data-hot="2"><strong>Continue →</strong><span>Applicant shell</span></div>
        </div>
      </div>
    </div>`
}

function applicantFrame({ step, title, body }) {
  const labels = ["Draft", "Fee", "Eligibility", "Offer", "Done"]
  const bar = labels
    .map(
      (l, i) =>
        `<span data-on="${i === step ? "true" : "false"}">${esc(l)}</span>`
    )
    .join("")
  return `
    <div class="pshell" data-layout="top">
      <div class="ptop"><strong>Raisd Applicant · Lesotho</strong><span>apply.lesotho.raisd.co</span></div>
      <div class="pmain">
        <div class="steps-bar">${bar}</div>
        <h3>${esc(title)}</h3>
        ${body}
      </div>
    </div>`
}

function staffNav(active, narrow) {
  const items = narrow
    ? ["Overview", "Students"]
    : ["Overview", "Applicants", "Documents", "Payments", "Fees", "Registrations", "Students", "Access"]
  return items
    .map(
      (n) =>
        `<div class="nav-item${n === active ? " hot" : ""}" data-on="${n === active ? "true" : "false"}" data-hot="${n === active ? "1" : ""}">${n}</div>`
    )
    .join("")
}

function staffFrame({ nav, role, title, body, narrow = false }) {
  return `
    <div class="pshell">
      <aside class="pside">
        <div class="brand"><img src="../assets/raisd-logo.svg" alt="" /> Staff</div>
        ${staffNav(nav, narrow)}
        <div style="margin-top:auto;padding:8px;font-size:11px;opacity:.75">${esc(role)}</div>
      </aside>
      <div class="pmain">
        <h3>${esc(title)}</h3>
        <p class="sub">staff.lesotho.raisd.co · Demo ≠ Live</p>
        ${body}
      </div>
    </div>`
}

function studentFrame({ nav, title, body }) {
  const items = ["Dashboard", "Registration", "Finance", "Learning"]
  const side = items
    .map(
      (n) =>
        `<div class="nav-item" data-on="${n === nav ? "true" : "false"}">${n}</div>`
    )
    .join("")
  return `
    <div class="pshell">
      <aside class="pside">
        <div class="brand"><img src="../assets/raisd-logo.svg" alt="" /> Student</div>
        ${side}
      </aside>
      <div class="pmain">
        <h3>${esc(title)}</h3>
        <p class="sub">student.lesotho.raisd.co · Demo</p>
        ${body}
      </div>
    </div>`
}

function controlFrame({ nav, title, body }) {
  const items = ["Overview", "Flows", "Campuses", "Members"]
  const side = items
    .map(
      (n) =>
        `<div class="nav-item" data-on="${n === nav ? "true" : "false"}">${n}</div>`
    )
    .join("")
  return `
    <div class="pshell">
      <aside class="pside">
        <div class="brand"><img src="../assets/raisd-logo.svg" alt="" /> Control</div>
        ${side}
      </aside>
      <div class="pmain">
        <h3>${esc(title)}</h3>
        <p class="sub">control.raisd.co · Demo policy</p>
        ${body}
      </div>
    </div>`
}

function renderUiHtml(sceneId) {
  const frame = UI[sceneId]
  if (!frame) {
    return `<div class="pmain"><div class="card"><h4>Demo scene</h4><p class="sub">${esc(sceneId)}</p></div></div>`
  }
  return typeof frame.html === "function" ? frame.html() : frame.html
}

export function flattenScenes(roles = ROLES) {
  const flat = []
  roles.forEach((role, roleIndex) => {
    role.scenes.forEach((scene, sceneIndex) => {
      flat.push({ role, roleIndex, scene, sceneIndex })
    })
  })
  return flat
}

export function createPlayer(options) {
  const {
    roles = ROLES,
    roleListEl,
    stageEl,
    roleBadgeEl,
    portalEl,
    accountEl,
    routeEl,
    titleEl,
    bodyEl,
    stepsEl,
    fmEl,
    browserEl,
    browserUrlEl,
    browserViewEl,
    cursorEl,
    toastEl,
    progressRoleEl,
    progressAllEl,
    statusEl,
    playBtn,
    pauseBtn,
    prevBtn,
    nextBtn,
    speedBtn,
  } = options

  const flat = flattenScenes(roles)
  let index = 0
  let playing = false
  let speed = 1
  let timer = null
  let stepTimer = null
  let stepHighlight = 0

  function totalCount() {
    return flat.length
  }

  function current() {
    return flat[index] ?? flat[0]
  }

  function clearTimer() {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
    if (stepTimer != null) {
      clearInterval(stepTimer)
      stepTimer = null
    }
  }

  function moveCursorToHot(stepIdx) {
    if (!browserEl || !cursorEl || !browserViewEl) return
    const hots = browserViewEl.querySelectorAll(".hot")
    hots.forEach((el) => {
      const hot = Number(el.getAttribute("data-hot"))
      el.setAttribute("data-active", hot === stepIdx ? "true" : "false")
    })
    const target =
      browserViewEl.querySelector(`.hot[data-hot="${stepIdx}"]`) ||
      browserViewEl.querySelector(".hot")
    if (!target) {
      cursorEl.setAttribute("data-visible", "false")
      return
    }
    const br = browserEl.getBoundingClientRect()
    const tr = target.getBoundingClientRect()
    const x = tr.left - br.left + Math.min(tr.width * 0.65, tr.width - 8)
    const y = tr.top - br.top + Math.min(tr.height * 0.55, tr.height - 8)
    cursorEl.style.left = `${Math.max(8, x)}px`
    cursorEl.style.top = `${Math.max(40, y)}px`
    cursorEl.setAttribute("data-visible", "true")
    cursorEl.setAttribute("data-click", "false")
    requestAnimationFrame(() => {
      cursorEl.setAttribute("data-click", "true")
      setTimeout(() => cursorEl.setAttribute("data-click", "false"), 380)
    })
  }

  function showToast(sceneId, stepIdx, stepCount) {
    if (!toastEl) return
    const frame = UI[sceneId]
    const show = stepIdx >= Math.max(0, (stepCount || 1) - 1)
    if (show && frame?.toast) {
      toastEl.textContent = frame.toast
      toastEl.setAttribute("data-show", "true")
    } else {
      toastEl.setAttribute("data-show", "false")
    }
  }

  function highlightSteps(steps) {
    if (!stepsEl) return
    const items = stepsEl.querySelectorAll("li")
    items.forEach((li, i) => {
      li.setAttribute("data-active", i === stepHighlight ? "true" : "false")
    })
    moveCursorToHot(stepHighlight)
    const { scene } = current()
    showToast(scene.id, stepHighlight, steps?.length || 0)
  }

  function startStepPulse(steps) {
    if (!steps?.length) {
      moveCursorToHot(0)
      return
    }
    stepHighlight = 0
    highlightSteps(steps)
    if (!playing) return
    const per = Math.max(
      1400,
      Math.round(((current().scene.durationMs || 7000) / speed) / steps.length)
    )
    stepTimer = setInterval(() => {
      stepHighlight = Math.min(steps.length - 1, stepHighlight + 1)
      highlightSteps(steps)
      if (stepHighlight >= steps.length - 1 && stepTimer) {
        clearInterval(stepTimer)
        stepTimer = null
      }
    }, per)
  }

  function schedule() {
    clearTimer()
    if (!playing) return
    const { scene } = current()
    startStepPulse(scene.steps || [])
    const ms = Math.max(2800, Math.round((scene.durationMs || 7000) / speed))
    timer = setTimeout(() => {
      if (index >= totalCount() - 1) {
        playing = false
        updateChrome()
        if (statusEl) statusEl.textContent = "Finished all roles"
        return
      }
      index += 1
      render()
      schedule()
    }, ms)
  }

  function renderRoleList() {
    if (!roleListEl) return
    roleListEl.innerHTML = ""
    roles.forEach((role, roleIndex) => {
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "role-item"
      btn.dataset.roleId = role.id
      btn.setAttribute(
        "aria-current",
        current().roleIndex === roleIndex ? "true" : "false"
      )
      btn.innerHTML = `<span class="role-ord">${roleIndex + 1}</span><span class="role-meta"><strong>${role.label}</strong><span>${role.summary}</span></span>`
      btn.addEventListener("click", () => {
        const first = flat.findIndex((f) => f.roleIndex === roleIndex)
        if (first < 0) return
        playing = false
        clearTimer()
        index = first
        render()
        updateChrome()
        const url = new URL(location.href)
        url.searchParams.set("role", role.id)
        history.replaceState(null, "", url)
      })
      roleListEl.appendChild(btn)
    })
  }

  function sceneUrl(role, scene) {
    const frame = UI[scene.id]
    if (frame?.url) return frame.url
    const path = (scene.route || "").split("·")[0].trim()
    if (!path || path === "/") return role.portal
    return `${role.portal.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`
  }

  function renderBrowser(role, scene) {
    // Re-query in case refs were stale; Pages HTML/JS can cache independently.
    const urlEl = browserUrlEl || document.getElementById("browser-url")
    const viewEl = browserViewEl || document.getElementById("browser-view")
    const toast = toastEl || document.getElementById("demo-toast")
    const url = sceneUrl(role, scene)
    if (urlEl) urlEl.textContent = url
    if (viewEl) {
      viewEl.innerHTML = renderUiHtml(scene.id)
      if (!viewEl.firstElementChild) {
        viewEl.innerHTML = `<div class="pmain"><div class="card"><h4>${scene.title || "Demo"}</h4><p class="sub">${url}</p></div></div>`
      }
    }
    if (toast) toast.setAttribute("data-show", "false")
  }

  function render() {
    const { role, scene, sceneIndex } = current()
    if (roleBadgeEl) roleBadgeEl.textContent = role.label
    if (portalEl) {
      portalEl.textContent = role.portal
      if (role.portal.startsWith("http")) {
        portalEl.href = role.portal
      } else {
        portalEl.removeAttribute("href")
      }
    }
    if (accountEl) accountEl.textContent = role.account || ""
    if (routeEl) routeEl.textContent = scene.route
    if (titleEl) titleEl.textContent = scene.title
    if (bodyEl) bodyEl.textContent = scene.body
    renderBrowser(role, scene)
    if (stepsEl) {
      stepsEl.innerHTML = ""
      const heading = document.createElement("h3")
      heading.className = "exec-heading"
      heading.textContent = "How executed"
      stepsEl.appendChild(heading)
      const ol = document.createElement("ol")
      ol.className = "exec-steps"
      for (const step of scene.steps || []) {
        const li = document.createElement("li")
        li.textContent = step
        ol.appendChild(li)
      }
      stepsEl.appendChild(ol)
      stepHighlight = 0
      // layout then place cursor
      requestAnimationFrame(() => highlightSteps(scene.steps || []))
    }
    if (fmEl) {
      fmEl.innerHTML = ""
      for (const tag of scene.fm) {
        const span = document.createElement("span")
        span.className = "tag tag-partial"
        span.textContent = tag
        fmEl.appendChild(span)
      }
      const demo = document.createElement("span")
      demo.className = "tag tag-out"
      demo.textContent = "Demo ≠ Live"
      fmEl.appendChild(demo)
    }
    if (stageEl) {
      stageEl.dataset.role = role.id
      stageEl.dataset.scene = scene.id
    }
    if (progressRoleEl) {
      const n = role.scenes.length
      progressRoleEl.style.width = `${((sceneIndex + 1) / n) * 100}%`
      progressRoleEl.parentElement?.setAttribute(
        "aria-valuenow",
        String(sceneIndex + 1)
      )
      progressRoleEl.parentElement?.setAttribute("aria-valuemax", String(n))
    }
    if (progressAllEl) {
      progressAllEl.style.width = `${((index + 1) / totalCount()) * 100}%`
      progressAllEl.parentElement?.setAttribute(
        "aria-valuenow",
        String(index + 1)
      )
      progressAllEl.parentElement?.setAttribute(
        "aria-valuemax",
        String(totalCount())
      )
    }
    if (statusEl) {
      statusEl.textContent = `Role ${current().roleIndex + 1}/${roles.length} · Scene ${sceneIndex + 1}/${role.scenes.length} · ${index + 1}/${totalCount()}`
    }
    renderRoleList()
    updateChrome()
  }

  function updateChrome() {
    if (playBtn) playBtn.disabled = playing
    if (pauseBtn) pauseBtn.disabled = !playing
    if (prevBtn) prevBtn.disabled = index <= 0
    if (nextBtn) nextBtn.disabled = index >= totalCount() - 1
    if (speedBtn) speedBtn.textContent = `${speed}×`
  }

  function play() {
    playing = true
    if (index >= totalCount() - 1) {
      index = 0
      render()
    }
    updateChrome()
    schedule()
  }

  function pause() {
    playing = false
    clearTimer()
    updateChrome()
    if (statusEl) {
      const { sceneIndex } = current()
      statusEl.textContent = `Paused · Role ${current().roleIndex + 1}/${roles.length} · Scene ${sceneIndex + 1}/${current().role.scenes.length}`
    }
  }

  function prev() {
    if (index <= 0) return
    clearTimer()
    index -= 1
    render()
    if (playing) schedule()
  }

  function next() {
    if (index >= totalCount() - 1) {
      playing = false
      clearTimer()
      updateChrome()
      if (statusEl) statusEl.textContent = "Finished all roles"
      return
    }
    clearTimer()
    index += 1
    render()
    if (playing) schedule()
  }

  function toggleSpeed() {
    speed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1
    updateChrome()
    if (playing) schedule()
  }

  playBtn?.addEventListener("click", play)
  pauseBtn?.addEventListener("click", pause)
  prevBtn?.addEventListener("click", prev)
  nextBtn?.addEventListener("click", next)
  speedBtn?.addEventListener("click", toggleSpeed)

  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) || ""
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return
    if (e.code === "Space") {
      e.preventDefault()
      if (playing) pause()
      else play()
    } else if (e.code === "ArrowLeft") {
      e.preventDefault()
      prev()
    } else if (e.code === "ArrowRight") {
      e.preventDefault()
      next()
    }
  })

  window.addEventListener("resize", () => {
    moveCursorToHot(stepHighlight)
  })

  const params = new URLSearchParams(location.search)
  const roleParam = params.get("role")
  if (roleParam) {
    const first = flat.findIndex((f) => f.role.id === roleParam)
    if (first >= 0) index = first
  }

  render()
  // Second paint after layout — catches zero-height first frame / late DOM.
  requestAnimationFrame(() => {
    render()
    requestAnimationFrame(() => moveCursorToHot(stepHighlight))
  })
  return { play, pause, prev, next, render }
}
