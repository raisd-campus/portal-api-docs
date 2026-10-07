# Raisd Campus — executive progress summary (2026-10-07)

Senior-leadership pack with overall project percentages, milestone charts, and executive narrative.

| Artefact | Purpose |
|---|---|
| [`Raisd-Campus-Executive-Progress-Summary-2026-10-07.pdf`](./Raisd-Campus-Executive-Progress-Summary-2026-10-07.pdf) | Shareable executive PDF |
| [`Raisd-Campus-Executive-Progress-Summary-2026-10-07.html`](./Raisd-Campus-Executive-Progress-Summary-2026-10-07.html) | Printable HTML source (same content) |

## Rebuild PDF

```sh
# from this folder
HTML="$(pwd)/Raisd-Campus-Executive-Progress-Summary-2026-10-07.html"
PDF="$(pwd)/Raisd-Campus-Executive-Progress-Summary-2026-10-07.pdf"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML"
```

## Contents

1. Executive snapshot (Live / FE Demo depth / platform / Lesotho KPIs)
2. Progress charts — milestone bars, WG-week cumulative readiness, work-mix pie
3. What moved since 5 October
4. Projection, intentions, and goals
5. Leadership asks
6. Sources

## Methodology (brief)

- **Live %** — Working Group checklist only. A row counts when status is **Live**. Demo / Partial / Placeholder do not.
- **FE started %** — Engineering Demo cut of 7 Oct 2026: sheet baseline (SDD-13, 19 Sep) plus Applicant Demo journeys now in the estate. The WG sheet itself has not been re-exported since 19 Sep.
- **Platform readiness %** — Engineering estimate of schema, Portal API, docs, inventories, and Demo hosting readiness — **not** campus acceptance.

## Sources

- Overview progress board (`docs/diagrams/index.html#progress`), cut 7 Oct 2026
- SDD-03 · SDD-13 · SDD-04 / Applicant Demo HTTP notes (7 Oct 2026)
- Hosted Demo: Portal API schema v4 + Applicant HTTP; Neon backup/reseed 7 Oct 2026
- Prior pack: `docs/reports/executive-progress-review-2026-10-05/`
