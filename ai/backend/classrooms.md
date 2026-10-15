# Classrooms — shared memory Demo

Status: verified and activated local memory Demo, 15 October 2026. Demo only; no CMS write, migration or durable file storage. Lecturer aggregate verification remains on hold.

## Verification completed — 15 October 2026

The owner resumed the deferred verification. Student's full gate passed (809 unit,
278 Chromium/41 WebKit cases with existing intentional skips), Lecturer's complete
candidate gate passed (63 tests plus lint/production build), shared checks passed
(21 unit/35 consumer browser), and API/type/metadata/PDF/session regressions passed.
Paired browser and navigation flows passed at 375/768/1440px. All saves/resets used
isolated services. The current user's API/portals and saved Demo state were preserved.
The clean registry 0.7.0 Lecturer build remains blocked by the unreleased AuditTrail;
candidate success does not claim published-package readiness. The resource-projection
fix needs the next separately authorised current API restart. No commit, push,
publication, dependency pin change, migration or deployment.

See the [complete verification receipt](../frontend/student-portal/audits/2026-10-15-classrooms-materials-verification.md) for fixes, commands, evidence and release limitations.

## Same-day session Demo fixture — 15 October 2026, unverified

Owner-approved fixture: Graphic Design 3, offering-semester-2026-aug-grd301,
Tuesday 1 September 2026 (Week 3), Asia/Kuala_Lumpur. The existing 09:00–12:00
session retains its ID. A single additional dated occurrence runs 14:00–16:00,
ID session-demo-offering-semester-2026-aug-grd301-2026-09-01-afternoon, referencing
the existing schedule. This is deliberately supplied Demo data for the conditional
session selector, not inferred campus scheduling policy or a second weekly schedule.
No existing sessions or seeded attendance marks are altered; the extra occurrence
has no pre-recorded attendance. Lecturer and Student use the same canonical graph.
Record/API schemas, Faculty weights and deadlines are unchanged.

The existing local memory API on 8087 was restarted to load this fixture (and the
already prepared Materials metadata changes). Startup reached the listening state;
no tests, lint, separate verification build, browser checks or attendance saves were
run, as requested. Sessions and saved process-memory changes reset; sign in again.
The startup launcher performs its normal runtime bundling. Current portal dev
servers were left running. No migration, hosted write, commit, push or deployment.

## Bundled Demo PDFs — 15 October 2026, unverified

The local memory Materials adapter bundles two generic, clearly labelled PDF assets:
sample lecture notes and a sample assignment brief. Seeded canonical PDF attachments
receive a DEMO-prefixed filename, the actual byte length and SHA-256, while their
material IDs, assessment IDs/weights, week releases, deadlines and persisted graph
remain unchanged. The PDFs explicitly say they are not approved teaching or assessment
content; they are not the missing original campus documents.

The source PDFs live in portal-api/fixtures/materials, with an embedded generated
TypeScript byte manifest for local and bundled API runtimes. The dedicated memory
store lazily rehydrates their scoped descriptors/chunks after each restart. User
uploads, sessions, attendance, submissions and marks still reset; no durable storage
or public static-file URL is added. Unsupported/non-PDF sample metadata stays
explicitly unavailable.

Lecturer and Student use the existing authenticated fileChunk operation and preview/
download components. Student lecture-note responses now include these available file
descriptors while preserving canonical progress and list ordering. Exact registration,
campus/teaching assignment checks, scheduled release denial and session checks are
unchanged. Lecturer remains read-only; no admin/upload write flow is restored.

No API restart, tests, builds, PDF rendering or download/restart verification was run
for this increment at the owner's request. The current running API is unchanged;
bundled PDFs become available after the next separately authorised API restart.


## Experience and ownership

UI refinement (unverified): Today contains today’s sessions only; All is a flat list of assigned offerings with enrolments, code above module name. No enrolment selector, programme headings, leading list icons, next-class card or selector footer buttons. Classrooms title sits in the selector column. Nonzero issues use shared IssueCards; selector scrolling uses shared hidden-scrollbar/fades. Attendance groups navigation by day with a conditional time-range session selector, student avatars and red Not recorded labels; informational banners/helper text are removed without relaxing read-only rules. Tests/builds remain deferred.

**15 October attendance-first UI pass (unverified):** Lecturer now composes Today / All in one shared selector TabbedPagePanel and Attendance / Assessments / Materials / Overview in another. Narrow layouts switch between selector and workspace; Lesson plan and Students tabs are hidden without deleting data. Session radios and complete-roster Submit validation are UI-only in this pass; server partial saves, contracts and the existing memory store remain unchanged until UI approval. Tests/builds/browser checks and current API restart are explicitly deferred. The experience paragraphs below describe the previously verified baseline.

