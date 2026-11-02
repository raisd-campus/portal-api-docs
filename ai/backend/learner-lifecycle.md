# Learner conversion, owned Applicants and reusable Cyberjaya Demo flow

SSO permanent numeric `userNumber` is retained through conversion and reset. The Student single-use claim and normal SSO exchange carry the same display-only account identity; neither replaces opaque person/profile IDs nor grants permissions.

## Delivery boundary

This is connected Demo behavior through SSO and Portal API. The local launcher explicitly enables `DEMO_FLOW_ENABLED=true`, `DEMO_ADMISSIONS_RESOURCES=true`, `CMS_MODE=stub` and single-writer `DEMO_STATE_DIRECTORY`. Hosted deployment is a separate coordinated release. Live CMS mode rejects Demo flow. Existing accepted accounts are not automatically converted or migrated.

## Identity and acceptance

### Owned Applicant identities — 29 October 2026

An authenticated SSO Applicant with `portal.applicant` can open a new, empty Applicant state without an entry in the five-account Demo email map. Ownership uses the permanent SSO `personId` plus an assigned campus, independently of contact email. The exchange accepts optional `campusId`; a single assigned campus is selected automatically, multiple campuses require an explicit assigned selection, and foreign-campus requests fail before creating state.

The existing exchange field `scenarioId` is a server-owned string. Registered Demo values remain unchanged; owned Applicants receive `sso:<campusId>:<person hash>` and a corresponding opaque applicant ID. Clients preserve that key only for the accepted API session. Password scenario login and the development scenario picker still accept only the five registered values. No request can choose another person's principal or supply its own person ID.

Applicant initialization uses atomic create-if-missing and never overwrites a populated state. PostgreSQL retains principal scope in the existing text identity columns; evidence, conversion/recovery journals and Student lookup indexes use the existing durable artifact store. Owned applications start without fixture personal details or evidence. Their catalogue is limited to the principal campus; draft saves, submissions and academic selection resolution enforce that scope again. Application reads, messages and file delivery retain exact applicant ownership.

Secure acceptance uses the same durable intent, trusted SSO transition and one-use Student claim as registered journeys. Owned conversion and Student re-login resolve the persisted person/campus journey after API restart; edited contact email never changes its identity. Owned principals have no Demo reset capability and never appear in Control's five-account list. Opening the Applicant state grants no Student, Staff or Control access; Student access still requires accepted conversion. No blanket migration is introduced. This is local connected administration and is not a Live CMS deployment claim.

`npm run test:owned-applicant` uses an explicitly supplied dedicated loopback PostgreSQL test authority, creates/removes only its random `academic_test_owned_*` database, and keeps SSO identity state in a private temporary file. It covers a person created through the actual SSO store, empty initialization, owned uploads, draft/API restart, foreign-campus and cross-person denial, separate Academic review, submission/desk review, secure conversion, recovery after restart and Student re-login/stream projection. It also verifies password, permanent numeric identity and unrelated Lecturer access survive conversion, while the five-account Demo reset list remains unchanged.

Accept Enrolment uses the SSO person ID bound during authenticated exchange, independently of editable application contact email. The same login, password and passkeys remain. SSO replaces Applicant access with Student access scoped to the accepted campus and retains unrelated Staff/Control assignments. It persists operation ID, campus and generation, then revokes learner sessions, refresh sessions and old sign-in codes. Portal API physically revokes Applicant API sessions; access guards also reject old generations.

The API journals conversion intent, prepares the Student identity/profile/enrolment, and confirms the trusted SSO transition before reporting success. Accepted application and Student snapshots remain immutable in the conversion journal and `studentProfiles.admissionSnapshot`. Later working-case evidence/clearance is separate and never overwrites those snapshots. Preparation and identity transitions resume with the same operation after interruption; deterministic record IDs and the ownership manifest prevent duplicate enrolments. Provisioning failure remains a retryable incomplete conversion.

Applicant shows Preparing your Student Portal while processing, an explicit Retry action on failure, then Congratulations! Opening Student Portal for approximately 2.5 seconds after completion. It opens Student in the same tab. A five-minute, one-use code is bound to conversion, Student origin, nonce and current Demo generation. Only the code enters the URL fragment; Student clears it immediately and exchanges it for credentials in the response body. Access tokens never enter the continuation URL. A separate 15-minute opaque recovery receipt permits exact lost-response retries after Applicant sessions are revoked. Same-account Student sign-in resolves by SSO person ID and can recover a pending conversion/navigation.

