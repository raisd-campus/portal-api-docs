## Field alignment and input overflow — 0.26.0

DetailField adds optional description/descriptionId helper slots aligned with the input/value and labelWidth="wide" (192px); defaults retain 160px labels and narrow-container stacking. Align a whole form group with the same width. Text-like Input values/placeholders use ellipsis and measured overflow tooltips: hover reveals clipped content, read-only focus provides keyboard guidance, and editable focus suppresses tooltips so editing and picker/popup Escape remain unchanged. Password, file, number and date input values never appear in overflow tooltips. Native disabled/read-only/ref/form behavior is preserved. Control uses this exact registry release for Version Settings and payment popup fields. Applicant, Student, Staff, Keychain and the SSO sign-in UI now also pin the released 0.26.0 package; the retired Staff checkout remains unchanged. Adoption uses shared field defaults without portal overrides or unrelated layout changes.

# Shared component library

## Semantic confirmations and balanced toolbars - 0.22.1

Toast accepts optional success/error/info/warning variants (success by default), with an opaque semantic tint, border and matching icon. Centered controls and compact padding produce a 44–46px one-line card that grows naturally for wrapping. ToastProvider/useToast expiry, keyboard dismissal, pause and navigation retention remain unchanged. Search-only AdminTableToolbar omits its empty actions wrapper, removing the extra narrow-layout top gap while preserving real-action layouts. Compact record-list Badge statuses retain semantic text color with transparent backgrounds and zero padding, as before. Staff adopts this patch; no other consumer pin changes.

## Record feedback and inner section tables - 0.22.0

AuditTrail renders recorded changes in responsive Field / Before / After comparisons with wrapped values and stacked phone labels. Actor and event time appear once; adapters supply readable field labels and recorded business values rather than technical revision stamps. InnerSection accepts title, titleBadge and actions; its title header has a full-width bottom divider, while contained default DataTable rows extend to its horizontal edges with 12px cell insets. Titleless content and other table contexts retain their presentation.

ToastProvider/useToast from system/toast own transient bottom-right confirmations: toast(message), default 4000ms expiry, keyboard close, and paused expiry during hover or focus. Mount the provider around the portal shell to retain notifications after navigation. Form errors remain in the owning form. Curriculum previews compose existing SummaryCard and default blue Badge. Only Staff adopts the exact released 0.22.0 package for this follow-up.

## Shared record presentation — 0.21.0

Release 0.21.0 owns Button title-case visual treatment through the shared button variants, preserving original source strings and acronyms. AdminRecordActions accepts optional recordLabel for contextual Edit/Create labels and uses Save Changes; omitted recordLabel retains generic actions. AdminRecordWorkspace accepts an optional history slot after its independent content. AdminRecordHistory composes a titled panel with recorded AuditTrail entries or shared EmptyState; portals omit it for unsaved records. ContentSection titleBadge places a supplied pill beside its heading without changing heading identity. DropdownSelect label adds an associated muted label above the standard trigger; omitted labels retain existing markup. Only Staff adopts this release in the Academic follow-up.

## Shared tiered navigation - 0.20.0

PortalNavBranch in system/portal-shell shares the established Student tiered menu style with Staff. Portals supply an icon, label and items (id, label, active, disabled and onSelect); route selection and permission filtering remain portal-owned. Active children expand desktop/phone branches. Tablet rails show the selected parent and open an elevated child menu with keyboard navigation, outside/Escape dismissal and focus return. Empty branches are omitted. Existing PortalNavItem, PortalNavGroup and shell defaults are unchanged. Student keeps its current composition in this release; Staff adopts the new shared branch.

The exact 0.20.0 archive was installed in the synthetic consumer before publication and verified in GitHub Packages. Typecheck, 71 unit cases, consumer build and 72 Chromium / 64 WebKit cases passed, including focused retries after fixture reload and asynchronous focus assertions were corrected; two existing phone-pointer cases remain skipped. Three responsive synthetic captures document the released branch. Student compatibility bundling succeeds with only 50 extra eager gzip bytes versus the 0.19.8 baseline; both current Student-source builds exceed its existing bundle budget, so no Student upgrade or full Student gate is claimed. Existing shell defaults and 298 unaffected compiled files remain byte-identical to the verified 0.19.8 archive. No application deployment or data change is included.


## Admin workspace bottom alignment — 0.19.8

AdminRecordWorkspace measures the PortalPageContent bottom inset when sizing the sticky desktop summary/list column. It now aligns with the shell bottom gutter rather than using the larger section gap. The column remains sticky with content-only scrolling; smaller layouts remain compact. Only Control upgrades. No typography, stylesheet, workflow or data behavior changes.

## Pointer reorder state — 0.19.7

SortableList commits the dragged sortable item final index instead of comparing the optimistic drop target identity. FlowEditor immediately recalculates sequential step numbers, including linked children, and consumers receive the actual new order for saving. Disallowed moves are blocked before optimistic DOM sorting. Alt+Up/Down, linked groups, fixed positions and read-only behavior remain unchanged. Control alone upgrades.

## Summary status pills — 0.19.6

AdminRecordPanel preserves the supplied Badge background, padding, border and radius in its summary status slot. This restores the normal color-coded status pill beneath the record name. Compact record-list statuses retain their existing right-aligned, wrapping colored text without pill background or padding. Only Control upgrades; other pins remain unchanged.

## Muted AdminTable pagination — 0.18.5

AdminTableFooter uses the existing secondary Button for the current page, replacing the primary blue fill with a neutral outline. Other pages and previous/next controls retain ghost styling. aria-current, focus, disabled states and behavior are unchanged. Staff and Control adopt this patch; other portal pins remain unchanged. SummaryCard status pills continue to use its existing action slot with shared Badge size="lg". Card background variant and primary-value tone are independent; omit tone when the title should keep its normal color. No new SummaryCard prop is added.

## Cross-portal breadcrumb adoption — 0.18.4

Applicant, Student, Staff/Lecturer and Control all use PortalHeader structured breadcrumbs with router Links. Portals own the route hierarchy and preserve existing navigation guards; Student also retains programme/semester context in parent URLs. Non-routable Academic/Profile group labels remain informational. SSO authentication and Keychain have no PortalHeader page trail and require no header/package changes. No account, access or API rules change.

The overflow menu loads only when the trail needs to collapse; a same-size disabled ellipsis control retains its accessible label and aria-busy until ready. This keeps menu dependencies out of Student's initial graph and preserves the existing bundle budget. The visible trail, menu, keyboard interaction and focus return retain their shared design.

## Summary-column status text — 0.18.3

Compact record lists keep entry names and links left-aligned; status cells remain right-aligned with sentence wrapping. In the AdminRecordPanel status slot and compact list only, badges keep their semantic color but lose background, border and padding. Summary metadata alignment and badges outside this pattern remain unchanged. Staff and Control adopt the same patch.

## Right-aligned compact record lists — 0.18.2

Compact record-list cells share the available row width and stay side by side. Cell, link and pill text is right-aligned; long status sentences wrap inside their pill within the allocated column. Horizontal scrolling remains disabled only for the compact list. Staff and Control adopt the same verified registry release; directory tables and other portal pins remain unchanged.

## Compact record-list rows — 0.18.1

Compact AdminTable record-list values sit side by side, with wrapping when space is limited. The first value uses remaining row space; long names and status pills wrap inside the panel without horizontal scrolling. Vertical virtualization, full-row navigation, search, selection and directory tables are unchanged. Control alone upgrades.

## Responsive header breadcrumbs — 0.18.0

PortalHeader accepts structured breadcrumbs and an optional router link renderer. Shared PortalBreadcrumb displays clickable ancestors and a nonlinked current page. It measures available container space and collapses overflowing ancestors into an ellipsis DropdownMenu, preserving the current page and exposing full labels in the menu. Resize/font changes are observed; keyboard focus and Escape dismissal use shared controls. Existing custom breadcrumb slots/layout stay unchanged. Control alone upgrades, supplying its route hierarchy without additional API reads; other portal pins remain unchanged.


