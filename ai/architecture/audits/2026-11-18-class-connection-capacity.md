# Class connection errors vs server capacity (18 Nov 2026)

**Standup action (Read.ai 17 Nov):** *Iman Suherman will investigate the recurring class connection errors and check whether server capacity is contributing to them.*

**Status:** Investigated on live Demo edge + DIV media host. Demo Partial only — not Live CAP-26.

**Anchors:** [lms-video-infra-test.md](../lms-video-infra-test.md) · [ultahost-vps-self-defence.md](../ultahost-vps-self-defence.md) · [classrooms.md](../../backend/classrooms.md) · waiting-room remint fix (17 Nov).

---

## Verdict

| Question | Answer |
|---|---|
| Are recurring student join failures mainly **SFU / media CPU–RAM exhaustion**? | **No** (idle media stack is light; Colima has free RAM) |
| Does **Demo VPS capacity** contribute to some class/edge failures? | **Was yes (18 Nov)** — chronic ~78% on 3.8 GiB. **Mitigated 20 Nov:** host resized to **4 vCPU / 8 GiB / ~250 GB** (guest ~4.9 GiB available). Self-defence risk reduced but cool-down rules still apply under Jenkins spikes |
| What is the **dominant** student media failure mode today? | **WebRTC ICE path** — historically Tailscale-only `node_ip` + **TURN off**; **partial Demo fix 18 Nov:** public LiveKit RTC **TCP `:7881`** via VPS (`node_ip: 38.127.216.221`). Full UDP TURN still needs a dedicated media VPS |

---

## Live snapshot (18 Nov 2026 ~05:05–06:05 AEDT / ~18:05–19:05 UTC 17 Nov)

### Public edge (healthy now)

| Check | Result |
|---|---|
| `https://classrooms.raisd.co/` | HTTP 200, TLS ~0.55s |
| `https://api.raisd.co/health` | HTTP 200 |
| `https://sso.raisd.co/` | HTTP 302 |
| `wss://classrooms.raisd.co/ws` | Upgrade answered (HTTP 400 without full NATS client — expected) |
| `https://classrooms.raisd.co/livekit` | HTTP 200 |
| VPS → DIV tunnel | `127.0.0.1:18080` (sshd reverse) + socat `:18081` → `:18080`; `plugnmeet-tunnel-proxy` Running |

Not in UltaHost self-defence signature at probe time.

### Demo VPS `srv113287766` (edge / portals)

#### 18 Nov (pre-upgrade — **capacity-tight**)

| Metric | Value |
|---|---|
| Load | ~0.23 / 0.45 / 0.62 |
| RAM | **3.2 / 3.8 GiB used**; **~594 MiB available**; **no swap** |
| Disk `/` | 51G / 72G (71%) |
| Node `kubectl top` | ~314m CPU (10%), **3068 Mi (78%)** |
| Top RSS | k3s-server ~1.2 GiB; Jenkins JVM ~600 MiB |

#### 20 Nov (post-upgrade — **edge headroom restored**)

| Metric | Value |
|---|---|
| Spec | **4 vCPU / ~8 GiB / ~250 GB** (same IP `38.127.216.221`) |
| Guest `free -h` | **7.8 GiB** total · **2.9 GiB** used · **~4.9 GiB** available · **no swap** |
| Disk `/` | 58G / 242G (**24%**) |
| Load | ~0.32 / 0.56 / 0.63 |

Upgrade ask + panel evidence: [2026-11-19-ultahost-vps-upgrade](../../../evidence/2026-11-19-ultahost-vps-upgrade/). Media must **still not** co-locate here. Self-defence cool-down under Jenkins/Kaniko still applies — see [ultahost-vps-self-defence.md](../ultahost-vps-self-defence.md). Ticket **2026111344860** / 19 Nov 8 GB ask closed by this resize.

### DIV Mac Mini media stack (SFU — **not CPU/RAM starved at idle**)

