# Released package catalogue — @raisd-campus/design-system 0.19.8

Canonical copy of the published package `docs/components.md` from GitHub Packages
`@raisd-campus/design-system@0.19.8` (integrity `sha512-FYAjj7steFnPk9sjCnqCQpXnHEsjlvGrobsAMHC3uoZ5ThDgogJa92VseR8FPd+POUULnsO9JuNUAKGZlixDNw==`,
published 2026-10-28). Exact props remain in the installed TypeScript declarations for the
pinned version. The design-system git tags currently stop at `v0.9.1`; prefer this file or
`node_modules/@raisd-campus/design-system/docs/components.md` over an outdated GitHub blob.

Visual HTML captures under `docs/design-system/` retain historical provenance for earlier
releases. New patterns from 0.9.2–0.19.8 are documented here; fixture screenshots for those
APIs require the unpublished consumer examples and are not invented here.


## ContentSection subheadings — 0.15.0

Use `titleVariant="subheading"` on ContentSection for the shared 16px medium `type-title` style. The default page heading remains 18px; panel/sidebar typography, the 36px minimum header and all layout gaps remain unchanged when omitted. Custom `heading` content continues to own its typography. The fixture `?content-sections&subheadings` compares the opt-in heading with unchanged default/custom/sidebar examples.

## Admin workspace title actions — 0.14.0

`AdminRecordWorkspace.titleActions?: ReactNode` renders additional title actions immediately before the existing Close control; sidebar `actions` remain separate. `AdminRecordPanel.iconLabel?: string` labels an entity icon when no photo is supplied. Existing markup, photo/fallback semantics and layout remain unchanged when omitted. Fixture: `?admin-record-flow&record=record-1&title-actions`.

## ChipField — 0.13.0

From 0.13.1, ChipField shares the existing DropdownMenu content and selectable-item style definitions: elevated surface, radius, padding, shadow/ring, motion, row geometry and trailing checkmarks. Popover positioning and searchable listbox semantics are retained. Existing dropdown-menu appearance is unchanged. Clicking field space, a chip label or the placeholder opens the picker; removal buttons only remove their chip. From 0.17.0, the chevron is removed and the full field toggles the picker.

Import `ChipField` from `ui/chip-field` or the package root. Its controlled `value: readonly string[]`, `options: readonly { value: string; label: string; disabled?: boolean }[]` and `onValueChange` select supplied options only, with duplicate selections removed. Pass `ariaLabel`, optional `id`, `aria-describedby`, `placeholder`, `searchPlaceholder`, `disabled` and `invalid`. Labels, errors, validation and persistence belong to the consumer.

From 0.17.0, ChipField has a 36px minimum height on all pointer types. Selected chips wrap onto additional lines and the field grows naturally, without horizontal chip scrolling or a chevron. Long labels stay within the field. The full-field native picker trigger remains keyboard accessible; labelled chip removal buttons are separate sibling controls, never nested inside that trigger. The searchable multi-select popover remains open while toggling options; search is case-insensitive and shows a no-results message. Keyboard: open with Enter/Space or arrows, navigate results with arrows (Alt+Home/End for endpoints), Enter toggles, Escape closes and returns focus, Delete/Backspace removes a focused chip. Disabled options cannot be changed. The fixture at `?chip-field` demonstrates many/empty/disabled/invalid/long-label states.

```tsx
<ChipField ariaLabel="Apply to" value={campusIds} options={campuses} onValueChange={setCampusIds} searchPlaceholder="Search campuses" />
```

## LinkedList panel cards — 0.11.0

Use `variant="panel"` on `LinkedList` for standalone clickable cards with `bg-surface` and the same 12px radius as `PagePanelLayout`. The default retains `bg-surface-raised` and its existing radius. Links, buttons, disabled states, padding, keyboard focus and hover behavior are unchanged. Example: `<LinkedList variant="panel" ariaLabel="Available flows" items={flows} />`. The synthetic consumer example is available at `?linked-list-panel`.

## Audit trail — 0.8.0

Import `AuditTrail`, `AuditTrailEntry`, `AuditTrailActor`, `AuditTrailChange` and
`AuditTrailProps` from `system/audit-trail`.

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

Use the installed package subpath with the standard stylesheet and Tailwind source
registration. No sibling-source aliases or installed-file patches are required.
The standalone consumer at `?audit-trail` covers photos, broken/missing photos,
empty content, invalid timestamps and long content at phone, tablet and desktop widths.

## Shared conversation presentation

Import `ChatMessageRow`, `DateDivider` and `ChatMessageView` from `system/chat-message`, and the controlled `ChatComposer`/`ChatComposerProps` from `system/chat-composer`. These preserve Student's existing message bubbles, avatar, timestamp, file/image presentation, lightbox and composer geometry. The composer receives `value`, `pending`, sending/disabled/error states and callbacks for editing, file selection, removal and sending. Consumers own attachment policy, draft retention, previews and cleanup, read acknowledgements, API calls and workflow. Enter sends; Shift+Enter adds a line. Do not add deletion callbacks for immutable case conversations.

