# University Flow editor standard

## Admissions registration window — 3 November 2026

Admissions Version Settings owns optional `settings.registrationWindow` with date-only `startDate` and `closingDate`, outside cohort overrides. Drafts may omit either date; every new Apply requires both and closing on or after opening. Same-day windows are valid. The current Control workflow activates immediately; legacy application timestamps and future takeovers remain intact. Registration dates do not alter Applied/Published status and a closed version never falls back to an older one.

Open at the start of the opening day and close after the closing day in each campus timezone, for all intakes and student types. `getAdmissionsAvailability(campusId)` returns the current applied window, timezone, server-local today, availability and upcoming/closed guidance. The authenticated read is campus-scoped. New draft creation, destination-campus changes and final submission check that same current window, including submission of older pinned drafts; successful exact retries remain replayable after closing. Same-campus draft edits and submitted-case progression continue. No automatic rejection, deletion or restart occurs.

Legacy applied policies without a window remain unrestricted. Do not infer two dates from an intake registration date. Legacy published versions without a window must be copied to a draft before a new Apply. Stored intake dates, payment Due Days, snapshots, audit values and reviewer bindings remain compatibility data; no migration or policy rewrite is performed. Payment deadlines, blank Due Days and missing payment registration-date Registry gates are inert for all applications. English/Offer deadlines, evidence checks, exceptions and reviewer permissions remain enforced.

The version table shows Registration Start Date and Registration Closing Date. Shared DatePicker controls replace activation timing in draft Version Settings; published dates are read-only. The old dates/deadlines popup and payment Due Days controls, including the reference controls, are removed. Activation history still records UTC instants separately. Academic programme semester-registration calendars are a separate domain and remain unchanged.


Current standard, 2 November 2026. This guide describes the maintained UI and behavior, superseding the earlier incremental presentation notes. Consult the consumer's installed design-system catalogue and declarations; Control currently uses released 0.24.0. Hosted activation is a separate decision.

## Ownership and common composition

The design system owns FlowEditor, FlowStepCard, SortableList, Switch, Popup and PopupSection. Control owns the common `UniversityFlowSteps` and `FlowStepPopup` composition in `src/components/university-flow-steps.tsx`. Both Admissions and Academic Study Plan use that composition; future University Flows reuse it rather than assembling a separate step list or popup. Domain adapters supply definitions, settings, prerequisites, eligible roles and persistence. Do not put campus APIs or business rules in the design system.

The page hierarchy is: AdminRecordWorkspace with summary/list sidebar; Affected Modules cards; General Settings; Versions directory; selected-version details with internal breadcrumb/return, SummaryCard and supported version settings; optional applicability/cohort tabs; Flow Steps; completion actions; independent History panel using AuditTrail. Keep General mounted while browsing versions. Use only capabilities supported by the flow's API: this hierarchy does not authorize new metadata fields, cohorts, scheduling, creation or persistence behavior. History and relationships requiring a saved record are omitted for unsaved records.

Use shared ContentSection title/description slots and default panel spacing. The directory uses AdminTable's own insets, search, sorting, filters, feedback and pagination. Summary/list selection, exact version identity and supported cohort state use established route/query navigation and guards. Flow summary status describes saved flow-level state, not the selected version or unsaved form. Preserve each flow's API-defined status semantics.

## Current step presentation

Use UniversityFlowSteps, which wraps ContentSection and the released FlowEditor. Each step has a stable ID, registered name, capabilities, enabled state and explicit required/fixed constraints. Capabilities are Review, Payment, Document release and Applicant action; combined steps list their distinct categories in muted text separated by middle dots. Do not invent free-text categories or status wording.

Display-order numbers, including linked children, are consecutive white text in black 32px circles. They recalculate after accepted reorders and never become persistent identity. Cards use shared hover/focus styling; card selection opens configuration. Toggles are separate controls before the chevron. Required steps omit the toggle and redundant required caption. Fixed steps use the external lock; movable parents use external drag handles with Alt+Up/Down instructions and announcements, without visible move buttons. Linked children are indented with centered connectors, travel with their parent and have the same 12px spacing as parent groups. Read-only steps with configuration remain inspectable. Templates set `configurable: false` for steps with no operational fields, document configuration or reviewer assignments. Such cards are static: no popup trigger/tab stop, chevron or card hover; any independently permitted enable toggle and linked ordering remain. Do not infer configurability from read-only or enabled state.

