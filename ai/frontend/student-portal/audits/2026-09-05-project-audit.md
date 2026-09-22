# CMS Student Portal audit — 5 September 2026

The initial audit found **16 confirmed application issues: 3 high priority (P1), 11 normal priority (P2), and 2 low priority (P3)**. The highest priorities were registration erasing previously saved session data and attendance being attributed to the wrong student. A separate dependency review identified two affected transitive packages.

The user subsequently approved fixing all findings, committing, and pushing the accumulated work. **All 16 findings have been repaired**, and the two affected dependency packages have been updated. The original failure descriptions and source line numbers below document the pre-repair snapshot, including its uncommitted Finance, registration, SST, Immigration, and invoice-number work; they are retained as audit evidence rather than descriptions of current behavior.

## Repair record

| Findings | Implemented correction |
| --- | --- |
| A01, A02 | Registration retains the saved Personal Profile overlay and reconciles new chat groups without clearing existing messages, deletions, or read state. Chat list and detail queries refresh. |
| A03, A04 | Transactions use a live, independently injectable clock. Confirmation/issuance and proof submission use the current instant; the registration closing instant remains inclusive. |
| A05 | Calculation and graph validation share campus-timezone date conversion. Invalid timestamps/timezones return contract validation errors rather than escaping as formatter exceptions. |
| A06 | Month filtering and day indexing share holiday interval logic, including exclusive ends and month/year boundaries. |
| A07 | Attendance uses the exact registration/session pair; Rizal's intended marks are explicitly seeded under his registrations. |
| A08 | UI and API share a clash predicate that includes teaching dates and an actual common weekday occurrence. |
| A09, A10 | Sending retains text/files on failure, supports retry, and carries pending state across composer remounts. New chat records commit only after message metadata validates. |
| A11 | The sidebar cookie write was removed. |
| A12, A13, A14 | Timetables follow student-owned offerings. Lecturer DTOs retain offering/semester IDs, and historical details use their own schedules. Existing co-lecturers are canonical assignments, also visible in Community. |
| A15 | Date-only contracts share real-calendar validation, including leap years and month ends. |
| A16 | Mock-session disposal releases saved Portfolio/chat previews and blocks in-flight resource allocation after replacement. |
| Dependencies | The lockfile now resolves fast-uri 3.1.7 and qs 6.16.0. Only these two packages changed; the fresh npm audit reports zero vulnerabilities. |

The repair suite is part of the normal quality gate: 62 API/component/boundary cases across three files, plus seven browser scenarios at both desktop widths. **Final `npm run check:all` passes all 351 unit tests across 52 files and all 92 desktop browser runs**, plus token, lint, TypeScript/build, production dev-tool, and bundle checks. Fresh `npm audit --json` reports zero vulnerabilities. Final reference and diff checks also pass. Release details are recorded in [the handoff](../handoff.md).

## Initial audit baseline and verification

- Repository: `D:\Coding\cms-student-portal`; branch `main`; HEAD `3d0663a8aeca72dedcf9531b8839edb6c2487300`; Node `v22.17.0`.
- The starting tree already contained 46 modified tracked files and two untracked application files. Those changes were preserved.
- Read the project instructions, handoff, architecture/contracts, feature documentation, implementation, and test coverage. Reviewed student ownership, repeat attempts, session mutations, date boundaries, validation, and failure handling.
- **The existing `npm run check:all` gate passed:** token checks, warning-free lint, 289 unit tests across 49 files, TypeScript/production build, production dev-tool exclusion, bundle budgets, and all 78 Playwright runs at 1280px and 1440px.
- The existing browser suite covers 39 scenarios, including registration and invoice issuance; Finance proof submission/change/withdrawal; Personal, Resume, and Portfolio editing; academic results, modules, timetable, attendance and Study Plan; assignment submission/replacement/deletion; calendar navigation; chat; scenario switching; Immigration eligibility; shared shells; and both explorers.
- Added an isolated audit suite: **33 unit/component/API cases, with 19 failing cases asserting required behavior and 14 passing checks**. The failures reproduce the findings below; they are deliberately not added to the default passing suite.
- The final isolated browser run produced **10 failing defect reproductions and 2 passing route sweeps**: A01, A02, A04, A09, and A11 each reproduce at both supported desktop widths. The route sweep exercises 14 unavailable, malformed, or placeholder URLs at both widths and passes its shell-usability assertions. These checks do not prove every error message is correct.
- The 14 passing added checks include complete read-path sweeps for both student scenarios, every owned module's detail/materials/attendance response, all six terms, selected calendar boundary months, returned-data isolation, and rejection without partial writes for invalid proof amounts, dates, references, unavailable invoice IDs, and empty/oversized/active-content files.
- Final artifact checks passed lint, `git diff --check`, and all 28 local report-file references. The advisory change-surface checker reported no obvious companion-layer gaps in the accumulated working tree; that structural check does not clear the logic findings below.

