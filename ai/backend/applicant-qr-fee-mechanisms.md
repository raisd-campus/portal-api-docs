# Applicant merge analysis · QR generation · Fee/payment from CMS SPs

**Standup action (Read.ai 8 Oct 2026):** *Iman Suherman will analyze the latest merged applicant-portal changes and document the QR-code generation and fee-payment mechanisms.*  
**As of:** 9 October 2026.  
**Evidence:** Applicant `9e007f2` → prod SPA `532d6f0`; Cambodia QR packs (8 Oct); procedure dumps under `raisd/_local/` (Lesotho / Eswatini / Cambodia — **outside git**).  
**Pages:** [`fee-payment-sps.html`](../../diagrams/old-cms-lesotho/fee-payment-sps.html) · QR: [`certificate-qr.html`](../../diagrams/old-cms-cambodia/certificate-qr.html).  
**Related:** [lesotho-cms-vs-applicant-portal.md](lesotho-cms-vs-applicant-portal.md) · [cambodia-qr-system.md](cambodia-qr-system.md) · [lesotho-db-gap.md](lesotho-db-gap.md) · [applicant-portal.md](../frontend/applicant-portal.md).

Demo ≠ Live. Applicant Demo fees and letters are not campus CMS billing. SP bodies below are existing CMS SoR behaviour to **configure against**, not to reimplement in portals.

---

## 1. Merged Applicant portal changes (Faid `9e007f2` + prod `532d6f0`)

| Area | What shipped | Hosted Demo status |
|---|---|---|
| Campus selector | Required `campusId` (8 sample campuses incl. Lesotho) on Study Preferences | Persisted on Demo HTTP + shown on SPA |
| Alumni | Trimmed `previousStudentId` required when `applicantType=alumni` | Same validation on hosted |
| Review desks | Payment Proof → **Bursary**; Document Check → **QA** | Local Admin Actions; not Staff portal |
| Eligibility Letter | QA `verify-documents` generates DEMO PDF | Demo Portal API path present |
| Applicant confirm | `confirmApplicationEligibility` | Hosted method live; Demo then **auto** `release-offer` |
| Offer Letter | Registry `release-offer` (local Admin Actions) | Auto after Eligibility on Demo HTTP until Staff owns release |
| Accept enrolment | Guarded `acceptApplicationEnrolment` after Offer | Hosted; Student handoff v2 carries campus + both letters |
| Progress UI | Four-row Application Progress (Bursary → QA → Confirm → Offer) | Presentation only |
| Catalogue | All campuses still clone **Design** curriculum/fees | Not Lesotho policy |

**Commits:** `9e007f2` feat campus + two-stage letters · `532d6f0` clarify hosted letter acceptance / Registry offer status · Iman prod redeploy 8 Oct evening (GH Actions billing blocked auto-deploy).

**Gaps still open after merge**

1. Staff-owned Offer release (replace Demo auto-release).  
2. Durable issued-letter bytes / signed URLs on hosted Student Documents.  
3. Lesotho LGCSE extract + LSL/M application-fee copy (Applicant still Demo/MYR-flavoured bank wording).  
4. Real Lesotho programmes / intakes / fee amounts (stop Design clones).  
5. Live CMS write path (CAP-53) — none of the letter/payment Demo RPCs touch `campus2_*`.

---

## 2. QR-code generation (automated + manual)

### 2.1 Automated (in code) — Cambodia Registry → QR SaaS → Verification

Already inventoried 8 Oct. Short path:

```text
Registry qrcode_gen.php
  → POST qr.limkokwing.net/api/create_qrcode_api
       (short_code=KHM-PNH_{StdProgramID}, url=verification…/cambodia/{AES token})
  → PNG encodes https://qr.limkokwing.net/qrcode/{slug}
Scan: GET /qrcode/{slug} → 302 → Verification → CALL GetStudentCertInfo(StdProgramID)
```

SP on CMS: `campus2_cambodia.GetStudentCertInfo` — reads `r_studentcert_cambodia` + `s_upload` type **11** cert blob.  
Detail: [cambodia-qr-system.md](cambodia-qr-system.md) · Pages [`certificate-qr.html`](../../diagrams/old-cms-cambodia/certificate-qr.html).

### 2.2 Manual ops (Dexter, standup 8 Oct) — not in CMS code

Cambodia ↔ Cyberjaya certificate handling still includes a **manual** exchange that the Registry QR scripts do **not** model:

```text
Cambodia campus
  → produce / print certificates + QR PNGs (or student data pack)
  → send to Cyberjaya (ops / courier / staff handoff)
Cyberjaya
  → may re-print / stamp / return physical certificates
  → QR scan path still hits Verification → Cambodia CMS SP when token is Cambodia’s
```

