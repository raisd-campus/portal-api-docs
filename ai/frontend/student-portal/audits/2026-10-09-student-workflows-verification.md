# Student forms, registration and document automation verification

Date: 9 October 2026. Local working-tree implementation; shared package remains 0.6.2. No commit, push, deployment, hosted reseed or database change was performed.

## Implemented local behavior

- Source-aligned REG014/REG015/REG006/REG008/REG017/FMG023/REG005 templates and SSD002 Student Feedback v2. Structured owned course rows, source inputs, conditional validation and recorded electronic acknowledgements. Incomplete drafts save; submitted answers/evidence remain immutable.
- Accessibility is unavailable for new cases. Services opens the Feedback accessibility topic. Original Accessibility/Complaint submissions and messages retain their snapshots/titles; explicit legacy-draft copying preserves the original and refuses to overwrite existing Feedback work.
- Ordered department reviews apply official academic effects only through development mock commands: Faculty Add/Drop, Registry programme change/result publication/credit transfer, Lecturer/Programme Leader leave, and reviewed custom-letter issuance. Applied academic changes cannot be undone by withdrawing a case; no silent invoice/payment deletion or refund is introduced.
- All-campus registration records an immutable request and invoices before Bursary clearance and Faculty approval. Verified allocated payment or an explicitly approved arrangement is recorded; proof/pending sponsorship alone is insufficient. Faculty rechecks selection and applicable Immigration rules before registrations/period activation. Existing completed registrations retain their history.
- Week-four Add/Drop charging is configurable, with Bursary quotation/waiver required when no price is configured. Added-module tuition is separate. Lesotho uses an isolated synthetic LSL/NMDS scenario; pending coverage posts no credit. Existing Cyberjaya MYR/tax behavior remains.
- Owned PDF/image rows use native browser tabs; other formats download originals. Missing imported resources show unavailable/retry feedback. Partial transcripts exclude unpublished results. Final/completion documents require official completion, Registry clearance and settled fees; certificates additionally require an explicit award. Graduation reuses automatic PDFs and retains physical Scroll tracking.
- DEV browser envelope v3 delivers owned evidence one file at a time with name/MIME/byte-length/hash, origin/window/nonce/replay guards; admissions snapshot remains v2 with v1/v2 compatibility. Credit Transfer reuses stable evidence references. Session resources remain available through navigation and are disposed on reset. Payment proof is excluded from Profile evidence.
- Cyberjaya Health Declaration captures student-owned source declarations; the case-linked medical upload remains a clinician-completed report. No medical assessment or extra campus policy was invented.

## Verification

| Check | Result |
|---|---|
| Student unit tests | 780 passed in 98 files |
| Student build, lint, asset/token checks | Passed |
| Production exclusion | Passed; reviewer approval implementation removed from production output |
| Bundle budgets | Passed; eager JavaScript 196,578 gzip bytes against existing 192 KiB budget |
| Student Chromium | 276 applicable checks verified: full run 275 passed / 1 Services readiness timeout / 44 intentional skips; both desktop readiness checks passed after the fix |
| Student WebKit | 41 passed / 31 intentional skips |
| Applicant full gate | 57 unit tests in 10 files, 70 browser checks; build/lint/production exclusion passed |
| Cross-portal handoff | Seven passed: Chromium 375/768/1024/1280/1440 and WebKit phone/tablet |
| Source workflow/layout captures | Three Chromium widths passed; 12 new reviewed captures added, preserving historical provenance |
| Canonical/public catalogues | Both validate 143 captures |
| Independent contracts, fixtures, mirrors, links, pins and source ZIP | 846 checks, zero errors |
| OpenAPI | Valid; 14 unused-component warnings for documented components, including planned operations with no new hosted paths |
| Final diff whitespace | Passed |

The final gate uses the repository's existing CI budget (two workers, 15-second unit-test limit) and two browser workers. An initial concurrent-load unit timeout was rerun with that existing budget. Earlier browser failures were reconciled to the new graduation receipt behavior and exact navigation/readiness assertions. The final npm run check:all reached its full Chromium run but stopped at one pre-existing Services menu readiness race. The test now waits for the menu to advertise expansion before clicking; both desktop variants pass the focused rerun with every accessibility assertion retained. The complete WebKit component was run separately and passed. No product-code changes followed the passing unit/build/production checks; the browser fix changes test readiness only. No known required check remains unresolved. The final handoff waits for the phone drawer to finish closing. Assertions and product behavior were retained.

The impact audit's registry reminder is resolved by the typed request/award/leave/course descriptors, samples and relationships in canonical-registry, together with canonical graph validation/defaults and funding projections. The handoff reminder is resolved by the current handoff and this report.

## HTTP compatibility and remaining integration inputs

Existing HTTP methods and authentication are retained. Each new method is gated independently by the server's advertised support: submitModuleRegistrationRequest, getStudentDocumentDelivery, acknowledgeStudentDocumentReceipt and migrateLegacyFeedbackDraft. Unsupported methods reject without mock writes. OpenAPI components document planned inputs/responses and local behavior; hosted implementation is not asserted.

Hosted durable evidence delivery, authorized departmental review, official campus fee configuration/NMDS terms, official document templates/signatures, authentication/provisioning and physical-device testing remain unverified or campus/backend inputs. The source ZIP is retained privately in ignored reference material with its verified checksum; it is not a public/tracked archive. Two blank Cyberjaya health PDFs are separate source references for student undertakings and clinician completion.

The existing first-semester responsive overflow matches the original demo in all seven handoffs; this change does not redesign the shared shell or existing registration table. Existing shared contrast exclusions remain documented in the accessibility suites. Applicant retains its existing large-chunk build warning and browser-runner environment notices; Student's jsdom window.open notice is non-fatal and native-viewer behavior is covered in real browser checks.

## Review entry points

- [Approved workflow and source provenance](../student-workflows.md)
- [Online Forms](../online-forms.md)
- [Module Registration](../academic-module-registration.md)
- [Profile Documents](../profile-documents.md)
- [Graduation](../academic-graduation.md)
- [Finance](../finance.md)

## Browser-comment correction verification — 9 October 2026

Add/Drop/Credit Transfer course fields now use the released no-divider variant, 16px label spacing and shared dashed AddRowButton. Registration display labels capitalize Under review/Pending without changing stored enums. Transcript actions moved into the existing Study Plan overview summary footer; release rules and native viewing remain unchanged.

Applicant already requires Course Syllabi for transfer applicants. The existing mapper, document projection and bounded resource store preserve it. A focused regression proves the original owned PDF is present once in Student Documents, is available by row/evidence reference and satisfies Credit Transfer without another syllabus upload. It also preserves the immutable admissions snapshot. The legacy Rizal demo has no imported Applicant snapshot and must not invent admissions syllabi.

Verification: 46 focused unit/component/API checks passed; the final typed syllabus regression rerun passed all eight document-delivery checks. Six Chromium reviews covered phone/tablet/desktop presentation and existing reviewed form/native-document journeys; three WebKit journeys passed at the same widths. Build, lint, production exclusion and existing bundle budgets passed. Both catalogues validate 158 captures, including 15 additive review captures; historical capture provenance is retained. This follow-up changes presentation only, verifies existing evidence behavior and leaves contracts/API/fixtures and shared 0.6.2 unchanged. The earlier full regression gate remains recorded above; it was not rerun for these isolated presentation corrections. No commits, pushes or deployments.
