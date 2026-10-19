# Admin desks — agent knowledge

**Repository:** [`raisd-campus/lecturer-portal`](https://github.com/raisd-campus/lecturer-portal) (`src/staff-admin`)
**SDD:** [SDD-07](../../sdd/07-admin-staff-cms.md)
**Campus agents:** [../AGENTS.md](../AGENTS.md)
**Demo host:** https://staff.lesotho.raisd.co/admin (other campuses: `staff.{slug}.raisd.co/admin`). `admin.{slug}.raisd.co` 301-redirects here.

## Status

Admin (Registry, Faculty, Bursary, QA) is the **Admin** menu inside the staff portal. It renders only when the active SSO role is `admin`. A Staff or Lecturer sign-in does not show these items and is redirected to `/`. Sign-in is Raisd SSO. An `admin` role lands on `/admin`.

| Route | Purpose | Who sees it |
|---|---|---|
| `/admin` | Overview KPIs | Campus Admin |
| `/admin/applicants` | Applicant tracker | Campus Admin |
| `/admin/students` | Student tracker | Campus Admin |
| `/admin/payments` | Payment verification | Campus Admin |
| `/admin/registrations` | Registrations | Campus Admin |
| `/admin/access` | Student, staff, and lecturer access | Campus Admin (`sso.manage_learners`) |

Access presets are Student, Staff, and Lecturer. The register heading is **Register student**, **Register staff**, or **Register lecturer** for the preset in use. Staff and Lecturer both store `roleKey` `lecturer`; Staff adds dashboard, directory, and community permissions, and may add bursary, registry, qa, or faculty desks. Role grants use the hosted campus (`campus-{slug}` from `staff.{slug}.raisd.co`), not a hard-coded Lesotho id. Payments and registrations call Portal API with the Admin staff session only. Control still grants Admin only. Rules: [sso.md](../backend/sso.md).

**Hosted walkthroughs:**

1. Applicant submits with fee proof → Staff Bursary **Approve payment** → Staff QA/Registry **Verify documents** → Applicant **Confirm Eligibility** → Staff Registry **Release Offer Letter** → Applicant **Accept Enrolment** → continue in Student Portal. Evidence: [E2E applicant enrol](../../reports/e2e-applicant-staff-enrol-2026-10-11/) (re-captured 13 Oct 2026).
2. Alya confirms Semester 1 modules → Staff Bursary **Approve Bursary clearance** → Registry **Approve Faculty → enrol units** → Student Modules lists registered units with lecturers. Evidence: [E2E student modules](../../reports/e2e-student-module-enrol-2026-10-11/).

Demo ≠ Live. Offline fallback still uses `sessionStorage`. Does not write CMS.

## Agent rules

1. Implement against SDD-07 and campus [AGENTS.md](../AGENTS.md).
2. **Build only verified gaps** — if the existing CMS already runs the workflow, do not duplicate it in admin-portal without an explicit decision.
3. Talk only to the Portal API when Live endpoints exist. Staff tokens must not work inside student shells.
4. Student-portal “Admin Actions” are **development-only mock commands**, not production staff UI.
5. Install a released `@raisd-campus/design-system` version (currently **0.6.2**). Follow [component ownership and setup](../design/component-library.md) instead of copying student portal UI.
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