Import components and types through `@raisd-campus/design-system/ui/<name>` or `@raisd-campus/design-system/system/<name>`. The published TypeScript declarations are the exact export and prop reference. These examples describe when to use each component. Shared CSS and token setup are in the [README](../README.md); campus-wide use rules live in [control-plane](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/design/component-library.md).

## Tokens and type

Use `background`, `surface-subtle`, `surface`, `surface-raised`, `surface-elevated`, and `surface-hover` for neutral elevation. Use `brand`, `success`, `warning`, and `destructive` for meaning; solid variants are for filled controls. Use `title`, `body`, and `muted-foreground` for text hierarchy. Prefer the shared `type-*` typography utilities and documented responsive patterns over raw colours or one-off component styling. The initial theme is dark-only. Shared controls retain touch targets and keyboard focus states.

## UI primitives

Standard `Input`, `DropdownSelect` and `DatePicker` fields use 36px height, 14px text and 20px line height on phone, tablet and desktop, including coarse pointers. `DropdownSelect` exposes `data-slot="dropdown-select-trigger"`. Textareas retain 14px text and their multiline minimum height; other touch controls retain their existing targets. Portals own viewport metadata for focus-zoom suppression. Survey answer labels also use 14px text; survey questions and choice-card geometry retain their existing scale.

| Use | Exports | Guidance |
| --- | --- | --- |
| Actions | `Button`, `IconButton`, `buttonVariants` | Use semantic variants and native disabled state; icon-only actions need an accessible name or tooltip. |
| Status and identity | `Badge`, `Avatar`, `AvatarImage`, `AvatarFallback`, `Skeleton` | Pair colour with visible text. Skeletons need a labelled loading container. |
| Fields | `Input`, `Textarea`, `DropdownSelect`, `DatePicker`, `Calendar` | Labels, guidance, and errors belong to the consumer; pass accessible IDs and disabled states. |
| Disclosure and overlays | `Accordion`, `Collapsible`, `Dialog`, `Sheet`, `Tooltip`, `DropdownMenu`, `ContextMenu` | Use the provided focus and keyboard behaviour; the consumer owns whether an action is available. |
| Navigation | `Breadcrumb`, `Tabs`, `SegmentedTabs`, `SegmentedTabsContent`, `Separator` | Tab strips remain usable at narrow widths. `SegmentedTabsContent` is distinct from ordinary `TabsContent`. |

Compound primitives export their named subcomponents through the package root; consult the declarations for the exact set and props.

Enabled `AccordionTrigger` controls use a pointer cursor. Expanded triggers have square bottom corners and a semantic border divider separating the trigger from its content. Consumers retain the title content and typography; disabled triggers keep their existing disabled interaction and opacity.

`AvatarFallback` defaults to `surface="default"` (`bg-surface`). Use `surface="subtle"` (`bg-surface-subtle`) for a darker fallback on a surface background. Shared `ChatMessageRow` uses this subtle option; avatar sizes and image presentation stay unchanged.

## Portal-neutral patterns

| Use | Exports | Guidance |
| --- | --- | --- |
| Page structure | `ContentSection`, `PagePanelLayout`, `PageActionBar`, `TabbedPagePanel`, `TabbedPagePanelBanner`, `CardGrid`, `InnerSection` | Compose portal-specific content and navigation through props and slots. |

From 0.12.0, `ContentSection` accepts optional `label?: ReactNode`. It renders a muted shared label above the title/custom heading, using the same header container and action slot. Page, panel and sidebar variants support it. Omit it to preserve existing markup and appearance. The header keeps its 36px minimum and grows naturally for labels or multiline content. For example: `<ContentSection type="page" plain label="Admissions" title="Global" actions={actions} />`.

From 0.10.5, every `ContentSection` title container has a 36px minimum height, including page, sidebar, panel and custom-heading variants. Longer headings and action slots can grow naturally. This does not change title typography or the 16px default page gap.

