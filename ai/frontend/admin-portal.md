# Admin desks — agent knowledge

## API-backed Admissions - 20 October 2026

The deployed Staff repository remains `lecturer-portal`; the retired standalone Admin repository is unchanged. Its Admin Applicants/Payments/Registrations now compose the shared, campus-scoped Portal API admissions queue and policy evaluator. Registry, QA, Bursary, Faculty, IO and SSD actions require explicitly assigned desks; policy settings never expand access. Module reviews require an explicit reason and authorised payment/arrangement basis. See [University Flows](../backend/university-flows.md). Earlier tracker descriptions are historical.


**Repository:** [`raisd-campus/lecturer-portal`](https://github.com/raisd-campus/lecturer-portal) (`src/staff-admin`)
**SDD:** [SDD-07](../../sdd/07-admin-staff-cms.md)
**Campus agents:** [../AGENTS.md](../AGENTS.md)
**Demo host:** https://staff.lesotho.raisd.co/admin (other campuses: `staff.{slug}.raisd.co/admin`). `admin.{slug}.raisd.co` 301-redirects here.

## Status

Admin (Registry, Faculty, Bursary, QA) is the **Admin** menu inside the staff portal. It renders only when the active SSO role is `admin`. A Staff or Lecturer sign-in does not show these items and is redirected to `/`. Sign-in is Raisd SSO. An `admin` role lands on its first permitted Admin module. Explicit `admin.*` permissions gate menus; review actions also require the active campus and assigned desk.

| Route | Purpose | Who sees it |
|---|---|---|
| `/admin` | Overview KPIs | Campus Admin |
| `/admin/applicants` | API-backed admissions queue | Admin with Applicants module |
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

1. Implement against SDD-07 and campus [AGENTS.md](../AGENTS.md).
2. **Build only verified gaps** — if the existing CMS already runs the workflow, do not duplicate it in admin-portal without an explicit decision.
3. Talk only to the Portal API when Live endpoints exist. Staff tokens must not work inside student shells.
4. Student-portal “Admin Actions” are **development-only mock commands**, not production staff UI.
5. Install a released `@raisd-campus/design-system` version (lecturer-portal pin **0.8.0**; Control uses **0.9.1**). Existing and future Admin pages (including Access) compose shared package patterns (`DetailSectionCard`, `DetailField`, `DataTable`, `SummaryCard`, …). Follow [component ownership and setup](../design/component-library.md) — do not invent local `staff-panel` cards or copy student portal UI.
6. When behaviour changes, update this file and [../MANIFEST.yaml](../MANIFEST.yaml).

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
