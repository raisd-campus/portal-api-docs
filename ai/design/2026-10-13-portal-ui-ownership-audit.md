# Student and Applicant UI ownership audit — 13 October 2026

Status: local, unpublished design-system 0.7.0 candidate. Existing uncommitted Community and Lecturer work is preserved. No API/contracts/records, package release pins, commits, pushes, migrations or deployments are changed. Lecturer aggregate verification stays on hold.

## Method and impact

Inventory: 95 non-development Student TSX files and 21 Applicant TSX files, plus both entry stylesheets, the route registries, the shared component catalogue and installed candidate. Followed route compositions down to primitives, local display components, global descendant selectors and responsive hooks. Existing route journeys provide automated page/state coverage; standalone consumer regressions establish that shared components work without a portal stylesheet. Developer-only workflow tools are excluded from extraction.

The change surface is presentation/interaction ownership. Shared source owns semantic foundation CSS, state/orientation variants, cursor/touch/forced-color affordances and reusable display layouts. Portal adapters retain contracts, route/query/session state, membership, grades, validation, dates, upload bytes/resources and all mutation decisions. No arbitrary visual redesign or indiscriminate whole-page extraction.

## Confirmed gaps and conversion

| Evidence | Risk | Resolution |
| --- | --- | --- |
| Student index.css supplies enabled-control pointer globally; Lecturer/Applicant do not. Shared tabs have no cursor utility. | Same tabs render a different affordance in another portal. | Move enabled-link/button/tab/menu/option cursor into shared base CSS; preserve native and ARIA disabled behavior. |
| Shared primitives use data-active/open/orientation variants supplied by Student/Lecturer's extra vendor import. Applicant and standalone fixtures lack that prerequisite. | Active and animated controls depend on consumer setup. | Distribute the existing shadcn-compatible state/orientation and accordion keyframe definitions in shared CSS; remove redundant portal vendor imports. |
| Student supplies page-content container sizing, navigation/chat coarse touch sizes, phone hover suppression and forced-color scrollbar behavior. | Correct component imports still miss narrow layout and input behavior. | Put these rules beside shared shell/chat/scrollbar ownership; remove Student duplicates. |
| StudentSummaryCard has container-specific layout/avatar rules outside its source. | Moving the JSX alone loses 96px narrow avatars and academic metadata positioning. | Extract summary/skeleton with their complete container CSS into system/student-summary-card; keep existing slots. |
| Applicant supplies compact survey and permanent-address header rules through local descendant selectors. | Other consumers cannot reproduce the same mobile states safely. | SurveyLayout.phoneLayout=compact and DetailSectionCard.headerStackOnPhone opt in to identical shared rules; remove Applicant's overrides. |
| Applicant and Student LetterActions have identical preview/download markup. | Spacing, equal widths, icons, focus or disabled presentation can diverge. | system/document-actions owns display only; each portal still creates and revokes its original PDF URL. |
| Profile edit/save/cancel buttons are local reusable presentation. | Future forms repeat different pending/disabled/button-width behavior. | system/edit-form-actions; Student adapter preserves labels, data slot and submit semantics. |
| Applicant numbered wizard frame embeds generic sticky/mobile scrolling and connectors. | Future workflows copy the frame and miss disabled, active, centering or reduced-motion behavior. | Controlled system/wizard-step-panel with caller-supplied step/region labels; workflow eligibility stays in Applicant. |
| Credit-load segments mix display with a Student eligibility helper. | Sharing the whole function would move academic policy into UI. | system/capacity-meter accepts a resolved label/valid state; Student keeps creditLoadStatus. |
| Learning rows mix card/disabled layout with deadlines/submission presentation mapping. | Lecturer learning rows would duplicate geometry or import Student contracts. | system/learning-content-row receives formatted labels, icon, status slot and callback; adapter keeps deadline/assessment logic. |
| Lecturer review cards combine generic avatar/action layout with Student review eligibility. | Generic person presentation cannot be reused independently. | system/person-action-card; Student adapter retains review actions, eligibility and description binding. |
| News carousel owns general drag/link suppression, scrolling and phone header rules. | Future carousels copy pointer logic or omit click suppression and responsive density. | system/content-carousel and horizontal-scroll behavior; Student keeps announcement records, cards, route links and empty copy. |
| Historical Lecturer dock omitted Student's resize assembly. | Shared imports alone do not guarantee complete composition. | Existing system/community-resize remains the owner; retain the documented aside + edge assembly and consumer keyboard/drag/draft regressions. No duplicate local handle. |

