# AI UI guidance — polished layouts + design system

**Decision:** Working Group CMS standup, 29 Oct 2026 (Faid / Iman).  
**Audience:** Every agent composing or regenerating portal UI.  
**Parent (website should / should not):** [../website-ai-guidance.md](../website-ai-guidance.md).

## Rules

1. **Polished layouts + design system** — When building or revising portal pages, reference polished existing page layouts **alongside** the design system. Do not invent page structure from the catalogue alone, from CMS menu hierarchy alone, or from a fresh layout guess.
2. **Componentize pages and flows** — Express pages and user flows as compositions of **existing** design-system components and established portal patterns. Do not treat every route as a one-off layout or invent new primitives for each desk.

| Use for | Source of truth |
|---|---|
| Tokens, primitives, shared patterns, props | Released `@raisd-campus/design-system` (pin in the portal) + [component-library.md](component-library.md) + [package-catalogue.md](package-catalogue.md) + [design-system.md](design-system.md) |
| Page shell, heading rhythm, panels, tabs, breadcrumbs, loading/empty/error geometry, navigation density | **Polished existing pages** in the same portal (and comparable desks across portals when the pattern is shared) |
| Staff Admin Lesotho desk composition examples | [Lesotho Demo desk wireframes](../../diagrams/old-cms-lesotho/wireframes/) (captures of `staff.lesotho.raisd.co` on DS 0.19.8) |
| Published visual examples | [docs.raisd.co/design-system](https://docs.raisd.co/design-system/) (released catalogue captures) |

Lesotho CMS screenshots and menu crawls are **feature / workflow benchmarks**, not visual layout to copy. Prefer Raisd polished layouts + design-system components over cloning legacy CMS chrome.

## Componentize pages and flows

Map the surface to a shared family first, then supply portal data, callbacks, and workflow ownership.

| Kind of surface | Prefer these package / established patterns | Portal still owns |
|---|---|---|
| App chrome | `PortalShell`, `PortalSidebar`, `PortalHeader`, `PortalBreadcrumb`, `PortalAccount`, `PortalMain`, `PortalPageContent` | Routes, nav model, account, logo, optional sidebar panel |
| Route page frame | `ContentSection` (`type="page"`), `PagePanelLayout`, `TabbedPagePanel`, `TabbedPagePanelBanner`, `PageActionBar`, `InnerSection`, `CardGrid` | Title/copy, tabs, banners, actions, content |
| Lists / directories | `DataTable` (incl. compact cards), `LinkedList`, `AdminTable` / `AdminTableToolbar` / `AdminTableFooter` | Row data, filters, permissions, navigation |
| Record read / edit / create | `DetailSectionCard`, `DetailField`, `FormGrid`, `SummaryCard` / `RecordSummaryCard`; when adopting the family: `AdminRecordWorkspace`, `AdminRecordPanel`, `useAdminRecordFlow`, `AdminRecordActions`, `AdminRecordDialogs` — see [admin-record-flow.md](admin-record-flow.md) | Values, dirty/validation, persistence, routing, photos |
| Multi-step / admissions-style flows | `FlowEditor`, `FlowStepCard`, `FlowStepGroup`, `SortableList`, `Switch`; wizards: `SurveyLayout` / `SurveyChoiceGroup` | Step rules, required/fixed steps, persistence, reviewers |
| Forms and files | `Input`, `DropdownSelect`, `DatePicker`, `ChipField`, `RadioField`, `FileUploadField`, `AddRowButton` / `RemoveRowButton` | Validation, storage, submission |
| Feedback states | `EmptyState`, `QueryErrorState`, `StatusIndicator`, shared loading skeletons inside the same shell | Copy, retry, destinations |

**Componentize means:**

- One reusable layout/flow composition for a desk family (e.g. list → record → read/edit), reused across sibling routes with different data — not a unique markup tree per menu item.
- Shared read vs edit (and create) states through the same components (`DetailField` variants, `AdminRecordFlow` mode, `FileUploadField` readOnly), not separate page implementations.
- Extract a portal-local composition only when two real consumers need it; promote to `@raisd-campus/design-system` when the pattern is portal-neutral (follow [component-library.md](component-library.md) release process).
- Keep workflow, authz, and persistence in the portal adapter — never bake campus rules into shared presentation.

**Do not componentize by:**

- Copying design-system source into a portal, or generating parallel local “staff-panel” / card / table primitives.
- Building a new sidebar, page frame, or flow stepper when `PortalShell`, `PagePanelLayout`, `AdminRecordFlow`, or `FlowEditor` already cover it.
- Inventing components for one page; inventing a second visual system beside the package.

## Before editing UI

1. Read campus [AGENTS.md](../AGENTS.md), this file, [component-library.md](component-library.md), and the portal’s own `AGENTS.md` / feature doc.
2. Open the design-system catalogue for the **pinned** package version (exact props and variants).
3. Classify the surface with the table above; pick the shared family before writing JSX.
4. Inspect the established shell and **at least two comparable completed pages** (same shell, nesting, and content density when possible). For Staff Admin desks, also compare the matching [Lesotho wireframe capture](../../diagrams/old-cms-lesotho/wireframes/) when one exists.
5. Compose with those shared components. Reuse flows and read/edit state patterns from the reference pages.
6. Do **not** invent duplicate menus, parallel navigation trees, one-off page frames, or new primitives when a package component or established page pattern already covers the need.

## Do / don’t

**Do**

- Match heading utility, root vertical rhythm, content width, and panel insets from the reference pages.
- Keep loading, empty, error, and nested-detail states on the same shell geometry as the references.
- Reuse design-system content-section / table / detail / record-flow / flow-editor patterns; adapt data and workflow only.
- Prefer one representative polished page as the layout template, then apply the same componentized approach across sibling routes.
- Prefer package adoption (e.g. deliberate `AdminRecordFlow` / `FlowEditor` upgrade) over local reimplementation when the portal pin supports it.

**Don’t**

- Generate a new visual system or invent components that duplicate the package.
- Treat a menu crawl or screenshot dump as sufficient layout context.
- Duplicate sidebars, headers, page frames, or steppers locally.
- List the same Admin desks in both primary and contextual nav as flat peers — primary uses business **group hubs** on desktop; siblings stay in the group sub-side (see [nav/workflow review](2026-10-30-generated-pages-nav-workflow-review.md)).
- Embed the admissions workspace on Payments or Registrations; keep fee / document / offer clearance on Applicants (and Document review), and module enrolment on Registrations.
- Build each CMS menu item as an independent page layout.
- Change established shared or portal-owned component styling without explicit approval ([component-change guardrail](../AGENTS.md#component-change-guardrail-all-portals)).

## Portal-specific entry points

| Portal | Start |
|---|---|
| Student | [frontend/student-portal/AGENTS.md](../frontend/student-portal/AGENTS.md) · skill [cms-student-portal-page](../skills/cms-student-portal-page/SKILL.md) |
| Applicant | [frontend/applicant-portal.md](../frontend/applicant-portal.md) |
| Staff / Admin desks | [frontend/lecturer-portal.md](../frontend/lecturer-portal.md), [frontend/admin-portal.md](../frontend/admin-portal.md) · [Lesotho wireframes](../../diagrams/old-cms-lesotho/wireframes/) · [admin-record-flow.md](admin-record-flow.md) |
| Control | [frontend/control-portal.md](../frontend/control-portal.md) · [admin-record-flow.md](admin-record-flow.md) (Flows / `FlowEditor`) |

## Related

- Website should / should not: [../website-ai-guidance.md](../website-ai-guidance.md)
- Package ownership and install: [component-library.md](component-library.md)
- Token / layout rules: [design-system.md](design-system.md)
- Admin record / directory flows: [admin-record-flow.md](admin-record-flow.md)
- 0.19.8 review pack: [2026-10-29-design-system-0198-review.md](2026-10-29-design-system-0198-review.md)
