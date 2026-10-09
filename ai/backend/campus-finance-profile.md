# Campus finance profile + semester fee cases (for Faid review)

**Standup (Read.ai 8 Oct 2026):** *Iman will generate an analysis of semester-fee calculations for Faid to review* · fee rules should be **configurable** (applies / amount / currency) so launch is not blocked on campus confirmation.  
**As of:** 9 October 2026.  
**SP baseline:** [applicant-qr-fee-mechanisms.md](applicant-qr-fee-mechanisms.md) · Pages [`fee-payment-sps.html`](../../diagrams/old-cms-lesotho/fee-payment-sps.html).  
**Reviewable config (SoT for seeds):** [`../contracts/campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml).  
**This page (human review):** [`campus-finance-profile.html`](../../diagrams/old-cms-lesotho/campus-finance-profile.html).  
**CAP-53 online-enrolment writes:** [lesotho-cap53-online-enrolment-write.md](lesotho-cap53-online-enrolment-write.md).  
**Status:** **Proposed config** — Demo seeds / Schema policy candidates. Not Live CMS amounts. Not implemented in Portal API yet.

Demo ≠ Live. Values below are inferred from CMS SP/table evidence and Lesotho UI screenshots (e.g. M300 VERIFIED). Faid / Registry / Finance must tick Accept / Change / Defer per row.

---

## 1. What to decide

| # | Decision | Proposed default | Evidence |
|---|---|---|---|
| D1 | Raisd stores ISO-4217 currency per campus; map CMS 1-letter codes at the adapter | Lesotho `M`→**LSL**; Eswatini `R`→**ZAR** *(confirm vs SZL)*; Cambodia SP `MYR`→**MYR** *(CMS quirk — confirm Live)* | `sp_payment_verification_insert` |
| D2 | Application fee is a campus profile field (applies + amountMinor + currency), not hard-coded in FE | Lesotho applies=Y, **30000** minor LSL (M300 screenshot); others TBD | `b_zapplicationfee*` · UI M300 |
| D3 | Semester billing mode is campus (+ optional programme/term override): `semester` \| `modular` \| `hybrid` | Default **hybrid** mirroring `UseModularFee` on semester row | `b_Update_Student` C3/C4 |
| D4 | Repeat / resource / deferred are separate rule flags, not one global formula | Cases C5–C7 enabled for Lesotho; campus hardcodes stay CMS-side until CAP-53 | `b_Update_Student` |
| D5 | Assist/NMDS billing is **out of** Applicant fee profile | Separate funding profile later | `b_Update_billing` |
| D6 | Proceed with available profile seeds; do not wait for every campus spreadsheet | Yes (standup 8 Oct launch strategy) | Read.ai chapters |

---

## 2. Proposed Raisd shape — `campus_finance_profile`

**Machine-readable seed (edit this for Faid Accept folds):**  
[`docs/ai/contracts/campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml)

That file holds full C1–C10 enablement, LS/SZ/KH currency + application-fee seeds, online-enrolment procedure names, and `faid: null` placeholders (`accept` | `change` | `defer`). Sketch below matches the YAML; do not fork a second shape.

```yaml
# excerpt — see contracts/campus-finance-profiles.yaml
profiles:
  - campusId: campus-lesotho
    currencyCode: LSL
    cmsPaymentCurrency: "M"
    applicationFee: { applies: true, amountMinor: 30000, currencyCode: LSL }
    semesterBilling: { mode: hybrid, components: { course, modularAdd, resource, repeat, deferred } }
    feeCases: { C1…C10: { enabled, faid } }
```

**OpenAPI / Portal API:** no new methods in this change. When implemented, expose read-only profile on campus catalogue / Applicant fee step (Demo seed first).

---

## 3. Fee cases C1–C10 → config + Faid checklist

| ID | Rule (CMS) | Config knob | Lesotho | Eswatini | Cambodia | Faid |
|---|---|---|---|---|---|---|
| C1 | Zero module fee when AD/module status non-chargeable | `zeroWhenNotChargeable: true` | On | On* | On* | ☐ |
| C2 | Historical Exempted before cutover term | `exemptBeforeTerm` (optional) | `2011-07` in SP | * | * | ☐ |
| C3 | Semester fee from catalogue (`f_semester.semesterfee`) when not modular | `mode` includes semester | On | On* | On* | ☐ |
| C4 | Modular = sum chargeable `stdmodfee` when `UseModularFee=Y` | `mode` includes modular | On | On* | On* | ☐ |
| C5 | Repeat/ADD → add-on fees (CMS may hardcode amounts) | `repeat.enabled` + optional `hardcodeOverrides[]` | On (SP 600/375 paths) | * | On (150/250 paths) | ☐ |
| C6 | Resource fee with exemption list | `resource.enabled` + `exemptSemesterCodes` | On (F3/L3 …) | * | * | ☐ |
| C7 | Deferred zeroes / def component | `deferred.enabled` | On | * | * | ☐ |
| C8 | Totals formula | `totals.studentTotal` / `standardTotal` | As §2 | Same shape | Same shape | ☐ |
| C9 | Invoice lines from semester amounts | Live = CMS/CAP-53; Demo = Student Finance | Later | Later | Later | ☐ |
| C10 | PayStatus Partial/Full vs outstanding | Student Finance projection | Later | Later | Later | ☐ |