## Student page-by-page decisions

All routes retain the shared PortalShell/Sidebar/Header/Account/Main/PageContent frame and the shared foundation. Required per-state checks: loading, read error/retry, empty/unavailable, long content, disabled actions, active tabs, keyboard focus, phone/tablet/desktop bounds, Community navigation/drafts and scroll.

| Page / variant | Shared ownership checked or moved | Stays in Student and why |
| --- | --- | --- |
| Sign-in and admissions entry | Existing Input/Button/error presentation; shared enabled cursors | Demo/HTTP identity, keychain and one-time admissions transport |
| Dashboard / news | ContentSection, new ContentCarousel + drag hook, existing buttons/media | News records, announcement destinations/empty copy; current-study-period decisions |
| Dashboard / timetable and calendar | Existing CalendarMonthSelector, Tooltip, OnlineClassIndicator, ContentSection | Campus-local clock, timetable slot placement, current-class rules and module/assessment route context |
| Dashboard / performance and modules | Existing summary/status/card primitives | Student metric/grade projection and active registered offering selection |
| Announcements list | Existing PagePanelLayout, LinkedList, content sections, banner/media primitives | Important/current campus categorization and safe source-content projection |
| Announcement detail / missing record | Breadcrumb, shared frame, media, DataTable and error/unavailable states | Sanitized article blocks, publisher/time-zone metadata and owned route |
| University Policies / category tabs | Existing LinkedList, SegmentedTabs, banner/panel geometry | Policy catalogue and unavailable document destination decisions |
| Academic Performance | Shared StudentSummaryCard/skeleton, existing chart primitives and metrics | GPA/CGPA, credit outcomes, chart datasets and academic policy |
| Academic Modules / semester list | Shared summary, existing semester selector/cards/skeletons | Current/history selection and exact offering registrations |
| Module Summary | Existing SummaryCard/DetailField/InnerSection, new PersonActionCard | Module outcome text, lecturer assignment and review availability |
| Module Materials / item detail | New LearningContentRow, existing Accordion/Popup/file/media presentation | Availability/deadline/submission projection, external-link policy and owned bytes |
| Lecturer Review | Existing survey/choice components and shared person/action presentation | Questionnaire, eligibility, validation and review write |
| Module Attendance | Existing DataTable/status/summary primitives | Exact session attendance, percentage and status policy |
| Academic Timetable | Shared shell/container/coarse controls; existing indicators/tooltips | Campus time, offering rows, registration mode and conflict computation; no new Lecturer timetable redesign |
| Academic Attendance | Existing calendar/month controls and shared summary | Attendance rollups, owned sessions and status interpretation |
| Study Plan | Existing Accordion/DataTable/Badge/summary patterns | Semester/current/history/credit/prerequisite/attempt semantics |
| Module Registration | New CapacityMeter, shared summary/form-row/actions, existing timetable controls | Minimum/maximum credit policy, fee/clash/enrolment guards and request workflow |
| Registration review states | Existing SummaryCard/DataTable/Badge/QueryErrorState | Department progress, guarded finance/support destinations |
| Graduation / collection | Existing summary/tabs/fields/popups/file actions | Eligibility, clearance, document lifecycle and award/receipt guards |
| Profile Personal | New EditFormActions and StudentSummaryCard; existing fields/address cards | Editable draft, required fields, emergency contacts and scoped save |
| Profile Academic | Shared summary/fields/tables | Owned academic identity and prior qualification projection |
| Profile Resume | New EditFormActions; existing FormGrid/row controls | Resume list validation, drafts and mutations |
| Portfolio list/new/detail/edit | Existing CardGrid/DetailField/upload/lightbox/action patterns | Portfolio record routes, files, artwork metadata and edit/delete rules |
| Student Documents | New DocumentActions for issued letters; existing LinkedList/FileLink/Popup | Available owned bytes, URL lifecycle, download and receipt capabilities |
| Privacy & Security | Existing read-only fields/status/tabs | Campus security/privacy statements and account issue interpretation |
| Finance overview/tabs/invoice detail | Existing DataTable/SummaryCard/PageActionBar/FileUploadField | Currency, totals, invoice/payment eligibility; invoice-specific full-width action CSS remains local |
| Immigration tabs/steps/popups | Existing SegmentedTabs, summary, survey, fields, popups, uploads | Visa/campus policy, document order, timeline and current application context |
| Online Forms catalogue/entry/history | Existing tabs, LinkedList, FormGrid/AddRowButton/DetailField/Popup | Source form templates, dates, validation and guarded department review |
| Services catalogue/detail/history | Existing TabbedPagePanel/PagePanelLayout/ResponsiveMedia/DataTable | Campus-authored content.css, image provenance and body layouts are source-specific content, not shared control overrides |
| Community directory/group/members/DM/services | Existing shared Community, chat rows/composer/lightbox/resize/fades | Membership, service conversations/meetups, polling, authors, drafts and scroll ownership |
| Unknown/stale route and historical enrolments | Existing EmptyState/QueryErrorState/read-only shared frames | Stable enrolment routing, stale-session rejection and unavailable ownership |

