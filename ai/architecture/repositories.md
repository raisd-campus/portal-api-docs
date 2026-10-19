# Repository map

Organization: [raisd-campus](https://github.com/raisd-campus).  
Expected local root: `~/src/raisd/` (siblings). Machine list also lives in [`repositories.yaml`](../../../repositories.yaml) at the control-plane root.

| Repository | Local path | Role | Primary SDD | AI knowledge |
|---|---|---|---|---|
| [`control-plane`](https://github.com/raisd-campus/control-plane) | `~/src/raisd/control-plane` | Campus config, identity design, Portal API + SSO + Notifications contracts, SDD, **AI knowledge base**, GitOps | SDD-02, SDD-08, SDD-12 | [`docs/ai/`](../) |
| [`portal-api`](https://github.com/raisd-campus/portal-api) | `~/src/raisd/portal-api` | Portal API microservice (Fastify, RPC) | SDD-02, SDD-08, SDD-12 | [../backend/portal-api.md](../backend/portal-api.md) |
| [`sso`](https://github.com/raisd-campus/sso) | `~/src/raisd/sso` | SSO identity, channels, sessions, RBAC | SDD-02, CAP-01 | [../backend/sso.md](../backend/sso.md) |
| [`notifications`](https://github.com/raisd-campus/notifications) | `~/src/raisd/notifications` | Outbound email (CMS noreply) | SDD-02 | [../backend/notifications.md](../backend/notifications.md) |
| [`applicant-portal`](https://github.com/raisd-campus/applicant-portal) | `~/src/raisd/applicant-portal` | Apply, evidence, track, enrol | [SDD-04](../../sdd/04-applicant-portal.md) | [../frontend/applicant-portal.md](../frontend/applicant-portal.md) |
| [`student-portal`](https://github.com/raisd-campus/student-portal) | `~/src/raisd/student-portal` | Study, register, pay, results, support | [SDD-05](../../sdd/05-student-portal.md) | [../frontend/student-portal/AGENTS.md](../frontend/student-portal/AGENTS.md) |
| [`lecturer-portal`](https://github.com/raisd-campus/lecturer-portal) | `~/src/raisd/lecturer-portal` | Staff portal — teaching menus for `lecturer`, Admin menus at `/admin` for `admin` (`staff.{slug}.raisd.co`) | [SDD-06](../../sdd/06-lecturer-portal.md), [SDD-07](../../sdd/07-admin-staff-cms.md) | [../frontend/lecturer-portal.md](../frontend/lecturer-portal.md) |
| [`control-portal`](https://github.com/raisd-campus/control-portal) | `~/src/raisd/control-portal` | Control — SSO people + full RBAC (`control.raisd.co`) | SDD-02 | [../frontend/control-portal.md](../frontend/control-portal.md) |
| [`design-system`](https://github.com/raisd-campus/design-system) | `~/src/raisd/design-system` | Shared tokens/components / email templates | — | [../design/design-system.md](../design/design-system.md) |
| [`portal-api-docs`](https://github.com/raisd-campus/portal-api-docs) | `~/src/raisd/portal-api-docs` | Public OpenAPI + Swagger (GitHub Pages mirror) | — | [../backend/portal-api.md](../backend/portal-api.md) |
| [`db-admin`](https://github.com/raisd-campus/db-admin) | `~/src/raisd/db-admin` | Read-only DB browser + ERD (CMS/LMS colour legend) | SDD-12 | [vps-topology.md](vps-topology.md), [../backend/lms-schema.md](../backend/lms-schema.md) |
| [`campus-landing`](https://github.com/raisd-campus/campus-landing) | `~/src/raisd/campus-landing` | Per-campus landing (hostname-pinned) | SDD-12 / pilot | [vps-topology.md](vps-topology.md), [lesotho-pilot.md](lesotho-pilot.md) |
| [`keychain`](https://github.com/raisd-campus/keychain) | `~/src/raisd/keychain` | Demo login launcher | — | [../frontend/keychain.md](../frontend/keychain.md) |

Service boundaries and call graph: [microservices.md](microservices.md).

## Ownership rules

- **Control plane** owns authentication/session **design**, RBAC design, campus configuration, the Portal API / SSO / Notifications **contracts** (`openapi.yaml`, `openapi-sso.yaml`, `openapi-notifications.yaml`), GitOps (`gitops/`), platform manifests, and this knowledge base.
- **portal-api** owns the Portal API microservice: handlers, CMS adapters, persistence, image/CI. Canonical agent docs stay here under `docs/ai/backend/portal-api*.md`.
- **sso** owns identity runtime (channels, sessions, RBAC APIs). **notifications** owns outbound email send.
- **Portal / admin / landing / keychain repos** own their web UX. They authenticate via SSO and call Portal API (Admin → SSO only). They do not embed CMS credentials or call Notifications.
- **portal-api-docs** mirrors `control-plane/openapi.yaml` for public browsing. Spec source of truth remains `control-plane/openapi.yaml`.
- **design-system** owns the versioned `@raisd-campus/design-system` React package and email templates. See [the component library guide](../design/component-library.md).

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

## Public entry points

### Live flat names (SDD-12 target)

| Hostname | Repository | Stage |
|---|---|---|
| `apply.raisd.co` | applicant-portal | 1 (SDD-12) |
| `api.raisd.co` | portal-api | 1 (SDD-12) — also served today |
| `sso.raisd.co` | sso | Demo — identity |
| `notify.raisd.co` | notifications | Demo — outbound email |
| `control.raisd.co` | control-portal | Demo — Control (SSO RBAC) |
| `admin.raisd.co` | *(308 → control)* | Legacy global alias |
| `student.raisd.co` | student-portal | 3 |
| `staff.raisd.co` | lecturer-portal | 3 |

### Demo campus-scoped hosts (current VPS)

| Hostname | Repository |
|---|---|
| `{slug}.raisd.co` | campus-landing |
| `apply.{slug}.raisd.co` | applicant-portal |
| `student.{slug}.raisd.co` | student-portal |
| `staff.{slug}.raisd.co` | lecturer-portal (teaching menus, or Admin menus at `/admin` for `roleKey` `admin`) |
| `admin.{slug}.raisd.co` | *(308 → staff.{slug}.raisd.co/admin)* |
| `api.{slug}.raisd.co` | portal-api (same service as `api.raisd.co`) |
| `sso.raisd.co` / `notify.raisd.co` / `control.raisd.co` | sso / notifications / control-portal |
| `keychain.raisd.co` | keychain |
| `docs.raisd.co` | control-plane docs sync |
| `db-admin.raisd.co` | db-admin |
| `jenkins.raisd.co` / `argocd.raisd.co` | CI + GitOps (platform) |

Slugs: `lesotho`, `cyberjaya`, `botswana`, `eswatini`, `sierra-leone`, `cambodia`, `uganda`, `namibia` — see [demo-campuses.yaml](demo-campuses.yaml). Topology: [vps-topology.md](vps-topology.md).
