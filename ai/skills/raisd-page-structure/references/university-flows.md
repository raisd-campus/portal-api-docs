# University Flow pages, steps and popups

Read this reference whenever creating, changing or reviewing a University Flow UI in Control. The current authority is `control-plane/docs/ai/design/flow-editor.md`; check the consumer's released component APIs. Historical screenshots and incremental release notes do not override the current standard.

## Establish the domain before composing the UI

Identify the flow/template ID, version identity, steps and registered category/name catalogue, supported applicability groups, dependencies, required/fixed positions, eligible reviewer targets and actual save/apply lifecycle. Map those facts to the established UI. Do not add Admissions-only cohorts, multiple drafts, scheduling, payment/document fields or role permissions to another flow just to make its code look alike.

Academic Study Plan currently has one mandatory fixed Review step and no cohort tabs, with its existing single draft/publication API. Admissions has linked multi-category steps, Local/International settings and independent saved drafts/application scheduling. Both use the same presentation and reviewer interaction. Preserve technical identities such as `academic-curriculum` / `curriculum-review` and existing saved values.

## Page composition

Use the existing PortalShell/header breadcrumb, then:

1. AdminRecordWorkspace titled Edit <Flow> Flow, with shared summary/list sidebar and contextual Close.
2. Affected Modules: external subheading, responsive separate default PagePanelLayout cards per affected portal, full-width header divider and wrapping plain module pills.
3. General Settings: external subheading, default panel, direct undivided form fields and PageActionBar. Render only supported editable metadata.
4. Versions: AdminTable with its own insets and create/action slot when supported. Selecting an exact version changes this panel, preserving General and sidebar state.
5. Version Details: internal breadcrumb/return context, SummaryCard and status Badge, supported Version Settings, optional applicable cohort tabs, then Flow Steps and footer actions.
6. Separate History panel using AuditTrail and server-recorded changes for persisted records.

Retain URL-backed version/cohort selection, table state and dirty-departure guards where supported. Omit unsupported sections and document a justified difference. A single applicability group does not need decorative tabs. Flow summary status describes saved flow state; selecting/editing a version must not silently change its meaning.

## Reuse the implementation, not just its appearance

Control's `src/components/university-flow-steps.tsx` exports:

- `UniversityFlowSteps`: ContentSection title/description plus released FlowEditor; accepts domain steps, constraints, callbacks and optional fixed settings actions after the list.
- `FlowStepPopup`: section layout, Apply/Cancel, pending/duplicate protection, feedback and close-after-success; accepts domain operational sections and optional common reviewer section.

Use these for Admissions, Academic and future flow work. Do not assemble standalone FlowStepCards or a second reviewer popup in the route. Extend the common composition within explicitly authorized scope if a supported flow needs a missing capability; do not hide a bespoke substitute behind matching CSS.

Shared FlowEditor owns black-circle sequential numbers, muted dot-separated categories, hover/focus, external locks/drag handles, required-toggle omission, linked-child layout and keyboard movement. Domain adapters own stable IDs, applicability, enable validation and allowed moves. Numbers are never identity, and ordering never replaces business prerequisites. Declare `configurable: false` for steps with no operational fields, document configuration or reviewer assignments; they have no popup, chevron, card button or hover, while independent toggles remain. A disabled or published step can still have inspectable configuration.

## Popup sections and reviewer behavior

Use `Popup contentLayout="sections"` through FlowStepPopup at a 600px desktop maximum (retain responsive phone gutters) and PopupSection for real operational groups. The released component owns 32px section gaps, 16px inner gaps and dividers between adjacent sections. Keep existing titles or omit them; never invent a title or render an empty settings section. A reviewer-only step contains Reviewers only.

Use the common generic reviewer description: “Reviewers assess submissions and complete the required action for this step at their campus.” Do not mention Applicant, Student or another subject in reusable responsibility copy.

FlowReviewerField uses Campus DropdownSelect and wrapping Roles ChipField side by side, stacked on phones. A stable `FlowReviewerAdapter` supplies target construction and eligible roles to useFlowReviewers. Admissions targets include cohort and require `admin.applicants`; Academic targets use `flowId=academic-curriculum`, no cohort and require `admin.academic.programmes`. Match campus and Staff Admin entry; server authorization remains authoritative.

Keep every campus selection in popup-local state. Apply validates operational edits first, saves changed live assignments with expected revisions/retry IDs, then accepts local operational changes and closes. Save Draft/Apply Version remain separate. Published operational settings are read-only; independently permitted live assignments remain editable. With no editable operation, show Close only.

