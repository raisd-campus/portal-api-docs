# Repository map

Organization: [raisd-campus](https://github.com/raisd-campus).  
Expected local root: `~/src/raisd/` (siblings). Machine list also lives in [`repositories.yaml`](../../../repositories.yaml) at the control-plane root.

| Repository | Local path | Role | Primary SDD | AI knowledge |
|---|---|---|---|---|
| [`control-plane`](https://github.com/raisd-campus/control-plane) | `~/src/raisd/control-plane` | Campus config, identity design, Portal API contract (`openapi.yaml`), SDD, **AI knowledge base** | SDD-02, SDD-08, SDD-12 | [`docs/ai/`](../) |
| [`portal-api`](https://github.com/raisd-campus/portal-api) | `~/src/raisd/portal-api` | Portal API service (Fastify, RPC), image, CI | SDD-02, SDD-08, SDD-12 | [../backend/portal-api.md](../backend/portal-api.md) |
| [`applicant-portal`](https://github.com/raisd-campus/applicant-portal) | `~/src/raisd/applicant-portal` | Apply, evidence, track, enrol | [SDD-04](../../sdd/04-applicant-portal.md) | [../frontend/applicant-portal.md](../frontend/applicant-portal.md) |
| [`student-portal`](https://github.com/raisd-campus/student-portal) | `~/src/raisd/student-portal` | Study, register, pay, results, support | [SDD-05](../../sdd/05-student-portal.md) | [../frontend/student-portal/AGENTS.md](../frontend/student-portal/AGENTS.md) |
| [`lecturer-portal`](https://github.com/raisd-campus/lecturer-portal) | `~/src/raisd/lecturer-portal` | Materials, attendance, mark, communicate | [SDD-06](../../sdd/06-lecturer-portal.md) | [../frontend/lecturer-portal.md](../frontend/lecturer-portal.md) |
| [`staff-portal`](https://github.com/raisd-campus/staff-portal) | `~/src/raisd/staff-portal` | Registry, Faculty, Bursary, QA, Marketing | [SDD-07](../../sdd/07-admin-staff-cms.md) | [../frontend/staff-portal.md](../frontend/staff-portal.md) |
| [`design-system`](https://github.com/raisd-campus/design-system) | `~/src/raisd/design-system` | Shared tokens/components | — | [../design/design-system.md](../design/design-system.md) |
| [`portal-api-docs`](https://github.com/raisd-campus/portal-api-docs) | `~/src/raisd/portal-api-docs` | Public OpenAPI + Swagger (GitHub Pages) | — | [../backend/portal-api.md](../backend/portal-api.md) |
| [`db-admin`](https://github.com/raisd-campus/db-admin) | `~/src/raisd/db-admin` | Read-only Neon browser + ERD (CMS/LMS colour legend) | PoC | [vercel-neon-poc.md](vercel-neon-poc.md), [../backend/lms-schema.md](../backend/lms-schema.md) |

## Ownership rules

- **Control plane** owns authentication/session design, RBAC design, campus configuration, the Portal API **contract** (`openapi.yaml`), platform manifests (Postgres, evidence volume, backups), and this knowledge base.
- **portal-api** owns the service implementation: handlers, CMS adapters, persistence code, image build, CI, and manifests for its own Deployment. It keeps generated working copies of `docs/ai/backend/portal-api*.md`; the canonical files stay here. Split out of `control-plane/portal-api/` with history on 27 September 2026.
- **Portal repos** own their web UX, client contracts, and (until Live) mock adapters. They consume the Portal API; they do not embed CMS credentials.
- **portal-api-docs** mirrors `control-plane/openapi.yaml` for public browsing. Spec source of truth remains `control-plane/openapi.yaml`.
- **design-system** owns the versioned `@raisd-campus/design-system` React package. Portals import released components rather than copying them. See [the component library guide](../design/component-library.md).

## How agents resolve paths

From a portal or portal-api checkout:

```text
../control-plane/docs/ai/AGENTS.md
../control-plane/docs/sdd/
../control-plane/openapi.yaml
```

From control-plane:

```text
docs/ai/
docs/sdd/
openapi.yaml
../portal-api/
```

GitHub (no local sibling):

```text
https://github.com/raisd-campus/control-plane/tree/main/docs/ai
```

## Public entry points (target)

| Hostname | Repository | Stage |
|---|---|---|
| `apply.raisd.co` | applicant-portal | 1 (SDD-12) |
| `api.raisd.co` | portal-api | 1 (SDD-12) |
| `staff.raisd.co` | staff-portal | 2 only if a CMS gap is verified, otherwise 3 |
| `student.raisd.co` | student-portal | 3 |
| `teach.raisd.co` | lecturer-portal | 3 |

See [deployment.md](deployment.md) and [portal-api-deployment.md](../backend/portal-api-deployment.md).
