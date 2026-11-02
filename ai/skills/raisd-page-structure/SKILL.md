---
name: raisd-page-structure
description: Automatically use when building or restructuring a Raisd Campus portal page, or reviewing page consistency, including Staff, Student, Applicant and Control. Apply the shared design system and established page, directory, record, form and workflow patterns without requiring the user to name this skill. Not needed for isolated copy fixes or backend-only work.
---

# Raisd Page Structure

Construct a cohesive Raisd page from the task, the record lifecycle and the released design system. A Lesotho/legacy-system reference or cloning exercise is not a prerequisite. External references may clarify a supplied requirement; they do not define undocumented policy or replace Raisd component ownership.

## Establish the page contract

Read the active repository's `AGENTS.md`, its owning canonical guidance in `control-plane/docs/ai/`, and the installed `@raisd-campus/design-system/docs/components.md` plus declarations for components being used. Locate sibling repositories from the actual workspace; see [source-map.md](references/source-map.md). Preserve existing worktree changes and data.

Identify the user role, task, route and parent, authorized data scope, read/create/edit states, and allowed actions. Choose an archetype before writing JSX:

| User task | Starting composition |
| --- | --- |
| Find and manage records | Page heading + `AdminTable` directory |
| Inspect/edit an Admin record | `AdminRecordWorkspace` + summary/list panel + detail/form panels |
| Read a personal or academic view | Existing portal identity/context + `PagePanelLayout` or `TabbedPagePanel` |
| Complete a focused form | Titled panel + `DetailField`/documented fields + `PageActionBar` |
| Perform a narrow related action | `Popup` with explicit fields, feedback and footer actions |
| Configure a versioned workflow | General settings + versions directory + exact version details/steps |

Produce a compact composition decision: shell owner; page identity; panel/tabs; sections; table/form/summary choice; actions; feedback/history; and navigation return context. Do not force every page to use every layer. If an interaction is unclear, inspect a comparable **Raisd** page of the same archetype; no external-system walkthrough is required.

Use [page-patterns.md](references/page-patterns.md) for the relevant archetype and component decisions. It covers tables and insets, record lifecycle, forms/popups, navigation, status, audit and feedback.

## Compose the hierarchy

- Reuse the existing `PortalShell`, shared header/sidebar, `PortalMain` and `PortalPageContent`. They own gutters, scroller, responsive drawer/rail and account presentation. Tiered navigation uses the released `PortalNavBranch` family.
- Give the page one heading owner. Ordinary routes usually compose `ContentSection type="page" plain`; `AdminRecordWorkspace` already owns its heading and Close action. Keep semantic heading levels coherent using documented slots.
- Use `PagePanelLayout` for an ordinary main surface and `TabbedPagePanel` for meaningful sibling views. One category is usually a default panel, not a decorative single-tab strip.
- Give each selected tab a recognizable content title or summary identity. `ContentSection type="panel"` supplies section hierarchy; a suitable `SummaryCard` can supply the identity without another identical title.
- Use `InnerSection` only for a real subgroup inside a larger panel. Its title owns the full-width divider. Use `titleBadge` and `actions` when needed; do not reproduce the header with local borders and negative margins.
- Use `SummaryCard` for compact identity, headline values or summary columns, and `DetailField` for labelled detail/form rows. Let components own their typography, padding, separators and responsive layout.

## Keep the important distinctions

- **Administrative directory versus ordinary table:** `AdminTable` manages a set of records with its search/filter/sort/pagination and feedback. `DataTable` displays a bounded collection or comparison. A semester's modules do not need an administrative toolbar merely because they are rows.
- **Table inset versus panel inset:** an embedded `AdminTable` owns its toolbar/rows/footer spacing. Use the documented no-inset panel composition around it; do not add a second padded wrapper. Default `DataTable` rows inside `InnerSection` use the shared edge-to-edge contract.
- **Compact status versus pill:** supply semantic `Badge` content. Compact Admin record lists intentionally retain coloured status text with transparent background and no padding. The Admin summary status slot preserves the supplied Badge chrome; other contexts retain their documented variants. Do not render plain status strings and lose meaning, or strip all badges globally.
- **Existing versus unsaved record:** start existing Admin records read-only and provide a contextual `Edit <Entity>` action. Create mode shows useful inputs and supported draft children; omit history and relationships that require a persisted parent.
- **History versus tab:** for auditable Admin records, use the workspace's independent history slot with `AdminRecordHistory`/`AuditTrail`. It remains present across tab changes. Use the shared empty state when there are no events; do not show history for an unsaved record.
- **Success versus unresolved error:** use the installed portal's shared confirmation pattern—semantic Toast where available, otherwise its established acknowledged status/confirmation view. Do not leave permanent generic save text above the panel, copy Toast locally or silently upgrade an older consumer. Keep actionable errors with their form/popup and preserve drafts. Empty, loading, error and unavailable are different states.
- **Admin versus Student navigation:** Admin workspaces normally use the header breadcrumb and contextual Close, without a duplicate inner trail. A Student nested-content archetype may legitimately use `ContentBreadcrumb`; follow its owning pattern.

