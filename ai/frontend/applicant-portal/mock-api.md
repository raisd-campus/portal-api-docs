# Applicant mock Portal API

## Status and boundaries

The existing application and reviewer-message journeys use a validated, session-only `ApplicantPortalApi`. Shared UI remains pinned to **0.6.2**. No Applicant HTTP adapter, authentication, offers, production reviewer controls, durable file store or database integration is implemented. Separate browsers do not share records. Refresh reconstructs the session, selects Fresh and drops user changes, files and message drafts; development scenarios initialize their fixtures on demand.

Lesotho is the first acceptance pilot. Current Malaysian/Cyberjaya sample catalogue, fees and medical exceptions are retained as sample content; they are not new Lesotho admissions policy.

## Implementation and ownership

| Layer | Applicant source | Responsibility |
| --- | --- | --- |
| Serializable contracts | `src/contracts/applicant.ts`, `study-catalogue.ts` | Zod metadata, calendar dates, snapshots, messages, revisions; no React or browser File objects |
| API | `src/services/applicant-api.ts` | Applicant/person ownership, atomic writes, generation/revision checks, idempotency, immutable submissions |
| Validation | `src/services/applicant-validation.ts`, `evidence-rules.ts` | Step and whole-submission requirements, canonical evidence applicability |
| Runtime and queries | `src/services/applicant-runtime.tsx` | One QueryClient; isolated adapter/resources per scenario, generation-scoped queries and invalidation |
| File resources | `src/services/session-assets.ts` | Original File objects, opaque metadata IDs, cached image URLs and cleanup |
| Fields | `src/services/validation-fields.tsx` | Shared error/invalid/accessibility props, repeated-section error scope, selection validation; no styling overrides |
| Handoff | `src/services/admissions-handoff.ts` | Accepted-only version-1 exchange producer; submission alone does not enrol a student |

Editor fields are local drafts. API-owned saved applications and conversations are independent of those drafts. Screens do not import record fixtures. Message drafts and prepared attachments remain portal-owned, isolated by scenario, application and sender, across navigation and scenario changes. Reading visibly displayed reviewer rows affects unread state only; an applicant reply satisfies the response requirement without approving evidence or advancing the review stage. Submission starts with an empty conversation; only explicit Admin Actions messages create reviewer updates. Read-only submitted fields have no edit/remove/replace actions.

## Implemented mock methods (not HTTP endpoints)

| Method | Input | Result |
| --- | --- | --- |
| `getStudyCatalogue` | none | Validated existing sample catalogue with stable course IDs and creative/postgraduate metadata |
| `getApplications` | none | Owned applications |
| `getApplication` | application ID | Owned application or unavailable error |
| `saveApplicationDraft` | ID, expected revision, request ID, snapshot | Incomplete draft permitted; completion derived from validation |
| `submitApplication` | Same command | Validated immutable snapshot, submission date, empty conversation |
| `getConversation` | application ID | Owned messages |
| `sendApplicationMessage` | ID, expected revision, request ID, text, evidence metadata | Text, attachment-only or combined reply; new revision |
| `markApplicationRead` | ID, displayed reviewer sequence | Unread watermark; response requirement unchanged |
| `acceptApplicationEnrolment` | ID, expected revision, request ID | Approved, verified application becomes accepted; stable acceptance context outside its immutable snapshot |

Every private read/write verifies the owning applicant and person. Writes prepare and validate a candidate before the asynchronous commit, then reject changed revisions/sessions. Repeated identical request IDs return their original result; a different payload reusing a request ID is rejected. Submitted records cannot return to draft or submit again. Failed writes retain records and UI drafts for retry. Ownership checks in this mock are behavioural tests, not server authentication or a security boundary.

## Validation matrix

