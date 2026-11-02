# Raisd page and component decisions

Read the sections relevant to the page being built. These are composition patterns, not a mandate to reproduce the Academic feature or a legacy application.

## Contents

- Page surfaces and summaries
- Directories and ordinary tables
- Admin record lifecycle
- Forms, actions and popups
- Navigation and scope
- Status, feedback and audit
- Versioned configuration
- Review examples and common mistakes

## Page surfaces and summaries

| Component | Use it for | Avoid |
| --- | --- | --- |
| `ContentSection type="page" plain` | Route identity and standard title-to-content rhythm | Another page heading around an `AdminRecordWorkspace` that already owns one |
| `PagePanelLayout` | A main content surface with standard content inset | An extra padded surface around an already framed/padded AdminTable |
| `TabbedPagePanel` | Distinct sibling views of the same context | A single decorative category, or creating a second complete page frame per tab |
| `ContentSection type="panel"` | A recognizable section heading and content group inside a panel | Repeating the same title that a SummaryCard already establishes |
| `InnerSection` | A meaningful smaller group such as a semester and its modules | Boxing every field, filter or boolean pair |
| `SummaryCard` | Compact identity, metrics, summary columns, supporting description/action | Replacing a table, whole form, or a specialized existing identity/accordion pattern |
| `DetailField` | Consistent labelled values and editable rows | Ad hoc label/value grids or repeated local typography |

The usual anatomy is the existing shell → page identity → main panel(s) → titled sections → meaningful subgroups/fields/table. Omit unnecessary layers. A standalone compact summary is a SummaryCard candidate; StudentSummaryCard, compact accordion metrics, chart cards and table/popup totals retain their specialized patterns.

Use component defaults for spacing. Do not independently assign raw gaps, arbitrary card minimum heights, colours, radii or heading sizes to approximate the design. Generic flex/grid composition is appropriate when it does not restyle an established component. If a component's documented geometry is wrong, fix that owning component under the authorized scope rather than hiding it with a local offset.

For a titled InnerSection, pass `title`, optional `titleBadge`, and optional `actions`. Its header divider spans the full width. With a default DataTable inside, row hover/selection reaches the inner-section edges while cell text keeps the shared inset. Do not nest another ContentSection merely to manufacture that same header.

## Directories and ordinary tables

### Administrative directory or related-record management

Use `AdminTable` for an authorized record set that benefits from administration controls. It owns search, filters, sorting, pagination, loading/error/empty feedback, toolbar and footer. Those controls operate on supplied rows; they do not imply server querying across unloaded pages. Follow the owning data contract for large/server-paged collections.

- Place a primary `Create <Entity>` button with a leading Plus in `actions`, the left toolbar slot. Search/filter controls use the built-in right area. Avoid an unrelated top-right section action for the same create operation.
- Embedded table tabs use `contentInset="none"` on the containing panel and a normal-inset content heading above the flush table, following the existing Admin composition. Do not wrap the table's toolbar/rows/footer together in another `p-4` container.
- Let AdminTableToolbar omit an absent action slot. Do not add empty placeholder action elements that create a wrapped blank row and excess top padding.
- Use column accessors for search/sort/filter and `renderCell` for display. A formatted Badge or stacked name must not break underlying code/name search.
- Use the component's row links/selection, selected state and keyboard access. Retain separately interactive controls instead of nesting links/buttons inside each other.

### Compact record picker

Use `AdminTable presentation="record-list"` inside the Admin panel for navigation among records. Supply only useful picker columns; this is the bounded virtualized list, not another paginated directory. For code-bearing Academic-style records, stack the muted label-style code above the linked name. Long names and status text must wrap.

Supply a semantic Badge for status. The compact-list component intentionally removes its fill/border/padding while retaining semantic text colour; plain strings can lose that mapping. This treatment is specific to compact lists. `AdminRecordPanel.status` preserves the Badge presentation supplied to the summary slot.

### Bounded display/comparison table

Use `DataTable` for a semester outline, comparison, breakdown or other bounded data collection. Keep the displayed collection intact instead of adding administrative search and pagination without a user task that needs them.

- Use `compactCards` when labelled records work better on phones; use the documented minimum-width/contained-scroll behavior when columns must remain comparable. Never widen the entire page to fit a table.
- For interactive rows, supply `onRowSelect` and a useful `getRowLabel` (or the supported link behavior). Use the shared hover and keyboard behavior so users do not need to hit a small name-only target.
- A semester/related outline can compose `InnerSection(title, titleBadge, actions)` → DataTable. Academic semester credits use a blue Badge beside the title and reflect the displayed applicable rows. Do not turn every numeric value into a blue pill.
- **Empty-state detail:** DataTable's `emptyMessage` may be a plain paragraph. When the page requires the designed valid-empty surface, explicitly compose shared `EmptyState` for zero rows, as the Study Plan does. AdminTable and AdminRecordHistory already own their designed feedback.

## Admin record lifecycle

