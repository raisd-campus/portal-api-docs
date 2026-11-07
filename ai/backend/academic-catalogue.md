# Academic catalogue and study plan approval

Display terminology is **Study Plan** throughout Academic tabs, actions, breadcrumbs, review flow and feedback. Existing routes, flow/step IDs, API/schema keys, saved record names and recorded audit values are preserved. The built-in Academic Curriculum configuration name has a display-only Academic Study Plan alias; loading it does not change the stored name or create unsaved edits.

Owner-approved local delivery, 29 October 2026. The active Staff application is `lecturer-portal`; the retired `staff-portal` checkout is not a delivery target. This extends the local persistent Demo. It does not replace the existing CMS or activate hosted operational writes.

## Staff ownership and presentation

Academic has exactly three navigation children: Faculty, Programme and Modules. The routes are `/admin/academic/faculty`, `/admin/academic/programmes` and `/admin/academic/modules`. Staff consumes shared tiered navigation from design-system 0.20.0. Direct links and menus require the corresponding `admin.academic.faculty`, `admin.academic.programmes` or `admin.academic.modules` permission. Shared AdminTable, record workspace, section, field, panel, popup and action patterns own presentation.

Faculty Groups are campus reference records. Faculties retain code, name, short name, group and status. Programmes retain Faculty ownership, classification, duration, accreditations and an explicit default published curriculum version. Modules can be reused by multiple Programme curricula within their owning campus. Archive/status changes preserve referenced records and audit history. Module Lecturers and Enrolments views are read-only projections of actual teaching and registration records.

## Persistence and contracts

`/v1/staff/academic` owns authenticated campus-scoped catalogue reads and mutations. PostgreSQL stores the catalogue extensions, curriculum snapshots, approval cases, request receipts and staff-attributed before/after audit. Writes use expected revisions and stable request identifiers; retries with another body fail. Publication commits the immutable catalogue version and canonical Programme Version/curriculum records atomically. A read or retry never advances a case.

Schema 5 adds Programme Streams and optional stream membership/selection fields. Run the explicit additive v4-to-v5 migration through `npm run local:migrate` in control-plane: it takes a private database backup and preserves populated IDs, epoch, enrolments, results, admissions, evidence and policy history. Startup must refuse an unsupported populated version rather than reseed it. Existing catalogue identities import idempotently; ambiguous ownership requires reconciliation, with data intact.

**Hosted Demo (Lesotho `api.lesotho.raisd.co`), 5 Nov 2026:** CMS standup showed applicants failing `getStudyCatalogue` with *Apply the explicit Academic v4 to v5 migration…* while `/v1/meta` already advertised schemaVersion 5 from code. Hosted `portal_meta.schema_version` was still **4** (revision 13, 99 collections; no `programme_streams` / `schema_migrations`). After a private `pg_dump` to `control-plane/.local/backups/portal-api-hosted-v4-before-v5-2026-11-05T19-24-53Z.dump`, operator applied portal-api `npm run db:migrate` against the hosted database (port-forward). Result: schema **5**, revision **14**, 100 collections including `programmeStreams`, empty `programme_streams` (legacy = common), 13 profiles / 13 enrolments preserved, curriculum `streamIds` and enrolment `selectedStreamIds` backfilled to `[]`. Applicant `getStudyCatalogue` returned 200 afterward. This does not claim Lesotho programme coverage or Live CMS writes.

## Academic Study Plan University Flow

Control owns flow ID `academic-curriculum`, its campus application, immutable policy versions and current eligible reviewer-role bindings. There is one mandatory Study Plan Review step, separate from Admissions and its Local/International cohorts. Reviewer assignment does not grant module access.

Staff authors save a draft and submit its exact revision. The submitted snapshot and pinned flow version are immutable. A currently authorized assigned reviewer must be a different person from every draft editor and the submitter; switching roles cannot bypass independence. The reviewer can request changes with a reason or Approve and publish. Publication never moves an existing student or submitted application to the new version. SSO retains Admissions reviewer keys and supports a separately namespaced Academic target.

The first publication initializes a Programme's default curriculum. Later publications preserve that default until Staff explicitly selects another published version. New curricula collect their effective dates, semester and credit rules, graduation CGPA, attendance threshold and semester calendar explicitly. No policy is copied from an unrelated Programme.

## Connected applications and streams

Applicant choices remain Programme-only and retain the portal's three preferences. Active campus programmes with an approved, effective default version and configured semester calendar supply the connected catalogue. Intake enrolment targets and sponsored counts are planning information, not programme availability gates. Submission pins the exact academic selection and display catalogue; letters, requirements and acceptance retain those snapshots.

The new acceptance context and handoff version 3 coexist with the existing Demo contracts. New SSO applicants use person-and-campus ownership. Secure conversion creates the accepted student's identity/profile, exact Programme Enrolment, configured Study Periods and empty owned accounts. It does not clone another student's curriculum, charges, results, registrations, teaching assignments or schedules.

One published structure maps to one immutable canonical Programme Version. Programme Streams belong to that version. A curriculum placement can name multiple `streamIds`; absent/empty membership means common. An exact Programme Enrolment has `selectedStreamIds`; absent/empty selection means common-only. Applicable requirements are the deduplicated union of common placements and those matching any selected stream. Registration, Study Plan, completion and current receiving-credit assessments use the same selector. Programme graduation-credit thresholds remain distinct from the selected curriculum-credit total.

Staff Students provides Change Academic Streams for the exact API enrolment, requiring Student and Programme administration permissions. A stream must belong to the enrolled version. Reassignment affects future choices and does not delete or invalidate historical registrations, results, fees or credits. Legacy curriculum rows migrate as common, so existing requirements are unchanged.

## Delivery boundaries

The shared package release is authorized independently of hosted application deployment. Preserve dirty worktrees and local data; do not pull/reset, commit, push or deploy applications as part of this delivery. Restart only changed local services. Verify API persistence, authorization and migration separately from browser presentation and production readiness.

## Programme semester tuition

Staff Programme records include a Fees tab using the existing read/edit/save/unsaved guard. The selected exact published Programme Version has explicit Local/International semester totals in the campus Finance currency. Saving uses the existing academic transaction, expected Fee Plan revision, request IDs and before/after audit; partial confirmed saves remain known on retry. Empty totals are unconfigured, not zero or waived. Admissions uses semester 1 and pins the resolved Fee Plan revision; editing programme fees never silently updates existing Admissions charges. Existing module Fee Items, invoice calculations and study-plan publication remain independent.
