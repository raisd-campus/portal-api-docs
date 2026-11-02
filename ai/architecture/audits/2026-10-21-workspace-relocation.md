# Raisd Windows workspace relocation - 21 October 2026

Owner requested D:/Coding/raisd and all related Campus folders moved there. Owner explicitly excluded the separate D:/Coding/cms (Limkokwing CMS) project. Mixed branding assets and unrelated projects remain at their original locations.

## Completed layout

Eleven independent repositories were moved, retaining their names: applicant-portal, cms-student-portal, control-plane, control-portal, design-system, keychain, lecturer-portal, portal-api, portal-api-docs, sso and the retired staff-portal. The active Staff portal remains lecturer-portal. The Student recovery package and recovery generator moved to raisd/backups. No repository was cloned, merged, committed or pushed.

raisd.code-workspace opens all 11 repositories. start-local.ps1 invokes the existing local service launcher, which now resolves its canonical sibling paths dynamically. The recovery generator resolves its paths from its own location. Control's repository discovery prefers student-portal when present and falls back to the existing cms-student-portal checkout. The installed personal Student change skill points at the new root, and Codex trust includes the new Student path. Memory files and chat databases were preserved unchanged.

Twelve hidden directory junctions preserve the old project/backup paths without duplicating the files. This keeps existing Codex project settings, current-chat working directories, old sibling references and historical scripts valid while the normal D:/Coding folder view groups the real project under raisd. Codex held the old Student root open, so its contents were moved individually and its now-empty directory became the compatibility junction. The other folders were native same-volume directory moves. The junction mechanism follows [Microsoft's reparse-point API](https://learn.microsoft.com/en-us/windows/win32/api/winioctl/ni-winioctl-fsctl_set_reparse_point); a harmless held-directory probe verified the operation before changing the Student root.

## Preservation and validation

Before path edits, all 11 HEADs, exact working-tree statuses and 2,869 source/configuration hashes matched the pre-move checkpoint. Existing credentials, policy data, identity state, untracked work and staged/unstaged patches were preserved. Original recovery artifacts still match their archived SHA-256 manifests. Checkpoints and logs remain private under raisd/_migration/2026-10-21; do not publish this directory.

The six local service process trees were stopped only after identifying their listener PIDs and original startup provenance. Their API logs contained reads/authentication and no saved/submitted applications. Policy and SSO identity files were reused. API sessions are process-local and require sign-in again after restart; this does not make application/evidence memory durable.

Validation from the new canonical paths passed:

- All six HTTP endpoints: Staff :5173, Applicant :5174, Control :5175, Student :5176, Portal API :8087/health and SSO :8090/health.
- Real SSO -> Applicant browser login: fresh@raisd.demo, zero applications, Create Application available, upload/continuation capability enabled and no page errors. No application was submitted.
- Production builds for Student, Applicant, Staff and Control; SSO's UI build also runs during startup. Existing chunk-size warnings remain.
- Portal API local typecheck, generated flow contract parity and all 60 isolated flow checks.
- Staff Demo source/data parity and JavaScript syntax checks for repository discovery.
- Repository discovery resolves all present repositories; all 11 editor workspace paths exist and all legacy junctions resolve to their canonical targets.
- Canonical/portal/public documentation mirrors, final Git whitespace checks and path/reference audit.

Existing QA, Faculty, IO and SSD local desk assignments remain unconfigured. This move changes filesystem organization and active local launch paths, not access grants, campus policies, hosted deployment or Live CMS behavior.
