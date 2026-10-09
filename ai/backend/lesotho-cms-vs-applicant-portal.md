# Lesotho CMS vs Raisd Applicant portal — flow analysis

**Action:** WG standup 7 Oct 2026 — *Iman Suherman will compare the old Lesotho CMS application flow with the current applicant portal and provide the analysis the following morning.*  
**As of:** 8 October 2026 (refreshed after Faid’s campus + two-stage letters merge and production SPA redeploy `532d6f0`).  
**Source meeting:** Read.ai — *CMS 2026 Daily Stand-up meeting 7PM Malaysia (GMT +8)*, 7 Oct 2026, 11:00–11:57 (report score 80).  
**Pilot:** [Lesotho pilot](../architecture/lesotho-pilot.md) (M4, admissions before registration).  
**Pages:** [`cms-vs-applicant.html`](../../diagrams/old-cms-lesotho/cms-vs-applicant.html) (Mermaid diagrams for overview + [A]/[B]/[C] apply + progress + role mapping).  
**Related:** [old-cms-lesotho.md](old-cms-lesotho.md) · [lesotho-db-gap.md](lesotho-db-gap.md) Flow 1 · [applicant-portal.md](../frontend/applicant-portal.md) · [luct-online-registration-fe-gap.md](luct-online-registration-fe-gap.md) · [admissions-handoff.md](admissions-handoff.md).

## Scope and evidence

This analysis compares **three planes** for the **applicant / admissions** journey only (not term registration, NMDS billing, or student portal):

