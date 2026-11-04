# Lesotho feature gaps — workflow and control improvements

**Action:** WG standup 27 Oct 2026 — *Iman Suherman will analyze Lesotho’s feature gaps and propose workflow and control improvements to discuss with Faid.*  
**As of:** 28 October 2026.  
**Source meeting:** Read.ai — *CMS 2026 Daily Stand-up meeting 7PM Malaysia (GMT +8)*, 27 Oct 2026, 10:00–10:37 PM.  
**Pilot:** [Lesotho pilot](../architecture/lesotho-pilot.md) (M4).  
**Pages:** [`workflow-control-improvements.html`](../../diagrams/old-cms-lesotho/workflow-control-improvements.html).  
**Evidence (no PII):** [lesotho-newer-cms.md](lesotho-newer-cms.md) (23–26 Oct Admin walk) · [newer-cms-gap.html](../../diagrams/old-cms-lesotho/newer-cms-gap.html) · [lesotho-db-gap.md](lesotho-db-gap.md) · [lesotho-cms-vs-applicant-portal.md](lesotho-cms-vs-applicant-portal.md) · [university-flows.md](university-flows.md) · [access-module-hierarchy.md](access-module-hierarchy.md).

This document is a **proposal for Faid / Working Group**. It is not Live campus policy and does not claim Raisd Live parity.

## Scope cut (standup 27 Oct)

**Leave out for now (confirmed):** **HRMS · LMS · Website · Library · Mail.** Full assignment of remaining newer-CMS menus → modules: [lesotho-feature-modules.md](lesotho-feature-modules.md). Printed outputs should keep **QR verification** where the newer CMS already prints QR (certificates). Delivery should stay phased (~two or three features per week), with human testing of AI-assisted modules.

| In modular pack (organize into FM-*) | Explicitly out (FM-X) |
|---|---|
| Admissions review + document extract | **HRMS** (HR + appraisals) |
| Applicant → staff desks → offer / accept | **LMS** (Five Days + Fortinet) |
| Registration request queue + clearance + NMDS borrower | **Website** (campus CMS / marketing) |
| Student file (academics, finance, sponsors, card, print) | **Library** (incl. e-library) |
| LSL fees & fines catalogue (Bursary verify path) | **Mail** (in-portal client; use Raisd `notify` instead) |
| Position → Control role / desk mapping | |
| Graduations / certificates / hoods (if ceremony in M4) | |
| Discipline · Analytics reports (late modules FM-17/18 — not excluded) | |

## Feature gap summary (newer CMS → Raisd)

