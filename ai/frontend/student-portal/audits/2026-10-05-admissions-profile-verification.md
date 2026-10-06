# Admissions/profile verification — 5 October 2026

## Scope and publication state

Implemented Applicant's validated session-only mock Portal API and an explicit accepted admissions exchange into Student schema v4 profiles. No commit, push, shared-package release, backend deployment, database migration or hosted reseed. Design System remains 0.6.1 in both portals. Current Malaysian samples are unchanged; Lesotho-first planning is reconciled with canonical guidance.

## Local mock verification

| Check | Result |
| --- | --- |
| Applicant full `npm run check:all` | PASS: lint, 22 Vitest/Testing Library tests, TypeScript/build, 14 Chromium/WebKit browser checks |
| Student full `npm run check:all` | PASS: tokens/assets, lint, 735 unit tests across 93 files, TypeScript/production build/isolation/bundle budgets, 273 Chromium checks (41 existing intentional skips) and 38 WebKit checks (31 existing intentional skips) |
| Focused Student integration repairs | PASS: 50 handoff/session-guard tests and eight browser checks covering Personal edit/reset, scoped Services redirects and Graduation at 1280/1440 |
| Accepted handoff | Exact independent contract/fixture copies; Applicant producer equals golden exchange; Student consumer validates/maps it; tests preserve complete immutable metadata, identity/enrolments/visa links, older omissions/nulls, repeat-import deduplication and student isolation |
| Catalogue | Canonical/public pages and 92 captures validate; new profile composition captures at 375/768/1440 visually reviewed |
| Documentation consistency | PASS: 263 contract/fixture/mirror/link/YAML/pin/diff checks; 95 regenerated navigation blocks with 8,645 local file targets and no missing targets; Applicant lockfile clean-install dry run passes |
| OpenAPI | Redocly minimal lint passes; six unused-schema warnings are intentional because Applicant mock/handoff types are not exposed as HTTP endpoints |

Applicant browser coverage uses 375/768/1024/1280/1440 Chromium and phone/tablet WebKit with fine/coarse pointer configurations. It covers accessible field errors, keyboard consent/Continue/select controls, dependent preference clearing, incomplete draft save/resume, complete confirmation and upload flow, immutable details/all five accordions, exact filenames, visible unread acknowledgement, attachment drafts across navigation, attachment-only reply/status, deduplication and refresh reset/unavailable IDs. Unit/component coverage additionally checks format/date/file limits, optional/populated English, conditional evidence, ownership, stale/concurrent writes, failed save/send and retry, pending duplicate-send prevention and object URL disposal. A regression rejects simultaneous request-ID reuse for different applications.

Student Chromium and focused WebKit journeys cover the aligned profile at phone/tablet/desktop widths with keyboard/shared-control regressions. Student coverage includes new guardian/relationship/disability errors, save/cancel and locked fields across established widths, existing downstream Online Forms/Community/Finance/Immigration flows, atomic canonical/overlay updates and scoped cache invalidation. Legacy omissions normalize to null; nullable evidence and old profile overlays remain readable. The retained admissions snapshot is never rewritten by editable profile saves.

Two explicit Applicant axe exceptions remain: the owner-approved zoom-restricting viewport (`meta-viewport`) and existing shared 0.6.1 attachment metadata and timestamps on brand-blue sent bubbles (`color-contrast`, restricted to the exact filename/size/time markup of the synthetic sent message). Other accessibility violations fail verification. These exceptions do not establish complete WCAG conformance; no shared redesign was authorized in this phase.

## Integration corrections

