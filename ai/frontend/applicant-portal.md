# Applicant portal — agent knowledge

**Repository:** [`raisd-campus/applicant-portal`](https://github.com/raisd-campus/applicant-portal)  
**SDD:** [SDD-04](../../sdd/04-applicant-portal.md)  
**Campus agents:** [../AGENTS.md](../AGENTS.md)

## Status

A validated, session-only mock Portal API is implemented with shared package 0.6.2. Automated validation and tests are now part of this stage; no Applicant HTTP adapter is implemented. See [mock API and validation](applicant-portal/mock-api.md). This portal is the **Admissions launch** surface (milestone 2): account, application, evidence, declarations, track status, offer, accept enrolment. Registry remains the decision owner.

## Agent rules

1. Implement against SDD-04 and the campus [AGENTS.md](../AGENTS.md). Do not invent a second admissions architecture.
2. Talk only to the Portal API. No direct CMS or database access.
3. Pin a released `@raisd-campus/design-system` version when application UI begins. Compose the shared `system/portal-shell` family with applicant-owned routes, navigation, account details and actions. Follow [component ownership and setup](../design/component-library.md); do not copy student portal components or shells.
4. Lesotho is the first acceptance pilot. Preserve current Malaysian sample content and use the captured [LUCT procedure](../backend/luct-online-registration.md) as a Cyberjaya research reference. Campus-specific Lesotho NMDS/LGCSE rules remain to be confirmed; Malaysia EMGS/NOC is not its default overlay.
5. When UI or API contracts appear, add feature docs under `docs/ai/frontend/applicant-portal/` and register them in [../MANIFEST.yaml](../MANIFEST.yaml).

## LUCT online registration baseline — 6 October 2026

Two campus procedures are captured for Applicant / Online Registration (and enrolled Add/Drop):

| Process | Summary | CAP |
|---|---|---|
| **A — Applicant online registration** | Public 4-step wizard (Academic → Documents → Personal → Submit) + `LUCT-MKT-003` admission form + EMGS health/visa pack | CAP-02, 03, 07, 55 (CY immigration CAP-50) |
| **B — Enrolled registration maintenance** | REG014/015 Add/Drop (+ change of programme and related Registry forms) | CAP-10, 51 |

Detail, SLAs (24h confirm / 2–3 day Registrar / 14-day completion), evidence matrix, and Lesotho substitution notes: [../backend/luct-online-registration.md](../backend/luct-online-registration.md). Page previews: [../materials/luct-online-registration/lkw-pages/](../materials/luct-online-registration/lkw-pages/).

**FE gap matrix (all portals):** [../backend/luct-online-registration-fe-gap.md](../backend/luct-online-registration-fe-gap.md) · Pages: [online-registration-gap.html](../../diagrams/old-cms/online-registration-gap.html).

## Submitted application UI preview — 1 October 2026

The working Applicant UI pins shared package 0.6.2. This is session-only mock behaviour, not durable admissions records or HTTP Portal API integration. Saved serializable snapshots/conversations and revision/read/response state belong to the API adapter; original File objects and previews belong to its browser resource adapter. Message drafts remain portal-owned across navigation; refresh resets the session. Existing draft and checklist flows remain independent.

- `/applications/:applicationId` shows **My Applications → Application Details**. Draft cards still open `/edit`; submitted cards open the detail route. Unavailable IDs show an unavailable state and a return action; submitted records cannot reopen the editor.
- The shared `PagePanelLayout` groups the review summary and five step accordions with its standard inset, matching Student's enclosing panel. Application Messages remains below the panel. The shared `SummaryCard` keeps its orange `warning` surface during review, including when a reviewer reply is required; **Action Required** is conveyed by its title and orange status badge; the list card uses the same warning tone. It contains reference, review stage/status, programme and dates, plus a shared document-check `DataTable`. The table sits in `SummaryCard.footerContent`, retaining the divider above it, and contains only **Payment Proof** and **Document Check**, with a **Department** column: Finance for payment proof and Registry for document checks. These are frontend preview labels; integration must confirm actual reviewer routing. The active review stage is **Under review**; the other row is **Pending review**. Payment proof shows its filename or **Not provided**; Document Check shows **Awaiting review**. Individual submitted files remain in the read-only step accordions. Phone uses the table's documented compact-card presentation.
- Review starts at **Payment Proof Under Review**. **Documents Under Review** follows development-only payment verification; applicant replies never advance review. A **Submitted Application** heading introduces the five step accordions. The default shared accordion primitives compose the existing raised, padded header pattern for Study Preferences, Personal Details, Academic Qualifications, Documents and Application Fee. All begin collapsed; multiple may open. Shared read-only `DetailField` rows preserve conditional sections and repeat records. Accordion titles use white 14px body text. File rows use `readOnly` with read-only `FileUploadField` tiles in the same value column as other fields; no replace/remove/edit actions are supplied. The submitted Application Fee accordion contains only Transfer Proof (Bank Reference Number and Payment Proof); bank transfer instructions remain in the editable application step. The editable fee summary always uses the orange warning variant, including before Student Type is selected.
- **Application Messages** reuses shared message rows, date dividers and the controlled composer. The Applicant adapter accepts text, attachments or both, with Student's five-file, 25 MiB per-file and 75 MiB total limits and error wording. Raster previews use JPEG/PNG/GIF/WebP; other files show metadata. Removed draft previews are released, and sent previews remain owned by the session.
- Submission and scenario initialization create no automatic messages. Explicit reviewer messages through Admin Actions start the conversation. An unanswered reviewer message gives **Action Required** priority over the review stage on both summary and list card. Actually visible reviewer rows advance the unread watermark; reading keeps the response requirement. Sending an applicant reply satisfies it and restores the current review-stage label without approving a document or advancing review. Reviewer controls exist only in the development tooling described below; there are no automatic replies.
- The shared unread `IssueCard` banner sits below the Application Details heading and focuses and scrolls to Application Messages. My Applications has no unread banner; each card still shows Action Required when a reviewer response is needed. Drafts and attachments remain isolated per application.

- The completed Documents Checklist footer uses the existing shared `PageActionBar`: secondary **Edit Answers**, followed by primary **Create Application**, with equal-width columns in the action group on phone and desktop, linking to `/applications/new`. Starting an application retains the checklist's session answers and prepared checkboxes.

Verification uses the full automated gate and responsive browser review. Automated Applicant tests are enabled; persistent storage remains outside scope. Live reviewer identity, authorization, notifications, file delivery and admissions decisions remain integration responsibilities.

## Related CAP focus

Admissions and identity capabilities in [SDD-11](../../sdd/11-capability-catalog.md) (see Applicant rows). CAP-53 is on the critical path for Live.

## Development Admin Actions — 5 October 2026

`/dev/admin-actions` and its sidebar footer link above Log out are development-only. The footer groups its actions with the same 8px vertical spacing (`space-y-2`) used by Student; the shared sidebar and buttons retain their existing geometry. The page uses the existing Applicant shell, shared Student scenario dropdown with its label above the field (matching Student's composition), two SummaryCards (payment and document verification), and existing shared chat presentation. No extra tabs, banners or dashboards. Production artifacts exclude the route, link, reviewer implementation and scenario fixtures; `check:production` is part of the full gate.

Exactly three scenarios switch the active applicant across the whole portal: **Fresh student application**, **Completed application — not submitted**, and **Submitted and approved application**. Each is initialized once per session. The latter two use complete validated synthetic snapshots and synthetic file resources; they represent neither genuine documents nor Live admissions. Switching retains saved drafts, checklist answers/prepared checks, messages and both sides' drafts/attachments independently. Queries include scenario and generation; leaving a scenario rejects in-flight writes without discarding its saved state. Refresh selects Fresh and recreates fixtures on demand.

The page reviews the latest submitted application, otherwise the latest draft or an empty state. Its reference appears once. Verification and messaging are disabled before submission. **Verify Payment** records payment verification and moves review to Documents Under Review while retaining unread/response requirements. **Verify Documents** requires verified payment and a valid immutable submitted snapshot, records verification and sets Approved. Repeated actions are disabled and rejected. No rejection controls: clarification and additional evidence go through messages.

Reviewer messages use the same conversation and limits as applicant replies, setting unread and Action Required. Admin viewing never acknowledges messages for the applicant. Approved takes precedence over response requirements and disables both composers while retaining unread state until the applicant visibly displays the messages. The existing summary/check table uses success variants for verified/approved values; approval alone does not provide accepted-enrolment context or provision Student records. The acceptance and next-login demo described below is separate from review. Development commands are not Applicant API methods or HTTP endpoints. See [mock operation details](applicant-portal/mock-api.md).

## Acceptance and simulated Student handoff — 6 October 2026

Approved applications offer **Confirm and Accept Enrolment** in the SummaryCard footer. Its shared Popup shows the first preference's Intake, Faculty and Programme and explains next-sign-in Student Portal/module registration. Cancellation preserves Approved; confirmation stores guarded acceptance metadata, records **Enrolment Accepted**, then automatically logs out to the existing Sign in screen in development mock sessions. Clicking Sign in opens the existing new Student tab; it is never clicked automatically. The popup explicitly explains this sequence. Failed acceptance stays in the popup; failed logout retains accepted status with Retry Sign Out, without reaccepting. Pending confirmation and logout use existing component APIs. Approved/accepted conversations are read-only; submission/scenario initialization creates no automatic messages.

Both portals use independent copies of the canonical Design demo descriptor and a captured first-semester reference date. A development-only next-login exchange transfers accepted serializable data to a new Student tab and a new isolated mock account/enrolment. No data is stored persistently or put in URLs. Production and HTTP sessions exclude the simulation. See [mock operations and transport](applicant-portal/mock-api.md#enrolment-acceptance-and-next-login-simulation--6-october-2026) and [accepted handoff](../backend/admissions-handoff.md#development-browser-handoff--6-october-2026). This is not live authentication, CMS provisioning or durable file delivery.

## Save before leaving — 6 October 2026

The Leave application popup uses released 0.6.2 with Discard Changes, Keep Editing and primary Save & Close in that visual/keyboard order. Save & Close accepts an incomplete draft through the existing mock API and continues the originally requested navigation only after success. Saving disables all dialog actions and dismissal; failed saves retain fields/files and show retryable feedback. Duplicate and stale session/unmounted completions cannot navigate. No new Applicant operation or persistence is added.
