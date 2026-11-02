# Applicant portal — agent knowledge

## Published Academic catalogue and accepted curriculum — 29 October 2026

HTTP applications use the Portal API catalogue of active campus faculties and programmes with a usable approved default structure and semester calendar. Intake/faculty/course choices and server submission validation use the same campus/intake catalogue; switching campus clears previous choices. Programme document requirements come from that catalogue. Drafts and submitted applications retain their catalogue labels, while submission pins the exact published ProgrammeVersion and structure version in `academicSelection`.

Acceptance preserves that selection in the Academic acceptance variant and emits admission handoff v3. The owned Student continuation creates the selected programme enrolment with its first period current/pending and later periods planned/pending, retains the same SSO person, and copies no existing student's registrations, results or invoices. Existing Demo acceptance and handoff v1/v2 remain valid. Published curriculum changes affect subsequent submissions, not archived applications or existing enrolments. `MockApplicantPortalApi` accepts an optional catalogue/selection integration for paired Portal API use; standalone scenarios retain their established catalogue.

Accepted SSO sessions retain the server-owned principal string returned as `scenarioId`; new applicants use an isolated person-and-campus principal rather than a Demo scenario. Campus-host exchanges pass the existing hosted campus ID, and the API validates that scope. An unscoped host lets the server resolve a single assigned campus. Multiple campus identities must enter through the intended campus host. New owned journeys begin empty, and their catalogue and submitted campus remain server-scoped. Raw Demo credential login and development scenario pickers retain their five existing identifiers. Submission checks the catalogue revision before pinning selection so a concurrent curriculum publication requires current choices to be retried.

Display terminology is **Study Plan** throughout Academic tabs, actions, breadcrumbs, review flow and feedback. Existing routes, flow/step IDs, API/schema keys, saved record names and recorded audit values are preserved. The built-in Academic Curriculum configuration name has a display-only Academic Study Plan alias; loading it does not change the stored name or create unsaved edits.


## Shared header breadcrumbs — 27 October 2026

Applicant pins shared 0.18.4 and passes its existing owned route hierarchy into PortalHeader. My Applications is the root; Create Application, Edit Application and Application Details link back to it. Documents Checklist remains its own root. Router links retain the existing Leave application guard and account-name/ID data. Long trails use the shared responsive menu, including keyboard and loading states.

## Application progress status pills - 26 October 2026

Submitted application progress shows Step, Reviewer and Status. Status displays the configured progress update using the existing shared Badge with success for completed milestones and warning for pending actions. Its displayed text omits trailing periods; the duplicate raw-status column is removed. Configured applications still render the API-projected Control wording without changing pinned policy text or workflow state. Legacy progress uses the same presentation. Status pills appear only through the first unfinished step; later steps stay listed with empty status cells, avoiding the appearance of concurrent reviews. Once every step completes, all milestone statuses are shown. Control-provided reviewer names and wording remain unchanged.

## Shared ContentSection title height — 0.10.5

Applicant, Student, Staff and Control pin the same released shared component. All ContentSection title containers have a 36px minimum height, including custom headings and sidebar variants; multiline content can grow. Typography and default page/sidebar gaps remain unchanged. This is a local presentation upgrade without data, API or workflow changes.

## Shared page spacing — 0.10.2

Applicant pages consume released design-system 0.10.2. Applications, create/edit, submitted/unavailable and Documents Checklist use the shared default page ContentSection (16px), preserving existing headings and focus targets. Internal step panels, cards, validation, conversation and workflow spacing remain unchanged. No local page-heading gap replaces the shared default.

## Uploaded-file actions — 21 October 2026

Every Applicant FileUploadField composes the existing shared per-file action slot with DocumentActions: Preview File and Download File. This covers editable academic qualifications, English evidence, identity/supporting documents, fee proof, later admissions evidence/signatures and read-only submitted documents. Original bytes remain owned by the browser session and existing authenticated file-delivery adapter. Preview opens the original resource in a new tab; download retains its original filename. Temporary URLs are revoked on replacement/unmount. Metadata-only unavailable files show disabled actions and a recovery message instead of delivering empty bytes. Existing field variants, backgrounds, validation, selection/removal and permissions are unchanged; no shared package release is needed.

## Account header — 21 October 2026

The header name comes from the saved applicant name on the selected owned application, or the most recently updated named application on listing/checklist/new routes. Until a saved applicant name is available, it falls back to the SSO account name and then Applicant. It uses the existing application query without additional requests or identity changes.

Headers use shared `PortalAccount` 0.9.3: name first, permanent SSO numeric User ID followed by ` · ` and comma-separated assigned roles second. Applicant, Student, Staff and Control use the same number. Email and campus Student/Staff numbers are not substituted. Role metadata is display-only; active-role authorization remains unchanged. The 26 October cross-portal source audit confirmed Control uses the signed-in SSO displayName, Staff uses its signed-in staff identity/profile, and Student uses the owned student profile. Stored Demo names such as SSO Admin (Demo) are valid identity data and are retained; portals must not replace them with guessed names.

## Learner conversion and reusable Cyberjaya Demo flow — 21 October 2026

