# Applicant–Student document sync and UI audit — 12 October 2026

## Outcome and scope

Prepared and verified locally for authorized code publication. No Vercel deployment, hosted migration, reseed or hosted walkthrough. Shared components remain **0.6.2**. Existing stashes, documentation worktrees and private source forms are preserved. The new local Portal API checkout is part of this preparation.

Original Applicant uploads now have a tested Student delivery path in the existing DEV browser exchange and in a locally implemented HTTP-backed Demo service. The HTTP continuation uses an authenticated, five-minute, one-time grant and the explicitly approved separate `portal-continuation-*` browser channel. The existing production guard and DEV-only `admissions-*` channel remain unchanged.

The service is **prepared and locally tested, not deployed**. Existing servers without the advertised capability show unavailable/retry feedback. They never perform a silent mock write.

## Impact map

| Layer | Change | Boundary |
|---|---|---|
| Applicant | Chunked upload/hydration, honest unavailable legacy files, manual accepted continuation, original filename preservation | Saved drafts remain incomplete-saveable; submissions stay immutable |
| Student | Owned admissions resources, isolated accepted account bootstrap, lazy HTTP session claim, raw-evidence/document aliases | Existing enrolments, results, registration prerequisites and campus restrictions preserved |
| Portal API | Demo metadata/binary adapter, explicit migration, ownership/CAS, cleanup and continuation | Flag defaults off, forbidden in Live mode; no auto-migration |
| Contracts | Independent hosted DTO/codec copies, stable admissions snapshot v2 and DEV transport v3 | No runtime portal-to-portal imports; no Student record schema bump |
| UI | Existing field/error APIs, semantic typography and sign-in selected state | No shared release, local styling override or page redesign |
| Documentation | Canonical guide, mirrors, SDD amendments, OpenAPI and reviewed captures | Historical provenance retained |

## Evidence and field mapping

The complete category inventory and ownership rules are in [Demo admissions resources](../../../backend/admissions-resources.md). This table records the expected destination and verification:

| Applicant source | Student destination | Evidence / byte handling |
|---|---|---|
| Issued Offer Letter, Eligibility Letter | Documents positions one and two | Original issued PDF resources, release metadata and both confirmations; distinct from uploaded eligibility evidence |
| Photo, MyKad, scanned passport | Personal identity references and Documents | Same evidence ID/name/MIME/length and owned original; no duplicate upload |
| Repeated qualification certificates/transcripts | Repeated Academic records and Documents | Dates, labels, nullable values and per-record references retained |
| Optional repeated English certificates | Academic and Documents | Separate result IDs; empty English section stays optional |
| Creative portfolio, CV, recommendation | Applicable Documents rows | Admissions provenance; not promoted into editable Student portfolio/resume items |
| Transfer release, attendance, completed-module results, syllabi, cancellation | Documents / Credit Transfer evidence references | Reuse owned original references; request additional missing evidence only |
| Uploaded eligibility evidence, medical report, scratch card | Applicable Documents | Separate from issued letters; no invented applicability or document content verification |
| Payment proof | Admissions / Finance evidence | Excluded from Student Profile Documents and admissions Student-file access |
| Application message attachments | Case evidence | Not silently promoted to profile documents; existing attachment formats preserved |

Persisted Student records and their audit events contain only private issued-PDF references. The separate Demo binary adapter owns those bytes; reads hydrate the unchanged v2 letter DTO, with restart equality checks. Legacy inline-letter records remain readable and are encoded on authorized writes, without a hosted backfill.

The local HTTP fixture carries fourteen distinct admissions resources, including repeated qualifications/results and transfer syllabi. Backend assertions compare original decoded bytes, SHA-256, metadata, identity, selected campus/intake and immutable snapshots. Producer/consumer fixtures retain v1/v2 compatibility; legacy metadata-only records remain honestly unavailable. Original Unicode and leading-space filenames are preserved.

## Prioritized issue register

