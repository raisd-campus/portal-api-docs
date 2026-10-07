# Shared platform

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

Portal API Demo hosts Student schema **4** and Applicant Demo HTTP (`/v1/auth/applicant/login`, `/v1/applicant/:method`) with Neon-backed applicant state. Hosted Applicant uses `VITE_PORTAL_API_URL`; local Applicant without that URL remains session-only mock. `CORS_ORIGIN` allows the student SPA, applicant SPA and GitHub Pages. Live CMS admissions and durable evidence storage remain future work. Details: [Portal API](../ai/backend/portal-api.md), [PoC note](../ai/architecture/vercel-neon-poc.md).

## Campus selection and issued letters — 7 October 2026

Current local mock workflow supersedes the earlier one-confirmation acceptance increment. Shared UI stays at 0.6.2. Hosted Applicant Demo HTTP authentication and supported methods remain intact; **new campus inputs, QA/Registry letters and final enrolment acceptance are not supported by the hosted server yet**. Final acceptance is gated there rather than calling the old one-stage operation. No Portal API service, database or deployment is changed by this increment.

Step 2 requires Campus (Lesotho, Cyberjaya, Botswana, Eswatini, Sierra Leone, Cambodia, Uganda, Namibia). Alumni additionally requires a trimmed Previous Student ID. A campus change clears dependent preferences. Drafts remain saveable when incomplete. English Language Results are optional for every sample programme; populated rows must be valid. All eight campuses expose the existing Design curriculum as **demo content**, not verified campus offerings, fees or admissions policy. Selected campus metadata and frozen intake reference are retained through acceptance and Student bootstrap.

Payment Proof is reviewed by **Bursary**; Document Check by **Quality Assurance**. QA Verify Documents validates the submitted snapshot and atomically releases a generated **Eligibility Letter** PDF. The applicant's **Confirm and Continue Enrolment** popup shows the intake, faculty and programme and preview/download actions. Confirmation records intent without logout or Student provisioning. Registry's **Release Offer Letter** is enabled only afterwards. The final **Accept Enrolment** popup previews/downloads that Offer Letter. Only successful final acceptance triggers automatic logout; the applicant clicks Sign in to open the existing Student tab. Cancel changes nothing. Saving disables confirmation and dismissal; failure retains data and allows retry. Logout failure can be retried independently of acceptance. All writes retain ownership, revision, session and request-id guards.

Generated PDFs are prominently labelled DEMO, not official university letters, and contain the application reference, applicant, campus, intake, faculty, programme and release date. Original Unicode names remain canonical; the demo PDF's standard font uses a safe ASCII transliteration with replacement for unsupported glyphs. QA/Registry letters, releases and confirmations live outside the immutable submitted snapshot and are distinct from applicant-uploaded eligibility evidence. Release creates no automatic conversation or unread messages. Approved/accepted conversations remain read-only. The approved scenario now awaits Eligibility confirmation; Registry release and final acceptance remain user actions.

Admissions handoff and browser envelope **v2** include the selected campus and both letters/confirmations. The producer/consumer validate sequence and bounded PDF resources. V1 remains readable for legacy records without fabricated letters. Local generated PDF bytes travel only in the one-time validated development postMessage exchange, never URLs or persistent browser storage. Existing origin/window/nonce/replay checks and session cleanup remain. Student Documents shows issued Offer Letter first, Eligibility Letter second, with working preview/download for these resources. Other legacy documents retain their existing delivery capabilities. Payment proof remains outside Profile documents.

The selected-campus bootstrap clones only sample academic/campus configuration and remaps its IDs and local calendar windows. It creates an isolated identity/enrolment, inherits no prior results, registrations, payments or visa approvals, and preserves existing credit/fee/clash/international restrictions. Non-Cyberjaya fees and curriculum remain explicit prototype samples, not campus policy. Refresh disposes mock state and temporary resources. Durable evidence delivery, hosted two-letter methods and real CMS provisioning remain future work.

Mock operations: `confirmApplicationEligibility` (applicant), `verify-documents` with Eligibility generation (development QA command), `release-offer` (development Registry command), and guarded `acceptApplicationEnrolment` after Offer release. No new HTTP routes are exposed. Local DTOs may include optional `issuedLetter` PDF resources; hosted Profile document responses remain metadata-only.
