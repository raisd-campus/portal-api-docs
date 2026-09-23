# Portal API (backend agent knowledge)

**Code:** [`portal-api/`](../../../portal-api/) in control-plane.  
**OpenAPI source of truth:** [`openapi.yaml`](../../../openapi.yaml).  
**Public docs:** https://raisd-campus.github.io/portal-api-docs/  
**Product contract:** [SDD-02](../../sdd/02-architecture-and-integration.md), [SDD-08](../../sdd/08-shared-platform.md).

## Stage 1 behaviour (current)

- Bearer demo sessions and `POST /v1/portal/:method` for every student `PortalApi` method.
- Sessions still use the **student-portal mock engine** via `STUDENT_PORTAL_ROOT`.
- CMS writes are **stubbed** until CAP-53.
- Local Swagger: `http://127.0.0.1:8080/docs` when the service is running.

```bash
cd portal-api
npm install
STUDENT_PORTAL_ROOT=~/src/raisd/student-portal npm start
```

Point student-portal at it:

```bash
VITE_PORTAL_API_URL=http://127.0.0.1:8080 npm run dev
```

## Rules for backend agents

1. Do not bypass the Portal API from a portal web.
2. Do not mark a CMS write complete without an acknowledgement path (when implementing Live CAP-53).
3. Keep OpenAPI in sync with handlers. Sync `openapi.yaml` to `portal-api-docs` when publishing.
4. Prefer Zod (or the established validator) at the boundary; stable opaque IDs; ISO 8601 timestamps.
5. Student-scoped tokens must not be reusable as staff tokens in the student shell.
6. File uploads for Live land in the durable evidence store — not only in-memory metadata.

## Frontend contract origin

The student portal defines the replaceable `PortalApi` surface (`src/services/portal-api.ts`, `src/contracts/`). Backend work should honour those method names and Zod shapes unless an explicit cross-repo contract change is agreed and documented here plus OpenAPI.

## Related knowledge

- Student frontend API rules: [../frontend/student-portal/AGENTS.md](../frontend/student-portal/AGENTS.md) (Data and API architecture section)
- Data model (frontend logical contract): [../frontend/student-portal/data-model.md](../frontend/student-portal/data-model.md)
- Existing Cyberjaya CMS inventory: [old-cms-cyberjaya.md](old-cms-cyberjaya.md)
- CAP-level old vs new comparison: [cms-feature-comparison.md](cms-feature-comparison.md)
- ERD / DFD HTML: [`docs/diagrams/`](../../diagrams/)