| ID | Priority | Status | Finding, correction and verification |
|---|---|---|---|
| SYNC-01 | P1 | Fixed | Hosted continuation previously reused Alya. It now idempotently creates/reuses the accepted applicant's owned Student account/enrolment; local HTTP/browser tests verify identity and no inherited academic/visa/finance history. |
| SYNC-02 | P1 | Fixed | HTTP uploads had no original-byte delivery; absent resources could be synthesized. Added capability-gated 1 MiB chunks, 25 MiB maximum, SHA-256 finalization and honest unavailable metadata; no placeholder replacement for real uploads. |
| SYNC-03 | P1 | Fixed | Added origin/window/nonce/session binding, five-minute expiry and atomic one-time consumption. Logout invalidates the issuing session; replay, failed claim and retry are tested. |
| SYNC-04 | P1 | Fixed | Applicant persistence could race. Memory/Postgres compare-and-save now rejects stale concurrent revisions; existing held Staff shortcut updates its own revision correctly without changing that workflow. |
| SYNC-05 | P1 | Fixed | Whole record graph was exposed as an HTTP method. Removed it from HTTP allowlists/capabilities/OpenAPI paths, preserving local mock tools. Imported accounts cannot switch to another Demo identity. |
| SYNC-06 | P1 | Fixed | Post-save pin interruption and JSONB key ordering could break file retry/retention. Persisted reference checks protect saved files; field-wise immutable metadata comparison makes retries idempotent. Memory and disposable Postgres regression checks pass. |
| UI-02 | P2 | Fixed | Portfolio, Resume and Finance proof errors lacked reliable control descriptions; added stable labels/IDs, invalid/error associations and alert semantics through existing controls. |
| UI-03 | P2 | Fixed | Resume/sign-in labels and Applicant desktop step labels used inconsistent typography. Use existing semantic body/title tokens; Demo account selectors expose pressed state. |
| UI-04 | P3 | Fixed | Applicant Admin scenario label lacked its expected control gap. Restored shared field spacing; no shell or card redesign. |
| UI-01 | P2 | Resolved audit finding | The original main `scrollWidth` measurement includes clipped table/tab descendants and falsely suggested page expansion. Computed ancestors confirm the existing shared viewport is 299 px on the phone and scrolls the 768 px table; panel/content bounds fit both 375 and 768 px. Focused browser checks verify the viewport bounds, overflow rules and keyboard scrolling. Preserve the existing editor; no component override or redesign is needed. |
| DS-01 | P3 | Fixed source documentation | Removed the stale version from the shared catalogue heading; package metadata is authoritative. Consumers remain pinned to 0.6.2. The already-published immutable 0.6.2 archive still contains its historical heading; no release or retag is made for this documentation correction. |
| HOLD-01 | P1 | On hold | Existing Bursary automatic admissions/letter shortcut remains deferred; this task does not convert it into Live Bursary/QA/Registry decisions. |
| HOLD-02 | P2 | On hold | Staff/Lecturer shell/redesign and unrelated previously deferred workflow gaps remain outside scope. The minimal backend reading-to-supported-lecture-note adapter fixes type compatibility only. |
| DEPLOY-01 | P1 | Blocked for deployed use | New HTTP operations require explicit Demo migration, enabled capability/origins and deployment. These actions are intentionally unauthorized in this local phase; no deployed support is claimed. Serverless physical garbage collection needs an operator-owned schedule. |
| VERIFY-03 | P2 | Fixed and verified | Finance waits for its loaded payment section before a tab click; Community asserts a loaded contact with a scoped multi-step budget. The uninterrupted Student check:all now passes: 788 unit tests, 278 Chromium checks (46 intentional skips), 41 WebKit checks (31 intentional skips). Original-byte assertions compare every byte without million-element diagnostic overhead; all seven focused checks pass. |
| VERIFY-01 | P2 | Unverified | Actual hosted continuation/persistence and physical devices were not exercised. No hosted Demo users were modified. |
| VERIFY-02 | P3 | Unverified | Headless Chromium verifies PDF popup/download bytes. The in-app browser did create a separate blob PDF tab with no console error. Its URL policy blocked inspecting that blob tab, so PDF rendering/OS viewer integration is not certified by the byte checks. |

