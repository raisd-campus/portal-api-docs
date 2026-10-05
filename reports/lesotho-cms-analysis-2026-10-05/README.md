# Raisd Campus — Lesotho CMS analysis briefing (2026-10-05)

Working Group pack to share measured Lesotho old CMS findings, CAP-53 R1 read plan, and M4 gaps.

| Artefact | Purpose |
|---|---|
| [`Raisd-Lesotho-CMS-Analysis-Briefing-2026-10-05.pdf`](./Raisd-Lesotho-CMS-Analysis-Briefing-2026-10-05.pdf) | Shareable PDF |
| [`Raisd-Lesotho-CMS-Analysis-Briefing-2026-10-05.html`](./Raisd-Lesotho-CMS-Analysis-Briefing-2026-10-05.html) | Printable HTML source |
| Paste-ready text below | WhatsApp / email to WG |

## Rebuild PDF

```sh
HTML="$(pwd)/Raisd-Lesotho-CMS-Analysis-Briefing-2026-10-05.html"
PDF="$(pwd)/Raisd-Lesotho-CMS-Analysis-Briefing-2026-10-05.pdf"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML"
```

## Paste-ready — Working Group (WhatsApp / email)

```text
Lesotho CMS analysis — results (5 Oct 2026)

Vara’s old CMS structure pack is inventoried. Schema campus2_lesotho:
• 369 tables · 351 views · 51 procs · 6 functions
• Thinner LUCT sibling of Botswana (~83% table-name overlap)
• Dump stays local (no PII / no SQL in git)

CAP-53
• Portal hooks present: portal_student_*_lesotho (5) + api_student_*/api_faculty_* (6)
• Phase R1 READ mapping ready for Portal API
• Code blocked until we have private MySQL/integration access

NMDS ≠ Botswana DTEF
• Old CMS = assist provider “nmds” + AssistStdAcc (borrower-like) + internal billing
• Do NOT reuse tef.gov.bw / DTEF client
• LSL/M for finance (ignore RM leftover on assist BillCurrency)

M4 gap (schema × FE × flows)
• Blockers: admissions (applicant/staff Not started), registration writes, NMDS staff path, CAP-53 SoR decision
• Student Demo is deepest FE — not enough for government parity alone
• Live remains 0%

Asks
1) Private read access to campus2_lesotho for portal-api
2) Confirm Live SoR (old CMS adapter vs Schema v3)
3) Any NMDS national HTTP API?
4) Rank/score — newer UI only or also needed in Schema?

Links
• Pages: https://raisd-campus.github.io/portal-api-docs/diagrams/old-cms-lesotho/
• Gap + fields: https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/lesotho-db-gap.md
• CAP-53 R1: https://github.com/raisd-campus/control-plane/blob/main/docs/ai/backend/lesotho-cap53-read-adapter.md
• Briefing PDF: docs/reports/lesotho-cms-analysis-2026-10-05/ (this folder)
```

## Sources

- Vara Drive pack inventoried 5 Oct 2026 (`campus2_lesotho` structure; local `_local/` only)
- WhatsApp WG screenshots 3 Oct 2026 (newer CMS UX; not in repo)
- [lesotho-db-gap.md](../../ai/backend/lesotho-db-gap.md) · [lesotho-cap53-read-adapter.md](../../ai/backend/lesotho-cap53-read-adapter.md)
- SDD-11 FE statuses · Lesotho pilot decision 3 Oct 2026
