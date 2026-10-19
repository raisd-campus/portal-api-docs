# Deployment architecture (agent knowledge)

**Canonical product text:** [SDD-12](../../sdd/12-deployment-architecture.md).  
**Current Demo topology (as deployed):** [vps-topology.md](vps-topology.md) · diagram [`architecture.html#vps`](../../diagrams/architecture.html#vps).  
This file is the short agent-facing summary.

## ADR-2 — Existing UltaHost VDS in Singapore

Do not invent a new cloud provider or order from UltaHost VPS tiers when the working-group decision is to use (and stage onto) the existing estate. Concrete machine assignment and which Premium runs the old CMS remain TBC where SDD-12 says so.

## ADR-3 — Kubernetes (k3s)

Application workloads run on **k3s**. Traefik is the ingress. Existing CMS and mail stay off Kubernetes.

## Current Demo (14 Oct 2026)

Running on a **single UltaHost VPS** (`38.127.216.221`):

- Cloudflare DNS-only A records for `raisd.co` → VPS
- Namespace `campus`: Traefik + cert-manager TLS, `portal-api`, Postgres StatefulSet
- Eight campus-scoped landings and portals: `{slug}.raisd.co` and `{apply,student,admin,staff,api}.{slug}.raisd.co` (`teach.{slug}` 301-redirects to `staff.{slug}`)
- Shared: `control.raisd.co`, `keychain.raisd.co`, `docs.raisd.co`, `db-admin.raisd.co`, `api.raisd.co`, `sso.raisd.co`, `notify.raisd.co`

Full diagram and host table: [vps-topology.md](vps-topology.md). Catalogue: [demo-campuses.yaml](demo-campuses.yaml).

## Live growth stages (SDD-12)

SDD-12 still defines staged growth (edge node, flat Live hostnames, restore drill). Agents must not:

- Deploy portal code onto the CMS host.
- Assume Live flat names (`apply.raisd.co`, …) replace Demo campus hosts before an ADR cutover.
- Commit server passwords or kubeconfigs into git.

## Request path

```text
Browser → Cloudflare DNS → Traefik/TLS (k3s) → portal static / portal-api
portal-api → Postgres (VPS) · CMS (Live, private) · evidence volume
```

## CI/CD (Demo)

```text
push to main → GitHub webhook → Jenkins (Kaniko → GHCR) → Argo CD sync / rollout
```

- **Build + trigger:** Jenkins at `jenkins.raisd.co` — **main branch only** ([cicd.md](cicd.md)). No GitHub Actions image workflows for Demo services.
- **Desired state:** Argo CD at `argocd.raisd.co` ([argocd.md](argocd.md)).
- **SSH/rsync** (`deploy-vps.sh`) is bootstrap/fallback, not the primary release path.

Concrete build, image, manifests, probes, env and release flow for the Portal API: [portal-api-deployment.md](../backend/portal-api-deployment.md).

## Related

- Printable overview: [`docs/Raisd-Campus-Architecture.pdf`](../../Raisd-Campus-Architecture.pdf)
- Diagrams: [`docs/diagrams/`](../../diagrams/)
- Open questions on hosting: [SDD-10](../../sdd/10-open-questions.md)
