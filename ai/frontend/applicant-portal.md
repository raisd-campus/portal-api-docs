# Applicant portal — agent knowledge

**Repository:** [`raisd-campus/applicant-portal`](https://github.com/raisd-campus/applicant-portal)  
**SDD:** [SDD-04](../../sdd/04-applicant-portal.md)  
**Campus agents:** [../AGENTS.md](../AGENTS.md)

## Status

No application UI is checked in yet. This portal is the **Admissions launch** surface (milestone 2): account, application, evidence, declarations, track status, offer, accept enrolment. Registry remains the decision owner.

## Agent rules

1. Implement against SDD-04 and the campus [AGENTS.md](../AGENTS.md). Do not invent a second admissions architecture.
2. Talk only to the Portal API. No direct CMS or database access.
3. Prefer shared design tokens once `design-system` is ready; until then align with [../design/design-system.md](../design/design-system.md) where practical without copying student-only shells.
4. Cap scope to Cyberjaya admissions journeys first.
5. When UI or API contracts appear, add feature docs under `docs/ai/frontend/applicant-portal/` and register them in [../MANIFEST.yaml](../MANIFEST.yaml).

## Related CAP focus

Admissions and identity capabilities in [SDD-11](../../sdd/11-capability-catalog.md) (see Applicant rows). CAP-53 is on the critical path for Live.