The existing suite passing is compatible with these findings: several tests verify a projected result or a single feature in isolation without comparing it to the exact owning canonical registration, exercising a second mutation afterward, or crossing a clock boundary.

## Findings at a glance

| ID | Priority | Finding | Reproduction type |
| --- | --- | --- | --- |
| A01 | P1 | Registration erases saved Personal Profile edits | Existing UI flow and API |
| A02 | P1 | Registration erases sent chat conversations/messages | Existing UI flow and API |
| A07 | P1 | Classmates' attendance is presented as Rizal's | Existing canonical data |
| A03 | P2 | Registration confirmation checks the session-start time | Controlled clock boundary |
| A04 | P2 | A valid transfer proof is rejected after midnight | UI and API clock boundary |
| A05 | P2 | Equivalent issuance timestamps produce different SST | Calculation input boundary |
| A06 | P2 | Multi-day holidays disappear after their first day | Contract-valid event |
| A08 | P2 | Non-overlapping teaching periods are treated as clashes | Valid canonical graph variant |
| A09 | P2 | A failed chat send clears the draft without an error | Component and browser fault injection |
| A11 | P2 | Sidebar writes an unapproved seven-day cookie | Existing browser interaction |
| A12 | P2 | Another student's repeat class appears in Rizal's timetable | Existing canonical data |
| A13 | P2 | A repeat offering displays the first attempt's lecturer | Existing canonical data |
| A14 | P2 | Historical module details omit existing schedules | Existing canonical data |
| A15 | P2 | Resume and Portfolio accept impossible calendar dates | Invalid API input |
| A10 | P3 | Rejected chat metadata leaves an empty conversation | Invalid API input |
| A16 | P3 | Scenario replacement retains Portfolio blob URLs | Runtime lifecycle test |

Priorities describe impact within this frontend prototype. They are not claims of a production security exploit.

## A01 — P1: Preserve saved profile edits when confirming registration

**Location:** [portal-api.ts](../../src/services/portal-api.ts), line 306.

In Alya's scenario, edit and save the Personal Profile contact number, confirm Module Registration, then reopen Personal Profile. The saved number has reverted. The API reproduction saves `audit.saved@example.test` and receives the original fixture email after confirmation. The browser reproduction confirms the contact-number loss at both widths.

Confirmation explicitly assigns `this.personalProfile = null`. The next read builds a fresh profile from fixtures, discarding all previously saved editable fields. This is data loss before refresh, contrary to the session-only editing policy. Account issues already have a projection path that can be refreshed independently.

**Suggested correction:** Preserve the student's saved profile overlay while refreshing registration-derived issues. Add a cross-feature regression to the regular suite after fixing it.

## A02 — P1: Preserve chat state when confirming registration

**Location:** [portal-api.ts](../../src/services/portal-api.ts), line 307; chat-store initialization at line 168.

In Alya's scenario, send an Academic service message, confirm registration, go back to Community, and reopen Academic. The sent message/conversation is gone. This reproduces in the API and at both browser widths. An already open chat can briefly display cached content; reopening after Community refresh makes the loss visible.

Confirmation assigns `this.chatStore = null`, so the next chat read creates a fresh fixture store. That resets session messages, created conversations, read markers, and other chat-store mutations as a consequence of registering modules.

**Suggested correction:** Reconcile newly available module groups and memberships into the existing chat store. Preserve existing conversations and messages, and invalidate affected list/detail queries coherently.

## A07 — P1: Resolve attendance by both student registration and class session

**Locations:** [mock-attendance-sessions.ts](../../src/services/mock-attendance-sessions.ts), lines 23–35; [portal-record-fixtures.ts](../../src/mocks/portal-record-fixtures.ts), lines 432–444.

The current, unmodified Semester 4 projection returns **nine attendance marks under Rizal's registration IDs** that have no corresponding canonical attendance record for those registrations: eight present and one absent. The underlying records belong to classmates.

