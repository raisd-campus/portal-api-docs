# Simplified checklist: row-by-row review

Reviewed the live **Daily Checklist (Simplified)** on 7 September 2026. **112 original rows become 82 delivery groups**, through 19 merges. All 55 underlying capabilities and nine campus requests remain covered. This changes only the simplified tab; the detailed checklist, Timeline and Requirements & Sources retain their live contents.

Rows were combined only when Portal, lead Department, all three statuses, milestone and owner match. User-entered **Frontend ready**, **Done** and effort estimates are preserved planning inputs, not a new implementation or compliance audit. Revision work and past papers total **3 Days** from the original **2 Days + 1 Day**; no efficiency saving is assumed. Combined Feature cells contain notes with the original names, statuses, effort and next actions. All CAP IDs remain in the hidden ID column.

Original row numbers below refer to the pre-edit simplified tab, whose header was row 4. Result rows refer to the combined simplified tab. This is a dated audit, not a live synchronization. Subsequent update: all 19 combined cell notes described above were removed at the user's request; the row mappings below remain historical provenance. See the later [Student frontend reconfirmation](student-frontend-reconfirmation.md) for the implementation review of the user's updated statuses.

| Original row | CAP ID | Portal | Original feature | Decision | Result row | Reason |
| ---: | --- | --- | --- | --- | ---: | --- |
| 5 | CAP-02 | Applicant / Online Registration | Online application form for new applicants | Combined | 5 | One applicant application flow, with the same Registry lead, statuses and launch milestone. |
| 6 | CAP-03 | Applicant / Online Registration | Upload application documents and English-entry evidence | Combined | 5 | One applicant application flow, with the same Registry lead, statuses and launch milestone. |
| 7 | CAP-07 | Applicant / Online Registration | Track application, view offer and accept enrolment | Kept separate | 6 | Application tracking, offers and acceptance are a distinct post-submission journey. |
| 8 | CAP-55 | Applicant / Online Registration | Read applicant policies and declarations | Combined | 5 | One applicant application flow, with the same Registry lead, statuses and launch milestone. |
| 9 | CAP-16 | Applicant / Online Registration | Read applicant announcements and admissions updates | Kept separate | 7 | Marketing owns applicant updates; do not merge into Registry's application processing. |
| 10 | CAP-01 | Applicant / Online Registration | Applicant sign-in and account access | Kept separate | 8 | Account provisioning and sign-in are distinct from application fields and evidence. |
| 11 | CAP-35 | Applicant / Online Registration | Accessible application forms and assistance | Kept separate | 9 | Accessibility covers the whole applicant journey and assistance, not just sign-in. |
| 12 | CAP-36 | Applicant / Online Registration | Mobile online-registration shell | Kept separate | 10 | Mobile-specific work has a different Frontend applicability status. |
| 13 | CAP-08 | Student | Personal details and emergency contacts | Combined | 11 | Related personal-record screens with matching frontend readiness and core milestone. |
| 14 | CAP-09 | Student | Student documents library | Combined | 11 | Related personal-record screens with matching frontend readiness and core milestone. |
| 15 | CAP-10 | Student | Semester subject and class registration | Kept separate | 12 | Semester registration is a separate confirmation transaction with its own rules. |
| 16 | CAP-13 | Student | Grades, results and student progress | Kept separate | 13 | Official results are frontend-ready; lecturer feedback remains Partial and is a separate view. |
| 17 | CAP-15 | Student | Graduation clearance and transcripts | Kept separate | 14 | Graduation and official transcripts have a later milestone and a separate clearance workflow. |
| 18 | CAP-16 | Student | Important announcements | Kept separate | 15 | Announcements are Partial; student policies are Not started. |
| 19 | CAP-55 | Student | University policies for students | Kept separate | 16 | Policies have different readiness from announcements and different ownership from learning materials. |
| 20 | CAP-45 | Student | Finance balances, invoices and payment history | Combined | 17 | One student fee-payment journey; both frontend screens are marked ready. |
| 21 | CAP-46 | Student | Bank-transfer proof submission | Combined | 17 | One student fee-payment journey; both frontend screens are marked ready. |
| 22 | CAP-47 | Student | Online payment and financial documents | Kept separate | 18 | Online gateway payments are Partial and have a later milestone than bank-transfer proof submission. |
| 23 | CAP-48 | Student | Scholarships and incentives | Kept separate | 19 | Scholarship assignment has its own rules and later milestone than core billing. |
| 24 | CAP-30 | Student | Student feedback and course evaluation | Kept separate | 20 | QA survey confidentiality and evaluation reporting are distinct from student academic records. |
| 25 | CAP-11 | Student | Class timetable | Combined | 21 | Related class-information views with identical progress, ownership and milestone. |
| 26 | CAP-12 | Student | Attendance records | Combined | 21 | Related class-information views with identical progress, ownership and milestone. |
| 27 | CAP-14 | Student | Study plan and prerequisites | Combined | 22 | Related curriculum-information views with identical progress and milestone. |
| 28 | CAP-17 | Student | Study guides | Combined | 23 | The same student resource-viewing capability; the user marks all three frontend items ready. |
| 29 | CAP-18 | Student | Lecture notes and learning-media access | Combined | 23 | The same student resource-viewing capability; the user marks all three frontend items ready. |
| 30 | CAP-19 | Student | Assignment briefs | Combined | 23 | The same student resource-viewing capability; the user marks all three frontend items ready. |
| 31 | CAP-20 | Student | Submit, replace and withdraw assignments | Kept separate | 24 | Assignment submission is a transaction, distinct from viewing/downloading learning resources. |
| 32 | CAP-21 | Student | Revision work and practice activities | Combined | 25 | Two remaining study-resource items with matching Not started status. Preserve both effort estimates; no implied requirement to publish past papers. |
| 33 | CAP-22 | Student | Past examination papers | Combined | 25 | Two remaining study-resource items with matching Not started status. Preserve both effort estimates; no implied requirement to publish past papers. |
| 34 | CAP-23 | Student | Course information and learning outcomes | Combined | 22 | Related curriculum-information views with identical progress and milestone. |
| 35 | CAP-24 | Student | Online quizzes and examinations | Kept separate | 26 | Online assessments are Placeholder; integrity checks are Not started and assigned to a different milestone. |
| 36 | CAP-25 | Student | Student–lecturer and student–student communication | Kept separate | 27 | Messaging is frontend-ready; live classes remain Not started. |
| 37 | CAP-26 | Student | Live online classes | Kept separate | 28 | Live classes have different progress from messaging and self-paced learning. |
| 38 | CAP-27 | Student | Self-paced learning and release schedules | Kept separate | 29 | Self-paced learning is frontend-ready, unlike live classes; it also has a later milestone than resource viewing. |
| 39 | CAP-28 | Student | View marks and lecturer feedback | Kept separate | 30 | Feedback remains Partial, unlike the ready official results view. |
| 40 | CAP-29 | Student | Assessment identity checks and integrity guidance | Kept separate | 31 | Integrity checks cover assessment modes and remain Not started; merging with quizzes would hide status and milestone differences. |
| 41 | CAP-01 | Student | Sign-in, logout and student account access | Kept separate | 32 | Student sign-in has its own Placeholder status; security and accessibility remain Partial. |
| 42 | CAP-31 | Student | Digital library and e-resources | Kept separate | 33 | Licensed digital-library access is distinct from course files and regional support. |
| 43 | CAP-32 | Student | Student orientation and digital-learning skills | Kept separate | 34 | Orientation content and completion evidence form a separate core journey. |
| 44 | CAP-33 | Student | Learner support and IT helpdesk | Kept separate | 35 | Helpdesk access is Partial and core; formal requests/appeals remain Placeholder and later. |
| 45 | CAP-34 | Student | Study-centre and regional support | Kept separate | 36 | Regional support ownership is TBC; do not assume it is the same service as a helpdesk or library. |
| 46 | CAP-35 | Student | Accessibility and special-needs support | Kept separate | 37 | Accessibility is a cross-cutting obligation, distinct from cybersecurity or device layout. |
| 47 | CAP-36 | Student | Mobile portal shell and device access | Kept separate | 38 | Mobile shell work has a distinct applicability/progress combination. |
| 48 | CAP-39 | Student | Privacy, permissions and cybersecurity | Kept separate | 39 | Privacy and security require separate access-control acceptance; do not hide them under sign-in. |
| 49 | CAP-49 | Student | Resume and portfolio builders | Kept separate | 40 | Resume/portfolio is a distinct career feature with its own save/export needs. |
| 50 | CAP-50 | Student | Immigration and visa processing | Kept separate | 41 | Visa processing has country-specific evidence and staff decisions; it is not a generic appeal/housing case. |
| 51 | CAP-51 | Student | Student requests, complaints and academic appeals | Kept separate | 42 | Formal requests, complaints and appeals have separate decisions and response-time rules. |
| 52 | CAP-52 | Student | Accommodation management | Kept separate | 43 | Housing allocation has its own records and approvals, unlike general support or service information. |
| 53 | CAP-54 | Student | Campus services information | Kept separate | 44 | Read-only service information has different mobile progress and scope from housing transactions. |
| 54 | CAP-11 | Lecturer | View teaching timetable and class allocations | Combined | 45 | Related lecturer class-management tools with the same progress and milestone. |
| 55 | CAP-12 | Lecturer | Record and correct class attendance | Combined | 45 | Related lecturer class-management tools with the same progress and milestone. |
| 56 | CAP-17 | Lecturer | Publish study guides | Combined | 46 | One lecturer content-authoring and review workflow; all items are unbuilt with identical ownership and core milestone. |
| 57 | CAP-18 | Lecturer | Publish lecture notes and learning media | Combined | 46 | One lecturer content-authoring and review workflow; all items are unbuilt with identical ownership and core milestone. |
| 58 | CAP-19 | Lecturer | Publish assignment briefs and deadlines | Combined | 46 | One lecturer content-authoring and review workflow; all items are unbuilt with identical ownership and core milestone. |
| 59 | CAP-20 | Lecturer | Receive and review submitted assignments | Combined | 47 | Related lecturer assessment-processing steps with identical statuses and milestone; integrity controls remain explicit. |
| 60 | CAP-21 | Lecturer | Publish revision work and practice activities | Combined | 46 | One lecturer content-authoring and review workflow; all items are unbuilt with identical ownership and core milestone. |
| 61 | CAP-22 | Lecturer | Prepare past papers for authorised publication | Combined | 46 | One lecturer content-authoring and review workflow; all items are unbuilt with identical ownership and core milestone. |
| 62 | CAP-23 | Lecturer | Maintain course information and learning outcomes | Combined | 46 | One lecturer content-authoring and review workflow; all items are unbuilt with identical ownership and core milestone. |
| 63 | CAP-24 | Lecturer | Prepare and conduct online quizzes and examinations | Kept separate | 48 | Online quiz/exam delivery has a later milestone than core assignment review and marking. |
| 64 | CAP-25 | Lecturer | Communicate with students and teaching groups | Combined | 49 | Related online teaching delivery tools, all unbuilt and assigned to the expansion milestone; live and self-paced delivery both remain explicit. |
| 65 | CAP-26 | Lecturer | Deliver live online classes | Combined | 49 | Related online teaching delivery tools, all unbuilt and assigned to the expansion milestone; live and self-paced delivery both remain explicit. |
| 66 | CAP-27 | Lecturer | Schedule self-paced learning and content release | Combined | 49 | Related online teaching delivery tools, all unbuilt and assigned to the expansion milestone; live and self-paced delivery both remain explicit. |
| 67 | CAP-28 | Lecturer | Mark assessments and publish lecturer feedback | Combined | 47 | Related lecturer assessment-processing steps with identical statuses and milestone; integrity controls remain explicit. |
| 68 | CAP-29 | Lecturer | Check assessment identity and academic integrity | Combined | 47 | Related lecturer assessment-processing steps with identical statuses and milestone; integrity controls remain explicit. |
| 69 | CAP-40 | Lecturer | Review class learning analytics | Kept separate | 50 | Class analytics is a separate reporting capability, not content publishing. |
| 70 | CAP-43 | Lecturer | Submit course materials for quality review | Combined | 46 | One lecturer content-authoring and review workflow; all items are unbuilt with identical ownership and core milestone. |
| 71 | CAP-44 | Lecturer | Lecturer workspace and course access | Kept separate | 51 | Lecturer role/course access is a prerequisite screen, not a content-authoring activity. |
| 72 | CAP-36 | Lecturer | Mobile lecturer workspace | Kept separate | 52 | Mobile lecturer work has a different applicability status and milestone from core lecturer screens. |
| 73 | CAP-03 | Admin / Staff | Review application documents and entry evidence | Combined | 53 | One Registry application-processing workflow. Distinct entry/recognition checks remain in the scope and original notes. |
| 74 | CAP-05 | Admin / Staff | Verify qualification levels, credits and duration | Combined | 53 | One Registry application-processing workflow. Distinct entry/recognition checks remain in the scope and original notes. |
| 75 | CAP-06 | Admin / Staff | Review foreign equivalency and professional recognition | Combined | 53 | One Registry application-processing workflow. Distinct entry/recognition checks remain in the scope and original notes. |
| 76 | CAP-07 | Admin / Staff | Review applications, issue offers and create first enrolment | Combined | 53 | One Registry application-processing workflow. Distinct entry/recognition checks remain in the scope and original notes. |
| 77 | CAP-08 | Admin / Staff | Maintain student records and emergency contacts | Combined | 54 | Related Registry student-record maintenance with matching statuses and milestone. |
| 78 | CAP-09 | Admin / Staff | Publish and manage student documents | Combined | 54 | Related Registry student-record maintenance with matching statuses and milestone. |
| 79 | CAP-10 | Admin / Staff | Configure and approve semester registration | Kept separate | 55 | Registration configuration/approval is a separate enrolment transaction from maintaining student records. |
| 80 | CAP-13 | Admin / Staff | Approve and release results and progress records | Kept separate | 56 | Result approval and release are separate from student-record maintenance and graduation. |
| 81 | CAP-15 | Admin / Staff | Approve graduation and issue official transcripts | Kept separate | 57 | Graduation clearance and transcripts have a later milestone and distinct official-record checks. |
| 82 | CAP-16 | Admin / Staff | Publish approved student announcements | Combined | 58 | One Registry publishing capability at the same core milestone; announcements and policies remain named. |
| 83 | CAP-55 | Admin / Staff | Approve and publish student policies | Combined | 58 | One Registry publishing capability at the same core milestone; announcements and policies remain named. |
| 84 | CAP-45 | Admin / Staff | Manage student invoices, balances and payment records | Combined | 59 | Related Bursary ledger and payment-verification workflow with matching statuses and milestone. |
| 85 | CAP-46 | Admin / Staff | Verify bank-transfer proofs and allocate payments | Combined | 59 | Related Bursary ledger and payment-verification workflow with matching statuses and milestone. |
| 86 | CAP-48 | Admin / Staff | Assign and review scholarships and incentives | Kept separate | 60 | Scholarship administration has its own award rules and later milestone than core Bursary payments. |
| 87 | CAP-47 | Admin / Staff | Reconcile online payments and issue financial documents | Kept separate | 61 | Finance reconciliation remains separate from Bursary student-account verification. |
| 88 | CAP-04 | Admin / Staff | Record institution, programme and delivery-site approvals | Kept separate | 62 | Institution/programme/site accreditation is distinct from teaching-content QA and required for admissions. |
| 89 | CAP-30 | Admin / Staff | Manage student feedback and course evaluations | Combined | 63 | Related QA evidence and reporting tools with matching statuses and expansion milestone. |
| 90 | CAP-40 | Admin / Staff | Review institutional learning analytics and quality reports | Combined | 63 | Related QA evidence and reporting tools with matching statuses and expansion milestone. |
| 91 | CAP-42 | Admin / Staff | Record copyright permissions and provider approvals | Combined | 64 | Related QA content approval and permission evidence with matching core milestone; operating controls remain separately tracked. |
| 92 | CAP-43 | Admin / Staff | Approve course materials and LMS-readiness evidence | Combined | 64 | Related QA content approval and permission evidence with matching core milestone; operating controls remain separately tracked. |
| 93 | CAP-11 | Admin / Staff | Schedule classes and allocate lecturers and rooms | Kept separate | 65 | Timetable/room allocation is a separate operational workflow from curriculum administration. |
| 94 | CAP-14 | Admin / Staff | Maintain study plans, prerequisites and programme rules | Combined | 66 | Related Faculty curriculum administration, with matching statuses and milestone. |
| 95 | CAP-22 | Admin / Staff | Approve access and publication rights for past papers | Kept separate | 67 | Past-paper publication rights/access are distinct from curriculum-rule maintenance and must remain visible. |
| 96 | CAP-23 | Admin / Staff | Approve course information and learning outcomes | Combined | 66 | Related Faculty curriculum administration, with matching statuses and milestone. |
| 97 | CAP-24 | Admin / Staff | Administer examinations, access and approved arrangements | Kept separate | 68 | Exam administration has a separate later milestone and assessment arrangements. |
| 98 | CAP-16 | Admin / Staff | Publish recruitment and applicant communications | Kept separate | 69 | Marketing applicant communication remains separate from Registry's official student communications. |
| 99 | CAP-31 | Admin / Staff | Administer digital-library access and licences | Kept separate | 70 | Digital-library licensing and access are separate from campus service-content publication. |
| 100 | CAP-32 | Admin / Staff | Publish orientation and digital-learning guidance | Kept separate | 71 | Orientation content is a separate core publishing journey with completion-evidence needs. |
| 101 | CAP-33 | Admin / Staff | Manage learner-support and IT-helpdesk requests | Kept separate | 72 | Core helpdesk management has a different milestone from later formal appeals/requests. |
| 102 | CAP-34 | Admin / Staff | Coordinate study-centre and regional support | Kept separate | 73 | Regional support has unconfirmed ownership; do not assume the same operator as disability support. |
| 103 | CAP-35 | Admin / Staff | Manage accessibility and special-needs arrangements | Kept separate | 74 | Special-needs arrangements require distinct permissions/adjustments and unconfirmed ownership. |
| 104 | CAP-36 | Admin / Staff | Mobile staff and administrator workspace | Kept separate | 75 | Mobile staff work has different applicability and milestone from admissions staff access. |
| 105 | CAP-44 | Admin / Staff | Staff and administrator workspace and role access | Kept separate | 76 | Staff role/access support must be usable for admissions, before later staff mobile work. |
| 106 | CAP-49 | Admin / Staff | Manage career, resume and portfolio guidance | Kept separate | 77 | Career guidance is a separate service with its own operational responsibilities. |
| 107 | CAP-50 | Admin / Staff | Process immigration and student-visa cases | Kept separate | 78 | Visa cases have distinct campus/country rules and evidence. |
| 108 | CAP-51 | Admin / Staff | Handle student requests, complaints and academic appeals | Kept separate | 79 | Complaints and academic appeals require distinct formal decisions and published response times. |
| 109 | CAP-52 | Admin / Staff | Manage accommodation allocation and records | Kept separate | 80 | Accommodation allocation is a separate operational transaction. |
| 110 | CAP-54 | Admin / Staff | Publish campus services information | Kept separate | 81 | Campus information publishing is read-only content administration, distinct from service transactions. |
| 111 | CAP-42 | Shared System | Copyright and external-provider operating controls | Kept separate | 82 | Non-software permissions/provider controls have a different milestone and applicability from QA screens. |
| 112 | CAP-37 | Shared System | Connectivity, capacity and service monitoring | Combined | 83 | Related Shared System reliability work with identical backend status and admissions milestone. |
| 113 | CAP-38 | Shared System | Backups and continuity | Combined | 83 | Related Shared System reliability work with identical backend status and admissions milestone. |
| 114 | CAP-39 | Shared System | Privacy, permissions and cybersecurity | Kept separate | 84 | Security and privacy require independent access-control and data-protection acceptance, beyond availability/recovery. |
| 115 | CAP-41 | Shared System | Staff training and operating readiness | Kept separate | 85 | Staff training is a non-software pilot-readiness control with a different milestone. |
| 116 | CAP-53 | Shared System | Existing CMS integration and campus configuration | Kept separate | 86 | Integration/configuration has Partial frontend contract work and is distinct from operational infrastructure. |
