# Lesotho — feature modules (agreed functionality)

**Actions (standup 27 Oct 2026):**  
1. Propose how to divide existing and missing features into independent modules.  
2. **Organize agreed system functionality into modules**, excluding out-of-scope ones.  

**As of:** 28 October 2026 (exclusions confirmed: HRMS · LMS · Website · Library · Mail).  
**Source meeting:** Read.ai — *CMS 2026 Daily Stand-up*, 27 Oct 2026.  
**Pages:** [`feature-modules.html`](../../diagrams/old-cms-lesotho/feature-modules.html).  
**Inventory SoT:** [lesotho-newer-cms.md](lesotho-newer-cms.md) Admin mind map · [lesotho-workflow-control-improvements.md](lesotho-workflow-control-improvements.md) · [SDD-11](../../sdd/11-capability-catalog.md).

Proposal for WG / Faid — not Live policy. Demo ≠ Live.

## Agreed exclusions (leave out for now)

Do **not** build Raisd modules or assign M4 sprint capacity for these newer-CMS sidebar groups:

| # | Exclude | Newer CMS menus covered | Notes |
|---|---|---|---|
| 1 | **HRMS** | Human Resource (Employees, Contracts, Positions, Unit Heads, Vacancies) · Appraisals (Academic, Support, Teaching Observations, Student Feedback, Settings) · Analytics → Appraisals | Paramasvara HRMS code share is reference-only, not a Raisd module |
| 2 | **LMS** | Five Days (LMS courses) · Academic → Fortinet | Raisd LMS research stays separate; not Lesotho M4 SoR |
| 3 | **Website** | Website (Pages, Articles, Categories, Featured Programs, Enquiries, Campus Sites, Alumni, Media, Events) | Campus marketing CMS stays outside Raisd portals |
| 4 | **Library** | Library (Catalog, Loans, Books, Fines, E-Library, Publications, Question Papers, Authorities) · Analytics → Library | Deferred until after launch (standup) |
| 5 | **Mail** | Mail (Compose, Inbox, Accounts, Templates, Drafts, Sent, Queue) | Raisd outbound is **FM-13** `notify.raisd.co`, not an in-portal mail client |

Everything else in the newer CMS Admin mind map is **organized into FM-01…FM-18** below (or noted as phase-2 inside a module).

## Independence rules

| Rule | Meaning |
|---|---|
| R1 | **One job** — one staff or applicant outcome per module |
| R2 | **Stay out of Faid’s flow rewrite** — Applicant versioned-flow / access-rule work stays Faid-owned (FM-02) |
| R3 | **Demo alone** — show on Lesotho hosts with sample data without Live CMS write |
| R4 | **Contract first** — Portal API / OpenAPI / Flows typed settings before UI polish |
| R5 | **Human test** — positive and negative paths even if AI-assisted |
| R6 | **Exclusions** — HRMS, LMS, Website, Library, Mail are never FM deliverables in this pack |

## Organized functionality — newer CMS → module

Maps every **in-scope** Admin sidebar item (and Raisd Demo surface) to a module. Excluded groups are omitted (see table above).

### Registry

| Newer CMS item | Module | Phase |
|---|---|---|
| Students (master / tabs) | **FM-07** | Core |
| Documents (registry docs) | **FM-07** | Core |
| Registration (request queue) | **FM-08** | Core |
| Graduations · Dates · Hoods · Name tags | **FM-10** | Core if ceremony in M4; else W4 |
| Certificates · Print batches · Collections · Stock | **FM-10** · **FM-12** | With FM-10 |
| Student Status | **FM-07** | Core |
| Remark Requests | **FM-11** | After student remarks Demo |
| Student Referrals · Notes | **FM-07** | Phase 2 inside FM-07 |
| Letters · Templates | **FM-07** | Phase 2 (not Mail FM-X) |
| Blocked Students | **FM-07** | Phase 2 |
| Terms | **FM-07** · settings overlap **FM-05** | Core term codes |

