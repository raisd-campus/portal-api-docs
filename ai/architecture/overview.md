# Architecture overview (agent knowledge)

**Canonical product text:** [SDD-01](../../sdd/01-system-overview.md), [SDD-02](../../sdd/02-architecture-and-integration.md).  
This file is the short agent-facing summary. Prefer the SDDs when wording must match the working-group baseline.

## Pilot project — Lesotho (highlight)

> **Lesotho is the Raisd Campus pilot project.**  
> Confirmed Working Group CMS 2026 weekly meeting, **3 October 2026** (Read.ai meeting summary emailed as *Weekly full meeting 10AM Malaysia (GMT +8)*). Supersedes the 7 September “Cyberjaya first” acceptance gate. Detail: [lesotho-pilot.md](lesotho-pilot.md) · screenshot inventory: [../backend/old-cms-lesotho.md](../backend/old-cms-lesotho.md) · diagram analysis: [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html).

### Why Lesotho (from the meeting)

| Reason | What the Working Group said |
|---|---|
| **Sponsor priority** | Faid relayed the sponsor wants a **Lesotho-first launch**, not Cyberjaya-first, plus **weekly progress percentages** for reporting. |
| **Revenue / adoption** | Lesotho remains the priority campus for **securing revenue**. A simultaneous all-campus rollout was called unachievable in the current state. |
| **Government requirements** | Raisd must meet **Lesotho government** requirements (e.g. NMDS sponsorship, LGCSE admissions evidence) and be **at least equivalent** to the campus’s existing newer CMS. |
| **Feature benchmark** | Lesotho’s **newer Admin + Student CMS** is comprehensive; its features are the parity checklist (screenshots only — staging holds real student data, so source/DB cannot be shared). |
| **Pilot framing** | Explicitly framed as a **pilot project** with other campuses continuing in parallel; near-term **Eswatini** may follow. |
| **Migration SoT** | Use **Raisd canonical schema + Lesotho CMS materials** (old dump when Vara shares it + new-CMS screenshots) — **not** the inaccessible new-system schema/source. |

WhatsApp follow-up (same day): Faid shared newer-CMS screenshots; Vara noted Lesotho’s **old** CMS is family-tree closer to **Botswana** / branched from Cyberjaya.

## Intent

Four role portals on top of the **existing campus CMS family**, not a greenfield replacement of every legacy function. **Lesotho** is the first acceptance / pilot campus.

## ADR-1 — Existing CMS as initial backend (this phase)

**Confirmed 23 September 2026 (Aslam / Working Group):** for this phase, use the existing campus CMS as system of record and build modern portal experiences via the **Portal API**. Do **not** duplicate operational staff functions that the old CMS already runs.

**Pilot campus update — 3 October 2026:** first launch / acceptance focus is **Lesotho**. Lesotho’s newer CMS is the feature benchmark; migration uses Raisd canonical schema + Lesotho CMS materials (old CMS `campus2_lesotho` structure inventoried 5 Oct 2026 from Vara’s Drive pack — dump stays local, never in git).

Consequences:

- [CAP-53](../../sdd/11-capability-catalog.md#cap-53) (existing CMS integration and campus configuration) is on the critical path for Admissions launch and the Lesotho pilot.
- Frontend “ready” screens cannot go Live until the matching CMS capability is verified or replaced.
- New staff screens are built only where the existing CMS does not already support the workflow — and must aim for parity with Lesotho’s newer Admin CMS for pilot acceptance.
- Inventories: [../backend/old-cms-lesotho.md](../backend/old-cms-lesotho.md), [../backend/old-cms-cyberjaya.md](../backend/old-cms-cyberjaya.md), [../backend/cms-feature-comparison.md](../backend/cms-feature-comparison.md), [SDD-14](../../sdd/14-cms-feature-comparison.md).

## Longer-term target — progressive unified CMS

Longer term, Raisd still aims for a **unified, one-stop CMS**. That is **not** launch scope. Move functions only:

1. when a **verified gap** exists in the old CMS (or an explicit product decision to retire a legacy desk), and  
2. with a **clear migration strategy** (data ownership, cutover, rollback, staff training).

Milestone framing: [M1](../../sdd/03-delivery-milestones.md#m1)–[M4](../../sdd/03-delivery-milestones.md#m4) stay Portal-API-on-existing-CMS with **[M4](../../sdd/03-delivery-milestones.md#m4) = Lesotho pilot**; progressive consolidation and other campuses (including Cyberjaya) are planned under **[M5](../../sdd/03-delivery-milestones.md#m5)+** ([SDD-03](../../sdd/03-delivery-milestones.md), [SDD-14](../../sdd/14-cms-feature-comparison.md)).

**Ideal end state (proposed, post-M5):** one Raisd CMS product with **distributed country / region databases**, white-label packs, feature flags, and per-country identity — not one shared global student ledger. Detail: [distributed-cms-target.md](distributed-cms-target.md) and the one-page diagram [`docs/diagrams/distributed-cms-architecture.html`](../../diagrams/distributed-cms-architecture.html). Ideal topology needs a Working Group ADR before implementation.

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

## Product decisions (7 September 2026 + 23 September 2026 + 3 October 2026)

1. **Lesotho first** as pilot / acceptance campus (3 Oct 2026 — supersedes Cyberjaya-first gate). Cyberjaya remains the richest LUCT technical inventory and an [M5](../../sdd/03-delivery-milestones.md#m5) expansion campus.
2. Admissions before semester registration.
3. Core mobile at launch (phone-friendly web).
4. Keep the existing CMS family as the initial backend (**this phase SoR**, confirmed Aslam 23 Sep 2026). Lesotho migration SoT: Raisd schema + Lesotho CMS materials ([lesotho-pilot.md](lesotho-pilot.md)).
5. Group delivery by Applicant, Student, Lecturer, Admin/Staff, and Shared System.
6. Longer term: progressive **unified one-stop CMS**, only via verified gaps and an explicit migration strategy (not [M2](../../sdd/03-delivery-milestones.md#m2)–[M4](../../sdd/03-delivery-milestones.md#m4) launch scope).

## Current implementation tension

The deepest UI is the **student-portal** Demo frontend (milestone 3 depth). Product priority still puts **admissions** (milestone 2) and the **Lesotho pilot** first. Do not treat more student mock screens as progress toward Admissions / Lesotho launch.

## Where detail lives

| Topic | Document |
|---|---|
| Lesotho pilot (why + rules) | [lesotho-pilot.md](lesotho-pilot.md) |
| Lesotho CMS features (screenshots) | [../backend/old-cms-lesotho.md](../backend/old-cms-lesotho.md) |
| Lesotho diagram analysis | [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html) |
| Integration contract, auth, files, mobile | [SDD-02](../../sdd/02-architecture-and-integration.md) |
| Hosts, DNS, k3s stages | [deployment.md](deployment.md), [SDD-12](../../sdd/12-deployment-architecture.md) |
| PoC Vercel + Neon (not production) | [vercel-neon-poc.md](vercel-neon-poc.md) |
| Repo ownership | [repositories.md](repositories.md) |
| Portal API stage 1 | [../backend/portal-api.md](../backend/portal-api.md) |
| Capability catalogue | [SDD-11](../../sdd/11-capability-catalog.md) |
| Open questions | [SDD-10](../../sdd/10-open-questions.md) |
