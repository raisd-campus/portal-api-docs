# LUCT online registration — frontend gap analysis

**Status:** Gap analysis (frontend portals vs captured LUCT Cyberjaya procedures).  
**Date:** 6 October 2026.  
**Requirements source:** [luct-online-registration.md](luct-online-registration.md) (Process A applicant wizard + Process B Add/Drop).  
**FE sources:** Applicant preview (session-only), Student Demo, Lecturer/Staff Not started; SDD-11 catalog statuses.  
**Pages:** [`diagrams/old-cms/online-registration-gap.html`](../../diagrams/old-cms/online-registration-gap.html).

## Classification legend

| Class | Meaning |
|---|---|
| **Required** | Must close for M2/M3/M4 acceptance against the captured procedure (or Lesotho substitute). |
| **Gap** | Requirement present; no FE surface (or Not started). |
| **Mismatch** | FE exists but shape/fields/rules differ from captured requirement. |
| **Partial** | Demo/preview covers part of the journey; Live/durable/staff side missing. |
| **Out of requirements** | In CY pack but **not** Lesotho M4 default, or Raisd FE beyond the captured pack. |
| **Met (Demo)** | Demo/preview aligns enough for prototype; still not Live. |

**Status language:** Demo ≠ Live. Catalog SDD-11 still marks most Applicant CAPs **Not started**; Applicant UI is a **frontend-only preview** (treat as Demo-like for this matrix).

## Roll-up

| Portal | Required open | Gaps | Mismatches | Partial | Out of req. | Met (Demo) |
|---|---:|---:|---:|---:|---:|---:|
| Applicant | 12 | 6 | 4 | 5 | 2 | 3 |
| Student | 6 | 3 | 2 | 4 | 3 | 4 |
| Staff | 8 | 8 | 0 | 0 | 1 | 0 |
| Lecturer | 0 | 0 | 0 | 0 | 1 | 0 |

Counts are row-level (one feature may be Required + Gap). See the Pages table for the full list.

## Critical path (frontend)

1. **Applicant CAP-02/03** — finish field parity with Process A; durable upload; Portal API save.  
2. **Applicant CAP-07** — offer view + accept enrolment (not only review preview).  
3. **Staff CAP-03/05/06/07** — Registry review → offer → first enrolment (or verified old CMS for M2).  
4. **Student CAP-10** — Live term registration write; Process B Add/Drop after first confirm.  
5. **Lesotho overlays** — LGCSE/Sesotho + NMDS; **exclude** Malaysia EMGS/NOC from M4 default path.

## Detail matrix

See published HTML for filterable rows. Markdown summary by portal:

### Applicant

| ID | Requirement (CY pack) | FE today | Class |
|---|---|---|---|
| A-01 | CAP-01 sign-in / account | None | Required · Gap |
| A-02 | CAP-02 multi-step apply (Academic→Documents→Personal→Submit) | 5-step editor (Study / Personal / Academic / Documents / Fee) — session-only | Required · Mismatch |
| A-03 | 3 programme preferences + intake + application type + study method | 3 prefs + intake + applicant/student type; study method label differs | Required · Partial |
| A-04 | Repeatable education + colour transcript/certificate uploads ≤10 MB | Repeat quals + file tiles; session File objects; limit wording may differ (25 MiB messages path) | Required · Partial |
| A-05 | CAP-03 required evidence set (photo, IC/passport every page, optional English/CV/portfolio) | Documents step exists; evidence matrix / white-bg photo rules not verified vs pack | Required · Partial |
| A-06 | Proof of payment on apply | Fee step + payment proof under review preview | Met (Demo) · Partial (no Live verify) |
| A-07 | Marketing source (“how did you find us”) | Needs checking in FE | Required · Gap |
| A-08 | CAP-55 terms finalise + declarations (version + timestamp) | Consent UI fragment; no durable versioned acceptance | Required · Partial |
| A-09 | CAP-07 track application ID, fee status, SLAs | Submitted detail + review stages; no CMS status / 14-day discard / 24h email | Required · Mismatch |
| A-10 | Offer letter + accept enrolment | Not in FE | Required · Gap |
| A-11 | CAP-16 applicant announcements | None | Required · Gap |
| A-12 | CAP-35 accessible forms / assistance / Enquiries | No assistance path; Enquiries control from pack missing | Required · Gap |
| A-13 | CAP-36 mobile shell | Shared shell + manual phone checks; not certified | Partial |
| A-14 | Agent block (MKT-003 §9) | Not in FE | Gap (campus/agent channel — confirm if Raisd scope) |
| A-15 | Friend-get-friend (MKT-003 §10) | Not in FE | Out of requirements (marketing promo; not CAP launch) |
| A-16 | Lesotho LGCSE education levels / Sesotho extract | CY-shaped preview only | Required · Gap (LS M4) |
| A-17 | Malaysia EMGS / NOC / health pack on applicant path | Not in applicant FE (Student CAP-50 Demo separate) | Out of requirements for Lesotho M4 |