## Applicant page-by-page decisions

| Page / variant | Shared ownership checked or moved | Stays in Applicant and why |
| --- | --- | --- |
| HTTP / Demo sign-in | Existing fields/buttons/error states; shared cursors/foundation | Scenario credentials, keychain and authenticated session selection |
| My Applications empty/list | Existing EmptyState/CardGrid/RecordSummaryCard | Application routing, numbering/status projection and illustration |
| New/resumed application frame | New WizardStepPanel (sticky desktop, phone step scrolling/connectors, locked/current/completed state) | Step completion, save/leave destination and draft state |
| Consent | Existing cards/checkboxes/actions | Legal/product declarations, acceptance and validation |
| Study Preferences | Existing dropdowns/FormGrid/DetailField | Campus/programme/intake dependencies and Alumni ID requirements |
| Personal Details | Existing fields/DetailSectionCard plus shared opt-in phone header stacking | Address draft, same-address behavior, identity and contact validation |
| Academic Qualifications | Existing accordion/fields/file fields/row actions | Qualification catalogues, English optionality, evidence rules |
| Documents | Existing FileUploadField/DetailField and shared disabled/error/selection affordances | Retaining applicable owned File objects and requirement validation |
| Application Fee | Existing summary/fields/file picker/actions | Fee display, proof eligibility/validation and upload bytes |
| Documents Checklist questions/edit | Shared SurveyLayout compact phone variant and SurveyChoiceGroup | Branching questions, answer persistence and scenario isolation |
| Checklist results/notes/samples/lightbox | Existing Accordion, shared media/lightbox/buttons | Requirement notes, exact sample documents and prepared-check state |
| Submitted summary / personal/study/academic/documents/payment tabs | Existing SummaryCard/DataTable/DetailField/Popup | Immutable submitted snapshot, reviewer progress and correction eligibility |
| Eligibility confirmation | New DocumentActions and existing Popup | Issued PDF bytes/URL lifecycle and confirmation command |
| Offer release / enrolment acceptance | New DocumentActions, existing SummaryCard/Popup/actions | Registry release ordering, immutable acceptance and sign-out/Student continuation |
| Reviewer conversation / attachments | Existing shared chat rows/composer/date dividers/previews | API/session messages, file resources, unread acknowledgement and drafts |
| Save & Close / discard / failed save | Existing Popup.footerAfterDismiss and shared button/focus/pending states | Save staging, incomplete drafts, retry and blocked destination handling |
| Withdrawn, rejected, incomplete or unavailable application | Existing shared error/empty/status/panel patterns | Status-specific read/edit/withdraw permissions |

