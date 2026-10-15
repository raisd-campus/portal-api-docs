# Campus integration and publication receipt — 15–16 October 2026

## Scope and upstream review

All eight local campus main checkouts were fetched and fast-forward pulled before
review: control-plane, design-system, portal-api, Student, Applicant, Lecturer,
Staff and public portal-api-docs. Seven dirty worktrees were preserved in named,
retained stashes before integration. A second fetch found no further incoming
commits. Existing source work, canonical documentation and the new SSO,
Notifications, email-login, Jenkins/Argo and Admin guidance were reviewed together.
No personal repositories, remote-only services, credentials or live records were
changed. No manual hosted rollout, bootstrap, database migration or package
republishing is part of this publication.

## Corrections after integration

- Demo SSO binds explicit known identities. Unknown Student/Applicant emails and
  unsupported Staff desks cannot inherit default people/Registry access. Lecturer
  sessions preserve the allocated actor ID, title and HTTP runtime after restore.
- Four sign-in effects share the one-time exchange under StrictMode and suppress
  work after unmount. SSO-only entry does not render the password Keychain.
- Browser sign-in helpers use the new Email labels; test services explicitly opt
  into Demo password login. Student test isolation retains a blank external API URL.
- Applicant phone navigation waits for its drawer trigger before testing the saved
  application. This repairs a readiness race; save/retry/focus assertions remain.
- OpenAPI validation repaired a malformed Materials 404 description and the
  upstream missing SSO public Person schema. The password multi-role response uses
  anyOf because the actual service returns both redirectTo and picker fields.
- Demo PDF fixtures are marked binary in Git, preserving bytes across Windows and
  clean checkouts. No document contents, scheduling or grading policy changed. Contract mirrors
  enforce LF bytes across Windows checkouts; 26 generated schemas match OpenAPI.
- Canonical Student agent guidance now reflects the approved Classrooms file and
  submission Demo rather than the superseded metadata-only placeholder policy.

## Verification commands and evidence

Current operation logs and screenshots are local ignored evidence under
`student-portal/logs/campus-publish-20261015/`. Earlier complete file/restart and
release receipts remain in [Classrooms verification](2026-10-15-classrooms-materials-verification.md).

| Gate | Result |
|---|---|
| Shared `npm run check` | 21 unit + 35 consumer browser cases; type/build passed |
| Lecturer `npm run check`, `npm run demo:check` | 66 unit cases, lint/build and canonical snapshot passed |
| Applicant `npm run check:all` | 65 unit + 70 browser cases passed after readiness-helper correction |
| Staff `npm run check` | 7 tests, lint and production build passed |
| Student `npm run check:all` | 809 unit + 278 Chromium + 41 WebKit passed (46/31 intentional skips); lint/build/exclusions/budgets passed |
| Student focused `vitest run src/tests/sso-sign-in.test.tsx` | 2 additional lifecycle regressions passed |
| API local typecheck + runtime bundle | passed; no external database/notification configuration |
| API Admissions, Classrooms, Materials, Community, Lecturer modules, regressions | passed; regression suite 780 assertions/112 seeded PDF descriptors |
| API `npm run test:sso-integration` | 48 assertions with isolated HTTP introspection fixture passed |
| `node scripts/verify-sso-flows.mjs` | 8 scenarios across all four portals; no hosted calls; external sample avatars fulfilled locally |
| `node scripts/verify-classrooms-flows.mjs` | 11 paired scenarios passed at 375/768/1440px; isolated records only |
| `node scripts/verify-classrooms-navigation.mjs` | date/session selection, history, Today/All and independent mock scenarios passed |

The paired suite covers session-specific marks/drafts/history, correction reasons,
stale revision recovery, future/invalid/completed sessions, equal selector widths,
responsive overflow/accessibility, real material metadata/missing values, Demo
provenance, matching PDF bytes, submission/review/private drafts/publication,
corrections and replacement ZIP/deletion without inherited marks. Navigation also
checks direct links and Back/Forward, active-day defaults and Community draft
preservation. The repeatable SSO fixture is `node scripts/start-isolated-sso-api.mjs` (8106/8160);
start the four portals at 5206–5209 with API 8106, SSO 8160 and scenario login false
before running `verify-sso-flows.mjs`. It refuses hosted traffic and fulfills
sample avatar images locally. API boundary coverage includes unsupported/inactive identities and
legacy login compatibility. No assertions or acceptance requirements were removed.

