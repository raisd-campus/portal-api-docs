# Raisd SSO — identity, channels, and RBAC

## University Flows permissions - 20 October 2026

Control roles receive the targeted flows.configure capability upgrade; persisted identities, passkeys and unrelated grants are retained. IO and SSD add desk.international_office and desk.student_services capabilities without assigning them to existing people. An active Control role is required to configure policies; active campus Admin review roles remain separate. The fixed Applicant role and upstream permission ceilings/hierarchy are unchanged. Isolated tests verify the upgrade, custom-role definition/membership retention and passkey persistence. Node HTTP/persistence suites run under npm run test:api; Playwright collects auth.e2e.ts only. npm run check runs both suites after the build. See [University Flows](university-flows.md).


**Status:** Demo — 17 October 2026.  
**Host:** `https://sso.raisd.co`  
**Service repo:** [`raisd-campus/sso`](https://github.com/raisd-campus/sso) (sibling `~/src/raisd/sso`)  
**Contract:** [`openapi-sso.yaml`](../../../openapi-sso.yaml)  
**Topology:** [../architecture/vps-topology.md](../architecture/vps-topology.md)

## Intent

SSO owns **identity + RBAC**. Portal API owns campus Demo/Live data. Portals never open Postgres; they authenticate via SSO and call Portal API with a Bearer access token.

| Concern | Owner |
|---|---|
| Login channels, sessions, role assignments | SSO |
| Portal records, CMS adapter, Demo scenarios | Portal API |
| Full RBAC admin UI | [Control](../frontend/control-portal.md) → SSO `/v1/control/*` APIs (campuses, custom roles, members) |
| Student, staff, and lecturer access | Campus Admin (`sso.manage_learners`) at `staff.{slug}.raisd.co/admin/access` |
| Auto-provision on apply / enrol | Portal API → `POST /v1/internal/people/upsert` |

ADR-1 (CMS as Live SoR) still holds: Demo people are Raisd-local (`cmsPersonRef` optional/null). Live CMS person link is future work.

## Channels

Pluggable `AuthChannel` registry. **Enabled in Demo:** `password` and `passkey`.

| Channel id | Demo | Notes |
|---|---|---|
| `password` | On | Email + password; scrypt hashes (`scrypt$salt$hash`) in seed; forgot-password reset |
| `passkey` | On | WebAuthn on `https://sso.raisd.co/login`. Create a passkey with email + password, then sign in with the passkey alone. People, passwords, roles, and passkeys are written to `SSO_STATE_FILE` (`/var/lib/sso/state.json` on the node path `/var/lib/raisd-sso`) and survive a pod restart. Sign-in challenges stay in memory for their short lifetime. |
| `email_magic_link` | **Off** | API returns `410`; UI removed. Template retained for Live reopen |
| `google` | Off | Stub — needs GCP OAuth client (WG action) |
| `facebook` | Off | Stub |
| `instagram` | Off | Stub |
| `apple` | Off | Stub |

Login identity is **email** (not a separate user id). Password login returns `401` on mismatch. Demo seeds an allowlist of people; first-login create is invite-only.

**Single login UI:** `https://sso.raisd.co/login` is the only password surface. Portals redirect here with `returnUrl` = campus apex (`https://{slug}.raisd.co/?sso=1`) so multi-role accounts see the landing picker. Control uses `https://control.raisd.co/sign-in?sso=1`.

Password login: `POST /v1/auth/channels/password/login` `{ email, password, returnUrl }` → always `{ redirectTo }`. Single-role continues with `?code=`; multi-role returns to the **campus landing** with `?step=roles&session=…`.

Passkey login uses the same redirect. `POST /v1/auth/channels/passkey/login/options` then `…/login/verify`. Registration is `…/register/options` (email + password) then `…/register/verify`. Relying party id is the `SSO_PUBLIC_URL` hostname (`sso.raisd.co`).

The SSO image runs as uid 1000. Before the process starts, an init container chowns `/var/lib/sso` to that user so passkey writes succeed on the hostPath volume.

## Forgot password

1. Login UI → **Forgot password?** → `/forgot`
2. `POST /v1/auth/channels/password/forgot` `{ email, returnUrl? }` — always vague “if an account exists…” (no enumeration)
3. SSO emails (or Demo-logs) `https://sso.raisd.co/reset?token=…` via notifications template `password_reset` (15-minute one-time link)
4. User sets a new password (≥8 chars) on `/reset` → `POST /v1/auth/channels/password/reset` `{ token, password }`
5. Redirect to `/login?reset=1` (and original `returnUrl` when allowlisted)

Demo fallback when `NOTIFY_*` unset: log the link; operators can read `GET /v1/dev/last-password-reset`.

## Magic-link flow (disabled)

Channel `email_magic_link` is **disabled** on Demo (`410` on start/consume). Keep the implementation and `magic_link` email template for a future Live reopen. Prefer password + forgot-password.

## Roles and RBAC

Portal roles: `applicant` · `student` · `lecturer` · `admin` · `control`  
Campus Admin desk tags: `bursary` · `registry` · `qa` · `faculty` · `sso_admin` · `international_office` · `student_services`

| Permission | Who | Can |
|---|---|---|
| `portal.control` + `rbac.manage` + `sso.provision` | `control` role | Campus-first custom roles + memberships; grant/revoke Admin via built-in or custom roles |
| `portal.admin` (+ module permissions) | `admin` role | Campus Admin. Staff Admin menus follow `admin.*` permissions; Access needs `admin.access` + `sso.manage_learners` |
| `sso.manage_learners` | Admin (with Access), and a Registry desk tag | Create and assign **student, staff, and lecturer** presets. Extra permissions outside the preset list are dropped |
| `portal.lecturer` plus staff or lecturer extras | `lecturer` role | Staff portal teaching menus. There is no separate `staff` role key |

There is no `staff` role key. **Staff** and **Lecturer** are both `roleKey` `lecturer`. The landing picker labels that role **Staff** (hint: Staff portal). **Admin** stays **Admin** (hint: Staff portal · Registry, Faculty, Bursary).

| Preset | Stored role | Permissions |
|---|---|---|
| Applicant | `applicant` | `portal.applicant` only (fixed — no module toggles) |
| Student | `student` | Lean: `portal.student`, `student.study`, `student.pay`, `student.support` (no Access sub-modules) |
| Staff | `lecturer` | Temporary: `portal.lecturer`, `staff.directory`. Optional desks: `bursary`, `registry`, `qa`, `faculty`. No Community / Dashboard grant |
| Lecturer | `lecturer` | `portal.lecturer`, Classrooms (`lecturer.overview`, `attendance`, `assessments`, `materials`), `lecturer.community` |

Permissions follow the **portal menu hierarchy**, with Lecturer Classrooms → Overview / Attendance / Assessments / Materials and Lecturer Community. Student Access permissions are top-level; its process rules belong to University Flows. **Applicant** is a separate fixed admissions role. Contract and diagram: [access-module-hierarchy.md](access-module-hierarchy.md), [`access-module-hierarchy.yaml`](../contracts/access-module-hierarchy.yaml), [hosted diagram](../../diagrams/access-module-hierarchy.html). Applicant list review: [applicant-list-review.md](applicant-list-review.md). Campus configurability help: [campus-configurability.md](campus-configurability.md).

Campus Admin (`admin.{slug}@raisd.demo`, password `{slug without hyphens}2026`) is `roleKey` `admin` on `campus-{slug}` with an empty desk list. Shared `registry@raisd.demo` and `bursary@raisd.demo` are `admin` with the matching desk tag. Registry’s desk permission also includes `sso.manage_learners`.

The Access page register heading follows the selected preset: **Register applicant**, **Register student**, **Register staff**, or **Register lecturer**. Applicant shows a fixed permission line; student/staff/lecturer show indented modules and sub-modules (clearing a parent clears its children). The **same role can be assigned to many users** — tick rows and use **Apply {preset} to selected**, or Apply on each card. Applying a preset does not remove an existing Admin or Control assignment. Hosted walkthroughs: [access templates](../../reports/e2e-access-templates-2026-10-20/index.html), [applicant list review](../../reports/applicant-list-review-2026-10-20/index.html), [joint granular access demo](../../reports/joint-granular-access-2026-10-20/index.html).

## Staff portal menus

Menus follow the **active** role. Hiding a menu is not the security check; SSO and Portal API still reject the call.

| Active role | Host | Menus |
|---|---|---|
| `lecturer` (Staff or Lecturer preset) | `staff.{slug}.raisd.co` | Dashboard, Classrooms, Community. No Admin group |
| `admin` | `staff.{slug}.raisd.co/admin` | Overview, Applicants, Students, Payments, Registrations, Access. No Dashboard, Classrooms, or Community |
| `control` | `control.raisd.co` | Campus Admin grants only |

Access lists people with the Admin SSO token. A Staff or Lecturer token does not have `sso.manage_learners`.

Portal API exchange for `admin` creates a staff session (Bursary when that desk tag is present, otherwise Registry), including a campus Admin with no desk tags. Community accepts a lecturer session. It also accepts that staff session when the same email is linked to a teaching record. A campus Admin who is not a lecturer does not get the Community panel.

A person may hold **multiple** role assignments (campus-scoped). After login:

- **One role** → auto-select and continue to `returnUrl?code=`  
- **Many roles** → **campus landing** portal picker (`{slug}.raisd.co/?step=roles&session=…`). Labels: Applicant, Student, Staff (`lecturer`), Admin (`admin`), Control. Handoff is `apply|student|staff.{slug}.raisd.co` (Admin opens `staff.{slug}.raisd.co/admin`) or `control.raisd.co`  
- Portals may still offer **Switch role** in-shell after an active session  
- Control UI: `https://control.raisd.co` (legacy `admin.raisd.co` → 301)

## Admin

Control portal (requires `control` role) is campus-first: list campuses, define **custom roles** (`entryRoleKey` + `permissions[]`), assign members (`customRoleId` on the assignment), and read audit events. Built-in **Campus Admin** per campus is not deletable and includes every Admin module plus `sso.manage_learners`. Permissions resolve live from the custom role on `/v1/me` and introspect. People and audit responses for Control actors omit every role other than Admin. Student, staff, and lecturer day-to-day presets are still granted by Admin in the staff portal.

Control APIs: `GET /v1/control/campuses`, `/v1/control/campuses/{campusId}/roles`, `/v1/control/campuses/{campusId}/members`, plus existing people/audit routes.

## Email delivery

| Env | Behaviour |
|---|---|
| `NOTIFY_BASE_URL` + `NOTIFY_SERVICE_TOKEN` | Password reset (and legacy magic link) emailed via [notifications](notifications.md) (`noreply@raisd.co`) |
| unset (Demo fallback) | Log link at info level; `GET /v1/dev/last-password-reset` (and `last-magic-link`) for operators |

Never commit SMTP passwords, notify tokens, or reset/magic-link tokens.

## Related

- CAP-01 / CAP-39 — [SDD-11](../../sdd/11-capability-catalog.md)  
- Portal API dual auth — [portal-api.md](portal-api.md)  
- Phase 4 identity — [portal-api-development-plan.md](portal-api-development-plan.md#phase-4)  

## Integrated Demo bridge verification — 15 October 2026

Portal API exchange maps only explicitly known Student/Applicant emails, allocated
Lecturer accounts and Registry/Bursary desks. An active but unlinked identity gets
403; unknown password-login emails get 401. No role or email can fall back to a
different default person. Lecturer responses retain staffMemberId and recorded
academicTitle, and the portal preserves its HTTP runtime/session on restore.

All four portal sign-in effects share one in-flight code exchange under React
StrictMode. Unmount cancels subsequent UI/session work; password Keychain appears
only when scenario login is explicitly enabled on those desks. Isolated API
coverage includes 48 assertions; browser verification uses a local SSO fixture.
This bridge remains Demo: its API bearer lifetime is independent after exchange;
continuous SSO revocation and durable Live person binding are not claimed here.

## Local role-boundary regression — 19 October 2026

The isolated SSO/Classrooms suite passes 82 assertions using current `admin`,
`lecturer` and `control` role keys. It rejects retired `staff` identities and
teaching tokens on all privileged staff methods while retaining classroom access.
See [upstream fix verification](../architecture/audits/2026-10-19-upstream-fixes.md).

## Shared authentication presentation — released 0.9.0

SSO's login, forgot-password and reset-password are composed from shared
`AuthLayout` (released 0.9.0), existing Button/Input/Separator/Popup,
semantic surfaces/status colours and package Rubik/type utilities. The SSO app
owns form validation, pending/error states, Keychain, passkeys, return URLs and
password/reset policies. No existing shared control or token is changed.

The responsive auth frame has one viewport scroll region, labelled main/heading
and description, consumer branding/tools/footer slots and wrapping long content.
SSO adds explicit input labels, native disabled states, live progress and shared
dialog focus trapping/restoration. Forms prevent native GET submission while
flow scripts load or fail. Pinch zoom is retained. See
[implementation and acceptance](../architecture/audits/2026-10-19-shared-auth-ui.md).
SSO pins the integrity-verified 0.9.0 GitHub Packages release with no sibling archive or source alias. Package publication and source delivery do not establish hosted SSO deployment; verify the delivered image and page separately.

Hosted auth acceptance requires `/login`, `/forgot`, `/reset` and their assets to
return successfully from the non-root image. CI generates files under umask 077;
image assembly grants read/traverse access to compiled public `web-dist` only.
Readiness checks `/login`; liveness remains `/health`. This prevents backend
health from masking an unreadable UI.

### Auth composition refinements — 19 October 2026

Login omits the introductory campus sentence, passkey setup helper paragraph and
passkey sign-in icon. The create-passkey action retains its existing validation
and prompt flow. The common auth footer reads `© {current year} Raisd AI Sdn. Bhd.
All rights reserved.` on login and password recovery. Authentication notices use
Popup content with shared DialogDescription so the visible message remains the
accessible dialog description; the header contains only its title. Shared package
0.9.0 and shared component sources are unchanged.

The composition update passed SSO build/typecheck and all isolated auth acceptance
checks: 47 passed, one Chromium-only virtual-authenticator case skipped on WebKit.
Coverage includes 375/768/1440px pages, dialog-body description/axe checks, focus
restoration, password/reset and passkey flows.

### Keychain picker context and fit

The Keychain iframe receives an optional campus-filter hint from the existing
campusId or return URL hostname. Keychain validates it against its campus list;
selection only filters Demo account records and never changes the SSO return URL,
role assignment or login payload. The host measures trigger position plus panel
margins/borders to keep the iframe inside short viewports. See the
[Keychain picker guide](../frontend/keychain.md#embedded-account-picker--19-october-2026).

### Logo placement - 19 October 2026

SSO opts into shared AuthLayout `brandingPlacement="above"` from 0.9.1: the university logo is centred outside and above the card on login, forgot password and reset password. Branding remains in a page header landmark; forms, status popups, passkeys, redirects and Keychain retain their existing behavior. No local CSS override is used.