### Discipline

| Newer CMS item | Module | Phase |
|---|---|---|
| Academic Dishonesty · Suspensions | **FM-18** | Late / after P0–P1 |

### Admin (campus control — not Website/Mail)

| Newer CMS item | Module | Phase |
|---|---|---|
| Users · Positions | **FM-01** · **FM-15** | Core |
| Notifications (templates / broadcast) | **FM-13** | Core (Raisd notify — not Mail) |
| Calendar · Academic Calendar | **FM-16** | With academic deepen |
| Activity Tracker | **FM-01** | Phase 2 audit |
| Settings (non-HR / non-Library) | **FM-05** / owning desk | Per domain |
| Tools (Simulator, Grade Finder, AI Query) | **FM-16** | Late / optional |
| Bulk: Export Transcript · Student Cards · Photos | **FM-07** · **FM-12** | Cards/photos with registry; transcript with print |

### Academic (excluding Fortinet / Five Days)

| Newer CMS item | Module | Phase |
|---|---|---|
| Lecturers · Modules · Schools · Curriculum | **FM-16** | After admissions/registry P0 |
| Assessments · Assessment Types · Gradebook | **FM-16** | Same |
| Attendance | **FM-16** (staff) · **FM-06** (student Demo) | Student already Demo |
| Timetable · Generator · Allocations · Venues | **FM-16** | Late generator |
| Fortinet | **Excluded (LMS)** | — |
| Five Days | **Excluded (LMS)** | — |

### Finance

| Newer CMS item | Module | Phase |
|---|---|---|
| Sponsors (incl. NMDS fields) | **FM-08** · **FM-09** | Core with registration |
| Banks · Debtors | **FM-09** | Phase 2 after catalogue |
| Pricing · Repeat Modules · Fees and Fines · Payment Plans | **FM-09** | Core catalogue first |

### Admissions

| Newer CMS item | Module | Phase |
|---|---|---|
| Review (n/3, rank, score) | **FM-03** · **FM-05** | Core |
| Applicants | **FM-03** · **FM-02** | Staff vs applicant portal |
| Admissions Payments | **FM-09** · **FM-03** | Fee verify on admissions path |
| Document Review | **FM-04** | Core |
| Settings: Intake · Certificate types · Subjects · Schools · Entry requirements | **FM-05** | Lesotho policy profile |

### Analytics (not excluded — deferred reports)

User exclusion list did **not** drop Analytics. Keep as late module; skip appraisal/library report pages that only serve FM-X.

| Newer CMS item | Module | Phase |
|---|---|---|
| Admissions · Student Enrollments · Graduations · Sponsor Reports · Portal Usage | **FM-17** | After W2–W3 |
| Course Summary · Attendance · Board of Examination · Senate | **FM-17** | Late |
| Appraisals · Library reports | **Excluded** (depend on HRMS / Library) | — |

### Sign-in / Raisd shell (not newer CMS menus)

| Surface | Module |
|---|---|
| Raisd SSO · Access presets · Control roles | **FM-01** |
| Campus landing + portal hosts | **FM-14** |
| Applicant portal journey | **FM-02** (Faid-owned rewrite) |
| Student portal Demo suite | **FM-06** |
| University Flows Admissions v1 | **FM-05** |

## Module catalogue

Status: **Existing** · **Partial** · **Missing**.