## Wrapping ChipField — 0.17.0

ChipField now wraps selected chips and grows from its 36px minimum height instead of scrolling horizontally. Long labels remain contained. There is no chevron; a full-field native button handles opening/toggling and keyboard focus, with removal buttons as separate sibling controls. The searchable multi-select picker retains existing DropdownMenu styles, selection behavior and focus return. Control alone upgrades and uses the General Settings heading. Other portal pins remain unchanged.


## RadioField — 0.16.0

`ui/radio-field` is the compact form radio component: 16px outlined indicators, shared body labels and 36px interaction targets. Choices stack on phones and appear inline from sm. It is controlled via value/options/onValueChange with labelled native group semantics, keyboard navigation, disabled/invalid states and focus indication. Existing SurveyChoiceGroup card behavior is unchanged. Control uses RadioField for General Draft / Published and PageActionBar edgeToEdge for the full-width Save changes divider. Only Control upgrades.


## ContentSection subheading - 0.15.0

Use optional titleVariant="subheading" for the shared 16px medium type-title heading. Existing default page headings remain 18px, and custom heading content retains ownership of its typography. No section gaps, padding, 36px minimum title containers or other defaults change. Control adopts this for Affected Portals and General; all other portal pins and headings remain unchanged. Applied Campuses in its sidebar now shows the count only, without repeating campus names already available in the form.

Verification: shared typecheck, 58 unit cases, consumer build, 59 Chromium and 40 phone/tablet WebKit cases passed. Control lint, 16 unit cases, production/type build and 14 focused Chromium/WebKit cases passed. Checks cover opt-in 16px headings, unchanged default 18px headings, 36px minimum headers, default spacing, responsive form/navigation and count-only campus summary. All 287 installed package files match the verified 0.15.0 registry archive. Only Control adopts and refreshes this release; no API/data/policy changes or hosted deployment are included.

## Admin workspace title actions and entity icons - 0.14.0

AdminRecordWorkspace accepts optional titleActions before its existing Close action. AdminRecordPanel accepts optional iconLabel for a supplied entity icon without photo semantics. Omitted props preserve existing consumers, layout, photo fallbacks and sidebar actions. Control adopts the release for the Admissions Edit Flow summary/list workspace; other pins remain unchanged. Its right column composes Affected Portals and General with default ContentSection/pageSectionVariants spacing and PagePanelLayout cards. No library/API persistence, permission or campus rules are introduced.

Verification: shared 0.14.0 passed typecheck, 56 unit cases, consumer build, 58 Chromium and 38 phone/tablet WebKit cases. Control lint, 16 unit cases and production/type build passed, followed by 50 workflow browser cases plus focused layout/view-switch and aborted-request checks (52 unique Chromium/WebKit cases overall). The final layout checks verified default 16px section spacing, desktop sticky sidebar, contained phone stacking and three independent portal panels. Saved metadata, scheduled/unassigned versions, local-edit retention/reset, summary read errors/retry, permissions and reference navigation passed. All 287 installed package files match the verified registry archive. No API/policy/application mutation or hosted deployment is included.

## ChipField dropdown presentation - 0.13.1

ChipField directly reuses the existing DropdownMenu content and selectable-row style definitions. The shared elevated surface, 8px radius, 4px menu inset, shadow/ring, item padding, trailing check position, disabled styling and motion now have one owner. Existing DropdownMenu appearance and interactions are preserved; ChipField retains its searchable multi-select listbox and Popover focus/positioning behavior. Picker width follows the anchored field, subject to the existing menu minimum and viewport limit. The entire field surface (including chip labels and empty space) opens the picker. Chip removal buttons retain removal-only behavior, while the chevron toggles the picker. The 36px chip field and horizontal scrolling remain unchanged. Control alone adopts this patch.

Verification: shared type/unit/build and consumer build passed (53 unit cases); all 57 Chromium cases passed after focused retries corrected animation/click-position assumptions, and all 36 phone/tablet WebKit cases passed. Computed surface/row styles match the existing dropdown, and the original DropdownMenu content class set is preserved exactly. Control lint, 16 unit cases, production/type build and 10 focused Chromium/WebKit cases passed. All 287 installed files match the exact verified 0.13.1 registry archive. Only Control Vite was refreshed; API, SSO and saved policies/applications remain unchanged.

## ChipField - 0.13.0

The shared `ui/chip-field` (also exported from the package root) is a controlled, option-only multi-select with a fixed 36px height. Selected removable chips scroll horizontally; its separate picker button remains visible. A searchable Radix popover supports persistent multi-selection, no-match feedback, keyboard navigation and focus return. It uses shared surfaces, badges, field typography and disabled/invalid states. Consumers supply options, current values, accessible labels/descriptions and change callbacks; the package owns no campus or persistence rules. Keyboard removal uses Delete/Backspace; arrows navigate results and Alt+Home/End select endpoints.

Control adopts 0.13.0 only for the General panel below Affected Portals. Campus IDs and flow name initialise page-local edits. No save/publish requests or access/assignment changes are performed; leaving discards edits. Other portal pins remain unchanged.

Verification: 53 shared unit cases, consumer build, all 55 Chromium cases (one unrelated fixture-load failure passed its targeted retry) and 32 phone/tablet WebKit cases passed. Control lint, 16 unit cases, production/type build and 42 Chromium/WebKit cases passed; browser checks reject flow write requests. All 284 installed package files match the verified 0.13.0 registry archive. Only Control Vite was restarted; API, SSO, saved policies and applications remain unchanged.

## ContentSection label - 0.12.0

ContentSection accepts an optional label slot above the title/custom heading, using type-label-normal and muted text. Page, panel and sidebar variants support it. Its existing 36px minimum header height is retained, with natural growth for labels and multiline content. Unlabeled sections retain their existing markup and appearance. Control adopts the shared release for the blank Admissions flow page: label Admissions, title from the API-provided flow name. The read-only reference retains its original heading; other portal pins are unchanged. Verification passed 49 shared unit cases, 52 Chromium and 26 phone/tablet WebKit checks, plus the consumer build. Control lint, 16 unit cases, production/type build and 28 focused Chromium/WebKit cases passed. All 281 installed package files match the verified 0.12.0 registry archive; only Control Vite was restarted.

## Browser document titles - 26 October 2026

Browser titles consistently use Raisd followed by a middle dot and the portal name: Raisd · Applicant Portal, Raisd · Student Portal, Raisd · Staff Portal, Raisd · Control Portal, Raisd · Keychain and Raisd · SSO. Each portal owns its document title; SSO keeps the same title on login and password recovery. In-page headings and breadcrumbs retain their route-specific labels. No shared-package change or release is required.

## Compact Admin record lists - 0.11.2

Shared AdminTable record-list entries stack their supplied fields vertically and wrap names/status badges inside the sidebar. Directory tables keep their column layout. Staff adopts this shared patch without portal CSS overrides, workflow changes or data changes. Verification passed 44 shared unit cases, 50 Chromium and 22 phone/tablet WebKit cases, plus consumer build. Staff lint, 92 tests and production build passed against the registry release; all 281 installed files match the verified archive. Only Staff Vite was restarted.

## Admin record sidebar scrolling - 0.11.1

The desktop sidebar fills available PortalMain height and stays sticky. Its summary/list switch and optional actions remain fixed while summary content or list rows scroll. Transparent masks are removed. Phone/tablet panels remain compact above the form. Staff adopts this focused patch; other portals retain their existing pins. Shared verification passed 44 unit, 49 Chromium and 20 phone/tablet WebKit checks, plus the standalone consumer build. Staff lint, 92 tests and production build passed against the registry package; all 281 installed files match the verified archive. Only Staff Vite was restarted; APIs and saved Demo data were preserved.

