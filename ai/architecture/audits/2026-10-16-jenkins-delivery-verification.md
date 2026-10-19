# Jenkins delivery repair and hosted verification - 16 October 2026

Owner authorization covers Jenkins use through Demo Keychain, persistent delivery for six existing hostPath targets, and recovery/delivery of the prepared Student artifact. VPS SSH recovery was approved but no SSH entry or trusted host key was available; the owner confirmed they have no VPS access. No SSH login occurred. The VPS subsequently recovered and delivery continued through Jenkins.

## Corrections

- Previous green source-trigger jobs refreshed Argo but left old portal/API hostPath code. Six exact-revision build/publish jobs now record provenance, retain releases, switch the code directory and wait for only the affected workload.
- Fixed ConfigMap symlink entry-point execution, required exact PUBLISHED receipts, and removed Groovy JSONPath newline escaping. Build and readiness failures fail Jenkins.
- Added bounded Kubernetes request retries, waiting for unfinished workers, CPU/thread/heap bounds and regression coverage. A controller restart and two periods of VPS unresponsiveness were observed. Student #8 exited 137; Student #9's Kubernetes worker eventually succeeded while its Jenkins pipeline was interrupted. Precise host termination causes remain unconfirmed; existing Jenkins RBAC cannot read node/events/metrics. No access grants were added.
- The last readable host snapshot had 4 GB RAM, about 624 MiB available and no swap. Student compilation failed locally at 384/512 MiB heap and passed at 768 MiB. The capacity guard in this source requires 1536 MiB available host memory before a Student checkout/build; insufficient or unreadable capacity fails before publication. Future native Student delivery may require additional build capacity. Argo installed the guard from c578fd593ebd5c2f82650f8f369fbf1bcc9842af; Jenkins is Synced/Healthy. The installed worker SHA-256 matches source: `ec5c998b3511ce4c08afe23fd366fa1ab0df2cdd16fb6373034d4a15a2b65bf4`.
- GitHub Pages was set to custom-workflow mode without a workflow. Restored main/root branch publication with .nojekyll. GitHub-managed Pages run 38767792267 succeeded and served package 0.8.0 / 197 captures. This does not build Demo service images with GitHub Actions.

## Observed delivery evidence