| ID | Module | Status | Organizes (summary) | Depends on |
|---|---|---|---|---|
| **FM-01** | Identity & Access | Existing | SSO, Access presets, Control roles, Users | — |
| **FM-02** | Applicant journey | Partial | Apply wizard / offer / accept | FM-01; **Faid owns** rewrite |
| **FM-03** | Admissions staff desks | Existing (Demo W1) | Review queue Progress/Rank/Score/Recommendation, n/3 desk action | FM-01, FM-05 |
| **FM-04** | Document extract (LGCSE) | Existing (Demo W1) | Document Review route + `extract-document` on applicant-store | FM-03 |
| **FM-05** | Flows — Lesotho Admissions profile | Existing (Demo W3) | `review.*` + Demo `catalogues` (intakes, certificates, subjects, schools, entry); Control surface; Admissions Payments via Staff Payments | FM-01 |
| **FM-06** | Student self-service | Existing | Student Demo journeys | FM-01 |
| **FM-07** | Staff registry file (CAP-53) | Existing (Demo) | Staff Students list + **12-tab** Demo file (enriched Academics/Graduation/Notes/Audit); banner Demo≠Live; Live CAP-53 write-back still later | FM-01 |
| **FM-08** | Registration clearance + NMDS | Existing (Demo) | Borrower/sponsor on request + file Sponsors + **Create Sponsorship master** (`/admin/sponsors`) | FM-05/03, FM-09 |
| **FM-09** | Finance + LSL catalogue | Existing (Demo W3) | Profile JSON + Fees & Fines Staff preview (Application/Acceptance/Registration + walk seeds); banks/debtors/plans later | FM-01 |
| **FM-10** | Graduation & certificates | Existing (Demo) | `/admin/graduations` ceremony desk + file Graduation tab (hoods / name-tag preview) | FM-07, FM-12 |
| **FM-11** | Remarks staff queue | Existing (Demo) | `/admin/remarks` + LSL re-assessment fee lines | FM-06 |
| **FM-12** | Print / QR metadata | Existing (Demo) | `/admin/certificates` Demo batches + QR payload placeholder (not Cambodia Live) | FM-10 |
| **FM-13** | Notifications | Existing | Outbound email (`notify`) — replaces need for Mail | FM-01 |
| **FM-14** | Campus landing & hosts | Existing | `*.lesotho.raisd.co` | FM-01 |
| **FM-15** | Control position seeds | Existing (Demo W1) | Five `lesotho-*` SSO custom roles + desk tags + Keychain | FM-01, FM-05 |
| **FM-16** | Academic deepen | Existing (Demo) | `/admin/academic` attendance rollup + gradebook; timetable generator / venues later | After P0/P1 |
| **FM-17** | Analytics (campus reports) | Existing (Demo) | `/admin/analytics` Demo count cards (enrolments, admissions, registrations, graduations, sponsors) — no HR/Library | After W2–W3 |
| **FM-18** | Discipline | Existing (Demo) | `/admin/discipline` dishonesty / suspension / blocked list | Late |
| **FM-X** | Excluded | — | **HRMS · LMS · Website · Library · Mail** | No M4 capacity |

## Existing Demo → module

| Existing Demo | Module |
|---|---|
| SSO + apex login / picker | FM-01 · FM-14 |
| Access presets + Control roles + Flows Admissions v1 | FM-01 · FM-05 |
| Applicant submit / evidence / offer / accept | FM-02 · FM-09 |
| Staff Applicants / Payments / Registrations | FM-03 · FM-08 · FM-09 |
| Student portal Demo suite | FM-06 (+ deepen FM-08/09/10/11) |
| Notifications outbound | FM-13 |
| CAP-53 mapping · finance YAML | feeds FM-07 · FM-09 |

## Screenshot gap → modules still to develop (post W1+W2)

**SoT:** newer CMS Admin screenshots under [`docs/diagrams/old-cms-lesotho/screenshots/`](../../diagrams/old-cms-lesotho/screenshots/) (~278 frames) · leave-outs locked above.  
**Bar:** Demo ≠ Live. W1+W2 closed admissions desks / LGCSE extract seed / NMDS-on-request / LSL application-fee loader — not full CMS desks.

### Leave out (do not develop)

| Exclude | Screenshot menus |
|---|---|
| **HRMS** | Human Resource · Appraisals · Analytics → Appraisals |
| **LMS** | Five Days · Fortinet |
| **Website** | Website (Pages … Events) |
| **Library** | Library · Analytics → Library |
| **Mail** | Mail client (use **FM-13** outbound notify instead) |