- One asynchronous request-ID collision could previously commit two different Applicant writes; the adapter now rejects the second before committing.
- Applicant email validation now uses the same Zod email rule as the accepted exchange, including rejection of consecutive local-part dots. Accepted-only exchange schemas also reject partial English records, incomplete preferences and nonchronological/duplicate repeated records; the mapper preserves every validated row. Canonical-owned v4 values take precedence over legacy overlay omissions and normalized nulls; legacy writes preserve omitted new fields. Accepted passport expiry/issuing country take precedence over historical visa projections without changing visa records or relationships. Trimmed values are validated and serialized consistently.
- An existing Student Services redirect competed with the shell adding the enrolment query parameter during initial loading. Redirects now preserve scope; history and retired-route regressions pass. No visual change.
- Old Personal browser assertions now cover seven sections and the aligned read-only fields, preserving geometry checks and edit/reset assertions.
- Profile validation remains deferred. Eager JavaScript allowance increases only 1 KiB (191 to 192 KiB); all other bundle limits remain unchanged. Final eager JavaScript is 195,639 gzip bytes (192 KiB limit: 196,608); largest chunk is 340,938 bytes. All deferred feature budgets pass.
- Isolated Chromium/WebKit verification servers disable HMR/file watching, preserving session-only state during automation; normal development configuration is unchanged. An earlier Graduation failure showed an unexpected full-page reload clearing its mock session. The focused regression now passes; the trace did not establish the reload cause.
- Applicant builds successfully with an 812.34 kB JavaScript chunk (242.52 kB gzip); Vite retains its non-blocking >500 kB chunk advisory. No Applicant production bundle budget is claimed.
- The latest canonical navigation generator incorrectly treated configured external links as filesystem targets. URL handling is corrected and canonical/public navigation regenerated; catalogue link/capture validation passes.

## HTTP compatibility and deployment boundary

OpenAPI models the actual Student profile input/response shapes and emergency-contact `id`, `fullName`, `emailAddress`, nullable `relationship`. Applicant operations are explicitly in-process mock methods; no new HTTP routes or live Applicant integration are claimed. The backend service checkout is absent locally. Hosted compatibility has not been exercised.

The backend RecordStore automatically reseeds canonical tables when its pinned Student engine schema version changes; saved overlays/audit history may survive. A hosted v4 engine upgrade requires separate backups, a record-preserving migration/reseed decision, overlay validation and rollback verification. None was performed here. Backend-facing engine resource fields remain intact.

The accepted mapper is a tested exchange into an existing accepted identity/enrolment. No submission creates a Student, no offers/reviewer controls are added, and separate browser sessions do not share a running backend. Durable files, authentication, operational Registry acceptance, physical iPhone Chrome/Safari focus/keyboard/zoom/orientation and real backend integration remain unverified.

## Reproduction

Run `npm run check:all` in each portal; Student uses `PLAYWRIGHT_WORKERS=2` locally. CI installs Chromium/WebKit and runs the same gate through the canonical workflow template. Local ignored logs are `applicant-portal/verification.log` and `cms-student-portal/logs/admissions-final-check.txt`. Contract/fixture, canonical/public/portal mirrors, YAML and local documentation links are audited before completion.

## Field-only validation refinement — 5 October 2026

Removed the Applicant page-wide validation summary at the owner's request. Required/format errors remain beside fields with field-local accessible descriptions; failed validation focuses the first visible invalid control. File uploads retain their shared error description and focus the visible upload button, excluding the hidden picker input. Retryable save/API failures appear by the action buttons. No shared source, sizing or layout changes. Final Applicant `npm run check:all` passes 22 unit/component tests and all 14 Chromium/WebKit checks, including field-description and dropdown/upload focus regressions. The isolated verification log is `cms-student-portal/logs/applicant-field-only-final.txt`; Student source and its previously recorded gate are unchanged.

## Applicant development Admin Actions — 5 October 2026

Implemented one `/dev/admin-actions` page and sidebar footer entry using the existing shared dropdown, SummaryCards and conversation presentation at 0.6.1. Exactly three whole-portal scenarios initialize once: Fresh, fully populated unsubmitted draft, submitted approved. Scenario/applicant ownership, generation-scoped queries, saved drafts, checklist state, both conversation drafts and prepared attachments remain isolated and retained until refresh. Session teardown releases all scenario resources, including under StrictMode; late initialization cannot retain resources after disposal.

Development reviewer commands are Zod-validated mock-only operations outside ApplicantPortalApi. Payment verification precedes document verification; approved snapshots remain immutable and both conversations become read-only. Reviewer sends retain applicant read/reply provenance. Admin viewing never acknowledges messages for the applicant. Approved status takes precedence while unread messages remain until applicant visibility acknowledgement. No rejection controls, HTTP endpoints, acceptance context, enrolment/Student provisioning, shared package changes, commits or pushes.

