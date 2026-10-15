# Classrooms and Materials verification — 15 October 2026

Status: verified locally against isolated memory services and an unreleased shared-package candidate. The clean published-pin Lecturer build remains blocked by the unreleased AuditTrail export. No commit, push, publication, migration or deployment.

## Scope and fixes

This pass covers day/session attendance, saves and corrections, separate avatar audit trails, responsive Classrooms navigation, read-only Materials metadata, Demo PDFs, original submissions and published feedback. The owner explicitly resumed all necessary testing, including the Lecturer aggregate gate.

- Fixed a real resource-detail regression: Student's exact-item projection rejected items without an assessment ID, although resources legitimately have none. Bundled notes then broke the Materials list returned after a submission. Owned resources now pass the same registration and release checks as assessments; foreign and unknown IDs still fail.
- Added the optional publisher/update fields to the Data Model Explorer metadata, matching the existing validated read model.
- Made unit and browser mock fixtures explicitly ignore the activated local HTTP API URL. HTTP tests opt in explicitly; ordinary tests cannot accidentally use the user's API.
- Extracted the existing day/session resolver for boundary tests without changing its agreed selection policy. Added safe, unique title-normalised audit-avatar matching after exact-name matching.
- Replaced obsolete pre-overhaul assertions with current behavior tests and regenerated Lecturer's canonical Demo snapshot/hash.
- Added reusable paired/browser navigation verification scripts and API PDF/session regressions. Credentials are supplied through environment variables, not tracked files.

## Gate results

| Project / boundary | Result |
| --- | --- |
| Student complete `CI=true PLAYWRIGHT_WORKERS=2 npm run check:all` | Passed uninterrupted after fixes: tokens/assets/lint, 809 unit tests across 104 files, TypeScript/production build, production exclusions, bundle budgets, 278 Chromium cases with 46 intentional skips, 41 WebKit cases with 31 intentional skips. Chromium took 19.2 minutes; WebKit 2.2 minutes. |
| Lecturer candidate `npm run check` | Passed lint, all 63 tests across nine files, TypeScript and production build in an isolated consumer of the exact packed shared candidate, with the source-preview alias and TS mapping removed in that consumer. |
| Lecturer `npm run demo:check` | Passed after canonical snapshot regeneration. |
| API local TypeScript | `npm run typecheck:local` passed, including the new regressions. |
| API Classrooms | Existing isolated memory submission/marking/attendance scenarios passed. |
| API Materials / Community / Lecturer modules | 72 Materials, 46 Community and 20 Lecturer-module checks passed. |
| New API regressions | 780 assertions passed across 112 seeded PDF descriptors/downloads, metadata/release boundaries and independent same-day attendance. Canonical graph unchanged after overlay mutations. |
| Shared `npm run check` | Passed typecheck, 21 unit tests, package build, standalone consumer build and 35 Chromium consumer cases. New AuditTrail coverage includes loaded/broken/missing photos, long content, empty state, invalid timestamps, ordering, wrapping and accessibility. |
| Paired HTTP/browser flows | All 11 scenario groups passed; zero uncaught page errors. Separate navigation suite passed all five groups, including zero API requests in browser mock. |
| Contract/documentation | 26 generated shared schemas match canonical OpenAPI after applying its six documented read-only wire refinements; five exact source/public contract mirrors match. API docs check and scoped source checks passed. |
| PDF readability/restart | Both one-page PDFs parsed and rendered cleanly. Both kinds retained exact metadata and SHA-256 after an actual isolated API process restart. |
| Student final source audit | Final lint passed; change-surface audit reported no obvious companion-layer gaps. |

## Browser acceptance evidence

Paired mutations used only API 8106 and isolated Lecturer/Student servers 5206/5207, with a 29 September 2026 server clock so existing assignment deadlines remained unchanged. Mock-only Lecturer used 5208. The scripts refuse the normal development ports.

