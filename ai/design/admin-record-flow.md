# Shared Admin record flow

## Shared record presentation — 0.21.0

Release 0.21.0 owns Button title-case visual treatment through the shared button variants, preserving original source strings and acronyms. AdminRecordActions accepts optional recordLabel for contextual Edit/Create labels and uses Save Changes; omitted recordLabel retains generic actions. AdminRecordWorkspace accepts an optional history slot after its independent content. AdminRecordHistory composes a titled panel with recorded AuditTrail entries or shared EmptyState; portals omit it for unsaved records. ContentSection titleBadge places a supplied pill beside its heading without changing heading identity. DropdownSelect label adds an associated muted label above the standard trigger; omitted labels retain existing markup. Only Staff adopts this release in the Academic follow-up.

## Ownership and delivery

The `@raisd-campus/design-system` 0.10.0 family at `system/admin-record-flow` adapts the owner-provided `D:/Coding/cms/packages/ui` table, record panel and workspace interactions to the current Raisd package. The source CMS and existing `DataTable` are unchanged. The initial release adds library presentation and a synthetic consumer example. Its first portal adoption is the Staff Applicants table (Staff pin 0.10.1), reading the existing authorized campus admissions queue without record navigation or review/write controls. Other portal pins remain unchanged. Library release and local portal adoption do not establish a hosted deployment or Live CMS persistence.

## Title actions and entity icons - 0.14.0

AdminRecordWorkspace.titleActions adds actions before Close, distinct from the sidebar actions slot. AdminRecordPanel.iconLabel names a supplied entity icon when no photo is provided. Existing consumers remain unchanged when omitted. Control uses both for the local-only Edit Flow workspace, including a summary/list sidebar and right-side default content sections; persistence remains deferred.

Verification: shared 0.14.0 passed typecheck, 56 unit cases, consumer build, 58 Chromium and 38 phone/tablet WebKit cases. Control lint, 16 unit cases and production/type build passed, followed by 50 workflow browser cases plus focused layout/view-switch and aborted-request checks (52 unique Chromium/WebKit cases overall). The final layout checks verified default 16px section spacing, desktop sticky sidebar, contained phone stacking and three independent portal panels. Saved metadata, scheduled/unassigned versions, local-edit retention/reset, summary read errors/retry, permissions and reference navigation passed. All 287 installed package files match the verified registry archive. No API/policy/application mutation or hosted deployment is included.

## Compact record values - 0.11.2

AdminTable presentation="record-list" stacks each record's supplied values vertically, retaining their order and semantic cells. Names and shared badges wrap within the available width. Directory tables keep their existing column layout. Measured virtual scrolling, selection, full-row links and guarded navigation are unchanged. Staff adopts this patch; other portal pins remain unchanged.

## Summary scrolling - 0.11.1

Desktop AdminRecordWorkspace sidebars fill remaining PortalMain height and remain sticky below the header. The summary/list switch stays fixed; only summary content or virtualized list rows scroll. Optional actions remain outside the scroller. Transparent masks are removed. Narrow layouts retain a compact, height-bounded panel above the form and actions below the form. Staff adopts this patch; other portal pins remain unchanged.

## Summary refinement - 0.10.4 (historical)

AdminRecordPanel accepts presentation-only `photo: {src, alt}`. Its 96px circle uses supplied portrait bytes with a person fallback on missing/broken photos. Summary labels/values are stacked and centered. Workspace titles use the same `type-section` as standard page content.

Desktop sidebars retain natural content height, stick below the measured PortalHeader and bound their internal viewport to the available PortalMain height. Transparent top/bottom masks track real scroll edges; keyboard scrolling and hidden-scrollbar behavior match the shared scroll treatment. Narrow layouts cap the summary at 50dvh above the form; optional actions follow the content. Summary/list and footer buttons are full width. Omit workspace actions to remove the footer, without an empty strip. The Staff Applicants screen temporarily omits review/reload actions at the owner's request; summary/list switching, documents, history and immutable application content remain.

The portal fetches the owned passport photo with authenticated evidence delivery and disposes its object URL. Shared components contain no admissions queries or authentication. Only Staff adopts 0.10.4; no other portal pins or application data change.

