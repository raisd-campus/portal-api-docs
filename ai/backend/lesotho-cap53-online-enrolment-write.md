# CAP-53 — online-enrolment payment proof → CMS stored procedures

**Status:** W1 write path (not yet in Portal API)  
**Pilot:** Lesotho · **Standup:** 8 Oct 2026  
**Related:** [applicant-qr-fee-mechanisms.md](./applicant-qr-fee-mechanisms.md) · [campus-finance-profiles.yaml](../contracts/campus-finance-profiles.yaml) · [lesotho-cap53-cms-adapter.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/lesotho-cap53-cms-adapter.md)

## Scope

Trace **student online-enrolment payment proof** from Raisd / CAP-53 to the CMS procedures that accept and verify it. This is **not** the Applicant application-fee path (that stays on Applicant / Bursary). Online enrolment is a **Student / CAP-53** write after offer accept and student identity exist.

| Plane | Fee / proof | Owner surface | CMS |
|---|---|---|---|
| A | Application fee proof | Applicant portal | Bursary verify (Applicant flow) |
| B | Online-enrolment payment proof | Student / CAP-53 W1 | `sp_onlinenrollment_*` + `sp_payment_verification_insert` |
| C | Semester / modular billing | Finance / CMS jobs | `b_Update_Student` C1–C10 |
| D | NMDS assistance bills | Finance | `b_Update_billing` — out of Applicant fee profile |

## Current CAP-53 state

- **R1 (reads):** Portal API CAP-53 adapter exposes CMS-backed reads (student, schedule, grades, etc.).
- **W1 (writes):** Online-enrolment insert / payment-proof upload / bursary verification **deferred** — documented here as the target SP path so implementation does not invent a second model.

## Target write sequence (CMS)

```
Student submits online-enrolment + payment proof
        │
        ▼
┌───────────────────────────────────────┐
│  sp_onlinenrollment_insert            │
│  — creates / updates online-enrol row │
│  — BurStatus / FacultyStatus pending  │
│  — RequestSource ≈ OnlineEnrollment   │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│  sp_payment_verification_insert       │
│  — stores proof metadata + amount     │
│  — stamps cmsPaymentCurrency:         │
│      InstitutionID 1 + LS → M         │
│      InstitutionID 1 + SZ → R         │
│      InstitutionID 30 (KH) → MYR      │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│  Bursary / Faculty verify (CMS UI)    │
│  — BurStatus / FacultyStatus → OK     │
│  — sp_onlinenrollment_info for reads  │
└───────────────────────────────────────┘
```

## Procedure map

| Step | Procedure | Direction | Raisd / CAP-53 | Notes |
|---|---|---|---|---|
| 1 | `sp_onlinenrollment_insert` | write | W1 `POST` enrol + proof | Create online-enrolment request |
| 2 | `sp_payment_verification_insert` | write | W1 payment proof | Currency hard-coded in SP (M / R / MYR) |
| 3 | `sp_onlinenrollment_info` | read | R1 or W1 poll | Status for student UI |
| 4 | Bursary / Faculty status fields | CMS UI / later API | out of R1 | `BurStatus`, `FacultyStatus` |

## Currency

Do **not** invent ISO from the SP stamp alone:

| Campus | CMS stamp | Proposed Raisd ISO | Action |
|---|---|---|---|
| Lesotho | `M` | `LSL` | Confirm with Faid |
| Eswatini | `R` | `ZAR` or `SZL` | Confirm |
| Cambodia | `MYR` | Live TBD | Confirm — MYR is CMS InstitutionID 30 quirk |

Profile seed: [`campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml) → `onlineEnrolmentPayment` + `cmsPaymentCurrency`.

## What is explicitly out of this path

- Applicant **application fee** (plane A) — separate portal / Bursary verify.
- **NMDS** `LSO/{YYMM}/…` bills from `b_Update_billing` (plane D).
- Semester invoice generation C9 / PayStatus C10 — later Finance / Student Finance.
- QR certificate printing / Cambodia↔Cyberjaya courier — ops, not enrolment payment.

## Implementation checklist (W1)

1. Map Portal API request DTO → `sp_onlinenrollment_insert` parameters (student id, term, programme, proof refs).
2. Call `sp_payment_verification_insert` with campus `cmsPaymentCurrency` from finance profile (or CMS institution rules) — do not hard-code ISO in the adapter without Faid Accept.
3. Expose read model via `sp_onlinenrollment_info` (BurStatus / FacultyStatus) on Student portal.
4. Keep Demo vs Live separation; no Live credentials in control-plane.
5. Acceptance: student can submit proof; bursary can see pending; verified status returns to student — without inventing a second payment ledger in Neon until D3 hybrid is decided.

## Evidence pointers

- Fee / payment SP narrative: [applicant-qr-fee-mechanisms.md](./applicant-qr-fee-mechanisms.md)
- Pages: [fee-payment-sps.html](https://raisd-campus.github.io/portal-api-docs/diagrams/old-cms-lesotho/fee-payment-sps.html)
- CAP-53 adapter reads: [lesotho-cap53-cms-adapter.md](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/lesotho-cap53-cms-adapter.md)
- Development plan Phase 5 / writes: [portal-api-development-plan.md](./portal-api-development-plan.md)
