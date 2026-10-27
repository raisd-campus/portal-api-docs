# Lesotho — divide features into independent modules

**Action:** WG standup 27 Oct 2026 — *Iman Suherman will propose how to divide existing and missing features into independent modules.*  
**Companion action:** *organize the agreed system functionality into modules, excluding modules not in this scope* (same cut as below).  
**As of:** 28 October 2026.  
**Source meeting:** Read.ai — *CMS 2026 Daily Stand-up*, 27 Oct 2026.  
**Pages:** [`feature-modules.html`](../../diagrams/old-cms-lesotho/feature-modules.html).  
**Related:** [lesotho-workflow-control-improvements.md](lesotho-workflow-control-improvements.md) · [lesotho-newer-cms.md](lesotho-newer-cms.md) §15 · [lesotho-db-gap.md](lesotho-db-gap.md) · [lesotho-pilot.md](../architecture/lesotho-pilot.md) · [SDD-11](../../sdd/11-capability-catalog.md).

Proposal only — not Live policy. Demo ≠ Live.

## Independence rules

A Raisd **module** here is a shippable slice with a named owner surface, clear CAP IDs, and a demo path that does **not** require unfinished work in another module.

| Rule | Meaning |
|---|---|
| R1 | **One job** — one staff or applicant outcome per module (queue, file, fee catalogue, …) |
| R2 | **Stay out of Faid’s flow rewrite** — Applicant versioned-flow / access-rule restructuring stays Faid-owned; other modules consume published Flows + Portal API only |
| R3 | **Demo alone** — can show the module on Lesotho hosts with sample data without Live CMS write |
| R4 | **Contract first** — Portal API / OpenAPI / Flows typed settings before UI polish |
| R5 | **Human test** — positive and negative paths even if implementation is AI-assisted (standup) |
| R6 | **Scope cut** — HRMS, LMS (FiveDays / in-house later), Library are **not** modules in this pack |

## Scope cut (same as workflow/control proposal)

| In this modular pack | Out (no module ID) |
|---|---|
| Admissions, registry student file, registration clearance, NMDS, LSL finance, Control positions, print/QR metadata, remarks staff (if accepted), graduation/certificates (if accepted) | Human Resource / appraisals, Library, FiveDays LMS, Fortinet, Website CMS, in-portal Mail, full Analytics pack |
| Discipline / blocked / letters | **TBC with Faid** — no module until confirmed in |

## Module catalogue

Status: **Existing** = Raisd Demo surface already usable · **Partial** = Demo exists but missing Lesotho benchmark depth · **Missing** = not started or mapped-only.

| ID | Module | Status | Surfaces | Primary CAP / contract | Depends on |
|---|---|---|---|---|---|
| **FM-01** | Identity & Access | Existing | SSO · Access presets · Control custom roles | CAP-01 · [access-module-hierarchy](access-module-hierarchy.md) | — |
| **FM-02** | Applicant journey | Partial | `apply.lesotho.raisd.co` | CAP-02 · CAP-07 · admissions handoff | FM-01; **Faid owns** flow rewrite |
| **FM-03** | Admissions staff desks | Partial | Staff Applicants queue · Flow desks | CAP-03–05 · CAP-07 · [university-flows](university-flows.md) | FM-01, FM-05 |
| **FM-04** | Document extract (LGCSE) | Missing | Staff document review | CAP-03 staff | FM-03 (queue), durable file store |
| **FM-05** | University Flows — Lesotho Admissions profile | Partial | Control `/flows` | university-flows contract | FM-01 |
| **FM-06** | Student self-service | Existing | Student portal Demo (profile → remarks) | CAP-08–15 · CAP-45–48 · CAP-51 | FM-01 |
| **FM-07** | CAP-53 CMS read + staff registry file | Missing | Portal API reads · Staff Students | CAP-53 · [lesotho-cap53-read-adapter](lesotho-cap53-read-adapter.md) | FM-01; old CMS / Schema path |
| **FM-08** | Registration clearance + NMDS | Partial | Student reg Demo · Staff Registrations | CAP-10 · CAP-48 · Flows #2 proposal | FM-05 or FM-03 continuation; FM-09 for fees |
| **FM-09** | Finance profile + LSL catalogue | Partial | Applicant fee copy · Staff Payments | CAP-45–47 · [campus-finance-profile](campus-finance-profile.md) | FM-01 |
| **FM-10** | Graduation & certificates | Partial | Student Demo graduation · staff print later | CAP-15 | FM-07 for roster; FM-12 for QR |
| **FM-11** | Remarks staff queue | Missing | Staff reassessment desk | CAP-51 staff | FM-06 student request exists |
| **FM-12** | Print / QR verification metadata | Missing | Certificates · SoR · name tags | Cambodia QR as pattern · not Live SoR | FM-10 when ceremony in scope |
| **FM-13** | Notifications | Existing | `notify.raisd.co` | notifications OpenAPI | FM-01 |
| **FM-14** | Campus landing & hosts | Existing | `lesotho.raisd.co` + portal hosts | [lesotho-pilot](../architecture/lesotho-pilot.md) | FM-01 |
| **FM-15** | Control position seeds | Missing | Control Members · desk assignment | C1 in [workflow-control](lesotho-workflow-control-improvements.md) | FM-01, FM-05 |
| **FM-16** | Academic deepen (timetable / attendance admin) | Partial | Student/lecturer Demo; staff generator later | CAP-11 · CAP-12 | Defer past P0 admissions/registry |
| **FM-X** | Out of pack | — | HR · LMS · Library · Website · Mail · Analytics | — | Do not assign sprint capacity in M4 |

## Existing → module map