\*Same procedure family present; campus-specific constants not fully matrixed — Vara SP compile still open.

---

## 4. Proposed campus seeds (review)

### 4.1 Lesotho (pilot — M4)

| Field | Proposed | Source |
|---|---|---|
| `currencyCode` | **LSL** | UI Loti M; SP `'M'` |
| `cmsPaymentCurrency` | `M` | `sp_payment_verification_insert` |
| `cmsInstitutionId` | `1` | same SP |
| `applicationFee.applies` | **true** | Admissions payment VERIFIED desks |
| `applicationFee.amountMinor` | **30000** (M300) | Screenshot evidence in gap docs — **confirm** |
| `semesterBilling.mode` | **hybrid** | `UseModularFee` on semester |
| Assist/NMDS | Out of this profile | `b_Update_billing` `LSO/…` |

### 4.2 Eswatini

| Field | Proposed | Source |
|---|---|---|
| `currencyCode` | **ZAR** *(or SZL — confirm)* | SP `'R'` |
| `cmsPaymentCurrency` | `R` | payment insert SP |
| `cmsInstitutionId` | `1` | same |
| `applicationFee` | TBD | No screenshot amount in Raisd KB |
| `semesterBilling.mode` | hybrid (assume) | shared SP family |

### 4.3 Cambodia

| Field | Proposed | Source |
|---|---|---|
| `currencyCode` | **MYR** for CMS parity *(flag: likely wrong for campus Live — confirm USD/KHR)* | SP `'MYR'`, Institution `30` |
| `cmsPaymentCurrency` | `MYR` | payment insert SP |
| `cmsInstitutionId` | `30` | same |
| Repeat hardcodes | Keep CMS-side (150/250) until config overrides exist | `b_Update_Student` |

### 4.4 Other Applicant Demo campuses (Uganda, Namibia, Cyberjaya, Botswana, Sierra Leone)

Seed **currency + applicationFee.applies=false** (or Demo MYR/RM copy) until Vara/campus packs fill amounts. Cyberjaya research baseline remains RM 500/1000 from LUCT forms — not Lesotho Live.

---

## 5. Applicant / Student mapping

| Plane | Profile fields used | Today | Next implement |
|---|---|---|---|
| A. Application fee | `applicationFee.*` + `currencyCode` | Demo bank copy (not LSL) | Applicant Fee step reads profile seed; Bursary verify unchanged |
| B. Online enrolment proof | `onlineEnrolmentPayment.*` | Student CAP-46 Demo | CAP-53 W1 → [online-enrolment write](lesotho-cap53-online-enrolment-write.md) |
| C. Semester calc | `semesterBilling` + C1–C10 | Student Finance Demo | Config-driven projection; Live still CMS `b_Update_Student` until cutover |

---

## 6. Faid review instructions

1. Tick **Accept / Change / Defer** on §1 D1–D6 and §3 C1–C10 (Lesotho column first).  
2. Confirm Lesotho application fee **M300** (or supply correct `amountMinor`).  
3. Confirm Eswatini `R` → ZAR vs SZL; Cambodia Live currency vs CMS `MYR`.  
4. Say whether Applicant Demo should show LSL copy from this profile **before** Live CMS connect.  
5. Reply on WG thread or annotate Pages — Iman will fold Accept rows into Schema policy / Demo seeds.

---

## 7. Related

| Doc | Role |
|---|---|
| [campus-finance-profiles.yaml](../contracts/campus-finance-profiles.yaml) | Reviewable C1–C10 + campus seeds |
| [lesotho-cap53-online-enrolment-write.md](lesotho-cap53-online-enrolment-write.md) | CAP-53 W1 proof → SP path |
| [applicant-qr-fee-mechanisms.md](applicant-qr-fee-mechanisms.md) | SP evidence |
| [lesotho-db-gap.md](lesotho-db-gap.md) | M300 / LSL gap rows |
| [lesotho-cms-vs-applicant-portal.md](lesotho-cms-vs-applicant-portal.md) | Applicant backlog B2/B3 |
| [canonical-schema-luct-readiness.md](canonical-schema-luct-readiness.md) | Invoice-based finance target |
| SDD-10 | Decision log row 9 Oct |

---

## 8. Closure

| Standup item | Status |
|---|---|
| Semester-fee analysis for Faid | **Done** — this doc + Pages (proposed profile + C1–C10 checklist) |
| Convert C1–C10 into reviewable config | **Done** — [`campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml) |
| Campus finance profile (applies / amount / currency) | **Proposed** — awaiting Faid Accept on YAML `faid` fields + §1–§4 |
| CAP-53 online-enrolment proof → SPs | **Documented** — [W1 write path](lesotho-cap53-online-enrolment-write.md) (not implemented) |
| Implement profile in Portal API / Neon | **Not started** |
| Student-payment behaviour deep-dive | **Next** after Faid ticks |