Attendance checks cover one/multiple sessions per day, campus-local midnight, current/pending/upcoming/latest defaults and ID ties, direct/invalid links, day arrows, Back/refresh/query preservation, future/cancelled/completed/empty states, complete-roster submission, failed saves, correction reasons, real conflicts and explicit reload, per-session drafts/marks/history and paired Student statuses. Today exposes both 1 September sessions with the appropriate Take/View action; empty Today has no next-class fallback.

Navigation checks cover exact-offering active surfaces without borders, hidden chevrons, filled issue icons, centered tab badges, zero-issue hiding, empty-panel alignment, the measured sticky offset, equal side-by-side selectors and wrapping, narrow panel switching, keyboard controls, accessibility and no horizontal page overflow at 375/768/1440px. Audit history stays outside the attendance tab panel and resolves an actual authorised staff photo. Community unsent draft survives workspace-tab changes.

Materials checks cover truthful missing fields, all supplied quiz/exam details and resource/assignment flows. Reading/video/link presentation uses explicit isolated response fixtures rather than invented canonical content. Lecturer and Student download original bytes with exact names and SHA-256, and keyboard PDF preview works.

Submission checks cover PDF upload, Lecturer original download, private marking, explicit publication, corrected versions, Student visibility, ZIP replacement and confirmed deletion. Earlier feedback is deliberately retained and labelled as referring to an earlier submission; its submission ID differs from the replacement, which is excluded from the current Published filter. New files do not inherit marks. Existing API scenarios cover limits, signatures, conflicts, retries, stale authentication, ownership and deadline locks.

Evidence is in Student `logs/classrooms-final-verification/` (ignored): gate logs, `browser/result.json`, `browser-navigation/result.json`, responsive roster/history/material/marking/feedback captures, PDF renderings, restart receipts, schema parity and both package archives. Initial harness failures were corrected for mock-URL leakage, package resolution, source-ignore rules, Windows CLI argument handling, explicit browser contexts, dialog acceptance, reauthentication after Student reloads, loading waits and scoped locators. Product assertions were retained.

## Package release boundary

The verified local candidate archive is `raisd-campus-design-system-0.7.0.tgz`, SHA-1 `a85bcf26e6fc1f7c10fbcc5f840de11c894a14ad`, 263 files. This is an unpublished candidate, not a replacement of registry version 0.7.0.

A fresh authenticated registry archive contains 260 files, SHA-1 `5da048da77cce36a137df83d940d3132cce0fb87`, and matches Lecturer's lockfile SHA-512 integrity. A clean `npm ci` in a separate temporary consumer succeeded. Its production build fails with TS2307 because published 0.7.0 has no `system/audit-trail` export. The normal development preview also depends on temporary source mappings, which can introduce duplicate React type identities during a build.

A future shared release and approved consumer pin upgrade must supply AuditTrail and remove the temporary Vite/TypeScript/Tailwind source-preview mappings. No current dependency pin or installed package was changed by this verification. Applicant source and the shared components it consumes were not changed, so no Applicant gate is claimed or required for this pass.

## Current local state and limitations

The user's API on 8087 and portal servers on 5173/5174/5175 were preserved. All test resets and saves used isolated services. The verified Student projection fix is source-only for the current non-watch API and takes effect on its next separately authorised restart; that restart would reset saved Demo memory/session state. Current API policy, persisted schema/version, Faculty weights, schedules and deadlines remain unchanged. Server partial attendance saves remain supported; complete-roster enforcement remains the approved UI rule.

Existing Lecturer chunk-size advisories, jsdom Window.open notice and npm audit findings were not hidden or fixed through unrelated dependency upgrades. A clean published-consumer install reported the existing dependency audit findings; no automatic audit fix ran. The isolated API's absent Applicant Demo credentials warning does not affect these flows. No hosted CI, physical-phone verification, durable persistence, registry publication or production deployment is claimed.

The temporary verification services were stopped after evidence collection; current user services remain running.


## Approved 0.8.0 release and API activation — 15 October 2026

This section supersedes the earlier package-release blocker and pending local API
activation. The owner authorised package publication, affected pins and API restart.
The library source and portal/docs edits remain local and uncommitted; no tag, push,
portal deployment, catalogue hosting promotion or migration was included.

