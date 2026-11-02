# Control portal

## Academic Study Plan University Flow — 29 October 2026

University Flows includes Academic Study Plan at `/flows/academic-curriculum`, with a typed configuration workspace at `/flows/academic-curriculum/versions/:configurationId`. Shared AdminTable, AdminRecordWorkspace, ContentSection, PagePanelLayout, DetailField, FlowStepCard and Popup supply the existing layout and interactions. General Settings saves the name and campus assignment. Versions are separate from Admissions: Create Version saves a draft of the mandatory Study Plan Review template; Apply Version confirms publication after eligible reviewer coverage is present. Published version links and history remain inspectable. Failed saves retain edits and stable retry identifiers; navigation and browser unload protect unsaved names and reviewer selections.

Academic Study Plan lists only actual main modules under Affected Modules: Staff Academic, Applicant My Applications and Student Academic. Study Plan Review appears only inside published or draft Version Details under Flow Steps, with its step number and name; the capability label and supporting description are omitted. The Versions table includes the applied current version even when its history list is empty, plus any saved draft. Create Version opens the saved draft at version=draft; Apply Version stays on the resulting published version. The Versions breadcrumb returns to the table while General edits remain mounted. Reviewer assignments remain live, immediate and access-neutral; required review and publication checks are unchanged.

The required Study Plan Review step opens current campus reviewer assignments. Existing campus Admin roles with Academic Programme access are eligible; the same assignments appear on the role editor. Assignment changes apply immediately and do not grant access or publish policy settings. Staff owns curriculum submission, independent-person review, request changes, and approve-and-publish. Existing enrolments retain their published curriculum. Academic schemas, policy state and routes do not introduce Admissions cohorts, pricing or document templates.


Display terminology is **Study Plan** throughout Academic tabs, actions, breadcrumbs, review flow and feedback. Existing routes, flow/step IDs, API/schema keys, saved record names and recorded audit values are preserved. The built-in Academic Curriculum configuration name has a display-only Academic Study Plan alias; loading it does not change the stored name or create unsaved edits.

## Admissions Versions panel — 27 October 2026

The replacement Admissions workspace adds Versions below General Settings using the existing shared AdminTable, with Version, Status and Effective From (UTC). Rows come only from configuration.history, newest numbered version first; policy drafts and General drafts are not table rows. Applied follows the configuration-list appliedVersion; the API current revision is Published when unassigned, later published revisions are Scheduled and older ones Previous. Status badges use shared semantic colors. Existing shared search, filters, sorting, no-match/empty feedback and 10/20/50 pagination remain available; returning from details retains table state.

Selecting a row adds ?version=1 to the existing configuration URL. Its section body switches from the table to a default PagePanelLayout with ContentBreadcrumb (Versions → Version Details), SummaryCard value Version 1 and SegmentedTabs for Local and International. Local is the default; International adds studentType=international. Both tab panels are deliberately empty in this first slice. Unknown or malformed versions show a shared unavailable state and a return action rather than selecting a different policy. The internal breadcrumb removes only the panel-owned version/studentType parameters. Other search context is preserved.

The surrounding workspace title, sidebar, Affected Modules and General form remain mounted. General's navigation guard permits same-path query/hash browsing while continuing to guard another flow, the reference page, Close and browser navigation away; browser unload protection remains unchanged. Back/Forward and direct-link refresh restore version/type selection. Opening another flow resets the Versions component/table state through the existing stable configuration identity. Create Version is a primary Plus button in the AdminTable actions slot, opposite search. It performs no action in this UI slice; no creation workflow, copying, configuration editing or publication controls are included. Existing flows.configure access, request cancellation, loading/error/retry and original read-only reference are preserved. The version view composes shared SummaryCard using its existing action slot for a large Badge. Applied versions use the success card background with the default neutral title tone and a success-solid Applied badge. Other versions keep the default neutral card and a secondary Not Applied badge. Control and Staff now pin shared 0.18.5 for muted secondary current-page pagination; APIs, policies and applications are unchanged.

## Shared header breadcrumbs — 27 October 2026

Control pins shared 0.18.5 and retains the already-wired flow/campus/role hierarchy and unsaved-change guards. Applicant, Student and Staff/Lecturer now adopt the same structured PortalHeader. The shared overflow menu is loaded only when necessary, preserving the visible trail and current-page context without adding its menu dependencies to every initial route.

## Flow directory presentation — 23 October 2026

`/flows` uses the default shared page ContentSection without a surrounding page panel or page-title description. Its API-backed directory currently shows only Admissions through released 0.11.0 `LinkedList variant="panel"` (surface token and 12px radius). Control now pins shared 0.18.4, which retains this card variant. Opening Admissions visits the named configuration table described below. Actual Control browser observation remains blocked by saved browser permissions; isolated synthetic checks run separately. Other portals are not upgraded and no hosted portal deployment is included.

## Admissions configuration table and shared editor — 23 October 2026