| Area | Required | Optional and conditional rules |
| --- | --- | --- |
| Consent | Explicit acceptance | Stored completion flags do not bypass validation |
| Preferences | Student/applicant type and complete first intake/faculty/course | Second/third may be blank; supplied choices must be complete, available and distinct. Intake/faculty changes clear dependent choices |
| Personal | All visible general fields, both addresses, both guardian contacts, emergency name/phone/email/relationship, race, religion, disability answer | Custom religion and disability explanation required when selected; identifiers follow visible conditions. Citizenship/student type must agree for the Malaysian sample |
| Academic | At least one completed qualification: matching type/name, institution, education country, start/completion dates, result, transcript and certificate | Field of Study optional. Whole English section optional; populated records require name/date/score, valid chronology; expiry/certificate optional. No grade/English-score eligibility threshold is invented |
| Evidence | Photo; MyKad for local or passport for international | Creative programme portfolio, CV at age 25+, postgraduate recommendation, transfer documents, Iranian eligibility and WASSCE scratch card. International medical report unless examination country is India/Sri Lanka (clinic submission). Passport valid for 12 months from submission |
| Payment | Bank reference and proof | No proof in the preparation checklist |
| Format | Trimmed text, usable email/phone, real calendar dates, chronological ranges | DOB in past; completed qualifications/exams not in future. Age computed at submission date from DOB and programme flags use catalogue metadata, not programme names |
| Files | Allowed selector extension, nonempty, at most 25 MiB/file | Photo JPG/JPEG/PNG; passport PDF; general evidence PDF/DOC/JPG/JPEG/PNG; medical/eligibility/scratch/visa and payment PDF/JPG/JPEG/PNG. Metadata/extension validation does not inspect document contents |
| Messages | Text or attachments; max 10,000 text characters | At most five different files, 25 MiB each, 75 MiB total; JPEG/PNG/GIF/WebP previews only |

Validation errors appear only beside their fields, using the documented shared error/invalid slots and field-local accessible descriptions; there is no page-wide validation summary. Failed validation focuses the first visible invalid control, including the upload button rather than its hidden file input. Save/API failures remain retryable and appear by the action buttons. Continue validates its current step. Submission validates the complete snapshot again before and after confirmation. Draft saves permit missing required information but reject malformed serializable values and invalid file metadata. Inapplicable evidence and hidden explanations are removed from the submitted snapshot. Checklist answers only prepare guidance; application submission rules are independently derived from submitted data through the same evidence predicate.

## Verification

`npm run check:all` runs lint, Vitest/Testing Library, TypeScript/build and Playwright Chromium at 375/768/1024/1280/1440 plus focused phone/tablet WebKit. Tests cover validation boundaries, dependent choices, partial drafts, immutable submissions, ownership, stale/concurrent writes, idempotency, failures/retries, accepted handoff, message drafts/replies/resources and refresh reset. Axe checks the submitted page. Desktop emulation does not establish physical-iPhone keyboard/zoom behaviour or backend integration.

The exchange specification and backend deployment prerequisites are in [Admissions handoff](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/admissions-handoff.md).

## Development-only review adapter

`MockApplicantPortalApi.runDevelopmentAction` is deliberately absent from `ApplicantPortalApi`. A DEV guard and conditional dynamic import exclude its implementation from production. Serializable commands are Zod-validated and reuse owned, atomic revision/session/idempotency guarded writes:

| Command | Requirements | Result |
| --- | --- | --- |
| `verify-payment` | Owned submitted application, unverified payment, payment reference and proof | `verification.paymentVerifiedAt`; review stage documents; response/read state unchanged |
| `verify-documents` | Owned submitted application, verified payment, submission-date validation succeeds | `verification.documentsVerifiedAt`, approved; immutable snapshot preserved |
| `reviewer-message` | Owned submitted, non-approved application; text or permitted attachments | Reviewer message, action-required; original read/reply watermarks preserved |

`verification` contains nullable ISO payment/document verification timestamps. Legacy records without that object normalize to both null. It belongs to the application review record, not the accepted admissions snapshot; handoff version 1 and Student schema version 4 stay unchanged. Approved and accepted conversations reject writes by both roles; only applicant viewing advances its unread watermark. The reviewer page cannot acknowledge on the applicant's behalf. No rejection, offer, reviewer authentication or future HTTP endpoint is implied.

`src/dev/scenarios.ts` owns exactly three development fixtures, loaded through the runtime rather than imported by application screens. Synthetic files are created and registered in the selected browser resource adapter. The saved-draft fixture has all six validated steps complete; the approved fixture has both verified checks, an empty conversation and no acceptance yet. Each scenario owns a stable applicant/person pair. Switching invalidates the departing adapter generation, cancels its queries and scopes newly fetched data by scenario/epoch. Its records, checklist state and applicant/reviewer drafts remain available on return. Session teardown revokes every scenario's owned URLs and drops file resources. Production excludes fixtures and admin navigation via bundle verification.

The Admin page selects the latest submitted record (or latest draft/empty state), never a foreign scenario record. It composes existing SummaryCard and chat APIs at shared 0.6.1 with no source or styling changes. Review failures leave records/drafts intact for retry. Production sign-in, authorized reviewer identity and persistent evidence/notifications remain future integration work.

## Enrolment acceptance and next-login simulation — 6 October 2026

