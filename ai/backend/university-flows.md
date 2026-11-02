# University Flows - Admissions v1

## Flow terminology and applied version - 26 October 2026

The Admissions directory calls each reusable named configuration a Flow, with immutable numbered published Versions. Its summary API adds latestVersion (highest permanently numbered saved draft or published version, including future-effective publications) and appliedVersion (currently effective version when assigned to a campus; null when unassigned). The existing revision field keeps its previous effective-version meaning for compatibility. Version and Applied Version may differ until a scheduled publication takes effect. Each saved draft has its own optimistic revision and reserves a permanent version number on first save; that number is retained on publication. Existing application pins, assignment behavior and /versions API/editor paths are unchanged; this is an additive read projection with no migration or policy write.

## Reusable Admissions configurations — 23 October 2026

Control's Admissions directory now lists named configurations through shared AdminTable, rather than campuses. Global is assigned to all eight local campuses. Each configuration owns separate settings, independently saved drafts, immutable numbered published revisions and an audit trail. All configurations use one editor component. Create is intentionally inert and assignment controls are deferred; persisted assignments are real and enforced by policy resolution.

The directory is `/flows/admissions`; a configuration opens at `/flows/admissions/versions/:configurationId`. Old campus URLs resolve their assigned configuration and redirect there. The editor displays assigned campuses; Preview Campus changes evaluation context only. Publishing explicitly names the affected campuses and applies the new effective revision only to new applications. Existing applications, accepted snapshots and their campus/timezone context remain pinned and unchanged.

New Control APIs under `/v1/control/flows/admissions/versions` provide GET list, GET `/:configurationId`, POST `/:configurationId/draft` and POST `/:configurationId/publish`. They require active Control plus `flows.configure`. Draft and publication requests retain optimistic revisions and actor-scoped retry identifiers. Legacy campus reads remain compatible; new legacy campus draft/publish requests return 409 `SHARED_FLOW_CONFIGURATION_REQUIRED`, `configurationId` and `configurationUrl`. Exact receipts for previously completed legacy commands remain replayable.

Policy storage is upgraded transactionally within its existing file/PostgreSQL adapter. Additive `configurations` and `configurationMigrationAt` fields retain original campus policies, drafts, revisions, audit and retry data. Import groups only matching active settings, future schedules and draft content; distinct groups receive campus-based names. Global uses matching saved owner defaults, including older wording fields, without replacing them with newer defaults. Scheduled policies keep their effective dates. File mode creates an exact `.pre-configurations.json` backup before persistence; local activation also takes a separate private checkpoint. Earlier API binaries cannot read the extended strict state: rollback requires the matching pre-configuration backup and coordinated code rollback, never a blanket database reset. No hosted migration or deployment is included.

Verification uses isolated policy/API tests for migration, custom groups, old defaults, retries, concurrent publication, application pinning and permissions. Disposable PostgreSQL verifies atomic rollback and persistence across independent stores. Focused synthetic Control checks cover desktop/phone/tablet layouts, accessibility, directory actions/retries and the shared editor. The interactive API is restarted only for authorized activation after backing up persisted Demo state.

Local activation receipt: 93 isolated flow checks, PostgreSQL migration interruption/publication rollback/concurrency/recreation checks, Control's 16 unit tests, lint/type/production build, and 16 focused Chromium/WebKit browser cases passed. Two directory cases were rerun after adding explicit sort/filter assertions and passed. The live API reads Global revision 1 for all eight campuses; original policies, drafts, audit and retry receipts remain. Application/admissions files have identical hashes, SSO people/custom roles/User IDs and previous audits are unchanged; one ordinary SSO login audit was added by verification. The private checkpoint is `D:\Coding\raisd\backups\flow-configurations-20261023-181837`. Only Portal API was restarted for this activation; frontends update through Vite. This is local Demo evidence, not a hosted release or Live acceptance.

## Learner conversion and reusable Cyberjaya Demo flow — 21 October 2026

Accept Enrolment replaces Applicant access with Student access for the same SSO identity, using durable retry/recovery and a one-use Student exchange. Student continues outstanding admissions evidence; Control can preview/reset only a registered Demo journey. The [current lifecycle contract, ownership/reset rules, account checkpoints and verification](learner-lifecycle.md) supersedes earlier Applicant-session handoff/reset descriptions below. Hosted rollout remains a separate coordinated release.


