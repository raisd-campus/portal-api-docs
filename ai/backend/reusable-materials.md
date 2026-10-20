# Read-only Materials — connected memory Demo

Owner-approved revision, 14 October 2026. This supersedes the earlier Lecturer reusable-plan authoring workflow. Lecturer views Materials; admin setup and version editing are deferred. Existing verification/activation receipts below remain historical.

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

## Complete material detail metadata — 15 October 2026, unverified

Owner-approved detail composition uses the existing shared SummaryCard, ContentSection,
InnerSection, DetailField and FileUploadField. Lecturer resource, assignment, quiz and
exam details show description, teaching week/topic, instructions, publisher and last
updated metadata; applicable assessment weights, deadlines, submission policy and web
URLs stay tied to their recorded values. Missing values display exactly “Not provided”.
No description, instruction, author or update date is synthesized. Generic hard-coded
seed instructions were removed from the Lecturer adapter and Student projection;
Student's existing non-empty assessment instruction field carries “Not provided”.

Every resolved material supplies nullable publishedBy and lastUpdatedAt. These derive
only from the latest recorded published revision and its staff display name (or a
recorded author name). The synthetic canonical-seed version is excluded; availability
is not publication. Read-only canonical quiz/exam metadata explicitly returns null
for missing description, instructions, publisher and update time. Released Student
content exposes the same optional publication metadata; locked DTOs still omit it.

Every material file descriptor, including published revision/content files, now has
source: bundled-demo, uploaded, or null. Bundled PDF descriptors use bundled-demo,
new transient uploads use uploaded, and unknown seed sources remain null. Lecturer
files label these “Demo sample”, “Uploaded file”, or “Not provided”, using metadata
rather than inferring provenance from a filename. Filename, MIME type, byte size,
digest, authenticated chunks and exact offering/registration authorization remain.
The additive contract fields are optional for compatibility with the running API.

These are read-model changes, not persisted graph fields or an admin authoring flow.
Browser mock details use the same missing-value presentation without gaining API
access or sample bytes. Student layouts, releases, grading and submission limits stay
as before. No tests, lint, builds, typechecks or browser checks were run at the owner's
request. The current non-watch API was not restarted; its metadata changes activate
only on the next separately authorised restart, which resets other memory state.

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


## Teaching-week release and content

There is one read-only Materials list inside the selected module, retaining the weekly accordion, statuses, details, version history and original-file previews/downloads. Overview → Students (N) → Materials stays unchanged. This class / Reusable module plan, Add, editors, file modification, Save, Publish, Unpublish and correction forms are removed. Old editor/new and plan-scope routes return to Materials; class-scope links normalize without exposing authoring. The legacy /materials desk redirects to Modules.

Availability resolves from the assigned configured teaching week's startsOn at 00:00 campus time. No individual student's semester number, assumed consecutive weeks, day selector, time selector or manually entered release date determines availability. Existing calendar breaks are respected. Missing assigned weeks show setup issues rather than invented dates. Student's read projection uses the same week-start policy in mock and connected modes. Faculty assessment weights, instructions, submission formats and assignment deadlines retain their existing records/versions; exam sitting times are unchanged.

Existing canonical content and applied versions are the starting data. The internal campus/module version store, class bindings and class-start publication cutoff remain for future admin ownership. Introducing this revision creates no synthetic published plan and does not copy student progress, submissions or grades. Completed and active class history remains isolated. No admin screen or admin write API is introduced, and Lecturer cannot author new versions in either mode.

## Permissions and transport

GET /v1/meta/materials retains version 1 and adds lecturerReadOnly=true and releasePolicy=teaching-week-start. Configured HTTP requires the advertised read-only capability and never falls back to mock on failure. POST /v1/materials/{method} exposes getMaterials and fileChunk. Authenticated Lecturer attempts to saveDraft, publish, begin, chunk, finish, discard or delete return 403. Legacy publishModuleMaterial returns 403 even with the Materials capability disabled. Retained internal fixture/version-preparation functions are not public administration endpoints.

Lecturer reads include resolved configured content and its published history; private class drafts and unpublished/unapplied plan content are redacted. Compatibility fields canPublishPlan=false, classDrafts=[], plan.draft=[] and plan.published=[] are read-only placeholders. Lecturer may inspect scheduled content and download referenced originals from their assigned class. Private draft files and plan-scope file reads are denied. The client has no authoring/upload operations and reauthorizes each file download, including repeat previews.

Student reads and every original-file chunk continue to enforce exact registration/campus ownership and server-time release. Locked DTOs omit files, history and instructions. Student refreshes at the next release, on focus and on revisit; no publication job is required. Original names/digests and bounded 1 MiB chunks remain; content retains five files/material and 50 MiB/file limits. Missing sample bytes remain explicitly unavailable. URLs are disposed on session change/logout. Student submission remains one PDF/ZIP, maximum 50 MiB; existing grading/extensions are unchanged.

## Runtime and compatibility

