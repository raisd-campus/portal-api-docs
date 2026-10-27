# Demo admissions resources and accepted Student continuation

## Policy task evidence - 20 October 2026

Post-eligibility receipts, signed copies of the current Offer, English evidence and requested corrections use the existing owned original-file upload/chunk/pin service. Staff evidence reads require the active Admin role, the case campus and an exact evidence reference in that owned case; client filename/size/MIME/SHA-256 checks retain integrity. Conditional and Full Offers/signatures have distinct versions. Current Student Offer/clearance projections do not rewrite the accepted handoff. Storage modes for policies, application records and evidence remain separate. See [University Flows](university-flows.md).


## Current status — 12 October 2026

Prepared locally in portal-api, Applicant and Student; **not deployed**. No hosted migration, reseed, account walkthrough or CMS write was performed. Shared UI stays pinned to 0.6.2. Admissions snapshot v2, DEV transport v3 and v1/v2 compatibility remain unchanged. Student record schema remains 4.

Enable only in Demo/stub sessions with `DEMO_ADMISSIONS_RESOURCES=true`, after `npm run db:migrate` or an explicit apply of `migrations/20261012-demo-admissions-artifacts.sql`. The default is false; Live CMS mode refuses this adapter. This separate Demo store does not replace the planned Live evidence store. Existing record-store schema-version reseeding remains unchanged and is a deployment prerequisite requiring backup/reconciliation before operational use.

## Store and interfaces

`src/admissions-artifacts.ts` owns memory and Postgres adapters. `demo_admissions_artifacts` stores owned immutable metadata, SHA-256, TTL/reference state and hashed grants. `demo_admissions_chunks` stores binary `bytea` chunks keyed by evidence ID and byte offset. File bytes are not copied into profile overlays or PortalRecordGraph. Existing issued demo letters retain their bounded v2 PDF representation.

| Operation | Interface | Behaviour |
| --- | --- | --- |
| Initiate | `POST /v1/applicant/evidence/begin` | Original ID/name/type/length, SHA-256 and purpose; identical retries reuse the session |
| Upload | `POST /v1/applicant/evidence/chunk` | Exactly 1 MiB except final chunk; canonical base64 and aligned offset; conflicting replacement rejected |
| Finalize | `POST /v1/applicant/evidence/finish` | Full byte length and final SHA-256 required; incomplete files stay unavailable |
| Applicant delivery | `POST /v1/applicant/evidence/read` | Only originating applicant; one bounded chunk per request |
| Cleanup | `POST /v1/applicant/evidence/cleanup` | Expired, unreferenced uploads only; persisted record references protected |
| Student delivery | `POST /v1/student/evidence/read` | Only evidence in the authenticated Student's immutable accepted admissions relationship |
| Document resolution | `POST /v1/portal/getStudentDocumentDelivery` | Profile row or original evidence ID resolves to a bounded resource descriptor, generated document, or honest unavailable state |
| Issue continuation | `POST /v1/applicant/continuation` | Authenticated accepted application, expected revision, nonce and configured Student origin |
| Claim | `POST /v1/auth/admissions/claim` | One-time grant, nonce, request origin and active originating Applicant session; returns the correct Student session |

Maximum original file size is 25 MiB. Admissions uploads retain PDF/Word/JPEG/PNG selection rules and matching declared type. Message uploads use `purpose: message` to preserve the existing broader attachment selection; their five-file/25 MiB each/75 MiB total limits remain enforced by the message operation. A message file cannot bypass admissions validation when reused in a submitted snapshot. Validation does not verify document contents.

TTL is 24 hours for abandoned uploads. Reads enforce expiry; a bounded cleanup sweep runs every 30 minutes while the service process is active. Persisted drafts/submissions/messages protect their referenced originals even if a post-save pin was interrupted. Writes extend the upload hold before saving. Referenced historical resources are retained conservatively. Serverless deployments still require an operator-owned cleanup schedule for guaranteed physical reclamation; no hosted schedule was created here.

## Identity and browser continuation

The manual **Continue to Student Portal** action opens the existing new Student tab. URLs carry only a random nonce at `/admissions-entry?transfer=…`; no credentials, grant, applicant answers or files appear in URLs or persistent browser storage. Exact configured origin, recipient/source window and nonce are checked on both sides. The authenticated grant is delivered by browser message, valid for five minutes and consumed atomically. Only grant/token hashes are persisted; logout invalidates a grant's originating session. Failure remains retryable from Applicant.