The approved first preference is the enrolment choice in this mock phase. **Confirm and Accept Enrolment** opens the released shared Popup showing Intake, Faculty and Programme. Cancel changes nothing; confirm calls the guarded API and records **Enrolment Accepted**. In development mock sessions, successful acceptance automatically signs out and shows the existing **Sign in** screen. The applicant must click Sign in to open Student Portal in its existing new-tab handoff; no automatic sign-in or tab opening occurs. The popup explains: “Once you accept, you’ll be signed out. Sign in again to continue in Student Portal and register your modules.” Pending confirmation disables duplicate actions and dismissal. A failed write retains the popup and permits retry. Acceptance does not change submitted fields or acknowledge messages. Approved and accepted chats remain read-only.

Acceptance records nullable `acceptance` metadata (accepted context plus `demo` catalogue context) separately from the submitted snapshot. It requires ownership, current session/revision, both verified checks and the approved state. Duplicate identical request IDs reuse the original result; different repeated writes fail. Stable person/profile/enrolment references are derived from the owned application. Approval alone is not acceptance.

The canonical version-1 descriptor in `contracts/demo-admissions.ts` has independent portal copies. The single demo choice is Faculty of Design Innovation / Bachelor of Design (Hons) Professional Design (Visual Communication), programme version `programme-version-bdes-vc-2025`, using Student's first-semester curriculum. Its intake starts six campus-calendar days after the reference date captured when the scenario API is created. Acceptance carries that reference and exact intake date; time passing or switching scenarios cannot change them. Creative-programme portfolio evidence is required. This remains Cyberjaya sample content, not Lesotho policy.

Development logout retains the selected scenario records, resources, checklist and message drafts. `/dev/sign-in` starts a new Student tab for its latest accepted application; unaccepted applicants return to Applicant. Configure `VITE_STUDENT_PORTAL_URL` (default `http://localhost:5174`) and Student's reciprocal `VITE_APPLICANT_PORTAL_URL` (default `http://localhost:5173`). Origins must match the running services exactly. The one-time message exchange checks origin, sending window, nonce and strict versioned payload; no applicant data appears in URLs and no persistent browser storage is used. Blocked windows, unavailable Student and transfer errors retain Applicant data and allow another sign-in attempt. A consumed delivery cannot replay silently. Refresh resets this demo session.

Routes, fixtures, transfer sender and login simulation are excluded from production builds and disabled with `VITE_PORTAL_API_URL`. The normal acceptance operation is an in-process mock method, not an HTTP endpoint. There are no real credentials, offers, CMS provisioning or durable file transfer. Original File objects stay in Applicant; the handoff carries serializable evidence metadata only.

`npm run test:handoff` is a separate two-checkout browser gate (sibling Student checkout required), covering popup/cancel, acceptance, logout/relogin, both portal dates, isolated account creation, existing module selection/registration and refresh reset across the seven configured Chromium/WebKit projects. Run it after each portal's independent `npm run check:all`; do not run Applicant browser gates concurrently because they share a dev-server port.

Validation labels are compared case-insensitively for equivalent display labels (Country Of/of Citizenship, Date Of/of Birth, Place Of/of Birth, Country Of/of Education), retaining repeated-section scope. Required citizenship still blocks Continue and focuses an accessible inline invalid field. No page-wide error list is added.

### Automatic post-acceptance logout — 6 October 2026

Saved acceptance and logout have separate error boundaries. If logout fails, the summary retains Enrolment Accepted and presents **Retry Sign Out**; retry invokes logout only, never the acceptance API again. While logging out, the status is Signing out and repeat controls are unavailable. The session adapter checks its captured owner/generation before and after query cancellation, then invalidates the session and marks it signed out. Cancellation failures retain the current session/records/resources so retry remains possible. Scenario changes invalidate stale callbacks and cannot sign out a different applicant.

The post-save transition exists only in development mock sessions without `VITE_PORTAL_API_URL`. It navigates to `/dev/sign-in` with synchronous route-state commit. Records, checklist and drafts remain in memory; refresh still resets them. The existing one-time Student transport, accepted contract, schema versions and module-registration behaviour are unchanged.

Both Applicant browser gates use `vite.e2e.config.ts` to disable HMR/file watching for deterministic session fixtures, following Student. Normal development configuration is unchanged; explicit navigation/refresh still resets sessions as tested.

## Leave popup draft saving — 6 October 2026

Save & Close uses existing saveApplicationDraft with incomplete data, ownership/revision/session guards and the same File-resource adapter. The popup disables save/discard/dismiss while pending and retains typed values and file resources on failure. Successful save continues the originally blocked destination. A synchronous in-flight guard prevents duplicate activation; stale session or unmounted completions do not navigate. Shared Popup 0.6.2 supplies footerAfterDismiss; workflow stays Applicant-owned.
