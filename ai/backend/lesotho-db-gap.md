# Lesotho — database difference / gap analysis

**Pilot campus:** Lesotho (M4). Approach: [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md).  
**UI inventory:** [old-cms-lesotho.md](old-cms-lesotho.md).  
**Pages:** [`#db-gap`](../../diagrams/old-cms-lesotho/index.html#db-gap) · [`#gap-x`](../../diagrams/old-cms-lesotho/index.html#gap-x).  
**As of:** 5 October 2026 (Vara Drive pack inventoried; schema×FE×flows M4 gap written).  
**WhatsApp evidence:** Working Group CMS 2026 zip (`PHOTO-2026-10-03-12-41-*` + `_chat.txt`); Vara family-tree note 3 Oct.  
**Drive pack (Vara, 5 Oct 12:58):** `CMS_Lesotho_Source_Codes_&_DB_Structure_09_10_2026.zip` —  
`https://drive.google.com/file/d/1Kgo43-vYpEpTyAg-6B-toAA6cdu3Wtjo/view?usp=sharing`  
Local extract: `raisd/_local/lesotho-cms-2026-10-05/` (**never in git**). Schema name: **`campus2_lesotho`**.

## Evidence boundary (critical)

| Layer | Available? | Use for gap work |
|---|---|---|
| **Newer Lesotho CMS** schema / source | **No** — staging has real student data; WG cannot share | Feature / UX benchmark from screenshots only |
| **Older Lesotho CMS** structure dump | **Yes** — tables/views/procs SQL + `campus/` PHPMaker source (5 Oct 2026) | Physical structure gap vs BW/CY + Raisd Schema |
| Botswana `cmsbotswana` dump | Yes — **713** tables, 46 SPs, 157 triggers, 407 views | LUCT-family sibling (~83% table-name overlap with Lesotho) |
| Cyberjaya `cmscbj` dump | Yes — **~1,942** tables, 318 SPs, 239 triggers | Richest LUCT reference (~81% table-name overlap with Lesotho) |
| Raisd Schema v3 (Demo) | Yes — canonical collections | Migration SoT for Raisd (WG, 3 Oct 2026) |

This document is now a **measured structure gap** (object names/counts from Lesotho SQL dumps) plus the earlier UI→Raisd domain matrix. It still does **not** include row-level data or PII.

## Three data planes to compare

```text
[A] Newer Lesotho CMS (live campus)     — screenshot SoT, no DB
[B] Older Lesotho CMS (extract source)  — campus2_lesotho structure dump (5 Oct 2026)
[C] Raisd Schema v3 + Portal API        — pilot write path SoT
```

Working Group migration SoT = **C + Lesotho materials (A screenshots + B structure)** — not A’s inaccessible schema.

## Dump baselines (measured)

| Signal | Cyberjaya | Botswana | Sierra Leone | **Lesotho old** (`campus2_lesotho`) | Lesotho newer |
|---|---:|---:|---:|---:|---|
| Tables (structure) | ~1,942 | **713** | ~345 | **369** | Unknown |
| Views | large (~655) | **407** | 9 | **351** | Unknown |
| Stored procedures | ~318 | **46** (+15 fn) | 6 | **51** (+ **6** functions) | Unknown |
| Triggers in dump files | ~239 | **157** | 91 | **0** in structure export (may exist only on live) | Unknown |
| Desk family | LUCT PHPMaker | LUCT PHPMaker | EMS / `ac_*` | **LUCT PHPMaker** (`campus/` desks) | Modern Admin/Student (not PHPMaker UI) |
| Admissions prefix | `app_*` | `app_*` | `ac_*` | **`app_*`** (13 tables incl. online application) | Modern review / LGCSE desks |
| Portal hooks | `api_student_*` SPs + `portal_*_cyberjaya` | `api_student_*` SPs + `portal_*_botswana` (6) | none in dump | **`api_student_*` / `api_faculty_*` SPs (6)** + **`portal_student_*_lesotho` (5 tables)** — no `api_*` *tables* | N/A (not Raisd) |
| Gov sponsorship | assist tables | **DTEF → tef.gov.bw** POST on `r_scholarshipapp` | assist tables, no TEF POST | **Assist path:** `AssistProviderCode='nmds'` on `r_stdprogram` / `r_stdsemester` + `r_assist*` / `b_assistbilling*` + staging `les_update_nmds` — **no** `r_scholarshipapp`, **no** gov HTTP in structure dump | **NMDS** UI (borrower # · terms) |
| Table-name overlap vs LS | **~81%** of LS tables also in CY catalog | **~83%** of LS tables also in BW catalog | low (EMS) | — | — |

**Implication:** Lesotho old CMS is a **thinner LUCT sibling** of Botswana/Cyberjaya (fewer tables, still full `r_`/`f_`/`b_`/`app_` core). Prefer BW/CY adapter patterns, but wire **Lesotho portal_* tables** and **NMDS (`les_update_nmds`)** — do **not** reuse Botswana DTEF/TEF client as-is. Do **not** assume Sierra Leone EMS/`ac_*` shape.

## Domain gap matrix (UI → LUCT proxy → Raisd)

Status legend: **Present (UI)** = seen in newer CMS screenshots · **Proxy** = exists in Botswana and/or Cyberjaya dumps · **Raisd** = Schema v3 / CAP surface · **Gap** = work needed for M4.

| Domain (newer CMS UI) | Expected old LUCT objects (proxy BW/CY) | Raisd Schema / CAP | Gap for Lesotho pilot |
|---|---|---|---|
| Student master (~22k) | `r_student`, `r_stdpersonal`, `r_stdprogram` | `student_profiles`, `programme_enrolments` · CAP-10/11 | Map IDs (9-digit student no.); confirm old→new extract completeness |
| Term registration | `r_stdsemester`, `r_stdmodule`, `confirmReg` | `study_periods`, `module_registrations` · CAP-12 | Align Drop/Compulsory; term codes (2026-07 style) |
| Transcript / GPA / SoR print | `r_stdmodule` marks, transcript views, letter templates | results / assessments · CAP-14/16 | Stamp/QR/signature are campus print artefacts — Raisd must match UX, not invent CMS print tables |
| Student card photo | uploads / photo fields (campus-local) | profile media · file store | Need durable file store Live path; branding LUCT LESOTHO |
| **NMDS sponsors** | LS: `AssistProviderCode` `nmds`/`NMDS` on `r_stdprogram`/`r_stdsemester`, `AssistStdAcc`, `b_assistbilling*`, `les_update_nmds` · BW: `r_scholarshipapp` + TEF POST · CY: assist, no TEF | `student_funding_awards` · CAP-48 | **Major campus gap:** NMDS ≠ DTEF. Provider code proven (`nmds`); borrower-like field = `AssistStdAcc`; term billing internal — **no gov API in old dump** |
| Graduation clearance wizard | graduation / clearance desks + fee checks (CY registry thicker) | CAP-15 · graduation records | Multi-dept Academic/Finance gates + gown fee messages must be modelled as workflow, not a single status bit |
| Remark / reassessment | appeals / remark desks (campus-varies) | CAP-51 | Confirm old desk name + tables when dump lands |
| Admissions review (3-step) | `app_applicationform*`, eligibility, offer letters | Applicant portal + staff CAP-02–05 | Newer CMS has rank/score + Academic→QA→Registrar — richer than thin Demo applicant UI |
| **LGCSE document extract** | `app_docfile` + CDU entry quals (CY `cdu/`); BW docs | CAP-03 · evidence files | **Lesotho-specific credential:** Sesotho subject, Examinations Council of Lesotho. Schema must allow campus document types / extracted grade rows |
| Admissions payment (Loti **M**) | `b_payment*`, application fees | CAP-06 · finance | Currency **LSL/M** (not MYR). Campus fee catalog + verified flag |
| Pricing / fines / plans | `b_*` fee catalogs, instalments | CAP-40–42 | Confirm which live in old vs only in newer CMS |
| Curriculum / FICT programs | `f_program`, `f_module`, structures | `programmes`, `programme_versions`, `curriculum_modules` | Programme codes (BSCIT, DIT, …) must version; don’t rewrite enrolled versions |
| Timetable / venues | `f_timetable*`, venues | CAP-22 · schedules | Generator UI is newer-CMS; old may be thinner |
| Attendance | `f_attend*` / `r_stdattendance` | CAP-20 | Present as tab — depth TBC |
| Positions / RBAC | PHPMaker user levels (`s_*`) | shared RBAC | Newer CMS has granular CRUD by module — Raisd staff authz must be at least as fine for pilot roles |
| Student portal grid | thin `student/` PHPMaker (BW ~38 PHP) vs rich newer portal | student-portal Demo → Live | **UX gap:** newer student portal is the parity bar, not old PHPMaker student desk |
| FiveDays LMS | external | LMS research / CAP-44 | Out of Raisd Live SoR — do not invent LMS tables from FiveDays |
| Portal API hooks | LS: `portal_student_*_lesotho` (5) + `api_student_*` / `api_faculty_*` SPs (6) | CAP-53 | **Present (BW-class).** Read ACL can start from portal projections + thin `api_*` SPs; write path still Schema/Live policy |

## Lesotho-specific differences (vs Botswana / Cyberjaya)

These are the highest-risk gaps for M4 — they will not fall out of a naive Cyberjaya ACL copy.

| Topic | Lesotho (newer UI) | Botswana dump | Cyberjaya dump | Raisd action |
|---|---|---|---|---|
| Government sponsorship | **NMDS** via assist (`nmds`) + `AssistStdAcc` + term bills | **DTEF → tef.gov.bw** POST on `r_scholarshipapp` | Assist / scholarship tables; **no** TEF POST | Campus-flagged CAP-48; **assist/billing adapter**, not TEF client; gov API still unproven (may live only in newer CMS) |
| School leaving credential | **LGCSE** (+ Sesotho) extract | Local quals / docs | CDU entry quals, foreign quals, EMGS path | Campus document policy + CAP-03 extract fields |
| Currency | **M / LSL** | BWP | MYR | Campus fee / payment currency |
| Immigration / EMGS | Not prominent in screenshots | `w_visa` / welfare set | Heavy EMGS/VAL/visa (`w_*`, eIPTS, KDN) | Do **not** force MY immigration CAPs into Lesotho Live |
| Accommodation | Not seen in screenshot pack | Thick `acc_*` / `w_*` | Thick accommodation desk | Defer unless campus requires for pilot |
| LMS | FiveDays (external link) | — | Adobe Connect tables | Keep external; Raisd LMS is separate Demo surface |
| UI generation | Modern dark Admin/Student | PHPMaker 0.9a desks | PHPMaker + Laravel payment/PDPA | Portals replace UX; CMS remains SoR until cutover |

## CAP-53 field pass — portal hooks (`campus2_lesotho`)

Evidence: structure dump only (column names/types). No row data in repo.

### Surfaces present

| Surface | Objects | Role for Raisd |
|---|---|---|
| Portal projection tables | **5** × `portal_student_*_lesotho` | Denormalised read model (BW naming style; campus suffix `_lesotho`) |
| Thin read SPs | `api_student_login_info`, `api_student_program_info`, `api_student_semester_info`, `api_student_module_info`, `api_faculty_list`, `api_faculty_program_list` | Point queries over live `r_*` / `f_*` (not over portal tables) |
| `api_*` **tables** | **None** | Same as BW/CY — procs + portal tables, not a separate API schema |
| Write SPs named for portal | **None found** | Portal tables are almost certainly batch-filled; CAP-53 writes must target registry/bursary SoR (`r_*` / `b_*`) or Raisd Schema |

All five portal tables carry `Campus varchar(7) NOT NULL` — fits literal campus key **`LESOTHO`** (7 chars). Treat as campus discriminator in multi-campus adapters.

### Portal table column counts

| Table | Cols | Grain / purpose |
|---|---:|---|
| `portal_student_lesotho` | **21** | Student master projection |
| `portal_student_program_lesotho` | **16** | Programme enrolment + assist provider |
| `portal_student_program_semester_lesotho` | **98** | Term registration + finance + assist (widest) |
| `portal_student_program_semester_module_lesotho` | **82** | Module registration + marks/grades |
| `portal_student_program_semester_module_attendance_lesotho` | **44** | Attendance weeks 01–20 + session |

### High-signal CAP-53 fields → Raisd

| CMS field (portal / SoR) | Where | Raisd / CAP use |
|---|---|---|
| `StudentID`, `StudentNo`, `StudentName`, `StudentStatus` | student + semester portal | `student_profiles` · legacy ID map |
| `LoginActive` (`Y`/`N`) | student + semester portal | Portal gate — map to authz / account active |
| `AccOutstanding`, `AccBalance`, `AccArrears`, `PayStatus`, `DebtStatusCode` | student / semester | Finance hold signals (read); do not widen Schema to mirror all |
| `StdProgramID`, `ProgramID`, `ProgramCode`, `StructureID`, `StructureCode`, `ProgramIntakeDate`, `ProgramStatus` | program / semester / module | `programme_enrolments` → `programme_versions` |
| `StdSemesterID`, `TermCode`, `SemesterCode`, `SemesterStatus`, `StdSemGPA`, `StdSemCGPA`, `StdSemCredits*` | semester | `study_periods` + `term_results` |
| `StdModuleID`, `ModuleCode`, `StdModMark`, `StdModGrade`, `StdModCredits*`, `StdModPoints`, `StdModStatCode` | module | `module_registrations` / `module_results` |
| `AssistProviderCode`, `AssistSchCode`, `AssistAmount*`, `AssistPercentage`, `AssistBond`, assist bill cols | program / semester / module | CAP-48 funding (see NMDS section) |
| `AttendStatus`, `Week01`…`Week20`, `LecturerName`, `FromTime`/`ToTime` | attendance | CAP-20 attendance (week grid is legacy shape — translate, don’t copy) |
| `stdpassportno`, `stdvisano`, `stdvisaexp` | student portal | Optional identity/visa — **out of M4 default** unless campus asks |
| `PictureName` (via `api_student_login_info` → `r_stdpicture`) | SP only | Student card photo path |

### `api_student_*` SP contracts (read)

| Procedure | Input | Reads | Returns (shape) |
|---|---|---|---|
| `api_student_login_info` | `xStudentID` | `r_student` ⟕ latest `r_stdpicture` | ID, no, name, **`md5(RIGHT(StudentNo,6))` as `SPwd`**, email, contact, picture |
| `api_student_program_info` | `xStudentID` | `r_student` → `r_stdprogram` → `f_program` / `f_school` | Active/Completed programmes + intake + grad date |
| `api_student_semester_info` | `xStudentID` | + `r_stdsemester` / `f_term` / `f_zsemester` | Terms with GPA/CGPA; statuses Active/Enrolled/Outstanding/Repeat |
| `api_student_module_info` | `xStudentID` | + `r_stdmodule` / `f_semmodule` | Modules with mark/grade/credits ordered by intake + semester |

**CAP-53 note:** `SPwd` is a legacy CMS portal password derive — **do not** reuse as Raisd auth. Treat SPs as discovery aids for joins/filters, not as the Portal API contract.

### CAP-53 engineering implications (Lesotho)

1. **Hooks exist** — not Sierra Leone greenfield. Prefer BW-style campus-keyed ACL over inventing new table names.  
2. **Two read paths:** wide `portal_*_lesotho` projections (list/dashboard) vs thin `api_*` SPs (by `StudentID`). Raisd should own OpenAPI shape; map *from* these.  
3. **Writes:** no portal-write SP surface in dump — plan writes via Schema Live or controlled SoR desks (`r_stdsemester`, bursary), with side-effect awareness (`b_Update_Student`, `r_Update_Semester`, …).  
4. **Campus key:** `Campus` / suffix `_lesotho` — keep CAP-53 config campus-keyed.  
5. **Do not** flatten 98-column semester portal rows into Schema v3 collections 1:1.

## NMDS field pass — CAP-48 (≠ Botswana DTEF)

### Verdict (old CMS)

Lesotho old CMS treats NMDS as an **assist / bursary provider** (`AssistProviderCode`), with **internal** semester billing (`b_assistbilling*`, `b_Update_billing`). There is **no** `r_scholarshipapp` table, **no** `b_stdassist*` tables, and **no** TEF-style gov HTTP surface in the structure dump. Do **not** reuse [botswana-dtef-scholarship-sync.md](botswana-dtef-scholarship-sync.md).

Newer-CMS UI still shows borrower # + term tags — those facts map onto assist columns below; any future **national NMDS API** is **unproven** in this pack (may exist only in newer CMS or future work).

### Provider identity

| Signal | Evidence |
|---|---|
| Canonical code in billing SP | **`nmds`** (lowercase) — `b_Update_billing` filters `A.assistprovidercode = 'nmds'` |
| Reporting / OS filters | `LIKE '%NMDS%'` and also `IN ('Limkokwing','NMDS')` — case variants exist |
| Sibling sponsors in same LIKE lists | `LFCE`, `LKW`, `LUCT`, `limkokwing` |
| Provider master | `r_assistprovider` (25 cols): `AllowPortal`, `ExcludeOS`, `BillCurrency` **`enum('RM','USD')` DEFAULT `'RM'`** — MYR leftover; **not LSL** (campus config debt) |
| Schemes / rules | `r_assistscheme`, `r_assistrule`, `r_zassiststatus` |

### Programme-level assist (`r_stdprogram` — 15 assist cols)

| Column | Type (abbrev.) | Likely meaning for Raisd |
|---|---|---|
| `AssistProviderCode` | varchar(20) | Scheme provider — **`nmds`** for NMDS |
| `AssistSchCode` | varchar(20) | Scheme / sub-code under provider |
| `AssistStdAcc` | varchar(20) | **Best old-CMS match for UI “borrower #”** (student assist account) |
| `AssistMemo` | varchar(50) | Free-text memo |
| `AssistFrom` / `AssistTo` | tinyint | Coverage span (term/sem indices — confirm in ops) |
| `AssistBond` | tinyint | Bond flag/years |
| `AssistPercent` / `AssistAmount` / `AssistNetAmount` | double | Award economics |
| `AssistDate` / `AssistExpiryDate` / `AssistApprovalDate` | date | Lifecycle |
| `AssistExpireProvCode` | varchar(20) | Expiry provider override |
| `AssistRemark` | varchar(255) | Notes |

Also projected on `portal_student_program_lesotho.AssistProviderCode`.

### Term-level assist (`r_stdsemester` + portal semester)

| Column | Notes |
|---|---|
| `AssistProviderCode`, `AssistSchCode`, `AssistMemo` | Provider on the **term** (can differ from programme) |
| `AssistPercentage`, `AssistAmount`, `AssistAmountTotal`, `AssistBond` | Term award |
| `AssistBillNo`, `AssistBillDate`, `AssistBillAmount`, `AssistBillPaid`, `AssistBillRemark` | Invoice artefacts |
| `AssistStatus`, `AssistAppealDate`, `AssistRemark`, approval/date/expiry | Workflow-ish fields inside assist, not TEF `app_status` |
| `StdSemAssist` | Assist amount rolled into semester |
| `AssistOveride` | Override flag |

`b_Update_billing` sets `AssistBillNo` to patterns like:

`LSO/{YY}{MM}/FAID/01` … `/FDSI/02` … `/FBS/03` … (by `schoolid`) and `…R1` suffix for module repeaters (`modrepeater = 'O'`).

### Staging / batch tables

| Table | Columns | Role |
|---|---|---|
| `les_update_nmds` | **`StdProgramID` only** | Work-queue / key list for NMDS programme refresh — **not** a borrower ledger |
| `les_update_source` | `StudentID`, `ProgramID`, `AssistProviderCode`, `GradingVersion`, `StdProgramID` | Broader assist refresh source |
| `les_update` / `les_update_source_sch` | campus batch helpers | Local `les_*` maintenance |

### Billing tables

| Table | Role |
|---|---|
| `b_assistbilling` | Header: provider + `TermCode` + `Billing`/`Paid` flags + cheque refs |
| `b_assistbillingdetail` | Line economics: Tuition, Resource, AdminFee, Medical, Accommodation, allowances, `Verified` / `PaymentVerified` |
| Proc `b_Update_billing(b_billingid)` | Pushes bill no/date/amount onto `r_stdsemester` for **`nmds`** by school |
| Proc `b_Update_Student` / `_All` | Student finance rollups; references `ExcludeOS` + provider `Limkokwing`/`NMDS` |

### Contrast matrix — NMDS vs DTEF

| Topic | Lesotho NMDS (old dump) | Botswana DTEF |
|---|---|---|
| Gov POST | **Not in dump** | `tef.gov.bw` HAL+JSON |
| Queue table | `les_update_nmds` (StdProgramID keys) | `r_scholarshipapp` + status 30–35 |
| Provider code | `nmds` / `NMDS` | `DTEF` |
| Borrower / account | `AssistStdAcc` (programme) | National ID / TEF admission fields |
| Term linkage | `r_stdsemester` assist + bill cols | Assist + `dtef_scholarship` view |
| Finance | `b_assistbilling*` | `b_stdassist*` + DTEF letters |
| Raisd adapter | CAP-48 **funding scheme + assist read/write** | Separate campus DTEF integration (do not share client) |

### Raisd CAP-48 mapping (recommended)

| Raisd collection / concept | Source fields |
|---|---|
| `funding_schemes` | `r_assistprovider` + `r_assistscheme` where code ∈ NMDS family |
| `student_funding_awards` | `r_stdprogram` assist block; external ref ← `AssistStdAcc` |
| `student_funding_benefits` / term tags | `r_stdsemester` assist + `TermCode`; bill → finance artefacts |
| Campus finance currency | **LSL / M** from UI + fee desks — **override** `BillCurrency` RM default in config |
| Portal visibility | `r_assistprovider.AllowPortal` |

## Probed shape — newer CMS UI (WhatsApp) + old dump

Newer CMS still has **no shareable schema**. Old CMS physical names are measured above; UI scale below remains screenshot-only.

### Observed scale (newer CMS UI)

| Surface | Count / pattern (screenshot) |
|---|---|
| Registry students | **~22,527** records · 9-digit student nos. (`9010…`) |
| Admissions / applicants | **~5,460** records |
| Document review queue | **~3,945** |
| Graduation clearance queue | **~549** / ~537 listed |
| Positions | **~23** |
| Remark / referrals badges | 1 / 26 |
| Term codes | `YYYY-MM` (e.g. `2026-07`, `2025-02`) + Year N / Sem N |
| Application IDs | numeric (e.g. `105546`) parallel to student nos. |
| Currency | **M** (Loti / LSL) — e.g. application fee M300 VERIFIED |
| National ID | 12-digit local format (field present; values not stored in repo) |

### Two physical planes (updated after dump)

```text
[B] Old Lesotho CMS — campus2_lesotho (measured)
    369 tables · 351 views · 51 procs · 6 fns · LUCT PHPMaker campus/
    Prefixes: r_* · f_* · b_* · app_* · s_* · portal_student_*_lesotho · les_*
    Thinner than BW (713) / CY (~1942); not EMS/ac_* (SL)

[A] Newer Lesotho CMS (unknown engine — modern Admin/Student UI)
    Logical model below (normalized app schema). Not shareable; staging has live data.
    Data is being extracted FROM [B] INTO [A] on campus already.

[C] Raisd Schema v3 (Postgres Demo today — 95 collections)
    Pilot write SoT. Cover [A] capabilities; CAP-53 ACL maps [B] portal/api_* + assist.
```

### Logical ERD (newer CMS — probed)

Names are **logical**, not claimed MySQL identifiers.

```text
School ─┬─ Programme ── ProgrammeVersion / CurriculumModule
        │
Person ─┬─ StudentProfile ──┬─ ProgrammeEnrolment ── StudyPeriod ── ModuleRegistration
        │                   │         │                    │              ├─ credits, marks, grade, points
        │                   │         │                    │              └─ status (Compulsory / Drop / …)
        │                   │         │                    └─ termResult (GPA, CGPA, academicStatus)
        │                   │         ├─ Attendance (by attendanceTermId)
        │                   │         ├─ StudentCard (photo, printHistory)
        │                   │         ├─ FundingAward (NMDS, borrowerNo) ── FundingTerm
        │                   │         ├─ FinanceAccount / Invoice / Payment (LSL)
        │                   │         └─ GraduationRequest ── ClearanceGate (Academic, Finance, …)
        │                   └─ EducationHistory
        │
        └─ Applicant ── Application ──┬─ IntakePeriod (e.g. Jan 2026)
                                      ├─ ProgramChoice (1st/2nd) + rank + overallScore
                                      ├─ Qualification (LGCSE) ── SubjectGrade (incl. Sesotho)
                                      ├─ ApplicationDocument (scan + certificateNo)
                                      ├─ ReviewDecision ×3 (Academic → QA → Registrar)
                                      └─ ApplicationPayment (amount M, VERIFIED)

StaffUser ── Position ── PositionPermission (module × R/C/U/D)
RemarkRequest · StudentReferral · NotificationTemplate  (ops queues)
```

### Field-level probe (high-signal columns)

| Logical entity | Columns / facts seen in UI | Old CMS proxy (BW) | Raisd Schema v3 home |
|---|---|---|---|
| StudentProfile | studentNumber, fullName, nationalId, dob, gender, birthPlace, email, photo, status ACTIVE | `r_student`, `r_stdpersonal` | `student_profiles` (+ person) |
| ProgrammeEnrolment | programme name/code (e.g. DTM, BSCIT, DPR), level Diploma/BSc, status ACTIVE | `r_stdprogram` | `programme_enrolments` → `programme_versions` |
| StudyPeriod | term `2024-07`, Year/Sem, GPA, CGPA, status | `r_stdsemester` | `study_periods` + `term_results` |
| ModuleRegistration | code, name, Compulsory/Drop, Cr, Mk, Gd, Points | `r_stdmodule` | `module_registrations` + `module_results` / `assessment_results` |
| Statement of Results | creditsAttempted/Earned, outstanding repeats, registrar stamp, QR | transcript views / letter templates | print/projection — not a new SoR table |
| FundingAward | provider **NMDS**, **borrowerNo**, linked terms list | **`AssistProviderCode`/`AssistStdAcc`** on `r_stdprogram`; term assist on `r_stdsemester`; `b_assistbilling*` · **not** `r_scholarshipapp` / TEF | `funding_schemes`, `student_funding_awards`, `student_funding_benefits` |
| GraduationRequest | ceremony date, wizard step, status Pending staff | graduation desks (campus-varies) | `graduation_records` (+ clearance workflow TBD) |
| ClearanceGate | dept Academic/Finance, Approve/Reject, message (gown/grad fee) | fee checks + registry | workflow + `fee_items` / invoices |
| Applicant / Application | intake Jan 2026, program score, overall score, rank #n/N, status Accepted/Pending | `app_applicationform*` | applicant/application collections (Demo thin) |
| Qualification | title LGCSE, institution, examYear, certificateNo, level | `app_docfile` + entry quals | `academic_qualifications` + campus document policy |
| SubjectGrade | subject name + letter grade (A–D); Sesotho present | extract / CDU-like | CAP-03 metadata / structured extract rows |
| ApplicationPayment | amount **M**, VERIFIED | `b_payment*` | `payments` + `campus_finance_profile` (currency LSL) |
| Position | name + department (~23) | PHPMaker `s_*` user levels | staff RBAC / positions |
| Student portal period | enrolled term cards Aug 2023→Feb 2026 | thin `student/` PHPMaker | student-portal Demo → Live |

### What old Lesotho MySQL looks like (measured)

| Signal | Lesotho (`campus2_lesotho`) | vs Botswana |
|---|---|---|
| Tables | **369** | Thinner than BW **713** (still LUCT family; ~83% name overlap) |
| Registry core | `r_student`, `r_stdpersonal`, `r_stdprogram`, `r_stdsemester`, `r_stdmodule` | Present |
| Curriculum | `f_program*`, `f_module*` | Present |
| Finance | `b_payment*`, `b_assistbilling*` (not `b_stdassist*`) | Assist billing variant |
| Admissions | `app_*` (**13** tables) | Thinner than BW’s 21 |
| Portal hooks | **`portal_student_*_lesotho` (5)** + **`api_student_*` / `api_faculty_*` SPs** | BW-class; naming matches BW `portal_student_*` style |
| Gov sponsor | **`nmds` assist + `les_update_nmds`** — no TEF POST | ≠ DTEF `r_scholarshipapp` |
| Immigration | `w_*` present but thin for M4 | Defer |
| Accommodation | desks present; not M4 screenshot focus | Defer unless required |

Cyberjaya remains the **richest** LUCT reference for procedures/views and EMGS — not the Lesotho default skeleton.

## Gaps vs current Raisd structure (Schema v3 Demo)

Raisd today: **Postgres Demo**, `schema_version = 3`, **~95 collections**, campus-policy layer seeded with university defaults (not Live Lesotho policy).

| Needed for Lesotho parity (from screenshots) | Current Raisd posture | Gap |
|---|---|---|
| Student master + 9-digit campus IDs | `student_profiles` + legacy ID mapping guidance (Vara ACL) | Need Lesotho ID strategy + `legacyRefs` when ACL lives |
| ProgrammeVersion lock for enrolled students | Model exists; Vara strong requirement | Confirm Lesotho programme codes/versions (BSCIT, DTM, DIT, …) |
| Term `YYYY-MM` + Year/Sem dual labeling | `academic_terms` / `study_periods` | Campus term calendar + display labels |
| Cr / Mk / Gd / Points + GPA/CGPA | `module_results`, `term_results`, grading schemes | Lesotho grade bands / CGPA policy (CS-0x) not Live-confirmed |
| Statement of Results + stamp/QR/signature | Not a first-class print product in Demo | Staff/student deliverable + QR verification path |
| NMDS borrower # + term-tagged awards | `student_funding_awards` / `funding_schemes` | Seed scheme **`nmds`**; map `AssistStdAcc` + term assist; **no TEF client**; LSL override on `BillCurrency` |
| LGCSE qualification + subject extract + Sesotho | `academic_qualifications`, documents, campus document policy | **Lesotho document type + extract schema**; certificateNo |
| 3-step Academic→QA→Registrar + rank/score | Applicant Demo thin | Workflow states + score/rank fields + staff activity |
| Application fee VERIFIED in **M** | `payments` + finance profiles | **Currency LSL**, fee catalog, verified flag |
| Graduation clearance multi-dept + gown fee gate | `graduation_records` thin | Clearance gates + finance precondition messages |
| Student card photo + print history | file store + profile media | Live files path; LUCT LESOTHO branding |
| Positions CRUD-by-module RBAC | shared RBAC | Granularity parity for ~23 campus positions |
| Remark / referral queues | CAP-51 partial | Ops queues for pilot |
| Pricing: repeat modules, fines, payment plans | fee plans / items | Campus fee catalog depth |
| Timetable / venues / attendanceTermId | schedules + attendance collections | Depth vs newer-CMS generator |
| Old CMS `portal_*` / `api_*` | CAP-53 | **Mapped** — 5 portal tables + 6 api SPs; write path / SoR still WG decision |
| EMGS / KDN / eIPTS | immigration collections exist | **Out of Lesotho M4** unless campus asks |
| FiveDays LMS | LMS research / CAP-44 | External — not Raisd Live SoR |

### Fit summary

| Question | Answer from WhatsApp + dumps |
|---|---|
| Will Raisd Schema “look like” Lesotho newer CMS tables 1:1? | **No** — and should not (Vara 22 Sep: keep canonical clean; ACL absorbs mess). |
| Will old Lesotho MySQL look like Botswana? | **Yes, thinner sibling** — 369 vs 713 tables; ~83% name overlap; portal/assist patterns rhyme, DTEF does not. |
| Biggest structural holes vs Demo today | NMDS assist→Schema funding, LGCSE extract, 3-step admissions, clearance wizard, LSL finance (vs RM leftover), print/QR SoR, position RBAC depth, CAP-53 **write** path |
| Safe to reuse CY EMGS or BW TEF? | **No** for M4 |

## Gaps by severity (pilot planning)

### Blockers for Live Lesotho adapter design

1. ~~Old CMS structure dump~~ **Received** (5 Oct 2026) — CAP-53 / NMDS field pass in this doc.  
2. **Live SoR path undecided** — adapter to old CMS vs Schema v3 cutover (WG open item).  
3. **NMDS national API** — old CMS is **assist/billing only**; if newer CMS or government exposes an HTTP API, it is still unproven (do not assume TEF-shaped).

### High (parity with newer CMS)

4. LGCSE extract model + Sesotho / local school metadata.  
5. Three-step admissions recommendation + rank/score.  
6. Graduation clearance multi-dept + finance fee gate.  
7. Statement of Results print options (signature/stamp/QR) as staff/student deliverable.  
8. Granular Positions RBAC vs Raisd staff roles.

### Medium (campus config)

9. Loti fee catalogs, fines, payment plans, repeat-module pricing.  
10. Timetable generator / venues depth.  
11. Remark + referral queues.  
12. Student card photo pipeline (files Live).

### Low / out of pilot SoR

13. FiveDays LMS internals.  
14. Cyberjaya-only compliance (EMGS, KDN, eIPTS, ICU PDPA) unless Lesotho later requires analogues.  
15. Adobe Connect / Streaming.

## Dump checklist (Vara pack)

- [x] Count tables / SPs / views (369 / 51+6 / 351); triggers **0** in structure files.  
- [x] Confirm desk folders under `campus/` (LUCT PHPMaker — not EMS).  
- [x] Confirm admissions prefix `app_*` (13 tables).  
- [x] CAP-53: `portal_student_*_lesotho` (5) + `api_student_*` / `api_faculty_*` (6).  
- [x] NMDS: `AssistProviderCode` `nmds` + `les_update_nmds` + `b_assistbilling*` — **no** `r_scholarshipapp` / TEF.  
- [x] Diff overlap vs BW (~83%) / CY (~81%).  
- [x] Re-score gap matrix → **structure evidence-backed** (row data still out of scope).  
- [x] Publish sanitized catalogs under `docs/diagrams/old-cms-lesotho/` (`_table` / `_view` / `_proc` / `_function` + `CATALOG.md`).  
- [x] CAP-53 Phase R1 read-adapter mapping — [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md).  
- [ ] Implement `lesothoRead` in sibling `portal-api` (MySQL integration access required).  
- [ ] Update Obsidian graph `tables` fields from UI labels to real names where safe (no PII).

## M4 gap analysis — schema × frontend × flows

Cross-cut of **[A] newer CMS UX** (screenshots) · **[B] old `campus2_lesotho` schema** (measured) · **[C] Raisd Schema v3 + Portal API + portal FE** (SDD-11).  
CAP IDs follow [SDD-11](../../sdd/11-capability-catalog.md) (not the older screenshot seed numbers).  
**Live = 0** everywhere today. FE “Demo” ≠ Live. Backend almost all **Needs checking** until CAP-53 adapter proves reads/writes.

### Method

| Layer | Evidence | Not evidence |
|---|---|---|
| Schema [B] | CREATE TABLE / PROCEDURE names & columns in structure dump | Row data, PII, live passwords |
| Frontend | SDD-11 Frontend column + portal agent docs | Screenshot-only “looks done” |
| Flows | Newer CMS screenshots + old SP/table edges + Raisd Demo RPC shapes | Assumed national APIs |

**Severity:** **B** blocker for M4 design · **H** high parity · **M** medium / config · **L** low · **O** out of M4 SoR.

### CAP ID reconciliation (seed → SDD-11)

| Lesotho UX (seed label) | Use SDD CAP | Do not use |
|---|---|---|
| Term / subject registration | **CAP-10** | seed “CAP-12” |
| Class timetable | **CAP-11** | seed “CAP-22” |
| Attendance | **CAP-12** | seed “CAP-20” (assignments) |
| Results / study plan / SoR | **CAP-13** / **CAP-14** / **CAP-15** | — |
| Fees / invoices / proof / online pay | **CAP-45** / **CAP-46** / **CAP-47** | seed “CAP-40–42” |
| Application fee (LSL) | Finance + admissions ops (CAP-45 family / campus fee) | seed “CAP-06” (SDD = foreign equivalency) |
| NMDS sponsors | **CAP-48** | — |
| Remark / appeals | **CAP-51** | — |
| CMS adapter | **CAP-53** | — |

### Rollup — where Raisd stands vs Lesotho

| Flow | Old schema depth | Raisd Schema v3 | Student FE | Staff / Applicant FE | Backend | Severity |
|---|---|---|---|---|---|---|
| Admissions apply + docs | Thick `app_*` (13) + online SPs | Thin applicant model | — | **Not started** | Needs checking | **B** |
| Admissions 3-step review | `FacultyStatus` / `AQAStatus` / `RegistryStatus` on `app_applicationform` | Workflow TBD | — | **Not started** | Needs checking | **B** |
| Rank / overall score | **Not in old `app_applicationform` cols** (newer UI only) | Missing | — | **Not started** | — | **H** |
| LGCSE subject extract | Flat `app_applicationeducation` subject1–6; no Sesotho-typed col | Quals + campus doc policy | — | **Not started** | Needs checking | **H** |
| App fee VERIFIED (M) | `b_paymentverification` (+ currency char(3)) | `payments` + campus finance | — | **Not started** | Needs checking | **H** |
| Student master / portal read | `r_student` + `portal_student_*_lesotho` + `api_student_*` | `student_profiles` | Demo profile | Staff **Not started** | Needs checking | **H** |
| Term registration | `r_stdsemester` / `r_stdmodule` + `online_enrollment` + `StudentConfirmModule` | `study_periods` / `module_registrations` | **Demo** CAP-10 | Staff **Not started** | Needs checking | **B** |
| Timetable | `f_moduleclass` (+ term portal flags) — thin vs newer generator | `class_schedules` | **Demo** CAP-11 | Lect/Staff **Not started** | Needs checking | **M** |
| Attendance | `f_attend*` + portal week grid | `attendances` | **Demo** CAP-12 | Lecturer **Not started** | Needs checking | **M** |
| Results / GPA | portal module marks + semester GPA/CGPA | `module_results` / `term_results` | **Demo** CAP-13/14 | Staff **Not started** | Needs checking | **H** |
| SoR print / QR / stamp | Letter templates / print desks (campus artefacts) | Not first-class print product | Partial Demo | Staff **Not started** | Needs checking | **H** |
| NMDS funding | assist `nmds` + `AssistStdAcc` + `b_assistbilling*` | `funding_schemes` / awards | **Demo** CAP-48 | Staff **Not started** | Needs checking | **B** |
| Finance ledger | `b_payment*` / invoices / instalments / statements | `finance_accounts` / invoices / payments | **Demo** CAP-45; pay **Placeholder** CAP-47 | Staff **Not started** | Needs checking | **H** |
| Graduation clearance | `r_studentgraduated` (gown/RSVP) + clearances on `r_student`; newer multi-dept wizard richer | `graduation_records` thin | **Demo** CAP-15 | Staff **Not started** | Needs checking | **H** |
| Remark / referral | `r_stdremark*` desks | CAP-51 forms | **Demo** CAP-51 | Staff **Not started** | Needs checking | **M** |
| Positions RBAC | `s_staff` + PHPMaker user levels (~23 positions in UI) | Demo RBAC; Live CS-11 deferred | — | Staff portal **Not started** | Needs checking | **H** |
| CAP-53 spine | portal tables + api SPs present; writes = SoR desks / Schema | OpenAPI Demo; CMS stub | Shared FE **Partial** | — | **Needs checking** | **B** |
| EMGS / thick accom / FiveDays | `w_*` thick; LMS external | Exists / research | O | O | O | **O** |

### Flow 1 — Admissions (apply → review → offer)

Pilot order: **admissions before semester registration** ([lesotho-pilot.md](../architecture/lesotho-pilot.md)). Diagram: [`#admissions`](../../diagrams/old-cms-lesotho/index.html#admissions).

```text
Applicant UI → online app + LGCSE docs + fee (M)
     → Staff Academic (Faculty*) → QA (AQA*) → Registrar (Registry*)
     → Offer / student create → (later) enrolment
```

| Step | Newer CMS UX | Old schema [B] | Raisd Schema [C] | FE (SDD-11) | Gap |
|---|---|---|---|---|---|
| Online application | Modern form; intake Jan 2026 | `app_applicationform_online` (42) · `App_Status` Pending/Approved/Rejected · SPs `InsertOnlineApp*` / `UpdateOnlineApp*` / `FetchOnline*` | Applicant collections (thin Demo) | Applicant CAP-02 **Not started** | Build applicant Live journey; map online → staff form |
| Programme choices | 1st/2nd + rank #n/N + overall score | Opt1/Opt2 program IDs on `app_applicationform`; **no rank/score columns in old dump** | Need score/rank fields | Not started | **Rank/score likely newer-CMS-only** — Schema + staff UI must add if required for parity |
| LGCSE + subjects | Extract UI; Sesotho; certificate # | `app_applicationeducation` (flat Subject1–6 × 2 schools) · `app_application_edu_docs` · `app_docfile` / `app_document` | `academic_qualifications` + campus document types + structured extract | CAP-03 **Not started** (applicant + staff) | Campus LGCSE document policy; don’t assume CDU/EMGS |
| 3-step recommendation | Academic → QA → Registrar | **`FacultyStatus`/`Remark`**, **`AQAStatus`/`Recommendation`/`RejectReason`**, **`RegistryStatus`** (+ `BurStatus`, `SSDStatus`, `DocStatus`) | Workflow states + staff activity | Staff CAP-03/04/05 **Not started** | Model as multi-status workflow, not one `ApplicationStatus` int |
| App fee VERIFIED | M300 VERIFIED | `b_paymentverification` (`PaymentCurrency` char(3), `Verified`, `ProofofPayment`, `ApplicationID`) · `b_zapplicationfee` | `payments` + campus finance profile **LSL** | Not started | Currency + verified flag + file store for proof |
| Offer letter | Offer artefacts | `r_stdofferletter` / types / sign | Letter delivery TBD | Not started | Print/PDF path campus-local |

### Flow 2 — Term registration / online enrolment

Diagram student journeys: [`#student`](../../diagrams/old-cms-lesotho/index.html#student). Raisd Demo: module registration RPC + fee preview.

| Step | Newer CMS UX | Old schema [B] | Raisd [C] | FE | Gap |
|---|---|---|---|---|---|
| Open term for portal | Term cards | `f_term.StdPortal` / `LecPortal` flags · `TermCode` | `academic_terms` + campus calendar | CAP-10 Demo | Seed Lesotho term codes (`YYYY-MM` UI vs CMS `TermCode`) |
| Online enrol + pay proof | Student journey | `online_enrollment` (`BurStatus`/`FacultyStatus`, `TransactionAmt`, `TrnsFile`) · `sp_onlinenrollment_*` · `sp_payment_verification_insert` | study period + payment proof | CAP-10 Demo · CAP-46 Demo | Wire CAP-53 write + bursary/faculty gates |
| Confirm modules | Compulsory / Drop | `StudentConfirmModule` · `r_stdmodule` / portal module (`StdModStatCode`) | `module_registrations` + status events | CAP-10 Demo | Atomic save + legacy status vocab |
| Side effects | Finance / portal refresh | `r_Update_Semester` · `b_Update_Student` | Must not double-ledger | — | CAP-53 must expect CMS side effects |

### Flow 3 — Academics (timetable · attendance · results · SoR)

| Step | Newer CMS UX | Old schema [B] | Raisd [C] | FE | Gap |
|---|---|---|---|---|---|
| Timetable / venues | Generator / allocations | `f_moduleclass` (thin) — no rich generator tables like newer UI | `module_offerings` / `class_schedules` | CAP-11 Demo; lect/staff Not started | Depth gap vs newer generator — read CMS first |
| Attendance | Tab + term id | `f_attend*` sums · portal attendance **Week01–20** grid | `attendances` | CAP-12 Demo; lecturer Not started | Translate week grid → session model; lecturer Live write |
| Marks / GPA / CGPA | Transcript UI | portal module `StdModMark`/`Grade`/`Credits`/`Points` · semester `StdSemGPA`/`CGPA` | `module_results` / `term_results` + CS grading policy | CAP-13/14 Demo | Lesotho grade bands Live (CS-*) |
| Statement of Results | Stamp / QR / signature options | Print/letter desks (not a single SoR table) | Projection + deliverable | CAP-15 Demo (student) | Staff print product + QR verify path |

### Flow 4 — NMDS sponsorship (CAP-48)

See [NMDS field pass](#nmds-field-pass--cap-48--botswana-dtef). Diagram: [`#registry`](../../diagrams/old-cms-lesotho/index.html#registry).

```text
Registry/Bursary sets AssistProviderCode=nmds + AssistStdAcc on programme
     → term assist + b_assistbilling / b_Update_billing (LSO/… bill nos)
     → portal projections expose Assist* to student
     ✗ no r_scholarshipapp / tef.gov POST in old dump
```

| Step | Newer CMS UX | Old schema [B] | Raisd [C] | FE | Gap |
|---|---|---|---|---|---|
| Award + borrower # | NMDS + borrower + term tags | `AssistProviderCode` · **`AssistStdAcc`** · scheme/rule tables · `les_update_nmds` | `funding_schemes` / `student_funding_awards` | CAP-48 Demo student; staff Not started | Seed `nmds`; map borrower; staff award UI |
| Term billing | Sponsors / Semesters tabs | `b_assistbilling*` · bill no `LSO/{YYMM}/…` | benefits + finance artefacts | Staff Not started | Assist billing adapter ≠ TEF |
| National API | Unknown in screenshots | **Not in structure dump** | Optional future adapter | — | Do not block on TEF-shaped client |
| Currency | M / LSL | `BillCurrency` RM/USD leftover | Campus finance LSL | — | **Override RM** |

### Flow 5 — Finance (student + bursary)

| Step | Newer CMS UX | Old schema [B] | Raisd [C] | FE | Gap |
|---|---|---|---|---|---|
| Balances / invoices | Pricing / statements | `b_payment*` · `b_invoicedetail` · `b_statement` · portal `AccOutstanding` | `finance_accounts` / invoices / payments | CAP-45 Demo; staff Not started | Map ledger; LSL catalog |
| Instalments / plans | Payment plans desk | `b_stdinstalment` / detail | fee plans | Partial Demo depth | Campus fee depth |
| Proof / online pay | VERIFIED proofs | `b_paymentverification` | CAP-46/47 | CAP-46 Demo · CAP-47 **Placeholder** | File store + Live pay path |
| Portal gate on arrears | Login / reg holds | `LoginActive` · `AccArrears` · `ExcludeOS` on provider | authz + finance holds | — | Encode holds in Portal API, not only UI |

### Flow 6 — Graduation clearance

Diagram: [`#graduation`](../../diagrams/old-cms-lesotho/index.html#graduation).

| Step | Newer CMS UX | Old schema [B] | Raisd [C] | FE | Gap |
|---|---|---|---|---|---|
| Clearance wizard | Multi-dept Approve/Reject + gown/fee messages | `r_student.LibraryClearance` / `ResourceClearance` · `r_studentgraduated` (`gradgown*`, `gradrsvp`, `gradsession`) · `r_zgraduationdate` · `gradlist` | `graduation_records` + clearance workflow TBD | CAP-15 Demo; staff Not started | Wizard ≠ two clearance bits — need gate model |
| Ceremony / gown | Fee precondition messages | gown size/pickup/return cols | campus_graduation_config | Staff Not started | Finance precondition messages |

### Flow 7 — Student portal read spine (CAP-53 reads)

| Journey | Old read surface | Raisd Demo today | Gap to Live |
|---|---|---|---|
| Login / profile | `api_student_login_info` (incl. legacy `SPwd` md5) · `portal_student_lesotho` | Demo auth scenarios | Real IdP; **never** reuse `SPwd` |
| Programmes / terms / modules | `api_student_*` + wide portal semester/module tables | Portal RPC graph Demo | Map portal cols → OpenAPI; campus=`LESOTHO` |
| Attendance weeks | portal attendance table | Demo attendance | Session model translation |
| Sponsors | Assist* on portal program/semester | CAP-48 Demo | Bind to `nmds` awards |

### Flow 8 — Staff RBAC / positions

| Step | Newer CMS UX | Old schema [B] | Raisd [C] | FE | Gap |
|---|---|---|---|---|---|
| Positions (~23) | CRUD-by-module | `s_staff` (`StaffUserLevel`, `StaffPosition`, `LoginActive`) + PHPMaker levels | `roles` / `permissions` (Demo; Live CS-11 deferred) | Staff portal **Not started** | Granularity parity for pilot roles |
| Desk ops | Registry/Bursary/Faculty/… | `campus/` PHPMaker trees | Staff activities via Portal API | Not started | Staff portal is M4 critical path with admissions |

### Integration spine (CAP-53) — recommended cut

```text
Phase R1 (reads):  portal_student_*_lesotho + api_student_*  →  Portal API student GETs
Phase R2 (reads):  app_* list/detail for staff admissions queues
Phase W1 (writes): Schema v3 Live OR controlled SoR desks
                   (online_enrollment, r_stdsemester/module, assist, paymentverification)
                   with cms.acknowledged — never silent double-write
Phase W2:          Staff clearance / remark / award writes
```

Open WG decision: **adapter to old CMS vs Schema cutover** as Live SoR — blocks W1 design freeze.

### M4 build priority (suggested)

| Priority | Work | Unblocks |
|---|---|---|
| 1 | CAP-53 read adapter (portal + api_*) + campus key `LESOTHO` | All student Demo → Live reads |
| 2 | Applicant CAP-02/03 + LSL fee verification + LGCSE extract model | Admissions-first pilot |
| 3 | Staff admissions workflow (Faculty/AQA/Registry statuses) | 3-step parity |
| 4 | CAP-10 registration write + side-effect tests | Core student Live |
| 5 | CAP-48 NMDS scheme seed + AssistStdAcc map + billing read | Gov sponsorship parity |
| 6 | CAP-15 clearance gates + SoR deliverable | Graduation / transcript parity |
| 7 | CAP-45/46/47 finance Live + holds | Fees / portal gates |
| 8 | Staff portal shell + RBAC positions | Staff FE Not started → Partial |

### Still open (not schema-solvable alone)

1. Live SoR path (old CMS adapter vs Schema v3).  
2. Whether newer CMS or government exposes an **NMDS HTTP API**.  
3. Rank/score persistence (newer UI only — confirm with campus).  
4. Official SoR stamp/QR policy and QR verification host.  
5. Lesotho Live campus policy rows (CS-01–CS-13) beyond university defaults.

## Implications for Raisd (agents)

1. Prefer **measured** Lesotho names in this doc over inventing from screenshots.  
2. **Do not copy Botswana DTEF POST code** for NMDS — use assist/`nmds` + `AssistStdAcc` + billing.  
3. **Do not copy Cyberjaya EMGS** into Lesotho Live scope by default.  
4. Prefer **Raisd Schema v3** + campus policy for pilot writes; CAP-53 **reads** can start from portal/`api_*`.  
5. Keep CAP-53 **campus-keyed** (`LESOTHO` / `_lesotho`); Cyberjaya remains the richest dump for deep LUCT patterns.  
6. Override finance currency to **LSL** — ignore `r_assistprovider.BillCurrency` RM default.  
7. Use **SDD-11 CAP IDs** in planning; treat [old-cms-lesotho.md](old-cms-lesotho.md) seed labels as UX → capability only.  
8. Staff + applicant portals are **Not started** — student Demo alone cannot pass M4 government parity.

## Related

| Topic | Path |
|---|---|
| Lesotho CMS inventory | [old-cms-lesotho.md](old-cms-lesotho.md) |
| Lesotho pilot | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| CAP catalog (FE/BE status) | [../../sdd/11-capability-catalog.md](../../sdd/11-capability-catalog.md) |
| Botswana inventory | [old-cms-botswana.md](old-cms-botswana.md) |
| Botswana DTEF (contrast NMDS) | [botswana-dtef-scholarship-sync.md](botswana-dtef-scholarship-sync.md) |
| Cyberjaya inventory | [old-cms-cyberjaya.md](old-cms-cyberjaya.md) |
| Canonical schema | [canonical-schema-luct-readiness.md](canonical-schema-luct-readiness.md) |
| CAP-53 Phase R1 reads | [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md) |
| CAP comparison | [cms-feature-comparison.md](cms-feature-comparison.md) |
| Diagram flows | [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html) |