Compose `AdminRecordWorkspace`, `AdminRecordPanel`, `AdminRecordActions`, `AdminRecordDialogs` and `useAdminRecordFlow` from `system/admin-record-flow`. The workspace owns its title/Close, sidebar geometry and independent main content. Do not add a second breadcrumb/heading above its content to recreate a different portal's nesting.

| State | Main presentation and action decisions |
| --- | --- |
| Loading | Same workspace geometry, labelled busy/skeleton content |
| Read existing | Summary/list panel + read-only details; permitted contextual `Edit <Entity>` |
| Edit existing | Same mounted editor; Save Changes and Cancel; guard genuine departures |
| Create | Useful new-record fields and supported draft children; contextual Create action; no history |
| Pending | Disable conflicting actions and duplicate submission; keep context/draft visible |
| Failed read | QueryErrorState/retry or workspace error; do not pretend it is an empty catalogue |
| Failed save | Keep draft, error and retry context; do not return to read mode |
| Saved | Acknowledged baseline/read model update, correct route and the installed portal's confirmation pattern |
| Not found/forbidden | Honest unavailable/access state, not fabricated record contents |

The consumer owns values, baseline, dirty calculation, validation, permissions, persistence and routing. A request being sent is not save success. Summary/list switching must keep the main form mounted. Reverted values should stop being dirty.

For create mode, omit relationships or views that require an existing parent ID; this is why Programme creation omits the persisted Study Plan directory. A child editor supported inside the parent draft can still be useful before save—for example draft accreditations. Do not make “no tabs in create” or “every child is disabled until parent save” a universal rule.

Independent child operations may be offered in read mode when authorized and supported by the contract. The accreditation pattern uses a focused popup save and updates the acknowledged parent/read baseline; it does not require a parent-wide Edit. Revision checks, stable retry IDs and failed-draft retention belong to that write flow, not a cosmetic substitute in the UI.

Auditable existing records compose an independent `history` slot after the active panel. `AdminRecordHistory` supplies the titled panel with AuditTrail or EmptyState. History remains present when tabs change and is absent from unsaved records. Not every informational page needs a new audit feature.

## Forms, actions and popups

### Fields

Use current `Input`, `DropdownSelect`, `DatePicker`, `Textarea`, `ChipField`, `RadioField` and file components as the task requires. Use `DetailField`'s documented read-only/editable variants; use `editableUndivided` only when the form deliberately groups rows without dividers. Supply persistent labels, IDs, errors and appropriate disabled/read-only semantics. A placeholder is not the label.

Standalone selectors may use `DropdownSelect.label` above the trigger. A single Stream dropdown does not need another InnerSection. Ordinary flags can remain normal detail rows. Introduce a subgroup when its meaning, not just its field count, justifies one.

Use original files and authorized preview/download URLs with the shared file components. Components do not supply upload persistence or permissions. Do not invent values, descriptions, academic rules, fees or approval policy from another record.

### Action placement and copy

| Context | Placement/copy |
| --- | --- |
| Managed collection | Primary `Create <Entity>` + Plus in AdminTable's left action slot |
| Existing Admin record | `recordLabel` supplies contextual `Edit <Entity>`/Create labels |
| Normal form completion | PageActionBar, secondary/dismiss first, primary last |
| Narrow child operation | Popup with Cancel before its primary completion action |
| Read-only popup | Close, without a misleading Save |
| No available completion action | Omit an empty PageActionBar |

Shared Button variants own visual Title Case. Do not uppercase or title-case authored names, backend values or acronyms to imitate buttons. Reserve Add for an established child/relationship action such as Add Module or Add Semester; do not rename all such actions merely because directory records use Create.

Horizontal secondary-before-primary ordering is not a reason to restyle the established stacked AdminRecordActions, which places Save/Create before Cancel. Preserve component defaults for the relevant orientation.

PageActionBar can extend its divider through the documented `edgeToEdge` option when appropriate to its enclosing panel. Do not reproduce the divider with portal CSS or pad empty action bars into a visible gap.

### Popup boundaries

Use `Popup` for a bounded related action, short form, confirmation or detail. A large navigable/versioned workspace usually belongs on a route. Use its documented width, scrolling, dismiss and focus-return behavior. Pending writes must not dismiss midway and leave the outcome ambiguous.

Popup's default dismiss copy is not appropriate to every task: provide Cancel for edits/confirmations and Close for read-only information. `footer` appears before the dismiss control; `footerAfterDismiss` places a trailing primary action after Cancel. Do not hand-build another footer or duplicate dismiss controls.

## Navigation and scope

