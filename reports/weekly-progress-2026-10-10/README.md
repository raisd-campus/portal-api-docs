# Raisd Campus weekly progress — 2026-10-10

Working Group weekly pack covering **4–10 October 2026** (delta since [3 Oct weekly](../weekly-progress-2026-10-03/) and [7 Oct executive](../executive-progress-review-2026-10-07/)).

**Cut:** morning of 10 October 2026 — includes overnight Portal API / Applicant / Student Demo enablement, cross-campus fee amounts, and Weekly reports hub on Pages.

Compiled from Read.ai standups (7–9 Oct) and published control-plane / portal / Pages commits — standup action: *Iman will compile the week’s updates for the next weekly meeting.*

| Artefact | Purpose |
|---|---|
| [`Raisd-Campus-Weekly-Progress-2026-10-10.html`](./Raisd-Campus-Weekly-Progress-2026-10-10.html) | Printable HTML for the meeting |
| [`Raisd-Campus-Weekly-Progress-2026-10-10.pdf`](./Raisd-Campus-Weekly-Progress-2026-10-10.pdf) | Shareable PDF (regenerate below) |
| [W04 hub page](../weekly/2026-10-10.html) | Short week summary on Pages |

## Rebuild PDF

```sh
HTML="$(pwd)/Raisd-Campus-Weekly-Progress-2026-10-10.html"
PDF="$(pwd)/Raisd-Campus-Weekly-Progress-2026-10-10.pdf"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML"
```

## Sources

- Read.ai: CMS 2026 Daily Stand-up 7 Oct, 8 Oct, **9 Oct**
- `docs/ai/backend/applicant-qr-fee-mechanisms.md`, `campus-finance-profile.md`, `dynamic-fee-calculation.md`, `lesotho-cap53-online-enrolment-write.md`, `cross-campus-fee-amount-suggestions.md`
- `docs/ai/contracts/campus-finance-profiles.yaml`
- GitHub Pages: `portal-api-docs` through Weekly reports nav grouping (`aa1c199`)
- Portal Demo: `portal-api` `9964620` / `e387c69` · `applicant-portal` `c2f4f47` · `student-portal` `a6d250b`
