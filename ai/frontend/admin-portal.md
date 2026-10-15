# Admin portal

**Host:** `https://admin.raisd.co`  
**Repo:** [`raisd-campus/admin-portal`](https://github.com/raisd-campus/admin-portal) (sibling `~/src/raisd/admin-portal`)  
**Auth:** Raisd SSO only (`admin` role + `rbac.manage`)

## Intent

Owns **full SSO identity / RBAC** for the Demo:

- Register staff and lecturers (and any role)
- Assign / revoke all role keys including `admin` and `staff`
- Read SSO audit events

Staff Registry retains a **learner-only** desk (`sso.manage_learners`) for applicant / student / lecturer access. See [staff-portal.md](staff-portal.md) and [sso.md](../backend/sso.md).

## Seed Admins

Magic-link allowlist (team):

- `aslam@raisd.co`, `faid@raisd.co`, `dexter@raisd.co`, `azwan@raisd.co`
- `iman@raisd.co`, `iman.suherman@raisd.co`, `iman.suherman@gmail.com`

## Deploy

```bash
# from control-plane
npm run deploy:vps -- admin
```
