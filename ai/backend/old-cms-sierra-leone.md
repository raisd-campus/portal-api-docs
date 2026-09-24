# Existing Sierra Leone CMS — inventory

**Source package:** `ICA_SierraLeone_Codes_&_DB_Structure_23_09_2026` (23 September 2026)  
**Database:** `ems_sierraleone` (structure dump `ems_sierraleone-202609231521-CMS-SierraLeone-Structure-backup.sql`)  
**Product role:** Sister **EMS / PHPMaker** campus CMS (Limkokwing ICA Sierra Leone). **Not** the Cyberjaya launch SoR ([ADR-1](../architecture/overview.md)). Use for [M5](../../sdd/03-delivery-milestones.md#m5) campus-expansion comparison and shared EMS pattern recognition.

This file inventories what the Sierra Leone dump contains. It does **not** change the Cyberjaya-first Portal API plan. Pair with [old-cms-cyberjaya.md](old-cms-cyberjaya.md) and [cms-feature-comparison.md](cms-feature-comparison.md).

**Do not commit** the PHP tree, `.gz` data dumps, credentials, or live student files from the package. Documentation below is derived structure only.

## Package contents (high level)

| Artifact | Role |
|---|---|
| `sierraleone/*` | PHPMaker staff desks (~1.7k PHP files; ~9.6k files incl. FCKeditor / uploads / tooling) |
| `sierraleone/academic/` | Academic / timetable / assessment / gradebook desks |
| `sierraleone/applicationcenter/` | Admissions / enquiry / course application (`ac_*`) |
| `sierraleone/finance/` | Fees, invoices, payments, assistance / loans |
| `sierraleone/registry/` | Student register, offer letters, documents, population views |
| `sierraleone/reports/` | Cross-desk reports (enrolment, BOE, transcripts, scholarships, …) |
| `sierraleone/setting/` | Institution / fee / assessment / timetable setup |
| `sierraleone/studentaffair/` | Visa / insurance / passport / staff user-levels |
| `sierraleone/portal/` | Portal-side SQL / gz extracts (ops data — do not commit) |
| `sleonebatch/` | Empty in this package |
| `ICA_SierraLeone_Procedure_23092026.sql` | **6** stored procedures (finance/GPA calculators) |
| `ICA_SierraLeone_Triggers_23092026.sql` | **91** triggers |
| `ICA_SierraLeone_Views_23_09_2026.sql` | **9** views |
| Structure dump | **345** tables (~156 non-temp; ~189 temp/scratch/history copies) |

Host noted in the structure dump header is an operational MySQL endpoint — treat as sensitive; do not republish connection details.

## Technology shape

- **Core staff UIs:** PHPMaker-generated PHP modules under `sierraleone/<desk>/`, shared session / user-level security (`s_userlevels`, `s_userlevelpermissions`).
- **Same EMS family as Cyberjaya:** familiar `r_*` / `f_*` / `b_*` table prefixes, list/info PHPMaker screens, offer-letter RTF templates under `lettertemplate/`.
- **Smaller surface than Cyberjaya:** no Laravel payment/PDPA sub-apps in this package; no large Agent / Adobe Connect / EMGS table forests; far fewer stored procedures (6 vs ~318).
- **Admissions naming:** Sierra Leone uses `ac_*` (application centre) rather than Cyberjaya’s dominant `app_*` set — still the same domain (enquiry, course application, eligibility, confirmation docs).

## Staff / role modules (folders observed)

| Folder | Primary job (from screens + tables) |
|---|---|
| `applicationcenter/` | Applications, course applications, enquiry, eligibility docs, promotions, application fees/payments |
| `registry/` | Student master, personal/contact/education, offer letters, forms, current-term population |
| `academic/` | Schools, programmes, modules, structures, timetables, assessments, attendance, gradebook notes |
| `finance/` | Fee structures, invoices, payments, adjustments, assist schemes, loans, refunds |
| `reports/` | Population, enrolment, payment/scholarship/instalment reports, transcripts, BOE spreadsheets |
| `setting/` | Institution, terms, fee catalogs, assessment setup, timetable setup, user/help config |
| `studentaffair/` | Student visa, insurance / claims, passport, staff / user levels |
| `support/` | Present but empty of PHP in this dump |
| `portal/` | SQL/gz portal extracts only (no PHP app tree here) |

## Domain tables (structure dump)

Counts are **table names** (includes dated copies such as `*_20171220` — not “active entities only”).

| Domain signal | Approx. tables | Examples |
|---|---:|---|
| Temp / scratch / dated copies | ~189 | `temp_*`, `tmp_*`, `*_20161220`, `*_20171220` |
| Academic `f_*` | ~44 | `f_program`, `f_module`, `f_semester`, `f_timetable`, `f_assessment*`, `f_stdattendance` |
| Finance `b_*` | ~31 | `b_invoice`, `b_payment*`, `b_feestructure*`, `b_assist*`, `b_studentloan*` |
| Student records `r_*` | ~26 | `r_student`, `r_stdpersonal`, `r_stdsemester`, `r_stdmodule`, `r_stdofferletter` |
| Questionnaire / letters `q_*` | ~27 | `q_letter*`, `q_classroom*`, offer-letter sign helpers |
| Admissions `ac_*` | ~7 | `ac_application`, `ac_courseapplication`, `ac_enquiry`, `ac_promotion` |
| Survey / security `s_*` | ~8 | `s_staff`, `s_userlevels`, `s_setting`, `s_audit` |
| Student affairs `sa_*` | ~3 | `sa_studentvisa`, `sa_insurance`, `sa_insuranceclaim` |
| Reports helpers `rep_*` | ~2 | `rep_generator`, `rep_nostudents_sl` |

Machine extract: [`../../diagrams/old-cms-sierra-leone/_table-catalog.txt`](../../diagrams/old-cms-sierra-leone/_table-catalog.txt).

## Routines and views

### Stored procedures (6)

| Procedure | Domain |
|---|---|
| `b_calcmodule` | Finance — module fee calculation |
| `b_calcsch` | Finance — scholarship / assist calculation |
| `f_calcass` | Academic — assessment calculation |
| `f_calccgpa` | Academic — CGPA |
| `f_calcgpa` | Academic — GPA |
| `f_calcgpa_old` | Academic — legacy GPA |

Catalog: [`../../diagrams/old-cms-sierra-leone/_proc-catalog.txt`](../../diagrams/old-cms-sierra-leone/_proc-catalog.txt).

### Triggers (91)

Heavy on finance (`b_invoice*`, `b_payment*`, `b_assist*`) and academic assessment / release-result chains; admissions triggers on `ac_application*` / `ac_courseapplication*`. Full list: [`../../diagrams/old-cms-sierra-leone/_trigger-summary.txt`](../../diagrams/old-cms-sierra-leone/_trigger-summary.txt).

### Views (9)

`CurTermPopulationlist`, `ac_courseeligibility`, `c_stdassessment`, `c_stdtimetable`, `f_moduletermview`, `r_stdmoduleview`, `statement`, `statement_base`, `statement_total`.

## Notable capabilities (evidence-backed)

### Admissions

- Application centre tables + PHPMaker lists: `ac_application`, `ac_courseapplication`, `ac_enquiry`, eligibility / confirmation document screens.
- Offer letters: `r_stdofferletter`, Registry `OfferLetter*` pages, RTF templates under `lettertemplate/` (self-paid, scholarship, government, sponsor variants).

### Student academic life (staff-operated)

- Programme / module / semester structures: `f_program`, `f_module`, `f_semmodule*`, `r_stdprogram`, `r_stdsemester`, `r_stdmodule`.
- Timetable: `f_timetable*`, `c_stdtimetable` view, academic timetable screens.
- Attendance: `f_stdattendance`.
- Assessment / results: `f_assessment*`, `f_stdassessment*`, release-result tables, GPA SPs, BOE report screens.

### Finance

- Fee structure, invoices, payments, adjustments, assist schemes, student loans, refunds — classic `b_*` set with calculating SPs and many triggers.
- Statement views for ledger-style student balances.

### Student affairs

- Visa + insurance claims (`sa_*`), passport records — smaller than Cyberjaya’s EMGS/KDN forest.

## Comparison to Cyberjaya (quick)

| Signal | Cyberjaya (`cmscbj`) | Sierra Leone (`ems_sierraleone`) |
|---|---|---|
| Tables (structure) | ~1,942 | ~345 |
| Stored procedures | ~318 | 6 |
| Triggers | ~239 | 91 |
| Laravel add-ons | Payment + ICU PDPA | Not in this package |
| Admissions prefix | Mostly `app_*` | Mostly `ac_*` |
| Portal API hooks seen | `api_student_*`, `portal_r_student_*` | Not present in this dump |
| Launch SoR (ADR-1) | Yes | No — expansion / pattern reference |

## Implications for Raisd

1. **Do not treat Sierra Leone as the launch SoR.** Cyberjaya remains ADR-1.
2. **EMS family is portable.** Portal API ACL designs validated on Cyberjaya `r_*` / `f_*` / `b_*` will largely transfer; expect campus-specific admissions naming (`ac_*`) and thinner SP/API surfaces.
3. **[M5](../../sdd/03-delivery-milestones.md#m5) expansion** should re-inventory each campus dump the same way (structure + desks + routines) before assuming Cyberjaya feature parity.
4. **[CAP-53](../../sdd/11-capability-catalog.md#cap-53)** campus configuration must remain campus-keyed; Sierra Leone proves a second live schema shape in the same product family.

## Related

- Cyberjaya inventory: [old-cms-cyberjaya.md](old-cms-cyberjaya.md)
- Botswana inventory: [old-cms-botswana.md](old-cms-botswana.md)
- CAP comparison (Cyberjaya-focused): [cms-feature-comparison.md](cms-feature-comparison.md)
- GitHub Pages: [../../diagrams/old-cms-sierra-leone/](../../diagrams/old-cms-sierra-leone/)
- SDD-14: [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md)
