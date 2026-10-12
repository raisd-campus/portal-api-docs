# Lecturer portal — agent knowledge

**Repository:** [`raisd-campus/lecturer-portal`](https://github.com/raisd-campus/lecturer-portal)  
**SDD:** [SDD-06](../../sdd/06-lecturer-portal.md)  
**Campus agents:** [../AGENTS.md](../AGENTS.md)
**Demo host:** https://raisd-lecturer-portal.vercel.app

## Status

**Demo shell started 11 Oct 2026.** Limkokwing logo + design-system theme. Hosted Demo signs in via `POST /v1/auth/lecturer/login` and publishes LMS materials through Portal API (`listTeachingModules`, `listModuleMaterials`, `publishModuleMaterial`).

| Route | Purpose |
|---|---|
| `/sign-in` | Username/password Demo login (`adam` / `adam2026`, `laura` / `laura2026`) |
| `/` | Workspace — teaching allocations with registered students |
| `/materials` | Publish lecture notes / readings / assignment briefs into student Materials |

**Hosted walkthrough:** After Alya’s modules are Faculty-enrolled, lecturer Adam publishes Week 1 notes → Alya opens Academic → Modules → FDN101 → Materials. Evidence: [E2E student learning](../../reports/e2e-student-learning-lms-2026-10-11/).

Demo ≠ Live. Materials alone is not a complete LMS ([BASE-44](../../sdd/09-requirements-traceability.md)). Does not write CMS.

## Agent rules

1. Implement against SDD-06 and campus [AGENTS.md](../AGENTS.md).
2. Talk only to the Portal API.
3. Student-portal lecturer-review (CAP-30) is a **student-facing** session Demo; do not treat it as the lecturer portal.
4. Install a released `@raisd-campus/design-system` version (currently **0.6.2**). Follow [component ownership and setup](../design/component-library.md) instead of copying student portal UI.
5. When behaviour changes, update this file and [../MANIFEST.yaml](../MANIFEST.yaml).

## Pairing

Student learning surfaces: [student-portal/AGENTS.md](student-portal/AGENTS.md). LMS posture: [../architecture/lms.md](../architecture/lms.md). Staff/QA: [staff-portal.md](staff-portal.md).

## Field standard

Use released shared `Input`, `DropdownSelect` and `DatePicker` controls at 36px height, 14px text and 20px line height across all views and pointer modes. Keep textareas multiline and preserve the geometry of uploads, checkboxes and radios. Follow the [shared component guide](../design/component-library.md#standard-field-sizing); do not implement portal-local sizing overrides.

## Local

```sh
cd ~/src/raisd/lecturer-portal
npm install   # needs GitHub Packages token for @raisd-campus/design-system
npm run dev
npm run check
npm run build:vercel   # then vercel deploy --prebuilt --prod
```

### Verification and publication

The initial shell currently has no unit test files. Vitest reports that absence and permits the gate to continue; lint and TypeScript/build remain required. This is not a claim of unit or browser coverage. Shared deployment CI runs checks on pushes and deploys only on an explicit manual main dispatch with deploy=true.