The opt-in DEMO_REUSABLE_MATERIALS flag remains the internal compatibility name. It rejects Live CMS only; Demo stub may use memory or Postgres for the canonical graph while Materials/Classrooms overlays stay process-memory. Both local portals use API 8087 via ignored .env.local. Hosted Demo enables the flag in gitops. Local Student Demo credentials remain in the intended ignored control-plane/.credentials/demo-students.json; passwords are not written into tracked guidance. portal-api/.local-tests/start-materials-demo.ps1 restarts the local capability consistently.

Plans, class bindings, original files and sessions reset on API restart. Independent browser mock remains available with a blank API URL and is also read-only. Snapshot content is generated from canonical Student records; the read adapter computes week starts without rewriting seed records. Persisted schema stays 4, optional Faculty definition keys remain in JSON metadata without automatic reporting-column upgrades, and no migration/reseed/hosted write occurs.

Use focused API permission/calendar/file checks and Lecturer lint/build/tests/demo parity, then Student's full gate once after source stabilizes. Responsive verification covers 375/768/1440px, Back navigation, file previews/downloads and Community state. Lecturer aggregate verification remains on hold. Shared components, package pins and unrelated work are preserved; no commit, push, publication or deployment is included.

## Historical receipts — superseded authoring workflow

## Verification and handoff — 14 October 2026

Implemented locally and verified using isolated memory API and browser processes. The current API on 8087 and portal configuration were not restarted or switched to this capability. Activation remains a separate step. All existing uncommitted work and installed package pins were retained; no commit, push, publication, migration, hosted write or deployment was performed. Lecturer aggregate verification remains on hold.

| Check | Result |
| --- | --- |
| Portal API dedicated Materials suite | 54 checks passed, including automatic inheritance and late-first-read publication cutoff; independent January/April releases and deadlines; future plan changes; active/completed history; missing weeks/mappings; duplicate briefs; immutable weights; concurrent edits/retry publication; exact registrations/campus boundaries; early downloads; exact original bytes; upload bounds; stale sessions and memory reset. |
| Portal API local TypeScript | `npm run typecheck:local` passed. This sibling-aware check is the applicable local build check; raw `typecheck` retains the repository's existing sibling alias/import-extension limitations. |
| Existing API Community / module reads | Existing focused Community and Lecturer module suites passed. |
| Lecturer | Lint, TypeScript/build, canonical `demo:check` and all 59 selected tests across modules, module details, browser mock, browser Materials and connected Materials client passed. Its aggregate gate was not run. |
| Student full gate | `CI=true`, `PLAYWRIGHT_WORKERS=2`, `npm run check:all` passed uninterrupted: tokens/assets/lint, 801 unit/component tests, TypeScript/build, production exclusion/bundle budgets, 278 Chromium cases (46 intentional skips), 41 WebKit cases (31 intentional skips). |
| Isolated browser flow | Lecturer authoring → saved draft/navigation → publication → Student access and exact-name/digest download; resource correction notice on focus; PDF/image previews and keyboard/mouse Close; five-file validation; private saved-file refresh; denied capability without fallback; assignment lock; logout/URL cleanup passed. |
| Plan editor and concurrency | Relative Week 2 authoring, failed-save retention, lead-only publication, preservation of an already active class and pinned editor revisions during concurrent saves passed in browser. |
| Responsive / Community | 375, 768 and 1440px checks covered shared three-tab scrolling, editor/detail containment, previews/downloads and Back/Cancel. Community layer/unsent draft survived Materials/Students navigation and dock/overlay resize. Dashboard remains empty. |
| Compatibility / documentation | Pure contract mirrors, canonical/public OpenAPI and affected guidance match. Optional Faculty assessment keys stay in schema-4 JSON metadata and are excluded from automatic reporting-column upgrades. Mock tests verify no Portal API fetches for blank-URL sign-in/directory/module reads. |

The January/April test fixture derives two exact offerings/registrations from the canonical graph and uses a controlled server clock. A Week 2, Day 1, 09:00 release resolves to 12 January and 13 April 2026; a Week 4, Day 5, 17:00 assignment deadline resolves to 30 January and 1 May. These demonstrate independent class calendars; they are not changes to current student registrations. Historical assignment links keep canonical item IDs and pass through the same current release/deadline checks as the Materials list.

Identity-specific working editors, publication reasons, preview URLs and Community drafts stay in their existing browser session boundaries. Saved connected drafts and original files remain in the shared memory API until it stops. Redirecting to an existing assignment brief preserves the unfinished new-material working draft. A conflicting editor retains its content, blocks further overwrite and asks the lecturer to cancel/reopen against the latest saved revision. Class publication only promotes the selected resource, keeping unrelated drafts private.

The owner additionally approved hiding Keychain after sign-in. Student and Lecturer retain their existing Keychain launcher on sign-in only; authenticated preview and Community controls are unobstructed. Applicant/Staff Keychain behavior was outside this increment. Existing Lecturer chunk-size warnings remain; dependency upgrades and unrelated formatting were not included. Focused changed source passes whitespace checks; unrelated earlier API documentation retains its pre-existing Markdown trailing-space warning.

