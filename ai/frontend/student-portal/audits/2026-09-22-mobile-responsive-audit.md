# Mobile responsive audit — 22 September 2026

## Scope and method

Reviewed the existing responsive implementation in the working checkout, preserving the earlier uncommitted work. The audit covered 44 route/tab/detail combinations at 375px in Chromium with `isMobile` and `hasTouch`, plus a 37-route baseline in WebKit's touch-phone profile. Top, bottom and intermediate captures of long pages were visually inspected. Interaction checks covered drawers, Community, editable forms, date pickers, registration, graduation, case messages and payment-proof dialogs.

The permanent regression suite adds focused layout checks at 375, 390 and 430px in Chromium and 375px in WebKit. Existing tablet/desktop suites remain part of the completion gate. Native Chromium touch gestures verify scrolling and dismissal; synthetic pointer events alone were insufficient to reproduce browser gesture cancellation. These are browser-engine checks, not physical iPhone/Android, on-screen-keyboard or assistive-technology certification. `/dev/*` remains outside responsive acceptance.

On 23 September 2026, the product decision was revised so phone fields retain their normal component typography while viewport metadata disables browser zoom. This is a known WCAG 1.4.4 exception. The axe suites exclude only the resulting `meta-viewport` finding; all other WCAG A/AA findings remain enforced.

## Findings corrected

| Area | Evidence and cause | Correction |
| --- | --- | --- |
| Record details and editors | Profile, qualifications, module metadata, Immigration and form prefills retained a 160px label column in narrow panels. The CSS queried a named container that did not exist. | Use the enclosing size container and stack labels over full-width values/controls at 30rem or less. Add a constrained Explorer example. |
| Study Plan | Credit labels overlapped neighbouring GPA/CGPA labels and the status badge consumed the metric width. | Keep title/status/chevron together and put metrics in a full-width two-by-two grid below at phone-sized container widths. |
| Services tables | Simple hours/rates tables inherited a 560px minimum and hid their second column on phones. | Fit and wrap two-column tables; retain semantic horizontal scrolling for wider comparison tables. |
| Announcement list | Desktop thumbnails and the extra chevron margin compressed phone titles and summaries. | Use 64-by-36px phone thumbnails and the standard gap beside the chevron. |
| Dashboard carousel | Native swipes could stop one card into a pair; pointer-drag offsets also competed with native scrolling. | Snap phone cards in pairs, use native touch physics, and include the gap in arrow-scroll distance. Preserve desktop mouse dragging. |
| Segmented controls | A fixed-height parent could not contain the 44px coarse-pointer targets. | Let the strip grow with its targets and keep the active indicator within the strip. |
| Overlay dismissal | Browser touch handling could cancel the pointer sequence before the old swipe handler received `pointerup`. | Shared swipe handling with `pan-y pinch-zoom`, cancellation cleanup and exclusion of interactive targets. Verify native horizontal, vertical and button-origin gestures. |
| Composer and date triggers | Touch buttons grew to 44px while the composer/date field retained its smaller height. | Match the 44px minimum, balance composer padding and preserve its specifically requested 14px font. |
| Lecturer review | Rating labels remained 36px targets, and growing them inline with both endpoint labels would crowd the row. | Use 44px touch targets with endpoint labels on a separate row in narrow review containers. |
| Online Forms preparation | The long Student Pass guidance link used a nowrap button style and clipped at the phone panel edge. | Wrap both Immigration guidance links within their cards. |
| Registration editor | A two-column child span created implicit columns inside the phone's one-column grid, clipping “Monday”. | Reuse `FormGrid`, whose narrow layout resets spans and stacks schedule fields. |

No API contracts, records, student policies, persistence or upload capabilities changed.

The audit also exposed an unrelated development-preview disruption: generated browser trace HTML under the project triggered Vite page reloads and reset the session. The dev watcher now ignores `logs`, `test-results` and `playwright-report`. A browser probe wrote an HTML artifact while the LAN page was open and verified that no navigation occurred and its in-memory marker survived. The production build, production-tool exclusion, bundle checks and lint passed again after this configuration change.

