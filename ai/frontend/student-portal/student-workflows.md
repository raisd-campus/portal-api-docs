# Student source forms, registration review and document delivery

Local implementation baseline: 8 October 2026. Shared components remain 0.6.2. This specification describes session-only Mock Portal API behavior; new server operations remain pending advertised capability support. No staff production screens, database changes, deployments or live admissions rules are introduced.

## Source provenance and boundaries

The privately retained Student Portal Forms ZIP contains the verified engineer-supplied source forms. Its SHA-256 is `9bcafffc91a3a4d85c52d4d92cd8d91a119b5c3786c47c22ce774686fb353e2f`. Keep the archive in ignored reference material, not tracked or public files. The two blank Malaysian health PDFs are separately supplied source references; student answers never claim to replace a clinician's examination or an approved institutional signature.

Lesotho-first pilot guidance remains canonical. Cyberjaya sample content and existing MYR/tax behavior are preserved. Independent Lesotho fixtures use explicitly synthetic LSL prices and pending NMDS coverage. Real tariffs, official letter layouts/signatures and NMDS terms must come from each campus.

## Catalogue and source-owned inputs

| Template | Source | Student inputs and review sequence |
| --- | --- | --- |
| Add Modules | REG014 | Up to eight code/name/term/credit rows selected from owned offerings; optional payment proof and electronic acknowledgement. Bursary clearance, Faculty academic update, Registry filing. |
| Drop Modules | REG015 | Up to eight exact owned registration rows; same fee/review sequence. Dropped registrations retain their identities and history as withdrawn. |
| Change of Programme | REG006 | Current records, target programme, reason/contact and Parent/Guardian/Sponsor/Other consent details/evidence; Current Faculty release, Receiving Faculty acceptance, Registry processing. Only the explicitly synthetic alternative Design programme is demonstrated. Prior periods remain on the original enrolment; any transferred credit requires separate assessment. |
| Academic Appeal | REG008 v2 | Exact published registration/attempt, grounds/requested outcome, source justification, conditional transcript date, required evidence and acknowledgement. Lecturer, Principal Lecturer, Dean, Bursary, then explicit Registry result publication. The original submitted result snapshot remains unchanged. |
| Credit Transfer | REG017 | Prior institution/programme and repeated course code/name/term/credits/grade; academic records, syllabi and accreditation evidence. Reuse owned admissions evidence; upload missing/additional evidence. Principal Lecturer, Programme Leader, Head of Department/Dean assessment, Registry applies approved equivalences to existing credit-transfer records. No invented automatic grade/similarity threshold. |
| Study Leave | FMG023 | Reason, destination, duration, estimated return and emergency contacts; identity/contact details prefilled. Lecturer and Programme Leader decisions record leave only. |
| Custom Certification Letter | REG005 | Custom purpose/details and acknowledgement; Faculty review, Registry text/PDF issuance, student receipt. Standard enrolment/completion letters are automatic documents. |
| Student Feedback | SSD002 v2 | One Feedback/Complaint/Accessibility-support topic, subject, description and proposed solution; affected activities when requesting accessibility, optional evidence and acknowledgement. Faculty/Department and Student Services review. |

`student-complaint` remains the stable Cyberjaya template identifier. Existing Student Complaint and Accessibility Support submissions retain original titles, answers, evidence and messages. Standalone Accessibility is retired from Available Forms; Services opens Student Feedback with its accessibility topic. Legacy drafts are read-only and explicitly copy into a new Feedback draft, preserving the original and its temporary files. The copy refuses to overwrite existing Feedback work.

Graduation Clearance and Convocation Registration remain. New Student Pass, Renewal and Cancellation are Cyberjaya Immigration configurations; Medical Screening Result remains linked to its exact active case and absent from the general catalogue. Library Membership, accommodation, Airport Arrival, Sport Utility and Microcredential/Short Courses are excluded.

Incomplete drafts may save. Submission validates applicable mandatory inputs, dependent choices, real dates, source course identity, safe files and an electronic acknowledgement recorded with student name/time. This is an electronic student acknowledgement, not institutional-signature equivalence. Submitted answers/evidence never unlock. Corrections use case messages. Department status, remarks, updates and dates appear in existing detail/progress presentation.

Official effects use development-only reviewer commands. Rejections/withdrawals preserve invoices and payments; withdrawal is blocked after an academic change has been applied. Registry filing closes Add/Drop cases without undoing Faculty's earlier effect. Programme changes never overwrite the previous enrolment or visa relationship. Appeal publication alone revises canonical grades; approved equivalences update existing credit-transfer records. Leave alone imposes no attendance/enrolment/Immigration consequence.

## Registration and Add/Drop finance

All campuses default to immutable module request -> Bursary clearance -> Faculty approval -> completed registration. The existing editor, schedule and fee preview remain. `submitModuleRegistrationRequest` records selected offering identities and issues checked tuition/registration invoices once, without registrations. The legacy mock `confirmModuleRegistrations` delegates to this request rather than bypassing review; the existing hosted method remains unchanged.

