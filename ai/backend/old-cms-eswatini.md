# Existing Eswatini CMS — LUCT CMS inventory

**LUCT CMS subsection:** [`docs/diagrams/old-cms/index.html#eswatini`](../../diagrams/old-cms/index.html#eswatini) · top nav **LUCT CMS → Eswatini**

**Source package:** `CMS_Eswatini_Source_Codes_&_DB_Structure_23_09_2026.zip` (shared by Mohd Paramasvara / Vara, WhatsApp **5 Oct 2026**)  
**Drive:** `https://drive.google.com/file/d/1xLTPreo4xLAE_IWPoEXmwBtjy1WkiJXP/view?usp=sharing`  
**Database (structure comments):** `campus2_eswatini`  
**SQL extract stamps in filenames:** 5 Oct 2026 11:17  
**Product role:** **LUCT CMS / PHPMaker** campus dump (legacy batch name still says *swaziland*). Same product family as Cyberjaya / Lesotho / Botswana / Cambodia. **Not** the Lesotho M4 acceptance SoR. Use for [M5](../../sdd/03-delivery-milestones.md#m5) expansion (WG: Eswatini may follow Lesotho). Pair with [old-cms-lesotho.md](old-cms-lesotho.md), [old-cms-botswana.md](old-cms-botswana.md), [old-cms-cambodia.md](old-cms-cambodia.md), [old-cms-cyberjaya.md](old-cms-cyberjaya.md), [old-cms-sierra-leone.md](old-cms-sierra-leone.md).

**Do not commit** the PHP tree, `eswatinibatch` SQL/logs, credentials, uploads, or live student files. Dump stays under `raisd/_local/eswatini-cms-2026-10-05/` only.

**GitHub Pages hub (E2E · FSD · flows · integrations · ERD · DFD · database · comparison):** [`../../diagrams/old-cms-eswatini/`](../../diagrams/old-cms-eswatini/)

## Package contents (high level)

| Artifact | Role |
|---|---|
| `eswatini/index.php` | LUCT Campus Management System login shell (PHPMaker) |
| `eswatini/campus/*` | Staff desks (registry, faculty, bursary, marketing, lecturer, services, accommodation, setup, …) |
| `eswatini/api-service/` | Campus API-service tree (inventory only — do not republish secrets) |
| `eswatini/campus/AdBeConnect/` | Adobe Connect–style desk folder |
| `eswatini/campus/IH/`, `modulemat/`, `support/` | Ancillary desks |
| `eswatinibatch/` | Batch SQL (`portal.sql`, `registry.sql`, `bursary.sql`, `examination.sql`, `billing.sql`) + `swazilandbatchnight.sh` + **logs/** — **ops data, do not commit** |
| `CMS_Eswatini_Database_Table_*.sql` | **472** tables |
| `CMS_Eswatini_Database_Views_*.sql` | **330** views |
| `CMS_Eswatini_Database_Procedures_*.sql` | **53** procedures + **3** functions |
| `CMS_Eswatini_Database_Triggers_*.sql` | **70** triggers |

## Measured schema counts

| Object | Count |
|---|---:|
| Tables | **472** |
| Views | **330** |
| Stored procedures | **53** |
| Functions | **3** |
| Triggers | **70** |

### Table-name overlap (same catalog names)

| Campus | Overlap of Eswatini’s 472 tables |
|---|---:|
| Lesotho (`campus2_lesotho`, 369) | **~65%** |
| Botswana (`cmsbotswana`, 713) | **~60%** |
| Cyberjaya (`cmscbj`, ~1,942) | **~59%** |
| Sierra Leone EMS | **~5%** (not the same family shape) |

**Implication:** Eswatini is a **mid-size LUCT sibling** — larger than Lesotho (369), thinner than Botswana (713). Prefer LUCT adapter patterns; keep CAP-53 **campus-keyed**.

## Technology shape

- **LUCT PHPMaker family:** desks under `eswatini/campus/<desk>/`, prefixes `r_*` · `f_*` · `b_*` · `app_*` · `s_*` · `w_*` · `rep_*` · `gb_*` · `swa_*`.
- **Admissions:** `app_*` (**11** tables) — not Sierra Leone `ac_*`. Catalog names include `app_applicationform`, `app_applicationform_online`, `app_docfile`, `app_applicationeducation`.
- **Portal hooks present:**
  - Tables: `portal_student_eswatini`, `portal_student_program_eswatini`, `portal_student_program_semester_eswatini`, `portal_student_program_semester_module_eswatini`, `portal_student_program_semester_module_attendance_eswatini`, plus legacy **`portal_student_swaziland`**
  - SPs: `api_student_login_info`, `api_student_program_info`, `api_student_semester_info`, `api_student_module_info`, `api_faculty_list`, `api_faculty_program_list`
- **Assist / sponsorship:** `r_assistprovider`, `r_assistscheme*`, `b_assistbilling*` — procedure / scheme literals include assist codes **`ssb`** and **`limkokwing`** (not Lesotho `nmds`, not Botswana `DTEF` / TEF POST). **No** `r_scholarshipapp` in this dump.
- **Local scratch:** `swa_sem1`…`swa_sem6`; `gb_*` (~32) local structure mirrors.
- **Triggers present** (70) — unlike Lesotho’s structure export (0 triggers in file).

## Staff / role modules (folders observed)

| Folder | Primary job (from screens + tables) | Approx. PHP files (desk root) |
|---|---|---:|
| `registry/` | Student master, personal/contact, offer letters, forms | **421** |
| `bursary/` | Invoices, payments, assist / scholarships | **353** |
| `services/` | Visa, insurance, welfare ops | **341** |
| `faculty/` | Schools, programmes, modules, attendance, results | **332** |
| `setup/` | Institution, terms, fee catalogs, user levels | **303** |
| `reporting/` | Population, enrolment, payment, scholarship reports | **258** |
| `marketing/` | Applications, recruitment | **242** |
| `accommodation/` | Rooms, occupants, accommodation charges | **198** |
| `cdu/` | AQA / programme accreditation | **168** |
| `lecturer/` | Marks, attendance, module materials | **167** |
| `notice/` | Bulletin / noticeboard | **86** |
| `zemail/` | Outbound email helpers | **4** |

Also present: `AdBeConnect/`, `IH/`, `modulemat/`, `support/`, `api-service/` (not in PHP count table above).

## Domain tables (structure dump)

Counts are **table names** by prefix (approximate).

| Domain signal | Approx. tables | Examples |
|---|---:|---|
| Student records `r_*` | ~113 | `r_student`, `r_stdpersonal`, `r_stdprogram`, `r_stdsemester`, `r_stdmodule`, `r_stdofferletter` |
| Academic `f_*` | ~77 | programmes, modules, timetable / release-result |
| Finance `b_*` | ~54 | `b_assistbilling`, `b_assistbillingdetail`, payments / receipts |
| Reports helpers `rep_*` | ~40 | population / enrolment report helpers |
| Security / staff `s_*` | ~36 | staff, user levels |
| Local structs `gb_*` | ~32 | `gb_student`, `gb_program`, `gb_stdmodule`, `gb_stdsemester` |
| Temp / scratch `temp_*` | ~25 | scratch / dated copies |
| Welfare / acco `w_*` | ~16 | `w_visa`, `w_insurance*`, `w_occupant`, `w_room`, `w_receiptacco` |
| Admissions `app_*` | ~11 | `app_applicationform`, `app_applicationform_online`, `app_docfile` |
| In-house / IH `ih_*` | ~9 | IH attendance / marks / student mirrors |
| Portal sync `portal_*` | ~6 | `portal_student_eswatini` (+ program/semester/module/attendance) + `portal_student_swaziland` |
| Local scratch `swa_*` | ~6 | `swa_sem1` … `swa_sem6` |

Machine extract: [`../../diagrams/old-cms-eswatini/_table-catalog.txt`](../../diagrams/old-cms-eswatini/_table-catalog.txt) · index [`CATALOG.md`](../../diagrams/old-cms-eswatini/CATALOG.md).

## Routines and views

### Stored procedures (53) — notable groups

| Group | Examples |
|---|---|
| Portal / API | `api_student_login_info`, `api_student_module_info`, `api_student_program_info`, `api_student_semester_info`, `api_faculty_list`, `api_faculty_program_list` |
| Online applications | `AfterInsertApplicationForm`, `FetchOnlineApplication*`, `InsertOnlineAppPersonalInfo`, `UpdateOnlineApp*`, `OnlineAppEmailNotification`, `OnlineRegNotification` |
| Finance / billing | `b_Update_billing`, `b_Update_Student`, `b_Update_Accommodation`, `sp_payment_verification_insert` |
| Registry / academic | `FetchOfferLetters`, `r_Update_Semester`, `StudentConfirmModule`, `examination`, `fetchCAFDetails` |
| Local / SWA helpers | `sp_swa_Intake`, `sp_swa_programlist`, `sp_swa_countrylist`, `sp_swa_nationality`, `sp_swa_religion` |

Plus **3** functions: `ExtractNumberFromString`, `ISNUMERIC`, `cap_first`.

Catalogs: [`_proc-catalog.txt`](../../diagrams/old-cms-eswatini/_proc-catalog.txt) · [`_function-catalog.txt`](../../diagrams/old-cms-eswatini/_function-catalog.txt).

### Triggers (70)

Present on admissions (`app_applicationform*`), finance assist billing (`b_assistbillingdetail*`), and registry / academic chains. Full list: [`_trigger-catalog.txt`](../../diagrams/old-cms-eswatini/_trigger-catalog.txt).

### Views (330)

Large reporting surface (finance statements, population, academic, staff desk views). Catalog: [`_view-catalog.txt`](../../diagrams/old-cms-eswatini/_view-catalog.txt).

## Notable capabilities (evidence-backed)

### Admissions

- Staff + online application forms: `app_applicationform`, `app_applicationform_online`, doc files, education rows (`app_*` = **11** tables).
- Offer letters: `r_stdofferletter*`; SP `FetchOfferLetters`.
- Online app SPs: `AfterInsertApplicationForm`, `FetchOnlineApplication*`, `InsertOnlineAppPersonalInfo`, `UpdateOnlineApp*`.

### Academic

- Programme / module / semester spine: `r_student` → `r_stdprogram` → `r_stdsemester` → `r_stdmodule`.
- Faculty + lecturer desks; IH mirrors (`ih_*`); SPs `StudentConfirmModule`, `r_Update_Semester`, `examination`.
- Local `gb_*` structure mirrors (~32 tables).

### Finance / assist

- Classic `b_*` billing with `b_Update_billing` / `b_Update_Student` / `b_Update_Accommodation`.
- Assist path: `r_assistprovider`, `r_assistscheme*`, `b_assistbilling*` — codes **`ssb`**, **`limkokwing`**.
- **Contrast:** ≠ Lesotho NMDS (`nmds`); ≠ Botswana DTEF / `r_scholarshipapp` / TEF.gov.bw POST. No government scholarship API invented for this dump.

### Accommodation & student life

- Accommodation desk (~198 PHP) on `w_occupant`, `w_room`, `w_receiptacco*` (no thick `acc_*` forest like Botswana).
- Services desk (~341 PHP): `w_visa`, `w_insurance*`; SPs such as `sp_student_visaexp`.

### Portal

- Campus-suffixed portal tables (`*_eswatini`) plus legacy **`portal_student_swaziland`**.
- `api_student_*` / `api_faculty_*` SPs — treat as Eswatini-local CAP-53 ACL candidates for M5.
- Night batch: `eswatinibatch/` (`portal.sql`, `registry.sql`, `bursary.sql`, `examination.sql`, `billing.sql`) + `swazilandbatchnight.sh` + logs — ops only, not committed.
- `api-service/` and `AdBeConnect/` folders present (inventory only).

## Comparison (quick)

| Signal | Cyberjaya | Lesotho | Botswana | **Eswatini** | Cambodia | Sierra Leone |
|---|---|---|---|---|---|---|
| Tables | ~1,942 | 369 | 713 | **472** | 481 | 345 |
| Views | large | 351 | 407 | **330** | (inv.) | 9 |
| SPs / fn / triggers | ~318 / — / ~239 | 51 / 6 / 0† | 46 / 15 / 157 | **53 / 3 / 70** | (inv.) | 6 / — / 91 |
| Overlap vs SZ | ~59% | ~65% | ~60% | — | sibling | ~5% |
| Admissions | `app_*` | `app_*` | `app_*` | **`app_*` (11)** | `app_*` (10) | `ac_*` |
| Portal hooks | `*_cyberjaya` | `*_lesotho` | `*_botswana` | **`*_eswatini` + legacy `_swaziland`** | `*_cambodia` | Not in dump |
| Assist / gov | Assist | **NMDS** | **DTEF → TEF** | **`ssb` · `limkokwing`** | Campus assist | Local assist |
| Raisd role | ADR-1 historic | **M4 SoR** | M5 + TEF | **M5 sibling** | M5 | M5 EMS |

† Lesotho structure export showed 0 triggers in file.

Pages: [`old-cms-eswatini/index.html`](../../diagrams/old-cms-eswatini/index.html) (§9 comparison).

## Implications for Raisd

1. **Do not treat Eswatini as the M4 SoR.** Lesotho remains the pilot acceptance campus; Eswatini is an M5 LUCT sibling (WG: may follow Lesotho).
2. **Prefer LUCT adapter patterns.** Same `app_*` admissions + `api_student_*` / `portal_*_<campus>` shape as Lesotho and Botswana — cleaner than Sierra Leone EMS/`ac_*`.
3. **CAP-53 campus key = `ESWATINI`.** Portal tables use `_eswatini` suffix; also plan for legacy `portal_student_swaziland` reads during cutover.
4. **CAP-48 funding is local assist** with codes **`ssb`** and **`limkokwing`**. Do **not** reuse Lesotho NMDS or Botswana TEF clients.
5. **Expect nightly portal projection refresh** via `eswatinibatch` (ops artefacts stay out of git).
6. **Field-level CAP-53 / `ssb` pass** — follow-up when M5 Eswatini is scheduled (same depth as [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md)).

## Open items

- [x] Receive and structure-inventory Vara’s Eswatini pack (5 Oct 2026).
- [x] E2E hub page + sanitized catalogs under `docs/diagrams/old-cms-eswatini/`.
- [ ] Field-level CAP-53 / assist (`ssb`) mapping when M5 Eswatini is scheduled.
- [ ] Confirm Live SoR path for Eswatini relative to Lesotho pilot (WG).
- [ ] ESHEC QA benchmarks (already in SDD-09 SZ-*) vs CMS desks — separate compliance track.

## Related

| Topic | Path |
|---|---|
| Pages E2E hub | [`../../diagrams/old-cms-eswatini/`](../../diagrams/old-cms-eswatini/) |
| LUCT CMS subsection | [`../../diagrams/old-cms/index.html#eswatini`](../../diagrams/old-cms/index.html#eswatini) |
| Lesotho pilot (M4 first) | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Lesotho inventory | [old-cms-lesotho.md](old-cms-lesotho.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| Botswana DTEF (≠ Eswatini) | [botswana-dtef-scholarship-sync.md](botswana-dtef-scholarship-sync.md) |
| Cambodia inventory | [old-cms-cambodia.md](old-cms-cambodia.md) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| Sierra Leone inventory | [old-cms-sierra-leone.md](old-cms-sierra-leone.md) |
| CAP comparison | [cms-feature-comparison.md](cms-feature-comparison.md) |
| ESHEC / SZ QA rows | [../../sdd/09-requirements-traceability.md](../../sdd/09-requirements-traceability.md) |
