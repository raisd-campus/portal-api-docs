# Existing Cyberjaya CMS — inventory

**Source package:** `CMS_Cyberjaya_Source_Codes_&_DB_Structure_23_09_2026.zip` (23 September 2026)  
**Database:** `cmscbj` (structure dump `cmscbj-202609231138-CMS-Cyberjaya-Structure-backup.sql`)  
**Campus code in UI:** `[MYS-CYB]`  
**Product role:** Initial **system of record** for Raisd portals ([ADR-1](../architecture/overview.md)). Not being replaced at launch.

This file inventories what the **existing** Cyberjaya CMS already contains. It does not approve replacing working staff workflows. Pair with [cms-feature-comparison.md](cms-feature-comparison.md) for CAP mapping to the new portal stack.

**GitHub Pages hub (E2E · FSD · flows · integrations · ERD · DFD · database · comparison):** [`../../diagrams/old-cms/`](../../diagrams/old-cms/)

## Package contents (high level)

| Artifact | Role |
|---|---|
| `cyberjaya/campus/*` | PHPMaker / PHP staff and role apps (main feature surface) |
| `cyberjaya/campus/payment/` | Laravel payment / receipt sub-app (large vendor tree) |
| `cyberjaya/campus/icupdpa/` | Laravel ICU / PDPA sub-app |
| `cyberbatch/` + `cyberjaya/CYBERJAYA-SCRIPT/` | Nightly/batch SQL, portal login gating, backups, visa/notification jobs, S3 sync |
| `CMS_Cyberjaya_SP_23092026.sql` | **318** stored procedures + **38** functions |
| `CMS_Cyberjaya_Triggers_23092026.sql` | **239** triggers |
| `CMS_Cyberjaya_Views_23092026.sql` | **655** views |
| Structure dump | **1,942** tables (includes temp/scratch and historical copies) |

The zip also contains large upload/document trees and nested `__MACOSX` copies. Those are operational data, not feature inventory. Do not commit credentials (for example any `.env` found under Laravel sub-apps).

## Technology shape

- **Core staff UIs:** PHPMaker-generated PHP modules under `cyberjaya/campus/<desk>/`, shared `AllowList` / user-level security.
- **Later add-ons:** Laravel apps for **payment** and **ICU PDPA**.
- **Live classes:** Adobe Connect tables + outbound link to `classroom.limkokwing.net` (Streaming).
- **Batch / ops:** shell + SQL for bursary, attendance, portal login activation, EMGS/visa mail, accommodation, examinations (`cyberjayabatchnight*.sh`).
- **Existing student/API hooks:** procedures `api_student_login_info`, `api_student_module_info`, `api_student_program_info`, `api_student_semester_info`, `api_faculty_list`, `api_faculty_program_list`; portal sync tables `portal_r_student_cyberjaya`, `portal_r_studentprogram_cyberjaya`, `portal_r_studentprogramsemester_cyberjaya`; batch `portal.sql` gates `r_student.loginactive`.
- **No government TEF/DTEF sync** in this package (contrast Botswana).

## End-to-end lifecycle (summary)

1. **Recruit** — Marketing `app_*` / agents (`Agent*` SPs).
2. **Admit** — Registry offer letters, document review, CDU entry rules.
3. **Enrol** — `r_student` / `r_stdprogram` / `r_stdsemester`; fee plan via bursary.
4. **Study** — Faculty structures, lecturer marks/attendance, Adobe Connect streaming.
5. **Finance** — Invoices / receipts / verification; Laravel payment app; portal login gating on balances.
6. **Student life** — Services (EMGS/VAL/visa), accommodation, library, SIU.
7. **Compliance** — CDU AQA, ICU PDPA (Laravel).
8. **Close / report** — Reporting desk; nightly `cyberbatch` refresh + portal sync dumps.

## Staff / role modules (menus observed)

Each row is a separate web app folder with its own login, menu, and permissions. PHP counts from the zip listing include helpers; Laravel desks are dominated by `vendor/`.

