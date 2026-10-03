# Lesotho pilot approach (agent knowledge)

**Confirmed:** Working Group CMS 2026 weekly meeting, 3 October 2026 (Read.ai recap + WhatsApp follow-up).  
**Binding product baseline:** [SDD-00](../../sdd/00-document-control.md), [SDD-01](../../sdd/01-system-overview.md), [SDD-03](../../sdd/03-delivery-milestones.md), [SDD-09](../../sdd/09-requirements-traceability.md) PRODUCT-PRIORITY, [SDD-10](../../sdd/10-open-questions.md) decision log.  
**Inventory stub:** [../backend/old-cms-lesotho.md](../backend/old-cms-lesotho.md).

## Decision

**First launch / pilot acceptance campus is Lesotho**, not Cyberjaya.

This supersedes the 7 September “Cyberjaya first” product priority for **which campus is the acceptance gate**. It does **not** cancel [ADR-1](overview.md) (existing campus CMS family as this-phase system of record; portals via Portal API; no duplication of operational desks).

| Layer | Posture after 3 Oct 2026 |
|---|---|
| Pilot campus | **Lesotho** (revenue / adoption priority; government requirements must be met) |
| Feature benchmark | Lesotho’s **newer** Admin / Student CMS (UI screenshots; source and DB **not** shareable — staging has real student data) |
| Migration / inventory SoT | **Raisd canonical schema** + Lesotho CMS materials (old CMS dump when Vara shares it + new-CMS screenshots). Do **not** wait on Lesotho new-system source code or schema |
| Family tree (Vara) | Lesotho **old** CMS branched from Cyberjaya; closer to **Botswana** than Sierra Leone EMS |
| Parallel work | Other campuses continue in parallel; near-term **Eswatini** rollout may be proposed after Lesotho |
| Reporting | Sponsor wants **weekly progress percentages** (in addition to Demo ≠ Live language) |

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
- Do not invent Lesotho new-CMS schema or source structure; reverse-engineer **capability and UX requirements** from screenshots only until a sanitized structure dump exists.
- Do not treat Lesotho new CMS as Raisd Live SoR. Raisd portals still go through the Portal API; Live SoR path for Lesotho remains TBC once old dump + campus policy are available.
- Capability parity target: Raisd must be **at least equivalent** to the campus’s existing newer CMS for pilot acceptance — use screenshots as the feature checklist seed.

## Near-term actions (from meeting)

| Owner | Action |
|---|---|
| Iman | Update portal / architecture docs for Lesotho pilot (this file + SDDs) |
| Iman | Reverse-engineer new-CMS screenshots into design / schema adoption notes |
| Iman | Read-only file-storage explorer (Demo); connect applicant mock API → real Portal API after UI finish |
| Faid | Finish applicant portal (mock APIs OK); forward Lesotho screenshots |
| Vara (Mohd Paramasvara) | Send existing Lesotho **old** CMS source + DB structure; report doc findings |
| Aslam | Obtain further new-CMS feature screenshots; ask Vara for old CMS; strip PII if any structure share is attempted |

## Related

| Topic | Path |
|---|---|
| Architecture overview | [overview.md](overview.md) |
| Distributed CMS target | [distributed-cms-target.md](distributed-cms-target.md) |
| Lesotho CMS inventory | [../backend/old-cms-lesotho.md](../backend/old-cms-lesotho.md) |
| Botswana sibling (family tree) | [../backend/old-cms-botswana.md](../backend/old-cms-botswana.md) |
| Cyberjaya inventory | [../backend/old-cms-cyberjaya.md](../backend/old-cms-cyberjaya.md) |
| Milestones | [SDD-03](../../sdd/03-delivery-milestones.md) |
