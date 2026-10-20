# University Flows - Admissions v1

Local implementation, 20 October 2026. Hosted deployment, registry publication and production migrations are outside this delivery. This owner-approved work supersedes the earlier instruction to hold campus configurability until the first hard-coded campus flow was complete. Existing access ceilings, the fixed Applicant role, SSO persistence and teaching-record fixes remain.

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

Publishing never grants portal access. The existing Control People screen has an explicit campus review-desk assignment section for existing campus Admins. IO/SSD capabilities are available but are never assigned automatically. Teaching-only active roles cannot open Admin admissions routes. Desk changes preserve customRoleId, other campus memberships, learner custom-role memberships and module permission ceilings. Updating role assignments may require activating the updated SSO role.

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

With the existing `DATABASE_URL`, policy state uses the additive `university_flow_policy_state` JSONB table. Versions, drafts, audit and retry receipts commit in one PostgreSQL transaction using a row lock. This is separate from existing applicant/student/evidence stores. Starting this source against a configured database creates additive policy storage; this task applies no hosted migration.

Without a configured database, policy settings use an atomic file store at `FLOW_POLICY_STATE_PATH`, default `<portal-api cwd>/.data/university-flows.json`. Keep that directory private and backed up; use a durable mounted path for a persistent service. Atomic rename and an exclusive per-file transaction lock protect concurrent local processes; dead-process locks recover on restart with serialized recovery. An interrupted recovery lock fails closed and requires operator inspection; never delete a live process lock. Unreadable/corrupt data is never silently reseeded. Explicit memory-only stores are used only in isolated tests. API/Control responses expose the actual storage mode. Restart-safe policy configuration does not make memory Demo applications, attendance or evidence durable.

Do not reset or restart the user's current Demo API to run tests. Test factories inject separate stores. The PostgreSQL regression requires an explicitly isolated localhost `flows_test_...` database via `FLOW_TEST_DATABASE_URL`; it rejects other targets. Verification used a temporary PostgreSQL 16 cluster and stopped/removed it afterward.

### Local multi-portal trial

The 20 October local trial uses Staff at localhost:5173, Applicant at localhost:5174, Control at localhost:5175 and Student at localhost:5176, with one Portal API at localhost:8087 and SSO at localhost:8090. Set every portal's VITE_PORTAL_API_URL and VITE_SSO_URL explicitly; their hosted fallbacks are not a local environment. Set API SSO_BASE_URL to the local SSO, SSO_PUBLIC_URL to its local origin, and allow all four portal origins in SSO_RETURN_ORIGINS and API CORS_ORIGIN. Applicant VITE_STUDENT_PORTAL_URL, Student VITE_APPLICANT_PORTAL_URL and API ADMISSIONS_STUDENT_ORIGINS must use the matching local ports. Enable DEMO_ADMISSIONS_RESOURCES for the memory Demo continuation/evidence route and use the same private local SSO_SERVICE_TOKEN on API and SSO.

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
