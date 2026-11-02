# Local Keychain credentials and upstream reconciliation — 23 October 2026

## Scope

Repair local application-flow Demo Keychain credentials, then stash, pull/review, reconcile and restore local work across Raisd checkouts. No commit, push, hosted rollout, CMS write or database migration/reset is part of this operation.

Keychain uses an ignored SSO email credential map independently from portal-local scenario passwords. The existing SSO seed credentials authenticated all 31 unique SSO identities offered by 34 picker cards. Existing Student/API credentials and application records remain preserved. Optional infrastructure credentials were not fabricated.

## Upstream review

- Control `577d2c94`: mixed custom-role portal selection and publishing help.
- SSO `5f630aab`: expanded portal choices backed by one stored membership.
- Portal API `fbee3a05`: explicit additive schema migration CLI and shared schema statements.
- Control-plane `78059ba2` and public docs `dcb5482f`: publishing/access guidance and database recreation report/navigation.
- Other active checkouts were current. The retired `staff-portal` checkout is clean, but its configured remote returns Repository not found; it was left unchanged.

## Reconciliation

Named stashes include tracked and untracked changes. Earlier stashes are preserved. A separate private checkpoint contains original changed files, binary/staged patches, commit IDs and ignored runtime/credential backups. Local changes are restored unstaged; new safety stashes remain available.

Manifest entries are combined. Generated navigation is rebuilt from the updated canonical source, preserving the new report and local released 0.10.6 component content/captures. Mixed-role login and learner conversion are combined rather than choosing one side. A semantic integration correction preserves virtual Staff sessions on conversion and exposes expanded role keys in header metadata.

The Control cross-portal Staff fixture was stale relative to the owner-approved read-only workspace; it now uses linked records, the assigned fixture campus, read-only assertions and retryable detail loading. It does not restore removed review actions.

## Verification

Results are recorded in the local reconciliation checkpoint and task response. Database migration SQL was reviewed; it is not run on the current Demo or any hosted database. Docker Desktop's database engine was initially unavailable, so source/type checks alone did not establish a PostgreSQL migration integration result. The separately authorized follow-up below closes that local verification gap.

The migration CLI/test helper also accepts the existing physical `cms-student-portal` checkout when `student-portal` is absent, while explicit `STUDENT_PORTAL_ROOT` remains authoritative. Bash syntax and isolated bundling are checked without executing SQL.

Verified after reconciliation: Keychain 21 units/build plus 14 Chromium/WebKit iframe checks; SSO build, eight API suites including mixed-role conversion, and 51 browser checks (one unsupported WebKit virtual-authenticator skip); Control 16 units/build and 22 Chromium/WebKit cross-portal checks; Applicant 97 units/build; Staff 92 units/build; Student 809 units/build, production/asset/token/bundle gates; shared-package complete gate including consumer builds and Chromium/WebKit tests; API typecheck, 69 flow checks, 34 admissions sync checks and 329 lifecycle assertions. Canonical/public mirrors and generated-contract checks are required separately.

Final local activation: all seven services respond HTTP 200 and all 31 unique Keychain SSO accounts authenticate. Applicant and Staff share the expected current pending status. Existing persisted people (including User IDs, password hashes, memberships and passkeys), application records/revisions, journey generations and prior evidence/journal entries are preserved. Verification adds one Applicant-session binding; no new application is created. Policy storage only materializes the three existing canonical display defaults, without changing versions, workflow decisions or policy history. Lifecycle tests now keep their policy file inside their disposable test directory.

All 10 active checkouts match fetched upstream, all 10 local stashes are restored unstaged, all 30 older stashes remain, and the 10 new safety stashes are retained. There are no unresolved merge conflicts. No source commits or pushes were made.

## Docker and migration integration follow-up

On 23 October 2026, Docker Desktop 4.87.0 failed before starting its Linux engine because Windows could not access stale AF_UNIX endpoints in `Docker/run` and `docker-secrets-engine`. With Desktop stopped, those exact runtime directories were renamed aside and recreated. Persistent Docker images, volumes and VM disks were not reset. This follows the directory-preservation workaround reported in [Docker desktop-feedback issue 554](https://github.com/docker/desktop-feedback/issues/554). Engine 29.7.2 then became available.

`npm run test:schema-migrate` passed against a uniquely named, loopback-only disposable `postgres:16` container with temporary in-memory PostgreSQL storage. The suite applied all 9 migrations, checked 19 required tables/views, verified empty fixture tables, and confirmed an idempotent second run with no new ledger entries. Its generated `schema_test_b1ef8f39` database was dropped, and a separate query confirmed no test databases remained before the owned container was removed. Local output is retained in `D:\Coding\raisd\logs\schema-integration-20261023.log`.

No current Demo or hosted database was used for this test. The existing University Flows policy file hash remained unchanged. All seven running portal/API/SSO services still returned HTTP 200 afterward, without being restarted. Docker remains running; existing containers were left in place.