### Must develop next (in-scope gaps)

| Priority | Module | Screenshot evidence | Build |
|---|---|---|---|
| **P0** | **FM-07** Staff registry file | Students list (~21.5k) + **12 tabs** | **W3 Demo met** — Live CAP-53 still later |
| **P0** | **FM-09** Finance + LSL catalogue (deepen) | Fees & Fines preview; Banks; Debtors; Payment Plans | **W3 Demo catalogue met** — banks/plans **W4** |
| **P0** | **FM-05** Flows Lesotho profile (deepen) | Admissions Settings catalogues; Admissions Payments | **W3 Demo catalogues met** |
| **P1** | **FM-08** Registration + NMDS (deepen) | Sponsor on file + request; Create Sponsorship master; history | **Demo met** — `/admin/sponsors` master + file/request |
| **P1** | **FM-03 · FM-04** Admissions deepen | Review dashboard (by school, activity); Document Review at scale + Verified/Rejected + full LGCSE fields | After W2 seed |
| **P1** | **FM-10 · FM-12** Ceremony / print | Graduations · Hoods · Name tags · Certificate batches / stock / QR | **Demo met** — `/admin/graduations` + `/admin/certificates` (Live QR later) |
| **P2** | **FM-11** Remarks staff queue | Remark Requests badge; re-assessment fee | **Demo met** — `/admin/remarks` |
| **P2** | **FM-16** Academic deepen | Timetable generator / allocations / venues; staff attendance | **Demo partial** — attendance/gradebook desk; generator later |
| **P2** | **FM-17** Analytics | Enrollment / registration / graduation / senate / BoE (no HR/Library reports) | **Demo met** — `/admin/analytics` cards |
| **P2** | **FM-18** Discipline | Academic Dishonesty · Suspensions · Blocked Students | **Demo met** — `/admin/discipline` |
| **Parallel** | **FM-02** Applicant journey | Applicant wizard / versioned flow | **Faid-owned** — no cross-module PRs into flow internals |

### Registry phase-2 (inside FM-07 — confirm with Faid)

| Screenshot desk | In M4? |
|---|---|
| Letters / templates | Confirm |
| Student Referrals · Notes | Confirm |
| Student Status | Confirm |
| Blocked Students | Confirm |

### Demo role playback

Step-by-step Demo portal **screenshots** of Raisd W1–W3 features **one role after another**:
Applicant → Faculty Review → QA → Bursary → Registry → Year Leader → Student → Control.

Each scene shows a screen from `playback-videos/*.poster.jpg`, lists **How executed** (Keychain + click path), and is indexed by FM tags (`?fm=FM-09`, `?scene=bur-pay`, `?role=bursary`). Navigate with Prev / Next.

Pages: [`docs/diagrams/old-cms-lesotho/demo-role-playback.html`](../../diagrams/old-cms-lesotho/demo-role-playback.html) · script [`demo-role-playback.js`](../../diagrams/old-cms-lesotho/demo-role-playback.js) · capture [`record-playback-videos.mjs`](../../diagrams/old-cms-lesotho/record-playback-videos.mjs).

### Already sufficient for Demo (not “done Live”)

| Module | Demo bar met | Still not Live CMS |
|---|---|---|
| FM-01 · FM-13 · FM-14 | SSO, notify, hosts | — |
| FM-03 · FM-04 · FM-15 | n/3, extract seed, position seeds | Scale UX / OCR / 28 positions |
| FM-06 | Student Demo suite | Registry-grade print |
| FM-08 · FM-09 | Borrower on request + file Sponsors; Fees & Fines Demo preview | Sponsor master; banks/debtors/plans; Live amounts |
| FM-05 | `review.*` + Demo catalogues + Payments desk | Live Lesotho catalogue sync |
| FM-07 | Staff Students + 12-tab Demo file | Live CAP-53; phase-2 letters/blocked |

