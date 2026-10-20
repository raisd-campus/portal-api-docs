# University Flows Admissions implementation and verification - 20 October 2026

## Scope and integrated baseline

Owner-approved source implementation across Control, Portal API, Applicant, Staff, Student, SSO and canonical/public documentation. No commit, push, registry publication, hosted deployment or production migration is included. Pre-existing Demo API/portal services were not restarted or reset; tests did not mutate the user's current Demo attendance or sessions.

Started with clean affected working trees, fetched and fast-forwarded before implementation, then reviewed incoming changes. Integrated Control Plane `099f7832`, API `43e4835c`, Staff `bcbde15f`, SSO `af3a65a7`, public docs `12aa5e62`; Applicant `e554414`, Student `08b594d` and design system `008003f` were already current. Cloned the missing official Control checkout. Preserved the upstream permission hierarchy, fixed Applicant preset, bulk access handling, SSO identity/passkey persistence, atomic passkey writes, teaching-record fix and the move of reports to docs.raisd.co. The old staff-portal checkout was not used.

## Delivered behavior

- Control University Flows registry and campus Admissions editor, typed draft/validate/preview/publish lifecycle, future effective dates, immutable history and restore-as-new-version. Shared package exact pin is released 0.9.1; other portals keep 0.8.0. No shared component source changed. Enabled/disabled settings use shared selects because Checkbox is not exported.
- One authoritative API evaluator, pinned prospective policies and legacy adapters. Identity/ownership/consent stay mandatory; policy settings never grant access. IO/SSD desk capabilities require explicit assignment. Existing Control grants receive only the targeted flows.configure capability upgrade; persisted people/passkeys and other grants are retained.
- Eligibility-first submission and one Registration Fee per programme application. Actual Bursary quotes, receipt verification, external settlement evidence, scoped deadline exceptions, tuition settlement/approved semester arrangements and explicit credit allocations. Missing prices/dates stay manual, never zero or invented.
- Conditional/Full Offer versions, current-file signatures and Registry verification, English calendar-year deadlines from arrival, IO medical and SSD arrival/departure, manual Registry international registration clearance. Local medical screening remains disabled.
- Unified Staff queue, owned evidence/messages/reviews, recovery of failed drafts and audit trail. Student continuation carries the immutable accepted policy/Offer; current clearance/Offer is refreshed separately. Bursary/Faculty completion precedes owned CAF PDF delivery. Legacy students retain existing behavior; record schema epoch remains 4.
- Restart-safe configuration via additive PostgreSQL state or atomic private file with per-process and cross-process locking. Corruption fails closed; memory-only configuration is limited to isolated tests. This does not expand application/evidence persistence to Live CMS.

The all-campus template is an owner-selected Demo starting point. Team-confirmed answers, operational defaults and unresolved values remain distinguished in [University Flows](../../backend/university-flows.md). Later extension candidates are prioritised there; arbitrary scripts and tax/refund formulas are excluded.

## Verification commands and evidence

Evidence logs and browser captures are under the ignored local directory `D:/Coding/cms-student-portal/logs/university-flows-20261020/`; Responsive Control/Staff/Applicant screenshots are archived in its `captures` subdirectory; Playwright also retains current captures under each consumer's test-results. Logs contain fixture data only. These checks use independent records, clocks, HTTP services and stores.

