# Predefined University Flow editor

Owner-approved implementation, 28 October 2026. Local implementation uses shared package 0.19.5. This is the reusable contract; hosted activation is a separate release decision.

## Ownership

The design system owns Switch, SortableList and FlowEditor presentation. Flow templates are developer-authored, versioned code: operators cannot add tasks, alter dependencies, execute scripts or invent capabilities. Control edits policy drafts. Portal API validates and executes pinned policy. SSO owns immediate, audited reviewer bindings; assigning responsibility never grants portal access.

Capabilities are Review, Payment, Document Release and Applicant Action. A step may combine them. Local and International have separate settings/order. New/returning/transfer restrictions remain business predicates, not extra interchangeable student types.

## Admissions template 1

Stable parent order begins eligibility, registration-fee, english, offer, tuition, entry, arrival, medical, endorsement, international-registration. Eligibility owns eligibility-confirmation; offer owns signed-offer. Children follow their parent and cannot be dragged separately. International registration is the fixed final task. Dates/deadlines and application evidence are fixed flow settings, not reorderable tasks.

| ID | Capabilities | Required constraints |
|---|---|---|
| eligibility | review, document-release | Existing evidence/correction validation; complete only with issued Eligibility Letter |
| eligibility-confirmation | applicant-action | Child of eligibility; cannot be effective without it |
| registration-fee | payment, review | Enabled eligibility/confirmation precede collection; collection differs from applicability and settlement |
| english | applicant-action, review | Evidence may arrive later; Conditional Offers remain possible; arrival anchors deadline, not initial evidence review |
| offer | document-release | Mandatory; eligibility/confirmation, fee milestone and conditional-English predicates preserved |
| signed-offer | applicant-action, review | Child of offer; signature belongs to exact current Offer ID |
| tuition | payment, review | New international clearance cannot be disabled; first-year/approved-semester rules preserved |
| entry | review | International only |
| arrival | review | International only; actual non-future campus-local date |
| medical | review | International only; enabled arrival required |
| endorsement | review | International only; configured arrival and medical prerequisites |
| international-registration | review | International only; fixed last; configured clearance gate preserved |

Permitted movements preserve eligibility before fee/offer, fee before Offer when requiredBefore=offer, and enabled arrival before medical/endorsement plus enabled medical before endorsement. The final registration task stays last. Invalid moves are rejected in UI and server validation. Order prioritizes ready work; it never replaces explicit business prerequisites. Parent disable retains child preference but makes the child ineffective.

## Immutable versions and operational assignments

Published versions are read-only. Create Version opens a local unsaved copy of a published version; first Save Draft gives it a permanent identity and number. Multiple saved drafts are independent and appear alongside published versions. Popup Apply edits local draft; Save draft persists; validated Publish creates a numbered version. General metadata save does not publish settings. Reviewer changes use a separate explicit save and apply immediately. Legacy policies and accepted snapshots are not rewritten.

Each flow/campus/student-type/step binding selects eligible SSO role definition IDs, never display names or person assignment IDs. Any selected active role may complete the step. Flow and Roles screens share the same binding store. Legacy desk authorization remains until explicitly replaced. No new-template publication without required reviewer coverage. Security revocation remains possible and fails closed with repair feedback.

## Pricing and documents

Payment settings select Bursary quote or authoritative fixed campus price. Fixed amounts are positive currency-correct minor units, with a tuition first-year/semester basis; price source and policy identity remain pinned. No implicit zero, conversion, tax, refund or automatic credit. Quotes/payments already recorded are never repriced by publication.

Eligibility, Conditional Offer and Full Offer support structured title/body and approved placeholders only. No HTML/scripts or resource loading. PDF previews are synthetic. Demo marking and required system instructions remain. Issued document identity/bytes and prior signatures are immutable; a new Offer requires a new signature.

## Future flow onboarding

Define a stable template identity/version, supported steps/capabilities, settings schema, dependencies, allowed moves, applicability and completion adapters. Add migration/legacy fixtures, role coverage and failure tests. Compose the shared FlowEditor without embedding campus APIs in the library. Document every setting and its effect before publication support. Do not infer new operational policy from UI labels.

## Acceptance and recovery

Cover legacy parity, both student types/new-returning-transfer, every move boundary, child restoration, conditional/full letters, stale signatures, corrections, delayed English, arrival/medical, partial/external payments, currencies, draft conflicts, scheduled publication, role revocation, outages and retries. Use isolated records and PostgreSQL state. Back up local data before activation; never reset a shared Demo journey for verification. Changes remain local until separately authorized for hosted release.


## Component and application interfaces

