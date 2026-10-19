# Fee calculation simulation — progress and review

**Standup action (Read.ai 13 Oct 2026):** *DVD, MIT will create an AI-assisted fee-calculation component and pass it to Iman or Faid for review* · *DVD, MIT will share the fee-calculation work with the group.*  
**WhatsApp share:** Working Group CMS 2026 · 14 Oct 2026 · `fee_management_v4_sst.html` + screenshots.  
**Status:** Application-fee path ready for review; semester calculation not finished (Dexter).  
**As of:** 14 October 2026.

| Related | Path |
|---|---|
| Pages (interactive JS) | [`fee-calculation-simulation.html`](../../diagrams/old-cms/fee-calculation-simulation.html) |
| Dynamic fee proposal | [dynamic-fee-calculation.md](dynamic-fee-calculation.md) |
| Cross-campus amounts | [cross-campus-fee-amount-suggestions.md](cross-campus-fee-amount-suggestions.md) |
| Finance profile seeds | [../contracts/campus-finance-profiles.yaml](../contracts/campus-finance-profiles.yaml) |

Demo ≠ Live. Sample RM catalogue and 6% SST are Cyberjaya-flavoured prototypes for review — not Live campus policy.

---

## 1. Progress so far

| Area | State | Notes |
|---|---|---|
| Application item fees (APP / VISA / REG) | Shared · reviewable | SST flags; visa country table |
| Campus scoping | Agreed in chat | Visa mapped per campus; no campus picker in admin UI |
| JS projection on Pages | Done | This simulation page |
| Semester fee calc | WIP | Dexter will instruct AI next; align with C1–C10 |

---

### Confirmed fee identity for the planned overhaul — 19 October 2026

The owner relayed the team's confirmation: **Application Fee and Registration Fee are the same charge per programme applied**. The enrolment-flow screenshot calls it **Registration Fee**; use that term in the application-flow overhaul. The APP001 and REG001 rows below preserve the earlier shared-HTML proposal, not two separately approved admissions charges. Reconcile their mapping during implementation and prevent duplicate charging while preserving historical fee/payment references.

Semester/resource fees remain per semester enrolment. Collection timing and credits towards those charges are still unconfirmed. This planning update changes no fee amount, tax treatment, identifier, ledger record or running application. See the [overhaul checklist](../frontend/applicant-portal.md#planned-application-flow-overhaul--fee-decision-19-october-2026).

## 2. Application fee model (from shared HTML)

| Code | Item | Applies | Pricing | SST (sample) |
|---|---|---|---|---|
| `APP001` | Application Fee | Local & International | Fixed local/international | Yes |
| `VISA001` | Visa Processing Fee | International only | Country-based | Yes |
| `REG001` | Registration Fee | Local & International | Fixed local/international | No |

Visa examples in Dexter’s modal: India RM 500 · Indonesia RM 450 · China RM 600. Vara: each campus may have different country visa costs.

---

## 3. Review suggestions

1. Confirm whether Registration Fee is application-time or post-offer.
2. Supply per-campus visa country tables beyond sample countries.
3. Map Accepts into `campus-finance-profiles.yaml` (Lesotho Demo app fee remains LSL 300).
4. Confirm SST outside Cyberjaya/MYR — do not inherit 6% Malaysian SST for other campuses without Finance.
5. Keep portals free of hard-coded Live amounts; Portal API / profile is the projection source.
6. Finish semester engine next (Standard vs Modular override · C3/C4).

---

## 4. Pages

Live (after publish to `portal-api-docs`):  
https://raisd-campus.github.io/portal-api-docs/diagrams/old-cms/fee-calculation-simulation.html
