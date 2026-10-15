# Cross-campus fee amount suggestions

**As of:** 10 October 2026.  
**Status:** Proposed seeds from CMS SP / table / process evidence — **not** Live policy until Faid / Finance Accept.  
**Pages:** [`cross-campus-fee-amounts.html`](../../diagrams/old-cms/cross-campus-fee-amounts.html).  
**Related:** [dynamic-fee-calculation.md](dynamic-fee-calculation.md) · [campus-finance-profiles.yaml](../contracts/campus-finance-profiles.yaml) · [applicant-qr-fee-mechanisms.md](applicant-qr-fee-mechanisms.md).

Demo ≠ Live. Amounts below are **suggestions** distilled from procedure bodies and UI evidence. Catalogue semester fees (`f_semester.SemesterFee`) are campus-data dependent and are **not** invented here.

---

## 1. Shared calculation model

Every LUCT-family campus with `b_Update_Student` follows the same planes. Raisd should project fees with this order, then apply **campus overrides** for hard-coded literals.

| Plane | What | Amount source | Process |
|---|---|---|---|
| **A** | Application fee | `b_zapplicationfee*.FeeAmount` (where present) + UI | Applicant pay → Bursary verify |
| **B** | Online-enrolment payment proof | Amount on proof; currency from SP stamp | Student submit → `sp_payment_verification_insert` |
| **C** | Semester / modular billing | `f_semester` + module fees + C1–C10 | CMS `b_Update_Student` job / CAP-53 later |
| **D** | Assist / NMDS (or campus assist) | `b_Update_billing` / assist tables | Finance — out of Applicant fee |

### Plane C formula (suggested Raisd projection)

```
for each chargeable module (C1/C2 gates):
  base = modular ? stdmodfee : (share of semesterfee)   # C3/C4
  apply campus hardcodeOverrides (C5) if matched
resource = ResourceFee unless exempt (C6)
deferred = def rules (C7)
totals   = studentTotal / standardTotal component lists (C8)
```

Invoice lines (C9) and PayStatus (C10) stay CMS / Student Finance later.

---

## 2. Currency stamps (SP evidence)

| Campus | CMS DB | `InstitutionID` | `PaymentCurrency` | Suggested Raisd ISO | Confidence |
|---|---|---|---|---|---|
| Lesotho | `campus2_lesotho` | `1` | **`M`** | **LSL** | High (SP + UI M300) |
| Eswatini | `campus2_eswatini` | `1` | **`R`** | **ZAR** *(or SZL — confirm)* | High stamp / medium ISO |
| Cambodia | `campus2_cambodia` | **`30`** | **`MYR`** | Live TBD (USD/KHR likely) | High SP quirk / low Live ISO |
| Cyberjaya | `cmscbj` (research) | — | MYR / RM forms | **MYR** | Research baseline only |
| Botswana | `cmsbotswana` | — | BWP expected | **BWP** | Medium (inventory; no SP body here) |
| Sierra Leone | `ems_sierraleone` | — | SLE/SLL TBD | **SLE** | Low — need `b_calcmodule` body |
| Uganda / Namibia | Demo catalogue | — | — | TBD | Placeholder |

Source: `sp_payment_verification_insert` in Lesotho / Eswatini / Cambodia procedure dumps (5–7 Oct 2026 packs).

---

## 3. Suggested amounts by campus

### 3.1 Lesotho (pilot — M4)

| Component | Suggested | Unit | Evidence | Confidence |
|---|---|---|---|---|
| Application fee | **300.00** | LSL (`amountMinor` 30000) | Newer-CMS screenshot M300 VERIFIED; `b_zapplicationfee` table present | Medium — confirm Live `FeeAmount` |
| Payment stamp | `M` | — | SP insert | High |
| LAN/MPW module (Add/Compulsory/Current) | **600** | LSL (CMS unit) | `b_Update_Student` hardcode | High (SP) |
| LAN/MPW repeat | **375** | LSL | same SP | High (SP) |
| Semester / modular catalogue | from `f_semester.SemesterFee` / `stdmodfee` | LSL | table columns | High structure / amount = Live data |
| Resource | `f_semester.ResourceFee` with exemptions | LSL | C6 | Medium |
| NMDS assist bills | pattern `LSO/{YYMM}/…` | — | `b_Update_billing` | Process only — not Applicant fee |

**Suggested Raisd override list (C5):**

```yaml
hardcodeOverrides:
  - match: { moduleRefPrefix: ["LAN", "MPW"], status: [Add, Compulsory, Current] }
    amountMinor: 60000   # confirm minor-unit scale vs CMS double
  - match: { moduleRefPrefix: ["LAN", "MPW"], statusPrefix: "repeat" }
    amountMinor: 37500
```

> Scale note: CMS stores many fees as plain doubles (600). Raisd ISO minor units are ×100 for LSL/ZAR/MYR. Confirm with Finance before coding.

### 3.2 Eswatini

| Component | Suggested | Unit | Evidence | Confidence |
|---|---|---|---|---|
| Application fee | **TBD** | ZAR/SZL | No `b_zapplicationfee` in table dump; no screenshot | Low |
| Payment stamp | `R` | — | SP | High |
| LAN/MPW Add/Current | **600** | CMS unit | `b_Update_Student` (same family as LS) | High |
| LAN/MPW repeat | **375** | CMS unit | same | High |
| Repeat (Associate Degree, term ≥ 2022-01) | **2600** per repeat module | CMS unit | SP + Sept 2025 total recalc | High |
| Repeat (Degree, term ≥ 2022-01) | **3600** per repeat module | CMS unit | same | High |
| Semester catalogue | `f_semester.SemesterFee` | — | table | Live data |

