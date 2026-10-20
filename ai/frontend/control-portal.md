# Control portal

## University Flows - 20 October 2026

Control now owns versioned campus Admissions settings under University Flows, separately from SSO access. `/flows` reads the API registry; `/flows/admissions/:campusId` supports draft, validation/scenario preview, publication and immutable history. Pin 0.9.1; shared sources are unchanged. People also supports explicit IO/SSD/QA/Faculty/Bursary/Registry desk assignment for an existing campus Admin. Desk changes retain the upstream custom-role definition reference and module ceiling. Flow publication never grants access. See [University Flows](../backend/university-flows.md) for defaults, local storage and operator steps. Hosted release/deployment is not part of this delivery.


**Host:** `https://control.raisd.co`  
**Repo:** [`raisd-campus/control-portal`](https://github.com/raisd-campus/control-portal) (sibling `~/src/raisd/control-portal`)  
**Auth:** Raisd SSO only (`control` role + `rbac.manage`). No portal password form — `/sign-in` auto-redirects to `sso.raisd.co/login`.

## Intent

Owns **super-admin** identity for the Demo (Contentful Spaces-style, campus-first):

- List campuses and open a campus
- Define **custom roles** per campus (named permission matrix from the access catalog)
- Assign **members** to built-in Campus Admin or custom roles
- Read SSO audit events

Student, staff, and lecturer **day-to-day** presets remain on Campus Admin Access at `staff.{slug}.raisd.co/admin/access`. That page cannot create custom roles.

## Routes

| Path | Purpose |
|---|---|
| `/` | Campus list (member + role counts) |
| `/campuses/:campusId` | Members \| Roles tabs |
| `/campuses/:campusId/roles/new` · `.../roles/:roleId` | Permission matrix editor |
| `/people` | Global people search; add-to-campus deep-links |
| `/audit` | SSO audit |

## Seed Admins

One campus Admin per Demo campus (`admin.{slug}@raisd.demo`, password `{slug without hyphens}2026`), scoped to that campus via the built-in **Campus Admin** custom role. Shared Bursary and Registry desks still cover every campus.

Magic-link allowlist (team):

- `aslam@raisd.co`, `faid@raisd.co`, `dexter@raisd.co`, `azwan@raisd.co`
- `iman@raisd.co`, `iman.suherman@raisd.co`, `iman.suherman@gmail.com`

## Deploy

```bash
# from control-plane
npm run deploy:vps -- control
```

Legacy host `admin.raisd.co` **301-redirects** to Control.
