# Shared Community candidate verification — 13 October 2026

Local Demo implementation only. No package publication, released consumer pinning, commit, push, hosted migration or application deployment has occurred. The existing uncommitted Lecturer shell is preserved. Dashboard remains empty; Dashboard is the only primary menu item, with Materials retained as a direct route.

## Implemented surface

- Design-system 0.7.0 is an additive locally packed candidate: directory/group lists, members, avatar stacks, conversation header/layout, message list and responsive dock/overlay. Student's existing presentation is retained; portal data, eligibility, routes, queries, drafts, scroll state, services and meetups remain outside the package.
- Lecturer uses canonical Prof. Adam Watson, `staff-adam-watson`, L00032, the existing staff avatar and sample email. Its Community dock starts at 296px and uses Student's shared pointer/keyboard resize handle and phone/tablet use the existing full-screen overlay. Group → members → direct messages and Back retain drafts/layers.
- Capability-gated Portal API transport shares programme/exact-offering/direct messages. Session-derived authors, current membership, unread/read watermarks, sender-only deletion, idempotent retries and 3/10-second visible polling are enforced.
- Bounded 1 MiB API chunks carry actual original bytes. Five attachments, 25 MiB per file and 75 MiB per message remain the limits. Downloads recheck membership and verify filename/length/SHA-256; safe raster previews use temporary URLs. Failed sends/uploads retain drafts and files; failed downloads retry through the existing tile.
- Separate memory/Postgres Demo chat and artifact stores preserve Student schema 4 and the old per-student/service stores. Additive SQL is explicit. Legacy import deduplicates identical variants without replacing different messages, preserves archived exact-offering history, and marks unrecoverable attachment bytes unavailable. New import is blocked after shared writes; completed reimports are no-ops.
- Lecturer's client survives React StrictMode effect replay and still releases resources after actual unmount. Both transport copies match the canonical API browser client; late replies and capability fallback after logout/account change are rejected. Stable host refs retain composer focus through profile refreshes, and legacy service file rows retain their original presentation.

## Verification evidence

| Check | Result |
|---|---|
| Shared package `npm run check` | Passed typecheck/build, 16 unit tests, consumer build and 25 browser cases |
| Lecturer `npm run check` | Passed lint and TypeScript/build; Vitest explicitly has no unit files |
| API Community tests, resumed run | 46 memory checks passed, including inactive-account/archived-module migration |
| API disposable Postgres evidence, before pause | 73 memory + disposable Postgres checks passed, including fresh adapter/API lifecycle and original-byte persistence |
| API `typecheck:local` and `docs:check` | Passed |
| Paired local Chromium demo | 19 checks passed in independent Adam/Rizal contexts: keyboard group/roster/DM navigation, composer focus during profile polling, programme/module messages, unread/read updates, own deletion, duplicate retry, failed upload/download retry, exact binary/image bytes, preview, viewport draft/layer retention, refresh and logout |
| Student transport/service regression tests | Nine focused checks passed: seven transport tests including disposal during capability detection, and two UI checks for unchanged legacy service files and scoped shared downloads |
| Student required gate coverage | 797 unit tests passed across 101 files. The consistency full command passed 277 Chromium cases and skipped 46, stopping at an unrelated tablet form checkbox keyboard check. That exact case passed unchanged on targeted rerun, covering all 278 applicable Chromium cases. Full WebKit passed 41 cases with 31 intentional skips. Token/assets, lint, TypeScript/build, production isolation and bundle budgets passed. No uninterrupted check:all exit-zero is claimed. |
| Canonical and public catalogue validation | Both passed with 170 existing released captures; candidate captures are separate |

Nine shared candidate directory/thread/member captures at 375/768/1440px were regenerated and reviewed. Real paired Lecturer captures confirm the canonical account identity and empty Dashboard. Dashboard emitted zero teaching/material requests. The package is installed locally from a packed 0.7.0 archive in both portals; tracked release pins remain 0.6.2. No dependency versions were re-resolved during candidate installation.