## Components

| Export | Contract |
| --- | --- |
| `AdminTable<Row>` | Complete supplied rows; column accessors/renderers; stable row IDs; labelled search; optional quick scope, linked-row renderer, controlled table state, loading/error/retry; default directory or compact `record-list` presentation. |
| `AdminTableToolbar`, `AdminTableFooter` | Reusable search/actions/filter slots and rows-per-page/filtered-total/pagination. Default page size 10; options 10, 20, 50. |
| `AdminRecordWorkspace` | Title, Close callback, controlled mode, panel/actions/content slots, loading/error/retry. Fits inside the existing PortalShell without a hard-coded viewport-height subtraction. |
| `AdminRecordPanel` | Create guidance, record summary and continuously scrolling record-list views. Both views stay mounted to preserve state. |
| `AdminRecordActions`, `AdminRecordDialogs` | Read/Edit/Create actions, optional typed deletion, unsaved-change decisions and save/delete failure presentation using current shared controls. |
| `useAdminRecordFlow` | Router-independent interaction state. Receives stable record ID, caller-calculated dirty state and save/discard/cancel/delete callbacks; returns mode, panel view, busy state, guarded destinations and dialog controls. |

The package contains no portal data contracts, authentication, router imports, queries, permissions, business validation or storage. Omit edit/delete controls when the portal does not permit those actions; the API still enforces authorization.

## Table behavior

From 0.10.6, quick scopes accept optional allPosition="last" to place All after the supplied status options. The default is All first. This changes tab ordering only, preserving the selected scope and filtering. Staff uses this option with Pending Review first.

Columns are the source for display, search, sort and filter choices. Display/action-only columns explicitly disable applicable features. Text matching trims values and ignores case. Text operators are contains, does not contain, is, is not, starts with, ends with, is empty and is not empty. Select columns support the equality and empty-value operators; choices derive from all supplied rows. Rules use AND. Filters edit a draft: Apply commits, Clear all clears and closes, and Cancel/Escape discards draft edits. Incomplete rules cannot be applied. Choosing a named quick scope clears advanced rules on that column; applying rules on that column clears its quick scope. All alone preserves other rules.

Search/scopes/filters run before numeric-aware label sorting and pagination. Changed search/filter/scope/sort/page size returns to page one; reduced row counts clamp the visible page. The compact picker accepts only relevant columns, hides its semantic headers, omits scopes/pagination, and uses TanStack Virtual with dynamic measurement and bounded DOM rows. Search/filter changes reset list scrolling. Pass `state` with `onStateChange` when the directory must survive unmounting.

This is client-side processing of a complete authorized row collection. Do not pass one server page and present its filtered total as a global total. Server-side query contracts are outside this release.

## Record modes and safeguards

An existing record opens in `read`; Edit changes to `edit`. A new record starts in `create`. Read mode should compose current `DetailField` read-only variants, not disabled editable inputs. The consumer owns editable values and their last loaded/saved baseline. Compare those values to calculate dirty; reverting every value makes the record clean.

`onSave()` returns `{status: "saved"}`, `{status: "invalid"}`, or `{status: "failed", message}`. Return saved only after the backend acknowledges success, and update the baseline and selected record. Invalid keeps inline field feedback and write mode. Failed/rejected callbacks retain the draft and show an action-error popup. The controller serializes save/delete calls and locks dialog dismissal while pending. It changes to read only after success.

Use `requestLeave(destination)` for Close, record selection, and other navigation. Dirty forms, including create, offer Save, Keep editing and Discard. Save continues the captured destination only on success; failure/validation stays on the current draft. Discard invokes the caller's reset callback before navigation. Escape and dismissal mean Keep editing. Switching summary/list alone does not leave the record and retains its draft. Selecting the current record returns to summary; selecting another record must use requestLeave.

Delete is absent without both a callback and confirmation configuration. The typed reference compares trimmed, case-insensitive values; pending deletion cannot be dismissed. Successful deletion invokes onDeleted; failure preserves the record and shows its message. Dependencies, audit, authorization and transactional behavior belong to the API.

