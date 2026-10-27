# Portal API (backend agent knowledge)

## University Flows - 20 October 2026

The API owns versioned campus Admissions, immutable publication, pinned case requirements, scoped reviews/credits and final Student registration enforcement. Policies use additive PostgreSQL JSONB state or the documented atomic local file; applications/evidence retain their existing stores. Existing record schema 4, legacy cases, attendance and scheduling are preserved. Fresh SSO introspection enforces active Control plus flows.configure for configuration and active Admin plus campus/desk scope for reviews. See [University Flows](university-flows.md), generated contracts and canonical OpenAPI. No hosted migration/deployment is included.


**Code:** [`raisd-campus/portal-api`](https://github.com/raisd-campus/portal-api) (private; sibling checkout `~/src/raisd/portal-api`). Moved out of `control-plane/portal-api/` with history on 27 September 2026.<br>
**OpenAPI source of truth:** [`openapi.yaml`](https://github.com/raisd-campus/control-plane/blob/main/openapi.yaml) — stays in control-plane.<br>
**Public docs:** https://docs.raisd.co/ · Swagger UI: https://docs.raisd.co/openapi.html<br>
**Product contract:** [SDD-02](../../sdd/02-architecture-and-integration.md), [SDD-08](../../sdd/08-shared-platform.md).<br>
**Development plan:** [portal-api-development-plan.md](portal-api-development-plan.md). **Target deployment:** [portal-api-deployment.md](portal-api-deployment.md). **PoC requirements:** [portal-api-poc-requirements.md](portal-api-poc-requirements.md).

## Repository layout

| Location | Owns |
|---|---|
| `portal-api` repo | Service code, Dockerfile, CI, future `deploy/k3s/` manifests for its own Deployment, local working copies under `docs/` |
| `control-plane` repo | `openapi.yaml`, this knowledge base (canonical), SDD, campus configuration design, platform manifests (Postgres, evidence PVC, backups) |
| `portal-api-docs` repo | Public mirror of `openapi.yaml` + Swagger UI |

Knowledge changes land here first, then mirror into `portal-api/docs/` (see that repo's `docs/SOURCE.md`).

## Database schema

`npm run db:migrate` creates the current Demo schema on `DATABASE_URL` and records each step in `schema_migrations`. It creates record tables, reporting views, session tables, applicant state, University Flows policy storage, and the Demo admissions-artifact and community-chat tables. It does not insert fixture rows or drop existing data. A second run reapplies the idempotent statements and reports the schema as current. API startup still does not apply artifact or chat DDL. `npm run db:seed` and `npm run db:reset` remain the fixture commands. This is a local operator command, not a hosted rollout.

On 22 October 2026 an empty PostgreSQL 16 database on `127.0.0.1` was recreated with that command. The first run applied 9 migrations in 1 second (113 tables, 4 views, 118 indexes, no fixture rows). The second run reported the schema current. `db:seed` then loaded schema version 4: 3,214 rows in 99 collection tables (13 student profiles, 1 programme, 18 user accounts). Session, artifact, community-chat and University Flows tables remained. The database was dropped afterward. The seed notice `unversioned to 4` is the empty `portal_meta` created by migrate before the first fixture row. Report: [database recreation, 22 Oct](../../reports/database-recreation-2026-10-22/).

## Stage 1 behaviour (current)

- Bearer demo sessions and `POST /v1/portal/:method` for every student `PortalApi` method.
- Sessions still use the **student-portal mock engine** via `STUDENT_PORTAL_ROOT`.
- CMS writes are **stubbed** until CAP-53. Lesotho **read** mapping (Phase R1): [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md).
- Local Swagger: `http://127.0.0.1:8080/docs` when the service is running.
- Demo **flow response shapes** for Immigration, Graduation, Module Registration, Online Forms, and Finance are named OpenAPI components on those operations (still validated by student-portal Zod at runtime).
- Scenario switches over HTTP use `POST /v1/auth/scenario`; logout uses `POST /v1/auth/logout`.
- Staff milestone simulation stays on student-portal `/dev/admin-actions` (`runDevelopmentAction` is HTTP-blocked). Reserved Live staff method names are catalogued at `GET /v1/meta/staff-progression`.
- **LMS (Demo):** Materials, assignment metadata, and lecturer review are tagged `LMS` in OpenAPI. Catalogue of callable methods, Demo tables, CAP IDs, and deferred quiz/live-class/forum gaps: `GET /v1/meta/lms`. Not a Live LMS ([BASE-44](../../sdd/09-requirements-traceability.md)). Logical tables: [lms-schema.md](lms-schema.md).
- **SSO dual auth (Demo):** Portals may send a Raisd SSO access token to `POST /v1/auth/sso/exchange`. Portal API introspects against `SSO_BASE_URL` (default `https://sso.raisd.co`) and issues a Portal API session for the active role (`student`, `applicant`, `lecturer`, or `admin`). `admin` becomes a staff session: Bursary when that desk tag is present, otherwise Registry, including a campus Admin with no desk tags. `control` keeps the SSO token for [Control](../frontend/control-portal.md). Stub email/password scenario logins remain when `CMS_MODE=stub` (login identity is email; legacy scenarioId / short usernames still resolve).
- **Staff RPC authz:** `POST /v1/staff/:method` accepts only a staff session from an Admin exchange. A lecturer teaching session does not map to Registry and cannot list or act on payment or registration queues.
- **SSO auto-provision:** after successful `submitApplication` / `acceptApplicationEnrolment`, Portal API upserts the applicant email into SSO (`SSO_SERVICE_TOKEN` → `/v1/internal/people/upsert`) with `applicant` or `student`. Full RBAC: [admin-portal.md](../frontend/admin-portal.md); learner desk: Staff Registry.

```bash
cd ~/src/raisd/portal-api
npm install
npm start   # defaults: STUDENT_PORTAL_ROOT=../student-portal, OPENAPI_ROOT=../control-plane
npm run smoke   # health, login, one RPC call, /openapi.yaml
```

Point student-portal at it:

```bash
VITE_PORTAL_API_URL=http://127.0.0.1:8080 npm run dev
```

## Paired Community — local Demo candidate

[Shared Demo Community](community-chat.md) adds capability-gated Student/Lecturer directory/profile reads, paired chat and chunked artifact bytes. The additive store uses memory or Postgres without changing Student schema 4 or replacing service/per-student legacy stores. `DEMO_COMMUNITY_CHAT` defaults false. The Raisd demo API enables it after the `demo_community_chat` tables exist, and still rejects Live CMS mode.

## Rules for backend agents

1. Do not bypass the Portal API from a portal web.
2. Do not mark a CMS write complete without an acknowledgement path (when implementing Live CAP-53).
3. Keep OpenAPI in sync with handlers. Sync `openapi.yaml` to `portal-api-docs` when publishing.
4. Prefer Zod (or the established validator) at the boundary; stable opaque IDs; ISO 8601 timestamps.
5. Student-scoped tokens must not be reusable as staff tokens in the student shell.
6. File uploads for Live land in the durable evidence store — not only in-memory metadata.
7. A handler change and its `openapi.yaml` change are one change: open the control-plane PR alongside the portal-api PR.
8. Follow the phase order in the [development plan](portal-api-development-plan.md); do not ship Live writes before phase 4 identity and the phase 5 acknowledgement path.
9. Hosting follows [portal-api-deployment.md](portal-api-deployment.md) and [vps-topology.md](../architecture/vps-topology.md) (k3s, SDD-12).

## Frontend contract origin

The student portal defines the replaceable `PortalApi` surface (`src/services/portal-api.ts`, `src/contracts/`). Backend work should honour those method names and Zod shapes unless an explicit cross-repo contract change is agreed and documented here plus OpenAPI.

## Related knowledge

- Student frontend API rules: [../frontend/student-portal/AGENTS.md](../frontend/student-portal/AGENTS.md) (Data and API architecture section)
- Data model (frontend logical contract): [../frontend/student-portal/data-model.md](../frontend/student-portal/data-model.md)
- Existing Cyberjaya CMS inventory: [old-cms-cyberjaya.md](old-cms-cyberjaya.md)
- CAP-level old vs new comparison: [cms-feature-comparison.md](cms-feature-comparison.md)
- Current Demo topology: [../architecture/vps-topology.md](../architecture/vps-topology.md)
- ERD / DFD HTML: [`docs/diagrams/`](../../diagrams/)

## Applicant Demo HTTP and Student schema v4 (7 October 2026)

- **Student:** Hosted engine follows sibling `student-portal` `PORTAL_RECORD_SCHEMA_VERSION` **4**. On deploy, a schema mismatch reseeds Demo record tables (overlays/`student_portal_state` and `audit_events` kept). See [handoff](admissions-handoff.md).
- **Applicant:** Demo RPC is live at `POST /v1/auth/applicant/login` and `POST /v1/applicant/:method` for the ten `ApplicantPortalApi` methods (includes `confirmApplicationEligibility` + `acceptApplicationEnrolment`). Eligibility confirm does **not** auto-release Offer — Registry owns `releaseOffer`. Records persist in VPS Postgres `applicant_portal_state`; sessions in `poc_applicant_sessions`. Development reviewer actions stay out of the HTTP allowlist. Applicant portal (`https://apply.lesotho.raisd.co`) uses `createHttpApplicantPortalApi` when `VITE_PORTAL_API_URL` is set.
- **Staff (Demo, 13 Oct 2026):** `POST /v1/auth/staff/login` and `POST /v1/staff/{method}` with `listPaymentQueue`, `approvePayment` (alias `approvePaymentAndEnrol` — payment verify only), `verifyDocuments` (QA / Registry Demo stand-in), `releaseOffer` (Registry), `rejectPayment`. Sequence: Bursary payment → QA documents/Eligibility → applicant confirm → Registry Offer → applicant Accept Enrolment. Payment approval does **not** enrol. Sessions in `poc_staff_sessions`. Staff portal uses these when `VITE_PORTAL_API_URL` is set.
- CORS_ORIGIN must include Student, Applicant, **Staff**, **Control** and GitHub Pages Swagger origins. The Demo deployment appends only https://control.raisd.co to a nonempty configured list without replacing other origins; role/permission checks remain server-enforced.
- OpenAPI `0.4.2` documents Applicant routes and schemaVersion **4**.

## Applicant–Student synchronization — 12 October 2026

The 12 October local preparation supersedes earlier statements that original HTTP file delivery and applicant-specific continuation are wholly unimplemented. [Demo admissions resources](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/admissions-resources.md) defines the separate Demo artifact adapter, one-time authenticated continuation, capability gating, ownership and local verification. It is **not deployed**; Live storage/CMS provisioning and hosted migration remain pending. Shared UI remains 0.6.2; admissions v2, DEV transport v3 and Student schema 4 are preserved. The existing Bursary shortcut remains On hold.


## Read-only Lecturer module details - 13 October 2026

`POST /v1/lecturer/getModuleDetails` accepts only `{ moduleOfferingId }`, authenticates the Lecturer bearer session and projects the existing RecordStore without writes. Canonical Community authorization supplies active Lecturer role/campus, exact teaching assignment and registered/active-enrolment eligibility. Unknown/unassigned offerings return 404, missing/non-Lecturer sessions 401, revoked accounts/roles 403, invalid/spoofed request bodies 400 and unavailable records 503.

The result carries `currentPersonId`, `moduleOfferingId`, campus `timeZone`, `deliveryMode`, `students` and `timetable`. Each roster row contains registration/profile identifiers, canonical student number, name/avatar and `semesterNumber` from its exact registration Study Period. Class Schedule rows contain weekday, original local times, venue and inclusive effective dates. Multiple registration contexts retain their own rows; no Year rule is added. Response shapes are documented in canonical OpenAPI `LecturerModuleDetails`; no Student schema, shared Community envelope or storage table changes are needed.

Lecturer login advertises `getModuleDetails` in `supportedMethods`; `/v1/meta` advertises `capabilities.lecturerModuleDetailsVersion = 1`. Local checks: `npm run test:lecturer-modules` (20 isolated canonical/HTTP checks), `npm run test:community` (46 memory compatibility checks) and `npm run typecheck:local`. The owner-approved API 8087 restart reset its in-memory Demo state; this is local activation, not deployment or Live CMS integration.


## Reusable Materials connected memory Demo — 14 October 2026

The opt-in DEMO_REUSABLE_MATERIALS=true capability adds process-memory plan drafts/publication, Classrooms attendance/submissions, immutable class bindings/corrections and bounded original file upload/download. It rejects Live CMS only (Demo stub may use Postgres for the canonical graph); mutable overlays never call records.save and reset on API restart. Existing Student Materials/assignment methods resolve the same class content. GET /v1/meta/materials, GET /v1/meta/classrooms and POST /v1/materials|classrooms/{method} are documented in OpenAPI. Hosted Demo enables the flag via gitops. See [reusable-materials.md](reusable-materials.md) and [classrooms.md](classrooms.md).


## Read-only Materials with teaching-week release — 14 October 2026

The owner revised Materials to read-only Lecturer access. Version-1 metadata advertises lecturerReadOnly and teaching-week-start release. Only getMaterials/fileChunk are public Materials operations; all Lecturer writes and legacy publication are forbidden, private drafts/plan files are excluded, and Student uses server-time week-start release. Internal version/class-binding machinery stays for future admin ownership, without an admin UI/API or migration. See [current contract](reusable-materials.md).


## Classrooms source increment — 15 October 2026

The approved shared memory Classrooms implementation adds exact-offering attendance, private delivery logs, original assignment submissions and draft/published feedback. Canonical persisted records/schema version are unchanged. Materials stays read-only. The local Demo is verified and activated on API 8087 / Lecturer 5173 / Student 5175; Lecturer aggregate verification remains held. No migration, hosted write or deployment is included. See [Classrooms](classrooms.md).
