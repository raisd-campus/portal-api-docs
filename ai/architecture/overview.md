# Architecture overview (agent knowledge)

**Canonical product text:** [SDD-01](../../sdd/01-system-overview.md), [SDD-02](../../sdd/02-architecture-and-integration.md).  
This file is the short agent-facing summary. Prefer the SDDs when wording must match the working-group baseline.

## Intent

Four role portals on top of the **existing campus CMS**, not a greenfield replacement of every legacy function. Cyberjaya is the first acceptance campus.

## ADR-1 — Existing CMS as initial backend (this phase)

**Confirmed 23 September 2026 (Aslam / Working Group):** for this phase, use the existing Cyberjaya CMS as system of record and build modern portal experiences via the **Portal API**. Do **not** duplicate operational staff functions that the old CMS already runs.

Consequences:

- [CAP-53](../../sdd/11-capability-catalog.md#cap-53) (existing CMS integration and campus configuration) is on the critical path for Admissions launch.
- Frontend “ready” screens cannot go Live until the matching old-CMS capability is verified or replaced.
- New staff screens are built only where the old CMS does not already support the workflow.
- Inventory of the Cyberjaya dump and CAP mapping: [../backend/old-cms-cyberjaya.md](../backend/old-cms-cyberjaya.md), [../backend/cms-feature-comparison.md](../backend/cms-feature-comparison.md), [SDD-14](../../sdd/14-cms-feature-comparison.md).

## Longer-term target — progressive unified CMS

Longer term, Raisd still aims for a **unified, one-stop CMS**. That is **not** launch scope. Move functions only:

1. when a **verified gap** exists in the old CMS (or an explicit product decision to retire a legacy desk), and  
2. with a **clear migration strategy** (data ownership, cutover, rollback, staff training).

Milestone framing: [M1](../../sdd/03-delivery-milestones.md#m1)–[M4](../../sdd/03-delivery-milestones.md#m4) stay Portal-API-on-existing-CMS; progressive consolidation is planned under **[M5](../../sdd/03-delivery-milestones.md#m5)+** / remaining-CMS work ([SDD-03](../../sdd/03-delivery-milestones.md), [SDD-14](../../sdd/14-cms-feature-comparison.md)).

## Logical shape

```text
Applicant / Student / Lecturer / Staff web
                 │
                 ▼
        Auth · RBAC · responsive shell
                 │
                 ▼
             Portal API
         ┌───────┼────────┐
         ▼       ▼        ▼
   Existing CMS   Files   Monitoring / backups
```

Rules:

1. A portal never talks directly to Postgres or the CMS.
2. An API write is successful only after the CMS acknowledges it (Live path).
3. Authorisation is server-enforced.
4. Evidence files land in a durable store staff workflows can open.

## Product decisions (7 September 2026 + 23 September 2026)

1. Cyberjaya first.
2. Admissions before semester registration.
3. Core mobile at launch (phone-friendly web).
4. Keep the existing CMS as the initial backend (**this phase SoR**, confirmed Aslam 23 Sep 2026).
5. Group delivery by Applicant, Student, Lecturer, Admin/Staff, and Shared System.
6. Longer term: progressive **unified one-stop CMS**, only via verified gaps and an explicit migration strategy (not [M2](../../sdd/03-delivery-milestones.md#m2)–[M4](../../sdd/03-delivery-milestones.md#m4) launch scope).

## Current implementation tension

The deepest UI is the **student-portal** Demo frontend (milestone 3 depth). Product priority still puts **admissions** (milestone 2) first. Do not treat more student mock screens as progress toward Admissions launch.

## Where detail lives

| Topic | Document |
|---|---|
| Integration contract, auth, files, mobile | [SDD-02](../../sdd/02-architecture-and-integration.md) |
| Hosts, DNS, k3s stages | [deployment.md](deployment.md), [SDD-12](../../sdd/12-deployment-architecture.md) |
| Repo ownership | [repositories.md](repositories.md) |
| Portal API stage 1 | [../backend/portal-api.md](../backend/portal-api.md) |
| Capability catalogue | [SDD-11](../../sdd/11-capability-catalog.md) |
| Open questions | [SDD-10](../../sdd/10-open-questions.md) |
