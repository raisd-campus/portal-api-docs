# Cyberjaya frontend release-candidate audit — 16 September 2026

## Verdict

**Ready with accepted warnings.** Accommodation is absent from the active portal, and the seventeen lifecycle findings from the report-first audit have been repaired and covered by permanent regression tests. The release-candidate flows now keep one canonical owner through programme selection, academic history, Student Pass, registration, Finance, teaching delivery, Online Forms, Graduation, and account attention.

This verdict applies to the approved **frontend release-candidate boundary**. It is not an operational production-launch decision. Authentication and authorization, persistent backend data, live payments and uploads, production staff tooling, notifications, document delivery, and EMGS/STARS integration remain deferred. Prototype campus policies and amounts still require operational confirmation.

No P0, P1, P2, or P3 lifecycle defect remains open from RC-01 through RC-17. The accepted warnings at the end of this report are scope dependencies rather than hidden frontend failures.

## Audit boundary and method

The audited lifecycle begins with an existing Student Profile and Programme Enrolment:

`Profile and admission evidence → Student Pass/eVAL → Module Registration → Finance → teaching delivery → attendance/materials/submissions/reviews → results and repeats → Graduation → completed-student history`

Evidence includes:

- Zod contracts and the canonical graph validator;
- Portal API projections, session mutations, query invalidation, and route ownership;
- active, completed, deferred, and withdrawn enrolments, plus active-and-completed and multiple-completed combinations built as test graphs rather than permanent students;
- account, module, Online Forms, Immigration, and Graduation issue/action/resolution paths;
- permanent unit tests and desktop Playwright coverage at 1280px and 1440px;
- the repository change-surface audit, Services asset validation, TypeScript, lint, production build and bundle checks.

The four permanent scenarios remain Alya (first registration), Mei (new Student Pass), Rizal (active mid-programme), and Nadia (completed programme and Graduation). Temporary graph variants exercise lifecycle states that should not become fixture personas.

## Accommodation removal

The release candidate has no active Accommodation capability:

- no `PortalPage`, route identity, sidebar item, placeholder, Community service, or icon-key value;
- `/accommodation` replace-navigates to Dashboard;
- `/services`, `/services/accommodation`, and unknown service slugs resolve to Transportation;
- seven Services entries remain: six source-backed categories plus Accessibility Support;
- the validated asset inventory is 34 source images, 68 WebP variants, and six populated source categories;
- no Accommodation Fee Item, tax exemption, invoice, line, tax snapshot, payment allocation, or Graduation clearance department remains;
- `PAY-S4-002` is RM6,390; Semester 4 retains RM14,750 pre-tax charges, RM12,390 confirmed payments, and Rizal's RM1,852 open balance;
- Alya's first registration deterministically creates `INV-000019` and `INV-000020`;
- Graduation clearance is Faculty, Finance, and Library only.

Residential addresses and dated historical documents remain student data and historical evidence, not Accommodation features.

## End-to-end lifecycle matrix

