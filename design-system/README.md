# Semantic confirmation release 0.22.1

The refreshed Record feedback consumer captures show compact semantic Toast surfaces and centered controls at desktop Chromium and tablet/phone WebKit widths. The patch also removes the empty AdminTableToolbar action wrapper to balance search-only spacing, retaining transparent/unpadded colored compact status text. Capture with CAPTURE_RECORD_FEEDBACK=1 on record-feedback.e2e.ts. Staff alone adopts the exact patch.

# Record feedback release 0.22.0

Three synthetic consumer captures show responsive recorded change comparisons, a full-width InnerSection header divider, edge-to-edge DataTable rows, curriculum SummaryCard and blue credit Badge, plus a transient bottom-right Toast. Capture with CAPTURE_RECORD_FEEDBACK=1 on record-feedback.e2e.ts using desktop Chromium and tablet/phone WebKit. Staff alone adopts this release; publication is verified separately from application deployment.

# Record history and action presentation release 0.21.0

Three synthetic consumer captures show independent audit history with recorded changes, contextual record actions, title-case Button presentation, a heading credit pill and a top-labelled DropdownSelect. Exact archive API browser checks generated these captures with CAPTURE_SHARED_RECORD=1 on admin-record-history.e2e.ts. Staff alone adopts this release.

# Shared tiered navigation release 0.20.0

PortalNavBranch extracts the established Student navigation style into system/portal-shell. Synthetic desktop Chromium and tablet/phone WebKit captures show the active child, expansion and tablet menu. Capture with `node capture-portal-nav-branch.mjs` from the consumer fixture on 4184. The exact registry archive is verified; Staff adopts separately, while Student retains its current composition and pin. Existing shell consumers keep their defaults.

# Published design system catalogue source

Release 0.18.5 mutes AdminTable current-page pagination with the existing secondary button. Staff and Control consume this release. Three Admin table captures show page 2 at desktop Chromium and tablet/phone WebKit widths; run `node capture-admin-pagination.mjs` from the consumer fixture on port 4184. Other captures retain their recorded provenance.

Release 0.18.4 defers the breadcrumb overflow menu until needed. Applicant, Student, Staff/Lecturer and Control adopt the same release and supply their existing route hierarchies. Nine affected header/menu/loading captures cover desktop Chromium and phone/tablet WebKit; run `node capture-portal-breadcrumb-deferred.mjs` on the fixture at port 4184. Loading captures hold only the synthetic menu-module request and retain current-page context. Existing Student bundle limits remain unchanged.

Release 0.18.3 keeps summary-list entry names left-aligned and statuses right-aligned. In the shared summary column only, summary/list statuses retain semantic text color without background, border or padding. Six focused captures cover summary/list at desktop Chromium and phone/tablet WebKit widths; run `node capture-admin-status-text.mjs` from the consumer fixture on port 4184. Staff and Control adopt the patch; directory badges remain unchanged.

Release 0.18.2 right-aligns compact record-list text and keeps values in equal flexible columns. Long status sentences wrap inside their pills without horizontal scrolling. Three synthetic long-status list captures cover desktop Chromium and phone/tablet WebKit; run `node capture-admin-aligned.mjs` on the consumer fixture at port 4184. Staff and Control both adopt this release.

Release 0.18.1 restores side-by-side values in the compact Admin record list with responsive wrapping and no horizontal scrolling. Three refreshed synthetic list captures cover desktop Chromium and tablet/phone WebKit; run `node capture-admin-inline.mjs` from the consumer fixture on port 4184. Vertical virtualization and directory tables remain unchanged. Only Control upgrades.

Release 0.18.0 adds structured PortalHeader breadcrumbs and container-aware PortalBreadcrumb. Parent links collapse into a shared ellipsis menu when header space is constrained; full labels remain accessible and current-page context stays visible. Six synthetic header/menu captures cover desktop Chromium and phone/tablet WebKit. Run `node capture-portal-breadcrumb.mjs` from the consumer fixture on port 4184. Only Control upgrades; existing shell consumers retain their legacy breadcrumb slot.

Release 0.17.0 changes ChipField to wrapping chips, a growing 36px-minimum field and no chevron. A full-field native trigger remains separate from removal buttons. Six affected field/picker captures cover desktop Chromium and tablet/phone WebKit; capture with examples/consumer/capture-chip-wrap.mjs. Only Control upgrades.


Release 0.16.0 adds compact RadioField: 16px outlined indicators, native radio keyboard behavior, semantic disabled/invalid presentation, inline choices on larger screens and stacked choices on phones. Control adopts the registry release for General status. Three synthetic captures use `?radio-field` via `capture-radio-field.mjs`. Existing SurveyChoiceGroup is unchanged.


Release 0.11.2 stacks compact record-list values vertically and wraps names/status badges within the sidebar. Three reviewed list captures cover desktop Chromium and tablet/phone WebKit. Staff adopts the exact registry release; directory tables and other portal pins are unchanged. Capture with examples/consumer/capture-admin-stack.mjs on fixture port 4184.

