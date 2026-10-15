# Raisd SSO — identity, channels, and RBAC

**Status:** Demo — 15 October 2026.  
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
| Full RBAC admin UI | [Admin portal](../frontend/admin-portal.md) → SSO admin APIs |
| Learner SSO access (applicant/student/lecturer) | Staff Registry desk (`sso.manage_learners`) |
| Auto-provision on apply / enrol | Portal API → `POST /v1/internal/people/upsert` |

ADR-1 (CMS as Live SoR) still holds: Demo people are Raisd-local (`cmsPersonRef` optional/null). Live CMS person link is future work.

## Channels

Pluggable `AuthChannel` registry. **Enabled in Demo:** `email_magic_link` and `password`.

| Channel id | Demo | Notes |
|---|---|---|
| `email_magic_link` | On | Passwordless; 15-minute one-time link |
| `password` | On | Email + password; scrypt hashes (`scrypt$salt$hash`) in seed |
| `google` | Off | Stub — needs GCP OAuth client (WG action) |
| `facebook` | Off | Stub |
| `instagram` | Off | Stub |
| `apple` | Off | Stub |
| `passkey` | Off | Stub |

Login identity is **email** (not a separate user id). Magic-link starts always return a generic “if registered, check inbox” response (no enumeration). Password login returns `401` on mismatch. Demo seeds an allowlist of people; first-login create is invite-only.

Password login: `POST /v1/auth/channels/password/login` `{ email, password, returnUrl }` → `{ redirectTo }` or multi-role `{ sessionId, roles, … }`.

## Magic-link flow

1. Client `POST /v1/auth/channels/email/start` `{ email, returnUrl, campusId? }`
2. SSO emails (or Demo-logs) `https://sso.raisd.co/v1/auth/channels/email/consume?token=…`
3. Consume establishes a session; if multiple role assignments → SSO UI role picker
4. Redirect to allowlisted `returnUrl?code=`
5. Client `POST /v1/oauth/token` `{ grant_type: "authorization_code", code }` → access + refresh
6. Portal API validates via `POST /v1/introspect` (service-to-service)

## Roles and RBAC

Portal roles: `applicant` · `student` · `lecturer` · `staff` · `admin`  
Staff desk tags: `bursary` · `registry` · `qa` · `faculty` · `sso_admin`  

| Permission | Who | Can |
|---|---|---|
| `rbac.manage` + `sso.provision` | `admin` role | Create people, any roles, audit |
| `sso.manage_learners` | staff desk `registry` | Create/assign **applicant / student / lecturer** only |

A person may hold **multiple** role assignments (campus-scoped). After login:

- **One role** → auto-select and continue  
- **Many roles** → picker on SSO (and Switch role in portal shells)  
- Landing Sign in uses the same picker, then hands off to `apply|student|staff|teach.{slug}.raisd.co`
- Admin UI: `https://admin.raisd.co`

## Admin

Raisd Admin portal (requires `admin` role) lists people, creates staff/lecturer principals, assigns/revokes any roles, and reads audit events. Raisd team emails are seeded as Admin principals.

## Email delivery

| Env | Behaviour |
|---|---|
| `NOTIFY_BASE_URL` + `NOTIFY_SERVICE_TOKEN` | Magic link emailed via [notifications](notifications.md) (`noreply@raisd.co`) |
| unset (Demo fallback) | Log link at info level; `GET /v1/dev/last-magic-link` for operators |

Never commit SMTP passwords, notify tokens, or magic-link tokens.

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