| Plane | What it is | Evidence |
|---|---|---|
| **[A] Newer Lesotho CMS** | Live campus Admin admissions UX | Screenshots (WhatsApp pack); no shared schema |
| **[B] Older Lesotho CMS** | `campus2_lesotho` LUCT PHPMaker | Structure dump 5 Oct 2026 (`app_*`, online SPs) — dump outside git |
| **[C] Raisd Applicant portal** | Demo CAP-02/03/07 surface | Prod SPA `532d6f0` on [raisd-applicant-portal.vercel.app](https://raisd-applicant-portal.vercel.app) (Faid `9e007f2` campus + letters); hosted HTTP still gates campus/letters |

Cyberjaya Process A (Academic → Documents → Personal → Submit) is a **research baseline only**; Lesotho overlays (LGCSE/Sesotho, Loti/M, NMDS later) replace Malaysia EMGS/NOC for M4.

Demo ≠ Live. Sample Design curriculum, DEMO letter PDFs, and session-only mock writes are not campus policy or CMS provisioning. Portals shown to DSC remain front-end designs until server deployment, data migration, and API connections land (Read.ai summary, 7 Oct).

---

## Read.ai standup capture — 7 October 2026

**Meeting:** CMS 2026 Daily Stand-up · Google Meet · 5 participants.  
**Email report:** Mohammad Aslam via Read AI, 7 Oct ~23:00.

### Summary (Read.ai)

The meeting reviewed **applicant portal readiness**, **Lesotho’s pilot application flow**, and **requirements for different applicant types**. Application and student portals shown to DSC are front-end designs; **server deployment, data migration, and API connections remain outstanding**. Rights update and applicant-portal front end had been deployed, but deployment was **manual**; login was not yet reliable and the **registration menu was still missing** at meeting time.

### Action items (with status as of 8 Oct morning)

| # | Owner | Action (Read.ai) | Status 8 Oct |
|---|---|---|---|
| 1 | Mohd. Paramasvara | Send Iman the Cambodia QR-system code after the meeting | **Done** — Drive QR System + Verification (8 Oct WhatsApp) |
| 2 | Iman Suherman | Review how the QR system works and update the CMS documentation | **Done** — [certificate-qr.html](../../diagrams/old-cms-cambodia/certificate-qr.html) (CMS + QR System + Verification inventoried) |
| 3 | Iman Suherman | Fix the applicant login issue | **Done** — CORS allowlist + redeploy (`raisd-applicant-portal` origin) |
| 4 | Faid Zamin | Analyze Iman’s CAP analysis | Open (Faid) |
| 5 | Faid Zamin | Check whether Iman’s progress report needs changes | Open (Faid) |
| 6 | Faid Zamin | Add a campus selector to the application flow | **Done** — merged `9e007f2`; on prod SPA `532d6f0` (hosted HTTP still hides campus) |
| 7 | Dexter (DVD), MIT | Consult with Registry about how exchange students should be handled | Open (Registry) |
| 8 | Iman Suherman | Compare old Lesotho CMS application flow with current applicant portal; provide analysis the following morning | **Done** — this document + Pages (initial 8 Oct; refreshed same day after Faid merge) |
| 9 | Faid Zamin | Make the discussed changes to the application flow | **Done** (local mock) — campus, Alumni Previous Student ID, Eligibility→Offer workflow, progress rows, handoff v2 |
| 10 | Faid Zamin | Push updated code to GitHub and notify Iman | **Done** — on `main` |
| 11 | Iman Suherman | Deploy the changes manually after Faid notifies | **Done** — prod SPA `532d6f0` (8 Oct evening; GH Actions billing blocked auto-deploy); hosted letter/campus API still gated |

### Key discussion chapters (Read.ai)

| Time | Topic | Expectation for Raisd Applicant / Lesotho |
|---|---|---|
| 0:00 | Applicant Portal Deployment and CMS Updates | Hosted FE must be reachable; login must work; deployment path should not stay ad-hoc forever |
| 4:06 | Cambodia QR Integration | Separate track — QR SoR docs after Vara shares code (not Applicant M4 blocker) |
| 5:46 | Portal Authentication and Development Updates | Applicant accounts / passworded access before applying |
| 11:39 | Portal Readiness and Country-Specific Architecture | Multi-campus Demo; Lesotho first for acceptance; country overlays later |
| 16:16 | Prototype Timing and Password Update | Working prototype timeline; Demo credentials hygiene |
| 17:57 | Alumni Applications and Campus Accounts | Alumni path + Previous Student ID; campus-aware accounts |
| 29:20 | Application Types and Document Requirements | New / Alumni / Transfer (and related docs) must be explicit — not one generic apply |
| 34:35 | Exchange Students and Registry Operations | Out of Applicant alone — Registry consult (Dexter/MIT) |
| 38:46 | Student Login and Access | Transition after offer / accept into Student portal |
| 39:35 | Applicant Fields, Documents, Fees, and Payment | Fee proof + document set must match campus rules (Lesotho → LGCSE, LSL) |
| 42:38 | Eligibility and Offer-Letter Workflow | Two-stage letter path discussed; Faid implemented Demo mock |
| 47:08 | International Visa and Student Enrollment | International / visa remains post-offer / Student / Immigration — not Lesotho NMDS |
| 51:42 | Alumni Records and Lesotho CMS Review | Align Raisd apply/review with Lesotho CMS desks |
| 55:14 | Code Changes, Deployment, and Follow-Up | Faid push → Iman manual deploy |

### Open questions raised in the report (still product decisions)

1. Does a **new applicant** need to log in with a password before accessing the application portal? *(Demo today: yes — Demo accounts.)*  
2. Will **LGA** students have Student portal access, and can campuses enter their information directly? *(Staff/Registry — not Applicant Demo.)*  
3. When might the team show a **working prototype**? *(Hosted login works; full Eligibility→Offer still local mock.)*  
4. Should **transfer** and **alumni** share a unified document flow? *(Types exist in Study Preferences; document matrices not campus-specific yet.)*  
5. How does the **Student portal transition** after the offer letter is issued? *(Local mock: accept → logout → Sign in → Student handoff v2 with issued letters.)*

---

## Meeting expectations → current Applicant portal

What the standup implied the Applicant surface should support, vs what shipped in Faid’s 8 Oct morning update.

| Expectation (7 Oct discussion) | Current Applicant ([C], post-`9e007f2`) | Gap / next |
|---|---|---|
| Reliable hosted login | Hosted login works (CORS fixed) | Keep Demo passwords out of git history; rotate if shared broadly |
| Campus selector on apply | Campus required (8 sample campuses incl. Lesotho) on local mock and hosted Demo HTTP | Persist durable campus catalogue beyond Demo seed when Live CMS owns campuses |
| Applicant types (new / alumni / transfer) | Enum on Study Preferences; Alumni requires trimmed Previous Student ID (local) | Document matrices per type; Transfer vs Alumni evidence rules; Registry exchange path separate |
| Multi-step apply with documents + fee | Six-step editor + messages + immutable submit | Lesotho LGCSE extract; LSL fee copy; durable uploads on hosted |
| Eligibility then Offer letters | Local mock + hosted Demo: QA Eligibility → applicant `confirmApplicationEligibility` → Demo auto `release-offer` → guarded `acceptApplicationEnrolment` | Confirm with Registry that Eligibility Letter is Lesotho policy (not Demo-only). Staff portal should own Offer release (replace Demo auto-release) |
| Student transition after accept | Local: auto logout → Sign in → Student tab + Documents. Hosted Demo: accept + sign-out work over Portal API | No Live CMS student create yet |
| Registration menu / enrolled Add-Drop | Not in Applicant portal (Process B = enrolled Student/Registry) | Do not put CY Add/Drop into Applicant; track under Student CAP-10 |
| Server / API / migration | Hosted Demo RPC includes campus persist + letter confirm/accept (auto Offer release) | Live CMS exchange + Staff-owned Offer release remain backlog |

---

## End-to-end flow comparison

### [A] Newer Lesotho CMS (staff-centric)

```text
Applicant record (programme · score · rank · intake)
  → Document Review (LGCSE scan + extract, ~Sesotho subjects)
  → Admissions Review
       Academic recommend → QA recommend → Registrar recommend
  → Admissions payment VERIFIED (Loti M)
  → Accepted / enrolled (offer artefacts campus-local)
```

Staff desks: Admissions Review, Document Review, Applicants, Payments, Intake/Certificate settings. Rank/score and 0/3–1/3 progress appear in the newer UI.

### [B] Older Lesotho CMS (online + staff statuses)

```text
Applicant UI → app_applicationform_online (+ education/guardian SPs)
  + LGCSE docs (app_docfile / app_applicationeducation flat Subject1–6)
  + fee proof (b_paymentverification, LSL/M)
  → Staff Academic (FacultyStatus) → QA (AQA*) → Registrar (Registry*)
  → Offer (r_stdofferletter*) → student create → later enrolment
```

Key objects: `app_applicationform` / `_online` / `_online_enrollment` / `_online_submission`; SPs `InsertOnlineApp*`, `UpdateOnlineApp*`, `FetchOnline*`, `OnlineAppEmailNotification`. Rank/score columns are **not** in the old dump (likely newer-CMS-only).

### [C] Raisd Applicant Demo (applicant-centric, 8 Oct after Faid)

```text
Sign-in (Demo accounts) → 6-step editor
  Consent → Study (Campus* + applicant type + 3 prefs) → Personal → Academic → Documents → Fee
  → Submit
  → Application Progress
       1. Payment Proof — Bursary (verify-payment)
       2. Document Check — QA → DEMO Eligibility Letter
       3. Confirm Eligibility — Applicant (confirmApplicationEligibility)
       4. Offer Letter — Registry (release-offer) → Accept Enrolment
  → Handoff v2 (campus + letters) → Student Profile Documents (local mock)

* Campus + Previous Student ID + letter workflow: local mock only.
  Hosted HTTP shows notice that two-stage acceptance is unavailable.
```

---

## Step-by-step matrix

| # | Lesotho CMS ([A]/[B]) | Raisd Applicant ([C]) | Verdict | M4 note |
|---|---|---|---|---|
| 1 | Online / desk application capture | Six-step validated editor + Demo scenarios | **Mismatch (shape)** | CY was 4-step; Raisd is Consent/Study/Personal/Academic/Documents/Fee — keep if product accepts; do not force CY order for Lesotho |
| 2 | Intake + Opt1/Opt2 programmes | Campus + intake + 3 preferences + applicant/student type | **Partial** | Campus selector shipped locally (standup item Done). Lesotho Live must pin real programmes/fees, not Design clones. Hosted must expose campus |
| 3 | LGCSE extract (Sesotho, cert #, institution) | Generic qualifications + evidence metadata; no LGCSE extract model | **Gap** | Highest Lesotho credential gap — structured extract + campus document types |
| 4 | Flat Subject1–6 × schools in old schema | Repeated qualification rows + optional English | **Partial** | Raisd shape is richer for UI; Live map must still accept LGCSE extract outputs |
| 5 | App fee + proof → Bursary VERIFIED (M) | Fee step + bank reference/proof; Bursary verify in Admin Actions | **Partial (Demo)** | Currency must be **LSL/M**, not MYR; Live Bursary + durable file store |
| 6 | Academic → QA → Registrar recommendations | Progress rows: Bursary → QA → Applicant confirm → Registry offer | **Mismatch (roles)** | CMS staff chain ≠ Raisd’s applicant confirmation between Eligibility and Offer; confirm with Registry whether Eligibility Letter is Lesotho policy or Demo invention |
| 7 | Rank / overall score in newer review UI | Not modelled | **Gap** | Add Schema + staff surfaces if Admissions Review parity required |
| 8 | Offer letter (`r_stdofferletter*`) | DEMO Offer Letter PDF after Registry release (local) | **Partial (Demo)** | Official print/sign/QR path remains campus-local Live work |
| 9 | Direct Accepted / student create | Accept Enrolment → handoff v2 → Student bootstrap (mock) | **Partial (Demo)** | No Live CMS provisioning or durable evidence bytes |
| 10 | Staff Document Review queue (~thousands) | Development Admin Actions only | **Gap (Staff)** | Staff portal Not started — M4 cannot close on Applicant Demo alone |
| 11 | Email notifications (`OnlineAppEmailNotification`) | None | **Gap** | Notifications out of Demo |
| 12 | New / Alumni / Transfer paths | Applicant type enum + Alumni Previous Student ID (local) | **Partial** | Transfer document set + exchange (Registry) still open from standup |
| 13 | NMDS / Assist after accept | Out of applicant journey (Registry/Bursary later) | **Out of this comparison** | See [lesotho-db-gap.md](lesotho-db-gap.md) Flow 4 |

## Role and department mapping

| Lesotho CMS | Raisd Demo progress row | Comment |
|---|---|---|
| Bursary / payment verification | Payment Proof — **Bursary** | Aligned naming in 8 Oct UI |
| Document / QA desks | Document Check — **Quality Assurance** | Aligned; Eligibility Letter is Demo-generated at verify-documents |
| Faculty / Academic recommendation | *(no dedicated applicant row)* | Lives in Staff portal / CMS — not in Applicant Demo |
| Registrar / Registry | Prepare and Release Offer Letter — **Registry** | Aligned for offer release; applicant **Confirm Eligibility** has no direct CMS twin |
| Applicant | Confirm and Proceed with Enrolment | Demo-specific gate between Eligibility and Offer |

---

## What Raisd already covers well (Demo, post-Faid 8 Oct)

1. Multi-step apply with validation, drafts, messages, and immutable submitted snapshots.  
2. Explicit **campus** on Study Preferences (Lesotho selectable among eight sample campuses) — **local mock**.  
3. **Applicant types** New / Alumni / Transfer; Alumni Previous Student ID.  
4. Sequential payment → document verification before approval.  
5. Two-stage letter mock (Eligibility → confirm → Offer → accept) with four-row Application Progress and Student document preservation (local).  
6. Clear DEMO labelling on generated PDFs; hosted build shows explicit notice when letter acceptance is unavailable.  
7. Hosted Demo **login** works after CORS fix.

## Critical gaps for Lesotho M4 Live

1. **LGCSE / Sesotho extract** — model + UI + staff Document Review parity.  
2. **LSL application fee verification** — campus finance profile + durable proof store.  
3. **Staff Academic → QA → Registrar workflow** — Staff portal / Portal API; not Applicant-only.  
4. **Rank/score** — confirm with Admissions whether required; Schema if yes.  
5. **Official offer letter** — replace DEMO PDF with campus print/sign path.  
6. **CMS write-back (CAP-53)** — online app → `app_*` or Schema SoR; Applicant never writes CMS directly.  
7. **Staff-owned Offer release** — replace Demo Portal API auto-`release-offer` after Eligibility confirm.  
8. **Eligibility Letter as product** — validate with Registry; may be Demo-only naming vs CMS “document verified + recommend”.  
9. **Per-type document matrices** (New / Alumni / Transfer) and Registry **exchange-student** rules (standup open questions).  
10. **Real Lesotho catalogue** — programmes, fees, intakes (not Design demo clones).

---

## What still needs to be added / completed on Applicant portal

Ordered backlog for **Applicant** (and its Portal API contract). Staff/Registry items called out where Applicant alone cannot close the gap.

### A. Hosted Demo parity (unblocks “working prototype” narrative)

| Priority | Work | Owner hint | Notes |
|---|---|---|---|
| A1 | Persist `campusId` / `previousStudentId` on Applicant snapshot over HTTP | Portal API + Applicant | **Done** on Demo — campus selector + validation on hosted SPA |
| A2 | Implement letter workflow methods on Portal API | Portal API | **Done** on Demo — `confirmApplicationEligibility` + auto Offer release + guarded `acceptApplicationEnrolment` |
| A3 | Durable issued-letter resources (or signed URLs) on hosted Profile/Documents | Portal API + Student | Local mock carries PDF bytes in handoff v2 only |
| A4 | Staff portal owns Offer release (replace Demo auto-release) | Staff + Portal API | Demo shortcut remains until Staff command ships |

### B. Lesotho / M4 applicant content (product + Schema)

| Priority | Work | Owner hint | Notes |
|---|---|---|---|
| B1 | LGCSE extract fields + Sesotho subjects + certificate # | Schema + Applicant CAP-03 | Highest credential gap vs [A]/[B] |
| B2 | LSL/M fee copy and verification rules | Applicant + Finance policy | Seed in [`campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml) (M300 LSL proposed) — Faid Accept then Applicant Demo copy |
| B3 | Pin Lesotho programmes / intakes / fee amounts | Catalogue / campus config | Fee amount/currency seeds in same YAML; programme/intake catalogue still open |
| B4 | Document checklists by applicant type (New / Alumni / Transfer) | Applicant + Registry | Standup chapter 29:20; unified vs split flow still open |
| B5 | Confirm Eligibility Letter + Confirm Eligibility step with Registry | Product / Registry | May simplify to CMS-like recommend chain |

### C. Outside Applicant but required for M4 acceptance

| Priority | Work | Owner hint |
|---|---|---|
| C1 | Staff portal desks: Bursary verify, Document Review, Academic→QA→Registrar | Staff |
| C2 | Exchange-student handling | Dexter/MIT ↔ Registry (standup #7) |
| C3 | Cambodia QR documentation | **Done** — [certificate-qr.html](../../diagrams/old-cms-cambodia/certificate-qr.html) |
| C4 | CAP analysis / progress-report review | Faid (standup #4–5) |
| C5 | Email / notifications | Platform — CMS had `OnlineAppEmailNotification` |
| C6 | CAP-53 W1 online-enrolment payment proof | Portal API + Student | Path documented — [lesotho-cap53-online-enrolment-write.md](lesotho-cap53-online-enrolment-write.md) · Pages [`cap53-online-enrolment.html`](../../diagrams/old-cms-lesotho/cap53-online-enrolment.html) |

### D. Explicitly out of Applicant scope

- Enrolled **registration menu** / Add-Drop (Student Process B).  
- NMDS / Assist billing (post-accept finance).  
- International EMGS/NOC (Cyberjaya research only).

---

## Recommended next work (ordered)

1. **Registry/Admissions:** confirm Eligibility Letter + applicant Confirm Eligibility vs Lesotho CMS Academic→QA→Registrar.  
2. **Campus finance profile + fee cases** — **Done (seed)** 9 Oct: [`campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml) · [campus-finance-profile.md](campus-finance-profile.md) · Pages [`campus-finance-profile.html`](../../diagrams/old-cms-lesotho/campus-finance-profile.html) — awaiting Faid Accept.  
3. **CAP-53 W1 online-enrolment proof** — path documented; implement next: [lesotho-cap53-online-enrolment-write.md](lesotho-cap53-online-enrolment-write.md).  
4. **Schema + CAP-03:** LGCSE extract fields; wire Applicant Academic/Documents.  
5. **Applicant type matrices** + Registry exchange answer (standup open Qs).  
6. **Staff portal MVP** for payment/document/recommend/offer desks (incl. Staff-owned Offer release).  
7. Keep FE gap rows in [luct-online-registration-fe-gap.md](luct-online-registration-fe-gap.md); update Flow 1 in [lesotho-db-gap.md](lesotho-db-gap.md) when Schema fields land — do not fork a third spreadsheet.

---

## Standup closure

| Action item (7 Oct) | Status after this note |
|---|---|
| Compare old Lesotho CMS application flow with current applicant portal | **Done** — this document + Pages |
| Provide analysis the following morning | **Done** — 8 Oct 2026 |
| Refresh after Faid campus/letters merge | **Done** — same day |

Related standup items: login CORS **done**; Faid campus/letters on `main` + Iman prod redeploy **done** (`532d6f0`); hosted letter/campus API **still open**; Cambodia QR **done** (full pack inventory on Pages).
