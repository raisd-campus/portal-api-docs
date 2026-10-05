# Existing Eswatini CMS — inventory

**Source package:** `CMS_Eswatini_Source_Codes_&_DB_Structure_23_09_2026.zip` (shared by Mohd Paramasvara / Vara, WhatsApp **5 Oct 2026**)  
**Drive:** `https://drive.google.com/file/d/1xLTPreo4xLAE_IWPoEXmwBtjy1WkiJXP/view?usp=sharing`  
**Database (structure comments):** `campus2_eswatini`  
**SQL extract stamps in filenames:** 5 Oct 2026 11:17  
**Product role:** Sister **LUCT CMS / PHPMaker** campus (legacy batch name still says *swaziland*). **Not** the Lesotho M4 acceptance SoR. Use for [M5](../../sdd/03-delivery-milestones.md#m5) expansion (WG: Eswatini may follow Lesotho). Pair with [old-cms-lesotho.md](old-cms-lesotho.md), [old-cms-botswana.md](old-cms-botswana.md), [old-cms-cyberjaya.md](old-cms-cyberjaya.md).

**Do not commit** the PHP tree, `eswatinibatch` SQL/logs, credentials, uploads, or live student files. Dump stays under `raisd/_local/eswatini-cms-2026-10-05/` only.

**Pages / catalogs:** [`docs/diagrams/old-cms-eswatini/`](../../diagrams/old-cms-eswatini/)

## Package contents (high level)

| Artifact | Role |
|---|---|
| `eswatini/index.php` | LUCT Campus Management System login shell (PHPMaker) |
| `eswatini/campus/*` | Staff desks (registry, faculty, bursary, marketing, lecturer, services, accommodation, setup, …) |
| `eswatini/api-service/` | Campus API-service tree (inventory only — do not republish secrets) |
| `eswatinibatch/` | Batch SQL (`portal.sql`, `registry.sql`, `bursary.sql`, `examination.sql`, …) + `swazilandbatchnight.sh` + **logs/** — **ops data, do not commit** |
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
- **Admissions:** `app_*` (**11** tables) — not Sierra Leone `ac_*`.
- **Portal hooks present:**
  - Tables: `portal_student_eswatini`, `portal_student_program_eswatini`, `portal_student_program_semester_eswatini`, `portal_student_program_semester_module_eswatini`, `portal_student_program_semester_module_attendance_eswatini`, plus legacy **`portal_student_swaziland`**
  - SPs: `api_student_login_info`, `api_student_program_info`, `api_student_semester_info`, `api_student_module_info`, `api_faculty_list`, `api_faculty_program_list`
- **Assist / sponsorship:** `r_assistprovider`, `r_assistscheme*`, `b_assistbilling*` — procedure literals include assist codes **`ssb`** and **`limkokwing`** (not Lesotho `nmds`, not Botswana `DTEF` / TEF POST). **No** `r_scholarshipapp` in this dump.
- **Local scratch:** `swa_sem1`…`swa_sem6`.
- **Triggers present** (70) — unlike Lesotho’s structure export (0 triggers in file).

## Staff / role modules (folders observed)

accommodation, AdBeConnect, bursary, cdu, faculty, IH, lecturer, marketing, modulemat, notice, registry, reporting, services, setup, support, zemail (+ images)

## CAP-53 / CAP-48 notes (first pass)

| Topic | Eswatini finding | Contrast |
|---|---|---|
| CAP-53 reads | `portal_student_*_eswatini` (+ legacy `_swaziland`) + `api_student_*` | Same pattern as Lesotho/BW; campus key **ESWATINI** / suffix `_eswatini` |
| CAP-48 funding | Assist path; codes seen in SPs: **`ssb`**, **`limkokwing`** | ≠ Lesotho NMDS; ≠ Botswana DTEF TEF client |
| Batch / portal refresh | `eswatinibatch/portal.sql` + night script | Expect nightly portal projection refresh (Cyberjaya-like) |

Field-level CAP-53 / `ssb` pass — follow-up (same depth as [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md) when prioritized for M5).

## Open items

- [x] Receive and structure-inventory Vara’s Eswatini pack (5 Oct 2026).
- [ ] Field-level CAP-53 / assist (`ssb`) mapping when M5 Eswatini is scheduled.
- [ ] Confirm Live SoR path for Eswatini relative to Lesotho pilot (WG).
- [ ] ESHEC QA benchmarks (already in SDD-09 SZ-*) vs CMS desks — separate compliance track.

## Related

| Topic | Path |
|---|---|
| Lesotho pilot (M4 first) | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Lesotho inventory | [old-cms-lesotho.md](old-cms-lesotho.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| CAP comparison | [cms-feature-comparison.md](cms-feature-comparison.md) |
| ESHEC / SZ QA rows | [../../sdd/09-requirements-traceability.md](../../sdd/09-requirements-traceability.md) |
