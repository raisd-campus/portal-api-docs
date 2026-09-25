# Existing CMS vs Raisd portals — feature comparison

**Document:** SDD-14  
**Status:** Working draft  
**Date:** 23 September 2026  
**Source package:** `CMS_Cyberjaya_Source_Codes_&_DB_Structure_23_09_2026.zip`
**Also inventoried (M5 pattern, not launch SoR):**
- `ICA_SierraLeone_Codes_&_DB_Structure_23_09_2026` → [`docs/ai/backend/old-cms-sierra-leone.md`](../ai/backend/old-cms-sierra-leone.md), Pages [`docs/diagrams/old-cms-sierra-leone/`](../diagrams/old-cms-sierra-leone/)
- `CMS_Botswana_Source_Codes_&_DB_Structure_24_09_2026` → [`docs/ai/backend/old-cms-botswana.md`](../ai/backend/old-cms-botswana.md), Pages [`docs/diagrams/old-cms-botswana/`](../diagrams/old-cms-botswana/) (E2E + [DTEF §4](../diagrams/old-cms-botswana/index.html#dtef)), [`botswana-dtef-scholarship-sync.md`](../ai/backend/botswana-dtef-scholarship-sync.md)
**Canonical detail (agents):** [`docs/ai/backend/cms-feature-comparison.md`](../ai/backend/cms-feature-comparison.md), [`docs/ai/backend/old-cms-cyberjaya.md`](../ai/backend/old-cms-cyberjaya.md)
**GitHub Pages (diagrams):** [`docs/diagrams/old-cms/`](../diagrams/old-cms/) — Comparison · FSD · Obsidian 3D · Legacy ERD · Flows · Database tech

## 1. Purpose

Record what the **existing Cyberjaya CMS** already does, and how that maps to the Raisd **Applicant / Student / Lecturer / Staff** portals and CAP catalogue ([SDD-11](11-capability-catalog.md)).

This is an inspection baseline for gap decisions. It does **not** authorise replacing working legacy staff functions ([SDD-01](01-system-overview.md), ADR-1).

## 2. Framing

| Side | What it is |
|---|---|
| Old CMS | Live campus system of record (`cmscbj`), PHPMaker desks + Laravel payment/PDPA, batch jobs, ~1.9k tables, ~318 procedures |
| New stack (this phase) | Four role portals + Portal API on top of that SoR — **do not duplicate** operational desks |
| Longer-term target | Progressive **unified one-stop CMS**, only via verified gaps + migration strategy ([M5](03-delivery-milestones.md#m5)+) |

```text
This phase:   Applicant / Student / Lecturer / Staff  →  Portal API  →  Existing CMS (SoR)
Later:        Verified gap + migration plan  →  consolidate into unified CMS progressively
```

**Working Group (23 September 2026 — Aslam):** agreed this-phase posture (CMS as SoR, portals via Portal API, no duplication of operational functions). Longer-term unified CMS remains the aim, delivered progressively.

## 3. Headline findings

1. **Staff operations are already broad** in the old CMS: Registry, Faculty, Bursary, Marketing, Student Services (visa/medical/insurance), Accommodation, AQA/CDU, Library, Reporting, Lecturer Portal, LEC, Training, ICU PDPA, Payment.
2. **Most Admin/Staff CAP rows have an old-CMS home.** Default delivery rule remains: verify and reuse; build Raisd staff screens only for proven gaps ([SDD-07](07-admin-staff-cms.md)).
3. **Student Demo screens** largely have matching CMS records (profile, registration, timetable, attendance, finance, documents, questionnaires, visa data). Live requires Portal API mapping ([CAP-53](11-capability-catalog.md#cap-53)), not a second database.
4. **Applicant and Lecturer Raisd apps** are behind the old CMS: online application + agent procedures and Lecturer Portal 1.0 already exist.
5. **Malaysia regulatory desks** (EMGS, KDN/MPWA, eIPTS, MQA/KPT) are rich in the old CMS and mostly out of scope for early Raisd screens — keep them operational on existing desks.
6. **Clearer Raisd-led gaps:** mobile shells, portfolio/resume, modern quiz/messaging productisation, unified helpdesk UX, and the Portal API contract itself.

## 4. Module → portal ownership

| Old CMS module | Natural Raisd surface | Default action |
|---|---|---|
| Marketing + Registry applications | Applicant + Staff (Registry) | New applicant UX; keep decisions on CMS |
| Registry / SIU / studentrecords / stdfile | Student + Staff (Registry) | Student read/update via API; staff on CMS |
| Faculty + lecturer | Lecturer + Staff (Faculty) | Verify Lecturer Portal 1.0 before rebuild |
| Bursary + payment | Student finance + Staff (Bursary) | Ledger stays on CMS |
| Services (SSD/visa) | Student immigration + Staff | Ops on CMS; student view via API |
| Accommodation | Student housing + Staff | Allocation on CMS |
| CDU / AQA | Staff (QA) | Keep on CMS; [CAP-04](11-capability-catalog.md#cap-04) evidence |
| Library | Student [CAP-31](11-capability-catalog.md#cap-31) + Staff | Keep licences on CMS |
| ICU / PDPA | Shared [CAP-39](11-capability-catalog.md#cap-39) | Keep compliance on CMS |
| Reporting / training / lec | Staff / campus-specific | Usually no Raisd rebuild |

## 5. Capability summary (by group)

Full CAP rows live in the AI comparison doc. Group posture:

| Group | Old CMS | Raisd software | Posture |
|---|---|---|---|
| Applicant (8 CAPs) | Online app + docs + agent SPs Present/Partial | Not started | Build applicant portal on CMS data |
| Student (41 CAPs) | Records Present for core; LMS-style Partial | Demo / Partial / Placeholder mix | Map Demo → CMS; keep SoR |
| Lecturer (19 CAPs) | Lecturer Portal 1.0 + Faculty Present | Not started | Verify before new UI |
| Admin / Staff (38 CAPs) | Desk suite Present | Not started | **Gaps only** |
| Shared (6 CAPs) | Backups scripts Present; monitoring Needs checking | [CAP-53](11-capability-catalog.md#cap-53) Partial / Needs checking | Integration critical path |

## 6. What stays on the old CMS (unless later decided)

- Agent management and agent claims  
- LEC / English Centre operations  
- Board / Senate / heavy regulatory reporting  
- Inventory, smart card, parking collection details  
- Nightly bursary / attendance / portal-login batch logic  
- Official transcript printing and graduation gown fee setup  

## 7. Critical path for Live (this phase) and target delivery

### This phase ([M1](03-delivery-milestones.md#m1)–[M4](03-delivery-milestones.md#m4))

1. Confirm admissions staff can complete offer → first enrolment on old CMS (or document the gap).  
2. Deliver [CAP-53](11-capability-catalog.md#cap-53) first slice: auth + applicant create/read + document metadata acknowledgment.  
3. Only then promote student Demo journeys that mutate registration or finance.  
4. Do not mark any CAP Live from frontend Demo alone.  
5. Do not rebuild working staff desks — Portal API + verified old CMS.

### Target delivery snapshot

| Horizon | Delivery target | SoR |
|---|---|---|
| [M2](03-delivery-milestones.md#m2) Admissions launch | Applicant portal + Registry workflows | Existing CMS |
| [M3](03-delivery-milestones.md#m3) Core student portal | Student journeys + lecturer/staff support paths | Existing CMS (or verified old desk) |
| [M4](03-delivery-milestones.md#m4) Cyberjaya pilot | Integrated acceptance, training, ops | Existing CMS + Portal API |
| [M5](03-delivery-milestones.md#m5)+ Expansion / remaining CMS | Multi-campus + progressive consolidation | Migrate domain-by-domain only with a written strategy |

High-level comparison pages: [`docs/diagrams/old-cms/comparison.html`](../diagrams/old-cms/comparison.html), agent matrix [`docs/ai/backend/cms-feature-comparison.md`](../ai/backend/cms-feature-comparison.md). Milestones: [SDD-03](03-delivery-milestones.md).

## 8. Open questions added by this inspection

See also [SDD-10](10-open-questions.md).

1. Which Cyberjaya student-facing URL is still Live?  
2. How do `api_student_*` procedures and `portal_r_student_*` tables map to Portal API methods?  
3. Does Raisd applicant-portal replace or sit beside the agent online application?  
4. Adobe Connect vs replacement meeting tool for [CAP-26](11-capability-catalog.md#cap-26)?  
5. Where do assignment submissions physically land today ([CAP-20](11-capability-catalog.md#cap-20))?  
6. Has a CMS backup restore been tested recently ([CAP-38](11-capability-catalog.md#cap-38))?

## 9. Related documents

- [SDD-02 Architecture and integration](02-architecture-and-integration.md)  
- [SDD-07 Admin / staff CMS](07-admin-staff-cms.md)  
- [SDD-11 Capability catalogue](11-capability-catalog.md)  
- AI inventory and full matrices: [`docs/ai/backend/`](../ai/backend/)  
- **Published analysis section:** [`docs/diagrams/old-cms/`](../diagrams/old-cms/) (feature comparison, FSD, Obsidian 3D knowledge graph, legacy ERD, flows, triggers/SPs/batches)
