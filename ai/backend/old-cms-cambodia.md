# Existing Cambodia CMS — LUCT CMS inventory

**LUCT CMS subsection:** [`docs/diagrams/old-cms/index.html#cambodia`](../../diagrams/old-cms/index.html#cambodia) · top nav **LUCT CMS → Cambodia**

**Source package:** `CMS_Cambodia_Source_Codes_&_DB_Structure_07_10_2026.zip` (shared by Mohd Paramasvara / Vara, WhatsApp **7 Oct 2026**)  
**Drive:** `https://drive.google.com/file/d/1iTKUKqREd4dzJ5tXWKCO71Qn5Rl4Xp6v/view?usp=drive_link`  
**Database (structure / DEFINER):** `campus2_cambodia`  
**Secondary portal export DB (batch):** `portalcambodia` (`*_cam` / `*_cambodia` projection tables)  
**SQL extract stamps in filenames:** 7 Oct 2026  
**Product role:** **LUCT CMS / PHPMaker** campus dump. Same product family as Cyberjaya / Lesotho / Botswana / Eswatini. **Not** the Lesotho M4 acceptance SoR. Use for [M5](../../sdd/03-delivery-milestones.md#m5) expansion / evidence. Pair with [old-cms-lesotho.md](old-cms-lesotho.md), [old-cms-eswatini.md](old-cms-eswatini.md), [old-cms-botswana.md](old-cms-botswana.md), [old-cms-cyberjaya.md](old-cms-cyberjaya.md), [old-cms-sierra-leone.md](old-cms-sierra-leone.md).

**Do not commit** the PHP tree, `cambodiabatch` SQL/logs, credentials (night script embeds DB auth — present in pack, **do not republish**), uploads, or live student files. Dump stays under `raisd/_local/cambodia-cms-2026-10-07/` only.

**GitHub Pages hub (E2E · FSD · flows · integrations · ERD · DFD · database · comparison):** [`../../diagrams/old-cms-cambodia/`](../../diagrams/old-cms-cambodia/)

## Package contents (high level)

| Artifact | Role |
|---|---|
| `cambodia/index.html` | LUCT Campus Management System shell (PHPMaker 4.3; title **CAMPUS MANAGEMENT SYSTEM 0.9**; desks linked as `./campus/…` in markup; pack folders sit at `cambodia/<desk>/`) |
| `cambodia/*` | Staff desks (~4.9k PHP under desk roots; setup/faculty/reporting largest) |
| `cambodia/registry/`, `faculty/`, `bursary/`, `marketing/`, … | Operational desks (see module table below) |
| `cambodia/lettertemplate/`, `uploads/`, `images/` | RTF / media — **ops data, do not commit** |
| `cambodiabatch/` | Batch SQL (`portal.sql`, `registry.sql`, `bursary.sql`, `examination.sql`, `transcript.sql`) + `cambodiabatchnight.sh` + **logs/** — **ops data, do not commit** |
| `CMS_Cambodia_Tables_*.sql` | **481** tables |
| `CMS_Cambodia_Views_*.sql` | **296** views |
| `CMS_Cambodia_Procedures_*.sql` | **46** procedures + **2** functions |
| `CMS_Cambodia_Triggers_*.sql` | **83** triggers |

Host / definer accounts and night-script credentials are operational — treat as sensitive; do not republish connection details.

## Measured schema counts

| Object | Count |
|---|---:|
| Tables | **481** |
| Views | **296** |
| Stored procedures | **46** |
| Functions | **2** (`Cap_First`, `ExtractNumberFromString`) |
| Triggers | **83** |

### Table-name overlap (same catalog names)

| Campus | Overlap of Cambodia’s 481 tables |
|---|---:|
| Botswana (`cmsbotswana`, 713) | **~68%** |
| Cyberjaya (`cmscbj`, ~1,942) | **~67%** |
| Lesotho (`campus2_lesotho`, 369) | **~65%** |
| Eswatini (`campus2_eswatini`, 472) | **~62%** |
| Sierra Leone EMS | **~5%** (not the same family shape) |

**Implication:** Cambodia is a **mid-size LUCT sibling** — slightly larger than Eswatini (472), thinner than Botswana (713). Prefer LUCT adapter patterns; keep CAP-53 **campus-keyed** (`CAMBODIA`).

## Technology shape

- **LUCT PHPMaker family:** desks under `cambodia/<desk>/` (not a `campus/` subfolder in the zip — shell markup still says `./campus/…`). Prefixes `r_*` · `f_*` · `b_*` · `app_*` · `s_*` · `w_*` · `rep_*` · `temp_*` · `ih_*`.
- **Brand:** shell title `CAMPUS MANAGEMENT SYSTEM 0.9` — campus-coded sibling of Cyberjaya / Botswana, not ICA Sierra Leone EMS folder layout.
- **Admissions:** Cyberjaya/Botswana-style `app_*` (**10** tables) including `app_applicationformonline` — not Sierra Leone `ac_*`.
- **Portal hooks present:**
  - Tables: `portal_student_cambodia`, `portal_student_program_cambodia`, `portal_student_program_semester_cambodia`, `portal_student_program_semester_module_cambodia`, `portal_student_program_semester_module_attendance_cambodia`, plus `r_studentcert_cambodia`
  - SPs: `api_student_login_info`, `api_student_program_info`, `api_student_semester_info`, `api_student_module_info`, `api_faculty_list`, `api_faculty_program_list`
  - Night batch also dumps portal projections into **`portalcambodia`** (`*_cam` / `*_cambodia` names)
- **Assist / sponsorship:** `r_assistprovider`, `r_assistscheme*`, `b_assistbilling*` — SP literal seen: assist provider code **`Limkokwing`**. **No** `r_scholarshipapp` in this dump; reporting table `rep_scholarship` present. **Not** Lesotho `nmds`, **not** Botswana DTEF / TEF POST, **not** Eswatini `ssb`.
- **Local report scratch:** `rep_curtermpop_camb`, `rep_nostudents_active_camb` (+ `*_cam` siblings).
- **Welfare / acco:** thick `w_*` (~52) — dorm/room/occupant/insurance on `w_*` (only ~1 `acc_*` name); thicker life surface than Eswatini.
- **Triggers present** (83) — unlike Lesotho’s structure export (0 triggers in file).
- **No** separate `api-service/` tree in this pack (unlike Eswatini).

## Staff / role modules (folders observed)

| Folder | ~PHP | Primary job (from screens + tables) |
|---|---:|---|
| `setup/` | 830 | Institution, terms, fee catalogs, user levels, config |
| `faculty/` | 792 | Schools, programmes, modules, attendance, results |
| `reporting/` | 594 | Population, enrolment, payment, scholarship reports |
| `registry/` | 454 | Student master, offers, forms, transcripts, certs |
| `bursary/` | 394 | Invoices, payments, receipts, assist billing |
| `lecturer/` | 360 | Marks, attendance, module materials |
| `services/` | 356 | Welfare, counselling, visa / insurance ops |
| `ih/` | 287 | In-house / short-course attendance & marks |
| `marketing/` | 280 | Applications, agents, recruitment (`app_*`) |
| `cdu/` | 242 | AQA / programme accreditation |
| `accommodation/` | 197 | Dorms, occupants, room charges (`w_dorm` / `w_room*`) |
| `notice/` | 122 | Bulletin / noticeboard |
| `zemail/` | 6 | Outbound email helpers |
| `modulemat/`, `support/` | 0 | Folders present; no `.php` under these tops in zip count |
| `(root)` | 16 | Shell + `message*.php` helpers |
| `lettertemplate/`, `uploads/`, `images/` | — | RTF / media (not counted as desk PHP) |

## Domain tables (structure dump)

Counts are **table names** (includes scratch / dated copies — not “active entities only”).

| Domain signal | Approx. tables | Examples |
|---|---:|---|
| Student records `r_*` | ~117 | `r_student`, `r_stdpersonal`, `r_stdsemester`, `r_stdmodule`, `r_stdofferletter`, `r_assist*` |
| Academic `f_*` | ~76 | `f_program`, `f_module`, `f_modulemat*`, accreditation |
| Temp / scratch `temp_*` | ~66 | `temp_*` scratch tables |
| Welfare / acco / visa `w_*` | ~52 | `w_dorm`, `w_room*`, `w_occupant`, `w_insurance*`, `w_application` |
| Reports helpers `rep_*` | ~47 | `rep_curtermpop_camb`, `rep_nostudents_active_camb`, `rep_scholarship` |
| Finance `b_*` | ~34 | `b_assistbilling*`, payment / receipt family |
| Security / staff `s_*` | ~19 | `s_staff`, user levels |
| Admissions `app_*` | ~10 | `app_applicationform`, `app_applicationformonline`, `app_docfile` |
| In-house / IH `ih_*` | ~10 | `ih_student`, `ih_stdattendance`, `ih_stdmark` |
| Portal sync `portal_*` | 5 | `portal_student_*_cambodia` (+ `r_studentcert_cambodia`) |

Machine extract: [`../../diagrams/old-cms-cambodia/_table-catalog.txt`](../../diagrams/old-cms-cambodia/_table-catalog.txt) · [CATALOG.md](../../diagrams/old-cms-cambodia/CATALOG.md).

## Routines and views

### Stored procedures (46) — notable groups

| Group | Examples |
|---|---|
| Portal / API | `api_student_login_info`, `api_student_module_info`, `api_student_program_info`, `api_student_semester_info`, `api_faculty_list`, `api_faculty_program_list` |
| Online applications | `AfterInsertApplicationForm`, `FetchOnlineApplication*`, `InsertOnlineAppPersonalInfo`, `UpdateOnlineApp*`, `OnlineAppEmailNotification`, `OnlineRegNotification` |
| Finance / billing | `b_Update_Student`, `b_Update_Student_All`, `b_Update_Accommodation`, `b_Update_Student_Mark`, `sp_payment_verification_insert` |
| Registry / academic | `FetchOfferLetters`, `r_Update_Semester`, `StudentConfirmModule`, `examination`, `GetStudentCertInfo`, `fetchCAFDetails` |
| Student portal helpers | `sp_student_os_info`, `sp_student_visaexp`, `sp_student_bank_info*`, `sp_onlinenrollment_*` |

Plus **2** helper functions (`Cap_First`, `ExtractNumberFromString`).

Catalog: [`../../diagrams/old-cms-cambodia/_proc-catalog.txt`](../../diagrams/old-cms-cambodia/_proc-catalog.txt) · [`_function-catalog.txt`](../../diagrams/old-cms-cambodia/_function-catalog.txt).

### Triggers (83)

Present across registry / finance / academic chains (full list names only). Catalog: [`../../diagrams/old-cms-cambodia/_trigger-catalog.txt`](../../diagrams/old-cms-cambodia/_trigger-catalog.txt).

### Views (296)

Large reporting surface: population / outstanding, accommodation occupancy, academic helpers, local Cambodia scratch (`rep_*_camb` / `*_cam`). Catalog: [`../../diagrams/old-cms-cambodia/_view-catalog.txt`](../../diagrams/old-cms-cambodia/_view-catalog.txt).

## Notable capabilities (evidence-backed)

### Admissions

- Online + staff application forms: `app_applicationform`, `app_applicationformonline`, education / doc files, status / type lookups.
- Offer letters: `r_stdofferletter*`; `FetchOfferLetters` SP; letter templates under `cambodia/lettertemplate/`.

### Student academic life (staff-operated)

- Programme / module / semester: `f_program`, `f_module`, `r_stdprogram`, `r_stdsemester`, `r_stdmodule`.
- Lecturer + IH desks for marks / attendance; `StudentConfirmModule`, `r_Update_Semester`, `examination`.
- Certs: `r_studentcert_cambodia` + `GetStudentCertInfo`.

### Finance

- Payments / receipts / assist billing (`b_assistbilling*`) — classic `b_*` with update SPs.
- Assist schemes: `r_assistprovider` / `r_assistscheme*` — provider code **`Limkokwing`** seen in SP literals.
- **No** `r_scholarshipapp` TEF queue; `rep_scholarship` for reporting only.

### Accommodation & student affairs

- Richer than Sierra Leone / thicker `w_*` than Eswatini: dorm / room / occupant / charges / insurance / applications on `w_*`.

### Portal API surface & batch

- Campus-suffixed portal tables (`*_cambodia`) and `api_student_*` / `api_faculty_*` SPs — treat as Cambodia-local ACL candidates for M5.
- Nightly `cambodiabatch` SQL + `cambodiabatchnight.sh` refresh slices into **`portalcambodia`** (credentials present in script — do not republish).

## Comparison to sibling campuses (quick)

| Signal | Cyberjaya | Lesotho | Botswana | Eswatini | **Cambodia** | Sierra Leone |
|---|---|---|---|---|---|---|
| Tables | ~1,942 | 369 | 713 | 472 | **481** | 345 |
| Views | large | (inv.) | 407 | 330 | **296** | 9 |
| SPs (+fn) | ~318 | (inv.) | 46 (+15) | 53 (+3) | **46 (+2)** | 6 |
| Triggers | ~239 | 0 in file | 157 | 70 | **83** | 91 |
| Admissions | `app_*` | `app_*` | `app_*` | `app_*` | **`app_*` (10)** | `ac_*` |
| Funding | Assist | **NMDS** | **DTEF** | `ssb` | **Assist Limkokwing** | Local assist |
| Portal hooks | yes | yes | yes | yes | **yes + portalcambodia** | not in dump |
| api-service tree | — | — | — | yes | **no** | — |
| Raisd role | depth ref | **M4 SoR** | M5 | M5 | **M5 evidence** | M5 EMS |
| Overlap vs KH | ~67% | ~65% | ~68% | ~62% | — | ~5% |

## Implications for Raisd

1. **Do not treat Cambodia as the Lesotho M4 SoR.** Lesotho remains the acceptance campus; Cambodia is **M5** expansion / evidence.
2. **Closest sisters by table-name overlap:** Botswana (~68%) and Cyberjaya (~67%). Same LUCT desk tree and `app_*` admissions; Portal API ACL patterns transfer more cleanly than Sierra Leone’s EMS/`ac_*` shape.
3. **Expect campus suffixes and local export DB** (`*_cambodia`, `portalcambodia`, `*_cam`) — [CAP-53](../../sdd/11-capability-catalog.md#cap-53) must stay campus-keyed (**CAMBODIA**); do not hard-code Cyberjaya or Lesotho table names.
4. **Assist is campus-local (`Limkokwing`)** — do not invent NMDS / TEF / `ssb` clients for Cambodia. [CAP-48](../../sdd/11-capability-catalog.md) funding path stays Assist + bursary ledger.
5. **Thick `w_*` life/acco** may need earlier staff-portal surfaces than thin EMS campuses when Cambodia is scheduled.
6. **Replace shell-credential `cambodiabatchnight.sh` for Live** — Portal API / approved ops path should own durable portal projection; never commit script secrets.
7. **ACC / MoEYS (SDD-09 KH-*)** remains a separate compliance track from CMS desk inventory.

## Related

| Topic | Path |
|---|---|
| Pages E2E hub | [`../../diagrams/old-cms-cambodia/`](../../diagrams/old-cms-cambodia/) |
| LUCT CMS → Cambodia | [`../../diagrams/old-cms/index.html#cambodia`](../../diagrams/old-cms/index.html#cambodia) |
| Lesotho pilot (M4 first) | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Lesotho inventory | [old-cms-lesotho.md](old-cms-lesotho.md) |
| Eswatini inventory | [old-cms-eswatini.md](old-cms-eswatini.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| Sierra Leone inventory | [old-cms-sierra-leone.md](old-cms-sierra-leone.md) |
| CAP comparison | [cms-feature-comparison.md](cms-feature-comparison.md) |
| Cambodia QA rows | [../../sdd/09-requirements-traceability.md](../../sdd/09-requirements-traceability.md) (KH-*) |
| SDD-14 | [../../sdd/14-cms-feature-comparison.md](../../sdd/14-cms-feature-comparison.md) |
