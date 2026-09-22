# Restored Student Portal audit — 8 September 2026

**Repair follow-up:** The user subsequently requested “fix all”. R01–R04 have been repaired in the working tree; current verification and disposition are recorded at the top of [the handoff](../handoff.md). The report below preserves the pre-fix findings and exact historical results. The six audit assertions now live in the normal regression suite with additional boundary checks; the historical command delegates to that suite and is expected to pass after repair.

Repair acceptance: full `npm run check:all` passed **411 unit tests /58 files and 142 Chromium tests (5.2m)** with two browser workers and unchanged timeouts. Subsequent CSS-only spacing for short classes passed a fresh build and **4/4** focused browser tests (15.5s), plus production-isolation and bundle checks. Legacy numeric assignment links remain supported only within their owning offering. R01–R04 have no outstanding repair blocker; the restored prototype's scope limitations remain. See `logs/audit-fixes-complete-check-all.log` and `logs/audit-fixes-final-browser.log` for the local evidence. No commit/push for this repair request.

The user requested restoration of the saved portal and an audit. Restoration is complete. No application fixes were applied during this audit; the findings below describe the restored version, not the newer implementation.

## Recovery and current scope

- Current branch: `codex/restored-portal-audit`, based on original `main` commit `6811e886fce1e86c366bd92d66cb74ba5ce612d2`.
- Restored the actual working files from the private package `D:\Coding\backups\cms-student-portal\20260907T130310Z`, including the saved planning documents, supplied requirements and untracked outputs. Verified all six package artifact hashes and sizes, the Git bundle, and all 466 archived file checksums before/after restoration. The recovery package remains unchanged.
- The newer implementation is preserved on `codex/student-portal-completion` at `9d492643d68a6adc026b2ea88e79627696ea7837`, already present on the existing remote. Original main and the recovery checkpoint were not reset or overwritten. No force push was used.
- Dependencies were reinstalled from the restored lockfile. The local preview on port 5173 runs the restored application.
- This returns the project to its desktop frontend prototype: two Cyberjaya student scenarios, documented placeholder journeys, and limited isolated Services responsiveness. Full phone/tablet support and eight-campus completion are no longer the active implementation. Do not automatically resume the superseded completion task.
- Application source, public assets, contracts, fixtures, configuration and original tests remain at their saved state. New audit probes and this record are separate additions. The handoff is updated above its preserved historical entries; saved planning/requirements files were not rewritten.

To restore independently again, follow the package's `RESTORE.md`: verify `artifacts.json`, clone `repository.bundle` into a new directory without checkout, create a recovery branch at the original commit, extract `working-tree.zip`, compare its manifest, restore the index with `staged.patch` only if non-empty, and run `npm ci`. Do not apply `unstaged.patch` over the extracted files; the archive already contains those changes. Keep the package private.

## Confirmed findings

All four findings are P2 correctness issues. Six assertions of the expected behavior reproduce them. They remain intentionally unfixed so the restored application is not silently changed.

### R01 — Timetable loses minutes and silently moves evening classes

[Timetable displaySlot](../../src/components/features/timetable/timetable.tsx) reads only the hour from class times, rejects entries whose integer end hour equals their start hour, and clamps classes to its fixed 07:00–19:00 grid.

- A valid 09:15–09:45 class disappears entirely.
- A valid 20:00–21:00 class appears in the 18:00–19:00 column (`gridColumn: 12 / 13`).
- Browser probes reproduced both outcomes at 1280px and 1440px. The screenshot shows the late class under 18:00 and no short class. Default whole-hour fixtures conceal this defect.

This shared renderer affects timetable consumers including Academic, dashboard and registration previews. Recommended repair: calculate positions in minutes and accommodate the actual time range, or clearly represent out-of-range classes without changing their displayed time.

### R02 — A late Resume save repopulates a discarded session's cache

[Portal runtime](../../src/services/portal-runtime.tsx) keys caches by scenario ID. [Resume mutation success](../../src/services/portal-queries.ts) writes its response without checking whether the originating session is still current.

The probe saves a real Resume update, delays only delivery of that response, switches Alya → Rizal → Alya, confirms the fresh Alya Resume is empty, then releases the old response. The new Alya cache receives `Discarded session summary` instead of staying empty. Cancelling queries does not reject a pending mutation's success callback.

This is a demonstrated development session-reset/cache-integrity defect. It does not establish cross-student disclosure or a production authentication vulnerability. Recommended repair: include session generation in scoped keys and reject stale mutation results across all relevant writes.

### R03 — Materials has conflicting weeks and learning progress

[Materials API](../../src/services/mock-module-materials-api.ts) uses [separate Materials fixtures](../../src/mocks/module-materials-fixtures.ts) instead of projecting the [canonical records](../../src/mocks/portal-record-fixtures.ts).

- GRD301's current offering contains 14 canonical teaching weeks, while Materials returns 12.
- The selected graph has no completed learning-progress records, but Materials marks one week completed because teaching time has elapsed.

The tests compare the real API output with its graph and offering ID. This is a conflicting source of truth, separate from the documented absence of working resource downloads or lesson-completion controls. Recommended repair: derive the weeks, resource relationships and actual student completion from the same canonical offering/registration records; elapsed teaching weeks must not imply student completion.