- Use shared tiered menu components and permission-aware destinations. Use `PortalNavBranch` for a real main module with children and normal leaf items for destinations. The shared family owns desktop disclosure, tablet flyouts, the phone drawer, Escape and focus return; do not rebuild those behaviors in the page. Do not create a tier merely for decoration.
- In Admin record workspaces use header breadcrumbs and contextual Close. In Student nested-content pages, follow the established pattern that may retain the parent panel and use `ContentBreadcrumb`. Share the correct return behavior without copying breadcrumb placement across archetypes.
- Preserve actual source context: module, parent ID/tab, campus, exact version and relevant stream/filter. Returning from a nested Module to a published Study Plan must not silently open today's working draft.
- Use established URL-backed views so Back/Forward/reload remain coherent. Keep the originating navigation section active where the route's return context requires it.
- Guard dirty departures once per destination through the owning controller/router adapter. Native unload protection does not automatically cover React Router history. A same-record tab or summary/list switch is usually not a departure.
- Avoid redundant campus selectors when authorized host/context already fixes the scope. Genuine multi-campus operations and Control campus assignments still need their real scope controls. Do not hard-code the current Demo campus.
- Respect direct-route authorization and the API's allowed actions. Hiding a control is not server enforcement. Keep requests and late responses bound to their actual record/scope when those change.

## Status, feedback and audit

Status needs visible text and semantic colour. Reuse the owning feature's established state mapping; Draft, Pending and Inactive do not acquire new meanings just to match an Academic screenshot. Use shared variants/tokens rather than local hex values. Compact-list text and full Badge contexts are intentionally different.

Use shared `ToastProvider`/`useToast` where the installed release supports it. A shell-level provider survives create-to-detail navigation. Successful saves use the default success tone; error/info/warning variants express their actual meaning. Toasts float at the bottom-right and dismiss after the shared duration, with close, hover/focus pause and accessible announcement behavior. Let the component own compact height and touch hit targets. Do not replace persistent actionable form errors with an ephemeral toast only.

For an older consumer without Toast, reuse its established acknowledged status/confirmation view; a server-confirmed transition visibly changing the request to Cancelled can supply confirmation without a new notification component. Keep actionable failures in the owning form/popup. If the task specifically needs transient notifications, assess the released-package upgrade and its consumer impact under the normal authorization rules. Do not silently upgrade other pages or implement a portal-local copy to satisfy this skill.

Keep loading, valid empty, no matches, read error, missing record and denied access distinct. Use EmptyState and QueryErrorState where appropriate, and retain recognizable page geometry. Do not show a zero-record empty state while a request is still loading. Clear filter guidance belongs to no-match feedback; absent backend data is not an invitation to invent a sample record.

AuditTrail receives actual recorded entries: stable IDs, real actor, event time/time zone, action, reason and recorded before/after values. Present readable field labels and nested business changes. Omit redundant revision/update bookkeeping from the business comparison when appropriate, while retaining the underlying event and actor/time context. Never reconstruct a historical difference from today's record or relabel raw authored values as if they had been changed. Follow the contract's distinction between no-op changes and unavailable legacy detail.

## Versioned configuration

Use the existing Control University Flows archetype when applicable: a configuration workspace with General Settings and Versions, followed by an exact published/draft version workspace. The steps belong to the selected version, not a duplicate global section outside Versions. Keep published version, editable draft and applied version visibly distinguishable.

Affected Modules lists actual top-level modules grouped by portal. Programme Selection, New Enrolments and a specific approval action are capabilities, not automatically module names. Preserve the real navigation taxonomy.

Use the current FlowEditor/FlowStepCard/SortableList APIs when their behavior matches the task. Do not copy Academic's mandatory independent review into an unrelated workflow. Required steps, reorder rules, assignments, publish rights and applicability come from its contract. Configuration/role assignment does not itself grant access.

## Review examples and common mistakes

### New Staff catalogue, no legacy reference

A room catalogue can use the existing Staff shell → ordinary page heading → AdminTable with Create Room, code/name/status and its controls. Room details can use AdminRecordWorkspace → summary/picker → a default or meaningful tabbed panel with General Settings and labelled fields. Add a relationship table only if its data and task exist. Do not invent a room booking/approval policy or add a second campus selector just because the Academic example had campus-scoped records.

### New nested Student detail

Use the Student identity/context, owning Academic/Profile panel pattern and actual selected record. Preserve the parent tab/return scope. An inner breadcrumb may be appropriate here even though the Admin workspace avoids it. Keep the narrower page's loading/error and summary geometry consistent with its successful content.

### Mistakes to catch before delivery

- An AdminTable sits inside a second padded panel, so its rows/toolbar no longer align.
- A DataTable has unwanted directory controls or shows a plain paragraph instead of the required EmptyState surface.
- A selected tab has no content identity, or every layer repeats the same heading.
- A filter or boolean pair gains a decorative InnerSection with no grouping purpose.
- A generic Edit action obscures what will be edited; a create button lacks its Plus or is outside the table action slot.
- Compact record statuses become uncoloured strings, or a global override strips pills from unrelated summary contexts.
- Success text remains permanently above the page; a save error clears the draft.
- History disappears on tab change, appears before the record exists, or invents before/after data.
- A nested route loses the original tab/version/filter, or direct navigation bypasses authorization.
- A page's layout is forced to match an unrelated archetype, or a newer unpublished component API is used against an older consumer pin.
- Browser results are called green while UI source/dependency rebuilds are still reloading the test page. Freeze the tested source, retain failures, and use bounded exact retries for demonstrated environment failures.
