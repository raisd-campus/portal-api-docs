# Repository map

Organization: [raisd-campus](https://github.com/raisd-campus).  
Expected local root: `~/src/raisd/` (siblings). Machine list also lives in [`repositories.yaml`](../../../repositories.yaml) at the control-plane root.

| Repository | Local path | Role | Primary SDD | AI knowledge |
|---|---|---|---|---|
| [`control-plane`](https://github.com/raisd-campus/control-plane) | `~/src/raisd/control-plane` | Campus config, identity, Portal API, SDD, **AI knowledge base** | SDD-02, SDD-08, SDD-12 | [`docs/ai/`](../) |
| [`applicant-portal`](https://github.com/raisd-campus/applicant-portal) | `~/src/raisd/applicant-portal` | Apply, evidence, track, enrol | [SDD-04](../../sdd/04-applicant-portal.md) | [../frontend/applicant-portal.md](../frontend/applicant-portal.md) |
| [`student-portal`](https://github.com/raisd-campus/student-portal) | `~/src/raisd/student-portal` | Study, register, pay, results, support | [SDD-05](../../sdd/05-student-portal.md) | [../frontend/student-portal/AGENTS.md](../frontend/student-portal/AGENTS.md) |
| [`lecturer-portal`](https://github.com/raisd-campus/lecturer-portal) | `~/src/raisd/lecturer-portal` | Materials, attendance, mark, communicate | [SDD-06](../../sdd/06-lecturer-portal.md) | [../frontend/lecturer-portal.md](../frontend/lecturer-portal.md) |
| [`staff-portal`](https://github.com/raisd-campus/staff-portal) | `~/src/raisd/staff-portal` | Registry, Faculty, Bursary, QA, Marketing | [SDD-07](../../sdd/07-admin-staff-cms.md) | [../frontend/staff-portal.md](../frontend/staff-portal.md) |
| [`design-system`](https://github.com/raisd-campus/design-system) | `~/src/raisd/design-system` | Shared tokens/components | — | [../design/design-system.md](../design/design-system.md) |
| [`portal-api-docs`](https://github.com/raisd-campus/portal-api-docs) | `~/src/raisd/portal-api-docs` | Public OpenAPI + Swagger (GitHub Pages) | — | [../backend/portal-api.md](../backend/portal-api.md) |

## Ownership rules

- **Control plane** owns authentication/session design, RBAC, campus configuration, Portal API, Postgres placement, evidence store integration, and this knowledge base.
- **Portal repos** own their web UX, client contracts, and (until Live) mock adapters. They consume the Portal API; they do not embed CMS credentials.
- **portal-api-docs** mirrors `control-plane/openapi.yaml` for public browsing. Spec source of truth remains `control-plane/openapi.yaml`.
- **design-system** will hold shared UI once extracted; until then the richest token documentation is the student-portal design system copy under `docs/ai/design/`.

## How agents resolve paths

From a portal checkout:

```text
../control-plane/docs/ai/AGENTS.md
../control-plane/docs/sdd/
../control-plane/openapi.yaml
```

From control-plane:

```text
docs/ai/
docs/sdd/
portal-api/
openapi.yaml
```

GitHub (no local sibling):

```text
https://github.com/raisd-campus/control-plane/tree/main/docs/ai
```

## Public entry points (target)

| Hostname | Repository | Stage |
|---|---|---|
| `apply.raisd.co` | applicant-portal | 2 (Admissions) |
| `student.raisd.co` | student-portal | 3 |
| `teach.raisd.co` | lecturer-portal | 3 |
| `staff.raisd.co` | staff-portal | later |
| `api.raisd.co` | control-plane (Portal API) | from stage 1 |

See [deployment.md](deployment.md).
