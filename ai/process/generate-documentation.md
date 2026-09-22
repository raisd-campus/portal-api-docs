# Generate documentation from the AI knowledge base

This knowledge base is the **input** for human-facing and published documentation. Agents and humans should generate or refresh docs from here rather than inventing a parallel narrative.

## Sources of truth

| Concern | Read first | Emit / update |
|---|---|---|
| Campus architecture & delivery | `docs/ai/architecture/*`, `docs/ai/AGENTS.md` | `docs/sdd/01`, `02`, `03`, `12`; architecture PDF |
| Portal behaviour (student) | `docs/ai/frontend/student-portal/*` | `docs/sdd/05`; student-portal README; audits |
| Portal API | `docs/ai/backend/portal-api.md`, `openapi.yaml` | `portal-api-docs`, `docs/index.html`, diagrams |
| Capabilities / status | `docs/sdd/11`, Faid sheet export, `process/status-language.md` | `docs/sdd/13`, briefing HTML, README snapshot |
| Design tokens | `docs/ai/design/design-system.md` | design-system repo README; explorer copy |

## Generation rules

1. **Do not contradict** `docs/ai/AGENTS.md` or the portal AGENTS file when writing SDD prose.
2. Prefer **links** to detailed frontend docs over pasting entire feature files into SDDs.
3. When a product decision changes, update in this order: knowledge base → SDD → README/PDF/public docs.
4. Mark uncertainty as **TBC** or **Needs checking**; do not invent owners, dates, or CMS product names.
5. Keep Demo/Live language exact ([status-language.md](status-language.md)).
6. After generating, update [MANIFEST.yaml](../MANIFEST.yaml) if new knowledge files were added.

## Suggested agent workflow

```text
1. Load docs/ai/MANIFEST.yaml
2. Load docs/ai/AGENTS.md
3. Load topic files listed in the manifest for the change
4. Draft or patch the target human doc (SDD, README, PDF source, OpenAPI description)
5. Cross-check CAP IDs against docs/sdd/11-capability-catalog.md
6. Report files changed and any TBC items left untouched
```

## Concrete generators already in the estate

| Artifact | How it is produced |
|---|---|
| OpenAPI / Swagger | Maintain `openapi.yaml`; sync to `portal-api-docs` for GitHub Pages |
| ERD / DFD HTML | `docs/diagrams/*.html` from SDD + Portal API knowledge |
| Architecture PDF | Built from SDD catalogue / capability rows (see prior `Raisd-Campus-Architecture.pdf`) |
| Meeting briefing | `proposals/CMS_Working_Group_Meeting_Briefing.html` from checklist + SDD |

## Syncing student-portal working copies

Canonical agent-readable copies live under `docs/ai/frontend/student-portal/`. The `student-portal` repository may keep local `docs/` working copies for day-to-day frontend work. When behaviour changes:

1. Update the canonical file under `docs/ai/frontend/student-portal/` in control-plane.
2. Mirror the same change into `student-portal/docs/` (or regenerate from canonical).
3. Update `student-portal` handoff only after verification, pointing at the CAP/docs touched.

Do not leave the two trees divergent on product rules.
