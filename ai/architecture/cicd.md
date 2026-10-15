# CI/CD pipeline (Demo)

**Status:** Live on Demo k3s (15 Oct 2026).  
**Hosts:** `jenkins.raisd.co` (build + deploy trigger) · `argocd.raisd.co` (GitOps sync).  
**Manifests:** [`gitops/apps/jenkins/`](../../../gitops/apps/jenkins/) · job script [`ci/Jenkinsfile`](../../../ci/Jenkinsfile).

## Mechanism (main branch only)

```text
    10|Developer merges to main
        │
        ▼
GitHub push webhook  ──────────────►  Jenkins (jenkins.raisd.co)
  (raisd-campus/*)                     job: raisd-<repo> (one per repo)
        │                              filter: ^raisd-campus/<repo> refs/heads/main$
        │                              (other branches / repos ignored)
        ▼
Jenkins Kaniko Job                     Jenkins deploy stage
  (keychain / sso / notifications)          │
  → ghcr.io/raisd-campus/<svc>:main         ▼
                                      Argo CD hard-refresh
                                      + kubectl rollout restart
                                        (touched image apps)
                                            │
                                            ▼
                                     Traefik · *.raisd.co
```

| Stage | Owner | When |
|---|---|---|
| **Build / publish image** | **Jenkins** Kaniko Job (`ci/build-ghcr-image.sh` → `/ci/build-ghcr-image.sh` in the controller) | Push/merge to `main` for `keychain`, `sso`, `notifications` |
| **Deploy trigger** | **Jenkins** Generic Webhook Trigger | GitHub `push` event; **only** `refs/heads/main` runs the pipeline |
| **Cluster sync** | **Argo CD** Applications under [`gitops/apps/`](../../../gitops/) | Jenkins annotates refresh; Argo auto-syncs `main` |
| **Static portals (transitional)** | `scripts/deploy-vps.sh` over SSH | Until SPA images land in GitOps |

There are **no GitHub Actions image workflows** for Demo services. GHA billing is not part of the Demo path.

Non-`main` pushes still hit the webhook URL but Jenkins **does not** start a deploy (`triggered: false`).

## Why Jenkins + Argo (not SSH every release)

- Day-to-day delivery must not depend on laptop SSH or hostPath rsync.
- Jenkins is the **image builder and deploy trigger** on `main` (auditable builds, one job per repo).
- Argo CD owns desired state in git (`gitops/`).
- SSH remains for **bootstrap / emergency** only (`gitops/bootstrap/*`).

## Bootstrap

```bash
# On a machine with cluster kubectl + control-plane checkout:
# .credentials/ghcr.env must contain GHCR_TOKEN (PAT: repo + write:packages + read:packages)
bash gitops/bootstrap/install-jenkins.sh
# Writes gitignored .credentials/jenkins.env (admin + webhook token)
# Creates jenkins/github-build, jenkins/ghcr-config, campus/ghcr-raisd, build secrets
```

DNS: `jenkins.raisd.co` A → `38.127.216.221` (DNS-only).  
UI: https://jenkins.raisd.co — change the admin password after first login.  
Keychain (top-right): Simple Theme on authenticated pages; nginx `keychain-proxy` injects the same docs JS on `/login` (simple-page skips PageDecorators).  
Argo CD (https://argocd.raisd.co): ingress → `argocd-keychain-proxy` injects the same docs JS into the SPA shell.

GitHub: each deployable `raisd-campus/*` repo has a **push** webhook →  
`https://jenkins.raisd.co/generic-webhook-trigger/invoke?token=<secret>`  
(token only in `.credentials/jenkins.env`, never in git).

## Job behaviour (`raisd-<repo>`)

Bootstrap: [`gitops/bootstrap/sync-jenkins-jobs.sh`](../../../gitops/bootstrap/sync-jenkins-jobs.sh) (also called from `install-jenkins.sh`).

1. **Gate** — require `GHL_REF == refs/heads/main` and `GHL_REPO` under `raisd-campus/`.
2. **Build + push GHCR** — when `GHL_REPO` is `raisd-campus/{keychain,sso,notifications}`, run Kaniko (`/ci/build-ghcr-image.sh`) to publish `:main` and `:<sha>`.
3. **Sync Argo** — hard-refresh all Applications under `gitops/apps/root/applications.yaml` (every raisd-campus deployable tile).
4. **Rollout** — restart the Deployment for the pushed image repo (or all three image apps on `control-plane` pushes).

Pipeline source of truth: [`ci/Jenkinsfile`](../../../ci/Jenkinsfile).  
Build helper: [`gitops/apps/jenkins/scripts/build-ghcr-image.sh`](../../../gitops/apps/jenkins/scripts/build-ghcr-image.sh).

## Related

- [argocd.md](argocd.md) — GitOps Applications and bootstrap  
- [deployment.md](deployment.md) — ADR-2 / ADR-3 hosting summary  
- [vps-topology.md](vps-topology.md) — hosts on the Demo VPS  
- [portal-api-deployment.md](../backend/portal-api-deployment.md) — Portal API image/release notes  

## Source review and publication limits — 15 October 2026

Reviewed Jenkinsfile, the Kaniko helper, job-sync script and Argo deployment
manifests before integrating the Classrooms/Materials publication. The pipeline
described above is a deploy trigger; it does not run lint, unit, browser or portal
build gates. Those gates must be recorded separately before publication.

- Only Keychain, SSO and Notifications build GHCR images today. Portal SPA/API
  workloads still use transitional hostPath content; pushing their source and
  refreshing Argo alone does not install or build that content. Design-system and
  documentation Applications are marker entries, not deployed package workloads.
- Rollout restart/status failures are currently swallowed with `|| true`. A green
  Jenkins job therefore does not prove workload readiness or browser acceptance.
- The image helper clones main and tolerates a failed requested-SHA checkout.
  Until that behavior fails closed, a SHA tag is not sufficient build provenance.
- Job sync embeds the Jenkinsfile body in each job. Editing the source does not
  update installed job definitions until the bootstrap/job-sync step runs.

No cluster bootstrap, job reconfiguration, hosted mutation or manual rollout is
authorized by the source publication receipt. Keep local gates, registry release,
Git publication, webhook/job delivery and hosted readiness as separate evidence.