Cancel/Escape before Apply sends no writes. Reopening reloads saved bindings. Confirmed partial saves remain saved even after Cancel: retain their revisions, notify parent coverage state and retry only unresolved changes with the same request ID. Failed validation/save keeps the popup and edits; pending work blocks duplicate actions and dismissal. Directory failures disable Apply and provide Retry roles. Assignment never grants access.

## Acceptance and documentation

Before delivery, compare both affected editors against the common components, not an old screenshot. Check category/number/lock/toggle structure, meaningful sections, action labels, campus switching, Cancel/reopen, Apply, pending locks, directory failures, conflicts, partial retries, keyboard/focus and desktop/phone/tablet containment. Assert no incidental draft/publication requests. Retain domain-specific operational validation and authorization checks.

Run focused local lint/unit/type/build and affected browser checks; a UI consistency change does not require unrelated backend regression or a shared release. Comprehensive regression remains a pre-push task. Use synthetic isolated writes; do not alter real flows or applications for screenshots.

Update the canonical flow standard and owning Control guide plus mirrors whenever a reusable rule changes. Keep this skill's source/installed copy aligned. Document genuine per-flow differences alongside their API reason. The skill supplies structure and conventions; it does not authorize new persistence, migrations, publication or deployment.


Admissions Registration Fee uses its enabled state and saved order to determine payment readiness and downstream gates for all applications. Do not restore Collection Enabled / Required Before controls or runtime checks; their stored fields are inert compatibility data. Keep existing evidence/permission/currency checks and Conditional Offer English deferral. Pre-template policies use the standard order without a rewrite. This is an Admissions rule, not authorization to change another flow’s lifecycle.

## Payment step template

Use Control's renderFlowPaymentSettings to supply direct PopupSection children to FlowStepPopup. A normal payment step supplies one group, titled Fee Settings, with a general payment description. Only flows that explicitly distinguish Local/International payers supply two groups: Fee Settings (Local Applicant) and Fee Settings (International Applicant) for Admissions, each with an audience-specific description. Do not force Admissions terminology or cohorts into general payment flows. Each section has its own independent Campus selector, pricing and shared Checkbox options for Bank Transfer / Counter. Supply the authorised Campus choices and domain metadata. Keep PopupSection nodes as direct popup content children; returning them inside an opaque component makes Popup group them together and removes the intended inter-section divider. Let the released section layout supply gaps and dividers, without manual lines or local gap overrides. Use side-by-side labelled currency/fee controls, stacking on phones. Optional coverage precedes currency, followed by methods. Use released Checkbox from ui/checkbox for independent methods; arrange options side by side from sm and stacked on phones. Do not duplicate checkbox indicators in portal markup. Where credit treatment is supported, place its cohort-specific field before Methods inside the fee section and explain it with the released TooltipIcon. Tuition/Resource are automatic offsets; only Manual exposes Bursary allocation. Keep live Reviewers in a separate section. Preserve edits across campus switching; Cancel discards unapplied settings; Apply validates before reviewer saves and accepts local settings without publishing.

Pricing is a domain capability, not a reason to fork the popup. Admissions Registration Fee is fixed by campus/cohort; use the approved tariff catalogue and never infer missing campus values. Semester Tuition uses explicit Programme Fee Plan totals and Partial/Full clearance: Full is source-derived/read-only, Partial is a fixed same-currency minimum below the semester total. Keep obligation snapshots, verified receipts and remaining balance distinct. Never claim programme lookup, payment collection or persistence exists merely because the UI has a field. Preserve original evidence, permissions, revisions, retries and protected legacy charges. Converting existing obligations requires explicit authorisation and a backup-first transaction; rendering or publication alone never reprices them.

## Admissions availability versus version activation

Admissions puts Registration Start Date and Registration Closing Date in version-wide Version Settings, before cohort tabs. Use shared DatePicker controls, allow incomplete drafts, require both ordered dates for Apply and keep published dates read-only. Apply activates immediately; the campus-local inclusive window governs new application starts, campus changes and final submissions across both cohorts/all intakes. Availability is server-owned (`getAdmissionsAvailability`); preserve same-campus draft editing and successful exact retries after closing, and never block submitted-case progression or fall back to an older version. Legacy absent windows stay unrestricted until replacement; do not guess dates from old intake settings. Remove the dates/deadlines popup and payment Due Days controls/gates while preserving their stored compatibility data and English/Offer deadlines. Keep other University Flows' lifecycle rules explicit rather than inheriting Admissions windows automatically.
