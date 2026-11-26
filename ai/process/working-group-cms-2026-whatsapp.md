# Working Group CMS 2026 — WhatsApp chat analysis

**Source:** WhatsApp export `Working Group CMS 2026` (zip received 26 Nov 2026).  
**Span:** group created 24 Aug 2026; substantive traffic **18 Sep – 25 Nov 2026**.  
**Published page:** [docs/reports/working-group-cms-2026-chat-analysis/](../../reports/working-group-cms-2026-chat-analysis/) · https://docs.raisd.co/reports/working-group-cms-2026-chat-analysis/

**Do not** commit the raw `_chat.txt` or shared login credentials into git or docs.raisd.co. This note records decisions and themes only.

## Participants (message volume)

| Participant | Role (as seen in chat) | ~Msgs |
|---|---|---|
| Iman Suherman | Architecture, Portal API, docs.raisd, Demo infra, CMS inventories | 312 |
| Aslam | WG lead, product confirmations, campus liaison | 171 |
| Faid Zamin | Frontend / design-system / Student & Applicant | 73 |
| Mohd Vara | Legacy CMS packs, schema / LUCT compatibility | 30 |
| DVD (Dexter) | Fee / admissions process answers from CMS ops | 30 |

## Binding decisions recorded in-chat

| Date | Decision | Owner signal | Knowledge home |
|---|---|---|---|
| 23 Sep 2026 | **ADR-1 this phase:** existing campus CMS remains system of record; portals via Portal API; **do not duplicate** operational functions. Longer term: progressive unified CMS on verified gaps. | Aslam confirm | [architecture/overview.md](../architecture/overview.md), [backend/cms-feature-comparison.md](../backend/cms-feature-comparison.md) |
| 22 Sep 2026 | Central **AI knowledge base** under control-plane `docs/ai/` | Faid suggestion; WG standup | [README.md](../README.md), this tree |
| 3 Oct 2026 | **Lesotho = first pilot / acceptance campus (M4)** — supersedes Cyberjaya-first priority. Admissions before semester registration. Lesotho newer CMS screenshots = feature benchmark. | WG weekly + Faid screenshots | [architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| 1 Oct 2026 | Canonical Schema **v3** proceed path; campus rules in policy entities (CS-01–CS-13) | Vara review + Demo wiring | [backend/canonical-schema-luct-readiness.md](../backend/canonical-schema-luct-readiness.md) |
| 16 Oct 2026 | Admissions: **eligibility first** (includes payables, like offer letter); fee timing clarified with Aslam 20 Oct | DVD + Aslam | campus finance / applicant flow docs |
| 14 Oct 2026 | Multi-campus Demo on **raisd.co** (hostname-pinned; UltaHost k3s) | Aslam server + domain | [architecture/vps-topology.md](../architecture/vps-topology.md) |

## Theme map (relative chat weight)

Ordered by approximate keyword hit volume in the export:

1. Standups / meetings cadence  
2. Demo deploy / hostnames / Keychain  
3. Applicant + Student portal journeys  
4. docs.raisd / Guidance / website AI  
5. Online / live class (plugNmeet, ICE/TURN, recording, attendance)  
6. Lesotho pilot + CMS inventories  
7. Fees / finance / NMDS≠DTEF context  
8. SSO (Google live; Meta / Apple still open)  
9. Canonical schema / ERD  
10. CAP-53 CMS bridge  
11. LMS research (docs-only posture)  
12. Uganda / GradeFlow alumni CMS review (25 Nov — FYI analysis, not adoption)

## Phases (chat narrative)

### Sep 18–30 — Kickoff, ADR, inventories

- Iman joins; SDD under `docs/sdd/`; ERD/DFD; Cyberjaya / Sierra Leone / Botswana CMS packs from Vara.  
- Aslam confirms ADR-1.  
- Design-system package published (Faid). Portal API split toward hosted Demo.  
- Docs site gated; distributed CMS target architecture posted.

### Oct 1–14 — Lesotho pilot + hosted Demo estate

- Schema v3 + LMS research docs.  
- Lesotho pilot binding; old CMS dump inventory (`campus2_lesotho` structure counts).  
- Eswatini / Cambodia inventories; Cambodia certificate QR.  
- Fee / finance profiles and C1–C10; cross-campus fee amounts.  
- UltaHost + docs.raisd.co + Keychain; eight Demo campus hostnames.

### Oct 15–31 — Access control, Staff Admin, Guidance

- SSO enablement path; Staff vs Control RBAC hardening (Faid P1 reviews).  
- University Flows / Access module hierarchy.  
- Lesotho newer CMS docs, feature modules FM-01…FM-18, website AI should/should-not (29–30 Oct).

### Nov 1–25 — Live class + CAP-53 + SSO channels

- Online-class Demo Partial; plugNmeet Classroom; media bridge / SFU / ICE-TURN open items.  
- CAP-53 CMS bridge architecture + Demo mock connector.  
- Google SSO live on Demo; Facebook/Instagram Meta verify + Apple Developer access still open.  
- Staff Action required + blank-embed join fix (25 Nov).  
- **Uganda GradeFlow** alumni CMS shared for WG review — basic; campus wants to leave LUCT CMS; Raisd asked to “look / bless”; analysis for next meeting (not production adoption).

## Open items still visible at export cut (25 Nov)

- Public ICE/TURN for student media (Demo Partial).  
- Facebook + Instagram SSO finish-enable on Demo.  
- Apple SSO — Apple Developer account access.  
- Uganda GradeFlow deep analysis (promised for next WG meeting) — compare to Lesotho / Raisd portals; no bless/adopt decision in chat yet.  
- Live CMS-backed journeys remain **0% Live** posture (Demo ≠ Live).

## Related published packs

- Standup updates: [cms-standup-updates-2026-11-25](../../reports/cms-standup-updates-2026-11-25/), [11-21](../../reports/cms-standup-updates-2026-11-21/), earlier Oct/Nov folders under `docs/reports/`.  
- Weekly / executive: [reports hub](../../reports/index.html).  
- Lesotho briefing: [lesotho-cms-analysis-2026-10-05](../../reports/lesotho-cms-analysis-2026-10-05/).

## Provenance

| Field | Value |
|---|---|
| Export file | `WhatsApp Chat - Working Group CMS 2026.zip` (local Downloads; not in repo) |
| Analysed | 26 Nov 2026 |
| Messages parsed | 618 (excluding system stubs counted in raw lines) |
| docs.raisd.co URLs shared in-chat | 62 unique |
