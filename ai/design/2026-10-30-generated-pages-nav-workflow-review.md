# Generated pages review — usable navigation + coherent workflows

**Date:** 30 Oct 2026  
**Source:** Working Group standup 29 Oct action (Iman)  
**Code:** `lecturer-portal` Staff Admin (`src/staff-admin`, `src/pages/shell.tsx`)

## Findings

| Issue | Impact |
|---|---|
| Flat 16-item primary sidebar **and** grouped sub-side listed the same desks | Duplicate menus; hard to scan |
| Sub-side labelled literally “Sub-side” | No business meaning |
| Breadcrumb was a single crude path segment | No group → desk trail |
| **Payments** stacked legacy payment queue **plus** a second `AdmissionsWorkspace` | Two queues for one bursary job |
| **Registrations** tab “Admissions clearance” re-hosted the same admissions workspace | Admissions workflow fragmented across four menus |
| Many desks still one-off layouts (legacy `staff-*` on Payments) | Not yet fully DS-componentized |

## Improvements shipped (30 Oct)

1. **Single IA source** — `staff-admin/lib/admin-nav.ts` owns Admissions → Registry → Finance → Completions → Teaching → Oversight.
2. **Usable navigation**
   - Desktop primary: **group hubs only**; sub-side: sibling desks under the active group (header = group name).
   - Phone/tablet: grouped leaf items (no sub-side).
3. **Breadcrumbs** — `Group › Desk` via `PortalHeader` structured breadcrumbs.
4. **Coherent workflows**
   - Payments: one admissions payment queue + links to Applicants / Document review (no stacked workspace).
   - Registrations: module requests only + link to Applicants for admissions clearance.

## Still open (next passes)

- Migrate Payments off legacy `staff-table` / `staff-panel` onto `DataTable` + `DetailSectionCard` (or `AdminRecordFlow` when adopting).
- Shared list→record shell for Students / Remarks / Discipline.
- Recapture [Lesotho desk wireframes](../../diagrams/old-cms-lesotho/wireframes/) after nav chrome change.
- Broader website-specific AI do/don’t guide (separate standup action).

## Agent rule

Continue to follow [ai-ui-guidance.md](ai-ui-guidance.md): polished layouts + componentize; do not reintroduce duplicate primary/sub-side leaf lists or embed AdmissionsWorkspace on Finance/Registry desks.