| Stage | Canonical owner and gate | Student next step | Audited result |
| --- | --- | --- | --- |
| Profile and admission evidence | Student Profile plus owned documents, qualifications, English evidence, and exact enrolment context | Review details; edit supported profile fields; reuse evidence in an eligible form | Pass. Case replacements remain submission-owned and never overwrite Profile documents. |
| Student Pass requirement | Student, exact Programme Enrolment, campus configuration, current-pass selector, and exact Immigration case | Open Student Pass or the case's recommended Applications step | Pass. Required, processing, expiring, expired, and cancelled copy and actions follow live state. |
| eVAL registration gate | Citizenship, selected active enrolment, current pass, and newest owned new-pass case | Plan modules; preview/confirm only after eVAL approval | Pass. The notice remains until the replacement pass is issued. |
| Module Registration | Active enrolment, current Study Period, curriculum, results, prerequisites, offerings, Finance, and window | Resolve row issues, review the fee quote, confirm once | Pass. Academic and Finance writes commit atomically with generation and revision guards. |
| Finance | Exact enrolment Finance Account, invoices, tax snapshots, adjustments, payments, allocations, and benefits | Open the exact invoice; submit or manage transfer proof; wait for verification | Pass. Open invoices and unapplied confirmed credit are distinct and visible. |
| Timetable and Calendar | Selected enrolment registrations, offerings, schedules, sessions, and released assessments | Open the exact module or learning item | Pass. New registration activity appears immediately; cancelled/make-up sessions and assessment IDs stay canonical. |
| Attendance | Exact Module Registration and Class Session | Review status and contact Academic Support when a discrepancy cannot be resolved in portal | Pass. Ownership is validated and inactive contexts remain read-only. |
| Materials | Exact selected enrolment, registration, offering, week, item, and release time | Open released content; wait for the stated release time otherwise | Pass. List and direct detail boundaries return the same redacted locked view. |
| Assignment submission | Active registration, released assignment, due window, and file policy | Submit, replace, delete, or retry a failed delete | Pass. Failed deletion stays open with readable recovery; stale writes do not commit. |
| Lecturer review | Exact registration, teaching assignment, questionnaire, campus, and active current period for new submissions | Complete every rating and confirm immutable submission | Pass. Historical-only lecturers and submitted reviews remain readable. |
| Results and repeats | Registration-owned assessment/module/term results and curriculum prerequisites | Read published results; register an offered required repeat | Pass. Graph ownership and attempt history are enforced. |
| Online Forms | Student, selected enrolment, campus form, optional academic/pass/case link, evidence snapshot, and revision | Start/resume, submit, follow messages, or withdraw while allowed | Pass. Completed enrolments retain Graduation/convocation forms while unrelated new forms remain blocked. |
| Immigration renewal/cancellation/reapplication | Exact enrolment pass, case, form, evidence, document checks, invoice, medical form, and events | Follow the numbered case step or explicit International Office guidance | Pass. Student-requested cancellation may start a fresh eligible application; other terminal states remain office-owned. |
| Graduation | Completed enrolment, eligibility, form, Faculty/Finance/Library checks, invoice, convocation, documents, and optional cancellation case | Complete the exact clearance, payment, attendance, and collection step | Pass. Unallocated money cannot clear Finance. |
| Completed history | Explicit owned Programme Enrolment selected in the URL | Select another owned programme and review its permitted records | Pass. Multiple programme histories remain reachable and scoped. |

## Enrolment-state matrix

| Graph shape | Expected behavior | Result |
| --- | --- | --- |
| One active | Current reads and active-only writes use the exact owner | Pass |
| One completed | Academic, Finance, forms, Immigration history, and Graduation remain readable without a current semester | Pass |
| Deferred only | Existing records remain readable; current actions explain the deferral and provide validated Academic Support when available | Pass |
| Withdrawn only | Historical records remain readable; current actions are blocked with destructive status guidance | Pass |
| Active plus completed | Active is the deterministic default; the completed programme remains selectable through `programmeEnrolmentId` | Pass |
| Multiple completed | Every owned programme appears in the shared selector; selecting one scopes routes and caches | Pass |
| Multiple active | Canonical graph validation rejects the ambiguous state before projection or mutation | Pass |
| Unknown/foreign selected ID | API ownership validation rejects the request without fallback | Pass |

The shared `ProgrammeContextBar` appears for multiple programmes or an inactive selected programme. Account attention remains student-wide; every issue action carries its owning programme ID and changes context before navigation.

## Canonical ownership matrix

| Relationship | Enforced boundary | Result |
| --- | --- | --- |
| Student → Programme Enrolment → Campus/Programme Version | Unique IDs, real owners, aligned campus/programme, at most one active enrolment | Pass |
| Study Period → Enrolment/Term | Real owner, unique enrolment/term and semester position, at most one current period | Pass |
| Offering → Module/Term/Campus | Real aligned records and unique offering identity | Pass |
| Registration → Study Period/Offering | Same term/campus/curriculum, unique period/offering, coherent attempt | Pass |
| Schedule/Session/Attendance → Offering/Registration | Exact offering and registration ownership; unique dated records | Pass |
| Assessment/Module/Term Result → Registration/Period | Exact owner, attempt, publication, credits, and calculated totals | Pass |
| Learning item/progress/submission → Offering/Registration | Release, type, and student ownership checked; direct locked content redacted | Pass |
| Lecturer review → Registration/Teaching Assignment | Exact student/offering/campus and immutable questionnaire snapshot | Pass |
| Finance Account/Invoice/Tax/Payment/Allocation | Exact enrolment/currency ownership, invoice reconciliation, allocation limits, immutable issuance tax | Pass |
| Online Form → Student/Enrolment/Result/Pass/Case/Evidence | Exact ownership, stale revision rejection, immutable definition/evidence/case snapshots | Pass |
| Immigration pass/case/document/event/invoice | Exact student/enrolment/campus ownership, one active case, one current pass | Pass |
| Graduation → Enrolment/Form/Invoice/Pass/Cancellation | Exact ownership and prerequisite decisions across three departments | Pass |

