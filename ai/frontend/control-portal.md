# Control portal

**Host:** `https://control.raisd.co`  
**Repo:** [`raisd-campus/control-portal`](https://github.com/raisd-campus/control-portal) (sibling `~/src/raisd/control-portal`)  
**Auth:** Raisd SSO only (`control` role + `rbac.manage`). No portal password form — `/sign-in` auto-redirects to `sso.raisd.co/login`.

## Intent

Owns **super-admin** identity for the Demo:

- Grant or revoke campus **Admin** access only
- Read SSO audit events

Student, staff, and lecturer access — presets and custom permissions — is granted by Admin at `staff.{slug}.raisd.co/admin/access`. The register heading is Register student, Register staff, or Register lecturer. That page is hidden unless the active role is Admin.

## Seed Admins

One campus Admin per Demo campus (`admin.{slug}@raisd.demo`, password `{slug without hyphens}2026`), scoped to that campus. Shared Bursary and Registry desks still cover every campus. The overview lists admins under each campus.

Magic-link allowlist (team):

- `aslam@raisd.co`, `faid@raisd.co`, `dexter@raisd.co`, `azwan@raisd.co`
- `iman@raisd.co`, `iman.suherman@raisd.co`, `iman.suherman@gmail.com`

## Deploy

```bash
# from control-plane
npm run deploy:vps -- control
```

Legacy host `admin.raisd.co` **308-redirects** to Control.
