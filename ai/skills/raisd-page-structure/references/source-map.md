# Maintained sources and extension boundaries

## Locate the authority

Use the actual workspace and sibling checkout layout. A common local root is `D:/Coding/raisd/`; the Student checkout may also be reached through `D:/Coding/cms-student-portal`. Do not confuse it with the separate `D:/Coding/cms` application. Paths below are relative to the Raisd workspace, not the installed skill directory.

| Source | What it decides |
| --- | --- |
| `control-plane/docs/ai/AGENTS.md` | Campus ownership, authorization, documentation and proportionate verification |
| `control-plane/docs/ai/design/component-library.md` | Shared component use, change guardrail and release/consumer responsibilities |
| Active portal `node_modules/@raisd-campus/design-system/docs/components.md` and `dist/**/*.d.ts` | APIs and behavior actually available to that consumer |
| `design-system/docs/components.md`, `src/components/` | Current package implementation; may be newer than a consumer's installed release |
| `control-plane/docs/ai/design/design-system.md` | Cross-portal tokens, shell and page patterns; read release context around historical notes |
| `control-plane/docs/ai/design/admin-record-flow.md` | Admin directory/workspace controller and routing responsibilities |
| `control-plane/docs/ai/design/flow-editor.md` | Registered University Flow steps, fixed action wording, reviewer roles and compatibility |
| `control-plane/docs/ai/frontend/lecturer-portal.md`, `frontend/admin-portal.md` | Active Staff Admin composition and scope |
| `control-plane/docs/ai/frontend/student-portal/AGENTS.md`, `design-system.md`, affected feature guide | Student-specific identity, nested panels, route states and required gates |
| `control-plane/docs/ai/skills/cms-student-portal-page/SKILL.md` | Additional Student new-page/substantial-route workflow |
| `control-plane/docs/ai/frontend/applicant-portal.md` | Applicant form, step and field behavior |
| `control-plane/docs/ai/frontend/control-portal.md` | Control configuration and version workspaces |
| Matching `control-plane/docs/sdd/` and API contracts | Product/data/workflow requirements; UI examples do not establish policy |

When a release note and an older owning-guide paragraph disagree, check the pinned catalogue/declarations and corresponding implementation, plus the latest explicit user instruction. Do not promote an obsolete historical statement to a new rule. Correct the relevant guidance when the task authorizes it.

## Useful Raisd implementation references

Consult a relevant example when its composition or state behavior is unclear. These are learning references, not templates whose domain rules should be copied.

| Pattern | Starting source |
| --- | --- |
| Staff directory and record workspaces | `lecturer-portal/src/staff-admin/pages/applicants.tsx`, `applicant-record.tsx`, `academic.tsx` |
| Nested Study Plan, InnerSection/DataTable and exact-version returns | `lecturer-portal/src/staff-admin/pages/academic-curriculum.tsx`, `lib/academic-navigation.ts`, `lecturer-portal/src/lib/header-breadcrumbs.ts` |
| Business audit adaptation | `lecturer-portal/src/staff-admin/lib/academic-audit.ts` |
| Existing shell/tiered navigation/toast-provider composition | `lecturer-portal/src/pages/shell.tsx` |
| Student Academic/Profile | Discover active route components from Student's router; consult the owning `academic-study-plan.md`, `academic-modules.md`, and `personal-profile.md` first |
| Applicant field and form behavior | Discover current route/form components in `applicant-portal/src/`; use its owning guide rather than assuming file names |
| University Flow step/popup composition | `control-portal/src/components/university-flow-steps.tsx`, `flow-reviewer-field.tsx` and `src/lib/flow-reviewer-adapters.ts`; use the current flow standard and [University Flow reference](university-flows.md) |
| Control domain-specific General/Versions behavior | Admissions workspace and `control-portal/src/pages/academic-flow.tsx`; these supply different lifecycle adapters, not competing UI templates |

## Version-aware lessons from the Academic work

Initial evidence was checked against Staff's released 0.22.1 package on 30 October 2026. Re-check the actual installed release when using this skill later.

- 0.20 introduced the shared tiered navigation used by Academic.
- 0.21 added contextual `recordLabel`, persistent workspace/history composition, title badges and top-labelled DropdownSelect support.
- 0.22 added the titled InnerSection/contained DataTable edge contract, readable AuditTrail comparisons and Toast.
- 0.22.1 made Toast compact and semantic and removed empty toolbar action wrappers. Compact-list status CSS remained intentionally transparent/unpadded; summary-slot Badge chrome is preserved.

The Academic UI now says **Study Plan**. Internal identifiers such as `academic-curriculum`, `curriculum-review`, legacy routes/query values and saved names intentionally remain. Terminology work does not imply a data/schema migration.

## Maintain this skill

Edit the canonical directory `control-plane/docs/ai/skills/raisd-page-structure/`, then refresh matching files in the installed `$CODEX_HOME/skills/raisd-page-structure/` mirror when available. Preserve unrelated installed skills and existing files. The skill consists of its entrypoint, these focused references and `agents/openai.yaml`; no application or migration scripts are needed for this guidance.

For a confirmed new convention, record the decision and where it applies in the appropriate section, with a maintained source here if needed. If it is specific to one domain, page state or user request, label that scope. Keep examples illustrative; do not turn one-off screenshots into required policy. Supersede conflicting rules rather than appending another ambiguous rule.

Register added/removed knowledge files in `control-plane/docs/ai/MANIFEST.yaml` and use the existing public-AI sync/check workflow when the canonical tree changes. Validate each skill copy with skill-creator's `scripts/quick_validate.py`, verify relative skill links and mirror identity, and forward-test substantial new guidance against a realistic unrelated page brief without changing an application. Use the current installed skill-creator instructions for its script location.

Payment flow composition: `control-portal/src/components/flow-payment-settings.tsx`; Admissions payment catalogue: `applicant-portal/src/contracts/admissions-payments.ts`; maintained semantics: canonical Flow Editor and University Flows guides.