An orange Registration Under Review card shows Bursary/Faculty progress and the retained selection. Action Required includes the payment/correction note and Finance link. Bursary records either confirmed allocated payment or an explicitly approved funding/payment arrangement; uploaded proof or expected sponsorship alone cannot clear it. Full tuition settlement is not automatically required. Faculty rechecks ownership, current period, offerings, repeat/prerequisite rules, credit limits, clashes and applicable eVAL conditions before atomic registration and study-period activation. Only completion turns green. Existing completed registrations need no retrospective approval.

Add/Drop charges apply after week 4 by default. `campusAddDropPolicies` may override `chargeAfterWeek` and a configured `feeMinor`; null means Bursary must quote. A recorded zero quote/waiver is permitted. Positive charges must be issued before clearance. Add Modules also issues additional tuition from configured Fee Items, separately from the quoted Add/Drop charge. Repeated quotations cannot duplicate charges. Drops do not delete prior invoices, silently reverse payments or invent refunds.

Lesotho's isolated scenario uses LSL invoices and clearly synthetic amounts. NMDS status includes borrower reference, covered period range and pending/confirmed coverage. Pending sponsorship is distinct from posted credits and the student's payable balance. CY MYR amounts and Malaysian service-tax fixtures remain unchanged; no automatic currency conversion or imported Malaysian tax policy applies to Lesotho.

## Automatic documents and file access

Partial transcripts use only published results during study. Final transcripts and completion letters require official academic completion, final Registry graduation clearance, settled graduation invoice and account. Academic certificates additionally require an explicit official award record. Active enrolment letters contain exact student, campus, faculty, programme, intake and enrolment status. Custom letters retain reviewed issuance and receipt.

Eligible generated documents appear in Profile Documents. Offer Letter is first, Eligibility Letter second. Study Plan provides Partial Transcript and exposes Final Transcript once released. Graduation reuses the same generation and receipt records; only the physical Scroll retains manual preparation/release/collection. No separate manual PDF-preparation task is needed for standard outputs.

`getStudentDocumentDelivery` returns an owned available file body or an explicit unavailable reason. PDFs open a new native-viewer tab, where students download them. Safe raster images open natively; other types download the original. Existing demo PDFs/images are marked synthetic resources. Imported metadata without actual bytes is unavailable, never replaced with invented evidence. Session resource URLs survive navigation/open viewers and are revoked on session reset/disposal. Document receipt is metadata outside immutable submission answers.

## Admissions transport compatibility

Admissions snapshot remains v2. The development browser envelope adds v3 for individually bounded resource delivery and retains v1/v2 compatibility without fabricating absent resources/letters/confirmations. Exact configured origin, opener/window, nonce, unique owned manifest IDs, MIME/name, declared length, 25 MiB per-file bound and SHA-256 are validated. Payment proof and unrelated evidence are excluded. Each file is requested/delivered independently; data is never placed in URLs or persistent storage. One consumed nonce cannot replay. Bytes attach to owned stable Profile evidence references and may be reused by Credit Transfer without duplicate upload or snapshot rewriting.

This transport and bootstrap remain DEV-only and disabled for HTTP sessions. Hosted durable authorized file delivery, server-side review operations and authentication/provisioning are separate backend requirements.

## Cyberjaya health alignment

New Student Pass v2 digitizes the student-owned Malaysian Health Declaration: the fourteen condition/drug questions, conditional explanations, optional treating physician history and electronic acknowledgement of the source undertakings. Before You Start links the supplied blank source PDF. No clinical finding is computed. Step 4 uploads the clinician-completed Health Examination Report with the original case linkage, MIME limits and existing Immigration sequence. These configurations do not appear in Lesotho's general forms catalogue.

## Compatibility and verification

New record additions normalize to empty arrays/null/default metadata. Legacy approvals, awards, payments or files are never fabricated. Queries/resources remain scoped to student, programme enrolment, campus and session; reviewer changes invalidate Academic, Finance, Profile, Graduation, conversations and forms projections.

New HTTP operations are gated by the server's advertised supported-method list. An absent capability throws an unsupported-operation error; no silent mock-write fallback is allowed. OpenAPI planned schemas and mock-operation notes do not claim implemented hosted endpoints.

Acceptance verification covers typed/source inputs, repeated rows, legacy copy/history, atomic department effects, arrangement/verified-payment clearance, invoice deduplication, stale writes, ownership, release/award gates, published-result exclusion, native viewers/unavailable/retry, resource cleanup, v1/v2/v3 transport and replay, campus isolation, responsive keyboard/inline-error behavior, both full gates and seven browser handoff projects. Physical-device and hosted backend behavior remain unverified in this local phase.

## Incoming finance research reconciliation — 9 October 2026

The incoming [campus finance review](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/campus-finance-profile.md) and [proposed YAML](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/contracts/campus-finance-profiles.yaml) remain proposals, not loaded frontend tariffs. The Lesotho LSL/NMDS fixture remains explicitly synthetic; application fee, semester billing C1–C10 and NMDS assistance are separate planes. This increment does not accept pending Faid/Finance decisions or replace CMS calculations. [CAP-53 W1](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/lesotho-cap53-online-enrolment-write.md) documents future CMS submission/payment/review writes; approved-arrangement clearance and durable resources require explicit backend support rather than being inferred from uploaded proof.