### R04 — Module attendance takes configuration from the first campus

[Module Attendance projection](../../src/services/mock-academic-module-attendance-api.ts), lines 32–33, reads `campuses[0]` and `programmeVersions[0]`.

Inserting an unrelated, valid Botswana campus first in the graph changes the unchanged student's Attendance timezone from `Asia/Kuala_Lumpur` to `Africa/Gaborone`. The graph still passes its contract; the probe restores the fixture afterwards. The threshold lookup has the same positional assumption, although the timezone is the tested failure.

The ordinary two Cyberjaya scenarios conceal this problem. This is a data-order/campus-expansion defect, not a claim that the default student currently sees Botswana data. Recommended repair: traverse selected student → active enrolment → owning campus and programme version.

## Verification evidence

| Check | Exact result |
| --- | --- |
| Restored dependency installation | Retry succeeded: 573 installed, 574 audited, zero vulnerabilities. Initial attempt hit a locked Rolldown binary; only the confirmed old repository Vite process was stopped before retry. |
| Initial unchanged full gate | Exit 1: 397 unit tests passed, one chart test exceeded its existing 5000ms timeout; later stages were not reached. |
| Focused unchanged chart rerun | 7/7 passed; 5.13s total. No timeout increase. |
| Final full gate: `cmd /d /c "npm run check:all -- -- --workers=2"` | Exit 1. Token, Services asset, lint, TypeScript/build, production-isolation and bundle checks passed. Units: 398/398 in 57 files, 40.77s. Chromium: 137 passed, 1 failed of 138, 5.3m. |
| Full-suite browser warning | The 1280px assignment-navigation test timed out at its initial dashboard control. Its trace records the React Query module failing to load with `net::ERR_NO_BUFFER_SPACE`, preventing application startup. This run is not a clean gate pass. |
| Focused unchanged assignment-navigation rerun | Both 1280px and 1440px passed: 2/2, 15.5s, one worker, original timeout. |
| Additional correctness probes | Six expected-correctness assertions fail across the four findings, 5.62s. Kept outside the default test suite so historical findings are explicit, not disguised as passing tests. |
| Browser reproduction | Standalone observation script passed at 1280px and 1440px: both timetable defects reproduced, no page errors, document width equals viewport width. This exit 0 means the reported defects were observed, not that timetable correctness passed. |

No application timeout, retry policy or browser configuration was relaxed. No new build warning was emitted. Registration flows passed in the final full suite; the saved handoff's older registration timeouts are historical, not this run's failure.

Final audit-only checks: change-surface review exited 0 with no obvious companion-layer gaps; focused audit-file lint exited 0; `git diff --check` passed; all 34 local links in this report and the handoff resolve; new audit files have no trailing whitespace. A final manifest comparison confirms 465/466 original saved files remain byte-identical, with only `docs/handoff.md` deliberately updated. New audit files are additions, not replacements of saved application files.

The restored suite exercises academic registration/history, assignment transitions, profile/builders, chat, finance/proof/tax/award behavior, canonical contracts/relationships, Services routes/assets/responsive content and shared navigation/keyboard behavior. Additional source review targeted ownership, projections and stale mutation callbacks. No additional confirmed finance or registration defect emerged from these checks; this does not prove absence of all defects.

Fresh browser captures cover Timetable, Finance and Personal at both desktop widths. Timetable edge-case and Finance screenshots were visually reviewed. A 375px observation confirms the restored shell remains unsuitable for phone use (clipped header/tab content, compressed summary and timetable). This is a restored scope limitation, not newly completed mobile work. No WebKit or physical-device acceptance is claimed. There is no live backend, production security, real-payment or regulatory-compliance verification.

## Reproduction and retained artifacts

```powershell
node node_modules/vitest/vitest.mjs run --config tests/audit/restored-portal.config.ts
node tests/audit/restored-portal-browser.mjs
node scripts/run-playwright.mjs tests/e2e/portal.spec.ts --grep "opens assignment details from module issues and calendar deadlines" --workers=1
```

The first command is expected to exit 1 until R01–R04 are repaired. The browser script needs the local preview on port 5173 and changes only its isolated in-memory test session.

- [Correctness probes](../../tests/audit/restored-portal.test.tsx), [isolated configuration](../../tests/audit/restored-portal.config.ts), [browser probe](../../tests/audit/restored-portal-browser.mjs).
- Local ignored evidence: `logs/restored-audit-check-all.log`, `logs/restored-audit-check-all-final.log`, `logs/restored-audit-performance-recheck.log`, `logs/restored-audit-assignment-recheck.log`, `logs/restored-audit-probes-final.log`, and `logs/restored-audit-browser.log`.
- Browser trace retained at `logs/restored-audit-assignment-failure/trace.zip`; visual captures and measured observations at `logs/restored-audit-visual/`. These local logs are not a committed artifact bundle.

## Disposition

Restoration and audit are complete. Known prototype placeholders (including unfinished housing/support/authentication and document/resource actions) remain as saved, and are not counted as new regressions. No repairs, application feature changes, commit or push were performed for this request. The next decision is which findings to fix; do not resume the larger completion plan without a new instruction.
