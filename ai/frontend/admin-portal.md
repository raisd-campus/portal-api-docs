# Admin desks — agent knowledge

## Academic administration — 29 October 2026

The owner approved persistent local Faculty, Programme and Modules administration in the active Staff application. Academic uses the shared 0.20.0 tiered menu and existing Admin record patterns. Programme curriculum publication requires an independent reviewer through the new Academic Study Plan University Flow. New Applicant choices and enrolments consume approved catalogue snapshots; Staff assigns streams on exact enrolments. This is an explicit local scope expansion, with existing CMS and hosted state untouched. Normative contract: [Academic catalogue](../backend/academic-catalogue.md).


Display terminology is **Study Plan** throughout Academic tabs, actions, breadcrumbs, review flow and feedback. Existing routes, flow/step IDs, API/schema keys, saved record names and recorded audit values are preserved. The built-in Academic Curriculum configuration name has a display-only Academic Study Plan alias; loading it does not change the stored name or create unsaved edits.

## Shared header breadcrumbs — 27 October 2026

Staff pins shared 0.18.4 and uses the shared structured header. Applicants → Applicant Details has a router parent link back to the existing campus-scoped queue. Other top-level desks remain current-page roots. Header overflow uses the shared responsive menu; campus permissions, record guards, query state and sidebar navigation are unchanged.

## Compact Admin record lists - 0.18.3

Staff now pins shared 0.18.5. Compact AdminTable record-list cells stay side by side and share the available width. Entry names/links are left-aligned and status text is right-aligned with sentence wrapping. Summary-column statuses in both summary and list views retain their semantic color without pill background, border or padding. Badges elsewhere are unchanged. Directory tables retain their column layout. Staff and Control adopt the same shared patch without local CSS overrides, workflow changes or data changes.

## Admin summary scrolling - 0.11.1

Staff uses the shared full-height sticky desktop summary column. The summary/list switch stays visible while only its content scrolls, without transparent effects. Narrow layouts retain a compact panel above the form. No review controls, data or workflow behavior change.

## Applicants status tabs and pills — 22 October 2026

The status tabs are ordered Pending Review, Approved, then All, using the supplied status order and shared quick-scope allPosition="last". Ordering does not change the selected filter. The directory, compact picker and summary all compose the existing shared Badge: warning/amber for pending-review, success/green for approved or accepted, destructive/red for action-required, and secondary/neutral for draft or unknown states. Labels remain visible alongside color; no custom pill styling is introduced.

## Applicants Step column — 22 October 2026

The Staff Applicants directory includes a searchable, sortable and filterable Step column between Programme and Status. It displays the first unfinished applicable row from the API decision.progress collection, preserving the pinned Control policy label. If every returned step is complete, it displays the API-provided completion status; absent progress displays an em dash. No workflow state is inferred from the application status or changed by this column.

## API-backed Admissions - 20 October 2026

The deployed Staff repository remains `lecturer-portal`; the retired standalone Admin repository is unchanged. Its Admin Applicants/Payments/Registrations now compose the shared, campus-scoped Portal API admissions queue and policy evaluator. Registry, QA, Bursary, Faculty, IO and SSD actions require explicitly assigned desks; policy settings never expand access. Module reviews require an explicit reason and authorised payment/arrangement basis. See [University Flows](../backend/university-flows.md). Earlier tracker descriptions are historical.


