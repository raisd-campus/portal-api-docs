# E2E Demo — Applicant → Staff → Student (13 Oct 2026)

Hosted Demo walkthrough for the **staged admissions** path. Payment approval does **not** enrol.

## Current sequence

1. **Applicant** (`completed`) — submit draft with fee proof  
2. **Staff Bursary** — **Approve payment** only  
3. **Staff Registry** (QA stand-in) — **Verify documents (QA)** → Eligibility Letter  
4. **Applicant** — **Confirm Eligibility**  
5. **Staff Registry** — **Release Offer Letter**  
6. **Applicant** — **Accept Enrolment** → Sign in continues to Student  
7. **Student** Alya Putri (`10029841`) — Registration Week / modules / Finance  

Keychain **Start here** mirrors this order. Demo ≠ Live.

## Links

- **HTML:** [index.html](./index.html)
- **Live Pages:** https://raisd-campus.github.io/portal-api-docs/reports/e2e-applicant-staff-enrol-2026-10-11/
- **Re-capture:** `node docs/reports/e2e-applicant-staff-enrol-2026-10-11/capture.mjs`

## Evidence

Re-captured **13 Oct 2026** against production Vercel hosts (16 screenshots). If Neon `applicant-completed` is already accepted, delete that row before re-running so the draft fixture reseeds.