## Cyberjaya configuration completion — 21 October 2026

The owner selected Cyberjaya as the focus for closing the audited configuration gaps and acceptance verification. Configured blank-campus drafts remain eligibility-first when resumed; selecting/changing campus resolves the matching policy before progression. Explicit document overrides now survive retention and appear consistently in editable forms, submitted documents and the campus-selected preparation checklist. Hidden requirements stay hidden and initial optional medical evidence is labelled accordingly.

Applicant tasks display campus-local registration, Registration Fee, tuition, English and Offer deadlines with explicit missing-date guidance. The allowed payment routes render their own bank-transfer/counter instructions; configured fees still use the actual Bursary quote, never the old fixed fee label. Post-submission English/medical actions follow the applicable cohort/stages.

Applicant SSO exchange advertises supportsAdmissionsResources and retains that server capability in the HTTP session; missing capability remains unavailable. Current verified English evidence from the exact accepted application projects into Student Academic Profile and owned certificate delivery, without rewriting the accepted snapshot or unrelated records. Connected Student registration refreshes on mount/focus and while awaiting clearance/review; Academic Profile and Documents refresh on re-entry.

The isolated Cyberjaya browser suite uses the actual Applicant, Staff and Student frontends and Portal API handlers, with a loopback SSO fixture, synthetic evidence and independent memory stores. It is part of Applicant check:all; it never resets interactive services or records. Verification results and hosted boundaries are recorded in the [completion receipt](../architecture/audits/2026-10-21-cyberjaya-application-flow.md). No new campus policy, Live CMS integration, package release or deployment is implied.


Implementation, 20 October 2026. The subsequent owner-requested [hosted Demo deployment verification](../architecture/audits/2026-10-20-application-flow-deployment.md) covers Jenkins/Argo, exact releases and authenticated reads/previews. No shared-package release or Live CMS migration is included. This owner-approved work supersedes the earlier instruction to hold campus configurability until the first hard-coded campus flow was complete. Existing access ceilings, the fixed Applicant role, SSO persistence and teaching-record fixes remain.

## Ownership and defaults

Control manages structured settings at `/flows` and `/flows/admissions/:campusId`; Portal API validates, persists, publishes and evaluates them. Applicant, Staff and Student use the pinned case requirements. The registry initially contains Admissions; each future flow must supply its own typed settings, validation, evaluator/preview and authorised operations. There is no arbitrary script editor or visual workflow builder.

| Rule | Starting setting | Provenance |
|---|---|---|
| Review order | QA eligibility and applicant confirmation precede Registration Fee collection | Team-confirmed eligibility-first sequence; QA/confirmation are the selected operational defaults |
| Admissions fee | One Registration Fee per programme application; Application Fee names the same charge | Team-confirmed terminology and charge identity |
| International deadlines | Registration Fee 35 days before registration; tuition/resource clearance seven days before | Team-confirmed; date must be explicitly recorded in campus time |
| Tuition | New international: verified first-year settlement, or a prior approved and settled semester arrangement | Latest team answer supersedes the earlier optional first-year answer |
| Conditional Offers | Allowed while English is outstanding; evidence due one calendar year after recorded arrival; QA initially reviews, Registry issues Full Offer | Team-confirmed English period and Full Offer; reviewer routing is configurable |
| Signatures | Uploaded signed copy of each current issued Conditional/Full Offer, verified by Registry | Team-confirmed; portal acceptance alone is insufficient |
| International stages | Entry approval, arrival, medical and endorsement apply; local medical screening is disabled | Team-confirmed sequence; eVAL is entry-process approval, not blanket registration clearance |
| Responsibilities | IO medical clearance/appeal/re-screening; SSD arrival/departure; Faculty lecturer availability | Team-confirmed |
| Module registration | Explicit Registry international clearance, existing Bursary and Faculty checks, then CAF | Owner-selected manual registration threshold; successful modules then CAF is confirmed |
| Unresolved values | Local deadlines, local/returning tuition clearance, missing dates/prices and fee-credit decisions require recorded manual review | Unresolved; no zero prices, invented dates or fabricated approvals |