Templates own applicability, prerequisites, allowed moves and enable/disable validation. A parent becoming ineffective retains its child's saved preference. Rejected moves preserve form state. Do not copy Admissions restrictions into other templates or infer business prerequisites from visual order.

## Configuration popup and live reviewers

Use FlowStepPopup at a 600px desktop maximum (phone gutters retained), which owns section composition, Apply/Cancel actions, duplicate-action protection, pending dismissal locks and close-after-success. Template callbacks own validation, persistence and local operational edits. With no editable operation, use Close only. The Popup uses `contentLayout="sections"`: PopupSection owns 16px within groups, 32px between groups and decorative divider lines between adjacent sections. There is no leading/trailing divider. Preserve existing titles or omit them; omit empty sections entirely. Do not add portal-local gaps or borders. Other non-migrated popups retain their defaults.

Operational controls use untitled PopupSections unless there is a meaningful existing subgroup. Document sections remain titled where supported. Render Reviewers only for steps with staff responsibility, using the common titled section and this generic description: “Reviewers assess submissions and complete the required action for this step at their campus.” Do not name Applicant or another portal in reusable responsibility copy.

The common FlowReviewerField places Campus DropdownSelect and Roles ChipField side by side, stacking on phones. Show saved assigned campuses only. Switching campus retains all unapplied selections. `useFlowReviewers` receives a stable flow adapter for target identity and role eligibility, plus a callback for confirmed directory updates. Existing adapters live in `src/lib/flow-reviewer-adapters.ts`: Admissions uses cohort-scoped bindings and `admin.applicants`; Academic uses `flowId=academic-curriculum`, no cohort, and `admin.academic.programmes`. Both require the matching campus and Staff Admin entry. Backend authorization remains authoritative.

Apply validates operational changes before saving changed live assignments; only successful assignment saves allow local operational changes to be accepted and the popup to close. Operational changes still need the flow's normal Save Draft/Apply Version path. Assignment saves apply immediately and grant no portal access. Published settings remain read-only, while independently permitted reviewer changes remain editable. Cancel/Escape before Apply sends no writes and reopening loads saved assignments. A partial save cannot be undone by Cancel: retain confirmed campus revisions, notify parent coverage state and reuse request IDs for unresolved retries. Errors stay in the popup with selections retained; block duplicate Apply and dismissal during saves. Directory failures disable Apply and offer Retry roles.

## Flow-specific contracts

| Flow | Steps and applicability | Existing version and assignment behavior |
| --- | --- | --- |
| Admissions | Predefined multi-capability steps; Local/International cohorts with linked children | Multiple independent saved drafts, immutable settings, application journal and scheduling; cohort-specific reviewer bindings |
| Academic Study Plan | One mandatory, fixed Study Plan Review step with Review capability; no student-type tabs | Existing single saved draft/publication API; live campus-level reviewer bindings and independent author/reviewer checks |

Academic retains display-only Study Plan terminology and existing `academic-curriculum` / `curriculum-review` identities. Its step popup contains Reviewers only, with no empty settings group. UI alignment does not add Admissions lifecycle features or change Academic's required-review rule.

### Admissions template 1

Stable parent order begins eligibility, registration-fee, english, offer, tuition, entry, arrival, medical, endorsement, international-registration. Eligibility owns eligibility-confirmation; offer owns signed-offer. Children cannot be dragged separately. Evidence rules are fixed settings; registration windows belong to version settings, not reorderable tasks.

| ID | Capabilities | Required constraints |
| --- | --- | --- |
| eligibility | review, document-release | Fixed first, even when disabled; evidence validation; completes with issued Eligibility Letter |
| eligibility-confirmation | applicant-action | Linked child; cannot be effective without eligibility |
| registration-fee | payment, review | Eligibility/confirmation precede collection; collection differs from applicability and settlement |
| english | applicant-action, review | Later evidence and Conditional Offers remain possible; arrival anchors deadline |
| offer | document-release | Mandatory; eligibility/confirmation, fee and conditional-English predicates preserved |
| signed-offer | applicant-action, review | Linked child; signature belongs to the exact current Offer ID |
| tuition | payment, review | New international clearance mandatory; first-year/approved-semester rules preserved |
| entry | review | International only |
| arrival | review | International only; actual non-future campus-local date |
| medical | review | International only; enabled arrival prerequisite |
| endorsement | review | International only; configured arrival and medical prerequisites |
| international-registration | review | International only; fixed last; configured clearance gate |

