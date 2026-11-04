# Shared platform

### Opt-in popup sections — 2 November 2026

Shared 0.23.0 adds PopupSection with optional title/description, 16px internal spacing and opt-in Popup contentLayout="sections" with 32px between groups. Existing default Popup bodies retain their original layout. Control Admissions step popups adopt the layout; Eligibility Review hides document configuration without changing saved templates or letter-release behavior. New popup guidance uses sections by convention; existing popups migrate only when requested. See the [component guide](../ai/design/component-library.md).

Patch 0.23.2 adds semantic divider lines between opted-in sections inside the existing spacing. Default popup bodies retain their layouts; Control alone upgrades.

### Local development workflow — 27 October 2026

Control-plane owns a one-command local stack with dedicated PostgreSQL 18, persistent local volume, private environment settings and backup-first import of saved Demo state. Seeding adds missing Demo data and public credentials only; existing identities, applications, policies and evidence remain. Remote and the separate CMS database are unchanged. Canonical agent instructions require focused checks matched to change risk, hot reload and targeted service restarts, with full required release gates at publication checkpoints. Operational commands and recovery are in [local development](../ai/architecture/local-development.md).

### Admissions editor reference - 26 October 2026

The flow detail route uses shared 0.14.0 AdminRecordWorkspace titled Edit Flow, with a saved summary/list sidebar, Original Page and Close. The right column contains Affected Portals as three separate default page panels and General as a title above a page panel containing local-only Apply to and Name fields directly. Released shared 0.13.0 supplies the fixed-height searchable ChipField; edits reset on navigation and do not save or reassign campuses. The previous editor remains on a separate read-only reference route with settings, wording, previews, history and help; save, publish and restore-as-draft actions are unavailable. Stored policy versions, existing drafts, applications and API contracts are preserved while the new interface is designed.

### Admissions flow/version terminology - 26 October 2026

Each named Admissions Flow has multiple immutable published Versions. Control lists the latest published Version separately from the Applied Version currently effective for assigned campuses. Future-effective publication does not advance the applied version early or change existing application pins. Create Flow remains a placeholder; assignments and editor/API paths retain their existing behavior.

### Default title-container height — 0.10.5

All four portals adopt the shared ContentSection 36px minimum title-container height. Heading typography, default gaps and multiline growth remain. This is presentation-only local delivery.

### Shared Admin record flow — 0.10.0

The shared library adds an Admin table and record workspace with read-first editing, summary/list switching, guarded create/edit navigation, typed deletion, explicit save outcomes and compact mobile layouts. It uses presentation data/callbacks; querying, authorization and persistence belong to each portal/API. This library release does not upgrade portal pins or build the Staff Applicants page. See [Admin record flow](../ai/design/admin-record-flow.md).

### Permanent account identity — 21 October 2026

One immutable numeric SSO User ID spans all portal roles and survives learner conversion and Demo resets. Header presentation is name, then User ID · comma-separated assigned roles. Student/Staff numbers and email login remain separate. Allocation is additive in the durable single-writer SSO state; no hosted migration has been run.

## Control-owned Applicant wording — 21 October 2026

Control Admissions configures versioned progress labels, department names and concise updates. API preview and Applicant responses share the same display rows: Pending for unfinished steps, Complete for completed steps, and no inapplicable rows. Applicant renders the returned wording without local overrides. Existing cases retain their pinned policy version.

## Control University Flows - 20 October 2026

Directory update, 23 October: University Flows uses the shared ContentSection with a clickable Admissions card and no surrounding page panel. Released shared 0.11.0 `LinkedList` panel variant gives that card the surface token and 12px page-panel radius, preserving the default variant. Control alone uses that release. Admissions now lists real reusable named configurations in AdminTable, with Global assigned to all eight local campuses. One shared editor owns independent settings and immutable revisions per configuration; publication affects new applications in assigned campuses while existing cases retain their pinned snapshots. A transactional additive import preserves distinct campus settings, scheduled changes, drafts and history. Create is inert and assignment editing is deferred. No hosted migration or portal deployment is included.

Control adds an extensible University Flows registry and campus Admissions editor using released design-system 0.9.1. Existing portals keep sufficient 0.8.0 pins; shared sources are unchanged. Save draft, validate/preview and publish produce immutable effective policy versions for new applications. Reversion publishes a copy as a new version. Active Control plus flows.configure is required; policy settings never grant access. Existing identities/passkeys/grants remain intact, and review desk assignment stays a separate People operation.

