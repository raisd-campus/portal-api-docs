# Student Portal and CMS daily checklist

Baseline reviewed: **7 September 2026**, against portal commit `6811e88` and the supplied research. This is a delivery tracker, not a declaration that a campus meets its government requirements.

## Deliverables and current state

- [Live simplified checklist](https://docs.google.com/spreadsheets/d/1Yux9R8hIgcPrQ5OklKd9Oyq_04qJtaAhcxJvr_7NvYI/edit#gid=1836730462). Use this for the current simplified daily view.
- [Verified Excel backup](../../outputs/01a06f1b-fd81-7131-8e1a-f7845e088984/student-portal-cms-daily-checklist.xlsx).
- [Baseline data, references and original-file hashes](daily-checklist-baseline.json). This is a dated snapshot, not an automatic synchronisation with the live Google Sheet.
- The user added a simplified tab, changed its frontend labels/effort values and enabled anyone-with-link reader access. These user choices were preserved. No permissions were changed by this task. The Excel backup now contains all four current tabs.

The workbook now has four tabs: **Daily Checklist (Simplified)**, **Daily Checklist**, **Timeline**, and **Requirements & Sources**. The simplified tab has **82 delivery groups**, reduced from 112 by **19 merges**. The detailed tab still has **112 rows**. Both represent the same **55 capabilities**; no requirements were added or removed. All nine campus requests, 37 supplied research domains, eight countries and 150 source/current-state records remain covered.

| Portal | Simplified groups | Detailed rows |
| --- | ---: | ---: |
| Applicant / Online Registration | 6 | 8 |
| Student | 34 | 41 |
| Lecturer | 8 | 19 |
| Admin / Staff | 29 | 38 |
| Shared System | 5 | 6 |

See the [row-by-row review](simplified-checklist-review.md) for the decision on every original row. The 19 combined Feature-cell notes were subsequently removed at the user's request; the historical review and dated local snapshots retain that provenance. Hidden ID cells retain every applicable CAP ID, so the existing source links still apply.

The subsequent [Student frontend reconfirmation](student-frontend-reconfirmation.md) reviews all 34 live Student rows against the current application. It recommends Partial for the combined profile/documents, learning-materials and self-paced-learning rows; the other 31 frontend labels can remain within the documented prototype scope. This review leaves the live checklist and the user's estimates unchanged. The Excel backup above predates these latest user status edits and note removal; it is a dated backup, not a current live export.

Only rows with matching Portal, Department, Frontend/Mobile/Backend statuses, milestone and next-action owner were merged. Different-status items remain separate: for example ready learning materials versus unbuilt revision resources, and ready official results versus Partial feedback. Unknown ownership was not treated as permission to combine unrelated services.

The user's **Frontend ready** and **Done** values are retained as frontend planning labels, not newly verified integration, live delivery or compliance. The original code-evidence snapshot remains in the detailed baseline. Effort values are preserved; revision work and past papers show **3 Days**, adding the existing **2 Days + 1 Day** estimates. No reduced estimate or delivery commitment is inferred from consolidation. The user's hidden columns, row heights, widths, colours and four frozen header rows were retained.

## Approved delivery priorities

CAP-51 implementation evidence is tracked locally in [Online Forms](../online-forms.md) and [handoff](../handoff.md). The student slice comprises five campus-owned samples, drafts, immutable submissions, progress and case messages; it does not complete staff review operations or production integration. Student Frontend is **Demo**, verified on 10 September 2026 by 519 unit tests and 198 desktop browser tests; Mobile remains Not started and Backend Needs checking. The live Google tracker and dated Excel/baseline snapshots remain unchanged for the owner to maintain.

1. Pilot Cyberjaya first. Confirm campus rules, old-CMS capabilities, integration access and responsible staff.
2. Deliver new-applicant admissions before semester subject registration. Admissions includes application evidence, staff review, tracking, offers and first enrolment.
3. Complete core student-portal journeys, including learning resources, timetable, assignment submission, announcements, student policies, core records and semester registration.
4. Include phone-friendly admissions, sign-in and core student journeys in launch planning. The existing portal still has only isolated responsive Services body content; full mobile implementation is future work.
5. Keep the old CMS as the initial backend. Staff/lecturer/admin capabilities must be inventoried there before new screens or replacement work are commissioned.
6. Launch only after working integration, approved content, security/recovery checks and campus acceptance. Deferring new software to Campus expansion & remaining CMS does not defer an applicable operating requirement: the old CMS or a campus-approved alternative must cover it before launch.

This approval creates planning artifacts only. It does not authorise or implement production authentication, APIs, storage, file delivery, admissions, mobile remediation or a replacement CMS.

## Daily maintenance and supporting detail

The simplified view shows **Portal, Feature, Frontend, Mobile, Backend, Frontend Effort (Days), Last updated**. Its hidden detail columns retain IDs, Department, milestone, owner, next action and request tags. The detailed tab retains the earlier **ID, Portal, Department, Feature, Frontend, Mobile, Backend, Delivery milestone, Next-action owner, Target week, Next action/blocker, Last updated, Campus request** columns. Frontend means the screens for that row's portal; Backend means the supporting system capability. Lecturer publishing and student access use separate rows because their progress differs. Shared System contains integration, infrastructure and cross-system work; staff publishing/review/approval screens remain in their own portals.

The same `CAP-xx` links related portal activities to the existing references. It is intentionally repeated. The baseline's `workItems` collection adds a unique `workItemKey` (capability, portal and activity) while `features` preserves the 55 underlying capabilities and their original evidence. Do not count repeated IDs as extra regulatory obligations. Legacy area/suggested-role metadata in `features` is supporting provenance; the approved lead department for daily work is on each work item.

| Lead department | Proposed responsibility |
| --- | --- |
| Registry | Admissions decisions, student records, enrolment, registration and official academic records |
| Bursary | Student fees, scholarships and payment-proof verification |
| Finance | Accounting, reconciliation and financial reporting |
| Quality Assurance | Accreditation, standards, quality reviews and acceptance evidence |
| Faculty | Teaching resources, timetable delivery, assessments, marking and feedback |
| Marketing | Recruitment and applicant communications already in scope |
| TBC | Unclear ownership or functions outside the six approved departments |

Each row has one lead department. Collaborators belong in its next action/supporting notes. This does not assign a named next-action owner: all unconfirmed owners remain **TBC**.

Update the simplified view's three statuses, frontend effort and **Last updated** as work changes; retain owners, milestones and next actions in the supporting columns as needed. The date is manual. The simplified view and detailed tab are separate snapshots, not formula-linked views, so changes do not automatically synchronize. Filter by Portal or status. The user moved headers to row 4; the simplified tab freezes four rows, and the detailed tab also freezes its first four columns. Search/filter `CAP-xx` in the Sources tab's Feature IDs column; records labelled All features apply to the whole tracker.

Native status colours are preserved. The simplified Frontend dropdown replaces Demo with the user's Frontend ready option; Mobile and Backend retain their existing nine choices. Portal, Department and Delivery milestone dropdowns stay neutral. The sheet has neutral table styling, no status-based conditional fills and no coloured input-cell backgrounds.

| Status | Meaning |
| --- | --- |
| Not started | No implementation of the specified portal activity in the reviewed frontend. |
| Placeholder | A page, label or button exists, but the intended action/content is unavailable. |
| Demo | Built with sample data or a temporary session; no live backend or durable save. |
| Frontend ready | User-marked frontend work is ready in the simplified tracker; backend integration and live acceptance are tracked separately. |
| Partial | Some parts exist; key content, delivery, workflow or acceptance work is missing. |
| In progress | An assigned owner is actively working on the item. |
| Ready for testing | Available for the agreed acceptance tests. |
| Live | Accepted and operating with real data, access controls and an accountable owner. |
| Needs checking | Capability or evidence has not been verified with its owner. |
| Not applicable | This workstream does not apply to the capability. |

In the earlier detailed inventory, the 41 Student rows retain their original software statuses and evidence. The current simplified user-edited labels are recorded separately in the baseline's simplifiedChecklist section. Unbuilt staff and lecturer screens do not inherit Student Demo/Partial statuses. **110 Backend entries are Needs checking**. Two non-software Shared System controls (staff training and copyright/provider operating responsibilities) use Not applicable for their software columns and explicitly retain outstanding TBC operational checks in Next action/blocker. Not applicable does not mean those checks are complete. Absence from this repository does not establish absence from the old CMS. No activity is labelled Live. Software progress is separate from accreditation and operating evidence.

## Campus requests and requirement mapping

All nine requests remain tagged in related capability rows. Supporting lecturer/staff activities carry the same request link; a repeated tag is not a new request. The original code-inspected Student baseline below is retained as historical evidence; the simplified tab contains the user's newer frontend-planning labels:

| Request | Feature ID | Current frontend |
| --- | --- | --- |
| Study guides | CAP-17 | Not started |
| Lecture notes | CAP-18 | Placeholder file/resource actions |
| Assignment briefs | CAP-19 | Partial: instructions/details exist; file delivery is a placeholder |
| Class timetable | CAP-11 | Demo with sample schedules |
| Submit assignments | CAP-20 | Demo: file metadata only; resets on refresh |
| Revision work | CAP-21 | Not started |
| Past examination papers | CAP-22 | Not started |
| Important announcements | CAP-16 | Partial: preview cards, no full announcement view |
| University policies for students | CAP-55 | Partial: handbook metadata, no functional policy library |

Past papers remain under learning resources with an explicit campus-request tag. Broad resource requirements do not establish that past papers themselves are legally mandatory. Their publication requires academic permission and appropriate access restrictions.

Admissions upload and qualification-verification workflows are **Not started** even though enrolled students can already see sample qualification records. The existing Module Registration transaction is semester subject/class selection, not applicant registration. Services library/Wi-Fi information is not an operating digital library or network service; mock chat is not a staffed helpdesk.

## Delivery milestones

| Milestone | Target | When the deliverable must be usable |
| --- | --- | --- |
| Confirm rules & integration | TBC | Campus rules, owners, old-CMS inventory and integration access agreed |
| Admissions launch | TBC | Applicant-to-enrolment journey, required Registry/staff functions, sign-in and core mobile work with real integration |
| Core student portal | TBC | Student journeys and semester registration work with required lecturer/staff publishing, records and file delivery |
| Cyberjaya pilot acceptance | TBC | Integrated pilot tested; campus accepts security, recovery, content and operating readiness |
| Campus expansion & remaining CMS | TBC | Additional campuses and remaining approved CMS/staff work accepted against their rules |

The order follows the admissions-first product decision and integration dependencies. It is **not government-prescribed phasing or an effort estimate**. The previous P1–P5 codes and illustrative week ranges have been removed. Kickoff, target weeks, backend commitments and named owners remain **TBC** until agreed.

An activity is assigned to when it must become usable, not when someone starts investigating it. Admissions staff workflows belong with Admissions launch; core lecturer publishing and approvals belong with Core student portal. Check whether the old CMS can supply these before building replacements. A deferred new screen does not defer an applicable operating requirement. Launch needs working backend integration and campus acceptance.

## Sources and corrections

The four supplied files have distinct SHA-256 hashes. Their overlapping topics were combined without deleting or modifying the originals. The two text files are summaries of the two workbooks. The supplied LMS workbook covers 37 domains across eight countries; these are not 37 universally mandatory software functions. Its country evidence labels must not become a compliance score. Referenced supporting PDFs/ZIP were not supplied with those files.

Additional primary-source review on 7 September 2026 records the following:

- **Malaysia:** MQA lists MQF second edition 2024; COPPA-ODL is second edition 2019, updated June 2021, with June 2024 evaluation guidance. Apply ODL clauses to the applicable programme mode. The institution chooses its teaching mix; synchronous and asynchronous software are not two unconditional mandates. Recognition is programme/location specific. See [MQF](https://www.mqa.gov.my/new/mqf.cfm), [ODL evaluation guidance](https://www2.mqa.gov.my/qad/v2/document/2024/Guidelines%20for%20Evaluation%20COPPA%20ODL.pdf) and [MQR guidance](https://www.mqa.gov.my/mqr/english/ecarianakr.cfm).
- **Botswana:** March 2026 HE standards include ODeL provisions. Formal transition commencement still needs confirmation; the 12-month plan and 36-month transition are tied to published commencement. Do not infer a March 2029 deadline from the document footer. See [HE standards](https://www.bqa.org.bw/sites/default/files/2026-05/Norms%20and%20Standards-HE-2026.pdf), [transition guidance](https://www.bqa.org.bw/sites/default/files/2026-06/TRANSITION%20GUIDELINES_0.pdf) and [publication notice](https://www.bqa.org.bw/news/announcement-publication-norms-and-standards-guidelines).
- **Eswatini:** The institutional-review standards carry copyright 2024, although hosted in September 2025. They explicitly address online application/tracking, assessment, student support and records. Preserve permitted assessment-integrity alternatives rather than mandating a vendor. See [ESHEC standards](https://eshec.org.sz/wp-content/uploads/2025/09/ESHEC-Final-Institutional-Review-Standards-and-Guidelines-1.pdf).
- **Lesotho:** Dedicated CHE ODL accreditation standards were recovered from the official 2021 package, dated 11 November 2021. This improves the supplied policy-only evidence. The Ministry policy URL returned an application shell, so the CHE standard supplies the specific clauses. Confirm newer editions and campus conditions. See [CHE index](https://www.che.ac.ls/quality-assurance-documents/) and [accreditation package](https://www.che.ac.ls/wp-content/uploads/2025/11/Accreditation-Documents-2021.zip).
- **Namibia:** General NQA accreditation requirements apply to resources, assessment and safe records. A dedicated current mandatory LMS feature list was not confirmed. Obtain campus conditions and newer policy instruments; NCHE homepage access failed during research. See [NQA accreditation](https://namqa.org/accreditation-overview/) and [2026 publication](https://namqa.org/wp-content/uploads/2026/01/NQA-2026-new.pdf).
- **Uganda:** The framework uploaded in June 2026 has a **June 2016** cover; it is not a 2026 edition. The current NCHE ODeL page links the 2019 standard. Its helpdesk guidance includes 24/7 provision, which requires operating capacity, not just a button. See [framework](https://unche.or.ug/wp-content/uploads/2026/06/THE-UGANDA-HIGHER-EDUCATION-QUALIFICATIONS-FRAMEWORK.pdf) and [ODeL standard](https://unche.or.ug/wp-content/uploads/2021/09/ODeL-Minimum-Standards_Final_2019.pdf).
- **Cambodia:** The July 2026 ACC consultation is not proof that revised standards have been adopted. Applicable Khmer standards and campus interpretation remain pending. The ministry learning platform is an implementation example. ACC page access is intermittent. See [ACC consultation](https://acc.gov.kh/accworkshop09072026/) and [MoEYS platform](https://cdp.moeys.gov.kh/?lang=en).
- **Sierra Leone:** COL reports ODL policy/guideline work, but full operative TEC clauses remain to be obtained. The February 2026 ministry report describes qualification-framework finalisation and transfer/prior-learning drafts; confirm subsequent adoption. See [COL country evidence](https://www.col.org/member-countries/sierra-leone/) and [ministry report](https://www.mothe.gov.sl/2026/02/03/mthe-engages-vcps-on-strategic-reforms-and-collaboration/).

The source tab distinguishes explicit ODL/accreditation requirements, QA guidance, policy evidence, implementation examples, supplied research and campus/product decisions. Exact clauses and the outstanding campus confirmation sit beside each requirement. Primary-source review supports the tracker; it does not establish a complete current legal audit of every campus.

## Verification — simplified consolidation, 7 September 2026

- Reviewed all **112 rows** individually; 19 merge groups produce **82 rows**. All 55 CAP IDs and nine unique request capabilities remain represented, and merged statuses/ownership/milestones agree. No Live status was introduced.
- Live readback passed **1,118/1,118 simplified cells**, all 19 merge notes and unchanged values/formats/notes on the other three tabs. The native table covers `A4:M86`; six dropdown columns retain their original options, including Frontend ready.
- Signed-in browser review confirmed wrapping, note access, user chip colours and effort values. Lecturer filtering displayed **8 of 82** and was reset. Hidden columns, widths and frozen-header settings were preserved.
- Refreshed four-tab Excel backup passed **4,476/4,476 cells**, all 19 notes, four tables, six dropdown columns, correct hidden columns and no hidden rows or formula/error cells. Export uses five list-validation rules for the six dropdown columns, plus date/other rules; rule count is not column count. File: **54,573 bytes**, SHA-256 `9593e97e9ff749b8ac1940e51c497e6f6342dc9395e801307e255b51abbd9bac`.
- Supplied source-file hashes remain unchanged. Planning records and the row-by-row audit are synchronized. All **28 local Markdown links** resolve; `git diff --check` passed, and the read-only change-surface review reported no companion-layer gaps. Application behavior and government-source findings were not re-audited or changed. No application tests, commit or push for this planning-only task.

## Historical verification — initial portal reorganisation, 7 September 2026

- Read the live sheet and rechecked immediately before writing: no user-entered value changes were found versus the prior snapshot. Original capability/reference coverage and user-maintained fields were preserved.
- Live Google readback: **3,397 of 3,397 used-grid cells match** the revised payload, with zero error cells; 262 typed review/update dates. All 55 capabilities, 112 unique work-item keys, nine unique campus requests, 37 research domains, eight countries and 150 reference records reconcile. All 41 Student status/evidence records match the preserved baseline.
- Verified three native table ranges: Daily `A7:M119`, Timeline `A8:H13`, Sources `A7:J157`; six dropdown columns with exact choices; zero conditional-format rules; frozen Daily/Sources identifiers. Owners, target weeks, kickoff and backend commitments remain TBC. No Live status is assigned. All original source references remain present.
- Signed-in Google Sheets UI: visually checked all nine chip colours in **each** status column, neutral cells and other dropdowns, wrapping, horizontal scrolling and frozen identifiers. Lecturer filtering displayed **19 of 112** rows; the filter was reset afterward. Reviewed all three tabs and corrected faint Sources header text. Custom colour input initially failed to commit; keyboard-confirmed previews and final dropdown screenshots verified the saved palette.
- Refreshed Excel backup exported from the completed native sheet: independent Python/openpyxl inspection, without rewriting the workbook, passed **all 3,397 cells**, three tables, six dropdown rules, frozen panes, no hidden rows and zero formula/error cells. It is **41,701 bytes**, SHA-256 `7e671934118a2ffa9fefcdb194520c606ffecf085536ec7879749a8ce7a21cfe`. Native Google chip appearance is verified in Google; the Excel copy is a data/structure backup and does not promise identical native chip rendering.
- All four supplied source files remain byte-identical to their recorded SHA-256 hashes. All capability evidence paths resolve. All **26 local Markdown links** resolve. `git diff --check` passed, and the read-only change-surface review reported no companion-layer gaps. Git initially warned about CRLF normalization in the two edited tracked documents; their line endings were normalized to LF and the check rerun.
- Planning artifacts only: no application behavior changed; application tests were not rerun and no commit/push was performed for this task. Government-source findings retain their earlier dated verification and limitations; this reorganisation did not re-audit government publications.

Maintain the simplified tracker daily. Confirm next-action owners, inspect the old CMS and agree effort/targets. The baseline and Excel backup are dated snapshots, not automatic synchronization; do not regenerate over later live edits.
