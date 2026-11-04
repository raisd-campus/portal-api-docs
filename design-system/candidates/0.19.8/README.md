# Design-system 0.19.8 — wireframe review pack

**Status:** Candidate for team review. Released HTML catalogue version already
tracks **0.19.8**, but these pages are **lo-fi wireframes**, not package fixture
captures. No portal pin upgrade or feature implementation is authorized by this pack.

| Item | Value |
| --- | --- |
| Package | `@raisd-campus/design-system@0.19.8` |
| Integrity | `sha512-FYAjj7steFnPk9sjCnqCQpXnHEsjlvGrobsAMHC3uoZ5ThDgogJa92VseR8FPd+POUULnsO9JuNUAKGZlixDNw==` |
| Published | 2026-10-28 (GitHub Packages) |
| Wireframes | [index.html](index.html) |
| Canonical API text | [package-catalogue.md](../../../ai/design/package-catalogue.md) |
| Admin guidance | [admin-record-flow.md](../../../ai/design/admin-record-flow.md) |
| AI review note | [2026-10-29-design-system-0198-review.md](../../../ai/design/2026-10-29-design-system-0198-review.md) |

Current portal pins (unchanged by this pack): Control **0.9.1**; Staff / Student / Applicant **0.8.0**.

## AI review findings

### Ownership split (must stay clear in any first adoption)

| Surface | Package owns | Portal owns |
| --- | --- | --- |
| `AdminRecordFlow` | Table/list presentation, sticky desktop sidebar, summary/list mount, action/dialog chrome, leave-guard UI | Values, baselines, dirty calc, validation, permissions, persistence, routing, photo URLs |
| `FlowEditor` | Step cards, numbers, category labels, linked-group layout, switch/drag/keyboard reorder chrome | Flow rules, dependency validation, reviewer assignment, auth, persistence, publication |
| `ChipField` / `RadioField` | Field geometry, picker/keyboard, chips/radios | Option lists, labels/errors, persistence |
| `PortalBreadcrumb` | Trail layout, overflow ellipsis menu (lazy chunk) | Route identities, link renderer, unsaved-navigation guards |

### Layout and interaction risks before app work

1. **Workspace 56rem split** — below 56rem the panel stacks above the form; desktop sticky sidebar height from **0.19.8** measures `PortalPageContent` bottom padding. Outside that host it falls back to the section gap — compose inside the shared shell.
2. **Dirty leave** — `useAdminRecordFlow.requestLeave` + `AdminRecordDialogs` only work if the portal adapter computes dirty state and wires router cancel/retry correctly. Create mode uses the same guard.
3. **Compact record-list badges** — in `presentation="record-list"` badges lose chrome (text colour only). Summary status from **0.19.6** keeps full Badge chrome — do not assume one badge style everywhere.
4. **FlowEditor required / fixed / linked** — `required` hides the switch; `locked` shows lock in the **handle** slot; linked children move with the parent; disabling a parent disables children without clearing stored prefs. Callers must supply only applicable steps and own reorder acceptance (`canMove` + `onOrderChange`).
5. **ChipField 0.17.0** — full-field toggle, no chevron, 36px min-height, wrapping chips. Removal buttons are siblings of the trigger (not nested).
6. **PortalBreadcrumb 0.18.4** — overflow menu chunk loads only when needed; expect a brief `aria-busy` ellipsis. Parent navigation guards stay in the portal router.
7. **No Checkbox export** — Draft/Published-style choices use `RadioField` or existing selects (Control already does this for University Flows).

### Suggested first consumers (after deliberate pin)

1. **Control** — University Flows / admissions step editor → `FlowEditor` + `ChipField` (campuses) + structured breadcrumbs.
2. **Staff Admin** — directory + record workspace → `AdminRecordFlow` family, replacing ad-hoc CMS table chrome only where the team approves.

Do **not** upgrade Student / Applicant / Lecturer pins solely for these surfaces unless a concrete consumer is approved.

## Decisions needed from the team

- [ ] Approve wireframe layouts for Admin directory, Admin workspace (desktop + phone), and Flow editor (editable + read-only).
- [ ] Confirm first adoption target (Control Flows vs Staff Admin desk) and pin upgrade to **0.19.8**.
- [ ] Confirm whether compact record-list badge de-chroming is acceptable for the first Staff desk.
- [ ] After approval: prepare real consumer-fixture captures for the released catalogue (requires package `examples/consumer` source, not present in the published tarball).

## Gate

No app source, lockfile, or hosted portal change proceeds from this pack until the decisions above are explicitly approved. Released catalogue screenshots and historical provenance remain untouched.
