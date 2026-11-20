# CMS bridge — mock-server connector on Raisd UltaHost (group review)

**Status:** Architecture for CAP-53 Demo / Integration · **not Live** against production campus MySQL  
**Date:** 20 Nov 2026  
**Published page:** [diagrams/cms-bridge/](../../diagrams/cms-bridge/index.html) · https://docs.raisd.co/diagrams/cms-bridge/  
**Related:** [CAP-53](../../sdd/11-capability-catalog.md#cap-53) · [SDD-08 §3](../../sdd/08-shared-platform.md) · [cms-feature-comparison.md](../backend/cms-feature-comparison.md) · [lesotho-cap53-read-adapter.md](../backend/lesotho-cap53-read-adapter.md) · [portal-api.md](../backend/portal-api.md) · [vps-topology.md](vps-topology.md)

---

## 1. Why this note

Today Portal API mutations return `cms.acknowledged: true` with `cms.mode: "stub"`. There is **no authenticated HTTP adapter** to an existing campus CMS ([SDD-08](../../sdd/08-shared-platform.md)).

Connecting Portal API straight to **production** old-CMS hosts is unsafe for Demo/Integration and does not scale to **multiple** campus CMS families. This document defines the **CMS bridge**: a connector that sits on the **Raisd UltaHost Demo VPS**, talks to **mock CMS servers** restored from campus DB dumps, and reaches those mocks over **site-to-site VPN / secure tunnels**.

| Term | Meaning |
|---|---|
| **New CMS / Raisd stack** | Portals + Portal API + SSO (system of engagement) |
| **Old CMS** | Existing campus PHPMaker/Laravel + MySQL family (system of record per ADR-1) |
| **Mock CMS server** | Isolated MySQL (+ thin SP/API façade) restored from a **sanitized DB dump** of one campus schema |
| **CMS bridge** | Multi-campus connector on UltaHost; only path Portal API uses toward old/mock CMS |
| **Tunnel / S2S VPN** | WireGuard (or equivalent) site-to-site link from UltaHost to each mock host |

Demo ≠ Live. Live still requires owner-approved access to real campus DBs, field maps, and fail-closed acknowledgement ([CAP-53](../../sdd/11-capability-catalog.md#cap-53)).

---

## 2. Why the bridge sits on Raisd UltaHost (not on old CMS servers)

| Approach | Problem |
|---|---|
| Adapter **inside** each old CMS host | One install per campus; Raisd cannot own rollout; no shared ack/audit; credentials sprawl |
| Portal API → production MySQL direct | Bypasses adapter; Live risk; no multi-campus routing; dumps/PII in app path |
| **Bridge on UltaHost (this design)** | One connector owns all campus adapters; mocks restore from dumps; tunnels isolate networks; Portal API stays campus-agnostic |

The Demo UltaHost VPS (`38.127.216.221`, 4 vCPU / ~8 GiB) already hosts Traefik, Portal API, SSO, docs, and k3s. The bridge is an **application connector** on that edge (or co-located Node service), **not** an SFU/media process. Media stays off this box ([classroom-media-bridge.md](classroom-media-bridge.md)).

**Multi-CMS responsibility:** one bridge process routes by `campusKey` to the correct mock tunnel endpoint. Campuses inventory (dumps outside git):

| Campus key | Schema / family | Mock role |
|---|---|---|
| `cyberjaya` | `cmscbj` | Malaysia / Cyberjaya reference |
| `lesotho` | `campus2_lesotho` | M4 pilot SoR / CAP-53 R1–W1 |
| `sierra-leone` | ICA Sierra Leone dump | M5 pattern |
| `botswana` | Botswana dump (+ DTEF) | M5 + scholarship sync |
| `eswatini` | `campus2_eswatini` (LUCT CMS) | M5 |
| `cambodia` | `campus2_cambodia` (LUCT CMS) | M5 + certificate QR |

Diagram: Figure 1 — hub vs per-CMS install · Figure 2 — overall topology.

---

## 3. Implementation model — DB dump + mock server + connector

### 3.1 Build a mock per campus

1. Take a **structure + sanitized data** dump of the campus MySQL (no live PII in git / public docs).  
2. Restore into a dedicated **mock MySQL** (VM, container, or small VPS) labelled by campus.  
3. Optionally expose the same thin surfaces the Live adapter will use later: `portal_*` tables, `api_*` / `sp_*` procedures (see Lesotho R1/W1 maps).  
4. Do **not** run the full PHPMaker UI on the mock unless a desk replay is explicitly needed; the bridge talks SQL/SP (or a thin HTTP façade in front of MySQL).

### 3.2 Bridge as connector

The bridge:

- Opens **one secure tunnel** per mock (WireGuard peer or SSH/WireGuard hybrid).  
- Keeps a **campus registry** (`campusKey` → tunnel IP, DB name, dialect, adapter module).  
- Translates Portal API CAP-53 operations ↔ campus SQL/SP.  
- Returns a strict **acknowledgement** object to Portal API (never silent success).  
- Emits audit rows (who, campus, operation, correlation id, outcome).

Diagram: Figure 3 — dump → mock → tunnel → bridge.

---

## 4. Architecture (layers)

```
Browsers / portals
        │ HTTPS
        ▼
Portal API  (Raisd · CAP surface · OpenAPI)
        │ internal / private HTTP (mTLS or network policy)
        ▼
CMS bridge  (UltaHost · multi-campus connector)
        │ WireGuard / S2S VPN (one peer per campus mock)
        ▼
Mock CMS servers  (MySQL + SP façades restored from dumps)
```

| Layer | Where | Responsibility |
|---|---|---|
| Portals | `*.raisd.co` | UX only; never call CMS or Postgres |
| Portal API | k3s on UltaHost | AuthZ, OpenAPI methods, Demo records; calls bridge for CAP-53 |
| CMS bridge | UltaHost (same cluster or hostPath service) | Routing, mapping, ack, tunnels |
| Mock CMS | Isolated hosts / netns | Per-campus MySQL SoR simulation |
| Old production CMS | Campus UltaHost / LUCT hosts | **Out of path** until Live cutover |

Diagram: Figure 2 — target topology · Figure 4 — tunnel mesh.

---

## 5. APIs the bridge exposes (for the new stack to consume)

Portal API is the only public contract for portals. The **bridge API** is **private** (cluster DNS / mTLS). Indicative surface (versioned under `/bridge/v1`):

### 5.1 Control / health

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/bridge/v1/health` | Process up |
| `GET` | `/bridge/v1/campuses` | Registered campus keys + tunnel status |
| `GET` | `/bridge/v1/campuses/{campusKey}` | Adapter version, schema label, dump vintage, capabilities |
| `GET` | `/bridge/v1/campuses/{campusKey}/tunnel` | Peer up/down, last handshake, RTT |

### 5.2 CAP-53 operations (campus-scoped)

All mutating calls require `Idempotency-Key` and return `ack`.

| Method | Path | Maps toward (examples) |
|---|---|---|
| `POST` | `/bridge/v1/{campusKey}/read` | Body: `{ operation, args }` → `portal_*` / `api_student_*` reads |
| `POST` | `/bridge/v1/{campusKey}/write` | Body: `{ operation, args }` → `sp_*` / authorised writes |
| `POST` | `/bridge/v1/{campusKey}/enrolment/online` | Lesotho W1-style online-enrolment + payment proof |
| `GET` | `/bridge/v1/{campusKey}/students/{studentNo}` | Profile projection read |
| `POST` | `/bridge/v1/{campusKey}/applications` | Admissions create/update (M2 slice) |
| `POST` | `/bridge/v1/{campusKey}/applications/{id}/evidence` | Evidence metadata (bytes stay on Raisd store; CMS gets refs) |
| `POST` | `/bridge/v1/{campusKey}/offers/{id}/accept` | First enrolment accept |

### 5.3 Acknowledgement envelope (required)

```json
{
  "ack": {
    "acknowledged": true,
    "mode": "mock",
    "campusKey": "lesotho",
    "operation": "enrolment.online.submit",
    "correlationId": "…",
    "cmsRef": { "procedure": "sp_onlinenrollment_*", "rowHints": [] },
    "receivedAt": "2026-11-20T00:00:00Z"
  },
  "data": { }
}
```

| `mode` | Meaning |
|---|---|
| `stub` | Portal API local stub — **no bridge call** (today) |
| `mock` | Bridge wrote/read mock MySQL over tunnel |
| `live` | Bridge talked to real campus SoR (future; owner gated) |

Rejection: `acknowledged: false` + machine `code` + human `message`. Portal API must surface failure to the user — never invent a mock success after a bridge error ([SDD-08](../../sdd/08-shared-platform.md)).

Diagram: Figure 5 — bridge API surface · Figure 6 — read sequence · Figure 7 — write/ack sequence.

---

## 6. Data transfer — new stack → old (via bridge)

### 6.1 Direction and ownership

| Direction | Path | Owner of truth |
|---|---|---|
| **Read** | Portal → Portal API → bridge → mock MySQL | Mock (simulating old CMS) |
| **Write** | Portal → Portal API → bridge → mock SP/SQL → ack | Mock accepts → Raisd may cache projection; SoR remains mock until Live |
| **Evidence bytes** | Portal → Portal API object store | Raisd; CMS receives **metadata + URI**, not raw dumps in git |
| **Identity** | SSO / Portal session | Raisd IdP; bridge maps person → CMS `StudentID` / staff id — **never** ship CMS password hashes to portals |

### 6.2 Write sequence (happy path)

1. Portal calls Portal API OpenAPI method (e.g. submit online enrolment proof).  
2. Portal API validates session, campus, capability; assigns `correlationId`.  
3. Portal API `POST` bridge `/write` or specialised enrolment route with idempotency key.  
4. Bridge selects adapter for `campusKey`, sends SQL/SP over the campus tunnel.  
5. Mock MySQL runs procedure; bridge builds `ack`.  
6. Portal API persists Demo projection **only if** `ack.acknowledged`; returns `cms: { mode: "mock", acknowledged: true }` to the portal.

### 6.3 Failure / dual-write rules

- Bridge timeout / tunnel down → Portal API returns failed save (`cms.acknowledged: false`).  
- Partial SP failure → no silent Demo “success”.  
- Idempotent retry with same key returns the original ack (no double enrol).  
- Live cutover later swaps mock peer for production peer **without** changing portal contracts — only bridge registry + `mode: "live"`.

Diagram: Figure 7 — write sequence · Figure 8 — multi-campus fan-out.

---

## 7. Secure tunnels (site-to-site)

| Property | Choice |
|---|---|
| Preferred | **WireGuard** site-to-site: UltaHost = hub; each mock = spoke |
| Alternative | SSH `LocalForward` / reverse tunnel for lab-only (same pattern as classroom edge) |
| Addressing | Private `/24` per campus or single overlay with fixed peer IPs |
| Auth | Peer keys in host secret store — **not** in git |
| Exposure | Mock MySQL bound to tunnel IP only (no public `:3306`) |
| Observability | Bridge `/tunnel` + WireGuard handshake metrics |

Firewall on UltaHost: allow WireGuard UDP to peers; do not publish mock SQL to the public internet.

Diagram: Figure 4 — tunnel mesh.

---

## 8. What stays stub vs what the bridge replaces

| Today (`CMS_MODE=stub`) | With bridge (`CMS_MODE=mock` / per-campus) |
|---|---|
| In-process Portal API stub ack | Real HTTP call to bridge |
| No MySQL | Sanitized dump MySQL behind tunnel |
| Single fictional campus behaviour | Routed multi-campus adapters |
| Cannot rehearse SP failures | Can inject mock SP errors for UAT |

Lesotho read mapping (R1) and online-enrolment write (W1) remain the first concrete adapter modules when coding starts.

---

## 9. Capacity note (Demo UltaHost)

Bridge + tunnels are light compared with media. Current Demo VPS (~4 vCPU / 7.8 GiB, disk ~24%, calm load) can host the connector. **Do not** co-locate LiveKit/TURN here. Heavy mock MySQL restores may use **separate** small mock hosts so the Demo edge stays portals/API/docs.

---

## 10. Ask / next steps

1. Working Group accept **UltaHost-hosted multi-CMS bridge + mock dumps** as the CAP-53 Integration path.  
2. Prioritise mock restore order: **Lesotho** → Cyberjaya → other M5 campuses.  
3. Implement bridge private OpenAPI + first Lesotho R1 read operations.  
4. Wire Portal API `CMS_MODE=mock` behind feature flag; keep `stub` default until green.  
5. Live peers only after owner approval — same bridge, different tunnel endpoints.

---

## Document control

| Date | Change |
|---|---|
| 20 Nov 2026 | Initial architecture + Mermaid PNG pack for docs.raisd.co |