### Student

| ID | Requirement | FE today | Class |
|---|---|---|---|
| S-01 | CAP-10 first semester / module registration | Demo confirm + fee preview + eVAL gate | Met (Demo) · Partial (Live write) |
| S-02 | Process B REG014/015 Add/Drop after week rules | Not as Add/Drop forms; confirm-first model | Required · Gap |
| S-03 | REG006 change of programme | Not in Online Forms catalogue as Live template | Required · Gap |
| S-04 | Bursary→Faculty→Registry approval chain | Student-only Demo confirm | Required · Mismatch |
| S-05 | CAP-51 Online Forms hub | Demo 8 templates + messages | Met (Demo) · Partial (staff Live) |
| S-06 | Registry forms from pack (transcript, appeal, credit transfer, …) | Appeal / graduation samples; not full REG pack | Partial |
| S-07 | CAP-50 immigration / Student Pass (Malaysia) | Demo EMGS/eVAL | Out of requirements for Lesotho M4 · Met (Demo) for CY |
| S-08 | CAP-09 document library for registration evidence | Partial title-only | Partial |
| S-09 | Accommodation / airport / sport SSD forms | Accommodation retired from nav; not full SSD pack | Out of requirements (services catalogue, not admissions) |

### Staff

| ID | Requirement | FE today | Class |
|---|---|---|---|
| F-01 | CAP-03 document / entry evidence review | Staff portal Not started | Required · Gap |
| F-02 | CAP-05/06 qualification / foreign equivalency | Not started | Required · Gap |
| F-03 | CAP-07 offer + first enrolment | Not started (may use old CMS) | Required · Gap |
| F-04 | Lesotho 3-step Academic→QA→Registrar + rank/score | Not started | Required · Gap |
| F-05 | CAP-10 registration config / approve | Not started | Required · Gap |
| F-06 | CAP-16 publish announcements | Not started | Required · Gap |
| F-07 | CAP-51 staff form review / SLAs | Not started (Admin Actions ≠ staff) | Required · Gap |
| F-08 | CAP-50 immigration ops | Not started | Out of requirements for Lesotho M4 default |

### Lecturer

| ID | Requirement | FE today | Class |
|---|---|---|---|
| L-01 | Admissions / online registration | N/A — lecturer portal Not started; no admissions role in pack | Out of requirements |

## Related

| Topic | Path |
|---|---|
| Requirements capture | [luct-online-registration.md](luct-online-registration.md) |
| Pages (requirements) | [online-registration.html](../../diagrams/old-cms/online-registration.html) |
| Pages (this gap) | [online-registration-gap.html](../../diagrams/old-cms/online-registration-gap.html) |
| Lesotho DB/FE/flows gap | [lesotho-db-gap.md](lesotho-db-gap.md) |
| Applicant agents | [../frontend/applicant-portal.md](../frontend/applicant-portal.md) |
| CAP catalog | [../../sdd/11-capability-catalog.md](../../sdd/11-capability-catalog.md) |
