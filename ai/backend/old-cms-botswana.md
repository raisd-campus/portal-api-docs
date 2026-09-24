# Existing Botswana CMS — inventory

**Source package:** `CMS_Botswana_Source_Codes_&_DB_Structure_24_09_2026` (24 September 2026)  
**Database:** `cmsbotswana` (structure dumps `CMS_Botswana_Tables|Procedure|Triggers|Views_24_09_2026.sql`)  
**Product role:** Sister **LUCT CMS / PHPMaker** campus (BWA-GBE — Botswana Gaborone). **Not** the Cyberjaya launch SoR ([ADR-1](../architecture/overview.md)). Use for [M5](../../sdd/03-delivery-milestones.md#m5) campus-expansion comparison. Closer to Cyberjaya desk layout than the Sierra Leone EMS package.

This file inventories what the Botswana dump contains. It does **not** change the Cyberjaya-first Portal API plan. Pair with [old-cms-cyberjaya.md](old-cms-cyberjaya.md), [old-cms-sierra-leone.md](old-cms-sierra-leone.md), and [cms-feature-comparison.md](cms-feature-comparison.md).

**Do not commit** the PHP tree, `botsbatch` SQL/logs, credentials, uploads, or live student files from the package. Documentation below is derived structure only.

## Package contents (high level)

| Artifact | Role |
|---|---|
| `botswana/index.php` | LUCT Campus Management System **0.9a [BWA-GBE]** login shell (PHPMaker) |
| `botswana/campus/*` | Staff desks (~5.7k PHP files under campus; ~43k files incl. FCKeditor / uploads / tooling) |
| `botswana/campus/registry/` | Student register, offer letters, forms, population |
| `botswana/campus/faculty/` | Academic / programme / assessment desks |
| `botswana/campus/bursary/` | Fees, invoices, payments, assist, receipts |
| `botswana/campus/marketing/` | Admissions / agent / recruitment surfaces |
| `botswana/campus/lecturer/` | Lecturer portal desks |
| `botswana/campus/student/` | Student-facing PHPMaker screens (thin vs staff desks) |
| `botswana/campus/services/` | Student services / welfare |
| `botswana/campus/accommodation/` | Hostel / room / occupancy |
| `botswana/campus/setup/` | Institution / term / fee / security setup |
| `botswana/campus/reporting/` | Cross-desk reports |
| `botswana/campus/cdu/` | AQA / curriculum development |
| `botswana/campus/training/`, `library/`, `notice/`, `support/` | Ancillary desks |
| `botsbatch/` | Batch SQL scripts (portal, examination, registry, attendance, bursary, ssd) + error logs — **ops data, do not commit** |
| `CMS_Botswana_Tables_24_09_2026.sql` | **713** tables |
| `CMS_Botswana_Procedure_24_09_2026.sql` | **46** stored procedures + **15** functions |
| `CMS_Botswana_Triggers_24_09_2026.sql` | **157** triggers |
| `CMS_Botswana_Views_24_09_2026.sql` | **407** views |

Host / definer accounts in the dumps are operational MySQL endpoints — treat as sensitive; do not republish connection details.

## Technology shape

- **Same LUCT CMS family as Cyberjaya:** PHPMaker desks under `botswana/campus/<desk>/`, shared session / user-level security, familiar `r_*` / `f_*` / `b_*` / `app_*` prefixes.
- **Brand:** login title `CAMPUS MANAGEMENT SYSTEM 0.9A [BWA-GBE]` — campus-coded sibling of Cyberjaya, not the ICA Sierra Leone EMS folder layout.
- **Admissions:** uses Cyberjaya-style `app_*` (not Sierra Leone’s `ac_*`).
- **Portal hooks present:** `portal_*_botswana` tables and `api_student_*` / `api_faculty_*` procedures — closer to Cyberjaya Portal API surface than Sierra Leone.
- **Botswana-specific:** `bots_*` programme/structure tables; heavy `w_*` welfare / accommodation / visa set; DTEF / IH assist billing variants; large view forest (~407).

## Staff / role modules (folders observed)

| Folder | Primary job (from screens + tables) | Approx. PHP files (desk root) |
|---|---|---:|
| `registry/` | Student master, personal/contact, offer letters, forms, transcripts | ~894 |
| `setup/` | Institution, terms, fee catalogs, user levels, config | ~756 |
| `bursary/` | Invoices, payments, receipts, assist / scholarships, instalments | ~452 |
| `faculty/` | Schools, programmes, modules, structures, attendance, results | ~333 |
| `services/` | Student services / counselling / welfare ops | ~308 |
| `marketing/` | Applications, agents, recruitment | ~235 |
| `reporting/` | Population, enrolment, payment, scholarship reports | ~211 |
| `cdu/` | AQA / programme accreditation / compliance | ~207 |
| `training/` | Training / short-course desks | ~202 |
| `lecturer/` | Lecturer marks / attendance / module materials | ~122 |
| `library/` | Library desks | ~121 |
| `accommodation/` | Dorms, occupants, room charges | ~118 |
| `notice/` | Bulletin / noticeboard | ~79 |
| `student/` | Student self-service PHPMaker screens | ~38 |

Nav also references LEC / Support / Training / Setup (see `botswana/index.php`).

## Domain tables (structure dump)

Counts are **table names** (includes scratch / dated copies — not “active entities only”).

| Domain signal | Approx. tables | Examples |
|---|---:|---|
| Temp / scratch / dated copies | ~159 | `temp_*`, `tmp_*`, `*_20171220`-style, one-off billing scratch |
| Student records `r_*` | ~110 | `r_student`, `r_stdpersonal`, `r_stdsemester`, `r_stdmodule`, `r_stdofferletter` |
| Academic `f_*` | ~74 | `f_program`, `f_module`, `f_semester`, `f_timetable*`, attendance / release-result |
| Welfare / acco / visa `w_*` | ~49 | `w_application`, `w_occupant`, `w_visa`, `w_insurance*`, `w_room*` |
| Reports helpers `rep_*` | ~44 | `rep_curtermpopulation*`, `rep_preenrollment*`, `rep_scholarshipview` |
| Finance `b_*` | ~42 | `b_payment*`, `b_receipt*`, `b_assistbilling*`, `b_stdinstalment*`, `b_statement*` |
| Security / staff `s_*` | ~26 | `s_staff`, user levels, uploads, notices |
| Admissions `app_*` | ~21 | `app_applicationform`, `app_applicationformonline`, `app_docfile`, `app_eligibilityletter` |
| Accommodation `acc_*` | ~18 | `acc_dorm`, `acc_charges`, `acc_checkout`, `acc_occupant*` |
| In-house / IH `ih_*` | ~15 | IH attendance / marks / student mirrors |
| Botswana structs `bots_*` | ~11 | `bots_program`, `bots_structuresemester*`, `bots_students_*`, `bots_stdPortal` |
| Marketing `m_*` | ~11 | agents, commission |
| Portal sync `portal_*` | ~6 | `portal_r_student_botswana`, `portal_student_*_botswana` |

Machine extract: [`../../diagrams/old-cms-botswana/_table-catalog.txt`](../../diagrams/old-cms-botswana/_table-catalog.txt).

## Routines and views

### Stored procedures (46) — notable groups

| Group | Examples |
|---|---|
| Portal / API | `api_student_login_info`, `api_student_module_info`, `api_student_program_info`, `api_student_semester_info`, `api_faculty_list`, `api_faculty_program_list` |
| Online applications | `AfterInsertApplicationForm`, `FetchOnlineApplication*`, `InsertOnlineAppPersonalInfo`, `UpdateOnlineApp*`, `OnlineAppEmailNotification` |
| Finance / billing | `b_Update_billing`, `b_Update_Student`, `b_Update_Accommodation`, `cleanup_assistsem_recalc` |
| Registry / academic | `confirmReg`, `r_Update_Semester`, `GetTimetable`, `insertModule`, `StudentConfirmModule`, `fetchCAFDetails` |

Plus **15** helper functions (`CheckCredits`, `check_prereq`, `academic_Outcome`, `getSCholarshipStatus`, …).

Catalog: [`../../diagrams/old-cms-botswana/_proc-catalog.txt`](../../diagrams/old-cms-botswana/_proc-catalog.txt).

### Triggers (157)

Heavy on registry student/programme/semester chains (`r_student*`, `r_stdprogram*`, `r_stdmodule*`), admissions (`app_applicationform*`), finance receipts/payments/instalments, accommodation (`acc_*`, `w_*`), and faculty programme/accreditation / release-result. Full list: [`../../diagrams/old-cms-botswana/_trigger-summary.txt`](../../diagrams/old-cms-botswana/_trigger-summary.txt).

### Views (407)

Large reporting surface: finance statements / ageing / outstanding, attendance aggregates, transcripts / BOE, pre-enrolment / population reports, accommodation occupancy, staff desk views (`s_staff_*view`). Catalog: [`../../diagrams/old-cms-botswana/_view-catalog.txt`](../../diagrams/old-cms-botswana/_view-catalog.txt).

## Notable capabilities (evidence-backed)

### Admissions

- Online + staff application forms: `app_applicationform`, `app_applicationformonline`, doc files, eligibility letters, arrival forms.
- Offer letters: `r_stdofferletter*` views/tables; `FetchOfferLetters` SP; letter templates under `campus/lettertemplate/`.

### Student academic life (staff-operated)

- Programme / module / semester: `f_program`, `f_module`, `r_stdprogram`, `r_stdsemester`, `r_stdmodule`.
- Timetable / attendance / release results: faculty desks + `GetTimetable`, attendance views, `f_releaseresult*` triggers.
- Botswana programme mirrors: `bots_program*`, `bots_structuresemester*`.

### Finance

- Payments, receipts, instalments, assist billing (`b_assistbilling*`, including `bots` variants), statements — classic `b_*` with calculating SPs and many triggers.
- DTEF / scholarship scratch tables present in the dump (ops history).

### Accommodation & student affairs

- Richer than Sierra Leone: `acc_*` + `w_*` dorm / occupant / insurance / visa / extracurricular.

### Portal API surface

- Campus-suffixed portal tables (`*_botswana`) and `api_student_*` / `api_faculty_*` SPs — treat as Botswana-local ACL candidates for M5, not as Cyberjaya SoR.

## Comparison to Cyberjaya & Sierra Leone (quick)

| Signal | Cyberjaya (`cmscbj`) | Botswana (`cmsbotswana`) | Sierra Leone (`ems_sierraleone`) |
|---|---|---|---|
| Tables (structure) | ~1,942 | **713** (~554 non-temp) | ~345 |
| Stored procedures | ~318 | **46** (+15 functions) | 6 |
| Triggers | ~239 | **157** | 91 |
| Views | (large) | **407** | 9 |
| Desk layout | `cyberjaya/campus/<desk>` | `botswana/campus/<desk>` | `sierraleone/<desk>` (EMS) |
| Admissions prefix | Mostly `app_*` | Mostly `app_*` | Mostly `ac_*` |
| Portal API hooks | `api_student_*`, `portal_*` | **Present** (`*_botswana`) | Not in dump |
| Launch SoR (ADR-1) | Yes | No — expansion reference | No — expansion reference |

## Implications for Raisd

1. **Do not treat Botswana as the launch SoR.** Cyberjaya remains ADR-1.
2. **Closest sister to Cyberjaya of the dumps so far.** Same LUCT desk tree and `app_*` admissions; Portal API ACL patterns validated on Cyberjaya transfer more cleanly than Sierra Leone’s EMS/`ac_*` shape.
3. **Expect campus suffixes and local tables** (`bots_*`, `*_botswana`, DTEF/IH assist) — [CAP-53](../../sdd/11-capability-catalog.md#cap-53) must stay campus-keyed; do not hard-code Cyberjaya table names.
4. **[M5](../../sdd/03-delivery-milestones.md#m5) expansion** should re-inventory each campus dump the same way (structure + desks + routines) before assuming feature parity.
5. **Accommodation / welfare (`w_*` / `acc_*`)** is thicker here than Sierra Leone — staff-portal scope for Botswana may need those CAP surfaces earlier than ICA campuses.

## Related

- Cyberjaya inventory: [old-cms-cyberjaya.md](old-cms-cyberjaya.md)
- Sierra Leone inventory: [old-cms-sierra-leone.md](old-cms-sierra-leone.md)
- CAP comparison (Cyberjaya-focused): [cms-feature-comparison.md](cms-feature-comparison.md)
- GitHub Pages: [../../diagrams/old-cms-botswana/](../../diagrams/old-cms-botswana/)
- SDD-14: [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md)
