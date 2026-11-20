# Classroom media bridge — proposed architecture (group review)

**Status:** Proposal for Working Group review · **Demo Partial** today · not Live CAP-26  
**Date:** 20 Nov 2026  
**Published page:** [diagrams/classroom-media-bridge/](../../diagrams/classroom-media-bridge/index.html) · https://docs.raisd.co/diagrams/classroom-media-bridge/  
**Related:** [lms-video-infra-test.md](lms-video-infra-test.md) · [audits/2026-11-18-class-connection-capacity.md](audits/2026-11-18-class-connection-capacity.md) · [backend/classrooms.md](../backend/classrooms.md) · Aslam media-VPS ask (evidence pack 20 Nov)

---

## 1. Why this note

Public students can reach the waiting room and be **Admitted**, then hit **Connection Error**. The lecturer never sees them in the room. Signalling works; **media ICE does not** for public internet clients.

This document proposes a **bridge architecture**: keep the Demo application edge for portals/API, and put WebRTC media (LiveKit + TURN) on a **dedicated public media host**.

---

## 2. Current bridge (Demo Partial)

| Layer | Where | Role |
|---|---|---|
| App edge | UltaHost Demo VPS `38.127.216.221` (4 vCPU / 8 GiB after 20 Nov) | Traefik, portals, Portal API, SSO, docs, Jenkins |
| Classroom edge | `classrooms.raisd.co` on Demo VPS | TLS terminate → SSH reverse tunnel → DIV |
| Media spike | MGP DIV Mac Mini (Tailscale) | plugNmeet + LiveKit + recorder (Colima) |
| Public media | TCP `:7881` forward only; **UDP 50000–50100 closed**; **TURN off** | Insufficient for public ICE |

**Works today:** Tailscale staff/lecturer path; waiting-room Admit notify after Landing Join.  
**Fails today:** Public student ICE after Admit (`SIGNAL_SOURCE_CLOSE`, no `participant active`).

Diagram image: `diagrams/classroom-media-bridge/images/01-current-topology.png`

---

## 3. Proposed target bridge

| Layer | Where | Role |
|---|---|---|
| App edge | Demo VPS (unchanged role) | Portals, API, SSO, docs — **no SFU / no UDP media** |
| Media host | **New dedicated Ubuntu VPS** (public IPv4) | plugNmeet + NATS + LiveKit + **TURN** + recorder disk |
| DNS | e.g. meet/classrooms media + `turn-*.raisd.co` | App + TURN names on the media host |
| Firewall | TCP 80/443, LiveKit RTC, **UDP media range**, TURN 3478 (+ 5349) | Public ICE + relay |

Students and lecturers complete signalling and media on the media host (or a short proxy from `classrooms.raisd.co` to that host). Demo k3s stays application-only.

Diagram image: `diagrams/classroom-media-bridge/images/02-proposed-target.png`

### Indicative size (plugNmeet / LiveKit)

- **≥4 vCPU · ≥4 GB RAM** (≥**8 GB** if recorder co-located)
- ≥40 GB disk (~100 GB if recordings stay on-box)
- Prefer ≥100 Mbit/s; Singapore if aligned with Demo edge

---

## 4. Join → Admit → media sequence

1. Student opens lobby → Shape B join URL  
2. Landing Join → NATS register → waiting room  
3. Lecturer Admit  
4. Student requests LiveKit media  
5. **Today:** signal OK → ICE fail → no tile for lecturer  
6. **Proposed:** ICE via public UDP or TURN → `participant active` → tiles + recording  

Diagram image: `diagrams/classroom-media-bridge/images/03-join-admit-sequence.png`

---

## 5. Path comparison

| | Today | Proposed |
|---|---|---|
| Signalling | VPS → tunnel → DIV | Media host (or short edge proxy) |
| Waiting / Admit | OK | Unchanged product behaviour |
| Media ICE | UDP closed; TURN off; TCP partial | Public UDP + TURN |
| Lecturer sees student | Often no (public) | Yes when ICE succeeds |
| Recording | Hosted on DIV spike | Same stack on media VPS |

Diagram image: `diagrams/classroom-media-bridge/images/04-media-path-comparison.png`

---

## 6. Options for the group

| Option | Summary | Verdict |
|---|---|---|
| **A** Tailscale-only demos | Keep DIV; public students unsupported | Acceptable short-term demos only |
| **B** Keep TCP `:7881` partial | No new host | **Not recommended** — proven fail after Admit |
| **C** Dedicated media VPS + TURN | New Ubuntu host + DNS + firewall | **Recommended** for public Demo / Live path |

Diagram image: `diagrams/classroom-media-bridge/images/05-decision-options.png`

---

## 7. Ask / next steps

1. Working Group choose **A / B / C** (recommend **C**).  
2. If **C**: approve media VPS SKU + DNS ownership (Aslam procurement note drafted).  
3. Migrate plugNmeet/LiveKit off DIV spike once media VPS is healthy; keep Demo VPS as app edge.  
4. Re-verify: public student Admit → in-room tile → whiteboard/recording sample.

---

## Document control

| Date | Change |
|---|---|
| 20 Nov 2026 | Initial proposal + Mermaid PNG pack for docs.raisd.co |
