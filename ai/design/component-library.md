# Shared component library

`raisd-campus/design-system` owns the shared React package `@raisd-campus/design-system`. The four portal applications are separate repositories and consume released package versions. The student portal is the first consumer and the source of the initial visual patterns. `control-plane` and `portal-api-docs` do not import React components.

## Ownership decision

Before building a UI element, look in the package catalogue and the [published visual catalogue](https://docs.raisd.co/design-system/). Import a published component when it expresses the required visual and interaction pattern. Do not copy its source into a portal or run a component generator that creates another local copy. Extend the package when a reusable variant is needed; keep workflow and product decisions in the owning portal.

| Layer | Owner | Examples |
| --- | --- | --- |
| Tokens, type, primitives | `design-system` | Colours, spacing, `Button`, `Badge`, `Input`, `Dialog` |
| Portal-neutral patterns | `design-system` | `PortalShell`, `PortalSidebar`, `PortalHeader`, `PortalAccount`, `SummaryCard`, `RecordSummaryCard`, `DataTable`, `PagePanelLayout` |
| Transactional email | `design-system/email/` + `notifications` | `magic_link`, `applicant_submitted`, `enrolment_accepted`, `learner_access_granted` — send via `notify.raisd.co` |
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
npm install --save-exact @raisd-campus/design-system@0.8.0
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

Import individual `ui/<component>` or `system/<component>` subpaths to keep unused components out of the portal's eager bundle. Do not import `dist` internals or use the root barrel for application code. A consumer should read `node_modules/@raisd-campus/design-system/docs/components.md` and the emitted declarations from its **pinned version** for exact props, states, and examples. The [0.8.0 catalogue](https://github.com/raisd-campus/design-system/blob/v0.8.0/docs/components.md) is the stable online reference; `main` may have newer APIs. The [portal design rules](design-system.md) define token meaning and responsive behaviour. Keep dark-only styling until a cross-portal theming decision is approved. Phone, tablet, and desktop layouts must remain usable.

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
