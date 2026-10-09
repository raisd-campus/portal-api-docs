# Accepted admissions handoff and Student schema v4

## Status

Applicant produces a serializable version-2 letter-confirmed handoff, retaining explicit v1 legacy compatibility; Student validates and maps it into an existing, explicitly accepted person/profile/enrolment. This is a tested local mock boundary, not a running shared backend. Application submission does not create a Student record or enrolment. Authentication, offers, Registry reconciliation, Live persistence and new campus policies remain future work.

The canonical contract is `docs/ai/contracts/admissions.ts`, with `contracts/fixtures/admissions-handoff-v1.json`. Identical independently owned copies are kept in each portal and the public documentation mirror. No runtime source imports connect the portals. Applicant producer tests and Student consumer tests share the golden fixture. The application contains no browser File objects or blob URLs in its serialized contract.

## Version 1 exchange

- Stable `applicationId`, `applicantId`, `personId`, ISO `submittedAt`, complete immutable submitted snapshot and evidence metadata (`id`, `name`, `sizeBytes`, `mimeType`).
- Explicit `acceptedContext`: `status: accepted`, Registry acceptance reference/time, matching person ID, existing Student Profile ID and Programme Enrolment ID. Acceptance cannot precede submission. Accepted snapshots require complete/distinct supplied preferences, uniquely identified repeated academic records, chronological dates, payment proof/reference and photo. The optional English section is an empty array when omitted; populated English results must be complete, so the consumer never silently drops partial records. Custom religion is required when selected.
- The accepted context is supplied by the future admissions owner, never synthesized by clicking Submit. Student checks that the profile/person and enrolment already agree. Official identifier conflicts require Registry reconciliation; the mapper never rewrites identifier history or visa links.
- Student retains the complete handoff as immutable `studentProfiles.admissionSnapshot`, with `admissionApplicationId`. Re-importing the same exchange is idempotent; altered data using the same application ID or another application for an already imported profile is rejected.

## Mapping and profile ownership

| Applicant | Student |
| --- | --- |
| Person and identity | Existing Person and Student Profile; preserve student number, identifiers, all enrolments and visa relationships |
| General/contact/address | Personal Profile; preserve country codes in the immutable snapshot, project address, education and passport country labels for the established Student fields |
| Religion/custom religion | Official read-only profile fields |
| Guardians and emergency relationship | Editable Personal fields and canonical Emergency Contact records |
| Disability answer/details | Editable Personal fields; details required when answered yes |
| Repeated qualifications and English records | Student-owned canonical collections with application/record composite IDs; preserve existing translation/grading-scale evidence; optional fields/certificates remain null |
| Photo/passport/academic evidence | Referenced once by their owning profile/qualification records; Documents library projects those records |
| Applicable other admissions evidence | Student Document records; no second copy of academic/identity records |
| Payment proof | Remains Finance-owned; excluded from Student profile document records |
| Application conversation | Remains application-owned; excluded from Student profile documents |

`mapAdmissionsHandoff` is a pure, atomic candidate mapper. `MockPortalApi.fromAcceptedAdmissions` is a mock fixture boundary scoped to an existing student scenario; it is not a Student HTTP method. Profile edits update canonical records and saved profile overlay together, invalidate all scoped Personal/Community/Forms caches (the canonical record graph is updated directly), and never change the retained handoff. Scenarios remain isolated.

## Schema version 4 compatibility

Student's `PORTAL_RECORD_SCHEMA_VERSION` is **4**. New religion, guardian, disability, passport-number and admissions provenance fields normalize legacy omissions to explicit null through Zod defaults; old Emergency Contact responses normalize omitted relationship to null. Old profile overlays are parsed on read. Canonical-owned v4 fields take precedence even when a legacy overlay already contains normalized nulls; existing editable contact/address overlays remain compatible. Accepted official identity fields, including passport expiry and issuing country, project from the accepted canonical record rather than historical visa values; existing visa records and relationships remain unchanged. Genuinely unrecorded legacy values remain null. Legacy update payloads may omit the new guardian/disability fields without erasing them. Explicit null remains a deliberate clear operation, and choosing no clears obsolete disability details. Optional English certificates and absent local passport scans may be null. Backend-facing mock-engine fields remain unchanged (`recordGraph`, `recordGraphParser`, `personalProfile`, `writeRevision` and existing resource stores).