The same starting template seeds all eight campuses as an owner-selected **Demo default**. This does not assert that Malaysia-specific answers are approved policy in every jurisdiction. Operators must publish campus-appropriate settings before Live acceptance.

## Control operator flow

1. Activate a Control role with `flows.configure`. Open University Flows, Admissions and the campus.
2. Edit eligibility/document applicability, collection routes and fee milestones, tuition rules, English/Offers, international stages, review desks and dates. Supported review desks are validated enums. Core identity, ownership and consent remain mandatory. Cohort document overrides supersede All; Transfer overrides student type for transfer cases. Local medical evidence cannot be made mandatory.
3. Save draft with optimistic revision and a stable retry identifier. Enter an effective UTC instant and a change reason.
4. Validate/Preview local/international and new/returning cases. Preview records no approvals; it shows skipped stages, pending reviews and blockers.
5. Publish the saved validated draft. The API revalidates it atomically. Published versions cannot be edited/deleted. To revert, copy an older version into a draft and publish a new version after the latest effective instant.

Publishing never grants portal access. On the Admissions page, **How publishing works** is a three-step `Popup` tour: Effective from starts the policy for new applications, existing applications keep their pinned version, and campus roles apply as soon as they are saved. The Effective from field and the role editor’s Portals field repeat that distinction on the shared `DetailField` help icon. The existing Control People screen has an explicit campus review-desk assignment section for existing campus Admins. IO/SSD capabilities are available but are never assigned automatically. Teaching-only active roles cannot open Admin admissions routes. Desk changes preserve customRoleId, other campus memberships, learner custom-role memberships and module permission ceilings. Updating role assignments may require activating the updated SSO role.

Control pins the released shared design system **0.9.1**; Applicant, Staff and Student retain sufficient **0.8.0** pins. All new compositions use shared cards, fields, selects, inputs, tabs, actions, popups and audit trail. The package exports no Checkbox; existing selects express enabled/disabled settings. No shared component source changes are included.

## Case lifecycle and compatibility

A new application opts into configured policy mode. Its first saved valid campus selection pins the effective published version and settings. Saving an incomplete blank-campus draft does not silently turn it into a legacy application. Before submission, an explicit campus change clears dependent pricing, proof and clearance state and resolves the new campus policy; intake changes resolve the pinned policy's registration date. Submitted campus details are immutable.

Pre-existing applications are adapted as legacy cases and retain the original payment-first behavior. Existing students without a policy reference keep their existing registration/immigration rules. No record schema epoch is bumped, no scenario is reset, and no historical invoice/payment reference is rewritten.

New cases submit evidence and consent before fee payment. Bursary records a real catalogue/authorised quote before collection. QA verifies eligibility, the applicant confirms where configured, Bursary verifies the actual receipt, Registry releases an Offer, and Registry verifies the signed copy of that exact version before acceptance. Disabled stages read **not required by policy**. Conditional Offer acceptance enables Student continuation; it does not complete module registration.

English evidence and post-arrival medical evidence can be supplied later. Requested document corrections remain owned by the application; configured correction replies must be supplied before QA closes the review. Submitted identity/programme data and verified evidence are not silently replaced. English clearance allows Registry to issue a distinct Full Offer. Its new document ID never inherits an old signature. The accepted handoff retains its accepted Offer; the current issued Offer and fresh clearance are separate Student projections.

## Deadlines, quotes and financial controls

Registration dates are campus-local calendar dates. Unknown dates/deadlines stay manual. English uses calendar-year addition (29 February clamps to 28 February in the following non-leap year). Late cases are reviewed, never automatically rejected.

A deadline exception records its kind, current due date, scope ID, actor, time and reason. Fee exceptions bind to the quoted charge/amount/currency, tuition to the quote, Offer acceptance to the issued Offer ID, and English to its current arrival-based due date. A registration-date confirmation cannot waive a later English deadline or a reissued Offer deadline.

