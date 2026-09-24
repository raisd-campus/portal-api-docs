# Existing Sierra Leone CMS — inventory

**Source package:** `ICA_SierraLeone_Codes_&_DB_Structure_23_09_2026` (23 September 2026)  
**Database:** `ems_sierraleone` (structure dump `ems_sierraleone-202609231521-CMS-SierraLeone-Structure-backup.sql`)  
**Product branding in UI:** CMS-ICA V 1.0 (`header.php`)  
**Product role:** Sister **EMS / PHPMaker** campus CMS (Limkokwing ICA Sierra Leone). **Not** the Cyberjaya launch SoR ([ADR-1](../architecture/overview.md)). Use for [M5](../../sdd/03-delivery-milestones.md#m5) campus-expansion comparison and shared EMS pattern recognition.

This file inventories what the Sierra Leone dump contains. It does **not** change the Cyberjaya-first Portal API plan. Pair with [old-cms-cyberjaya.md](old-cms-cyberjaya.md), [old-cms-botswana.md](old-cms-botswana.md), and [cms-feature-comparison.md](cms-feature-comparison.md).

**Do not commit** the PHP tree, `.gz` data dumps, credentials, or live student files from the package. Documentation below is derived structure only.

**GitHub Pages hub (E2E · FSD · flows · ERD · DFD · database · comparison):** [`../../diagrams/old-cms-sierra-leone/`](../../diagrams/old-cms-sierra-leone/)

## Package contents (high level)

| Artifact | Role |
|---|---|
| `sierraleone/*` | PHPMaker staff desks (~1.75k PHP; ~9.7k files incl. FCKeditor / uploads / PDF tooling) |
| `sierraleone/applicationcenter/` | Admissions / enquiry / course application (`ac_*`) — ~218 PHP |
| `sierraleone/registry/` | Student register, offer letters, documents, population — ~215 PHP |
| `sierraleone/academic/` | Schools, programmes, modules, timetables, assessments, attendance — ~202 PHP |
| `sierraleone/finance/` | Fees, invoices, payments, assist / loans / refunds — ~191 PHP |
| `sierraleone/reports/` | Cross-desk reports (enrolment, BOE, transcripts, scholarships) — ~231 PHP |
| `sierraleone/setting/` | Institution / fee / assessment / timetable / staff setup — ~260 PHP |
| `sierraleone/studentaffair/` | Visa / insurance / passport / user-levels — ~77 PHP |
| `sierraleone/help/` | In-app help modules — ~133 PHP |
| `sierraleone/portal/` | Ops SQL / gz extracts only (no PHP app tree) — **do not commit** |
| `sierraleone/lettertemplate/` | Offer-letter RTF (self-paid, government, Portuguese scholarship, sponsor) |
| `sierraleone/zemail/` + `email.php` | Outbound email via central Limkokwing CMS support API |
| `sleonebatch/` | **Empty** in this package (no nightly batch tree shipped) |
| `ICA_SierraLeone_Procedure_23092026.sql` | **6** stored procedures (finance/GPA calculators) |
| `ICA_SierraLeone_Triggers_23092026.sql` | **91** triggers |
| `ICA_SierraLeone_Views_23_09_2026.sql` | **9** views |
| Structure dump | **345** tables (~137 core / non-temp; rest temp, ticket scratch, dated copies) |

Host noted in the structure dump header is an operational MySQL endpoint — treat as sensitive; do not republish connection details.

## Technology shape

- **Core staff UIs:** PHPMaker-generated PHP under `sierraleone/<desk>/`, shared session / user-level security (`s_userlevels`, `s_userlevelpermissions`).
- **Same EMS family as Cyberjaya / Botswana:** familiar `r_*` / `f_*` / `b_*` prefixes, list/info screens, offer-letter RTF under `lettertemplate/`.
- **Smaller surface than Cyberjaya and Botswana:** no Laravel payment/PDPA sub-apps; no large Agent / Adobe Connect / EMGS forests; no `api_student_*` / `portal_*_<campus>` hooks in this dump; far fewer SPs (6 vs ~318 Cyberjaya / 46 Botswana).
- **Admissions naming:** `ac_*` (application centre) rather than Cyberjaya/Botswana `app_*` — same domain (enquiry, course application, eligibility, confirmation docs).
- **Student key:** `r_student.SIdx` (zerofill) is the join spine; `StudentID` is unique business id. Programme rows use `SIdx` FK-style links.
- **Multi-schema login:** `login.php` can list `information_schema.SCHEMATA` matching `ems_%` — classic ICA multi-campus EMS switcher pattern.
- **External integrations (evidence-backed):** Google reCAPTCHA on login; email POST to `cmssupport.limkokwing.net` (`emailserverapi.php` / `pushsupport.php`). **No** government TEF/DTEF-style API in this package (contrast Botswana).
- **Scholarship / assist:** campus-local `b_assist*` / `b_stdassist*` + RTF offer variants (government / Portuguese scholarship) — not a live gov sync queue.

## Staff / role modules (folders observed)

| Folder | ~PHP | Primary job (from screens + tables) |
|---|---:|---|
| `applicationcenter/` | 218 | Applications, course applications, enquiry, eligibility docs, promotions, application fees/payments |
| `registry/` | 215 | Student master, personal/contact/education, offer letters, forms, current-term population |
| `academic/` | 202 | Schools, programmes, modules, structures, timetables, assessments, attendance, gradebook / BOE notes |
| `finance/` | 191 | Fee structures, invoices, payments, adjustments, assist schemes, loans, refunds, financial list |
| `reports/` | 231 | Population, enrolment, payment/scholarship/instalment reports, transcripts, BOE spreadsheets |
| `setting/` | 260 | Institution, terms, fee catalogs, assessment setup, timetable setup, staff / help / agents |
| `studentaffair/` | 77 | Student visa, insurance / claims, passport |
| `help/` | 133 | Modular help content |
| `support/` | 0 | Present but empty of PHP in this dump |
| `portal/` | 0 | SQL/gz portal extracts only |
| `zemail/` | 2 | Shared email helper posting to CMS support |

## End-to-end lifecycle (summary)

1. **Recruit / enquire** — `ac_enquiry` (+ application centre screens).
2. **Apply** — `ac_application` → `ac_courseapplication` → eligibility docs / confirmation.
3. **Offer** — Registry `r_stdofferletter` + RTF templates (self-paid / government / Portuguese / sponsor).
4. **Enrol** — `r_student` / `r_stdprogram` / `r_stdsemester` / fee structure link.
5. **Study** — Academic timetable (`f_timetable*`), attendance (`f_stdattendance`), assessment / release results, GPA SPs.
6. **Finance** — `b_feestructure` → `b_invoice` / `b_payment*` → statement views; assist / loan / refund paths.
7. **Student affairs** — passport / visa (`sa_*`, `r_stdpassport`) and insurance claims.
8. **Report** — Reports desk (population, enrolment, transcripts, scholarships, BOE).

## Domain tables (structure dump)

Counts are **table names** (includes dated copies such as `*_20171220` — not “active entities only”).

| Domain signal | Approx. tables | Examples |
|---|---:|---|
| Temp / scratch / ticket / dated copies | ~208 | `temp_*`, `tmp_*`, `tempTicketTG*`, `*_20161220` |
| Academic `f_*` | ~44 | `f_program`, `f_module`, `f_semester`, `f_timetable`, `f_assessment*`, `f_stdattendance` |
| Finance `b_*` | ~31 | `b_invoice`, `b_payment*`, `b_feestructure*`, `b_assist*`, `b_studentloan*` |
| Questionnaire / letters `q_*` | ~27 | `q_letter*`, `q_classroom*`, `q_campus`, offer-letter sign helpers |
| Student records `r_*` | ~26 | `r_student`, `r_stdpersonal`, `r_stdsemester`, `r_stdmodule`, `r_stdofferletter` |
| Survey / security `s_*` | ~8 | `s_staff`, `s_userlevels`, `s_setting`, `s_audit` |
| Admissions `ac_*` | ~7 | `ac_application`, `ac_courseapplication`, `ac_enquiry`, `ac_promotion` |
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

- Application centre: `ac_application`, `ac_courseapplication`, `ac_enquiry`, eligibility / confirmation document screens.
- Offer letters: `r_stdofferletter`, Registry `OfferLetter*` pages, RTF under `lettertemplate/` including government and Portuguese scholarship variants (template-only — not a TEF POST).

### Student academic life (staff-operated)

- Programme / module / semester: `f_program`, `f_module`, `f_semmodule*`, `r_stdprogram`, `r_stdsemester`, `r_stdmodule`.
- Timetable: `f_timetable*`, `c_stdtimetable` view.
- Attendance: `f_stdattendance`.
- Assessment / results: `f_assessment*`, `f_stdassessment*`, release-result tables, GPA SPs, BOE report screens.

### Finance

- Fee structure, invoices, payments, adjustments, assist schemes, student loans, refunds — classic `b_*` with calculating SPs and many triggers.
- Statement views for ledger-style student balances.

### Student affairs

- Visa + insurance claims (`sa_*`), passport records — smaller than Cyberjaya’s EMGS/KDN forest and Botswana’s `w_*` / `acc_*` surface.
- **No accommodation / library / marketing desks** in this package (contrast Botswana).

### Integrations

| Integration | Evidence | Notes |
|---|---|---|
| CMS support email | `email.php`, `zemail/com.mh.func.app.email.php` → `cmssupport.limkokwing.net` | Shared Limkokwing email / push APIs |
| reCAPTCHA | `login.php` | Google siteverify |
| Gov scholarship API | — | **Absent** (Botswana-only TEF pattern) |
| Portal API hooks | — | **Absent** in this dump (`api_student_*`, `portal_*_sierraleone` not found) |
| Nightly batch | `sleonebatch/` | Empty folder |

## Comparison to Cyberjaya & Botswana

| Signal | Cyberjaya (`cmscbj`) | Botswana (`cmsbotswana`) | Sierra Leone (`ems_sierraleone`) |
|---|---|---|---|
| Dump date | 23 Sep 2026 | 24 Sep 2026 | 23 Sep 2026 |
| Tables (structure) | ~1,942 | 713 | 345 (~137 non-temp) |
| Stored procedures | ~318 | 46 (+15 fn) | 6 |
| Triggers | ~239 | 157 | 91 |
| Views | large | 407 | 9 |
| Laravel add-ons | Payment + ICU PDPA | Not in package | Not in package |
| Admissions prefix | Mostly `app_*` | Mostly `app_*` | Mostly `ac_*` |
| Desk layout | Many `campus/<desk>` | 14 desks under `botswana/campus/` | 7 active desks under `sierraleone/` |
| Gov sync | — | DTEF → tef.gov.bw | — |
| Portal API hooks | `api_student_*`, … | `api_student_*`, `portal_*_botswana` | Not present |
| Launch SoR (ADR-1) | Yes | No — M5 | No — M5 |

## Implications for Raisd

1. **Do not treat Sierra Leone as the launch SoR.** Cyberjaya remains ADR-1.
2. **EMS family is portable.** Portal API ACL designs validated on Cyberjaya `r_*` / `f_*` / `b_*` will largely transfer; expect campus-specific admissions naming (`ac_*`) and thinner SP/API surfaces.
3. **[M5](../../sdd/03-delivery-milestones.md#m5) expansion** should re-inventory each campus dump the same way (structure + desks + routines + integrations) before assuming Cyberjaya or Botswana feature parity.
4. **[CAP-53](../../sdd/11-capability-catalog.md#cap-53)** campus configuration must remain campus-keyed; Sierra Leone proves a third live schema shape in the same product family (thinner than Botswana, admissions alias `ac_*`).
5. **Do not invent a Sierra Leone TEF equivalent** — government scholarship appears as letter templates + assist billing, not an outbound gov API in this package.

## Related

- Cyberjaya inventory: [old-cms-cyberjaya.md](old-cms-cyberjaya.md)
- Botswana inventory: [old-cms-botswana.md](old-cms-botswana.md)
- Botswana DTEF sync: [botswana-dtef-scholarship-sync.md](botswana-dtef-scholarship-sync.md)
- CAP comparison (Cyberjaya-focused): [cms-feature-comparison.md](cms-feature-comparison.md)
- GitHub Pages: [../../diagrams/old-cms-sierra-leone/](../../diagrams/old-cms-sierra-leone/)
- SDD-14: [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md)