Final Applicant `npm run check:all` passed: **29 unit/component tests**, **28 browser checks** (five Chromium widths 375/768/1024/1280/1440 and phone/tablet WebKit), lint, TypeScript/build and production-exclusion verification. Tests cover sequential/repeated/disabled actions, unknown/foreign IDs, malformed commands, revision/session/idempotency guards, failed review/send retry, attachments and limits, fixture validity, scenario retention, independent checklist checks, keyboard dropdown use, resource teardown, approval with unread messages, read-only chat and refresh reset. All seven focused Student admissions-handoff tests passed after synchronizing the application contract's verification metadata; handoff version 1 and Student schema 4 are unchanged. Student's previously recorded full gate remains the baseline; its runtime/profile UI was not changed by this increment.

Reviewed Admin page top and conversation captures on phone/tablet/desktop; no horizontal overflow in tested widths. Capture artifacts are ignored under Applicant `test-results/admin-top-*.png` and `admin-*.png`. The existing restricted meta-viewport and exact shared sent-attachment/timestamp contrast exceptions remain scoped in axe checks; no full WCAG or physical-device certification is asserted. Production bundle is 814.33 kB / 243.20 kB gzip with the existing nonblocking >500 kB advisory. Local log: `cms-student-portal/logs/applicant-admin-final.txt`. Canonical/public/portal links, mirrors, contracts, pins, YAML and diffs passed the 264-check documentation audit. Physical iPhone, hosted HTTP/CMS, reviewer authentication, durable evidence and deployment verification remain unverified.

## Applicant sidebar footer spacing refinement — 5 October 2026

Replaced the Applicant footer fragment with Student's existing `space-y-2` action grouping. Measured exactly 8px between Admin Actions and Log out at 375px, 768px and 1543px in Chromium. TypeScript/build, production exclusion and the 264-check documentation audit passed; existing bundle advisory remains. No shared component change or new automated test was added. No commit or push.

## Enrolment acceptance and next-login transfer — 6 October 2026

### Local mock behaviour

Implemented empty conversations on submission and scenario initialization; explicit Admin reviewer messages retain unread/Action Required behaviour. Approved applications use shared 0.6.1 SummaryCard/Popup/Button APIs for first-preference intake/faculty/programme confirmation. Cancellation changes nothing; pending dismissal/duplicate confirmation is disabled; failed acceptance is retryable. Acceptance metadata, stable handoff IDs and the captured catalogue reference remain outside the immutable snapshot. Cards/summaries display Enrolment Accepted; approved/accepted chat is read-only.

The independent canonical Design descriptor matches Student's existing first-semester curriculum. Acceptance carries one captured reference date and matching intake/registration windows, including required creative portfolio evidence. Development logout keeps scenario records, resources and drafts. Accepted next-login opens a new Student tab via strict one-time origin/window/nonce/payload exchange; unaccepted login returns to the retained Applicant draft. The isolated Student account/enrolment preserves incoming personal, academic and evidence metadata and inherits no registrations/results/charges/visa clearance. Existing module selection, fee, credit and clash rules remain; international transfers remain blocked without the required Immigration/eVAL workflow. Refresh resets the mock session.

Citizenship, Date of Birth, Place of Birth and Country of Education now match equivalent validation labels case-insensitively, preserving repeated-section scope. Inline invalid styling, accessible descriptions and first-invalid-control focus remain; no page-wide validation list.

### Final verification

| Gate | Result |
| --- | --- |
| Applicant `npm run check:all` | Passed: 43 unit/component tests, 49 Chromium/WebKit checks across 375/768/1024/1280/1440 and phone/tablet WebKit; lint, TypeScript/build and production exclusion passed |
| Student `npm run check:all` | Passed: 740 unit tests, 273 Chromium checks (41 intentional skips), 38 WebKit checks (31 intentional skips), token/assets/build/production/bundle gates |
| Student follow-up `npm run check` after receiver-model extraction | Passed again: 740 units, lint without the earlier Fast Refresh warning, build, exclusion and all bundle budgets |
| Two-checkout `npm run test:handoff` | Passed all seven configured width/engine journeys: popup/cancel/focus, acceptance, new-tab transfer, identity/curriculum, selection and actual module registration, refresh reset |
| Contracts/docs | Independent admissions and catalogue descriptor/transport copies, golden fixtures, OpenAPI YAML/references, links, mirrors, shared 0.6.1 pins and diffs passed the documentation audit |
| Catalogue | 98 canonical/public captures validated, including six reviewed acceptance/registration phone/tablet/desktop captures with explicit portal ownership and uncommitted source provenance |

