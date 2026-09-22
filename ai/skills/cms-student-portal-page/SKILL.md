---
name: cms-student-portal-page
description: Create or substantially restructure route-level pages in raisd-campus/student-portal by matching established portal shells, route states, navigation, and desktop verification. Do not use for isolated component, content, or CSS edits.
---

# CMS Student Portal Page

Build route-level pages that look and behave like they belong to the existing Student Portal.

**Canonical knowledge:** `control-plane/docs/ai/`  
**Portal agents:** [../../frontend/student-portal/AGENTS.md](../../frontend/student-portal/AGENTS.md)  
**Handoff:** [../../frontend/student-portal/handoff.md](../../frontend/student-portal/handoff.md)  
**Design system:** [../../design/design-system.md](../../design/design-system.md) or [../../frontend/student-portal/design-system.md](../../frontend/student-portal/design-system.md)

When working from a sibling checkout, the application code is `~/src/raisd/student-portal`. Prefer the control-plane knowledge base paths above over any stale absolute Windows paths.

## Establish page references

Before editing:

1. Confirm the checkout is `raisd-campus/student-portal` (local `~/src/raisd/student-portal`), inspect `git status --short --branch`, and preserve existing changes.
2. Read campus `docs/ai/AGENTS.md`, `frontend/student-portal/AGENTS.md`, `handoff.md`, `design-system.md`, `sidebar-behavior.md`, and the affected feature document.
3. Inspect the main application shell and at least two comparable completed route pages. Prefer pages with the same shell, nesting, and content density.
4. Record a compact reference matrix:

| Concern | Reference page A | Reference page B | New page decision |
| --- | --- | --- | --- |
| Heading utility and size | | | |
| Root vertical rhythm and width | | | |
| Tabs, panels, or breadcrumbs | | | |
| Loading, error, empty, and unavailable geometry | | | |
| Sidebar activation and route reset | | | |

Do not invent a raw typography or spacing treatment when the references already share a system component or variant. Stop and obtain a product decision before introducing an intentional page-shell divergence.

## Map the change surface

Identify the route identity and lazy boundary, shell owner, queries or contracts the page consumes, shared and feature-owned components, navigation state, documentation, and verification. Keep data and API layers unchanged unless the page genuinely requires a different boundary.

Inventory existing `components/system` patterns before adding a component. Keep a pattern feature-owned until it has more than one real consumer or the product owner explicitly approves it as portal-wide. When a new shared pattern is justified, update all consumers, the Design System Explorer, design documentation, and focused tests together.

Treat every standalone compact label/value summary surface as a `SummaryCard` candidate. Read its current rules in the design-system document, then compose only the slots the page needs: optional label, required value, optional action, description, summary columns, indicators, and supporting content. The card owns its heading/metric, label, column-value, padding, divider, and gap typography; semantic headings supplied as values should not repeat those classes. Do not force `StudentSummaryCard`, compact accordion-trigger metrics, table or popup totals, or chart cards into `SummaryCard`.

## Map multi-step workflows by state

When a route uses numbered or named progress steps, read [references/step-workflows.md](references/step-workflows.md) before editing. Map every visible state to an established workflow archetype and record its summary, supporting section, status, and allowed actions. Compare the target against the Graduation implementation and its browser tests; a shared shell alone is not sufficient evidence of consistency.

## Build the complete route state

- Reuse the established page-heading utility, root spacing, content width, panel or breadcrumb composition, and main-scroll behavior from the reference matrix.
- For a nested detail route, keep the parent page heading, tabbed panel, and active parent tab mounted when the references do. Begin the inner breadcrumb with the immediate parent tab or list view rather than repeating the outer page heading.
- Keep normal, loading, read-error, valid-empty, unavailable-ID, and nested-detail states on the same shell geometry.
- Preserve lazy loading, URL-backed tab or filter state, browser Back/Forward, active sidebar state, active-tab reset behavior, and main-scroll reset where the comparable routes support them.
- Preserve keyboard access, focus, hover, disabled behavior, semantic tokens, and the current 1280px and 1440px desktop scope.
- Give summary-card loading states the same slot anatomy as the completed card by composing the shared card with skeleton content instead of substituting an unrelated rectangle.
- Document the implemented behavior rather than future intent. Update canonical docs under `control-plane/docs/ai/frontend/student-portal/` and mirror into `student-portal/docs/`.

## Verify and hand off

During implementation, run focused component, route, and navigation tests. Add an assertion for the shared page heading and root rhythm so shell drift is observable.

Before completion:

1. Exercise the route at 1280px and 1440px, including navigation, loading/error or unavailable states where practical, and desktop overflow.
2. Run the repository change-surface audit.
3. Run `npm run check:all` for a new page or substantial shell restructure.
4. Update canonical `handoff.md` and the `student-portal` mirror with exact results, warnings, and anything intentionally deferred.

Do not commit or push unless the user explicitly requests it.