Local hides international-only cards. Reordering visible cards merges into the full stored order, preserving hidden settings. Registration Fee may move before or after Offer; its enabled state and position govern payment gates. Validation still keeps arrival before medical/endorsement plus medical before endorsement when enabled. Older editable draft copies repair Eligibility's first position locally; only Save Draft persists it. Published settings and pinned application order are not rewritten.

`documents.correctionsRequired` is deprecated and inert for every policy, including older pinned applications. Unanswered messages never gate eligibility approval or letter release. Reviewers decide evidence acceptability; validation and authorization remain mandatory. Messaging, unread/reply tracking, stored flags, snapshots and historical audit values are preserved. Eligibility Review's popup contains Reviewers only; document configuration remains hidden and its stored templates remain available for release.

### Admissions settings and lifecycle

Registration Fee uses the common Fee Settings section with fixed campus/cohort prices and payment methods. Registration Fee Credit Treatment appears independently in each Local/International Fee Settings section, before Methods, with the shared info tooltip. Collection Enabled and Required Before are removed from both the step popup and reference editor. English retains fulfilment years; Offer retains conditional permission, acceptance duration and Conditional/Full document templates. New tuition requirements use programme-sourced semester totals, Partial/Full coverage and independent payment methods. Payment-linked legacy tuition retains its original basis/approval rules. International tasks retain their operational gates and live assignments. Application Requirements retains evidence/cohort/required-optional-hidden rules. Registration windows are version-wide; English/Offer exceptions retain their existing permissions. No free-text labels, statuses, updates or department names are exposed.

Create Version starts an unsaved copy of a published version; first Save Draft allocates a permanent identity/number. Saved drafts remain independent and appear beside published versions. Save Draft never activates settings. Apply Version validates and publishes a saved draft or reapplies immutable published settings through the application journal, preserving future takeovers and pinned applications. Published display names are separately editable metadata; published policy contents are immutable. General saves do not publish a version. Do not require an application/change reason where the current UI/API no longer requires one.

Version Settings precedes supported cohort tabs; switching tabs preserves edits. Leaving a dirty version, including returning to its table, uses Save/Keep editing/Discard. General remains mounted and independent. History uses the separate panel with server-recorded changes, actor, time and before/after values. Never reconstruct missing historical differences from today's editor. Keep flow status separate from selected-version status.

Fixed campus prices use positive currency-correct minor units and authoritative sources; ordinary publication never reprices recorded quotes/payments. The explicit backup-first local conversion is the separately approved exception for untouched charges. Structured document title/body supports approved placeholders only, without HTML/scripts/resource loading. Previews are synthetic. Issued bytes/identities and prior signatures are immutable; a new Offer requires a new signature.

### Fixed Admissions presentation and compatibility

The typed catalogue beside Admissions contracts owns registered step names and category/action statuses. Pending text follows the actual action: Awaiting {assigned roles} Review / Quote / Release, Awaiting Payment, or Awaiting Applicant Confirmation / Submission. Completion uses Reviewed, Payment Verified, Confirmed or Submitted, with fixed Eligibility Letter Released, Eligibility Confirmed and Offer Letter Released milestones. Draft, Action Required and Enrolment Accepted remain fixed; publication statuses are separate. Future flows register their own subjects/actions rather than importing Applicant-specific text.

Resolve current role names by configuration, campus, cohort and stable step; preserve casing, deduplicate and join with commas. Missing staff assignments show Unassigned / Awaiting Reviewer Assignment. The compatible `department` wire key carries the reviewer label. Legacy presentation settings remain stored but inert, including pinned policies and audit history. Directory failures remain retryable and fail closed.

