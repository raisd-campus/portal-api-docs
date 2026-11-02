# Staff portal — current agent knowledge

## Academic administration — 29 October 2026

The Admin sign-in exposes Academic → Faculty, Programme and Modules through the shared tiered menu in package 0.20.0. Teaching Classrooms and its legacy `/modules` redirect remain separate. Academic composes shared directories, record workspaces, tabs, fields and popups. Its PostgreSQL catalogue and independent curriculum review feed future Applicant selections and Student requirements; historical enrolments remain pinned. Staff Students adds API enrolment stream assignment when Student and Programme permissions are present. Details: [Academic catalogue](../backend/academic-catalogue.md).

Study Plan semester sections use the shared titled InnerSection and standard DataTable. The title and blue credit pill sit above an edge-to-edge divider; contained table rows and their hover background reach the section edges while cell text retains its inset. The preview identity uses SummaryCard. Semester module placements show all applicable rows without AdminTable search, sort/filter controls or pagination. Module links, stream filtering, published-version scope and Add Module/Edit Semester/placement editing remain. Directory, record-picker and Versions tables continue to use AdminTable.

Academic uses shared component-level record actions and persistent history from design-system 0.21.0. Button labels render in Title Case, with entity-specific Edit/Create actions. Existing Faculty, Programme, Module and Study Plan workspaces show a separate History panel after the active page panel, displaying recorded before/after changes through AuditTrail or EmptyState. History is absent from unsaved records and is no longer a tab. Faculty Groups administration, Faculty Short Name and Faculty Group fields/columns are removed from the Staff UI; existing stored values and group records remain intact. Faculty directories use a single AdminTable without category tabs. Programme create mode omits Study Plan/default-curriculum controls; Creative and Postgraduate fields use ordinary detail rows. Create Accreditation is a primary table-toolbar action and can save directly from a read-mode Programme with expected revision and a stable retry ID; failed saves retain the popup, while create/edit-mode accreditation remains part of the parent draft.

Study Plan Stream uses the shared top-label DropdownSelect without an InnerSection. Semester title pills show credits for the currently displayed applicable placements. DataTable rows use the shared row hover, pointer and keyboard selection for module details or placement editing. Empty review action bars are omitted; history remains independent of tab selection. Shared release adoption is limited to Staff; other portal pins are unchanged.

Shared 0.22.0 presents audit changes in labelled Field, Before and After columns, stacking them on narrow screens. Academic history expands recorded nested values and uses readable field labels; technical identity/revision/update stamps are omitted from the comparison while the recorded actor and event time remain. It never reconstructs an event from the current record. Successful catalogue, accreditation, curriculum and review actions use the shared bottom-right toast, which dismisses automatically after four seconds and pauses while hovered or focused. The toast provider survives record creation navigation. Failed saves retain their draft and existing error feedback.

Shared toast variants use success (green, the default), error (red), info (blue) and warning (amber) surfaces, borders and icons. The compact layout centers the message, icon and dismiss button without card-sized vertical padding. Academic compact-list status labels retain their component-level transparent, unpadded text treatment with the appropriate semantic colour; summary pills and directory status pills retain their existing presentation. AdminTableToolbar omits the empty actions container, preventing an extra wrapped flex row above search in narrow record lists.

## Academic record navigation

Academic admin record workspaces use the existing header breadcrumb and Close action, without an additional in-content breadcrumb. Record tabs, curriculum preview versions and stream filters are URL-backed. Faculty Programme links, Programme Structure links and Module Study Plan links retain campus and source-tab context through Close, header parent links, browser Back and reload. A direct Structure link returns to its owning Programme Study Plan tab. A Structure opened from Module Study Plan keeps Modules active and opens the exact published version referenced by that row; the Version column, preview label, read-only rules and summary totals identify that snapshot. Edit returns to the current working draft. Same-record view changes retain edits; owner, campus and parent navigation retain the shared unsaved-change guard. Return destinations are restricted to same-campus Academic routes, without changing server permissions.

Academic and Applicants directories omit the campus selector. Existing hosted-campus resolution, Academic URL scope, authorized-campus defaults, request cancellation and server ownership checks remain. Applicants direct-record ownership still resolves its authorized campus for the retained queue.


Display terminology is **Study Plan** throughout Academic tabs, actions, breadcrumbs, review flow and feedback. Existing routes, flow/step IDs, API/schema keys, saved record names and recorded audit values are preserved. The built-in Academic Curriculum configuration name has a display-only Academic Study Plan alias; loading it does not change the stored name or create unsaved edits.

## Shared header breadcrumbs — 27 October 2026

Staff/Lecturer pins shared 0.18.4. Teaching routes expose Classrooms → Classroom Details → Material Details, adding Add Material/Edit Material where those routes are active; existing redirects are preserved. Router parent links retain exact offering/material identities. Admin routes expose Applicants → Applicant Details and existing desk roots. Shared overflow, loading, keyboard and focus behavior apply to both modes; Community/account controls and permissions are unchanged.

## Compact Admin record lists - 0.18.3

Staff now pins shared 0.18.5. Compact AdminTable record-list cells stay side by side and share the available width. Entry names/links are left-aligned and status text is right-aligned with sentence wrapping. Summary-column statuses in both summary and list views retain their semantic color without pill background, border or padding. Badges elsewhere are unchanged. Directory tables retain their column layout. Staff and Control adopt the same shared patch without local CSS overrides, workflow changes or data changes.

## Admin summary scrolling - 0.11.1

Staff uses the shared full-height sticky desktop summary column. The summary/list switch stays visible while only its content scrolls, without transparent effects. Narrow layouts retain a compact panel above the form. No review controls, data or workflow behavior change.

## Applicants status tabs and pills — 22 October 2026

The status tabs are ordered Pending Review, Approved, then All, using the supplied status order and shared quick-scope allPosition="last". Ordering does not change the selected filter. The directory, compact picker and summary all compose the existing shared Badge: warning/amber for pending-review, success/green for approved or accepted, destructive/red for action-required, and secondary/neutral for draft or unknown states. Labels remain visible alongside color; no custom pill styling is introduced.

## Applicants Step column — 22 October 2026

The Staff Applicants directory includes a searchable, sortable and filterable Step column between Programme and Status. It displays the first unfinished applicable row from the API decision.progress collection, preserving the pinned Control policy label. If every returned step is complete, it displays the API-provided completion status; absent progress displays an em dash. No workflow state is inferred from the application status or changed by this column.

## Shared ContentSection title height — 0.10.5

Applicant, Student, Staff and Control pin the same released shared component. All ContentSection title containers have a 36px minimum height, including custom headings and sidebar variants; multiline content can grow. Typography and default page/sidebar gaps remain unchanged. This is a local presentation upgrade without data, API or workflow changes.

## Admin summary presentation — 0.10.4

Applicants now uses the shared 96px passport-photo slot with authenticated evidence bytes, centered summary fields, natural-height sticky desktop sidebar, bounded overflow and transparent edge masks. Narrow layouts keep a bounded summary above content. Workspace titles use the standard page size. Review/reload footer buttons are temporarily removed at the owner's request while this UI is refined; summary/list switching, original document preview/download and read-only case/history content remain. The existing review API/controller is preserved without automatic actions. Shared action buttons are full width when supplied. Only Staff adopts this shared patch.

## Applicant record review — 22 October 2026

Staff `/admin/applicants/:applicationId` opens a submitted application read-only in shared AdminRecordWorkspace 0.10.3. Linked rows support keyboard/new-tab navigation; Close restores directory filters and pagination. The summary/list panel uses the complete authorized campus queue with a bounded, virtualized list. Shared workspace layout stacks the panel above the form on phones/tablets, with actions below; desktop uses two columns. Section rhythm uses shared page defaults, without component overrides.

Submitted fields remain read-only. Supporting documents and case-owned message attachments use shared file fields and authenticated original-byte Preview/Download. Delivery checks metadata, bounds and SHA-256; credentials never appear in file URLs. Issued Eligibility/Offer PDFs and review history are available. Preview failures remain visible and retryable.

Review Application offers only API-returned actions: Release Eligibility Letter or Request Corrections. QA enters a review note, saves and explicitly confirms. The existing verify-documents action verifies eligibility and generates/releases the letter together. Every write carries its loaded revision, Demo generation and a stable request ID reused for identical failed/lost responses. Confirmed success returns to read mode and refreshes the queue. Validation, permission, stale-revision and server failures retain the draft. No Add/Delete or applicant-field editing is added.