| Area | Commands and result |
|---|---|
| Applicant | `npm run check:all` plus focused recovery: lint, 86 units and production build/exclusions passed; the earlier full 70-case legacy run was green. On the final-source rerun, 69 cases passed and one Chromium navigation failed before loading with host ERR_NO_BUFFER_SPACE; that exact case passed alone in 6.7 seconds. All four new-policy browser cases then passed. Final-source lint/units/build/exclusions were checked again. Legacy fixtures explicitly select legacy policy; production excludes the DEV override. |
| Control | `npm run check:all`: lint, 11 contract/editor units, production build and 18 combined Control/Staff Chromium/WebKit tests passed at 375/768/1440px, including axe, overflow, preview/publication/restore and unsaved/failure recovery. Standard npm 10 clean install/build of the exact released 0.9.1 pin was checked, followed by 11 units. A lockfile repair added two bundled optional transitive entries and removed one orphaned optional placement; all existing package versions and portal pins stayed unchanged. |
| Staff | `npm run check` and `npm run demo:check`: lint, 73 units, production build and canonical snapshot parity passed. Refresh changed only two stale API source hashes, not Demo accounts or records. |
| API | `test:flows`: 55 lifecycle/isolation/boundary checks. Existing `test:admissions` 73, `test:sso-integration` 82, Classrooms, Materials 72, classroom regression 780 (112 seeded PDFs), Community 46 and Lecturer module 20 checks passed; `typecheck:local` passed. |
| PostgreSQL | `test:flows:postgres`, temporary localhost PostgreSQL 16: failed-write rollback/retry, concurrent publication, idempotency, campus isolation and actual database/API restart persistence passed. The isolated flows_test_ database cluster was stopped and removed. No production or current Demo database was used. |
| Runtime bundle | `STUDENT_PORTAL_ROOT=... npm run build:vercel` passed using temporary empty credential JSON fixtures, removed afterward. The normal local build prerequisite lacks demo-applicants.json; no real credential was created, read into evidence or published. This verifies compilation, not credential provisioning or hosted delivery. |
| SSO | Build/typecheck and affected permission/persistence tests passed; 51 browser cases passed and one expected WebKit virtual-authenticator capability case was skipped. |
| Student | `CI=true PLAYWRIGHT_WORKERS=2 npm run check:all` passed: token/assets/lint checks, 806 units, production build/exclusions/bundle budgets, Chromium 278 passed/46 expected skips and WebKit 41 passed/31 expected skips. The three earlier failures were rechecked: corrected logout fixture assertions and the unchanged graduation retry case passed in both desktop projects; the fresh full run was green. |
| Cross-portal browser continuation | `npm run test:handoff`: all seven Chromium/WebKit viewport projects passed after updating obsolete Student password-form assumptions. One WebKit attempt exhausted the old 90-second total budget; the isolated 180-second rerun retained all assertions and completed the full journey. The dedicated handoff config now uses that bounded budget. |
| Documentation | Generated Zod/OpenAPI parity, all affected portal working copies, API docs sync/check, public AI mirror and navigation/search regeneration: passed (152 canonical AI files plus affected contracts and working copies). |

Full new-policy acceptance is exercised through the isolated API/owning engines: eligibility, payment, Conditional Offer, English evidence, Full reissue, independent signature, acceptance, Student continuation, live clearance refresh, Bursary/Faculty review, CAF bytes and finance credit. Browser tests exercise responsive/keyboard surfaces with controlled HTTP fixtures; they do not claim a hosted Live-CMS journey.

## Defects found and corrected

- Mandatory post-arrival medical evidence was accidentally enforced twice during initial submission. Policy applicability now controls required/hidden documents consistently and prevents local medical requirements.
- Blank initial drafts could incorrectly fall into legacy mode; first valid saved campus now pins the correct applicable policy. Campus/intake changes clear or recompute only the proper dependent state.
- Registration-date exceptions could waive unrelated later deadlines. Exceptions now bind to deadline kind, exact due date and quote/Offer scope.
- Midnight dates for Offer deadlines, arrival and English evidence now use the campus time zone. Leap-day English deadlines clamp to the last valid calendar day.
- Evidence selection cannot silently relabel an English upload as medical evidence when the available tasks change.
- New-policy verified-payment registration clearance now requires all registration invoices settled; a partial payment requires an explicit approved arrangement. Added regression coverage.
- Pending fee receipts cannot be overwritten before Bursary review; rejection preserves original evidence/reference history before corrected resubmission. Initial configured drafts/submissions cannot smuggle in pre-eligibility proof fields.
- Lost finance-credit responses remain replayable after unrelated case revisions, while another actor cannot reuse that receipt.
- Finance credits project the existing atomic ledger into the case audit timeline without double-persisting a transaction.
- File policies now use cross-process locks, serialized dead-process recovery and monotonic draft revisions across publication; PostgreSQL publication is transactional.
- Standard npm ci detected missing bundled optional lock metadata from the npm 11-generated candidate. Regenerated that metadata with the installed npm 10; clean install/build and units now pass without existing version changes.
- Generated OpenAPI clock defaults were nondeterministic. Request-time default values are omitted from generated schemas; runtime behavior remains unchanged and repeated parity checks pass.
- Obsolete browser assertions expected removed Student password forms. Fixtures now test session disposal/continuation while dedicated SSO suites retain redirect, token and passkey coverage. No production auth behavior changed.
- Preserved unrelated OpenAPI schemas and original SDD HTML rendering/deep links while adding only the approved flow documentation.

