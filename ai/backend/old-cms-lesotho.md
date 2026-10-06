# Existing Lesotho CMS — inventory (pilot)

**Campus:** Limkokwing University of Creative Technology — Lesotho (`limkokwing.ac.ls`)  
**Role after 3 Oct 2026:** **First Raisd pilot / acceptance campus** — see [lesotho-pilot.md](../architecture/lesotho-pilot.md).  
**Sources (3 Oct 2026):** Working Group weekly (Read.ai email summary); WhatsApp Working Group CMS 2026 — Faid Zamin screenshots of the **newer** Lesotho Admin / Student system (`PHOTO-2026-10-03-12-41-*`); Vara note on old-CMS family tree.  
**Screenshot re-share (5 Oct 2026, 15:18):** Aslam attached 18 Lesotho UI photos — **byte-identical** to the 3 Oct Faid set (MD5 match; no new surfaces). Feature analysis unchanged; provenance only.\
**Diagram analysis:** [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html).  
**Database gap (proxy → dump):** [lesotho-db-gap.md](lesotho-db-gap.md) · Pages [`#db-gap`](../../diagrams/old-cms-lesotho/index.html#db-gap).  
**Old CMS dump:** **Received and inventoried (5 Oct 2026)** — Vara Drive pack  
`CMS_Lesotho_Source_Codes_&_DB_Structure_09_10_2026.zip`  
(`https://drive.google.com/file/d/1Kgo43-vYpEpTyAg-6B-toAA6cdu3Wtjo/view?usp=sharing`).  
Local copy under `raisd/_local/lesotho-cms-2026-10-05/` (**never commit** source/SQL/PII).  
MySQL schema in dumps: **`campus2_lesotho`**. Structure counts: **369 tables · 351 views · 51 procedures · 6 functions**.  
Confirmed **LUCT PHPMaker family** (~83% table-name overlap with Botswana, ~81% with Cyberjaya). Gap detail: [lesotho-db-gap.md](lesotho-db-gap.md).

This file inventories what we can already see. It does **not** authorise committing live student data. Screenshot evidence and the Drive pack stay outside the repo.

## Two systems

| Generation | Status | What we have | Use for Raisd |
|---|---|---|---|
| **Newer Lesotho CMS** (Admin Portal + Student Portal) | In campus use; staging has **real student data** — structure share restricted | UI screenshots only (Faid 3 Oct; Aslam 5 Oct re-share of same files). Source code and DB **unavailable** to the WG | **Feature / UX benchmark** for pilot parity |
| **Older Lesotho CMS** (LUCT family) | Data being extracted into the newer system | Structure dump + `campus/` PHPMaker source inventoried 5 Oct 2026 (`campus2_lesotho`) | **Migration inventory** + Portal API adapter patterns (with Raisd Schema v3) |

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

Seed for Lesotho pilot gap list. **Observed** = newer CMS screenshots (not Raisd Live).  
**SDD CAP** = [SDD-11](../../sdd/11-capability-catalog.md) IDs (authoritative). Full schema×FE×flows: [lesotho-db-gap.md](lesotho-db-gap.md#m4-gap-analysis--schema--frontend--flows).

| Observed capability | SDD CAP | Raisd FE (SDD-11) | Pilot note |
|---|---|---|---|
| Online application + intake | CAP-02 | Applicant **Not started** | Jan 2026 intake |
| Document review + LGCSE extract | CAP-03 | Applicant/Staff **Not started** | Sesotho; certificate # |
| Multi-step Academic → QA → Registrar | CAP-03–05 staff | Staff **Not started** | Old CMS: `Faculty*` / `AQA*` / `Registry*` statuses |
| Application payment verified (LSL/M) | CAP-45/46 family | Not started | Not SDD CAP-06 (foreign equivalency) |
| Student master + profile | profile / CAP-53 reads | Student Demo | ~22k registry |
| Term / subject registration | **CAP-10** | Student **Demo**; staff Not started | Was mis-seeded as CAP-12 |
| Timetable / venues | **CAP-11** | Student **Demo**; lect/staff Not started | Was mis-seeded as CAP-22 |
| Attendance | **CAP-12** | Student **Demo**; lect Not started | Was mis-seeded as CAP-20 |
| Transcript / GPA / SoR | CAP-13–15 | Student **Demo** | Print + stamp/QR |
| Graduation clearance wizard | CAP-15 | Student **Demo**; staff Not started | Multi-dept + fees gate |
| Fees, invoices, proof, online pay | **CAP-45–47** | Demo / Placeholder | Was mis-seeded as CAP-40–42 |
| NMDS sponsorship + borrower # | CAP-48 | Student **Demo**; staff Not started | Old: assist `nmds` + `AssistStdAcc` |
| Remark / reassessment | CAP-51 | Student **Demo**; staff Not started | `r_stdremark*` |
| CMS integration / campus config | CAP-53 | Shared FE **Partial**; BE Needs checking | portal_* + api_*; write SoR TBC |
| RBAC positions | platform / CS-11 | Staff portal **Not started** | ~23 positions |
| Student portal card grid | Student Demo depth | Deepest Raisd UI | Registration … Results |
| FiveDays LMS | CAP-44 family | External | Not Raisd Live SoR |

## Older CMS — measured shape

Vara Drive pack (5 Oct 2026): DB **`campus2_lesotho`** — **369** tables / **351** views / **51** procs / **6** fns; PHPMaker `campus/` desks. Family: thinner LUCT sibling of Botswana (~83% table-name overlap). CAP-53 / NMDS field pass: [lesotho-db-gap.md](lesotho-db-gap.md).

## Open items

- [x] Reverse-engineer newer-CMS screenshots into feature inventory + diagram analysis (3 Oct 2026 pack).
- [x] Proxy database gap analysis vs Botswana / Cyberjaya / Raisd Schema ([lesotho-db-gap.md](lesotho-db-gap.md), 4 Oct 2026).
- [x] Receive and inventory Lesotho **old** CMS structure (Vara, 5 Oct 2026) — dump stays under `raisd/_local/` (not git).
- [x] CAP-53 / NMDS field-level pass on portal + assist columns ([lesotho-db-gap.md](lesotho-db-gap.md)).
- [x] Schema × frontend × flows M4 gap analysis ([lesotho-db-gap.md](lesotho-db-gap.md#m4-gap-analysis--schema--frontend--flows); diagram `#gap-x`).
- [x] CAP-53 Phase R1 read-adapter mapping ([lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md)) + sanitized object catalogs.
- [ ] Implement `lesothoRead` in `portal-api` once integration MySQL access exists.
- [ ] Confirm Live SoR path for Lesotho pilot (adapter to old CMS vs cutover to Raisd Schema v3) with Working Group.
- [ ] Sanitize any future structure share (no student/staff PII).
- [ ] Expand CAP matrix with Demo vs Live Raisd columns as portals catch up.
- [ ] Confirm whether newer CMS or government exposes an NMDS HTTP API (old CMS = assist/billing only).
- [x] Aslam further newer-CMS screenshots (5 Oct) — same 18 files as Faid 3 Oct; no incremental UI.

## Related

| Topic | Path |
|---|---|
| Lesotho pilot approach | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Database gap (proxy) | [lesotho-db-gap.md](lesotho-db-gap.md) |
| Diagram analysis | [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html) |
| Obsidian 3D | [`docs/diagrams/old-cms/obsidian.html?campus=lesotho`](../../diagrams/old-cms/obsidian.html?campus=lesotho) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| Botswana DTEF (≠ NMDS) | [botswana-dtef-scholarship-sync.md](botswana-dtef-scholarship-sync.md) |
| CAP comparison posture | [cms-feature-comparison.md](cms-feature-comparison.md) |
| SDD-14 | [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md) |
