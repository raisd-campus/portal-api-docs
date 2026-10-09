# Raisd Campus — executive progress review (2026-10-05)

Senior-leadership pack with progress charts, milestone intentions, projected goals, and asks.

| Artefact | Purpose |
|---|---|
| [`Raisd-Campus-Executive-Progress-Review-2026-10-05.pdf`](./Raisd-Campus-Executive-Progress-Review-2026-10-05.pdf) | Shareable executive PDF |
| [`Raisd-Campus-Executive-Progress-Review-2026-10-05.html`](./Raisd-Campus-Executive-Progress-Review-2026-10-05.html) | Printable HTML source (same content) |

## Rebuild PDF

```sh
# from this folder
HTML="$(pwd)/Raisd-Campus-Executive-Progress-Review-2026-10-05.html"
PDF="$(pwd)/Raisd-Campus-Executive-Progress-Review-2026-10-05.pdf"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML"
```

## Contents

1. Executive snapshot (Live / FE started / platform / Lesotho KPIs)
2. Progress charts — milestone bars, WG-week cumulative readiness, work-mix pie
3. Projection, intentions, and goals (M1–M5 + ideal; near-term focus; horizons)
4. Leadership asks
5. Sources

## Sources

- Overview progress board (`docs/diagrams/index.html#progress`), cut 5 Oct 2026
- SDD-03 delivery milestones · SDD-13 progress timeline (sheet 19 Sep 2026)
- Working Group decision 3 Oct 2026 (Lesotho M4 pilot)
- ADR-1 SoR posture (23 Sep 2026)
- Companion weekly pack: `docs/reports/weekly-progress-2026-10-03/`
