# LMS video platforms — testability on available Raisd infrastructure

**Standup action (Read.ai 5 Nov 2026):**  
*Iman Suherman will investigate the candidate platforms, including BigBlueButton, OpenVidu, and Plug and Meet, for possible testing on the available infrastructure.*

**Related standup actions (same meeting):**  
- *Mohd. Paramasvara will test Plug and Meet and assess whether it can be embedded in the video experience.*  
- *Iman Suherman will review the Alta Host alert email and timestamps…* / *Mohammad Aslam Khan will ask Alta Host which server triggered the capacity alert.*

**Raisd anchors:** [lms-online-class-options.md](lms-online-class-options.md) · [lms-oss-video-requirements.md](lms-oss-video-requirements.md) · [lms-video-feature-comparison.md](lms-video-feature-comparison.md) · [vps-topology.md](vps-topology.md) · CAP-26  
**Status:** **Demo Partial spike** — plugNmeet on borrowed MGP DIV host + Portal API tokens; **not** Live CAP-26. Demo ≠ Live.  
**Measured Demo host:** UltaHost VPS `38.127.216.221` / k3s node `srv113287766`, snapshot **6 Nov 2026 ~03:40 UTC**.  
**Spike media host:** MGP **DIV** Mac Mini (Tailscale `100.97.217.25`) — see §1.1.

---

## 1. What “available infrastructure” means

| Layer | What exists today | Implication for video |
|---|---|---|
| **Demo application VPS** | Single UltaHost Singapore node: **3 vCPU**, **3.8 GiB RAM**, **72G** disk (~40G free), **no swap**; Traefik + cert-manager; namespace `campus` | Already runs portals, Portal API, SSO, Postgres, docs, etc. |
| **Headroom (measured)** | CPU ~6% busy; **memory ~80% used** (~529 Mi available); load ~0.2 | Almost no RAM left for an SFU / classroom stack — **insufficient memory** for BBB / OpenVidu / plugNmeet co-location |
| **Ports / ingress** | Traefik owns **TCP 80/443**; media UDP ranges (BBB `16384–32768`, OpenVidu `50000–60000`, LiveKit/TURN) **not** opened for a classroom product | Co-installing BBB / OpenVidu / plugNmeet conflicts with Traefik and needs firewall/UDP work |
| **Standing rule** | Do **not** self-host media on the shared Demo k3s node ([lms-online-class-options.md](lms-online-class-options.md), [lms-oss-video-requirements.md](lms-oss-video-requirements.md) S3) | Confirmed by this measurement |
| **DIV Mac Mini (borrowed)** | MGP DIV AI host — §1.1 | Chosen spike box for plugNmeet (6 Nov); not Raisd-owned Live media |

### 1.1 DIV host (MGP Mac Mini) — spike inventory