The projection finds Rizal's registration but selects attendance from a map keyed only by `classSessionId`. Separately, fixture generation chooses the last registration for an offering across all students. Combining these independent lookups relabels another student's mark as Rizal's and contaminates attendance summaries.

**Suggested correction:** Index attendance by the exact `(moduleRegistrationId, classSessionId)` pair. Keep absence of a student's mark as null. If the seeded statuses are intended for Rizal, seed his exact registration explicitly. Test two students with different marks in the same class session.

## A03 — P2: Use the current time when validating registration

**Location:** [portal-api.ts](../../src/services/portal-api.ts), lines 291 and 295–304.

Create an API session while Alya's registration window is open, prepare a valid selection, advance the clock to one second after `registrationClosesAt`, and confirm. Confirmation still succeeds instead of rejecting the closed window.

The adapter passes its constructor-time `referenceNow` into preview and confirmation. The UI's live clock reduces ordinary exposure, but a stale or in-flight action is not protected by the mutation boundary. Issuance timestamps also use that old reference time.

**Suggested correction:** Retain a stable reference for rolling fixture creation, but inject/read a live clock for transaction validation and issuance. Test opening, closing, and an action submitted across the boundary.

## A04 — P2: Accept the current campus date after midnight

**Location:** [portal-api.ts](../../src/services/portal-api.ts), lines 642 and 657.

Open Rizal's outstanding tuition invoice at 23:59 on 5 September in `Asia/Kuala_Lumpur`. Advance to 00:01 on 6 September and submit a proof with the dialog's default date, 6 September. Submission fails with `Transfer date cannot be in the future.` This reproduces through the real dialog at both widths.

The dialog uses the current campus date, while the API derives its maximum date from session-start `referenceNow`. Submitted timestamps are likewise taken from session start.

**Suggested correction:** Read the current instant at submission, derive the campus date from that instant, and use it for `submittedAt`. Keep this separate from fixture anchoring.

## A05 — P2: Normalize the tax point to the campus date

**Locations:** [service-tax-model.ts](../../src/features/finance/service-tax-model.ts), lines 5–6 and 39; [portal-records.ts](../../src/contracts/portal-records.ts), line 874.

For the same registration invoice, the issuance instant `2025-07-01T00:30:00+08:00` produces a charged SST decision of 2,400 sen. Serialize that identical instant as `2025-06-30T16:30:00.000Z` and the calculation produces a not-applicable decision of zero.

Both calculation and graph validation derive the effective date with `issuedAt.slice(0, 10)`. The result therefore depends on the timestamp's textual offset, rather than the campus-local issuance date. Effective tax-profile and exemption boundaries are affected.

**Suggested correction:** Use one campus-timezone date conversion for calculation and validation, with equivalent-offset and midnight boundary tests. This finding concerns implementation consistency under the approved prototype policy, not a determination of Malaysian tax law.

## A06 — P2: Project the complete holiday interval

**Locations:** [calendar-model.ts](../../src/features/calendar/calendar-model.ts), lines 69–78; [portal-record-projections.ts](../../src/services/portal-record-projections.ts), lines 114–122.

A schema-valid holiday from `2026-08-31T00:00:00+08:00` until the exclusive end `2026-09-03T00:00:00+08:00` should appear on 31 August, 1 September, and 2 September. Indexing returns only 31 August; the September query excludes the event entirely.

Both daily indexing and month intersection handle a span only for registration events. The documented holiday contract explicitly supports an all-day interval with an exclusive end.

**Suggested correction:** Apply interval intersection to holidays as well, preserving their exclusive end-date semantics. Cover one-day, multi-day, cross-month, and cross-year holidays.

## A08 — P2: Include teaching date ranges in timetable conflicts

**Locations:** [module-registration-model.ts](../../src/features/academic/module-registration-model.ts), lines 252–259; [mock-academic-module-registration-api.ts](../../src/services/mock-academic-module-registration-api.ts), lines 286–293.

Give two selected sections the same weekday and time, with the first ending on 1 October and the second beginning on 2 October. The resulting canonical graph validates, but both UI selection validation and API fee preview reject a timetable clash.

The duplicated conflict predicates compare only weekday and local time, ignoring `effectiveFrom` and `effectiveTo` even though those fields are returned in the registration contract.

**Suggested correction:** Share an overlap predicate that checks time, date-range intersection, and an actual occurrence of the common weekday. Keep truly overlapping sections blocked.

## A09 — P2: Retain the draft and expose failed chat sends