Malformed, orphaned, ambiguous, duplicate, and cross-student foundational records now fail the graph boundary rather than producing route-specific failures later.

## Mutation and cache matrix

| Mutation family | Atomic/write behavior | Cache behavior | Result |
| --- | --- | --- | --- |
| Module Registration | Stages registrations, invoices, tax, credits, and issue resolution; validates before one commit | Central registry invalidates Dashboard, Academic, both Materials list/detail, Study Plan, Calendar, Profile, Community/chat, Finance, Forms, and Graduation | Pass |
| Assignment submit/delete | Exact active owner and release/due/file checks; failed delete preserves the record | Dashboard, Modules, Materials list/detail refresh | Pass |
| Personal Profile/Resume/Portfolio | Validated student-owned session overlays; preview resources released | Exact scoped cache updated | Pass |
| Finance proof | Exact invoice/student/revision ownership; proof never changes debt before verification | Finance, Graduation, and Immigration refresh | Pass |
| Online Forms | Exact owner, revision, case, and immutable snapshot checks | Selected-session Forms plus linked domains refresh | Pass |
| Immigration/Graduation developer actions | Staged graph, exact target/revision/student checks; excluded from production | All linked student views refresh | Pass within development boundary |
| Lecturer review | Exact active registration/assignment and unique immutable submission | Detail and module summaries refresh | Pass |
| Chat send/delete/read | Exact conversation owner and attachment checks | List/detail caches reconcile | Pass |
| Scenario A→B and A→B→A | Every write captures student, generation, and write revision before asynchronous work | Late results cannot publish or repopulate discarded cache scopes | Pass |
| Concurrent same-session writes | First valid commit increments the write revision; a stale concurrent commit is rejected | Student sees product-safe refresh/retry guidance | Pass |
| Refresh/new API | Rebuilds the approved session fixture and releases previews | New cache scope | Pass by product scope |

## Issue, action, and resolution matrix

| Attention state | Severity/count | Exact next step | Resolution | Result |
| --- | --- | --- | --- | --- |
| Outstanding Fees | Destructive; included globally | Owning Programme Enrolment → Finance | All open invoices settle or void | Pass |
| Student Pass required | Warning; included globally | Student Pass overview or active case step | Current pass issued | Pass |
| Student Pass processing | Warning; included globally | Exact Applications step | Case progresses/completes | Pass |
| Student Pass expiring | Warning; included globally | Student Pass overview/renewal | Replacement or extension becomes current | Pass |
| Student Pass expired | Destructive; included globally | Student Pass overview with International Office guidance | Office-managed outcome/current pass | Pass |
| Student Pass cancelled | Destructive; included globally | Eligible new application or office guidance | Replacement pass issued | Pass |
| Module Registration | Warning; included globally | Exact selected-enrolment Registration route | First confirmation succeeds | Pass |
| Assignment | Deadline semantic; module surface | Exact assignment learning item | Submission succeeds; deletion restores issue | Pass |
| Exam | Deadline semantic; module surface | Exact exam learning item | Read-only scheduled event | Pass |
| Unread reviewer update | Online Forms-local count | My Forms/exact submission conversation | Displayed reviewer messages acknowledged | Pass |
| Immigration information/rejection/waiting | Step semantic | Exact form/case step or named International Office ownership | Student supplies evidence or office advances case | Pass |
| Graduation action/waiting/completed | Graduation-local state | Exact Graduation step or collection guidance | Required milestone completes | Pass |

The header count intentionally includes active student account issues. Module issues, unread forms, Immigration step states, and Graduation states keep their established local surfaces and counters.

## UX state review

| State | Consistent behavior | Result |
| --- | --- | --- |
| Blocked | Names the rule and owner; no enabled no-op action | Pass |
| Waiting | Uses semantic warning treatment and says whether university/government action owns the next step | Pass |
| Rejected/destructive | Uses destructive cards/badges and preserves exact follow-up guidance | Pass |
| Completed | Removes active CAP-50 case, retains history, and exposes the next relevant destination | Pass |
| Empty | Uses shared `EmptyState` inside the established page shell | Pass |
| Loading | Reserves the route's final geometry | Pass |
| Read error | Uses `QueryErrorState`, product language, and **Try again** where retry is valid | Pass |
| Mutation error | Preserves user input/state and provides retryable session/data-change copy without mock/API terms | Pass |
| Action unavailable | Uses readable `StudentNextActionControl` guidance instead of an enabled button | Pass |
| Programme history | Uses the shared URL-backed context selector and semantic status variants | Pass |

