# Distributed CMS — target architecture (agent knowledge)

**Human / diagram page:** [`docs/diagrams/distributed-cms-architecture.html`](../../diagrams/distributed-cms-architecture.html)  
**Binding product baseline:** [SDD-01](../../sdd/01-system-overview.md), [SDD-02](../../sdd/02-architecture-and-integration.md) (ADR-1), [SDD-03](../../sdd/03-delivery-milestones.md), [SDD-12](../../sdd/12-deployment-architecture.md) (ADR-2/3).

**Status:** The **ideal** distributed topology is a **proposed target** for post-M5 work. It is **not** an agreed ADR. Do not implement greenfield multi-region hosting before the Working Group confirms it. M1–M4 remain Portal-API-on-Cyberjaya-CMS.

## End goal (ideal)

One **Raisd CMS product** (shared portals + Portal API + domain services) with a **distributed data plane**:

| Layer | Shared globally? | Per country / campus |
|---|---|---|
| Portal apps + CAP catalogue | Yes — one codebase | White-label pack (brand, locale, hostname) |
| Portal API contract | Yes | Feature flags; regional API pool optional |
| Student / staff ledgers | **No** | Authoritative DB + evidence store in-country / in-region |
| Identity | Shared token / RBAC model | IdP map, password / SSO policy |
| Control plane | Tenant registry, flags, release train, non-PII ops | Secrets and DSN refs resolve regionally |

Example countries: Malaysia (Cyberjaya), Singapore, Sierra Leone, Botswana, and further campuses from the evidence footprint. Country uniqueness (e.g. MY EMGS) is **toggled modules**, not forks.

## Journey (do not skip)

```text
Now/M1  →  M2–M4 (ADR-1 Cyberjaya SoR, SG UltaHost k3s)
        →  M5 (adapters per legacy campus + tenant/flags + domain cutovers)
        →  Ideal (Raisd SoR everywhere; country DBs; geo-placed compute)
```

1. **Now / M1** — Demo portals; inventory separate legacy DBs (Cyberjaya `cmscbj`, Botswana `cmsbotswana`, Sierra Leone `ems_sierraleone`). Agree owners and CMS access.
2. **M2–M4** — Four portals → Portal API → CAP-53 → Cyberjaya CMS. Single SEA hosting. No second control plane.
3. **M5** — Campus expansion via **adapter factory**; introduce tenant registry, white-label, feature flags; migrate domains only with ownership, cutover, rollback, training.
4. **Ideal** — Retire legacy write paths; Raisd CMS DB per country/region; global control plane holds config only.

## Rules agents must not violate

- Do not present Ideal as Live or as an existing ADR.
- Do not put a second campus’s ledger in the Cyberjaya DB “for convenience.”
- Do not invent a multi-region UltaHost/k3s topology that contradicts [SDD-12](../../sdd/12-deployment-architecture.md) without an ADR update.
- Portals never talk to Postgres or CMS directly; API write success requires SoR acknowledgement.
- Cross-country data movement is exceptional, audited, and explicit (e.g. student transfer) — never silent multi-master ledger replication.

## Related

| Topic | Path |
|---|---|
| This-phase architecture | [overview.md](overview.md) |
| Hosting stages | [deployment.md](deployment.md), [SDD-12](../../sdd/12-deployment-architecture.md) |
| Sierra Leone M5 inventory | [../backend/old-cms-sierra-leone.md](../backend/old-cms-sierra-leone.md) |
| Botswana M5 inventory | [../backend/old-cms-botswana.md](../backend/old-cms-botswana.md) |
| CAP / gap posture | [../backend/cms-feature-comparison.md](../backend/cms-feature-comparison.md) |
| Milestone definitions | [SDD-03](../../sdd/03-delivery-milestones.md) |