Charge applicability, permitted receipt methods and clearance milestone are separate settings. Disabling collection does not mark a debt paid. For a manual fee milestone, Bursary can record independently verified external settlement against the exact quote, amount and currency after eligibility; this records the evidence reference without fabricating a portal receipt. Verified payments cannot be rejected/reversed through the proof-review shortcut. A pending receipt cannot be overwritten before Bursary review. Rejected unverified receipts retain evidence/reference/reason history and can be replaced; initial configured submissions discard pre-eligibility receipt fields without touching legacy finances. Missing quote amounts display **Not provided**. Currency-specific minor units are used; annual tuition is never calculated from an invented multiplier.

Bursary credit allocations require a verified Registration Fee, accepted owning Student/enrolment, an eligible issued tuition/resource invoice, matching currencies, an available source balance, a remaining invoice balance and an explicit reason. They use the existing atomic finance adjustment ledger with structured source/policy/actor metadata. Exact retries return the original allocation even after unrelated case revisions; another actor cannot reuse its receipt. Concurrent/stale new saves do not double-post. Manual credit policy permits an explicit authorised allocation, not an automatic offset. Tax/refund formulas are unchanged.

## Staff and Student continuation

Staff Applicants is the Portal API queue, joined by stable application/person/campus IDs. The overview uses the same queue. Staff Payments composes new admissions review with existing legacy payment review; Registrations separates module requests and admissions clearance. Review actions are campus-, active-role- and desk-scoped. Records include original messages, owned evidence delivery and an independent audit trail. Failed reviews retain their draft and stable retry ID; page navigation and refresh protect unsaved reasons.

Student continuation carries an additive policy reference without changing handoff versions 1/2 or transport envelope 3. The original handoff stays immutable. Portal API resolves current clearance from the owning accepted case before Student reads and final Faculty registration. A client-ready flag cannot authorise registration. Direct legacy confirmation cannot bypass the Bursary/Faculty request for new-policy students. Final review is optimistic and idempotent. For new-policy requests, verified-payment clearance requires every registration invoice to be settled; an outstanding balance needs an explicit approved arrangement. CAF PDFs are available only for completed owned registration requests and list those registered modules. Existing grading, scheduling and financial persistence boundaries remain. Demo continuation still fails closed on an existing-person collision or unsupported curriculum; it does not automatically merge identities or rewrite another enrolment.

## API surface

- `GET /v1/control/flows`: supported definitions and configuration storage mode.
- `GET /v1/control/flows/admissions/:campusId`: current applicable policy, draft, immutable version history, audit and intake choices.
- `POST /v1/control/flows/admissions/{draft,validate,preview,publish}`: strict typed lifecycle operations; stale revisions, conflicts and invalid policies fail closed.
- Applicant RPC adds `getAdmissionsPolicy`, `submitRegistrationFee`, `submitSignedOffer`, `submitAdmissionsEvidence`; existing submit/accept operations enforce the pinned evaluator.
- `GET /v1/staff/admissions/campuses`, `/v1/staff/admissions?campusId=...`, `/v1/staff/admissions/:applicationId`: assigned scope, queue and case.
- `POST /v1/staff/admissions/:applicationId/actions`: scoped reviews with revision/retry protection.
- `GET /v1/staff/admissions/:applicationId/evidence/:evidenceId?offset=...`: owned original byte chunks; uses the existing evidence service and bounds.
- `POST /v1/staff/admissions/:applicationId/credits`: atomic approved invoice credit allocation.
- `GET|POST /v1/staff/admissions/registrations`, `POST .../registrations/review`: scoped module requests and desk reviews.

Inputs and resolved policy/queue/detail outputs are Zod-validated. Canonical OpenAPI and `contracts/university-flows.openapi.json` are generated/checked against the owning TypeScript contracts. Auth expiry is 401, wrong active role/campus/desk 403, stale/reused requests 409, contradictory policy 422 and unavailable stores 503. No route accepts a client-defined reviewer identity or policy override.

## Persistence and local operation

With the existing `DATABASE_URL`, policy state uses the additive `university_flow_policy_state` JSONB table. Versions, drafts, audit and retry receipts commit in one PostgreSQL transaction using a row lock. This is separate from existing applicant/student/evidence stores. Starting this source against a configured database creates additive policy storage. The subsequent hosted Demo rollout reports postgres policy storage; it did not reset existing records or apply a separate Live CMS migration.

