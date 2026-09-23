# Raisd Portal API docs

Public OpenAPI description, Swagger UI, and architecture diagrams for the Raisd Portal API.

**Live docs:** https://raisd-campus.github.io/portal-api-docs/  
**ERD & DFD:** https://raisd-campus.github.io/portal-api-docs/diagrams/
**Old CMS analysis:** https://raisd-campus.github.io/portal-api-docs/diagrams/old-cms/
**AI knowledge:** https://raisd-campus.github.io/portal-api-docs/ai/

| File | Role |
|------|------|
| [`openapi.yaml`](openapi.yaml) | Published OpenAPI 3.1 spec |
| [`index.html`](index.html) | Swagger UI |
| [`diagrams/`](diagrams/) | Mermaid ERD and DFD HTML pages |
| [`diagrams/old-cms/`](diagrams/old-cms/) | Cyberjaya old CMS comparison, FSD, legacy ERD, flows, DB tech |

The implementation and diagram source of truth live in the private [`control-plane`](https://github.com/raisd-campus/control-plane) repo (`portal-api/`, `docs/diagrams/`). Keep this published copy in sync when those change.

**Agent knowledge:** [AGENTS.md](AGENTS.md) → control-plane [`docs/ai/`](https://github.com/raisd-campus/control-plane/tree/main/docs/ai) (OpenAPI source of truth remains `control-plane/openapi.yaml`).
