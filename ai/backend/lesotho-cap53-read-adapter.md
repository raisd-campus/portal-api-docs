# Lesotho — CAP-53 read adapter (Phase R1)

**Campus key:** `LESOTHO` · **CMS schema:** `campus2_lesotho`  
**Status:** Mapping ready for Portal API implementation — **not Live** (no CMS connection in Demo).  
**Parent gap analysis:** [lesotho-db-gap.md](lesotho-db-gap.md) (§ CAP-53 field pass · § M4 gap analysis).  
**Pilot:** [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md).  
**Catalogs (names only):** [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/CATALOG.md).

## Scope (this slice)

| In | Out |
|---|---|
| **Reads** from `portal_student_*_lesotho` + thin `api_student_*` / `api_faculty_*` SPs | Writes (Phase W1) |
| Student Portal API methods that map cleanly to portal projections | Staff admissions (`app_*`) — Phase R2 |
| Campus discriminator `Campus = 'LESOTHO'` (varchar 7) | Botswana DTEF / Cyberjaya EMGS |
| Documented SQL join keys + OpenAPI method targets | Live MySQL credentials in repo |

Exit for R1 in `portal-api`: with `CMS_MODE=lesotho-read` (name TBC) against a private read replica / integration DB, selected `get*` methods return CMS-backed payloads and `cms: { mode: "live", acknowledged: true }` on reads (writes remain stub until W1).

## Adapter selection

| Config | Behaviour |
|---|---|
| `CMS_MODE=stub` (today) | MockPortalApi / Schema v3 Demo records |
| `CMS_MODE=lesotho-read` (R1) | Read path uses Lesotho SQL below; mutations still stub/fail closed |
| `CMS_MODE=live` (later) | Full ack path for writes per campus adapter |

Prefer **campus_config** key `lesotho` over hard-coded Cyberjaya defaults ([portal-api-development-plan.md](portal-api-development-plan.md) Phase 5 — Lesotho-first for M4).

## Identity & keys

| Raisd / Portal API | CMS | Notes |
|---|---|---|
| Campus | `Campus` = `LESOTHO` on all `portal_*_lesotho` | Also table suffix `_lesotho` |
| Student internal id | `StudentID` (int) | Join key for `api_student_*` |
| Student number | `StudentNo` | Display / legacy login |
| Programme enrolment | `StdProgramID` | |
| Study period | `StdSemesterID` + `TermCode` | |
| Module registration | `StdModuleID` / `SemModuleID` | |
| Auth | **Do not** use `api_student_login_info.SPwd` (`md5(RIGHT(StudentNo,6))`) | Raisd IdP / Demo credentials only |
| Portal gate | `LoginActive` enum Y/N | Map to account unavailable when N |
| Finance hold | `AccOutstanding`, `AccArrears`, `PayStatus` | Surface as holds; don’t widen Schema |

## SQL surfaces (read)

### A. Projection tables (list / dashboard)

| Table | Cols | Use for |
|---|---:|---|
| `portal_student_lesotho` | 21 | Profile summary, login gate, arrears |
| `portal_student_program_lesotho` | 16 | Programme cards + `AssistProviderCode` |
| `portal_student_program_semester_lesotho` | 98 | Term context, GPA/CGPA, finance, assist |
| `portal_student_program_semester_module_lesotho` | 82 | Module list, marks, grades |
| `portal_student_program_semester_module_attendance_lesotho` | 44 | Attendance week grid → translate to sessions |

### B. Thin SPs (by StudentID)

| Procedure | Returns (shape) | Prefer when |
|---|---|---|
| `api_student_login_info` | ID, no, name, email, contact, picture; **ignore SPwd** | Profile photo + contact |
| `api_student_program_info` | Active/Completed programmes | Programme switcher |
| `api_student_semester_info` | Terms + GPA/CGPA | Academic context |
| `api_student_module_info` | Modules + mark/grade/credits | Module list fallback |
| `api_faculty_list` / `api_faculty_program_list` | Schools / programmes | Staff/applicant catalogues (later) |

**Rule:** Prefer portal tables for wide student UI; use SPs for targeted by-id fetches or when portal row is stale (ops confirm refresh cadence).

## Portal API method → CMS map (R1)