## Operational handoff and boundaries

Use Control with an active role containing flows.configure; re-activate an existing Control role after the targeted grant upgrade when necessary. Assign campus Admin desks explicitly in People; policies do not create access grants. Start API with PostgreSQL configured or its documented FLOW_POLICY_STATE_PATH. Review missing registration dates and real Bursary quotes before relying on deadlines or prices.

Source checks do not establish registry, Jenkins, Argo or Live-CMS readiness. No production policy table/migration or hosted service was changed. Normal deployment still requires the existing secret provisioning and a reviewed campus policy. Existing memory Demo applicant/Student/evidence persistence boundaries remain visible. Existing identity-collision/curriculum reconciliation guards remain fail-closed; this work adds no automatic identity merge or CMS record rewrite. The complete operator guide, defaults/provenance, storage path, API contracts and extension inventory are in [University Flows](../../backend/university-flows.md).

## Local startup follow-up, 20 October 2026

The requested six-service local stack was started on the ports documented in the operator guide. All six returned HTTP 200; Vite-served configuration for Control, Applicant, Staff and Student explicitly contains local API 8087 and SSO 8090. API CORS accepted the three campus portal origins. Local SSO sign-in and the Control Admissions editor were checked in the in-app browser.

The real editor GET exposed a strict-response defect missed by the earlier fixtures: the shared intake catalogue contains startsOn, while the documented Control selector contract accepts only value and label. The API now projects exactly those documented selector fields. No schema, shared component, scheduling rule or Demo record changed. Two real-catalogue route regressions were added; test:flows now passes 57 checks, with typecheck:local and contracts:flows:check also passing. Only the newly started API process was restarted to load this fix; its saved policy file was verified byte-for-byte unchanged. SSO and portal processes stayed running.

No API/SSO listener was present before startup. Earlier memory-only records from an already-stopped process are unavailable; existing files were retained without reset. This trial does not claim durable applicant/student/evidence records. The local SSO identity-state path is configured for subsequent persisted changes; ordinary sign-in sessions remain in memory. No policies were edited or published, applications submitted, or hosted services changed by this startup verification.

## Upstream integration and source publication, 20 October 2026

The owner requested named stashes, latest pulls, review, full checks and commit/push across affected repositories. Eight dirty repositories were saved with include-untracked Git stashes; those backups and all pre-existing stashes were retained. Ten reachable Campus repositories were pulled with fast-forward only. New heads were reviewed in control-plane (198ae7a), Portal API (63a246d), Control (7312ca0), Lecturer/Staff (1b721c7) and SSO (8d528bc). Applicant, Student, design-system, public docs and Keychain already matched their remotes. The separate old staff-portal checkout returned GitHub Repository not found; it had no current changes and was left untouched. The active Staff application remains lecturer-portal.

Integration preserves upstream campus-first custom roles, live-resolved permissions and memberships, module-aware Staff navigation, learner access protection, SSO identity/passkey persistence, and the hosted Demo Materials/Classrooms gate (process-memory overlays can read memory or PostgreSQL graphs but never Live CMS). University Flows remains separate from portal access; no shared component source or released dependency version was changed during this integration.

Resolved MANIFEST, SSO OpenAPI, environment-example, Control navigation and SSO store/type conflicts by composing both changes. Review additionally fixed the Admissions desk editor dropping customRoleId or custom learner memberships when changing an Admin desk. The request builder now retains role references, other-campus assignments and module ceilings. Two units and two real UI browser regressions cover that preservation. Removed an auto-merged duplicate permissions field. JSON persistence tests compare the serialized representation of optional fields while retaining identity, grants, custom-role and passkey assertions. The contract checker tolerates CRLF without changing generated schema semantics. Lecturer Demo parity was regenerated; a structural comparison confirms accounts and teaching snapshots are unchanged and only source-provenance hashes changed. Final portable-clone review normalized CRLF/LF before hashing text inputs and comparing generated JSON; all five emitted hashes were verified against committed Git blobs, so Windows and Linux checkouts agree.

SSO's new Node-only HTTP checks were accidentally discovered as Playwright browser files, causing a Node loader failure before collection. The complete npm run check now runs build, test:api (flow upgrade, persisted passkeys, custom roles, learner privilege preservation), then the browser auth suite. No acceptance test was removed or skipped to resolve that failure.

