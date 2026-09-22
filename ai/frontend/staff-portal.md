# Staff portal — agent knowledge

**Repository:** [`raisd-campus/staff-portal`](https://github.com/raisd-campus/staff-portal)  
**SDD:** [SDD-07](../../sdd/07-admin-staff-cms.md)  
**Campus agents:** [../AGENTS.md](../AGENTS.md)

## Status

Not started as a checked-in application. Desks: Registry, Faculty, Bursary/Finance, QA, Marketing, and remaining verified gaps.

## Agent rules

1. Implement against SDD-07 and campus [AGENTS.md](../AGENTS.md).
2. **Build only verified gaps** — if the existing CMS already runs the workflow, do not duplicate it in staff-portal without an explicit decision.
3. Talk only to the Portal API. Staff tokens must not work inside student shells.
4. Student-portal “Admin Actions” are **development-only mock commands**, not production staff UI.
5. When UI appears, add docs under `docs/ai/frontend/staff-portal/` and update [../MANIFEST.yaml](../MANIFEST.yaml).
