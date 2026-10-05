# LUCT online registration — captured procedures

**Status:** Captured campus baseline (source pack, not Raisd Live).  
**Captured:** 6 October 2026.  
**Campus of the pack:** Limkokwing University of Creative Technology (**LUCT**) — **Cyberjaya / Malaysia** admissions and student forms.  
**Raisd use:** Field / evidence / SLA checklist for Applicant [CAP-02](../../sdd/11-capability-catalog.md#cap-02) · [CAP-03](../../sdd/11-capability-catalog.md#cap-03) · [CAP-07](../../sdd/11-capability-catalog.md#cap-07) · [CAP-55](../../sdd/11-capability-catalog.md#cap-55) and enrolled-student registration maintenance ([CAP-10](../../sdd/11-capability-catalog.md#cap-10)).  
**Pilot note:** Lesotho is the Raisd acceptance campus ([lesotho-pilot.md](../architecture/lesotho-pilot.md)). This pack is a **LUCT-family procedure baseline**. Malaysian government overlays (EMGS, Student Visa, NOC) are **not** Lesotho government overlays (NMDS, LGCSE). Do not copy Malaysia immigration into Lesotho Live.

## Provenance

| Source | Location (outside git binaries) | SHA-256 |
|---|---|---|
| Online wizard screenshots | `LKW_Online_Registration.pdf` (4 image pages) | `126b08188a25f4130facfb28bc39aa400f4db7caad26d9bdf9ce7e8f58a53da6` |
| Student Portal Forms pack | `Student Portal Forms.zip` (22 files) | `9bcafffc91a3a4d85c52d4d92cd8d91a119b5c3786c47c22ce774686fb353e2f` |

**In-repo capture:** resized page previews + text extracts under [`materials/luct-online-registration/`](../materials/luct-online-registration/) (no original zip/PDF binaries). Form inventory: [`materials/luct-online-registration/forms-extracts/_inventory.tsv`](../materials/luct-online-registration/forms-extracts/_inventory.tsv).

## Two processes captured

| # | Process | Audience | Raisd surface | Primary sources |
|---|---|---|---|---|
| **A** | **Applicant online registration** (public wizard + formal admission form + visa/health pack) | Prospective student / agent | Applicant portal ([SDD-04](../../sdd/04-applicant-portal.md)) | LKW PDF pages 1–4 · `LUCT-MKT-003` · Visa EMGS forms |
| **B** | **Enrolled-student registration maintenance** (add/drop, change of programme, related Registry forms) | Enrolled student | Student portal Academic / Online Forms ([CAP-10](../../sdd/11-capability-catalog.md#cap-10), [CAP-51](../../sdd/11-capability-catalog.md#cap-51)) | `REG014` · `REG015` · `REG006` · remaining Registry/SSD forms in the zip |

---

## Process A — Applicant online registration

### A1. Public wizard (LKW screenshots)

Four-step progress: **Academic → Documents → Personal → Submit**. Brand: Limkokwing University (black header). Enquiries control present on Academic step.

#### Step 1 — Academic Qualification

| Block | Fields / rules |
|---|---|
| Upload rules (**Important**) | Clear scans; colour if original is colour; `.doc` / `.pdf` / `.jpg` / `.png`; **≤ 10 MB**; typed data must match transcript |
| Checklist — required | Passport photo; MyKad (Malaysian) **or** full passport (non-Malaysian); Academic transcript; Academic certificate |
| Checklist — optional | Resume/CV; Portfolio; 2 recommendation letters; English language certificate |
| General information | Application Type*; Preferred Study Method*; Name (as per ID/passport)*; Nationality*; Contact Number* (country + area code); Email* |
| Course preferences | 1st / 2nd / 3rd Preference Course*; Intake* (three preferences when first choice entry is unmet) |
| Education background | Education Level*; Academic Transcript (colour)*; Academic Certificate (colour)*; Country of Education*; **Add another Academic Qualification** |
| Actions | **Proceed to Supporting Documents** · Reset |

\* = required on the captured UI.

#### Step 2 — Supporting Documents

| Group | Uploads |
|---|---|
| Required | Passport Size Photo (white background)*; IC / Passport (every page)*; Proof Of Payment (shown without required asterisk on capture) |
| Optional | Resume/CV (DOC/PDF); Portfolio (DOC/PDF/JPG/PNG); Recommendation Letter (DOC/PDF) |
| Survey | How did you find out about Limkokwing University?* |
| Limits | JPG/PNG/PDF (or DOC where noted); **≤ 10 MB** each |
| Actions | **Proceed to Personal Information** · Reset |

#### Step 3 — Personal Information

| Block | Fields |
|---|---|
| Personal | Gender*; Date of Birth* (D/M/Y); Place of Birth*; Nationality*; Race*; Marital Status* |
| Current address | Line 1*, Line 2, Postcode*, City*, Country*, State* |
| Permanent address | Same shape; checkbox *permanent same as current* |
| ID | IC / Passport Number* (numbers and alphabets only) |
| Father / Guardian | Name*; Contact Number*; Email* |
| Mother / Guardian | Name*; Contact Number*; Email* |
| Emergency contact | Name*; Contact Number*; Email (optional on capture) |
| Legal | University may change terms; form is not binding until unconditional offer; finalise = agree Limkokwing Terms and Regulations |
| Actions | **Finalise Application** · Reset |

#### Step 4 — Application Details (post-entry / track surface)

Captured sample (synthetic historical UI; do not treat IDs as Live data):

| Field | Sample on capture |
|---|---|
| Application ID | AP- 28881 |
| Application Date | 02/16/2022 |
| Selected / 2nd / 3rd courses | Listed programme titles |
| Intake Date | 03/28/2022 |
| Registration Fees | **RM 500.00** one-time, non-refundable; status **Unpaid** (“continue payments once eligible”) |

##### Malaysia government / visa note (on-page)

- Students must apply for a **Student Visa** to study in Malaysia.
- After Offer Letter, Student Service Department requires:
  - **Certified Full Health Examination Report** from a recognised medical body.
  - **No Objection Certificate (NOC)** from the education authority in the student’s native country — stated for international students from **Sub-Saharan African** countries per Malaysian government requirements.

##### Registration procedure / SLA (on-page **Important**)

1. After form + payment complete → Registrar’s office; processing **2–3 working days**.
2. Confirmation email within **24 hours** of submission.
3. Eligible students notified by mail or phone within that processing window.
4. Eligible students have **14 days** from confirmation to complete process, payments, and documents — else application discarded.
5. Official **Offer Letter** (with payment details) only after application process and initial payment requirements are met.

Page previews: [`materials/luct-online-registration/lkw-pages/`](../materials/luct-online-registration/lkw-pages/).

### A2. Formal Admission Form — `LUCT-MKT-003` (Rev 01, EFF 01/04/2023)

Paper / PDF equivalent of Process A. Sections:

1. Programme information (Programme 1–3, Semester, Intake; Student No. office-only; photo)
2. English language proficiency (first language; medium-of-instruction evidence; tests in last 2 years — CAE, CPE, IELTS, MUET, PTE(A), REW, TOEFL)
3. Personal information (IC/passport name, race, age, DOB, nationality, religion; current / permanent / Malaysian study addresses; phones; emails)
4. Parent information
5. Academic / professional qualifications (from age 16)
6. Disabilities
7. Terms and conditions (fees, withdrawal, deferment, change of programme, add/drop, appeal rules, discipline, PDPA 2010)
8. Declaration (truthfulness; EMGS/Immigration rejection → university not liable / fees not refunded; Chinese students need English verification report for eVAL path)
9. Agent block
10. Friend-get-friend T&Cs
11. Admission procedure checklist (office)
12. How did you know about us?

**Registration fees on form:** Malaysian **RM 500**; International **RM 1000** + Visa Application Fee (fee structure).

**Evidence checklist (form §11):** completed form; certified academic results + English results; recommendation letters (if applicable); portfolio (if applicable); IC/passport copies; passport photo rules (international: white bg 3.5×4.5 cm); affidavit; Sudanese **NOC**; scratch card for result verification; Eligibility Letter/LOE; **EMGS Pre-medical Check-up Form with lab report**; CV for postgraduate; registration fee; transfer students need prior Malaysian transcript + Release Letter + Attendance.

Extract: [`forms-extracts/(MKT003)_Application_for_Admission_Form_Rev01.txt`](../materials/luct-online-registration/forms-extracts/(MKT003)_Application_for_Admission_Form_Rev01.txt).

### A3. Short-course / micro-credential path — `LUCT-REG-024` (Rev 00, EFF 15/02/2024)

Parallel lighter applicant path: Course 1–3 / Others; personal; parent/guardian; qualifications from age 16; disabilities; short-course T&Cs (admission not guaranteed; fees; cancellation/refunds). Treat as campus-configured programme type under CAP-02, not a second product.

### A4. Malaysia government health / visa pack (forms zip)

| Form | Role |
|---|---|
| EMGS **Health Examination Report** | Government of Malaysia / EMGS entry health exam for higher-education institutions; student exam within **7 working days** of arrival at EMGS panel clinic / public university health centre; failure blocks student-pass endorsement |
| **Lampiran B — Health Declaration Form for Applicant** | Pre-arrival declaration; commit to post-arrival exam; bear exit costs if unsuitable |

Extracts under [`forms-extracts/`](../materials/luct-online-registration/forms-extracts/). These are **Malaysian** statutory overlays for Cyberjaya international students ([CAP-50](../../sdd/11-capability-catalog.md#cap-50) family), not Lesotho NMDS/LGCSE.

---

## Process B — Enrolled-student registration maintenance

Not the public applicant wizard. Registry forms used after enrolment:

| Form ID | Title | Procedure signal |
|---|---|---|
| **REG014** | Add Course | Student: campus, faculty, ID, intake, programme, year/sem; course code/name/term/credits (up to 8). Approvals: Bursary (proof of payment) → Faculty (system update) → Registry (student file). Add fee after week 4. Payee: Limkokwing University of Creative Technology Sdn. Bhd. |
| **REG015** | Drop Course | Same structure as Add; Drop fee after week 4 |
| **REG006** | Change of Programme | Student-certified application; aligns with MKT-003 T&Cs (no change after week 4; may trigger new visa) |
| REG005 / REG007 / REG008 / REG017 | Certification letter; transcript/certificate; appeal/reassessment; credit transfer | Registry maintenance / CAP-51 samples |
| FMG023 / LIB002 / SSD* | Study leave; library; accommodation; airport; sport | Campus services / Offline Forms catalogue seeds — not admissions |

Add/Drop rules (forms): crossed cheques only; fees non-transferable; excess carried forward; no post-dated cheques; academic implications acknowledged by student.

Raisd mapping today: Student Demo module registration is [academic-module-registration.md](../frontend/student-portal/academic-module-registration.md) ([CAP-10](../../sdd/11-capability-catalog.md#cap-10)); Live must still honour campus week-4 / fee / Faculty–Bursary–Registry desks rather than inventing a greenfield registrar.

---

## CAP field matrix (from this pack)

| CAP | Must support (Cyberjaya pack) | Lesotho pilot substitution |
|---|---|---|
| CAP-02 | Multi-step apply; 3 programme preferences; intake; application type; study method; repeatable qualifications; marketing source | Same journey shape; programme catalogue + LGCSE-oriented education levels |
| CAP-03 | Photo; ID every page; transcripts/certificates (colour); optional CV/portfolio/recommendations/English cert; proof of payment; durable ≤10 MB types | LGCSE extract + Sesotho subjects + campus document policy ([lesotho-db-gap.md](lesotho-db-gap.md)); **no** EMGS as Lesotho gate |
| CAP-07 | Application ID; fee status; offer/letter after payment; 14-day completion window; Registrar 2–3 day process | Newer CMS 3-step Academic→QA→Registrar + rank/score; confirm Lesotho SLAs with campus |
| CAP-55 | Terms finalise; PDPA notice; declarations on paper form | Campus policy pack; local privacy statute — not PDPA copy-paste |
| CAP-10 | Add/Drop with Bursary→Faculty→Registry; week-4 fee | Confirm Lesotho week rules + desks on newer CMS screenshots |
| CAP-50 | Student Visa + health exam + Sub-Saharan NOC (Malaysia) | **Not applicable as Malaysia EMGS** for Lesotho local students; international Lesotho policy Needs checking |

---

## Agent rules

1. Treat this document as **captured LUCT Cyberjaya procedure**, not as implemented Raisd behaviour and not as Lesotho government law.
2. Applicant portal field lists should start from Process A; do not invent extra government steps beyond campus-approved overlays.
3. For Lesotho M4, replace Malaysia immigration/health/NOC with **NMDS + LGCSE** evidence paths already inventoried in [old-cms-lesotho.md](old-cms-lesotho.md) / [lesotho-db-gap.md](lesotho-db-gap.md).
4. Do not commit live student PII, staging credentials, or unsanitised screenshots into git. This capture uses UI chrome + form templates only.
5. Fee amounts (RM 500 / RM 1000) are Cyberjaya form facts; Lesotho uses campus currency/policy (LSL / NMDS assist) — confirm before Live.

## Related

| Topic | Path |
|---|---|
| GitHub Pages | [`diagrams/old-cms/online-registration.html`](../../diagrams/old-cms/online-registration.html) · https://raisd-campus.github.io/portal-api-docs/diagrams/old-cms/online-registration.html |
| Applicant portal agents | [../frontend/applicant-portal.md](../frontend/applicant-portal.md) |
| SDD Applicant | [../../sdd/04-applicant-portal.md](../../sdd/04-applicant-portal.md) |
| CAP catalog | [../../sdd/11-capability-catalog.md](../../sdd/11-capability-catalog.md) |
| Lesotho pilot | [../architecture/lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Cyberjaya CMS CAP comparison | [cms-feature-comparison.md](cms-feature-comparison.md) |
| Student module registration Demo | [../frontend/student-portal/academic-module-registration.md](../frontend/student-portal/academic-module-registration.md) |
