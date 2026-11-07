# Raisd LMS — open-source video options vs stated requirements

**Standup action (Read.ai 3 Nov 2026):**  
*Iman Suherman will provide a detailed comparison and implementation analysis of open-source video options against the stated requirements.*

**Related standup action (same meeting):**  
*Iman Suherman will add details on open-source and commercial options and prepare a feature-by-feature comparison for review* → [lms-video-feature-comparison.md](lms-video-feature-comparison.md) · [`#feature-compare`](../../diagrams/lms-online-class-options.html#feature-compare). This file remains the **OSS implementation depth pass**.

**Raisd anchors:** [lms-online-class-options.md](lms-online-class-options.md) · [lms-video-feature-comparison.md](lms-video-feature-comparison.md) · [lms-online-lesson-ux.md](lms-online-lesson-ux.md) · F12 / CAP-26 · CAP-12 · CAP-18 · F13 / CAP-24  
**Status:** **Proposed / research** — not Live. Demo ≠ Live.  
**Published human page:** [`docs/diagrams/lms-online-class-options.html#oss-req`](../../diagrams/lms-online-class-options.html#oss-req)

Pricing and infra figures are **indicative USD** (Nov 2026) unless another currency is explicitly marked. Re-quote before procurement. Do not claim Live CAP-26 until durable save, server authz, and a named owner exist.

---

## 1. Stated requirements (3 Nov 2026)

Captured from Read.ai chapters *Online-Class Designs and Requirements*, *Open-Source Video Solution Evaluation*, *LMS Platform Requirements and Commercial Options*, and *Comparison Criteria and Preparation for Leadership Review*, plus standing Raisd rules from 2 Nov and the Faid UX pack.

### 1.1 Must-have (meeting + Raisd hard rules)

| ID | Requirement | Source |
|---|---|---|
| **R1** | Feel **integrated** — university-branded experience, not a separate Meet/Zoom product with its own login | Standup + OL-01 |
| **R2** | **Portal-based SSO** — students/lecturers already authenticated; join tokens minted **server-side** via Portal API | Standup + ADR |
| **R3** | Access gated by **timetable** (join only inside session window) | Standup + OL-14 |
| **R4** | Students join as **participants**; lecturer/moderator is host | Standup + OL-30s |
| **R5** | **Join / leave tracking** for attendance (CAP-12 learning event; CMS remains roster SoR) | Standup |
| **R6** | **Automatic recording** of live sessions | Standup |
| **R7** | Recordings **retrievable later** (missed class → Past Class / Materials; CAP-18) | Standup + OL-60 |
| **R8** | **Transcription** (stated 3 Nov as expected of the online-class provider) | Standup 3 Nov |
| **R9** | Support **quizzes** at module / study-planner setup — exam of record stays Raisd-native (CAP-24); in-meeting polls optional only | Standup 2–3 Nov |
| **R10** | Portal / custom LMS integration (Raisd is not Moodle-first, but Moodle-native patterns are a signal of classroom maturity) | Standup + ADR-1 |
| **R11** | Scalable under **realistic multi-campus student usage** without surprise licence cliffs | Standup 3 Nov |
| **R12** | Moderated screen-share **request → Accept / Decline / Stop** (Faid pack OL-40–43) | UX pack |

### 1.2 Soft / decision inputs (not binary gates)

| ID | Topic | Note |
|---|---|---|
| **S1** | Breakout rooms | Discussed earlier; not in Faid pack; nice-to-have for CAP-26 MVP |
| **S2** | Whiteboard / presentation | Strong teaching signal; BBB leads |
| **S3** | Self-host vs managed | Prefer **not** on shared Demo k3s; dedicated media VPS or managed host. Confirmed 6 Nov 2026: Demo node is **3 vCPU / 3.8 GiB (~80% RAM used)** — **insufficient memory**; BBB / OpenVidu / plugNmeet all **fail** co-location. Spike host: MGP DIV Mac Mini (48 GB; contingent MLX contention) — see [lms-video-infra-test.md](lms-video-infra-test.md) §1.1 |
| **S4** | Self-developed SFU (LiveKit / mediasoup / Janus) | Meeting lean: lowest opex, highest eng; speed is the constraint |
| **S5** | LMS vs CMS one product | Explicitly undecided 3 Nov — out of scope for vendor pick |

### 1.3 Usage model used for scale comments

Same scenarios as the cost page (USD, indicative):

| Scenario | Concurrent classes | Class size | Hours / week | Attendee-min / mo |
|---|---:|---:|---:|---:|
| **S1 Lesotho pilot** | 8 | 25+1 | 2 | ~100k |
| **S2 Multi-campus** | 40 | 30+1 | 3 | ~890k |
| **S3 Full peak** | 100 | 40+1 | 3 | ~3.0M |

---

## 2. Open-source options in scope

### 2.1 Classroom / meeting products

| Option | What it is | Licence posture | Raisd shape |
|---|---|---|---|
| **BigBlueButton (BBB)** | Full virtual classroom product | Apache-2.0; $0 software; managed hosts paid | **B** (classroom API) |
| **OpenVidu Meet** | Classroom product on LiveKit-based stack | Community free; PRO metered ($0.0006 / core-min) | **B** (embed/API) → path to **C** |
| **plugNmeet** | LiveKit-based open classroom (API, whiteboard, recording, breakout) | MIT / Apache components; self-host | **B** → **C** embed |
| **Apache OpenMeetings** | Apache virtual classroom (rooms, recording, whiteboard, moderation) | Apache-2.0 | **B** (heavier Java stack) |
| **Jitsi Meet** | General WebRTC meeting UI | Apache-2.0; $0 software; 8x8 SaaS optional | Thin **B** / POC |
| **edumeet** | mediasoup-based multiparty meeting aimed at education | MIT-family; self-host | Thin **B** / Shape **C** base |
| **Galène** | Lightweight SFU (simple groups, low ops footprint) | AGPL-3.0 | Thin **B** / POC |
| **Nextcloud Talk** | WebRTC calls inside Nextcloud | AGPL (Talk); needs Nextcloud | **A**/**B** only if campus already runs NC |
| **MiroTalk SFU** | Open WebRTC conference (SFU) | AGPL / project licence — confirm before Live | Thin **B** / POC |

### 2.2 Media building blocks (Shape C DIY)

| Option | What it is | Licence posture | Raisd shape |
|---|---|---|---|
| **LiveKit (OSS SFU)** | Media SFU + Egress; **no** classroom chrome | Apache-2.0; Cloud metered or self-host | **C** (Raisd builds UI) |
| **mediasoup** | Node SFU library (powers edumeet and others) | ISC | **C** (highest DIY) |
| **Janus Gateway** | General WebRTC gateway / SFU plugins | GPLv3 | **C** (highest DIY) |
| **Ion SFU** (pion) | Go SFU (Pion WebRTC) | MIT | **C** (experimental DIY) |

Commercial seats/SDKs (Zoom, Meet, Teams, Whereby, Daily, Chime, RealtimeKit, Agora) are **out of scope** here except as contrast — see [lms-online-class-options.md](lms-online-class-options.md) and [lms-video-feature-comparison.md](lms-video-feature-comparison.md).

---

## 3. Requirement-by-requirement matrix

Legend: **Yes** = meets with config/API · **Partial** = needs Raisd work or gaps · **No** = does not meet without rebuilding · **N/A** = not a vendor job (Raisd owns).

| Req | BBB | OpenVidu Meet | Jitsi | LiveKit OSS | mediasoup / Janus |
|---|---|---|---|---|---|
| **R1 Integrated / branded** | Partial — white-label + wrap in Raisd lobby/roster; still BBB chrome inside | **Yes** — embed / white-label designed for “same product” | Partial — iframe possible; chrome still Jitsi | **Yes** — Raisd owns 100% UI | **Yes** — Raisd owns 100% UI |
| **R2 Portal SSO / server tokens** | **Yes** — Portal API `create`/`join` signed URLs; no student BBB account | **Yes** — REST + embed tokens via Portal API | **Yes** — JWT via Portal API | **Yes** — room tokens via Portal API | **Yes** — app tokens via Portal API |
| **R3 Timetable gate** | **N/A → Raisd** — enforce before minting join | Same | Same | Same | Same |
| **R4 Participant vs host** | **Yes** — moderator / viewer roles | **Yes** — role map in API | Partial — moderator JWT; less education semantics | Partial — Raisd encodes roles in tokens + UI | Partial — Raisd builds entirely |
| **R5 Join/leave attendance** | **Yes** — built-in analytics + webhooks | Partial — webhooks/events; Raisd builds CAP-12 analytics | Partial — DIY events / prosody; fragile | Partial — participant events → Raisd | Partial — DIY |
| **R6 Auto recording** | **Yes** — configurable | **Yes** — API / config | Partial — **Jibri** automation (ops-heavy) | **Yes** — Egress agents | Partial — DIY recorder pipeline |
| **R7 Playback later** | **Yes** — built-in playback; export to Raisd store for Live | **Yes** — built-in / API; export preferred for Live | Partial — need object store + Raisd player | Partial — Egress → Raisd player | Partial — DIY |
| **R8 Transcription** | Partial — not a first-class Raisd SoT; post-process recording or add service | Partial — same (provider roadmap / add-on; treat as Raisd AI/pipeline) | Partial — same | Partial — pipe Egress audio to STT | Partial — same |
| **R9 Quizzes** | Partial — BBB live polls/quiz ≠ exam of record | No as exam SoT | No | No | No |
| **R10 Custom LMS / portal** | **Yes** — mature REST + LTI; Moodle **native** | **Yes** — REST + embed; Moodle = custom | Partial — plugins / DIY | **Yes** for media; Raisd builds LMS glue | Same as LiveKit, more glue |
| **R11 Scale / licence cliffs** | **Yes** on software ($0); cliff = **infra/ops** or managed bill | Community single-node cliff → **PRO** core-min or cluster | **Yes** on licence; cliff = Jibri/JVB capacity | **Yes** on licence; cliff = SFU/egress nodes or Cloud $ | Same as LiveKit |
| **R12 Moderated share queue** | Partial — BBB has share controls; OL-40 request queue usually **Raisd overlay** | Partial — Raisd overlay / host UI | Partial — Raisd overlay | **Yes** if Raisd implements OL-40–43 | **Yes** if Raisd implements |
| **S1 Breakouts** | **Yes** — education breakouts | Partial — roadmap / confirm GA | Partial / DIY rooms | DIY multi-room | DIY |
| **S2 Whiteboard** | **Yes** — excellent | Good | Basic | DIY / third-party | DIY |

### Scorecard (OSS only, against R1–R12)

| Option | Fit summary | Eng to CAP-26 Demo | Ops risk on Raisd infra |
|---|---|---|---|
| **BBB (managed preferred)** | Best **classroom** coverage of R4–R7, R10; R1/R12 need Raisd shell | Medium | Low if managed; **High** if self-host |
| **OpenVidu Meet** | Best **embed** OSS path for R1 + R2 + R6–R7; R5/R12 Raisd-built | Medium–High | Medium (dedicated VPS) |
| **plugNmeet** | Strong LiveKit classroom pack (API + whiteboard + recording); Raisd still owns CAP-12 analytics / OL-40 | Medium–High | Medium (dedicated VPS) |
| **Apache OpenMeetings** | Broad classroom feature set; older Java ops profile | High | High |
| **Jitsi** | Cheap media POC; weak classroom / attendance / playback | High for product | Medium–High (Jibri) |
| **edumeet** | mediasoup meeting shell closer to Shape C than BBB | High | Medium–High |
| **Galène** | Smallest ops SFU for internal pilots; thin education features | Medium | Low–Medium |
| **Nextcloud Talk** | Only if campus already standardises on Nextcloud | Medium | Tied to NC ops |
| **MiroTalk SFU** | Fast self-host conference POC; confirm licence + hardening | Medium | Medium |
| **LiveKit OSS** | Best long-term R1 + R12 control; **zero** classroom pack | **Highest** | High (SFU + egress + SRE) |
| **mediasoup / Janus / Ion** | Escape hatch only; slower than LiveKit for Raisd team velocity | Highest+ | Highest |

### Additional OSS vs core requirements (compact)

| Option | R1 brand | R5 attendance | R6–R7 record/play | Classroom depth | Raisd note |
|---|---|---|---|---|---|
| **plugNmeet** | Strong (embed) | Partial (Raisd) | Yes (API) | Good | Best “BBB alternative on LiveKit” |
| **OpenMeetings** | Partial | Partial | Yes | Good | Heavier ops than BBB managed |
| **edumeet** | Partial | Partial | Partial | Basic–Good | mediasoup reference meeting |
| **Galène** | Partial | DIY | Partial | Basic | Light POC / internal only |
| **Nextcloud Talk** | Weak (NC chrome) | Partial | Partial | Basic | Bundle opportunism only |
| **MiroTalk SFU** | Partial | DIY | Partial | Basic | POC; licence check before Live |

---

## 4. Implementation analysis (Portal API)

### 4.1 Shared Raisd contract (all OSS picks)

```text
Lecturer / Student portal
        │ HTTPS only
        ▼
   Portal API
        │  timetable check (R3)
        │  mint host | viewer credential (R2, R4)
        │  create session if needed
        ▼
   OSS provider (BBB | OpenVidu | Jitsi | LiveKit | …)
        │
        ├─ webhooks / poll → join/leave (R5) → CAP-12 Demo event
        ├─ recording.ready → metadata + Past Class item (R6, R7)
        └─ (optional) audio → STT job → transcript asset (R8)
```

**Never in the browser:** provider admin secrets, raw recording buckets, CMS roster writes.

### 4.2 BigBlueButton

| Topic | Analysis |
|---|---|
| **API surface** | `create`, `join`, `getRecordings`, `publishRecordings`, hooks — well documented for LMS glue |
| **Raisd work** | Session row; role map; lobby/roster chrome; export recording to Raisd store for Live; OL-40 overlay if BBB share UX ≠ design pack |
| **Transcription (R8)** | Plan Raisd post-process on exported media (Whisper / campus STT) — do not block MVP on BBB-native transcript |
| **Quizzes (R9)** | Ignore BBB quiz as SoT; keep CAP-24 in Portal API |
| **Scale** | One “big” meeting ≈ one media node; multi-campus → Scalelite or managed university plan. Software licence stays $0; cost is CPU/RAM and ops |
| **Limitation** | Self-host on UltaHost Demo k3s is **unsafe**. Prefer managed BBB for pilot |
| **Verdict** | **Preferred OSS classroom pack** when teaching features + attendance analytics outweigh perfect chrome match |

### 4.3 OpenVidu Meet

| Topic | Analysis |
|---|---|
| **API surface** | REST + web component embed + webhooks — closest OSS to Shape C without writing an SFU UI from scratch |
| **Raisd work** | Embed inside Faculty Classroom route; CAP-12 from events; recording export; OL-40 queue in Raisd UI |
| **Stack note** | LiveKit-based — learning OpenVidu preserves a later pure-LiveKit self-dev path |
| **Licence cliff** | Community ≈ single-node; growth → PRO core-minutes or self-built cluster. Model PRO early for S2/S3 |
| **Limitation** | Attendance analytics and Moodle-depth classroom tools are thinner than BBB |
| **Verdict** | **Preferred OSS embed path** when R1 (same-product feel) is weighted above Moodle-native depth |

### 4.4 Jitsi Meet

| Topic | Analysis |
|---|---|
| **API surface** | iframe + JWT; recording via **Jibri** (separate Chrome bots) |
| **Raisd work** | Almost everything: attendance, Past Class player, classroom chrome, breakouts, share queue |
| **Limitation** | “Basic” classroom features; Jibri ops dominate cost/reliability |
| **Verdict** | **POC / privacy spike only** — not CAP-26 SoT |

### 4.5 LiveKit OSS (self-developed media)

| Topic | Analysis |
|---|---|
| **API surface** | Rooms, participants, Egress — Raisd builds lobby, grid, roster, chat, share queue, Past Class |
| **Matches meeting lean** | 3 Nov preliminary preference for self-dev (lowest opex) **if** speed allows — speed is the stated risk |
| **R8 transcription** | Natural fit: Egress audio → async STT worker owned by Raisd |
| **R9 quizzes** | Unrelated to LiveKit; Raisd-native only |
| **Scale** | Horizontal SFU + egress nodes; no per-min licence; eng/SRE becomes the bill (see S1–S3 **~$8–12k / ~$18–30k / ~$25–40k** on cost page — Aslam ceiling **~$40k/mo**) |
| **Limitation** | Delivers **media**, not an LMS classroom. Weeks of UI before OL-xx parity |
| **Verdict** | **Phase-2 product path** after a Cloud LiveKit or OpenVidu spike proves CAP-26 flows — not the fastest Demo |

### 4.6 plugNmeet

| Topic | Analysis |
|---|---|
| **API surface** | Room create/join API, whiteboard, recording, breakout — LiveKit under the hood |
| **Raisd work** | Embed + CAP-12 from events; recording export; OL-40 in Raisd UI (same pattern as OpenVidu) |
| **Stack note** | Closest “BBB-like classroom on LiveKit” without OpenVidu PRO metering |
| **Limitation** | Ops on dedicated VPS; community maturity / support thinner than BBB managed hosts |
| **Verdict** | **Co-equal embed OSS alt** with OpenVidu Meet — spike both if Shape B embed is preferred |

### 4.7 Apache OpenMeetings · edumeet · Galène · MiroTalk · Nextcloud Talk

| Option | Analysis |
|---|---|
| **OpenMeetings** | Broad classroom feature set (rooms, whiteboard, recording) but **Java / heavier ops**. Prefer only if procurement wants Apache trademark optics and rejects BBB managed |
| **edumeet** | mediasoup multiparty meeting with education lean — useful as a **Shape C reference UI**, not as managed classroom SoT |
| **Galène** | Smallest ops footprint for internal pilots; thin teaching features — **not** CAP-26 SoT |
| **MiroTalk SFU** | Fast conference self-host; confirm AGPL/licence + hardening before any Live path |
| **Nextcloud Talk** | Only if campus already runs Nextcloud as collaboration SoT — otherwise pull NC ops into video decision |

### 4.8 mediasoup / Janus / Ion SFU

Only if LiveKit is rejected for licence/architecture reasons. Higher DIY for the same Raisd UI burden. **Deprioritise.**

---

## 5. Open-source limitations under realistic usage

| Risk | BBB | OpenVidu / plugNmeet | Jitsi / MiroTalk | OpenMeetings | LiveKit OSS |
|---|---|---|---|---|---|
| Concurrent class fan-out | Needs Scalelite / managed | Community ceiling → cluster / PRO | JVB / SFU shard + ops | Java cluster ops | SFU autoscaling design |
| Recording durability | Built-in; still export for Raisd authz | API / LiveKit egress | Jibri or DIY | Built-in; still export | Egress misconfig = lost class |
| Licence surprise | Rare (Apache) | OpenVidu **PRO**; plugNmeet rare | Rare / confirm MiroTalk | Rare (Apache) | Rare (Cloud if not self-host) |
| Education feature gap | Low | Medium (attendance custom) | **High** | Low–Medium | **Total** (build all) |
| Time-to-Demo | Fastest OSS classroom | Fast embed | Fast iframe, slow product | Medium | Slowest |
| Data residency / AG | Self-host or choose host region | Same | Same | Same | Same |
| Transcription accuracy / cost | External STT either way | Same | Same | Same | Same |

**Multi-campus reading (S2/S3):** “OSS = free” is false once 40–100 concurrent classrooms run. The bill moves to **VPS/GPU, storage, SRE, or OpenVidu PRO**.  
**Self-developed (Aslam):** planning ceiling **up to ~$40k / mo** at full peak — loaded eng/SRE + media fleet (S1 ≈ $8–12k · S2 ≈ $18–30k · S3 ≈ $25–40k). Separate from Aslam’s broader eight-campus hosting range ($40k–$90k / mo) used as capacity-planning context, not a BBB quote.

---

## 6. Implementation recommendation (OSS only)

| Priority | Choice | Why vs stated requirements |
|---|---|---|
| **1 · Pilot classroom OSS** | **Managed BigBlueButton** behind Portal API | Strongest match to R4–R7, R10, S2; R1/R12 via Raisd wrap; avoids Demo-node self-host |
| **2 · Pilot embed OSS** | **OpenVidu Meet Community** or **plugNmeet** on **dedicated** media VPS | Strongest R1 + embed on LiveKit lineage; R5/R8/R12 Raisd-owned; keeps S4 open |
| **3 · Productised Raisd media (later)** | **LiveKit** (Cloud first → OSS self-host) | Full R1/R12 control; accept eng cost called out 3 Nov |
| **Watch list** | Apache OpenMeetings · edumeet · Galène · MiroTalk | Feature or ops trade-offs; spike only if BBB/OpenVidu/plugNmeet rejected |
| **Avoid as SoT** | Jitsi classroom; Nextcloud Talk unless NC-mandated; mediasoup/Janus/Ion first; any OSS media on shared Demo k3s | Fails classroom depth or ops rules |

**Raisd always owns (regardless of OSS pick):** R3 timetable gate, R9 quizzes/self-paced, CAP-12 attendance persistence policy, recording **authz** via Portal API, OL-40–43 share queue if provider UX is insufficient, R8 transcript pipeline until a provider ships a trusted campus-grade STT.

**Explicit non-decisions (still TBC):** recording retention days; whether breakout audio is retained; whether attendance writes CMS; campus Zoom/M365 mandate overriding OSS; LMS↔CMS merge (S5).

---

## 7. Suggested evidence pack for leadership (Aslam compile)

Use this file + the cost page as the OSS half of the leadership brief:

1. Requirements table §1 (R1–R12) — what “good” means.  
2. Matrix §3 + additional OSS compact table — BBB vs OpenVidu vs plugNmeet vs watch-list vs LiveKit.  
3. Implementation §4 — Portal API sequence (no browser secrets).  
4. Cost scenarios in [lms-online-class-options.md](lms-online-class-options.md) S1–S3 — opex vs eng.  
5. Clear line: **OSS software ≠ free operations**; Demo ≠ Live.

---

## Related

| Topic | Path |
|---|---|
| Full vendor + cost research | [lms-online-class-options.md](lms-online-class-options.md) · [HTML](../../diagrams/lms-online-class-options.html) |
| OSS + commercial feature-by-feature | [lms-video-feature-comparison.md](lms-video-feature-comparison.md) · [#feature-compare](../../diagrams/lms-online-class-options.html#feature-compare) |
| UX pack (OL-xx) | [lms-online-lesson-ux.md](lms-online-lesson-ux.md) |
| LMS posture | [lms.md](lms.md) |
| CAP-24 / CAP-26 | [SDD-11](../../sdd/11-capability-catalog.md) |