Accept Enrolment replaces Applicant access with Student access for the same SSO identity, using durable retry/recovery and a one-use Student exchange. Student continues outstanding admissions evidence; Control can preview/reset only a registered Demo journey. The [current lifecycle contract, ownership/reset rules, account checkpoints and verification](../backend/learner-lifecycle.md) supersedes earlier Applicant-session handoff/reset descriptions below. Hosted rollout remains a separate coordinated release.


## Cyberjaya configuration fixes — 21 October 2026

Configured draft mode is preserved before the first campus selection and when resuming; campus changes resolve their matching policy. Document retention, submitted documents and the campus-selected checklist consume the policy overrides. Tasks show actual fee/tuition/English/Offer deadlines, permitted payment instructions and only applicable later evidence actions. SSO sessions retain the API-advertised original-file/continuation capability. Existing legacy cases and immutable accepted snapshots are preserved. The new test:e2e:campus suite exercises actual Applicant → Staff → Student API-backed local/international journeys in isolated memory. See [University Flows](../backend/university-flows.md).


## Current Admissions policy flow - 20 October 2026

New applications pin the campus policy at first valid saved campus selection. Eligibility precedes Registration Fee collection; Application Fee and admissions Registration Fee are one charge. The new five-step submission has no upfront payment step. Post-submission tasks collect the quoted fee, exact-version signed Offer, English evidence and requested corrections through existing owned-file routes. Policy-disabled stages are explicitly not required; missing data displays Not provided/manual review. Conditional acceptance enables Student continuation, followed by Bursary/Faculty registration and CAF. Legacy cases retain the earlier flow described in historical notes below. Shared package stays 0.8.0. See [University Flows](../backend/university-flows.md); local verified source does not establish hosted or Live CMS delivery.


