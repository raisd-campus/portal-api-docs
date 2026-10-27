# Lesotho pilot approach (agent knowledge)

**Status:** Binding pilot framing for Raisd Campus.  
**Confirmed:** Working Group CMS 2026 weekly meeting, **3 October 2026**.  
**Primary source:** Read.ai meeting summary emailed the same day (*Subject:* Weekly full meeting 10AM Malaysia (GMT +8) on …). Secondary: WhatsApp Working Group CMS 2026 (Faid screenshots + Vara family-tree note, ~12:41–12:45).  
**Binding product baseline:** [SDD-00](../../sdd/00-document-control.md), [SDD-01](../../sdd/01-system-overview.md), [SDD-03](../../sdd/03-delivery-milestones.md), [SDD-09](../../sdd/09-requirements-traceability.md) PRODUCT-PRIORITY, [SDD-10](../../sdd/10-open-questions.md) decision log.  
**Inventory + CAP seed:** [../backend/old-cms-lesotho.md](../backend/old-cms-lesotho.md).  
**Database + M4 gap (schema × FE × flows):** [../backend/lesotho-db-gap.md](../backend/lesotho-db-gap.md) ([`#m4-gap-analysis`](../backend/lesotho-db-gap.md#m4-gap-analysis--schema--frontend--flows)).  
**CMS vs Applicant flow (8 Oct 2026):** [../backend/lesotho-cms-vs-applicant-portal.md](../backend/lesotho-cms-vs-applicant-portal.md) · Pages [`cms-vs-applicant.html`](../../diagrams/old-cms-lesotho/cms-vs-applicant.html).  
**Workflow & control proposal (28 Oct 2026):** [../backend/lesotho-workflow-control-improvements.md](../backend/lesotho-workflow-control-improvements.md) · Pages [`workflow-control-improvements.html`](../../diagrams/old-cms-lesotho/workflow-control-improvements.html).  
**Feature modules (28 Oct 2026):** [../backend/lesotho-feature-modules.md](../backend/lesotho-feature-modules.md) · Pages [`feature-modules.html`](../../diagrams/old-cms-lesotho/feature-modules.html).  
**Diagram analysis (Pages):** [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html) ([`#db-gap`](../../diagrams/old-cms-lesotho/index.html#db-gap), [`#gap-x`](../../diagrams/old-cms-lesotho/index.html#gap-x)).

## Decision (emphasised)

**Lesotho is the Raisd pilot project — first launch / acceptance campus.**

This supersedes the 7 September “Cyberjaya first” product priority for **which campus is the acceptance gate**. It does **not** cancel [ADR-1](overview.md) (existing campus CMS family as this-phase system of record; portals via Portal API; no duplication of operational desks).

| Layer | Posture after 3 Oct 2026 |
|---|---|
| Pilot campus | **Lesotho** |
| Feature benchmark | Lesotho’s **newer** Admin / Student CMS (UI screenshots; source and DB **not** shareable — staging has real student data) |
| Migration / inventory SoT | **Raisd canonical schema** + Lesotho CMS materials (old CMS dump when Vara shares it + new-CMS screenshots). Do **not** wait on Lesotho new-system source code or schema |
| Family tree (Vara) | Lesotho **old** CMS branched from Cyberjaya; closer to **Botswana** than Sierra Leone EMS |
| Parallel work | Other campuses continue in parallel; near-term **Eswatini** may follow — old CMS structure inventoried 5 Oct 2026 ([old-cms-eswatini.md](../backend/old-cms-eswatini.md)) |
| Reporting | Sponsor wants **weekly progress percentages** (in addition to Demo ≠ Live language) |

## Why Lesotho — meeting emphasis

Taken from the Read.ai chapters *Shift to a Lesotho Launch Target*, *Campus Rollout Priorities*, and *Documentation and Lesotho Migration Approach*:

1. **Sponsor directive.** Faid relayed that the sponsor wants percentage-based progress reporting and a **Lesotho-first launch rather than Cyberjaya-first**.
2. **Revenue and adoption.** Lesotho is the priority campus for **securing revenue**. Rolling out to every campus at once was judged unachievable in the current product state; user resistance was discussed as a risk that government-ready capability helps address.
3. **Government-grade parity.** The system must meet **government requirements** and provide capabilities **at least equivalent** to campuses’ existing systems. Lesotho’s newer CMS was described as comprehensive and the benchmark whose features should be incorporated into Raisd’s current CMS path.
4. **Evidence without PII.** Staging access includes **real student data**, so schema/source cannot be shared. Screenshots (or a later sanitised blueprint) are the agreed analysis path. Faid forwarded Admin/Student screenshots the same afternoon; Aslam will try for more / sanitised structure.
5. **Pilot, not exclusive freeze.** Lesotho is planned as a **pilot project** with other campuses continuing in parallel. Near-term **Eswatini** may be proposed after Lesotho. Botswana and Sierra Leone inventories remain M5 expansion references.
6. **Migration SoT.** Lesotho is already on its **newer** system while extracting data from the **older** LUCT-family CMS. Raisd migration basis = **team schema + Lesotho CMS materials**, not the inaccessible new-system schema/source.

## Journey (updated)

```text
Now / Demo  →  M1–M3 (Portal API + Admissions + core student)
            →  M4 Lesotho pilot acceptance  (was Cyberjaya)
            →  M5 Campus expansion (Cyberjaya, Eswatini, Botswana, Sierra Leone, …)
            →  Ideal distributed Raisd CMS
```

Cyberjaya inventories ([old-cms-cyberjaya.md](../backend/old-cms-cyberjaya.md), [cms-feature-comparison.md](../backend/cms-feature-comparison.md)) remain the richest technical baseline for the LUCT PHPMaker family. They are **not** the first Live acceptance campus anymore.

## Rules agents must not violate

- Do not present Cyberjaya as the first pilot acceptance gate after 3 Oct 2026.
- Do not commit Lesotho staging credentials, student PII, or screenshots that contain live student records into the repo.
- Do not invent Lesotho **newer**-CMS schema or source structure; reverse-engineer UX from screenshots. Old CMS physical names come only from the measured `campus2_lesotho` dump ([lesotho-db-gap.md](../backend/lesotho-db-gap.md)).
- Do not treat Lesotho new CMS as Raisd Live SoR. Raisd portals still go through the Portal API; Live SoR path (old CMS adapter vs Schema v3) remains WG-open.
- Capability parity target: Raisd must be **at least equivalent** to the campus’s existing newer CMS for pilot acceptance — use screenshots as the feature checklist seed.

## Campus landing (14 October 2026)

Aslam asked what users see at `lesotho.raisd.co` versus `apply.lesotho.raisd.co`, `student.lesotho.raisd.co`, `admin.lesotho.raisd.co`, and `staff.lesotho.raisd.co`. **Updated 17 Oct 2026:** every Demo campus apex (`{slug}.raisd.co` for all eight campuses) is **login-only** (Raisd SSO). After sign-in, SSO RBAC either redirects to the single allowed portal on **that** campus or shows a portal picker on the landing (Control / Admin / Student / Staff). The Staff label is `roleKey` `lecturer`. Admin opens `staff.{slug}.raisd.co/admin` and shows only the Admin menus. Staff or Lecturer shows Dashboard, Classrooms, and Community. Role subdomains still open the matching portal directly. `staff.{slug}.raisd.co` is the Staff portal. Legacy `teach.{slug}.raisd.co` **301-redirects** there, and `admin.{slug}.raisd.co` redirects to `/admin` on that host.

| Surface | URL |
|---|---|
| Campus landing | https://lesotho.raisd.co |
| Applicant / Student / Staff portal | `apply` · `student` · `staff`.lesotho.raisd.co (`teach` redirects to `staff`) |
| Repo | [`raisd-campus/campus-landing`](https://github.com/raisd-campus/campus-landing) |
| DNS | Cloudflare A → VPS (`38.127.216.221`), DNS-only |
| Topology | [vps-topology.md](vps-topology.md) · [SDD-12](../../sdd/12-deployment-architecture.md) |

Live flat hostnames in SDD-12 (`apply.raisd.co`, …) remain the acceptance growth plan; Demo uses campus-scoped hosts.

## Near-term actions (from meeting)

| Owner | Action |
|---|---|
| Iman | Update portal / architecture docs for Lesotho pilot (this file + SDDs + diagram analysis) |
| Iman | Reverse-engineer new-CMS screenshots into design / schema adoption notes |
| Iman | Read-only file-storage explorer (Demo); connect applicant mock API → real Portal API after UI finish |
| Iman | Campus landings + multi-campus hosts on UltaHost k3s (done 14 Oct 2026) |
| Faid | Finish applicant portal (mock APIs OK); forward Lesotho screenshots |
| Vara (Mohd Paramasvara) | Send existing Lesotho **old** CMS source + DB structure; report doc findings |
| Aslam | Obtain further new-CMS feature screenshots; ask Vara for old CMS; strip PII if any structure share is attempted |
| Aslam | Cloudflare DNS for campus hosts (A → VPS; done for Demo catalogue) |

## Related

| Topic | Path |
|---|---|
| Architecture overview | [overview.md](overview.md) |
| Distributed CMS target | [distributed-cms-target.md](distributed-cms-target.md) |
| Lesotho CMS inventory | [../backend/old-cms-lesotho.md](../backend/old-cms-lesotho.md) |
| Newer CMS manual and Raisd gap (23 Oct 2026) | [../backend/lesotho-newer-cms.md](../backend/lesotho-newer-cms.md) |
| Workflow & control improvements (28 Oct 2026) | [../backend/lesotho-workflow-control-improvements.md](../backend/lesotho-workflow-control-improvements.md) |
| Feature modules FM-01…FM-16 (28 Oct 2026) | [../backend/lesotho-feature-modules.md](../backend/lesotho-feature-modules.md) |
| Lesotho DB + M4 gap analysis | [../backend/lesotho-db-gap.md](../backend/lesotho-db-gap.md) |
| Lesotho diagram analysis | [`docs/diagrams/old-cms-lesotho/`](../../diagrams/old-cms-lesotho/index.html) |
| Botswana sibling (family tree) | [../backend/old-cms-botswana.md](../backend/old-cms-botswana.md) |
| Cyberjaya inventory | [../backend/old-cms-cyberjaya.md](../backend/old-cms-cyberjaya.md) |
| LUCT Cyberjaya online registration (Process A/B; Malaysia gov overlays ≠ LS) | [../backend/luct-online-registration.md](../backend/luct-online-registration.md) |
| Milestones | [SDD-03](../../sdd/03-delivery-milestones.md) |
