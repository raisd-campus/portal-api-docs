# Cyberjaya application flow completion - 21 October 2026

## Scope and behavior

Owner-requested closure of the seven Cyberjaya configuration gaps identified in the local 21 October audit. Product changes are in Applicant, Portal API and Student; Staff's existing desk review implementation is exercised without a source redesign. Existing interactive services and Demo records were preserved. There is no commit, push, package release, deployment, schema reset or migration in this work.

| Audited gap | Completed behavior |
|---|---|
| Blank-campus saved draft resumed the legacy upfront-payment wizard | ApplicationRecord retains configured policy mode; the five-step flow survives resume. Campus changes resolve a matching policy, with session-scoped cache keys and retryable loading failure. |
| Explicit document requirements were removed during form updates | Retention honors required/optional/hidden overrides. Submitted documents include the same applicable extra campus documents. |
| Later verified English evidence was absent from Student | The exact accepted case projects complete verified results and original certificates into Academic Profile and Documents, using stable IDs. Untouched optional placeholder rows are ignored. The accepted handoff stays immutable. |
| Calculated deadlines were absent | Applicant tasks display recorded registration and calculated Registration Fee, tuition, English and Offer deadlines, with explicit guidance when data is missing. |
| Inapplicable evidence actions were shown | English actions follow the policy/cohort requirement; post-arrival medical actions require the international medical stage and recorded arrival. Hidden correction fields remain hidden. |
| Checklist ignored campus policy | Hosted campus or an explicit campus question selects requirements; optional initial medical reports, hidden/extra documents and English guidance follow that policy. Progress waits for requirements. |
| Payment routes had no instructions | Permitted bank transfer/counter routes show their instructions, existing campus bank data and quote/receipt guidance. Actual prices still come from Bursary. |

Integration testing also exposed an SSO capability omission: Applicant exchanged sessions now receive and retain the API's supportsAdmissionsResources flag. Missing capability fails closed. This fixes original-file uploads/continuation through the SSO path; it adds no access permission. OpenAPI documents this additive property. Connected Student queries refresh on route entry; registration additionally refreshes on focus and polls visibly while awaiting clearance or review so external desk decisions appear.

No policy values were invented or changed. Tests use the isolated Cyberjaya starting policy and explicit synthetic overrides; the exact currently published hosted policy remains unverified. Shared code consumes each case's own campus policy; this work does not assert that every campus has approved Cyberjaya's policies. The wider Lesotho pilot decision remains unchanged. Student Immigration continues to own its separate campus configuration and cases; this acceptance scope ends at initial module registration and CAF. Stable record contracts and schema epoch 4 remain unchanged; the English registry description clarifies provenance without adding fields, relationships or explorer fixtures.

## End-to-end verification method

Applicant's test:e2e:campus launches the actual Applicant, Staff and Student frontends plus real Portal API handlers on dedicated loopback ports 4288-4292. SSO introspection/identity is a synthetic local fixture; the Staff shell receives its matching synthetic session and server-enforced desk permissions. Application, documents, reviews, continuation claim, registration and delivery calls use the actual HTTP/API implementations. Test state is independent memory; reset replaces only this isolated server. Synthetic uploads contain no personal data. No production identity, email delivery or CMS write is exercised.

The two journeys run at Chromium 375/768/1440px and WebKit 375px:

- Local: complete the eligibility-first form and uploads; QA review and applicant confirmation; Bursary quote and receipt review; Registry Full Offer and exact-version signature review; acceptance; fresh sign-in and popup continuation claim; explicit finance/date reviews; Student module request; Bursary and Faculty approval; completed registration and owned CAF PDF.
- International: Conditional Offer acceptance and continuation; IO entry approval; SSD arrival; post-arrival medical upload/IO clearance and endorsement; later IELTS upload and QA verification; Registry Full Offer reissue and a newly verified signed version; semester tuition quote, prior approval and settlement; Registry international clearance; module approval and CAF. Academic Profile must show IELTS and original certificate bytes must match the submitted file.

Assertions retain preclearance registration/acceptance blocking, no CAF before approval, real PDF bytes, record ownership, deadline presentation, allowed payment guidance, console errors and horizontal overflow checks. Synthetic Registry dates and scoped manual reviews are explicit test decisions, not operational campus values. The policy-aware checklist has its own Chromium/WebKit browser check; focused unit regressions cover draft resume, document retention/validation, medical optionality, evidence visibility, deadlines, counter-only instructions, SSO capability and connected query freshness.

## Results

| Area | Exact result |
|---|---|
| Applicant | Final npm run check: lint, 94 unit tests, TypeScript/Vite production build and production exclusion checks passed. The check:all run passed all 70 legacy browser cases; its new checklist tests initially failed on test navigation/accessibility-name locators. Corrected locators passed all eight configured-policy browser cases. Final source also passed those eight cases with India selected to cover the old clinic-only branch. No product assertions were removed. |
| Cross-portal Cyberjaya | npm run test:e2e:campus: all eight local/international Chromium/WebKit journeys passed, including actual uploads, six Staff desks, claim, post-acceptance IELTS/original bytes, module approvals and CAF PDF. |
| Student | npm run check:all passed tokens/assets/lint, 807 unit tests and production build/exclusions/bundle budgets. Chromium finished 277 passed, 46 expected skips and one failure in the unchanged 1440px Drop Modules keyboard-checkbox assertion. That exact original-config test passed three unchanged repeats. WebKit was then run explicitly: 41 passed and 31 expected skips. The initial full gate did not exit successfully; focused retries completed verification without changing the unrelated product/test code. |
| Staff | npm run check: lint, 73 unit tests and production build passed; npm run demo:check passed without changing Demo accounts/records or source hashes. Existing Staff source handles all actual desk reviews in the eight browser journeys. |
| Portal API | typecheck:local and contracts:flows:check passed. test:flows 60 lifecycle/isolation/projection checks, test:admissions 73 synchronization checks and test:sso-integration 82 assertions passed. |
| Documentation | Canonical and working-copy flow synchronization, nine API documentation mirrors, all 154 public AI mirrors, added manifest entry, additive OpenAPI property and affected Markdown links passed. Synchronization also refreshed pre-existing baseline mirror drift. No shared UI/design catalogue change or new data contract was needed. |

Expected tooling warnings remain: existing Vite large-chunk notices, Vite's future native-config-loader warning and duplicate color-environment warnings. The whole MANIFEST.yaml has pre-existing unquoted-colon syntax outside this change, so the new entry was parsed independently; OpenAPI was parsed in full. That unrelated baseline syntax was preserved.

Early walkthrough failures identified the SSO capability omission and untouched English-placeholder projection error, both fixed with regressions. Subsequent failures were corrected test locators for hidden/expanded navigation, actual file inputs and Profile tabs. The final eight journeys retain the complete flow and resource assertions.

Evidence: ignored local logs at D:/Coding/raisd/cms-student-portal/logs/cyberjaya-fixes-20261021/ and consumer Playwright test-results; the original audit is logs/cyberjaya-config-audit-20261021/report.md. Browser captures are synthetic and retained locally. This is local isolated integration evidence, not hosted deployment or durable Live CMS evidence. Interactive services were not restarted; activation of the changed API source in the existing interactive stack remains unverified.
