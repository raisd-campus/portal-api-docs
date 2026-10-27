# Control portal

## University Flows - 20 October 2026

Control now owns versioned campus Admissions settings under University Flows, separately from SSO access. `/flows` reads the API registry; `/flows/admissions/:campusId` supports draft, validation/scenario preview, publication and immutable history. Pin 0.9.1; shared sources are unchanged. People also supports explicit IO/SSD/QA/Faculty/Bursary/Registry desk assignment for an existing campus Admin. Desk changes retain the upstream custom-role definition reference and module ceiling. Flow publication never grants access. See [University Flows](../backend/university-flows.md) for defaults, local storage and operator steps. Hosted release/deployment is not part of this delivery.


**Host:** `https://control.raisd.co`  
**Repo:** [`raisd-campus/control-portal`](https://github.com/raisd-campus/control-portal) (sibling `~/src/raisd/control-portal`)  
**Auth:** Raisd SSO only (`control` role + `rbac.manage`). No portal password form — `/sign-in` auto-redirects to `sso.raisd.co/login`.  
**UI:** Pin `@raisd-campus/design-system` **0.9.1**. Existing and future pages compose shared package controls (`DetailSectionCard`, `DetailField`, `DropdownSelect`, `SummaryCard`, `Tabs`, `Button`, `Input`, `PortalShell`, …). Do not add local panel/card primitives or copy component source — see [component-library.md](../design/component-library.md). Role permission matrix uses a DS-styled `role="checkbox"` toggle (package has no standalone Checkbox yet). Audit CSV export pages through the API (max 200/request) until the full filtered set is downloaded.

## Intent

Owns **super-admin** identity for the Demo (Contentful Spaces-style, campus-first):

- List campuses and open a campus
- Configure each campus **Admissions workflow** under University Flows (`flows.configure`)
- Define **custom roles** per campus (named permission matrix from the access catalog). A role can enter more than one portal; the matrix shows each selected portal's tree.
- Assign **members** to built-in Campus Admin or custom roles
- Read SSO audit events

**Campus workflow:** Use University Flows → Admissions → campus (also linked from the campus list and campus page). Draft, validate/preview, and publish versioned admissions settings there. Do not invent a parallel admissions configurator outside Control. Publishing never grants portal access. **How publishing works** walks Effective from, pinned applications, and immediate role changes in the shared `Popup`. The same distinction sits on the `DetailField` help icons for Effective from and for role portals. Operator steps: [university-flows.md](../backend/university-flows.md).

The Members tab lists only Control memberships (`admin` or a custom role) and can change a member’s configured role in place. Student, staff, and lecturer **day-to-day** presets remain on Campus Admin Access at `staff.{slug}.raisd.co/admin/access` (`/v1/access/people*`). That page assigns fixed presets only — no module or desk checkboxes — and cannot create custom roles or edit permission matrices.

## Routes

| Path | Purpose |
|---|---|
| `/` | Campus list (member + role counts; links to workflow + members) |
| `/campuses/:campusId` | Members \| Roles tabs; link to Admissions campus workflow |
| `/campuses/:campusId/roles/new` · `.../roles/:roleId` | Permission matrix editor |
| `/flows` | University Flows registry (campus picker for Admissions) |
| `/flows/admissions/:campusId` | Campus Admissions workflow editor |
| `/people` | Global people search; add-to-campus deep-links; review desks |
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
