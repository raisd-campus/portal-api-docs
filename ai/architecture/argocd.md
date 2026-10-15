# Argo CD GitOps (Demo)

**Status:** Installed on Demo k3s (15 Oct 2026). UI: https://argocd.raisd.co  
**Path:** [`gitops/`](../../../gitops/) in control-plane.  
**Deploy trigger:** [cicd.md](cicd.md) — Jenkins builds GHCR images and syncs on push to **main** only.

## Why

Demo deploys previously required `scripts/deploy-vps.sh` over **SSH + rsync + hostPath**. When SSH is unavailable, nothing can ship. Argo CD holds desired state; Jenkins builds images and triggers sync after merges to `main`:

```text
git push main → GitHub webhook → Jenkins (Kaniko → GHCR) → Argo refresh / rollout
```

SSH is only needed for **one-time bootstrap** and emergency node recovery — not every portal release. Image builds do **not** use GitHub Actions.

## Current vs target

| Workload | Today | Target |
|---|---|---|
| `notifications`, `sso`, `keychain` | Jenkins → GHCR image + Argo Application (+ rollout) | Same |
| Portal SPAs + `campus-landing` + `docs` | Argo Applications under `gitops/apps/<name>/` (hostPath nginx until imaged) | SPA GHCR images |
| `portal-api`, `db-admin` | Argo Applications (hostPath Node runtime; secrets in `portal-api-env` / `db-admin-env`) | GHCR images |
| `design-system`, `portal-api-docs` | Marker Applications (npm package / GitHub Pages — no cluster Deployment) | Same |
| Shared SPA ConfigMap + `campus-multi` Ingress | Application `portal-static` | Same |
| Secrets | K8s Secrets created once by bootstrap | Same (`notifications-secrets`, `sso-secrets`, `portal-api-env`, `db-admin-env`, `ghcr-raisd`, `jenkins-*`, build secrets) |

## Bootstrap (once)

1. Restore SSH if needed: UltaHost console + [`gitops/bootstrap/recover-sshd.sh`](../../../gitops/bootstrap/recover-sshd.sh).
2. Install Argo: `bash gitops/bootstrap/install-argocd.sh` (server-side apply; `server.insecure=true` behind Traefik TLS; Keychain via `gitops/argocd/keychain-proxy/`).
3. Install Jenkins builder/trigger: `bash gitops/bootstrap/install-jenkins.sh` (needs `.credentials/ghcr.env`) — see [cicd.md](cicd.md).
4. DNS: `argocd.raisd.co` and `jenkins.raisd.co` A → `38.127.216.221` (DNS-only).
5. App secrets once (`notifications-secrets`, `sso-secrets`); pull secret `campus/ghcr-raisd` is created by the Jenkins installer.

## Day-to-day deploy (no SSH)

| Change | Action |
|---|---|
| `notifications` / `sso` / `keychain` code | Merge to `main` → Jenkins Kaniko pushes GHCR → Argo refresh + rollout |
| GitOps manifests | Merge to `control-plane` `gitops/apps/**` on `main` → Jenkins → Argo sync |
| Static portal/API/docs **content** (until imaged) | Approved Jenkins hostPath build/publish jobs; Argo owns Deployment/Service/Ingress objects. SSH deploy script remains emergency fallback. |

## Layout

```text
gitops/
  bootstrap/recover-sshd.sh
  bootstrap/install-argocd.sh
  bootstrap/install-jenkins.sh
  argocd/ingress.yaml              # argocd.raisd.co
  apps/root/applications.yaml      # one Application CR per raisd-campus deployable
  apps/notifications/ sso/ keychain/ jenkins/
  apps/student-portal/ applicant-portal/ staff-portal/ lecturer-portal/ admin-portal/
  apps/campus-landing/ portal-api/ db-admin/ docs/
  apps/design-system/ portal-api-docs/   # markers (no cluster workload)
  apps/portal-static/                    # shared nginx CM + campus-multi Ingress
ci/Jenkinsfile                     # main-only build + deploy job body
```

## Related

- [cicd.md](cicd.md) — Jenkins webhook, Kaniko→GHCR, main-only gate  
- [vps-topology.md](vps-topology.md) — hosts and Demo topology  
- [portal-api-deployment.md](../backend/portal-api-deployment.md) — GHCR target for Portal API  
- [SDD-12](../../sdd/12-deployment-architecture.md) — ADR-2 / ADR-3  

The 16 October [bounded hostPath repair](cicd.md#approved-hostpath-delivery-repair--16-october-2026) builds and publishes exact source commits before rollout. Argo revision alone still identifies manifest state, not the served source revision. Verify release manifests and API capability metadata separately.
