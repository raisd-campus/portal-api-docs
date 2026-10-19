# Microservice architecture (Demo / this phase)

**Status:** As deployed — 16 October 2026 (Control + Campus Admin rename).  
**Published diagram:** [`docs/diagrams/architecture.html#services`](../../diagrams/architecture.html#services).  
**Product baseline:** [SDD-02](../../sdd/02-architecture-and-integration.md) · [overview.md](overview.md).  
**Runtime:** [vps-topology.md](vps-topology.md) · GitOps [argocd.md](argocd.md).

Raisd runs as **small, independently deployable services** on one UltaHost k3s node (ADR-2 / ADR-3). This is not a greenfield mesh: services stay few, sync HTTP, and share VPS Postgres where needed. Portals are SPAs that call backends; they never open Postgres or the existing CMS.

## 1. Service map

| Service | Repo | Host(s) | Owns | Talks to | Argo Application |
|---|---|---|---|---|---|
| **Portal API** | `portal-api` | `api.raisd.co`, `api.{slug}.raisd.co` | Campus Demo/Live data RPC, CMS ACL (CAP-53), admissions/student/teaching/finance surfaces | Postgres `portal_api`, SSO introspect, Notifications (submit/enrol mail), CMS (Live later) | `portal-api` |
| **SSO** | `sso` | `sso.raisd.co` | Identity, login channels, sessions, RBAC, people admin APIs | Postgres `sso`, Notifications (magic link / learner mail) | `sso` |
| **Notifications** | `notifications` | `notify.raisd.co` | Outbound email templates + SMTP send | UltaCP `mail.raisd.co` (off-cluster) | `notifications` |
| **Applicant portal** | `applicant-portal` | `apply.{slug}.raisd.co` | Apply / evidence / track / enrol UI | SSO, Portal API | `applicant-portal` |
| **Student portal** | `student-portal` | `student.{slug}.raisd.co` | Enrolled-student UI | SSO, Portal API | `student-portal` |
| **Staff portal** | `lecturer-portal` | `staff.{slug}.raisd.co` | Teaching menus for `lecturer`; Admin menus at `/admin` for `admin`. Community only on the teaching sign-in | SSO, Portal API | `lecturer-portal` |
| **Control** | `control-portal` | `control.raisd.co` | Super-admin — grants campus Admin access only (`roleKey` `control`) | SSO | `control-portal` |
| **Campus landing** | `campus-landing` | `{slug}.raisd.co` | Login-only entry; RBAC portal picker or redirect | SSO | `campus-landing` |
| **Keychain** | `keychain` | `keychain.raisd.co` | Demo login launcher (Open filled) | Browser → portals / SSO | `keychain` |
| **Docs** | `control-plane` (+ Pages) | `docs.raisd.co` | Architecture / OpenAPI / design HTML | — (static) | `docs` |
| **DB admin** | `db-admin` | `db-admin.raisd.co` | Read-only Postgres browser + ERD | Postgres (read) | `db-admin` |
| **Design system** | `design-system` | *(npm package)* | Shared tokens / components / email templates | Consumed at build time by portals + Notifications | `design-system` (marker) |
| **Portal API docs** | `portal-api-docs` | GitHub Pages | Public OpenAPI + Swagger mirror | Mirrors `control-plane/openapi.yaml` | `portal-api-docs` (marker) |

**Platform (not product microservices):** Jenkins (`jenkins.raisd.co`), Argo CD (`argocd.raisd.co`), Traefik + cert-manager, Postgres StatefulSet, UltaCP mail. Catalogue: [argocd.md](argocd.md) · [cicd.md](cicd.md).

## 2. Logical shape

```text
  Browser
     │
     ├─► Campus landing / Keychain / Docs / DB admin
     │
     ├─► Role portals (Applicant · Student · Lecturer · Admin) + Control
     │         │  Bearer access token
     │         ▼
     │    ┌────────────┐     introspect      ┌─────────┐
     │    │ Portal API │ ◄──────────────────►│   SSO   │
     │    └─────┬──────┘                     └────┬────┘
     │          │                                 │
     │          │  notify token                   │ notify token
     │          ▼                                 ▼
     │    ┌────────────────┐              magic-link / learner mail
     │    │ Notifications  │─────────────────────────────┘
     │    └───────┬────────┘
     │            │ SMTP
     │            ▼
     │      mail.raisd.co (off-cluster)
     │
     └──► SSO login UI (channels, role picker, token exchange)

  Portal API ──Postgres──► portal_api
  SSO         ──Postgres──► sso
  Portal API ─ ─ Live ─ ─► Existing CMS (CAP-53 ACL; not Demo SoR for people)
```

## 3. Boundaries (do not cross)

| Rule | Detail |
|---|---|
| Portals → backends only | SPAs call SSO and Portal API over HTTPS. No direct Postgres, CMS, or SMTP. |
| SSO owns identity | Login channels, sessions, RBAC, people. Portal API exchanges an introspected identity for its bounded Demo API session; it does not own SSO identity or role assignment. |
| Portal API owns campus data | Demo/Live records, CMS adapter, fee/admissions RPC. Does not own login UI. |
| Notifications owns send | SSO and Portal API call `notify.raisd.co` with `NOTIFY_SERVICE_TOKEN`. Portals never call Notifications. |
| One write path to CMS | Live Portal API write success only after CMS acknowledges (ADR-1 / CAP-53). |
| Authz is server-enforced | Client menu hiding is not security ([SDD-02](../../sdd/02-architecture-and-integration.md) §4). |
| Shared package ≠ runtime service | `@raisd-campus/design-system` is build-time; email HTML is rendered by Notifications from that package’s templates. |

## 4. Contracts

| Service | OpenAPI / contract |
|---|---|
| Portal API | [`openapi.yaml`](../../../openapi.yaml) |
| SSO | [`openapi-sso.yaml`](../../../openapi-sso.yaml) · [../backend/sso.md](../backend/sso.md) |
| Notifications | [`openapi-notifications.yaml`](../../../openapi-notifications.yaml) · [../backend/notifications.md](../backend/notifications.md) |

Service-to-service: Portal API → SSO `POST /v1/introspect`; Portal API / SSO → Notifications `POST /v1/send/template` (token header).

## 5. Deploy shape (this phase)

| Class | How it runs today | Target |
|---|---|---|
| `sso`, `notifications`, `keychain` | GHCR image + Argo Application | Same |
| `portal-api`, `db-admin` | Argo Application; hostPath Node runtime | GHCR image |
| Role portals, `admin-portal`, `control-portal`, `campus-landing`, `docs` | Argo Application; hostPath nginx / ConfigMap | GHCR SPA images |
| `design-system`, `portal-api-docs` | Marker Applications (no k3s workload) | Same |

Every raisd-campus deployable has an Application under [`gitops/apps/`](../../../gitops/apps/) — see [argocd.md](argocd.md).

## 6. Related

| Topic | Document |
|---|---|
| Agent overview | [overview.md](overview.md) |
| Repo ownership | [repositories.md](repositories.md) |
| Hosts / DNS / k3s | [vps-topology.md](vps-topology.md) |
| Jenkins → GHCR → Argo | [cicd.md](cicd.md) |
| Portal API depth | [../backend/portal-api.md](../backend/portal-api.md) |
| Ideal multi-country CMS (post-M5) | [distributed-cms-target.md](distributed-cms-target.md) |