| Gate | Current integration evidence |
|---|---|
| Portal API | Flow lifecycle 57, admissions synchronization 73, SSO integration 82, Classrooms, Materials 72, classroom regressions 780, Community 46 and Lecturer module 20 checks passed; local typecheck and generated contract parity passed. |
| PostgreSQL | Isolated temporary PostgreSQL 16 write/rollback, retry, concurrency and campus-isolation checks passed; policies/history/audit survived actual database and API/store restart. Temporary cluster stopped; interactive Demo unchanged. |
| Runtime bundle | build:vercel passed with temporary empty build-only credential fixtures, removed afterwards. No real credentials were embedded in verification evidence. This is compilation proof, not hosted secret provisioning. |
| Applicant | check:all passed: lint, 86 units, production build/exclusions, 70 legacy browser and four configured-policy cases. Separate cross-portal handoff passed all seven Chromium/WebKit projects. |
| Staff | check passed: lint, 73 units, production build; demo:check passed with unchanged account/teaching data. |
| Control | check:all passed: lint, 13 units, production build and 20 Chromium/WebKit browser cases. Isolated clean npm ci/build consumes exact released design-system 0.9.1 without replacing active portal dependencies. |
| SSO | Complete check passed: build/typecheck, four Node HTTP/persistence suites, 51 browser cases and one existing WebKit virtual-authenticator capability skip. |
| Shared library | Unchanged released source passed check: typecheck, 24 units, build and 38 consumer browser cases. No registry publication. |
| Student | check:all passed token/assets/lint, 806 units, production build/exclusions and bundle budgets. Its first Chromium invocation exited nonzero: 277 passed, 46 expected skips and one browser resource-load failure. The exact last-failed case passed under the original configuration (one test, 7.1 seconds); four additional unchanged motion reruns passed across both desktops. The separately executed required WebKit gate passed 41 with 31 expected skips. This is a documented recovered verification, not a claim that the initial aggregate command exited zero. |
| Documentation/CI contracts | University Flows/Zod/OpenAPI parity, backend working copies, canonical/public AI mirrors, navigation/search generation and design catalogue validation (203 existing captures) passed. Six offline Jenkins job-sync and three SSO image-build contract checks passed. Existing OpenAPI paths/schemas are retained; only the three existing Admissions schemas change, with 14 additive paths and 24 additive schemas. |

The Student first Chromium run encountered net::ERR_NO_BUFFER_SPACE while fetching React Router in the Community motion case. The trace shows the application had not loaded; assertions and production shell code remain unchanged. The original trace is retained locally under Student logs/integration-20261020. Final recovery outcomes are recorded in the Student row above.


### Source commit receipts

| Repository | Verified final source commit |
|---|---|
| applicant-portal | [3283088](https://github.com/raisd-campus/applicant-portal/commit/32830887bb2ea40129893f7dc287f81cc9074d91) |
| student-portal | [aaada64](https://github.com/raisd-campus/student-portal/commit/aaada64a21ec3fd1108f752e7bcc036d135966ce) |
| sso | [097da04](https://github.com/raisd-campus/sso/commit/097da04f011869cbc159c0360d08f87736ff58ae) |
| portal-api | [6ece104](https://github.com/raisd-campus/portal-api/commit/6ece104431beed23915129bc54327d0e3fd0d68f) |
| lecturer-portal | [7cee049](https://github.com/raisd-campus/lecturer-portal/commit/7cee049b470c5524336eb7264b390c1d1f544713) |
| control-portal | [19552e3](https://github.com/raisd-campus/control-portal/commit/19552e314940d411b0ffa5688fd14e1aec6d8f79) |

Staff also contains the admissions review commit cb883d8 immediately before its portable-provenance follow-up. Canonical/public documentation commits contain this receipt and are recorded in their own repository histories.

Evidence logs and command output are ignored locally under Student logs/integration-20261020. Shared pins remain Control/SSO 0.9.1 and Applicant/Staff/Student 0.8.0. Build warnings about existing chunk sizes, use-client directives and color/config-loader notices are non-failing.

The original local API/SSO processes and Demo records were not reset or restarted by integration checks. Their server code remains the version loaded before this pull until a separately requested restart; Vite portals reflect restored/current source. Source publication uses existing main-branch delivery automation; no manual rollout, migration, registry publication or Jenkins/Argo reconfiguration was performed. Local gates do not establish hosted build/deployment success or Live CMS persistence.