Release 0.11.1 fills the sticky desktop Admin summary column to available height, fixes the summary/list switch outside the content scroller and removes transparent effects. Narrow panels remain compact. Nine reviewed mock captures cover summary, picker and editing. Staff adopts the exact registry release; other portal pins are unchanged.

Release 0.11.0 adds the optional LinkedList panel variant. The synthetic `?linked-list-panel` consumer shows panel and default cards plus a PagePanelLayout reference. Run `node capture-linked-list-panel.mjs` from `design-system/examples/consumer` with that fixture on 4184; it prepares only the three affected desktop Chromium/tablet and phone WebKit captures. Control alone adopts the verified registry release. Existing captures keep their provenance.

These five HTML pages are the canonical source for the public mirror at
`raisd-campus/portal-api-docs/design-system/`. They describe the **released**
`@raisd-campus/design-system` package and separate portal-owned compositions.
The PNGs contain mock data. The `captures.json` manifest records each capture's
viewport, owner, source route, package version, and owning portal commit.
Top-level provenance applies to entries unless an entry overrides its source
route, package version, or source commit.

Update this catalogue only when a shared token, public prop, visual state,
interaction, ownership rule, or portal-owned reusable pattern observably
changes. Edit only affected text, examples, and captures. An unrelated task or
an internal refactor without an observable change needs no edit.

For a shared package change, prepare captures from the package consumer fixture
or a portal running the candidate release with mock data. For portal-owned
examples, use the relevant portal feature route with mock data. Applicant entries use
`owner: applicant` and `applicantPortalCommit`; Student entries use `owner: student`
and `studentPortalCommit`. Mark uncommitted capture source state explicitly. Record the
release that consumers can install in `captures.json`; do not publish candidate
changes before their package release. Capture affected phone, tablet, and
desktop states when their layouts differ. Keep historical provenance for
unchanged images; update each changed image's metadata and source commit.

For `system/portal-shell`, start the package's `examples/consumer` Vite fixture
on port 4183 and run `node capture-shell.mjs <this-directory>/assets` from that
fixture. It writes mock phone, tablet, and desktop PNGs. Review all three before
updating their entries in `captures.json` and rebuilding the pages.

For `system/detail-field`'s `editableUndivided` example, use the same fixture
and run `node capture-detail-field.mjs <this-directory>/assets`. Review the
desktop and phone captures and update their manifest entries.

From the `control-plane` root, regenerate and validate:

```sh
# Edit docs/site-nav.yaml for Primary header, design-system strip, and site search index
python scripts/build-design-system-pages.py
python docs/sdd/_pages/build-dropdown-nav.py
python scripts/validate-design-system.py docs
```

Primary site navigation and search are **only** defined in [`docs/site-nav.yaml`](../site-nav.yaml). Do not hand-edit `<nav class="nav">` or search chrome in HTML — re-run the generator so control-plane and `portal-api-docs` stay identical. The magnifier opens a modal fed by `diagrams/site-search-index.json`.

Mirror the five HTML files, `styles.css`, `assets/`, and `captures.json` into
`portal-api-docs/design-system/`, then run
`python scripts/validate-design-system.py .` in that repository. Compare at
phone, tablet, and desktop widths before pushing. The navigation generator may
also update existing site pages when a top-level section changes.

The 6 October 2026 acceptance captures use shared 0.6.1 without a package change: Applicant confirmation belongs to Applicant, and the transferred Module Registration composition belongs to Student. They use only synthetic demo identities and evidence metadata.

The 0.6.2 release adds Popup footerAfterDismiss. New Applicant save-before-leaving captures use that released slot; historical images retain their original package provenance.

The 0.9.0 release adds shared AuthLayout fixture captures at phone, tablet and desktop widths. SSO consumes the exact published package; historical screenshots keep their original package/source versions.

Release 0.9.1 adds the optional AuthLayout brandingPlacement=above variant. New mock consumer captures show it at 375/768/1440; the historical inside-card captures retain their 0.9.0 provenance.


Release 0.10.0 adds the Admin record-flow family. With the synthetic consumer fixture running on 4183, run `node capture-admin-record-flow.mjs <capture-output-directory>` from `design-system/examples/consumer`. It prepares directory, summary, picker and editing captures at desktop Chromium and tablet/phone WebKit sizes. Review the images, then copy only the affected PNGs and metadata into this catalogue and its public mirror after exact package registry verification. Portal pins and the Staff Applicants page remain unchanged.

Release 0.10.1 corrects AdminTable quick scopes to use the shared TabbedPagePanel/divider and standard 36px filter/remove icon buttons. Staff Applicants adopts the release, shared page-heading spacing and a campus selector only when multiple campuses are available. Refresh the affected synthetic Admin captures at all three sizes; keep the historical versions of unrelated captures.