`/flows/admissions` uses default ContentSection with Close in its actions slot, returning to `/flows`. AdminTable supplies its own panel, search, advanced filters, sorting, feedback and 10/20/50 footer. Columns are Flow, Version, Applied Version, Applied Campuses, Status and Last Updated (UTC). Flow names identify reusable configurations; Version is the latest published version, while Applied Version is the version currently effective for assigned campuses (an em dash when unassigned). Draft edits do not advance Version. A primary Plus/Create Flow button occupies the left toolbar slot and intentionally does nothing. There are no status tabs or extra page-panel wrappers. Applied Campuses displays the assigned campus count (Global initially shows 8) and supports count-based search/filter/sort. Global initially displays Published; draft/scheduled changes have warning pills. Rows load from the real configuration API, cancel obsolete reads and expose retryable errors.

Flow links open `/flows/admissions/versions/:configurationId`, now composed with shared AdminRecordWorkspace titled Edit Admission Flow, without an Admissions label. Original Page sits beside Close and opens the unchanged read-only reference; Close returns to the Admissions table. The workspace uses the existing sticky full-height desktop summary/list sidebar with content-only scrolling, and the compact bounded summary above content on narrower layouts. Legacy campus redirects keep targeting this page.

The sidebar uses AdminRecordPanel with a labelled workflow icon, saved flow name, shared colour-coded status, Applied Version, Applied Campuses (count only), and Last Updated (UTC). Detail and the complete existing configuration-list API load together with cancellation and retry; the matching summary row supplies the same meanings/labels as the directory. Missing matching metadata is a load error rather than an invented fallback. The summary/list switch opens a compact AdminTable with Flow and Status, search and stable IDs. View changes retain local edits; the current flow link returns to summary, while another flow opens its workspace after the unsaved-change guard.

The right column starts with Affected Modules: a shared ContentSection subheading title outside three separate default PagePanelLayout cards in shared CardGrid. Applicant Portal, Staff Portal and Student Portal retain their compact coloured icons, without an enclosing panel or inner outlines. Each portal name/icon uses PagePanelLayout's existing header/navigation slot with its default full-width divider. The content slot shows neutral shared Badge variant="secondary" module pills below the divider, in a wrapping row. Applicant lists My Applications and Documents Checklist; Staff lists Applicants; Student lists Personal Profile, Academic Profile, Documents, Finance, Immigration and Module Registration. This descriptive impact list includes the intended Admissions/Immigration relationship without implying that the current implementation is fully integrated or granting module access. General Settings follows with the same shared ContentSection subheading title outside one page panel, which contains the form directly. Both sections and their spacing use shared defaults. Fields are Apply to, Name and Status (Draft / Published), using editableUndivided rows, the wrapping ChipField (36px minimum), 36px Input and compact shared RadioField. No InnerSection or DetailSectionCard wraps the form. PageActionBar supplies an edge-to-edge divider and Save changes footer. Saves persist General metadata through the configuration General API; sidebar metadata continues to describe committed, applied values. Affected portals stay in the right column, without duplication in the sidebar. Staff review consolidation remains a separate task.

The existing editor is retained behind explicit read-only mode on the reference route. Its title is Admissions · {flow name} · Reference, with a Read-only reference badge; Close returns to the replacement. Settings and Applicant wording are disabled. Save draft, Publish and Use version as draft are omitted, and settings/save/publish handlers reject read-only mutations. Preview Campus, preview scenarios, validation/preview, reload, history and publishing help remain available. It reads the saved draft when present, otherwise current applied settings. Both routes retain permission restrictions and retryable read errors. Existing policy/draft/application data and API permissions are unchanged. General assignment publication is available; Create Flow remains deferred. See [University Flows](../backend/university-flows.md) for the existing configuration and pinning contract. No shared-library release is needed. Local verification passed Control lint, 16 unit cases, production/type build and 28 focused Chromium/WebKit browser cases covering navigation, disabled settings/wording, saved draft display, previews/history/help, loading/errors/retry and permission restrictions. Browser checks assert no draft-save/publication requests. No API, package pin, policy, draft or application mutation is included.

## Shared ContentSection title height — 0.10.5

Applicant, Student, Staff and Control pin the same released shared component. All ContentSection title containers have a 36px minimum height, including custom headings and sidebar variants; multiline content can grow. Typography and default page/sidebar gaps remain unchanged. This is a local presentation upgrade without data, API or workflow changes.

## Account header — 21 October 2026

Headers use shared `PortalAccount` 0.9.3: name first, permanent SSO numeric User ID followed by ` · ` and comma-separated assigned roles second. Applicant, Student, Staff and Control use the same number. Email and campus Student/Staff numbers are not substituted. Role metadata is display-only; active-role authorization remains unchanged.

## Learner conversion and reusable Cyberjaya Demo flow — 21 October 2026

Accept Enrolment replaces Applicant access with Student access for the same SSO identity, using durable retry/recovery and a one-use Student exchange. Student continues outstanding admissions evidence; Control can preview/reset only a registered Demo journey. The [current lifecycle contract, ownership/reset rules, account checkpoints and verification](../backend/learner-lifecycle.md) supersedes earlier Applicant-session handoff/reset descriptions below. Hosted rollout remains a separate coordinated release.


## University Flows - 20 October 2026