From 0.10.2, the default page `ContentSection` uses a 16px title-to-content gap. `pageSectionVariants()` exports this same default for route shells that must retain their own semantic headings, status roles or layout wrappers. Do not repeat a local `gap-4`/`gap-6`/`gap-8` for page-heading spacing. Panel header geometry, sidebar spacing, page gutters and internal section/group spacing are unchanged.
| Portal shell | `PortalShell`, `PortalSidebar`, `PortalHeader`, `PortalNavItem`, `PortalNavGroup`, `PortalAccount`, `PortalMain`, `PortalPageContent` | Use one responsive frame across portals. Supply routes, logo, navigation, footer, account details, and optional sidebar panel from the owning app. |
| Information | `SummaryCard`, `RecordSummaryCard`, `DetailField`, `DetailSectionCard`, `DataTable`, `EmptyState`, `StatusIndicator`, `IssueCard`, `QueryErrorState` | Pass display data and callbacks. Use `DataTable.compactCards` for record lists and `minTableWidth` for comparisons. |
| Forms and files | `FormGrid`, `AddRowButton`, `RemoveRowButton`, `FileUploadField`, `FileLink` | The portal owns file validation, storage, and submission. `FileUploadField` is presentation and selection only. |
| Surveys and wizards | `SurveyLayout`, `SurveyChoiceGroup` | One large question per screen, controlled choices, progress and action slots. The portal owns branches and answers. |
| Navigation and media | `LinkedList`, `ContentBreadcrumb`, `ResponsiveMedia`, `MediaPreviewLightbox`, `Popup`, `TooltipIcon` | `LinkedList` takes `renderLink` to use a portal router, or native anchors by default. |

`TabbedPagePanel` fills its containing width, including with a single tab and short content. From 0.5.1 its horizontal page frame explicitly uses a column layout so content does not shrink to its tab label.
| Academic and communication visuals | `SemesterSelector`, `OnlineClassIndicator`, `ChatFilePill`, `ChatImagePreview`, `CommunityToggle` | Reuse visuals where applicable. Student status decisions, chat drafts and attachment policy remain local. |

Other exports include `ArrowNavigationButton`, `AttentionIndicator`, `CalendarMonthSelector`, `SegmentedBar`, and related public types. See the versioned declarations under `dist/` for the complete list.

### Undivided detail fields

`DetailField` supports `readOnly`, `readOnlyStacked`, `editable`, and `editableUndivided` variants. The `editableUndivided` variant keeps the editable label-and-control layout and responsive stacking, but omits the bottom divider and uses tighter vertical spacing between fields. Use it when the enclosing form section groups fields without row separators. Pass `tooltip` to add a keyboard-accessible help icon immediately after the label's final word, including when the label wraps. Omit `tooltip` or set `tooltipEnabled={false}` to hide it.

Use `readOnly` with a read-only `FileUploadField` as its `value` when uploaded files must share the other fields' label/value columns. `readOnlyStacked` intentionally places the value below its label; do not choose it solely because a field contains a file.

```tsx
import { DetailField } from "@raisd-campus/design-system/system/detail-field"
import { Input } from "@raisd-campus/design-system/ui/input"

<DetailField label="Full Name" variant="editableUndivided">
  <Input aria-label="Full Name" value={fullName} onChange={handleNameChange} />
</DetailField>

<DetailField label="Field of Study (optional)" variant="editableUndivided" tooltip="For example, graphic design">
  <Input aria-label="Field of Study" value={fieldOfStudy} onChange={handleFieldOfStudyChange} />
</DetailField>
```

### Example: portal frame

```tsx
import { PortalShell, PortalSidebar, PortalHeader, PortalMain, PortalPageContent,
  PortalNavItem, PortalAccount } from "@raisd-campus/design-system/system/portal-shell"

<PortalShell>
  <PortalSidebar
    logo={<img src="/campus-logo.png" alt="Campus" />}
    navigation={<PortalNavItem label="Applications" icon={ClipboardList} active onClick={openApplications} />}
    footer={<PortalNavItem label="Log out" icon={LogOut} onClick={signOut} />}
  />
  <PortalMain>
    <PortalHeader breadcrumb="Applications" account={<PortalAccount name="Applicant" fallback="A" />} />
    <PortalPageContent>{page}</PortalPageContent>
  </PortalMain>
</PortalShell>
```

Import the icon components from `lucide-react`, or pass any React icon element type. `PortalShell` owns the viewport height, 768px and 1200px layout breakpoints, navigation state, and Ctrl/Cmd+B toggle. `PortalSidebar` owns the full-screen phone drawer, 72px tablet rail, floating desktop frame, centred logo, scrollable navigation and separated footer. It accepts `aside` and `edge` slots for an optional desktop panel and its resize control, and `width` for the combined desktop width. `PortalHeader` owns the divider, safe-area top inset, and menu trigger; `leading`, `beforeAccount`, `account`, and `actions` slots let each portal add its own controls. `PortalAccount` uses a 36px avatar and accepts optional name, detail, image, click callback and accessible action label. `PortalPageContent` supplies 16/24/48px gutters; `PortalMain` is the sole page scroller and reserves a stable scrollbar gutter so content width does not shift between routes. `usePortalLayout`, `portalLayoutForWidth`, and `usePortalShell` support portal-owned responsive decisions. Navigation and authentication callbacks stay in the portal. Use `PortalNavGroup` for related items; nested route and disclosure decisions remain portal-owned.

### Example: card and action

```tsx
import { Button } from "@raisd-campus/design-system/ui/button"
import { SummaryCard } from "@raisd-campus/design-system/system/summary-card"

<SummaryCard label="Open cases" value={3} action={<Button onClick={openCases}>View cases</Button>} />
```

