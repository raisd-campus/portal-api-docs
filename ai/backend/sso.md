# Raisd SSO — identity, channels, and RBAC

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
| Full RBAC admin UI | [Control](../frontend/control-portal.md) → SSO `/v1/control/*` APIs |
| Student, staff, and lecturer access | Campus Admin (`sso.manage_learners`) at `staff.{slug}.raisd.co/admin/access` |
| Auto-provision on apply / enrol | Portal API → `POST /v1/internal/people/upsert` |

ADR-1 (CMS as Live SoR) still holds: Demo people are Raisd-local (`cmsPersonRef` optional/null). Live CMS person link is future work.

## Channels

Pluggable `AuthChannel` registry. **Enabled in Demo:** `password` and `passkey`.

| Channel id | Demo | Notes |
|---|---|---|
| `password` | On | Email + password; scrypt hashes (`scrypt$salt$hash`) in seed; forgot-password reset |
| `passkey` | On | WebAuthn on `https://sso.raisd.co/login`. Create a passkey with email + password, then sign in with the passkey alone. Credentials stay in the SSO process memory and reset when the pod restarts. |
| `email_magic_link` | **Off** | API returns `410`; UI removed. Template retained for Live reopen |
| `google` | Off | Stub — needs GCP OAuth client (WG action) |
| `facebook` | Off | Stub |
| `instagram` | Off | Stub |
| `apple` | Off | Stub |

Login identity is **email** (not a separate user id). Password login returns `401` on mismatch. Demo seeds an allowlist of people; first-login create is invite-only.

**Single login UI:** `https://sso.raisd.co/login` is the only password surface. Portals redirect here with `returnUrl` = campus apex (`https://{slug}.raisd.co/?sso=1`) so multi-role accounts see the landing picker. Control uses `https://control.raisd.co/sign-in?sso=1`.

Password login: `POST /v1/auth/channels/password/login` `{ email, password, returnUrl }` → always `{ redirectTo }`. Single-role continues with `?code=`; multi-role returns to the **campus landing** with `?step=roles&session=…`.

Passkey login uses the same redirect. `POST /v1/auth/channels/passkey/login/options` then `…/login/verify`. Registration is `…/register/options` (email + password) then `…/register/verify`. Relying party id is the `SSO_PUBLIC_URL` hostname (`sso.raisd.co`).

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
Campus Admin desk tags: `bursary` · `registry` · `qa` · `faculty` · `sso_admin`  

| Permission | Who | Can |
|---|---|---|
| `portal.control` + `rbac.manage` + `sso.provision` | `control` role | Grant or revoke **campus Admin** only |
| `portal.admin` + `sso.manage_learners` | `admin` role | Campus Admin. Opens the Admin menus on the staff portal |
| `sso.manage_learners` | Admin, and a Registry desk tag | Create and assign **student, staff, and lecturer** presets. Extra permissions outside the preset list are dropped |
| `portal.lecturer` plus staff or lecturer extras | `lecturer` role | Staff portal teaching menus. There is no separate `staff` role key |

There is no `staff` role key. **Staff** and **Lecturer** are both `roleKey` `lecturer`. The landing picker labels that role **Staff** (hint: Staff portal). **Admin** stays **Admin** (hint: Staff portal · Registry, Faculty, Bursary).

| Preset | Stored role | Permissions |
|---|---|---|
| Student | `student` | `portal.student`, `student.study`, `student.register`, `student.pay`, `student.results`, `student.support` |
| Staff | `lecturer` | `portal.lecturer`, `staff.dashboard`, `staff.directory`, `staff.community`. Optional desks: `bursary`, `registry`, `qa`, `faculty` |
| Lecturer | `lecturer` | `portal.lecturer`, `lecturer.classrooms`, `lecturer.materials`, `lecturer.attendance`, `lecturer.marking` |

Campus Admin (`admin.{slug}@raisd.demo`, password `{slug without hyphens}2026`) is `roleKey` `admin` on `campus-{slug}` with an empty desk list. Shared `registry@raisd.demo` and `bursary@raisd.demo` are `admin` with the matching desk tag. Registry’s desk permission also includes `sso.manage_learners`.

The Access page register heading follows the selected preset: **Register student**, **Register staff**, or **Register lecturer**. Applying a preset does not remove an existing Admin or Control assignment.

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
- Control UI: `https://control.raisd.co` (legacy `admin.raisd.co` → 308)

## Admin

Control portal (requires `control` role) grants or revokes campus Admin access and reads audit events. People and audit responses omit every role other than Admin. Student, staff, and lecturer access is granted by Admin in the staff portal.

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
