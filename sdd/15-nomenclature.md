# Nomenclature — CAP and milestone IDs

**Document:** SDD-15  
**Status:** Working draft  
**Date:** 23 September 2026  
**Audience:** Working Group CMS 2026, AI agents

Quick reference for **CAP-*** and **M*** identifiers used across the SDD set. Prefer these links in chat, PRs, and design notes.

## Milestones (M1–M5)

| ID | Name | Definition |
|---|---|---|
| [M1](03-delivery-milestones.md#m1) | Confirm rules and integration | [SDD-03 §M1](03-delivery-milestones.md#m1) |
| [M2](03-delivery-milestones.md#m2) | Admissions launch | [SDD-03 §M2](03-delivery-milestones.md#m2) |
| [M3](03-delivery-milestones.md#m3) | Core student portal | [SDD-03 §M3](03-delivery-milestones.md#m3) |
| [M4](03-delivery-milestones.md#m4) | Cyberjaya pilot acceptance | [SDD-03 §M4](03-delivery-milestones.md#m4) |
| [M5](03-delivery-milestones.md#m5) | Campus expansion and remaining CMS | [SDD-03 §M5](03-delivery-milestones.md#m5) |

Sequence diagram and release conditions: [SDD-03](03-delivery-milestones.md).

## Capability IDs (CAP-01 … CAP-55)

Primary anchor `#cap-nn` is the first catalogue row. Portal-scoped anchors (`#cap-nn-applicant`, `#cap-nn-student`, …) point at that portal’s row in [SDD-11](11-capability-catalog.md).

| ID | Primary feature | Portal rows |
|---|---|---|
| [CAP-01](11-capability-catalog.md#cap-01) | Applicant sign-in and account access | [applicant](11-capability-catalog.md#cap-01-applicant) · [student](11-capability-catalog.md#cap-01-student) |
| [CAP-02](11-capability-catalog.md#cap-02) | Online application form for new applicants | [applicant](11-capability-catalog.md#cap-02-applicant) |
| [CAP-03](11-capability-catalog.md#cap-03) | Upload application documents and English-entry evidence | [applicant](11-capability-catalog.md#cap-03-applicant) · [staff](11-capability-catalog.md#cap-03-staff) |
| [CAP-04](11-capability-catalog.md#cap-04) | Record institution, programme and delivery-site approvals | [staff](11-capability-catalog.md#cap-04-staff) |
| [CAP-05](11-capability-catalog.md#cap-05) | Verify qualification levels, credits and duration | [staff](11-capability-catalog.md#cap-05-staff) |
| [CAP-06](11-capability-catalog.md#cap-06) | Review foreign equivalency and professional recognition | [staff](11-capability-catalog.md#cap-06-staff) |
| [CAP-07](11-capability-catalog.md#cap-07) | Track application, view offer and accept enrolment | [applicant](11-capability-catalog.md#cap-07-applicant) · [staff](11-capability-catalog.md#cap-07-staff) |
| [CAP-08](11-capability-catalog.md#cap-08) | Personal details and emergency contacts | [student](11-capability-catalog.md#cap-08-student) · [staff](11-capability-catalog.md#cap-08-staff) |
| [CAP-09](11-capability-catalog.md#cap-09) | Student documents library | [student](11-capability-catalog.md#cap-09-student) · [staff](11-capability-catalog.md#cap-09-staff) |
| [CAP-10](11-capability-catalog.md#cap-10) | Semester subject and class registration | [student](11-capability-catalog.md#cap-10-student) · [staff](11-capability-catalog.md#cap-10-staff) |
| [CAP-11](11-capability-catalog.md#cap-11) | Class timetable | [student](11-capability-catalog.md#cap-11-student) · [lecturer](11-capability-catalog.md#cap-11-lecturer) · [staff](11-capability-catalog.md#cap-11-staff) |
| [CAP-12](11-capability-catalog.md#cap-12) | Attendance records | [student](11-capability-catalog.md#cap-12-student) · [lecturer](11-capability-catalog.md#cap-12-lecturer) |
| [CAP-13](11-capability-catalog.md#cap-13) | Grades, results and student progress | [student](11-capability-catalog.md#cap-13-student) · [staff](11-capability-catalog.md#cap-13-staff) |
| [CAP-14](11-capability-catalog.md#cap-14) | Study plan and prerequisites | [student](11-capability-catalog.md#cap-14-student) · [staff](11-capability-catalog.md#cap-14-staff) |
| [CAP-15](11-capability-catalog.md#cap-15) | Graduation clearance and transcripts | [student](11-capability-catalog.md#cap-15-student) · [staff](11-capability-catalog.md#cap-15-staff) |
| [CAP-16](11-capability-catalog.md#cap-16) | Read applicant announcements and admissions updates | [applicant](11-capability-catalog.md#cap-16-applicant) · [student](11-capability-catalog.md#cap-16-student) · [staff](11-capability-catalog.md#cap-16-staff) · [staff-2](11-capability-catalog.md#cap-16-staff-2) |
| [CAP-17](11-capability-catalog.md#cap-17) | Study guides | [student](11-capability-catalog.md#cap-17-student) · [lecturer](11-capability-catalog.md#cap-17-lecturer) |
| [CAP-18](11-capability-catalog.md#cap-18) | Lecture notes and learning-media access | [student](11-capability-catalog.md#cap-18-student) · [lecturer](11-capability-catalog.md#cap-18-lecturer) |
| [CAP-19](11-capability-catalog.md#cap-19) | Assignment briefs | [student](11-capability-catalog.md#cap-19-student) · [lecturer](11-capability-catalog.md#cap-19-lecturer) |
| [CAP-20](11-capability-catalog.md#cap-20) | Submit, replace and withdraw assignments | [student](11-capability-catalog.md#cap-20-student) · [lecturer](11-capability-catalog.md#cap-20-lecturer) |
| [CAP-21](11-capability-catalog.md#cap-21) | Revision work and practice activities | [student](11-capability-catalog.md#cap-21-student) · [lecturer](11-capability-catalog.md#cap-21-lecturer) |
| [CAP-22](11-capability-catalog.md#cap-22) | Past examination papers | [student](11-capability-catalog.md#cap-22-student) · [lecturer](11-capability-catalog.md#cap-22-lecturer) · [staff](11-capability-catalog.md#cap-22-staff) |
| [CAP-23](11-capability-catalog.md#cap-23) | Course information and learning outcomes | [student](11-capability-catalog.md#cap-23-student) · [lecturer](11-capability-catalog.md#cap-23-lecturer) · [staff](11-capability-catalog.md#cap-23-staff) |
| [CAP-24](11-capability-catalog.md#cap-24) | Online quizzes and examinations | [student](11-capability-catalog.md#cap-24-student) · [lecturer](11-capability-catalog.md#cap-24-lecturer) · [staff](11-capability-catalog.md#cap-24-staff) |
| [CAP-25](11-capability-catalog.md#cap-25) | Student–lecturer and student–student communication | [student](11-capability-catalog.md#cap-25-student) · [lecturer](11-capability-catalog.md#cap-25-lecturer) |
| [CAP-26](11-capability-catalog.md#cap-26) | Live online classes | [student](11-capability-catalog.md#cap-26-student) · [lecturer](11-capability-catalog.md#cap-26-lecturer) |
| [CAP-27](11-capability-catalog.md#cap-27) | Self-paced learning and release schedules | [student](11-capability-catalog.md#cap-27-student) · [lecturer](11-capability-catalog.md#cap-27-lecturer) |
| [CAP-28](11-capability-catalog.md#cap-28) | View marks and lecturer feedback | [student](11-capability-catalog.md#cap-28-student) · [lecturer](11-capability-catalog.md#cap-28-lecturer) |
| [CAP-29](11-capability-catalog.md#cap-29) | Assessment identity checks and integrity guidance | [student](11-capability-catalog.md#cap-29-student) · [lecturer](11-capability-catalog.md#cap-29-lecturer) |
| [CAP-30](11-capability-catalog.md#cap-30) | Student feedback and course evaluation | [student](11-capability-catalog.md#cap-30-student) · [staff](11-capability-catalog.md#cap-30-staff) |
| [CAP-31](11-capability-catalog.md#cap-31) | Digital library and e-resources | [student](11-capability-catalog.md#cap-31-student) · [staff](11-capability-catalog.md#cap-31-staff) |
| [CAP-32](11-capability-catalog.md#cap-32) | Student orientation and digital-learning skills | [student](11-capability-catalog.md#cap-32-student) · [staff](11-capability-catalog.md#cap-32-staff) |
| [CAP-33](11-capability-catalog.md#cap-33) | Learner support and IT helpdesk | [student](11-capability-catalog.md#cap-33-student) · [staff](11-capability-catalog.md#cap-33-staff) |
| [CAP-34](11-capability-catalog.md#cap-34) | Study-centre and regional support | [student](11-capability-catalog.md#cap-34-student) · [staff](11-capability-catalog.md#cap-34-staff) |
| [CAP-35](11-capability-catalog.md#cap-35) | Accessible application forms and assistance | [applicant](11-capability-catalog.md#cap-35-applicant) · [student](11-capability-catalog.md#cap-35-student) · [staff](11-capability-catalog.md#cap-35-staff) |
| [CAP-36](11-capability-catalog.md#cap-36) | Mobile online-registration shell | [applicant](11-capability-catalog.md#cap-36-applicant) · [student](11-capability-catalog.md#cap-36-student) · [lecturer](11-capability-catalog.md#cap-36-lecturer) · [staff](11-capability-catalog.md#cap-36-staff) |
| [CAP-37](11-capability-catalog.md#cap-37) | Connectivity, capacity and service monitoring | [shared](11-capability-catalog.md#cap-37-shared) |
| [CAP-38](11-capability-catalog.md#cap-38) | Backups and continuity | [shared](11-capability-catalog.md#cap-38-shared) |
| [CAP-39](11-capability-catalog.md#cap-39) | Privacy, permissions and cybersecurity | [student](11-capability-catalog.md#cap-39-student) · [shared](11-capability-catalog.md#cap-39-shared) |
| [CAP-40](11-capability-catalog.md#cap-40) | Review class learning analytics | [lecturer](11-capability-catalog.md#cap-40-lecturer) · [staff](11-capability-catalog.md#cap-40-staff) |
| [CAP-41](11-capability-catalog.md#cap-41) | Staff training and operating readiness | [shared](11-capability-catalog.md#cap-41-shared) |
| [CAP-42](11-capability-catalog.md#cap-42) | Record copyright permissions and provider approvals | [staff](11-capability-catalog.md#cap-42-staff) · [shared](11-capability-catalog.md#cap-42-shared) |
| [CAP-43](11-capability-catalog.md#cap-43) | Submit course materials for quality review | [lecturer](11-capability-catalog.md#cap-43-lecturer) · [staff](11-capability-catalog.md#cap-43-staff) |
| [CAP-44](11-capability-catalog.md#cap-44) | Lecturer workspace and course access | [lecturer](11-capability-catalog.md#cap-44-lecturer) · [staff](11-capability-catalog.md#cap-44-staff) |
| [CAP-45](11-capability-catalog.md#cap-45) | Finance balances, invoices and payment history | [student](11-capability-catalog.md#cap-45-student) · [staff](11-capability-catalog.md#cap-45-staff) |
| [CAP-46](11-capability-catalog.md#cap-46) | Bank-transfer proof submission | [student](11-capability-catalog.md#cap-46-student) · [staff](11-capability-catalog.md#cap-46-staff) |
| [CAP-47](11-capability-catalog.md#cap-47) | Online payment and financial documents | [student](11-capability-catalog.md#cap-47-student) · [staff](11-capability-catalog.md#cap-47-staff) |
| [CAP-48](11-capability-catalog.md#cap-48) | Scholarships and incentives | [student](11-capability-catalog.md#cap-48-student) · [staff](11-capability-catalog.md#cap-48-staff) |
| [CAP-49](11-capability-catalog.md#cap-49) | Resume and portfolio builders | [student](11-capability-catalog.md#cap-49-student) · [staff](11-capability-catalog.md#cap-49-staff) |
| [CAP-50](11-capability-catalog.md#cap-50) | Immigration and visa processing | [student](11-capability-catalog.md#cap-50-student) · [staff](11-capability-catalog.md#cap-50-staff) |
| [CAP-51](11-capability-catalog.md#cap-51) | Student requests, complaints and academic appeals | [student](11-capability-catalog.md#cap-51-student) · [staff](11-capability-catalog.md#cap-51-staff) |
| [CAP-52](11-capability-catalog.md#cap-52) | Accommodation management | [student](11-capability-catalog.md#cap-52-student) · [staff](11-capability-catalog.md#cap-52-staff) |
| [CAP-53](11-capability-catalog.md#cap-53) | Existing CMS integration and campus configuration | [shared](11-capability-catalog.md#cap-53-shared) |
| [CAP-54](11-capability-catalog.md#cap-54) | Campus services information | [student](11-capability-catalog.md#cap-54-student) · [staff](11-capability-catalog.md#cap-54-staff) |
| [CAP-55](11-capability-catalog.md#cap-55) | Read applicant policies and declarations | [applicant](11-capability-catalog.md#cap-55-applicant) · [student](11-capability-catalog.md#cap-55-student) · [staff](11-capability-catalog.md#cap-55-staff) |

## How to link

From another SDD markdown file:

```markdown
[CAP-53](11-capability-catalog.md#cap-53)
[CAP-53 shared row](11-capability-catalog.md#cap-53-shared)
[M2](03-delivery-milestones.md#m2)
```

From `docs/ai/`:

```markdown
[CAP-53](../sdd/11-capability-catalog.md#cap-53)
[M5](../sdd/03-delivery-milestones.md#m5)
```

HTML / GitHub Pages copies under `docs/diagrams/` should use the same fragment IDs on the rendered SDD pages when those pages are published.

## Related

- Exhaustive rows: [SDD-11 Capability catalogue](11-capability-catalog.md)
- Milestones: [SDD-03](03-delivery-milestones.md)
- Glossary: [SDD-00](00-document-control.md#glossary)
- Old CMS map: [SDD-14](14-cms-feature-comparison.md)
