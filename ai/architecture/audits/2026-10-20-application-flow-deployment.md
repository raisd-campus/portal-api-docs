# Application flow hosted Demo delivery - 20 October 2026

Owner-requested verification follows the [source integration receipt](2026-10-20-university-flows.md). Local quality gates and source publication were previously complete; this receipt records hosted delivery separately. Existing local services and their interactive Demo records were not restarted or reset. No registry publication, grading/financial decision, SSO access grant, database reset or Live CMS migration was performed.

## Verified feature releases

| Surface | Application-code revision | Jenkins evidence |
|---|---|---|
| Control | 19552e314940d411b0ffa5688fd14e1aec6d8f79 | raisd-control-portal 8 SUCCESS; shared pin 0.9.1 |
| Applicant | 32830887bb2ea40129893f7dc287f81cc9074d91 | raisd-applicant-portal 3 SUCCESS |
| Staff (lecturer-portal repository) | 7cee049b470c5524336eb7264b390c1d1f544713 | raisd-lecturer-portal 22 SUCCESS |
| Portal API | 6ece104431beed23915129bc54327d0e3fd0d68f | raisd-portal-api 10 SUCCESS; exact Applicant/Student/Control Plane dependencies recorded |
| SSO | 097da04f011869cbc159c0360d08f87736ff58ae | raisd-sso 35 SUCCESS; built/running digest sha256:95843e3e98ffd88fbf8798d0fcb52f82d14b2e8c70fda8b83f9d8e12d212ffa8 |
| Student | aaada64a21ec3fd1108f752e7bcc036d135966ce | raisd-student-artifact-recovery 2 SUCCESS; exact production artifact |
| Control Plane docs/GitOps | Original feature 1a5988b5685a41b56fac80d0386b884428179eca; CORS repair 58d8ac894fcfc18cb5e6ff2e54ce5c5981fe2d49 | Original build 52, CORS follow-up 53 SUCCESS; later receipt-only publication is separate |
| Public API docs | Original feature 929bb92483c40e76a7c6fed806904ee39888ff61 | raisd-portal-api-docs 13 SUCCESS; Pages branch publication verified separately |

Argo's Git revision describes desired manifests, not frontend content. Verify affected applications are Synced/Healthy, workload readiness, Jenkins publication receipts and served release manifests together. Documentation-only follow-ups retain these application-code ancestors; final exact heads and delivery states are retained in the private evidence bundle.

## Repairs and limits

Student native build 2 failed before checkout/publication because the 4 GB Demo node had less than its required 1536 MiB MemAvailable. The guard and failed history were retained. An exact clean-source workstation build used hosted API/SSO origins, disabled developer auto-login, passed production typecheck/build, production exclusions and bundle budgets, and produced archive SHA-256 25117b66d239c3a263d0913ba728c27ede497b1843f2dbd55d047e9e105e22ed. The private Jenkins transfer checksum matched; the sandboxed recovery archived the artifact/receipt, verified every file before activation, retained the previous release and completed Student rollout. All 261 publicly served files match size/SHA-256. The first recovery attempt required the normal Jenkins sandbox; that failed record is retained, and recovery build 2 succeeded with the sandbox enabled. No script-approval bypass or new access was used.

The native Student build still needs more host capacity, an external build worker or the reviewed exact-artifact recovery route. This release is deployed; it is not evidence that future native builds on the existing node can pass the capacity guard.

Control initially showed Failed to fetch despite healthy API/authenticated HTTP probes. Its browser preflight lacked Access-Control-Allow-Origin. GitOps now appends only https://control.raisd.co to a nonempty existing CORS list and execs the unchanged runtime; empty/unset development behavior stays unchanged. Three offline entrypoint cases, six job-sync tests, three SSO-image tests and a Kubernetes server dry run passed. Hosted preflight permits all 26 existing portal/Control/Swagger origins; an unrelated origin remains denied. Database records, existing origins and SSO grants were preserved.

## Hosted flow evidence

- All 24 Applicant/Staff/Student campus hostnames serve the expected feature revisions.
- Portal API health reports sessions, data and flow policy storage as postgres, with cms stub. This is a persistent Demo API, not a Live CMS connection.
- All eight campus policies read and validate successfully; all four local/international/new/returning previews succeed per campus (32 previews).
- Missing authentication returns 401; an Applicant role cannot configure flows (403). An active Control role with flows.configure succeeds.
- Applicant reads its policy/applications, Registry reads scoped campus admissions, and Student reads Finance through the same hosted API/SSO.
- The real hosted Control browser loads University Flows and the Admissions editor, validates the configuration and renders the resolved stages; the Staff browser loads the new API-backed queue.
- No policy was saved/published, no application submitted, and no eligibility/payment/Offer/registration outcome was changed for these hosted probes. Isolated end-to-end mutation suites remain documented in the source receipt.
- The CORS rollout retained PostgreSQL storage; final read probes confirm policy IDs remain unchanged.

## Evidence and follow-up

Private evidence is under Student logs/application-flow-deploy-20261020: build/Argo states, publication logs, artifact/receipts, release manifests, served hashes, authenticated probes, preflight results and browser captures. No credentials are recorded there. Local services remain untouched. The legacy standalone staff-portal checkout is not the active Staff delivery target.

Canonical backend/CI/CD/deployment guidance and API/public mirrors are synchronized with this receipt. The original local verification receipt remains the authority for exhaustive isolated lifecycle, permissions, concurrency, persistence, document-ownership and registration/CAF tests.