**Locations:** [chat-composer.tsx](../../src/components/portal-sidebar/chat-composer.tsx), lines 100–106; [chat-feed.tsx](../../src/components/portal-sidebar/chat-feed.tsx), line 127.

Make `sendChatMessage` reject, type a message, and press Send. The composer becomes empty, the message never appears, and there is no visible error. This was reproduced in a component test and by injecting a rejected API method into the real development browser at both widths; it is not a claim that the normal fixture send always fails.

The composer clears its draft immediately after a void callback, while the feed calls fire-and-forget `mutate` without displaying the mutation error.

**Suggested correction:** Clear text and attachments only on successful completion, preserve them on failure, and render pending/error/retry behavior. Include attachment-preview ownership in that change.

## A11 — P2: Remove the persistent sidebar cookie

**Location:** [sidebar.tsx](../../src/components/ui/sidebar.tsx), lines 28–29 and 65.

Load the portal and toggle the sidebar with Ctrl+B. Browser cookies now include `sidebar_state=false` with a seven-day lifetime. Both desktop browser checks reproduce the write.

Persistent browser storage is explicitly out of scope. The implementation writes this cookie without a corresponding restoration read, so it also provides no current reload benefit. This is a scope violation, not evidence of sensitive data exposure.

**Suggested correction:** Keep sidebar state in memory and remove the cookie write/constants unless persistent preferences are separately approved.

## A12 — P2: Filter timetable entries by the student's exact offerings

**Location:** [mock-academic-timetable-api.ts](../../src/services/mock-academic-timetable-api.ts), lines 23–35.

Rizal's Semester 3 timetable includes `schedule-offering-semester-2026-jan-dmp201-r1`, a Design Management Principles 2 repeat class whose registration belongs to Thomas. Rizal is not registered for that offering.

The code collects registered module IDs across the entire graph and then filters schedules by module ID. Neither the selected student nor exact offering ownership is enforced. A sweep of all six terms detects this existing foreign schedule.

**Suggested correction:** Traverse the selected student's enrolment and Study Period, obtain its non-withdrawn Module Registrations, and project only those exact Module Offering IDs.

## A13 — P2: Obtain lecturers from the repeat offering

**Locations:** [portal-fixtures.ts](../../src/mocks/portal-fixtures.ts), lines 120–128; [portal-api.ts](../../src/services/portal-api.ts), lines 343–355.

Open Rizal's ART201 repeat in Semester 3 (`semester-2026-jan`). Its canonical teaching assignment is **Dr. Jerry Lynch**, but the detail response displays **Dr. Louisa Freeman**.

The module lecturer fixture is derived from the first offering for a module; Module Details then looks it up by module ID. Teaching assignments differ between attempts, so a module-level lookup cannot supply the correct lecturer consistently.

**Suggested correction:** Derive lecturers from the exact selected offering's Teaching Assignments. Synchronize any affected read-model contracts and explorer examples instead of adding a screen-specific correction.

## A14 — P2: Load historical schedules independently of Dashboard

**Location:** [portal-api.ts](../../src/services/portal-api.ts), lines 356–358.

For the same ART201 Semester 3 repeat, the graph contains `schedule-offering-semester-2026-jan-art201`, but Module Details returns an empty timetable.

The detail response filters `dashboardFixture.timetable`, which contains current-semester entries, for a historical semester. A historical offering can therefore have a canonical schedule and still appear unscheduled.

**Suggested correction:** Project schedules directly from the selected offering, sharing the corrected ownership-aware timetable projection where appropriate.

## A15 — P2: Validate actual calendar dates in profile contracts

**Locations:** [resume-profile.ts](../../src/contracts/resume-profile.ts), line 13; [portfolio-profile.ts](../../src/contracts/portfolio-profile.ts), line 6; [portal-records.ts](../../src/contracts/portal-records.ts), line 4.

The API accepts Resume work-experience dates `2026-02-29`, `2026-04-31`, and `2026-01-00`. It also accepts a Portfolio project created on `2026-02-29`. All four rejection tests fail because the mutations succeed.

The shared regex checks numeric shape but allows day zero and impossible month/day combinations. Date formatting can normalize these values into a different real date, so stored values and presentation disagree. The normal date picker generally emits valid dates; this is a contract/API validation gap.

**Suggested correction:** Use real calendar-date validation consistently in input and canonical contracts, following the stricter Finance date validation. Cover leap years and month ends.

## A10 — P3: Validate chat metadata before mutating the store