Lecturer `/classrooms` replaces the former Modules workspace. Today shows scheduled sessions and outstanding attendance/marking/publication tasks; Timetable combines assigned sessions; All classrooms retains programme grouping and enrolment filters. The separate Dashboard stays empty. Modules is reserved for future setup, which is not implemented.

Each exact module offering contains Overview, Attendance, Assignments, Lesson plan, Materials and Students. Old `/modules` and nested material URLs redirect, retaining query state; old authoring URLs still normalize to read-only Materials. Community stays mounted; follow-up actions open its existing student conversation.

Only Faculty-owned definitions, canonical sessions, registrations, teaching weeks and applied Materials versions are used. The current canonical graph has topics but no approved lesson-plan body or structured outcomes: the UI explicitly reports those omissions. No session or assessment is invented. Missing calendars block affected assignment/material setup and are explained. Module setup, material editing, scheduling writes, moderation, extensions, leave approvals, announcements, booking and risk scoring remain deferred.

## Shared state and access

`createDemoClassrooms` owns a dedicated process-memory overlay alongside `createDemoMaterials`, enabled only when the existing memory-only `DEMO_REUSABLE_MATERIALS=true` service is enabled. `GET /v1/meta/classrooms` advertises version 1, one MiB chunks, 50 MiB submissions and memory persistence. Saved attendance/logs/feedback/files survive portal navigation and sign-out, then reset on API restart. Unsaved Lecturer edits live in session-owned client memory and reset on refresh/logout/account change.

Every operation validates the active role and identity. Lecturer access checks campus and exact teaching assignment; Student access checks the exact registration, programme enrolment and offering. Student responses exclude marking drafts and teaching logs. Lecturer browser mock retains read-only classroom details and Materials; connected activities show unavailable guidance. Configured HTTP errors never switch to mock.

Writes are serialized, revision-checked and retry-safe through actor/method/request UUID receipts. A reused UUID with changed data is rejected. Identity changes invalidate late responses; clients dispose temporary preview URLs. The canonical graph/schema version and persisted record tables are unchanged.

## Attendance grouped by day — 15 October 2026, unverified

The approved navigation represents one campus-local scheduled day for the selected
classroom offering. Controls appear in this order: Previous scheduled day, shared
date DropdownSelect, conditional shared session DropdownSelect, Next scheduled day.
Each date appears once and arrows skip dates with no configured sessions. The
session selector appears only for multiple sessions on that day, using supplied
start/end times and a Cancelled suffix where applicable. The date and session selectors share equal widths. The central controls wrap
within narrow content widths while the navigation buttons remain at the ends.

Valid sessionId links select the exact session and its day. Date changes pick the
first applicable non-cancelled session: happening now (start inclusive/end exclusive),
already started with unrecorded attendance, next upcoming, then latest past. Ties
use start time and session ID; an all-cancelled day selects its earliest session.
Initial day choice retains today/outstanding/upcoming/latest-day precedence. The
initial default is pinned to sessionId with a history replacement; explicit changes
use normal browser history and preserve other query parameters. Invalid supplied
session IDs keep the unavailable state until a valid date is chosen.

The roster and separate audit card use the same resolver. Per-session drafts,
corrections, submission, saved history and read-only eligibility remain independent;
navigation does not aggregate or copy attendance. Switching an unsubmitted draft
retains it in existing session-owned client memory. No sessions are generated and
no API/schema, shared component source, package pin or persistence change is made.

Tests, lint, typechecks, builds and browser verification are deferred by owner.
Pending acceptance scenarios: one/multiple sessions per day; current/pending/default
selection and ties; date boundaries in campus time; cancelled/future/empty states;
arrows and first/last dates; exact links, refresh and Back/Forward; independent
drafts, saves and audit trails; narrow wrapping and keyboard dropdown controls.
No API restart, commit, push, migration, publication or deployment was performed.

## Attendance and delivery logs

Present/Absent are the only saved attendance states. Missing records stay Not recorded. Assigned lecturers explicitly save individual or bulk entries for an existing non-cancelled session whose start has arrived. Completed classes are read-only. Corrections require a reason and retain before/after, staff name and server timestamp. Student module attendance and timetable reads apply the same exact-registration overlay and refresh on focus/revisit.

