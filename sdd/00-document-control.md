# Document control

**Document:** SDD-00  
**Status:** Working draft  
**Date:** 18 September 2026  
**Author:** Iman Suherman  
**Audience:** Working Group CMS 2026

## Purpose

Establish a single design baseline for the Student Portal and Campus Management System work the group is already running. The Daily Checklist is the product backlog. These SDDs add architecture, flows, definition of done, and the decisions that the checklist leaves TBC.

## Revision history

| Version | Date | Author | Notes |
|---|---|---|---|
| 0.1 | 18 Sep 2026 | Iman Suherman | First draft from Working Group sheet + group chat. Not yet confirmed by owners. |
| 0.2 | 19 Sep 2026 | Iman Suherman | SDD-12 records repository-to-host placement on the existing UltaHost VDS estate. Not yet confirmed which Premium runs the old CMS. |
| 0.3 | 19 Sep 2026 | Iman Suherman | SDD-12 revised: k3s, one node and the applicant portal first, then four launch stages. |
| 0.4 | 19 Sep 2026 | Iman Suherman | SDD-12: server size per stage, from a 4 GB VPS up to a 16 GB data node only when the previous size is full. |
| 0.5 | 19 Sep 2026 | Iman Suherman | SDD-13: sheet re-downloaded. No status change. Live count is 0. Dates remain TBC. |
| 0.6 | 23 Sep 2026 | Iman Suherman | Central AI knowledge base at [`docs/ai/`](../ai/) per Faid Zamin suggestion (standup 22 Sep 2026). Student-portal agent docs extracted; sibling repos point here as SSOT. |
| 0.7 | 23 Sep 2026 | Iman Suherman | SDD-14: Cyberjaya old CMS zip inventoried and mapped to CAP catalogue (`docs/ai/backend/cms-feature-comparison.md`). |
| 0.8 | 23 Sep 2026 | Iman Suherman | GitHub Pages section `docs/diagrams/old-cms/` — verbose comparison, FSD, legacy ERD, flows, triggers/SPs/batches. |
| 0.9 | 23 Sep 2026 | Iman Suherman | Aslam confirmed this-phase SoR = Cyberjaya CMS + Portal API (no ops duplication); longer-term progressive unified CMS. Recorded in SDD-01/02/03/14 and architecture overview. |
| 0.10 | 23 Sep 2026 | Iman Suherman | SDD-15 nomenclature; CAP-* / M* anchors and cross-links in SDD-03/11 and key docs. |

## Sources

| Source | Role |
|---|---|
| Student Portal and CMS Daily Checklist (simplified, detailed, Timeline, Requirements & Sources) | Canonical backlog and evidence |
| Working Group CMS 2026 WhatsApp, 18 Sep 2026 | Meeting context; student portal v1 frontend in progress |
| Repository baseline `6811e88` recorded in Requirements tab | Current student frontend implementation |
| Adobe XD Student Portal Rev04 | Visual reference only; not the delivery sequence |
| Phase 1 Timeline Resource Scenarios | Staffing note from earlier thread; not the working-group milestone order |
| Aslam WhatsApp, 19 Sep 2026 | Current UltaHost estate: VDS POWER Plus × 1, POWER Premium × 2; mailbox on `cp8.sgp1` |
| Faid Zamin, Working Group CMS 2026, 18 Sep 2026 | Google Sheet `1Yux9R8hIgcPrQ5OklKd9Oyq_04qJtaAhcxJvr_7NvYI`, overarching timeline. Re-downloaded 19 Sep 2026. Status cells unchanged. |
| Faid Zamin, Working Group standup, 22 Sep 2026 | Suggested a central AI knowledge base for backend, frontend, and architecture under control-plane `docs/`. Implemented as [`docs/ai/`](../ai/). |
| `raisd-campus/student-portal` agent docs | Extracted into [`docs/ai/frontend/student-portal/`](../ai/frontend/student-portal/) on 23 Sep 2026 for cross-repo agent use. |
| Aslam WhatsApp, 23 Sep 2026 | Confirmed this-phase CMS-as-SoR + Portal API portals; longer-term progressive unified one-stop CMS on verified gaps + migration strategy. |
| `CMS_Cyberjaya_Source_Codes_&_DB_Structure_23_09_2026.zip` | Existing CMS source + structure dump. Inventoried 23 Sep 2026 into [`docs/ai/backend/old-cms-cyberjaya.md`](../ai/backend/old-cms-cyberjaya.md) and [SDD-14](14-cms-feature-comparison.md). |

