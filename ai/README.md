# Raisd AI knowledge base

**Single source of truth** for AI agents (and humans) working across Raisd campus repositories: architecture, backend, frontend, design, and delivery rules.

**Decision:** Working Group standup (22 September 2026). Faid Zamin suggested a central AI knowledge base for backend, frontend, and architecture, kept under control-plane `docs/`. This folder is that base.

## Who reads this

| Reader | Start here |
|---|---|
| Any AI agent (Cursor, Claude, Codex, Copilot, etc.) | [AGENTS.md](AGENTS.md) |
| Machine catalog / tooling | [MANIFEST.yaml](MANIFEST.yaml) |
| Human onboarding | This file, then [../sdd/README.md](../sdd/README.md) |
| CAP / milestone IDs (`CAP-*`, `M1`–`M5`) | [../sdd/15-nomenclature.md](../sdd/15-nomenclature.md) |
| Documentation generation | [process/generate-documentation.md](process/generate-documentation.md) |

## Layout

```
docs/ai/
├── README.md                 ← you are here
├── AGENTS.md                 ← campus-wide agent instructions (read first)
├── MANIFEST.yaml             ← machine-readable index
├── architecture/             ← system, repos, deployment
├── backend/                  ← Portal API, existing CMS inventory, CAP comparison
├── frontend/                 ← per-portal agent knowledge
│   └── student-portal/       ← extracted from raisd-campus/student-portal
├── design/                   ← shared design system knowledge
├── process/                  ← how to generate and maintain docs
├── skills/                   ← reusable agent skills
└── rules/                    ← editor/agent rule extracts
```

## Sibling checkout (required for local agents)

Agents running in a portal repo should resolve the knowledge base as a **sibling** of that repo:

```text
~/src/raisd/
├── control-plane/     ← this repository; docs/ai is canonical
├── student-portal/
├── applicant-portal/
├── lecturer-portal/
├── staff-portal/
├── design-system/
└── portal-api-docs/
```

Canonical path: `../control-plane/docs/ai/` from any portal checkout, or  
`https://github.com/raisd-campus/control-plane/tree/main/docs/ai`.

## Relationship to Software Design Documents

| Layer | Location | Role |
|---|---|---|
| Product / delivery baseline | [`docs/sdd/`](../sdd/) | Human design contracts (CAP IDs, milestones, DoD) |
| AI operating knowledge | [`docs/ai/`](.) | Agent instructions, frontend behaviour docs, skills, generation rules |
| Public API docs | [`portal-api-docs`](https://github.com/raisd-campus/portal-api-docs) + [`openapi.yaml`](../../openapi.yaml) | Published OpenAPI / Swagger |

SDDs remain the product baseline. This knowledge base tells agents **how to implement and document** against that baseline without inventing a second architecture.

## Status language (mandatory)

Use checklist words only: Not started, Placeholder, Demo, Partial, In progress, Ready for testing, Live, Needs checking, Not applicable.

**Demo is not Live.** Live requires real CMS (or approved production) data, durable save, server-enforced permission, and a named owner. Details: [process/status-language.md](process/status-language.md).

## How other repositories refer here

Every Raisd portal and library repo keeps a thin root `AGENTS.md` that points at this folder. Do not duplicate campus architecture or product decisions in those files. Portal-specific behaviour lives under `frontend/<portal>/` here; local repos may keep short working notes that must not contradict this base.

## Updating this knowledge base

1. Change the canonical file under `docs/ai/` (or the linked SDD) in the same PR as the behaviour change.
2. Update [MANIFEST.yaml](MANIFEST.yaml) if you add or remove a knowledge file.
3. If the change affects human delivery docs, regenerate or patch the relevant SDD / PDF using [process/generate-documentation.md](process/generate-documentation.md).
4. Do not leave “chat history” as the only record of a product decision.
