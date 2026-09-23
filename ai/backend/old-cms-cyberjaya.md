# Existing Cyberjaya CMS — inventory

**Source package:** `CMS_Cyberjaya_Source_Codes_&_DB_Structure_23_09_2026.zip` (23 September 2026)  
**Database:** `cmscbj` (structure dump `cmscbj-202609231138-CMS-Cyberjaya-Structure-backup.sql`)  
**Campus code in UI:** `[MYS-CYB]`  
**Product role:** Initial **system of record** for Raisd portals (ADR-1). Not being replaced at launch.

This file inventories what the **existing** Cyberjaya CMS already contains. It does not approve replacing working staff workflows. Pair with [cms-feature-comparison.md](cms-feature-comparison.md) for CAP mapping to the new portal stack.

## Package contents (high level)

| Artifact | Role |
|---|---|
| `cyberjaya/campus/*` | PHPMaker / PHP staff and role apps (main feature surface) |
| `cyberjaya/campus/payment/` | Laravel payment / receipt sub-app |
| `cyberjaya/campus/icupdpa/` | Laravel ICU / PDPA sub-app |
| `cyberbatch/` + `CYBERJAYA-SCRIPT/` | Nightly/batch SQL, portal login gating, backups, visa/notification jobs |
| `CMS_Cyberjaya_SP_23092026.sql` | ~318 stored procedures / functions |
| `CMS_Cyberjaya_Triggers_23092026.sql` | ~239 triggers |
| Structure dump | ~1,942 tables (includes temp/scratch and historical copies) |

The zip also contains large upload/document trees. Those are operational data, not feature inventory. Do not commit credentials (for example any `.env` found under Laravel sub-apps).

## Technology shape

- **Core staff UIs:** PHPMaker-generated PHP modules under `cyberjaya/campus/<desk>/`, shared `AllowList` / user-level security.
- **Later add-ons:** Laravel apps for **payment** and **ICU PDPA**.
- **Live classes:** Adobe Connect tables + outbound link to `classroom.limkokwing.net` (Streaming).
- **Batch / ops:** shell + SQL for bursary, attendance, portal login activation, EMGS/visa mail, accommodation, examinations.
- **Existing student/API hooks:** procedures `api_student_login_info`, `api_student_module_info`, `api_student_program_info`, `api_student_semester_info`; portal sync tables `portal_r_student_cyberjaya`, `portal_r_studentprogram_cyberjaya`, `portal_r_studentprogramsemester_cyberjaya`; batch `portal.sql` gates `r_student.loginactive`.

## Staff / role modules (menus observed)

Each row is a separate web app folder with its own login, menu, and permissions.

| Folder | Title (from header) | Primary job |
|---|---|---|
| `registry/` | Registry Management System 1.0 | Applications, student register, terms, forms, letters, graduation, transcripts, KDN/eIPTS reports |
| `faculty/` | Faculty Management System 1.0 | Schools, modules, lecturers, classrooms, classes, exam timetable, inventory, senate/board reports |
| `bursary/` | Bursary Management System 1.0 | Fee catalog, invoices/receipts, payment verification, visa fees, incentives, agents, outstanding |
| `lecturer/` | Lecturer Portal 1.0 | Notices, profile, supervised students, module view, forms, streaming link |
| `marketing/` | Marketing Management System 1.0 | Applications, pre-admission, agents, incentives, recruitment reports, online agent reports |
| `services/` | Student Services Management System 1.0 | Visa/VAL/EMGS, medical, insurance, international student status, SSD letters |
| `accommodation/` | Accommodation System 1.0 | Dorms, rooms, pricing, tenants, breakfast card |
| `cdu/` | AQA Management System 1.0 | Entry requirements, English quals, foreign quals, MQA/KPT, programme compliance |
| `icu/` | Internal Compliance Unit | Staff list, PDPA documents / compliance |
| `siu/` | Student Info Update System | Controlled student-info update, letters, transcripts |
| `library/` | Library 1.0 | Population view, eLibraries |
| `reporting/` | Campus Reporting System | Cross-desk reports (finance, attendance, enrolment, scholarships, portal status, …) |
| `studentrecords/` | Students Records | Student list views |
| `stdfile/` / `studentfile/` | Student File System | Document / file dossiers (KDN, MyQuest, SETARA variants) |
| `lec/` | Limkokwing English Center 2.0 | LEC students, marks, batch enrolment, summer camp |
| `training/` | Training 1.0 | Staff training enrolment / requests |
| `cmsadminsetup/` | Admin setup | User levels / system setup (PHPMaker admin) |
| `cms_inquiry/` | Inquiry | CMS inquiry desk |
| `payment/` | Payment (Laravel) | Online / counter payment receipts, parking-related payment objects |
| `icupdpa/` | ICU PDPA (Laravel) | PDPA compliance workflows |

