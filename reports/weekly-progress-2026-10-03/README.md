# Raisd Campus weekly progress — 2026-10-03

First Working Group CMS 2026 weekly meeting pack. Because no prior weekly cadence existed, this report covers the **full baseline** from the 18 September working-group start through the 3 October cut in executive detail.

**Regenerated 3 Oct 2026** after pulling current `raisd-campus/*` mains (includes Applicant Demo UI, design-system 0.6.1, Portal API + Neon Schema v3, Vercel PoC estate, LMS docs).

| Artefact | Purpose |
|---|---|
| [`Raisd-Campus-Weekly-Progress-2026-10-03.pdf`](./Raisd-Campus-Weekly-Progress-2026-10-03.pdf) | Shareable executive pack for the meeting |
| [`Raisd-Campus-Weekly-Progress-2026-10-03.html`](./Raisd-Campus-Weekly-Progress-2026-10-03.html) | Printable HTML source (same content) |

## Rebuild PDF

```sh
# from this folder
HTML="$(pwd)/Raisd-Campus-Weekly-Progress-2026-10-03.html"
PDF="$(pwd)/Raisd-Campus-Weekly-Progress-2026-10-03.pdf"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML"
```

## Sources

- Pulled campus mains on 3 Oct 2026
- `docs/sdd/` (especially SDD-03, SDD-10, SDD-13, SDD-14)
- `docs/ai/` knowledge base, student/applicant handoff, `vercel-neon-poc.md`
- Canonical schema LUCT readiness + LMS Q37 decisions (1 Oct 2026)
- ADR-1 confirmation (Aslam, 23 Sep 2026)

Later weeks should keep this layout and add a week-over-week delta section at the top.