| OpenAPI method | Primary CMS source | Field highlights |
|---|---|---|
| `getPersonalProfile` / `getAcademicProfile` | `portal_student_lesotho` + `api_student_login_info` | `StudentNo`, `StudentName`, `StdEmail`, `StdContactNo`, picture; status; `LoginActive` |
| `getDashboard` | student + latest semester portal row | `LatestTerm`, `AccOutstanding`, GPA/CGPA, program name |
| `getAcademicContext` | `portal_student_program_*` + semester | `StdProgramID`, `TermCode`, `SemesterStatus`, `ProgramStatus` |
| `getAcademicModules` / `getAcademicModuleDetail` | portal module table | `ModuleCode`, `ModuleName`, `StdModMark`, `StdModGrade`, `StdModCredits*`, `StdModStatCode` |
| `getAcademicPerformance` | semester + module portal | `StdSemGPA`, `StdSemCGPA`, credits earned/attempted |
| `getAcademicModuleAttendance` | portal attendance | `Week01`…`Week20`, `AttendStatus`, lecturer/time — **translate** to Raisd session model |
| `getAcademicModuleRegistration` | semester + module | statuses Compulsory/Drop-like via `StdModStatCode`; fee fields for preview only |
| `getAcademicStudyPlan` | program + structure codes | `StructureCode`, credits; full prerequisite graph may need `f_*` (R1.1) |
| `getAcademicGraduation` | `r_studentgraduated` / clearance bits on `r_student` (SoR read) | gown/RSVP; wizard gates still thin vs newer UI |
| `getFinanceStatement` | semester portal finance cols + optional `b_statement` / payments (R1.1) | `AccOutstanding`, `AccBalance`, `PayStatus` — currency **LSL** |
| `getPortalRecordGraph` | compose from above | Campus-scoped graph; no EMGS default |
| CAP-48 funding (when method exists / finance slice) | program/semester `Assist*` | Provider `nmds`; borrower ← `AssistStdAcc` on `r_stdprogram` |

### Explicitly deferred (not R1)

| Method family | Why |
|---|---|
| `confirmModuleRegistrations`, payment proof writes, profile updates | Writes → Phase W1 |
| Immigration / EMGS | Out of Lesotho M4 default |
| Online forms staff progression | Staff portal Not started |
| Materials / assignments LMS | External / Demo LMS catalogue |
| Timetable detail | `f_moduleclass` thin — R1.1 after academics core |

## Example read queries (shape only)

```sql
-- Profile gate
SELECT StudentID, StudentNo, StudentName, StdEmail, StdContactNo,
       StudentStatus, LoginActive, AccOutstanding, LatestTerm
FROM portal_student_lesotho
WHERE Campus = 'LESOTHO' AND StudentID = ?;

-- Active programmes
SELECT StdProgramID, ProgramID, ProgramName, StructureCode,
       ProgramIntakeDate, AssistProviderCode, GraduationDate
FROM portal_student_program_lesotho
WHERE Campus = 'LESOTHO' AND StudentID = ?;

-- Term + assist + finance
SELECT StdSemesterID, TermCode, SemesterCode, SemesterStatus,
       StdSemGPA, StdSemCGPA, StdSemCredits, StdSemCreditsEarned,
       AccOutstanding, AccBalance, PayStatus,
       AssistProviderCode, AssistSchCode, AssistAmount, AssistBillNo
FROM portal_student_program_semester_lesotho
WHERE Campus = 'LESOTHO' AND StudentID = ? AND StdProgramID = ?
ORDER BY TermCode DESC;

-- Modules for a term
SELECT StdModuleID, ModuleCode, ModuleName, StdModStatCode,
       StdModMark, StdModGrade, StdModCredits, StdModCreditsEarned, StdModPoints
FROM portal_student_program_semester_module_lesotho
WHERE Campus = 'LESOTHO' AND StudentID = ? AND StdSemesterID = ?;
```

Borrower (SoR, not always on portal program row width):

```sql
SELECT AssistProviderCode, AssistSchCode, AssistStdAcc,
       AssistPercent, AssistAmount, AssistDate, AssistExpiryDate
FROM r_stdprogram
WHERE StdProgramID = ?
  AND (AssistProviderCode = 'nmds' OR AssistProviderCode LIKE '%NMDS%');
```

## Envelope

| Mode | `cms` block on success |
|---|---|
| stub (today) | `{ acknowledged: true, mode: "stub", note: "…" }` |
| lesotho-read | `{ acknowledged: true, mode: "live", reference: "<query id or row stamp>", campus: "LESOTHO" }` |
| CMS unreachable | HTTP 503 — never fabricate student rows |

## Implementation checklist (`portal-api`)

- [ ] `CmsAdapter` interface + `stub` + `lesothoRead` implementations  
- [ ] Config: `CMS_MODE`, `CAMPUS_DEFAULT=lesotho` for M4 integration env  
- [ ] MySQL pool to integration replica (secrets out of band)  
- [ ] Map R1 methods above; keep MockPortalApi when stub  
- [ ] Contract tests: LoginActive=N → 403; empty portal row → 404/empty per OpenAPI  
- [ ] OpenAPI note: Lesotho read campus in meta when live  
- [ ] Do **not** enable writes until W1 ack design signed  

## Related

| Topic | Path |
|---|---|
| M4 schema × FE × flows | [lesotho-db-gap.md](lesotho-db-gap.md#m4-gap-analysis--schema--frontend--flows) |
| NMDS ≠ DTEF | [botswana-dtef-scholarship-sync.md](botswana-dtef-scholarship-sync.md) |
| Portal API plan Phase 5 | [portal-api-development-plan.md](portal-api-development-plan.md#phase-5) |
| OpenAPI | [`openapi.yaml`](../../../openapi.yaml) |
| SDD CAP-53 | [../../sdd/11-capability-catalog.md](../../sdd/11-capability-catalog.md#cap-53) |