Release 0.10.3 adds a 16px horizontal inset around AdminTable empty, no-match and error feedback. With the synthetic fixture running on 4183, run `node examples/consumer/capture-admin-feedback.mjs` from the design-system root to verify desktop/tablet/phone insets and prepare the six feedback captures. This changes the table's composition, preserving the shared feedback components and populated/loading layouts.

Release 0.10.4 refines Admin record summaries: portrait, centered fields, natural-height sticky desktop sidebar, bounded transparent-edge scrolling, full-width optional actions and standard title sizing. Nine mock summary/list/edit captures cover desktop Chromium and phone/tablet WebKit; unchanged table captures retain historical provenance. Staff temporarily omits its review/reload footer.

Release 0.10.5 gives ContentSection title containers a 36px minimum height. Refreshed mock page/panel/sidebar/custom-heading examples verify that height at 1440/768/375px and preserve the existing 16px page and 12px sidebar gaps. All four portals adopt this release.

Release 0.12.0 adds an optional ContentSection label above its title/custom heading, retaining the growing 36px minimum header. With the synthetic consumer on port 4184, run `node capture-content-section-label.mjs` from `design-system/examples/consumer`. Refreshed desktop Chromium and phone/tablet WebKit captures show the Admissions label above Global alongside unchanged unlabeled examples. Only Control upgrades in this change.

Release 0.13.0 adds ChipField. With the synthetic consumer on port 4184, run `node capture-chip-field.mjs` from `design-system/examples/consumer`. Desktop Chromium and phone/tablet WebKit captures show fixed-height scrolling chips, standard Name alignment and empty/disabled/invalid examples. Only Control adopts the release; metadata edits remain local and unsaved.

Release 0.13.1 shares DropdownMenu presentation with ChipField and makes its complete field surface open the picker. Use `node capture-chip-menu.mjs` from the synthetic consumer on port 4184 for the desktop Chromium and phone/tablet WebKit open-picker captures. Existing closed-field and other captures preserve their previous package provenance. Only Control upgrades.

Release 0.14.0 adds AdminRecordWorkspace titleActions and AdminRecordPanel iconLabel. With the mock consumer on port 4184, run `node capture-admin-title-actions.mjs` from `design-system/examples/consumer`. Desktop Chromium and phone/tablet WebKit captures show the optional title action beside Close and a labelled workflow icon. Existing captures/consumers retain historical provenance; only Control adopts this release.

Release 0.15.0 adds opt-in ContentSection titleVariant=subheading (16px medium) without changing default typography, spacing or title-container minimums. Run `node capture-content-section-subheading.mjs` from the synthetic consumer on 4184. Three refreshed Content sections captures compare subheadings with unchanged defaults. Only Control upgrades.


Release 0.19.0 adds Switch, SortableList and FlowEditor. Run `node capture-flow-editor.mjs` from design-system/examples/consumer with its synthetic fixture on 4184. Three captures show linked tasks, capability icons, independent toggles, external handles and fixed steps at desktop Chromium and tablet/phone WebKit sizes. Control alone upgrades. Other capture provenance stays unchanged.


Release 0.19.1 refreshes the three FlowEditor captures for numbered steps, colored dot-separated categories, centered linked connectors and toggles preceding chevrons. Read-only cards remain inspectable; arrows remain disabled keyboard/tap alternatives. Only Control upgrades. Capture command and synthetic fixture remain unchanged.


Release 0.19.2 refreshes the three FlowEditor captures for blue number circles/white text, purple Applicant Action, drag handles without visible up/down arrows, and the shared ContentSection description. Existing unrelated captures retain their provenance. Only Control upgrades.


Release 0.19.3 refreshes FlowEditor for black number circles, Step category labels, equal 12px linked/parent gaps and shared surface-hover cards. Existing capture provenance and all other portal pins remain unchanged.


Release 0.19.4 refreshes FlowEditor captures for mandatory cards without switches/captions and centered external drag handles/fixed locks. Linked children remain attached without shifting the parent handle. Control alone upgrades.


Release 0.19.5 refreshes FlowEditor captures for concise muted category labels. The established black circles, required/fixed controls, hover and spacing remain unchanged. Only Control upgrades.


Release 0.19.6 restores normal Badge backgrounds, padding and radius in the AdminRecordPanel summary status slot. Compact lists retain colored status text. Three affected summary captures are prepared by examples/consumer/capture-admin-summary-pill.mjs; other captures retain their provenance. Control alone upgrades.


Release 0.19.7 fixes pointer-sort state synchronization and automatic display numbering, including linked steps. Run capture-flow-reorder.mjs from the consumer fixture for three reordered-group captures; desktop uses actual pointer drag and narrow captures use the keyboard alternative. Disallowed optimistic moves are prevented; other component presentation is unchanged. Only Control upgrades.


Release 0.19.8 aligns the Admin sidebar with the PortalPageContent bottom inset, preserving content-only scrolling and compact narrow layouts. Run capture-admin-bottom.mjs for three affected summary captures without footer actions; desktop capture asserts shell/summary bottom alignment. Only Control upgrades.