Session delivery logs contain topics covered, unfinished work and follow-up notes. They are revision-checked and restricted to assigned teaching staff. Saving or errors are displayed in PageActionBar; no student read endpoint exposes these notes.

## Submissions and marking

Assignment submission stays one PDF or ZIP, maximum 50 MiB, with existing release, deadline, registration and format eligibility. The advertised transport replaces metadata-only submit/delete RPC writes in this memory Demo. Student uploads bounded one MiB chunks; the server verifies total size, SHA-256, extension and PDF/ZIP signature before publishing the current submission. Uploads expire after 15 minutes, allow two pending uploads per student and reserve against a 512 MiB process budget. Failed uploads can be discarded. Existing seed submission metadata is retained; missing bytes remain explicitly unavailable.

Submissions are addressed by exact registration, learning item and submission version. Both replacement and deletion check the previous version. Original-name downloads verify chunk metadata and SHA-256. Old unreferenced files are discarded; files referenced by published marking history are retained for authorized history. There is no hosted persistence claim.

Lecturers save percentage marks and written feedback privately, then deliberately publish selected drafts. Weights are read-only Faculty values; weighted contribution is calculated server-side. Marking binds to a specific submitted file version, rejecting stale submissions or revisions. A new submission does not inherit a prior mark. Corrections require a reason; published feedback stays visible until republished, retaining prior versions. Student material details expose only published feedback/history and authorized current submission files. Official module/term results are not created or recalculated.

## API operations

All POST operations use `/v1/classrooms/{method}` with bearer sessions and `{result}` responses. Shared Zod boundaries live in Student `src/contracts/classrooms.ts`, mirrored as Lecturer's transport contract; API imports the canonical contract at its existing Node build boundary.

| Method | Audience | Purpose |
|---|---|---|
| workspace | Assigned Lecturer | Canonical classroom/session/roster/assessment reads, saved attendance, drafts, published history and teaching logs |
| saveAttendance | Assigned Lecturer | Revision-checked session entries and correction reason |
| saveLog | Assigned Lecturer | Private session delivery log |
| saveFeedback / publishFeedback | Assigned Lecturer | Save private marks/feedback; atomically publish selected current-submission drafts |
| studentState | Exact Student registration | Published feedback only |
| beginSubmission / submissionChunk / finishSubmission / discardSubmission | Owning Student | Bounded original-file submission lifecycle |
| deleteSubmission | Owning Student | Version-checked deletion under existing submission policy |
| submissionFile | Owning Student or assigned Lecturer | Authorized original file chunks |

Materials remains read-only and independently enforces teaching-week start release using server time. No Classrooms operation can author plans, change weights or publish Materials.

## Verification and activation — 15 October 2026

Local verification passed: API Classrooms scenarios, 72 Materials checks, 20 exact-offering roster checks, 46 Community checks and API local typecheck; Lecturer lint/TypeScript/build, canonical snapshot parity and 56 focused tests; Student full check:all with 808 unit/component tests, 278 Chromium cases (46 intentional skips) and 41 WebKit cases (31 intentional skips). Lecturer aggregate verification remains on hold. Paired original submission → Lecturer preview/download/mark → Student published feedback, shared attendance, private logs/drafts, revisions, conflict/reload recovery, exact bytes, authorization, browser-mock separation and HTTP failure handling passed. Responsive checks cover 375/768/1440px, Back/keyboard navigation, Community preservation and temporary URL cleanup.

Current local API 8087 was restarted once after verification, and Lecturer 5173 / Student 5175 were refreshed and signed in against the shared memory Demo. API restart resets saved Demo mutations/files and sessions; local credentials and canonical sample records are retained. GRD301's sample assignment deadlines are in the past, so current submission locks remain; the complete submission/marking flow was verified using an isolated September 2026 clock. No deadline was shifted for activation. No package change/publication, migration, hosted write, commit, push or deployment. Isolated verification servers were stopped.

Verification corrected an unavailable checkbox import, editable DetailField slot usage, campus-offset/UTC comparisons, duplicate tab history entries, stale-form reload recovery and publication selection isolation. Original-file descriptors are normalized before comparison; cached Lecturer files and completed-upload retries recheck access. Failed saves preserve dirty edits; explicit reload adopts the latest server revision. No shared component changes were needed.

Evidence remains in Student's ignored `logs/classrooms-verification/` receipts/captures, `logs/classrooms-student-full-gate-final.log`, focused API/portal logs, and the checked-in focused regression sources. The Student-owned published-feedback catalogue card has three reviewed captures with uncommitted synthetic-Demo provenance; both local catalogues validate 191 captures. These local assets have not been published.
