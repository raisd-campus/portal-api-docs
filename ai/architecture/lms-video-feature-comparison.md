# Raisd LMS — open-source + commercial feature-by-feature comparison (review)

**Standup action (Read.ai 3 Nov 2026):**  
*Iman Suherman will add details on open-source and commercial options and prepare a feature-by-feature comparison for review.*

**Companion docs:**  
- Cost / hosting / shapes → [lms-online-class-options.md](lms-online-class-options.md)  
- OSS vs R1–R12 implementation → [lms-oss-video-requirements.md](lms-oss-video-requirements.md)  
- UX pack (OL-xx) → [lms-online-lesson-ux.md](lms-online-lesson-ux.md)

**Status:** **Proposed / research** — for Working Group / leadership review. **Not Live.** Demo ≠ Live.  
**Published human page:** [`docs/diagrams/lms-online-class-options.html#feature-compare`](../../diagrams/lms-online-class-options.html#feature-compare)

Legend: **Y** = meets · **P** = partial / Raisd must finish · **N** = no / poor fit · **R** = Raisd owns (vendor irrelevant) · **—** = not applicable

Indicative detail only (Nov 2026). **All costs are USD** unless another currency is explicitly marked. Re-quote before procurement.

---

## 1. Option catalogue (what each thing is)

### 1.1 Open-source / self-hostable

| Option | Category | What you buy | Raisd shape | Licence / commercial edge |
|---|---|---|---|---|
| **BigBlueButton** | Virtual classroom product | Managed host **or** self-host + Scalelite | **B** (+ Raisd wrap) | Apache-2.0; $0 software; paid hosting/support |
| **OpenVidu Meet** | Classroom on LiveKit stack | Community single-node **or** PRO elastic | **B** → **C** embed | Community free; PRO **$0.0006 / core-min** |
| **plugNmeet** | LiveKit classroom product | Self-host (API, whiteboard, recording, breakout) | **B** → **C** embed | MIT / Apache components; $0 software |
| **Apache OpenMeetings** | Apache virtual classroom | Self-host Java stack | **B** | Apache-2.0; heavier ops than BBB managed |
| **Jitsi Meet** | General WebRTC meeting | Self-host or 8x8 SaaS | Thin **B** / POC | Apache-2.0; Jibri for recording |
| **edumeet** | mediasoup multiparty meeting | Self-host | Thin **B** / Shape **C** base | MIT-family; education lean |
| **Galène** | Lightweight SFU | Self-host | Thin **B** / POC | AGPL-3.0; small ops footprint |
| **Nextcloud Talk** | Calls inside Nextcloud | Nextcloud + Talk app | **A**/**B** if NC-mandated | AGPL Talk; needs NC ops |
| **MiroTalk SFU** | Open WebRTC conference | Self-host SFU | Thin **B** / POC | Confirm licence before Live |
| **LiveKit** | Media SFU + Egress | Cloud metered **or** OSS self-host | **C** | Apache-2.0; Cloud ~$0.0005/min + egress |
| **Self-dev (mediasoup / Janus / Ion)** | Raw SFU / gateway | Raisd builds all UI + recorder | **C** | Permissive / GPL mix; highest eng |

### 1.2 Commercial seats / suite

| Option | Category | What you buy | Raisd shape | Licence / commercial edge |
|---|---|---|---|---|
| **Zoom Meetings / Edu** | Education meeting suite | Host seats (~$10–18 / host / mo) + storage | **A** (or Meeting/Video SDK → **C**) | Seat cliff vs student volume; Large Meeting add-on |
| **Google Meet** | Workspace meeting | Included with Workspace / Classroom Edu | **A** | Multi-campus Google tenancy politics |
| **Microsoft Teams** | M365 class Teams | Often bundled A1/A3/A5 | **A** | Strong if campus already M365-first (Raisd is not) |

### 1.3 Commercial embed / media SDKs

| Option | Category | What you buy | Raisd shape | Licence / commercial edge |
|---|---|---|---|---|
| **Whereby Embedded** | Embeddable room | ~$0.0042 / participant-min + $10.99 Build | **C** | Fast Demo; 200 cap; thinner classroom |
| **Daily** | Embed / custom SDK | ~$0.004 / participant-min (10k free) | **C** | Fastest prototype; no whiteboard |
| **Cloudflare RealtimeKit** | Classroom-oriented UI kit | **$0.002**/min; export **$0.01**/min | **C** | Breakout APIs (beta); acquisition churn risk |
| **Amazon Chime SDK** | AWS media SDK | **$0.0017**/attendee-min; capture **$0.0125** + concat **$0.002** | **C** | Strong $/mo; S3 extra; no education chrome |
| **Agora** | Global RTC SDK | ~$0.004 / HD min; whiteboard SKU | **C** | APAC reach; build everything |
| **Zoom Video SDK** | Custom UI on Zoom media | ~$0.0035 / session-min | **C** | Zoom reliability without Meetings chrome |

---

## 2. Feature-by-feature matrix (review)

Rows = stated requirements + classroom features from 2–3 Nov and the Faid pack.  
Columns = shortlist platforms (full set would be unreadable on one slide — extended notes in §3).

### 2.1 Stated requirements (R1–R12)

| Feature / requirement | BBB | OpenVidu | Jitsi | LiveKit | Zoom Edu | Meet | Teams | Whereby | Daily | RealtimeKit | Chime | Agora |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **R1** Integrated / branded (not separate product) | P | **Y** | P | **Y** | N | N | N | **Y** | **Y** | **Y** | **Y** | **Y** |
| **R2** Portal SSO / server-minted tokens | **Y** | **Y** | **Y** | **Y** | P | P | P | **Y** | **Y** | **Y** | **Y** | **Y** |
| **R3** Timetable-gated join | R | R | R | R | R | R | R | R | R | R | R | R |
| **R4** Participant vs host roles | **Y** | **Y** | P | P | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | P | P |
| **R5** Join/leave → attendance (CAP-12) | **Y** | P | P | P | **Y** | P | P | P | P | P | P | P |
| **R6** Automatic recording | **Y** | **Y** | P | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** |
| **R7** Playback later (Past Class) | **Y** | **Y** | P | P | P | P | P | P | P | P | P | P |
| **R8** Transcription | P | P | P | P | P | P | P | P | P | P | P | P |
| **R9** Quizzes (exam of record) | R | R | R | R | R | R | R | R | R | R | R | R |
| **R10** Custom LMS / portal API glue | **Y** | **Y** | P | P | **Y** | P | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** |
| **R11** Scale without licence cliff | P | P | P | **Y** | N | P | P | P | P | **Y** | **Y** | P |
| **R12** Moderated share request queue (OL-40) | P | P | P | **Y** | N | N | N | P | P | P | **Y** | **Y** |

**Reading R7:** vendor cloud playback is **P** until Raisd exports to Raisd-controlled store + Portal API authz (Live rule). BBB/OpenVidu start closer because education playback is native; LiveKit/Chime/Agora need a Raisd player.

**Reading R8:** no shortlisted vendor is trusted campus SoT alone — plan Raisd STT (or campus licence) on exported audio. Zoom/Meet/Teams may ship captions; still not Raisd gradebook transcript SoT.

**Reading R9:** in-meeting polls (Zoom/BBB) ≠ CAP-24 exam of record.

### 2.2 Classroom & teaching features

| Feature | BBB | OpenVidu | Jitsi | LiveKit | Zoom Edu | Meet | Teams | Whereby | Daily | RealtimeKit | Chime | Agora |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Virtual classroom depth | **Y** | **Y** | N | N | P | N | P | P | N | P | N | N |
| Whiteboard / presentation | **Y** | **Y** | P | N | **Y** | P | **Y** | N | N | P | N | P |
| Breakout rooms | **Y** | P | P | P | **Y** | P | **Y** | **Y** | P | **Y** | P | P |
| In-meeting polls / formative quiz | **Y** | P | N | N | **Y** | P | **Y** | N | N | P | N | N |
| Attendance analytics (built-in) | **Y** | N | N | N | **Y** | N | P | N | N | N | N | N |
| Moodle-native integration | **Y** | N | P | N | P | N | P | N | N | N | N | N |
| White-label / embed in Raisd chrome | P | **Y** | P | **Y** | N | N | N | **Y** | **Y** | **Y** | **Y** | **Y** |
| Lobby + roster present/enrolled (OL) | P | P | N | **Y** | N | N | N | P | P | **Y** | **Y** | **Y** |
| Screen-share moderation (OL-40) | P | P | N | **Y** | N | N | N | P | P | P | **Y** | **Y** |
| Recording → Past Class glue | P | P | N | **Y** | P | P | P | P | P | **Y** | **Y** | **Y** |

### 2.3 Ops, cost model, and risk (feature-adjacent)

| Concern | BBB | OpenVidu | Jitsi | LiveKit | Zoom Edu | Meet | Teams | Whereby | Daily | RealtimeKit | Chime | Agora |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Software / seat licence $0 | **Y** | P | **Y** | **Y** | N | P | P | N | N | N | N | N |
| Predictable multi-campus $ | P | P | P | P | N | P | P | N | N | **Y** | **Y** | N |
| Low Raisd eng to Demo | **Y** | **Y** | **Y** | N | **Y** | **Y** | **Y** | **Y** | **Y** | P | N | N |
| Safe on shared Demo k3s | N | N | N | N | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** |
| Self-host / data-residency option | **Y** | **Y** | **Y** | **Y** | N | N | N | N | N | N | P | N |
| Vendor lock-in risk | P | P | P | P | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** | **Y** |
| Fits “university app” narrative (3 Nov) | P | **Y** | P | **Y** | N | N | N | **Y** | **Y** | **Y** | **Y** | **Y** |

---

## 3. Option details (open-source vs commercial)

### 3.1 Open-source — strengths / gaps vs Raisd

| Option | Strengths for Raisd | Gaps / limits | When to pick |
|---|---|---|---|
| **BBB** | Deepest classroom (whiteboard, breakouts, attendance, Moodle API). Maps cleanly to CAP-26 teaching mental model. | Chrome is still BBB unless wrapped. Self-host heavy; use **managed**. OL-40 usually Raisd overlay. | Education-feature path / government LMS optics |
| **OpenVidu Meet** | Embed + white-label; LiveKit lineage; recording/API; Community $0 entry | Attendance custom; breakouts confirm GA; Community → PRO/cluster at scale | Same-product feel without building SFU UI |
| **plugNmeet** | LiveKit classroom pack (API + whiteboard + recording + breakout) without OpenVidu PRO | Community maturity / support thinner than BBB managed; CAP-12 Raisd | Co-equal OSS embed alt with OpenVidu |
| **OpenMeetings** | Broad classroom features; Apache-2.0 | Java / heavier ops | Watch list if Apache optics matter |
| **Jitsi** | Cheap privacy POC; JWT SSO | Basic classroom; Jibri ops; weak attendance/playback | Spike only — not SoT |
| **edumeet** | mediasoup education-lean meeting | Not managed classroom SoT | Shape C reference / DIY base |
| **Galène** | Lightest SFU ops | Thin teaching features | Internal POC only |
| **Nextcloud Talk** | Bundled if campus already on NC | Weak Raisd brand; NC ops coupling | Only if NC-mandated |
| **MiroTalk SFU** | Fast conference self-host | Licence + hardening | POC only |
| **LiveKit** | Full R1/R12 control; cheap media; OSS escape hatch | **No** classroom pack — Raisd builds lobby/roster/share/Past Class | After SDK spike; productised Raisd path |
| **mediasoup / Janus / Ion** | Absolute control | Slowest path; no product kit | Only if LiveKit rejected |

### 3.2 Commercial seats — strengths / gaps vs Raisd

| Option | Strengths for Raisd | Gaps / limits | When to pick |
|---|---|---|---|
| **Zoom Edu** | Reliability, attendance, polls, breakouts, procurement familiarity | **Fails R1** (separate product). Seat licensing vs student volume. OL-40 not design-pack | Campus already standardised on Zoom **and** accepts link-out |
| **Google Meet** | Familiar; often already paid via Workspace | Weakest custom API / branded embed; thin attendance; tenancy politics | Campus mandate only |
| **Microsoft Teams** | Licence leverage if M365 Edu present; Graph connectors | Raisd not M365-first; meeting-first UX; identity hybrid risk | Campus mandate only |

### 3.3 Commercial embed / SDK — strengths / gaps vs Raisd

| Option | Strengths for Raisd | Gaps / limits | When to pick |
|---|---|---|---|
| **Whereby Embedded** | Fastest Shape C Demo; breakout groups; Raisd shell stays | Metered $; thinner classroom than BBB; share queue may need stub | **Now** Demo spike |
| **Daily** | Fastest prototype; flexible React | No whiteboard; build more for OL pack | Spike / alternate Demo |
| **RealtimeKit** | UI kit + breakout child meetings; competitive $/min | Beta/acquisition risk — freeze features before Live | Branded product if breakouts matter |
| **Chime SDK** | Strong S1–S3 $/mo; AWS procurement; Media Capture → S3 | Full Raisd UI; recording share of bill higher | Branded product when AWS preferred |
| **Agora** | Global/APAC media | Build everything; whiteboard extra | Scale geography forces it |
| **Zoom Video SDK** | Zoom media without Meetings chrome | Still Zoom economics; build UI | Want Zoom reliability + Raisd shell |

### 3.4 Indicative S1 Lesotho pilot monthly media $ (from cost page)

8×(25+1)×2h → ~100k attendee-min · ~1.9k recording-min. **Not a quote.**

| Band | Options (approx total / mo) |
|---|---|
| **~$45–140** | Managed BBB small · Zoom Edu ~10 hosts · LiveKit Cloud Build |
| **~$120–220** | OpenVidu Community VPS+eng · RealtimeKit · Chime |
| **~$350–450** | Whereby · Daily · Agora · Zoom Video SDK |
| **~$8k–12k (S1)** | **Self-developed** (loaded eng/SRE — not VPS-only); grows to **~$25–40k** at S3 (Aslam ceiling ~$40k) |
| **Seat / suite** | Meet/Teams — “included” only if campus already pays Workspace/M365 |

Full S1–S3 tables: [lms-online-class-options.md](lms-online-class-options.md).

---

## 4. Side-by-side review packs (for leadership)

### Pack A — “Fast Demo inside Raisd”

| | Whereby | Daily | RealtimeKit |
|---|---|---|---|
| R1 branded | Y | Y | Y |
| Time to Demo | Fastest | Fastest | Medium |
| Classroom depth | Thin | Thin | Medium |
| Breakouts | Y | DIY | Y (beta) |
| S1 $ | ~$450 | ~$419 | ~$219 |
| Risk | Metered growth | Build depth | Vendor churn |

### Pack B — “Education classroom (OSS)”

| | Managed BBB | OpenVidu Meet | plugNmeet | Jitsi |
|---|---|---|---|---|
| Classroom depth | Excellent | Good | Good | Basic |
| Attendance built-in | Y | N (Raisd) | N (Raisd) | N |
| Embed / white-label | Wrap | Native strength | Native strength | Partial |
| Licence $ | $0 software | $0 → PRO | $0 | $0 |
| Ops | Managed preferred | Dedicated VPS | Dedicated VPS | Jibri heavy |
| Fit to 3 Nov OSS ask | **Primary** | **Alt embed** | **Alt embed** | POC only |

**Pack B watch list:** Apache OpenMeetings (classroom depth, heavier Java ops) · edumeet · Galène · MiroTalk (POC / reference only).

### Pack C — “Raisd-owned media (commercial SDK or OSS SFU)”

| | Chime | LiveKit Cloud | LiveKit OSS self-host | Agora |
|---|---|---|---|---|
| R1 / R12 control | Y | Y | Y | Y |
| Classroom chrome | Build | Build | Build | Build |
| S1 / S3 OpEx | ~$198 / ~$5.5k | ~$60 / ~$1.7k | **~$8–12k / ~$25–40k** (Aslam ≤~$40k) | ~$417 / ~$12k |
| Escape hatch | Weak | Strong | Strongest | Weak |
| Speed risk (3 Nov) | High eng | High eng | Highest | High eng |

### Pack D — “Campus suite mandate” (accept R1 failure)

| | Zoom Edu | Meet | Teams |
|---|---|---|---|
| R1 integrated | N | N | N |
| Teaching features | Strong | Weak | Medium |
| Procurement | Familiar | Familiar | Familiar |
| Raisd recommendation | Only if campus forces | Only if campus forces | Only if campus forces |

---

## 5. Review recommendation (not a Live decision)

| Priority | Choice | Why (feature lens) |
|---|---|---|
| **Demo now** | **Whereby** or **Daily** | Prove R2–R7 glue inside portals; stub R12 |
| **OSS classroom** | **Managed BBB** | Best feature score on teaching + attendance among OSS |
| **OSS embed** | **OpenVidu Meet** or **plugNmeet** | Best OSS score on R1 + embed without full SFU UI |
| **OSS watch list** | OpenMeetings · edumeet · Galène · MiroTalk | Spike only if shortlist rejected |
| **Branded Live path** | **RealtimeKit** or **Chime** or **LiveKit Cloud** | Best R1+R12; pick by breakouts vs $/mo vs OSS escape |
| **Self-host later** | LiveKit OSS (after Cloud spike) | Matches 3 Nov self-dev lean without starting from mediasoup |
| **Do not primary** | Jitsi SoT · Nextcloud Talk unless NC-mandated · Meet/Teams/Zoom link-out · Agora unless APAC · any media on Demo k3s | Fail R1 and/or classroom depth and/or ops |

**Raisd always owns:** R3 timetable, R9 CAP-24 quizzes/self-paced, CAP-12 persistence policy, recording authz, R8 transcript pipeline, OL-40 queue if vendor UX insufficient.

**For Aslam’s boss pack:** print §2.1 + §2.2 matrices, §4 packs A–C, and S1–S3 cost tables from the options page. Call out explicitly: commercial suites fail the “seamless university-branded” requirement unless Raisd accepts Shape A.

---

## Related

| Topic | Path |
|---|---|
| Cost · hosting · shapes | [lms-online-class-options.md](lms-online-class-options.md) · [HTML](../../diagrams/lms-online-class-options.html) |
| OSS implementation (R1–R12) | [lms-oss-video-requirements.md](lms-oss-video-requirements.md) |
| UX OL-xx | [lms-online-lesson-ux.md](lms-online-lesson-ux.md) |
| LMS posture | [lms.md](lms.md) |
| CAP-24 / CAP-26 | [SDD-11](../../sdd/11-capability-catalog.md) |