Inventory from MGP [`mgp-div-ai/ops/host.md`](https://github.com/Medical-Growth-Partner/mgp-div-ai) + live SSH snapshot **6 Nov 2026 ~07:09 AEDT**.

| Field | Value |
|---|---|
| Role | Dedicated local MLX article factory for DIV (Dental Implants & Veneers); **borrowed** for Raisd plugNmeet smoke |
| Tailscale IP | `100.97.217.25` |
| Public hostname | `ai.dentalimplantsandveneers.com.au` (Caddy/AI gateway — **do not** collide for media) |
| Hardware | Mac Mini M4 Pro, Darwin arm64, **48 GB** unified memory |
| SSH | user `mgp1` via Tailscale; helper `mgp-div-ai/scripts/ssh-div-ai.sh` |
| Disk | ~460 GB APFS, ~257 GB free (snapshot) |
| Docker / Colima | **Absent** at first measurement — Colima + Docker CLI required before compose |
| Official plugNmeet path | Installer targets **Ubuntu/Debian** — on DIV we use **Docker Compose via Colima**, not `install.sh` on bare metal |

**Memory analysis (important correction):** DIV is **not** RAM-starved at idle/light load. Snapshot showed **~11 GB used / ~37 GB unused**. The **insufficient-memory** finding for classroom stacks remains on the **Demo VPS** (~0.5 GiB free), not on DIV’s 48 GB.

| Scenario | Expected free RAM | plugNmeet impact |
|---|---|---|
| Current (Qwen3-4B worker + gateway only) | ~37 GB free | Comfortable for test stack (recorder off) |
| Full MLX fleet (writer / thinking / critic / vision + embeddings) | Can collapse toward low single-digit GB free | **Contingent insufficiency** — SFU + LiveKit may starve; hard-stop if free under ~4 GB during join |
| Demo VPS co-location | ~0.5 GiB free | **Hard fail** — never install media there |

**Other DIV risks (not RAM):** macOS ≠ supported installer OS; arm64 image support must be verified; Colima UDP/WebRTC may be fragile; **cross-org dual-use** (DIV dental AI + Raisd media). Spike status only — not Live CAP-26.

**MLX ports already in use on DIV (localhost):** 8001–8004, 8006 (MLX roles), 8080 (FastAPI), 80/443 (Caddy). Media exposure for the spike prefers **Tailscale Serve / unused local ports**, not the public DIV marketing hostname.

**Meeting lean (5 Nov):** prefer open source, self-host without licence fee, stack close to **Go + TypeScript**, white-label / embed into Student/Staff portals; **Plug and Meet** chosen as the initial evaluation target because it fits current server constraints better than the heavier options.

---

## 2. Candidate requirements (vendor docs, Nov 2026)

| Platform | Licence / stack | Official minimum (self-host) | Relaxed test note | Network |
|---|---|---|---|---|
| **BigBlueButton 4.x** | Apache-2.0 · full classroom (nginx, FreeSWITCH/LiveKit, recording) | **Production:** clean dedicated Ubuntu 24.04, **8 CPU**, **16 GB** RAM + swap, **50–500 GB** disk, **250 Mbit/s** sym | Local/dev can drop toward **4 CPU / 8 GB** / 50 GB if few users and recording off | TCP 80/443, TURN 3478, **UDP 16384–32768**; **dedicated** host (nothing else on 80/443) |
| **OpenVidu Meet (Community)** | OSS Community · LiveKit-compatible single-node installer (+ Meet embed) | **≥4 CPU**, **≥4 GB** RAM; **~100 GB** disk if recording; Ubuntu 22.04+ | Still wants a **clean** public IP host; Meet is optional module on the same node | TCP 80/443, UDP 443, optional TCP 7881, **UDP 50000–60000** |
| **plugNmeet** (“Plug and Meet”) | MIT/Apache components · **Go** server + React client on **LiveKit** | **Test:** ~**2 CPU / 2–4 GB**; **Production:** ≥**4 CPU / 4 GB** ( **8+ / 8+ GB** if recorder co-located); ≥**100 Mbit/s** | Lightest of the three; installer wants clean Ubuntu/Debian + two DNS names (`app` + `turn`) | WebRTC/TURN per [firewall guide](https://www.plugnmeet.org/docs/installation); no other web server on the host |

Sources: [BBB install](https://docs.bigbluebutton.org/administration/install/) · [OpenVidu Meet basic deploy](https://openvidu.io/latest/meet/deployment/basic/) · [plugNmeet install](https://www.plugnmeet.org/docs/installation).

---

## 3. Fit against the Demo VPS (pass / fail)

| Check | Demo VPS (3 / 3.8 GiB) | BBB | OpenVidu Meet | plugNmeet |
|---|---|---|---|---|
| CPU vs vendor min | 3 vCPU | **Fail** (needs 8 prod / 4 test) | **Fail** (needs 4) | Borderline for “small test” only |
| RAM vs vendor min | ~0.5 GiB free | **Fail** | **Fail** | **Fail** if co-located (installer + LiveKit + Redis + MariaDB will OOM the Demo stack) |
| Dedicated / clean host | Shared k3s + Traefik | **Fail** | **Fail** | **Fail** |
| Port 80/443 free | Traefik | **Fail** | **Fail** | **Fail** |
| UDP media ranges | Not provisioned for SFU | **Fail** without firewall change | Same | Same |
| Disk for recording | 40G free | Risky with recording on | Risky | Risky if recorder on-box |
| **Verdict on Demo VPS** | — | **Do not install** | **Do not install** | **Do not install** |

**Conclusion:** none of the three candidates can be safely tested **on the current Demo application VPS**. “Available infrastructure” for a real media test means a **separate** host (or managed classroom), not co-location with `campus` k3s.

---

## 4. What *is* testable — ordered for Raisd

Aligned with the 5 Nov selection and the measured box:

### 4.1 First: plugNmeet on **DIV** (active spike) — then a clean Ubuntu media VPS for Live

| Item | Proposal |
|---|---|
| **Why first** | Meeting pick; lightest RAM/CPU story; **Go + TypeScript** alignment; embed/API path Mohd is assessing; LiveKit lineage keeps a later OpenVidu / pure-LiveKit path open |
| **Spike box (now)** | MGP **DIV** Mac Mini (§1.1) — Tailscale `100.97.217.25`; Colima + Docker Compose; **recorder off** |
| **Live-class box (later)** | Clean Ubuntu LTS, **2–4 vCPU / 4 GB** RAM, **≥40 GB** disk (**8 GB** if recorder on same box), public IPv4, **≥100 Mbit/s** |
| **DNS (spike)** | Tailscale Serve / MagicDNS first; public `meet-test.raisd.co` + `turn-test.raisd.co` only after ICE/TURN works |
| **Install (spike)** | Docker Compose on Colima; verify **arm64** images before pull; hard-stop if amd64-only / WebRTC broken / free RAM under ~4 GB |
| **Raisd glue (Demo Partial)** | Portal API mints join tokens server-side; portals keep Raisd lobby; iframe / redirect Shape **B**; no browser secrets; CMS = roster SoR only |
| **Success criteria** | Lecturer host + student participant join; no impact on Demo k3s memory/CPU; DIV free-RAM under load recorded |
| **Out of scope for this test** | Live CAP-26, recording SoT, transcription, multi-campus scale, co-host on Demo VPS, CMS PHP media glue |

### 4.2 Second: OpenVidu Meet Community on a **dedicated ≥4 vCPU / 4–8 GB** VPS

| Item | Note |
|---|---|
| **Why second** | More customizable / embed-oriented than plugNmeet; heavier than plugNmeet’s documented test floor |
| **Box** | Meet **≥4 CPU / ≥4 GB** (prefer **8 GB**); **~100 GB** if enabling recording |
| **Value vs plugNmeet** | Stronger packaged Meet embed + dashboard; same LiveKit-family lessons; PRO metered path later if Community single-node ceilings hit |
| **Do not** | Run on Demo k3s or shrink below 4 CPU to “fit” the current VPS |

### 4.3 Third: BigBlueButton — **managed host or dedicated 8/16 box**, not Demo VPS

| Item | Note |
|---|---|
| **Why last for self-host test** | Heaviest footprint; project insists on **dedicated** Ubuntu; Demo VPS fails every hard check |
| **Practical test paths** | (1) **Managed BBB** sandbox (fastest classroom API spike), or (2) separate compute-optimised VPS **≥8 CPU / 16 GB** with recording disk sized to policy |
| **When BBB wins** | Teaching depth, attendance analytics, Moodle-native patterns — already preferred Shape **B** classroom pack in [lms-oss-video-requirements.md](lms-oss-video-requirements.md); infra cost is the blocker, not product fit |

### 4.4 Optional: laptop / CI disposable Compose (API-only smoke)

Useful for **API + embed** dry-runs **without** claiming multi-party media quality. Not a substitute for a public-IP media VPS (browsers need real ICE/TURN paths). Keep disposable; never point at hosted `DATABASE_URL` or Demo secrets.

---

## 5. Capacity / Alta Host context (why a second box)

Standup 5 Nov: Alta Host capacity alerts did not name a server; video conferencing + **recording I/O** may exceed the reported limit; prefer measuring capacity and parking recordings in **object storage**.

| Risk | Mitigation for the infra test |
|---|---|
| Demo VPS already memory-tight | Keep media off it |
| Recording CPU/I/O spikes | First plugNmeet test: **recorder off**; later recorder on a **second** small host or object-store export |
| Shared disk 72G | Media VPS owns its disk; export recordings out of the Demo node |
| Unclear which host alerted | Aslam → Alta Host; Iman → alert timestamps (separate action) — do not assume the Demo app node can absorb SFU load |

---

## 6. Recommended decision for the next demo

1. **Do not** install BBB, OpenVidu, or plugNmeet on `38.127.216.221` (Demo VPS has **insufficient memory**).  
2. **Spike now:** plugNmeet on **DIV** (§1.1) via Colima/Compose + Portal API token minting (Shape B).  
3. **Then** provision a clean Ubuntu media VPS for any path toward Live CAP-26 (DIV remains borrowed / Demo only).  
4. If embed/white-label falls short, retry the **same class of Ubuntu VPS** with **OpenVidu Meet Community** (≥4 CPU).  
5. Keep **BBB** on the managed or **8/16 dedicated** path when the classroom feature pack matters more than host cost.  
6. CAP-26 Demo Partial: Raisd lobby chrome; media vendor behind Portal API tokens only.

**Lightest for a borrowed / added host:** plugNmeet.  
**Not light enough for the *current* Demo server:** all three (memory).

---

## 7. Spike results — DIV + Portal API (6 Nov 2026)

| Check | Result |
|---|---|
| arm64 images (plugnmeet / livekit / redis / mariadb / nats) | **Pass** — pulled `linux/arm64` on Colima aarch64 |
| Colima runtime | **Pass** — 4 CPU / 4 GiB / 40 GiB disk; VM `192.168.64.2` |
| Recorder | **Off** (as planned) |
| Port collision | Mac **:8080** owned by DIV FastAPI — media API exposed as Tailscale **`100.97.217.25:18080`** via socat → Colima `:8080` |
| API room create + getJoinToken | **Pass** |
| Portal API Shape B mint (`portal-api/src/plugnmeet.ts`) | **Pass** — host + student `access_token` URLs; secrets from env only |
| Unit tests without env | **Pass** — falls back to stub join URL (`npm run test:live-class`) |
| Demo VPS memory | **Untouched** (media not co-located) |
| DIV memory under spike | Host **~16 GiB used / ~31 GiB unused**; Colima stack ~**140 MiB** containers (MariaDB ~96 MiB dominant). **Not** insufficient for this smoke. |
| Full browser WebRTC / UDP ICE | **Partial / caveat** — TCP API + login HTML reachable on `:18080`; LiveKit UDP `50000–50100` stays inside Colima host-net (no UDP socat). Treat media quality as **unproven** until UDP/TURN path or Ubuntu media VPS. |
| Credentials (gitignored) | `control-plane/.credentials/plugnmeet-div.env` — `PLUGNMEET_API_URL`, `PLUGNMEET_API_KEY`, `PLUGNMEET_API_SECRET`, `PLUGNMEET_JOIN_BASE` |
| Hosted `api.raisd.co` Shape B | **Pass (mint)** — `portal-api-env` secret holds `PLUGNMEET_*`; API URL is node `http://38.127.216.221:18081` (hostNetwork `plugnmeet-tunnel-proxy` socat → SSH `-R 127.0.0.1:18080` → DIV). LaunchAgent `co.raisd.plugnmeet-div-tunnel` runs `.credentials/plugnmeet-tunnel.sh` on a Tailscale Mac. |
| Public join host | **Pass (HTTPS)** — `https://classrooms.raisd.co` (Cloudflare A → Demo VPS; Traefik TLS; Ingress → `plugnmeet-api` → tunnel → DIV Caddy `:18480` with `/ws` NATS + `/rtc`/`/livekit` + plugNmeet). `nats_ws_urls` / `livekit_info.host` advertise the public host (not Tailscale). `PLUGNMEET_JOIN_BASE=https://classrooms.raisd.co`. Tailscale `:18443` remains for direct testing. WebRTC UDP still Tailscale/`PUBLIC_IP`. |
| Raisd-branded client | **Pass (Demo)** — private repo `raisd-campus/plugnmeet-client` (design-system dark/Rubik/brand overlay); Jenkins `raisd-plugnmeet-client` builds GHCR + deploys `client/dist` to DIV (`deploy-plugnmeet-div.sh`, needs `jenkins/div-ssh` + SSH reverse `-R 18022`). |
| Status | **Demo Partial** on borrowed MGP host — **not** Live CAP-26 |

### 7.1 Verification checklist (Live media VPS — still open)

- [x] Spike host RAM/CPU measured (DIV)  
- [ ] Clean Ubuntu media VPS with DNS A for app + TURN  
- [ ] Firewall UDP/TCP per vendor guide; Demo Traefik unchanged  
- [ ] `kubectl -n campus top nodes` unchanged under a 3-person call  
- [x] Portal API mints join without browser secrets  
- [x] Recording off  
- [x] Status language: Demo ≠ Live CAP-26  
- [ ] Multi-party WebRTC quality on a public-IP Ubuntu box  

---

## 8. Document control

| Date | Change |
|---|---|
| 6 Nov 2026 | Initial infra-test investigation from Read.ai 5 Nov + live Demo VPS measurement (3 vCPU / 3.8 GiB / ~80% RAM). |
| 6 Nov 2026 | DIV Mac Mini inventory + memory analysis; spike target for plugNmeet + Portal API Shape B; Demo VPS still insufficient-memory fail. |
| 6 Nov 2026 | DIV Colima deploy (recorder off); API + Portal API token mint pass; ~31 GiB free under spike; WebRTC UDP caveat; creds in `.credentials/plugnmeet-div.env`. |
| 6 Nov 2026 | End-to-end Demo walkthrough captured — Raisd lobby + DIV plugNmeet pre-join; screenshots + `walkthrough-full.webm` in [live-class-plugnmeet/](../../diagrams/lms-reference/live-class-plugnmeet/); in-room LiveKit still “Connecting…” on Colima. |
| 7 Nov 2026 | Raisd-branded `plugnmeet-client` + `classrooms.raisd.co` edge (Traefik/tunnel) + Jenkins DIV deploy path; JOIN_BASE domain (no IP:port). |
| 7 Nov 2026 | Portal API room create enables full host feature set (waiting room, breakouts, whiteboard, notepad, polls, recording/RTMP/Insights flags). Recorder still off on DIV Colima; Insights providers not configured — UI may show controls that need those services. |
| 7 Nov 2026 | DIV: `plugnmeet-recorder` registered (`node_01`, ready) + `livekit/ingress` (RTMP `:1935`, WHIP `:8089`). Cloud MP4 / RTMP host controls can run against Demo stack. Insights/AI still needs Azure Speech + Gemini (or equivalent) keys in `config.yaml` — none in Raisd credentials yet. |
| 7 Nov 2026 | DIV Insights → local MLX: dedicated `mlx_lm.server` Qwen3-4B on `:8011`, host proxy `:8010` (Colima `192.168.64.1:8010/v1`), `insights.enabled` with OpenAI-compatible provider for AI chat, meeting summary, text translation. Live STT/TTS not wired (needs realtime Whisper). LaunchAgents `co.raisd.mlx-raisd-8011` + `co.raisd.mlx-openai-proxy`. |
| 7 Nov 2026 | Mute Everyone Twirp fix: Caddy `tls internal` broke plugnmeet→LiveKit RoomService (`x509: certificate signed by unknown authority`). Mount combined CA bundle and set `SSL_CERT_FILE=/app/certs/ca-bundle.crt` on DIV `plugnmeet` compose service; `livekit.yaml` `enable_remote_unmute: true`. |
| 10 Nov 2026 | Public join ConnectionError: tunnel targeted bare plugNmeet `:18080` (no `/ws`) while `nats_ws_urls` pointed at Tailscale `:18443`. Fixed by DIV Caddy cleartext `:18480` (NATS/LiveKit/API), tunnel `-R 18080→:18480`, and public `nats_ws_urls` / `livekit_info.host`. Verified `wss://classrooms.raisd.co/ws` NATS connect. |
| 11 Nov 2026 | Same person two places: Portal API mints unique LiveKit `user_id` per join (`personId__hex`) so DUPLICATE_IDENTITY no longer kicks the first session; Classroom chat mirror attributes with stable `raisd_mirror` person id. |
| 11 Nov 2026 | Refresh kick-out: Student/Lecturer lobbies persist live join URL in `sessionStorage` and restore the classroom modal after portal refresh (reuse same token / identity; avoid remint → waiting room). Classroom client already prefers renewed token from storage over a stale URL JWT. |
| 11 Nov 2026 | Refresh logout: Classroom client persists renewed `access_token` (URL + sessionStorage); DIV `token_validity` 10m→4h; Student HTTP/SSO keeps opaque bearer across refresh and no longer logouts on unmount. |