| Folder | Title (from header) | Primary job | ~PHP in zip |
|---|---|---|---:|
| `registry/` | Registry Management System 1.0 | Applications, student register, terms, forms, letters, graduation, transcripts, KDN/eIPTS | ~2.6k |
| `faculty/` | Faculty Management System 1.0 | Schools, modules, lecturers, classrooms, classes, exam timetable, inventory, senate/board | ~1.9k |
| `bursary/` | Bursary Management System 1.0 | Fee catalog, invoices/receipts, payment verification, visa fees, incentives, agents | ~1.6k |
| `lecturer/` | Lecturer Portal 1.0 | Notices, profile, supervised students, module view, forms, streaming link | ~0.8k |
| `marketing/` | Marketing Management System 1.0 | Applications, pre-admission, agents, incentives, recruitment / online agent reports | ~1.0k |
| `services/` | Student Services Management System 1.0 | Visa/VAL/EMGS, medical, insurance, international status, SSD letters | ~1.9k |
| `accommodation/` | Accommodation System 1.0 | Dorms, rooms, pricing, tenants, breakfast card | ~0.8k |
| `cdu/` | AQA Management System 1.0 | Entry requirements, English quals, foreign quals, MQA/KPT, programme compliance | ~1.1k |
| `icu/` | Internal Compliance Unit | Staff list, PDPA documents / compliance | ~0.3k |
| `siu/` | Student Info Update System | Controlled student-info update, letters, transcripts | ~0.2k |
| `library/` | Library 1.0 | Population view, eLibraries | ~0.3k |
| `reporting/` | Campus Reporting System | Cross-desk reports (finance, attendance, enrolment, scholarships, portal status) | ~1.5k |
| `studentrecords/` | Students Records | Student list views | ~2.3k |
| `stdfile/` / `studentfile/` | Student File System | Document / file dossiers (KDN, MyQuest, SETARA variants) | ~0.9k / ~0.8k |
| `lec/` | Limkokwing English Center 2.0 | LEC students, marks, batch enrolment, summer camp | ~1.0k |
| `training/` | Training 1.0 | Staff training enrolment / requests | ~0.2k |
| `cmsadminsetup/` | Admin setup | User levels / system setup (PHPMaker admin) | ~1.8k |
| `cms_inquiry/` | Inquiry | CMS inquiry desk | ~0.2k |
| `payment/` | Payment (Laravel) | Online / counter payment receipts | ~22k (mostly vendor) |
| `icupdpa/` | ICU PDPA (Laravel) | PDPA compliance workflows | ~9k (mostly vendor) |

Also present: `zemail/`, `lettertemplate/`, `modulemat/`, tooling (`TCPDF`, `FPDI`, `Highcharts`, …).

## Domain tables (structure dump, approximate)

Counts are **table names** in the dump (includes backups, temps, and copies — not “active entities”).

| Domain signal | Approx. tables | Examples |
|---|---:|---|
| Temp / scratch | ~395 `temp_*` + ~230 `tmp_*` | scratch billing / ticket copies |
| Student records `r_*` | ~233 | `r_student`, `r_stdpersonal`, `r_stdsemester`, `r_stdmodule`, `r_stdattendance` |
| Misc / legacy `tbl_*` | ~165 | historical / utility tables |
| Academic `f_*` | ~135 | `f_program`, `f_module`, `f_class`, `f_lecturer`, `f_modulemat` |
| Reports `rep_*` | ~69 | population / enrolment extracts |
| Finance `b_*` | ~66 | `b_invoice*`, `b_payment*`, `b_receipt*`, `b_statement*` |
| Visa / welfare `w_*` | ~49 | `w_visa`, insurance, medical |
| KDN / eIPTS | ~47 + ~40 | `kdn_*`, `eipts*` |
| Survey / notices `s_*` | ~39 | `s_notice`, `s_questionnaire`, `s_letter` |
| Admissions `app_*` | ~38 | `app_applicationform`, `app_applicationformonline`, `app_preoffer` |
| Accommodation `acc_*` | ~22 | `acc_dorm`, `acc_room`, `acc_occupant` |
| Agents `m_*` / `ap_*` | ~14+ | `m_agent`, agent payment objects |
| Adobe Connect | few | `adobeconnect_attendance`, recordings |
| Portal sync | few | `portal_r_student_*`, `r_studentportaldoc`, `r_studentblockportal` |

Machine extract: [`../../diagrams/old-cms/_table-catalog.txt`](../../diagrams/old-cms/_table-catalog.txt).

## Routines and views

### Stored procedures (318) + functions (38)

Highlights:

| Procedure / group | Domain |
|---|---|
| `api_student_login_info` / `api_student_module_info` / `api_student_program_info` / `api_student_semester_info` | Portal API seed — student |
| `api_faculty_list` / `api_faculty_program_list` | Portal API seed — faculty |
| `Agent*` (large set) | Agent portal search / submit / payment / accommodation |
| `b_Update_*` | Finance — billing / student mark updates |
| `confirmReg`, timetable / enrolment helpers | Registry / academic |

Catalogs: [`_proc-catalog.txt`](../../diagrams/old-cms/_proc-catalog.txt), [`_func-catalog.txt`](../../diagrams/old-cms/_func-catalog.txt).

### Triggers (239)

Heavy on finance (`b_*`), admissions (`app_*`), academic / attendance, and portal-related consistency. Full list: [`_trigger-summary.txt`](../../diagrams/old-cms/_trigger-summary.txt).

### Views (655)

Large reporting forest — finance statements, attendance, transcripts, population, accommodation, agent portals, Adobe Connect summaries. Catalog: [`_view-catalog.txt`](../../diagrams/old-cms/_view-catalog.txt).

## Notable existing capabilities (evidence-backed)

### Admissions and agents