`FlowEditor` accepts controlled stable steps, `readOnly`, `canMove`, `onOrderChange`, `onEnabledChange` and `onStepSelect`. A FlowStep carries ID, label, capability array, enabled state, optional children, locked/toggleDisabled flags and explanation. Switch is controlled and labelled. SortableList owns pointer/keyboard presentation, external handles, Move Up/Down alternatives and announcements. Locked items and children cannot be moved independently. No component imports a router, identity client or business schema.

Control opens `?version=new` before first save and `?version=N` for saved drafts or published versions. The legacy draft query resolves only an explicitly bound migrated draft. General edits survive query navigation, and one leaving blocker protects General/version drafts. Popup Apply changes the local version draft. Cancel/dismiss discards only popup edits. Reviewer Save is explicitly immediate and separate from Apply/Save draft/Publish. Form submission cannot publish accidentally. Intakes use the supplied API catalogue; no arbitrary intake identifiers are required from operators.

## Settings-to-card map

| Surface | Existing settings and additional controls |
|---|---|
| Eligibility | Correction reply requirement; label, pending/completion wording; structured Eligibility Letter; live QA/role binding |
| Confirmation child | Applicant confirmation preference and wording; no reviewer role |
| Registration Fee | Collection methods, applicability/milestone, deadlines, credit treatment; quote/fixed campus pricing and reviewer binding |
| English | Fulfilment years, evidence and configured wording; live reviewer binding |
| Offer / signature child | Conditional permission, acceptance duration, signature requirement; separate Conditional/Full templates and signature reviewer |
| Tuition | New international and other-student basis, approved semester arrangement, due days; quote/fixed campus pricing |
| Entry / arrival / medical / endorsement / final clearance | Cohort-enabled predicates, wording and individual reviewer binding; final registration gate |
| Application Requirements | Existing document field/cohort/required-optional-hidden rules, status/department wording |
| Registration Dates and Deadlines | Catalogue intake and registration date rows, extensions/exceptions, live Registry binding |

Disabling a parent projects the child off without destroying the saved child preference. Re-enabling restores it. Case runtime resolves the pinned cohort; changing a configuration never rewrites accepted records. A fixed fee is not a payment: verified funds, permitted arrangements and independent registration clearance still apply.

## Compatibility, storage and failures

The optional `settings.workflow` schema contains `templateId=admissions`, `templateVersion=1`, both cohort definitions and complete legacy settings in each cohort. Absent workflow means legacy policy. Unsupported template versions fail schema validation. New-template Applicant draft/submit clients send `X-Raisd-Workflow-Template: 1`; API advertises the supported version and rejects incompatible new-template writes with `409 WORKFLOW_CLIENT_UPDATE_REQUIRED`. CORS explicitly allows the header. Legacy pinned applications remain usable.

SSO stores bindings and retry receipts additively in its existing file/PostgreSQL identity state. Expected revisions, operation fingerprints and audited saves prevent silent last-writer overwrites; confirmed campuses remain confirmed after a partial multi-campus failure. Referenced roles cannot be deleted, ordinary last-reviewer removal is blocked, and security access revocation remains possible. Revoked/missing access is shown as needing repair; action authorization uses fresh claims and fails closed. Built-in Campus Admin resolves to its stable campus role definition rather than a person assignment ID. Legacy imported policy lineage is resolved through retained policy IDs without changing the case.

`/v1/control/flows/admissions/document-preview` renders synthetic PDF bytes without writes. Template validation permits only approved placeholders and plain text. The current PDF font supports its standard Latin character set; unsupported glyphs cause an explicit validation/release error, never replacement characters or partial saved letters. Multilingual embedded fonts are a future extension. Existing issued bytes remain retained.

## Local activation and rollback

Back up through `npm run local:backup` before activating a changed runtime. No new physical database table is required: workflow settings live in existing version JSON and reviewer state is additive to identity JSON. Keep immutable history, requests and imported IDs. Roll back binaries only while no new-template policy has been published; after new-template publication, retain a compatible evaluator/client or forward-fix. Never remove workflow fields or reset identity/application state to make an old client work. An SSO directory outage blocks new-template presentation/authorization rather than inventing reviewer ownership. Legacy reads retain pinned wording as an outage fallback; when the live directory is configured, explicit bindings supply the same role names in Applicant and Staff. Restore from a reviewed backup only through a separate data-recovery action.


## Step-card presentation — shared 0.19.1

Steps use consecutive display-order numbers, including linked child steps. Reordering recalculates the displayed numbers; stable task IDs, prerequisites and persisted settings never use these numbers as identity. Category names appear above the step label in semantic colors, separated by middle dots. Toggles sit before the chevron as independent sibling controls; the card and chevron open configuration. Linked connectors are vertically centered.

Move Up/Down arrows provide keyboard and tap alternatives to dragging. Published/read-only flows retain the disabled controls; configuration remains inspectable. Control filters international-only tasks out of Local rather than displaying inapplicable disabled cards. Its visible reorder is merged into the full stored order, retaining hidden task settings and fixed boundaries. International still displays those tasks, including intentionally disabled ones. This is presentation only; it does not republish policies or change application evaluation.