## Page review coverage

| Area | Pages and states inspected |
| --- | --- |
| Dashboard | News pairs, performance charts, timetable agenda, calendar, module cards and drawer/header actions. |
| Announcements | Important/all lists; text-only, image and table article details. |
| University Policies | Catalogue, category strip and long titles. Existing catalogue-only actions remain intentional. |
| Academic Performance | Charts, semester selection, grade disclosures and breakdown popup. |
| Modules | List, Summary, Materials/teaching weeks, Attendance, assignment detail and lecturer review. |
| Timetable and Attendance | Day agenda, calendar and daily class states. |
| Study Plan | Programme overview, all semester metrics and expanded semantic module tables. |
| Module Registration | Completed state and Alya's active selection/editor, schedule metadata and reachable actions. |
| Graduation | Ineligible state and Nadia's numbered steps, including Documents. |
| Personal Profile | Read-only details and editable contact fields; action reachability and saving. |
| Academic Profile | Qualifications, English proficiency and document links. |
| Resume | Summary, record cards, add/edit dialog and date picker. |
| Portfolio | Grid, new project, existing project detail and edit form. |
| Documents | Long read-only list; file delivery remains outside scope. |
| Privacy & Security | Information sections, access cards and support actions. |
| Finance | Invoices, Payment History, awards, invoice detail, payment instructions and transfer-proof popup. |
| Immigration | Student Pass, empty Applications, Mei's new-pass entry and form preparation/editor. |
| Online Forms | Catalogue, My Forms, preparation/editor, submitted and completed detail, progress and case conversations. |
| Services | Transportation, Dining, Wellness, Accessibility Support, Connectivity, Shopping and Recreation; long media/text sections and hours/rate tables. |
| Community | Root and nested Back controls, service/programme conversations, draft retention, sending and attachment coverage, identity scrolling and native dismissal. |

## Verification and evidence

- The standalone Chromium route audit completed all 44 combinations without document/main horizontal overflow or uncaught page errors. Intentional table and tab scrollers are retained.
- Baseline WebKit review completed 37 route/tab/detail combinations without main-area horizontal overflow. Focused WebKit regressions exercise the corrected fields, metrics, Services tables, tabs, date picker, ratings, composer and preparation links.
- Route-fit helpers now wait for loaded content in the visible viewport, avoiding false passes on initial loading shells while respecting lazy dashboard sections below the fold.
- Local screenshots, contact sheets, route metrics and exploratory scripts are under ignored `logs/mobile-audit/`; permanent checks are in `tests/e2e/mobile-layout.spec.ts`, `tests/webkit/mobile-layout.spec.ts` and `tests/support/`.
- `npm run check:all` passed token/Services-asset checks, warning-free lint, **696/696 unit tests across 88 files**, TypeScript/production build, production-tool exclusion and bundle budgets. Eager JavaScript is **194,918 gzip bytes** against the unchanged 195,072-byte cap; the largest chunk remains 340,900 bytes.
- The full Chromium run completed **254 passes, 28 intentional project skips and 2 failures** from an outdated Explorer selector that assumed only one DetailField example. After scoping that selector and asserting the new narrow example, the affected tests passed **2/2 at 1280px and 1440px**. All 256 applicable Chromium checks are therefore verified; the initial full command itself exited nonzero for those stale assertions.
- The separately completed full WebKit suite passed **28 checks with 17 intentional viewport skips**. Final lint is warning-free and `git diff --check` has no whitespace errors, only the existing CRLF normalization notices.
- The existing LAN preview remains bound to `0.0.0.0:5173`; `http://192.168.1.3:5173/` returned HTTP 200 from this machine. No firewall or network settings were changed. Physical-device retesting remains separate from the browser-engine evidence above.