## LinkedList panel variant — released 0.11.0

`LinkedList variant="panel"` uses `bg-surface` and PagePanelLayout's 12px radius for standalone clickable cards. Its default variant retains the existing raised surface and radius; interaction, focus and spacing are unchanged. GitHub Packages provides the exact verified 0.11.0 archive. Only Control upgrades its registry pin and uses the variant on University Flows; other portal pins remain unchanged. The release archive differs from 0.10.6 only in LinkedList runtime/types/map, package version and component guidance. Shared release checks passed 44 unit, 48 Chromium and 18 WebKit cases, plus consumer builds; the focused card capture checks passed at 1440/768/375px. Control's registry installation passed lint and production/type build. Three synthetic catalogue captures document the variant. Package publication does not deploy portals or change data.

## ContentSection title height — 0.10.5

Every title container uses a 36px minimum height by default, including page, sidebar, panel and custom-heading variants. Content and multiline headings can grow above it. Typography, the 16px page gap and 12px sidebar gap are preserved. Applicant, Student, Staff and Control adopt the same release. This is shared presentation only; no portal-specific header overrides, API, record or workflow changes.

Verification: shared gate passed 44 unit, 48 Chromium and 18 phone/tablet WebKit checks. Focused computed-height checks/captures passed at 1440/768/375px. Staff (90 tests), Applicant (95) and Control (16) lint/test/build gates passed. Student passed its three focused ContentSection tests and production build; the aggregate Student run was deliberately stopped to keep this isolated visual correction focused, so no full Student regression pass is claimed. All four installed package integrities/component bytes match published 0.10.5. Only local frontends were restarted; APIs, SSO and saved Demo state remain.

## Default page spacing — 0.10.2

Default page ContentSection spacing is 16px, owned by pageSectionVariants(). Applicant, Student and Staff consume the same released default. Prefer ContentSection type="page" plain; route shells retaining status roles, named slots or custom wrappers use pageSectionVariants() instead of a local gap. Preserve heading semantics, sidebar/panel geometry, internal section spacing and portal-shell gutters. Control is outside this consumer upgrade.

Local verification (22 October 2026): exact 0.10.2 archive published and registry integrity checked. Shared gate passed 44 unit, 47 Chromium and 16 WebKit checks; all three consumer check gates passed. Computed browser gaps are 16px for page/panel defaults and 12px for sidebar at 1440/768/375px, without page overflow. Canonical catalogue captures were refreshed. Restarted only local Applicant/Student/Staff frontends; Control, APIs, saved data and hosted deployments are unchanged.


## Shared Admin record flow — 0.10.0

The additive `system/admin-record-flow` family groups AdminTable, toolbar/footer and read-first record workspace/panel/actions/dialogs. It adapts the owner-provided CMS interactions to current tokens and components, without changing DataTable, portal pins or the empty Staff Applicants page. See [Admin record flow](admin-record-flow.md) for interfaces, filtering, virtual lists, dirty navigation, responsive layout and synthetic examples.

## Account header — 21 October 2026

Headers use shared `PortalAccount` 0.9.3: name first, permanent SSO numeric User ID followed by ` · ` and comma-separated assigned roles second. Applicant, Student, Staff and Control use the same number. Email and campus Student/Staff numbers are not substituted. Role metadata is display-only; active-role authorization remains unchanged.

`raisd-campus/design-system` owns the shared React package `@raisd-campus/design-system`. The four portal applications are separate repositories and consume released package versions. The student portal is the first consumer and the source of the initial visual patterns. `control-plane` and `portal-api-docs` do not import React components.

## Ownership decision

### Popup section layout — 0.23.1

Patch 0.23.2 adds decorative semantic dividers between opted-in sections, centred in the existing 32px gap. First/last outer edges and default popup body spacing stay unchanged; no portal border overrides are needed. Control alone adopts the patch.

For new popup bodies, use `Popup contentLayout="sections"` and `PopupSection` from `system/popup-section`. Section title and description are optional; plain groups keep no header space. Popup owns 32px between groups; PopupSection owns 16px within each group. Default Popup bodies preserve their existing markup and spacing. Migrate only requested popups, keeping existing untitled controls untitled. Header/footer, focus return, scrolling and pending-dismissal locks remain shared. Control's Admissions step popups opt in; other portals and existing default popups retain their layouts.

