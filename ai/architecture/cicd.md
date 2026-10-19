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
| **Static portals/API/docs (transitional)** | Jenkins bounded hostPath build jobs | Exact source checkout, build, retained release directories and affected-workload rollout |

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
Keychain (top-right): mounts on **`/login` only** (Jenkins `keychain-proxy` on simple-page; Simple Theme may still load the script on authenticated pages but the widget unmounts off `/login`).
Argo CD (https://argocd.raisd.co): ingress → `argocd-keychain-proxy` injects the same docs JS; widget mounts on `/login` only.
Docs (`docs.raisd.co`): Keychain while the site gate is visible; after unlock a **Sign out** control clears the docs session (`site-auth.js`).

GitHub: each deployable `raisd-campus/*` repo has a **push** webhook →  
`https://jenkins.raisd.co/generic-webhook-trigger/invoke?token=<secret>`  
(token only in `.credentials/jenkins.env`, never in git).

## Job behaviour (`raisd-<repo>`)

Bootstrap: [`gitops/bootstrap/sync-jenkins-jobs.sh`](../../../gitops/bootstrap/sync-jenkins-jobs.sh) (also called from `install-jenkins.sh`). Sync creates missing `raisd-<repo>` jobs and updates existing jobs through `POST /job/{name}/config.xml`, preserving build history and job identity. Only a 404 lookup permits creation; lookup and write failures stop the sync. It does **not** delete retired jobs (for example `raisd-student-delivery-recovery`), so build history stays available.

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

## Approved hostPath delivery repair — 16 October 2026

The owner explicitly approved persistent Jenkins delivery jobs for Student,
Applicant, Lecturer, Admin (campus), Control (global), Portal API and Control Plane
docs. Staff portal was renamed to Admin; Raisd Admin was renamed to Control. This
supersedes the previous refresh-only/static-SSH limitation for those hostPath
targets. The existing hostPath topology stays in place; no new database, credential
or RBAC grants.

`gitops/apps/jenkins/scripts/deploy-hostpath.sh` creates a bounded build Job using
`build-hostpath.mjs`. It reads existing github-build/build-npm-token secret files,
checks the full requested commit, runs npm ci/production builds, records dependency
SHAs and package versions, and publishes to retained release directories. The
worker has no Kubernetes service-account token. Existing code directories switch
to the prepared release; previous code is retained for recovery. Only the affected
workload restarts, and readiness/build failures now fail Jenkins. The deployment worker
regressions run in the Linux Job before publication. Image checkout failures also
fail closed. Shell tracing is disabled before credential handling.

Only the hard-coded targets in `build-hostpath.mjs` may write the existing portal/API
hostPath roots (student, applicant, lecturer/`teach`, admin, control, docs, portal-api).
API runtime configuration and Postgres records are preserved; no migrations,
resets or changes to Materials/Classrooms activation policy occur. Source delivery
does not enable the memory-only Materials capability on the Postgres service.
Local full quality gates remain separate from these build/delivery checks.

The Jenkinsfile is still embedded in job definitions. After a source update, sync
the existing job definitions without deleting jobs or their histories; the mounted
jenkins-ci-scripts ConfigMap must contain the matching worker/helpers before
running them. Record actual Job results, workload readiness and served release
manifests, rather than treating an Argo refresh as proof of content delivery.

Public portal-api-docs Pages was separately restored to main/root branch publishing
(`build_type=legacy`) with `.nojekyll`: custom-workflow mode had no workflow and
served a stale site. The GitHub-managed Pages build/deploy passed at 7fb7dac and
served 0.8.0 / 197 captures; 11 deployed contract/receipt/image checks matched Git
bytes. This does not use GitHub Actions to build Demo service images.

The worker resolves its real entry-point path so ConfigMap symlinks execute the build. Delivery requires a PUBLISHED receipt for the exact repository/revision before rollout; a successful process with no publication is a failure. Argo refresh uses resource names rather than a Groovy-escaped JSONPath newline.

Delivery requests now have bounded Kubernetes retries and wait for unfinished hostPath workers before creating another. A temporary control-plane timeout cannot start overlapping workers or count as delivery success. The 4 GB Demo node has no swap; worker CPU is capped at 500m with one Rust build thread, Node old-space at 768 MiB and a 1536 MiB container ceiling. These limits bound resource use; they did not establish sufficient capacity for Student on this node. Capacity errors remain failures. A controller restart and Student exit 137 were observed during the first run; the precise termination cause is unconfirmed because existing Jenkins RBAC cannot read node/events/metrics, and no access grants were added.

Student now requires at least 1536 MiB MemAvailable before checkout/build and fails without changing a release when capacity is missing or unreadable. Argo installed this guard from c578fd593ebd5c2f82650f8f369fbf1bcc9842af; Jenkins is Synced/Healthy and all seven installed Linux worker regressions passed with zero skips. Verify the ConfigMap/source hash before future delivery. The compiler failed locally at 384/512 MiB heap and passed at 768 MiB. A fresh externally built Student artifact passed production exclusions and bundle budgets. It was retained privately but was not used: the native Student worker finished during recovery, and the audited recovery job verified that output and completed its rollout. See [delivery evidence and operational limits](audits/2026-10-16-jenkins-delivery-verification.md).

Local job-update regression: `python scripts/test-jenkins-job-sync.py` mocks curl
and executes the exact shell function used by the sync script, without contacting
Jenkins. Six tests cover update/create, failed lookups, transport and write errors,
and absence of delete/disable calls. [Verification receipt](audits/2026-10-19-upstream-fixes.md).

## SSO frontend build preparation — 19 October 2026

SSO's shared auth UI introduces a frontend build. The image helper adds an SSO-only
Node `ui-build` init container before Kaniko, using the existing read-only
`build-npm-token` mount. Its npm config stays in that container's `/tmp`, is removed
on exit, and is never mounted in Kaniko or copied to the image. SSO's Dockerfile
copies the compiled `web-dist` assets and installs backend production dependencies;
React and the shared package are build-only dependencies. Keychain/Notifications
image paths are unchanged. Three offline manifest/failure tests cover the helper.
No hosted Job or ConfigMap was manually reconfigured by the release task. Shared package 0.9.0 and SSO’s exact registry pin are verified; normal source delivery must install the matching helper before building SSO. Local Docker execution is pending
because this machine's Docker daemon is not running.
