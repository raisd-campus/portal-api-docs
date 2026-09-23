# Capability catalogue

**Document:** SDD-11  
**Status:** Working draft  
**Source:** Working Group Daily Checklist, detailed tab (112 rows)  
**Date:** 18 September 2026

Canonical capability list. Portal design documents summarise these rows; this file is the exhaustive inventory. Repeated CAP IDs across portals are the same capability with role-specific work, not extra requirements.

**Nomenclature:** every `CAP-*` below is an anchor. Cross-doc links: [SDD-15 Nomenclature](15-nomenclature.md). Milestones `M1`–`M5`: [SDD-03](03-delivery-milestones.md).

Status meanings (from the checklist Timeline tab):

| Status | Meaning |
|---|---|
| Not started | No implementation of this capability in the reviewed portal. |
| Placeholder | A page, label or button exists, but the intended action/content is unavailable. |
| Demo | Built using sample data or a temporary session. No live backend or durable save. |
| Partial | Some parts exist; key content, delivery, workflow or acceptance work is missing. |
| Needs checking | Capability or evidence has not been verified with its owner. |
| Not applicable | This workstream is not relevant to this capability. |
| Live | Accepted and operating with real data, access controls and an accountable owner. |


## Capability index (quick links)

Unique CAP IDs link to the first catalogue row (`#cap-nn`). Portal-specific anchors use `#cap-nn-applicant`, `#cap-nn-student`, `#cap-nn-staff`, etc.