Without a configured database, policy settings use an atomic file store at `FLOW_POLICY_STATE_PATH`, default `<portal-api cwd>/.data/university-flows.json`. Keep that directory private and backed up; use a durable mounted path for a persistent service. Atomic rename and an exclusive per-file transaction lock protect concurrent local processes; dead-process locks recover on restart with serialized recovery. An interrupted recovery lock fails closed and requires operator inspection; never delete a live process lock. Unreadable/corrupt data is never silently reseeded. Explicit memory-only stores are used only in isolated tests. API/Control responses expose the actual storage mode. Restart-safe policy configuration does not make memory Demo applications, attendance or evidence durable.

Do not reset or restart the user's current Demo API to run tests. Test factories inject separate stores. The PostgreSQL regression requires an explicitly isolated localhost `flows_test_...` database via `FLOW_TEST_DATABASE_URL`; it rejects other targets. Verification used a temporary PostgreSQL 16 cluster and stopped/removed it afterward.

### Local multi-portal trial

The 20 October local trial uses Staff at localhost:5173, Applicant at localhost:5174, Control at localhost:5175 and Student at localhost:5176, with one Portal API at localhost:8087 and SSO at localhost:8090. Set every portal's VITE_PORTAL_API_URL and VITE_SSO_URL explicitly; their hosted fallbacks are not a local environment. Set API SSO_BASE_URL to the local SSO, SSO_PUBLIC_URL to its local origin, and allow all four portal origins in SSO_RETURN_ORIGINS and API CORS_ORIGIN. Applicant VITE_STUDENT_PORTAL_URL, Student VITE_APPLICANT_PORTAL_ORIGINS and API ADMISSIONS_STUDENT_ORIGINS must use the matching local ports. Enable DEMO_ADMISSIONS_RESOURCES for the memory Demo continuation/evidence route and use the same private local SSO_SERVICE_TOKEN on API and SSO.

The local launcher and logs are ignored under Student logs/local-services. It reuses occupied ports without stopping their processes; inspect their configuration before treating an existing service as part of this stack. It preserves the existing API policy path and uses an ignored SSO_STATE_FILE for subsequent identity/passkey changes. SSO sessions and memory Demo application/student/evidence records remain process-local; a policy file or SSO identity file does not change that boundary. Never reset records or run destructive tests on this interactive stack.

## Checks and extension inventory

Run Portal API `test:flows`, `test:flows:postgres` against an isolated database, `typecheck:local`, `contracts:flows:check`, affected regression suites, runtime bundle and docs checks. Run Control `check:all`, Applicant/Student `check:all`, Staff `check` and `demo:check`, plus SSO build, permissions/persistence and browser checks. The [canonical verification handoff](../architecture/audits/2026-10-20-university-flows.md) records exact outcomes and remaining limitations; source validation is separate from release/deployment readiness.

| Priority | Later flow | Prerequisites / reason to configure |
|---|---|---|
| P1 | Intake eligibility, late entry, deferment | Authoritative intake dates, cohort routing, approval ownership |
| P1 | Reminders and escalation | Notification consent/templates, business calendars, named owners |
| P1 | Scholarship/waiver approvals | Funding catalogue, authority limits, audited allocation rules |
| P2 | Transfers and programme changes | Credit mapping, receiving faculty and historical enrolment ownership |
| P2 | Add/Drop windows and reviews | Semester calendars, academic/finance effects and correction policy |
| P2 | Returning-student registration | Explicit balances/arrangements, holds and semester requirements |
| P3 | Graduation and transcript holds | Award/clearance ownership, document release policy |
| P3 | Other campus document/reviewer packs | Verified evidence dependencies and capability availability |

Document applicability, supported reviewer routing, correction-reply requirements and Offer acceptance deadlines are already Admissions v1 settings. Later candidates require their own approved scope through this framework; arbitrary scripts and automatic tax/refund calculations are excluded.

### Hosted Demo verification - 20 October 2026

Open https://control.raisd.co/flows and configure Admissions for the selected campus. Existing Control Demo accounts require the active Control role with flows.configure. Control uses released design-system 0.9.1; all eight policies report configured database storage. Hosted policy reads, validation and all four local/international/new/returning previews passed for every campus. Control browser loading/validation/preview and the Staff API-backed queue were checked without saving or publishing a policy or changing admissions, financial or registration decisions. A missing Control CORS origin was fixed in the GitOps API entrypoint, preserving all 26 existing portal/Control/Swagger origins and denying an unrelated origin. This is Demo delivery evidence, not Live CMS acceptance. See the deployment receipt for exact revisions, Student artifact recovery and retained native-build capacity limits.