Shared 0.8.0 already exists in GitHub Packages; Student, Applicant and Lecturer use
exact registry pins. The earlier clean registry install and all 263 installed
archive-file comparisons passed. Shared source release commit is
`e1bd19b146e9feb35cacb20db283af66d70b467a` with annotated `v0.8.0` tag. This source
publication does not republish the immutable registry archive.

## Documentation and delivery boundaries

OpenAPI 3.1 validation passed for all three contracts (100/16/8 paths); 26
generated boundary schemas match, and 139 AI files plus 261 catalogue files match
the public mirror byte-for-byte. Both catalogue validators pass 197 captures.

Canonical AI/SDD/contracts, generated HTML, released visual catalogue and affected
portal/public mirrors are synchronized and checked. The catalogue retains
historical capture provenance; new 0.8.0 captures identify their source release.

Read the [CI source review](../../../architecture/cicd.md#source-review-and-publication-limits--15-october-2026).
Jenkins main pushes trigger image builds only for Keychain/SSO/Notifications and
refresh Argo. Portal/API workloads still use transitional hostPath content.
Jenkins omits these test gates, swallows rollout failures, and copies pipeline
bodies into jobs at job-sync time. A failed requested image SHA checkout can fall
through to main. These limitations were recorded; no cluster/job changes were
made. A green trigger is not proof of deployed content or workload readiness.

Existing local API 8087 and portal processes were preserved, including Demo
attendance/session state. Integrated API source was verified on isolated 8106;
the existing non-watch 8087 process has not been restarted for this integration.
Only owned verification processes are stopped after checks. No Live persistence
or continuous SSO revocation claim follows from the Demo exchange.

## Confirmed source publication — 16 October 2026

All eight feature commits below were pushed to main and independently matched
against remote HEAD. Their worktrees were clean. GitHub delivered every Jenkins
push webhook with HTTP 200. Anonymous Jenkins build-status reads returned 403;
job completion and hosted rollout therefore remain unverified. No GitHub Actions
runs were returned for these SHAs. The shared annotated v0.8.0 tag was pushed.

| Repository | Published feature commit |
|---|---|
| control-plane | [00e0d9d6cc](https://github.com/raisd-campus/control-plane/commit/00e0d9d6cce91f8da7bcd4cf5e2821f3f0a57f97) |
| design-system | [e1bd19b146](https://github.com/raisd-campus/design-system/commit/e1bd19b146e9feb35cacb20db283af66d70b467a) |
| portal-api | [f176764174](https://github.com/raisd-campus/portal-api/commit/f176764174afad17ffcd26996160db9adeed0437) |
| student-portal | [20b38f6276](https://github.com/raisd-campus/student-portal/commit/20b38f6276c253f65858ab59a156426b29d4921c) |
| applicant-portal | [fee128bc1b](https://github.com/raisd-campus/applicant-portal/commit/fee128bc1bfbd1b86fbf370eb4acf511744ab4e1) |
| lecturer-portal | [34d8f6bc5d](https://github.com/raisd-campus/lecturer-portal/commit/34d8f6bc5dd5616b87bf14bd080df479eb856c28) |
| staff-portal | [28b7581b76](https://github.com/raisd-campus/staff-portal/commit/28b7581b76f0ea8cf270f5e691c996d82f8fc022) |
| portal-api-docs | [e94a569590](https://github.com/raisd-campus/portal-api-docs/commit/e94a569590859504c87a4b65327c8eef16e9af48) |

A documentation-only follow-up records this receipt in control-plane, Student
and public mirrors. Existing local services remain on API 8087 / Lecturer 5173 /
Applicant 5174 / Student 5175 with their original processes. Owned isolated API,
SSO and four verification portal processes were stopped. Retained pre-pull
stashes preserve the original seven dirty worktrees as recovery snapshots.