## RC-01–RC-17 closure

| ID | Priority | Repair and permanent evidence | Status |
| --- | --- | --- | --- |
| RC-01 | P1 | Complete foundational graph uniqueness, foreign-key, and ownership alignment validation with negative graph tests | Closed |
| RC-02 | P1 | Generation and write-revision guards surround every session write; A→B, A→B→A, and concurrent-write tests reject stale commits | Closed |
| RC-03 | P1 | Deferred/withdrawn read contexts, nullable current semester, blocked active actions, and status-specific guidance | Closed |
| RC-04 | P1 | URL-backed Programme Enrolment selector keeps active plus multiple historical programmes reachable | Closed |
| RC-05 | P1 | Materials list and exact detail return one release-safe locked union until `availableFrom` | Closed |
| RC-06 | P1 | Account ledger balance, open-invoice balance, and unapplied confirmed credit are separate; issues/Study Plan/Graduation use open invoices | Closed |
| RC-07 | P2 | Calendar derives newly registered classes and released assessments from the canonical graph | Closed |
| RC-08 | P2 | Student Pass issues carry live progress and exact overview/Application destinations | Closed |
| RC-09 | P2 | Atomic tested academic completion transition publishes final results and completes the enrolment or rolls back; production staff invocation remains deferred | Closed within frontend boundary |
| RC-10 | P2 | One dependency registry reaches all affected query prefixes, including exact material details; cache-level invalidation is tested | Closed |
| RC-11 | P2 | Lecturer aggregation includes every represented owned historical offering | Closed |
| RC-12 | P2 | Runtime Dashboard/Academic/Calendar routes use canonical projections; explorer-only samples remain documentation artifacts | Closed |
| RC-13 | P2 | Failed assignment deletion keeps its confirmation open with visible retry and unchanged submission | Closed |
| RC-14 | P2 | Exam and assignment issues/events carry and navigate by exact learning-item ID | Closed |
| RC-15 | P2 | Countdown and expiry calculations use campus calendar dates, including cross-timezone tests | Closed |
| RC-16 | P2 | Shared typed next actions allow exact route, validated Community service, or noninteractive unavailable guidance only | Closed |
| RC-17 | P3 | Shared retryable read errors and product-safe mutation errors remove implementation language | Closed |

## Verification

Completed evidence before the final repository gate:

- focused RC suite: 20 test files / 208 tests passed;
- enrolment/context projection suite: 8 files / 145 tests passed;
- historical Materials/API suite: 4 files / 59 tests passed;
- final dependency/concurrency/Graduation/error suite: 4 files / 73 tests passed;
- full unit suite: 86 files / 687 tests passed;
- lifecycle Playwright suite: 6/6 checks passed across 1280px and 1440px;
- TypeScript and warning-free lint passed;
- Services provenance passed at 34 images / 68 variants / six populated source categories;
- change-surface audit reported no missing companion layer.

The final `npm run check:all`, production bundle figures, full Playwright count, `git diff --check`, and any environment warnings are recorded in [handoff](../handoff.md) after the gate completes.

## Accepted warnings and deferred dependencies

1. Authentication, authorization, persistence, audit logging, production uploads, payment processing, staff operations, and external integrations are not implemented in this frontend candidate.
2. The International Office must confirm eVAL registration timing, Student Pass reapplication eligibility, outside-Malaysia/departure handling, passport custody, medical-screening operations, and cancellation classifications.
3. Finance must confirm Service Tax, sponsorship/exemption, fee amounts, allocation, refund, credit-note, and reconciliation policy.
4. Registry and faculties must confirm curriculum, repeat/prerequisite, completion, graduation, convocation, and document-collection rules.
5. Accessibility evidence is automated desktop coverage, not formal certification or complete mobile/assistive-technology acceptance.
6. CAP-09's completion-transition helper is deliberately not exposed as a production staff control; the backend/admin programme must own authorization and invocation.

The next delivery stage is backend and campus-operational readiness. It should preserve these frontend contracts and ownership rules rather than reopening one-off route logic.