### Flow card refinements — shared 0.19.2

FlowEditor omits visible up/down buttons. External handles support dragging and Alt+Up/Down keyboard reordering with screen-reader instructions and announcements. Number badges are 32px blue circles with white text. Applicant Action uses a semantic purple token. Other SortableList consumers retain their default move buttons through `showMoveButtons`.

ContentSection adds optional `description` below its title inside the header, with standard body typography, muted color and 4px separation. Its 36px minimum header grows as needed; omitted descriptions preserve existing consumers. Control uses the slot for the published Flow Steps notice instead of a separate small caption. Only Control upgrades; no policy/API/application changes.


### Shared FlowEditor 0.19.3

Step numbers use white text on the shared black background token. All category names end in Step, retaining their existing semantic colors and dot separators. Parent-to-child spacing is 12px, matching the parent-group gap. Step cards use the shared surface-hover background on hover. Only Control upgrades; no configuration, policy, application or backend changes.


### Mandatory/fixed steps — shared 0.19.4

Mandatory steps omit their enable toggle and visible required caption. Control marks Offer and International tuition mandatory using the existing template rules; this does not alter policy validation or applicability. Fixed-order steps display a lock in the external handle slot instead of inside the card. Handles and locks center against the parent card, including linked groups and wrapped labels. Shared SortableList `renderChildren` keeps linked content in a separate grid row so it cannot shift the handle. Only Control upgrades; existing settings, reviewer bindings and application state are unchanged.


### Minimal category labels — shared 0.19.5

FlowEditor categories now use one muted gray treatment with concise labels (Review, Payment, Document release, Applicant action), separated by middle dots. The repeated Step suffix is removed. Black number circles and white step names retain the hierarchy; colors remain on controls/status. Existing mandatory/fixed behavior, spacing, hover, interactions and policies are unchanged. Only Control upgrades.


## Version lifetime and audit ownership

Control now composes Version Settings before cohort tabs, PageActionBar at the version-panel footer and AuditTrail below Flow Steps. Save Draft persists both cohorts without activation. Apply Version publishes a saved draft or reapplies an immutable published policy using the configuration application journal. Settings become read-only after publication; published display names remain separately editable metadata. Reapplication supplies a separate application date and retains future takeovers; no new reason is required. API owns coverage, chronology, concurrency, immutable snapshots and atomic receipts. The reusable FlowEditor still owns step interaction only; no component release is needed. See [University Flows](../backend/university-flows.md#version-metadata-and-application-journal--28-october-2026).


### Independent saved-draft lifetime

The editor owns local form values and guard composition; Portal API owns saved draft identities, permanent numbering, per-draft optimistic revisions, retry receipts and immutable publication. Save Draft never applies a version. First save allocates a number transactionally; publishing retains it, even when drafts publish out of order. Both cohorts share the version's metadata and save together. Switching cohorts does not reset edits; selecting another version or returning to the table resolves dirty edits first. General stays mounted and is not saved by same-flow version navigation. History lives in a separate shared AuditTrail panel and links new draft events by stable version identity. Flow summary status belongs to General and is independent of draft-version status. No reusable component change or package release is required.


### Independent saved-draft lifetime

The editor owns local form values and guard composition; Portal API owns saved draft identities, permanent numbering, per-draft optimistic revisions, retry receipts and immutable publication. Save Draft never applies a version. First save allocates a number transactionally; publishing retains it, even when drafts publish out of order. Both cohorts share the version metadata and save together. Switching cohorts does not reset edits; selecting another version or returning to the table resolves dirty edits first. General stays mounted and is not saved by same-flow version navigation. History lives in a separate shared AuditTrail panel and links new draft events by stable version identity. Flow summary status belongs to General and is independent of draft-version status. No reusable component change or package release is required.


### Pointer reorder synchronization — shared 0.19.7

Accepted pointer drops commit the final sortable index into consumer-owned order. Display-order numbers are recalculated immediately for every visible parent and linked child; toggles and later draft saves keep that same order. Disallowed destinations are blocked before optimistic DOM changes. This fixes cards that moved visually while retaining their former numbers/order in the draft. Control alone adopts the patch; no workflow or policy invariant changes.

Implementation reference: [dnd-kit sortable state management](https://dndkit.com/react/guides/sortable-state-management/) explains why optimistic sorting uses the source final index rather than source/target identity. Keep React order as the source of truth after drop.


Version audit differences are captured on the server at save time and passed to shared AuditTrail changes rows. The component already supports labelled before/after values and remains generic; policy paths/labels, both cohorts, saved baselines and persistence belong to API/Control. Missing legacy differences are labelled, never reconstructed from the current editor.
