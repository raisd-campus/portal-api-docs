# Lesotho Demo desk wireframes

**Status:** Candidate wireframes for team review. Not Live CMS. Not production captures.  
**Open:** [index.html](index.html)

Maps **ingested newer-CMS Lesotho Admin screenshots** and Demo Staff Admin routes onto Raisd layouts that reuse `@raisd-campus/design-system` patterns (current catalogue **0.19.8**).

## Shell — two-level side menus

Every desktop frame uses `PortalShell` with:

1. **Primary side** — labelled `PortalNavGroup` / `PortalNavItem` list (Admin desks).
2. **Sub-side (right of primary)** — contextual `aside` panel (`LinkedList` rhythm) for the active domain: Admissions, Registry, Finance, Completions, Teaching, or Oversight. Mirrors the newer-CMS left-hand menu’s expandable groups without cloning Live chrome.

Phone frames hide both sides (drawer pattern). Table cells, crumbs, titles, and nav labels use ellipsis + `min-width: 0` so text does not overlap.

## Page → module → design-system map

| Wireframe | Route | FM | Primary DS building blocks |
| --- | --- | --- | --- |
| Applicants | `/admin/applicants` | FM-03 / FM-05 | `SummaryCard`, `SegmentedTabs`, `DataTable`, `ChipField`, `RadioField`, `PageActionBar`, `AuditTrail`, `Popup` |
| Document review | `/admin/document-review` | FM-04 | `IssueCard`, `FileUploadField`, `DataTable`, `DetailField`, `Button` |
| Payments | `/admin/payments` | FM-09 | `SummaryCard`, `SegmentedTabs`, `DataTable`, `Badge`, `PageActionBar` |
| Fees & Fines | `/admin/fees` | FM-09 | `Switch`, `ChipField`, `DetailSectionCard`, `DataTable` |
| Registrations | `/admin/registrations` | FM-08 | `DataTable`, `ChipField`, `Badge`, `PageActionBar` |
| Sponsors | `/admin/sponsors` | FM-08 | `DetailSectionCard`, `LinkedList`, `Input`, `DataTable` |
| Students list | `/admin/students` | FM-07 | `SummaryCard`, `DataTable` / `AdminTable`, `ContentSection` |
| Student file (12 tabs) | `/admin/students · *` | FM-07 | `AdminRecordWorkspace`, `TabbedPagePanel`, `FileUploadField`, `AuditTrail`, `AdminRecordActions` |
| Graduations | `/admin/graduations` | FM-10 | `SummaryCard`, `DetailSectionCard`, `DataTable`, `DetailField` |
| Certificates | `/admin/certificates` | FM-12 | `DataTable`, `Badge`, `EmptyState`, `Button`, `Popup` |
| Remarks | `/admin/remarks` | FM-11 | `IssueCard`, `RadioField`, `DataTable`, `PageActionBar` |
| Academic | `/admin/academic` | FM-16 | `SegmentedTabs`, `SummaryCard`, `DataTable`, `Badge` |
| Timetable | `/admin/timetable` | FM-16 | `ChipField`, `DetailSectionCard`, `DataTable`, `PageActionBar` |
| Analytics | `/admin/analytics` | FM-17 | `SummaryCard`, `RecordSummaryCard`, `SegmentedTabs`, `EmptyState` |
| Discipline | `/admin/discipline` | FM-18 | `IssueCard`, `FlowEditor`, `RadioField`, `AuditTrail`, `DataTable` |

Shell chrome on every desktop frame: `PortalShell` / `PortalSidebar` (+ `aside` sub-side) / `PortalHeader` / `PortalBreadcrumb` / `PortalAccount`.

## Screenshot sources (ingested)

Newer-CMS inventory under [`../screenshots/`](../screenshots/) — especially `0000-Left-hand-Menu---Combined.png`, Students Selected series (006–041), Registration (043–048), and Admin mind-map surfaces in [`../newer-cms-screenshots.html`](../newer-cms-screenshots.html). Wireframes translate those jobs into Raisd Staff Admin, not a pixel clone of the old CMS.

## Related

- [Feature modules](../../../../ai/backend/lesotho-feature-modules.md) · [feature-modules.html](../feature-modules.html)
- [DS 0.19.8 wireframe pack](../../../design-system/candidates/0.19.8/)
- [package-catalogue.md](../../../../ai/design/package-catalogue.md)
