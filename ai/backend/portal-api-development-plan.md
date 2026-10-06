# Portal API — development plan

**Status:** Working plan (27 September 2026). Phase 0 done; everything after it is Not started unless marked.\
**Code:** [`raisd-campus/portal-api`](https://github.com/raisd-campus/portal-api) (sibling checkout `~/src/raisd/portal-api`).\
**Contract:** [`openapi.yaml`](../../../openapi.yaml) in control-plane (source of truth).\
**Agent rules:** [portal-api.md](portal-api.md). **Deployment:** [portal-api-deployment.md](portal-api-deployment.md). **PoC:** [portal-api-poc-requirements.md](portal-api-poc-requirements.md).\
**Product baseline:** [SDD-02](../../sdd/02-architecture-and-integration.md), [SDD-03](../../sdd/03-delivery-milestones.md), [SDD-08](../../sdd/08-shared-platform.md), [SDD-12](../../sdd/12-deployment-architecture.md).

This plan sequences Portal API work against the milestones in SDD-03. It does not change ADR-1 (existing CMS is the system of record), ADR-2 (UltaHost Singapore) or ADR-3 (k3s). Dates stay TBC until SDD-03 has them.

## 1. Where the service is today

| Area | State | Evidence |
|---|---|---|
| HTTP shape | RPC over `POST /v1/portal/:method`, bearer auth, `/health`, `/v1/meta`, `/openapi.yaml`, `/docs` | `src/server.ts` |
| Domain logic | Delegated to student-portal `MockPortalApi` through `STUDENT_PORTAL_ROOT` (sibling checkout, run with `tsx`) | `scripts/dev.sh`, `src/server.ts` imports `@/services/portal-api` |
| Sessions | In-memory `Map`, 12 h TTL, lost on restart, not shared between instances | `src/session-store.ts` |
| CMS | Stub. Every call returns `cms: { acknowledged: true, mode: "stub" }` | `src/server.ts` |
| Persistence | None. No Postgres, no evidence store | — |
| Identity | Demo scenario login only (`scenarioId`) | `POST /v1/auth/login` |
| Tests | None in repo. Manual smoke only | — |
| Build | No compiled output; runtime needs `tsx` and the student-portal source tree | `Dockerfile` copies `student-portal/` |
| Status word | **Demo** ([status language](../process/status-language.md)) | — |

## 2. Principles that hold in every phase

1. Portals call only the Portal API. Only the Portal API holds `DATABASE_URL`, CMS credentials, or evidence-store credentials.
2. Write success is returned **only after the CMS acknowledges** the write once a CMS adapter is connected. A CMS rejection is a failed save, never a silent success (SDD-08 §3.5).
3. `openapi.yaml` in control-plane is the contract. A handler change without the matching spec change (or the reverse) does not merge.
4. The student-portal `PortalApi` method names and Zod shapes are the client contract. Changing them is a cross-repo change recorded in [portal-api.md](portal-api.md) and OpenAPI.
5. Authorisation is server-side: role **and** campus on every read and write.
6. Demo stays labelled Demo until the Definition of Done in SDD-03 §4 is met.
7. No real student data, `.env`, CMS credentials, or connection strings in git.

## 3. Phases

Each phase lists scope, the work items, and the exit criteria that must be true before the phase is called done. Phases 1–3 can overlap; phase 5 cannot start its Live writes before phase 4 identity exists.

<a id="phase-0"></a>

### Phase 0 — Repository bootstrap (done 27 Sep 2026)

| # | Work item | Status |
|---|---|---|
| 0.1 | Split `control-plane/portal-api/` into `raisd-campus/portal-api` with history | Done |
| 0.2 | Thin `AGENTS.md`, `.cursor/rules/`, `docs/` working copies pointing at control-plane `docs/ai/` | Done |
| 0.3 | Sibling defaults: `STUDENT_PORTAL_ROOT=../student-portal`, `OPENAPI_ROOT=../control-plane` | Done |
| 0.4 | CI: smoke workflow (boot, health, login, one RPC call) with a read token for student-portal | Done — `RAISD_READ_TOKEN` repo secret set; smoke green ([deployment §7](portal-api-deployment.md#ci-cd)) |
| 0.5 | Register in `repositories.yaml`, knowledge base, SDD-12 repository table | Done |

Exit: local `npm start` works from the new checkout; CI smoke green once the secret is set.

<a id="phase-1"></a>

### Phase 1 — Self-contained build (decouple the mock bridge)

Goal: the service builds and runs without a student-portal source checkout. This unblocks Vercel (PoC) and a clean k3s image.

| # | Work item | Notes |
|---|---|---|
| 1.1 | Decide the contract packaging | **Option A (recommended):** student-portal publishes `@raisd-campus/portal-contracts` (types, Zod schemas, `PortalApi` interface, mock engine) to GitHub Packages, like `@raisd-campus/design-system`. **Option B:** esbuild bundle that inlines student-portal `src/` at build time from a pinned ref. Record the decision in [portal-api.md](portal-api.md). |
| 1.2 | Compile to `dist/` (esbuild or `tsc` with path mapping) and start with `node dist/server.js` | Drop `tsx` from the runtime image |
| 1.3 | Replace the `import.meta.env` shim (`register-env.ts`) with explicit config | Only needed while mock code reads Vite env |
| 1.4 | Typed config module: Zod-validated env (`PORT`, `HOST`, `CORS_ORIGIN`, `DATABASE_URL`, `SESSION_TTL`, `CMS_MODE`, `OPENAPI_ROOT`) that fails fast on boot | |
| 1.5 | Multi-stage Dockerfile that no longer copies `student-portal/` | Image target < 200 MB |

Exit: `npm ci && npm run build && node dist/server.js` passes the smoke script with no sibling repos present except (optionally) control-plane for `/docs`.

<a id="phase-2"></a>

### Phase 2 — Service foundations

| # | Work item | Notes |
|---|---|---|
| 2.1 | Test harness: Vitest + `fastify.inject()` | Unit + route tests in CI |
| 2.2 | OpenAPI conformance test | Every `operationId` / RPC method in `openapi.yaml` has a handler and vice versa; response samples validate against schemas |
| 2.3 | Error envelope | One shape `{ error: { code, message, details?, requestId } }`; CMS rejection code distinct from validation and auth codes; document in OpenAPI |
| 2.4 | Request id + structured logs | `x-request-id` in and out; pino JSON; never log bearer tokens, file bytes, or PII fields |
| 2.5 | CORS allowlist from `CORS_ORIGIN` | Replace `origin: true` |
| 2.6 | Body limits and upload rules | Max body per route; content-type and size checks on `__portalFile` (SDD-08 §5) |
| 2.7 | Rate limiting on `/v1/auth/*` | `@fastify/rate-limit` |
| 2.8 | Liveness `/health`, readiness `/ready` (checks DB when configured), graceful shutdown on `SIGTERM` | Needed for k3s probes |
| 2.9 | Lint/format (oxlint, same as portals) and typecheck in CI | |

Exit: CI runs lint, typecheck, unit, route, conformance and smoke; error envelope published in OpenAPI.

<a id="phase-3"></a>

### Phase 3 — Persistence (Postgres + evidence store)

| # | Work item | Notes |
|---|---|---|
| 3.1 | Postgres access layer and migrations | Pick one migration tool and record it (candidates: Drizzle, Kysely + node-pg-migrate). Migrations run as a Job / pre-start step, never from a portal |
| 3.2 | Tables, first cut | `sessions` (token hash, principal, role, campus, expiry, revoked_at), `audit_events` (who, what, when, campus, request id), `campus_config`, `idempotency_keys`, `cms_write_attempts` (outbox / ack log) |
| 3.3 | Session store on Postgres | Tokens stored hashed; logout revokes (fixes SDD-08 "logout does not end the session") |
| 3.4 | Evidence store abstraction | Interface with a local-volume driver (k3s PVC `evidence`) first; content hash, MIME sniffing, size limit; metadata row in Postgres |
| 3.5 | Neon compatibility | Same migrations run on Neon for the PoC ([PoC requirements](portal-api-poc-requirements.md)) |

Exit: restart of the API loses no session; an uploaded file survives restart and is retrievable only by an authorised principal.

<a id="phase-4"></a>

### Phase 4 — Identity and authorisation ([CAP-01](../../sdd/11-capability-catalog.md#cap-01), [CAP-39](../../sdd/11-capability-catalog.md#cap-39))

| # | Work item | Notes |
|---|---|---|
| 4.1 | Principal model | `{ personId, cmsPersonRef, roles[], campusIds[], portal }`; token bound to one portal audience (student tokens not reusable as staff tokens) |
| 4.2 | Login mapped to a CMS person | Mechanism depends on M1 integration access (CMS password check vs. new credential store vs. SSO) — open decision, see §6 |
| 4.3 | Authorisation middleware | Per-method policy table: role + campus + ownership (student can only read own records) |
| 4.4 | Token lifetime and rotation | Short access token + refresh, or server session with sliding expiry; decide with 4.2 |
| 4.5 | Applicant accounts | Self-registration, email verification (mail is not in the request path in stage 1; queue it) |
| 4.6 | Demo scenario login kept only when `CMS_MODE=stub` | Never enabled in production |

Exit: every RPC method has an explicit policy; negative tests prove cross-student and cross-campus reads fail.

<a id="phase-5"></a>

### Phase 5 — CMS adapter, first slice ([CAP-53](../../sdd/11-capability-catalog.md#cap-53), [M2](../../sdd/03-delivery-milestones.md#m2) / [M4](../../sdd/03-delivery-milestones.md#m4) Lesotho)

**Pilot campus:** Lesotho (M4). Prefer Lesotho read adapter before Cyberjaya-only live writes. Mapping: [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md).

| # | Work item | Notes |
|---|---|---|
| 5.0 | **Lesotho Phase R1 reads** | `CmsAdapter` + `lesothoRead`: `portal_student_*_lesotho` + `api_student_*` → student `get*` methods; campus key `LESOTHO`. Writes stay stub/fail-closed |
| 5.1 | Adapter interface | `CmsAdapter` per campus; implementations `stub` (today), `lesothoRead` (R1), later `lesotho` / `cyberjaya` (live writes). Selected by `campus_config` |
| 5.2 | Integration access | Non-production **Lesotho** `campus2_lesotho` reachable privately (read replica / integration). Cyberjaya remains richest LUCT reference for patterns |
| 5.3 | Admissions entities (R2 / W1) | Applicant, application, evidence metadata, offer (`app_*` — Faculty/AQA/Registry statuses); LGCSE extract; LSL fee verification |
| 5.4 | Acknowledgement semantics | Write → CMS → ack → then `200`. On timeout: record in `cms_write_attempts`, return a failed/pending state, never success. Idempotency key on every mutating call |
| 5.5 | Envelope change | Replace the stub `cms` block with real `{ acknowledged, mode: "live", reference, campus }`; update OpenAPI |
| 5.6 | Contract tests against the integration CMS | Run nightly, not on every PR — start with Lesotho LoginActive / empty portal row cases |

Exit (R1): selected student `get*` methods serve Lesotho CMS reads with live envelope.\
Exit (full Phase 5): application-to-enrolment works against the integration CMS with real acknowledgements; CMS rejection shows as a failed save in applicant-portal.

<a id="phase-6"></a>

### Phase 6 — Applicant surface and M2 release readiness

| # | Work item | Notes |
|---|---|---|
| 6.1 | Applicant `PortalApi` methods for applicant-portal | CAP-02, CAP-03, CAP-55, CAP-07; contract agreed with applicant-portal and added to OpenAPI |
| 6.2 | Monitoring ([CAP-37](../../sdd/11-capability-catalog.md#cap-37)) | Uptime check on `/health`, error-rate and latency from logs; named on-call |
| 6.3 | Backups ([CAP-38](../../sdd/11-capability-catalog.md#cap-38)) | Postgres + evidence volume backup CronJob (SDD-12 stage 2), restore tested once |
| 6.4 | Security review ([CAP-39](../../sdd/11-capability-catalog.md#cap-39)) | TLS, secrets handling, upload scanning, audit of offers issued |
| 6.5 | Staging deploy and UAT | Cyberjaya-like config (SDD-08 environments) |

Exit: SDD-03 M2 release condition — application-to-enrolment with real records — signed off; `api.raisd.co` serving from the stage 2 node.

<a id="phase-7"></a>

### Phase 7 — Core student, lecturer and staff slices ([M3](../../sdd/03-delivery-milestones.md#m3))

Replace mock-backed student methods domain by domain, each with CMS mapping, policy, tests and OpenAPI:

1. Semester / module registration.
2. Timetable and calendar.
3. Files: materials, assignments, submissions (evidence store).
4. Finance ledger read + payment proof upload (Live write only with Bursary acknowledgement path).
5. Results publication (read) with lecturer/staff publish methods.
6. Staff progression methods now reserved at `GET /v1/meta/staff-progression` (online forms, immigration, graduation, finance verification).

Exit: M3 journeys work end to end with durable records; the mock engine is no longer loaded when `CMS_MODE=live`.

<a id="phase-8"></a>

### Phase 8 — Pilot and campus expansion ([M4](../../sdd/03-delivery-milestones.md#m4), [M5](../../sdd/03-delivery-milestones.md#m5))

- M4: restore drill, load test at expected Cyberjaya concurrency, runbook, CAP-41 handover.
- M5: additional `CmsAdapter` implementations for Botswana (`cmsbotswana`, incl. [DTEF sync](botswana-dtef-scholarship-sync.md)) and Sierra Leone (`ems_sierraleone`), selected by campus config. No second control plane.

## 4. Workstreams and owners

| Workstream | Phases | Owner |
|---|---|---|
| API platform (build, config, errors, tests, CI) | 1, 2 | Backend owner — TBC |
| Persistence and evidence | 3 | Backend owner — TBC |
| Identity and authz | 4 | Backend owner + campus IT — TBC |
| CMS integration (Cyberjaya) | 5, 7 | Backend owner + CMS owner (Aslam) — TBC |
| Contract sync with portals | 1, 6, 7 | Portal leads (student, applicant, lecturer, staff) |
| Hosting and operations | 6, 8 | Infra owner — TBC ([deployment](portal-api-deployment.md)) |

## 5. Dependencies

| Needs | Blocks | Source |
|---|---|---|
| M1 CMS integration access (non-production copy, network path, credentials) | Phase 4.2, Phase 5 | SDD-03 M1 |
| Contract packaging decision (1.1) | Phase 1, Vercel PoC | this plan |
| Stage 1 node provisioned | First k3s deploy | SDD-12 §2.1 |
| Applicant-portal contract | Phase 6.1 | applicant-portal |
| Repo secret `RAISD_READ_TOKEN` (fine-grained, read-only, expires 27 Oct 2026) plus design-system package Actions read access for `GITHUB_TOKEN` (both set) | CI smoke, Phase 1 builds | [deployment §7](portal-api-deployment.md#ci-cd) |

## 6. Open decisions

| # | Decision | Default until decided |
|---|---|---|
| D1 | Contract packaging: published package vs. build-time bundle | Option A (package) |
| D2 | Login mechanism against the CMS person | Blocked on M1 |
| D3 | Migration / query tool | Choose in phase 3.1 |
| D4 | Session model: opaque server session vs. short JWT + refresh | Opaque server session in Postgres |
| D5 | CMS integration mechanism for writes (DB procedures vs. HTTP layer) | Blocked on M1 and inventory review |
| D6 | Where the Postgres StatefulSet and evidence PVC manifests live | control-plane `deploy/` (platform), portal-api owns only its own Deployment — see [deployment](portal-api-deployment.md) |

## 7. Risks

| Risk | Effect | Mitigation |
|---|---|---|
| CMS integration access slips | M2 cannot go Live | Keep stub adapter honest (Demo label); push M1 |
| Mock engine leaks into production | Demo data presented as Live | `CMS_MODE=live` refuses to boot if the mock is imported; phase 1 removes the bridge |
| Contract drift between portal Zod, handlers and OpenAPI | Runtime failures in portals | Conformance test (2.2); contract changes recorded in portal-api.md |
| Single 4 GB node | Memory pressure with Postgres + API + portal | Resource limits in [deployment](portal-api-deployment.md); resize per SDD-12 stage 2 |
| Serverless PoC semantics differ from k3s | False confidence from the PoC | PoC requirements list what the PoC does not prove |

## 8. Definition of done (per phase item)

A work item is done when: code merged in `portal-api`; OpenAPI updated in control-plane (and synced to `portal-api-docs` on publish); tests in CI; this plan's status column and [portal-api.md](portal-api.md) updated; the matching SDD row updated if a capability status changed.