The hook installs native beforeunload protection while dirty. It does not intercept router history automatically. A consuming React Router adapter must use its own blocker: pass its pending `blocker.proceed` into `requestLeave`, supply `onNavigationCancelled: () => blocker.reset()` for Keep editing and unsuccessful saves, track each pending location once, and avoid invoking both independent navigation paths. Use exactly one guard for each destination. Do not put a React Router dependency inside the shared package.

## Responsive layout and styling

0.10.3 adds a shared 16px horizontal inset around AdminTable empty, no-match and error feedback, including compact pickers. The inset belongs to AdminTable rather than EmptyState/QueryErrorState, so their other consumers retain their default geometry. Populated tables, loading states, toolbar/footer spacing and workflow behavior are unchanged. Staff adopts this patch; Applicant and Student remain on 0.10.2 and Control on its existing pin.

0.10.1 adopts the existing `TabbedPagePanel` for quick scopes, with its navigation divider, linked tab panels, keyboard selection and narrow-width scrolling. Search/filter controls and table content sit below the divider. Advanced-filter and remove-rule actions use standard 36px shared icon buttons. The public toolbar accepts optional children so composed table/footer content belongs to the selected scope panel. Consumers use `ContentSection type="page" plain` for page headings and standard spacing, and omit redundant single-campus selectors. No shared primitive or existing DataTable is redesigned.

The workspace uses available content width: two columns from 56rem, with an 18rem panel column, and a compact stacked panel below that threshold. On narrow screens, actions follow the form. The compact list has a bounded `min(50dvh, 24rem)` scroll viewport. Directory tables with a minimum width scroll horizontally inside their region rather than widening the page. Semantic surfaces, body/label/title utilities, current fields/buttons/popups and spacing come from the current design library; no legacy palette, typography or illustration assets are imported.

## Library example and checks

`design-system/examples/consumer/?admin-record-flow` provides a synthetic directory and record editor. Add `&record=record-1` for the record workspace, `&large` for 5,000 picker rows, `&readonly` for omitted edit/delete controls, or `&state=loading|error|empty`. Example controls simulate validation, save and delete failures without network writes. Example records reset on reload.

Verification covers the source filter operators, pagination/sorting/scopes, dirty and reverted values, pending write deduplication, navigation outcomes, native unload, original-record preservation on failures, typed deletion, virtualized lists, responsive layouts, keyboard/focus and accessibility. Use the shared full package gate plus the dedicated phone/tablet WebKit fixture suite. Catalogue captures contain only mock data and must refer to the published release's exact integrity.


## Local release evidence — 21 October 2026

0.10.1 correction: published the exact registry-verified archive and upgraded only Staff. Shared checks passed (44 unit, 47 Chromium and 16 phone/tablet WebKit tests), including linked scope tab panels, divider and standard icon sizing (36px desktop, existing 44px coarse-pointer targets). Staff lint, 80 tests and production build passed. Synthetic Applicants composition checks passed at 1440/768/375px for heading style, single-campus selector omission, filters, scopes, pagination, focus and contained scrolling. Fifteen updated synthetic Admin captures include the filter popup; catalogue metadata uses the published archive integrity and explicitly records uncommitted source provenance. Restarted only the local Staff dev server through the existing launcher to refresh optimized dependencies; no portal deployment, application mutation, commit or push.

Published `@raisd-campus/design-system@0.10.0` using the approved package publisher; exact archive integrity verified against GitHub Packages. Full package gate passed: 44 unit checks, 47 Chromium checks and 16 WebKit checks at 375px/768px. The initial unrestricted 10-worker run timed out on one existing Auth fixture; the complete gate passed with CI's two-worker configuration, without changing Auth components or tests. Student Portal compatibility bundling used candidate subpath aliases with host dependency deduplication and an ignored output directory; no portal dependency pin or installed portal package changed. Existing DataTable source is unchanged.

Prepared 12 synthetic catalogue captures (directory, summary, picker, editing at 1440/768/375). The library example remains available on the local fixture port 4183. No source commits, Git pushes, portal deployments, CMS/database writes or Staff Applicants UI changes are included.


