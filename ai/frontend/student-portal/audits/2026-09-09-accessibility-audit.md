# CAP-35 Student Portal accessibility audit — 9 September 2026

## Purpose and limits

This is an engineering audit of the frontend-only Student Portal against WCAG 2.2 Level A and AA criteria within the supported desktop scope. It follows the W3C principle that automated checks assist, but do not replace, knowledgeable human evaluation:

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C Evaluating Web Accessibility Overview](https://www.w3.org/WAI/test-evaluate/)

The repeatable browser suite uses `@axe-core/playwright` 4.13.0 with WCAG 2.0 A/AA, 2.1 A/AA and 2.2 AA tags. It covers Chromium at 1280 × 900 and 1440 × 1000, both current student scenarios, representative interactive overlays, and every current Services route. Assertions outside axe cover keyboard operation, focus return, forced-colour mode, reduced motion and enlarged text. Existing route tests cover loading, retry, empty, unavailable, long-content and image-failure states.

This report is not formal accessibility certification. It does not claim production authentication/backend accessibility, full assistive-technology acceptance, physical-device testing, or full portal-shell phone/tablet support. The existing isolated Services-content responsive scope remains unchanged.

## Audited surface

- Dashboard and Community, including IT Helpdesk
- Announcements list and detail
- Academic Performance, Modules, Module Details, Materials/Assignment Details, Lecturer Review, Timetable, Attendance, Study Plan, Module Registration and Graduation
- Profile Personal, Academic, Resume, Portfolio and Documents
- Finance list/detail and transfer-proof dialog
- Requests, Accommodation and eligible Immigration placeholders
- Services Accommodation, Transportation, Dining, Wellness, Accessibility Support, Connectivity, Shopping and Recreation
- Rizal's mid-programme and Alya's first-semester states

The automated state matrix checks headings and landmarks, names and roles, tables, images, forms, dialogs, status/error semantics, target size and colour contrast. Existing browser flows additionally exercise tab/arrow navigation, table rows, carousels, breadcrumbs, Back/Forward, scroll reset, validation focus, popup focus restoration, Community resizing and service-tab scrolling.

## Findings and remediation

| ID | Severity | Affected surface | WCAG reference | Finding | Fix and verification |
| --- | --- | --- | --- | --- | --- |
| A35-01 | Serious | Module and timetable online indicators | 4.1.2 Name, Role, Value | A labelled `span` used `aria-label` without a semantic role. | `OnlineClassIndicator` now exposes image semantics while retaining its tooltip. Axe no longer reports prohibited ARIA. |
| A35-02 | Serious | Brand and destructive filled controls | 1.4.3 Contrast (Minimum) | One token served both text on dark surfaces and filled backgrounds with light labels, making one of those pairings fail contrast. | Added separate `brand-solid` and `destructive-solid` surface roles while retaining brighter text roles. Shared Button, navigation, calendar, timetable, chat and account controls use the solid roles. |
| A35-03 | Serious | Success states and issue summaries | 1.4.3 Contrast (Minimum) | Small success/destructive labels and light content on the original amber issue surface did not consistently reach 4.5:1. | Added `success-solid`; destructive cards use light copy on `destructive-solid`. Warning issue cards retain the approved amber surface with light copy as an explicit visual exception requested by the product owner on 9 September; this route-specific exception remains outside the WCAG AA pass claim. Summary and status components share the corrected roles where applicable. |
| A35-04 | Serious | Services source tables | 1.4.3 Contrast (Minimum) | Caption/header copy was too low contrast against the source-style grey surfaces. | Darkened the caption surface slightly and use title-colour table copy. |
| A35-05 | Serious | Muted 12px metadata | 1.4.3 Contrast (Minimum) | Muted metadata on the raised/hover surface measured 4.25:1 in the first-semester announcement cards and tabs. | Raised the shared muted-foreground lightness; the two-scenario axe scan now accepts the pairing. |
| A35-06 | Critical | Finance transfer proof and Community attachments | 3.3.2 Labels or Instructions; 4.1.2 Name, Role, Value | Visually hidden file inputs had no accessible name because only separate buttons opened them. | Added explicit names to both file inputs. Other assignment and Portfolio file inputs already had names. |
| A35-07 | Serious | Finance transfer-proof dialog | 2.4.3 Focus Order | The controlled dialog had no `DialogTrigger`, so closing with Escape could leave focus without a reliable origin. | The direct action now has a stable ref and the popup's close autofocus returns to it. The audit exercises Escape and verifies focus. |
| A35-08 | Serious | Lecturer Review rapid input | 3.3.1 Error Identification; 3.3.2 Labels or Instructions | Rapidly choosing ratings could build updates from stale form state and discard earlier answers, causing false missing-answer errors. | Rating and feedback drafts now use functional atomic state updates and synchronize the query draft from the same computed state. The 15-answer confirmation flow is covered in the interactive audit. |
| A35-09 | Advisory | Scrollable tab indicator and fixed banners | 2.3.3 Animation from Interactions; 1.4.4 Resize Text | The active-tab transition retained a duration under reduced motion, and rem-based media geometry grew when only text size was enlarged. | Reduced motion now sets transition duration to zero. The banner's agreed 288px height, 32px inset, 208px copy width and 16px copy gap use fixed media dimensions; enlarged overflow remains keyboard-scrollable inside the banner. |

## Manual and assisted checks

- Keyboard: sidebar disclosures, tabs, carousel tables, table rows, carousel controls, forms, radio groups and dialogs retain keyboard entry and visible focus. No known keyboard trap or blocker remains in the tested flows.
- Focus: validation focuses the first missing Lecturer Review rating; cancelling its confirmation restores the submit action; closing the transfer-proof dialog restores its originating action.
- Structure: route shells retain one main landmark and coherent headings; detail breadcrumbs and tab panels keep their established parent context. Data comparisons remain semantic tables with contained scrolling.
- Images: decorative icons are hidden from assistive technology; meaningful images use alternative text; Services and Announcement failure states keep readable fallback geometry.
- Dynamic feedback: errors use alerts, loading/completion states use status semantics, and immutable review submission has a focused receipt.
- Visual preferences: forced-colour mode retains focusable navigation and tab controls. Reduced motion removes the selected-tab transition. At 200% text enlargement, the Accessibility page's core content, profile control and banner copy remain reachable without clipping the banner text.
- Responsive boundary: the seven source-backed Services bodies retain their existing isolated checks at 375, 390, 430, 639, 640 and 768px. This does not extend mobile support to the portal shell or change CAP-35 Mobile from Not started.

## Verification evidence

The dedicated `tests/e2e/accessibility.spec.ts` matrix passed **10/10 Chromium checks (1.5m)** across both desktop projects. Its route scans reported zero unresolved automated WCAG A/AA violations, and its interactive/preference checks passed for focus return, keyboard operation, reduced motion, forced colours and 200% text enlargement. The Services responsive suite also checks the Accessibility placeholder at 375, 390, 430, 639, 640 and 768px in both desktop projects.

The final `npm run check:all -- -- --workers=2` gate exited 0: **456 unit tests / 61 files (22.11s)** and **176 Chromium browser tests (7.0m)** passed. Token, Services-asset, lint, TypeScript, production build (**1.17s**), production-isolation and bundle checks passed with no warnings. `npm audit` reports zero known vulnerabilities. Exact output is retained in `logs/cap-35-accessibility-final-check-all.log`.

The final read-only change-surface review reports no obvious companion-layer gaps, and `git diff --check` passes. The first full-browser attempt exposed two stale visual assertions after the semantic colour-token split; the affected Personal Profile flow then passed at both desktop widths, and the complete gate was rerun successfully without suppressing rules or raising timeouts.

**Follow-up — 9 September 2026:** The product owner restored white copy and the white warning triangle on the unchanged amber warning IssueCard surface. The focused component test (**5/5**) and production build pass. As documented in A35-03, the focused axe matrix now reports the accepted `color-contrast` exception at **2.47:1** for the 12px label and 16px value on Academic Modules and Profile warning cards. This post-audit visual choice is not included in the prior zero-violation claim.

## Remaining responsibilities

Campus administrators must still supply and approve Accessibility Support information, contacts and guidance. CAP-51 owns future accessibility requests, documents, case status, student/staff messages and staff processing. A production release also needs backend/authentication review and formal testing with representative assistive technologies and users; none of those dependencies are represented as completed by the placeholder or this engineering audit.