### Gap → module (quick)

| Gap vs newer CMS | Module | Develop? |
|---|---|---|
| 12-tab student file | **FM-07** | **W3 Demo done** — Live CAP-53 next |
| LSL Fees & Fines / banks / debtors / plans | **FM-09** | Catalogue Demo done — banks/plans next |
| Admissions settings + payments | **FM-05** | **W3 Demo done** |
| Sponsor master + NMDS on student | **FM-08** | File/request done — sponsor master next |
| Review/Document CMS UX depth | **FM-03 · FM-04** | Yes — polish |
| Certificate / hood / name-tag / QR | **FM-10 · FM-12** | Yes if ceremony in M4 |
| Staff remarks desk | **FM-11** | Yes — later |
| Timetable generator | **FM-16** | Yes — later |
| Campus report pack (non-HR/Library) | **FM-17** | Yes — later |
| Discipline desks | **FM-18** | Yes — later |
| Applicant versioned-flow rewrite | **FM-02** | Faid parallel |
| HRMS · LMS · Website · Library · Mail | **FM-X** | **No** |

## Dependency graph

```text
FM-01 Identity
  ├── FM-14 Landing · FM-13 Notifications (not Mail)
  ├── FM-05 Flows profile
  │     ├── FM-03 Admissions desks ── FM-04 Documents
  │     └── FM-08 Registration + NMDS ── FM-09 Finance
  ├── FM-02 Applicant (Faid-owned, parallel)
  ├── FM-06 Student ── FM-08 / FM-11 / FM-10 ── FM-12
  ├── FM-07 Registry file · FM-15 Positions
  ├── FM-16 Academic deepen (late)
  ├── FM-17 Analytics reports (late; no HR/Library reports)
  └── FM-18 Discipline (late)

FM-X  HRMS · LMS · Website · Library · Mail   ← no edges into M4
```

## Build waves (≈2–3 features / week)

| Wave | Modules | Goal |
|---|---|---|
| **W0** | FM-01, FM-14, FM-13, FM-05 draft | Identity + policy shell |
| **W1** | FM-03, FM-04, FM-15 | Admissions parity + desk roles |
| **W2** | FM-08, FM-09 | Registration + LSL fees |
| **W3** | FM-07 | Staff registry file |
| **W4** | FM-10, FM-12 | Ceremony / QR (if in M4) |
| **W5** | FM-11, FM-16 | Remarks staff; academic admin |
| **W6** | FM-17, FM-18 | Reports; discipline |
| **Parallel** | FM-02 | Faid Applicant rewrite |

## Ownership

| Owner | Modules |
|---|---|
| **Faid** | FM-02 |
| **Iman / Portal API** | FM-05, FM-07, FM-08, FM-09, FM-03/04 API |
| **Iman / Control** | FM-15, FM-05 Control UX |
| **Aslam** | Try FM-03 or FM-09 first (standup) |
| **Paramasvara** | HRMS share stays **FM-X** (reference only) |

## Faid — please confirm

1. Exclusions locked: **HRMS · LMS · Website · Library · Mail**?  
2. Keep **FM-10/FM-12** and **FM-17/FM-18** in later waves, or drop any?  
3. FM-07 phase-2 (letters / blocked / referrals) in or out of M4?  
4. FM-02 remains Faid-owned with no cross-module PRs into Applicant flow internals?

## Related

| Topic | Path |
|---|---|
| Pages | [feature-modules.html](../../diagrams/old-cms-lesotho/feature-modules.html) |
| Workflow & control | [lesotho-workflow-control-improvements.md](lesotho-workflow-control-improvements.md) |
| Newer CMS manual / gap | [lesotho-newer-cms.md](lesotho-newer-cms.md) |
| Pilot | [lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| CAP catalogue | [SDD-11](../../sdd/11-capability-catalog.md) |