Acceptance unit/component coverage includes unavailable ownership, stale/concurrent writes, duplicate requests, immutable snapshots, retry, cancelled/pending popup and read-only conversations. Transport coverage checks wrong origin/window/nonce/payload, one-time delivery, consumed transfer rejection, blocked windows, timeouts, stale sessions and cleanup. Student bootstrap tests verify preservation of existing students, isolated registration and international eVAL restrictions. The relogin browser regression caught a stale sign-in outlet that restarted logout after navigation; sign-out initialization is now owned by the logout route and return navigation commits before the session reopens. The final seven-project rerun passes.

Production exclusion initially caught a development login guard string. Automatic approval review rejected renaming it because that would weaken the check. The complete development callbacks are now conditionally excluded; the original forbidden marker/check remains unchanged and the production gate passes. Sender, receiver, bootstrap fixtures and login routes are development-only; HTTP sessions disable the simulation.

Student's final eager JavaScript is 195,692 gzip bytes within the unchanged 192 KiB allowance; largest chunk 340,938 bytes. Applicant retains its non-blocking >500 kB chunk advisory (818.06 kB / 244.35 kB gzip); no new Applicant budget or shared release is claimed.

### Responsive limits and integration boundary

Phone/tablet/desktop and keyboard popup/focus/navigation reviewed from real Chromium/WebKit captures. Existing Student Module Registration tabs/table overflow remains unchanged. Same-engine/width baseline comparisons recorded equal `main.scrollWidth` values: Chromium 375=749, 768=757, 1024=942, 1280=781, 1440=910; WebKit phone=749, tablet=757. This is a preserved existing layout issue, not a claim of zero overflow or full WCAG conformance. No shared/local layout redesign was added to remediate it.

OpenAPI documents acceptance as an in-process mock operation and the serializable version-1 browser envelope; no HTTP endpoints were added or exercised. Student schema stays 4 and admissions handoff stays version 1. Evidence bytes remain in Applicant, not transported or durably delivered. Real authentication, offers, operational Registry/CMS provisioning, hosted backend compatibility, physical-device keyboard/zoom and deployment checks remain unverified. No migrations/reseeds/deployments were performed.

Logs: `cms-student-portal/logs/applicant-enrolment-final.txt`, `student-enrolment-final.txt`, `student-enrolment-follow-up.txt`, `handoff-enrolment-final.txt`. Source HEADs unchanged: Control Plane f5719e4, Applicant 5fbfff0, Student 666a740. Design System checkout untouched; both portals remain pinned 0.6.1. All prior uncommitted work preserved. No commits or pushes.

## Automatic post-acceptance logout — 6 October 2026

Accept Enrolment now saves the immutable application acceptance, closes the popup, signs out the development mock session and shows the existing Sign in screen. The applicant explicitly activates Sign in to open the existing new Student tab at Module Registration. No automatic sign-in or window opening is added. Intake, Faculty and Programme remain in the shared popup, with the revised explanation. Cancel changes nothing.

Acceptance and logout have separate error handling: a failed acceptance stays in its popup; failed logout preserves Enrolment Accepted and offers Retry Sign Out without issuing acceptance again. Pending controls prevent duplicate actions. Session owner/generation is checked before/after query cancellation, and after logout before navigation. Old callbacks and scenario changes during cancellation cannot log out a different applicant. Query cancellation failure leaves the session, accepted records and original evidence resources available for retry. Records, checklist and drafts remain until refresh.

Final results:

