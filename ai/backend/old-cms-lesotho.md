# Existing Lesotho CMS — inventory (pilot)

**Campus:** Limkokwing University of Creative Technology — Lesotho (`limkokwing.ac.ls`)  
**Role after 3 Oct 2026:** **First Raisd pilot / acceptance campus** — see [lesotho-pilot.md](../architecture/lesotho-pilot.md).  
**Sources (3 Oct 2026):** Working Group weekly (Read.ai email summary); WhatsApp Working Group CMS 2026 — Faid Zamin screenshots of the **newer** Lesotho Admin / Student system (`PHOTO-2026-10-03-12-41-*`); Vara note on old-CMS family tree.  
**Diagram analysis:** [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html).  
**Old CMS dump:** **Pending** — Mohd Paramasvara (Vara) to send existing Lesotho CMS source + database structure. Until then, presume LUCT PHPMaker family closer to [Botswana](old-cms-botswana.md) / [Cyberjaya](old-cms-cyberjaya.md) than Sierra Leone EMS.

This file inventories what we can already see. It does **not** authorise committing live student data. Screenshot evidence stays outside the repo (WhatsApp export only).

## Two systems

| Generation | Status | What we have | Use for Raisd |
|---|---|---|---|
| **Newer Lesotho CMS** (Admin Portal + Student Portal) | In campus use; staging has **real student data** — structure share restricted | UI screenshots only (Faid / Aslam). Source code and DB **unavailable** to the WG | **Feature / UX benchmark** for pilot parity |
| **Older Lesotho CMS** (LUCT family) | Data being extracted into the newer system | Dump **TBC** from Vara | **Migration inventory** + Portal API adapter patterns (with Raisd Schema v3) |

**Migration SoT (WG, 3 Oct 2026):** Raisd canonical schema + Lesotho CMS materials (old dump when available + new-CMS screenshots) — **not** the inaccessible new-system schema/source.

## Newer CMS — product shape (from screenshots)

Modern dark-theme web app (local demo URL pattern `localhost:3000/…`, banner “TEST/DEBUG ENVIRONMENT”). Staff identity example: Registry user `@limkokwing.ac.ls`. Explicit campus branding: **LUCT LESOTHO** on student cards; registrar stamp **LIMKOKWING UNIVERSITY OF CREATIVE TECHNOLOGY (PTY) LTD LESOTHO**.

### Admin — navigation map