0.10.3 local verification (22 October 2026): shared gate passed 44 unit, 47 Chromium and 16 phone/tablet WebKit checks; Staff lint, 80 tests and production build passed. Synthetic empty/error/no-match feedback has computed 16px left/right padding at 1440/768/375px without page overflow. Six reviewed mock captures and exact registry integrity accompany the catalogue update. Restarted only Staff locally; no authentication, application data or hosted deployment changes.

0.10.4 verification: 44 shared unit checks, 48 Chromium and 18 phone/tablet WebKit checks passed, including natural height, 96px portrait, field alignment, measured sticky offset and scroll-edge masks. Staff lint, 90 tests and production build passed. Published archive integrity is verified in GitHub Packages; only Staff pins 0.10.4. Nine reviewed mock summary/list/edit captures update the canonical catalogue and mirror. Current Demo application data is unchanged.

0.10.6 verification: shared gate passed 44 unit, 48 Chromium and 18 WebKit checks. The All-last variant preserves selection/filter behavior at 1440/768/375px. Staff lint, 90 tests and production build passed after adopting the registry-verified release. Three reviewed synthetic table captures update the catalogue and mirror. Status colors in Staff reuse shared Badge variants; no application data changes.


## Inline wrapping record lists — 0.18.1

Compact record-list values now sit side by side and wrap onto further lines when needed, replacing the vertical-only 0.11.2 layout. Text and pills stay within the panel without horizontal scrolling. First-column links, selected rows, search/filtering and measured virtual scrolling are unchanged. Directory tables retain their columns and horizontal-scroll behavior. Control alone adopts this patch.


0.18.1 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Compact-list coverage verifies side-by-side short values, wrapped long values, contained widths and scrolling to the final virtualized row. Control lint, 19 unit cases, type/production build and two focused summary/list Chromium/WebKit cases passed. All 293 installed package files match the verified registry archive. Three refreshed list captures and both 250-capture catalogue mirrors validate. Only Control restarted; no API/data/policy changes or hosted portal deployment occurred.


## Right-aligned compact columns — 0.18.2

Compact record-list values remain side by side in equal flexible columns. Cell, link and status-pill text is right-aligned; long status sentences wrap inside their allocated width. No horizontal scrolling, directory table or virtual-scroll behavior changes. Both Staff and Control adopt this patch.


0.18.2 verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Six Staff Chromium/WebKit cases at 375/768/1440px verify side-by-side columns, wrapped long pills, right-aligned text, contained scrolling and accessibility; two Control summary/list cases passed. Staff adds a screen-reader-only details heading so hiding the summary does not skip heading levels. All 293 installed package files in each portal match the verified registry archive. Three refreshed list captures and both catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


## Summary-column status text — 0.18.3

Entry names/links are left-aligned, while compact-list status cells stay right-aligned. Summary status and list status badges retain semantic color but have no background, border or padding. This presentation is owned by the summary-column pattern; Badge defaults and directory badges remain unchanged. Wrapping, selection and virtualization are preserved. Staff and Control both upgrade.


0.18.3 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Eight focused Chromium/WebKit portal cases verify left-aligned entry names, right-aligned wrapping statuses, transparent/unpadded summary/list statuses, selected navigation and accessibility. All 293 installed package files in each portal match the verified registry archive. Six affected captures and both 250-capture catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


## Muted pagination — 0.18.5

AdminTableFooter uses secondary for the active numbered page and ghost for other pages and previous/next. This replaces the strong primary fill with a neutral outline while retaining aria-current and all pagination behavior. Staff and Control adopt the patch.

## Additional record integration reference

The following API/composition reference is retained from main. Current released defaults and newer sections above take precedence over historical version notes.


Canonical guidance for the shared `system/admin-record-flow` family shipped in
`@raisd-campus/design-system` (current released pin documented in
[component-library.md](component-library.md); full catalogue in
[package-catalogue.md](package-catalogue.md)). Exact props remain in the installed
TypeScript declarations.

## Ownership