Raisd status is Demo unless marked otherwise. Full row matrix: [lesotho-newer-cms.md §15](lesotho-newer-cms.md#15-gap-against-the-raisd-system-under-development).

| Priority | Gap | Newer CMS signal | Raisd today | Why it blocks M4 |
|---|---|---|---|---|
| P0 | Admissions multi-step review | Progress n/3, rank, score, recommended / not, by school | Applicant Demo + staff queue + University Flows desks; **no** rank/score/n/3 parity | Campus benchmark for staff admissions |
| P0 | Document review / LGCSE | Typed document chips; certificate extract | CAP-03 staff extract desk not started | Lesotho credential overlay |
| P0 | Registration request queue | Module lines, sponsor, borrower #, clearance, history | Student Demo registration; staff clearance path thinner | Enrolled-student ops after admit |
| P0 | Position-level control | 28 positions; resource + action permissions | Four Access presets + Control custom roles (Admin tree still coarse) | Desk authz without copying Google Dev Login |
| P1 | Student registry file | ~12-tab student master | CAP-53 read mapped, not implemented; staff tracker ≠ file | Registry day-to-day |
| P1 | LSL fee catalogue | Fees & Fines + Configure rates | Single admissions LSL amount; finance profile proposed | Bursary cannot run on one fee row |
| P1 | NMDS on registration | Borrower on student + request | Assist path documented; no TEF-style HTTP | Do not copy Botswana DTEF |
| P1 | Print / QR artefacts | SoR print, certificates with QR, name tags | Demo screens; Cambodia QR is separate M5 reference | Government-grade print expectation |
| P2 | Graduation clearance | Multi-dept gates + gown/fee messages | Student Demo graduation | Wizard ≠ one status bit |
| P2 | Remarks staff queue | Badge + re-assessment fee | Student Demo remark only | Staff reassessment |
| — | HRMS / LMS / Website / Library / Mail | Full sidebar groups | Out of Raisd portal set | Confirmed leave-out; Analytics stays late FM-17 |

## Proposed workflow improvements

University Flows today is **Admissions v1** only (typed settings, no script builder). Lesotho’s newer CMS encodes richer desk sequences. Propose extending **policy**, not inventing a second SoR.

### W1 — Lesotho Admissions policy profile (Control → Portal API)

| Change | Detail | Discuss with Faid |
|---|---|---|
| Review order | Map Academic → QA → Registrar (plus optional Bursary / SSD if campus uses them) onto existing desk enums | Confirm exact n/3 owners for Lesotho intake |
| Rank / score | Add optional numeric fields on the staff admissions case (display + sort), sourced from campus policy flags | Required for Live, or Demo-only first? |
| Recommendation | Persist recommended / not recommended + reason per desk step (already closer to old CMS Faculty/AQA/Registry statuses) | Align labels with newer CMS chips |
| Document types | Policy list for LGCSE / Sesotho / certificate number extract stages | Which types are mandatory per intake |
| Fee milestone | Keep eligibility-first; Registration Fee in **LSL**; wire [campus-finance-profile](campus-finance-profile.md) seeds | Accept M300 / catalogue depth |
| Print / QR | Offer and certificate print stay campus artefacts; Raisd stores verification metadata, not private keys in git | Whether Applicant offers need QR in M4 |

### W2 — Registration clearance as Flow #2 (or Admissions continuation)

Newer CMS registration requests carry sponsor, borrower number, per-module pending, and clearance history. Propose a **Registration** University Flow definition (same Control UX pattern as Admissions):

1. Student submits module request (existing Demo path).  
2. Bursary verifies fee / arrangement (existing).  
3. Faculty / Registry clearance with **NMDS borrower** on the case (new field).  
4. CAF / confirmation only after gates pass (existing international rules stay policy-driven).

Do **not** model this as a single `ApplicationStatus` integer.

### W3 — Graduation clearance (post–admissions pilot, still in Registry module)

Treat Academic / Finance / Library clearance as **gates with messages** (gown fee, etc.), not two boolean bits. Defer implementation until P0/P1 land unless ceremony ops are acceptance-critical — Faid to confirm.

### W4 — Delivery cadence

| Cadence | Proposal |
|---|---|
| Weekly | Ship 2–3 closed features with staff + applicant walkthrough (text-first reports) |
| Testing | Human test of full positive/negative paths even when modules are AI-assisted |
| Progress language | Report Demo ≠ Live; avoid “ready to launch” while UI/workflow remain open (standup caution) |

## Proposed control improvements

“Control” here means Raisd **Control** (`control.raisd.co`) + SSO RBAC + University Flows desks — not Lesotho Google Dev Login.

### C1 — Position → custom role seed map

**Status (Demo W1):** Seeded in SSO (`lesothoPositionRoles` + Keychain `lesotho.*@raisd.demo`). Built-in Campus Admin unchanged; narrow roles omit `admin.access`.

| Newer CMS position (examples) | Raisd Control custom role | Entry | Desks / modules |
|---|---|---|---|
| Registry HOD / Registry Manager | `lesotho-registry` | Admin | Registrations, Students, Applicants (read), Access none |
| QA / Academic Quality | `lesotho-qa` | Admin | Applicants + QA desk on Flows |
| Finance / Bursary | `lesotho-bursary` | Admin | Payments + bursary desk |
| Academic / Faculty reviewer | `lesotho-faculty-review` | Admin | Applicants + Faculty desk |
| Year Leader | `lesotho-year-leader` | Admin (narrow) | Students read + named registration view (TBC) |
| Campus Admin | Built-in Campus Admin | Admin | Full Admin tree |

Publishing a Flow **never** grants portal access (existing rule). People assignment stays on Control Members / desk section.

### C2 — Expand Admin grantable tree toward newer CMS resources

Access presets stay fixed (Applicant / Student / Staff / Lecturer). Control custom roles should grow Admin children so Lesotho positions are not forced into “full Campus Admin”:

- Applicants (keep)  
- Document review (new sub when CAP-03 lands)  
- Students / registry file (when CAP-53 staff UI lands)  
- Registrations (keep; deepen clearance)  
- Payments (keep)  
- Access (Campus Admin only)

Do **not** import HR / Library / LMS resources into Control for M4.

### C3 — Keep identity on Raisd SSO

Newer CMS Google + link + Dev Login is the campus benchmark for **roles**, not the Raisd Live identity product. Demo keychain remains the staging switcher analogue. No Google-link requirement for Lesotho pilot acceptance.

## Modular packaging

Full division of existing vs missing features into independent modules (**FM-01…FM-16**, **FM-X** out of pack): [lesotho-feature-modules.md](lesotho-feature-modules.md) · Pages [`feature-modules.html`](../../diagrams/old-cms-lesotho/feature-modules.html).

| Quick map | Module ID |
|---|---|
| Admissions desks + Flows Lesotho profile | FM-03 · FM-05 |
| CAP-53 student read + registry file | FM-07 |
| Registration clearance + NMDS | FM-08 |
| Finance profile + LSL catalogue | FM-09 |
| Control position seeds | FM-15 |
| Print / QR verification metadata | FM-12 |
| Applicant journey (Faid-owned rewrite) | FM-02 |

## Faid — please confirm

1. **Scope cut:** Confirm leave-out **HRMS · LMS · Website · Library · Mail**. Any ceremony (graduation/certificates) that must stay in?  
2. **W1:** Exact Lesotho admissions desk order and whether rank/score are Live-required.  
3. **W2:** Registration as a second University Flow vs Admissions continuation.  
4. **C1:** Approve or rename the five Lesotho custom-role seeds; list any missing positions.  
5. **Discipline / letters / blocked students:** In or out of M4?  
6. **Fee catalogue:** Depth beyond application fee for pilot (full Fees & Fines vs admissions-only).

## Related

| Topic | Path |
|---|---|
| Pages | [workflow-control-improvements.html](../../diagrams/old-cms-lesotho/workflow-control-improvements.html) |
| Feature modules (FM-01…FM-16) | [lesotho-feature-modules.md](lesotho-feature-modules.md) · [feature-modules.html](../../diagrams/old-cms-lesotho/feature-modules.html) |
| Newer CMS gap | [lesotho-newer-cms.md](lesotho-newer-cms.md) · [newer-cms-gap.html](../../diagrams/old-cms-lesotho/newer-cms-gap.html) |
| DB × FE × flows | [lesotho-db-gap.md](lesotho-db-gap.md) |
| CMS vs Applicant | [lesotho-cms-vs-applicant-portal.md](lesotho-cms-vs-applicant-portal.md) |
| University Flows | [university-flows.md](university-flows.md) |
| Access / Control | [access-module-hierarchy.md](access-module-hierarchy.md) · [control-portal.md](../frontend/control-portal.md) |
| Finance profile | [campus-finance-profile.md](campus-finance-profile.md) |
| Pilot framing | [lesotho-pilot.md](../architecture/lesotho-pilot.md) |