Control now owns versioned campus Admissions settings under University Flows, separately from SSO access. `/flows` reads the API registry; `/flows/admissions/:campusId` supports draft, validation/scenario preview, publication and immutable history. Pin 0.9.1; shared sources are unchanged. People also supports explicit IO/SSD/QA/Faculty/Bursary/Registry desk assignment for an existing campus Admin. Desk changes retain the upstream custom-role definition reference and module ceiling. Flow publication never grants access. See [University Flows](../backend/university-flows.md) for defaults, local storage and operator steps. Hosted release/deployment is not part of this delivery.


**Host:** `https://control.raisd.co`  
**Repo:** [`raisd-campus/control-portal`](https://github.com/raisd-campus/control-portal) (sibling `~/src/raisd/control-portal`)  
**Auth:** Raisd SSO only (`control` role + `rbac.manage`). No portal password form — `/sign-in` auto-redirects to `sso.raisd.co/login`.<br>
**UI:** Pin `@raisd-campus/design-system` **0.9.1**. Existing and future pages compose shared package controls (`DetailSectionCard`, `DetailField`, `DropdownSelect`, `SummaryCard`, `Tabs`, `Button`, `Input`, `PortalShell`, …). Do not add local panel/card primitives or copy component source — see [component-library.md](../design/component-library.md). Role permission matrix uses a DS-styled `role="checkbox"` toggle (package has no standalone Checkbox yet). Audit CSV export pages through the API (max 200/request) until the full filtered set is downloaded.

## Intent

Owns **super-admin** identity for the Demo (Contentful Spaces-style, campus-first):

- List campuses and open a campus
- Configure each campus **Admissions workflow** under University Flows (`flows.configure`)
- Define **custom roles** per campus (named permission matrix from the access catalog). A role can enter more than one portal; the matrix shows each selected portal's tree.
- Assign **members** to built-in Campus Admin or custom roles
- Read SSO audit events

**Campus workflow:** Use University Flows → Admissions → campus (also linked from the campus list and campus page). Draft, validate/preview, and publish versioned admissions settings there. Do not invent a parallel admissions configurator outside Control. Publishing never grants portal access. **How publishing works** walks Effective from, pinned applications, and immediate role changes in the shared `Popup`. The same distinction sits on the `DetailField` help icons for Effective from and for role portals. Operator steps: [university-flows.md](../backend/university-flows.md).

The Members tab lists only Control memberships (`admin` or a custom role) and can change a member’s configured role in place. Student, staff, and lecturer **day-to-day** presets remain on Campus Admin Access at `staff.{slug}.raisd.co/admin/access` (`/v1/access/people*`). That page assigns fixed presets only — no module or desk checkboxes — and cannot create custom roles or edit permission matrices.

## Routes

| Path | Purpose |
|---|---|
| `/` | Campus list (member + role counts; links to workflow + members) |
| `/campuses/:campusId` | Members \| Roles tabs; link to Admissions campus workflow |
| `/campuses/:campusId/roles/new` · `.../roles/:roleId` | Permission matrix editor |
| `/flows` | University Flows directory (Admissions card) |
| `/flows/admissions` | Named Admissions configurations and published revision summaries |
| `/flows/admissions/versions/:configurationId` | Shared configuration editor, preview and history |
| `/flows/admissions/:campusId` | Compatibility redirect to the campus's assigned configuration |
| `/people` | Global people search; add-to-campus deep-links; review desks |
| `/audit` | SSO audit |

## Seed Admins

One campus Admin per Demo campus (`admin.{slug}@raisd.demo`, password `{slug without hyphens}2026`), scoped to that campus via the built-in **Campus Admin** custom role. Shared Bursary and Registry desks still cover every campus.

Magic-link allowlist (team):

- `aslam@raisd.co`, `faid@raisd.co`, `dexter@raisd.co`, `azwan@raisd.co`
- `iman@raisd.co`, `iman.suherman@raisd.co`, `iman.suherman@gmail.com`

## Deploy

```bash
# from control-plane
npm run deploy:vps -- control
```

Legacy host `admin.raisd.co` **301-redirects** to Control.

## Applicant progress wording — 21 October 2026

Admissions has an Applicant wording tab for step labels, department display names, global Pending/Complete status labels and per-step pending/completed updates. Use `{department}` to resolve the assigned review desk. Wording follows the existing draft/validate/preview/publish/version flow and applies to new applications; existing cases retain their pinned policy. Preview and connected Applicant render the same API progress rows. Raw manual decisions remain part of policy evaluation and are displayed consistently as Pending rather than introducing a second unfinished status. Not-required steps are omitted.

## Reset all Demo journeys — 21 October 2026

Demo flow includes Reset all for the registered journeys returned by the API. It previews every selected account and affected-record counts before confirmation; any failed preview prevents execution. Confirmation invokes the existing guarded per-journey reset sequentially with individual digests/generations and stable operation IDs. Completed accounts are removed from the pending list; a partial failure shows progress and Retry reset resumes remaining accounts with the same operation IDs. This is a sequential batch, not an atomic database-wide reset. Individual reset remains available.

## Admissions pending and completed wording — 22 October 2026

Admissions Wording exposes **Pending Action Status** and **Completed Status** per stage. The API uses Pending Action Status for Applicant/Admin's overall status; completed labels stay in progress/history. Confirmation defaults to **Awaiting {department} Confirmation**, resolving to **Awaiting Applicant Confirmation**. Eligibility completion stays **Eligibility Letter Released**. Statuses and updates support `{department}` substitution. Old pinned versions missing additive fields resolve shared defaults at read time, without rewriting the version or case. Later publications keep existing pinning rules.

### ContentSection label (0.12.0)

Control uses the released shared `label` slot on the blank flow workspace: Admissions appears above the API-provided flow name (for example, Global). The title container retains a 36px minimum height and grows naturally. The original reference heading stays unchanged. Only Control adopts this release; unrelated portal pins stay unchanged.

Verification: shared 0.12.0 registry archive matched all 281 installed files. Control lint, 16 unit cases, production/type build and 28 focused Chromium/WebKit cases passed. Only Control Vite was restarted; API, SSO, policies, drafts and applications remain unchanged.

## Admissions General panel — 0.13.0 (historical; superseded by 0.14.0 layout)

Below Affected Portals, a second PagePanelLayout contains the outlined shared DetailSectionCard. General is its inner-section header, with no separate panel title. Standard editableUndivided DetailField rows contain Apply to (shared ChipField) followed by Name (shared Input), both 36px tall. Apply to offers the existing eight campus options with case-insensitive search, selection toggling and individually removable chips in a horizontally scrolling row. Values initialise from the loaded flow configuration. Name edits do not rename the page title. Only these two fields are present.

The form prevents submission. The owner removed the local-edits note and selected the existing no-divider field variant; the outlined grouping remains. Values are page-local and reset on navigation/configuration changes; there is no Save action, browser storage or write request. The reference page remains unchanged. Metadata persistence and campus reassignment remain deferred. Control alone upgrades to released shared 0.13.0; no API, data, policy, application or hosted deployment changes are included.

Verification: 53 shared unit cases, consumer build, all 55 Chromium cases (one unrelated fixture-load failure passed its targeted retry) and 32 phone/tablet WebKit cases passed. Control lint, 16 unit cases, production/type build and 42 Chromium/WebKit cases passed; browser checks reject flow write requests. All 284 installed package files match the verified 0.13.0 registry archive. Only Control Vite was restarted; API, SSO, saved policies and applications remain unchanged.

## ChipField dropdown styling — 0.13.1

Control adopts the released patch so the campus picker reuses the existing DropdownMenu menu and selectable-item presentation, including trailing checkmarks. Search and persistent multi-selection retain their Popover/listbox behavior. Clicking field space, the placeholder or a chip label opens the campus picker; remove buttons do not open it, and the chevron still toggles it. General remains an inner-section title with undivided form rows; flow name and assignments remain unsaved local edits. No API, policy, data or other portal pin changes are included.

Verification: shared type/unit/build and consumer build passed (53 unit cases); all 57 Chromium cases passed after focused retries corrected animation/click-position assumptions, and all 36 phone/tablet WebKit cases passed. Computed surface/row styles match the existing dropdown, and the original DropdownMenu content class set is preserved exactly. Control lint, 16 unit cases, production/type build and 10 focused Chromium/WebKit cases passed. All 287 installed files match the exact verified 0.13.1 registry archive. Only Control Vite was refreshed; API, SSO and saved policies/applications remain unchanged.

## Admin edit workspace verification — 0.14.0

Verification: shared 0.14.0 passed typecheck, 56 unit cases, consumer build, 58 Chromium and 38 phone/tablet WebKit cases. Control lint, 16 unit cases and production/type build passed, followed by 50 workflow browser cases plus focused layout/view-switch and aborted-request checks (52 unique Chromium/WebKit cases overall). The final layout checks verified default 16px section spacing, desktop sticky sidebar, contained phone stacking and three independent portal panels. Saved metadata, scheduled/unassigned versions, local-edit retention/reset, summary read errors/retry, permissions and reference navigation passed. All 287 installed package files match the verified registry archive. No API/policy/application mutation or hosted deployment is included.

## Smaller content subheadings — 0.15.0

Affected Portals and General use the shared opt-in titleVariant="subheading" (16px medium). The 36px minimum title container, default 16px spacing and existing page panels remain unchanged. Edit Flow keeps its standard workspace heading. Applied Campuses now shows only the saved count; no campus-name list is repeated below it. No data, API, editing or permission behavior changes.

Verification: shared typecheck, 58 unit cases, consumer build, 59 Chromium and 40 phone/tablet WebKit cases passed. Control lint, 16 unit cases, production/type build and 14 focused Chromium/WebKit cases passed. Checks cover opt-in 16px headings, unchanged default 18px headings, 36px minimum headers, default spacing, responsive form/navigation and count-only campus summary. All 287 installed package files match the verified 0.15.0 registry archive. Only Control adopts and refreshes this release; no API/data/policy changes or hosted deployment are included.

## General metadata persistence and compact RadioField — 26 October 2026

Shared 0.16.0 adds `ui/radio-field`, a compact native radio group with 16px outlined indicators, plain body labels, keyboard focus/arrow navigation and disabled/invalid states. Choices sit inline on wider screens and stack on phones. Survey choices are unchanged. Control alone adopts the registry release.

General starts with saved General draft metadata if present, otherwise the current applied name/campuses with Published selected. Save changes posts name, unique campus IDs, Draft/Published status, expected General revision and a stable retry request ID. Draft saves leave the currently published metadata and policy version active. Published saves apply General metadata and clear its draft without publishing unrelated policy-setting drafts or generating policy versions. Each campus must retain exactly one assigned flow: claiming campuses moves them atomically from prior flows; removing campuses without another assigned flow is rejected. Existing applications retain their pinned policy snapshots.

Unchanged/reverted forms disable Save; pending operations disable fields and duplicate saves. Validation, stale revisions and storage failures preserve edits. Successful responses update the saved summary/list and baseline atomically. Unsaved navigation offers Save, Keep editing and Discard; dismissal keeps editing, failed saving stays on the current form. Reload loads saved General drafts. The original reference remains read-only and sends no General/draft/publication writes.

Verification: shared typecheck, 60 unit cases, consumer production build, 60 Chromium cases (one unrelated Community scroll case passed on focused retry), and 42 phone/tablet WebKit cases passed. Control lint, 16 unit cases, type/production build and 58 focused Chromium/WebKit cases passed after correcting radio-label test interaction. All 290 installed package files match published 0.16.0. Portal API local typecheck and isolated University Flows checks passed, including General draft/publication, retries, stale revisions, concurrency, coverage and authorization. Local API was activated from a private backup with the policy file hash unchanged; Control alone restarted. No interactive flow was saved, no application advanced/reset and no hosted deployment occurred.

## Wrapping campus field — 0.17.0

The replacement workspace heading General is renamed General Settings. Shared ChipField wraps selected campus chips into additional rows, grows naturally from a 36px minimum and has no chevron. The whole field opens/toggles the searchable picker while separate removal buttons retain their behavior and keyboard focus. Names and long chips remain contained, without horizontal chip scrolling. Original reference, saved values, persistence and navigation guards are unchanged. Only Control adopts the released package; no API, policy, assignment or database mutation accompanies this presentation update.

0.17.0 verification: shared typecheck, 61 unit cases, consumer build, 60 Chromium and 42 phone/tablet WebKit checks passed. Control lint/type/production build and 10 focused Chromium/WebKit workspace cases passed. All 290 installed files match the verified registry archive. Six affected field/picker captures and both catalogue mirrors validate. Only Control restarted; no API/database or hosted portal deployment changed.

## Header breadcrumb navigation — 0.18.0

Control uses PortalHeader structured breadcrumbs with router Links. Admissions reads University Flows → Admissions; its workspace adds Edit Admission Flow, and the original reference adds Reference with Edit Admission Flow as a parent link. Campus/role pages similarly link Campuses → campus → Create Role/Edit Role. Root pages remain single current-page crumbs. Labels come from existing route titles/campus metadata; there are no duplicate record fetches or invented flow names.

The shared component measures available header space and collapses overflowing parents into an ellipsis menu, keeping the current page visible and truncated if necessary. The menu exposes full ancestor and current labels. This applies to narrow phones and any constrained header, with full trails returning when space allows. Native/router links support normal browser navigation; the existing unsaved-change blocker intercepts workspace parent navigation. Account identity, access, shell navigation, API/data and saved policies are unchanged. Only Control adopts the package.


0.18.0 verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Control lint, 19 unit cases, type/production build and six focused Chromium/WebKit breadcrumb cases passed, including directory/reference navigation and unsaved-edit guards at 375px and 1543px. All 293 installed package files match the verified registry archive. Six affected captures and both 250-capture catalogue mirrors validate. Only Control restarted; no API, policy, database or hosted portal deployment changed.


## Compact flow picker — 0.18.1

The shared compact record list displays Flow and Status side by side, wrapping within the sidebar when necessary. It retains search, selected identity, keyboard/full-row links and vertical virtualization, with no horizontal scrolling. Summary/list switching still preserves General edits. Other portal pins remain unchanged.


0.18.1 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Compact-list coverage verifies side-by-side short values, wrapped long values, contained widths and scrolling to the final virtualized row. Control lint, 19 unit cases, type/production build and two focused summary/list Chromium/WebKit cases passed. All 293 installed package files match the verified registry archive. Three refreshed list captures and both 250-capture catalogue mirrors validate. Only Control restarted; no API/data/policy changes or hosted portal deployment occurred.


Shared 0.18.2 keeps compact flow-list values in equal flexible columns with right-aligned text and status sentences wrapping inside their pills. Both Staff and Control adopt the same release. Summary/list navigation, General edits, APIs and policies are unchanged.


0.18.2 verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Six Staff Chromium/WebKit cases at 375/768/1440px verify side-by-side columns, wrapped long pills, right-aligned text, contained scrolling and accessibility; two Control summary/list cases passed. Staff adds a screen-reader-only details heading so hiding the summary does not skip heading levels. All 293 installed package files in each portal match the verified registry archive. Three refreshed list captures and both catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


Shared 0.18.3 keeps entry names left-aligned and status text right-aligned in the compact flow picker. Summary and list statuses use semantic colored text without pill background, border or padding, scoped to the shared summary-column pattern. Staff adopts the same patch; directory badges, saved values and navigation are unchanged.


0.18.3 verification: shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff lint, 92 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Eight focused Chromium/WebKit portal cases verify left-aligned entry names, right-aligned wrapping statuses, transparent/unpadded summary/list statuses, selected navigation and accessibility. All 293 installed package files in each portal match the verified registry archive. Six affected captures and both 250-capture catalogue mirrors validate. Only Staff and Control restarted; no API/data/policy changes or hosted deployment occurred.


Cross-portal breadcrumb verification (0.18.4): shared typecheck, 64 unit cases, consumer build, 63 Chromium and 48 phone/tablet WebKit cases passed. Staff/Lecturer lint, 94 unit cases and type/production build passed; Control lint, 19 unit cases and type/production build passed. Applicant lint, three focused header unit cases, type/production build and production-exclusion check passed (its existing unused-variable warning remains). Student lint, 15 focused breadcrumb/route unit cases, type/production build and production-exclusion checks passed. Student bundle budgets passed unchanged: eager JavaScript 194164 gzip bytes against 196608; largest chunk 373077 bytes.

All 25 focused Chromium/WebKit portal cases passed: Applicant four, Student five (1280/1440 Chromium and phone/tablet/desktop WebKit), Staff six, Lecturer four and Control six. Coverage includes parent navigation, selected programme/semester scope, mobile overflow, keyboard/Escape, unsaved application/flow guards and unavailable teaching details. Test-only selectors were scoped to the header and menu dismissal was awaited; unrelated inner breadcrumbs remain intact. All 296 installed files in each of four portals match the verified 0.18.4 registry archive. Nine affected captures and both 253-capture catalogue mirrors validate. Focused portal checks were used under the owner-approved fast workflow; no full Student/Applicant regression-suite claim is made.

Only Applicant, Student, Staff and Control frontends restarted. APIs, SSO, Keychain, Docker, identities, applications, drafts and policies were not reset or migrated. No hosted deployment, commit or push occurred.


Versions panel verification: Control lint completed with the existing unrelated src/lib/sso.ts spread warning; 22 unit cases and the TypeScript/production build passed. All 30 focused Chromium/WebKit cases passed, covering real published history/statuses, UTC columns, shared search/filter/sort/pagination and table-state retention, blank Local/International panels, direct URLs/refresh, Back/Forward, invalid and unassigned/empty versions, General DOM/edit retention at 375/768/1440px, leaving guards, flow-switch resets, loading/retry and permissions. The strengthened flow-switch case also passed in both browsers. The suite forbids policy/version writes during browsing. Reviewed synthetic desktop and phone captures use default shared composition. Shared package remains 0.18.4; the healthy Control server at localhost:5175 hot-reloaded the source. No API, policy, application, database, package release or hosted deployment changed.

Shared 0.18.5 / Versions controls verification: shared typecheck, 64 unit cases, consumer production build, 63 Chromium and 48 phone/tablet WebKit cases passed. Control lint (existing unrelated sso.ts warning), 22 unit cases and type/production build passed; Staff lint, 94 unit cases and type/production build passed. All 22 focused Chromium/WebKit Versions and Staff queue cases passed, including large 32px solid-green Applied badges with neutral titles, neutral Not Applied badges, inert Create Version, removed Published On column, muted pagination and no policy/version write requests. All 296 installed package files in each portal match the verified registry archive. Three affected Admin table captures and both 253-capture catalogue mirrors validate. Only Staff and Control restarted; API, schema, policies, applications and hosted deployments are unchanged.


## Predefined Admissions Flow Editor — 28 October 2026

This supersedes the earlier blank Versions slice and inert Create Version notes above. Released shared 0.19.0 supplies Switch, SortableList and FlowEditor; only Control upgrades. Published versions remain read-only. Create Version copies an existing version into the single working draft (Resume Draft if present), with Local/International cards, linked child steps, constrained reorder, typed settings popups, synthetic document previews, draft saving and validated publication. General and version dirty state share navigation protection. Flow and Roles pages use the same immediate audited reviewer binding API; editing workflow drafts does not defer those role changes. See [the reusable flow editor contract](../design/flow-editor.md) for setting ownership, invariants, pricing, compatibility and future flow onboarding. Delivery is local; no Global publication is performed as part of implementation.


Shared 0.19.1 refines FlowEditor: display-order numbers, dot-separated colored category names, centered linked connectors and toggle-before-chevron ordering. Reorder controls remain disabled on read-only flows; editable drafts retain drag and keyboard/tap arrows. Control alone upgrades and hides international-only cards from Local while preserving their saved settings/order slots. No API, policy or application state changes. See [Flow Editor](https://github.com/raisd-campus/control-plane/blob/main/docs/ai/design/flow-editor.md).


Control adopts shared 0.19.2 for Flow Steps: no visible up/down arrows, Alt+Up/Down keyboard alternatives on drag handles, blue numbered circles, purple Applicant Action labels, and the published notice in the new ContentSection description slot. Existing settings and live assignments are preserved.


### Shared FlowEditor 0.19.3

Step numbers use white text on the shared black background token. All category names end in Step, retaining their existing semantic colors and dot separators. Parent-to-child spacing is 12px, matching the parent-group gap. Step cards use the shared surface-hover background on hover. Only Control upgrades; no configuration, policy, application or backend changes.


### Mandatory/fixed steps — shared 0.19.4

Mandatory steps omit their enable toggle and visible required caption. Control marks Offer and International tuition mandatory using the existing template rules; this does not alter policy validation or applicability. Fixed-order steps display a lock in the external handle slot instead of inside the card. Handles and locks center against the parent card, including linked groups and wrapped labels. Shared SortableList `renderChildren` keeps linked content in a separate grid row so it cannot shift the handle. Only Control upgrades; existing settings, reviewer bindings and application state are unchanged.


### Minimal category labels — shared 0.19.5

FlowEditor categories now use one muted gray treatment with concise labels (Review, Payment, Document release, Applicant action), separated by middle dots. The repeated Step suffix is removed. Black number circles and white step names retain the hierarchy; colors remain on controls/status. Existing mandatory/fixed behavior, spacing, hover, interactions and policies are unchanged. Only Control upgrades.


## Version Settings, Apply Version and History — 28 October 2026

This replaces the earlier publish-only footer. Version Settings appears below the version SummaryCard and before Local/International tabs. Draft Name and Effective from (UTC) are editable; Status is calculated and display-only. Version Settings wraps its form in the default shared InnerSection while keeping its ContentSection title outside. Change reason is omitted from this form; recorded reasons remain in History. Timing offers Immediately or a specific UTC date/time, avoiding minute-truncation backdates. Published settings show their original date read-only; their display name is editable metadata. Custom names appear beside permanent Version N in the table and summary. The table's date prefers the current application, otherwise next scheduled, otherwise last application or original effective date. Status uses the application journal, never numeric version order; an unassigned current flow remains Published.

The existing shared PageActionBar provides the end-to-end divider and Save Draft / Apply Version controls. Save Draft persists both cohorts and metadata without activation. Apply is enabled only for a clean saved draft with a name. Reasons are no longer requested during creation, editing or Apply. Existing historical reasons remain visible. Published Apply opens a shared Popup showing target version, assigned campuses, immediate/specific UTC timing, any retained future takeover. Validation, storage and concurrency failures retain inputs and the retry identity. Escape/Cancel writes nothing and returns focus to Apply Version. Existing General/version unsaved guards, table state, URL-backed selection and tab retention remain intact.

History below Flow Steps uses shared ContentSection and AuditTrail, newest recorded events first, with UTC recorded/effective times, actor and reason. Only identity-linked publication/application/scheduling/reapplication records for the selected version appear. A new unsaved draft has no fabricated history. The original reference route remains read-only. No Disable action, library change or release is included.


Local verification: API typecheck, 134 isolated University Flows checks, 34 admissions synchronization checks and two-phase isolated Docker PostgreSQL persistence checks passed. These cover migration interruption/retry, original-record backups, immutable policy preservation, immediate/scheduled publication, direct reapplication, future schedules, optimistic concurrency, exact retries, reviewer validation and atomic rollback. Control lint, 23 unit cases and type/production build passed; lint retains the existing unrelated sso.ts warning and Vite retains its bundle-size advisory. Focused Chromium/WebKit cases cover version-table navigation/state, metadata/tab retention, draft failures, Apply confirmation/retry, audit identity, focus return, unsaved guards and contained 375/768/1440px layouts. The final interaction set passed 22 cases; the confirmation set with a previous/current/future-version fixture passed eight. Canonical contract/mirror checks match. Local API was restarted; the backup-first journal upgrade was activated without Apply/publication. Hashes confirmed original policies/settings/drafts/events/receipts and applicant rows unchanged. No shared release, remote migration, deployment, commit or push occurred.


### Six version UI refinements — 28 October 2026

Apply confirmation has no reason field, and clean saved drafts apply without an additional reason save. Applied versions show a disabled Applied action. All version names are editable: drafts use Save Draft, and published display names use Save Changes with guarded navigation, optimistic metadata updates and exact retries. Settings and permanent version numbers stay immutable. History is a separate default PagePanelLayout below the version panel, with its title outside and shared AuditTrail inside.

Create Version places a required editable Name below Copy from, initially suggested as Version N and used to initialise the working draft. Copy from composes shared DropdownMenu radio items and shared Badges; Applied uses the success pill both in the trigger and options, with no status separator dot. Existing shared library primitives and package pins remain unchanged.


Refinement verification: API typecheck, 136 isolated flow checks, 34 admissions checks and two-phase isolated PostgreSQL checks passed, including persisted renaming, blank-reason publication, immutable policies, retained schedules, authorization and retry/concurrency behavior. Control lint/type/build and 23 unit cases passed (existing unrelated lint/bundle advisories remain). All 18 focused Chromium/WebKit cases passed, covering reason-free draft/reapply requests, applied-action disabling, published-name editing with failed-save retry and navigation guard, separate History panels, editable suggested creation names, success pills, and contained phone/tablet/desktop controls. Only the API restarted; Control hot-reloaded. Local preservation hashes confirm existing data unchanged, and no real Global Apply, rename or hosted operation was performed. No shared package release was needed.


Copy from field background correction: the rich status-pill trigger uses the existing DropdownSelect field presentation (36px, raised surface, field radius, default hover/focus tokens), replacing the transparent secondary-button presentation. Shared DropdownMenu options and green Applied pill remain unchanged. This is a Control composition correction with no shared release, API or data change.


## Multiple draft versions and flow status — 28 October 2026

The Versions AdminTable merges saved drafts and published history, newest permanent number first. Draft rows show Draft, the editable name and configured UTC timing. Create Version stays available; Resume Draft is removed. Copy from includes published versions only and defaults to the applied version. Creation opens a local unsaved New Version editor at `?version=new`; it writes nothing until Save Draft. The first successful save reserves the permanent number, and a suggested untouched name follows the number actually allocated. Explicit custom names remain unchanged. Numeric `?version=N` opens the corresponding saved draft or published version. Refreshing an unsaved editor gives the shared unavailable state and return action.

Drafts save independently with stable IDs, expected revisions and exact retry IDs. Applying one retains its identity/number and other drafts, including when publication is out of numeric order. The directory latest Version includes saved drafts; Applied Version remains journal-derived. The sidebar/list/directory status is the flow's General publication state only: Published, or Draft for saved General metadata. Version drafts and future schedules do not change it.

General remains mounted during version navigation. Local/International tab changes retain edits. Leaving a dirty version, including returning to its table, offers Save, Keep editing and Discard; failed validation/saving retains the editor. Saving through that guard within the same flow does not persist unrelated General edits. Table search/filter/sort/page state survives version browsing. Saved numeric links refresh normally. The legacy draft URL resolves only its bound migrated draft. Original Page passes a selected numeric version; reference defaults to the applied version without one and remains read-only.

Existing Version Settings, editable names, separate History panel, green Applied badge and disabled Applied action remain. AuditTrail includes identity-linked draft-created/draft-saved events without inventing legacy history. No shared-library source or release, draft deletion, policy snapshot change or hosted deployment is included.

Verification: 144 isolated University Flows checks, 34 admissions synchronization checks, API typecheck and two-phase isolated PostgreSQL checks passed. Control lint, 23 unit tests and type/production build passed with existing unrelated lint/bundle advisories. Sixteen final Chromium/WebKit cases pass for draft rows, allocation, independent Apply, guarded saves, refresh/direct links, reference navigation, flow status and contained phone/tablet layouts; an intermittent WebKit guard case also passed three focused repeats. The changed-editor accessibility scan excludes the unchanged header because its Breadcrumb landmark duplicates ContentBreadcrumb; this shared accessibility limitation remains outside the approved scope. Local backup-first activation and API restart completed; preservation hashes confirm original policies, legacy drafts, events, receipts and applicant records unchanged. The existing Global draft is now saved Version 2; no real Global Apply, new draft creation, application change or remote operation was performed.


### Flow summary status pill — shared 0.19.6

The shared AdminRecordPanel summary preserves the supplied Badge background, padding, border and radius. Control restores its standard color-coded flow status pill beneath the saved name. Compact summary-column lists retain right-aligned, wrapping colored status text without a background or padding. Flow status semantics, draft versions and persisted data are unchanged. Only Control upgrades.


### Step numbering after reorder — shared 0.19.7

Control uses the shared SortableList final-index drop handling. Reordering a draft group immediately updates its order and sequential displayed numbers, including linked child steps. Save Draft persists that order; rejected moves preserve the current sequence. No existing draft is changed until the operator saves. Published steps remain read-only and no policy/application data is changed during rollout.


Version details include a standard secondary Back button at the far right of the internal breadcrumb row. It returns to Versions through the same URL navigation and dirty-version Save/Keep editing/Discard guard as the breadcrumb. General edits and table state remain mounted. The row stays inline on phones/tablets. No package, API or data change is required.


Shared 0.19.8 aligns the Admissions workspace summary/list bottom with the shell page-content inset. Sticky content-only scrolling and compact layouts remain; no local height override or data change is introduced. The separately reported stylesheet error is outside this change at the owner request.


### Recorded changes in version history

Version History uses the existing shared AuditTrail before/after rows for server-recorded `changes`, including Name, effective UTC timing, Local/International step order, switches and nested settings. The read-only reference uses the same mapping. Each event keeps its actor, action, recorded time and historical reason. Missing old details explicitly say they were not recorded; new no-op saves say no field values changed. No comparison with today's draft is used to invent earlier changes. New draft saves and published display-name changes record their differences atomically through Portal API. No shared package release, old-history backfill or policy/application change is included.

Verification: 145 isolated API flow checks, API typecheck and two-phase isolated PostgreSQL persistence checks passed, including stored before/after values, row identity, order changes and unchanged old records. Control lint, 26 unit tests and type/production build passed (existing unrelated lint/bundle advisories remain). Eight focused Chromium/WebKit cases cover save/reload, reference history, renamed versions, reorder persistence and readable mobile before/after rows. Contracts and canonical mirrors match. Only the local API restarted; preservation hashes confirm existing policies, drafts, audit and applicant data unchanged. No shared release, real Global save/Apply or remote operation occurred.
