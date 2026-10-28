# Lesotho Demo desk wireframes

**Status:** Candidate wireframes for team review. Not Live CMS. Not production captures.  
**Open:** [index.html](index.html)

Maps **ingested newer-CMS Lesotho Admin screenshots** and Demo Staff Admin routes onto Raisd layouts that reuse `@raisd-campus/design-system` patterns (current catalogue **0.19.8**). Existing Staff page composition (`type-title` + muted body + `DetailSectionCard` + `DataTable`) is the baseline; AdminRecordFlow is called out where a directory→workspace upgrade fits after a deliberate pin.

## Page → module → design-system map

| Wireframe | Route | FM | Primary DS building blocks |
| --- | --- | --- | --- |
| Applicants | `/admin/applicants` | FM-03 / FM-05 | `DataTable`, `DetailSectionCard`, `DetailField`, `PageActionBar`, `AuditTrail`, `Popup` |
| Document review | `/admin/document-review` | FM-04 | `DataTable`, `DetailField`, `Button`, read-only `FileUploadField` |
| Payments | `/admin/payments` | FM-09 | `DataTable`, `Badge`, `PageActionBar` |
| Fees & Fines | `/admin/fees` | FM-09 | `DetailSectionCard`, `DetailField`, `DataTable` |
| Registrations | `/admin/registrations` | FM-08 | `DataTable`, `Badge`, `PageActionBar` |
| Sponsors | `/admin/sponsors` | FM-08 | `DetailSectionCard`, `Input`, `Button`, `DataTable` |
| Students list | `/admin/students` | FM-07 | `DataTable` / future `AdminTable`, `ContentSection`, `PortalBreadcrumb` |
| Student file (12 tabs) | `/admin/students · *` | FM-07 | `Tabs` / `TabbedPagePanel`, `DetailSectionCard`, `DetailField`, `DataTable`, `AuditTrail` |
| Graduations | `/admin/graduations` | FM-10 | `DetailSectionCard`, `DataTable`, `DetailField` |
| Certificates | `/admin/certificates` | FM-12 | `DataTable`, `Button`, `Badge` |
| Remarks | `/admin/remarks` | FM-11 | `DataTable`, `Badge`, `PageActionBar` |
| Academic | `/admin/academic` | FM-16 | `DetailSectionCard`, `DataTable` |
| Timetable | `/admin/timetable` | FM-16 | `DetailSectionCard`, `DataTable`, `Button`, `DetailField` |
| Analytics | `/admin/analytics` | FM-17 | `DetailSectionCard`, `DetailField` (summary-card rhythm) |
| Discipline | `/admin/discipline` | FM-18 | `DetailSectionCard`, `DataTable`, `Badge` |

Shell chrome on every frame: `PortalShell` / `PortalSidebar` / `PortalHeader` (+ optional structured breadcrumbs from 0.18).

## Screenshot sources (ingested)

Newer-CMS inventory under [`../screenshots/`](../screenshots/) — especially Students Selected series (006–041), Registration (043–048), and Admin mind-map surfaces documented in [`../newer-cms-screenshots.html`](../newer-cms-screenshots.html). Wireframes translate those jobs into Raisd Staff Admin, not a pixel clone of the old CMS.

## Related

- [Feature modules](../../../../ai/backend/lesotho-feature-modules.md) · [feature-modules.html](../feature-modules.html)
- [DS 0.19.8 wireframe pack](../../../design-system/candidates/0.19.8/)
- [package-catalogue.md](../../../../ai/design/package-catalogue.md)