`SummaryCard` accepts `label`, `value`, `action`, `description`, `items`, `supportingContent`, `footerContent`, `surface`, `variant`, `emphasis`, and `tone` plus div props. The portal supplies values and decisions; the component owns layout and typography.

### Example: record summary card

```tsx
import { RecordSummaryCard } from "@raisd-campus/design-system/system/record-summary-card"

<RecordSummaryCard
  referenceLabel="Application Reference"
  reference="Preview #000001"
  fields={[{ id: "programme", label: "Programme", value: "Example programme" }]}
  status="Pending Review"
  statusTone="warning"
/>
```

`RecordSummaryCard` presents its reference as the first labelled row, followed by evenly spaced values and an edge-to-edge status footer. The first value has the same 12px space above it as later values, including below the reference divider. `referenceLabel` defaults to "Reference"; portals can supply a more specific label. Pass `onSelect` and `actionLabel` to make the whole card a keyboard-accessible button; omit them for a display-only card. The portal supplies record labels, formatted values, status text and tone. Available tones are `neutral`, `warning`, `destructive`, and `success`.

### Example: a portal router in `LinkedList`

```tsx
import { Link } from "react-router-dom"
import { LinkedList } from "@raisd-campus/design-system/system/linked-list"

<LinkedList
  ariaLabel="Forms"
  items={[{ id: "clearance", title: "Graduation Clearance", to: "/forms/clearance" }]}
  renderLink={(to, content, className) => <Link to={to} className={className}>{content}</Link>}
/>
```

`LinkedList` items can also have `description`, `thumbnail`, `icon`, `onSelect`, `disabled`, and `disabledDescription`. A portal route is never inferred by the package.

### Example: file field

```tsx
import { FileUploadField } from "@raisd-campus/design-system/system/file-upload-field"

<FileUploadField label="Evidence" files={files} onFilesSelected={validateAndStageFiles} onRemove={removeStagedFile} />
```

The consumer validates MIME, size and count, owns selected `File` objects, and decides whether upload or persistence is available. The field supports `readOnly`, `disabled`, `error`, `hint`, `accept`, and `multiple` states.

## Survey / wizard layout (0.5.0)

Import `SurveyLayout` and `SurveyChoiceGroup` from `system/survey-layout`. `SurveyLayout` accepts a string `question`, a stable `questionKey`, optional `description`, `progress={{ current, total }}`, answer `children`, and `actions`. It moves focus to the question when `questionKey` changes and uses a 32px question heading on phones, increasing to 48px on wider screens (`type-survey-question`). Keep controls and navigation in the slots rather than creating a second page scroller.

`SurveyChoiceGroup` accepts an accessible `label`, controlled `value`, `onValueChange`, and `options` containing `value`, `label`, optional `description` and `disabled`. Native radios provide mutually exclusive choices and arrow-key navigation. An optional group-level `disabled` prop disables all choices. Both components accept `className`.

```tsx
<SurveyLayout question="Which campus?" questionKey="campus" progress={{ current: 1, total: 2 }} actions={<Button disabled={!campus} onClick={next}>Continue</Button>}>
  <SurveyChoiceGroup label="Which campus?" value={campus} onValueChange={setCampus} options={campuses} />
</SurveyLayout>
```

The portal owns question order, branching, validation, answer retention, completion and routes. A survey can also supply a dropdown or another accessible control through `children`. The package does not store answers or automatically advance after selection.

## What stays in a portal