The package owns presentation: directory tables, compact record lists, workspace
layout, summary/list switching, sticky desktop sidebars, dialogs and action bars.
Portals own values, baselines, dirty calculation, validation, permissions, record
persistence, routing, authenticated photo delivery and object-URL cleanup. The
family is additive; it does not replace `DataTable` or change existing portal
compositions until they deliberately upgrade and adopt it.

Import from `@raisd-campus/design-system/system/admin-record-flow`.

## Surfaces

| Export | Role |
| --- | --- |
| `AdminTable` | Column accessors for search, sort, quick scopes and advanced filters over the complete authorised row set. Loading/error/retry/empty states. Directory pagination (10/20/50; default 10). `presentation="record-list"` uses bounded virtualized continuous scrolling without pagination or quick scopes. Optional `rowLink` and controlled `state`/`onStateChange`. |
| `AdminTableToolbar` / `AdminTableFooter` | Same presentation for composed lists: action slots, labelled search, filtered total and pagination. Table state never implies backend querying of unloaded rows. |
| `AdminRecordWorkspace` | Title, controlled mode, Close callback, panel/actions/content slots, loading/error/retry. Optional `titleActions` render before Close (from 0.14.0). |
| `AdminRecordPanel` | Create guidance, summary and record-list views without unmounting either view. Optional `iconLabel` when no photo is supplied (0.14.0). Optional `photo={{src, alt}}` for a 96px circular portrait (0.10.4). |
| `useAdminRecordFlow` | Starts existing IDs in read mode and null IDs in create mode. Save returns `{status:"saved"}`, `{status:"invalid"}` or `{status:"failed",message}`. `requestLeave` guards dirty navigation; `onNavigationCancelled` resets blocked router navigation. |
| `AdminRecordActions` | Edit (optional), Save/Create, Cancel and optional Delete. |
| `AdminRecordDialogs` | Shared Popups for unsaved decisions, typed confirmation and action failures. Dismissal locked while writes are pending. |

## Layout behaviour

- Available content width: compact panel above the form/actions below 56rem; two-column layout from 56rem.
- From **0.11.1**, desktop sidebars fill remaining `PortalMain` height and stay sticky below the header. Summary/list switch and optional action footer stay fixed; only summary content or virtualized list rows scroll.
- From **0.19.8**, `AdminRecordWorkspace` measures `PortalPageContent` bottom padding for desktop sidebar height so it aligns with the shell bottom gutter; outside that host it falls back to the section gap.
- Compact picker capped at `min(50dvh, 24rem)` with dynamically measured virtual rows.
- From **0.18.3**, compact `record-list` entries keep values side by side in equal flexible columns (name left, status right). Compact-list badges keep semantic text colour without background/border/padding. From **0.19.6**, the summary status slot preserves supplied Badge chrome.
- From **0.18.5**, `AdminTableFooter` current page uses secondary Button (neutral outline); other page buttons stay ghost.
- From **0.10.6**, quick scopes accept optional `allPosition="last"`. From **0.10.1**, quick scopes compose `TabbedPagePanel`.
- From **0.10.3**, empty/no-match/error feedback has a shared 16px side inset aligned with toolbar/footer.

## Consumer rules

- Compose page headings with `ContentSection type="page" plain` (and optional label/description from later releases).
- Advanced-filter and remove-rule actions use shared `Button size="icon"` (36px; 44px coarse-pointer).
- Delete requires a callback plus label/value confirmation; server authorisation stays with the portal.
- Synthetic demonstration: package consumer `?admin-record-flow` (with `&record=`, `&large`, `&readonly`, `&state=loading|error|empty`, `&title-actions`).

## Related shared controls often composed with this flow

- `ChipField` (`ui/chip-field`) — searchable multi-select chips (0.13.0+; 36px field and full-field toggle from 0.17.0).
- `RadioField` (`ui/radio-field`) — compact Draft/Published-style choices inside `DetailField`.
- `PortalBreadcrumb` / `PortalHeader.breadcrumbs` (0.18.0+) — structured header trails with overflow menu.
- `FlowEditor` / `SortableList` / `Switch` (0.19.0+) — predefined admissions/workflow step editors when the portal owns flow rules.