Absent `settings.workflow` means legacy policy. Template-aware clients advertise `X-Raisd-Workflow-Template: 1`; unsupported writes receive `409 WORKFLOW_CLIENT_UPDATE_REQUIRED`. Reviewer bindings/receipts remain SSO-owned with existing file/PostgreSQL persistence. Expected revisions and retry fingerprints prevent silent overwrites. Publication coverage, role revocation and security repair remain server decisions. No UI refactor changes authorization, immutable snapshots or storage formats.

## New-flow implementation checklist

- Define stable template/version identity, registered step names/categories, applicability, prerequisites, required/fixed steps and eligible reviewer targets before implementation.
- Map supported API operations to the shared page hierarchy; document unsupported capabilities and justified differences instead of inventing a second layout or expanding the backend.
- Reuse UniversityFlowSteps, FlowStepPopup and FlowReviewerField; add a domain adapter rather than copying Admissions or Academic JSX/controller logic.
- Keep flow metadata, version settings, live responsibility assignment and runtime authorization separate; document each setting's effect and when changes become active.
- Cover desktop/phone/tablet containment, keyboard/focus, category/number/lock/toggle structure, no empty popup sections, campus selection retention, Apply/Cancel, pending locks, failures, revision conflicts and partial retries.
- Use isolated fixtures for writes; assert browsing/cancellation never saves or publishes. Preserve domain invariants and existing applications. Run proportionate local gates; comprehensive regression is reserved for pushing and required shared publication checks.


### Registration Fee order and enablement — 2 November 2026

Enabled Registration Fee is required. Its position governs quotations, receipt submission/review, external settlement and blocking of later step actions. Before Offer, settlement blocks Offer release and acceptance; after Offer, release remains available and payment waits for preceding enabled steps, including the linked Signed Offer when required. A disabled fee is skipped without erasing charges, receipts or history. Final registration still requires every applicable fee to be settled. English clearance may retain the existing Conditional Offer deferral, preventing a cycle with later arrival-related evidence; ordering does not remove domain prerequisites or exceptions.

`registrationFee.collectionEnabled` and `registrationFee.requiredBefore` remain deprecated, inert compatibility fields. These runtime rules apply to all existing and new applications, including older pinned policies; stored settings, policy versions, snapshots, already issued letters/payments and audit values are not rewritten. Templates use their saved cohort order, while pre-template policies use the standard order. The collection route becomes available when the step is ready, a charge exists and a permitted payment method is configured. Existing receipts remain reviewable even if the old policy has no portal methods. With no portal method, authorized staff can still verify exact external settlement; removing portal methods never waives the fee. Quotation and settlement cannot bypass preceding steps, role authorization, amount/currency matching or retry/revision checks.

## Reusable payment settings — 3 November 2026

Control's `renderFlowPaymentSettings` returns direct PopupSection children, preserving shared gaps and dividers. A normal payment step uses one **Fee Settings** section with a general description. Admissions supplies **Fee Settings (Local Applicant)** and **Fee Settings (International Applicant)**, each with a relevant description, independent Campus selector, currency/amount controls, optional Partial/Full coverage, optional cohort Credit Treatment with an info tooltip before Bank Transfer / Counter checkboxes. Method options sit side by side on desktop and stack on phones. Campus selections are independent and switching retains all edits. Admissions uses Local and International sections in both payment popups; future flows supply their own applicability rather than inheriting those cohorts. Desktop fields are side by side; phones stack with visible labels. No shared package change is required.

Registration Fee has no pricing-mode selector. Approved initial rates are Cyberjaya MYR 500 Local/MYR 1,000 International and Lesotho LSL 300 for both. Other campuses remain unconfigured and prevent applying an enabled fixed-price version until completed. Popup Apply updates both cohort payment settings but does not publish; live reviewer saves retain their independent semantics.

Tuition's Partial/Full selector precedes currency and fee. Full displays Programme currency/Programme semester total read-only because programmes within a campus can differ. Partial specifies a positive fixed minimum below the exact semester total in the same currency. Independent cohort methods follow. The Programme Fee Plan, not a module-fee sum or a flow-wide tuition total, supplies the authoritative semester amount. Historical first-year/approved-semester rules remain only for protected legacy obligations.