- Applicant `npm run check:all` passed: **48 unit/component tests and 49 Chromium/WebKit browser checks**, plus lint, TypeScript/build and production exclusion.
- All **seven** cross-portal handoff checks passed automatic logout, an explicit Sign in click, transfer, module selection/registration and refresh reset. Phone Chromium/WebKit keyboard activation passed **two** focused checks; tablet/desktop popup capture checks also passed.
- UI cancellation, pending dismissal, acceptance failure/retry, logout failure/retry without reacceptance, preserved accepted data/files, stale callbacks, mid-cancellation scenario changes and HTTP disablement are covered. Existing incomplete draft, field validation, reviewer messages and unaccepted logout/relogin checks pass.
- Reviewed updated popup and resulting Sign in screens at 375, 768 and 1440px. Refreshed only the three Applicant popup catalogue captures; Student capture/resources remain unchanged. Canonical/public catalogue contains 98 validated captures; contract/fixture/link/mirror/YAML/pin/diff checks pass.

One earlier browser run lost a draft after an unexpected reload. Its trace shows two document GETs and two Vite client connections; it does not establish the exact trigger. Applicant now uses Student's established isolated Vite test configuration (`hmr: false`, `watch: null`) for both browser gates. The final full gate passes, including the failed case. Normal development configuration is unchanged and explicit test refresh still resets the mock session.

The React review verified unconditional hooks, guarded async callbacks, separate retry state, documented shared component slots and accessible error/status feedback. Applicant's final production chunk is 818.94 kB / 244.55 kB gzip, with the existing non-blocking >500 kB advisory. No new package budget or release is introduced.

This refinement changes only Applicant workflow/runtime and its test harness; Student implementation, browser transport, acceptance operation/contracts and schema versions are unchanged. The prior passed full Student gate remains the baseline; no unnecessary Student-wide rerun is claimed. Existing Student registration tabs/table overflow is unchanged, with the same baseline/transfer widths in the seven cross-portal checks. Physical-device, HTTP/CMS provisioning, durable file delivery and hosted integration remain unverified. The simulation stays excluded from production and disabled for HTTP configuration.

Logs: `cms-student-portal/logs/applicant-auto-logout-final.txt`, `handoff-auto-logout-final.txt`, `handoff-auto-logout-keyboard.txt`, `auto-logout-catalogue-captures.txt`. Shared remains **0.6.1**. Existing uncommitted work preserved; no commits, pushes, package releases or deployments.

## Browser comment refinements — 6 October 2026

Completed Applicant's equal-width Documents Checklist actions through the existing PageActionBar action slot. Student Documents displays Offer Letter first by aliasing the existing Enrolment Confirmation in its profile projection; stored classification, IDs, owners and filenames are unchanged. Immigration continues to select its original evidence and receives no new offer-letter record. Student expandable menu triggers compose shared PortalNavItem asChild, using the existing released white label treatment and keeping expansion/routing intact.

Applicant full gate passed: **48 unit/component tests and 49 browser checks**, including equal checklist widths across all seven Chromium/WebKit projects. Focused Student Documents/Immigration coverage passed **22 tests**. Captures were reviewed at 375, 768 and 1440px; action widths are 146.5px each on phone and 142.015625px each on tablet/desktop. Keyboard expansion/collapse passed at all three widths, including phone drawer focus return. Student's compact tablet rail is retained. Nine affected catalogue captures describe uncommitted consumer source using released shared **0.6.1**.

Student's final full npm run check:all gate passed: **741 unit tests, 273 Chromium checks with 41 intentional skips, and 38 WebKit checks with 31 intentional skips**, plus token/assets/lint/build/production and bundle budgets. One earlier Chromium accessibility navigation case timed out; the complete rerun passed it without changing product code or weakening its assertion. The timeout's exact cause is not established.

The requested trailing primary Save & Close action needs an additive shared Popup slot: released 0.6.1 renders its built-in dismiss action last. The isolated Design System candidate adds footerAfterDismiss without changing default geometry; its complete checks passed **13 unit tests and 14 consumer browser checks**, including action and keyboard order at three widths. A focused follow-up passed the three-action footer bounds and trailing action alignment; its phone/tablet/desktop candidate screenshots were visually reviewed. Publication of proposed **0.6.2** is awaiting explicit approval under campus commit/push and published-consumer rules. Candidate source stays unpublished; portals remain pinned to 0.6.1 and Applicant's leave dialog has not yet been changed. There are no portal commits or pushes, persistent files, backend/schema changes, or new offer-generation workflow.

