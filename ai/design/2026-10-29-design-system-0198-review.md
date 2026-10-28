# Design-system 0.19.8 — AI review for team wireframes

**Date:** 2026-10-29  
**Package:** `@raisd-campus/design-system@0.19.8`  
**Wireframes:** [candidates/0.19.8/](../../design-system/candidates/0.19.8/) ([index](../../design-system/candidates/0.19.8/index.html) · [README](../../design-system/candidates/0.19.8/README.md))  
**API:** [package-catalogue.md](package-catalogue.md) · [admin-record-flow.md](admin-record-flow.md)

## Purpose

Review the released shared surfaces that landed after portal pins (Control 0.9.1 / others 0.8.0) and provide lo-fi wireframes for team sign-off **before** any portal pin upgrade or feature composition.

## Verdict

0.19.8 is installable and documented. The additive AdminRecordFlow and FlowEditor families are suitable for a deliberate first adoption in **Control University Flows** and/or **Staff Admin** record desks, provided adapters keep persistence, dirty state, flow rules and photos outside the package. Do not treat the wireframe pack as released catalogue captures.

## Surfaces reviewed

- AdminTable / AdminRecordWorkspace / AdminRecordPanel / leave dialogs
- FlowEditor + Switch + SortableList (required, fixed, linked, read-only)
- ChipField, RadioField, PortalBreadcrumb, ContentSection label/subheading/description

## Risks to resolve in review

1. Compact record-list badge de-chroming vs summary Badge chrome
2. Workspace composition must sit in `PortalPageContent` for 0.19.8 sidebar gutter measurement
3. Router adapters for dirty leave and breadcrumb parent navigation
4. Flow reorder acceptance (`canMove`) and publication ownership remain portal-side

## Gate

No app lockfile or source change until the team checklist in the [candidate README](../../design-system/candidates/0.19.8/README.md) is approved.