Local detailed logs, browser scripts and responsive captures are retained under Student `logs/reusable-materials/` (ignored). Required next steps are explicit current-portal activation and eventual durable LMS storage/policy approval; no API restart is needed to review this implementation.


## Current local activation — 14 October 2026

After explicit owner authorization, the current memory API was restarted on 8087 with reusable Materials and paired Community enabled, no DATABASE_URL and CMS_MODE=stub. Lecturer 5173 and Student 5175 now both use http://localhost:8087 in their ignored .env.local files, preserving all other settings. Hosted configuration and credentials are unchanged.

The original local Student credential file was absent. The owner explicitly approved creating new local Demo credentials; five canonical scenario keys were saved in the intended gitignored control-plane/.credentials/demo-students.json. No credentials were extracted from build artifacts. Existing Adam/Laura Demo accounts remain. API startup now loads the local file; exact passwords were supplied separately to the owner and are not documented in tracked files. A repeatable local launcher is retained in portal-api/.local-tests/start-materials-demo.ps1 (ignored).

Actual current-browser verification passed: Adam saved/published a clearly labelled “Local Demo download check” resource under Graphic Design 3 / This class / Week 8; Rizal signed in with the new local Demo credential and downloaded local-demo-materials.pdf with matching original filename and SHA-256 bytes. The verification resource remains in the memory API for owner testing. There were no browser page errors. Reusable-plan reads also passed; no plan version was published during activation, and existing active-class content was preserved.

Both portals and API remain running for testing. Reload/sign in after the API restart. For immediate paired publishing/download testing, use This class and a release week that has already begun; reusable plan publications affect future classes rather than replacing this active class. Demo content/files/sessions reset when the API stops. Lecturer aggregate verification remains held. No code/package changes, hosted writes, migrations, commits, pushes, publication or deployment were performed for activation.


## Read-only revision verification and activation — 15 October 2026

Completed the owner-approved revision begun on 14 October. Current Lecturer 5173 and Student 5175 remain connected to memory API 8087. After verification, that API was restarted exactly once; the two existing in-app browser tabs were refreshed/re-authenticated as Adam and Rizal and left on their matching Graphic Design 3 Materials views. Lecturer visibly has only the weekly list/details, with no plan selector or authoring actions. Student shows current/released weeks and future locked weeks. Local credentials were reused unchanged. Temporary isolated verification servers were stopped, while current ports remain running.

Verification passed:

- Student full `check:all` passed uninterrupted using the existing CI unit budget and two browser workers: token/assets/lint, 802 unit/component tests across 103 files, TypeScript/build, production exclusion/bundle budgets, 278 Chromium cases (46 intentional skips), 41 WebKit cases (31 intentional skips).
- API: 72 focused Materials checks, local TypeScript, 46 existing Community checks and 20 Lecturer module-read checks passed. Coverage includes forbidden writes/legacy publication even with the capability disabled, redacted drafts/plan scope, missing-calendar Student denial, exact midnight boundaries and independent January/April calendars, retained version cutoff/history, ownership, original bytes and file bounds. The LMS catalogue no longer advertises Lecturer publication.
- Lecturer: lint, TypeScript/build, 47 focused tests and canonical `demo:check` passed. Obsolete authoring tests were replaced with read-only provider/transport coverage. Lecturer aggregate verification remains on hold.
- Real isolated HTTP/browser checks passed for route normalization, absent edit/upload/publication controls, 375/768/1440px containment, keyboard PDF previews, exact original filename/digest downloads, scheduled Lecturer previews, Student early-download rejection, Community draft/navigation/resize preservation and logout URL cleanup. Browser-mock checks passed with zero Portal API requests. Initial scripted checks needed readiness/unique-heading selector corrections; product controls and assertions were not weakened.
- Canonical/public contract mirrors and OpenAPI parse/parity checks passed. Source whitespace checks are scoped to this change, preserving unrelated existing work. The materials JavaScript chunk fell from approximately 131.6 kB to 25.5 kB by removing authoring code; existing main-bundle size advisories remain.

Admin setup/version authoring remains deferred. Missing canonical sample bytes remain unavailable; original-file verification used explicitly prepared isolated fixtures, not fabricated replacements for canonical sample files. API restart cleared the previous local publication-check resource as expected for memory Demo. Current screenshot and detailed scripts/logs are in Student `logs/reusable-materials/`, including `current-readonly-materials.png` and `readonly-student-gate.log` (ignored).

No new shared components/custom styling, package changes, schema-version changes, migration, hosted write, commit, push, publication or deployment. All unrelated local work remains preserved.


## Classrooms source increment — 15 October 2026

The approved shared memory Classrooms implementation adds exact-offering attendance, private delivery logs, original assignment submissions and draft/published feedback. Canonical persisted records/schema version are unchanged. Materials stays read-only. The local Demo is verified and activated on API 8087 / Lecturer 5173 / Student 5175; Lecturer aggregate verification remains held. No migration, hosted write or deployment is included. See [Classrooms](classrooms.md).
