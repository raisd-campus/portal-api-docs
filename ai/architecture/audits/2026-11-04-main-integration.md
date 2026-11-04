# Main integration verification — 4 November 2026

Scope: ten active Raisd repositories. The owner authorized merging current main, preserving local and remote work, resolving conflicts, testing and pushing to main. The retired Staff checkout is excluded. Private checkpoints retain the starting commits, index/worktree patches, untracked files and stash inventories.

## Integration

- Retain the released shared 0.26.0 package across all active portal/authentication consumers, together with the newer remote Staff desks, Lesotho position roles, playback tools and documentation.
- Preserve the full Staff Academic catalogue beside the remote attendance/gradebook overview at `/admin/academic/overview`. Preserve nested Admissions record links, breadcrumbs, permissions and programme-fee maintenance.
- Combine API route registrations, reviewer presentation, financial gates and remote rank/extract/recommendation fields rather than choosing an entire conflict side.
- Global imports the canonical shared defaults. Distinct Lesotho review/catalogue defaults remain isolated; explicitly identical legacy fixtures still verify the all-campus migration path.
- Persist later Admissions clearance/Offer/English projections when they semantically change, preserving the accepted handoff and avoiding timestamp-only read writes.
- Update regression fixtures to use approved fixed Registration Fee tariffs, registration-window columns, removed wording/reason controls and responsive status wrapping. Retain all authorization, evidence, concurrency, retry, history and immutable-policy assertions.
- Avoid the synthetic browser clock pause racing its installation; wait for the rendered Student scenario before issuing Graduation navigation.
- Keep Modules selected when a nested Study Plan was opened from a Module, including the merged desktop related-desks navigation. Exercise the new desktop links and compact grouped buttons rather than the retired menu structure.
- Synchronize browser actions with completed eligibility confirmation and rendered destination headings. Immediate reloads or repeated Close clicks could otherwise cancel a mutation or act on the previous page.

## Verification

The required `verify:push` matrix records private per-check logs and source fingerprints. Mocked portal/browser checks, authenticated HTTP integration and disposable PostgreSQL checks are reported separately. Registration-window and semester-payment HTTP/PostgreSQL suites run in addition to that matrix. Browser matrices include Chromium and WebKit phone/tablet layouts; intentional capability skips remain limitations rather than successful checks.

### Recorded coverage

| Area | Result |
| --- | --- |
| Active repositories | Full lint, unit, type and production-build checks passed; production dependency security gates passed |
| Shared components | 83 unit tests, 83 Chromium tests and 84 WebKit tests passed; 4 declared skips |
| Control | 200 Chromium/WebKit browser checks passed |
| Staff Academic | 380 responsive Chromium/WebKit browser checks passed |
| Applicant presentation | 77 base browser checks, 8 flow checks and 7 handoff checks passed |
| Applicant campus journeys, legacy policies | 20 checks passed |
| Applicant campus journeys, workflow templates | 20 checks passed |
| Student | 338 Chromium checks passed with 46 declared skips; 44 WebKit checks passed with 31 declared skips; authenticated HTTP synchronization passed |
| SSO and Keychain | SSO browser matrix: 51 passed, 1 declared skip; Keychain Chromium/WebKit: 14 passed |
| API and persistence | Admissions, Academic, lifecycle, authorization, contracts and disposable PostgreSQL matrix passed |
| Additional payment/window checks | 13 registration-window API checks and 209 semester-payment HTTP/PostgreSQL assertions passed |
| Real identity handoff | Local desktop Chromium and International phone WebKit passed against real loopback SSO HTTP and disposable PostgreSQL |

The persistence matrix covers draft concurrency, stale revisions, retry receipts, rollback, migration retries, restart persistence, reviewer eligibility, cross-person/campus denial, payment ownership and retained policy snapshots. The owned Academic HTTP pipeline verifies separate review, accepted programme/version identity and common/selected-stream registration without copied fees or registrations. Mocked presentation checks are not substitutes for this functional integration evidence.

Early failed and stale runs remain in private diagnostic logs. Fixtures were updated to the current contracts; navigation waits now observe completed mutations and rendered destinations. A Windows `ERR_NO_BUFFER_SPACE` run was repeated with bounded overall concurrency. Only current passing source-fingerprint receipts count toward the push gate.

### Preservation and limits

- All 116 interactive Raisd database tables match their pre-test row-count/content hashes. Test writes and resets use disposable stores/databases and synthetic accounts.
- Existing stash inventories are unchanged in all ten repositories. The retired Staff checkout remains unchanged.
- Private checkpoints and test logs are excluded from commits. Changed files were checked for conflict markers, credential patterns and unintended local artifacts.
- Declared skips are excluded from passing test counts. Automated WebKit is not physical-device Safari proof; this report makes no hosted-runtime or remote-database parity claim.
- No database migration, reseed, Global publication, package publication or deployment command is part of this integration.

### Repeatable gate

Run `npm run verify:push` from control-plane, then `npm run verify:push:status`. Main publication requires **51/51 current passing checks**, with no unresolved critical journey. Per-check source fingerprints and detailed logs live in the ignored `.local/pre-push/` directory. Relevant source changes invalidate their receipts; ordinary local UI work continues to use proportionate focused checks.