## Remaining local CSS and boundaries

Student retains application overflow policy, timetable week/agenda switch while that Student schedule composition remains local, and exact invoice action responsiveness. Applicant retains only application viewport width/overflow policy and redundant box-sizing compatible with Tailwind preflight. Neither stylesheet owns shared cursor, common state/orientation variants, survey/detail-card overrides, shared summary container rules or carousel header behavior after final migration.

The shared package imports no portal contracts, router, queries, mock records, CMS or database. Label formatting/eligibility and browser file resources belong to adapters. Reusing a shared import does not authorize local restyling or omission of its documented assembly.

## Verification and release boundary

Final validation on the completed audit and locally installed 0.7.0 candidate:

| Scope | Result |
| --- | --- |
| Shared package `npm run check` | Passed: typecheck/build, 16 units, consumer build and 28 consumer browser checks. Standalone fixture imports no portal CSS. |
| Student `npm run check:all` | Passed uninterrupted on the final carousel adapter: lint/typecheck/production/bundle/token/assets, 797 units, 278 Chromium cases (46 intentional skips), 41 WebKit cases (31 intentional skips). |
| Applicant `npm run check:all` | Passed: lint/typecheck/production build, 65 units and all 70 Chromium/WebKit browser cases. |
| Lecturer focused verification | Passed lint/TypeScript/build and 32 selected mock/modules/module-detail tests. Live Overview/Students cursors are pointer; the shared desktop grip is ew-resize with the established 296px starting width. Aggregate verification remains on hold. |
| Visual/interaction evidence | Candidate consumer captures checked at 375/768/1440px, no horizontal document overflow; tests cover active/disabled cursors, keyboard, carousel drag/click suppression, responsive summary/wizard/survey/headers and existing Community resizing/drafts/overlays. |
| Documentation | Canonical guidance, SDDs 04/05/08 and affected mirrors synchronized; released catalogue validator passes all 170 existing captures. New captures are isolated under design-system/candidates/0.7.0/ui-ownership-audit. |

Earlier iterations exposed two strict Applicant browser-test timing issues. The equal-width PDF-button assertion now measures both columns in the same animation frame; sequential boundingBox calls compared different entry-animation scales. The keyboard dropdown helper now waits for the previous menu to close before focusing the next field, preserving the documented focus-restoration behavior. No product geometry, eligibility or assertion threshold was weakened. Both full final runs passed after these timing corrections. Shared disabled-anchor cursor behavior was explicitly corrected and covered before the passing final shared gate.

Final candidate includes the retained shadcn MIT notice for the state/orientation and accordion definitions. Three consumers use the locally packed candidate for validation while their tracked registry pins remain 0.6.2. Browser adapters retain their own records, resources, API modes and mutation rules. No API restart or session reset occurred. Existing uncommitted work is preserved.

Publication, released consumer pinning and public released-catalogue replacement remain a future approval checkpoint. No commits, pushes, package publication, migrations or deployment occurred.


### Subsequent approved three-tab correction

The Lecturer enrolment-filter follow-up exposed a gap in the existing segmented-strip rule: minimum scrolling width was supplied only for four or more tabs. With explicit owner approval, the exact existing 9rem-per-tab rule now applies to three or more. No new width, local CSS or component override was added. Two-tab behavior remains unchanged. Latest shared checks pass 16 units and 29 consumer browser cases; Student and Applicant full gates pass on the final candidate. See canonical Lecturer guidance for exact counts and separate candidate captures under modules-enrolment-filters. This supersedes the earlier 28-case shared count for the current local candidate; release/pin boundaries remain unchanged.
