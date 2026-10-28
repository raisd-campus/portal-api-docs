# Admin record flow

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