OpenAPI documents actual `fullName`, `id`, `emailAddress` and nullable `relationship` emergency input, the new editable payload and profile responses, plus Applicant Demo HTTP (`/v1/auth/applicant/login`, `/v1/applicant/:method`).

## Backend deployment (schema v4 + Applicant Demo HTTP — 7 October 2026)

The Portal API RecordStore compares its stored schema version with Student's exported version and automatically reseeds canonical record tables on a mismatch. Saved profile-state overlays and audit events survive that reset. Hosted Demo was upgraded to schema **4** with a Neon backup taken before deploy; Applicant Demo methods were added on the same service (`/v1/auth/applicant/login`, `/v1/applicant/:method`). Live CMS admissions, durable evidence bytes and operational Registry acceptance remain future work.

## Verification boundaries

Producer/consumer tests verify accepted context, identity, evidence/field preservation, immutable provenance, repeat import, older omissions/nulls, student isolation and atomic profile saves. Both portal gates verify their local adapters. Hosted HTTP, durable uploads, physical devices and operational Registry acceptance remain unverified.

## Development browser handoff — 6 October 2026

The existing accepted-context mapper remains scoped to an existing profile. A separate **development-only** `MockPortalApi.fromBrowserAdmissions` boundary now bootstraps a new isolated Person, Student Profile, demo account and Programme Enrolment before invoking that mapper. Approval does not bootstrap anything; Applicant's explicit enrolment acceptance is required. Stable IDs are owned by the application/person and collisions are rejected rather than overwriting a demo student.

The browser envelope is version 1 (`contracts/browser-admissions-transfer.ts`); admissions handoff stays version 1 and Student graph stays schema 4. It carries the accepted handoff and validated version-1 demo context from `contracts/demo-admissions.ts`: campus, Design programme version, first-semester intake and captured reference time. First preference must agree with the descriptor and intake starts six campus days after its reference. Independent portal copies and golden fixtures are checked for drift; no cross-repository runtime imports.

Applicant sends through one-time `postMessage` after the opened Student window announces readiness. Both sides require the configured reciprocal origin, exact source window, a random 128-bit nonce and strict payload. URLs contain only the transfer nonce. Student rejects consumed nonces, unavailable senders, malformed payloads and stale receiver/session generations. Listener/timer cleanup and bounded timeout permit retry from Applicant on failures. Refresh returns Student to sign-in and loses demo state; this is neither replayable persistent authentication nor a running shared backend.

Bootstrap reuses the existing first-semester Design curriculum, offerings, fees and timetable at the captured reference date. Student-owned period, history, account and profile identifiers are remapped. Identity, contacts, academic records and applicable evidence metadata come from the accepted snapshot. No existing demo student is overwritten. No registrations, results, assignments, historical conversations, invoices, payments, visa records or eVAL approval are inherited. V1/v2 transfers preserve evidence metadata; development envelope v3 additionally delivers available owned evidence bytes into temporary resources. Missing resources remain unavailable. Payment proof remains Finance-owned.

The receiver enters **Module Registration** with no registered modules; the existing first-semester prescribed draft load remains visible. Existing credit, fee, clash and international eVAL checks apply. An international transferred applicant starts without eVAL clearance and must follow the existing Immigration workflow. Login receiver/bootstrap and sender fixtures are absent from production builds and disabled for HTTP-backed sessions. No HTTP methods, database migration, hosted deployment or real Registry provisioner are introduced.

Verification separates local mock/transport behaviour, published HTTP schema compatibility and physical-device/backend integration. Passing the local checks does not establish the latter two.

Applicant now automatically signs out after successful acceptance in development mock sessions. The applicant explicitly clicks Sign in to initiate this existing new-tab exchange. Failed logout retains accepted data and can be retried without accepting again; session/scenario guards prevent stale transitions. HTTP sessions and production exclude the simulation. No transport, acceptance contract, Student bootstrap or schema version change accompanies this timing refinement.

## Campus selection and issued letters — 7 October 2026

