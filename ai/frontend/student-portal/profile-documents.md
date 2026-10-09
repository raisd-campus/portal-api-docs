# Profile Documents

Current source-form, departmental registration and document delivery rules: [8 October local workflow baseline](student-workflows.md). This newer baseline replaces earlier prototype-only statements about immediate registration, separate Accessibility requests and unavailable standard document delivery below.

## Current behaviour

Profile > Documents is a read-only frontend route at `/profile/documents`. It is the fifth Profile tab, after Portfolio and before Privacy & Security. The former top-level Documents navigation item is removed. `/documents` redirects to the new route with history replacement, so browser Back does not revisit the obsolete location.

Student Documents lists the selected student's passport photo and scan, every retained academic qualification's transcript/certificate/optional translation/grading scale, English-proficiency certificates, and student-specific university letters. Personal and Academic retain their existing file displays. The former University Documents section and its Student Handbook file have moved out of Profile; Student Handbook is now a catalogue entry under [University Policies](university-policies.md).

Student Documents uses a title-only `LinkedList` rather than a table. Each row has the document icon, title and decorative chevron; it opens an owned PDF/image in a new native browser tab or downloads an unsupported format. Rows do not show filenames, sources, View/Download controls, or document metadata because delivery is handled by the native browser viewer. There are no uploads, edits, deletions, filters, summary cards, university-document panel, or document-detail routes.

## Layout references

The existing main application shell, Profile Academic, Profile Resume, and Finance Invoices were inspected before implementation. The new tab keeps their established composition:

| Concern | Profile Academic | Profile Resume / Finance | Documents decision |
| --- | --- | --- | --- |
| Heading | Shared Profile heading | Shared Profile / Finance heading | Existing Profile `pageSectionTitleVariants()` heading |
| Root rhythm and width | Profile shell, 16px hierarchy | Same shell hierarchy | Reuse Profile shell and available content width |
| Tabs and sections | `TabbedPagePanel`, panel `ContentSection` | Same panel sections, reusable `LinkedList` | One Student Documents panel using title-only document rows |
| Loading / error / empty | Tab-local feedback inside Profile | Shared Skeleton / EmptyState and tab-local errors | Same shell, section-shaped loading, one empty collection, tab-local error |
| Navigation | URL-backed active Profile tab | Routed tab/sidebar activation and scroll reset | Fifth tab, nested sidebar entry, normal Back/Forward and scroll reset |

The heading, StudentSummaryCard, optional account-issue grid, and tab panel remain 16px apart. The section retains the shared 36px header row and 16px content gap. Its `LinkedList` rows use the shared raised surface, icon, title and chevron treatment. Long document titles wrap without changing the portal width. The shared list typography is documented in the Design System.

Browser verification exposed an existing TabbedPagePanel navigation defect: Radix mouse-down/focus selection and the active-tab click handler could dispatch duplicate route changes before the controlled value caught up. The shared panel now tracks each pointer gesture, selects a new tab once, and retains a single active-tab reset action. Keyboard activation is preserved. Focused component regressions cover deferred route updates; the published design system catalogue captures the panel treatment. Main-scroll reset also observes the router location key so reselecting the current sidebar destination returns to the top.

## Canonical records and API

`PortalApi.getDocumentsProfile()` represents `PortalApi.getDocumentsProfile (`POST /v1/portal/getDocumentsProfile`)`. Its Zod-validated `DocumentsProfileResponse` returns one `studentDocuments` array. Each `ProfileDocument` has a stable opaque `id`, `title`, exact `fileName`, and display `source`. The collection can be empty; IDs must be unique across the response. No URL, binary contents, invented file size, or issuance date is returned.

The mock adapter starts from the selected stable Student Profile ID:

- Passport and qualification evidence is projected directly from existing canonical file fields. It is never copied into library fixtures or screens. Null optional file fields are omitted. CAP-50 may reference the same selected-student metadata in an immutable Online Form evidence snapshot; a case-specific replacement remains attached only to that submission and never modifies this library.
- Canonical Student Document records own additional student-specific letters through `studentProfileId`. Existing student-specific enrolment-confirmation sample records are labelled **Offer Letter**, retaining their stored classification, IDs, filenames and owners. The label change does not make an enrolment-confirmation file satisfy an Immigration offer-letter evidence field. Offer Letter appears first; other documents remain alphabetically ordered by title and stable ID. Legacy records titled Enrolment Confirmation normalize to Offer Letter in the projection, without creating or replacing files.
- The University Document record and campus relationship are retired. Student Handbook belongs to the CAP-55 catalogue; its policy body or file remains outside the current release. An unknown student remains an error.
- Student Document records carry an ID, owning student ID, title, filename, and source department. Graph validation rejects unknown owners and duplicate library IDs.
- Projected IDs encode source kind, owning record ID, and file-field identity in the adapter. Consumers treat them as opaque. Reordering records or renaming a file does not change its identity. Identical filenames from different records remain distinct.
- Offer Letter is first and Eligibility Letter second; remaining documents sort by title using English comparison, then stable identity. Projection does not mutate canonical records, and each API response is independent.

`useDocumentsProfileQuery` uses the existing scenario-scoped Portal query key. Scenario replacement clears its cache with the other student queries. Documents has no mutation or invalidation workflow of its own because all contributing file metadata is read-only in this phase.

The Data Model Explorer includes the Student Document canonical table and its student ownership relationship, source-field endpoint usage, and Profile Document derived examples. Its student filter restricts letters to the selected student. The retired University Document entity and campus relationship are absent. The derived read-model catalogue remains an explicitly labelled reference sample, as for other derived models.

## Verification

Unit tests cover exact canonical filenames in both scenarios, stable identities after ordering/filename changes, duplicate filenames, optional evidence, unknown students, the empty collection, invalid owners/IDs/metadata, response isolation, explorer relationships, tab-local query states, scenario cache replacement, and absence of the retired University Document model.

Playwright covers the legacy replacement redirect, direct URLs, responsive sidebar/tab activation, Profile shell geometry, Back/Forward, scroll reset, title-only keyboard and native-viewer actions, scenario switching, loading/error feedback, long titles, the empty state, and absence of the University Documents panel and handbook file across the supported route matrix; existing detailed regression remains at 1280px and 1440px. The repository full quality gate remains required.

## Implementation references

- `src/contracts/documents-profile.ts`
- `src/contracts/portal-records.ts`
- `src/services/mock-documents-profile-api.ts`
- `src/services/portal-api.ts`
- `src/services/portal-queries.ts`
- `src/components/features/profile/documents-profile-content.tsx`
- `src/components/features/profile/profile-page.tsx`
- `src/features/profile/profile-routes.ts`
- `src/app/routes.ts`
- `src/app/router.tsx`
- `src/data/portal-sidebar.ts`
- `src/tests/documents-profile.test.tsx`
- `tests/e2e/documents-profile.spec.ts`

## Admissions evidence alignment — schema v4

The accepted admissions mapper adds only applicable non-academic evidence to Student Document records. Passport/photo and academic/English evidence remain on their owning records and are projected once into this library. Null optional English certificates and local passport scans are omitted. The complete evidence metadata remains available in the immutable admissions snapshot for provenance. Payment proof stays Finance-owned; application message attachments are not profile documents. Existing letters, translations, grading-scale evidence and title-only native-viewer presentation are preserved.

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

The review table has four ordered rows: Payment Proof (Bursary), Document Check (Quality Assurance), Confirm and Proceed with Enrolment (Applicant), and Prepare and Release Offer Letter (Registry). Each row derives its own Status and Update from verification/letter metadata. Document verification shows the released Eligibility filename; applicant confirmation records its date; Registry changes from awaiting applicant confirmation to preparing the Offer, then shows the released Offer filename. A completed row may be green while overall enrolment remains under review. This is presentation of existing guarded workflow state, with no API/schema changes.

Both confirmation popups and Student Documents use two equal-width letter actions with icons and spacing above them. **Preview Letter** opens a temporary PDF URL in a separate tab using the browser's PDF handling; **Download Letter** downloads the same PDF with its issued filename. There is no embedded preview popup or extra disclaimer below a viewer. The generated PDF itself retains its DEMO marking. Temporary resources retain their existing ownership/cleanup behavior. Hosted delivery support and physical-browser PDF handling remain distinct from the local mock checks.

## Browser review corrections — 9 October 2026

Accepted transfer applicants retain Course Syllabi as one owned Student Documents row with the original filename/provenance. The same resource is reused by Credit Transfer, not uploaded again. The regression validates original PDF bytes through both the document row and raw evidence reference. Legacy profiles without imported syllabi retain an honest missing-file state.