Old Applicant bookmarks route converted identities to Student. Removed Applicant access must never expose Applicant records, including through copied tokens, existing tabs, fresh exchanges or the retired Applicant-session-dependent continuation endpoints (410).

## Student admissions requirements

Profile → Academic → Admissions requirements composes the existing shared ContentSection, DetailSectionCard, DetailField, FileUploadField, Input, Button and QueryErrorState. It introduces no new shared visual rule or component redesign. Independent browser mock sessions do not show connected upload controls.

The section reads the exact accepted Student case and supports applicable English results/certificates, medical evidence only after Student Services records arrival, and signatures for each newly issued Offer. Registry verifies each signature; QA/Registry verifies English according to policy; IO owns medical and immigration clearance. Uploads use authenticated Student routes, MIME/size checks, 1 MiB chunks and SHA-256, with 25 MiB per file. Evidence submission never verifies itself. Current clearance/blockers refresh separately from the immutable accepted snapshots. Bursary, Faculty, Registry, IO and SSD retain their existing review responsibilities; CAF remains unavailable until registration is approved.

## Registered accounts and checkpoints

| Login | Reset checkpoint |
| --- | --- |
| fresh@raisd.demo | No application |
| draft@raisd.demo | Complete, unsubmitted local draft |
| completed@raisd.demo | Submitted, awaiting QA |
| approved@raisd.demo | Eligibility verified, awaiting confirmation |
| international@raisd.demo | Complete international draft; English deferred for Conditional Offer |

Registered journeys are Cyberjaya-only and allow at most one current application. Reset restores the currently effective policy/checkpoint. Dedicated `demo.qa@raisd.demo`, `demo.faculty@raisd.demo`, `demo.bursary@raisd.demo`, `demo.registry@raisd.demo`, `demo.international_office@raisd.demo` and `demo.student_services@raisd.demo` are Cyberjaya-only custom desk roles. Existing real-user permissions are not expanded. Keychain includes the accounts; it does not grant permissions or approve steps.

## Reset and ownership

Control → Demo flow at `/demo-flow` requires active Control plus `rbac.manage`; Portal API freshly enforces both. Preview first validates the exact SSO identity, generation and CMS-link status without mutation. It then returns the selected account, exact application IDs, owned file IDs, generated graph IDs, current generation and digest. Confirmation sends that digest/generation and a stable operation UUID. A pending reset exposes its original operation UUID so an authorised operator can resume it after page/API restart.

An explicit per-journey manifest starts from generated Student/profile/enrolment IDs and records dependent rows by exact foreign keys. Preview reconciles later registration/finance rows into that manifest and validates ownership. Deletion never matches email, names or prefixes. Ambiguous cross-student, imported accepted or CMS-linked records are refused. The remaining canonical graph is validated before save. Files are removed only by their explicit owner; shared academic/campus/policy configuration and audit history remain. Staff accounts/passwords are never reset.

Reset advances the SSO generation, revokes Applicant/Student API sessions and outstanding exchange grants, removes only owned application/evidence/Student/financial/registration state, and restores the same login at its checkpoint. Conversion and all Demo API requests serialize; PostgreSQL uses a cross-process advisory lock, local file mode has a single writer. Staff writes carry the generation of the exact displayed case/registration row; stale reviews cannot affect a new run even if IDs/revisions repeat. Partial reset phases stay journalled and retryable.

## Configuration

| Setting | Owner / use |
| --- | --- |
| DEMO_FLOW_ENABLED=true | Both API and SSO; registered Demo reset/preflight opt-in |
| DEMO_ADMISSIONS_RESOURCES=true | API; owned evidence and secure conversion |
| CMS_MODE=stub | API; Demo flow refuses Live CMS |
| DEMO_STATE_DIRECTORY | API local single-writer atomic state; use DATABASE_URL for hosted PostgreSQL |
| SSO_STATE_FILE | SSO durable identity/transition/audit storage; mandatory for learner transitions |
| SSO_SERVICE_TOKEN | Shared private API/SSO service credential |
| ADMISSIONS_STUDENT_ORIGINS | API exact allowed Student origins |
| VITE_STUDENT_PORTAL_URL | Applicant build; same-tab Student destination |
| VITE_PORTAL_API_URL / VITE_SSO_URL | Portal builds; paired API/SSO origins |

## HTTP contracts