Current local mock workflow supersedes the earlier one-confirmation acceptance increment. Shared UI stays at 0.6.2. Hosted Applicant Demo HTTP authentication remains intact. The incoming 9 October backend documentation reports ten RPC methods, including Eligibility confirmation and final acceptance, with automatic Demo Offer release. This frontend checkout still explicitly gates hosted confirmation/acceptance; enabling and verifying that frontend parity is separate work. Staff-owned Offer release, durable authorized Student file delivery and Live CMS writes remain pending. This local increment does not alter Portal API service code or database records.

Step 2 requires Campus (Lesotho, Cyberjaya, Botswana, Eswatini, Sierra Leone, Cambodia, Uganda, Namibia). Alumni additionally requires a trimmed Previous Student ID. A campus change clears dependent preferences. Drafts remain saveable when incomplete. English Language Results are optional for every sample programme; populated rows must be valid. All eight campuses expose the existing Design curriculum as **demo content**, not verified campus offerings, fees or admissions policy. Selected campus metadata and frozen intake reference are retained through acceptance and Student bootstrap.

Payment Proof is reviewed by **Bursary**; Document Check by **Quality Assurance**. QA Verify Documents validates the submitted snapshot and atomically releases a generated **Eligibility Letter** PDF. The applicant's **Confirm and Continue Enrolment** popup shows the intake, faculty and programme and preview/download actions. Confirmation records intent without logout or Student provisioning. Registry's **Release Offer Letter** is enabled only afterwards. The final **Accept Enrolment** popup previews/downloads that Offer Letter. Only successful final acceptance triggers automatic logout; the applicant clicks Sign in to open the existing Student tab. Cancel changes nothing. Saving disables confirmation and dismissal; failure retains data and allows retry. Logout failure can be retried independently of acceptance. All writes retain ownership, revision, session and request-id guards.

Generated PDFs are prominently labelled DEMO, not official university letters, and contain the application reference, applicant, campus, intake, faculty, programme and release date. Original Unicode names remain canonical; the demo PDF's standard font uses a safe ASCII transliteration with replacement for unsupported glyphs. QA/Registry letters, releases and confirmations live outside the immutable submitted snapshot and are distinct from applicant-uploaded eligibility evidence. Release creates no automatic conversation or unread messages. Approved/accepted conversations remain read-only. The approved scenario now awaits Eligibility confirmation; Registry release and final acceptance remain user actions.

Admissions handoff and browser envelope **v2** include the selected campus and both letters/confirmations. The producer/consumer validate sequence and bounded PDF resources. V1 remains readable for legacy records without fabricated letters. Local generated PDF bytes travel only in the one-time validated development postMessage exchange, never URLs or persistent browser storage. Existing origin/window/nonce/replay checks and session cleanup remain. Student Documents shows issued Offer Letter first, Eligibility Letter second, with working preview/download for these resources. Other legacy documents retain their existing delivery capabilities. Payment proof remains outside Profile documents.

The selected-campus bootstrap clones only sample academic/campus configuration and remaps its IDs and local calendar windows. It creates an isolated identity/enrolment, inherits no prior results, registrations, payments or visa approvals, and preserves existing credit/fee/clash/international restrictions. Non-Cyberjaya fees and curriculum remain explicit prototype samples, not campus policy. Refresh disposes mock state and temporary resources. Durable evidence delivery, hosted two-letter methods and real CMS provisioning remain future work.

Mock operations: `confirmApplicationEligibility` (applicant), `verify-documents` with Eligibility generation (development QA command), `release-offer` (development Registry command), and guarded `acceptApplicationEnrolment` after Offer release. No new HTTP routes are exposed. Local DTOs may include optional `issuedLetter` PDF resources; hosted Profile document responses remain metadata-only.

## Bounded evidence transport v3 — 8 October 2026

Admissions snapshot v2 remains unchanged. DEV envelope v3 adds an owned file manifest and one-at-a-time requested resources with 25 MiB bounds, exact name/MIME/length, SHA-256, trusted origin/window/nonce and replay validation. Payment proof is excluded. No persistent storage or URL payload is used. Student resources attach to stable evidence references; Credit Transfer reuses them without rewriting the immutable snapshot. Standard PDFs open natively; resources survive navigation until session disposal. Hosted durable authorized delivery and reviewer operations remain future service support.
