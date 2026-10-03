# Existing Lesotho CMS — inventory (pilot)

**Campus:** Limkokwing University of Creative Technology — Lesotho (`limkokwing.ac.ls`)  
**Role after 3 Oct 2026:** **First Raisd pilot / acceptance campus** — see [lesotho-pilot.md](../architecture/lesotho-pilot.md).  
**Sources (3 Oct 2026):** Working Group meeting (Read.ai); WhatsApp Working Group CMS 2026 — Faid Zamin screenshots of the **newer** Lesotho Admin / Student system; Vara note on old-CMS family tree.  
**Old CMS dump:** **Pending** — Mohd Paramasvara (Vara) to send existing Lesotho CMS source + database structure. Until then, presume LUCT PHPMaker family closer to [Botswana](old-cms-botswana.md) / [Cyberjaya](old-cms-cyberjaya.md) than Sierra Leone EMS.

This file inventories what we can already see. It does **not** authorise committing live student data. Screenshot evidence stays outside the repo.

## Two systems

| Generation | Status | What we have | Use for Raisd |
|---|---|---|---|
| **Newer Lesotho CMS** (Admin Portal + Student Portal) | In campus use; staging has **real student data** — structure share restricted | UI screenshots only (Faid / Aslam). Source code and DB **unavailable** to the WG | **Feature / UX benchmark** for pilot parity |
| **Older Lesotho CMS** (LUCT family) | Data being extracted into the newer system | Dump **TBC** from Vara | **Migration inventory** + Portal API adapter patterns (with Raisd Schema v3) |

**Migration SoT (WG, 3 Oct 2026):** Raisd canonical schema + Lesotho CMS materials (old dump when available + new-CMS screenshots) — **not** the inaccessible new-system schema/source.

## Newer CMS — surfaces observed (screenshots)

Modern dark-theme web app (local demo URL pattern `localhost:3000/…`, “TEST/DEBUG ENVIRONMENT”). Logged-in staff example: Registry user `@limkokwing.ac.ls`.

### Admin / staff

| Area | Routes / labels seen | Notes for CAP mapping |
|---|---|---|
| Registry — Students | `/registry/students` | Master list (~22k records in sample), detail tabs: Academics, Student, Registration, Attendance, Card, Graduation, Finance, Sponsors |
| Registry — Registration | Sidebar | Semester / registration desks |
| Registry — Graduations | Requests, Dates, Certificate Reprints; Graduation Clearance queue | [CAP-15](../../sdd/11-capability-catalog.md#cap-15) |
| Registry — Student Status | Sidebar | Status workflow |
| Registry — Remark Requests | “Re-assessment review” | Appeals / remark path → [CAP-51](../../sdd/11-capability-catalog.md#cap-51) |
| Registry — Student Referrals | Referrals, memos, notifications | Support / registry ops |
| Student Card | Card tab — photo upload, print history, “LUCT LESOTHO” card preview | ID card ops |
| Sponsors | NMDS sponsorship + term tags | [CAP-48](../../sdd/11-capability-catalog.md#cap-48); Lesotho NMDS borrower numbers |
| Admissions — Review | `/admissions/admissions-review` | Multi-step Academic → QA → Registrar recommendation |
| Admissions — Applications | `/admissions/applications` | Large applicant set; payment verified (LSL/M); scores / ranks |
| Admissions — Document Review | High queue volume in sample | Scanned LGCSE + extracted subject/grade fields — [CAP-03](../../sdd/11-capability-catalog.md#cap-03) |
| Admissions — Payments / Settings | Payments; Intake Periods; Certificate Types | Intake configuration |
| Pricing | Repeat Modules, Fees and Fines, Payment Plans | Finance desks |
| Curriculum | Schools → programs (e.g. FICT: CBIT, BSCIT, DIT, …) | Programme structures |
| Faculty ops | Assessment Types, Attendance, Modules, Schools, Timetable (Generator, Allocations, Venues) | Teaching ops |
| LMS link | “FiveDays Learning Management System” | Separate LMS product label — not Raisd Live |
| Admin | Users, Positions, Calendar, Notifications, Activity Tracker, Settings | RBAC / ops |

### Student portal (newer)

| Area | Notes |
|---|---|
| Home | Program, year/semester, Active status, CGPA, module count |
| Registration | Term list (enrolled history) |
| Curriculum / Finance / Assessments / Timetable / Results | Card grid navigation |

## Older CMS — expected shape (until dump arrives)

Per Vara (WhatsApp, 3 Oct 2026): family-tree wise Lesotho is **branched from Cyberjaya** and **closer to Botswana**. Inventory pattern when the dump lands: same structure as [old-cms-botswana.md](old-cms-botswana.md) / [old-cms-cyberjaya.md](old-cms-cyberjaya.md) (PHPMaker desks, `cms*` database, portal/API hooks).

## Open items

- [ ] Receive and inventory Lesotho **old** CMS source + DB structure (Vara).
- [ ] Map newer-CMS screenshot capabilities → CAP matrix (seed for Lesotho pilot gap list).
- [ ] Confirm Live SoR path for Lesotho pilot (adapter to old CMS vs cutover to Raisd Schema v3) with Working Group.
- [ ] Sanitize any future structure share (no student/staff PII).

## Related

| Topic | Path |
|---|---|
| Lesotho pilot approach | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| CAP comparison posture | [cms-feature-comparison.md](cms-feature-comparison.md) |
| SDD-14 | [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md) |
