# Portal API (backend agent knowledge)

**Code:** [`raisd-campus/portal-api`](https://github.com/raisd-campus/portal-api) (private; sibling checkout `~/src/raisd/portal-api`). Moved out of `control-plane/portal-api/` with history on 27 September 2026.<br>
**OpenAPI source of truth:** [`openapi.yaml`](../../../openapi.yaml) — stays in control-plane.<br>
**Public docs:** https://raisd-campus.github.io/portal-api-docs/ · Swagger UI: https://raisd-campus.github.io/portal-api-docs/openapi.html<br>
**Product contract:** [SDD-02](../../sdd/02-architecture-and-integration.md), [SDD-08](../../sdd/08-shared-platform.md).<br>
**Development plan:** [portal-api-development-plan.md](portal-api-development-plan.md). **Target deployment:** [portal-api-deployment.md](portal-api-deployment.md). **PoC requirements:** [portal-api-poc-requirements.md](portal-api-poc-requirements.md).

## Repository layout

| Location | Owns |
|---|---|
| `portal-api` repo | Service code, Dockerfile, CI, future `deploy/k3s/` manifests for its own Deployment, local working copies under `docs/` |
| `control-plane` repo | `openapi.yaml`, this knowledge base (canonical), SDD, campus configuration design, platform manifests (Postgres, evidence PVC, backups) |
| `portal-api-docs` repo | Public mirror of `openapi.yaml` + Swagger UI |

Knowledge changes land here first, then mirror into `portal-api/docs/` (see that repo's `docs/SOURCE.md`).

## Stage 1 behaviour (current)

- Bearer demo sessions and `POST /v1/portal/:method` for every student `PortalApi` method.
- Sessions still use the **student-portal mock engine** via `STUDENT_PORTAL_ROOT`.
- CMS writes are **stubbed** until CAP-53. Lesotho **read** mapping (Phase R1): [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md).
- Local Swagger: `http://127.0.0.1:8080/docs` when the service is running.
- Demo **flow response shapes** for Immigration, Graduation, Module Registration, Online Forms, and Finance are named OpenAPI components on those operations (still validated by student-portal Zod at runtime).
- Scenario switches over HTTP use `POST /v1/auth/scenario`; logout uses `POST /v1/auth/logout`.
- Staff milestone simulation stays on student-portal `/dev/admin-actions` (`runDevelopmentAction` is HTTP-blocked). Reserved Live staff method names are catalogued at `GET /v1/meta/staff-progression`.
- **LMS (Demo):** Materials, assignment metadata, and lecturer review are tagged `LMS` in OpenAPI. Catalogue of callable methods, Neon tables, CAP IDs, and deferred quiz/live-class/forum gaps: `GET /v1/meta/lms`. Not a Live LMS ([BASE-44](../../sdd/09-requirements-traceability.md)). Logical tables: [lms-schema.md](lms-schema.md).

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

## Rules for backend agents

1. Do not bypass the Portal API from a portal web.
2. Do not mark a CMS write complete without an acknowledgement path (when implementing Live CAP-53).
3. Keep OpenAPI in sync with handlers. Sync `openapi.yaml` to `portal-api-docs` when publishing.
4. Prefer Zod (or the established validator) at the boundary; stable opaque IDs; ISO 8601 timestamps.
5. Student-scoped tokens must not be reusable as staff tokens in the student shell.
6. File uploads for Live land in the durable evidence store — not only in-memory metadata.
7. A handler change and its `openapi.yaml` change are one change: open the control-plane PR alongside the portal-api PR.
8. Follow the phase order in the [development plan](portal-api-development-plan.md); do not ship Live writes before phase 4 identity and the phase 5 acknowledgement path.
9. Hosting follows [portal-api-deployment.md](portal-api-deployment.md) (k3s, SDD-12). Vercel + Neon is PoC-only ([requirements](portal-api-poc-requirements.md)).

## Frontend contract origin

The student portal defines the replaceable `PortalApi` surface (`src/services/portal-api.ts`, `src/contracts/`). Backend work should honour those method names and Zod shapes unless an explicit cross-repo contract change is agreed and documented here plus OpenAPI.

## Related knowledge

- Student frontend API rules: [../frontend/student-portal/AGENTS.md](../frontend/student-portal/AGENTS.md) (Data and API architecture section)
- Data model (frontend logical contract): [../frontend/student-portal/data-model.md](../frontend/student-portal/data-model.md)
- Existing Cyberjaya CMS inventory: [old-cms-cyberjaya.md](old-cms-cyberjaya.md)
- CAP-level old vs new comparison: [cms-feature-comparison.md](cms-feature-comparison.md)
- PoC deploy (Vercel SPA + API + Neon): [../architecture/vercel-neon-poc.md](../architecture/vercel-neon-poc.md)
- ERD / DFD HTML: [`docs/diagrams/`](../../diagrams/)

## Applicant mock and Student schema v4 (local, 5 October 2026)

Applicant now has a separate session-only ApplicantPortalApi and accepted-admissions exchange; it does not call this service's Student RPC allowlist. Local Student schema v4 adds aligned profile fields and immutable admissions provenance. Before updating the hosted Student engine, review the [handoff and automatic-reseed prerequisite](admissions-handoff.md). No backend deployment/migration or Applicant HTTP integration was performed. OpenAPI emergency-contact inputs now match the actual Student editable contract.
