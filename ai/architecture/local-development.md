# Local Raisd development

Owner-approved local setup, 27 October 2026. Local PostgreSQL Demo only; no hosted migration or Live CMS adapter.

## Start

From control-plane, run `npm run local:up`. The workspace start-local.ps1 delegates to it. Startup starts Docker Desktop on Windows when needed, waits for PostgreSQL, checks schema setup, imports saved local state once, adds missing demo fixtures/credentials, then starts API, SSO and installed portals. Healthy existing services stay running. Install sibling dependencies beforehand. An SSO start builds its UI only when web-dist/login.html is missing; intentional SSO UI changes use its build command before targeted restart.

| Service | Local address |
|---|---|
| Staff / Admin | http://localhost:5173/admin/applicants |
| Applicant | http://localhost:5174 |
| Control | http://localhost:5175 |
| Student | http://localhost:5176 |
| Keychain | http://localhost:5180 |
| Portal API | http://localhost:8087/health |
| SSO | http://localhost:8090/login |
| PostgreSQL | 127.0.0.1:55432, database/user raisd_local |

Compose source: local/compose.yaml. Project raisd-local, container raisd-local-postgres-1 and persistent volume raisd-local-postgres18 are independent of D:/Coding/cms Supabase. The official PostgreSQL 18 Bookworm template pins an image digest and mounts /var/lib/postgresql. PostgreSQL is exposed on loopback only. No provided command deletes its volume or resets the database.

## Environment and identity

Committed template: local/dev.env.example. Private populated settings: ignored .local/dev.env. Startup generates database credentials and retains the existing local SSO service token and identity file when present. A new workspace receives a generated token and .local/identity.json. Runtime constructs local targets and removes inherited remote DATABASE_URL, SSO, VITE, CMS, notification and SMTP settings. Never print or commit private populated files.

SSO retains its existing durable identity file and memory sessions. Personal accounts, hashes, permanent IDs, memberships, roles and passkeys are preserved; no new SSO database adapter is introduced. Existing .credentials values win. The seed helper fills missing public @raisd.demo and API scenario credentials only, without adding personal accounts to Keychain or resetting passwords. SSO starts from its established Demo seed with saved overrides. Keychain retains its existing ignored generated credential module.

## Import and seed

First cutover backs up legacy state, flow files, identity and credentials under ignored .local/backups. Setup stops only the uniquely verified legacy API, takes a second consistent copy, and imports into an empty, explicitly marked Raisd database in one transaction. Unrecognized/nonempty import targets are rejected. Legacy files stay untouched.

Import covers saved Student graph/overlays when present, Applicant records/revisions/retry receipts, artifact metadata/journeys/grants/chunk bytes and the entire flow document. If no saved graph exists, baseline fixtures use RAISD_SEED_DATE. SQL readback verifies applicant records, policies and evidence bytes before commit. A durable receipt prevents later startup replacing newer database changes with stale files.

`npm run local:seed` adds missing applicant scenarios and Demo credentials; existing cases, files and passwords remain. It is not a reset. LOCAL_PRESERVE_DATA=true makes the API reject incompatible populated schemas instead of automatically reseeding. Schema steps use schema_migrations. No local command targets a remote database.

If future migration IDs are pending against an already populated database, startup asks for local:migrate, which takes a backup first. Empty databases initialize directly. Incompatible record schema versions require an explicit compatible migration rather than fixture replacement.

Portal API memory sessions cannot transfer; sign in again after first cutover. Existing Materials/Classrooms/Community process-memory overlays retain their documented ephemeral lifetime. This setup does not expand their persistence contract. Saved records/evidence/identities form the preservation boundary.

## Commands and recovery

- `npm run local:status`: database and service readiness/addresses.
- `npm run local:test`: environment checks plus isolated database-import and Demo-credential checks.
- `npm run local:restart -- api`: targeted restart; also accepts sso/staff/applicant/control/student/keychain.
- `npm run local:backup`: private file backup and pg_dump custom archive.
- `npm run local:migrate`: database backup then explicit idempotent schema work.
- `npm run local:stop`: stop verified processes recorded by this tool; keep PostgreSQL/data and unrelated services.