**Suggested overrides:**

```yaml
hardcodeOverrides:
  - { match: { moduleRefPrefix: ["LAN","MPW"], status: [Add,Compulsory,Current] }, amount: 600 }
  - { match: { moduleRefPrefix: ["LAN","MPW"], statusPrefix: "repeat" }, amount: 375 }
  - { match: { statusPrefix: "repeat", programCat: "Associate Degree", termGte: "2022-01" }, amount: 2600 }
  - { match: { statusPrefix: "repeat", programCat: "Degree", termGte: "2022-01" }, amount: 3600 }
```

### 3.3 Cambodia

| Component | Suggested | Unit | Evidence | Confidence |
|---|---|---|---|---|
| Application fee | **TBD** | Live currency | No app-fee table in dump | Low |
| Payment stamp | `MYR` + Institution **30** | CMS quirk | SP | High stamp / **do not treat as Live campus currency** |
| Repeat PUFP | **150** | CMS unit | `b_Update_Student` | High |
| Repeat P1 | **250** | CMS unit | same | High |
| Repeat P2 | **220** (200 commented out) | CMS unit | same | High |
| Repeat P3 | **150** | CMS unit | same | High |
| Assist billing SP | **absent** | — | no `b_Update_billing` in dump | N/A |

### 3.4 Cyberjaya (research baseline)

| Component | Suggested | Unit | Evidence | Confidence |
|---|---|---|---|---|
| Application fee | **500** / **1000** | MYR | LUCT online-registration forms | Research only — not Lesotho Live |
| Process | Process A applicant wizard | — | [luct-online-registration.md](luct-online-registration.md) | High process / form amounts |

### 3.5 Botswana

| Component | Suggested | Unit | Evidence | Confidence |
|---|---|---|---|---|
| Currency | **BWP** | — | Inventory / assist family | Medium |
| Calculation | `b_Update_Student` / `b_Update_billing` + DTEF assist | — | [old-cms-botswana.md](old-cms-botswana.md) | Process known; **amounts need SP compile** |
| Application fee | TBD | BWP | setup fee catalogs in PHP | Low |

### 3.6 Sierra Leone

| Component | Suggested | Unit | Evidence | Confidence |
|---|---|---|---|---|
| Currency | **SLE** (confirm vs SLL) | — | ISO rename | Low |
| Calculation | `b_calcmodule` / `b_calcsch` | — | Catalog only — **bodies not in Raisd `_local`** | Blocked on Vara pack |
| Fee structure tables | `b_feestructure*` → invoice | — | inventory | Medium structure |

### 3.7 Uganda / Namibia (Demo catalogue)

No CMS fee SP evidence in Raisd packs. Keep `applicationFee.applies: false` (or Demo placeholder) until campus packs arrive.

---

## 4. Process map (what students/staff do)

1. **Apply** — pay application fee (Plane A) → Bursary VERIFIED.  
2. **Offer accept** — student identity created.  
3. **Online enrolment** — upload payment proof (Plane B); currency stamped by SP.  
4. **Module registration** — confirm modules; CMS recalculates semester totals (Plane C).  
5. **Assist** (Lesotho NMDS / Botswana DTEF / etc.) — separate Plane D.

Raisd Demo today covers A (partial), B/C UX without Live SP writes. CAP-53 W1 targets Plane B writes.

---

## 5. Recommended Raisd config seeds (summary)

| Campus | ISO | App fee | C5 overrides to seed | Next owner |
|---|---|---|---|---|
| Lesotho | LSL | 30000 minor | LAN/MPW 600 / 375 | Faid Accept |
| Eswatini | ZAR? | null | + Associate 2600 / Degree 3600 from 2022-01 | Faid + Finance |
| Cambodia | Live TBD (not MYR) | null | PUFP 150 · P1 250 · P2 220 · P3 150 | Faid + campus |
| Cyberjaya | MYR | 50000 / 100000 research | — | Research only |
| Botswana | BWP | null | pending SP | Vara |
| Sierra Leone | SLE | null | pending `b_calcmodule` | Vara |

Fold Accepts into [`campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml).

---

## 6. Sources

| Pack | Path (outside git) |
|---|---|
| Lesotho procedures | `_local/lesotho-cms-2026-10-05/sql/CMS_Lesotho_DB_Procedures_05102026_0915.sql` |
| Eswatini procedures | `_local/eswatini-cms-2026-10-05/sql/CMS_Eswatini_Database_Procedures_05102026_1117.sql` |
| Cambodia procedures | `_local/cambodia-cms-2026-10-07/sql/CMS_Cambodia_Procedures_07102026.sql` |
| UI M300 | Lesotho gap / screenshot inventory |

---

## 7. Closure

| Ask | Owner |
|---|---|
| Accept Lesotho app fee M300 + LAN/MPW overrides | Faid |
| Confirm Eswatini ISO ZAR vs SZL; Accept 2600/3600 | Faid / Finance |
| Confirm Cambodia Live currency vs CMS MYR | Faid / Cambodia ops |
| Supply `b_calcmodule` body + Botswana fee literals | Vara |
