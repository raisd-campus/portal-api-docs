# Raisd LMS — logical database tables

**Status:** Proposed / research-backed logical model + Demo contract tables already in Schema v3. **Not** a Live LMS product.  
**Human ERD:** [`docs/diagrams/erd.html#lms`](../../diagrams/erd.html#lms) (CMS / LMS / shared / proposed colour legend).  
**Live Neon ERD:** [raisd-db-admin.vercel.app](https://raisd-db-admin.vercel.app) (ERD tab — same CMS / LMS / shared header colours + domain filter; IRREGULAR map in `db-admin/api/erd.ts`).  
**Related:** [architecture/lms.md](../architecture/lms.md), [lms-architecture.html](../../diagrams/lms-architecture.html), [lms-features.html](../../diagrams/lms-features.html), [canonical-schema-luct-readiness.md](canonical-schema-luct-readiness.md).

## Boundary (ADR-1)

| Domain | Colour on ERD | Owns |
|---|---|---|
| **CMS** | Blue | Identity, enrolment, curriculum catalogue, finance, admissions, immigration, published module/term results |
| **LMS** | Green | Weeks, learning items, progress, assignment submission metadata, lecturer course reviews |
| **Shared** | Amber | Module offering, teaching assignment, class schedule/session, module assessment, attendance, assessment result |
| **Proposed LMS** | Purple | Quizzes, live class, forums, assessment feedback, release rules, material QA, copyright — CAP gaps only |

LMS is **role surfaces on the Portal API**, not a fifth portal. Existing Cyberjaya CMS remains system of record for enrolment / grades / attendance this phase. Assignment **bytes** need a Live file store ([SDD-10 Q5](../../sdd/10-open-questions.md)); Demo stores metadata only.

## Portal API surface (Demo)

| Surface | Path / ops | Notes |
|---|---|---|
| Catalogue | `GET /v1/meta/lms` | Callable methods × CAP × tables; deferred quiz / live-class / forum / feedback names (not callable) |
| Materials | `POST /v1/portal/getAcademicModuleMaterials` · `…MaterialDetail` · `submitAssignment` · `deleteAssignmentSubmission` | OpenAPI tags: `LMS`, `Materials` |
| Lecturer review | `POST /v1/portal/getLecturerReview` · `submitLecturerReview` | Tags: `LMS`, `Lecturer review` · CAP-30 |
| Shared academic reads | `getAcademicModules` · `getAcademicModuleDetail` · `getAcademicModuleAttendance` · `getAcademicTimetable` | Listed in the catalogue; domain `shared` |

Do **not** add Live handlers for deferred method names without product sign-off. OpenAPI version **0.4.1+**.

## In-contract tables (`PortalRecordGraph`)

Snake_case names match Neon Demo collection tables (`id`, `position`, `record jsonb`, …). Field shapes: `student-portal/src/contracts/portal-records.ts`.

| Table | Domain | Key FKs | CAP |
|---|---|---|---|
| `module_offerings` | Shared | `module_id`, `academic_term_id`, `campus_id` | 11–14 |
| `teaching_assignments` | Shared | `module_offering_id`, `staff_member_id` | 40, 44 |
| `class_schedules` | Shared | `module_offering_id` | 11 |
| `class_sessions` | Shared | `class_schedule_id` | 11, 12 |
| `attendances` | Shared | `module_registration_id`, `class_session_id` | 12 |
| `module_assessments` | Shared | `module_offering_id` | 19, 24 |
| `assessment_results` | Shared | `module_registration_id`, `module_assessment_id` | 13, 28 |
| `module_weeks` | LMS | `module_offering_id` | 23, 27 |
| `module_learning_items` | LMS | `module_week_id`, `module_assessment_id?` | 17–19, 24, 27 |
| `learning_progress` | LMS | `module_registration_id`, `module_learning_item_id` | 27 |
| `assignment_submissions` | LMS | `module_registration_id`, `module_learning_item_id` | 20 |
| `lecturer_reviews` | LMS | `student_profile_id`, `module_registration_id`, `teaching_assignment_id` | 30 |

## Proposed tables (not in graph yet)

Do **not** invent Portal API methods or bump `PORTAL_RECORD_SCHEMA_VERSION` for these without product sign-off. ERD §10 draws them in purple.

| Table | CAP | Purpose |
|---|---|---|
| `quiz_attempts`, `quiz_questions`, `quiz_attempt_answers` | 24, 29 | Online quiz / exam attempts and integrity |
| `assessment_feedback` | 28 | Lecturer feedback body against an assessment |
| `live_class_sessions`, `live_class_attendances` | 26 | Approved meeting join (tool TBC · Q11) |
| `module_forums`, `module_forum_posts` | 25 | Durable moderated class discussion (≠ session chat demos) |
| `learning_release_rules` | 27 | Date / prerequisite release beyond `availableFrom` |
| `material_qa_reviews` | 43 | Staff pre-publish QA |
| `copyright_permissions` | 42 | Rights / licence metadata on learning items |

## Rules agents must not violate

- Do not claim Raisd has a Live LMS or that Materials alone closes [BASE-44](../../sdd/09-requirements-traceability.md).
- Do not present proposed tables as Demo Schema v3 collections.
- Do not duplicate CMS operational SoR tables under LMS names (enrolment, finance, published module results stay CMS/canonical).
- When adding a durable LMS collection, update Zod graph + published ERD colour sets + db-admin domain maps (`lib/erd-script.ts`) + IRREGULAR aliases (`api/erd.ts`) + this file in the same change.