Summary/list and detail-tab switches retain the draft. The shared controller provides Save/Keep editing/Discard, before-unload protection and action errors. Router blockers connect Close, record selection and browser navigation to it. Dismissing confirmation keeps the review. Pending saves prevent duplicates and hold navigation until the result is known. Campus/desk permissions remain server-owned.

Verification: Staff lint, 97 tests and production build; isolated API University Flows suite (65 checks); synthetic Chromium 1440px and WebKit 375/768px checks for keyboard row activation, document preview/download, virtual picker, dirty guards, tab preservation, failed save/retry, confirmed release and contained layout. Read-only local SSO/API smoke confirms Cyberjaya QA can review the completed case, the approved case already has a letter, and original transcript hashes match. Current Demo applications were not reviewed/reset. Browser coverage uses a synthetic fixture, not the authenticated Staff portal. No package change, migration or hosted deployment.

## AdminTable feedback inset — 0.10.3

Applicants consumes shared AdminTable 0.10.3. Empty, no-match and error feedback has a shared 16px side inset aligned with the toolbar/footer. This is a presentation correction; an expired SSO session still requires sign-in and does not produce a fabricated empty queue. Other portal pins, authentication and admissions data are unchanged.

## Shared page spacing — 0.10.2

Staff consumes the shared 16px page ContentSection default. Applicants inherits it directly; registration, legacy student/payment screens and other simple heading shells use ContentSection. Access, admissions review and classroom detail shells retain their wrappers and use pageSectionVariants(). Keep workspace grids, inner section rhythm, actions and permissions unchanged. Applicant and Student adopt the same release; Control stays pinned.

## Admin navigation preparation — 21 October 2026

Applicants visual correction uses design-system 0.10.1: `ContentSection type="page" plain` owns the page heading and title/content spacing. A campus selector appears only on an unpinned host with multiple assigned campuses. AdminTable status scopes use the shared TabbedPagePanel with its divider; advanced filters and remove-rule controls use standard 36px icon buttons. Other portal pins, admissions permissions and record actions are unchanged.

Overview is removed from Admin navigation. `/admin` opens the first permitted module. Applicants now uses released design-system 0.10.1 `AdminTable` over the complete authorized campus submitted-application queue. Columns are Applicant, Programme, Status and Last Updated, with readable labels and campus-timezone dates; search, status scopes, advanced filters, sorting and shared 10/20/50-row pagination are available. Hosted campus scope intersects server assignments; localhost defaults to Cyberjaya when assigned, otherwise the first assigned campus. Campus changes cancel requests and reset table state. Shared components provide loading, empty, no-match and retryable error states. That initial table-only stage is superseded by the Applicant record review section above. Existing APIs, case workspace code, permissions and stored cases are preserved. A role with no remaining module stays at the empty Admin route without redirect loops. Only Staff upgrades its package pin; local preparation is not a hosted deployment.

### Applicants verification — 21 October 2026

Staff lint, 79 tests (including six page integration cases) and production build passed. Synthetic composition checks passed in desktop Chromium and phone/tablet WebKit at 1440/375/768px, including search/scopes/filters/pagination, dialog focus return, long labels and contained horizontal scrolling. The existing Staff Vite server loaded the released component through dependency optimization and hot reload. The live smoke test exposed an API lock leak on cancelled requests; handler-complete cleanup now prevents the stall without releasing running writes (see learner lifecycle verification). After loading that fix through the existing local launcher without resetting Demo data, the Demo QA identity read two distinct Cyberjaya submitted applications (approved and pending review); Lesotho returned 403 and health remained 200 after repeated cancelled reads. This is local API proof and synthetic browser coverage, not a hosted or full Staff record-review walkthrough.

## Account header — 21 October 2026

Headers use shared `PortalAccount` 0.9.3: name first, permanent SSO numeric User ID followed by ` · ` and comma-separated assigned roles second. Applicant, Student, Staff and Control use the same number. Email and campus Student/Staff numbers are not substituted. Role metadata is display-only; active-role authorization remains unchanged.

## Staff Admissions - 20 October 2026

The Admin Applicants page and overview now read the Portal API campus admissions queue using stable application/person IDs. Payments and Registrations expose the same new-policy case reviews; old independent Applicant tracker data is no longer the admissions source. The active Admin role, assigned campus and explicit review desk govern every read/write. Teaching menus/permission hierarchy and the fixed Applicant Access preset remain. IO/SSD desk capabilities are available without automatic assignment. Shared 0.8.0 compositions include evidence delivery, messages, protected review drafts and audit. See [University Flows](../backend/university-flows.md).


**Repository:** raisd-campus/lecturer-portal. **Baseline:** [SDD-06](../../sdd/06-lecturer-portal.md). Read [campus instructions](../AGENTS.md) and [shared components](../design/component-library.md).