| Domain | Routes / labels seen | Observed behaviour |
|---|---|---|
| **Registry — Students** | `/registry/students` | Master list (~22.5k records / ~1502 pages in sample); master–detail with search |
| Student detail tabs | Academics, Student, Registration, Attendance, Card, Graduation, Finance, Sponsors, Education | Full SIS profile |
| Academics | Transcript per term | Module Code / Name / Status / Cr / Mk / Gd; GPA + CGPA; Drop vs Compulsory; print Statement of Results (signature + stamp options); Programme Summary with outstanding repeats + QR |
| Student | Profile | Student number, national ID, DOB, gender, birth place (e.g. Mafeteng), program ACTIVE |
| Card | Card tab | Photo upload / camera capture; Preview + History; physical card preview “LUCT LESOTHO”, return-to Lesotho Campus |
| Sponsors | Sponsors tab | **NMDS** primary sponsor; borrower number; term tags (e.g. 2026-07 …); + New Sponsor; Sponsors / Semesters sub-tabs → [CAP-48](../../sdd/11-capability-catalog.md#cap-48) |
| Registration | Sidebar | Semester / registration desks |
| Graduations | Requests, Dates, Certificate Reprints | Graduation ops → [CAP-15](../../sdd/11-capability-catalog.md#cap-15) |
| Graduation Clearance | Queue ~549 / ~537 listed | Wizard steps (e.g. Ceremony); multi-dept Academic / Finance clearance; Approve/Reject + message (e.g. gown/graduation fee) |
| Student Status | Sidebar | Status workflow |
| Remark Requests | “Re-assessment review” | Queue badge → [CAP-51](../../sdd/11-capability-catalog.md#cap-51) |
| Student Referrals | Referrals, memos, notifications | Support / registry ops (badge ~26) |
| Notes | Student notes | CRUD permissions visible under RBAC |
| **Admissions — Review** | `/admissions/admissions-review` | Intake Jan 2026; rank + score; progress 0/3–1/3; analytics Pending / Recommended / Not Recommended; by-school bars (FBMG, FICT, FABE, FCM, FFLD) |
| Admissions review detail | Review / Documents / History | LGCSE qualification extract; Academic → QA → Registrar recommendation chain |
| Document Review | Queue ~3945 | Scanned LGCSE PDF + extracted subjects (incl. Sesotho), institution, certificate number → [CAP-03](../../sdd/11-capability-catalog.md#cap-03) |
| Admissions / Applicants | `/admissions/…` | Large applicant set (~5.4k); Accepted status; payment **VERIFIED** in **M** (Loti); Overview / Academic Records / Documents / Notes / History |
| Admissions Payments / Settings | Payments; Intake Periods; Certificate Types | Intake configuration |
| Pricing | Repeat Modules, Fees and Fines, Payment Plans | Finance desks |
| Curriculum | Schools → programs | e.g. FICT: CBIT, BSCSM, BSCBIT, BSCIT, DMSE, DBIT, DIT |
| Faculty ops | Assessment Types, Attendance, Modules, Schools, Timetable (Generator, Allocations, Venues, Venue Types) | Teaching ops |
| LMS link | “FiveDays Learning Management System” | Separate LMS product label — not Raisd Live |
| Admin | Users, Positions, Calendar, Academic Calendar, Notifications (Templates / Events / Broadcast), Activity Tracker, Settings | Ops |
| Positions / RBAC | `/admin/user-positions/…` | ~23 positions (Library HOD, Registrar, Registry HOD, Faculty Manager, Program Leader, Marketing Staff, …); permissions Read/Create/Update/Delete per module (Appraisals, Registry, Admin, Library, …) |

### Student portal (newer)

| Area | Notes |
|---|---|
| Home | Program, year/semester, Active status, CGPA, module count |
| Registration | Term list (enrolled history) + FAB for new request |
| Curriculum | Program modules / progress |
| Finance | Invoices, payments, balance |
| Assessments | Module assessments and marks |
| Timetable | Class schedule |
| Results | View / download academic results |

## CAP seed matrix (screenshot → Raisd)

Seed for Lesotho pilot gap list. Status = observed in newer CMS screenshots, not Raisd Live.

| Observed capability | Likely CAP / BASE | Pilot note |
|---|---|---|
| Online / staff admissions + intake periods | CAP-02 / CAP-04 / Admissions | Jan 2026 intake, rank/score |
| Document review + LGCSE extract | CAP-03 | High queue; Sesotho subject |
| Multi-step Academic → QA → Registrar | CAP-05 / staff admissions | 3-step recommendation |
| Application payment verified (LSL/M) | CAP-06 / finance | M300 sample |
| Student master + profile | CAP-10 / CAP-11 | ~22k registry |
| Term registration | CAP-12 | Student + staff |
| Transcript / GPA / statement of results | CAP-14 / CAP-16 | Print + stamp/QR |
| Graduation clearance wizard | CAP-15 | Multi-dept + fees gate |
| Attendance | CAP-20 | Tab present |
| Timetable / venues | CAP-22 | Generator / Allocations |
| Fees, fines, payment plans, repeat modules | CAP-40–CAP-42 | Pricing desks |
| NMDS sponsorship + borrower # | CAP-48 | Lesotho-specific |
| Remark / reassessment | CAP-51 | Queue |
| CMS integration / campus config | CAP-53 | Live SoR path TBC |
| RBAC positions | Shared platform | Granular CRUD |
| Student portal card grid | Student Demo depth | Registration … Results |
| FiveDays LMS | LMS research / CAP-44 family | External product — not Raisd Live |

## Older CMS — expected shape (until dump arrives)

Per Vara (WhatsApp, 3 Oct 2026): family-tree wise Lesotho is **branched from Cyberjaya** and **closer to Botswana**. Inventory pattern when the dump lands: same structure as [old-cms-botswana.md](old-cms-botswana.md) / [old-cms-cyberjaya.md](old-cms-cyberjaya.md) (PHPMaker desks, `cms*` database, portal/API hooks).

## Open items

- [x] Reverse-engineer newer-CMS screenshots into feature inventory + diagram analysis (3 Oct 2026 pack).
- [ ] Receive and inventory Lesotho **old** CMS source + DB structure (Vara).
- [ ] Confirm Live SoR path for Lesotho pilot (adapter to old CMS vs cutover to Raisd Schema v3) with Working Group.
- [ ] Sanitize any future structure share (no student/staff PII).
- [ ] Expand CAP matrix with Demo vs Live Raisd columns as portals catch up.

## Related

| Topic | Path |
|---|---|
| Lesotho pilot approach | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Diagram analysis | [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| CAP comparison posture | [cms-feature-comparison.md](cms-feature-comparison.md) |
| SDD-14 | [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md) |