The earlier automatic-review rejection of the HTTP message namespace was resolved by explicit user approval for the separate channel. It is not a remaining implementation blocker. No production safeguard was weakened.

## UI review method and state coverage

Reviewed both route trees, canonical guidance and installed 0.6.2 catalogue/declarations. Inventoried **69 Student requested views** and **7 Applicant base views**, plus all six Applicant steps, submitted accordions, confirmation/leave dialogs, eight editable source forms, four Resume dialogs, Personal editing, Finance proof validation, seven Services categories and campus variants. The [machine-readable checklist](2026-10-12-cross-portal-sync-ui-audit.json) preserves requested routes, headings, document overflow and capture references.

Chromium review uses 375, 768 and 1440 px. Existing full gates and seven handoffs also retain established desktop widths and focused WebKit phone/tablet coverage. Screenshots include top/middle/end portions for long pages. Contact-sheet visual review covered all route families. Some baseline captures intentionally show loading/no-case states; they are not proof of every asynchronous final state. Supplemental capture readiness checks wait for scenario identity and page headings. Detailed interactions are verified by the existing functional suites. The final local review retained 826 PNG captures and 55 contact sheets; these are task evidence, not a replacement for the published component examples.

| Family | States and interaction checks | Correction / result |
|---|---|---|
| Applicant shell/list/checklist | Fresh, draft, submitted, unavailable IDs, phone drawer, equal checklist actions | Existing shared shell/actions retained |
| Applicant six-step editor | Complete fixtures, incomplete saving, dependent selections, inline invalid controls, save/discard/cancel popup | Semantic step labels; no page-wide error summary |
| Applicant review/letters/chat | Four progress rows, Eligibility/Offer actions, previews, immutable accordions, explicit messages/read-only acceptance | Existing layout and unread rules retained; no automatic reviewer messages |
| Applicant/Student authentication | Loading, capability unavailable, selection, manual action, blocked window, failed claim/retry | Correct account and separate validated HTTP channel |
| Student Academic | Performance charts, module tabs/review, timetable/calendar, unavailable IDs, study plan, registration and graduation | Existing layouts; UI-01 remains documented |
| Student Profile | Personal edit/cancel/locked fields, repeated Academic, Resume dialogs, Portfolio add/edit/unavailable, Documents, privacy | Corrected inline associations and label tokens; letters ordered correctly |
| Student Finance | Invoices/detail/unavailable, payments/proof errors, awards, Lesotho LSL/NMDS | Existing financial history and campus behavior retained |
| Student Online Forms | Available/My Forms, eight draft editors, repeated rows, historical Accessibility/Complaint, unavailable IDs, messages | Immutable history preserved; current Student Feedback remains one form |
| Student Immigration | No-case states, Mei initiation, New Student Pass source form, full suite case stages | Cyberjaya-specific logic retained; no clinical assessment |
| Student Services | Seven actual categories, missing campus/media, feedback accessibility route | Existing shared banner/tab variants retained |
| Development tools | Scenario/Admin/Data Model routes and unavailable actions | DEV-only tools remain excluded from production |

Axe scans for all eight current Online Form editors and Applicant approved details found zero enabled WCAG A/AA violations at the three audit widths. This is scoped automated evidence, not blanket accessibility certification. Full suites include keyboard/focus/inline-error checks and maintain their documented existing exceptions.

## Verification results

| Command / suite | Local result |
|---|---|
| Applicant `npm run check:all` | Passed: lint, 65 unit/component tests, TypeScript/build, production exclusion, 70 browser checks |
| Student `npm run check:all` | Passed uninterrupted: 788 unit tests, lint/tokens/assets/build/production/bundle checks; 278 Chromium checks with 46 intentional skips; 41 WebKit checks with 31 intentional skips. |
| Applicant seven DEV handoffs | 7 passed, including manual sign-in and module registration, original evidence, repeat import and international restrictions |
| `playwright.http-sync.config.ts` | 5 passed, 3 deliberately skipped copies of focused failure test; successful flow at Chromium 375/768/1440 and WebKit 390 plus blocked-window/failed-claim retry |
| Portal API `typecheck:local` / `test:admissions` | Passed / 96 checks passed against memory and disposable Postgres |
| Page audit | 12 inventory/editor checks passed plus 3 supplemental campus/service/dialog checks; reviewed captures retained locally |
| OpenAPI/mirrors/catalogue/navigation | 1044 mirror/contract/fixture/reference/link/pin/source-provenance checks and 404 focused sync checks: zero errors. Canonical/public catalogue: 170 captures valid. OpenAPI valid with 14 unused-component warnings. Navigation regenerated from current canonical configuration. |

