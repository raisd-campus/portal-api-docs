# Dynamic fee calculation — proposed approach (for review)

**Standup action (Read.ai 9 Oct 2026):** *Iman Suherman will prepare documentation for a proposed dynamic fee-calculation approach for review.*  
**Meeting principle:** *The new fee calculation should use configurable rules rather than reproduce hard-coded legacy logic.*  
**As of:** 10 October 2026.  
**Status:** Proposed — awaiting Dexter validation of C1–C10 SP interpretation, then Faid / Finance Accept.

| Related | Path |
|---|---|
| SP evidence (C1–C10) | [applicant-qr-fee-mechanisms.md](applicant-qr-fee-mechanisms.md) |
| Campus profile + Faid checklist | [campus-finance-profile.md](campus-finance-profile.md) |
| Reviewable seeds | [../contracts/campus-finance-profiles.yaml](../contracts/campus-finance-profiles.yaml) |
| Online-enrolment writes | [lesotho-cap53-online-enrolment-write.md](lesotho-cap53-online-enrolment-write.md) |
| Pages | [`campus-finance-profile.html`](../../diagrams/old-cms-lesotho/campus-finance-profile.html) · [`fee-payment-sps.html`](../../diagrams/old-cms-lesotho/fee-payment-sps.html) · [`dynamic-fee-calculation.html`](../../diagrams/old-cms-lesotho/dynamic-fee-calculation.html) · [`cross-campus-fee-amounts.html`](../../diagrams/old-cms/cross-campus-fee-amounts.html) · [`fee-calculation-simulation.html`](../../diagrams/old-cms/fee-calculation-simulation.html) (JS Demo · 14 Oct) |
| Amount suggestions | [cross-campus-fee-amount-suggestions.md](cross-campus-fee-amount-suggestions.md) |
| DVD share / simulation | [fee-calculation-simulation.md](fee-calculation-simulation.md) |

Demo ≠ Live. This proposal does **not** authorise copying CMS hard-coded amounts (600/375, 150/250, etc.) into Raisd as permanent product rules.

---

## 1. Problem

Today Lesotho (and sibling) fee logic lives inside CMS stored procedures — especially `b_Update_Student` and `sp_payment_verification_insert`:

- Currency stamps are **hard-coded** per institution (`M` / `R` / `MYR`).
- Semester vs modular, repeats, resource, deferred are **procedural branches** (cases C1–C10).
- Some repeat paths use **numeric literals** inside the SP.
- Applicant Demo still shows MYR-flavoured bank copy; Live Lesotho uses Loti (`M` / LSL).

If Raisd re-implements those branches as fixed code, every campus tweak becomes an engineering release. Standup asks for **configurable rules**.

---

## 2. Goals

| # | Goal |
|---|---|
| G1 | Fee **applicability**, **amount**, and **currency** are campus (and later programme/term) configuration — not FE constants |
| G2 | C1–C10 become named rule flags / parameters that Finance can Accept without rewriting Portal API |
| G3 | Live CMS remains system of record for invoicing until CAP-53 cutover; Raisd may **project** fees for Student UX from the same rule set |
| G4 | Do **not** wait for every campus spreadsheet before shipping seeds (standup D6) |
| G5 | NMDS / assist billing stays a **separate** funding plane — not mixed into Applicant application fee |

---

## 3. Proposed architecture

```
┌─────────────────────────────────────────────────────────────┐
│  campus_finance_profiles.yaml  (review seed → later Schema) │
│  · currencyCode + cmsPaymentCurrency map                    │
│  · applicationFee { applies, amountMinor, currency }        │
│  · semesterBilling.mode (semester | modular | hybrid)       │
│  · feeCases C1–C10 { enabled, params, faid }                │
└───────────────────────────┬─────────────────────────────────┘
                            │ read-only at runtime (Demo seed first)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Fee engine (Portal API — proposed)                         │
│  evaluate(studentContext, profile) → FeeProjection          │
│  · applies rules in order C1→C8                             │
│  · never invents Live amounts not in profile / CMS read     │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
                ▼                             ▼
     Applicant Fee step              Student Finance / CAP-53
     (Plane A — app fee)             (Plane B enrol proof · Plane C semester)
```