**Demo host:** `https://staff.{slug}.raisd.co` (Lesotho: https://staff.lesotho.raisd.co). The product title is **Staff Portal**. `teach.{slug}.raisd.co` 301-redirects here. Role key stays `lecturer`.

## Menus by active role — 17 October 2026

The shell shows one group for the role chosen at sign-in. See [SSO roles and menus](../backend/sso.md#staff-portal-menus).

| Sign-in | Navigation | Community |
|---|---|---|
| Staff or Lecturer (`roleKey` `lecturer`) | **Staff Portal:** Dashboard, Classrooms | Docked on desktop, overlay on smaller screens |
| Campus Admin (`roleKey` `admin`) | **Admin:** Applicants, Students, Payments, Registrations, Access | Not shown. A direct teaching URL redirects to `/admin` |

A Staff or Lecturer sign-in that opens `/admin` is sent back to Dashboard. Access is only on the Admin sign-in and uses that Admin SSO token. Register copy follows the preset: Register student, Register staff, or Register lecturer. Detail: [admin desks](admin-portal.md).

Classrooms, attendance, and materials behaviour below remains the teaching contract for a lecturer sign-in. Historical notes that say “Lecturer portal” describe the same repo.

## Released shared 0.8.0 and local API activation — 15 October 2026

AuditTrail is now published in GitHub Packages 0.8.0 alongside the approved
expanded-accordion divider/square lower corners. Student, Applicant and Lecturer
pin exact registry 0.8.0. All 263 installed files match the published archive;
unrelated lock entries are unchanged. Lecturer has no remaining AuditTrail Vite,
TypeScript or Tailwind source-preview mapping. The clean registry npm ci consumer
passes lint, 63 tests and production build; the earlier 0.7.0 release blocker is
resolved. Shared gates pass 21 units and 35 consumer browser cases. Student full check:all passed 809 units, 278 Chromium and 41 WebKit cases (46/31 intentional skips), plus lint, type/build, production exclusions and bundle budgets. Applicant full check:all passed 65 units and 70 browser cases. See the verification receipt.

Local API 8087 was rebuilt/restarted with the existing stub-memory configuration,
activating the resource-detail projection fix. Health and enabled Materials/
Classrooms capabilities passed; actual Lecturer and Student reads and exact Demo
PDF downloads passed at 375/768/1440px with no page errors or record mutations.
Memory sign-ins and saved Demo changes reset on restart. The three portal servers
remain running on their original ports. Bundled PDFs and canonical sessions remain.

Future manual package releases use design-system's release:publish helper and its
securely stored GitHub CLI package-write login. The earlier one-session publisher
was not retained. Scope and exact archive/registry integrity now pass preflight;
temporary npm auth files are removed. See the shared README/AGENTS release section.
No portal deployment, database migration, unrelated commit or push is included.

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

See the [complete verification receipt](student-portal/audits/2026-10-15-classrooms-materials-verification.md) for fixes, commands, evidence and release limitations.

## Current source baseline — 15 October 2026

The attendance-first UI overhaul uses two shared TabbedPagePanels: a persistent selector with **Today / All**, and an exact-offering workspace with **Attendance / Assessments / Materials / Overview**, defaulting to Attendance. Desktop places them side by side when the available content width is at least 54rem; narrower layouts show one panel at a time with **Change classroom** restoring selector tab and scroll. Today shows only today’s supplied sessions; empty days show a simple No classes today state, with no next-class card or footer navigation buttons. All shows only assigned offerings with enrolments, flattened without programme headings or an enrolment selector; each shared linked row contains module code above module name, without leading icons or term/student-count metadata. Shared scrollbar-hidden and Community scroll fades are reused. The exact selected offering row uses aria-current=page with a subtle active surface without a border or ring, independent of the selected workspace tab. Classrooms heading belongs inside the selector column; selected classroom heading shows module name only. Classroom timetable remains in Overview; the existing combined timetable route remains available. Lesson plan and Students tabs are hidden for now; their old links redirect to Overview and underlying data/API remain intact. Dashboard stays empty; **Modules is reserved for future setup and has no setup UI**. Legacy Modules/material URLs redirect to Classrooms. Shared shell/Community remains mounted, preserving conversations, drafts, scroll and responsive layers.

Classrooms uses the authenticated shared memory Demo API. Existing read-only browser mock details/Materials remain separate; attendance, marking and logs need the advertised Classrooms capability and never fall back after HTTP failure. Assigned lecturers record Present/Absent with explicit saves and audited corrections; unrecorded stays distinct. They review original Student submissions, save private marks/feedback and explicitly publish them. Published corrections retain history/reasons and bind to the exact submission version. Faculty definitions, weights, deadlines and official results remain protected. Lesson-plan and roster data and private delivery-log operations are retained internally but their dedicated tabs are hidden during the attendance-first UI pass. Completed classrooms are read-only.

Materials remains **read-only**, using configured teaching-week start at campus-local midnight. All earlier Lecturer content/plan authoring is superseded. No admin setup, scheduling editor, moderation, extensions, announcements, consultation booking, risk scoring or new shared component is introduced. See [Classrooms data/API rules](../backend/classrooms.md) and [Materials rules](../backend/reusable-materials.md).

| Route | Current purpose |
|---|---|
| `/sign-in` | Existing Demo Lecturer login |
| `/` | Empty Dashboard |
| `/classrooms` | Today / All selector; `view=timetable` retains combined timetable |
| `/classrooms/:moduleOfferingId` | Attendance-first tabbed workspace; selector, session and assessment in query |
| `/classrooms/:moduleOfferingId/materials/:materialItemId` | Read-only Materials detail |
| `/modules/*`, `/materials`, old new/edit routes | Compatibility redirects; no authoring |

Use released shared components and their documented slots. Save feedback belongs in PageActionBar.leading; action dividers use edgeToEdge; header Add actions use primary buttons with a leading icon. Consumer pins remain 0.7.0. The currently installed local candidate includes the separately approved accordion refinement; registry publication is separate. Follow the component guardrail for further changes.

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

## Attendance-first UI pass — unverified

The desktop empty Choose a classroom panel reserves the shared heading line so its card top aligns with the selector card. Classroom row chevrons are hidden only in the authorized Lecturer selector via its shared renderLink slot; other LinkedList consumers are unchanged. Filled red triangle tab badges use a flex, leading-none wrapper to avoid inline baseline descent and center the icon vertically; row icon alignment is unchanged. Red triangle indicators flag exact offerings with existing incomplete past-session attendance, awaiting marking/draft publication or supplied setup issues. Shared TabbedPagePanel badge slots expose matching indicators on Today/All and affected Attendance/Assessments/Materials/Overview tabs, with accessible descriptions. Today aggregates only classrooms scheduled today; All aggregates assigned offerings with enrolments. Operational attendance/marking flags exclude completed classrooms; setup flags remain factual. No API or package changes; verification remains deferred.

UI refinement: the selected module title uses the shared page-heading presentation on an h1; Present/Absent table headers and cells use shared center alignment. The classroom selector column is sticky below the measured PortalHeader height plus 24px, following Applicant’s shared WizardStepPanel approach, only in the desktop split layout; a ResizeObserver tracks header changes and the faded list height is capped to the available viewport. Narrow panel-switching behavior remains unchanged.

Future non-cancelled attendance sessions show a shared Upcoming class empty state with only the campus-local opening date/time; no student/location line or latest-past-class action. The date navigator remains; disabled roster radios, red Not recorded labels and unmarked-count/footer actions are hidden until server time reaches the session start. Existing workspace refresh updates eligibility; server restrictions remain unchanged. Attendance uses previous/next scheduled-day navigation and one date option per campus-local day, with a time-range session selector only when that day has multiple sessions, with Name, Student ID, Nationality, Semester and mutually exclusive Present/Absent controls. Shared DataTable compact cards provide the narrow layout; unrecorded starts with neither option selected and shows a red Not recorded label beside the shared student avatar. Timezone/location helper text and the read-only explanatory banner are removed; the actual read-only restrictions remain. Mark all present remains explicit and sits in PageActionBar immediately before Submit attendance, after Reload latest. Attendance history is a separate shared PagePanelLayout card below the classroom TabbedPagePanel, visible only on Attendance when the selected session has saved history. The editor and history reuse the same configured-session resolver; no extra API read is introduced. History now adapts existing rows to the shared unreleased AuditTrail avatar timeline (newest first), with before/after values and reasons. Actor photos use the authorised lecturer directory with the signed-in profile name/photo mapped by its stable ID. History stores bare names while Community prefixes titles, so exact matches take precedence and recognised Prof./Professor/Dr. prefixes are removed for fallback matching; missing/ambiguous identity uses initials. Local serve-only Vite alias plus TS/Tailwind source mappings preview shared source without patching installed packages or changing pins. Remove this preview scaffolding on the future shared release upgrade; production consumption, tests/builds and captures remain deferred. Submit attendance requires the complete roster in the UI, retains unfinished client drafts through navigation/failed saves, and displays correction reason only when changing saved records. Native radio groups are scoped separately for the shared table/card presentations. PageActionBar owns remaining count, unsaved/save/error feedback and the full-width action divider. Shared IssueCards use the red destructive variant and count past non-cancelled incomplete sessions and submissions awaiting marking, hide when zero, and open the relevant work; attendance opens the earliest outstanding session.

**The current UI changes have not been tested, linted, built or browser-verified at the owner's instruction.** Earlier verification below applies to the pre-overhaul baseline only. API operations, server partial-save behavior, schemas and release rules are unchanged; server complete-roster enforcement is deferred until UI approval. Current API and local services are not restarted. No package change, commit, push, migration or deployment.

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

## Verification and delivery boundary

Local verification passed: API Classrooms scenarios, 72 Materials checks, 20 exact-offering roster checks, 46 Community checks and API local typecheck; Lecturer lint/TypeScript/build, canonical snapshot parity and 56 focused tests; Student full check:all with 808 unit/component tests, 278 Chromium cases (46 intentional skips) and 41 WebKit cases (31 intentional skips). Lecturer aggregate verification remains on hold. Paired original submission → Lecturer preview/download/mark → Student published feedback, shared attendance, private logs/drafts, revisions, conflict/reload recovery, exact bytes, authorization, browser-mock separation and HTTP failure handling passed. Responsive checks cover 375/768/1440px, Back/keyboard navigation, Community preservation and temporary URL cleanup.

Current local API 8087 was restarted once after verification, and Lecturer 5173 / Student 5175 were refreshed and signed in against the shared memory Demo. API restart resets saved Demo mutations/files and sessions; local credentials and canonical sample records are retained. GRD301's sample assignment deadlines are in the past, so current submission locks remain; the complete submission/marking flow was verified using an isolated September 2026 clock. No deadline was shifted for activation. No package change/publication, migration, hosted write, commit, push or deployment. Isolated verification servers were stopped.

Saved connected attendance/logs/feedback/files belong to API memory and survive sign-out; API restart resets them and sessions. Unsaved client edits/previews reset on refresh/logout/account change. Browser mock is independent. Preserve unrelated work and local Demo credentials.

<details>
<summary>Historical milestones and verification evidence — superseded behavior is not the current contract</summary>

# Lecturer portal — agent knowledge

**Repository:** [`raisd-campus/lecturer-portal`](https://github.com/raisd-campus/lecturer-portal)  
**SDD:** [SDD-06](../../sdd/06-lecturer-portal.md)  
**Campus agents:** [../AGENTS.md](../AGENTS.md)
**Demo host:** https://staff.lesotho.raisd.co (other campuses: `staff.{slug}.raisd.co`). Admin desks are the Admin menu at `/admin`.

## Status

**Demo shell started 11 Oct 2026; local UI scaffold and Modules milestone updated 13 Oct 2026.** The local post-login layout uses released design-system 0.6.2 shell components, following Student and Applicant composition. **Sign-in is Raisd SSO only** (`sso.raisd.co`) — no portal password form (redirect with campus landing `returnUrl`). Hosted Demo publishes LMS materials through Portal API (`listTeachingModules`, `listModuleMaterials`, `publishModuleMaterial`).

| Route | Purpose |
|---|---|
| `/sign-in` | SSO handoff only (auto-redirect to `sso.raisd.co/login` with campus landing `returnUrl`) |
| `/` | Empty Dashboard inside the shared shell |
| `/modules` | Assigned module offerings grouped by programme, using shared clickable `LinkedList` cards |
| `/modules/:moduleOfferingId` | Offering Overview, Students (N) and browser Demo Materials tabs |
| `/modules/:moduleOfferingId/materials/new` | Add a browser Demo resource or Faculty-linked assignment brief |
| `/modules/:moduleOfferingId/materials/:materialItemId` | Material detail; append `/edit` for authorable content |
| `/materials` | Existing Demo materials desk retained as a direct route, hidden from navigation |

## Post-login UI scaffold — 12 October 2026

`PortalShell`, `PortalSidebar`, `PortalHeader`, `PortalAccount`, `PortalMain` and `PortalPageContent` own the shared frame. The sidebar contains Dashboard and a separate Log out footer action; the header shows the current route breadcrumb and signed-in lecturer identity. Dashboard renders no page content and makes no teaching/material requests. The previous top-bar shell and workspace allocations/content no longer render after login.

The shared Community toggle controls Community presentation from the locally packed design-system **0.7.0 candidate**. Desktop starts with the panel open at Student's existing 296px default width. Phone/tablet start closed and use Student's existing full-screen left overlay, with Escape/close focus restoration. The owner approved reuse of that panel's existing frame styles unchanged. Assigned programmes/offerings, canonical rosters and paired Student–Lecturer Demo chats use shared components. Lecturer uses the same shared desktop resize handle as Student: 296px initially, 256–640px with viewport clamping, pointer dragging and 16px keyboard steps. Canonical Adam is Prof. Adam Watson, L00032, adam.watson@example.edu.my and the same Student staff avatar. Group → members → direct-message layers retain Back and drafts; authors and access come from authenticated API sessions. Tracked consumers stay pinned at 0.6.2 pending final package publication/pinning approval. Consult Student/Applicant before layout composition; any further custom redesign requires specific approval.

This is a local Demo increment, not a deployed change. Sign-in and the direct materials workflow remain. Capability-gated shared chat adds Portal API methods while preserving Student chat response shapes. See [Community contract](../backend/community-chat.md) for polling, actual files/images, membership, persistence and explicit legacy migration. The historical hosted walkthrough below predates this scaffold.

**Hosted walkthrough:** After Alya’s modules are Faculty-enrolled, lecturer Adam publishes Week 1 notes → Alya opens Academic → Modules → FDN101 → Materials. Evidence: [E2E student learning](../../reports/e2e-student-learning-lms-2026-10-11/).

Demo ≠ Live. Materials alone is not a complete LMS ([BASE-44](../../sdd/09-requirements-traceability.md)). Does not write CMS.

## Agent rules

1. Implement against SDD-06 and campus [AGENTS.md](../AGENTS.md).
2. Talk only to the Portal API.
3. Student-portal lecturer-review (CAP-30) is a **student-facing** session Demo; do not treat it as the lecturer portal.
4. Install a released `@raisd-campus/design-system` version (currently **0.6.2**). Follow [component ownership and setup](../design/component-library.md) instead of copying student portal UI.
5. When behaviour changes, update this file and [../MANIFEST.yaml](../MANIFEST.yaml).

## Pairing

Student learning surfaces: [student-portal/AGENTS.md](student-portal/AGENTS.md). LMS posture: [../architecture/lms.md](../architecture/lms.md). Campus Admin / QA desks: [admin-portal.md](admin-portal.md).

## Field standard

Use released shared `Input`, `DropdownSelect` and `DatePicker` controls at 36px height, 14px text and 20px line height across all views and pointer modes. Keep textareas multiline and preserve the geometry of uploads, checkboxes and radios. Follow the [shared component guide](../design/component-library.md#standard-field-sizing); do not implement portal-local sizing overrides.

## Local

```sh
cd ~/src/raisd/lecturer-portal
npm install   # needs GitHub Packages token for @raisd-campus/design-system
npm run dev
npm run check
npm run build:vercel   # then vercel deploy --prebuilt --prod
```

### Verification and publication

The Modules milestone has focused offering/session and shared page-state tests. Run those selected files with Lecturer lint and TypeScript/build while the owner holds aggregate verification. There is no committed Lecturer browser suite. Shared deployment CI runs checks on pushes and deploys only on an explicit manual main dispatch with deploy=true.


Local scaffold verification (12 October 2026): Lecturer lint and TypeScript/build passed; Vitest explicitly found no unit files. Focused Chromium browser checks passed at 375/768/1440px for Demo sign-in, empty Dashboard, active navigation, Community dock/overlay, keyboard toggle/Escape/focus restoration, page bounds and logout. Dashboard emitted zero lecturer teaching/material RPCs. Demo login HTTP was mocked in the isolated browser context when configured; no hosted records or deployment were exercised. Phone/tablet/desktop captures were reviewed locally. Materials source and its direct route were retained.

## Shared Community verification candidate

The candidate retains an empty Dashboard and no teaching/material requests. Local paired browser checks use independent Adam/Rizal contexts and disposable API data. Run Lecturer `npm run check`, shared package `npm run check`, Student `npm run check:all` and Portal API `npm run test:community`. No package publication, consumer release pinning, commits, pushes, hosted migration or deployment occurs automatically.

Local evidence and remaining release boundary: [13 October candidate verification](../backend/2026-10-13-community-candidate-verification.md).

Final 13 October local validation: Lecturer lint/TypeScript/build passes; shared 13 unit and 20 browser checks pass; 19 independent Adam/Rizal paired browser checks pass, including active composer focus through directory/profile polling. Stable attachment refs follow Student composition and preserve focus, layers and drafts. The 296px frame and existing approved styling are unchanged. No release or deployment has occurred.

13 October consistency correction: Student and Lecturer use `system/community-resize` for the same desktop grip, width limits and keyboard interaction. Shared `ChatComposer communityInset` preserves Student's existing full-width footer within the 12px conversation inset; Lecturer now uses that same composition. Phone/tablet retain the shared overlay without a resize grip. No additional styling or redesign is introduced.


### Community consistency follow-up — 13 October 2026

Student and Lecturer use shared `CommunityResizeHandle`, width limits and `ChatComposer communityInset`; Lecturer now resizes like Student and its composer matches the established footer spacing. Shared checks pass 14 units/21 browser cases; Lecturer lint/TypeScript/build passes. Student passes 797 units and 277 Chromium cases in the full command, with 46 intentional skips; the one unrelated tablet checkbox case passed unchanged on retry, covering all 278 applicable cases. Full WebKit passes 41 with 31 skips. The full command did not exit zero; no uninterrupted success is claimed. Nine candidate captures and guidance are synchronized, with release pins/publication still awaiting approval.

## Lecturer UI development and verification — owner instruction, 13 October 2026

Before developing Lecturer layouts, compare the complete Student composition and applicable Applicant usage: frame, insets, composer/footer placement, resize handle and width rules, responsive layers, keyboard/focus behavior, drafts and scrolling. Reusing shared imports alone does not establish layout parity. Reuse established shared presentation without additional custom styling; further custom styling requires specific owner approval.

Show the UI result after proportionate focused checks and browser comparisons of the affected behavior. Full-suite verification is on hold for Lecturer only until the owner explicitly resumes it. Do not start an aggregate Lecturer test suite or broad Lecturer browser sweep during this hold. Focused checks, including relevant lint, type/build checks and affected browser interactions, remain permitted.

This hold does not waive Student, design-system or Portal API verification requirements when those repositories are affected. Avoid unrelated suites for Lecturer-only composition work. Separate immediate UI proof from any required broader verification elsewhere and report pending gates accurately. Package publication, released pins, commits, pushes and deployments retain their existing approval boundaries.

### Remaining Lecturer Community composition parity — 13 October 2026

Compare directory, loading/error states, programme/module chat, members, empty/populated direct messages, attachment/composer placement and responsive Back/focus/scroll behavior against Student. The remaining correction reuses Student's centered loading state, avatar-based direct-message empty state, disabled View profile header control and existing scroll fades through additive shared presentation. Empty group chat has no bordered placeholder. Conversation scroll positions are retained through members/DM/Back navigation. Lecturer programme labels remain multi-programme; Student services/meetups and Student-only module-detail routes remain portal-owned. No new styles, Student source changes, API changes or publication are included. Lecturer verification remains focused under the owner's full-suite hold.


### Remaining Community parity verification — 13 October 2026

Shared loading, direct-message empty, disabled profile and conversation-error presentation now uses Student's existing appearance. Opt-in `autoFade` connects the existing shared gradients to Student's 12px scroll thresholds for Lecturer directory, roster and chat; default/controlled behavior remains unchanged. Empty group conversations render no bordered placeholder. Scroll tracking captures the live offset before layer changes, ignores old-layer/detached/loading cleanup and restores the saved position after detail hydration.

Focused local Lecturer checks passed lint and TypeScript/build, desktop directory/group/members/DM comparisons, blank empty group, disabled current-person target, roster overflow fades, DM draft retention through Back and 375/768 overlays, and Escape focus restoration. The short-height desktop group returned to its settled saved 55px offset through members → DM → Back. Temporary drafts were not sent; the existing owner message was preserved. The isolated verification tab was closed and its viewport reset. Dashboard remains empty.

Shared package checks passed 16 units and 25 consumer browser cases, including 375/768/1440 empty-state parity and automatic scroll fades. The latest local candidate was installed in Lecturer only using the installer consumer argument; Student source and its installed reference candidate were left unchanged, so no new Student full run is claimed. Before publication, install the final packed candidate into both consumers and complete their applicable release gates. Lecturer aggregate verification remains on hold under the owner's instruction. No release pinning, publication, commit, push, hosted migration or deployment occurred.


## Modules first milestone - 13 October 2026

Primary navigation now contains Dashboard and Modules; Dashboard remains empty. `/modules` lists assigned exact module offerings by programme. Reuse Student University Policies and Student Documents' existing shared `LinkedList`, including raised clickable rows, icon, chevron, native route links, keyboard focus and narrow-screen description handling. Each row names the module code/title with only the student count beneath it; programme remains the enclosing section heading. Repeated module codes retain separate offering routes.

`/modules/:moduleOfferingId` retains the Modules heading, shared `PagePanelLayout` and standard inset. Student Academic module-detail composition supplies the `ContentBreadcrumb`, code/title `SummaryCard`, panel `ContentSection`, `InnerSection` and read-only `DetailField` overview. Display programme, faculty and assigned lecturers; the Students tab carries the registered-student count. Shared `SegmentedTabs` directly below the summary card contain **Overview** first and **Students** second, following Student Academic module details. Overview is the default; `?tab=students` selects the roster and survives refresh/browser history. Only the selected panel is displayed. A read-only shared `DataTable` lists student avatars/names, Student ID and the exact registration semester; its existing compact cards handle narrow content widths. Overview now includes a shared timetable table below its details. There are no student profile/message actions, term selectors, fabricated credits/outcomes/schedules, new visual components, restyling or custom CSS.

The existing authenticated `GET /v1/meta/community` capability gate and `POST /v1/community/getCommunity` directory provide assignments and memberships. The initial directory-only slice introduced no API/schema change. The owner-approved timetable/roster read below adds `getModuleDetails`; teaching/material RPCs and the record schema remain unchanged. Only module groups containing the signed-in lecturer are projected; exact group membership determines lecturers and deduplicated students. Directory identity must match the session. Unknown/unassigned offering routes use shared unavailable presentation with Back; reads use shared loading, retry and empty states.

Modules owns an in-memory directory reader for the lifetime of its parent route, retaining data across list/detail transitions. Read on entry, window focus and retry; later requests supersede older requests. Reject completions after account/token changes or disposal, and clear the reader on unmount/logout/account change. Community remains independently mounted and retains its existing polling, layer, draft, scroll and responsive host behavior. `/materials` remains directly available and hidden from navigation.

Focused verification: 13 selected Vitest cases pass (ownership, repeated offerings, stale-session/concurrent reads, disposal, identity mismatch/retry and server-rendered shared page states). Lecturer lint and TypeScript/build pass; Vite retains its existing large-chunk warning. Local browser checks cover the clickable list and overview/roster at 375/768/1440px, keyboard activation, Back/direct routes, empty roster, unavailable offering, page bounds and Community draft/layer preservation. Screenshots are local verification artifacts under Student `logs/lecturer-modules/`. Aggregate Lecturer verification remains on hold. No Student/API/design-system source changes, package release/pin changes, commits, pushes, hosted migrations or deployment are included.


Modules owner adjustment (13 October): card descriptions now contain only the student count, and module details use shared Overview/Students tabs below the summary card. Lecturer now loads Student's standard `shadcn/tailwind.css` integration (dev dependency `shadcn` 4.17.0) because shared primitives require its data-state/orientation variants. This is a vendor stylesheet import, with no custom CSS rules or component restyling. The installed 0.7.0 candidate is preserved and the tracked design-system pin remains 0.6.2. Focused Modules tests now pass 15 cases; lint/build and affected tab/card browser checks pass. The existing bundle warning and aggregate verification hold remain.


## Module timetable and enriched roster - 13 October 2026

Owner approved a canonical read-only API addition and existing shared DataTable presentation. Year was explicitly dropped; show only Semester alongside Student ID and avatar/name. `POST /v1/lecturer/getModuleDetails` accepts only `{ moduleOfferingId }`; Lecturer identity comes from the bearer session. It resolves the active Lecturer role/campus and exact teaching assignment with the same canonical eligibility as Community. Unknown/unassigned offerings are unavailable, Student tokens are rejected, and responses carry the lecturer/offering identities for client validation.

Class Schedules supply weekday, exact campus-local start/end minutes, location and inclusive effective dates. Overview presents them in a **Timetable** panel immediately below the overview fields. Columns are Day, Time and Location; online offerings with no physical venue say Online. No schedules means the existing shared empty state, never another offering's timetable.

Student rows retain the exact Module Registration ID. Active eligible enrolments and registered exact-offering registrations supply canonical student number, name/avatar and the owning Study Period's programme semester number. No current-semester shortcut, Year derivation, Student profile/message actions or fallback IDs are introduced. The existing shared Avatar supplies initials when an image is absent, and DataTable owns responsive compact cards. Student source, Community response shapes, shared components and schema 4 are unchanged.

The Modules parent route starts the detail read only for a known assigned offering. It keeps the result through tab switches, refreshes on window focus/retry, aborts superseded/disposed reads, rejects stale session completions and validates both identities. Timetable and Students panels use their existing shared loading, error/retry and empty states. Dashboard issues no module-detail/teaching/material requests.

Verification: Lecturer lint/build and 19 selected tests pass; Portal API 20 canonical/HTTP module-detail checks, 46 Community compatibility checks and local typecheck pass using disposable memory only. The focused browser flow reaches canonical schedules and avatar/ID/semester rows on localhost:5173. Owner explicitly approved restarting in-memory API 8087 and resetting Demo chat/sign-in sessions; Adam was signed back in. Isolated 8088/5185 previews were used first. Lecturer aggregate verification remains on hold; the Vite large-chunk warning remains. OpenAPI and affected canonical/mirror guidance are synchronized. No hosted database/migration, package publication/pin change, commit, push or application deployment is included.

## Default browser mock mode - 13 October 2026

Lecturer defaults to browser mock when VITE_PORTAL_API_URL is absent or blank. The same shared pages render both modes. Configuring a nonblank URL selects HTTP explicitly; unavailable HTTP never falls back to mock. Demo is not Live, and this change adds no CMS/database access to the browser.

Run the usual Vite command from Lecturer: node .\node_modules\vite\bin\vite.js --host 0.0.0.0 --port 5173 --strictPort --force. No local API is needed for mock sign-in, Community or Modules. Existing Adam/Laura Demo credentials remain. To use the paired transport, set VITE_PORTAL_API_URL=http://127.0.0.1:8087 in the launching PowerShell environment or ignored .env.local, start Portal API separately and restart Vite. Hosted packaging requires a nonblank API URL. The current ignored Lecturer .env.local is blank; do not commit it.

The checked-in src/mocks/lecturer-demo.json is generated, never hand-authored. npm run demo:sync uses Student's createPortalRecordGraph and the existing Portal API communityDirectory/lecturerModuleDetails pure projections in a Node-only bundler. Reference time is 2026-10-13T00:00:00.000Z, record schema remains 4. npm run demo:check regenerates and compares all output without replacing the snapshot. Source hashes record provenance; regeneration catches transitive fixture changes too. The generator needs sibling Student and Portal API checkouts and the API-owned esbuild installation; direct Vite startup and browser builds need only the checked-in snapshot. Override STUDENT_PORTAL_ROOT/PORTAL_API_ROOT for differently named checkouts. Only presentation records enter the snapshot: no credentials, server code, SQL or database configuration.

One Lecturer-local data-provider boundary supplies profile, directory/chat and module detail reads. Exact offerings, canonical avatars/IDs/registration semesters, rosters and schedules are reused. Mock chat starts empty and supports local group/DM sends, original-byte attachments/downloads, own-message deletion and marking displayed incoming messages read. Five attachments, 25 MiB per file and 75 MiB per message remain. Safe image previews use temporary URLs, revoked on deletion, logout and disposal. No peer replies/read receipts are invented. There are no paired Student messages in browser mock; shared chat requires both portals to use the same API.

Mock data mutations live in this browser tab's memory, reset on refresh or logout, and survive page/layer/viewport navigation. Persisted sign-in carries a mode, API origin and session generation; legacy, incompatible-mode and changed-API sessions require sign-in again. Logout/account change clears identity state and rejects outstanding reads/sends. Client disposal does not discard another reader's current-session chat state. Dashboard remains empty. The hidden direct /materials desk remains HTTP-only with its existing configuration guidance.

No visual components/styles, Student/API/shared-package source, external API contracts or package pins changed. Focused Lecturer lint/build and 32 selected tests pass; canonical snapshot parity passes. Browser checks cover 375/768/1440 layouts, canonical roster/timetable, keyboard navigation, group/member/DM layers, draft retention, attachment-only send, image lightbox, exact downloaded bytes and own-message deletion. Aggregate Lecturer verification remains on hold. No API restart, release, migration, commit, push or deployment is included.


## Shared cursor integration — 13 October 2026

The approved cursor fix is in the local 0.7.0 shared stylesheet, not a Lecturer override. Enabled Overview/Students tabs and other actions inherit pointer, while disabled controls retain their affordance. Common state/touch/forced-color foundation is also shared. Vite's cached package stylesheet was invalidated through the entry stylesheet so the existing portal received the rule without an API restart or lost Community state. Lecturer aggregate checks remain held.


### Modules enrolment filters and detail simplification — 13 October 2026

Each programme section places shared SegmentedTabs below its programme heading: All modules, With enrolments and No enrolments. With enrolments is selected by default. The directory's exact offering membership supplies the count; filtering never merges repeated module codes or changes Community. The list filter is URL-backed (`?filter=all` / `?filter=no-enrolments`); missing or unknown filter values use With enrolments. A programme with no matching offerings uses the shared subtle EmptyState, while missing assignments retain the established overall empty state.

Module details show Students (N), including zero, beside Overview. Remove the redundant Registered Students overview field. Timetable shows only Day, Time and Location; canonical effective dates remain in the transport/snapshot and are simply omitted from display. Data reads, sessions, API contracts and record schema are unchanged. This is Lecturer-only composition of existing shared components.


Responsive follow-up: the owner approved extending shared SegmentedTabs existing 9rem-per-tab scrolling width from four-or-more tabs to three-or-more tabs. Student Online Forms already uses this shared scroller; no Lecturer-local override or new CSS/width was introduced. Two-tab details keep their existing geometry. Phone keyboard selection reveals all three filter choices. The current Lecturer Vite server alone was restarted with --force to refresh its stale shared-dependency cache; no API restart occurred. Local 375/768/1440 captures are staged separately under design-system/candidates/0.7.0/modules-enrolment-filters.


Final module-filter validation (13 October 2026): Lecturer lint/TypeScript/build and 21 selected tests pass. The shared full check passes 16 units and 29 consumer browser cases, including three-tab scrolling and keyboard reveal at 375/768/1440. Applicant check:all passes 65 units and 70 browser cases. Student check:all passes lint/unit/production/bundle/token/assets, 797 units, 278 Chromium cases (46 intentional skips), and 41 WebKit cases (31 intentional skips). The initial sandbox attempt ran no Student tests because Windows denied temporary-cache renames; the unchanged command passed on the permitted retry. No product assertion was weakened. The actual Lecturer views were checked at 375/768/1440, including All/With/No enrolment filtering (9/1/8 canonical assigned offerings), duplicate offering routes, keyboard selection/link activation, Students (0)/(4), removed overview/date display, roster compact cards and page bounds. Aggregate Lecturer verification remains on hold. Existing large-bundle warnings remain. Tracked package pins are 0.6.2; the local installed 0.7.0 candidate remains unpublished. No API/schema change or API restart, commit, push, migration or deployment occurred.


## Module Materials browser Demo — 13 October 2026

Modules now appends Materials after Overview and Students (N). The shared three-tab scroller, Student teaching-week Accordion and LearningContentRow composition stay inside the existing module frame. Use /modules/:moduleOfferingId?tab=materials and nested materials/new, materials/:materialItemId and materials/:materialItemId/edit routes. Module filters and Community layers, drafts and scroll state remain independent. Dashboard stays empty.

Lecture notes and readings use one file; videos and links use an HTTP(S) URL. Editors compose existing shared fields, DatePicker, DropdownSelect, FileUploadField, ContentBreadcrumb and PageActionBar. Availability is entered in the campus time zone. Save draft is private; Publish validates the saved version and schedules future availability. Editing published content keeps its published snapshot until republished. Working edits survive navigation and failed saves; explicit cancellation confirms unsaved changes and restores the saved draft or published version. Published deletion, unpublishing, submissions and marking are deferred.

Assignment briefs select an existing Faculty assignment assessment. Assessment identity and weight cannot be changed in an existing brief; no assessment creation or reweighting is provided. Selecting an assessment already linked to a brief opens its existing editor, and the provider enforces one brief per assessment. Instructions, brief, deadline and PDF/ZIP accepted formats are lecturer-authored; submission policy remains one file, 50 MiB. Offerings without assignment assessments use explanatory shared empty presentation. Existing quizzes and exams are read-only.

The Node-only npm run demo:sync generator now projects Student canonical teaching weeks, learning items and Faculty assessments for exact assigned offering IDs, including zero-enrolment offerings. It preserves canonical IDs, dates, weights, schema 4 and the 2026-10-13 reference date, with source hashes including scripts/materials-projection.mjs. npm run demo:check verifies snapshot parity. Student/API sources and membership rules are reused unchanged. Missing seed content and original file bytes stay explicitly unavailable; the browser does not fabricate them or import server code, credentials or database modules.

Selected original file bytes remain in browser memory: one resource/brief file, maximum 50 MiB. Safe images and PDFs use the shared preview; other types remain downloadable with the original filename. Replacing, discarding or disposing the session revokes URLs when no saved, working or published version references the file. Pending actions are locked and identity changes reject stale operations. All local mutations reset on refresh/logout/account change and do not reach Student or the API. Community attachment limits remain five files, 25 MiB each and 75 MiB total.

This new flow is browser-mock-only. A configured HTTP session shows shared unavailable presentation linking to the retained HTTP-only /materials desk; it never falls back to mock. The existing HTTP methods, capability gates, transport, public API/OpenAPI and record schema are unchanged. No package pins, shared components or custom CSS change in this milestone. Demo publishing does not complete M3 paired publication, submissions, marking or attendance acceptance.

Focused local verification passes Lecturer lint, TypeScript/build, canonical snapshot parity and 47 tests across module-materials, modules-pages, modules, module-details and mock-lecturer-client. Tests cover exact offering isolation, zero-enrolment seeds, immutable Faculty weights, duplicate/idempotent drafts, publication/scheduling, date/URL validation, files/URL cleanup and stale sessions/HTTP isolation. Browser checks at 375/768/1440 cover shared tab keyboard scrolling, weekly/detail/editor navigation, missing bytes, image/PDF preview, saved/working draft retention, duplicate-brief redirect, cancellation, publication/scheduling and Community layer/draft retention. Image/PDF downloads match selected bytes by SHA-256. Captures are local artifacts under Student logs/lecturer-materials/. The existing Vite large-chunk warning remains. Lecturer aggregate verification stays on hold; no API restart, package publication, commit, push, migration or deployment occurred.


## Materials pills, file cards and publication controls — 14 October 2026

Owner-requested Materials refinements reuse shared Badge success for Published rows and size lg with success/warning for detail status. Each teaching-week header shows a large X/Y Published pill: green only when Y is nonzero and every material is currently Published, otherwise the shared default variant, including 0/0. Scheduled items and saved private drafts count in the total but not the Published numerator. A private revision does not hide the existing Published state; it adds Changes in draft.

Material detail actions are Back to Materials, secondary Edit material/Edit draft and a rightmost primary Publish/Unpublish. Unpublish is now supported in browser Demo, retaining the saved revision or published content/files as a draft; repeat requests are idempotent. Republish retains the existing saved-version validation and future scheduling. Unsaved working changes must be saved or discarded first. Quiz/exam actions remain read-only, and Faculty assessment bindings/weights stay immutable after unpublish. Published deletion, Student submissions and marking are still deferred.

Editors use existing DetailField editableUndivided for all rows, including read-only Faculty weight and submission policy. Redundant File label/value rows and separate preview/download action bars are removed. Existing shared FileUploadField multiple supports resources and assignment brief files with five files per material and 50 MiB per file, as explicitly approved by the owner. Adding files appends, individual removal preserves the other files, and invalid selections preserve current files. This authoring limit does not change Student submission policy: one PDF/ZIP file, maximum 50 MiB.

The additive unpublished 0.7.0 FileUploadField renderFileActions slot places Preview/Download inside each existing uploaded-file card, including read-only detail cards. No portal override or replacement upload component is introduced. Each selected original file retains its filename/bytes and safe image/PDF preview. URL cleanup observes all published, saved and working references, preserving published files during private edits and files during unpublish/republish. Canonical sample filenames without recoverable bytes show explicit unavailability inside their cards.

Lecturer lint/TypeScript/build, canonical demo:check and 50 focused tests pass. Shared check passes 18 units and 32 consumer browser cases, including new per-file keyboard actions/multi-selection/removal at 375/768/1440. Local Lecturer browser checks cover the pills, undivided rows, embedded PDF/image actions, two-file publish/unpublish/republish, exact second-file download bytes and responsive bounds. Existing bundle and consumer build warnings remain. Lecturer aggregate verification is still on hold. Tracked shared pins remain 0.6.2 with a locally installed unpublished 0.7.0 candidate. Lecturer Vite alone was restarted with --force to refresh stale shared dependencies; no API restart, Student/Applicant source change, API/schema change, publication, commit, push, migration or deployment occurred.


## Materials action footer and Add conventions — 14 October 2026

Teaching-week publication pills now use shared Badge size sm. Fully published nonempty weeks stay success green; partial, none, Scheduled-only and 0/0 totals use the plain neutral secondary variant. Detail status pills remain large and color-coded. Add material follows Student resume header actions: shared secondary Button with a leading Plus icon. Use shared AddRowButton with its built-in icon for form rows.

Owner instruction for subsequent UI work: Add actions must use the established shared Add pattern with an icon. Save feedback must always live in PageActionBar, using its existing leading slot, as Student Online Forms does. Lecturer Materials now places Draft saved and save/publish errors in that slot. The shared component owns row placement, responsive wrapping and action alignment; the portal owns status text and workflow. No new component, CSS override or package change is required.

Changed editor content enables the primary Save & Publish action. It validates publication, saves the latest working draft and publishes/schedules that same ID in one action. An unchanged saved draft retains Publish. New-editor validation occurs before the draft is rekeyed so failure preserves its identity, fields and selected files. Failed saves preserve editable work; prior published content remains until a successful replacement. Pending locks and session checks remain, and concurrent retries do not create duplicates. Separate Save draft still supports incomplete private drafts.

Final Lecturer lint/TypeScript/build, demo:check and 53 focused tests pass. Three new cases cover combined save/publication retries, failed save/publication retention, immutable prior publication, scheduling and stale sessions. Focused browser checks verify 20px green/neutral week pills, plus-icon Add action, footer-contained saved/error feedback, enabled Save & Publish after editing and responsive bounds/keyboard behavior at 375/768/1440. Lecturer aggregate verification stays on hold. No shared source change, package publication/pin change, API restart, commit, push, migration or deployment occurs in this follow-up. Existing bundle warning remains.


## Modules roster and material summary refinements — 14 October 2026

Owner supersedes the previous header-Add convention: page Add actions use shared primary Button with a leading Plus icon. Add material now follows it; retain the icon for subsequent Add actions. Editor helper text is only Changes stay private until you publish; remove the availability/time-zone sentence without changing campus-local date/time conversion or scheduling.

Programme filter order is With enrolments, All modules, No enrolments. With enrolments remains the default and existing URL filter values/history are unchanged. Students adds Nationality between Student ID and Semester through the existing shared DataTable and its compact cards. Browser Demo obtains nationality from the same canonical Student Profile referenced by each already-authorized exact roster row. The Node-only roster-projection.mjs enriches existing lecturerModuleDetails output without copying eligibility rules or adding unrelated students. It is included in generator source hashes and demo:sync/demo:check. Schema 4 is unchanged. Current HTTP responses do not expose nationality; the backwards-compatible optional local decoder renders Not available rather than inventing a value. No public API/OpenAPI or server source change is made.

Material detail headers now use shared SummaryCard inside ContentSection's existing custom-heading/plain composition. Published uses success colour; Scheduled/Draft uses warning. The material title, type and large status pill remain in that summary. File cards now sit inside a standard read-only DetailField value in the existing bordered details section, preserving each in-card Preview/Download, original filenames/bytes and explicit unavailable seed bytes. No new shared props/components, component extraction, custom CSS, package change or portal override is introduced.

Focused checks pass Lecturer lint/TypeScript/build, canonical demo:check, 54 selected Vitest cases and two Node-only roster projection tests. Coverage includes enrolled-first tab order, missing/malformed HTTP nationality, canonical value retention, exact roster isolation and unchanged input records. Browser checks cover 375/768/1440 primary Add with icon, first/default filter, nationality/table compact cards, Published/Scheduled/Draft summary colours, file-card placement/actions, editor helper text and viewport bounds. Aggregate Lecturer verification stays on hold; the existing bundle warning remains. No Student/API/shared-component source changes, package pin/publication change, API restart, commit, push, migration or deployment.


## Read-only file container refinement - 14 October 2026

FileUploadField now omits the outer dashed upload border, padding and minimum upload-container height when readOnly is true. It retains each existing file card, filename, size, empty/error text, accessible labelling and optional per-file Preview/Download actions. Editable and disabled-editable uploads keep their existing upload container. This owner-requested rule belongs to the shared component; no Lecturer override or new prop is added. The package fixture at ?files&readonly demonstrates it without portal CSS. It applies to read-only consumers of the new candidate; existing Student/Applicant installed packages are not upgraded by this task. Released pins/publication remain unchanged.

Verified 14 October 2026: shared npm run check passed (18 unit tests and 32 Chromium consumer browser cases); Lecturer lint and TypeScript/build passed. Browser checks at 375, 768 and 1440px retained file cards and Preview/Download controls with no horizontal overflow. Keyboard Preview activation passed. Lecturer read-only border/padding measured 0px/0px; editable remained 1px/16px. Only Lecturer local installed candidate was refreshed; released pins remain 0.6.2. No API restart or publication. Lecturer aggregate verification remains on hold.


## Released shared 0.7.0 adoption - 14 October 2026

The owner published @raisd-campus/design-system 0.7.0 directly to GitHub Packages after hosted Actions were blocked by billing. Fresh registry metadata matches the verified release archive from shared source commit e1ddc3738c5d5b27447e1c8ae9e45719547b13a3 and tag v0.7.0. Student, Applicant and Lecturer now pin exactly 0.7.0 in their manifests and lockfiles and install the registry release; all 260 installed package files match the tested archive. Only the shared dependency entry changes; unrelated dependency pins and existing uncommitted source work are preserved. The released package includes shared Community presentation, portal-neutral patterns and global control rules, three-tab responsive scrolling, per-file action slots and frame-free read-only file fields. Save feedback remains in PageActionBar.leading; header Add actions use a primary button with its leading icon. The previous candidate/publication-pending notes describe historical preparation, not the current installed version. The three existing portal Vite servers were restarted on 5173/5174/5175 to release Windows native-module locks and activate the installed release. API/data contracts and persistence do not change. Lecturer aggregate verification remains on hold. No portal deployment, API restart or migration is included.


## Released-package verification - 14 October 2026

Student npm run check:all passed against the registry-installed 0.7.0: token/assets/lint, 797 unit tests, TypeScript/build, production exclusion and bundle budgets, 278 Chromium cases with 46 intentional skips, and 41 WebKit cases with 31 intentional skips. The unchanged browser suites used PLAYWRIGHT_WORKERS=1 and the existing CI=true unit budget. Applicant npm run check:all passed on the complete unchanged rerun: 65 unit/component tests and 70 browser cases. The first Applicant run passed 69 browser cases but missed the phone navigation action in the save/retry case; the existing leave-application suite subsequently passed 14 cases across all seven browser/viewport projects before the clean full-gate rerun. No source or test assertions changed for retries. Lecturer lint, canonical demo:check, TypeScript/build, 54 focused Vitest cases and two Node roster-projection cases passed; its aggregate gate remains held. Browser checks at actual 375/768/1440 widths confirmed Lecturer Materials, pointer cursors on all three tabs and contained file details; Applicant read-only file presentation also remained within those bounds. The package receipt and all 260 installed files match the verified published archive in every portal. Only the root shared pin and its package entry differ from each pre-upgrade lockfile; unrelated pins and source work remain. Both local catalogue copies validate all 188 captures, preserving historical provenance and adding 18 reviewed shared captures. Canonical guidance and affected mirrors are identical. The existing Vite/colour, jsdom Window.open and Applicant/Lecturer chunk-size advisories remain. npm reported existing audit findings (Student 15, Applicant one, Lecturer six); no dependency fixes were applied outside the approved pin update. The three local Vite servers respond HTTP 200 on their original ports. Portal edits and broader pre-existing documentation work remain local and uncommitted. Release-only catalogue sources and minimal versioned guidance were published from clean isolated checkouts, preserving newer remote changes and the current docs.raisd.co site chrome. Canonical catalogue commit a646104d96469fe6ff15bb62187f12c2cb6b921f and public mirror commit 7485fa9566f526095b8dea0292b2eca39737334e are pushed. The live docs host still reports catalogue 0.6.2; its 25-file static promotion is prepared separately and has not been performed under the existing no-deployment boundary. No portal deployment, API restart or migration is claimed.


## Reusable Materials connected memory Demo — 14 October 2026

The approved connected increment now provides This class / Reusable module plan inside the existing Materials tab. Assigned lecturers save drafts; lead lecturers publish immutable module plans with teaching week/day/campus-local time and relative assignment deadlines. Future classes inherit automatically, while active classes pin the version published by class start. Existing class seeds/dates remain. Active resource corrections preserve content/files/authorship/reason and notify Student; assignment requirements and status lock at class start, and completed classes are read-only. The lock is a Demo rule pending campus policy confirmation.

See [connected reusable Materials](../backend/reusable-materials.md) for capabilities, Faculty-owned definition keys, missing setup, optimistic/retry controls, bounded original file transfer, persistence and verification. Connected drafts/files live in the shared API process; only unsaved working state/previews are browser-local. Refresh/logout does not erase shared saved content; API restart does. Independent browser mock remains the default with no API URL. Configured HTTP requires version 1 capability and never falls back. Legacy desk publication is blocked when enabled. Existing shared components and released pins stay unchanged; Dashboard stays empty and Community/filter state remains independent. Activation, production storage and Faculty exception approvals are separate work.


Owner-approved Keychain follow-up (14 October 2026): render the existing widget only on sign-in; remove it from the authenticated shell. This keeps modal Preview/Community Close controls unobstructed without new styling or shared-package changes. This instruction applies to the Student and Lecturer flows in this increment.


## Read-only Materials with teaching-week release — 14 October 2026

Lecturer Materials is now read-only in browser mock and HTTP modes. Remove the separate plan/class selector and all authoring/publication/file-modification controls; retain one module Materials list, weekly accordion, status/details/history and referenced original-file access. Old editor/new/scope links normalize; the legacy desk redirects to Modules. HTTP writes are forbidden server-side, and private drafts are excluded from reads. Content unlocks automatically at configured teaching-week start, 00:00 campus time. Version/calendar machinery remains internal for future admin ownership; no admin setup or new version-writing API is built. See [current read-only rules](../backend/reusable-materials.md). This revision supersedes the earlier Lecturer authoring milestones. Dashboard/Community/filter state, shared components and package pins are preserved.


## Materials detail action divider - 15 October 2026

Materials resource and assessment detail footers use the released PageActionBar edgeToEdge option in both connected and browser mock views, extending the top divider to the module panel edges while retaining button alignment. No shared component change or custom styling is needed. Testing is deferred at the owner's request.

</details>

## Complete Materials details — 15 October 2026, unverified

All read-only material detail types use shared SummaryCard, ContentSection, InnerSection,
DetailField and FileUploadField for description, teaching week/topic, instructions,
publisher and last update. Missing metadata displays “Not provided”. Assignment fields
continue to use recorded Faculty assessment/weight, deadline and submission policy;
video/link URLs remain type-specific. Per-file source is explicit API metadata:
“Demo sample”, “Uploaded file”, or “Not provided”. No filename-based source inference,
invented descriptions/instructions/authors or release-date-as-publication fallback.
Published history remains available with the same missing-value policy. HTTP and
independent browser mock details share the presentation; mock files remain unavailable
without actual bytes. Read-only access and released package pins are unchanged.
See [metadata rules](../backend/reusable-materials.md). Tests/builds/browser checks and
the current API restart are deferred at the owner's request.

## Upstream integration verification — 16 October 2026

The current Classrooms/Materials source publication integrates upstream SSO/email
login with explicit Demo identity binding and a single StrictMode code exchange.
See the [campus integration receipt](student-portal/audits/2026-10-16-campus-integration-publication.md)
for per-repository gates, canonical mirrors and Jenkins/Argo delivery boundaries.
No manual hosted rollout or local user-service reset is included.

## Admissions pending action projection — 22 October 2026

Admin directory, compact list, summary and status scopes consume Control-owned `decision.display.status`, representing the **current pending action**. After Eligibility Letter release this is **Awaiting Applicant Confirmation** (amber), with **Confirm Eligibility · Applicant** next. Confirmation advances to **Awaiting Bursary Review / Registration Fee**. The completed review remains **Eligibility Letter Released** in progress/history. Both portals share this API projection; Staff does not infer labels from raw approved state. Pending QA scopes stay first and All stays last; shared Badge supplies colors.


0.18.2 verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Six Staff Chromium/WebKit cases at 375/768/1440px verify side-by-side columns, wrapped long pills, right-aligned text, contained scrolling and accessibility; two Control summary/list cases passed. Staff adds a screen-reader-only details heading so hiding the summary does not skip heading levels. All 293 installed package files in each portal match the verified registry archive. Three refreshed list captures and both catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


0.18.3 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Eight focused Chromium/WebKit portal cases verify left-aligned entry names, right-aligned wrapping statuses, transparent/unpadded summary/list statuses, selected navigation and accessibility. All 293 installed package files in each portal match the verified registry archive. Six affected captures and both 250-capture catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


Cross-portal breadcrumb verification (0.18.4): shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff/Lecturer lint, 94 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Applicant lint, three focused header unit cases, type/production build and production-exclusion check passed (its existing unused-variable warning remains). Student lint, 15 focused breadcrumb/route unit cases, type/production build and production-exclusion checks passed. Student bundle budgets passed unchanged: eager JavaScript 194164 gzip bytes against 196608; largest chunk 373077 bytes.

All 25 focused Chromium/WebKit portal cases passed: Applicant four, Student five (1280/1440 Chromium and phone/tablet/desktop WebKit), Staff six, Lecturer four and Control six. Coverage includes parent navigation, selected programme/semester scope, mobile overflow, keyboard/Escape, unsaved application/flow guards and unavailable teaching details. Test-only selectors were scoped to the header and menu dismissal was awaited; unrelated inner breadcrumbs remain intact. All 296 installed files in each of four portals match the verified 0.18.4 registry archive. Nine affected captures and both 253-capture catalogue mirrors validate. Focused portal checks were used under the owner-approved fast workflow; no full Student/Applicant regression-suite claim is made.

Only Applicant, Student, Staff and Control frontends restarted. APIs, SSO, Keychain, Docker, identities, applications, drafts and policies were not reset or migrated. No hosted deployment, commit or push occurred.


Shared 0.18.5 mutes the active AdminTable pagination page through the existing secondary Button variant. Page labels, keyboard/focus, disabled states and current-page semantics are unchanged. Staff and Control adopt the same patch without portal CSS overrides or data/workflow changes.

Academic schema mirrors are checked with `node scripts/sync-academic-contract.mjs --check` in lecturer-portal; regenerate with the same command without `--check`. This development-only helper has no cross-repository runtime import.

Academic tabs consistently include a visible ContentSection heading. Table tabs use the documented no-inset panel content, with a standard-inset heading above the flush AdminTable. Empty history and unconfigured-semester views use shared EmptyState. Create and Add actions include a leading Plus icon. Faculty, Programme and Module record pickers stack the code in muted label typography above the linked name; search still matches both fields. These are Staff compositions of existing released components, with no shared package or workflow change.