| Target | Exact application source | Evidence |
|---|---|---|
| Student | cdc482c527374b6b94da9bc7b7389c3ebc0c3e7c | Native Kubernetes Job hostpath-student-portal-cdc482c527-9 succeeded; interrupted Jenkins #9 retained. [Audited recovery job #1](https://jenkins.raisd.co/job/raisd-student-delivery-recovery/1/) succeeded, verified the exact native PUBLISHED receipt, restarted Student and confirmed readiness. Served manifest and all 168 entry/JS/CSS files match. |
| Applicant | fee128bc1bfbd1b86fbf370eb4acf511744ab4e1 | Served release.json matches, shared 0.8.0. [Jenkins #7](https://jenkins.raisd.co/job/raisd-applicant-portal/7/) succeeded; all 7 entry/JS/CSS files match. |
| Lecturer | 34d8f6bc5dd5616b87bf14bd080df479eb856c28 | Jenkins #9 succeeded; served release.json matches, shared 0.8.0. |
| Staff | 28b7581b76f0ea8cf270f5e691c996d82f8fc022 | Jenkins #8 succeeded; served release.json matches. Its existing 0.6.2 pin is preserved. |
| Portal API | f176764174afad17ffcd26996160db9adeed0437 | Jenkins #5 succeeded, exact PUBLISHED/DEPLOYED receipts and readiness. Dependencies: Student cdc482c, Applicant fee128bc, Control Plane 6b4f757. New metadata routes and health return 200. |
| Control Plane docs | c578fd593ebd5c2f82650f8f369fbf1bcc9842af | [Jenkins #22](https://jenkins.raisd.co/job/raisd-control-plane/22/) succeeded with exact PUBLISHED/DEPLOYED receipts. The documentation-only follow-up identifies its own revision in release.json and the Jenkins job. |
| Shared package | e1bd19b146e9feb35cacb20db283af66d70b467a / v0.8.0 | Previously released npm package; Jenkins marker #5 succeeded. No republishing in this task. |

The previously prepared workstation Student archive passed fresh typecheck, production build, production exclusions and bundle budgets. It is retained as a private draft recovery asset with a full SHA-256 inventory. The completed native worker was available after recovery, so that workstation archive was not used for deployment.

## Verification and limits

- Installed Linux worker: **7 passed, 0 failed, 0 skipped**, including capacity boundaries, ConfigMap symlink invocation, retained/atomic activation and transient API/receipt failures. Job `delivery-regression-c578fd5` completed at 2026-10-15T17:27:16Z using the installed read-only ConfigMap, no credentials or hostPath writes. Node/bash syntax checks passed in that Job. Windows worker suite: 4 passed and 3 explicitly Linux/symlink cases skipped.
- Node syntax, bash syntax, kustomize render and git whitespace checks passed. Canonical/public parity: 140 AI files, 261 catalogue files and three OpenAPI contracts match; all local OpenAPI references resolve. Generated SDD-12 source/staging/public copies match. Existing full portal/API/package gates remain in the [source integration receipt](../../frontend/student-portal/audits/2026-10-16-campus-integration-publication.md); no untouched application tests were removed or bypassed.
- GitHub Pages: eleven served contract/receipt/capture byte comparisons passed. VPS docs: ten exact-byte comparisons against 6b4f757 passed before later documentation-only publication. Read-only Kubernetes Job `delivery-served-proof-20261016` succeeded at 2026-10-15T17:23:42Z: all 182 portal entry/JS/CSS files matched SHA-256 against the mounted releases (Student 168, Applicant 7, Lecturer 4, Staff 3). All six target workloads had ready/updated/desired replicas 1/1/1. The running API manifest matches f176764 and its runtime bundle SHA-256 is `447779f0926d0a29ee5357269da50fb3d386257cb0055222e3c23c558596e52b`. API health and both capability metadata routes returned 200.
- Preserve local API 8087 and portals 5173/5174/5175/5176, including their current processes and Demo attendance. No local restart, migrations, data reset, persistence switch, credential expansion, registry publication or database configuration change occurred.
- Hosted API health remains stub-session with Postgres data/sessions and CMS stub. Classrooms and Materials metadata return enabled:false; these memory-only capabilities remain intentionally disabled on this Postgres service. Code deployment is not hosted LMS feature acceptance or durable LMS persistence.
- raisd-root has pre-existing Application/sso bookkeeping drift while SSO itself is Healthy/Synced. The last-applied annotation includes stale status/server metadata. Automatic approval review rejected cleaning that annotation because it is outside the approved delivery targets. It remains unchanged; no Replace/prune workaround was attempted.

## Operational handoff

Use the approved fixed-target Jenkins pipeline for future main pushes. Keep job definitions synchronized with ci/Jenkinsfile and verify the mounted ConfigMap matches source before running workers. Retain exact PUBLISHED and DEPLOYED receipts, served manifests and asset comparisons. Do not interpret marker jobs or Argo refresh as content delivery. Preserve failed/interrupted runs for diagnosis. Capacity rejection must leave the active release intact; resolve Student build capacity through an approved external artifact or appropriate build resources before retrying a heavy native build.

## Reproduction commands

- Local: `node --test gitops/apps/jenkins/scripts/build-hostpath.test.mjs`, `node --check gitops/apps/jenkins/scripts/build-hostpath.mjs`, `bash -n gitops/apps/jenkins/scripts/deploy-hostpath.sh`, `bash -n gitops/apps/jenkins/scripts/build-ghcr-image.sh`, `kubectl kustomize gitops/apps/jenkins`, and `git diff --check`.
- Jenkins: inspect the exact `PUBLISHED` and `DEPLOYED` lines and result for the numbered jobs above; read `kubectl -n jenkins logs job/delivery-served-proof-20261016 -c verify` for release/asset evidence. The verification Job has no service-account token or secrets and mounts only the two existing code roots read-only.
- Readiness: `kubectl -n campus get deployment student-portal applicant-portal lecturer-portal admin-portal control-portal portal-api docs -o json`; compare source-revision annotations, observed generations, ready and updated replicas. Staff was renamed to Admin; Raisd Admin to Control.
- Served evidence: fetch each portal's `/release.json`, `/index.html` and every built JS/CSS asset and compare SHA-256 against its mounted release. The same worker checks API `/health` and `/v1/meta/classrooms` / `/v1/meta/materials`; no operational records are mutated.
- Documentation: compare canonical AI/public mirrors, generated SDD-12 HTML/staging, and exact served contract/catalogue/receipt bytes. Match the final documentation revision using `https://docs.raisd.co/release.json` and the [Control Plane job](https://jenkins.raisd.co/job/raisd-control-plane/).
