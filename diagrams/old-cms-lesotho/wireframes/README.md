# Lesotho Demo desk wireframes

**Status:** Live Staff Admin captures for team review (DS **0.19.8**). Not Live CMS.  
**Open:** [index.html](index.html) · [captures/](captures/)

Screenshots of **staff.lesotho.raisd.co** Admin desks after the two-level side menu (primary `PortalSidebar` + contextual `aside` sub-side) and design-system **0.19.8** pin.

## Capture

```bash
node docs/diagrams/old-cms-lesotho/wireframes/capture-desks.mjs
# finance desks also refreshed via:
# node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs --screens-only --only=bur-pay,bur-fees,bur-sponsors,reg-queue
```

Manifest: [captures/manifest.json](captures/manifest.json) · viewport 1440×900 · captured 2026-10-28.

## Desks

| Capture | Route | FM |
| --- | --- | --- |
| Applicants | `/admin/applicants` | FM-03 / FM-05 |
| Document review | `/admin/document-review` | FM-04 |
| Payments | `/admin/payments` | FM-09 |
| Fees & Fines | `/admin/fees` | FM-09 |
| Registrations | `/admin/registrations` | FM-08 |
| Sponsors | `/admin/sponsors` | FM-08 |
| Students list | `/admin/students` | FM-07 |
| Student file (12 tabs) | `/admin/students · file` | FM-07 |
| Graduations | `/admin/graduations` | FM-10 |
| Certificates | `/admin/certificates` | FM-12 |
| Remarks | `/admin/remarks` | FM-11 |
| Academic | `/admin/academic` | FM-16 |
| Timetable | `/admin/timetable` | FM-16 |
| Analytics | `/admin/analytics` | FM-17 |
| Discipline | `/admin/discipline` | FM-18 |

## Related

- [Feature modules](../feature-modules.html) · [Demo role playback](../demo-role-playback.html)
- [DS 0.19.8 wireframe pack](../../../design-system/candidates/0.19.8/)