- Application forms (staff + online): `app_applicationform`, `app_applicationformonline`.
- Document review: `app_document`, `app_docfile`, review screens in Registry/Marketing.
- Pre-offer / offer / graduation apps: `app_preoffer`, `r_stdofferletter*`, `app_graduation*`.
- Agent portal procedures: large `Agent*` stored-procedure set (search, submit, payment, accommodation, status).
- English / HS / foreign equivalency: `app_englishqualification*`, `ier_*` (CDU / AQA).

### Student academic life (staff-operated; some portal-facing data)

- Semester / module registration: `r_stdsemester`, `r_stdmodule`, `online_enrollment`, auto-enrol SPs.
- Timetable: `p_timetable*`, `f_class*`, reporting “CurrentTimetable”.
- Attendance: `r_stdattendance*`, `f_attend*`, Adobe Connect attendance.
- Results / marks: `b_Update_Student_Mark*`, gradebook / BOE-related faculty screens.
- Module materials: `f_modulemat`.
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
- API-named SPs for student login/module/program/semester — useful seed for [CAP-53](../../sdd/11-capability-catalog.md#cap-53), not a Raisd Portal API.

## Integrations (evidence-backed)

| Integration | Direction | Notes |
|---|---|---|
| `api_student_*` / `api_faculty_*` SPs | Read | Seed for Portal API ACL — not Raisd itself |
| `portal_r_*_cyberjaya` tables + `portal.sql` | Sync / gate | Nightly login gating + portal DB dumps |
| Adobe Connect / `classroom.limkokwing.net` | Outbound | Live class streaming from lecturer desk |
| CMS support email (`zemail` / cmssupport hosts) | Outbound | Shared Limkokwing email / push pattern |
| EMGS / KDN / eIPTS | Ops / report | Immigration compliance desks + tables |
| Laravel payment | In-campus | Receipt / collection beside PHPMaker bursary |
| `cyberbatch` + CYBERJAYA-SCRIPT | Batch / backup | Nightly domain SQL; S3 / dump scripts |
| Government TEF scholarship POST | — | **Absent** (Botswana-only) |

## Comparison to Botswana & Sierra Leone

| Signal | Cyberjaya (`cmscbj`) | Botswana (`cmsbotswana`) | Sierra Leone (`ems_sierraleone`) |
|---|---|---|---|
| Dump date | 23 Sep 2026 | 24 Sep 2026 | 23 Sep 2026 |
| Tables | 1,942 | 713 | 345 |
| Stored procedures | 318 (+38 fn) | 46 (+15 fn) | 6 |
| Triggers | 239 | 157 | 91 |
| Views | 655 | 407 | 9 |
| Laravel add-ons | Payment + ICU PDPA | Not in package | Not in package |
| Admissions prefix | `app_*` | `app_*` | `ac_*` |
| Gov sync | — | DTEF → tef.gov.bw | — |
| Portal API hooks | `api_student_*`, `portal_*_cyberjaya` | `api_*`, `portal_*_botswana` | Not present |
| Launch SoR (ADR-1) | **Yes** | No — M5 | No — M5 |

## Implications for Raisd

1. **Cyberjaya remains ADR-1 SoR.** Portal API Live writes must acknowledge CMS; do not duplicate operational staff desks at launch.
2. **CAP-53** must assume nightly batch refreshes balances, attendance, portal flags, and reporting extracts.
3. **`api_student_*` / portal sync tables are seeds**, not the Raisd contract — translate, do not clone `r_student`.
4. **M5 expansion** to Botswana / Sierra Leone must re-inventory each campus; do not assume Cyberjaya desk or SP parity.
5. **Do not invent a Cyberjaya TEF equivalent** — government scholarship sync is Botswana-local in current dumps.

## What this inventory is not

- Not proof that every table/screen is still in production use.
- Not a licence to rebuild every staff screen in `staff-portal`.
- Not a complete student self-service UX audit (legacy student-facing shell may sit outside these PHPMaker menus; data and SPs show portal intent).
- Not Live evidence for any Raisd CAP — backend status remains **Needs checking** until [CAP-53](../../sdd/11-capability-catalog.md#cap-53) maps and owners confirm.

## Related documents

- CAP mapping: [cms-feature-comparison.md](cms-feature-comparison.md)
- Sister campus (Sierra Leone EMS): [old-cms-sierra-leone.md](old-cms-sierra-leone.md)
- Sister campus (Botswana LUCT): [old-cms-botswana.md](old-cms-botswana.md)
- Botswana DTEF sync: [botswana-dtef-scholarship-sync.md](botswana-dtef-scholarship-sync.md)
- GitHub Pages diagrams: [../../diagrams/old-cms/](../../diagrams/old-cms/)
- Portal API (new): [portal-api.md](portal-api.md)
- Architecture: [../architecture/overview.md](../architecture/overview.md)
- Human SDD: [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md)
