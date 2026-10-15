# Portal UI ownership — unpublished 0.7.0 candidate

These are local, mock-data consumer-fixture captures, separate from the released 0.6.2 public catalogue. They cover enabled/disabled tabs/actions, carousel, student summary, edit/document actions, capacity, learning/person rows, wizard, compact survey and stacked phone header.

- [Phone](ui-375.png)
- [Tablet](ui-768.png)
- [Desktop](ui-1440.png)
- [Capture provenance](captures.json)
- [Page-by-page source audit](../../../../ai/design/2026-10-13-portal-ui-ownership-audit.md)

The fixture imports only Tailwind and the package stylesheet; no Student/Applicant CSS. Captures were reset to the top of the document after SurveyLayout's focus behavior. Native/ARIA-disabled cursor checks and responsive/drag/focus interactions are covered by consumer tests. Glyph/font and source-specific content differences remain portal-owned. No publication, released pin change or deployment.
