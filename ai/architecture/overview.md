# Architecture overview (agent knowledge)

**Canonical product text:** [SDD-01](../../sdd/01-system-overview.md), [SDD-02](../../sdd/02-architecture-and-integration.md).  
This file is the short agent-facing summary. Prefer the SDDs when wording must match the working-group baseline.

## Intent

Four role portals on top of the **existing campus CMS**, not a greenfield replacement of every legacy function. Cyberjaya is the first acceptance campus.

## ADR-1 — Existing CMS as initial backend

Keep the current campus CMS as system of record. New portals talk to it through a **Portal API**. Do not require a full CMS rewrite to launch Cyberjaya.

Consequences:

- CAP-53 (existing CMS integration and campus configuration) is on the critical path for Admissions launch.
- Frontend “ready” screens cannot go Live until the matching old-CMS capability is verified or replaced.
- New staff screens are built only where the old CMS does not already support the workflow.

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

## Product decisions (7 September 2026)

1. Cyberjaya first.
2. Admissions before semester registration.
3. Core mobile at launch (phone-friendly web).
4. Keep the existing CMS as the initial backend.
5. Group delivery by Applicant, Student, Lecturer, Admin/Staff, and Shared System.

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
