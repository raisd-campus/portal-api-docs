# Campus CMS — Software Design Documents

Working draft for **Working Group CMS 2026**. These documents turn Faid’s Daily Checklist, Timeline, and Requirements & Sources into a design baseline the team can implement against.

They are design documents, not a commercial proposal. Dates, named owners, and backend commitments remain TBC until the working group confirms them.

**AI agents:** start at the campus knowledge base [`../ai/`](../ai/) (decision 22 Sep 2026 — Faid Zamin). SDDs are the product baseline; `docs/ai/` is the single source of truth for agent instructions, extracted frontend behaviour docs, and documentation generation.

| ID | Document | What it covers |
|---|---|---|
| [SDD-00](00-document-control.md) | Document control | Status, sources, glossary, status meanings |
| [SDD-01](01-system-overview.md) | System overview | Product intent, portals, constraints, current vs target |
| [SDD-02](02-architecture-and-integration.md) | Architecture and integration | Existing CMS as backend, Portal API, auth, mobile, data |
| [SDD-12](12-deployment-architecture.md) | Deployment architecture | Repositories, VDS hosts, public names, request path |
| [SDD-03](03-delivery-milestones.md) | Delivery milestones | Admissions-first sequence and release conditions |
| [SDD-13](13-progress-timeline.md) | Progress and timeline | Latest sheet snapshot, completion, sequence, remaining tasks |
| [SDD-04](04-applicant-portal.md) | Applicant portal | Apply → evidence → track → offer → enrol |
| [SDD-05](05-student-portal.md) | Student portal | Learning, records, fees, support (current v1 frontend) |
| [SDD-06](06-lecturer-portal.md) | Lecturer portal | Publish, attendance, marking, class communication |
| [SDD-07](07-admin-staff-cms.md) | Admin / staff CMS | Registry, Faculty, Bursary, QA, Marketing, remaining desks |
| [SDD-08](08-shared-platform.md) | Shared platform | Integration spine, security, ops, training |
| [SDD-09](09-requirements-traceability.md) | Requirements traceability | Product decisions, campus requests, country evidence, UI baseline |
| [SDD-10](10-open-questions.md) | Open questions | Decisions still required before Live |
| [SDD-11](11-capability-catalog.md) | Capability catalogue | All 112 CAP rows from the detailed checklist |
| [SDD-14](14-cms-feature-comparison.md) | Existing CMS vs Raisd portals | Cyberjaya old-CMS inventory mapped to CAP IDs (23 Sep 2026 dump) |
| [SDD-15](15-nomenclature.md) | Nomenclature | Quick links for every CAP-* and M1–M5 |

## How to use these documents

1. Read SDD-00 and SDD-01 first.
2. Treat SDD-02 and SDD-03 as the delivery contract: existing CMS stays, admissions before semester registration, Cyberjaya first.
3. Implement against the portal SDD that owns the screen. The same CAP ID on two portals is one capability with two role surfaces.
4. Use SDD-11 as the exhaustive inventory. Use SDD-09 when a capability is challenged as “required by government” or “already built”.
5. Use [SDD-15](15-nomenclature.md) to jump from any `CAP-*` or `M*` ID to its definition.
6. Use SDD-14 when deciding whether to rebuild a staff/lecturer screen or keep the old Cyberjaya CMS desk.
7. Do not treat Demo or Frontend ready as Live. Live requires real data, server-enforced access, and an accountable owner.

## Related materials

- AI knowledge base (agents + doc generation): [`../ai/`](../ai/)
- Old CMS technical analysis (GitHub Pages): [`../diagrams/old-cms/`](../diagrams/old-cms/)
- Source spreadsheet: `materials/docs/working-group/` — live sheet [Student Portal and CMS Daily Checklist](https://docs.google.com/spreadsheets/d/1Yux9R8hIgcPrQ5OklKd9Oyq_04qJtaAhcxJvr_7NvYI/edit?usp=sharing)
- Progress from the 19 Sep 2026 download: [SDD-13](13-progress-timeline.md)
- Group chat: `materials/whatsapp/working-group-cms-2026/_chat.txt`
- Meeting briefing: `proposals/CMS_Working_Group_Meeting_Briefing.html`
- Earlier Sherina proposal (commercial, not this SDD set): `proposals/CampusOne_Phase1_Proposal.html`
- Printable overview (architecture, repositories, entry points, features): [`../Raisd-Campus-Architecture.pdf`](../Raisd-Campus-Architecture.pdf)
