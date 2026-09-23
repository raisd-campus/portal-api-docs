# Raisd Portal API docs

Public OpenAPI description, Swagger UI, and architecture diagrams for the Raisd Portal API.

**Live docs:** https://raisd-campus.github.io/portal-api-docs/  
**ERD & DFD:** https://raisd-campus.github.io/portal-api-docs/diagrams/
**Legacy CMS analysis:** https://raisd-campus.github.io/portal-api-docs/diagrams/old-cms/
**AI knowledge:** https://raisd-campus.github.io/portal-api-docs/ai/
**SDD / nomenclature:** https://raisd-campus.github.io/portal-api-docs/sdd/

| File | Role |
|------|------|
| [`openapi.yaml`](openapi.yaml) | Published OpenAPI 3.1 spec |
| [`index.html`](index.html) | Swagger UI |
| [`diagrams/`](diagrams/) | Mermaid ERD and DFD HTML pages |
| [`diagrams/old-cms/`](diagrams/old-cms/) | Cyberjaya legacy CMS comparison, FSD, legacy ERD, flows, DB tech |
| [`sdd/`](sdd/) | SDD copies; CAP-* / M* nomenclature ([15-nomenclature.md](sdd/15-nomenclature.md)) |

The implementation and diagram source of truth live in the private [`control-plane`](https://github.com/raisd-campus/control-plane) repo (`portal-api/`, `docs/diagrams/`). Keep this published copy in sync when those change.

**Agent knowledge:** [AGENTS.md](AGENTS.md) → control-plane [`docs/ai/`](https://github.com/raisd-campus/control-plane/tree/main/docs/ai) (OpenAPI source of truth remains `control-plane/openapi.yaml`).