`ADMISSIONS_STUDENT_ORIGINS` is the API allowlist. Applicant uses `VITE_STUDENT_PORTAL_URL`; Student uses `VITE_APPLICANT_PORTAL_ORIGINS`. Origins are exact, trimmed values. The API's CORS allowlist must include both configured portal origins. The local DEV exchange remains separate and HTTP sessions never fall back to its mock writes.

The accepted context supplies stable applicant/person/profile/enrolment identifiers. The pure Student bootstrap creates an isolated Demo account and selected-campus first-semester Design enrolment. It remaps configuration IDs and preserves the frozen intake reference, identity, contacts, qualifications, optional English results and original evidence. No existing demo student's registrations, results, payments or visa approvals are inherited or overwritten. Repeat claims reuse the same account/enrolment and do not overwrite edited canonical profile state. Identity conflicts require reconciliation.

The imported session cannot switch into another demo identity. Whole-graph `getPortalRecordGraph` is no longer an HTTP capability; it remains available to local mock tools. New file reads and continuation verify active account/session ownership. Existing Bursary auto-approval/enrolment shortcut and automatic Demo Offer release remain **On hold** and do not become Live department decisions through this work.

## Evidence destinations

| Applicant source | Student destination | Resource/provenance rule |
| --- | --- | --- |
| Issued Offer / Eligibility | Documents, first / second | Exact existing issued PDFs and department/release/confirmation metadata |
| Passport photo / passport | Personal and Documents projections | Original evidence ID, no duplicate canonical upload |
| MyKad | Documents; identity values in Personal | Original filename/type/length and accepted snapshot provenance |
| Repeated qualification certificate / transcript | Academic and Documents | Each qualification keeps its ID, dates, nullable values and evidence references |
| Optional English certificates | Academic and Documents | Separate per-result references; empty English section remains optional |
| Creative portfolio / applicable CV / recommendation | Documents | Only submitted applicable admissions evidence; no promotion into editable portfolio/resume records |
| Transfer release / attendance / module results / syllabi / visa cancellation | Documents | Credit Transfer reuses the original results/syllabi IDs and requests only additional evidence |
| Applicant-uploaded eligibility / medical report / scratch card | Documents | Distinct from university-issued letters; citizenship/medical applicability remains unchanged |
| Payment proof | Admissions / Finance-owned evidence | Excluded from Student Profile documents and Student admissions-file reads |
| Conversation attachments | Application case evidence | Not Student profile documents unless explicitly incorporated through a future authorized process |

Legacy metadata-only evidence is displayed honestly as unavailable. Applicant no longer creates placeholder PNG/PDF bytes for missing HTTP originals. No HTTP response is silently replaced by a mock write. Native PDF/image viewing uses session-owned temporary resources; unsupported formats download the original. URLs survive navigation and are revoked on session disposal/reset.

## Local verification

Use sibling Applicant/Student checkouts and `npm run typecheck:local`. `npm run test:admissions` exercises memory and optional disposable Postgres. `LOCAL_ADMISSIONS_TEST_DATABASE_URL` is accepted only for 127.0.0.1:55432/admission_audit, and the test resets only that database. Never point this runner or the browser fixture server at hosted data. `npm run db:migrate` applies this DDL with the rest of the Demo schema. The service still does not apply it on startup.

The HTTP browser config is `student-portal/playwright.http-sync.config.ts`, using isolated local API/portal ports 4180/4184/4185. The legacy seven DEV journeys retain their existing independent config. Read the [cross-portal audit](../frontend/student-portal/audits/2026-10-12-cross-portal-sync-ui-audit.md) for exact results, remaining safeguards and hosted/physical-device limitations.

## Issued PDF persistence compatibility

The v2 public admissions handoff retains its existing issued-letter PDF payload. The new Demo persistence codec stores those bytes in the binary artifact adapter and writes private resource references into Student records and audit events. Reads validate/restore the original PDF bytes before applying the unchanged Student/admissions schemas. Uploaded evidence bytes are never placed in profile records. Legacy inline v2 letters remain readable and become references on an authorized write; no hosted backfill or schema-version change is performed. Enable the resource adapter when reading new reference-bearing Demo records. This private encoding is not a Live CMS contract.