Portal API validates inputs/outputs and owns one policy evaluator across affected mutations. Additive PostgreSQL state persists versions/drafts/audit/retries; local memory Demo uses a private atomic policy file with cross-process locking. Existing application/Student/evidence persistence and schema epoch remain unchanged. See [University Flows](../ai/backend/university-flows.md) and canonical OpenAPI. Hosted deployment/publication/production migrations are outside this delivery.


**Document:** SDD-08  
**Status:** Working draft  
**Date:** 18 September 2026

## 1. Purpose

Cross-cutting capabilities that are not a role portal: integration, security, availability, copyright operating controls, and staff training. Most of these are **Not applicable** as frontend work. They still gate Live.

## 2. Capabilities

| ID | Feature | Milestone | Frontend | Backend | Design |
|---|---|---|---|---|---|
| [CAP-53](11-capability-catalog.md#cap-53) | Existing CMS integration and campus configuration | [M2](03-delivery-milestones.md#m2) | Partial | Needs checking | Portal API, field mapping, Cyberjaya config. Critical path. |
| [CAP-01](11-capability-catalog.md#cap-01) | Shared identity (see portals) | [M2](03-delivery-milestones.md#m2) | — | Needs checking | One auth family; role-specific shells. |
| [CAP-37](11-capability-catalog.md#cap-37) | Connectivity, capacity, monitoring | [M2](03-delivery-milestones.md#m2) | N/A | Needs checking | Uptime, expected users, dashboards. Screens do not prove this. |
| [CAP-38](11-capability-catalog.md#cap-38) | Backups and continuity | [M2](03-delivery-milestones.md#m2) | N/A | Needs checking | Named owner, restore test. |
| [CAP-39](11-capability-catalog.md#cap-39) | Privacy, permissions, cybersecurity | [M2](03-delivery-milestones.md#m2) | N/A on shared row | Needs checking | Server-enforced access; policies on record. |
| [CAP-42](11-capability-catalog.md#cap-42) | Copyright and external-provider controls | [M1](03-delivery-milestones.md#m1) | N/A | N/A | Operating approvals. Non-software. |
| [CAP-41](11-capability-catalog.md#cap-41) | Staff training and operating readiness | [M4](03-delivery-milestones.md#m4) | N/A | N/A | Required before Cyberjaya acceptance. |

## 3. [CAP-53](11-capability-catalog.md#cap-53) design

Current: replaceable API contracts, mock campus ownership, student scopes; **no authenticated HTTP adapter, no live CMS**.

Target slice for [M2](03-delivery-milestones.md#m2):

1. Authenticated HTTP adapter.
2. Campus configuration record for Cyberjaya.
3. Admissions entities: applicant, application, evidence metadata, offer, first enrolment.
4. Identity: login mapped to CMS person.
5. Error model: CMS rejection is visible to the user as a failed save, never a silent mock success.

Later slices ([M3](03-delivery-milestones.md#m3)): registration, timetable, files, finance ledger, results publication.

## 4. Environments (proposed, not yet agreed)

| Environment | Use |
|---|---|
| Local mock | Current student demo |
| Integration | Portal API against a non-production CMS |
| Staging | Cyberjaya-like config, UAT |
| Production | Live after [M4](03-delivery-milestones.md#m4) |

Names and hosting TBC with the backend owner.

## 5. Security baseline for Live

- TLS on all portal and API traffic.
- Role and campus on the server for every read/write.
- No secrets in the frontend.
- File uploads scanned and content-typed on the server.
- Audit who published results, allocated payments, issued offers.
- Logout ends the session (today it does not).

## 6. Operating readiness ([M4](03-delivery-milestones.md#m4))

[CAP-41](11-capability-catalog.md#cap-41) is not a software ticket. Collect: who supports students after hours, who restores backups, who trains Registry and lecturers, and the Cyberjaya acceptance sign-off.

## 7. Related documents

Architecture: [SDD-02](02-architecture-and-integration.md). Open questions: [SDD-10](10-open-questions.md).

## Local admissions/profile increment — 5 October 2026

Applicant's existing draft/submission/messages flow now uses a validated session-only mock Portal API. Student schema v4 aligns Personal, Academic and Documents through an explicitly accepted, versioned handoff; submission alone never enrols a student. Shared UI remains 0.6.1. Lesotho is the acceptance-pilot priority; existing Malaysian sample rules are retained without asserting Lesotho policy. Details: [Applicant mock API](../ai/frontend/applicant-portal/mock-api.md), [accepted handoff and backend prerequisites](../ai/backend/admissions-handoff.md). Automated local gates do not establish hosted HTTP, physical-device or CMS integration. No hosted reseed is authorized by this increment.

## Hosted Applicant Demo HTTP and schema v4 — 7 October 2026

Portal API Demo hosts Student schema **4** and Applicant Demo HTTP (`/v1/auth/applicant/login`, `/v1/applicant/:method`) with VPS Postgres-backed applicant state. Hosted Applicant uses `VITE_PORTAL_API_URL`; local Applicant without that URL remains session-only mock. `CORS_ORIGIN` allows campus-scoped portal origins and GitHub Pages. Live CMS admissions and durable evidence storage remain future work. Details: [Portal API](../ai/backend/portal-api.md), [VPS topology](../ai/architecture/vps-topology.md).

## Campus selection and issued letters — 7 October 2026

Current local mock workflow supersedes the earlier one-confirmation acceptance increment. Shared UI stays at 0.6.2. Hosted Applicant Demo HTTP authentication and supported methods remain intact; **new campus inputs, QA/Registry letters and final enrolment acceptance are not supported by the hosted server yet**. Final acceptance is gated there rather than calling the old one-stage operation. No Portal API service, database or deployment is changed by this increment.

Step 2 requires Campus (Lesotho, Cyberjaya, Botswana, Eswatini, Sierra Leone, Cambodia, Uganda, Namibia). Alumni additionally requires a trimmed Previous Student ID. A campus change clears dependent preferences. Drafts remain saveable when incomplete. English Language Results are optional for every sample programme; populated rows must be valid. All eight campuses expose the existing Design curriculum as **demo content**, not verified campus offerings, fees or admissions policy. Selected campus metadata and frozen intake reference are retained through acceptance and Student bootstrap.

Payment Proof is reviewed by **Bursary**; Document Check by **Quality Assurance**. QA Verify Documents validates the submitted snapshot and atomically releases a generated **Eligibility Letter** PDF. The applicant's **Confirm and Continue Enrolment** popup shows the intake, faculty and programme and preview/download actions. Confirmation records intent without logout or Student provisioning. Registry's **Release Offer Letter** is enabled only afterwards. The final **Accept Enrolment** popup previews/downloads that Offer Letter. Only successful final acceptance triggers automatic logout; the applicant clicks Sign in to open the existing Student tab. Cancel changes nothing. Saving disables confirmation and dismissal; failure retains data and allows retry. Logout failure can be retried independently of acceptance. All writes retain ownership, revision, session and request-id guards.

Generated PDFs are prominently labelled DEMO, not official university letters, and contain the application reference, applicant, campus, intake, faculty, programme and release date. Original Unicode names remain canonical; the demo PDF's standard font uses a safe ASCII transliteration with replacement for unsupported glyphs. QA/Registry letters, releases and confirmations live outside the immutable submitted snapshot and are distinct from applicant-uploaded eligibility evidence. Release creates no automatic conversation or unread messages. Approved/accepted conversations remain read-only. The approved scenario now awaits Eligibility confirmation; Registry release and final acceptance remain user actions.

Admissions handoff and browser envelope **v2** include the selected campus and both letters/confirmations. The producer/consumer validate sequence and bounded PDF resources. V1 remains readable for legacy records without fabricated letters. Local generated PDF bytes travel only in the one-time validated development postMessage exchange, never URLs or persistent browser storage. Existing origin/window/nonce/replay checks and session cleanup remain. Student Documents shows issued Offer Letter first, Eligibility Letter second, with working preview/download for these resources. Other legacy documents retain their existing delivery capabilities. Payment proof remains outside Profile documents.

The selected-campus bootstrap clones only sample academic/campus configuration and remaps its IDs and local calendar windows. It creates an isolated identity/enrolment, inherits no prior results, registrations, payments or visa approvals, and preserves existing credit/fee/clash/international restrictions. Non-Cyberjaya fees and curriculum remain explicit prototype samples, not campus policy. Refresh disposes mock state and temporary resources. Durable evidence delivery, hosted two-letter methods and real CMS provisioning remain future work.

Mock operations: `confirmApplicationEligibility` (applicant), `verify-documents` with Eligibility generation (development QA command), `release-offer` (development Registry command), and guarded `acceptApplicationEnrolment` after Offer release. No new HTTP routes are exposed. Local DTOs may include optional `issuedLetter` PDF resources; hosted Profile document responses remain metadata-only.

## Prepared original-document synchronization — 12 October 2026

The 12 October local preparation supersedes earlier statements that original HTTP file delivery and applicant-specific continuation are wholly unimplemented. [Demo admissions resources](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/admissions-resources.md) defines the separate Demo artifact adapter, one-time authenticated continuation, capability gating, ownership and local verification. It is **not deployed**; Live storage/CMS provisioning and hosted migration remain pending. Shared UI remains 0.6.2; admissions v2, DEV transport v3 and Student schema 4 are preserved. The existing Bursary shortcut remains On hold.

The 12 October audit keeps established layouts and shared 0.6.2. Editable Resume/sign-in labels use `type-body text-title`, Applicant scenario labels retain an 8px control gap, and Portfolio/Resume/payment-proof errors use stable descriptions and live error associations. Portfolio labels retain a stable accessible name when errors appear. Demo account choices expose their selected state; Student sign-in hover changes are immediate. Applicant desktop step labels use the semantic body typography. Authenticated continuation uses the existing sign-in panel/gutters and an accessible main/status/error region. Document actions retain native browser viewing; no custom PDF viewer or shared-package override was added.

## Local shared Community candidate — 12 October 2026

Student and Lecturer reuse unchanged Community presentation from a locally packed design-system 0.7.0 candidate. Capability-gated Demo Portal API transport pairs programme/exact-module/direct conversations with session-derived authors, membership checks, unread/read state, own deletion, idempotent retries and original-byte attachments. Polling is 3 seconds for visible active threads and 10 seconds for visible summaries. Local Student mock/service adapters remain. Additive Demo chat/byte stores and an explicit non-destructive legacy import preserve record schema 4. This is local Demo preparation; publication, released consumer pinning, hosted migration and deployment remain separate approvals. See [Community contract](../ai/backend/community-chat.md).

## UI presentation ownership — 13 October 2026

The owner-approved [Student/Applicant UI audit](../ai/design/2026-10-13-portal-ui-ownership-audit.md) prepares neutral presentation and global CSS in the unpublished shared 0.7.0 candidate. Shared source owns cursor/state/touch/container/forced-color behavior and extracted display patterns; portal workflow, records and routing stay in their existing owners. Opt-in variants preserve specialized phone layouts. Validation and release boundaries are in the audit. No API/schema change, publication, pin upgrade or deployment is included.


## Reusable Materials connected memory Demo — 14 October 2026

The local connected memory Demo supports reusable module plans and class-specific automatic schedules, original resource/brief bytes and server-authorised Student access. Lead publication freezes immutable versions; classes select the latest version published by class start, resources can receive versioned corrections, and class assignment requirements freeze. The class-start lock is a Demo rule pending campus policy, not confirmed institutional policy. Faculty owns assessment keys/weights. Student submissions remain existing metadata-only Demo operations.

See [canonical connected Materials rules](../ai/backend/reusable-materials.md). This capability requires an isolated memory API and never writes hosted records or migrations. Independent browser mock stays separate. Production persistence, Faculty exceptions, activation and complete LMS acceptance remain pending; Lecturer aggregate verification stays on hold.


## Read-only Materials with teaching-week release — 14 October 2026

The current local Materials increment is read-only for Lecturer, with one weekly module list and automatic availability at configured teaching-week start. Admin content/version setup is deferred. Existing class version bindings/history and Faculty weights/deadlines are retained; shared API file reads enforce ownership and server release. This supersedes the earlier Lecturer plan-authoring controls. See [current rules](../ai/backend/reusable-materials.md). No shared package change, migration, hosted write or deployment. Lecturer aggregate remains held.

## Shared release and integrated identity verification — 16 October 2026

Shared AuditTrail and approved accordion treatment are released in package 0.8.0;
Student, Applicant and Lecturer pin that exact registry version. The integrated
Demo SSO bridge binds known people/desks, retains Lecturer actor identity and
shares one code exchange under StrictMode. Unlinked identities fail closed.
[Verification and delivery limits](../ai/frontend/student-portal/audits/2026-10-16-campus-integration-publication.md)
separate local gates, registry release, source publication and hosted readiness.

### Authentication presentation — shared release 0.9.0

SSO composes login and password recovery from the shared AuthLayout 0.9.0 release,
released controls and existing tokens/type. Identity, password/reset/passkey and
redirect policy stay in SSO. Local acceptance is documented in the
[shared auth receipt](../ai/architecture/audits/2026-10-19-shared-auth-ui.md).
The package is published and SSO pins it exactly; hosted deployment is verified separately. This is not a Live status change.

SSO consumer content omits login introductory/passkey helper copy and the passkey
action icon, uses the current-year Raisd AI Sdn. Bhd. copyright footer, and places
notice descriptions in the shared Popup body. These are consumer compositions of
0.9.0; shared components and authentication policy are unchanged.

Keychain's shared-library account embed adds Campus/Role/search discovery filters
using recorded Demo scopes, with single-region scrolling on short screens. SSO
supplies context hints and viewport bounds; filtering does not change authentication
or role grants. [Picker behavior](../ai/frontend/keychain.md#embedded-account-picker--19-october-2026)
is owned by Keychain and uses released shared 0.9.0 components.

SSO uses AuthLayout 0.9.1 with brandingPlacement="above" for login and password recovery: the logo is centred outside and above the card. The default shared placement remains inside; authentication policy and workflows are unchanged.


## Connected Demo learner lifecycle — 21 October 2026

Same-account acceptance now replaces Applicant with Student access. Outstanding requirements continue in Student; Control owns preview/confirmed reset of registered Cyberjaya Demo journeys. Identity, one-use exchange, generation, explicit ownership and rollout boundaries are defined in the [canonical learner lifecycle](../ai/backend/learner-lifecycle.md). Existing accepted accounts are not automatically migrated; hosted rollout is separate.

## Local Keychain credential separation — 23 October 2026

Demo Keychain supports an email-keyed SSO credential map independently of Portal API's scenario-password files. It uses that map for SSO cards, including Student aliases, while preserving account passwords, roles, passkeys and Demo records. Sources and generated modules remain ignored; infrastructure credential provisioning is separate. See [Keychain guidance](../ai/frontend/keychain.md).

### Admissions General metadata saves

Control's General form persists name, campus assignments and Draft/Published metadata through a guarded, retry-safe Portal API transaction. Draft changes keep the applied version active; publishing General metadata does not publish unrelated policy-setting drafts. Campus reassignment preserves exactly one active flow per campus and existing applications keep pinned snapshots. The released shared RadioField supplies compact status choices and PageActionBar supplies the full-width save footer. Reference pages remain read-only. Delivery is local only.

## Responsive Control breadcrumbs — 27 October 2026

Control inner pages use the shared PortalHeader breadcrumb hierarchy with router links to parent pages and a non-linked current page. Overflowing ancestry collapses into the shared dropdown menu, retaining full labels and current-page context on narrow headers. Parent navigation retains existing unsaved-change protection. This is an opt-in shared 0.18.0 presentation change adopted by Control only; permissions, account identity and persistence are unchanged.


Shared 0.18.1 keeps compact Admin record-list values side by side with wrapping and no horizontal scrolling. Control adopts this presentation patch; directory tables, navigation guards and persistence remain unchanged.


Shared 0.18.2 is adopted by both Staff and Control. Compact Admin record lists keep right-aligned values side by side and wrap long status text inside pills without horizontal scrolling; directory and workflow behavior are unchanged.


Shared 0.18.3 scopes colored status-text presentation to Admin summary columns. Entry names remain left-aligned; compact-list statuses stay right-aligned and wrap. Summary/list statuses omit pill background, border and padding, while badges elsewhere remain unchanged. Staff and Control adopt the patch.


## Cross-portal header breadcrumb rollout — 27 October 2026

Applicant, Student, Staff/Lecturer and Control use released shared 0.18.4 structured header breadcrumbs. Portals supply their existing parent-page hierarchy through router links; guards, context, identity and authorization remain portal-owned. Student retains programme/semester scope. Long trails collapse into the shared menu, whose code loads only when necessary to retain the initial bundle budget. SSO and Keychain do not use this header; their authentication/tools layouts are unchanged. Delivery is local only.


## Admissions version browsing — 27 October 2026

Control lists existing published Admissions configuration history and opens URL-backed version details inside the Versions panel. Shared ContentBreadcrumb, SummaryCard and Local/International segmented tabs compose the read-only first slice; the tab bodies remain blank. Parent workspace/General edits persist during version navigation, with guards retained when leaving the flow. Version status distinguishes Applied, Scheduled, Previous and unassigned Published. No version/policy API writes, schema migration or application changes are included.


Control Admissions Versions now shows Version, Status and Effective From (UTC), with a UI-only Create Version toolbar button. Applied version summaries retain normal title text with a success background and large solid green Applied Badge in the existing SummaryCard action slot; non-applied versions use the neutral card and large secondary Not Applied badge. Shared 0.18.5 mutes the active AdminTable page button for Staff and Control. No version creation workflow, API/schema change or policy/application mutation is introduced.


## Predefined Admissions Flow Editor (local implementation, 28 October 2026)

Control configures predefined workflow template 1 in immutable versions, independently for Local/International students. Shared 0.19.0 owns linked/reorderable step presentation; Portal API owns pinned evaluation and financial/document invariants; SSO owns immediate audited campus-role reviewer bindings. Published history and existing accepted cases remain unchanged. The implementation includes guarded drafts, role coverage, quote/fixed pricing and structured text letters with synthetic previews. It does not introduce arbitrary workflow scripting or grant access through assignment. Hosted activation remains separate. Normative details: [Flow Editor](../ai/design/flow-editor.md).


## Admissions version application journal — 28 October 2026

Control composes Version Settings and shared AuditTrail with saved drafts and immutable published versions. Applying a draft publishes and applies atomically; a published version may be reapplied immediately or scheduled with a required reason. An append-only application journal selects the version by application time, preserving future takeovers and pinned applications. Backdates, timestamp conflicts, no-op selections and uncovered campus assignments reject on the server, with role coverage, concurrency and idempotency checks. Names remain sidecar metadata, and backup-first file/PostgreSQL upgrades preserve original policy records. Local delivery does not authorize a Global application or hosted deployment. See the [University Flows contract](../ai/backend/university-flows.md).


Admissions version refinements (28 October 2026): reasons are no longer required for publishing/applying a version; prior recorded reasons remain intact. Published display names are editable sidecar metadata with expected-name concurrency and retry receipts, while policy objects, permanent numbers, dates and pinned applications remain unchanged. Control disables Apply for Applied versions, gives History a separate panel, and adds an editable suggested name and shared Applied status pill to creation. No remote activation is included.


## Multiple Admissions draft versions — 28 October 2026

Control lists independently saved drafts with published versions and always offers Create Version. Creating is local-only; first Save Draft assigns a stable identity/permanent number under transaction locking. Per-draft revisions and exact retries prevent overwrites and duplicate numbering. Applying keeps that identity/number, removes only the chosen draft and preserves other drafts, schedules and pinned applications, including out-of-order publication. Backup-first file/PostgreSQL upgrades preserve the legacy draft and explicitly bind compatibility requests; ambiguous legacy writes reject. Flow status reflects General metadata rather than version drafts. Numeric version URLs, unsaved guards and read-only references remain supported. No real Global Apply or hosted operation is part of delivery. See [University Flows](../ai/backend/university-flows.md).


Shared 0.19.6 restores normal Badge background, padding and radius for AdminRecordPanel summary statuses. Compact-list status text remains unchanged. Control alone adopts the patch; flow/policy state is unchanged.


Shared 0.19.7 synchronizes pointer-drag state in SortableList. Control draft steps renumber immediately, keep linked children together and persist their actual order through Save Draft. Rejected destinations leave order intact. Existing policies/applications and other portal pins are unchanged.


Shared 0.19.8 sizes the Admin record sidebar using the shell bottom inset rather than the section gap, aligning its bottom edge with the portal frame. Control adopts the patch without data or workflow changes.


Admissions version audit events now record server-calculated before/after field changes atomically with draft saves and published-name changes. Control and the read-only reference use existing shared AuditTrail change rows. Legacy entries without detail remain explicit; no fabricated history, library release, migration or policy/application change is introduced.