Before building a UI element, look in the package catalogue and the [published visual catalogue](https://docs.raisd.co/design-system/). Import a published component when it expresses the required visual and interaction pattern. Do not copy its source into a portal or run a component generator that creates another local copy. Extend the package when a reusable variant is needed; keep workflow and product decisions in the owning portal.

| Layer | Owner | Examples |
| --- | --- | --- |
| Tokens, type, primitives | `design-system` | Colours, spacing, `Button`, `Badge`, `Input`, `Dialog` |
| Portal-neutral patterns | `design-system` | `PortalShell`, `PortalSidebar`, `PortalHeader`, `PortalAccount`, `SummaryCard`, `RecordSummaryCard`, `DataTable`, `PagePanelLayout` |
| Transactional email | `design-system/email/` + `notifications` | `password_reset`, `magic_link`, `applicant_submitted`, `enrolment_accepted`, `learner_access_granted` — send via `notify.raisd.co` |
| Portal-specific composition | Each portal | Student enrolment context, student profile issues, route selection, Community draft and attachment policy |
| Campus data and rules | `control-plane` / Portal API | Identity, records, authorisation, CMS integration |

The package must not import a portal's `@/` alias, routes, contracts, queries, feature models, or mock data. Shared patterns take presentation data and callbacks. A portal adapter maps its records and actions to those props. A shared component may expose an optional link renderer instead of depending on one portal's router.

## Component-change guardrail

Follow the authoritative [campus-wide component-change guardrail](../AGENTS.md#component-change-guardrail-all-portals) in all four portals. It protects both shared components and established portal-owned components and layouts.

- Compose the requested feature using existing components, documented variants, props and slots. Supply feature content, data, callbacks and workflow decisions within the authorized task scope.
- Importing a shared component does not authorize restyling it. A `className` prop, stylesheet, descendant selector or wrapper must not change established sizing, spacing, typography, surfaces, layout, responsive behaviour or interactions without explicit instruction or approval for that change. This applies to buttons, fields, accordions, navigation, panels and other components equally.
- Before an additional component change, describe the affected component, the specific proposed change, and its impact on other consumers and portals; obtain approval before editing. A feature request alone does not authorize incidental redesigns, and existing explicit authorization does not require another confirmation.
- Put approved reusable changes in `design-system` and follow the release and consumer-upgrade process below. Keep approved portal-specific changes in the owning portal; do not patch installed package files or create a local copy of a published component.

## Standard field sizing

Package 0.5.2 standardizes `Input`, `DropdownSelect` and `DatePicker` at 36px height, 14px text and 20px line height across desktop, tablet, phone and coarse pointers. `DropdownSelect` uses `data-slot="dropdown-select-trigger"`. Do not add local field sizing or font overrides. Textareas retain their multiline height and 14px text; upload, checkbox, radio and other touch geometry remains distinct. Survey answer labels are 14px while headings and choice cards retain their scale. Applicant and Student own matching zoom-suppression viewport metadata; physical iPhone focus, keyboard dismissal and rotation require device verification.

## Shared conversation presentation

Package 0.6.0 moves Student's existing chat presentation into `system/chat-message` (`ChatMessageRow`, `DateDivider`) and `system/chat-composer` (controlled `ChatComposer`), preserving its visuals, sizing, keyboard sending, attachment tiles and image lightbox. Pass display records and callbacks; the composer accepts controlled text, prepared attachment metadata, sending/disabled state and an error. It does not validate, upload, persist or send files.

Each portal adapter owns attachment limits and validation, draft storage, pending requests, preview URLs, read watermarks, identity and workflow status. Student keeps its existing API and Community/Online Forms behavior behind compatibility adapters. Applicant's frontend-only adapter retains conversations and drafts in memory until refresh; reading a reviewer message and answering it are distinct operations. Shared message rows expose optional delete/receipt presentation only when the consuming workflow supplies it.

## Shared Community presentation — released 0.7.0

Design-system **released 0.7.0** owns directory/group lists, members, avatar stacks, conversation headers/layouts, message lists and responsive dock/overlay presentation extracted unchanged from Student. `system/community` and `system/community-message-list` accept display records, controlled state, callbacks and slots; they import no portal contracts, fixtures, queries or router. Existing chat rows, composer, date dividers and previews remain shared. Optional download callbacks retain the file tile; an image lightbox's existing filename can invoke original-byte download.

Portal adapters own membership projections, navigation layers, drafts, scroll positions, attachment policy, services and meetups. Student keeps local mock mode and its original per-student service conversations. Lecturer keeps a resizable Community dock starting at 296px, full-screen phone/tablet overlay, Dashboard and Modules navigation and an empty Dashboard body. Lecturer owns Materials workflows: browser Demo authoring lives inside each module Materials tab, while the legacy /materials desk remains API-only.

`DEMO_COMMUNITY_CHAT=true` enables the transport in Portal API. It defaults off and rejects Live CMS mode. Consumers require `GET /v1/meta/community` to advertise `enabled: true`, `version: 1` and `chunkBytes: 1048576`. Missing support retains Student's existing adapter; Lecturer shows an unavailable state. Unsupported transport never invents success.

See [shared Demo Community contract](../backend/community-chat.md) for transport, membership, files and release boundaries. Local packed-candidate checks do not change released-version pins. Candidate captures are prepared separately from the released catalogue.

## Accordion, avatar and read-only file presentation

Package 0.6.1 adds a pointer cursor to enabled `AccordionTrigger` controls and an opt-in `AvatarFallback.surface="subtle"` for the darker `surface-subtle` token on surface backgrounds. Shared chat message rows use the subtle fallback; avatar sizes, images, disabled accordion interaction and header geometry remain unchanged. Consumers own accordion title typography.

Read-only uploaded files use the existing `DetailField` `readOnly` variant with a read-only `FileUploadField` supplied as `value` to align with other label/value columns. `readOnlyStacked` intentionally places a value below its label and is not the default for files.

## Installing in a portal

Use the `@raisd-campus` scope with GitHub Packages and pin a released version in `package.json` and the lockfile. Commit a project `.npmrc` containing only the registry mapping. For local installation, authenticate with a GitHub personal access token (classic) with `read:packages`, held in user-level npm configuration or `NODE_AUTH_TOKEN`; never commit a token. CI uses `GITHUB_TOKEN` with `packages: read` after package read access is granted to the portal repository in the package settings.

If using `NODE_AUTH_TOKEN` locally, put the following interpolation in the **user-level** `.npmrc`; the environment variable alone does not tell npm which registry should receive it. GitHub Actions `setup-node` writes this auth mapping for its job when configured with `registry-url` and `scope`.

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

For a portal GitHub Actions job, grant that repository **Read** under the package's **Manage Actions access** setting, then use:

```yaml
permissions:
  contents: read
  packages: read
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 22
      registry-url: https://npm.pkg.github.com
      scope: '@raisd-campus'
  - run: npm ci
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

```ini
@raisd-campus:registry=https://npm.pkg.github.com
```

```powershell
npm install --save-exact @raisd-campus/design-system@0.9.0
```

Import the stylesheet once in the portal's entry CSS. Tailwind v4 ignores `node_modules` by default, so register the installed package as a source. For a portal stylesheet under `src/`, the setup is:

```css
@import "tailwindcss";
@import "@raisd-campus/design-system/styles.css";
@source "../node_modules/@raisd-campus/design-system/dist";
```

```tsx
import { Button } from "@raisd-campus/design-system/ui/button"
import { SummaryCard } from "@raisd-campus/design-system/system/summary-card"
```

Import individual `ui/<component>` or `system/<component>` subpaths to keep unused components out of the portal's eager bundle. Do not import `dist` internals or use the root barrel for application code. A consumer should read `node_modules/@raisd-campus/design-system/docs/components.md` and the emitted declarations from its **pinned version** for exact props, states, and examples. The [0.9.0 catalogue](https://github.com/raisd-campus/design-system/blob/v0.9.0/docs/components.md) is the stable online reference; `main` may have newer APIs. The [portal design rules](design-system.md) define token meaning and responsive behaviour. Keep dark-only styling until a cross-portal theming decision is approved. Phone, tablet, and desktop layouts must remain usable.

`RecordSummaryCard` presents the reference as a labelled row before the other values, followed by an edge-to-edge status footer. `referenceLabel` defaults to "Reference" and can be tailored by the portal. The portal supplies values, status text and tone, and an optional selection action; it owns reference issuance, dates and record workflow.

`TabbedPagePanel` fills its containing width, including for a single-tab page with short content. Package 0.5.1 explicitly keeps this frame in a column layout. Place route-level completion and editing actions in `PageActionBar` below the panel content.

`DetailField` keeps divided rows by default. Use `variant="editableUndivided"` for editable fields without row dividers; it preserves the shared label/control alignment and narrow-panel stacking. This variant is available from package 0.3.0, with tighter vertical spacing from 0.3.1.

From package 0.4.2, `DetailField` can show a contextual label tooltip through its optional `tooltip` prop. The help icon stays beside the label's final word when it wraps. Omit the prop or pass `tooltipEnabled={false}` to hide the icon. The portal supplies the help content; the shared component owns the trigger, focus, and layout.

From package 0.5.0, `system/survey-layout` exports `SurveyLayout` and `SurveyChoiceGroup` for one-question-at-a-time surveys and wizards. The shared layout owns responsive 32/48px question typography, question focus, progress and answer/action slots. Controlled native radio choices preserve keyboard navigation. The portal owns question order, branching, validation, answer retention and destinations; country selectors can be supplied through the answer slot. Checklist checkboxes must remain separate from accordion expansion buttons.

Use `system/portal-shell` for the shell family in every React portal: `PortalShell`, `PortalSidebar`, `PortalHeader`, `PortalNavItem`, `PortalNavGroup`, `PortalAccount`, `PortalMain`, and `PortalPageContent`. The package owns the full-screen phone drawer, tablet rail, desktop frame, header and 36px avatar, one page scroller, and 16/24/48px gutters. Portals pass a logo, navigation and footer actions, account data, header controls, and an optional sidebar panel. The student portal supplies Community content, controlled width state and nested route behavior; the applicant portal supplies its own two links. Do not recreate the shell in a portal. Package changes reach an app when its pinned version is deliberately upgraded.

## Changes and releases

1. Change the reusable component and its catalogue in `design-system`; preserve keyboard, focus, disabled, loading, empty, error, and responsive states where relevant.
2. Build and test the package, then publish a versioned release. Use SemVer and record breaking prop or visual changes in the changelog.
3. Upgrade each portal deliberately. Its lockfile must use the released package. Run the portal's own checks before merging.
4. When a shared token, public prop, visual state, interaction or ownership rule observably changes, update the package catalogue and this knowledge base where relevant. Prepare affected `control-plane/docs/design-system/` text/captures, then publish its `portal-api-docs/design-system/` mirror when the new package version is released. The public site always describes a released, installable version. Prop-only changes may need text but no new image; visual changes need fresh captures and provenance. Update `docs/ai/MANIFEST.yaml` only for added knowledge files.
5. When a student-owned reusable pattern observably changes, update the canonical student design guidance and local mirror, then the affected student HTML examples and captures. Do not edit the shared package catalogue unless its exported API or visuals also changed. Internal refactors with no observable change and unrelated tasks do not trigger design documentation edits.

Lecturer and staff add the package when their apps begin. Each portal pins and upgrades a published package version deliberately.

## Shared Popup trailing action — 6 October 2026

Released package **0.6.2** adds optional `footerAfterDismiss?: ReactNode` to `system/popup`. Footer order is leading `footer`, standard secondary dismiss, then the consumer-owned trailing action. Default layout, colours and dismissal remain unchanged; phone wrapping keeps visual and keyboard order. Applicant uses it for primary Save & Close after Keep Editing. The portal owns draft saving, pending/dismiss locking, failure/retry, resources, stale-session guards and the original blocked destination. Student and Applicant pin the released 0.6.2 package. No contract/schema or live backend change is introduced.

Community subpaths: `system/community` (directory/group lists, dock/overlay and layout), `system/community-members` (roster), `system/community-conversation-header` (identity/header) and `system/community-message-list` (messages). Separate imports preserve lazy consumer boundaries.

Desktop resizing is shared via `system/community-resize`: `CommunityResizeHandle`, the 296px default, 256–640px bounds, viewport-aware `clampCommunityWidth` and 16px keyboard step. Place the handle in `PortalSidebar edge`, control the shell's `--sidebar-community-width`, and remove width animation while dragging. Use `ChatComposer communityInset` within `CommunityConversationLayout inset` to retain Student's full-width composer footer. Both portals use these shared APIs; overlays have no resize grip.


### Remaining Lecturer Community composition parity — 13 October 2026

Compare directory, loading/error states, programme/module chat, members, empty/populated direct messages, attachment/composer placement and responsive Back/focus/scroll behavior against Student. The remaining correction reuses Student's centered loading state, avatar-based direct-message empty state, disabled View profile header control and existing scroll fades through additive shared presentation. Empty group chat has no bordered placeholder. Conversation scroll positions are retained through members/DM/Back navigation. Lecturer programme labels remain multi-programme; Student services/meetups and Student-only module-detail routes remain portal-owned. No new styles, Student source changes, API changes or publication are included. Lecturer verification remains focused under the owner's full-suite hold.

## Student/Applicant UI ownership audit — 13 October 2026

The owner approved page-by-page extraction and global CSS centralization. See [audit and route matrix](2026-10-13-portal-ui-ownership-audit.md). The unpublished 0.7.0 candidate owns enabled cursor/foundation/state variants, shared container/touch/forced-color rules and the complete extracted display patterns. Student/Applicant adapters keep contracts, records, routing, queries, status eligibility and file resources. Standalone examples must work with only the package stylesheet and Tailwind source registration; a portal-only rule must never be an undocumented prerequisite for a shared component.

Opt-in shared phone variants replace Applicant descendant overrides; summary/carousel CSS moves with those display components. Student keeps source-specific Services body styles and remaining academic/finance workflow layouts. No incidental redesign, live backend or release pin change is authorized by this extraction. Candidate captures remain separate from the released public catalogue. Shared, Student and Applicant required gates apply; Lecturer remains focused under the owner's aggregate hold.


### Three-tab scrolling correction — 13 October 2026 candidate

SegmentedTabs applies its established 9rem-per-tab minimum width for three or more tabs (previously four or more). This preserves the existing horizontal strip, phone edge fades and active/keyboard reveal when three long labels cannot fit. Two tabs retain their prior behavior. The owner approved the shared fix after comparing Lecturer enrolment filters with Student Online Forms. No portal cursor/width override or new CSS was added. Candidate consumer regression covers 375/768/1440; publication and released pinning remain pending.

### Per-file actions — unpublished 0.7.0 candidate

`FileUploadField.renderFileActions(file)` optionally renders consumer-supplied actions inside each existing file card. It works with `multiple` and `readOnly`; omitting it preserves every existing consumer's appearance and behavior. The component owns wrapping and keyboard-safe card structure, while portals own original bytes, filenames, URLs, previews, downloads, pending/disabled actions and upload limits. The existing `multiple` prop remains unchanged; there is no new multi-upload component or portal override.

```tsx
<FileUploadField label="Resources" multiple files={displayFiles}
  onFilesSelected={selectFiles} onRemove={removeFile}
  renderFileActions={file => <Button type="button" variant="secondary" onClick={() => previewFile(file.id)}>Preview</Button>} />
```

The package consumer fixture at `?files` demonstrates multiple selection, removal and per-card Preview/Download actions without portal CSS. Existing Student/Applicant forms require no migration.

## Owner UI conventions — 14 October 2026

For subsequent portal composition, use established shared Add actions with a leading icon. Header Add actions use the shared primary Button plus a leading Plus icon; form row additions use AddRowButton and its built-in CirclePlus. Do not introduce a text-only Add action or invent a Button variant absent from the package.

Place save feedback in PageActionBar's existing leading slot, alongside its action group. The shared bar owns layout/wrapping; the consumer supplies accessible status/error text and workflow. Student Online Forms already uses this composition; Lecturer Materials follows it. This guidance uses existing released/candidate APIs and introduces no shared visual change or package release.

Owner update (14 October): primary styling supersedes the earlier secondary header-Add convention. Keep the leading icon. Save feedback continues to use PageActionBar.leading.


## Read-only file container refinement - 14 October 2026

FileUploadField now omits the outer dashed upload border, padding and minimum upload-container height when readOnly is true. It retains each existing file card, filename, size, empty/error text, accessible labelling and optional per-file Preview/Download actions. Editable and disabled-editable uploads keep their existing upload container. This owner-requested rule belongs to the shared component; no Lecturer override or new prop is added. The package fixture at ?files&readonly demonstrates it without portal CSS. It applies to read-only consumers of the new candidate; existing Student/Applicant installed packages are not upgraded by this task. Released pins/publication remain unchanged.

Verified 14 October 2026: shared npm run check passed (18 unit tests and 32 Chromium consumer browser cases); Lecturer lint and TypeScript/build passed. Browser checks at 375, 768 and 1440px retained file cards and Preview/Download controls with no horizontal overflow. Keyboard Preview activation passed. Lecturer read-only border/padding measured 0px/0px; editable remained 1px/16px. Only Lecturer local installed candidate was refreshed; released pins remain 0.6.2. No API restart or publication. Lecturer aggregate verification remains on hold.


## Student and Applicant read-only file adoption - 14 October 2026

The owner approved applying the existing shared FileUploadField read-only container refinement to Student and Applicant. Both local node_modules installations now use the same complete packed 0.7.0 candidate as Lecturer; tracked manifests and lockfiles retain released 0.6.2 pins. Read-only fields omit the outer dashed border, padding and upload minimum height; existing cards, filenames, sizes and empty text remain. Editable and temporarily disabled editable fields retain their existing frame and selection/removal controls. No portal CSS override, feature/API/schema change, package publication or deployment is introduced. A fresh npm ci still restores the released pin until candidate publication and consumer upgrades are approved.

| Portal / upload surface | Existing owner | Audit result |
| --- | --- | --- |
| Student Online Forms (including Immigration-owned forms) | FormFields → shared FileUploadField | Drafts remain editable; submitted forms pass readOnly. Read-only file metadata/no-selection regression passed; actual seeded empty state uses the frame-free rule. Multiple-file selection, limits, accessible labels, autosave footer and draft navigation retained. |
| Student Finance transfer proof | FinanceProofPicker → shared FileUploadField | Editable/replacement and pending-disabled states retain the frame; review summaries use ordinary metadata rows, without a duplicate upload frame. Existing proof validation and review behavior retained. |
| Student assignment submission | AssignmentSubmissionPanel workflow | Specialized selected/submitted/closed states remain workflow-owned; no duplicated shared dashed read-only upload frame. PDF/ZIP, one file, 50 MiB, deadline and confirmation controls unchanged. |
| Student Portfolio artwork | PortfolioArtworkPicker workflow | Image-first editable picker and read-only project preview remain distinct media presentation; no generic read-only upload frame or CSS override. Resource/preview cleanup unchanged. |
| Student Profile identity / Documents / issued letters | FileLink / LinkedList / DocumentActions | These are document navigation/delivery patterns, not upload containers. Existing availability, original-byte delivery and placeholder boundaries unchanged. |
| Applicant Academic Qualifications | DocumentField → shared FileUploadField | Transcripts, certificates and English evidence retain editable frames, remove/replace controls, validation and conditional records. |
| Applicant Documents | DocumentField → shared FileUploadField | Identity, portfolio, transfer and conditional supporting evidence share the same editable field; no portal-specific container styling. |
| Applicant Application Fee | shared FileUploadField | Transfer proof keeps editable frame and remove/replace controls; original policy and save/submission workflow retained. |
| Applicant submitted academic, documents and fee accordions | FileField → shared FileUploadField readOnly in DetailField value | All six populated sample file rows measured border/padding 0px/0px with no selection/removal controls. Label/value alignment and metadata remain. |
| Student / Applicant messages | Shared chat attachment presentation | Separate existing attachment tiles/composers keep their limits, preview/download behavior and session ownership. |

All directly shared editable fields measured border/padding 1px/16px. Actual read-only and editable page captures at 375, 768 and 1440px show no horizontal overflow. Student synthetic draft/file retained across navigation; no manual test submission was performed. Automatic approval review rejected the attempted manual Demo submission because it would lock the draft beyond the inspection scope; existing submitted records and the already-existing read-only component regression provide the safe verification path. Applicant's full gate passed 65 unit/component tests and 70 browser cases. Student's final full-gate outcome is recorded below after completion. Shared source/artifact is unchanged from the previously verified 18-unit/32-browser candidate. Lecturer aggregate verification remains on hold.

Final verification - 14 October 2026: Student completed token/assets/lint, 797 unit tests, TypeScript/build/production-exclusion/bundle gates and 278 Chromium cases with 46 intentional skips using its existing CI=true resource budget and PLAYWRIGHT_WORKERS=2. That check:all invocation exited nonzero after WebKit passed 40 cases and hit one tablet Personal Profile loading-readiness timeout before checking layout. A subsequent two-worker WebKit run passed that case but hit the existing desktop workflow Space-checkbox check (40 passed, 31 skipped). Each unchanged case passed three isolated retries. The complete unchanged one-worker WebKit rerun then passed 41 cases with 31 intentional skips. All required constituent checks passed, but no uninterrupted Student aggregate success is claimed. Applicant npm run check:all passed 65 unit/component tests and 70 browser cases. Earlier Student attempts hit a sandbox temporary-cache EPERM before tests and an Immigration journey exceeding the ordinary 5-second budget during concurrent load; no source/test changes were made for these retries. Existing Applicant chunk-size, jsdom Window.open and Vite configuration/color-environment advisories remain. Twelve actual responsive consumer captures, package artifact equality, mirror equality and scoped whitespace checks pass. No source/API/schema changes were needed for this style adoption; existing uncommitted work, released pins, publication/deployment boundaries and Lecturer aggregate hold are preserved.


## 0.7.0 tagged release attempt - 14 October 2026

The owner authorized publishing 0.7.0 and upgrading Student, Applicant and Lecturer to the registry release. Shared source commit e1ddc3738c5d5b27447e1c8ae9e45719547b13a3 and annotated tag v0.7.0 are pushed. Fresh package checks pass 18 units and 32 consumer browser cases; vendor notices and source/documentation are included. GitHub tagged workflow 38523633833 and main workflow 38523633691 failed before executing any steps because account payments/spending limits blocked hosted runners. The registry still reports 0.6.2. A Git tag is not proof of package publication. All three portal pins/locks remain 0.6.2 and their local 0.7.0 candidate runtime remains; unrelated uncommitted work is preserved. The public catalogue stays 0.6.2. A verified archive, registry-gated upgrade script and staged catalogue with 18 shared captures are prepared under Student logs/shared-release-070. Publication requires GitHub billing to be resolved and the tagged workflow rerun, or an explicitly authorized local publish with a classic write:packages token; credentials must not be pasted into chat or committed. Lecturer aggregate verification remains held. No portal deployment or API restart is included.


## Released shared 0.7.0 adoption - 14 October 2026

The owner published @raisd-campus/design-system 0.7.0 directly to GitHub Packages after hosted Actions were blocked by billing. Fresh registry metadata matches the verified release archive from shared source commit e1ddc3738c5d5b27447e1c8ae9e45719547b13a3 and tag v0.7.0. Student, Applicant and Lecturer now pin exactly 0.7.0 in their manifests and lockfiles and install the registry release; all 260 installed package files match the tested archive. Only the shared dependency entry changes; unrelated dependency pins and existing uncommitted source work are preserved. The released package includes shared Community presentation, portal-neutral patterns and global control rules, three-tab responsive scrolling, per-file action slots and frame-free read-only file fields. Save feedback remains in PageActionBar.leading; header Add actions use a primary button with its leading icon. The previous candidate/publication-pending notes describe historical preparation, not the current installed version. The three existing portal Vite servers were restarted on 5173/5174/5175 to release Windows native-module locks and activate the installed release. API/data contracts and persistence do not change. Lecturer aggregate verification remains on hold. No portal deployment, API restart or migration is included.


## Shared package 0.7.0 release

Released @raisd-campus/design-system 0.7.0 is available from GitHub Packages. Approved local Student, Applicant and Lecturer checkouts pin this exact registry release; their pin changes and broader source work remain local until separately committed and deployed. Shared source is tag v0.7.0 at e1ddc3738c5d5b27447e1c8ae9e45719547b13a3; the published archive was verified against the tested package. The package check passed 18 unit tests and 32 consumer browser cases. Portal verification and deployment are separate claims.

The release adds controlled Community directory/group/member, conversation and responsive resize presentation; portal-neutral summary, action, wizard, capacity, learning/person and carousel patterns; and common enabled-control cursor, touch and state CSS. Portals retain contracts, records, routing, identity, drafts, file resources and transport. SegmentedTabs uses its established scrolling minimum for three or more tabs; two-tab behavior stays unchanged.

FileUploadField supports optional renderFileActions inside single/multiple file cards. Its readOnly mode removes the outer upload frame while preserving cards, metadata, accessible labels and supplied actions. Editable fields retain their frame. Portals own limits, original bytes, previews, downloads and cleanup. Keep save feedback in PageActionBar.leading. Header Add actions use the existing primary Button with a leading Plus icon; row additions use AddRowButton. The versioned package catalogue and the released visual catalogue document these patterns; historical captures retain their source provenance.


## Released-package verification - 14 October 2026

Student npm run check:all passed against the registry-installed 0.7.0: token/assets/lint, 797 unit tests, TypeScript/build, production exclusion and bundle budgets, 278 Chromium cases with 46 intentional skips, and 41 WebKit cases with 31 intentional skips. The unchanged browser suites used PLAYWRIGHT_WORKERS=1 and the existing CI=true unit budget. Applicant npm run check:all passed on the complete unchanged rerun: 65 unit/component tests and 70 browser cases. The first Applicant run passed 69 browser cases but missed the phone navigation action in the save/retry case; the existing leave-application suite subsequently passed 14 cases across all seven browser/viewport projects before the clean full-gate rerun. No source or test assertions changed for retries. Lecturer lint, canonical demo:check, TypeScript/build, 54 focused Vitest cases and two Node roster-projection cases passed; its aggregate gate remains held. Browser checks at actual 375/768/1440 widths confirmed Lecturer Materials, pointer cursors on all three tabs and contained file details; Applicant read-only file presentation also remained within those bounds. The package receipt and all 260 installed files match the verified published archive in every portal. Only the root shared pin and its package entry differ from each pre-upgrade lockfile; unrelated pins and source work remain. Both local catalogue copies validate all 188 captures, preserving historical provenance and adding 18 reviewed shared captures. Canonical guidance and affected mirrors are identical. The existing Vite/colour, jsdom Window.open and Applicant/Lecturer chunk-size advisories remain. npm reported existing audit findings (Student 15, Applicant one, Lecturer six); no dependency fixes were applied outside the approved pin update. The three local Vite servers respond HTTP 200 on their original ports. Portal edits and broader pre-existing documentation work remain local and uncommitted. Release-only catalogue sources and minimal versioned guidance were published from clean isolated checkouts, preserving newer remote changes and the current docs.raisd.co site chrome. Canonical catalogue commit a646104d96469fe6ff15bb62187f12c2cb6b921f and public mirror commit 7485fa9566f526095b8dea0292b2eca39737334e are pushed. The live docs host still reports catalogue 0.6.2; its 25-file static promotion is prepared separately and has not been performed under the existing no-deployment boundary. No portal deployment, API restart or migration is claimed.


## Unreleased accordion refinement - 15 October 2026

Owner-requested shared AccordionTrigger change: expanded triggers remove bottom corner rounding and show a semantic border divider above content. Closed presentation remains unchanged. Package source and component catalogue are updated; tests/builds and affected visual captures are deferred at the owner's request. This prepares the next catalogue update; released 0.7.0 and portal installations remain unchanged.

Local activation: the owner subsequently requested activation across Lecturer, Student and Applicant. All three local installations now consume the complete locally built/packed accordion candidate; Vite was started with forced dependency optimization on ports 5173/5175/5174 respectively. Registry pins remain 0.7.0; no package publication or deployment was performed. Compilation was necessary for activation; no tests were run.

## AuditTrail — released 0.8.0, 15 October 2026

Import `AuditTrail`, `AuditTrailEntry`, `AuditTrailActor`, `AuditTrailChange` and
`AuditTrailProps` from `system/audit-trail` in released 0.8.0.

AuditTrail presents an ordered vertical activity timeline with shared actor avatars
(photo or initials), connecting lines, actor/action, campus-local timestamp,
optional description, labelled before/after changes, reason and custom details.
Narrow layouts wrap text and timestamps naturally; no compressed table is used.
It is display-only and imports no portal contracts, router, queries or mock data.

Supply entries in the desired order with stable IDs and ISO `occurredAt` values.
Pass `timeZone` explicitly for campus records (default UTC) and optional `locale`
(default en-MY). The consumer resolves identity, access, pagination, grouping,
loading/errors and timestamp availability; the component invents no author or event.
`ariaLabel` labels the ordered list; `emptyMessage` supplies the empty text.
Invalid timestamps render Time unavailable without an invalid time attribute.

Each entry takes `actor: { name, avatarUrl? }`, `action`, optional `description`,
`changes: [{ id, label, before?, after }]`, `reason` and `details`. Content slots
accept ReactNode. Wrap it in an existing panel/card; AuditTrail does not own one.

Lecturer attendance is the first adapter. Existing history lacks actor IDs, so
photos are used only for one unambiguous exact-name match in its authorised lecturer
directory; otherwise shared initials are displayed. All audit records remain
visible, newest first, without merging separate records.

Use the installed 0.8.0 package subpath with normal stylesheet and Tailwind source
registration. Lecturer's temporary source aliases were removed during the approved
registry upgrade. The portal resolves authorised actor identities; exact matches
win, followed by a unique recognised-title-normalised match. Ambiguous or missing
photos retain initials. No API identity is invented.

## AuditTrail local verification — 15 October 2026

The shared candidate passed npm run check: 21 unit cases, build/consumer build and
35 browser cases. Its exact packed artifact passed Lecturer lint/63 tests/production
build without source-preview aliases in an isolated consumer. Actual attendance
photos, safe name matching, long/empty/invalid-time states, broken-photo fallback,
keyboard/accessibility and responsive captures were verified. Published 0.7.0 still
has no AuditTrail export; no package release/pin change or published catalogue
promotion occurred. The local source preview remains until an approved upgrade.
See [receipt](../frontend/student-portal/audits/2026-10-15-classrooms-materials-verification.md).

## Shared 0.8.0 registry release — 15 October 2026

The owner approved publication and portal upgrades. GitHub Packages now provides
0.8.0 with AuditTrail and the approved expanded-accordion divider/square bottom
corners. Student, Applicant and Lecturer pin exact 0.8.0; registry SHA-512 matches
the tested archive. Lecturer's temporary Vite alias, TypeScript path and Tailwind
sibling-source mapping are removed. The package subpath supplies production types,
runtime and styles through the normal installed-package source registration.

Shared check passed 21 units and 35 consumer browser cases. The exact packed archive
passed a separate Lecturer lint/63-test/build gate before publication; the installed
registry package passed Lecturer's gate and canonical snapshot parity. Student full check:all passed 809 units, 278 Chromium and 41 WebKit cases (46/31 intentional skips), plus lint, type/build, production exclusions and bundle budgets. Applicant full check:all passed 65 units and 70 browser cases. Clean registry installation also passed; see the Classrooms verification receipt. Six reviewed shared captures show AuditTrail and
expanded accordion at 375/768/1440px; historical capture provenance is preserved.
The local/public-source catalogue is refreshed; no hosted catalogue or portal
deployment is claimed.

Package publishing is manual. The prior 0.7.0 local publishing script used a hidden
one-session token and cleared it; Git Credential Manager and GitHub CLI are separate
credential sources. Use design-system's `npm run release:publish -- <archive>
<pack-receipt>` helper. It uses the securely stored GitHub CLI login (or an explicitly
supplied NODE_AUTH_TOKEN), checks write:packages before publishing, verifies archive
version/SHA-512, rejects conflicting existing versions and verifies registry proof
before consumer upgrades. Missing scopes have a documented one-time device approval:
`gh auth refresh --hostname github.com --scopes read:packages,write:packages`.
The refreshed login is securely stored; temporary npm configuration contains only
environment interpolation and is removed. Do not retrieve unrelated credential
sources or request that users paste tokens into chat.

Local API 8087 was rebuilt/restarted with its existing stub/memory flags; health,
Classrooms and Materials capabilities passed. This activates the verified resource
projection fix. Memory sign-ins and saved Demo mutations reset; bundled PDF bytes
and canonical sessions remain. Portal servers on 5173/5174/5175 were preserved.

## Shared authentication frame — released 0.9.0

`system/auth-layout` adds presentation-only `AuthLayout`/`AuthLayoutProps` for
login and password recovery. Required: `title`, `children`. Optional: description,
branding, tools, footer and stable title/description IDs. It uses the existing
token/type system, constrains content width and owns a viewport-height scroller
that remains usable on short phones. Consumers supply existing shared controls,
explicit field labels, validation, focus/error/busy handling and auth workflows.

SSO consumes the released 0.9.0 package. Existing shared controls and tokens remain unchanged; other portal pins remain at 0.8.0. The released HTML catalogue and public mirror include the shared auth fixture at phone, tablet and desktop widths. Acceptance is recorded in
[the auth migration receipt](../architecture/audits/2026-10-19-shared-auth-ui.md).

## Authentication branding placement - 0.9.1

The owner requested moving SSO branding above the auth card and was informed before changing the shared component. AuthLayout adds optional `brandingPlacement: "inside" | "above"`; the default remains `"inside"`. The `"above"` variant renders the same branding slot in a page header outside the main card, within the existing viewport scroller and with the existing spacing tokens. SSO opts in for login and password recovery. Other consumers retain their placement and package pins.

## File tile contrast — 0.9.2

FileUploadField keeps its surface-raised tile background by default. Where an enclosing card also uses surface-raised, opt into the shared fileSurface="elevated" variant. Do not globally lighten file tiles or add portal CSS overrides. Applicant submitted file values use this variant inside their raised detail cards; other controls and consumers retain their current backgrounds. The package archive is published and verified; portal hosting is separate.


0.18.0 verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Control lint, 19 unit cases, type/production build and six focused Chromium/WebKit breadcrumb cases passed, including directory/reference navigation and unsaved-edit guards at 375px and 1543px. All 293 installed package files match the verified registry archive. Six affected captures and both 250-capture catalogue mirrors validate. Only Control restarted; no API, policy, database or hosted portal deployment changed.


0.18.1 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Compact-list coverage verifies side-by-side short values, wrapped long values, contained widths and scrolling to the final virtualized row. Control lint, 19 unit cases, type/production build and two focused summary/list Chromium/WebKit cases passed. All 293 installed package files match the verified registry archive. Three refreshed list captures and both 250-capture catalogue mirrors validate. Only Control restarted; no API/data/policy changes or hosted portal deployment occurred.


0.18.2 verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Six Staff Chromium/WebKit cases at 375/768/1440px verify side-by-side columns, wrapped long pills, right-aligned text, contained scrolling and accessibility; two Control summary/list cases passed. Staff adds a screen-reader-only details heading so hiding the summary does not skip heading levels. All 293 installed package files in each portal match the verified registry archive. Three refreshed list captures and both catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


0.18.3 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Eight focused Chromium/WebKit portal cases verify left-aligned entry names, right-aligned wrapping statuses, transparent/unpadded summary/list statuses, selected navigation and accessibility. All 293 installed package files in each portal match the verified registry archive. Six affected captures and both 250-capture catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


Cross-portal breadcrumb verification (0.18.4): shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff/Lecturer lint, 94 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Applicant lint, three focused header unit cases, type/production build and production-exclusion check passed (its existing unused-variable warning remains). Student lint, 15 focused breadcrumb/route unit cases, type/production build and production-exclusion checks passed. Student bundle budgets passed unchanged: eager JavaScript 194164 gzip bytes against 196608; largest chunk 373077 bytes.

All 25 focused Chromium/WebKit portal cases passed: Applicant four, Student five (1280/1440 Chromium and phone/tablet/desktop WebKit), Staff six, Lecturer four and Control six. Coverage includes parent navigation, selected programme/semester scope, mobile overflow, keyboard/Escape, unsaved application/flow guards and unavailable teaching details. Test-only selectors were scoped to the header and menu dismissal was awaited; unrelated inner breadcrumbs remain intact. All 296 installed files in each of four portals match the verified 0.18.4 registry archive. Nine affected captures and both 253-capture catalogue mirrors validate. Focused portal checks were used under the owner-approved fast workflow; no full Student/Applicant regression-suite claim is made.

Only Applicant, Student, Staff and Control frontends restarted. APIs, SSO, Keychain, Docker, identities, applications, drafts and policies were not reset or migrated. No hosted deployment, commit or push occurred.


## Flow editor family — shared 0.19.0

`ui/switch`, `system/sortable-list` and `system/flow-editor` are controlled, portal-neutral primitives for predefined configurable flows. Linked groups move together; handles are external, keyboard alternatives and announcements are provided, and caller constraints are authoritative. Released 0.19.0 is installed in Control only. See [Flow Editor](flow-editor.md) for complete ownership, settings mapping, runtime compatibility, failure behavior and onboarding requirements. Three synthetic desktop/tablet/phone captures are included; unrelated capture provenance is preserved.


Shared 0.19.1 refines FlowEditor: display-order numbers, dot-separated colored category names, centered linked connectors and toggle-before-chevron ordering. Reorder controls remain disabled on read-only flows; editable drafts retain drag and keyboard/tap arrows. Control alone upgrades and hides international-only cards from Local while preserving their saved settings/order slots. No API, policy or application state changes. See [Flow Editor](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/design/flow-editor.md).


0.19.1 verification: required shared release checks passed (67 unit, 68 Chromium and 57 WebKit cases with one phone-pointer skip); the final card refinement additionally passed five focused Chromium and nine phone/tablet WebKit cases. Control lint (existing sso.ts warning), 23 units and type/production build passed. All 18 focused Control browser cases are covered by 17 passes plus a successful WebKit navigation retry. Checks cover Local visibility, retained hidden settings, reorder numbering, card/toggle isolation and wrapping. All 305 Control package files match the released registry archive; both 256-capture catalogues validate. Only Control restarted; no policy/application/backend state changed.


### Flow card refinements — shared 0.19.2

FlowEditor omits visible up/down buttons. External handles support dragging and Alt+Up/Down keyboard reordering with screen-reader instructions and announcements. Number badges are 32px blue circles with white text. Applicant Action uses a semantic purple token. Other SortableList consumers retain their default move buttons through `showMoveButtons`.

ContentSection adds optional `description` below its title inside the header, with standard body typography, muted color and 4px separation. Its 36px minimum header grows as needed; omitted descriptions preserve existing consumers. Control uses the slot for the published Flow Steps notice instead of a separate small caption. Only Control upgrades; no policy/API/application changes.


0.19.2 verification: 68 shared units, consumer build, 68 Chromium and 57 WebKit cases passed (one phone-pointer skip). Control lint (existing warning), 23 units and type/production build passed. Ten focused Control browser cases are covered by nine initial passes and a successful isolated WebKit navigation retry. All 305 installed files match the released archive; both 256-capture catalogues validate. Control cache was rebuilt and its served modules verified. No settings, policies or applications changed.


### Shared FlowEditor 0.19.3

Step numbers use white text on the shared black background token. All category names end in Step, retaining their existing semantic colors and dot separators. Parent-to-child spacing is 12px, matching the parent-group gap. Step cards use the shared surface-hover background on hover. Only Control upgrades; no configuration, policy, application or backend changes.


### Mandatory/fixed steps — shared 0.19.4

Mandatory steps omit their enable toggle and visible required caption. Control marks Offer and International tuition mandatory using the existing template rules; this does not alter policy validation or applicability. Fixed-order steps display a lock in the external handle slot instead of inside the card. Handles and locks center against the parent card, including linked groups and wrapped labels. Shared SortableList `renderChildren` keeps linked content in a separate grid row so it cannot shift the handle. Only Control upgrades; existing settings, reviewer bindings and application state are unchanged.


### Minimal category labels — shared 0.19.5

FlowEditor categories now use one muted gray treatment with concise labels (Review, Payment, Document release, Applicant action), separated by middle dots. The repeated Step suffix is removed. Black number circles and white step names retain the hierarchy; colors remain on controls/status. Existing mandatory/fixed behavior, spacing, hover, interactions and policies are unchanged. Only Control upgrades.


## Non-configurable flow cards — 0.24.0

FlowStep.configurable defaults to true. Templates set it false when no operational settings, document configuration or reviewer assignment exists. Shared FlowEditor then renders static content without a configuration button, chevron or card hover; enable switches remain independent and ordering/linked children retain their rules. Published or disabled steps with actual settings remain inspectable. Control adopts the exact registry release and marks Confirm Eligibility static. No workflow policy or authorization changes occur.

## Checkbox — 0.25.0

Use Checkbox from ui/checkbox or the package root for independent boolean selections. It owns the 16px indicator, minimum 36px labelled target, native keyboard/form behavior, visible focus and disabled/invalid states. Portals own labelled groups, responsive arrangement and domain selection rules. Control payment popups use Bank Transfer / Counter, inline from sm and stacked on phones. No other portal package pin changes.

The required shared gate passed 81 units, consumer build, 80 Chromium and 80 WebKit cases (two pre-existing phone-pointer skips). A Student compatibility bundle built against the candidate without changing its package pin or installation; existing dynamic-import warning remains. Three synthetic captures document the new component. The exact 0.25.0 archive is verified in GitHub Packages.

Control registry pin/lock now use 0.25.0; all 317 installed archive files match the verified release. Control lint/type/build passed with its existing SSO and bundle warnings. Six responsive payment-popup browser cases passed, including a focused retry of one Chromium case after a Vite dependency-reload interruption. Local Control restarted; API, policies and payment records were not changed by this shared-component follow-up.