## API-owned progress presentation — 21 October 2026

`settings.presentation` is additive, validated, campus/version-scoped wording with complete stage/department maps, global status labels and per-stage pending/completed update strings. Old settings parse with the canonical defaults. The evaluator retains raw complete/pending/manual/not-required stages for workflow gates and adds validated `progress` rows for display. It excludes not-required stages, maps pending/manual to one pending label and resolves `{department}` using the stage review desk. Applicant API adds current progress to owned application replies without persisting derived display state; Control preview returns the same rows. Applicant renders those fields directly. Wording changes never approve a step, alter access or revise the pinned policy of an existing case. Isolated publication/preview/API tests verify custom wording, desk substitution, uniform unfinished statuses, applicability filtering and immutable previous versions.

## Shared pending action and completed progress — 22 October 2026

Control owns configured admissions wording in Applicant and Staff. Each stage supports `pendingStatus` (Pending Action Status) and `completeStatus` (Completed Status). Portal API's `display.status` is the **current unfinished action**, never the most recent completed milestone. The same decision reaches Applicant as `admissionsDisplay` and Staff as `decision.display`, including current step, department and short update. Pending action labels resolve `{department}` from Control's department wording. Existing shared Badge variants show unfinished actions in amber.

After QA verification and actual Eligibility Letter release, overall status is **Awaiting Applicant Confirmation**, current step **Confirm Eligibility**, next actor **Applicant**. The completed Eligibility Review progress row remains **Eligibility Letter Released**. Confirmation advances overall status to **Awaiting Bursary Review**, current step **Registration Fee**; it does not automatically quote or verify payment. Draft, correction-required and accepted terminal states retain their configured labels. Completion labels remain in progress/history.

Older pinned policies missing the additive fields resolve canonical defaults at read time without rewriting published versions, snapshots or operational data. Explicit Control wording wins; later publications retain existing pinning semantics. Control preview and all portals use the same evaluator. Tests cover custom pending/completed wording independently, department substitution, transitions and preserved historical policies. Interactive Demo cases must not be advanced/reset for verification.

## Configuration General metadata — 26 October 2026

`POST /v1/control/flows/admissions/versions/:configurationId/general` accepts name (trimmed 1–160 characters), unique known campus IDs, `status: draft | published`, `expectedRevision` (General metadata revision) and `requestId`. Active Control plus `flows.configure` is enforced. Responses contain the committed configuration detail and complete list from one transaction; detail includes `generalRevision` and nullable `generalDraft`. Existing stored configurations omit these additive fields until edited and read as revision zero/no draft. File and PostgreSQL JSON adapters retain their existing transaction/locking behavior.

Draft stores a separate General buffer and leaves active name, assignments and published policy revisions untouched. Published applies name/assignments and clears only the General draft. It does not publish a settings draft or create a policy revision. Pending General drafts project Draft Changes in the list/sidebar. Campus coverage remains exactly one flow per campus: selected campuses are transferred atomically from their previous configuration, with both metadata revisions and audit history updated; dropping currently assigned campuses without reassignment is rejected with `CAMPUS_ASSIGNMENT_REQUIRED` (422). Draft candidates can be incomplete while active assignments stay valid.

General writes use optimistic revisions, actor/configuration-scoped retry receipts and atomic rollback; stale revisions return 409, validation 400, and storage failures remain retryable with the same request ID. Saved policy history, scheduled settings versions, settings drafts, imported campus records and pinned application snapshots are preserved. No seed/reset or hosted migration is part of this change.


## Predefined Admissions workflow template — 28 October 2026

Optional workflow template 1 adds independent Local/International settings, enabled tasks and constrained priority order to immutable configuration versions. Existing legacy settings and pinned cases remain compatible. Runtime cohort projection preserves explicit eligibility, fee, English, signature, arrival and financial gates; priority is not authorization. Fixed campus prices pin exact amount/currency/basis without treating them as settlement. Structured letters retain issued bytes and exact Offer/signature identity.