## Domain tables (structure dump, approximate)

Counts are **table names** in the dump (includes backups, temps, and copies — not “active entities”).

| Domain signal | Approx. tables | Examples |
|---|---:|---|
| Temp / scratch | ~494 | `temp_*`, `tmp_*` |
| Student records `r_*` | ~293 | `r_student`, `r_stdpersonal`, `r_stdsemester`, `r_stdmodule`, `r_stdattendance` |
| Visa / immigration | ~205 | `w_*`, `kdn_*`, `ssd_*`, `eipts*`, EMGS tables |
| Academic `f_*` | ~155 | `f_program`, `f_module`, `f_class`, `f_lecturer`, `f_modulemat` |
| Survey / notices `s_*` | ~122 | `s_notice`, `s_questionnaire`, `s_letter` |
| Training `t_*` | ~81 | `t_enrollment`, `t_enrollrequest` |
| Finance `b_*` | ~79 | `b_invoice*`, `b_payment*`, `b_receipt*`, `b_statement*` |
| Admissions `app_*` | ~59 | `app_applicationform`, `app_applicationformonline`, `app_preoffer`, `app_document` |
| Agents | ~31 | `m_agent`, `ap_*` |
| Accommodation `acc_*` | ~25 | `acc_dorm`, `acc_room`, `acc_occupant` |
| Adobe Connect | ~8 | `adobeconnect_attendance`, recordings |
| Portal sync | few | `portal_r_student_*`, `r_studentportaldoc`, `r_studentblockportal` |

## Notable existing capabilities (evidence-backed)

### Admissions and agents

- Application forms (staff + online): `app_applicationform`, `app_applicationformonline`.
- Document review: `app_document`, `app_docfile`, review screens in Registry/Marketing.
- Pre-offer / offer / graduation apps: `app_preoffer`, `r_stdofferletter*`, `app_graduation*`.
- Agent portal procedures: large `Agent*` stored-procedure set (search, submit, payment, accommodation, status).
- English / HS / foreign equivalency: `app_englishqualification*`, `ier_*` (CDU / AQA).

### Student academic life (staff-operated; some portal-facing data)

- Semester / module registration structures: `r_stdsemester`, `r_stdmodule`, `online_enrollment`, `ProgramsAllowedToRegister`, auto-enrol SP.
- Timetable: `p_timetable*`, `f_class*`, reporting “CurrentTimetable”.
- Attendance: `r_stdattendance*`, `f_attend*`, monthly attendance params, Adobe Connect attendance.
- Results / marks: `b_Update_Student_Mark*`, gradebook / BOE-related faculty screens, dean/commendation lists in reporting.
- Module materials: `f_modulemat` (lecturer notes reporting exists).
- Questionnaires / surveys: `s_questionnaire`, `r_stdquestionnaire`, `r_stdsurvey`.

### Finance

- Ledger-style objects: statements, invoices, receipts, instalments, scholarships/assistance, payment verification.
- Online registration minimum amount: `b_minenrollmentamount`.
- Separate Laravel **payment** app for receipt / collection flows.

### Immigration / student services

- Student Services desk: EMGS STAR compare, VAL, visa expiry windows, medical, insurance, MPWA/KDN reports.
- Registry/CDU international status and eIPTS reporting.
- Visa fee structures under bursary (`b_visafee*`).

### Accommodation

- Full housing ops: dorms, rooms, pricing, occupancy, checkout, facilities requests, breakfast card.

### Quality / compliance

- CDU AQA: programme accreditation/approval tables, MQA/KPT officers/status, entry requirements, foreign qualifications.
- ICU: PDPA document compliance (Laravel + ICU menu).

### Existing “portal” behaviour

- Batch `portal.sql` enables/disables student login based on outstanding balance, VIP, PTPTN rules, `StdPortalActive`.
- Portal snapshot tables for Cyberjaya student / programme / semester.
- API-named SPs for student login/module/program/semester — useful seed for CAP-53, not a Raisd Portal API.

## What this inventory is not

- Not proof that every table/screen is still in production use.
- Not a licence to rebuild every staff screen in `staff-portal`.
- Not a complete student self-service UX audit (legacy student-facing shell may sit outside these PHPMaker menus; data and SPs show portal intent).
- Not Live evidence for any Raisd CAP — backend status remains **Needs checking** until CAP-53 maps and owners confirm.

## Related documents

- CAP mapping: [cms-feature-comparison.md](cms-feature-comparison.md)
- GitHub Pages diagrams: [../../diagrams/old-cms/](../../diagrams/old-cms/)
- Portal API (new): [portal-api.md](portal-api.md)
- Architecture: [../architecture/overview.md](../architecture/overview.md)
- Human SDD: [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md)
