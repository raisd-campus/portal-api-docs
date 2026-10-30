# Website-specific AI guidance — should / should not

**Decision:** Working Group CMS standup, 29 Oct 2026 (Iman).  
**Audience:** Every agent working on Raisd campus **websites** (Applicant, Student, Staff/Admin, Control, Keychain, campus landing) and their supporting docs.  
**Attached from:**
- Repo root [`AGENTS.md`](../../AGENTS.md) (control-plane — required section)
- Campus [`AGENTS.md`](AGENTS.md) (read order #2)

UI layout and componentization detail: [design/ai-ui-guidance.md](design/ai-ui-guidance.md).  
Status words (Demo / Live / …): [process/status-language.md](process/status-language.md).

---

## Purpose

Stop AI from rebuilding the product from a CMS menu crawl, inventing a second design system, or claiming Live behaviour that is only Demo. Prefer **knowledge base + polished portals + design system** over guessing.

---

## The AI SHOULD

### Product and scope

1. Treat **Lesotho** as the pilot acceptance campus; admissions before semester registration unless the task says otherwise.
2. Keep the existing campus CMS as **system of record** (ADR-1). Build portal experiences through the **Portal API**; do not duplicate operational CMS functions without an explicit decision.
3. Use Lesotho newer-CMS screenshots / feature modules as **feature and workflow benchmarks**, not as chrome or layout to clone.
4. Prefer a **basic system with consistent pages and flows** over a broad, feature-heavy clone of every CMS menu.
5. Use [status-language.md](process/status-language.md) honestly: Demo ≠ Live; never present planned work as shipped.

### Architecture and data

6. Have portals talk **only** to the Portal API (and SSO / Notifications where already designed). Never write Postgres or the CMS from the browser.
7. Keep authorisation **server-enforced**. Client menu hiding is not security.
8. Keep Demo mutations session-only unless the task explicitly delivers a Live path with durable save and a named owner.
9. Update contracts, fixtures, knowledge docs, and tests together when data requirements change.
10. Resolve campus hosts from the real topology (`staff.{slug}.raisd.co`, `student.{slug}.raisd.co`, `sso.raisd.co`, …) — see [architecture/vps-topology.md](architecture/vps-topology.md).

### UI, navigation, and workflows

11. Reference **polished existing page layouts alongside** the design system before generating or revising pages ([design/ai-ui-guidance.md](design/ai-ui-guidance.md)).
12. **Componentize** pages and flows with existing `@raisd-campus/design-system` families; reuse one list→record (or flow) composition across sibling desks.
13. Inspect the shell and **at least two comparable completed pages** (plus Lesotho Admin wireframe captures for Staff Admin desks when available).
14. Keep Staff Admin IA as **business groups** (Admissions, Registry, Finance, Completions, Teaching, Oversight): desktop primary = group hubs; siblings in the group sub-side ([nav/workflow review](design/2026-10-30-generated-pages-nav-workflow-review.md)).
15. Keep end-to-end journeys coherent: e.g. admissions fee / documents / offer on **Applicants** (and Document review); module enrolment on **Registrations**; do not restack the same workspace on every related menu.
16. Preserve phone / tablet / desktop behaviour already established in the portal (drawer, rail, docked Community, etc.).
17. Follow the [component-change guardrail](AGENTS.md#component-change-guardrail-all-portals): compose features; do not redesign shared components without approval.

### Documentation and handoff

18. Read campus [AGENTS.md](AGENTS.md), this file, and the owning portal’s agent doc before coding.
19. Update the canonical knowledge file under `docs/ai/` (and SDD when behaviour is contractual) in the same change.
20. Prefer handoff + this knowledge base over prior chat memory.
21. Attach website AI rules here and keep [AGENTS.md](AGENTS.md) pointing at them when the rules change.

### Safety and hygiene

22. Inspect `git status` first; preserve unrelated user changes.
23. Never commit `.env`, CMS credentials, tokens, or live student / PII data.
24. Do not commit or push unless the user explicitly asks.

---

## The AI SHOULD NOT

### Product and scope

1. **Should not** invent a greenfield “one-stop CMS” rewrite as the launch path, or treat M5 backlog vision as current Demo scope.
2. **Should not** clone fixed desk-based Lesotho/CMS flows into a role-based modular portal without an explicit hybrid/modular decision (standup risk called out by Faid).
3. **Should not** invent campus policy, legal basis, EMGS outcomes, tax treatment, scholarship rules, or compliance claims beyond what the knowledge base already records as prototype assumptions.
4. **Should not** present Placeholder / Demo / Partial work as Live, or claim production persistence for session-only Demo.

### Architecture and data

5. **Should not** call the CMS or Postgres directly from a portal, or bypass Portal API / SSO for “convenience.”
6. **Should not** treat client-only role checks as authorisation.
7. **Should not** invent API endpoints, schema fields, or CAP behaviour that are not in OpenAPI / SDD / knowledge docs — surface the gap instead.
8. **Should not** put live student data, dumps, or credentials in git, chats as durable SoT, or public docs.

### UI, navigation, and workflows

9. **Should not** invent page layouts from a **menu crawl or screenshot dump alone**.
10. **Should not** invent a second visual system, local `staff-panel` / card / table primitives, or copy design-system source into a portal.
11. **Should not** treat every CMS menu item as its own one-off page layout or unique navigation tree.
12. **Should not** duplicate the same Admin desks as flat peers in both primary and contextual nav.
13. **Should not** embed AdmissionsWorkspace (or equivalent) on Payments or Registrations — that fragments one workflow across four menus.
14. **Should not** invent duplicate sidebars, headers, steppers, or breadcrumbs when `PortalShell` / `PagePanelLayout` / `FlowEditor` / `AdminRecordFlow` already cover the need.
15. **Should not** change shared or established portal component styling, sizing, or interaction via local CSS overrides without explicit approval.
16. **Should not** add enabled no-op actions that imply a destination or capability that does not exist.

### Documentation and process

17. **Should not** invent a second architecture outside `docs/ai/` and `docs/sdd/`.
18. **Should not** rely on a previous chat as the project source of truth.
19. **Should not** publish or re-embed moving portal UI screenshots into walkthrough HTML while chrome is still changing (unless `INCLUDE_SCREENSHOTS=1` or an approved catalogue/CMS-benchmark exception).
20. **Should not** silently change an agreed product policy when a request conflicts with this knowledge base — surface the conflict and confirm.

---

## Quick decision table

| Situation | Do | Don’t |
|---|---|---|
| New Admin desk | Map to `admin-nav` group; reuse list→record from Applicants/Students; DS components | New flat primary leaf + copied admissions queue |
| New Student page | `cms-student-portal-page` skill + two reference pages + DS pin | Raw typography / one-off shell |
| CMS screenshot available | Use for fields, steps, and policy questions | Copy legacy chrome or invent parallel menus |
| “Make it Live” | Check Live gate in status-language; Portal API + authz + owner | Flip labels while still session-only |
| Missing API | Document gap; keep Demo honest | Fake success or invent OpenAPI quietly |
| Design-system gap | Propose package change + approval | Fork component into the portal |

---

## Related entry points

| Need | Path |
|---|---|
| Campus agents (attach point) | [AGENTS.md](AGENTS.md) |
| UI layouts + componentize | [design/ai-ui-guidance.md](design/ai-ui-guidance.md) |
| Nav/workflow review (30 Oct) | [design/2026-10-30-generated-pages-nav-workflow-review.md](design/2026-10-30-generated-pages-nav-workflow-review.md) |
| Design-system ownership | [design/component-library.md](design/component-library.md) |
| Admin desks | [frontend/admin-portal.md](frontend/admin-portal.md) |
| Student portal | [frontend/student-portal/AGENTS.md](frontend/student-portal/AGENTS.md) |
| Lesotho pilot | [architecture/lesotho-pilot.md](architecture/lesotho-pilot.md) |
| Lesotho user guide | [frontend/lesotho-user-guide.md](frontend/lesotho-user-guide.md) · [Guidance HTML](../diagrams/guidance/index.html) |
| Feature modules | [backend/lesotho-feature-modules.md](backend/lesotho-feature-modules.md) |
