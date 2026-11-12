# UltaHost Demo VPS — self-defence / protective overload behaviour

**Status:** Observed Demo ops knowledge — 12–13 November 2026.  
**Host:** UltaHost Singapore VPS `38.127.216.221` · k3s node `srv113287766` (~3 vCPU / ~3.8 GiB RAM, no swap).  
**Topology:** [vps-topology.md](vps-topology.md) · recovery: `gitops/bootstrap/recover-sshd.sh`.

When this box is under extreme load (Jenkins/Kaniko builds, Traefik saturation, near-OOM), it often does **not** go fully offline. Instead it enters a **protective / self-defence** mode: L3/L4 still answer, but application TLS/HTTP/SSH stop completing. It can later **self-recover** without an UltaHost console reboot. Treat that pattern as first-class ops knowledge — not as “DNS is wrong” or “SSO app is broken.”

## 1. Signature (diagnose in this order)

| Check | Healthy | Self-defence / wedged |
|---|---|---|
| DNS `*.raisd.co` A | `38.127.216.221` | Same (Cloudflare **DNS-only**) |
| ICMP ping | OK | Often still OK |
| TCP connect `:80` / `:443` / `:22` / `:2222` | Completes | Completes (SYN/ACK) |
| TLS on `:443` | Handshake + HTTP | **`SSL connection timeout`** after connect (`time_appconnect=0`) |
| HTTP `:80` | Response | Connects then **0 bytes** / hang |
| New SSH | Banner + shell | Banner hang, auth failures, or ControlMaster “running” but commands hang |
| `npm run ci` cluster probe | JSON OK | `SSH/kubectl probe failed` / invalid JSON |

Sibling hosts on the same IP (`sso`, `api`, `staff.*`, `docs`, …) fail together — Traefik owns public 80/443.

## 2. Incident window (12–13 Nov 2026)

| When (UTC) | Local (AEDT) | Observation |
|---|---|---|
| 2026-11-11 ~20:58 | 12 Nov ~07:58 | First hard SSL timeouts after Demo deploy / Jenkins overload (load previously ~200). |
| 2026-11-12 ~05:09–05:23 | 12 Nov ~16:09–16:23 | Last confirmed healthy SSO + Portal API before the long hang. |
| 2026-11-12 ~05:37 → ~21:33 | 12 Nov ~16:37 → 13 Nov ~08:33 | Extended TCP-accept / TLS-hang period. |
| 2026-11-12 ~21:33 | 13 Nov ~08:33 | **Self-recovered** — HTTPS/SSH returned without console reboot. |
| Immediately after recovery | — | Load still elevated; RAM nearly exhausted (~3.7/3.8 GiB). Classroom **cloud recording** then failed (`startupJoinModal` not visible in 30s) while Traefik/edge was still settling. |

MANIFEST already noted intermittent SSH banner (11 Nov). Capacity alerts: confirm which UltaHost node with Aslam ([lms-video-infra-test.md](lms-video-infra-test.md)).

## 3. Agent / operator rules (mandatory)

1. **Do not** treat this as an SSO, Portal API, or Cloudflare DNS regression when the signature in §1 matches.
2. **Do not** hammer TLS/SSH/kubectl in a tight loop — that worsens overload. Space probes ≥30–60s.
3. Prefer UltaHost **console** reboot / `recover-sshd` when SSH never returns; if HTTPS self-heals, still raise a ticket (defensive path vs guest OOM).
4. **Cool-down before re-attempt (required):** after detecting this signature **or** after HTTPS first recovers, wait **at least 5 minutes** (prefer **10 minutes** if load average or free RAM is still bad) before:
   - Starting or retrying **cloud recording** / live-class media checks
   - `npm run deploy:vps` / Jenkins Kaniko / large DIV client syncs
   - Declaring the Demo “healthy” for standup proof
5. After cool-down, re-check: `https://sso.raisd.co/` TLS, `https://api.raisd.co/health`, SSH `uptime` + `free -h`, then media (`https://classrooms.raisd.co/`).
6. Classroom client: failed `START_RECORDING` applies a **90s** client cool-down before auto re-attempt (see `plugnmeet-client` `raisdRecorderJoin` / recording footer). Manual retry should still respect VPS cool-down in §3.4 when the edge just recovered from self-defence.

## 4. Related

| Topic | Doc |
|---|---|
| Topology / hostPath | [vps-topology.md](vps-topology.md) |
| CI/CD load on same node | [cicd.md](cicd.md) |
| Classrooms + recording | [../backend/classrooms.md](../backend/classrooms.md) |
| Evidence pack (Aslam ticket draft) | [`docs/evidence/2026-11-13-ultahost-vps-outage/`](../../evidence/2026-11-13-ultahost-vps-outage/) |