Earlier Student full browser run had two fixture failures: the 15-route unavailable journey exceeded the default 30-second test budget, and the empty-campus fixture raced an already cached menu/scope transition. The route journey now has a scoped 90-second budget; the empty-campus test explicitly navigates after the owned scope changes. Assertions and production behavior are unchanged. The original producer/consumer filename test also exposed an alias mismatch in Applicant's copied test, corrected to its own service path. Final backend validation caught an initialization-order regression in the new pool-close hook and the JSONB comparison defect; both were fixed before acceptance. The final full Chromium run then showed a chat readiness timeout and an early Finance-tab click, both passing in four isolated rechecks. A WebKit pointer checkbox race was removed from the test by using focus/Space and checking its state; the three Chromium workflow widths and full WebKit suite pass afterward. These historical failures are retained as provenance. The final uninterrupted full gate passes after the scoped readiness and exact-byte assertion corrections.

Student's strict eager-JavaScript budget remains 192 KiB; the final build measured **196,595 gzip bytes**, below 196,608. HTTP loading is lazy; no budget was raised.

## Publication and remaining live inputs

The user authorized normal main commits and pushes after verification. Design System has a documentation-only correction; the four portal CI copies require explicit manual deployment and source configuration disables automatic Vercel Git deployment. Lecturer also documents its currently empty unit suite. No release, tag, Vercel deployment or hosted database change is included. Canonical guidance is synchronized into portal/public working copies.

Remaining Live inputs include durable object storage/file lifecycle, real authentication/roles, official tariffs and letter templates/signatures, approved department workflows and hosted migrations/capability rollout. The separate Demo file adapter does not replace planned Live evidence storage. Database reseeding remains an existing future deployment prerequisite; it was not run on hosted data.

### Applicant route checklist

| Requested view | Evidence at 375 / 768 / 1440 | Result / qualification |
|---|---|---|
| `/applications` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/applications/absent-id` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/applications/absent-id/edit` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/applications/new` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/dev/admin-actions` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/dev/sign-in` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/documents-checklist` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |

### Student route checklist

