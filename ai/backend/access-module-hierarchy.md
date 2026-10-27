# Access module hierarchy (roles and permissions)

**Status:** Demo — 20 October 2026 (Faid review + Control custom roles)  
**Contract:** [`access-module-hierarchy.yaml`](../contracts/access-module-hierarchy.yaml)  
**Hosted diagram:** [`docs/diagrams/access-module-hierarchy.html`](../../diagrams/access-module-hierarchy.html)  
**SSO behaviour:** [sso.md](sso.md)  
**Access UI:** Campus Admin at `staff.{slug}.raisd.co/admin/access`  
**Custom roles:** Control at `control.raisd.co` (campus-first, Contentful-style)

## Intent

Access permissions follow the **portal menu hierarchy**, including **sub-modules** under a parent module where Staff grants them. They are not generic CRUD verbs.

| Layer | Who | Does |
|---|---|---|
| Control / super-admin | Control portal | Creates **campus-scoped custom roles** (named permission sets) and assigns campus members; seeds built-in **Campus Admin** |
| Campus Admin | Staff portal → Access (`/v1/access/people*`) | Assigns fixed Applicant / Student / Staff / Lecturer presets only; cannot edit permission matrices or create custom roles |
| Applicant | Fixed admissions flow | Access preset with `portal.applicant` only — not the student/staff checkbox model |
| Student policy | University | Student portal process/config — not Staff-granted sub-modules in Access |

Staff and Lecturer both store `roleKey` `lecturer` with different permission trees. **Dashboard** is not grantable; it will show stats from the user’s other module access.

## Control custom roles (Contentful-style)

Each custom role stores `entryRoleKeys` (`admin`, `lecturer`, and/or `student`) and a `permissions[]` set from those portals' grantable catalogs. A role may enter more than one portal. `entryRoleKey` remains the first selected portal for older clients. Memberships reference `customRoleId`; SSO resolves permissions **live** from the role definition and, at sign-in, offers one portal choice per selected portal. A token is bound to the portal the person chooses. Built-in **Campus Admin** is not deletable, enters Admin only, and includes the full Admin tree plus `sso.manage_learners`.

## Grantable trees (Access presets + Control matrix)

### Student (lean)

Top-level only — no Access sub-module toggles (Academic children are Uni Policy later):

```
Student portal (portal.student)
├── Academic (student.study)
├── Fees and payments (student.pay)  → Finance menu
└── Support (student.support)
```

### Staff (temporary)

Community is **not** on Staff. Staff modules will be overhauled later:

```
Staff portal (portal.lecturer)
└── Directory (staff.directory)
```

Access assigns this preset as a fixed set (no desk checkboxes). Admin review desks are assigned in Control.

### Lecturer

Classroom workspace tabs are **sub-modules** of Classrooms. Community belongs here:

```
Staff portal (portal.lecturer)
├── Classrooms (lecturer.classrooms)
│   ├── Overview (lecturer.overview)
│   ├── Attendance (lecturer.attendance)
│   ├── Assessments (lecturer.assessments)
│   └── Materials (lecturer.materials)
└── Community (lecturer.community)
```

### Admin (Control-granted)

```
Admin (portal.admin)
├── Overview (admin.overview)
├── Applicants (admin.applicants)
├── Students (admin.students)
├── Payments (admin.payments)
├── Registrations (admin.registrations)
└── Access (admin.access + sso.manage_learners)
```

Staff Admin menus hide modules the active role lacks. Built-in Campus Admin has every Admin module.

## Access UI behaviour

The Access preset editor shows the grantable tree with indented sub-modules under Classrooms. Unchecking a parent clears its grantable children. Checking a child also selects its ancestors so the stored permission set stays coherent. Student presets stay flat.

## Evidence

- Template walkthrough: [e2e-access-templates-2026-10-20](../../reports/e2e-access-templates-2026-10-20/)
- Grant / revoke walkthrough: [e2e-access-control-2026-10-21](../../reports/e2e-access-control-2026-10-21/) (Control Admin + Access presets; prior [20 Oct](../../reports/e2e-access-control-2026-10-20/))

## Related

- CAP-01 / CAP-39 — [SDD-11](../../sdd/11-capability-catalog.md)  
- Staff menus — [lecturer-portal.md](../frontend/lecturer-portal.md)  
- Admin desks — [admin-portal.md](../frontend/admin-portal.md)  
- Control — [control-portal.md](../frontend/control-portal.md)  
- Student nav source — `student-portal` `src/data/portal-sidebar.ts`