An initial Chromium run passed 277 cases with 46 skips and one existing tooltip transition failure. Explicit Escape dismissal retains both hover assertions and passes at 1280/1440px; the full gate was restarted. A later full invocation stopped at a phone-drawer startup race while default enrolment resolution was still changing context. The repaired readiness check passed the applicable desktop-1440 case (desktop-1280 is intentionally skipped), and full WebKit was completed separately. The final core invocation passed all 797 units before finding a ref-shape error in the new test harness; correcting that harness was followed by nine focused passes and clean TypeScript/build/production/bundle stages. An uninterrupted final `check:all` exit-zero is not claimed; all required stages/cases are covered with these recovery checks. The first resumed Student invocation could not execute tests because the restricted temporary cache denied file renames; the full command was restarted with filesystem access. Docker's resumed launch is currently blocked by its inaccessible stale `sailor-ingest.sock`, so fresh Postgres rerun is unavailable. Prior disposable Postgres results remain the persistence evidence; the additional resumed migration tests run against memory. No Docker database files were reset or altered. Lecturer's 585 kB build chunk warning remains non-blocking. Browser checks use local synthetic Demo data; hosted CI, Live CMS, deployment and physical devices are outside this evidence.

## Approval boundary

The next approval checkpoint is publishing design-system 0.7.0 and pinning both portals to that released version. Promote the prepared candidate catalogue only with that release. Commits, pushes, hosted SQL/import execution and application deployments still require separate instructions. See [Community contract](community-chat.md), [Lecturer guidance](../frontend/lecturer-portal.md) and the [candidate captures](../../design-system/candidates/0.7.0/index.html).

Final Student bundle evidence: eager JavaScript **190,676 gzip bytes**, within the unchanged 192 KiB budget; largest chunk **362,225 bytes**. The local candidate archive remains installed in both portals, with tracked pins still 0.6.2.

Final API read-policy correction: sending alone does not advance read watermarks. Three additional memory regressions confirm retained unread counts, no fabricated peer read receipt, and explicit displayed-message acknowledgement. The refreshed paired demo passes all 19 checks against this API. The earlier 73-check disposable Postgres evidence predates this final read-policy correction; no chat SQL or Postgres adapter changed, but Docker prevents a fresh repeat.


## Community layout consistency correction — 13 October 2026

The owner superseded the earlier fixed-width Lecturer choice and required consistency with Student. `system/community-resize` now owns Student's existing grip, pointer preview/commit behavior, width bounds and 16px keyboard step. Both consumers import it; Student retains controlled width state and the original visual treatment. Shared `ChatComposer communityInset` owns Student's existing negative 12px footer inset, replacing local presentation classes and correcting Lecturer's extra bottom/side gap. No new visual styling or redesign was introduced.

Local Lecturer at port 5173 was checked against Student at 5174. Pointer drag from 296 to 416px, a keyboard step to 432px and a return to 296px preserved the open GRD301 layer and temporary draft. Phone 375px and tablet 768px use the same overlay, preserve that draft and hide the grip. The temporary verification draft was cleared; the owner's existing message was retained. Dashboard remains empty. Desktop/phone/tablet proof images are stored in Student's ignored `logs/community-candidate` folder.

Fresh shared package check passes 14 unit and 21 consumer browser cases; Lecturer lint and TypeScript/build pass. Student verification is recorded in the table above, with an unchanged targeted retry rather than a claim of a clean full command. API code and records did not change for this correction. Canonical/API/public guidance and nine reviewed candidate screenshots are synchronized. Released catalogue captures, tracked 0.6.2 pins and publication/deployment boundaries remain unchanged.


### Remaining Community parity verification — 13 October 2026

Shared loading, direct-message empty, disabled profile and conversation-error presentation now uses Student's existing appearance. Opt-in `autoFade` connects the existing shared gradients to Student's 12px scroll thresholds for Lecturer directory, roster and chat; default/controlled behavior remains unchanged. Empty group conversations render no bordered placeholder. Scroll tracking captures the live offset before layer changes, ignores old-layer/detached/loading cleanup and restores the saved position after detail hydration.

Focused local Lecturer checks passed lint and TypeScript/build, desktop directory/group/members/DM comparisons, blank empty group, disabled current-person target, roster overflow fades, DM draft retention through Back and 375/768 overlays, and Escape focus restoration. The short-height desktop group returned to its settled saved 55px offset through members → DM → Back. Temporary drafts were not sent; the existing owner message was preserved. The isolated verification tab was closed and its viewport reset. Dashboard remains empty.

Shared package checks passed 16 units and 25 consumer browser cases, including 375/768/1440 empty-state parity and automatic scroll fades. The latest local candidate was installed in Lecturer only using the installer consumer argument; Student source and its installed reference candidate were left unchanged, so no new Student full run is claimed. Before publication, install the final packed candidate into both consumers and complete their applicable release gates. Lecturer aggregate verification remains on hold under the owner's instruction. No release pinning, publication, commit, push, hosted migration or deployment occurred.