| Requested view | Evidence at 375 / 768 / 1440 | Result / qualification |
|---|---|---|
| `/` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/attendance` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/graduation` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/module-registration` | Three-width capture inventory | Existing completed state captured; first-semester phone overflow remains UI-01. Seven handoffs verify baseline/transferred width agreement. |
| `/academic/modules` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/modules/absent-id` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/academic/modules/module-grd301` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/modules/module-grd301/lecturers/lecturer-adam-watson/review?semesterId=semester-2026-aug` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/modules/module-grd301?tab=attendance` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/modules/module-grd301?tab=materials` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/performance` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/study-plan` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/academic/timetable` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/announcements` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/announcements/absent-id` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/announcements/announcement-registration` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/dev/admin-actions` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/dev/data-model` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/dev/scenarios` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/finance` | Three-width capture inventory | Existing Finance projections retained; proof-field error descriptions corrected. Lesotho LSL/NMDS checked separately. |
| `/finance/invoices/absent-id` | Three-width capture inventory | Existing Finance projections retained; proof-field error descriptions corrected. Lesotho LSL/NMDS checked separately. |
| `/finance/invoices/invoice-rizal-s4-tuition` | Three-width capture inventory | Existing Finance projections retained; proof-field error descriptions corrected. Lesotho LSL/NMDS checked separately. |
| `/finance?tab=awards` | Three-width capture inventory | Existing Finance projections retained; proof-field error descriptions corrected. Lesotho LSL/NMDS checked separately. |
| `/finance?tab=payments` | Three-width capture inventory | Existing Finance projections retained; proof-field error descriptions corrected. Lesotho LSL/NMDS checked separately. |
| `/immigration` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/immigration?tab=applications` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/immigration?tab=applications&step=1` | Three-width capture inventory | No-case state captured. Active case stages are exercised by the full Immigration suite, not represented by these Rizal captures. |
| `/immigration?tab=applications&step=2` | Three-width capture inventory | No-case state captured. Active case stages are exercised by the full Immigration suite, not represented by these Rizal captures. |
| `/immigration?tab=applications&step=3` | Three-width capture inventory | No-case state captured. Active case stages are exercised by the full Immigration suite, not represented by these Rizal captures. |
| `/immigration?tab=applications&step=4` | Three-width capture inventory | No-case state captured. Active case stages are exercised by the full Immigration suite, not represented by these Rizal captures. |
| `/immigration?tab=applications&step=5` | Three-width capture inventory | No-case state captured. Active case stages are exercised by the full Immigration suite, not represented by these Rizal captures. |
| `/online-forms` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/absent-form` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/online-forms/forms/academic-appeal` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/accessibility-support` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/add-modules` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/change-programme` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/convocation-registration` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/credit-transfer` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/custom-certification-letter` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/drop-modules` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/graduation-clearance` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/new-student-pass` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/student-complaint` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/student-pass-medical-result` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/study-leave` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/visa-cancellation` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/forms/visa-renewal` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/submissions/absent-id` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/online-forms/submissions/online-form-student-rizal-1` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/submissions/online-form-student-rizal-2` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms/submissions/online-form-student-rizal-3` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/online-forms?tab=my-forms` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/policies` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/academic` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/documents` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/personal-info` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/portfolio` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/portfolio/absent-id` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/profile/portfolio/absent-id/edit` | Three-width capture inventory | Unavailable/redirect state captured; no foreign record displayed. |
| `/profile/portfolio/new` | Three-width capture inventory | Fixed label/error associations; shared controls and existing artwork layout retained. |
| `/profile/portfolio/portfolio-project-rizal-living-spaces` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/portfolio/portfolio-project-rizal-living-spaces/edit` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/privacy-security` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/profile/resume` | Three-width capture inventory | Fixed label typography, control IDs and inline-error descriptions; all four editor dialogs additionally reviewed. |
| `/services` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/services/academic` | Three-width capture inventory | Unknown Services slug redirects to Transportation; these are Community contact IDs, not Services categories. Seven valid categories reviewed separately. |
| `/services/accessibility` | Three-width capture inventory | Captured; source and existing suite reviewed; established layout retained. |
| `/services/it-helpdesk` | Three-width capture inventory | Unknown Services slug redirects to Transportation; these are Community contact IDs, not Services categories. Seven valid categories reviewed separately. |

## Publication follow-up

The user authorized fixes, commits and normal pushes. Exact task stashes were restored with staged state after fetching all eight repositories; all upstream comparisons were current and no conflicts occurred. Four older stashes and documentation worktrees remain untouched. Deployment is separate: canonical portal CI now requires explicit manual `deploy=true` on main, and portal/API Git deployment is disabled in source configuration. Backend CI includes Applicant checkout/dependencies and disposable Postgres verification.

The Student Finance journey now waits for the loaded Transfer Proofs section before changing tabs. The multi-step Community chat journey asserts a loaded contact and has a scoped 60-second budget. Existing accessibility and interaction assertions remain enforced. Final uninterrupted gates passed. Design System: 13 unit tests and 14 consumer browser checks; Staff: 5 unit tests plus lint/type/build; Lecturer: lint/type/build, with no unit files yet (reported explicitly). API portable startup and npm run smoke pass with synthetic localhost credentials; the original startup assumed a checkout name and attempted frontend dependency installation, so it now uses the API bundler/runtime with configured roots. All seven DEV handoffs and five disposable-Postgres HTTP journeys passed again, including viewport bounds. No hosted users were exercised.
