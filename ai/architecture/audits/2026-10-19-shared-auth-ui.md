# Shared SSO authentication UI — 19 October 2026

## Scope and ownership

The owner authorized shared controls/tokens/type, a shared auth layout, accessibility
and mobile support, with existing auth/passkey workflows preserved. The agent
announced the additive AuthLayout export before modifying package source. Existing
Button, Input, Popup, typography and token implementations are unchanged.

The design-system 0.9.0 candidate exports AuthLayout with branding, title/description,
tools, form-content and footer slots, a labelled main landmark and one responsive
viewport scroller. It owns presentation only. SSO consumes the exact packed artifact,
not sibling source aliases. Forms use existing Button/Input/Separator, and shared
Popup supplies focus trapping, Escape, accessible dialog labels and focus restoration.

The existing SSO DOM scripts keep password login, forgot/reset, passkey registration
and sign-in, conditional mediation, Keychain and campus role-picker behavior. Native
labels and disabled/busy states are fixed. Password submission aborts conditional
passkey mediation and prevents duplicate saves. A React submit guard prevents
credential-bearing browser GET fallback if a flow chunk is unavailable. The viewport
allows zoom; short/phone/landscape-height content scrolls without horizontal overflow.

SSO now builds Vite assets to ignored web-dist; Fastify serves those assets. Two
pre-existing no-emit typecheck defects were corrected: .ts imports are explicitly
allowed, and Fastify redirects use URL-first arguments while retaining HTTP 308.
No identity, scheduling, fee, persistence or schema policy changed. Existing backend
locked dependency versions are unchanged.

## Verification

- SSO API/UI TypeScript and production build passed against the packed candidate.
- Chromium/WebKit acceptance: 47 passed, one CDP virtual-authenticator-only case
  skipped on WebKit. Password, current campus picker, successful/invalid/mismatched/
  reused reset, direct-link recovery focus, error retry, busy guards, Keychain origin/fill/Escape, unavailable or
  cancelled passkeys, and missing scripts are covered. Chromium completed actual
  WebAuthn registration and sign-in against isolated memory SSO with a virtual device.
  Password submission also quietly aborts pending conditional passkey mediation in both browsers.
- All three pages at 375/768/1440px in both browsers produced 18 axe reports with
  zero violations. A 375x320 viewport kept the action reachable. Focus trapping,
  restoration, native labels and shared 36px/14px input metrics were checked.
- Design-system full npm run check passed: 23 unit tests, build/typecheck and 38
  consumer browser cases. An existing popup test now waits for fonts/animations
  before retaining its exact geometry assertions; CI uses two browser workers.
- Clean backend-only runtime installation passed 14 asset/login/code/introspection
  assertions with no private UI package or React installed at runtime.
- Jenkins helper syntax and three offline rendered-manifest/failure tests passed.
  npm credentials stay in the UI init container; Keychain/Notifications jobs retain
  their existing paths. No actual kubectl writes occurred.

## Implementation-time evidence and release boundary

Detailed logs, packed-candidate integrity, nine reviewed mock captures and 18 axe
reports are under Student's ignored logs/sso-auth-implementation directory. The
candidate capture metadata is prepared separately from the released HTML catalogue.
Screenshots are mock local screens; no hosted identity or SMTP was used.

Docker CLI is present but the Docker Desktop Linux daemon is unavailable, so a real
image build/run is unverified. Physical iPhone and physical passkey devices remain
unverified. The current SSO development pin references the packed 0.9.0 candidate;
registry publication and replacement with a verified released pin/lock remain required
before delivery. Other portal pins stay at 0.8.0. The public released visual catalogue
stays at 0.8.0; candidate captures must be promoted only after publication.

No package publication, commits, pushes, migrations, hosted Jenkins reconfiguration
or deployment occurred. The user's local API on 8087 and Staff Vite on 5173 were
preserved. Test SSO instances use fresh loopback memory and are stopped by Playwright.

## Registry release — 19 October 2026

The owner subsequently authorized 0.9.0 publication, SSO pin replacement and
commits/pushes across affected repositories. This section supersedes the earlier
candidate-only release boundary. The package publisher reused the approved secure
GitHub CLI login and verified write:packages without exposing or storing a token.
The exact archive was published and read back from GitHub Packages before SSO's
dependency changed. SSO's clean registry install, build and complete auth gate
are recorded in the release receipt; other portal pins remain at 0.8.0.

Shared release source: `fd9ea58cfb24e7580dae8adaa66eee08309a84d9` (annotated `v0.9.0`).
Registry/archive integrity: `sha512-oTbJoD3UkTMiHvRGao+7FMG+5Gp20VTpwzMLjon0s5qkmZ3qFMe2XYRuxqk/Yq/D55Op0XvZT1GFNnf18QGl7w==`.
Released shared AuthLayout fixture captures at 375/768/1440px supplement the
historical SSO adapter captures. Existing captures retain their original provenance.
Canonical guidance, SDD and visual/OpenAPI mirrors are synchronized for source
publication. Commit/push receipts remain distinct from hosted deployment proof;
Docker daemon and physical-device limitations above remain unchanged.