Logs: cms-student-portal/logs/applicant-checklist-width-final.txt, letter-immigration-regression.txt, student-document-sidebar-confirmed.txt, comment-fix-captures.txt and shared-popup-candidate-check.txt. Physical-device/backend integration is not asserted.

## Campus sync, shared 0.6.2 and Save & Close — 6 October 2026

All seven existing campus checkouts were backed up with exact tracked/untracked stash IDs before fetch and integration. Control Plane fast-forwarded three incoming registration-research/navigation commits; public docs fast-forwarded four research/Pages commits. Other checkouts were already current. Stash restoration conflicted in five Control Plane files (manifest, Applicant guidance, SDD-04, navigation generator and Eswatini HTML) and the public Eswatini HTML mirror. Both sides were reconciled: incoming research and absolute-URL navigation remain; Lesotho-first pilot guidance and validated local mock flows remain. Generated navigation/search includes both research pages. There was no rebase, force push or modification to the two clean documentation worktrees.

Design System 0.6.2 adds optional Popup.footerAfterDismiss with unchanged defaults. Full package checks passed 13 units and 14 consumer browser checks. Release commit b58dae5cae194ad410c42bfe698c8b47d125a785, main CI 37481433498 and tag/publish CI 37481747510 passed. Package availability and installed consumer versions were verified. Both portals pin 0.6.2.

Applicant's leave popup now provides Discard Changes, Keep Editing and primary Save & Close. Incomplete drafts use the existing API and resume the originally blocked destination after successful save. Pending save disables all dismissal/discard/confirmation; failures preserve data/files and allow retry. Synchronous duplicate and session/unmount guards prevent repeated writes or stale navigation. Four new component tests and two seven-project browser journeys cover the flow. Final Applicant full gate passed **52 unit/component tests and 63 browser checks**, including phone WebKit. An initial test expected payment.pdf instead of the fixture's synthetic-payment.pdf; corrected. A phone WebKit test now awaits popup removal and visible header before navigating. The product logic was not weakened.

Actual running Applicant Vite still served an old optimized Popup after package upgrade. Its exact 5173 process was refreshed with the same flags; isolated real-server phone/tablet/desktop capture review then confirmed all three actions and cancellation retention. Session-only demo state reset as documented. Only that dev server was restarted. Three new release captures use 0.6.2; historical image provenance remains unchanged.

Integration documentation checks fixed an incoming unquoted YAML colon, aligned the public capture validator with canonical Applicant ownership support, and normalized verified identical text mirrors after stash EOL conversion. Registration gap summaries now describe mock validation/review/acceptance accurately while retaining missing Live authentication, offer UI, durable upload/provisioning, captured 10 MB versus mock 25 MiB and Lesotho policy gaps; row counts are derived from the matrix. No new campus requirements were implemented. OpenAPI minimal lint passes with seven no-unused-components warnings for deliberately documented mock-only contracts that are not HTTP routes.

Student final full npm run check:all passed **741 units, 273 Chromium checks/41 intentional skips and 38 WebKit checks/31 intentional skips**, plus lint/type/build/production/assets/token/bundle checks. All **seven cross-portal handoff checks passed**, including manual Sign in, isolated Student ownership, first module selection/registration and reset. Student eager JavaScript remains within its existing budget. Local mock tests do not verify physical devices, live HTTP/CMS provisioning or durable file delivery. Existing accessibility exceptions and bundle advisories remain documented; no authentication/database/schema migration was introduced.

Publication uses normal upstream pushes after these local gates. Final commit IDs, remote SHA agreement and hosted CI/deployment outcomes are reported separately from local mock verification. Backups are retained until each corresponding repository is verified and published. Logs: student-sync-062-check-all.txt, applicant-sync-062-check-all-final.txt, campus-sync-062-handoff.txt, campus-sync-openapi-lint.txt, design-system-062-release-check.txt and save-close-actual-captures.txt under cms-student-portal/logs.