What Raisd already demos, folded into FM IDs (so “existing” work is not re-scoped as greenfield):

| Existing Demo capability | Module |
|---|---|
| Raisd SSO + campus apex login / picker | FM-01 · FM-14 |
| Access presets (Applicant / Student / Staff / Lecturer) | FM-01 |
| Control custom roles + Flows Admissions v1 | FM-01 · FM-05 |
| Applicant submit / evidence / offer / accept (LSL fee presentation) | FM-02 · FM-09 |
| Staff Applicants / Payments / Registrations menus | FM-03 · FM-08 · FM-09 |
| Student profile, registration, timetable, attendance, results, finance, funding, graduation, remarks | FM-06 (and FM-08/09/10/11 for deepen) |
| Notifications outbound | FM-13 |
| CAP-53 read **mapping** (not code) | feeds FM-07 |
| Finance profile YAML proposal | feeds FM-09 |

## Missing → module map

Newer CMS gaps that still need a home (from [newer-cms gap](lesotho-newer-cms.md#15-gap-against-the-raisd-system-under-development)):

| Missing / thin vs newer CMS | Module | Notes |
|---|---|---|
| Admissions n/3, rank, score, recommendation | FM-03 · FM-05 | Workflow proposal W1 |
| LGCSE / Sesotho / certificate extract desk | FM-04 | |
| Registration queue: per-module pending, borrower #, clearance history | FM-08 | Workflow proposal W2 |
| Staff 12-tab student file | FM-07 | |
| LSL Fees & Fines catalogue + rates | FM-09 | Beyond single application fee |
| Payment plans / banks / debtors ledger | FM-09 (phase 2) | After catalogue + verify |
| Position ↔ desk parity (28 positions) | FM-15 | |
| Certificate / hood / stock / name-tag production | FM-10 · FM-12 | Only if ceremony in M4 |
| Staff remarks / re-assessment fee desk | FM-11 | |
| SoR stamp/QR print | FM-12 | |
| Timetable generator / venue admin | FM-16 | After P0/P1 |
| Discipline / letters / blocked | — | Wait for Faid scope tick |
| HR / LMS / Library / Website / Mail / Analytics | FM-X | Explicitly excluded |

## Dependency graph

```text
FM-01 Identity
  ├── FM-14 Landing
  ├── FM-13 Notifications
  ├── FM-05 Flows Lesotho profile
  │     ├── FM-03 Admissions desks ── FM-04 Document extract
  │     └── FM-08 Registration + NMDS ── needs FM-09 fees
  ├── FM-02 Applicant journey (Faid-owned rewrite; others consume API only)
  ├── FM-06 Student self-service
  │     ├── FM-08 (student side)
  │     ├── FM-11 Remarks staff (after student request)
  │     └── FM-10 Graduation (student) ── FM-12 Print/QR
  ├── FM-07 CAP-53 staff registry file
  ├── FM-09 Finance / LSL
  ├── FM-15 Control position seeds
  └── FM-16 Academic deepen (late)

FM-X  (no edges into M4 critical path)
```

## Suggested build waves (≈2–3 features / week)

Aligns with standup cadence and P0–P2 in the [workflow/control](lesotho-workflow-control-improvements.md) doc.

| Wave | Modules | Goal |
|---|---|---|
| **W0** (foundation) | FM-01, FM-14, FM-13, FM-05 (Lesotho draft profile) | Identity + policy shell stable |
| **W1** (admissions parity) | FM-03 deepen, FM-04, FM-15 seeds | n/3 + documents + desk roles |
| **W2** (enrolled ops) | FM-08, FM-09 catalogue | Registration clearance + LSL fees |
| **W3** (registry file) | FM-07 | Staff student file via CAP-53 reads |
| **W4** (print / ceremony) | FM-10, FM-12 — **if** Faid keeps ceremony in | QR certificates / clearance gates |
| **W5** (secondary desks) | FM-11, FM-16 | Remarks staff; academic admin |
| **Parallel** | FM-02 | Faid Applicant flow rewrite — no blocking merge into W1–W3 modules |

Applicant **FM-02** stays parallel so admissions staff modules are not blocked on Applicant UI churn.

## Ownership boundary (standup)

| Owner | Modules |
|---|---|
| **Faid** | FM-02 Applicant versioned flow / access rules |
| **Iman / Portal API** | FM-05, FM-07, FM-08 contracts, FM-09 wiring, FM-03/04 API |
| **Iman / Control** | FM-15 position seeds; FM-05 Control UX |
| **Aslam** | Try 1–2 modules next day (standup) — propose **FM-03 desk demo** or **FM-09 fee profile tick** as first try |
| **Paramasvara** | HRMS share is **out of pack** (FM-X); may inform FM-07 schema only if stripped DB share lands |

## Faid — please confirm

1. Accept **FM-01…FM-16** IDs and the **FM-X** exclusion list?  
2. Keep **FM-10/FM-12** in M4 or move to W4 optional?  
3. Confirm **FM-02** remains Faid-owned with no other-module PRs into Applicant flow internals?  
4. First Aslam try-module: **FM-03** or **FM-09**?

## Related

| Topic | Path |
|---|---|
| Pages | [feature-modules.html](../../diagrams/old-cms-lesotho/feature-modules.html) |
| Workflow & control | [lesotho-workflow-control-improvements.md](lesotho-workflow-control-improvements.md) |
| Newer CMS gap | [lesotho-newer-cms.md](lesotho-newer-cms.md) |
| CAP catalogue | [SDD-11](../../sdd/11-capability-catalog.md) |
| Pilot | [lesotho-pilot.md](../architecture/lesotho-pilot.md) |