SSO live bindings select campus role definition IDs per configuration/type/step, with current claims checked for every action. New-template publication and General assignment require eligible reviewer coverage. Legacy desk authority persists only until an explicit binding replaces it. Preview renders synthetic PDFs and does not mutate policy/application state. New-template Applicant writes require the compatibility header. Full contract and settings map: [Flow Editor](../design/flow-editor.md).


## Version metadata and application journal — 28 October 2026

Published policy objects and application snapshots keep their existing strict shape. Configuration `versionNames` stores names by immutable policy ID; drafts accept optional `name` (trimmed, required when supplied, 1–160 characters), with omission preserving an existing name. Draft `applyImmediately` distinguishes server-time application from a specific `effectiveFrom` UTC date. Older clients omitting it preserve the stored timing choice. Version numbers remain permanent and are assigned at publication.

`POST /v1/control/flows/admissions/versions/:configurationId/apply` takes `target: {kind: draft, revision}` or `{kind: published, policyId}`, `applyFrom: now | ISO UTC`, optional `reason`, `expectedApplicationRevision`, `expectedGeneralRevision` and `requestId`. A draft must be saved; its application timing must match its saved metadata. Reasons are optional; omitted reasons are stored as empty strings, while previously recorded reasons remain intact. Active Control and `flows.configure` are mandatory. The existing `/publish` request shape remains compatible and delegates to the same saved-draft publication/application operation.

Under the existing file lock or PostgreSQL row transaction, Apply checks optimistic revisions, current campus coverage, workflow validation, eligible reviewer coverage and structured-letter rendering. It then commits immutable publication (draft only), version name, application journal, audit events and retry receipt together. Exact retries return the original result even after the draft is gone; changed payloads with the same retry ID conflict. General campus assignment validates the current journal-selected policy and reviewers inside the same policy transaction, preventing an intervening Apply from bypassing coverage.

The append-only `applications` journal selects by application time, independently of version-number order. Future entries preserve today's version; reapplying an older version never removes later schedules. Backdates, occupied scheduled timestamps and selections that make no change at the chosen time fail. A currently applied version can be scheduled again after a different planned version. There is no disable, delete, cancellation or per-campus version override. Campuses must have an applicable version now when assigned/applied; applying an unassigned flow does not assign campuses. Existing application snapshots and issued evidence are untouched.

The idempotent upgrade derives deterministic journal entries from original version effective dates, retaining tie-break order, current selection and all future schedules. It preserves policy objects, legacy records, drafts, events and receipts. File storage writes an exact `.pre-application-journal.json` backup before upgrading. PostgreSQL stores the original JSON at `university_flow_policy_state.id = admissions:pre-application-journal` in the same locked transaction, with insert-once semantics; interrupted upgrades roll back and retry. Local activation additionally requires the private database backup. No remote migration is implied.

Configuration detail exposes `applications`, `applicationRevision`, `versionNames` and existing audit events with optional application/effective-time identity. Legacy audit is linked only where a policy ID or recorded imported-policy ID proves ownership. Derived migration journal rows are not presented as invented user actions. Recorded scheduling events retain the actor and recorded time plus future effective time; crossing that time does not fabricate an additional actor event. Applied status is computed at read time.


### Version names and reason-free application — 28 October 2026

`POST /v1/control/flows/admissions/versions/:configurationId/name` accepts `policyId`, trimmed required `name` (1–160), `expectedName` and `requestId`, with active Control plus flows.configure enforcement. It edits only the versionNames sidecar and appends a version-renamed event with recorded actor/time, previousName and name. Expected-name concurrency and exact retry receipts use the existing transaction path. Policy objects, application journal, drafts and pinned applications do not change. Published numbers/settings/effective dates remain immutable; display names are editable.

Apply reason is optional, including through legacy publication. New policies allow an empty reason string in the unchanged policy object shape. An omitted application reason produces an empty audit/journal reason, rather than fabricated explanatory text. Historical reasons are preserved. Existing no-op, time-conflict, coverage, optimistic concurrency and rollback checks still apply. Control disables Apply for an Applied version; service scheduling still checks whether selection would actually change at the requested future time.