| Metric | Value |
|---|---|
| Host | M4 Pro, 12 CPU, **48 GiB** unified; load ~1.9 |
| Colima VM | **4 CPU / 4 GiB / 40 GiB** (hard ceiling for all containers) |
| Container use (idle) | plugnmeet ~13 MiB, livekit ~41 MiB, db ~103 MiB, recorder ~18 MiB, nats/redis/ingress ~35 MiB → **~210 MiB / 3.8 GiB** |
| Services | All Up (plugnmeet restarted ~12 min before probe — deploy restart) |

Capacity conclusion for DIV: **idle SFU is fine**. Risk is **Colima’s 4 GiB ceiling** under concurrent recording + chromedp + ffmpeg transcode + multi-party — not “the Mac ran out of 48 GB.”

---

## Failure modes (ordered by evidence)

### 1. Public WebRTC ICE failure (dominant for “student connection failed”)

DIV `livekit.yaml`:

```yaml
rtc:
  node_ip: 100.97.217.25   # Tailscale only
  use_external_ip: false
  allow_tcp_fallback: true
turn:
  enabled: false
```

LiveKit log (GRD301 session, 17 Nov ~11:11 UTC) for `student-rizal__17afdf`:

- Signal session starts, then **`SIGNAL_SOURCE_CLOSE`** / **`removing participant without connection`** (`sessionDuration: 0s`, `connectionType: unknown`).
- ICE pairs **failed**: local `100.97.217.25:50xxx` (host) ↔ remote public **srflx** `125.209.148…` — **8 STUN requests sent, 0 responses**.
- Same room: staff on Tailscale (`100.87.86…`) reached **`connectionType: udp`** successfully; recorder also joined on-box.

Also seen in retained logs: repeated `SIGNAL_SOURCE_CLOSE` for public/demo students (`student-alya__…`, `student-rizal__…`) vs successful short Tailscale peer captures (`student-rizal-feat`, etc.).

**Interpretation:** signalling (NATS/LiveKit WS via `classrooms.raisd.co` tunnel) can succeed while **media UDP never completes** for internet clients. That surfaces as join/connection errors in the Classroom UI even when the lobby mint and waiting-room admit are healthy.

### 2. Join-URL remint → waiting room bounce (fixed 17 Nov)

`reportLiveClassMediaConnected` reminted a new LiveKit identity; iframe reload dropped the student into waiting again. **Fixed** — reuse stored join URL (API + portals). Distinct from ICE/capacity; still looked like a “connection / waiting” failure in standup.

### 3. NATS / edge latency via VPS→DIV tunnel (mitigated 12 Nov)

Public `Connection Error` / `TimeoutError` when NATS INFO > old 5s client timeout. Client `INITIAL_CONNECT_TIMEOUT` and nats-server auth timeout raised to **20s**. Still sensitive if Demo VPS enters self-defence or the reverse tunnel stalls.

### 4. Demo VPS overload (secondary, intermittent)

When Traefik/TLS hangs, **every** classroom path through `classrooms.raisd.co` fails together with SSO/API. Not SFU OOM — **edge host memory**. Cool-down rules in self-defence doc still apply before re-trying recording or heavy deploys.

---

## Is “server capacity” contributing?

| Layer | Contributing? | How |
|---|---|---|
| Demo VPS (was 3.8 GiB; **8 GiB from 20 Nov**, no swap) | **Was yes (edge); mitigated** | Pre-upgrade memory pressure → TLS/HTTP hang; post-upgrade headroom restores edge reliability — ICE/TURN still dominate student media fails |
| DIV Colima 4 GiB SFU | **Weak / contingent** | Idle headroom OK; recorder+transcode+many publishers could contend — not proven as today’s primary student fail |
| DIV host 48 GiB | **No** | Not the bottleneck; Colima VM size is |
| Missing public TURN / public UDP | **Yes (media)** | Topology/config — often *called* “capacity” in standup, but it is **reachability**, not CPU% |