**Live write path:** payment proof still goes through CMS procedures (`sp_payment_verification_insert`, `sp_onlinenrollment_*`) with adapter mapping of ISO ↔ CMS stamp. See [lesotho-cap53-online-enrolment-write.md](lesotho-cap53-online-enrolment-write.md).

---

## 4. Evaluation order (dynamic rules)

Same order as distilled from `b_Update_Student`, expressed as config — not as copy-pasted SQL:

| Step | Case | If enabled… |
|---|---|---|
| 1 | **C1** | Non-chargeable AD/module status → component amount = 0 |
| 2 | **C2** | Historical Exempted before `exemptBeforeTerm` → 0 |
| 3 | **C3 / C4** | `mode`: semester catalogue fee and/or sum of modular fees (`UseModularFee` hybrid) |
| 4 | **C5** | Repeat / ADD add-ons — prefer catalogue rates; CMS literals only as `hardcodeOverrides[]` until Finance replaces them |
| 5 | **C6** | Resource fee minus `resourceExemptSemesterCodes` |
| 6 | **C7** | Deferred component rules |
| 7 | **C8** | Totals from declared component lists (`studentTotal` / `standardTotal`) |
| 8 | **C9 / C10** | Invoice lines + PayStatus — **later** (CMS / Student Finance); out of Applicant launch path |

Engine output is a **projection** (`components[]`, `totalMinor`, `currencyCode`, `ruleTrace[]`) for UI and Demo. Live ledger remains CMS until W1/cutover.

---

## 5. What is explicitly not dynamic (yet)

| Item | Treatment |
|---|---|
| CMS SP numeric literals (Lesotho 600/375, Cambodia 150/250) | Stay CMS-side; list as overrides only after Dexter confirms |
| NMDS `LSO/{YYMM}/…` assist bills | Separate profile / `b_Update_billing` |
| Add/drop module form fees | **Waiting** — meeting assigned fee amounts to a participant (not yet named in Read.ai) |
| Module-registration flow charge | **Waiting** — same; flow is payment → bursary verify → faculty approve |
| Partial payment after register | Open question from meeting — not seeded |

---

## 6. Review sequence (this week)

1. **Dexter** — validate Iman’s C1–C10 interpretation against the SP bodies (blocking for “convert to final config”).  
2. **Faid / Finance** — Accept / Change / Defer on [`campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml) `faid` fields (Lesotho first).  
3. **Participant** — supply add/drop and module-registration fee amounts → fold into YAML.  
4. **Iman** — fold Accept rows into Schema / Demo seed; expose read-only profile on Applicant fee step.  
5. **Portal API** — implement evaluate path behind Demo first; CAP-53 W1 for online-enrolment proof separately.

---

## 7. Acceptance criteria for this proposal

- [ ] Dexter confirms or corrects C1–C10 wording  
- [ ] Faid ticks Lesotho currency + application fee + C1–C8  
- [ ] Team agrees engine evaluates **config**, not a second hard-coded matrix in TypeScript  
- [ ] Add/drop + registration fee amounts landed or explicitly Deferred  
- [ ] OpenAPI / Neon table not required for first Demo seed (YAML/fixture enough)

---

## 8. Standup closure

| Action (9 Oct) | Status 10 Oct |
|---|---|
| Document dynamic fee-calculation approach | **Done** — this doc + Pages |
| Convert C1–C10 to reviewable config | **Done (seed)** — YAML; finalise after Dexter |
| Campus currencies / fee amounts | **Pending** Faid + participants |
| Implement engine in Portal API | **Not started** |