**Repository:** [`raisd-campus/lecturer-portal`](https://github.com/raisd-campus/lecturer-portal) (`src/staff-admin`)
**SDD:** [SDD-07](../../sdd/07-admin-staff-cms.md)
**Campus agents:** [../AGENTS.md](../AGENTS.md)
**Demo host:** https://staff.lesotho.raisd.co/admin (other campuses: `staff.{slug}.raisd.co/admin`). `admin.{slug}.raisd.co` 301-redirects here.  
**Lesotho user guide:** [lesotho-user-guide.md](lesotho-user-guide.md) · [Guidance HTML](../../diagrams/guidance/index.html)

## Status

Owner-requested 0.10.4 UI refinement: summary passport photo, centered fields, natural height, sticky desktop scrolling/fades and standard title sizing. The Staff review/reload footer buttons are temporarily omitted; summary/list navigation and read-only evidence/history remain. See the current Staff summary-presentation note.

22 October 2026: Staff uses shared AdminTable and AdminRecordWorkspace 0.10.3. Rows open `/admin/applicants/:applicationId` read-only with summary/virtual-list switching, original document Preview/Download, issued letters and review history. API-authorized QA actions request corrections or verify eligibility and release its letter, with explicit confirmation, revision/Demo-generation checks, stable retry IDs and unsaved-review guards. Submitted fields remain immutable. See [Staff record review](lecturer-portal.md#applicant-record-review--22-october-2026) for behavior and local verification. No create/delete or hosted deployment is included.

Admin (Registry, Faculty, Bursary, QA) is the **Admin** menu inside the staff portal. It renders only when the active SSO role is `admin`. A Staff or Lecturer sign-in does not show these items and is redirected to `/`. Sign-in is Raisd SSO. An `admin` role lands on its first permitted Admin module. Explicit `admin.*` permissions gate menus; review actions also require the active campus and assigned desk.

| Route | Purpose | Who sees it |
|---|---|---|
| `/admin` | Redirect to first permitted Admin module | Campus Admin |
| `/admin/applicants/:applicationId?` | API-backed admissions queue and QA review | Admin with Applicants module |
| `/admin/students` | Student tracker | Campus Admin |
| `/admin/payments` | Payment verification | Campus Admin |
| `/admin/registrations` | Registrations | Campus Admin |
| `/admin/access` | Student, staff, and lecturer access | Campus Admin (`sso.manage_learners`) |

Access presets are **Applicant** (fixed `portal.applicant`), Student, Staff, and Lecturer — assigned as **fixed** permission sets via `/v1/access/people*` (no module or desk checkboxes). The register heading follows the preset. Student uses lean Academic, Fees and Support; Staff has Directory; Lecturer has Classrooms sub-modules and Community. The same preset can be assigned to **many users** (per-row Apply, or multi-select **Apply to selected**). Staff and Lecturer both store `roleKey` `lecturer`; Community belongs to Lecturer. Role grants use the hosted campus (`campus-{slug}` from `staff.{slug}.raisd.co`). The **Applicants** page reads the shared campus-scoped Portal API admissions queue; the SSO Applicant role is a separate access grant. Payments and registrations call Portal API with the Admin staff session only. **Control** owns custom role matrices and Admin review desks (`control.raisd.co`); Campus Admin Access only assigns the named presets. Rules: [sso.md](../backend/sso.md). Hierarchy: [access-module-hierarchy.md](../backend/access-module-hierarchy.md). List review: [applicant-list-review.md](../backend/applicant-list-review.md). Joint demo: [joint-granular-access-2026-10-20](../../reports/joint-granular-access-2026-10-20/).

**Historical hosted walkthroughs (legacy cases; new-policy cases follow the eligibility-first guide above):**

1. Applicant submits with fee proof → Staff Bursary **Approve payment** → Staff QA/Registry **Verify documents** → Applicant **Confirm Eligibility** → Staff Registry **Release Offer Letter** → Applicant **Accept Enrolment** → continue in Student Portal. Evidence: [E2E applicant enrol](../../reports/e2e-applicant-staff-enrol-2026-10-11/) (re-captured 13 Oct 2026).
2. Alya confirms Semester 1 modules → Staff Bursary **Approve Bursary clearance** → Registry **Approve Faculty → enrol units** → Student Modules lists registered units with lecturers. Evidence: [E2E student modules](../../reports/e2e-student-module-enrol-2026-10-11/).

Demo ≠ Live. Offline fallback still uses `sessionStorage`. Does not write CMS.

## Agent rules

1. Implement against SDD-07, campus [AGENTS.md](../AGENTS.md), and [website-ai-guidance.md](../website-ai-guidance.md) (should / should not).
2. **Build only verified gaps** — if the existing CMS already runs the workflow, do not duplicate it in admin-portal without an explicit decision.
3. Talk only to the Portal API when Live endpoints exist. Staff tokens must not work inside student shells.
4. Student-portal “Admin Actions” are **development-only mock commands**, not production staff UI.
5. Install a released `@raisd-campus/design-system` version (Staff pin **0.26.0** for `AdminTable` and `AdminRecordWorkspace`; other portal pins are unchanged by this adoption). Existing and future Admin pages (including Access) compose shared package patterns (`AdminTable`, `DetailSectionCard`, `DetailField`, `DataTable`, `SummaryCard`, …). Follow [component ownership and setup](../design/component-library.md) — do not invent local `staff-panel` cards or copy student portal UI.

6. **Componentize desks** — follow [ai-ui-guidance.md](../design/ai-ui-guidance.md): polished reference layouts + map list/record/flow surfaces to existing DS families (`AdminTable` / `AdminRecordFlow` when adopting, `PagePanelLayout`, etc.). Reuse one composition across sibling Admin routes; do not invent a unique layout per menu item. Wireframe captures: [Lesotho Demo desks](../../diagrams/old-cms-lesotho/wireframes/).
7. **Navigation IA** — Staff Admin uses `staff-admin/lib/admin-nav.ts`. Desktop primary = group hubs; sub-side = sibling desks. Do not restack AdmissionsWorkspace on Payments or Registrations. Review notes: [2026-10-30-generated-pages-nav-workflow-review.md](../design/2026-10-30-generated-pages-nav-workflow-review.md).
8. When behaviour changes, update this file and [../MANIFEST.yaml](../MANIFEST.yaml).

## Field standard

Use released shared `Input`, `DropdownSelect` and `DatePicker` controls at 36px height, 14px text and 20px line height across all views and pointer modes. Keep textareas multiline and preserve the geometry of uploads, checkboxes and radios. Follow the [shared component guide](../design/component-library.md#standard-field-sizing); do not implement portal-local sizing overrides.

## Local

```sh
cd ~/src/raisd/admin-portal
npm install   # needs GitHub Packages token for @raisd-campus/design-system
npm run dev
npm run check
npm run build:vercel   # then vercel deploy --prebuilt --prod
```

### Applicant-owned continuation preparation — 12 October 2026

The historical hosted walkthrough above describes the deployed shared-Alya shortcut. The prepared Portal API continuation instead maps each accepted applicant idempotently to an isolated owned Student account/enrolment and their admissions evidence. It requires the advertised resource capability and an authenticated one-time grant. This correction is not deployed; the separate Bursary automatic-admissions shortcut remains On hold. Staff UI redesign is outside this preparation.

## Upstream integration verification — 16 October 2026

The current Classrooms/Materials source publication integrates upstream SSO/email
login with explicit Demo identity binding and a single StrictMode code exchange.
See the [campus integration receipt](student-portal/audits/2026-10-16-campus-integration-publication.md)
for per-repository gates, canonical mirrors and Jenkins/Argo delivery boundaries.
No manual hosted rollout or local user-service reset is included.

## Shared admissions pending action — 22 October 2026

Admin and Applicant use the same Control-owned API current status. After release: **Awaiting Applicant Confirmation**, step **Confirm Eligibility**, next actor **Applicant**. After confirmation: **Awaiting Bursary Review**, step **Registration Fee**. **Eligibility Letter Released** stays on completed progress/history; it is not the current queue status. Status scopes, table pills and summary use this shared pending action with semantic Badge tones. See [University Flows](../backend/university-flows.md).


0.18.2 verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Six Staff Chromium/WebKit cases at 375/768/1440px verify side-by-side columns, wrapped long pills, right-aligned text, contained scrolling and accessibility; two Control summary/list cases passed. Staff adds a screen-reader-only details heading so hiding the summary does not skip heading levels. All 293 installed package files in each portal match the verified registry archive. Three refreshed list captures and both catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


0.18.3 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Eight focused Chromium/WebKit portal cases verify left-aligned entry names, right-aligned wrapping statuses, transparent/unpadded summary/list statuses, selected navigation and accessibility. All 293 installed package files in each portal match the verified registry archive. Six affected captures and both 250-capture catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


Cross-portal breadcrumb verification (0.18.4): shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff/Lecturer lint, 94 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Applicant lint, three focused header unit cases, type/production build and production-exclusion check passed (its existing unused-variable warning remains). Student lint, 15 focused breadcrumb/route unit cases, type/production build and production-exclusion checks passed. Student bundle budgets passed unchanged: eager JavaScript 194164 gzip bytes against 196608; largest chunk 373077 bytes.

All 25 focused Chromium/WebKit portal cases passed: Applicant four, Student five (1280/1440 Chromium and phone/tablet/desktop WebKit), Staff six, Lecturer four and Control six. Coverage includes parent navigation, selected programme/semester scope, mobile overflow, keyboard/Escape, unsaved application/flow guards and unavailable teaching details. Test-only selectors were scoped to the header and menu dismissal was awaited; unrelated inner breadcrumbs remain intact. All 296 installed files in each of four portals match the verified 0.18.4 registry archive. Nine affected captures and both 253-capture catalogue mirrors validate. Focused portal checks were used under the owner-approved fast workflow; no full Student/Applicant regression-suite claim is made.

Only Applicant, Student, Staff and Control frontends restarted. APIs, SSO, Keychain, Docker, identities, applications, drafts and policies were not reset or migrated. No hosted deployment, commit or push occurred.


Shared 0.18.5 mutes the active AdminTable pagination page through the existing secondary Button variant. Page labels, keyboard/focus, disabled states and current-page semantics are unchanged. Staff and Control adopt the same patch without portal CSS overrides or data/workflow changes.