**Location:** [portal-api.ts](../../src/services/portal-api.ts), lines 794–815 and 829 onward.

Send to a previously unused service with malformed attachment metadata, such as an empty attachment name. The API rejects the message, but rereading conversations reveals a newly created empty service conversation.

Conversation and participant records are appended before message-schema validation. The rejected mutation is therefore not atomic. The ordinary file picker supplies a nonempty name; this is an API error-path defect.

**Suggested correction:** Validate the complete message and metadata before changing store arrays, or stage and commit the complete mutation atomically.

## A16 — P3: Dispose saved Portfolio previews on scenario replacement

**Location:** [portal-runtime.tsx](../../src/services/portal-runtime.tsx), lines 25–32; saved-preview ownership in [mock-portfolio-profile-api.ts](../../src/services/mock-portfolio-profile-api.ts).

Create a Portfolio project with local artwork, then switch the development student scenario. The old API instance is replaced, but `URL.revokeObjectURL` is never called for the saved artwork. The runtime component test verifies a created URL and zero revocation calls.

Replacing/deleting an individual project releases its preview, but replacing the entire session lacks that cleanup. Repeated scenario changes can retain file blobs, each permitted up to 25 MiB, until the document unloads. The Portfolio document currently promises release on scenario replacement.

**Suggested correction:** Give the mock session an internal disposal path and invoke it when replacing/unmounting the runtime. Keep lifecycle cleanup separate from the production-facing data API where practical.

## Initial dependency maintenance finding

`npm audit --json` returned a nonzero status and **two affected transitive packages**: installed `fast-uri@3.1.5` (high) and `qs@6.15.3` (moderate). Multiple advisories apply; the count of two refers to packages, not individual advisory IDs.

The installed dependency paths run through `shadcn@4.17.0` and `@modelcontextprotocol/sdk@1.30.0`: Ajv brings in fast-uri, and Express/body-parser brings in qs. No direct application-source import or browser exploit was demonstrated. Treat this as a tooling/dependency maintenance item rather than labeling the student portal as remotely exploitable.

Upstream fixes are available in fast-uri 3.1.6 and qs 6.16.0. See the [fast-uri host-confusion advisory](https://github.com/advisories/GHSA-5jgf-p345-68v8) and [qs denial-of-service advisory](https://github.com/advisories/GHSA-4mjr-xmp4-gh2g). Update through a reviewed dependency change and rerun the quality gate. No dependency versions were changed and `npm audit fix` was not run.

## Running the repaired regression coverage

Run from the repository root:

```powershell
# Full quality gate, now including the audit regressions.
npm run check:all

# Focused API/component edge cases: 62 passing cases after repair.
npx vitest run --config tests/audit/vitest.audit.config.ts

# Seven browser scenarios, each at both desktop widths.
node scripts/run-playwright.mjs --config tests/audit/playwright.audit.config.ts

# Read-only dependency audit; zero vulnerabilities after repair.
npm audit --json
```

Audit sources: [API/component regressions](../../src/tests/audit-regressions.test.tsx), [read-path and proof boundary checks](../../src/tests/audit-boundaries.test.ts), [additional repair boundaries](../../src/tests/audit-fix-boundaries.test.tsx), and [browser regressions](../../tests/e2e/audit-regressions.spec.ts). These now run through the existing default unit and browser commands. The configurations under `tests/audit/` provide focused runs of the same regular-suite files.

Initial failure logs and final repair-verification logs are retained locally under `test-results/audit-2026-09-05/`. Browser traces/error contexts are generated on failures and can be cleared by later successful runs; the final browser run has no failures. Generated outputs are Git-ignored; this report and the regression sources are durable repository files.

## Scope and next steps

This is a broad code, contract, logic, and desktop-flow audit of the frontend prototype. It is not exhaustive proof over every input, a full accessibility certification, a production penetration test, or a mobile/cross-browser certification. Browser checks used Chromium at the two supported widths. There is no live backend, persistence, authentication, or real upload/payment system in scope to validate.

The provisional SST sponsor, diplomat-dependant, and award-netting policies remain documented production-review items, not additional implementation findings here. Planned downloads, payments, exports, and placeholder routes were assessed against their documented prototype scope rather than counted as missing implementations.

All originally recommended repairs are implemented. The initial audit itself made no application changes; the subsequent user-approved repair pass supplies the corrections, regular regression coverage, dependency updates, and synchronized behavior documents described above. Production backend work and the provisional tax-policy review remain outside this repair scope.
