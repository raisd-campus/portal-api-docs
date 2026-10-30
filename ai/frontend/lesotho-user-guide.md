# Lesotho user guide (Demo)

**As of:** 30 October 2026  
**Demo ≠ Live.** Sample / session data only. No Live CMS writes from these portals.

**Browse (docs.raisd.co):** [User guidance (one page)](https://docs.raisd.co/diagrams/guidance/) under LUCT CMS → Guidance  
**Desk captures:** [`wireframes/`](../../diagrams/old-cms-lesotho/wireframes/)  
**Role walkthrough:** [`demo-role-playback.html`](../../diagrams/old-cms-lesotho/demo-role-playback.html)  
**Modules:** [lesotho-feature-modules.md](../backend/lesotho-feature-modules.md)  
**Website AI should / should not:** [website-ai-guidance.md](../website-ai-guidance.md) · [HTML](https://docs.raisd.co/diagrams/guidance/website-ai-should.html)

---

## 1. What this guide is for

Use this guide to:

- Sign in to the **Lesotho Demo** Raisd portals
- Understand **who uses which host**
- Follow the **admissions → enrolment → student** Demo path
- Navigate **Staff Admin** by business group (not a CMS menu crawl)
- See what each desk **does today** vs what is still Demo-only

Do **not** treat this as Live production training or campus legal/policy documentation.

Published HTML (single page with on-page sections): [guidance/index.html](../../diagrams/guidance/index.html)

---

## 2. Hosts and who uses them

| Surface | URL | Who |
|---|---|---|
| Campus landing / portal picker | https://lesotho.raisd.co | Anyone after SSO — picks Control / Admin / Student / Staff when multi-role |
| Applicant | https://apply.lesotho.raisd.co | Prospective students (FM-02) |
| Student | https://student.lesotho.raisd.co | Enrolled Demo students (FM-06) |
| Staff (teaching + Admin) | https://staff.lesotho.raisd.co | Lecturer menus **or** Admin menus by active role |
| Staff Admin desks | https://staff.lesotho.raisd.co/admin | Campus Admin (`roleKey` `admin`) |
| Control | https://control.raisd.co | Campus roles / University Flows (not Lesotho-only) |
| SSO | https://sso.raisd.co/login | All sign-in |
| Demo Keychain | https://keychain.raisd.co | WG launcher — Open filled into SSO |

`admin.lesotho.raisd.co` redirects to Staff Admin. `teach.lesotho.raisd.co` redirects to Staff.

---

## 3. How to sign in (Demo)

1. Open [Keychain](https://keychain.raisd.co) → unlock with the WG master password (keychain README).
2. Prefer **Lesotho** campus when picking targets.
3. Use **Open filled** on the account for the role you need (Applicant → Bursary → Registry → Student, etc.).
4. SSO receives email/password and continues to the campus landing or portal.

Public Demo examples (also in Keychain):

| Role | Typical account purpose |
|---|---|
| Applicant (start) | Draft ready to submit with fee proof |
| Staff Bursary | Approve admissions payment only |
| Staff Registry / QA | Documents, offer release |
| Student | Module registration / Finance after accept |
| Campus Admin | Full Admin menu on `staff.lesotho.raisd.co/admin` |

Detailed sequence: [keychain.md](keychain.md) · role playback pages above.

---

## 4. End-to-end Demo journeys (short)

### 4.1 Admissions (Applicant + Staff)

Payment approval does **not** enrol the student.

1. **Applicant** — submit application with fee proof  
2. **Bursary** (`/admin/payments`) — approve payment  
3. **QA / Document review** (`/admin/document-review` or Applicants) — verify documents / LGCSE extract  
4. **Applicant** — confirm Eligibility  
5. **Registry** (Applicants desk) — release Offer Letter  
6. **Applicant** — Accept Enrolment  
7. **Student** — continue on student portal (modules, finance, …)

Keep fee / document / offer work on **Applicants** (and Document review). Do not look for a second admissions queue under Registrations.

### 4.2 Module registration (Student + Registry)

1. **Student** — select modules / submit request  
2. **Bursary clearance** then **Faculty** as configured  
3. **Registry** (`/admin/registrations`) — review **module** requests only  

Sponsors / NMDS borrower context may appear on the request and on the student file Sponsors tab (FM-08).

---

## 5. Staff Admin navigation

Primary sidebar (desktop) shows **business groups**. Sibling desks open in the contextual panel.

| Group | Desks | Routes |
|---|---|---|
| **Admissions** | Applicants · Document review | `/admin/applicants` · `/admin/document-review` |
| **Registry** | Students · Registrations | `/admin/students` · `/admin/registrations` |
| **Finance** | Payments · Fees & Fines · Sponsors | `/admin/payments` · `/admin/fees` · `/admin/sponsors` |
| **Completions** | Graduations · Certificates · Remarks | `/admin/graduations` · `/admin/certificates` · `/admin/remarks` |
| **Teaching** | Academic · Timetable | `/admin/academic` · `/admin/timetable` |
| **Oversight** | Overview · Analytics · Discipline · Access | `/admin` · `/admin/analytics` · `/admin/discipline` · `/admin/access` |

Phone/tablet: groups expand to list each desk (no second sidebar).

IA source: `lecturer-portal` `staff-admin/lib/admin-nav.ts` · review notes [2026-10-30-generated-pages-nav-workflow-review.md](../design/2026-10-30-generated-pages-nav-workflow-review.md).

---

## 6. Desk functionality (what you can do)

Desk flows (newer CMS screenshots only, step-by-step): [guidance/index.html#desks](../../diagrams/guidance/index.html#desks) · [screenshot catalogue](../../diagrams/old-cms-lesotho/newer-cms-screenshots.html) · [manual](../../diagrams/old-cms-lesotho/newer-cms-manual.html).

### Admissions

| Desk | You can | Module |
|---|---|---|
| **Applicants** | Review programme applications; progress / rank / score style actions; continue offer path | FM-03 · FM-05 |
| **Document review** | LGCSE extract + document verification for admissions | FM-04 |
| **Payments** | Verify admissions fee proofs (Bursary). Continue docs/offer on Applicants — not a second stacked queue | FM-09 · FM-03 |

### Registry

| Desk | You can | Module |
|---|---|---|
| **Students** | Browse directory; open a **12-tab Demo file** (list → file on same page) | FM-07 |
| **Registrations** | Review **module enrolment** requests; approve/reject with basis | FM-08 |

**Student file tabs (FM-07):** Academics · Student · Registration · Attendance · Card · Graduation · Finance · Sponsors · Education · Documents · Notes · Audit.

### Finance

| Desk | You can | Module |
|---|---|---|
| **Fees & Fines** | Preview LSL catalogue lines (application / acceptance / registration style seeds) | FM-09 |
| **Sponsors** | Sponsorship / NMDS-oriented Demo master | FM-08 · FM-09 |

Banks, debtors, and full payment plans remain later (not Live).

### Completions

| Desk | You can | Module |
|---|---|---|
| **Graduations** | Ceremony / hood / name-tag style Demo desk | FM-10 |
| **Certificates** | Demo print batches + QR payload placeholder | FM-12 |
| **Remarks** | Re-assessment remark requests | FM-11 |

### Teaching & oversight

| Desk | You can | Module |
|---|---|---|
| **Academic** | Attendance / gradebook Demo | FM-16 |
| **Timetable** | Sessions / venues / generator Demo (not Live solver) | FM-16 |
| **Overview** | Admin home + admissions count cards | — |
| **Analytics** | Demo summary cards (enrolments, admissions, …) | FM-17 |
| **Discipline** | Dishonesty / suspension / blocked Demo lists | FM-18 |
| **Access** | Assign fixed learner presets (Applicant / Student / Staff / Lecturer) | FM-01 |

---

## 7. Applicant and Student (brief)

### Applicant (`apply.lesotho.raisd.co`)

- Apply / evidence / fee proof / eligibility / offer / accept enrolment  
- Versioned flow rewrite is **Faid-owned** (FM-02) — do not invent a parallel apply product here  
- Detail: [applicant-portal.md](applicant-portal.md) · [lesotho-cms-vs-applicant-portal.md](../backend/lesotho-cms-vs-applicant-portal.md)

### Student (`student.lesotho.raisd.co`)

- Dashboard, academic, finance, forms, community, and related Demo journeys (FM-06)  
- Phone / tablet / desktop shells follow the shared design system  
- Detail: [student-portal/AGENTS.md](student-portal/AGENTS.md)

---

## 8. What is out of scope (do not expect)

| Excluded | Why |
|---|---|
| HRMS / Appraisals | FM-X — not Raisd M4 |
| LMS (Five Days, Fortinet) | Separate research track |
| Campus Website CMS | Marketing site stays outside portals |
| Library | Deferred |
| In-portal Mail client | Use Raisd notify (FM-13) instead |

---

## 9. Demo vs Live (read this every time)

| Demo (today) | Live (not claimed here) |
|---|---|
| Sample / session data | Durable CMS or approved production save |
| Keychain + SSO Demo accounts | Campus-issued production identities |
| Staff Admin desks with Demo banners | Server-enforced production desks with named owner |
| QR / certificate placeholders | Production QR / print pipelines |

Status words: [status-language.md](../process/status-language.md).

---

## Related materials

| Material | Path |
|---|---|
| Guidance HTML (docs.raisd.co) | [diagrams/guidance/](../../diagrams/guidance/) |
| Desk wireframes | [wireframes/](../../diagrams/old-cms-lesotho/wireframes/) |
| Role playback | [demo-role-playback.html](../../diagrams/old-cms-lesotho/demo-role-playback.html) |
| Feature modules | [lesotho-feature-modules.md](../backend/lesotho-feature-modules.md) |
| Pilot framing | [lesotho-pilot.md](../architecture/lesotho-pilot.md) |
| Newer CMS manual / screenshots | [newer-cms-manual.html](../../diagrams/old-cms-lesotho/newer-cms-manual.html) · [newer-cms-screenshots.html](../../diagrams/old-cms-lesotho/newer-cms-screenshots.html) |
| Website AI should / should not | [website-ai-guidance.md](../website-ai-guidance.md) |
