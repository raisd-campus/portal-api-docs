# Applicant list review — 20 October 2026

## Superseding implementation - 20 October 2026

The owner-approved [University Flows](university-flows.md) implementation replaces this disconnected tracker with the Portal API admissions queue, including stable identities, scoped reviews, evidence/messages and policy decisions. The hard-coded-first configurability hold is superseded. The earlier inventory and screenshots below remain historical evidence, not the current source contract. No hosted deployment is claimed by this local change.


**Stand-up action (19 Oct):** *Iman Suherman will review the applicant list.*  
**Hosted evidence:** [`docs/reports/applicant-list-review-2026-10-20/`](../../reports/applicant-list-review-2026-10-20/)  
**UI:** `staff.{slug}.raisd.co/admin/applicants`

## What the list is

Campus Admin **Applicants** is an **offline Demo status tracker** in the staff portal (`lecturer-portal` `src/staff-admin`). It is scoped to the hosted campus hostname (Lesotho shows Lesotho rows only). It is **not** a live query of Portal API applications.

| Column | Source |
|---|---|
| Applicant name + id | Seed / session store |
| Campus | Seed `campusId` |
| Programme | Seed string |
| Status | Demo workflow statuses (see labels) |
| Updated | ISO timestamp |
| Actions | Registry / Bursary desk actions by status |

Sequence documented on the page: payment verified → QA documents → applicant confirm → Offer → enrol.

## Inventory (seed, all campuses)

| Id | Name | Campus | Status (seed) |
|---|---|---|---|
| app-1001 | Thabo Molefe | Lesotho | payment_pending |
| app-1004 | Lerato Phiri | Lesotho | submitted |
| app-1005 | Keabetswe Ndlovu | Lesotho | payment_verified |
| app-1002 | Soriya Chan | Cambodia | offer_issued |
| app-1003 | Nomsa Dlamini | Eswatini | eligibility_issued |
| app-1006 | Kagiso Molefe | Botswana | payment_pending |
| app-1007 | Wei Chen | Cyberjaya | submitted |
| app-1008 | Aminata Kamara | Sierra Leone | eligibility_issued |
| app-1009 | Aisha Nambi | Uganda | offer_issued |
| app-1010 | Tangi Shipanga | Namibia | payment_verified |

On `staff.lesotho.raisd.co`, only the three Lesotho rows appear.

## Findings

1. **Separate from SSO Applicant role.** The tracker lists Demo admissions cases. SSO `roleKey` `applicant` (`portal.applicant`) is identity for `apply.{slug}.raisd.co`. They are not joined by email or person id in this UI.
2. **Offline ≠ Portal API.** Hosted Applicant portal applications are not mirrored into this table. Operators should not treat the list as the Live admissions queue.
3. **Action gates.** Verify / confirm actions require a Registry or Bursary staff session role; Offer / enrol require Registry. A campus Admin with no desk can view the list but may not see action buttons.
4. **Statuses cover the Demo path** but do not expose applicant-portal review stages (payment proof under review, documents under review, Action Required messaging) as first-class columns.
5. **No empty-state / count** historically — added a row count, empty campus message, and a one-line reminder that SSO Applicant is granted on Access (fixed) or auto-provisioned on apply.

## Decisions recorded

| Topic | Decision |
|---|---|
| Applicant vs student/staff Access | Separate **fixed** Applicant preset — no module checkboxes |
| List ownership | Keep Demo tracker for staff walkthroughs; Live list is a future Portal API surface |
| Configurability | Do not attach application-step configuration to this list |

## Follow-ups (not this review)

- Portal API–backed applicant queue for Live
- Link tracker row → SSO person / application id when provisioning exists
- Align status vocabulary with Applicant portal progress steps when the first campus flow is complete
