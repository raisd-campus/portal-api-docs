# Upstream review fixes — 19 October 2026

## Changes

- Portal API SSO regressions use active `admin` identities. Registry, Bursary,
  other Admin desk tags and no-desk Admin follow the documented Demo mappings.
  Retired `staff` role keys are rejected. Both allocated lecturer accounts retain
  Classrooms access while all eight privileged staff method names reject their
  teaching sessions. Control retains its SSO token rather than gaining a staff session.
- Jenkins job sync updates existing jobs using `config.xml` and creates only after
  a 404 lookup. HTTP/transport failures fail closed. Neither active nor retired
  jobs are deleted, so syncing does not discard build history.
- Canonical guides describe the observed Traefik permanent redirects as 301.
  Applicant's local guide now documents SSO-only hosted sign-in. Public AI copies,
  SDD-12, the affected architecture diagram and all three OpenAPI mirrors match
  canonical sources. Three obsolete public AI files were removed.
- `python scripts/sync-public-ai.py --check` checks changed, missing and extra
  mirror files; run without `--check` to synchronize. Pending Registration Fee
  planning notes remain intact; application policy and fee runtime are unchanged.

## Verification

All commands below passed on Windows against current source:

- Portal API: `npm run test:sso-integration` (82 assertions, loopback SSO),
  `test:admissions`, `test:classrooms`, `test:classroom-regressions` (780 checks,
  112 seeded PDFs), `test:materials` (72 checks), `test:community`,
  `test:lecturer-modules`, `typecheck:local` and `docs:check`.
- Control Plane: `python scripts/test-jenkins-job-sync.py` (six tests including
  existing/missing jobs, auth/server/transport errors and failed writes), shell
  syntax check, public AI parity and `git diff --check` in all changed repos.
- Existing hostPath worker suite: four passed, three Windows/Linux-only or symlink
  privilege skips. Linux execution of those cases is still required for delivery.
- Staff source is unchanged since its successful lint, 73 unit tests, TypeScript
  and production build in this review. Its existing 961 kB chunk warning remains.

The local API was rebuilt and restarted on port 8087 in stub-memory mode, with
Materials and Community enabled. Staff Vite on 5173 was left running. Running
HTTP checks confirmed Student login/dashboard/logout, rejection of wrong and
revoked credentials, Lecturer Classrooms access, denial of privileged staff
actions, enabled capabilities and frontend availability. API restart reset
in-memory sessions and Demo mutations. Sign in again before trying the flows.

Detailed local command logs are in Student's ignored
`logs/upstream-recheck-20261019/` directory. No hosted SSO/SMTP calls, migrations,
registry publication, commits, pushes, Jenkins reconfiguration or deployments
were performed. These are local source/runtime results; the installed hosted
Jenkins jobs still require a separately authorized sync before using the repair.