## Multiple saved drafts — 28 October 2026

This supersedes the single working-draft lifecycle above. Configuration reads return `drafts` alongside immutable published `history`. A saved draft has a stable `id`, permanent `version`, independent `revision`, optional stored name, timing, both cohort settings and `copiedFromPolicyId`. The source must belong to published history in the same configuration; migration uses null when legacy provenance cannot be proved. Names omitted by older update clients retain the stored name.

`POST /v1/control/flows/admissions/versions/:configurationId/drafts` first-saves supplied editable values and a published source identity. It allocates the next number atomically across drafts and published versions; an untouched suggested name is generated from the actual allocated number. `POST .../:configurationId/drafts/:versionId` saves only that draft with its own expected revision. Active Control plus `flows.configure`, strict validation, actor-scoped retry fingerprints and transaction rollback remain enforced. Exact retries return the original saved draft/number, including after a lost response.

Apply names `{kind:"draft",versionId,revision}`. Publication retains the draft ID/number, removes only that draft and leaves others intact. Versions can publish out of numeric order; the application journal still selects by effective application time. Applied Version remains journal-derived; latest Version includes saved drafts. Flow status describes General metadata only: Published or Draft when a General draft exists. Version drafts and schedules never turn the flow status into Draft Changes or Scheduled Changes.

Backup-first additive upgrade imports the legacy working draft once, preserving its exact contents, name, optimistic revision and existing audit/receipts, and binds `legacyDraftId` explicitly. File mode retains an exact `.pre-multiple-drafts.json`; PostgreSQL retains the original JSON at `admissions:pre-multiple-drafts` in the locked transaction. Interrupted upgrades retry safely. Original legacy fields and policy records remain; existing application snapshots are unchanged. Older strict-state binaries require a coordinated rollback and pre-upgrade backup, never a reset.

Legacy `/draft`, `/publish`, ID-less draft Apply and `?version=draft` use only that explicit binding. If other drafts exist without a legacy binding, ID-less writes fail with `409 DRAFT_SELECTION_REQUIRED`, `configurationId` and `configurationUrl`; they never choose or overwrite an arbitrary draft. Existing retry receipts remain replayable. Draft deletion is deferred.

Control creates a local unsaved editor at `?version=new`; first Save Draft reserves the number and switches to `?version=N`. Refreshing an unsaved editor shows unavailable state. Saved drafts and published versions share the Versions table; Create Version remains available and Copy from includes published versions only. Reference reads an explicitly selected numbered version, defaulting to the applied version when no selection is supplied. See [Control](../frontend/control-portal.md). No real Global Apply or hosted migration is authorized by this delivery.


## Recorded version change details — 28 October 2026

Configuration audit events add optional `changes`: an array of `{path: string[], before: string | null, after: string | null}`. Each value is a JSON-encoded field value; null denotes absence. The server calculates these from the previous saved draft and the accepted new values inside the same transaction as the save, revision and retry receipt. Creation compares supplied settings with the explicit published copy source and records the source identity, name and timing. Published renames record their before/after names. Clients cannot supply or alter audit change records.

Version audit snapshots normalize absent legacy workflow templates to their effective defaults and immediate timing to its actual meaning, avoiding noisy unchanged-field records. Objects are traversed by path; scalar arrays retain their sequence as one change, while row collections use stable IDs/campus/intake/requirement identities where unique. Property order and unchanged row ordering produce no false changes. Removed fields, empty values, zero and false remain distinguishable. Both cohorts, order, enablement, pricing, documents and policy settings are covered.

Existing events are retained without backfill or invented differences. A missing `changes` field means details were not recorded; an empty array means a new save recorded no field-value changes. Historic rename events can use their already-recorded before/after names. The additive optional JSONB/file event field needs no data migration. Strict older API binaries cannot write the new event shape after future saves without a coordinated compatible rollback; do not reset or rewrite history. Existing retry receipts and pinned applications are unchanged.

Control sends these values to the existing shared AuditTrail `changes` slot with readable field/cohort/step labels, enabled/disabled values and UTC timing. Persistence remains API-owned; the shared component remains presentation-only. No shared-library source or release is required, and local verification does not save or apply the real Global flow.