Targeted restart may adopt verified legacy API/Vite processes; unknown ownership is refused. Existing unmanaged SSO may require one manual stop before the tool owns its next launch. Logs/receipts live in .local/logs and .local/services.json. Secrets are absent from process arguments.

Failed import rolls back; source files/backups remain. If an initialized database loses its import receipt, setup refuses stale reimport; restore its backup explicitly. Existing application data must never be removed as a troubleshooting shortcut.

## Focused checks

For routine edits, run focused affected checks and keep healthy services running. Before an authorized push, use `npm run verify:push` and `npm run verify:push:status` from control-plane. The opt-in matrix covers portal/browser regressions, API/SSO, shared consumers, contracts, mirrors, disposable PostgreSQL and real HTTP browser journeys. It never pushes or deploys. Receipts/logs are private in `.local/pre-push`. Passed source fingerprints are reused until the relevant inputs change; documentation checks also fingerprint documentation. `-- --only=<check-id>` reruns a selected check, while status still enforces every required check. An unavailable browser/database or failed critical journey is a blocker, not a pass.

Database tests create randomly named databases on the dedicated loopback port 55432 and drop only those test databases. Real browser mutation journeys use independent API/SSO/portal ports and synthetic identities. Do not point them at the interactive database, identity file or hosted services. Private receipts and test traces must not be staged; the sanitized audit report records coverage and limitations separately.

`npm run test:local-dev` checks environment isolation. Portal API scripts/local-database.mjs --test, run with the local runtime environment, creates a random raisd_local_test_* database on the dedicated server, checks rejected targets, rollback, import round trips, idempotency and schema preservation, then removes only that test database. SSO tests/local-demo-credentials.ts uses a temporary credentials directory. Readiness/authenticated reads verify API-to-database integration; repeat startup/restart verifies retention. Unrelated UI suites/shared releases are outside this tooling change.

Reference: [official PostgreSQL Docker image](https://hub.docker.com/_/postgres). Exact remote parity and hosted migration/deployment remain separate work.

## Local activation receipt — 27 October 2026

PostgreSQL 18.6 is healthy on loopback port 55432 with all nine existing schema migration entries. Import retained five saved Applicant states, 89 artifact/journal entries and 21 binary chunks; 3,214 canonical fixture rows supplied the baseline because no saved Student graph file existed. Full saved Applicant records/revisions/retry receipts, the complete policy document, artifact metadata and chunk bytes matched their original source files. SSO identity and existing credential maps remained byte-for-byte unchanged.

Focused environment tests, isolated PostgreSQL import/rollback/idempotency/schema-preservation tests, isolated Demo-credential tests and API local typecheck passed. A repeated startup added zero fixtures/credentials and kept healthy services; a targeted API restart retained an authenticated PostgreSQL applicant session and application reads. The pg_dump archive was readable and contained Applicant/flow tables. Remote and the separate CMS/Supabase stack were not changed. Frontend browser suites and shared-package gates were not run for this local tooling change.

The Student `playwright.http-sync.config.ts` gate now invokes the current owned PostgreSQL/SSO browser harness, covering same-tab Local and International conversion. The former password/popup `tests/audit/http-sync.spec.ts` remains a historical reference and is not a current product workflow. Run this gate separately from the API full-stack browser gate because both own the same isolated test ports.

Keep source stable during the final full replay. Prefer the gate's sequential execution; parallel suites must have disjoint ports, reset state and evidence directories, and must not saturate the host. Campus journey suites reset their owned fixture and run serially. Owned Vite browser fixtures disable file watching so generated HTML traces cannot reload an authentication callback. A failed assertion remains a blocker until diagnosed and rerun successfully against the current source; a resource-related failure is not counted as a pass.

The database matrix also runs `node scripts/verify-push-academic-http.cjs`. It replays the existing Academic pipeline assertions through real loopback TCP/HTTP against its own disposable PostgreSQL database, including API restarts. The adapter fails closed if the source fixture's transport shape changes. Authorization identities are synthetic and the durable SSO store is local to the fixture; the separate full-stack browser gate verifies actual SSO HTTP authentication. These are distinct from Fastify-injection checks and interactive service health.
