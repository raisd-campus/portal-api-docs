# Staff portal — agent knowledge

**Repository:** [`raisd-campus/staff-portal`](https://github.com/raisd-campus/staff-portal)  
**SDD:** [SDD-07](../../sdd/07-admin-staff-cms.md)  
**Campus agents:** [../AGENTS.md](../AGENTS.md)
**Demo host:** https://staff.lesotho.raisd.co (other campuses: `staff.{slug}.raisd.co`)

## Status

**Demo shell started 11 Oct 2026** (Working Group weekly 10 Oct action). Limkokwing logo + design-system theme. Hosted Demo signs in via `POST /v1/auth/staff/login` and loads the applicant payment queue from Portal API.

| Route | Purpose |
|---|---|
| `/sign-in` | Email/password Demo login (`registry@raisd.demo` / `registry2026`, `bursary@raisd.demo` / `bursary2026`) |
| `/` | Overview KPIs (local seed KPIs when offline) |
| `/applicants` | Applicant status tracker (local seed) |
| `/students` | Student status tracker (local seed) |
| `/payments` | **Hosted:** Admissions desk — Bursary **Approve payment** → QA **Verify documents** → (applicant confirms) → Registry **Release Offer**; Reject proof. Does **not** auto-enrol. **Offline:** session seed desk |
| `/registrations` | **Hosted:** Portal API module-registration queue — Bursary clearance → Registry (Faculty stand-in) enrols units |

**Hosted walkthroughs:**

1. Applicant submits with fee proof → Staff Bursary **Approve payment** → Staff QA/Registry **Verify documents** → Applicant **Confirm Eligibility** → Staff Registry **Release Offer Letter** → Applicant **Accept Enrolment** → continue in Student Portal. Evidence: [E2E applicant enrol](../../reports/e2e-applicant-staff-enrol-2026-10-11/) (re-captured 13 Oct 2026).
2. Alya confirms Semester 1 modules → Staff Bursary **Approve Bursary clearance** → Registry **Approve Faculty → enrol units** → Student Modules lists registered units with lecturers. Evidence: [E2E student modules](../../reports/e2e-student-module-enrol-2026-10-11/).

Demo ≠ Live. Offline fallback still uses `sessionStorage`. Does not write CMS.

## Agent rules

1. Implement against SDD-07 and campus [AGENTS.md](../AGENTS.md).
2. **Build only verified gaps** — if the existing CMS already runs the workflow, do not duplicate it in staff-portal without an explicit decision.
3. Talk only to the Portal API when Live endpoints exist. Staff tokens must not work inside student shells.
4. Student-portal “Admin Actions” are **development-only mock commands**, not production staff UI.
5. Install a released `@raisd-campus/design-system` version (currently **0.6.2**). Follow [component ownership and setup](../design/component-library.md) instead of copying student portal UI.
6. When behaviour changes, update this file and [../MANIFEST.yaml](../MANIFEST.yaml).

## Field standard

Use released shared `Input`, `DropdownSelect` and `DatePicker` controls at 36px height, 14px text and 20px line height across all views and pointer modes. Keep textareas multiline and preserve the geometry of uploads, checkboxes and radios. Follow the [shared component guide](../design/component-library.md#standard-field-sizing); do not implement portal-local sizing overrides.

## Local

```sh
cd ~/src/raisd/staff-portal
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
