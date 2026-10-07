# Existing Cambodia CMS — LUCT CMS inventory

**LUCT CMS subsection:** [`docs/diagrams/old-cms/index.html#cambodia`](../../diagrams/old-cms/index.html#cambodia) · top nav **LUCT CMS → Cambodia**

**Source package:** `CMS_Cambodia_Source_Codes_&_DB_Structure_07_10_2026.zip` (shared by Mohd Paramasvara / Vara, WhatsApp **7 Oct 2026**)  
**Drive:** `https://drive.google.com/file/d/1iTKUKqREd4dzJ5tXWKCO71Qn5Rl4Xp6v/view?usp=drive_link`  
**Database (structure / DEFINER):** `campus2_cambodia`  
**Secondary portal export DB (batch):** `portalcambodia` (`*_cam` / `*_cambodia` projection tables)  
**SQL extract stamps in filenames:** 7 Oct 2026  
**Product role:** **LUCT CMS / PHPMaker** campus dump. Same product family as Cyberjaya / Lesotho / Botswana / Eswatini. **Not** the Lesotho M4 acceptance SoR. Use for [M5](../../sdd/03-delivery-milestones.md#m5) expansion / evidence. Pair with [old-cms-lesotho.md](old-cms-lesotho.md), [old-cms-eswatini.md](old-cms-eswatini.md), [old-cms-botswana.md](old-cms-botswana.md), [old-cms-cyberjaya.md](old-cms-cyberjaya.md).

**Do not commit** the PHP tree, `cambodiabatch` SQL/logs, credentials (night script embeds DB auth), uploads, or live student files. Dump stays under `raisd/_local/cambodia-cms-2026-10-07/` only.

**Pages / catalogs:** [`docs/diagrams/old-cms-cambodia/`](../../diagrams/old-cms-cambodia/)

## Package contents (high level)

| Artifact | Role |
|---|---|
| `cambodia/index.html` | LUCT Campus Management System shell (PHPMaker 4.3; desks linked as `./campus/…` in markup; pack folders sit at `cambodia/<desk>/`) |
| `cambodia/*` | Staff desks (registry, faculty, bursary, marketing, lecturer, services, accommodation, setup, …) |
| `cambodiabatch/` | Batch SQL (`portal.sql`, `registry.sql`, `bursary.sql`, `examination.sql`, `transcript.sql`) + `cambodiabatchnight.sh` + **logs/** — **ops data, do not commit** |
| `CMS_Cambodia_Tables_*.sql` | **481** tables |
| `CMS_Cambodia_Views_*.sql` | **296** views |
| `CMS_Cambodia_Procedures_*.sql` | **46** procedures + **2** functions |
| `CMS_Cambodia_Triggers_*.sql` | **83** triggers |

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

**Implication:** Cambodia is a **mid-size LUCT sibling** — slightly larger than Eswatini (472), thinner than Botswana (713). Prefer LUCT adapter patterns; keep CAP-53 **campus-keyed**.

## Technology shape

- **LUCT PHPMaker family:** desks under `cambodia/<desk>/`, prefixes `r_*` · `f_*` · `b_*` · `app_*` · `s_*` · `w_*` · `rep_*` · `temp_*`.
- **Admissions:** `app_*` (**10** tables) including `app_applicationformonline` — not Sierra Leone `ac_*`.
- **Portal hooks present:**
  - Tables: `portal_student_cambodia`, `portal_student_program_cambodia`, `portal_student_program_semester_cambodia`, `portal_student_program_semester_module_cambodia`, `portal_student_program_semester_module_attendance_cambodia`, plus `r_studentcert_cambodia`
  - SPs: `api_student_login_info`, `api_student_program_info`, `api_student_semester_info`, `api_student_module_info`, `api_faculty_list`, `api_faculty_program_list`
  - Night batch also dumps portal projections into **`portalcambodia`** (`*_cam` / `*_cambodia` names)
- **Assist / sponsorship:** `r_assistprovider`, `r_assistscheme*`, `b_assistbilling*` — SP literal seen: assist provider code **`Limkokwing`**. **No** `r_scholarshipapp` in this dump; reporting table `rep_scholarship` present. **Not** Lesotho `nmds`, **not** Botswana DTEF / TEF POST, **not** Eswatini `ssb`.
- **Local report scratch:** `rep_curtermpop_camb`, `rep_nostudents_active_camb`.
- **Triggers present** (83) — unlike Lesotho’s structure export (0 triggers in file).
- **No** separate `api-service/` tree in this pack (unlike Eswatini).

## Staff / role modules (folders observed)

accommodation, bursary, cdu, faculty, ih, lecturer, marketing, modulemat, notice, registry, reporting, services, setup, support, zemail (+ images, lettertemplate, uploads)

## CAP-53 / CAP-48 notes (first pass)

| Topic | Cambodia finding | Contrast |
|---|---|---|
| CAP-53 reads | `portal_student_*_cambodia` + `api_student_*` + nightly export to `portalcambodia` | Same pattern as Lesotho/BW/SZ; campus key **CAMBODIA** / suffix `_cambodia` / `_cam` |
| CAP-48 funding | Assist path; provider code seen: **`Limkokwing`** | ≠ Lesotho NMDS; ≠ Botswana DTEF TEF client; ≠ Eswatini `ssb` |
| Batch / portal refresh | `cambodiabatch/portal.sql` + `cambodiabatchnight.sh` | Expect nightly portal projection refresh (Cyberjaya-like) |

Field-level CAP-53 / assist pass — follow-up (same depth as [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md) when prioritized for M5). ACC / MoEYS compliance remains a separate SDD-09 track (KH-*).

## Open items

- [x] Receive and structure-inventory Vara’s Cambodia pack (7 Oct 2026).
- [ ] Field-level CAP-53 / assist (`Limkokwing` + other providers) mapping when M5 Cambodia is scheduled.
- [ ] Confirm Live SoR path for Cambodia relative to Lesotho pilot (WG).
- [ ] ACC / Khmer standards (SDD-09 KH-*) vs CMS desks — separate compliance track.

## Related

| Topic | Path |
|---|---|
| Lesotho pilot (M4 first) | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Lesotho inventory | [old-cms-lesotho.md](old-cms-lesotho.md) |
| Eswatini inventory | [old-cms-eswatini.md](old-cms-eswatini.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| CAP comparison | [cms-feature-comparison.md](cms-feature-comparison.md) |
| Cambodia QA rows | [../../sdd/09-requirements-traceability.md](../../sdd/09-requirements-traceability.md) (KH-*) |