| Route | Purpose |
| --- | --- |
| POST /v1/internal/learners/transition (SSO) | Trusted, durable learner conversion/reset |
| POST /v1/applicant/accept | SSO-bound acceptance; exact command and separate recovery receipt |
| POST /v1/auth/student/claim | One-use Student code exchange |
| GET /v1/control/demo-flows | Registered accounts, checkpoint, stage and next actor |
| POST /v1/control/demo-flows/{id}/reset-preview | Exact ownership manifest/digest |
| POST /v1/control/demo-flows/{id}/reset | Confirm or resume selected reset |
| GET/POST /v1/student/admissions/requirements | Owned case read/evidence submission |
| POST /v1/student/admissions/evidence/{operation} | Student begin/chunk/finish upload |

Acceptance/reply schemas are mirrored in both portal hosted-admissions contracts. Student requirements has its own validated DTO. Staff detail/queue contracts expose optional `demoGeneration`; writes send `X-Demo-Generation`. No canonical Student record-schema epoch or blanket migration is introduced. Existing Demo artifact tables hold the additive lifecycle journal and grants; normal Applicant/Student/PostgreSQL stores remain the record owners. Local files use atomic replacement; corrupt state fails closed. SSO requires durable writable `SSO_STATE_FILE` plus the shared trusted service token. Its current file-backed identity/session authority must run as a single active SSO writer/replica; scaling requires a shared identity/session store.

## Manual journey

The complete account-by-account checklist lives in Control → Demo flow. Start with a reset of draft@raisd.demo (local) or international@raisd.demo. Applicant submits; QA reviews/releases Eligibility; Applicant confirms; Bursary quotes Registration Fee; Applicant supplies proof; Bursary verifies; Registry issues Offer; Applicant signs; Registry verifies; Applicant accepts and becomes Student. Continue tuition and any recorded semester arrangement, registration dates/scoped deadline reviews, module selection and Bursary/Faculty approval. International cases continue English review, Full Offer/re-signature, entry/arrival, post-arrival medical, IO/Registry immigration clearance and remaining registration blockers. Confirm CAF availability only after approval. Reset the selected journey and repeat using the same login.

## Verification and rollout

21 October 2026 Applicants adoption: cancelled browser reads exposed a request-serialization lock leak. Fastify does not run `onResponse` for a destroyed response socket. The API now releases the lock in `onSend` after the handler and admissions annotations complete, retaining `onResponse` as an idempotent fallback. Cancelling a request never unlocks a still-running handler. Isolated real-socket GET/POST regressions verify both non-overlap and subsequent recovery; the complete lifecycle suite passes 329 assertions, University Flows passes 65 checks and local typechecking passes. A local QA smoke test confirms queue reads and campus isolation remain available after repeated cancelled reads; no current Demo application is modified.

`portal-api` has `test:learner-lifecycle` for isolated persistent runs, failures, revocation, recovery/races and repeat/reset invariants. `test:learner-browser` targets only isolated loopback ports 18087/18090 and 15174/15175/15176; it requires the paired local test services and generated synthetic PDF evidence. It never targets hosted identities. The local verification launcher/evidence lives under ignored Student logs/learner-demo-verification. Browser checks cover desktop Chromium and mobile WebKit, 2.5-second timing, same-tab navigation, requirements upload, same-account re-login and Control preview/reset. See the [verification receipt](../architecture/audits/2026-10-21-learner-demo-flow.md) for actual results and limitations.

Hosted rollout must coordinate SSO, API, Applicant, Student, Control, Staff and Keychain. Drain acceptance/reset/Staff writes during the release and remove old API replicas before enabling reset, so all writers participate in the same generation/advisory-lock protocol. Provision only registered Demo identities, apply additive storage prerequisites, explicitly enable Demo mode, then verify hosted sessions/roles and both resettable journeys. Never reset a production database wholesale, migrate existing accepted accounts automatically, or present local proof as hosted/Live CMS proof.

### Isolated database regression test

`portal-api` runs `npm run test:learner-lifecycle` against private temporary local files by default. To exercise PostgreSQL, set `LEARNER_TEST_DATABASE_URL` to a fresh disposable database on `127.0.0.1` named `flows_test_*`; the test explicitly refuses other targets and applies the additive artifact schema only there. The current suite has 329 assertions, including both journeys twice and aborted-request lock cleanup. This update was verified in isolated file mode; PostgreSQL was not rerun for this table adoption. Test state must never point to the CMS or current Demo database.

## Reset all Demo journeys — 21 October 2026

Demo flow includes Reset all for the registered journeys returned by the API. It previews every selected account and affected-record counts before confirmation; any failed preview prevents execution. Confirmation invokes the existing guarded per-journey reset sequentially with individual digests/generations and stable operation IDs. Completed accounts are removed from the pending list; a partial failure shows progress and Retry reset resumes remaining accounts with the same operation IDs. This is a sequential batch, not an atomic database-wide reset. Individual reset remains available.