- Published **@raisd-campus/design-system 0.8.0** to GitHub Packages, then downloaded
  the registry archive and verified byte-for-byte equality with the prepared archive.
- Registry integrity: `sha512-LTqjMRDlI4y+FeY4S021C8wmXlhH/Iob5i3kKbNNRTtXhbT+HH/0GqlPcQZmXV44SDqWuyZAg614/V1GcWr+MQ==`.
- All **263 package files** match the archive in Student, Applicant, Lecturer and a
  separate clean registry consumer. Only the root shared pin and shared package
  entry changed in each portal lock; unrelated dependency pins stayed identical.
- Removed Lecturer's Vite source alias, TypeScript path and sibling Tailwind source.
  Production consumption now uses only the normal installed 0.8.0 subpath/types.
- Shared `npm run check`: **21 units + 35 browser cases**, typecheck, package build
  and standalone consumer build passed.
- Exact prepared-archive Lecturer `npm run check`: lint, **63 tests**, production
  build passed. Registry-installed Lecturer `npm run check` and `demo:check` passed.
- Fresh temporary Lecturer `npm ci --ignore-scripts` and complete `npm run check`
  passed against the registry release with no source mappings. The historical
  clean 0.7.0 TS2307 AuditTrail failure is resolved.
- Applicant `npm run check:all`: **65 unit/component + 70 browser cases passed**,
  lint, TypeScript/build and production exclusions passed.
- Student `npm run check:all`: **809 units**, token/assets/lint, production build,
  exclusions and bundle budgets passed; **278 Chromium + 41 WebKit cases passed** (46/31 intentional skips); the complete post-upgrade gate passed uninterrupted.
- Six shared captures (AuditTrail and expanded accordion, 375/768/1440px) were
  reviewed. Canonical/public-source catalogues validate **197 captures** with
  historical versions retained. Source provenance explicitly marks uncommitted
  release source; this does not claim hosted catalogue promotion.

### Current local service activation

The exact existing 8087 memory API process was stopped and rebuilt through its
existing `.local-tests/start-materials-demo.ps1` launcher. New server PID 51196
reports healthy stub/session-memory mode with Materials and Classrooms enabled.
This loads the resource-detail projection fix. Current portal PIDs on 5173/5174/
5175 were preserved. API restart cleared in-memory sign-ins and Demo mutations;
canonical sessions and bundled PDF bytes remain. No database URL or reset was used.

Read-only checks in the actual running Lecturer and Student portals passed at
375/768/1440px with no page errors or horizontal overflow. Both downloaded
`DEMO-grd301-week-1-notes.pdf`, **2710 bytes**, SHA-256
`418f1b2da774bf86ad95fec635a8a2b6fab4a1cc990819453545e6ac87eaca5e`.
No attendance, submission or feedback changes were made in these local checks.

### Publishing authentication follow-through

The initial CLI token was rejected with HTTP 403 for missing package-write scope.
The prior 0.7.0 release had used a hidden process-only token and cleared it afterward.
A separate Git Credential Manager lookup was initially rejected by automatic
approval review; after the owner's explicit approval it was checked privately and
confirmed to lack package scopes. No credential was exposed or committed.

The owner completed GitHub's device approval to refresh the securely stored CLI
login with read:packages/write:packages. Publication then succeeded. A new process
using that stored login verified the identical existing registry release without
republishing, confirming the authentication setup survives the publishing process.
The shared README and AGENTS now specify the source and one-time scope setup.

`npm run release:publish -- <archive> <pack-receipt>` checks source version, archive
SHA-512, publishing scope and registry state before writing. It verifies publication,
rejects conflicting existing bytes and supports --verify-only. Wrong-version and
conflicting-archive negative checks passed without registry mutations. Temporary
npm configuration holds only environment interpolation and is removed afterward.

Logs, exact archive, registry receipt, clean consumer path, six captures, integrity
comparison and local browser results are retained under Student's ignored
`logs/audit-trail-release/`. Existing chunk-size/colour/Window.open advisories and
npm audit findings were not addressed through unrelated dependency changes.
