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