## Actions, forms and navigation

Use contextual, visually Title Case labels through shared Button/record-action APIs: `Create Faculty`, `Edit Programme`, `Save Changes`, `Cancel`, `Close`. Do not transform saved values or acronyms. Managed-table creates use a primary button with a leading Plus in the left `AdminTable.actions` slot. Use Add wording for a child/relationship action where that is the established task language.

Horizontal action rows place secondary/dismiss actions before the primary completion action. Preserve the established stacked `AdminRecordActions` order instead of introducing local reorder CSS. Use `PageActionBar` for completion actions and omit it when empty. Use Popup footer slots for ordering and the component's focus, scrolling and pending-dismissal behavior.

Use real labels, field IDs, validation messages, pending/disabled states and documented read-only/editable field variants. A lone selector can use `DropdownSelect.label`; ordinary flags do not automatically need another boxed subgroup. Do not require a parent-wide Edit before an independently permitted child operation when the API supports a focused popup save.

Preserve the source module, parent record/tab, campus, exact version and relevant filter/stream selection through nested navigation, Close, Back and reload. Keep view state in the URL when established. Guard actual dirty departures, including router/history and native unload, without treating tab or summary/list switches as record departures. Do not add redundant campus selectors when host/context already supplies the authorized scope.

## Implement within ownership

Prefer released defaults and documented slots over portal CSS, copied component source or patches in `node_modules`. Check the consumer's actual pin: a sibling package source may expose APIs that are not installed. The 0.20–0.22 Academic work is evidence, not a permanent minimum version or permission to upgrade every portal.

Composition within the requested task can proceed. A shared/established component redesign requires the specific authorization in campus guidance; existing explicit authorization persists. Approved shared changes belong in `design-system`, with the required release/consumer checks. This skill itself grants no publication, deployment or unrelated mutation authority.

Keep UI terminology separate from stable IDs, contracts and authored values. “Study Plan” is the current Academic display term; that did not rename technical `curriculum` routes or rewrite saved names/history. Follow server permissions and record lifecycle; do not copy domain rules, approval steps or data from another feature just because its page looks similar.

## Verify proportionately

Check the changed page on representative phone, tablet and desktop layouts, with keyboard/focus, long content and overflow. Exercise its relevant loading/error/empty/read/create/edit/pending and nested-return states. Confirm that a successful save returns to the correct state and failed saves retain work when writes are in scope.

Run the affected repository gates and meaningful focused interaction checks. New Student routes/substantial shell work also follow the canonical Student page skill and its required gates. Smaller follow-ups use focused checks unless a real repository requirement applies; do not repeat unrelated full suites by default or expand the data scope. Group related changes, keep sources stable during browser checks, and retry demonstrated resource/readiness failures narrowly while preserving evidence.

When reusable behavior changes, update its canonical owning guide/local mirror and affected released catalogue examples as required by campus guidance. Isolated feature copy does not trigger a shared package release. Restart only a changed service when needed; hot reload is enough when it activates the change. Verify the actual served UI before claiming live success—static builds do not prove cached optimized dependencies refreshed.

Report what changed, what was actually checked, and any material limitation. Do not commit, push or deploy without the task's authorization.

## Extend the skill

The maintained source is `control-plane/docs/ai/skills/raisd-page-structure/`; the discoverable local installation is `$CODEX_HOME/skills/raisd-page-structure/` (normally `~/.codex/skills/raisd-page-structure/`). Keep their entrypoint, references and UI metadata aligned when extending this skill.

Add confirmed reusable decisions with their archetype, scope and source evidence. Put conditional detail in the relevant reference; keep this entrypoint concise. Distinguish a domain-specific requirement or one-off correction from a shared rule. Replace superseded guidance explicitly instead of accumulating contradictions. Validate the skill and its links after changes; do not modify personal memories or unrelated skills as part of maintenance.
