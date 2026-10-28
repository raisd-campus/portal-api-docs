/**
 * Lesotho Raisd Demo W1–W3 role-by-role screenshot storyboard.
 * Each scene shows ./playback-videos/{sceneId}.poster.jpg; Prev/Next step through scenes.
 */
export const ROLES = [
  {
    id: "applicant",
    label: "Applicant",
    portal: "https://apply.lesotho.raisd.co",
    account: "Keychain · fresh@raisd.demo (draft) · completed@raisd.demo (fee → offer)",
    summary: "Apply → fee → eligibility → offer → Enrolment Accepted (FM-02 / FM-09)",
    scenes: [
      {
        id: "app-signin",
        title: "Sign in to Applicant",
        route: "/sign-in",
        fm: ["FM-01", "FM-02", "FM-14"],
        body: "Open the Lesotho Applicant host and enter via Keychain or SSO.",
        detail: "Lesotho apply host after Keychain/SSO. Use fresh@raisd.demo for a blank/in-progress draft (next scene), or completed@raisd.demo for a prepared mid-flow case used later for fee, eligibility, and offer so Staff desks have something to review.",
        steps: [
          "Open https://apply.lesotho.raisd.co (or Keychain → Applicant Lesotho).",
          "Pick fresh@raisd.demo for draft/submit, or completed@raisd.demo for fee → offer.",
          "Land on My Applications.",
        ],
        durationMs: 7000,
      },
      {
        id: "app-draft",
        title: "Draft and submit application",
        route: "/apply",
        fm: ["FM-02", "FM-05"],
        body: "As fresh@raisd.demo, open or start a draft and complete Lesotho study preferences before submit.",
        detail: "This slide must show a draft / in-progress application form — not Enrolment Accepted. Sign in as fresh@raisd.demo, resume or start an application, set campus to Lesotho, and complete personal, academic, and document sections. Submit pins campus-lesotho Admissions policy (review flags + catalogues) for Faculty, QA, and Registry. The completed@ account is reserved for later Applicant scenes because it is already past accept.",
        steps: [
          "Keychain → fresh@raisd.demo (not completed@).",
          "Resume draft or Add application; set campus to Lesotho.",
          "Complete required sections and Submit to pin Admissions policy.",
        ],
        durationMs: 7500,
      },
      {
        id: "app-fee",
        title: "Application fee proof",
        route: "/apply · payment",
        fm: ["FM-09", "FM-02"],
        body: "Upload bank proof for the profile-backed LSL application fee (Demo LSL 300).",
        detail: "The Application Fee accordion holds the Demo LSL bank reference and payment.pdf proof. Amounts come from the campus finance profile (Demo LSL 300), not Live bank rails. Saving proof places the case on the Bursary payments queue (FM-09) until staff verify-payment runs.",
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
        detail: "After QA verifies documents and releases the Eligibility Letter, the applicant opens Confirm Eligibility Letter. The popup shows intake, faculty, and programme with Preview/Download of the DEMO PDF. Confirming does not enrol the student—it only unlocks Registry to release an Offer Letter.",
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
        detail: "Once Registry releases the Offer, Accept Enrolment appears. The popup mirrors eligibility (programme summary + DEMO Offer PDF) but accepting signs the applicant out of Apply and hands them to Student Portal for module registration. Until this step, the case stays in Applicant.",
        steps: [
          "Wait until Registry releases the Offer (Registry role).",
          "Preview / download the DEMO Offer PDF.",
          "Accept Enrolment — case moves to Enrolment Accepted (next scene).",
        ],
        durationMs: 7500,
      },
      {
        id: "app-accepted",
        title: "Enrolment Accepted",
        route: "/applications · accepted",
        fm: ["FM-02", "FM-06"],
        body: "Step 6 — Application Details shows Enrolment Accepted and Continue to Student Portal.",
        detail: "After Accept Enrolment, Application Details shows the green Enrolment Accepted status, the completed progress row (payment → documents → confirm → offer), and Continue to Student Portal. This is the Applicant hand-off beat before Student module registration (FM-02 / FM-06). Use completed@raisd.demo — fresh@ is for draft only.",
        steps: [
          "Keychain → completed@raisd.demo (prepared accepted case).",
          "Open the application — status reads Enrolment Accepted.",
          "Continue to Student Portal to start registration.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "faculty",
    label: "Faculty Review",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.faculty@raisd.demo / lesotho2026",
    summary: "Rank / score / recommendation desk (FM-03 / FM-05 / FM-15)",
    scenes: [
      {
        id: "fac-open",
        title: "Open Admissions review",
        route: "/admin/applicants",
        fm: ["FM-03", "FM-15"],
        body: "Sign in as Lesotho Faculty Review and open the submitted application.",
        detail: "Lesotho Faculty Review signs into Staff Admin Applicants. The campus-scoped queue lists Demo Lesotho applications with progress (n/3), rank, score, and recommendation columns. Selecting a row opens the case detail and review-action panel that Faculty uses for metrics and desk recommendation.",
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
        detail: "Lesotho Admissions policy enables showRankScore (FM-05). Faculty chooses Review action → Set rank / score, enters Demo rank and score, and can add a review note. Saving metrics updates the queue columns before the formal recommendation is recorded.",
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
        detail: "Faculty records desk 1 of 3 via Record desk recommendation (Recommended / Not recommended) with a short note. Progress advances toward QA as the next desk in faculty → qa → registry. This is policy-driven desk chaining, not a free-text CMS remark alone.",
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
    account: "Keychain · lesotho.qa@raisd.demo / lesotho2026",
    summary: "LGCSE extract and document verify (FM-04 / FM-03)",
    scenes: [
      {
        id: "qa-open",
        title: "Open Document review",
        route: "/admin/document-review",
        fm: ["FM-04", "FM-15"],
        body: "Sign in as Lesotho QA and open the case awaiting extract / verify.",
        detail: "Lesotho QA opens Document review (same Admissions workspace, documents desk). The queue shows cases awaiting extract and verify under extractRequired policy. Selecting the Demo applicant opens the review-action panel used for LGCSE extract and document verification.",
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
        detail: "With extractRequired on, QA selects Extract certificate (LGCSE) and enters Demo certificate number, institution, and subject|grade rows. Saving extract is required before verify-documents can succeed—this models Lesotho secondary-certificate capture without Live OCR.",
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
        detail: "QA runs Verify eligibility and documents after extract (and faculty recommendation) are present. That completes the QA desk contribution to n/3 and unlocks applicant eligibility confirmation once letters/policy allow. Progress then moves toward Registry for offer release.",
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
    account: "Keychain · lesotho.bursary@raisd.demo / lesotho2026",
    summary: "Fee verify, Fees & Fines, registration clearance, Sponsorship master (FM-09 / FM-08)",
    scenes: [
      {
        id: "bur-pay",
        title: "Verify application payment",
        route: "/admin/payments",
        fm: ["FM-09", "FM-03"],
        body: "Approve the Demo application-fee proof in the payments queue.",
        detail: "Bursary opens Payments → Admissions review and selects the pending application-fee proof. Approve payment is a Demo stub (not a real bank settlement). Verification clears the payment gate so document/eligibility work can proceed on the admissions timeline.",
        steps: [
          "Keychain → lesotho.bursary@raisd.demo → staff.lesotho.raisd.co.",
          "Open Admin → Payments (Admissions payment reviews).",
          "Select the pending proof → Approve payment (Demo stub).",
        ],
        durationMs: 7000,
      },
      {
        id: "bur-fees",
        title: "Fees & Fines catalogue preview",
        route: "/admin/fees",
        fm: ["FM-09"],
        body: "Open the Demo LSL catalogue from the campus finance profile.",
        detail: "Fees & Fines shows the Demo LSL catalogue from the Lesotho campus finance profile: Application, Acceptance, Registration Fee lines plus walk seeds. Configure rates / banks / plans may be stubs—this screen is for previewing profile-backed amounts, not Live fee-master editing.",
        steps: [
          "Open Admin → Fees & Fines.",
          "Confirm Application LSL 300, AcceptanceFee 550, Registration Fee 550, plus walk seeds.",
          "Note: Configure rates / banks / plans may be stubs in Demo.",
        ],
        durationMs: 7000,
      },
      {
        id: "bur-reg",
        title: "Bursary registration clearance",
        route: "/admin/registrations",
        fm: ["FM-08", "FM-09"],
        body: "Clear a student module-registration request; capture NMDS fields when shown.",
        detail: "On Registrations → Module requests, Bursary clears a student registration request (verified-payment or approved-arrangement) with a note. NMDS Demo rows expose sponsorCode and borrowerReference columns so finance clearance stays aligned with sponsor funding (FM-08 / FM-09).",
        steps: [
          "Open Admin → Registrations → Module requests.",
          "Select a pending request (Lesotho student preferred).",
          "Choose verified-payment or approved-arrangement, add note, approve Bursary desk — watch sponsor/borrower columns.",
        ],
        durationMs: 8000,
      },
      {
        id: "bur-sponsors",
        title: "Sponsorship master",
        route: "/admin/sponsors",
        fm: ["FM-08"],
        body: "Open Create Sponsorship master — NMDS and Demo schemes.",
        detail: "Admin → Sponsors lists Demo sponsorship schemes (NMDS, merit, partner loan) and lets staff create a new scheme. Created rows are Demo catalogue only; student-file Sponsors awards still resolve against the same Demo master ids (FM-08).",
        steps: [
          "Open Admin → Sponsors.",
          "Confirm NMDS Sponsorship (demo) and other schemes in the table.",
          "Optionally create a new scheme name and refresh the list.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "registry",
    label: "Registry",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.registry@raisd.demo / lesotho2026",
    summary: "Offer, registration, 12-tab file, graduations, certificates, remarks, academic, analytics, discipline (FM-03 / FM-07–08 / FM-10–12 / FM-16–18)",
    scenes: [
      {
        id: "reg-offer",
        title: "Release Offer Letter",
        route: "/admin/applicants · offer",
        fm: ["FM-03"],
        body: "Release the Demo Offer after eligibility + n/3 desks.",
        detail: "Registry releases the Demo Offer Letter once eligibility is confirmed and recommendation desks are complete. Release Offer Letter on the Applicants desk lets the applicant Accept Enrolment. This is the Registry step in the faculty → QA → Registry chain, not Faculty/QA work.",
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
        detail: "After Bursary clearance, Registry/Faculty complete the module-registration desk. Approving availability with a note and checking NMDS sponsor/borrower columns keeps Staff clearance in sync with the student registration request before CAF/finance artefacts appear.",
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
        detail: "Admin → Students lists Demo enrolled students from the student graph (FM-07), including Demo Lesotho Student. Columns show programme, term, sponsor/borrower, and status. The list is the entry point to the 12-tab registry file—select a row to open it.",
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
        body: "Walk the enriched Academics tab: programme, GPA, marks, and Demo≠Live banner.",
        detail: "Inside the open student file, Academics shows programme status, term, Demo GPA/CGPA, and a module grid with marks/grades. A banner states Demo graph · not Live CAP-53. Values are Demo projections for CAP-53-style enrolment—not Live SoR write-back (FM-07).",
        steps: [
          "Confirm the Demo≠Live banner on Students.",
          "On the open file, select Academics.",
          "Read programme, GPA/CGPA, and module grid (Code / Name / Status / Cr / Mk / Gd).",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-file-sponsors",
        title: "Student file — Sponsors / Registration",
        route: "/admin/students · Sponsors",
        fm: ["FM-07", "FM-08"],
        body: "Confirm NMDS awards linked to Sponsorship master and registration sponsor fields.",
        detail: "Sponsors (NMDS) lists Demo funding awards (scheme, status, borrower, coverage) that resolve against the Create Sponsorship master catalogue. Registration tab requests show sponsorCode, borrowerReference, and clearance basis (FM-07 / FM-08).",
        steps: [
          "Open Sponsors — funding awards + borrower reference.",
          "Open Registration — requests list with sponsorCode / clearance.",
          "Optionally skim Documents / Notes / Audit for enriched Demo rows.",
        ],
        durationMs: 7500,
      },
      {
        id: "reg-file-graduation",
        title: "Student file — Graduation",
        route: "/admin/students · Graduation",
        fm: ["FM-07", "FM-10"],
        body: "Open the Graduation tab — ceremony, clearance, gown/hood, name tag.",
        detail: "Graduation tab shows Demo ceremony label, clearance status, gown/hood sizes, and name-tag preview for the student. Production queues live under Admin → Graduations and Certificates (FM-07 / FM-10).",
        steps: [
          "On the open file, select Graduation.",
          "Read ceremony, clearance, gown/hood, and name-tag fields.",
          "Note link to ceremony / print desks for batch production.",
        ],
        durationMs: 6500,
      },
      {
        id: "reg-graduations",
        title: "Graduation ceremonies",
        route: "/admin/graduations",
        fm: ["FM-10"],
        body: "Open the ceremony desk — gown / RSVP counts and hood preview.",
        detail: "Admin → Graduations lists Demo ceremonies with gown/hood/RSVP/clearance counts and a hood-size plus name-tag preview for the open ceremony (FM-10). Certificate stock and QR print live under Certificates (FM-12).",
        steps: [
          "Open Admin → Graduations.",
          "Read ceremony rows and clearance pending counts.",
          "Confirm hood size table and name-tag sample.",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-certificates",
        title: "Certificates & QR print",
        route: "/admin/certificates",
        fm: ["FM-12"],
        body: "Generate a DEMO certificate with QR payload placeholder.",
        detail: "Admin → Certificates shows Demo certificate/name-tag batches with stock and generated counts. Generate DEMO certificate increments stock usage and shows a QR payload watermarked as Demo—not the Cambodia Live QR pipeline (FM-12).",
        steps: [
          "Open Admin → Certificates.",
          "Review batch stock vs generated.",
          "Click Generate DEMO certificate and read the QR payload preview.",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-remarks",
        title: "Remark requests",
        route: "/admin/remarks",
        fm: ["FM-11"],
        body: "Staff remark queue with LSL re-assessment fee.",
        detail: "Admin → Remarks lists Demo remark requests with module, LSL re-assessment fee, and status. Staff can record a Demo decision (FM-11). Not Live CMS remark workflows.",
        steps: [
          "Open Admin → Remarks.",
          "Confirm pending / fee-paid rows and fee labels.",
          "Optionally Record decision on a pending row.",
        ],
        durationMs: 6500,
      },
      {
        id: "reg-academic",
        title: "Academic overview",
        route: "/admin/academic",
        fm: ["FM-16"],
        body: "Attendance rollup and Demo gradebook matrix.",
        detail: "Admin → Academic shows module attendance sessions recorded vs scheduled and a simple gradebook matrix from Demo classroom marks (FM-16). Timetable generator / venues are on Admin → Timetable.",
        steps: [
          "Open Admin → Academic.",
          "Read attendance by module.",
          "Scan gradebook marks/grades.",
        ],
        durationMs: 6500,
      },
      {
        id: "reg-timetable",
        title: "Timetable generator & venues",
        route: "/admin/timetable",
        fm: ["FM-16"],
        body: "Demo venues, allocations, and one-click generator.",
        detail: "Admin → Timetable lists venue types, venues, and module allocations, plus a Demo generator that places modules into available venues (FM-16). Not the Live CMS conflict solver — Demo seeds only.",
        steps: [
          "Open Admin → Timetable.",
          "Review venues and existing allocations.",
          "Optionally Run Demo generator and confirm new slots.",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-analytics",
        title: "Campus analytics",
        route: "/admin/analytics",
        fm: ["FM-17"],
        body: "Demo cards for enrolments, admissions, registrations, graduations, sponsors.",
        detail: "Admin → Analytics presents Demo graph count cards for active enrolments, admissions pipeline, module registration requests, graduation clearances, and sponsor schemes (FM-17). HR and Library reports stay out of scope.",
        steps: [
          "Open Admin → Analytics.",
          "Read the five Demo count cards.",
          "Note source hints say Demo graph only.",
        ],
        durationMs: 6000,
      },
      {
        id: "reg-discipline",
        title: "Discipline cases",
        route: "/admin/discipline",
        fm: ["FM-18"],
        body: "List blocked, suspension, and academic-dishonesty Demo cases.",
        detail: "Admin → Discipline lists Demo academic-dishonesty, suspension, and blocked cases with status pills (FM-18). Sanctions are Demo seeds—not Live CMS discipline SoR.",
        steps: [
          "Open Admin → Discipline.",
          "Scan kind and status columns.",
          "Confirm blocked / suspension Demo rows.",
        ],
        durationMs: 6000,
      },
    ],
  },
  {
    id: "year-leader",
    label: "Year Leader",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.yearleader@raisd.demo / lesotho2026",
    summary: "Narrow Overview + Students + Analytics (FM-07 / FM-15 / FM-17 read)",
    scenes: [
      {
        id: "yl-signin",
        title: "Sign in as Year Leader",
        route: "/sign-in",
        fm: ["FM-01", "FM-15"],
        body: "Use the narrow Lesotho Year Leader custom role.",
        detail: "Year Leader uses a narrow custom role: Staff Admin shows Overview and Students only—Payments, Access, and other desks stay hidden (FM-15). Keychain lesotho.yearleader@raisd.demo demonstrates least-privilege campus scope without granting full Registry powers.",
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
        detail: "Year Leader browses the same Demo Students list in campus scope: programme, term, and sponsor columns for follow-up. They can open a file to read, but the role is intentionally read-oriented compared with Registry’s offer and registration desks.",
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
        detail: "Opening a student shows the same 12-tab Demo registry file. Year Leader typically reads Academics (and related tabs) for year follow-up without bursary payment or offer-release actions—illustrating shared FM-07 data under a tighter permission shell.",
        steps: [
          "Open the selected student file.",
          "Step through Academics → Student → Registration tabs.",
          "Demo read shell for year follow-up.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "student",
    label: "Student",
    portal: "https://student.lesotho.raisd.co",
    account: "Keychain · alya@raisd.demo / alya2026",
    summary: "Registration with NMDS + finance / CAF (FM-06 / FM-08 / FM-09)",
    scenes: [
      {
        id: "stu-signin",
        title: "Sign in to Student",
        route: "/sign-in",
        fm: ["FM-01", "FM-06", "FM-14"],
        body: "Open the Lesotho Student host with a Demo student account.",
        detail: "Student Portal (student.lesotho.raisd.co) loads after Accept Enrolment or with the seeded alya@raisd.demo fixture. Dashboard confirms the Demo enrolment is active so Registration and Finance can be exercised next (FM-06 / FM-14).",
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
        detail: "On Registration, the student selects term modules allowed by Demo curriculum rules. When NMDS applies, sponsorCode and borrowerReference are entered before submit. The request then waits for Bursary and Faculty/Registry Staff clearance (FM-06 / FM-08).",
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
        detail: "After Staff clearance, Finance shows Demo invoices and CAF artefacts labelled DEMO. Amounts come from the Lesotho finance profile JSON—not Live payment gateways—so the storyboard can show post-registration finance without real money movement (FM-09).",
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
    account: "Keychain · sso.admin@raisd.demo / admin2026",
    summary: "Lesotho Flows catalogues and position seeds (FM-05 / FM-15)",
    scenes: [
      {
        id: "ctl-flows",
        title: "Open Lesotho Admissions Flows",
        route: "/flows/admissions/campus-lesotho",
        fm: ["FM-05"],
        body: "Open the Control Admissions policy editor for campus-lesotho.",
        detail: "Control opens Flows → Admissions → Lesotho. The Settings tab loads the published campus-lesotho Admissions policy (Demo DB storage): publication metadata, eligibility, fees, and other campus workflow sections. This is where Lesotho-specific flags and catalogues are authored.",
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
        detail: "Desk review (Lesotho) holds FM-05 flags: Show rank and score, Document extract required, and ordered recommendation desks (faculty → qa → registry). Demo defaults keep these enabled so Staff desks in the storyboard match policy. Publishing never grants portal access by itself.",
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
        detail: "Admissions catalogues (Demo) loads intake periods, certificate types, subjects, schools, and entry lists for Lesotho. Load Lesotho Demo catalogues fills draft lists for validation; publish only when you intend to bump the Demo policy version—these are not Live CMS catalogues.",
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
        detail: "Campus members/roles (or Keychain presets) seed Lesotho desk identities: Registry, QA, Bursary, Faculty Review, Year Leader. Flow publish configures policy only; SSO/Keychain assignments remain how people actually reach Staff Admin desks (FM-15 / FM-01).",
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

/** Demo portal URLs used by the recorder (and “Open portal” link). */
export const SCENE_URLS = {
  "app-signin": "https://apply.lesotho.raisd.co/applications",
  "app-draft": "https://apply.lesotho.raisd.co/applications",
  "app-fee": "https://apply.lesotho.raisd.co/applications",
  "app-eligibility": "https://apply.lesotho.raisd.co/applications",
  "app-offer": "https://apply.lesotho.raisd.co/applications",
  "app-accepted": "https://apply.lesotho.raisd.co/applications",
  "fac-open": "https://staff.lesotho.raisd.co/admin/applicants",
  "fac-rank": "https://staff.lesotho.raisd.co/admin/applicants",
  "fac-rec": "https://staff.lesotho.raisd.co/admin/applicants",
  "qa-open": "https://staff.lesotho.raisd.co/admin/document-review",
  "qa-extract": "https://staff.lesotho.raisd.co/admin/document-review",
  "qa-verify": "https://staff.lesotho.raisd.co/admin/document-review",
  "bur-pay": "https://staff.lesotho.raisd.co/admin/payments",
  "bur-fees": "https://staff.lesotho.raisd.co/admin/fees",
  "bur-reg": "https://staff.lesotho.raisd.co/admin/registrations",
  "bur-sponsors": "https://staff.lesotho.raisd.co/admin/sponsors",
  "reg-offer": "https://staff.lesotho.raisd.co/admin/applicants",
  "reg-queue": "https://staff.lesotho.raisd.co/admin/registrations",
  "reg-list": "https://staff.lesotho.raisd.co/admin/students",
  "reg-file-academics": "https://staff.lesotho.raisd.co/admin/students",
  "reg-file-sponsors": "https://staff.lesotho.raisd.co/admin/students",
  "reg-file-graduation": "https://staff.lesotho.raisd.co/admin/students",
  "reg-graduations": "https://staff.lesotho.raisd.co/admin/graduations",
  "reg-certificates": "https://staff.lesotho.raisd.co/admin/certificates",
  "reg-remarks": "https://staff.lesotho.raisd.co/admin/remarks",
  "reg-academic": "https://staff.lesotho.raisd.co/admin/academic",
  "reg-timetable": "https://staff.lesotho.raisd.co/admin/timetable",
  "reg-analytics": "https://staff.lesotho.raisd.co/admin/analytics",
  "reg-discipline": "https://staff.lesotho.raisd.co/admin/discipline",
  "yl-signin": "https://staff.lesotho.raisd.co/admin",
  "yl-list": "https://staff.lesotho.raisd.co/admin/students",
  "yl-file": "https://staff.lesotho.raisd.co/admin/students",
  "stu-signin": "https://student.lesotho.raisd.co/",
  "stu-reg": "https://student.lesotho.raisd.co/registration",
  "stu-finance": "https://student.lesotho.raisd.co/finance",
  "ctl-flows": "https://control.raisd.co/flows/admissions/campus-lesotho",
  "ctl-review": "https://control.raisd.co/flows/admissions/campus-lesotho",
  "ctl-catalogues": "https://control.raisd.co/flows/admissions/campus-lesotho",
  "ctl-positions": "https://control.raisd.co/campuses/campus-lesotho",
}

/**
 * Screenshot border colour vs flow legend:
 * - baseline (light blue) = already Demo before deepen
 * - today (green) = enabled / deepened on 28 Oct 2026
 */
export const SCENE_ERA = {
  "app-signin": "baseline",
  "app-draft": "baseline",
  "app-fee": "baseline",
  "app-eligibility": "baseline",
  "app-offer": "baseline",
  "app-accepted": "baseline",
  "fac-open": "today",
  "fac-rank": "today",
  "fac-rec": "today",
  "qa-open": "today",
  "qa-extract": "today",
  "qa-verify": "today",
  "bur-pay": "baseline",
  "bur-fees": "baseline",
  "bur-reg": "baseline",
  "bur-sponsors": "today",
  "reg-offer": "baseline",
  "reg-queue": "baseline",
  "reg-list": "today",
  "reg-file-academics": "today",
  "reg-file-sponsors": "today",
  "reg-file-graduation": "today",
  "reg-graduations": "today",
  "reg-certificates": "today",
  "reg-remarks": "today",
  "reg-academic": "today",
  "reg-timetable": "today",
  "reg-analytics": "today",
  "reg-discipline": "today",
  "yl-signin": "baseline",
  "yl-list": "baseline",
  "yl-file": "baseline",
  "stu-signin": "baseline",
  "stu-reg": "baseline",
  "stu-finance": "baseline",
  "ctl-flows": "baseline",
  "ctl-review": "today",
  "ctl-catalogues": "baseline",
  "ctl-positions": "baseline",
}

export function sceneEra(sceneId) {
  return SCENE_ERA[sceneId] || "baseline"
}

/** Green if any scene is deepened today; otherwise blue baseline. */
export function eraForSceneIds(sceneIds) {
  for (const id of sceneIds || []) {
    if (sceneEra(id) === "today") return "today"
  }
  return "baseline"
}

export function sceneUrl(role, scene) {
  if (SCENE_URLS[scene.id]) return SCENE_URLS[scene.id]
  if (scene.href) return scene.href
  const path = (scene.route || "").split("·")[0].trim()
  if (!path || path === "/") return role.portal
  return `${role.portal.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`
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

export function buildFeatureIndex(roles = ROLES) {
  const map = new Map()
  for (const entry of flattenScenes(roles)) {
    for (const fm of entry.scene.fm || []) {
      if (!map.has(fm)) map.set(fm, [])
      map.get(fm).push(entry)
    }
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([fm, scenes]) => ({ fm, scenes }))
}

const MEDIA_BASE = "./playback-videos"

export function createPlayer(options) {
  const {
    roles = ROLES,
    roleListEl,
    featureListEl,
    stageEl,
    roleBadgeEl,
    portalEl,
    accountEl,
    routeEl,
    titleEl,
    bodyEl,
    detailEl,
    stepsEl,
    fmEl,
    screenEl,
    screenShellEl,
    missingEl,
    screenStatusEl,
    openPortalBtn,
    expandBtn,
    collapseBtn,
    playbackRootEl,
    playbackSlotEl,
    modalEl,
    modalBodyEl,
    stepProgressRoleEl,
    stepProgressCountEl,
    stepProgressTrackEl,
    sectionProgressEl,
    progressRoleEl,
    progressAllEl,
    statusEl,
    playBtn,
    pauseBtn,
    prevBtn,
    nextBtn,
    speedBtn,
    manifestUrl = `${MEDIA_BASE}/manifest.json`,
  } = options

  const flat = flattenScenes(roles)
  const featureIndex = buildFeatureIndex(roles)
  /** @type {Record<string, { poster?: string }>} */
  let manifestById = {}
  let index = 0
  let playing = false
  let speed = 1
  let stepTimer = null
  let advanceTimer = null
  let stepHighlight = 0
  let activeFm = null
  let loadToken = 0

  function totalCount() {
    return flat.length
  }

  function current() {
    return flat[index] ?? flat[0]
  }

  function clearStepTimer() {
    if (stepTimer != null) {
      clearInterval(stepTimer)
      stepTimer = null
    }
    if (advanceTimer != null) {
      clearTimeout(advanceTimer)
      advanceTimer = null
    }
  }

  function screenSrcFor(sceneId) {
    const entry = manifestById[sceneId]
    if (entry?.poster) return `${MEDIA_BASE}/${entry.poster}`
    return `${MEDIA_BASE}/${sceneId}.poster.jpg`
  }

  function setScreenStatus(text) {
    if (screenStatusEl) screenStatusEl.textContent = text
  }

  function highlightSteps(steps) {
    if (!stepsEl) return
    const items = stepsEl.querySelectorAll("li")
    items.forEach((li, i) => {
      li.setAttribute("data-active", i === stepHighlight ? "true" : "false")
    })
  }

  function startStepPulse(steps) {
    clearStepTimer()
    if (!steps?.length) {
      if (playing) scheduleAdvance()
      return
    }
    stepHighlight = 0
    highlightSteps(steps)
    if (!playing) return
    const per = Math.max(
      1200,
      Math.round(((current().scene.durationMs || 7000) / speed) / steps.length)
    )
    stepTimer = setInterval(() => {
      stepHighlight = Math.min(steps.length - 1, stepHighlight + 1)
      highlightSteps(steps)
      if (stepHighlight >= steps.length - 1 && stepTimer) {
        clearInterval(stepTimer)
        stepTimer = null
        scheduleAdvance()
      }
    }, per)
  }

  function scheduleAdvance() {
    if (!playing) return
    if (advanceTimer != null) clearTimeout(advanceTimer)
    const dwell = Math.max(1800, Math.round(2200 / speed))
    advanceTimer = setTimeout(() => {
      advanceTimer = null
      if (!playing) return
      next()
    }, dwell)
  }

  function syncUrl() {
    const { role, scene } = current()
    const url = new URL(location.href)
    url.searchParams.set("role", role.id)
    url.searchParams.set("scene", scene.id)
    if (activeFm) url.searchParams.set("fm", activeFm)
    else url.searchParams.delete("fm")
    history.replaceState(null, "", url)
  }

  function setLoading(on) {
    const shell = screenShellEl || screenEl?.closest?.(".screen-shell")
    if (shell) shell.setAttribute("data-loading", on ? "true" : "false")
  }

  function showMissing(sceneId) {
    setLoading(false)
    if (screenEl) {
      screenEl.removeAttribute("src")
      screenEl.hidden = true
    }
    if (missingEl) {
      missingEl.hidden = false
      const idEl = missingEl.querySelector("[data-missing-id]")
      if (idEl) idEl.textContent = sceneId
    }
    setScreenStatus(`Screen not captured yet · ${sceneId}`)
  }

  function hideMissing() {
    if (missingEl) missingEl.hidden = true
    if (screenEl) screenEl.hidden = false
  }

  function loadSceneScreen() {
    const { scene } = current()
    const img = screenEl
    if (!img) return
    const token = ++loadToken
    const src = screenSrcFor(scene.id)
    setScreenStatus(`Loading ${scene.id}…`)
    setLoading(true)
    hideMissing()

    const fail = () => {
      if (token !== loadToken) return
      showMissing(scene.id)
      if (playing) scheduleAdvance()
    }

    const ok = () => {
      if (token !== loadToken) return
      hideMissing()
      setLoading(false)
      setScreenStatus(`Step ${index + 1}/${totalCount()} · ${scene.id}`)
    }

    img.onload = ok
    img.onerror = fail
    img.alt = `${scene.title} — Demo screenshot`
    // Force reload indicator even when browser serves from cache.
    img.src = `${src}?v=${encodeURIComponent(manifestById[scene.id]?.recordedAt || "1")}&i=${token}`
  }

  function openExpand() {
    if (!modalEl || !modalBodyEl || !playbackRootEl || !playbackSlotEl) return
    if (modalEl.open) return
    modalBodyEl.appendChild(playbackRootEl)
    modalEl.showModal()
    document.body.classList.add("player-modal-open")
    if (expandBtn) expandBtn.textContent = "Expanded"
  }

  function closeExpand() {
    if (!modalEl || !playbackRootEl || !playbackSlotEl) return
    if (playbackRootEl.parentElement !== playbackSlotEl) {
      playbackSlotEl.appendChild(playbackRootEl)
    }
    if (modalEl.open) modalEl.close()
    document.body.classList.remove("player-modal-open")
    if (expandBtn) expandBtn.textContent = "Expand fullscreen"
  }

  function renderRoleList() {
    if (!roleListEl) return
    roleListEl.innerHTML = ""
    roles.forEach((role, roleIndex) => {
      const era = eraForSceneIds(role.scenes.map((s) => s.id))
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "role-item"
      btn.dataset.roleId = role.id
      btn.dataset.era = era
      btn.title =
        era === "today"
          ? `${role.label} · includes desks enabled / deepened today`
          : `${role.label} · baseline existing Demo only`
      btn.setAttribute("aria-current", current().roleIndex === roleIndex ? "true" : "false")
      btn.innerHTML = `<span class="role-ord">${roleIndex + 1}</span><span class="role-meta"><strong>${role.label}</strong><span>${role.summary}</span></span>`
      btn.addEventListener("click", () => {
        const first = flat.findIndex((f) => f.roleIndex === roleIndex)
        if (first < 0) return
        pause({ keepStatus: true })
        index = first
        activeFm = null
        render()
      })
      roleListEl.appendChild(btn)
    })
  }

  function renderFeatureList() {
    if (!featureListEl) return
    featureListEl.innerHTML = ""
    for (const { fm, scenes } of featureIndex) {
      const era = eraForSceneIds(scenes.map((s) => s.scene.id))
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "fm-item"
      btn.dataset.era = era
      btn.title =
        era === "today"
          ? `${fm} · includes scenes enabled / deepened today`
          : `${fm} · baseline existing Demo only`
      const sceneIds = current().scene.fm || []
      const isActive = activeFm === fm || sceneIds.includes(fm)
      btn.setAttribute("aria-current", isActive ? "true" : "false")
      const labels = [...new Set(scenes.map((s) => s.role.label))].slice(0, 3).join(" · ")
      btn.innerHTML = `<span class="fm-code">${fm}</span><span class="fm-meta"><strong>${scenes.length} scene${scenes.length === 1 ? "" : "s"}</strong><span>${labels}</span></span>`
      btn.addEventListener("click", () => {
        const first = flat.findIndex((f) => (f.scene.fm || []).includes(fm))
        if (first < 0) return
        pause({ keepStatus: true })
        index = first
        activeFm = fm
        render()
      })
      featureListEl.appendChild(btn)
    }
  }

  function shortStepLabel(title) {
    const clean = String(title || "").replace(/^Open\s+/i, "").trim()
    if (clean.length <= 28) return clean
    return `${clean.slice(0, 26).trim()}…`
  }

  function renderSectionProgress() {
    if (!sectionProgressEl) return
    const { roleIndex } = current()
    sectionProgressEl.innerHTML = ""
    roles.forEach((role, i) => {
      const era = eraForSceneIds(role.scenes.map((s) => s.id))
      const btn = document.createElement("button")
      btn.type = "button"
      btn.textContent = `${i + 1}. ${role.label}`
      btn.dataset.era = era
      btn.setAttribute("role", "tab")
      btn.setAttribute("aria-current", i === roleIndex ? "true" : "false")
      if (i < roleIndex) btn.setAttribute("data-done", "true")
      btn.title =
        era === "today"
          ? `${role.summary || role.label} · includes new / deepened desks`
          : `${role.summary || role.label} · baseline existing Demo`
      btn.addEventListener("click", () => {
        const first = flat.findIndex((f) => f.roleIndex === i)
        if (first < 0) return
        pause({ keepStatus: true })
        index = first
        activeFm = null
        render()
      })
      sectionProgressEl.appendChild(btn)
    })
  }

  function renderStepProgress() {
    const { role, scene, sceneIndex, roleIndex } = current()
    if (stepProgressRoleEl) {
      stepProgressRoleEl.textContent = `${roleIndex + 1}. ${role.label}`
    }
    if (stepProgressCountEl) {
      stepProgressCountEl.textContent = `Step ${sceneIndex + 1} of ${role.scenes.length} · screen ${scene.id}`
    }
    if (!stepProgressTrackEl) return
    stepProgressTrackEl.innerHTML = ""
    role.scenes.forEach((s, i) => {
      const li = document.createElement("li")
      const state = i < sceneIndex ? "done" : i === sceneIndex ? "current" : "todo"
      const era = sceneEra(s.id)
      li.dataset.state = state
      li.dataset.era = era
      const btn = document.createElement("button")
      btn.type = "button"
      btn.setAttribute("aria-current", i === sceneIndex ? "step" : "false")
      btn.title =
        era === "today"
          ? `${s.title} · enabled / deepened today`
          : `${s.title} · baseline existing Demo`
      btn.innerHTML = `<span class="step-ord">${i + 1}</span><span class="step-label">${shortStepLabel(s.title)}</span>`
      btn.addEventListener("click", () => {
        const target = flat.findIndex((f) => f.roleIndex === roleIndex && f.sceneIndex === i)
        if (target < 0) return
        pause({ keepStatus: true })
        index = target
        activeFm = null
        render()
      })
      li.appendChild(btn)
      stepProgressTrackEl.appendChild(li)
    })
  }

  function render() {
    const { role, scene, sceneIndex } = current()
    const url = sceneUrl(role, scene)
    if (roleBadgeEl) roleBadgeEl.textContent = role.label
    if (portalEl) {
      portalEl.textContent = role.portal
      if (role.portal.startsWith("http")) portalEl.href = role.portal
      else portalEl.removeAttribute("href")
    }
    if (accountEl) accountEl.textContent = role.account || ""
    if (routeEl) routeEl.textContent = scene.route
    if (titleEl) titleEl.textContent = scene.title
    if (bodyEl) bodyEl.textContent = scene.body
    if (detailEl) detailEl.textContent = scene.detail || ""
    if (openPortalBtn) {
      openPortalBtn.href = url
      openPortalBtn.hidden = !url
    }
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
      highlightSteps(scene.steps || [])
    }
    if (fmEl) {
      fmEl.innerHTML = ""
      for (const tag of scene.fm) {
        const span = document.createElement("button")
        span.type = "button"
        span.className = "tag tag-partial"
        span.textContent = tag
        if (activeFm === tag) span.setAttribute("data-active", "true")
        span.addEventListener("click", () => {
          activeFm = tag
          const first = flat.findIndex((f) => (f.scene.fm || []).includes(tag))
          if (first >= 0) {
            pause({ keepStatus: true })
            index = first
            render()
          } else {
            renderFeatureList()
            syncUrl()
          }
        })
        fmEl.appendChild(span)
      }
      const shot = document.createElement("span")
      shot.className = "tag tag-out"
      shot.textContent = "Screenshot step"
      fmEl.appendChild(shot)
    }
    if (stageEl) {
      stageEl.dataset.role = role.id
      stageEl.dataset.scene = scene.id
      stageEl.dataset.era = sceneEra(scene.id)
    }
    const shell = screenShellEl || screenEl?.closest?.(".screen-shell")
    if (shell) {
      const era = sceneEra(scene.id)
      shell.dataset.era = era
      shell.setAttribute(
        "aria-label",
        era === "today"
          ? "Demo scene screenshot · enabled / deepened today (green border)"
          : "Demo scene screenshot · baseline existing Demo (blue border)",
      )
    }
    renderSectionProgress()
    renderStepProgress()
    if (progressRoleEl) {
      const n = role.scenes.length
      progressRoleEl.style.width = `${((sceneIndex + 1) / n) * 100}%`
      progressRoleEl.parentElement?.setAttribute("aria-valuenow", String(sceneIndex + 1))
      progressRoleEl.parentElement?.setAttribute("aria-valuemax", String(n))
    }
    if (progressAllEl) {
      progressAllEl.style.width = `${((index + 1) / totalCount()) * 100}%`
      progressAllEl.parentElement?.setAttribute("aria-valuenow", String(index + 1))
      progressAllEl.parentElement?.setAttribute("aria-valuemax", String(totalCount()))
    }
    if (statusEl) {
      statusEl.textContent = `Role ${current().roleIndex + 1}/${roles.length} · Step ${sceneIndex + 1}/${role.scenes.length} · ${index + 1}/${totalCount()}`
    }
    renderRoleList()
    renderFeatureList()
    syncUrl()
    updateChrome()
    loadSceneScreen()
    if (playing) startStepPulse(scene.steps || [])
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
      return
    }
    updateChrome()
    setScreenStatus(`Auto · ${current().scene.id}`)
    startStepPulse(current().scene.steps || [])
  }

  function pause({ keepStatus = false } = {}) {
    playing = false
    clearStepTimer()
    updateChrome()
    if (!keepStatus && statusEl) {
      const { sceneIndex } = current()
      statusEl.textContent = `Paused · Role ${current().roleIndex + 1}/${roles.length} · Step ${sceneIndex + 1}/${current().role.scenes.length}`
    }
  }

  function prev() {
    if (index <= 0) return
    const wasPlaying = playing
    clearStepTimer()
    index -= 1
    render()
    if (wasPlaying) play()
  }

  function next() {
    if (index >= totalCount() - 1) {
      playing = false
      clearStepTimer()
      updateChrome()
      if (statusEl) statusEl.textContent = "Finished all roles"
      setScreenStatus("Finished all steps")
      return
    }
    const wasPlaying = playing
    clearStepTimer()
    index += 1
    render()
    if (wasPlaying) play()
  }

  function toggleSpeed() {
    const rates = [1, 1.5, 2, 3]
    const i = rates.indexOf(speed)
    speed = rates[(i + 1) % rates.length]
    updateChrome()
    if (playing) startStepPulse(current().scene.steps || [])
  }

  playBtn?.addEventListener("click", play)
  pauseBtn?.addEventListener("click", pause)
  prevBtn?.addEventListener("click", prev)
  nextBtn?.addEventListener("click", next)
  speedBtn?.addEventListener("click", toggleSpeed)
  expandBtn?.addEventListener("click", openExpand)
  collapseBtn?.addEventListener("click", closeExpand)
  modalEl?.addEventListener("cancel", (e) => {
    e.preventDefault()
    closeExpand()
  })
  modalEl?.addEventListener("close", () => {
    if (playbackRootEl && playbackSlotEl && playbackRootEl.parentElement !== playbackSlotEl) {
      playbackSlotEl.appendChild(playbackRootEl)
    }
    document.body.classList.remove("player-modal-open")
    if (expandBtn) expandBtn.textContent = "Expand fullscreen"
  })

  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) || ""
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return
    if (e.code === "Escape" && modalEl?.open) {
      closeExpand()
      return
    }
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

  const params = new URLSearchParams(location.search)
  const sceneParam = params.get("scene")
  const roleParam = params.get("role")
  const fmParam = params.get("fm")
  if (sceneParam) {
    const found = flat.findIndex((f) => f.scene.id === sceneParam)
    if (found >= 0) index = found
  } else if (roleParam) {
    const first = flat.findIndex((f) => f.role.id === roleParam)
    if (first >= 0) index = first
  }
  if (fmParam) {
    activeFm = fmParam
    if (!sceneParam) {
      const first = flat.findIndex((f) => (f.scene.fm || []).includes(fmParam))
      if (first >= 0) index = first
    }
  }

  fetch(manifestUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data?.scenes) return
      for (const entry of data.scenes) {
        if (entry?.sceneId) manifestById[entry.sceneId] = entry
      }
    })
    .catch(() => {})
    .finally(() => {
      render()
    })

  return { play, pause, prev, next, render }
}