## Product decisions already recorded

From PRODUCT-PRIORITY, PRODUCT-MOBILE, PRODUCT-PORTALS (7 September 2026):

1. Cyberjaya first.
2. Admissions before semester registration.
3. Core mobile at launch (phone-friendly web, not a verified native-app mandate).
4. Keep the existing CMS as the initial backend. Whole-CMS coverage is a backlog, not an instruction to replace working legacy functions.
5. Group delivery by Applicant, Student, Lecturer, Admin / Staff, and Shared System.
6. **(23 Sep 2026 — Aslam)** This phase: Cyberjaya CMS = SoR; portals via Portal API; no duplication of operational functions. Longer term: progressive unified one-stop CMS on verified gaps with a clear migration strategy.

Owners, kickoff date, and backend commitments are TBC.

<a id="glossary"></a>

## Glossary

| Term | Meaning |
|---|---|
| [CAP-nn](11-capability-catalog.md) | Capability identifier (`#cap-nn`). Same ID on two portals = one capability, two role surfaces. Index: [SDD-15](15-nomenclature.md). |
| Old CMS / existing CMS | Current campus system of record. Initial backend for the new portals. |
| Portal API | First working integration contract between new UIs and the existing CMS. |
| Demo | UI on sample data or a temporary session. No live backend, no durable save. |
| Placeholder | Screen or control exists; the intended action does not. |
| Partial | Some of the capability exists; key workflow, content, or acceptance is missing. |
| Live | Accepted, real data, access controls, accountable owner. |
| Needs checking | Not verified with the owning department or old-CMS owner. |
| Cyberjaya | First campus acceptance gate, not the whole eight-country footprint. |
| Core mobile | Agreed admissions and student journeys usable on phone/tablet widths. |
| [M1](03-delivery-milestones.md#m1)–[M5](03-delivery-milestones.md#m5) | Delivery milestones (confirm rules → admissions → core student → Cyberjaya pilot → expansion / remaining CMS). Index: [SDD-15](15-nomenclature.md). |
| [SDD-15](15-nomenclature.md) | Nomenclature index for all CAP-* and M* quick links. |

## Status meanings

Copied from the checklist Timeline tab. Use these words in PRs, stand-ups, and acceptance.

| Status | Meaning |
|---|---|
| Not started | No implementation of this capability in the reviewed portal. |
| Placeholder | A page, label or button exists, but the intended action or content is unavailable. |
| Demo | Built using sample data or a temporary session. No live backend or durable save. |
| Partial | Some parts exist; key content, delivery, workflow or acceptance work is missing. |
| In progress | An assigned owner is actively working on the item. |
| Ready for testing | Implementation is available for the agreed acceptance tests. |
| Live | Accepted and operating with real data, access controls and an accountable owner. |
| Needs checking | Capability or evidence has not been verified with its owner. |
| Not applicable | This workstream is not relevant to this capability. |

Software status is not campus compliance. Non-software controls stay as explicit checks in the next-action column.

## Open control items

- Stack, repo access, environments, and named backend owner are not in the sheet.
- Department is TBC on many rows. Do not invent owners in these drafts.
- Simplified “Frontend ready” maps mostly to Demo / Partial in the detailed tab. Design docs use the detailed statuses.