**Repository:** [`raisd-campus/applicant-portal`](https://github.com/raisd-campus/applicant-portal)
**SDD:** [SDD-04](https://github.com/raisd-campus/control-plane/blob/main/docs/sdd/04-applicant-portal.md)
**Campus agents:** [../AGENTS.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/AGENTS.md)

## Status

A validated ApplicantPortalApi is implemented with released shared package 0.8.0. Locally (no `VITE_PORTAL_API_URL`) it remains a session-only in-process mock. Hosted Demo builds call Portal API over HTTP (`POST /v1/applicant/:method`) after **Raisd SSO** sign-in — the Applicant portal does **not** host email/password forms (redirect to `sso.raisd.co/login` with campus landing `returnUrl`). See [mock API and validation](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/frontend/applicant-portal/mock-api.md) and [SSO](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/sso.md). This portal is the **Admissions launch** surface (milestone 2): account, application, evidence, declarations, track status, offer, accept enrolment. Registry remains the decision owner.

## Agent rules

1. Implement against SDD-04 and the campus [AGENTS.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/AGENTS.md). Do not invent a second admissions architecture.
2. Talk only to the Portal API. No direct CMS or database access.
3. Pin a released `@raisd-campus/design-system` version when application UI begins. Compose the shared `system/portal-shell` family with applicant-owned routes, navigation, account details and actions. Follow [component ownership and setup](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/design/component-library.md); do not copy student portal components or shells.
4. Lesotho is the first acceptance pilot. Preserve current Malaysian sample content and use the captured [LUCT procedure](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/luct-online-registration.md) as a Cyberjaya research reference. Campus-specific Lesotho NMDS/LGCSE rules remain to be confirmed; Malaysia EMGS/NOC is not its default overlay.
5. When UI or API contracts appear, add feature docs under `docs/ai/frontend/applicant-portal/` and register them in [../MANIFEST.yaml](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/MANIFEST.yaml).

## Planned application-flow overhaul — fee decision, 19 October 2026

Planning record only; the current application, API, ledger and deployed workflow are unchanged. The owner confirmed with the team that Application Fee and Registration Fee are the same admissions charge, charged per programme applied. Use **Registration Fee**, matching the supplied enrolment-flow screenshot, for both online and walk-in application work.

Add these items to the overhaul checklist:

- Rename the current Applicant **Application Fee** presentation to **Registration Fee** across the application step, submitted details, payment instructions, progress, and relevant Eligibility/Offer payables and staff/API display labels.
- Treat both names as one admissions charge per programme application. Reconcile the proposed APP001/REG001 distinction without creating a second charge or losing existing fee, invoice, payment, allocation or handoff references. Internal identifier migration requires an explicit compatibility plan.
- Keep semester/resource fees scoped to semester enrolment. The fee identity and display term are resolved; exact collection timing and any credit towards semester/resource charges remain pending. This decision does not change amounts, tax treatment or payment gates.

The earlier eligibility-first direction remains part of the planned overhaul. Implementing the overhaul is separate from recording this decision. The other pending tuition, SSD/immigration, medical, Offer/English and CAF policy questions remain open.

## LUCT online registration baseline — 6 October 2026

Two campus procedures are captured for Applicant / Online Registration (and enrolled Add/Drop):

| Process | Summary | CAP |
|---|---|---|
| **A — Applicant online registration** | Public 4-step wizard (Academic → Documents → Personal → Submit) + `LUCT-MKT-003` admission form + EMGS health/visa pack | CAP-02, 03, 07, 55 (CY immigration CAP-50) |
| **B — Enrolled registration maintenance** | REG014/015 Add/Drop (+ change of programme and related Registry forms) | CAP-10, 51 |

Detail, SLAs (24h confirm / 2–3 day Registrar / 14-day completion), evidence matrix, and Lesotho substitution notes: [../backend/luct-online-registration.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/luct-online-registration.md). Page previews: [../materials/luct-online-registration/lkw-pages/](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/materials/luct-online-registration/lkw-pages).

**FE gap matrix (all portals):** [../backend/luct-online-registration-fe-gap.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/luct-online-registration-fe-gap.md) · Pages: [online-registration-gap.html](https://github.com/raisd-campus/control-plane/blob/main/docs/diagrams/old-cms/online-registration-gap.html).

**Lesotho CMS vs Applicant (8 Oct 2026):** [../backend/lesotho-cms-vs-applicant-portal.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/lesotho-cms-vs-applicant-portal.md) · Pages: [cms-vs-applicant.html](https://github.com/raisd-campus/control-plane/blob/main/docs/diagrams/old-cms-lesotho/cms-vs-applicant.html). Captures Read.ai 7 Oct expectations, gaps after the campus + Eligibility→Offer merge, and the ordered Applicant backlog (hosted API parity, LGCSE/LSL, type matrices).

**Applicant merge · QR · fee SPs (9 Oct 2026):** [../backend/applicant-qr-fee-mechanisms.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/applicant-qr-fee-mechanisms.md) · Pages: [fee-payment-sps.html](https://github.com/raisd-campus/control-plane/blob/main/docs/diagrams/old-cms-lesotho/fee-payment-sps.html). Standup 8 Oct — merge analysis (`9e007f2`/`532d6f0`), QR automated+manual, fee/payment from CMS stored procedures (currency matrix · cases C1–C10).

## Submitted application UI preview — 1 October 2026

The working Applicant UI pins released shared package 0.8.0. Without `VITE_PORTAL_API_URL` this is session-only mock behaviour. Hosted Demo builds wire the same `ApplicantPortalApi` over HTTP to Portal API. Saved serializable snapshots/conversations and revision/read/response state belong to the API adapter; original File objects and previews belong to its browser resource adapter. Message drafts remain portal-owned across navigation; mock refresh still resets the session. Existing draft and checklist flows remain independent.

- `/applications/:applicationId` shows **My Applications → Application Details**. Draft cards still open `/edit`; submitted cards open the detail route. Unavailable IDs show an unavailable state and a return action; submitted records cannot reopen the editor.
- The shared `PagePanelLayout` groups the review summary and five step accordions with its standard inset, matching Student's enclosing panel. Application Messages remains below the panel. The shared `SummaryCard` keeps its orange `warning` surface during review, including when a reviewer reply is required; **Action Required** is conveyed by its title and orange status badge; the list card uses the same warning tone. It contains reference, review stage/status, programme and dates, plus a shared application-progress `DataTable`. The table sits in `SummaryCard.footerContent`, retaining the divider above it, and contains four ordered **Application Progress** steps with **Step**, **Department**, **Status** and **Update** columns: Bursary payment proof, Quality Assurance documents/Eligibility release, applicant confirmation, and Registry Offer release. Eligibility release keeps the overall summary orange and Under review; final acceptance completes it. Operational Live routing remains an integration responsibility. The active review stage is **Under review**; the other row is **Pending review**. Payment proof shows its filename or **Not provided**; Document Check shows **Awaiting review**. Individual submitted files remain in the read-only step accordions. Phone uses the table's documented compact-card presentation.
- Review starts at **Payment Proof Under Review**. **Documents Under Review** follows development-only payment verification; applicant replies never advance review. A **Submitted Application** heading introduces the five step accordions. The default shared accordion primitives compose the existing raised, padded header pattern for Study Preferences, Personal Details, Academic Qualifications, Documents and Application Fee. All begin collapsed; multiple may open. Shared read-only `DetailField` rows preserve conditional sections and repeat records. Accordion titles use white 14px body text. File rows use `readOnly` with read-only `FileUploadField` tiles in the same value column as other fields; no replace/remove/edit actions are supplied. The submitted Application Fee accordion contains only Transfer Proof (Bank Reference Number and Payment Proof); bank transfer instructions remain in the editable application step. The editable fee summary always uses the orange warning variant, including before Student Type is selected.
- **Application Messages** reuses shared message rows, date dividers and the controlled composer. The Applicant adapter accepts text, attachments or both, with Student's five-file, 25 MiB per-file and 75 MiB total limits and error wording. Raster previews use JPEG/PNG/GIF/WebP; other files show metadata. Removed draft previews are released, and sent previews remain owned by the session.
- Submission and scenario initialization create no automatic messages. Explicit reviewer messages through Admin Actions start the conversation. An unanswered reviewer message gives **Action Required** priority over the review stage on both summary and list card. Actually visible reviewer rows advance the unread watermark; reading keeps the response requirement. Sending an applicant reply satisfies it and restores the current review-stage label without approving a document or advancing review. Reviewer controls exist only in the development tooling described below; there are no automatic replies.
- The shared unread `IssueCard` banner sits below the Application Details heading and focuses and scrolls to Application Messages. My Applications has no unread banner; each card still shows Action Required when a reviewer response is needed. Drafts and attachments remain isolated per application.

- The completed Documents Checklist footer uses the existing shared `PageActionBar`: secondary **Edit Answers**, followed by primary **Create Application**, with equal-width columns in the action group on phone and desktop, linking to `/applications/new`. Starting an application retains the checklist's session answers and prepared checkboxes.

Verification uses the full automated gate and responsive browser review. Automated Applicant tests are enabled; persistent storage remains outside scope. Live reviewer identity, authorization, notifications, file delivery and admissions decisions remain integration responsibilities.

## Related CAP focus

Admissions and identity capabilities in [SDD-11](https://github.com/raisd-campus/control-plane/blob/main/docs/sdd/11-capability-catalog.md) (see Applicant rows). CAP-53 is on the critical path for Live.

## Application fee transfer desk — 13 October 2026

Removed launch-blocking demo payment chrome on the admissions fee step (payment ready for Bursary verification). Lesotho no longer shows Cyberjaya Maybank details or MYR sample fees; it shows LSL 300.00 and instructs applicants to use campus Bursary transfer details. Cyberjaya retains its Maybank desk. Student Finance How to Pay no longer labels the account as fictional.

## Development Admin Actions — 5 October 2026

`/dev/admin-actions` and its sidebar footer link above Log out are development-only. The footer groups its actions with the same 8px vertical spacing (`space-y-2`) used by Student; the shared sidebar and buttons retain their existing geometry. The page uses the existing Applicant shell, shared Student scenario dropdown with its label above the field (matching Student's composition), two SummaryCards (payment and document verification), and existing shared chat presentation. No extra tabs, banners or dashboards. Production artifacts exclude the route, link, reviewer implementation and scenario fixtures; `check:production` is part of the full gate.

Exactly three scenarios switch the active applicant across the whole portal: **Fresh student application**, **Completed application — not submitted**, and **Submitted and approved application**. Each is initialized once per session. The latter two use complete validated synthetic snapshots and synthetic file resources; they represent neither genuine documents nor Live admissions. Switching retains saved drafts, checklist answers/prepared checks, messages and both sides' drafts/attachments independently. Queries include scenario and generation; leaving a scenario rejects in-flight writes without discarding its saved state. Refresh selects Fresh and recreates fixtures on demand.

The page reviews the latest submitted application, otherwise the latest draft or an empty state. Its reference appears once. Verification and messaging are disabled before submission. **Verify Payment** records payment verification and moves review to Documents Under Review while retaining unread/response requirements. **Verify Documents** requires verified payment and a valid immutable submitted snapshot, records verification and sets Approved. Repeated actions are disabled and rejected. No rejection controls: clarification and additional evidence go through messages.

Reviewer messages use the same conversation and limits as applicant replies, setting unread and Action Required. Admin viewing never acknowledges messages for the applicant. Approved takes precedence over response requirements and disables both composers while retaining unread state until the applicant visibly displays the messages. Individual completed checks use success badges, while the overall review summary stays warning until enrolment acceptance; approval alone does not provide accepted-enrolment context or provision Student records. The acceptance and next-login demo described below is separate from review. Development commands are not Applicant API methods or HTTP endpoints. See [mock operation details](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/frontend/applicant-portal/mock-api.md).

## Acceptance and simulated Student handoff — 6 October 2026

Approved applications offer **Confirm and Accept Enrolment** in the SummaryCard footer. Its shared Popup shows the first preference's Intake, Faculty and Programme and explains next-sign-in Student Portal/module registration. Cancellation preserves Approved; confirmation stores guarded acceptance metadata, records **Enrolment Accepted**, then automatically logs out to the existing Sign in screen in development mock sessions. Clicking Sign in opens the existing new Student tab; it is never clicked automatically. The popup explicitly explains this sequence. Failed acceptance stays in the popup; failed logout retains accepted status with Retry Sign Out, without reaccepting. Pending confirmation and logout use existing component APIs. Approved/accepted conversations are read-only; submission/scenario initialization creates no automatic messages.

Both portals use independent copies of the canonical Design demo descriptor and a captured first-semester reference date. A development-only next-login exchange transfers accepted serializable data to a new Student tab and a new isolated mock account/enrolment. No data is stored persistently or put in URLs. Production and HTTP sessions exclude the simulation. See [mock operations and transport](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/frontend/applicant-portal/mock-api.md#enrolment-acceptance-and-next-login-simulation--6-october-2026) and [accepted handoff](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/admissions-handoff.md#development-browser-handoff--6-october-2026). This is not live authentication, CMS provisioning or durable file delivery.

## Save before leaving — 6 October 2026

The Leave application popup uses released 0.6.2 with Discard Changes, Keep Editing and primary Save & Close in that visual/keyboard order. Save & Close accepts an incomplete draft through the existing mock API and continues the originally requested navigation only after success. Saving disables all dialog actions and dismissal; failed saves retain fields/files and show retryable feedback. Duplicate and stale session/unmounted completions cannot navigate. No new Applicant operation or persistence is added.

## Campus selection and issued letters — 7 October 2026

Current local mock workflow supersedes the earlier one-confirmation acceptance increment. Shared UI stays at 0.6.2. Hosted Applicant Demo HTTP authentication remains intact. The incoming 9 October backend documentation reports ten RPC methods, including Eligibility confirmation and final acceptance, with automatic Demo Offer release. This frontend checkout still explicitly gates hosted confirmation/acceptance; enabling and verifying that frontend parity is separate work. Staff-owned Offer release, durable authorized Student file delivery and Live CMS writes remain pending. This local increment does not alter Portal API service code or database records.

Step 2 requires Campus (Lesotho, Cyberjaya, Botswana, Eswatini, Sierra Leone, Cambodia, Uganda, Namibia). Alumni additionally requires a trimmed Previous Student ID. A campus change clears dependent preferences. Drafts remain saveable when incomplete. English Language Results are optional for every sample programme; populated rows must be valid. All eight campuses expose the existing Design curriculum as **demo content**, not verified campus offerings, fees or admissions policy. Selected campus metadata and frozen intake reference are retained through acceptance and Student bootstrap.

Payment Proof is reviewed by **Bursary**; Document Check by **Quality Assurance**. QA Verify Documents validates the submitted snapshot and atomically releases a generated **Eligibility Letter** PDF. The applicant's **Confirm and Continue Enrolment** popup shows the intake, faculty and programme and preview/download actions. Confirmation records intent without logout or Student provisioning. Registry's **Release Offer Letter** is enabled only afterwards. The final **Accept Enrolment** popup previews/downloads that Offer Letter. Only successful final acceptance triggers automatic logout; the applicant clicks Sign in to open the existing Student tab. Cancel changes nothing. Saving disables confirmation and dismissal; failure retains data and allows retry. Logout failure can be retried independently of acceptance. All writes retain ownership, revision, session and request-id guards.

Generated PDFs are prominently labelled DEMO, not official university letters, and contain the application reference, applicant, campus, intake, faculty, programme and release date. Original Unicode names remain canonical; the demo PDF's standard font uses a safe ASCII transliteration with replacement for unsupported glyphs. QA/Registry letters, releases and confirmations live outside the immutable submitted snapshot and are distinct from applicant-uploaded eligibility evidence. Release creates no automatic conversation or unread messages. Approved/accepted conversations remain read-only. The approved scenario now awaits Eligibility confirmation; Registry release and final acceptance remain user actions.

Admissions handoff and browser envelope **v2** include the selected campus and both letters/confirmations. The producer/consumer validate sequence and bounded PDF resources. V1 remains readable for legacy records without fabricated letters. Local generated PDF bytes travel only in the one-time validated development postMessage exchange, never URLs or persistent browser storage. Existing origin/window/nonce/replay checks and session cleanup remain. Student Documents shows issued Offer Letter first, Eligibility Letter second, with working preview/download for these resources. Other legacy documents retain their existing delivery capabilities. Payment proof remains outside Profile documents.

The selected-campus bootstrap clones only sample academic/campus configuration and remaps its IDs and local calendar windows. It creates an isolated identity/enrolment, inherits no prior results, registrations, payments or visa approvals, and preserves existing credit/fee/clash/international restrictions. Non-Cyberjaya fees and curriculum remain explicit prototype samples, not campus policy. Refresh disposes mock state and temporary resources. Durable evidence delivery, hosted two-letter methods and real CMS provisioning remain future work.

Mock operations: `confirmApplicationEligibility` (applicant), `verify-documents` with Eligibility generation (development QA command), `release-offer` (development Registry command), and guarded `acceptApplicationEnrolment` after Offer release. No new HTTP routes are exposed. Local DTOs may include optional `issuedLetter` PDF resources; hosted Profile document responses remain metadata-only.

## Review progress and letter actions — 8 October 2026

Document verification and Eligibility Letter release do not complete enrolment. The review SummaryCard stays orange (`warning`) with an **Under review** badge through Eligibility confirmation, Registry preparation and Offer release. Stage-specific headings retain the current task; only **Enrolment Accepted** uses the green completed summary.

The section is titled **Application Progress**, with **Step** as the first column and accessible table name “Application progress.” The review table has four ordered rows: Payment Proof (Bursary), Document Check (Quality Assurance), Confirm and Proceed with Enrolment (Applicant), and Prepare and Release Offer Letter (Registry). Each row derives its own Status and Update from verification/letter metadata. Document verification shows the released Eligibility filename; applicant confirmation records its date; Registry changes from awaiting applicant confirmation to preparing the Offer, then shows the released Offer filename. A completed row may be green while overall enrolment remains under review. This is presentation of existing guarded workflow state, with no API/schema changes.

Both confirmation popups and Student Documents use two equal-width letter actions with icons and spacing above them. **Preview Letter** opens a temporary PDF URL in a separate tab using the browser's PDF handling; **Download Letter** downloads the same PDF with its issued filename. There is no embedded preview popup or extra disclaimer below a viewer. The generated PDF itself retains its DEMO marking. Temporary resources retain their existing ownership/cleanup behavior. Hosted delivery support and physical-browser PDF handling remain distinct from the local mock checks.

## Student evidence transport — 8 October 2026

DEV next-login delivery uses bounded envelope v3, preserving admissions snapshot v2 and v1/v2 receiver compatibility. Only available owned academic/identity/admissions evidence is delivered individually with MIME/name/length/hash checks; payment evidence is excluded. Missing bytes remain unavailable in Student. URLs carry only a nonce; no persistent storage or new hosted integration is added. See [Student workflows](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/frontend/student-portal/student-workflows.md).

## Applicant–Student synchronization — 12 October 2026

The 12 October local preparation supersedes earlier statements that original HTTP file delivery and applicant-specific continuation are wholly unimplemented. [Demo admissions resources](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/admissions-resources.md) defines the separate Demo artifact adapter, one-time authenticated continuation, capability gating, ownership and local verification. It is **not deployed**; Live storage/CMS provisioning and hosted migration remain pending. Shared UI remains 0.6.2; admissions v2, DEV transport v3 and Student schema 4 are preserved. The existing Bursary shortcut remains On hold.


## Shared UI/CSS ownership — 13 October 2026

Applicant now composes the local 0.7.0 WizardStepPanel/DocumentActions and uses opt-in shared SurveyLayout compact phone and DetailSectionCard stacked-header variants. Global component CSS belongs to the package; document overflow stays local. All drafts, validation, issued PDF bytes/URL cleanup, stage transitions, messages and session transport remain Applicant-owned. See [page-by-page audit](../design/2026-10-13-portal-ui-ownership-audit.md). No release/pin/deployment change.


## Student and Applicant read-only file adoption - 14 October 2026

The owner approved applying the existing shared FileUploadField read-only container refinement to Student and Applicant. Both local node_modules installations now use the same complete packed 0.7.0 candidate as Lecturer; tracked manifests and lockfiles retain released 0.6.2 pins. Read-only fields omit the outer dashed border, padding and upload minimum height; existing cards, filenames, sizes and empty text remain. Editable and temporarily disabled editable fields retain their existing frame and selection/removal controls. No portal CSS override, feature/API/schema change, package publication or deployment is introduced. A fresh npm ci still restores the released pin until candidate publication and consumer upgrades are approved.

| Portal / upload surface | Existing owner | Audit result |
| --- | --- | --- |
| Student Online Forms (including Immigration-owned forms) | FormFields → shared FileUploadField | Drafts remain editable; submitted forms pass readOnly. Read-only file metadata/no-selection regression passed; actual seeded empty state uses the frame-free rule. Multiple-file selection, limits, accessible labels, autosave footer and draft navigation retained. |
| Student Finance transfer proof | FinanceProofPicker → shared FileUploadField | Editable/replacement and pending-disabled states retain the frame; review summaries use ordinary metadata rows, without a duplicate upload frame. Existing proof validation and review behavior retained. |
| Student assignment submission | AssignmentSubmissionPanel workflow | Specialized selected/submitted/closed states remain workflow-owned; no duplicated shared dashed read-only upload frame. PDF/ZIP, one file, 50 MiB, deadline and confirmation controls unchanged. |
| Student Portfolio artwork | PortfolioArtworkPicker workflow | Image-first editable picker and read-only project preview remain distinct media presentation; no generic read-only upload frame or CSS override. Resource/preview cleanup unchanged. |
| Student Profile identity / Documents / issued letters | FileLink / LinkedList / DocumentActions | These are document navigation/delivery patterns, not upload containers. Existing availability, original-byte delivery and placeholder boundaries unchanged. |
| Applicant Academic Qualifications | DocumentField → shared FileUploadField | Transcripts, certificates and English evidence retain editable frames, remove/replace controls, validation and conditional records. |
| Applicant Documents | DocumentField → shared FileUploadField | Identity, portfolio, transfer and conditional supporting evidence share the same editable field; no portal-specific container styling. |
| Applicant Application Fee | shared FileUploadField | Transfer proof keeps editable frame and remove/replace controls; original policy and save/submission workflow retained. |
| Applicant submitted academic, documents and fee accordions | FileField → shared FileUploadField readOnly in DetailField value | All six populated sample file rows measured border/padding 0px/0px with no selection/removal controls. Label/value alignment and metadata remain. |
| Student / Applicant messages | Shared chat attachment presentation | Separate existing attachment tiles/composers keep their limits, preview/download behavior and session ownership. |

All directly shared editable fields measured border/padding 1px/16px. Actual read-only and editable page captures at 375, 768 and 1440px show no horizontal overflow. Student synthetic draft/file retained across navigation; no manual test submission was performed. Automatic approval review rejected the attempted manual Demo submission because it would lock the draft beyond the inspection scope; existing submitted records and the already-existing read-only component regression provide the safe verification path. Applicant's full gate passed 65 unit/component tests and 70 browser cases. Student's final full-gate outcome is recorded below after completion. Shared source/artifact is unchanged from the previously verified 18-unit/32-browser candidate. Lecturer aggregate verification remains on hold.

Final verification - 14 October 2026: Student completed token/assets/lint, 797 unit tests, TypeScript/build/production-exclusion/bundle gates and 278 Chromium cases with 46 intentional skips using its existing CI=true resource budget and PLAYWRIGHT_WORKERS=2. That check:all invocation exited nonzero after WebKit passed 40 cases and hit one tablet Personal Profile loading-readiness timeout before checking layout. A subsequent two-worker WebKit run passed that case but hit the existing desktop workflow Space-checkbox check (40 passed, 31 skipped). Each unchanged case passed three isolated retries. The complete unchanged one-worker WebKit rerun then passed 41 cases with 31 intentional skips. All required constituent checks passed, but no uninterrupted Student aggregate success is claimed. Applicant npm run check:all passed 65 unit/component tests and 70 browser cases. Earlier Student attempts hit a sandbox temporary-cache EPERM before tests and an Immigration journey exceeding the ordinary 5-second budget during concurrent load; no source/test changes were made for these retries. Existing Applicant chunk-size, jsdom Window.open and Vite configuration/color-environment advisories remain. Twelve actual responsive consumer captures, package artifact equality, mirror equality and scoped whitespace checks pass. No source/API/schema changes were needed for this style adoption; existing uncommitted work, released pins, publication/deployment boundaries and Lecturer aggregate hold are preserved.


## Released shared 0.7.0 adoption - 14 October 2026

The owner published @raisd-campus/design-system 0.7.0 directly to GitHub Packages after hosted Actions were blocked by billing. Fresh registry metadata matches the verified release archive from shared source commit e1ddc3738c5d5b27447e1c8ae9e45719547b13a3 and tag v0.7.0. Student, Applicant and Lecturer now pin exactly 0.7.0 in their manifests and lockfiles and install the registry release; all 260 installed package files match the tested archive. Only the shared dependency entry changes; unrelated dependency pins and existing uncommitted source work are preserved. The released package includes shared Community presentation, portal-neutral patterns and global control rules, three-tab responsive scrolling, per-file action slots and frame-free read-only file fields. Save feedback remains in PageActionBar.leading; header Add actions use a primary button with its leading icon. The previous candidate/publication-pending notes describe historical preparation, not the current installed version. The three existing portal Vite servers were restarted on 5173/5174/5175 to release Windows native-module locks and activate the installed release. API/data contracts and persistence do not change. Lecturer aggregate verification remains on hold. No portal deployment, API restart or migration is included.


## Released-package verification - 14 October 2026

Student npm run check:all passed against the registry-installed 0.7.0: token/assets/lint, 797 unit tests, TypeScript/build, production exclusion and bundle budgets, 278 Chromium cases with 46 intentional skips, and 41 WebKit cases with 31 intentional skips. The unchanged browser suites used PLAYWRIGHT_WORKERS=1 and the existing CI=true unit budget. Applicant npm run check:all passed on the complete unchanged rerun: 65 unit/component tests and 70 browser cases. The first Applicant run passed 69 browser cases but missed the phone navigation action in the save/retry case; the existing leave-application suite subsequently passed 14 cases across all seven browser/viewport projects before the clean full-gate rerun. No source or test assertions changed for retries. Lecturer lint, canonical demo:check, TypeScript/build, 54 focused Vitest cases and two Node roster-projection cases passed; its aggregate gate remains held. Browser checks at actual 375/768/1440 widths confirmed Lecturer Materials, pointer cursors on all three tabs and contained file details; Applicant read-only file presentation also remained within those bounds. The package receipt and all 260 installed files match the verified published archive in every portal. Only the root shared pin and its package entry differ from each pre-upgrade lockfile; unrelated pins and source work remain. Both local catalogue copies validate all 188 captures, preserving historical provenance and adding 18 reviewed shared captures. Canonical guidance and affected mirrors are identical. The existing Vite/colour, jsdom Window.open and Applicant/Lecturer chunk-size advisories remain. npm reported existing audit findings (Student 15, Applicant one, Lecturer six); no dependency fixes were applied outside the approved pin update. The three local Vite servers respond HTTP 200 on their original ports. Portal edits and broader pre-existing documentation work remain local and uncommitted. Release-only catalogue sources and minimal versioned guidance were published from clean isolated checkouts, preserving newer remote changes and the current docs.raisd.co site chrome. Canonical catalogue commit a646104d96469fe6ff15bb62187f12c2cb6b921f and public mirror commit 7485fa9566f526095b8dea0292b2eca39737334e are pushed. The live docs host still reports catalogue 0.6.2; its 25-file static promotion is prepared separately and has not been performed under the existing no-deployment boundary. No portal deployment, API restart or migration is claimed.

## Shared package upgrade — 15 October 2026

Applicant pins registry 0.8.0 with the approved shared accordion refinement.
AuditTrail is available but no new Applicant audit workflow is introduced. All
263 installed files match the published archive; unrelated dependency pins are
unchanged. The post-upgrade full gate passed 65 units and 70 browser cases, plus lint,
production build and exclusions. See the Classrooms/Materials verification receipt. Local server 5174 is preserved; no Applicant deployment.

## Upstream integration verification — 16 October 2026

The current Classrooms/Materials source publication integrates upstream SSO/email
login with explicit Demo identity binding and a single StrictMode code exchange.
See the [campus integration receipt](student-portal/audits/2026-10-16-campus-integration-publication.md)
for per-repository gates, canonical mirrors and Jenkins/Argo delivery boundaries.
No manual hosted rollout or local user-service reset is included.

## Legacy fee-step readiness - 21 October 2026

In the legacy six-step form, a non-blank bank reference and selected proof turn the fee summary green with Ready to submit. Missing either value restores the incomplete warning. This describes form readiness only; Bursary still verifies payment after submission. The configured five-step flow and its later Registration Fee task are unchanged.

## Local scenario checkpoints - 21 October 2026

Keychain now separates a blank new applicant, a complete unsubmitted draft, a submitted application awaiting QA, and an eligibility-verified application awaiting applicant confirmation. The ready draft has its own SSO identity and five completed configured steps; the submitted and verified cases cannot edit/resubmit their original forms. All three populated local Cyberjaya fixtures have matching personal emails and actual owned synthetic PDF/PNG resources. Registration Fee payment is a later task and is not pre-verified. Existing persisted records and historical dev-only legacy examples remain separate. See the [account mapping and verification](keychain.md#distinct-applicant-scenario-accounts---21-october-2026).

## Submitted application cards — 21 October 2026

The Applicant details page omits the separate Application requirements, Dates and deadlines and Registration Fee cards. The existing summary card, Application Progress, submitted information, Offer/evidence tasks and other interactions retain their behavior. Server policy and payment routes remain unchanged.

The empty Admissions requirements heading and standalone Reload status bar are removed; Offer/evidence forms still appear when available. Application Progress hides not-required rows, uses title casing for steps and statuses and proper desk names (including QA), and displays all unfinished steps consistently as Pending. The summary card and remaining page are preserved.

## Control-owned progress wording — 21 October 2026

Configured Application Progress consumes the `progress` rows returned by Portal API with each owned application. Applicant does not override step/department names, statuses or updates. Control Admissions → Applicant wording owns those strings in versioned `settings.presentation`; its preview consumes the same evaluator output. Raw pending/manual decisions both display the configured Pending status, completed rows use Complete, and not-required rows are excluded. Default updates use one short sentence: Awaiting {department} review (or applicant confirmation); completed updates say Completed. The department placeholder resolves from the assigned desk and configured names. Rules, clearances and raw manual decisions remain distinct internally. Existing pinned policy versions retain their wording; new publications apply to new applications/reset journeys. Older records receive compatible defaults without resetting data. Offline mock sessions evaluate the same settings locally; connected sessions fetch API rows.

## Submitted file tile contrast — 0.9.2

Applicant pins published design-system 0.9.2. Submitted read-only file values opt into FileUploadField fileSurface="elevated" inside their matching surface-raised detail cards. The shared default background remains unchanged for forms, the document checklist and other consumers. No portal CSS override is used. Shared package checks, responsive consumer checks, live transcript contrast and Applicant build were verified locally; portal hosting is not deployed.

## Empty application conversation — 21 October 2026

When Application Messages has no messages, compose the existing shared EmptyState inside the message content with No messages yet and the existing reviewer/applicant guidance as its description. Do not duplicate that description below the section heading. Existing conversations and the composer retain their behavior. No shared component change is introduced.

Configured applications omit the fee accordion from Submitted Application because the initial form ends with Documents. Registration Fee remains a later Application Progress stage. Legacy applications retain their submitted fee details.

## Configured admissions status — 22 October 2026

The summary and badge use Portal API's Control-owned **current pending action**, while progress retains completed milestones. A released Eligibility Letter leaves overall status **Awaiting Applicant Confirmation** and next action **Confirm Eligibility** (Applicant). After confirmation, status is **Awaiting Bursary Review**, next step **Registration Fee**. Completed Eligibility Review remains **Eligibility Letter Released**. Configured text comes from `admissionsDisplay`/`progress`; no portal formats internal approved/complete enums into current status. Legacy presentation remains unchanged. See [University Flows](../backend/university-flows.md).


Cross-portal breadcrumb verification (0.18.4): shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff/Lecturer lint, 94 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Applicant lint, three focused header unit cases, type/production build and production-exclusion check passed (its existing unused-variable warning remains). Student lint, 15 focused breadcrumb/route unit cases, type/production build and production-exclusion checks passed. Student bundle budgets passed unchanged: eager JavaScript 194164 gzip bytes against 196608; largest chunk 373077 bytes.

All 25 focused Chromium/WebKit portal cases passed: Applicant four, Student five (1280/1440 Chromium and phone/tablet/desktop WebKit), Staff six, Lecturer four and Control six. Coverage includes parent navigation, selected programme/semester scope, mobile overflow, keyboard/Escape, unsaved application/flow guards and unavailable teaching details. Test-only selectors were scoped to the header and menu dismissal was awaited; unrelated inner breadcrumbs remain intact. All 296 installed files in each of four portals match the verified 0.18.4 registry archive. Nine affected captures and both 253-capture catalogue mirrors validate. Focused portal checks were used under the owner-approved fast workflow; no full Student/Applicant regression-suite claim is made.

Only Applicant, Student, Staff and Control frontends restarted. APIs, SSO, Keychain, Docker, identities, applications, drafts and policies were not reset or migrated. No hosted deployment, commit or push occurred.


## Admissions workflow template compatibility

The API may resolve workflow template 1 into the case's pinned Local/International settings, order, exact campus prices and structured letters. Applicant HTTP draft/submit clients advertise template support. Progress and current action continue using policy/SSO presentation; no portal-hardcoded role authority is added. Existing applications and issued files remain pinned. See [Flow Editor](../design/flow-editor.md). Unsupported PDF glyphs fail explicitly rather than corrupting issued names.