| ID | Primary feature (first catalogue row) | Portal rows |
|---|---|---|
| [CAP-01](#cap-01) | Applicant sign-in and account access | [applicant](#cap-01-applicant) · [student](#cap-01-student) |
| [CAP-02](#cap-02) | Online application form for new applicants | [applicant](#cap-02-applicant) |
| [CAP-03](#cap-03) | Upload application documents and English-entry evidence | [applicant](#cap-03-applicant) · [staff](#cap-03-staff) |
| [CAP-04](#cap-04) | Record institution, programme and delivery-site approvals | [staff](#cap-04-staff) |
| [CAP-05](#cap-05) | Verify qualification levels, credits and duration | [staff](#cap-05-staff) |
| [CAP-06](#cap-06) | Review foreign equivalency and professional recognition | [staff](#cap-06-staff) |
| [CAP-07](#cap-07) | Track application, view offer and accept enrolment | [applicant](#cap-07-applicant) · [staff](#cap-07-staff) |
| [CAP-08](#cap-08) | Personal details and emergency contacts | [student](#cap-08-student) · [staff](#cap-08-staff) |
| [CAP-09](#cap-09) | Student documents library | [student](#cap-09-student) · [staff](#cap-09-staff) |
| [CAP-10](#cap-10) | Semester subject and class registration | [student](#cap-10-student) · [staff](#cap-10-staff) |
| [CAP-11](#cap-11) | Class timetable | [student](#cap-11-student) · [lecturer](#cap-11-lecturer) · [staff](#cap-11-staff) |
| [CAP-12](#cap-12) | Attendance records | [student](#cap-12-student) · [lecturer](#cap-12-lecturer) |
| [CAP-13](#cap-13) | Grades, results and student progress | [student](#cap-13-student) · [staff](#cap-13-staff) |
| [CAP-14](#cap-14) | Study plan and prerequisites | [student](#cap-14-student) · [staff](#cap-14-staff) |
| [CAP-15](#cap-15) | Graduation clearance and transcripts | [student](#cap-15-student) · [staff](#cap-15-staff) |
| [CAP-16](#cap-16) | Read applicant announcements and admissions updates | [applicant](#cap-16-applicant) · [student](#cap-16-student) · [staff](#cap-16-staff) · [staff-2](#cap-16-staff-2) |
| [CAP-17](#cap-17) | Study guides | [student](#cap-17-student) · [lecturer](#cap-17-lecturer) |
| [CAP-18](#cap-18) | Lecture notes and learning-media access | [student](#cap-18-student) · [lecturer](#cap-18-lecturer) |
| [CAP-19](#cap-19) | Assignment briefs | [student](#cap-19-student) · [lecturer](#cap-19-lecturer) |
| [CAP-20](#cap-20) | Submit, replace and withdraw assignments | [student](#cap-20-student) · [lecturer](#cap-20-lecturer) |
| [CAP-21](#cap-21) | Revision work and practice activities | [student](#cap-21-student) · [lecturer](#cap-21-lecturer) |
| [CAP-22](#cap-22) | Past examination papers | [student](#cap-22-student) · [lecturer](#cap-22-lecturer) · [staff](#cap-22-staff) |
| [CAP-23](#cap-23) | Course information and learning outcomes | [student](#cap-23-student) · [lecturer](#cap-23-lecturer) · [staff](#cap-23-staff) |
| [CAP-24](#cap-24) | Online quizzes and examinations | [student](#cap-24-student) · [lecturer](#cap-24-lecturer) · [staff](#cap-24-staff) |
| [CAP-25](#cap-25) | Student–lecturer and student–student communication | [student](#cap-25-student) · [lecturer](#cap-25-lecturer) |
| [CAP-26](#cap-26) | Live online classes | [student](#cap-26-student) · [lecturer](#cap-26-lecturer) |
| [CAP-27](#cap-27) | Self-paced learning and release schedules | [student](#cap-27-student) · [lecturer](#cap-27-lecturer) |
| [CAP-28](#cap-28) | View marks and lecturer feedback | [student](#cap-28-student) · [lecturer](#cap-28-lecturer) |
| [CAP-29](#cap-29) | Assessment identity checks and integrity guidance | [student](#cap-29-student) · [lecturer](#cap-29-lecturer) |
| [CAP-30](#cap-30) | Student feedback and course evaluation | [student](#cap-30-student) · [staff](#cap-30-staff) |
| [CAP-31](#cap-31) | Digital library and e-resources | [student](#cap-31-student) · [staff](#cap-31-staff) |
| [CAP-32](#cap-32) | Student orientation and digital-learning skills | [student](#cap-32-student) · [staff](#cap-32-staff) |
| [CAP-33](#cap-33) | Learner support and IT helpdesk | [student](#cap-33-student) · [staff](#cap-33-staff) |
| [CAP-34](#cap-34) | Study-centre and regional support | [student](#cap-34-student) · [staff](#cap-34-staff) |
| [CAP-35](#cap-35) | Accessible application forms and assistance | [applicant](#cap-35-applicant) · [student](#cap-35-student) · [staff](#cap-35-staff) |
| [CAP-36](#cap-36) | Mobile online-registration shell | [applicant](#cap-36-applicant) · [student](#cap-36-student) · [lecturer](#cap-36-lecturer) · [staff](#cap-36-staff) |
| [CAP-37](#cap-37) | Connectivity, capacity and service monitoring | [shared](#cap-37-shared) |
| [CAP-38](#cap-38) | Backups and continuity | [shared](#cap-38-shared) |
| [CAP-39](#cap-39) | Privacy, permissions and cybersecurity | [student](#cap-39-student) · [shared](#cap-39-shared) |
| [CAP-40](#cap-40) | Review class learning analytics | [lecturer](#cap-40-lecturer) · [staff](#cap-40-staff) |
| [CAP-41](#cap-41) | Staff training and operating readiness | [shared](#cap-41-shared) |
| [CAP-42](#cap-42) | Record copyright permissions and provider approvals | [staff](#cap-42-staff) · [shared](#cap-42-shared) |
| [CAP-43](#cap-43) | Submit course materials for quality review | [lecturer](#cap-43-lecturer) · [staff](#cap-43-staff) |
| [CAP-44](#cap-44) | Lecturer workspace and course access | [lecturer](#cap-44-lecturer) · [staff](#cap-44-staff) |
| [CAP-45](#cap-45) | Finance balances, invoices and payment history | [student](#cap-45-student) · [staff](#cap-45-staff) |
| [CAP-46](#cap-46) | Bank-transfer proof submission | [student](#cap-46-student) · [staff](#cap-46-staff) |
| [CAP-47](#cap-47) | Online payment and financial documents | [student](#cap-47-student) · [staff](#cap-47-staff) |
| [CAP-48](#cap-48) | Scholarships and incentives | [student](#cap-48-student) · [staff](#cap-48-staff) |
| [CAP-49](#cap-49) | Resume and portfolio builders | [student](#cap-49-student) · [staff](#cap-49-staff) |
| [CAP-50](#cap-50) | Immigration and visa processing | [student](#cap-50-student) · [staff](#cap-50-staff) |
| [CAP-51](#cap-51) | Student requests, complaints and academic appeals | [student](#cap-51-student) · [staff](#cap-51-staff) |
| [CAP-52](#cap-52) | Accommodation management | [student](#cap-52-student) · [staff](#cap-52-staff) |
| [CAP-53](#cap-53) | Existing CMS integration and campus configuration | [shared](#cap-53-shared) |
| [CAP-54](#cap-54) | Campus services information | [student](#cap-54-student) · [staff](#cap-54-staff) |
| [CAP-55](#cap-55) | Read applicant policies and declarations | [applicant](#cap-55-applicant) · [student](#cap-55-student) · [staff](#cap-55-staff) |

Milestones: [M1](03-delivery-milestones.md#m1) · [M2](03-delivery-milestones.md#m2) · [M3](03-delivery-milestones.md#m3) · [M4](03-delivery-milestones.md#m4) · [M5](03-delivery-milestones.md#m5). Full nomenclature: [SDD-15](15-nomenclature.md).

## Applicant / Online Registration

8 capabilities.

| ID | Department | Feature | Frontend | Mobile | Backend | Milestone | Next action / blocker |
|---|---|---|---|---|---|---|---|
| <a id="cap-02"></a><a id="cap-02-applicant"></a>[CAP-02](#cap-02) | Registry | Online application form for new applicants | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm the minimum applicant journey and required fields. |
| <a id="cap-03"></a><a id="cap-03-applicant"></a>[CAP-03](#cap-03) | Registry | Upload application documents and English-entry evidence | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Define evidence requirements and programme/country entry rules. |
| <a id="cap-07"></a><a id="cap-07-applicant"></a>[CAP-07](#cap-07) | Registry | Track application, view offer and accept enrolment | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm track application, view offer and accept enrolment and whether the old CMS already supports it. |
| <a id="cap-55"></a><a id="cap-55-applicant"></a>[CAP-55](#cap-55) | Registry | Read applicant policies and declarations | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm read applicant policies and declarations and whether the old CMS already supports it. |
| <a id="cap-16"></a><a id="cap-16-applicant"></a>[CAP-16](#cap-16) | Marketing | Read applicant announcements and admissions updates | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm read applicant announcements and admissions updates and whether the old CMS already supports it. |
| <a id="cap-01"></a><a id="cap-01-applicant"></a>[CAP-01](#cap-01) | TBC | Applicant sign-in and account access | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm applicant sign-in and account access and whether the old CMS already supports it. |
| <a id="cap-35"></a><a id="cap-35-applicant"></a>[CAP-35](#cap-35) | TBC | Accessible application forms and assistance | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm accessible application forms and assistance and whether the old CMS already supports it. |
| <a id="cap-36"></a><a id="cap-36-applicant"></a>[CAP-36](#cap-36) | TBC | Mobile online-registration shell | Not applicable | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm mobile online-registration shell and whether the old CMS already supports it. |

## Student

41 capabilities.

| ID | Department | Feature | Frontend | Mobile | Backend | Milestone | Next action / blocker |
|---|---|---|---|---|---|---|---|
| <a id="cap-08"></a><a id="cap-08-student"></a>[CAP-08](#cap-08) | Registry | Personal details and emergency contacts | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Agree which updates save directly and which need staff approval. |
| <a id="cap-09"></a><a id="cap-09-student"></a>[CAP-09](#cap-09) | Registry | Student documents library | Partial | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Agree document permissions and authorised file delivery. |
| <a id="cap-10"></a><a id="cap-10-student"></a>[CAP-10](#cap-10) | Registry | Semester subject and class registration | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Validate legacy registration rules and atomic save requirements. |
| <a id="cap-13"></a><a id="cap-13-student"></a>[CAP-13](#cap-13) | Registry | Grades, results and student progress | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm result approval/publication rules and legacy data fields. |
| <a id="cap-15"></a><a id="cap-15-student"></a>[CAP-15](#cap-15) | Registry | Graduation clearance and transcripts | Placeholder | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Define clearance steps and authorised transcript/certificate delivery. |
| <a id="cap-16-student"></a>[CAP-16](#cap-16) | Registry | Important announcements | Partial | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm audiences, publishing ownership, full announcement viewing and the real feed. |
| <a id="cap-55-student"></a>[CAP-55](#cap-55) | Registry | University policies for students | Partial | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Identify approved student policies and decide publication/acknowledgement needs. |
| <a id="cap-45"></a><a id="cap-45-student"></a>[CAP-45](#cap-45) | Bursary | Finance balances, invoices and payment history | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Map real ledger data and confirm approved campus payment instructions. |
| <a id="cap-46"></a><a id="cap-46-student"></a>[CAP-46](#cap-46) | Bursary | Bank-transfer proof submission | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Connect secure proof storage and staff verification without treating proof as payment. |
| <a id="cap-47"></a><a id="cap-47-student"></a>[CAP-47](#cap-47) | Bursary | Online payment and financial documents | Placeholder | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm gateway or legacy payment route and receipt/invoice generation. |
| <a id="cap-48"></a><a id="cap-48-student"></a>[CAP-48](#cap-48) | Bursary | Scholarships and incentives | Demo | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm award ownership, terms and approval processes. |
| <a id="cap-30"></a><a id="cap-30-student"></a>[CAP-30](#cap-30) | Quality Assurance | Student feedback and course evaluation | Placeholder | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Approve survey scope, confidentiality and reporting ownership. |
| <a id="cap-11"></a><a id="cap-11-student"></a>[CAP-11](#cap-11) | Faculty | Class timetable | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Map current timetable records and update rules from the old CMS. |
| <a id="cap-12"></a><a id="cap-12-student"></a>[CAP-12](#cap-12) | Faculty | Attendance records | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Identify the authoritative attendance source and staff correction workflow. |
| <a id="cap-14"></a><a id="cap-14-student"></a>[CAP-14](#cap-14) | Faculty | Study plan and prerequisites | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Validate programme versions, prerequisites and credit-transfer rules. |
| <a id="cap-17"></a><a id="cap-17-student"></a>[CAP-17](#cap-17) | Faculty | Study guides | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Identify required guides and arrange lecturer publishing and student access. |
| <a id="cap-18"></a><a id="cap-18-student"></a>[CAP-18](#cap-18) | Faculty | Lecture notes and learning-media access | Placeholder | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Enable authorised resource viewing/download and supported media delivery. |
| <a id="cap-19"></a><a id="cap-19-student"></a>[CAP-19](#cap-19) | Faculty | Assignment briefs | Partial | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Provide real brief files and release/access rules. |
| <a id="cap-20"></a><a id="cap-20-student"></a>[CAP-20](#cap-20) | Faculty | Submit, replace and withdraw assignments | Demo | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Agree durable secure submission storage and staff receipt/marking handoff. |
| <a id="cap-21"></a><a id="cap-21-student"></a>[CAP-21](#cap-21) | Faculty | Revision work and practice activities | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Define revision materials and any required practice/feedback activities. |
| <a id="cap-22"></a><a id="cap-22-student"></a>[CAP-22](#cap-22) | Faculty | Past examination papers | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Identify approved papers and access/release restrictions. |
| <a id="cap-23"></a><a id="cap-23-student"></a>[CAP-23](#cap-23) | Faculty | Course information and learning outcomes | Partial | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Add approved outcomes and complete course information to the contract. |
| <a id="cap-24"></a><a id="cap-24-student"></a>[CAP-24](#cap-24) | Faculty | Online quizzes and examinations | Placeholder | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Define assessment modes, allowed attempts and approval/integrity requirements. |
| <a id="cap-25"></a><a id="cap-25-student"></a>[CAP-25](#cap-25) | Faculty | Student–lecturer and student–student communication | Demo | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Agree persistent communication, moderation and response responsibilities. |
| <a id="cap-26"></a><a id="cap-26-student"></a>[CAP-26](#cap-26) | Faculty | Live online classes | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm whether and how an approved meeting tool will be integrated. |
| <a id="cap-27"></a><a id="cap-27-student"></a>[CAP-27](#cap-27) | Faculty | Self-paced learning and release schedules | Partial | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Define the self-paced learning journey and release/completion rules. |
| <a id="cap-28"></a><a id="cap-28-student"></a>[CAP-28](#cap-28) | Faculty | View marks and lecturer feedback | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm staff marking, feedback and publication workflows in the old CMS. |
| <a id="cap-29"></a><a id="cap-29-student"></a>[CAP-29](#cap-29) | Faculty | Assessment identity checks and integrity guidance | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm required identity and integrity controls for each delivery mode. |
| <a id="cap-01-student"></a>[CAP-01](#cap-01) | TBC | Sign-in, logout and student account access | Placeholder | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm legacy login or SSO and account provisioning. |
| <a id="cap-31"></a><a id="cap-31-student"></a>[CAP-31](#cap-31) | TBC | Digital library and e-resources | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Identify licensed resources and library access integration. |
| <a id="cap-32"></a><a id="cap-32-student"></a>[CAP-32](#cap-32) | TBC | Student orientation and digital-learning skills | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Prepare induction content and required completion evidence. |
| <a id="cap-33"></a><a id="cap-33-student"></a>[CAP-33](#cap-33) | TBC | Learner support and IT helpdesk | Partial | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm support channels, owners, operating hours and escalation process. |
| <a id="cap-34"></a><a id="cap-34-student"></a>[CAP-34](#cap-34) | TBC | Study-centre and regional support | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm centres, local support arrangements and evidence required. |
| <a id="cap-35-student"></a>[CAP-35](#cap-35) | TBC | Accessibility and special-needs support | Demo | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Audit journeys with assistive technology and confirm student support adjustments. |
| <a id="cap-36-student"></a>[CAP-36](#cap-36) | TBC | Mobile portal shell and device access | Not applicable | Partial | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Design and verify the portal shell/navigation on agreed phone/tablet widths. |
| <a id="cap-39"></a><a id="cap-39-student"></a>[CAP-39](#cap-39) | TBC | Privacy, permissions and cybersecurity | Partial | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm applicable policies and implement server-enforced access and security controls. |
| <a id="cap-49"></a><a id="cap-49-student"></a>[CAP-49](#cap-49) | TBC | Resume and portfolio builders | Demo | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm launch priority and permanent save/export requirements. |
| <a id="cap-50"></a><a id="cap-50-student"></a>[CAP-50](#cap-50) | TBC | Immigration and visa processing | Placeholder | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Define campus/country visa stages, evidence and staff actions. |
| <a id="cap-51"></a><a id="cap-51-student"></a>[CAP-51](#cap-51) | TBC | Student requests, complaints and academic appeals | Placeholder | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm request and appeal types, staff decisions and published response times. |
| <a id="cap-52"></a><a id="cap-52-student"></a>[CAP-52](#cap-52) | TBC | Accommodation management | Placeholder | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm housing request/allocation workflow and legacy records. |
| <a id="cap-54"></a><a id="cap-54-student"></a>[CAP-54](#cap-54) | TBC | Campus services information | Demo | Partial | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Supply and approve campus-specific content and publishing ownership. |

## Lecturer

19 capabilities.

| ID | Department | Feature | Frontend | Mobile | Backend | Milestone | Next action / blocker |
|---|---|---|---|---|---|---|---|
| <a id="cap-11-lecturer"></a>[CAP-11](#cap-11) | Faculty | View teaching timetable and class allocations | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm view teaching timetable and class allocations and whether the old CMS already supports it. |
| <a id="cap-12-lecturer"></a>[CAP-12](#cap-12) | Faculty | Record and correct class attendance | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm record and correct class attendance and whether the old CMS already supports it. |
| <a id="cap-17-lecturer"></a>[CAP-17](#cap-17) | Faculty | Publish study guides | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm publish study guides and whether the old CMS already supports it. |
| <a id="cap-18-lecturer"></a>[CAP-18](#cap-18) | Faculty | Publish lecture notes and learning media | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm publish lecture notes and learning media and whether the old CMS already supports it. |
| <a id="cap-19-lecturer"></a>[CAP-19](#cap-19) | Faculty | Publish assignment briefs and deadlines | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm publish assignment briefs and deadlines and whether the old CMS already supports it. |
| <a id="cap-20-lecturer"></a>[CAP-20](#cap-20) | Faculty | Receive and review submitted assignments | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm receive and review submitted assignments and whether the old CMS already supports it. |
| <a id="cap-21-lecturer"></a>[CAP-21](#cap-21) | Faculty | Publish revision work and practice activities | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm publish revision work and practice activities and whether the old CMS already supports it. |
| <a id="cap-22-lecturer"></a>[CAP-22](#cap-22) | Faculty | Prepare past papers for authorised publication | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm prepare past papers for authorised publication and whether the old CMS already supports it. |
| <a id="cap-23-lecturer"></a>[CAP-23](#cap-23) | Faculty | Maintain course information and learning outcomes | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm maintain course information and learning outcomes and whether the old CMS already supports it. |
| <a id="cap-24-lecturer"></a>[CAP-24](#cap-24) | Faculty | Prepare and conduct online quizzes and examinations | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm prepare and conduct online quizzes and examinations and whether the old CMS already supports it. |
| <a id="cap-25-lecturer"></a>[CAP-25](#cap-25) | Faculty | Communicate with students and teaching groups | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm communicate with students and teaching groups and whether the old CMS already supports it. |
| <a id="cap-26-lecturer"></a>[CAP-26](#cap-26) | Faculty | Deliver live online classes | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm deliver live online classes and whether the old CMS already supports it. |
| <a id="cap-27-lecturer"></a>[CAP-27](#cap-27) | Faculty | Schedule self-paced learning and content release | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm schedule self-paced learning and content release and whether the old CMS already supports it. |
| <a id="cap-28-lecturer"></a>[CAP-28](#cap-28) | Faculty | Mark assessments and publish lecturer feedback | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm mark assessments and publish lecturer feedback and whether the old CMS already supports it. |
| <a id="cap-29-lecturer"></a>[CAP-29](#cap-29) | Faculty | Check assessment identity and academic integrity | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm check assessment identity and academic integrity and whether the old CMS already supports it. |
| <a id="cap-40"></a><a id="cap-40-lecturer"></a>[CAP-40](#cap-40) | Faculty | Review class learning analytics | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm review class learning analytics and whether the old CMS already supports it. |
| <a id="cap-43"></a><a id="cap-43-lecturer"></a>[CAP-43](#cap-43) | Faculty | Submit course materials for quality review | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm submit course materials for quality review and whether the old CMS already supports it. |
| <a id="cap-44"></a><a id="cap-44-lecturer"></a>[CAP-44](#cap-44) | Faculty | Lecturer workspace and course access | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm lecturer workspace and course access and whether the old CMS already supports it. |
| <a id="cap-36-lecturer"></a>[CAP-36](#cap-36) | TBC | Mobile lecturer workspace | Not applicable | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm mobile lecturer workspace and whether the old CMS already supports it. |

## Admin / Staff

38 capabilities.

| ID | Department | Feature | Frontend | Mobile | Backend | Milestone | Next action / blocker |
|---|---|---|---|---|---|---|---|
| <a id="cap-03-staff"></a>[CAP-03](#cap-03) | Registry | Review application documents and entry evidence | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm review application documents and entry evidence and the responsible old-CMS workflow. |
| <a id="cap-05"></a><a id="cap-05-staff"></a>[CAP-05](#cap-05) | Registry | Verify qualification levels, credits and duration | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Approve country-specific qualification and credit comparisons without automatic equivalence. |
| <a id="cap-06"></a><a id="cap-06-staff"></a>[CAP-06](#cap-06) | Registry | Review foreign equivalency and professional recognition | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Document who verifies foreign awards and records the authority decision. |
| <a id="cap-07-staff"></a>[CAP-07](#cap-07) | Registry | Review applications, issue offers and create first enrolment | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm Registry review, offers and first-enrolment handoff with Marketing and the backend owner. |
| <a id="cap-08-staff"></a>[CAP-08](#cap-08) | Registry | Maintain student records and emergency contacts | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm maintain student records and emergency contacts and the responsible old-CMS workflow. |
| <a id="cap-09-staff"></a>[CAP-09](#cap-09) | Registry | Publish and manage student documents | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm publish and manage student documents and the responsible old-CMS workflow. |
| <a id="cap-10-staff"></a>[CAP-10](#cap-10) | Registry | Configure and approve semester registration | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm configure and approve semester registration and the responsible old-CMS workflow. |
| <a id="cap-13-staff"></a>[CAP-13](#cap-13) | Registry | Approve and release results and progress records | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm approve and release results and progress records and the responsible old-CMS workflow. |
| <a id="cap-15-staff"></a>[CAP-15](#cap-15) | Registry | Approve graduation and issue official transcripts | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm approve graduation and issue official transcripts and the responsible old-CMS workflow. |
| <a id="cap-16-staff"></a>[CAP-16](#cap-16) | Registry | Publish approved student announcements | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm publish approved student announcements and the responsible old-CMS workflow. |
| <a id="cap-55-staff"></a>[CAP-55](#cap-55) | Registry | Approve and publish student policies | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm approve and publish student policies and the responsible old-CMS workflow. |
| <a id="cap-45-staff"></a>[CAP-45](#cap-45) | Bursary | Manage student invoices, balances and payment records | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm manage student invoices, balances and payment records and the responsible old-CMS workflow. |
| <a id="cap-46-staff"></a>[CAP-46](#cap-46) | Bursary | Verify bank-transfer proofs and allocate payments | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm Bursary proof review and payment allocation, with Finance reconciliation. |
| <a id="cap-48-staff"></a>[CAP-48](#cap-48) | Bursary | Assign and review scholarships and incentives | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm assign and review scholarships and incentives and the responsible old-CMS workflow. |
| <a id="cap-47-staff"></a>[CAP-47](#cap-47) | Finance | Reconcile online payments and issue financial documents | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm Finance reconciliation and financial-document controls, with Bursary student-account handoff. |
| <a id="cap-04"></a><a id="cap-04-staff"></a>[CAP-04](#cap-04) | Quality Assurance | Record institution, programme and delivery-site approvals | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Collect current approval evidence for each intended campus and programme. |
| <a id="cap-30-staff"></a>[CAP-30](#cap-30) | Quality Assurance | Manage student feedback and course evaluations | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm manage student feedback and course evaluations and the responsible old-CMS workflow. |
| <a id="cap-40-staff"></a>[CAP-40](#cap-40) | Quality Assurance | Review institutional learning analytics and quality reports | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Define useful learning/engagement measures and evidence reports. |
| <a id="cap-42"></a><a id="cap-42-staff"></a>[CAP-42](#cap-42) | Quality Assurance | Record copyright permissions and provider approvals | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm record copyright permissions and provider approvals and the responsible old-CMS workflow. |
| <a id="cap-43-staff"></a>[CAP-43](#cap-43) | Quality Assurance | Approve course materials and LMS-readiness evidence | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Define material approval and retain pilot/readiness evidence. |
| <a id="cap-11-staff"></a>[CAP-11](#cap-11) | Faculty | Schedule classes and allocate lecturers and rooms | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm schedule classes and allocate lecturers and rooms and the responsible old-CMS workflow. |
| <a id="cap-14-staff"></a>[CAP-14](#cap-14) | Faculty | Maintain study plans, prerequisites and programme rules | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm maintain study plans, prerequisites and programme rules and the responsible old-CMS workflow. |
| <a id="cap-22-staff"></a>[CAP-22](#cap-22) | Faculty | Approve access and publication rights for past papers | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm approve access and publication rights for past papers and the responsible old-CMS workflow. |
| <a id="cap-23-staff"></a>[CAP-23](#cap-23) | Faculty | Approve course information and learning outcomes | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm approve course information and learning outcomes and the responsible old-CMS workflow. |
| <a id="cap-24-staff"></a>[CAP-24](#cap-24) | Faculty | Administer examinations, access and approved arrangements | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm administer examinations, access and approved arrangements and the responsible old-CMS workflow. |
| <a id="cap-16-staff-2"></a>[CAP-16](#cap-16) | Marketing | Publish recruitment and applicant communications | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm Marketing publication approval and Registry ownership of formal application decisions. |
| <a id="cap-31-staff"></a>[CAP-31](#cap-31) | TBC | Administer digital-library access and licences | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm administer digital-library access and licences and the responsible old-CMS workflow. |
| <a id="cap-32-staff"></a>[CAP-32](#cap-32) | TBC | Publish orientation and digital-learning guidance | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm publish orientation and digital-learning guidance and the responsible old-CMS workflow. |
| <a id="cap-33-staff"></a>[CAP-33](#cap-33) | TBC | Manage learner-support and IT-helpdesk requests | Not started | Not started | Needs checking | [Core student portal / M3](03-delivery-milestones.md#m3) | Confirm manage learner-support and it-helpdesk requests and the responsible old-CMS workflow. |
| <a id="cap-34-staff"></a>[CAP-34](#cap-34) | TBC | Coordinate study-centre and regional support | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm coordinate study-centre and regional support and the responsible old-CMS workflow. |
| <a id="cap-35-staff"></a>[CAP-35](#cap-35) | TBC | Manage accessibility and special-needs arrangements | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm manage accessibility and special-needs arrangements and the responsible old-CMS workflow. |
| <a id="cap-36-staff"></a>[CAP-36](#cap-36) | TBC | Mobile staff and administrator workspace | Not applicable | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm mobile staff and administrator workspace and the responsible old-CMS workflow. |
| <a id="cap-44-staff"></a>[CAP-44](#cap-44) | TBC | Staff and administrator workspace and role access | Not started | Not started | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm existing-CMS staff access for admissions; build new staff screens only for verified gaps. |
| <a id="cap-49-staff"></a>[CAP-49](#cap-49) | TBC | Manage career, resume and portfolio guidance | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm manage career, resume and portfolio guidance and the responsible old-CMS workflow. |
| <a id="cap-50-staff"></a>[CAP-50](#cap-50) | TBC | Process immigration and student-visa cases | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm process immigration and student-visa cases and the responsible old-CMS workflow. |
| <a id="cap-51-staff"></a>[CAP-51](#cap-51) | TBC | Handle student requests, complaints and academic appeals | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm handle student requests, complaints and academic appeals and the responsible old-CMS workflow. |
| <a id="cap-52-staff"></a>[CAP-52](#cap-52) | TBC | Manage accommodation allocation and records | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm manage accommodation allocation and records and the responsible old-CMS workflow. |
| <a id="cap-54-staff"></a>[CAP-54](#cap-54) | TBC | Publish campus services information | Not started | Not started | Needs checking | [Campus expansion & remaining CMS / M5](03-delivery-milestones.md#m5) | Confirm publish campus services information and the responsible old-CMS workflow. |

## Shared System

6 capabilities.

| ID | Department | Feature | Frontend | Mobile | Backend | Milestone | Next action / blocker |
|---|---|---|---|---|---|---|---|
| <a id="cap-42-shared"></a>[CAP-42](#cap-42) | Quality Assurance | Copyright and external-provider operating controls | Not applicable | Not applicable | Not applicable | [Confirm rules & integration / M1](03-delivery-milestones.md#m1) | Confirm permitted content use, provider responsibilities and operating approvals; these non-software checks remain TBC. |
| <a id="cap-37"></a><a id="cap-37-shared"></a>[CAP-37](#cap-37) | TBC | Connectivity, capacity and service monitoring | Not applicable | Not applicable | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Assess real connectivity, expected users, uptime targets and monitoring. |
| <a id="cap-38"></a><a id="cap-38-shared"></a>[CAP-38](#cap-38) | TBC | Backups and continuity | Not applicable | Not applicable | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Verify backup ownership, restore tests and continuity arrangements. |
| <a id="cap-39-shared"></a>[CAP-39](#cap-39) | TBC | Privacy, permissions and cybersecurity | Not applicable | Not applicable | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm applicable policies and implement server-enforced access and security controls. |
| <a id="cap-41"></a><a id="cap-41-shared"></a>[CAP-41](#cap-41) | TBC | Staff training and operating readiness | Not applicable | Not applicable | Not applicable | [Cyberjaya pilot acceptance / M4](03-delivery-milestones.md#m4) | Campus training, support ownership and operating-readiness evidence remain TBC; verify these before pilot acceptance. |
| <a id="cap-53"></a><a id="cap-53-shared"></a>[CAP-53](#cap-53) | TBC | Existing CMS integration and campus configuration | Partial | Not applicable | Needs checking | [Admissions launch / M2](03-delivery-milestones.md#m2) | Confirm backend access, map old-CMS admissions data and deliver the first working Portal API integration. |
