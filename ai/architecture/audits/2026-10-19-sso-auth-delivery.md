# Hosted shared SSO authentication delivery — 19 October 2026

## Result

The shared 0.9.0 login UI is deployed at https://sso.raisd.co/login.
SSO source `1a311727400bb7dd2011bf903d83d1deecdaceea` includes the already verified
shared-auth migration plus a compatible image-permission fix. Shared package
0.9.0, auth policy and existing controls remain unchanged.

[Jenkins SSO build 22](https://jenkins.raisd.co/job/raisd-sso/22/) succeeded,
including UI build, Kaniko image publication and rollout. The running image digest
is `sha256:ac8f7e569bceb08ba24091c421f21768399514467dd6abc4c7d95841c96313a8`.
Control Plane build 30 installed the `/login` readiness probe from
`f758ad6915a794b753e02ad6fd09102940f9ff96`. All 16 Argo applications were
Synced/Healthy at the verification snapshot. Argo manifest revision is separate
from the SSO image/source revision.

## Defect found and corrected

The first image at `c6a21d6` built and rolled out, but public `/login` returned
500: `EACCES: permission denied, stat /app/web-dist/login.html`. The init-container
credential umask 077 also affected the generated public files. Backend `/health`
returned 200, so the earlier readiness probe did not detect the broken UI.

The Dockerfile now runs `chmod -R a+rX ./web-dist` before `USER node`. Only compiled
public files gain read/traverse permissions; credentials and source are untouched.
Kubernetes readiness now checks `/login`; liveness retains `/health`. No root
runtime, permission grants, auth-policy changes, credential changes or database
changes were used to recover delivery. The failure and successful repair are
preserved in Jenkins history.

## Verification evidence

- Three existing offline image-helper regressions, SSO kustomize render and git
  whitespace checks passed before source delivery. Jenkins then built and ran
  the actual corrected image, closing the earlier local Docker-daemon limitation.
- Ephemeral Job `sso-auth-served-proof-20261019` succeeded as UID 1000 using the
  exact image digest, a read-only root filesystem, no service-account token and
  no secret mounts. It verified the 0.9.0 lock integrity and all 16 built files
  against public HTTP SHA-256: login/forgot/reset entries, split JS, CSS, fonts,
  logo and passkey illustration. All returned 200 and matched image bytes.
- Browser checks confirmed one shared AuthLayout, labelled Email/Password fields
  at the shared 36px height, Rubik Variable typography and no horizontal overflow.
  Forgot preserves returnUrl. Reset without a token shows the shared warning;
  dismissing it moves focus to Request another reset link. The user's login tab
  was refreshed to the deployed page. No reset email or password change was sent.
- Current release jobs succeeded: Design System 1, SSO 22, Control Plane 30,
  Portal API 7, Applicant 2 and public docs marker 4. API/Applicant served source
  delivery remains separate from the shared package marker job.
- The [registry/source receipt](2026-10-19-auth-090-release.md) records package
  integrity and the complete isolated Chromium/WebKit auth tests. Physical
  passkey devices remain unverified; this receipt adds hosted image/page proof,
  not a claim of every hosted identity or outbound-email journey.

## Remaining historical capacity limit

Student's unrelated build 1 from 16 October remains failed: the existing guard
requires at least 1536 MiB available memory before its native build. This check
observed less than that while the shared Demo host served applications. It was
not retried under memory pressure, its history was not erased, and its safety
threshold was not lowered. Native Student builds need adequate build capacity;
an approved externally verified artifact is the documented alternative. This
historical failure is not a failure of the current six-repository auth release.

Local API 8087 and Staff Vite 5173 were preserved. Keychain was locked after use;
Jenkins/Argo credentials stayed in process memory and were not logged or committed.
Detailed sanitized receipts, verification Job spec and browser screenshot are under
Student's ignored `logs/sso-deploy-20261019/`. Canonical/public AI mirrors are
synchronized; no shared visual pattern changed during this operational correction.