Do not move student profile issues, programme enrolment context, credit-load eligibility, next-action routing, service queries, or Community draft ownership into this package. A portal maps those records and rules into the generic visuals above. See the [published design system catalogue](https://raisd-campus.github.io/portal-api-docs/design-system/) for released shared and student-specific visual examples; its static captures use mock data. Exact props remain in this version's declarations.

### Popup trailing action (0.6.2)

`footerAfterDismiss?: ReactNode` places a portal-owned action after the standard dismiss button. Use `footer` for leading actions, then the built-in dismissal, then `footerAfterDismiss` for Save & Close or similar workflows. The portal owns saving, pending/error state and navigation; trailing actions do not close the dialog automatically. Existing popup defaults and geometry are unchanged. Consumers must pin 0.6.2 or later before using this slot.

## Community presentation (0.7.0)

`system/community` exports controlled `CommunityDirectory`, `CommunityGroupList`, `CommunityConversationLayout`, `CommunityPanel` and supporting people/stack/badge/fade components. These extract Student's existing presentation unchanged. Consumers supply display records, slots, current identity, layer state and callbacks; routes, eligibility, queries, drafts, uploads and persistence stay outside this package. `CommunityPanel` supports the desktop dock and the full-viewport phone/tablet overlay. `ChatMessageRow.onDownloadAttachment` optionally enables authenticated file download through a consumer callback; no callback preserves the current metadata-only tile.

Community subpaths: `system/community` (directory/group lists, dock/overlay and layout), `system/community-members` (roster), `system/community-conversation-header` (identity/header) and `system/community-message-list` (messages). Separate imports preserve lazy consumer boundaries.

Desktop resizing is shared via `system/community-resize`: `CommunityResizeHandle`, the 296px default, 256–640px bounds, viewport-aware `clampCommunityWidth` and 16px keyboard step. Place the handle in `PortalSidebar edge`, control the shell's `--sidebar-community-width`, and remove width animation while dragging. Use `ChatComposer communityInset` within `CommunityConversationLayout inset` to retain Student's full-width composer footer. Both portals use these shared APIs; overlays have no resize grip.

`system/community-conversation-state` exports Student-derived `CommunityDirectEmptyState` (name/avatar), disabled `CommunityProfilePlaceholder`, centered `CommunityLoadingState` and callback-based `CommunityConversationError`. Directory, members and conversation layout accept opt-in `autoFade` using Student's existing 12px overflow threshold and shared gradients; omitted props preserve previous controlled/default behavior. Lecturer enables this mode; Student source and existing controlled fades remain unchanged.

## Portal UI presentation (0.7.0)

The package stylesheet owns common portal font/surface/border foundation, enabled interactive cursors (native and ARIA-disabled controls excluded), state/orientation variants, page-content container sizing, touch navigation/composer geometry, phone hover behavior and forced-color scrollbars. Consumers import styles.css and register dist as a Tailwind source; no additional vendor state-variant import or local cursor rule is needed. Applications still own their document overflow policy.

| Subpath | Export / presentation contract |
| --- | --- |
| system/student-summary-card | StudentSummaryCard / StudentSummaryCardSkeleton: display identity/programme/semester fields, original slots and complete narrow-container CSS; no portal contracts |
| system/edit-form-actions | EditFormActions: controlled editing/saving flags, edit/cancel callbacks and original submit button; optional dataSlot |
| system/document-actions | DocumentActions: previewUrl/downloadUrl/fileName and optional labels/dataSlot; equal-width actions, native preview/download links and disabled state; consumer owns bytes and temporary URLs |
| system/wizard-step-panel | WizardStepPanel / WizardStep: controlled steps/active/completed/disabled sets, selection callback, children, navigationLabel/contentId/contentLabel; existing desktop sticky and phone scrolling/centering/connector behavior |
| system/capacity-meter | CapacityMeter: value/maximum, resolved label/valid state, accessible labels and optional slots; caller owns academic or resource-limit policy |
| system/learning-content-row | LearningContentRow: title/label/kind/icon, locked state, optional status slot, onSelect and card/inline variant; caller formats deadlines/submission badges |
| system/person-action-card | PersonActionCard: name/avatarUrl/fallback, action slot, optional description/descriptionId/dataSlot; no review/identity workflow |
| system/content-carousel | ContentCarousel: items of id/content, title/ariaLabel, optional headerAction/empty slots and previous/next labels; existing responsive card density, drag-link suppression, scroll controls and phone heading CSS |
| system/horizontal-scroll | useHorizontalScroll: existing neutral resize/scroll/pointer controller; no routing or records |

SurveyLayout.phoneLayout defaults to default; compact opts into Applicant's existing start-aligned phone question area and three-column action row. DetailSectionCard.headerStackOnPhone defaults false and opts into Applicant's existing vertical phone title/action header. Other consumer states stay unchanged.

Example:
```tsx
<DocumentActions previewUrl={ownedPdfUrl} fileName={issuedFileName}
  previewLabel="Preview Letter" downloadLabel="Download Letter" />
<SurveyLayout phoneLayout="compact" {...controlledQuestionProps} />
<DetailSectionCard headerStackOnPhone title="Address" actions={sameAddressControl}>
  {addressFields}
</DetailSectionCard>
```

For Community, always assemble the desktop panel with PortalSidebar.aside and PortalSidebar.edge containing CommunityResizeHandle. Use the shared clamp/width constants and the overlay mode on phone/tablet. The handle's drag/keyboard interaction and composer/footer placement have consumer browser regressions; importing only the panel is incomplete dock composition.

Standalone verification/example: examples/consumer/?audit. It deliberately imports only Tailwind + the shared stylesheet, so portal-local dependencies cannot hide cursor, state, geometry or disabled-control gaps. These examples exercise the versioned package without portal CSS.


Three-tab responsive correction (13 October 2026): shared SegmentedTabs now applies its existing 9rem-per-tab minimum width for three or more tabs, using the existing horizontal scroller, edge fades and active/keyboard reveal. Two-tab behavior stays unchanged. This extends Student Online Forms existing scrolling behavior without a Lecturer override. Owner approved the correction.

### Per-file actions (0.7.0)

`FileUploadField.renderFileActions(file)` optionally renders consumer-supplied actions inside each existing file card. It works with `multiple` and `readOnly`; omitting it preserves every existing consumer's appearance and behavior. The component owns wrapping and keyboard-safe card structure, while portals own original bytes, filenames, URLs, previews, downloads, pending/disabled actions and upload limits. The existing `multiple` prop remains unchanged; there is no new multi-upload component or portal override.

```tsx
<FileUploadField label="Resources" multiple files={displayFiles}
  onFilesSelected={selectFiles} onRemove={removeFile}
  renderFileActions={file => <Button type="button" variant="secondary" onClick={() => previewFile(file.id)}>Preview</Button>} />
```

The package consumer fixture at `?files` demonstrates multiple selection, removal and per-card Preview/Download actions without portal CSS. Existing Student/Applicant forms require no migration.


## Read-only file container refinement - 14 October 2026

FileUploadField now omits the outer dashed upload border, padding and minimum upload-container height when readOnly is true. It retains each existing file card, filename, size, empty/error text, accessible labelling and optional per-file Preview/Download actions. Editable and disabled-editable uploads keep their existing upload container. This owner-requested rule belongs to the shared component; no Lecturer override or new prop is added. The package fixture at ?files&readonly demonstrates it without portal CSS. This default applies to every read-only consumer of 0.7.0; portals retain ownership of validation, files and workflow.

## Authentication layout — 0.9.0

Import `AuthLayout` and `AuthLayoutProps` from `system/auth-layout`. It provides
one viewport-height scroll region, a constrained responsive panel, a labelled
main landmark and heading/description, plus optional `branding`, `tools` and
`footer` ReactNode slots. `title` and `children` are required; `titleId` and
`descriptionId` are optional stable IDs. Long content grows and scrolls at short
phone heights; headings and footers wrap. It uses shared surfaces and type utilities.

Compose forms with existing Button/Input and explicit labels. The consumer owns
validation, busy states, errors, password/passkey/reset flows, navigation, branding,
viewport metadata and identity. No existing control or token changes. The consumer
fixture `?auth` shows keyboard-labelled email/password fields and action buttons.
Available from 0.9.0. SSO consumes this layout; existing portal controls and tokens are unchanged.

### AuthLayout branding placement (0.9.1)

Set `brandingPlacement="above"` to centre the supplied branding outside and above the card, within the existing viewport scroller. The default `"inside"` preserves existing layouts. SSO opts in for login, forgot password and reset password.

## File tile contrast — 0.9.2

FileUploadField keeps its existing surface-raised file-tile background by default. Set fileSurface="elevated" only when its enclosing card already uses surface-raised, to give file tiles a lighter background. This shared opt-in works in read-only and editable states; container geometry, filenames, sizes, actions and upload behavior are unchanged.

## Portal account identity — 0.9.3

PortalAccount accepts optional userId and roles. It displays user ID · Role, Role under the existing name, normalizes role keys (admin → Staff) and deduplicates roles. Existing detail-only consumers retain their presentation. Portals supply authenticated identity; this component does not fetch profiles or grant access.


## Admin record flow - 0.18.3

From 0.18.3, compact `record-list` entries keep supplied values side by side in equal flexible columns. Entry names/links are left-aligned and status values are right-aligned. In compact lists only, badges retain their semantic text color but have no background, border or padding. From 0.19.6 the AdminRecordPanel summary status slot preserves the supplied Badge variant, background, border, radius and padding. Long names and status sentences wrap within their columns without horizontal scrolling. Badge appearance outside this pattern is unchanged. Directory tables retain their normal columns. Virtual measurement, search/filter controls, full-row links, keyboard access and selected-row semantics are preserved.

### Sidebar scrolling - 0.11.1

From 0.11.1, desktop sidebars fill the remaining PortalMain height and stay sticky below the header. The summary/list switch and optional action footer stay fixed; only summary content or virtualized list rows scroll. Transparent masks are removed. Narrow layouts keep a compact bounded panel above the form, with actions below it. Summary/list views stay mounted to retain their state.

### Earlier summary refinement - 0.10.4

From 0.10.4, the summary panel accepts `photo={{src, alt}}` for a 96px circular portrait with a person fallback. Summary fields are centered. The standard page title uses `type-section`. The earlier 0.10.4 layout used natural-height desktop summaries and transparent edge masks; 0.11.1 supersedes that scrolling behavior. Narrow layouts bound the summary to 50dvh above the form and keep optional actions below it. Summary/list and action buttons fill the column width; omit `actions` to remove the footer entirely. Portals own authenticated photo delivery and object-URL cleanup.

From 0.10.3, AdminTable empty, no-match and error feedback has a shared 16px side inset aligned with the toolbar/footer. This includes the compact record-list presentation. Populated row scrolling, loading states and feedback component defaults are unchanged.

Import the family from `@raisd-campus/design-system/system/admin-record-flow`. This additive family leaves DataTable and every existing portal unchanged. It adapts the owner-provided earlier CMS table/workspace patterns to current tokens, spacing, typography, buttons, fields, popups, feedback and surfaces.

- `AdminTable<Row>` uses column accessors for search, sort, quick scopes and advanced filters over the complete supplied authorized row set. It provides loading/error/retry/empty states and directory pagination (10/20/50; default 10). `presentation="record-list"` uses bounded virtualized continuous scrolling without pagination or quick scopes. `rowLink` accepts a native link or button renderer; render only the picker columns you need. Optional controlled `state`/`onStateChange` preserves directory state across unmounts.
- `AdminTableToolbar` and `AdminTableFooter` expose the same presentation for composed lists, including action slots, labelled search, filtered total and pagination. Table state/search/filtering never implies backend querying of unloaded rows.

From 0.10.6, quick scopes accept optional `allPosition="last"` to put All after the caller-ordered status tabs. The default remains All first. Tab order does not change the selected scope or filter behavior.

From 0.10.1, quick scopes compose the existing `TabbedPagePanel` with its divider and scrollable, accessible tab/panel relationships. Search and filtering stay below the tabs; `AdminTableToolbar.children` places the table/footer inside the selected panel without copying tab styles. Advanced-filter and remove-rule actions use the shared `Button size="icon"` (36px; 44px coarse-pointer target). Page consumers compose `ContentSection type="page" plain` for the standard page heading and title-to-content spacing; a single assigned campus needs no selector.
- `AdminRecordWorkspace` takes title, controlled mode, Close callback, panel/actions/content slots and loading/error/retry. `AdminRecordPanel` offers create guidance, summary and record-list views without unmounting either view. Summary/list switching must not unmount the main form.
- `useAdminRecordFlow` starts existing IDs in read mode and null IDs in create mode. Consumers own values/baselines/dirty calculation, validation, permissions, record persistence and routing. Save returns `{status:"saved"}`, `{status:"invalid"}` or `{status:"failed",message}`. Only acknowledged success returns to read. `requestLeave(destination)` guards dirty navigation; Keep editing cancels, Discard calls onDiscard then destination, and Save continues only on success. Create uses the same protection. `onNavigationCancelled` lets router adapters reset blocked navigation after Keep editing or unsuccessful saving. Native unload is guarded while dirty.
- `AdminRecordActions` shows Edit (optional), Save/Create, Cancel and optional Delete. `AdminRecordDialogs` composes shared Popups for unsaved decisions, typed confirmation and action failures. Delete requires a callback plus label/value confirmation configuration; server authorization/dependency checks stay with the portal. Dismissal is locked while writes are pending.

The workspace uses available content width, switching from a compact panel above the form/actions to a two-column layout at 56rem. It does not subtract a fixed shell/header height. Table overflow stays inside a labelled keyboard-scrollable region. The compact picker is capped at `min(50dvh, 24rem)` and uses dynamically measured virtual rows.

Synthetic demonstration: `examples/consumer/?admin-record-flow`, with `&record=record-1`, `&large`, `&readonly` or `&state=loading|error|empty`. Controls simulate invalid/save-failure/delete-failure outcomes without network writes. See canonical [Admin flow guidance](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/design/admin-record-flow.md) for full filtering behavior and router ownership. Existing portal pins are not upgraded by this release.

### RadioField

Import `RadioField` from `ui/radio-field` or the package root. A compact controlled radio field with 16px outlined indicators and shared body text. Options stack on phones and sit inline from `sm` with wrapping for long labels. The 36px option targets align with standard form controls. Pass `value`, `options` (`value`, `label`, optional `disabled`), `onValueChange`, `ariaLabel`, and optionally `id`, `name`, `ariaDescribedBy`, `disabled`, `invalid` or `className`. Native radios retain arrow-key navigation, focus and disabled semantics. Use it within `DetailField` for simple form choices such as Draft / Published. SurveyChoiceGroup remains unchanged.

### Portal header breadcrumbs — 0.18.0

PortalHeader accepts optional `breadcrumbs: readonly PortalBreadcrumbEntry[]` and `renderBreadcrumbLink(entry, content)` for router integration. Each entry has a label and optional href/onSelect; the last is always the nonlinked current page. Structured breadcrumbs opt in to a single-row header and a bounded flexible breadcrumb region. Existing `breadcrumb` ReactNode consumers retain their previous layout. If both are supplied, structured breadcrumbs take precedence.

`PortalBreadcrumb` is also exported from `system/portal-breadcrumb` and the package root. It uses existing Breadcrumb primitives, shared icon Button and DropdownMenu. ResizeObserver compares the full trail with its available container width, including account/control space. Trails that fit show linked parents and chevrons; overflowing trails show an ellipsis menu with all ancestors and the full current label, plus a truncated current page in the header. Escape returns focus; parent navigation and unsaved-change guards belong to the portal router. No routes, queries, identity or permissions live in this component.


From 0.18.4, PortalBreadcrumb loads its overflow-menu implementation only when the full trail exceeds the available header width. A disabled same-size ellipsis button retains the Show breadcrumb pages label and exposes aria-busy while this chunk loads. Current-page text stays visible. Once ready, the existing menu, keyboard controls and focus-return behavior are unchanged. No consumer routing or identity data lives in the shared component.


From 0.18.5, AdminTableFooter uses the existing secondary Button variant for the current page, with a neutral outline instead of the primary blue fill. Other page buttons and previous/next actions retain the ghost variant. aria-current, labels, focus, disabled states and pagination behavior are unchanged. SummaryCard status pills continue to compose Badge through its existing action slot; no new SummaryCard API is added. Use Badge size="lg" for status summaries. An applied version composes variant="success" on the card, the default neutral title tone, and a success-solid Applied badge; non-applied versions retain the neutral card and secondary Not Applied badge.


## Predefined Flow Editor - 0.19.0

`ui/switch` exports controlled Switch with checked/onCheckedChange, an accessible label and switch semantics. `system/sortable-list` exposes controlled items, canMove and onOrderChange, external handles and Move Up/Down alternatives. `system/flow-editor` composes FlowEditor, FlowStepCard and FlowStepGroup, with Review, Payment, Document Release and Applicant Action icons. Card selection, switch activation and dragging are separate sibling controls. Linked children move with their parent; disabling a parent makes children ineffective without erasing their stored preference. Read-only mode allows inspection and prevents changes.

Consumers supply stable IDs, labels, states, linked children and callbacks. Flow rules, dependency validation, reviewer assignment, authorization, persistence and publication remain outside the package. The synthetic `?flow-editor` example covers linked, fixed, long-label and responsive states.


### Flow editor presentation — 0.19.1

Cards show display-order numbers instead of capability icons. Colored Review, Payment, Document Release and Applicant Action labels appear above the step name, separated by middle dots and wrapping as needed. Numbering includes linked children and updates after reordering; callers supply only applicable steps. `FlowStepCard` and `FlowStepGroup` accept an optional `stepNumber`. Toggles precede the trailing chevron. The stretched primary button keeps the card/chevron inspectable with a separate sibling switch. Child connectors are vertically centered. Move Up/Down controls remain keyboard and tap alternatives to dragging, disabled on read-only versions. Configuration buttons remain inspectable even within a disabled draggable group.


### Flow editor compact handles — 0.19.2

FlowEditor removes visible up/down buttons, retaining external drag handles and Alt+Up/Alt+Down keyboard movement with instructions and announcements. SortableList offers `showMoveButtons` (default true) so other consumers retain their existing controls. Step numbers use 32px blue circles with white text; Applicant Action category text uses the semantic purple `flow-applicant-action` token. Numbering, linked groups, disabled controls and card inspection remain unchanged.


### ContentSection description — 0.19.2

Optional `description: ReactNode` sits below the title/label inside the existing header, using shared body typography, muted text and 4px spacing. The header retains its 36px minimum and grows naturally. The section references the description with `aria-describedby`. Omitted descriptions preserve existing rendering and spacing. Use this slot instead of a separate caption paragraph.


### Flow editor surfaces and spacing — 0.19.3

Number circles use the shared black `background` token with white text. Category labels end in Step (Review Step, Payment Step, Document Release Step, Applicant Action Step). Linked cards use the same 12px vertical gap as parent groups. Card hover uses `surface-hover`, including over the card’s toggle and chevron. Existing ordering, links, keyboard access and settings behavior remain unchanged.


### Required and fixed FlowEditor steps — 0.19.4

`FlowStep.required` hides the enable switch and required-reason caption while retaining an accessible required description. Optional read-only steps retain their disabled switches. Fixed steps show their lock in the external handle slot, never inside the card. Handles and locks align vertically with the parent card, including wrapped and linked groups. SortableList adds optional `renderChildren`, keeping linked content in its own grid row. Ordering and mandatory-step rules remain consumer-owned.


### Minimal FlowEditor categories — 0.19.5

Category labels share muted gray text and concise names: Review, Payment, Document release and Applicant action. Middle-dot separators and the single compact category row remain; repeated Step suffixes are removed. Black number circles, white step titles, toggles, required/fixed behavior, hover and spacing remain unchanged.


From 0.19.7, SortableList commits a pointer drop using the dragged sortable item final index. FlowEditor numbers recalculate from the resulting supplied order, including linked children. Disallowed moves are blocked before optimistic visual reordering; consumer callbacks still own accepted order and persistence. Keyboard reorder, fixed groups and read-only inspection retain their existing behavior.


From 0.19.8, AdminRecordWorkspace measures PortalPageContent bottom padding for its desktop sidebar height, aligning it with the shell bottom gutter instead of substituting the section gap. Content-size changes refresh the measurement. Existing sticky positioning, content-only scrolling, fixed controls and compact phone/tablet layout are unchanged. Outside PortalPageContent the section-gap fallback is retained.