So: capacity **does** contribute on the **Demo edge**; for the **recurring student media fail**, treat **ICE/TURN topology** as first-class, not an UltaHost RAM upgrade alone.

---

## Recommended next steps (Demo Partial → Live path)

1. **Short Demo workaround:** run lecturer + student browsers on Tailscale (or same LAN path that already works) for demos; document that public internet join is **unsupported** until TURN/public media VPS.
2. **Proper Demo/Live fix:** clean Ubuntu media VPS with public IPv4, LiveKit `use_external_ip` / correct `node_ip`, **TURN enabled** (`turn-test.raisd.co` / production TURN), UDP ranges open — already open checklist in [lms-video-infra-test.md](../lms-video-infra-test.md) §7.1.
3. **Keep media off Demo VPS**; edge RAM upgrade (20 Nov) closed the 8 GB ask — still avoid Jenkins + live-class proof on the same overload window.
4. **Optional Colima bump** (e.g. 6–8 GiB) if recording quality dips under multi-party — secondary to TURN.

---

## Related fixes already shipped

| Date | Item |
|---|---|
| 10 Nov | Public `/ws` ConnectionError (tunnel to bare `:18080`) → Caddy `:18480` |
| 12 Nov | NATS TimeoutError → 20s connect/auth timeouts |
| 17 Nov | Waiting-room bounce → reuse join URL on `mediaConnected` |
| 18 Nov | This capacity vs ICE investigation |
| 18 Nov | **Public LiveKit TCP media path (Demo Partial):** DIV `livekit.yaml` `node_ip: 38.127.216.221`, `tcp_port: 7881`; Demo VPS `raisd-livekit-tcp-forward` + ufw `7881/tcp`; tunnel `-R 17881`. Verified `38.127.216.221:7881` OPEN. **Not** full UDP TURN (`turn.enabled: false`). |
| 18 Nov | Whiteboard Past Class MP4 confirm: **FAIL** — see [2026-11-18-whiteboard-past-class-confirm.md](./2026-11-18-whiteboard-past-class-confirm.md) |
| 20 Nov | **Demo VPS resized** to 4 vCPU / 8 GiB / ~250 GB (same IP). Guest ~4.9 GiB available. Evidence: [2026-11-19-ultahost-vps-upgrade](../../../evidence/2026-11-19-ultahost-vps-upgrade/). |
| 20 Nov | **Post-admit “Connection Error” / lecturer never sees student:** LiveKit still advertises public UDP `38.127.216.221:50000–50100` but VPS ufw only allows **TCP 7881** (TURN off). GRD301 `student-rizal__e4521e` (19 Nov ~11:13Z) reached signal then `SIGNAL_SOURCE_CLOSE` / `removing participant without connection` (`sessionDuration: 0s`, `connectionType: unknown`) with TCP `:7881` candidate present but never selected — student never becomes `participant active`, so the lecturer loses them after admit. Client mitigations: keep healthy waiting-room NATS session (skip tunnel-sensitive reconnect), `peerConnectionTimeout` 45s for ICE-TCP. **Still needs** public UDP TURN / media VPS for reliable public students. |
| 20 Nov (evening) | **Interim UltaHost SFU cutover** — LiveKit/plugNmeet on Demo VPS. Host saw ~17s LOST→full reconnect (`CLIENT_REQUEST_LEAVE`) → mic/cam unpublished. Not Docker mem/CPU caps (unlimited; LiveKit tiny). Mitigations: client LOST neuter + reconnect toast off + AdaptiveMedia off; compose `cpu_shares`/`mem_reservation` for LiveKit; Jenkins scaled 0; cloud REC deferred. Full write-up: [2026-11-20-ultahost-interim-sfu-reconnect.md](./2026-11-20-ultahost-interim-sfu-reconnect.md). |