**Raisd implication:** document as an **ops swimlane** on the QR Pages (sequence “Manual certificate ops”). Do not invent a Portal API method for courier handoff. M5 Cambodia integration owns the automated create/scan path; manual return of printed certs stays outside CAP-02/03 Applicant.

---

## 3. Fee and payment mechanisms — from stored procedures

Sources (structure + procedures only; dumps not in git):

| Campus | Procedure dump | Fee/payment SPs present |
|---|---|---|
| Lesotho | `CMS_Lesotho_DB_Procedures_05102026_0915.sql` | `b_Update_Student`, `b_Update_billing`, `sp_onlinenrollment_*`, `sp_payment_verification_insert`, `FetchOfferLetters`, `StudentConfirmModule` |
| Eswatini | `CMS_Eswatini_Database_Procedures_05102026_1117.sql` | Same online-enrol + payment insert; `b_Update_billing`; **no** Lesotho-style NMDS bill prefixes |
| Cambodia | `CMS_Cambodia_Procedures_07102026.sql` | Online-enrol + payment insert; `b_Update_Student` (campus hardcodes); **no** `b_Update_billing` in dump; `GetStudentCertInfo` |
| Sierra Leone (catalog only) | `_proc-catalog.txt` | `b_calcmodule`, `b_calcsch` — **no procedure body** in current `_local` packs |

### 3.1 Three payment / fee planes (do not conflate)

| Plane | When | CMS artefacts | Raisd surface today |
|---|---|---|---|
| **A. Application fee** | Before / during admissions | Tables `b_zapplicationfee*` · proof often `b_paymentverification` (+ `ApplicationID` in Live UI) | Applicant Fee step + Bursary verify (**Demo**) |
| **B. Online enrolment payment proof** | After offer, term registration | `online_enrollment` + `sp_onlinenrollment_insert` + `sp_payment_verification_insert` | Student CAP-46 Demo; not wired to CMS |
| **C. Semester / module fee calculation** | Enrolled billing | `b_Update_Student` (core) · `b_Update_billing` (assist/NMDS) · invoices | Student Finance Demo; Live = CAP-53 + campus finance profile |

### 3.2 Online enrolment + payment proof SPs (shared shape)

`sp_onlinenrollment_insert(StudentID, StdProgramID, TermCode, TransactionID, TransactionAmt, TrnsFile)`  
→ inserts `online_enrollment` (Bursary/Faculty status columns filled later by staff).

`sp_onlinenrollment_info(StudentID, StdProgramID, TermID)`  
→ returns current online enrolment row including `BurStatus` / `FacultyStatus` / amounts.

`sp_payment_verification_insert(StudentID, PaymentAmount, ProofofPayment, RecTypeCode, OnlineEnrollmentID)`  
→ inserts `b_paymentverification` with **hard-coded campus currency and institution**:

| Campus | `InstitutionID` | `PaymentCurrency` | `RequestSource` |
|---|---|---|---|
| Lesotho | `'1'` | **`M`** (Loti) | `OnlineEnrollment` |
| Eswatini | `'1'` | **`R`** | `OnlineEnrollment` |
| Cambodia | `'30'` | **`MYR`** | `OnlineEnrollment` |

Configurable Raisd rule (standup 8 Oct): per campus — fee applies Y/N, amount, **currency** — matches this SP pattern. Application-fee Live must not assume MYR.

**Note:** This SP always stamps `RequestSource='OnlineEnrollment'`. Admissions application-fee verification in Live UI may write the same table via PHP with a different source/`ApplicationID`; no separate application-fee insert SP appears in the Lesotho procedure dump.

### 3.3 Semester / module fee calculation — `b_Update_Student` (Lesotho)

Logic lives in the procedure (not Applicant). Distilled **cases** for Faid / configurable finance:

| Case ID | Rule (from SP) | Key fields |
|---|---|---|
| C1 | Zero module fee when AD status or module status is non-chargeable | `r_zadstatus.adstatuschargable`, `r_zstdmodstatus.stdmodstatchargable` |
| C2 | Zero fee for historical `Exempted` before `2011-07` | `stdmodstatcode`, `termcode` |
| C3 | **Semester fee** from `f_semester.semesterfee` into `stdsemcrsfees` / `semmodaddfees` (term/institution gates) | `UseModularFee='N'` path |
| C4 | **Modular fee** = sum of chargeable `stdmodfee` → `stdsemcrsfeez`; may overwrite `stdsemcrsfees` when `UseModularFee='Y'` | `UseModularFee` |
| C5 | **Repeat / ADD** module fees accumulate into `semmodaddfees` (term windows; Lesotho also has hard-coded amounts e.g. **600**, **375** on some repeat paths) | `stdmodstatcode` like `repeat%` / `ADD` |
| C6 | **Resource fees** `stdsemresfees` with many exemptions (semester codes F3/L3, institution, Repeat, zero course fee, …) | `stdsemresfees` |
| C7 | **Deferred** zeroes / `StdSemDefFees` rules | `SemesterStatus='Deferred'` |
| C8 | Totals: `stdsemtotfees ≈ semmodaddfees + stdsemresfees + stdsemrepfees`; standard fees combine course + resource + repeat | `stdsemtotfees`, `StdSemStdrdFees` |
| C9 | Invoice lines inserted into `b_invoicedetail` from semester view amounts | `b_invoicedetail` |
| C10 | Student `paystatus` Partial/Full from `accoutstanding` vs `stdsemtotfees` | `r_student.paystatus` |

Cambodia’s `b_Update_Student` shares the same skeleton but adds **campus hardcodes** (e.g. repeat fees **150** / **250** on PUFP / P1 refs) — evidence that Live must be **config + campus procedure**, not one global formula.

### 3.4 Assist / NMDS billing — `b_Update_billing` (Lesotho)

Separate from student self-pay. For `AssistProviderCode='nmds'`, stamps assist bill numbers such as:

`LSO/{YYMM}/FAID|FDSI|FBS|FCM/…` by `schoolid`, copies `stdsemtotfees` → `assistbillamount`, skips `modrepeater='Y'`.

Eswatini has `b_Update_billing` (campus-specific assist providers). Cambodia dump has **no** `b_Update_billing`. Do not treat NMDS assist billing as Applicant application fee.

### 3.5 Offer letters from CMS SP

`FetchOfferLetters(OnlineUserID)` — selects latest `r_stdofferletter` joined to active programme within 6 months of intake. Raisd Demo Eligibility/Offer PDFs are **not** this SP; Live offer artefacts remain CMS files until Staff/Portal API bridges them.

### 3.6 Module confirmation (Student, not Applicant)

`StudentConfirmModule(stdid)` — lists pre-enrolled / elective modules for current term (`EnrollmentEndDate > curdate()`), credit fields, timetable flag. Aligns with standup “local students → module registration (≤20 credit hours)” as a **Student** concern after accept.

---

## 4. Raisd mapping — what to build next

| Priority | Work | Owner hint | SP / evidence anchor |
|---|---|---|---|
| 1 | Campus finance profile: currency + application-fee amount + “fee applies” | **Done (seed)** — [`campus-finance-profiles.yaml`](../contracts/campus-finance-profiles.yaml); Faid Accept pending | §3.2; `b_zapplicationfee*` |
| 2 | Document fee **cases C1–C10** as config (semester vs modular, repeat, resource, deferred) | **Done (seed)** — same YAML + [campus-finance-profile.md](campus-finance-profile.md) | `b_Update_Student` |
| 3 | Student online-enrol payment proof → CAP-53 write to `sp_onlinenrollment_*` + payment verification | **Path documented** — [lesotho-cap53-online-enrolment-write.md](lesotho-cap53-online-enrolment-write.md); W1 implement next | §3.2 |
| 4 | Keep Applicant Demo fee step Demo until LSL copy + durable proof | Applicant | Plane A |
| 5 | Staff Offer release replaces Demo auto-release | Staff + Portal API | `FetchOfferLetters` / `r_stdofferletter` |
| 6 | Vara: compile SL `b_calcmodule` / cross-campus SP case matrix | Vara → Iman review | Standup 8 Oct |
| 7 | Applicant open items: Staff Offer, LGCSE/LSL, real catalogue | Applicant / Registry | [lesotho-cms-vs-applicant-portal.md](lesotho-cms-vs-applicant-portal.md) § backlog |

---

## 5. Standup closure (this action)

| Item | Status 9 Oct |
|---|---|
| Analyze merged Applicant changes | **Done** — §1 |
| Document QR-code generation | **Done** — §2 (+ Pages QR; manual ops swimlane) |
| Document fee-payment mechanisms from SPs | **Done** — §3–4 + Pages |
| Provide morning updates | Separate WG email / standup |

Follow-ups closed 9 Oct (config + CAP-53 W1 path): finance YAML + online-enrolment write doc. Still open: Faid Accept ticks; student-payment behaviour deep-dive; Vara SP case compile; Applicant Staff Offer / LGCSE / catalogue.
