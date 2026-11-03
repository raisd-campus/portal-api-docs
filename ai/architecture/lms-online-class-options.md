# Raisd LMS — online-class, recordings, quizzes, breakouts (research)

**Standup actions (Read.ai 2 Nov 2026):**  
- *Iman will research online-class technology options and compare costs, hosting, integration, pros/cons.*  
- *Iman will research features for self-paced learning, recordings, and quizzes.*  
- *Iman will research platforms that support breakout rooms.*

**Standup actions (Read.ai 3 Nov 2026):**  
- *Iman Suherman will provide a detailed comparison and implementation analysis of open-source video options against the stated requirements.* → **[lms-oss-video-requirements.md](lms-oss-video-requirements.md)** · published [`#oss-req`](../../diagrams/lms-online-class-options.html#oss-req)  
- *Iman Suherman will add details on open-source and commercial options and prepare a feature-by-feature comparison for review.* → **[lms-video-feature-comparison.md](lms-video-feature-comparison.md)** · published [`#feature-compare`](../../diagrams/lms-online-class-options.html#feature-compare) (this file keeps cost/hosting detail)  
- *Faid Zamin will test scenarios for how the flow behaves when a review step is disabled.* (UNIFC — not LMS)  
- *Mohammad Aslam Khan will compile Iman’s materials and present them to the boss.*

**Raisd anchors:** [lms.md](lms.md) · [lms-moodle-classroom-map.md](lms-moodle-classroom-map.md) · F12 / CAP-26 · F13 / CAP-24 · [SDD-11](../../sdd/11-capability-catalog.md)  
**Status:** **Proposed / research** — not Live. Demo ≠ Live for live class, quizzes, and recording delivery.  
**Meeting constraints to honour:** feel integrated (not a separate product); **portal SSO**; students join as **participants**; access gated by **timetable**; join/leave for **attendance**; **automatic recording** + later playback; **transcription** expected (Raisd or add-on pipeline); quizzes attach at module / study-planner setup (Raisd-native SoT); self-paced unlock may differ from teaching-week release; Faid → Manna requirements summary still expected.

Pricing below is **indicative public list** (USD/EUR, late 2025–Nov 2026). Always re-quote before procurement.

---

## 1. Decision frame for Raisd

Three integration shapes fit Portal API + campus portals:

| Shape | What Raisd owns | What vendor owns | Fit to “integrated classroom” |
|---|---|---|---|
| **A. Link-out / LTI meeting** | Session metadata, join button, attendance hooks | Full meeting UI | Weakest chrome continuity; fastest Demo |
| **B. Education classroom product (BBB / OpenVidu Meet API)** | Create/join URLs, recording catalogue, role map | Classroom UI + media + breakouts | Strong education features; iframe or redirect |
| **C. Embedded media SDK** | Full Raisd UI shell + scheduling + attendance | Media SFU / recording | Strongest “same product” feel; more build cost |

**Hard Raisd rules (do not violate):**

- Browsers talk only to **Portal API** (and SSO). Meeting credentials / join tokens are minted **server-side**.
- CMS remains SoR for enrolment; live-class attendance is a **learning event**, not a second roster SoR.
- Do not claim Live CAP-26 / CAP-24 until durable save, authz, and a named owner exist.

**Published human page:** [`docs/diagrams/lms-online-class-options.html`](../../diagrams/lms-online-class-options.html) → [docs.raisd.co/diagrams/lms-online-class-options.html](https://docs.raisd.co/diagrams/lms-online-class-options.html)  
**UX requirements (Faid design pack 2 Nov 2026):** [`lms-online-lesson-ux.md`](lms-online-lesson-ux.md) · screens in published [`#ux-pack`](../../diagrams/lms-online-class-options.html#ux-pack)

### Cost formula

```text
attendee_minutes / month
  = concurrent_classes × (students_per_class + 1 lecturer) × hours_per_week × 60 × weeks_per_month

media_cost ≈ attendee_minutes × media_rate
recording_minutes ≈ concurrent_classes × record_fraction × hours_per_week × 60 × weeks_per_month
recording_cost ≈ recording_minutes × recording_rate
  (Chime: $0.0125 capture + $0.002 concat per session-min; S3 extra)
```

Seat vendors: `licensed_hosts × price_per_host_month`. Self-developed: VPS + storage + eng (no per-min licence).

### Platform links

| Platform | Docs / product | Pricing |
|---|---|---|
| Google Meet | [Meet](https://workspace.google.com/products/meet/) | [Workspace](https://workspace.google.com/pricing.html) |
| Zoom Education | [Education](https://www.zoom.com/en/education/) | [Pricing](https://www.zoom.com/en/pricing/) |
| Zoom Video SDK | [Video SDK](https://developers.zoom.us/docs/video-sdk/) | Developer credits |
| Microsoft Teams | [Teams Edu](https://www.microsoft.com/en-us/education/products/teams) | [M365 Edu](https://www.microsoft.com/en-us/microsoft-365/education) |
| BigBlueButton | [BBB](https://bigbluebutton.org/) · [API](https://docs.bigbluebutton.org/) | $0 + [hosts](https://bigbluebutton.org/commercial-support/) |
| OpenVidu Meet | [Meet](https://openvidu.io/latest/meet/) · [REST API](https://openvidu.io/latest/meet/embedded/reference/rest-api/) | [Community free](https://openvidu.io/pricing/) · PRO $0.0006 / core-min |
| plugNmeet | [plugnmeet.org](https://www.plugnmeet.org/) · [GitHub](https://github.com/mynaparrot/plugNmeet-server) | Self-host (LiveKit-based) |
| Apache OpenMeetings | [openmeetings.apache.org](https://openmeetings.apache.org/) | Apache-2.0 · self-host |
| Jitsi | [jitsi.org](https://jitsi.org/) | Self-host / 8x8 |
| edumeet | [edumeet.org](https://edumeet.org/) · [GitHub](https://github.com/edumeet) | Self-host (mediasoup) |
| Galène | [galene.org](https://galene.org/) | AGPL · self-host |
| Nextcloud Talk | [Nextcloud Talk](https://nextcloud.com/talk/) | Needs Nextcloud |
| MiroTalk SFU | [mirotalk.com](https://mirotalk.com/) · [SFU GitHub](https://github.com/miroslavpejic85/mirotalksfu) | Self-host · confirm licence |
| Whereby Embedded | [Embedded](https://whereby.com/information/embedded/) | [Pricing](https://whereby.com/information/embedded/pricing) |
| Daily | [daily.co](https://www.daily.co/) | [Pricing](https://www.daily.co/pricing) |
| Agora | [agora.io](https://www.agora.io/) | [Pricing](https://www.agora.io/en/pricing/) |
| LiveKit | [livekit.io](https://livekit.io/) · [OSS](https://github.com/livekit/livekit) | [Cloud](https://livekit.io/pricing) · [self-host](https://docs.livekit.io/home/self-hosting/) |
| Cloudflare RealtimeKit | [Docs](https://developers.cloudflare.com/realtime/realtimekit/) | [Pricing](https://developers.cloudflare.com/realtime/realtimekit/platform/pricing/) |
| Amazon Chime SDK | [Chime SDK](https://aws.amazon.com/chime/chime-sdk/) | [Pricing](https://aws.amazon.com/chime/chime-sdk/pricing/) |
| Self-developed | [LiveKit self-host](https://docs.livekit.io/home/self-hosting/) · [mediasoup](https://mediasoup.org/) · [Janus](https://janus.conf.meetecho.com/) · [Ion SFU](https://github.com/pion/ion-sfu) | VPS + storage only |

### Unit rates (media / recording) — all platforms

| Platform | Media / attendee-min | Recording / session-min | Fixed / mo |
|---|---:|---:|---:|
| Google Meet (Workspace) | n/a | Drive / plan | ~$12 / host* |
| Microsoft Teams (M365 Edu) | n/a | Stream / OneDrive | ~$15 / host* |
| Zoom Edu seats | n/a | plan / storage | ~$14 / host |
| Zoom Video SDK | ~$0.0035 | ~$0.01 | $0 |
| Whereby Embedded | $0.0042 | $0.01 | $10.99 |
| Daily | $0.0040 | $0.01 | $0 |
| Agora HD | ~$0.0040 | ~$0.009 | $0 |
| RealtimeKit | $0.0020 | $0.01 | $0 |
| **Amazon Chime SDK** | **$0.0017** | **$0.0145** (0.0125+0.002) | $0 (+S3) |
| LiveKit Cloud | ~$0.0005 | ~$0.005 | $0–$50+ |
| BBB managed | n/a | included GB | ~$15–€399+ |
| OpenVidu Meet | $0 / PRO core-min | your storage | VPS / PRO |
| plugNmeet | $0 licence | your storage | VPS / ops |
| Apache OpenMeetings | $0 licence | your storage | VPS / ops |
| Jitsi Meet | $0 licence | Jibri + storage | VPS / ops |
| edumeet / Galène / MiroTalk | $0 licence | DIY / storage | VPS / ops |
| Nextcloud Talk | $0 (Talk) | NC storage | Nextcloud ops |
| Self-developed OSS | $0 licence | your storage | VPS / ops |

\*Meet/Teams host seats are modelling only — treat as **$0 incremental** when the campus already pays Workspace / M365 Edu.

### S1 Lesotho pilot — all platforms

8×(25+1)×2h → **99 840** attendee-min · **1 920** recording-min · **8** hosts

| Platform | Media | Recording | Fixed | **Total / mo** |
|---|---:|---:|---:|---:|
| Whereby Embedded | $419 | $19 | $11 | **$450** |
| Daily | $399 | $19 | $0 | **$419** |
| Agora HD | $399 | $17 | $0 | **$417** |
| Zoom Video SDK | $349 | $19 | $0 | **$369** |
| Cloudflare RealtimeKit | $200 | $19 | $0 | **$219** |
| **Amazon Chime SDK** | $170 | $28 | $0 | **$198** |
| Microsoft Teams (8)* | — | incl* | $120 | **$120+** |
| Google Meet (8)* | — | Drive* | $96 | **$96+** |
| Zoom Edu (8) | — | incl* | $112 | **$112+** |
| OpenVidu Meet Community | $0 | storage | ~$120 VPS | **~$120+ eng** |
| plugNmeet | $0 | storage | ~$120 VPS | **~$120+ eng** |
| Apache OpenMeetings | $0 | storage | ~$140 VPS | **~$140+ eng** |
| Jitsi Meet | $0 | Jibri | ~$100 VPS | **~$100+ eng** |
| edumeet | $0 | storage | ~$110 VPS | **~$110+ eng** |
| Galène | $0 | storage | ~$60 VPS | **~$60+ eng** |
| MiroTalk SFU | $0 | storage | ~$80 VPS | **~$80+ eng** |
| Nextcloud Talk | $0* | NC* | NC host* | **NC ops*** |
| Self-developed (OSS) | $0 | storage | ~$120 VPS | **~$120+ eng** |
| LiveKit Cloud (Build) | $50 | $10 | $0 | **$60** |
| BBB managed | — | incl. | $45–90 | **$45–90** |

\*Nextcloud Talk only models if campus already runs Nextcloud — otherwise add full NC stack cost.

### S2 Multi-campus — all platforms

40×(30+1)×3h → **892 800** attendee-min · **14 400** recording-min · **40** hosts

| Platform | Media | Recording | Fixed | **Total / mo** |
|---|---:|---:|---:|---:|
| Whereby | $3 750 | $144 | $11 | **$3 905** |
| Daily | $3 571 | $144 | $0 | **$3 715** |
| Agora | $3 571 | $130 | $0 | **$3 701** |
| Zoom Video SDK | $3 125 | $144 | $0 | **$3 269** |
| RealtimeKit | $1 786 | $144 | $0 | **$1 930** |
| **Chime SDK** | $1 518 | $209 | $0 | **$1 727** |
| Microsoft Teams (40)* | — | incl* | $600 | **$600+** |
| Zoom Edu (40) | — | incl* | $560 | **$560+** |
| LiveKit Cloud (Ship) | $446 | $72 | $50 | **$568** |
| Google Meet (40)* | — | Drive* | $480 | **$480+** |
| OpenVidu Meet (Community / PRO) | $0 or core-min | storage | ~$400 VPS | **~$400+ / PRO** |
| plugNmeet | $0 | storage | ~$400 VPS | **~$400+ eng** |
| Apache OpenMeetings | $0 | storage | ~$450 VPS | **~$450+ eng** |
| Self-developed | $0 | storage | ~$400 VPS | **~$400+ eng** |
| edumeet / MiroTalk | $0 | storage | ~$350 VPS | **~$350+ eng** |
| Jitsi Meet | $0 | Jibri | ~$350 VPS | **~$350+ eng** |
| Galène | $0 | storage | ~$200 VPS | **~$200+ eng** |
| BBB uni managed | — | incl. | ~$220–440 | **~$220–440** |

### S3 Full peak — all platforms

100×(40+1)×3h → **2 952 000** attendee-min · **36 000** recording-min · **100** hosts

| Platform | Media | Recording | Fixed | **Total / mo** |
|---|---:|---:|---:|---:|
| Whereby | $12 398 | $360 | $11 | **$12 769** |
| Daily | $11 808 | $360 | $0 | **$12 168** |
| Agora | $11 808 | $324 | $0 | **$12 132** |
| Zoom Video SDK | $10 332 | $360 | $0 | **$10 692** |
| RealtimeKit | $5 904 | $360 | $0 | **$6 264** |
| **Chime SDK** | $5 018 | $522 | $0 | **$5 540** |
| LiveKit Cloud | $1 476 | $180 | $50 | **$1 706** |
| Microsoft Teams (100)* | — | incl* | $1 500 | **$1 500+** |
| Zoom Edu (100) | — | incl* | $1 400 | **$1 400+** |
| Google Meet (100)* | — | Drive* | $1 200 | **$1 200+** |
| Self-developed cluster | $0 | storage | ~$1 200+ | **~$1 200+ eng/SRE** |
| plugNmeet / edumeet cluster | $0 | storage | quote | **custom** |
| Jitsi Meet cluster | $0 | Jibri | quote | **custom** |
| OpenVidu Meet PRO cluster | core-min | storage | quote | **custom** |
| Apache OpenMeetings cluster | $0 | storage | quote | **custom** |
| BBB Scalelite | — | ops | quote | **custom** |

**Reading:** All matrix platforms are costed. Meet/Teams = $0 incremental when already licensed. Chime recording is a larger share (~12–14%) because composite capture is $0.0125/min. Seat/BBB plans often include recording. Jitsi/OpenVidu/self-developed look cheap until VPS, Jibri/egress, and eng/SRE. Do not self-host media on the shared Demo k3s node.

---

## 2. Live-class technology options (cost · hosting · integration · pros/cons)

### 2.1 Comparison matrix

| Option | Cost (indicative) | Hosting | Integration | Breakouts | Recordings | Pros | Cons |
|---|---|---|---|---|---|---|---|
| **Google Meet** | Included with Google Workspace / Classroom Edu where licensed | Google SaaS | Calendar link / Classroom Meet; weak custom API | Limited vs Zoom | Drive / Meet recordings | Familiar; low ops | Weakest Raisd-branded embed; attendance APIs thin; multi-campus Google tenancy politics |
| **Zoom Meetings / Edu** | Free limits; Edu ~$10–18 / host / mo; Large Meeting add-on | Zoom SaaS | Meeting SDK / LTI / LMS plugins; Video SDK ~$0.0035 / session-min | Yes (manual / temporary) | Cloud recording (paid storage) | Reliability; procurement familiarity; attendance + polls | Breakouts not persistent groups; UI is “Zoom”; seat licensing vs student volume |
| **Microsoft Teams** | Often bundled in M365 Education A1/A3/A5 | Microsoft SaaS | Graph + LMS connectors; class Teams | Yes (temporary) | Stream / OneDrive | Licence leverage if campus already on M365 | Meeting-first UX; Raisd already not M365-first; hybrid identity risk |
| **BigBlueButton (BBB)** | Licence **$0**; managed ~$12.50–$90+/mo small; university managed ~€199+/mo | Self-host (heavy) **or** commercial BBB host | **Native REST API** (`create` / `join` / recordings / hooks); LTI 1.1/1.3; **native Moodle** | Yes (education-native) | Built-in playback + webhooks | **Excellent** classroom features; built-in attendance analytics; Moodle-grade LMS pattern maps to CAP-26 | Self-host CPU/RAM heavy on UltaHost-class nodes; partner ops or extra VPS; breakouts not “persistent LMS groups” |
| **OpenVidu Meet** | **Community free**; PRO **$0.0006 / core-min** | Self-host (Community single-node) **or** PRO elastic / HA | REST API + embed web component + webhooks; Moodle = **custom** | Breakout groups (product roadmap / coming) | API/config capture; built-in playback | **Good** classroom features; white-label; embed-friendly “same product” path; LiveKit-based stack | Attendance analytics need custom Raisd work; not Moodle-native; self-host still needs dedicated media capacity |
| **plugNmeet** | Licence ~$0; infra only | Self-host (LiveKit-based) | REST/API + embed; Moodle = custom | Yes (product) | API recording | LiveKit classroom pack (whiteboard, breakout, recording) without OpenVidu PRO | Community support thinner than BBB managed; CAP-12 still Raisd |
| **Apache OpenMeetings** | Licence $0 (Apache-2.0) | Self-host (Java) | REST / SOAP style LMS glue | Yes | Built-in recording / playback | Broad classroom feature set; Apache trademark optics | Heavier Java ops; prefer only if BBB managed rejected |
| **Jitsi Meet** | Licence $0; infra only | Self-host or 8x8 | DIY iframe + JWT; Moodle = plugin/custom | Partial / DIY | Jibri automation; playback needs storage/player glue | Cheap privacy-friendly POC; white-label possible | **Basic** classroom features; attendance/custom LMS glue DIY; not a virtual classroom product |
| **edumeet** | Licence $0 | Self-host (mediasoup) | Custom / embed | DIY rooms | Partial / DIY | Education-lean multiparty meeting; mediasoup reference | Not a managed classroom SoT; Raisd builds attendance + Past Class |
| **Galène** | Licence AGPL-3.0 | Self-host (lightweight SFU) | Simple groups / API | Basic | Partial | Smallest ops footprint for internal pilots | Thin teaching features; not CAP-26 SoT |
| **Nextcloud Talk** | Included with Nextcloud | Nextcloud host | NC app embed | Limited | Partial | Only if campus already standardises on Nextcloud | Pulls NC ops into video decision; weak Raisd brand |
| **MiroTalk SFU** | Licence check (often AGPL) | Self-host | Web UI / API | Basic | Partial | Fast WebRTC conference POC | Confirm licence + hardening before Live |
| **Whereby Embedded** | Build $10.99/mo + ~$0.0042 / participant-min; recording ~$0.01/min | Whereby SaaS | iframe / web component | **Breakout groups** on Embedded | Cloud recording add-on | Fast embed; Raisd shell stays; 200 cap | Metered cost; classroom depth thinner than BBB |
| **Daily** | 10k free min/mo; then ~$0.004 / participant-min | Daily SaaS | Prebuilt iframe or custom React | Via rooms / DIY | Recording add-on | Fastest prototype | No native whiteboard; large lectures → HLS delay |
| **Agora** | ~$0.004 / HD min; whiteboard separate | Agora global network | Full custom UI SDK | DIY / products on top | Cloud recording | Scale + regional reach | Build everything; whiteboard extra SKU |
| **LiveKit** | Cloud from free / $50 Ship; ~$0.0005/min + bandwidth; or self-host | LiveKit Cloud or k8s | Custom UI | DIY rooms | Egress agents | Open source escape hatch; cheap media | No classroom chrome; you build breakouts/whiteboard |
| **Cloudflare RealtimeKit** (ex-Dyte) | 10k AV min free; then **$0.002**/min; export **$0.01**/min | Cloudflare edge | UI Kit + SDKs | **Breakout rooms (beta)** — each breakout = child meeting | Per-room recording | Strong “same product” embed; competitive minute price; classroom-oriented kit | Beta / acquisition churn; confirm feature freeze before Live |
| **Amazon Chime SDK** | **$0.0017**/attendee-min; 1080p capture **$0.0125**/min + concat **$0.002**/min | AWS | Full custom UI; Media Capture → S3 | DIY rooms | Media Capture Pipeline | Low media rate; AWS procurement; published LMS pricing example | Build classroom UX; S3/transfer extra; no education chrome |
| **Self-developed platform** | Infra + eng (no vendor media fee) | Raisd VPS / k8s (LiveKit OSS, mediasoup, Janus) | Raisd owns SFU + UI + recording | Build yourself | Own object store | Full control; no per-min lock-in | Highest eng + SRE; isolate media from Demo k3s |

### 2.2 Integration patterns that match Raisd

Published page draws shapes **and** breakouts / self-paced / recordings / quizzes together: [`#shapes`](../../diagrams/lms-online-class-options.html#shapes).

| Shape | Breakouts | Recordings | Quizzes / self-paced |
|---|---|---|---|
| **A** Link-out (Meet / Zoom / Teams) | Vendor temporary rooms | Vendor cloud; Raisd metadata + Demo deep-link | Always Raisd-native (F03 / CAP-24) |
| **B** Education API (BBB / OpenVidu) | BBB education UI · OpenVidu groups (confirm GA) | Built-in playback; prefer export to Raisd store for Live | Always Raisd-native |
| **C** Embed SDK (Whereby / Daily / RealtimeKit / LiveKit / …) | Whereby / RealtimeKit native · else DIY multi-room | Egress → Raisd Past Class | Always Raisd-native |

```text
Student / Lecturer portal
        │  HTTPS
        ▼
   Portal API
        ├─ timetable gate → mint host vs viewer token
        ├─ self-paced unlock (cohort_week | sequential_unlock | open_from)
        ├─ quiz items CAP-24 (module / study planner)
        ├─ breakout policy (moderator-only · participants · main-room record MVP · session-scoped)
        │
        ├─ Shape A: redirect or popup to Meet/Zoom/Teams
        ├─ Shape B: BBB or OpenVidu Meet create+join
        └─ Shape C: embed SDK room inside portal route
        │
        ▼
  Webhooks join/leave → CAP-12 attendance
  recording.ready → CAP-18 Past Class / Materials (+ Live file-store export)
```

**UX pack implication (see [lms-online-lesson-ux.md](lms-online-lesson-ux.md)):** the Faid online-lessons designs require Raisd chrome (lobby, roster `present/enrolled`, moderated screen-share **request queue**, Past Class). That **raises Shape C** (or Shape B wrapped in Raisd shell) over Meet/Zoom link-out. Stock vendor UIs rarely implement OL-40–43 (student Request → host Accept/Decline/Stop).

**Recommended shortlist for WG (not a Live decision):**

1. **Demo / pilot path:** **Whereby Embedded** or **Daily Prebuilt** — prove timetable-gated Join CTA (OL-14), participant role, recording → Past Class, roster present count with least infra. Stub moderated share queue in Raisd UI if provider cannot gate student share.  
2. **Education-feature path:** **BBB via managed host + Portal API** — strongest classroom pack among OSS peers (see §2.3): native Moodle, built-in attendance analytics, excellent teaching UX. Prefer **managed BBB** over self-host on the current Demo VPS. Wrap in Raisd lobby/roster chrome to match the design pack.  
3. **Embeddable OSS middle path:** **OpenVidu Meet Community** or **plugNmeet** (+ Portal API) — good classroom features on LiveKit lineage, white-label, REST/embed; Raisd still builds attendance analytics, LMS glue, and share-request UX.  
4. **Productized Raisd path (matches design pack best):** **Cloudflare RealtimeKit**, **Amazon Chime SDK**, or **LiveKit Cloud** — branded lobby + grid + host request queue; Chime strong on media+recording $/mo; RealtimeKit if breakout APIs matter later; LiveKit if self-host escape hatch is required.  
5. **Self-developed (later):** same LiveKit APIs self-hosted on dedicated media nodes — only after a Cloud/SDK spike proves CAP-26 flows. OpenVidu Meet / plugNmeet already sit on LiveKit-based stacks if that path is preferred as a productised SFU.

**Watch list (spike only if shortlist rejected):** Apache OpenMeetings · edumeet · Galène · MiroTalk SFU.

**Deprioritise for Raisd pilot unless campus already standardises on them:** Google Meet-only, Teams-only, raw Agora (unless APAC scale forces it), **Jitsi as the LMS classroom**, **Nextcloud Talk** (unless NC-mandated), self-hosting media on the shared Demo k3s node.

### 2.3 Open-source classroom feature comparison (self-hosted)

Assumes a **properly configured self-hosted deployment**, not free public hosting tiers (meet.jit.si / public BBB demos).

#### Primary shortlist

| Requirement | BigBlueButton | OpenVidu Meet | plugNmeet | Jitsi Meet |
|---|---|---|---|---|
| White-label | Yes | Yes | Yes | Yes |
| Automatic recording | Configurable | Via API / configuration | Via API | Via Jibri automation |
| Playback later | Built-in | Yes | Yes (export preferred) | Requires storage / player integration |
| Moodle integration | **Native** | Custom integration | Custom | Plugin / custom |
| Custom LMS integration | API | API / embedding | API / embedding | API / embedding |
| Classroom features | **Excellent** | Good | Good | Basic |
| Breakouts / whiteboard | **Yes / Yes** | Partial / Good | **Yes / Yes** | Partial / Basic |
| Student attendance analytics | **Built-in features** | Custom development | Custom development | Custom development |
| Self-hosted | Yes | Yes | Yes | Yes |
| Software licence cost | Free | Free Community (PRO paid) | Free | Free |
| Stack note | Classic education SFU | LiveKit-based | LiveKit-based | JVB + Jibri |

#### Additional OSS options

| Requirement | Apache OpenMeetings | edumeet | Galène | Nextcloud Talk | MiroTalk SFU |
|---|---|---|---|---|---|
| White-label | Partial | Partial | Partial | Weak (NC chrome) | Partial |
| Automatic recording | Yes | Partial | Partial | Partial | Partial |
| Playback later | Built-in | DIY / partial | Partial | Partial | Partial |
| Moodle / custom LMS | Custom | Custom | Custom | Via Nextcloud | Custom |
| Classroom features | Good | Basic–Good | Basic | Basic | Basic |
| Student attendance analytics | Partial | Custom | DIY | Partial | DIY |
| Self-hosted | Yes (Java) | Yes (mediasoup) | Yes (light) | Needs Nextcloud | Yes |
| Software licence cost | Free (Apache-2.0) | Free | Free (AGPL) | Free w/ NC | Confirm licence |
| Raisd note | Heavier ops | Shape C reference | Internal POC | NC-mandated only | POC; harden before Live |

**Raisd reading:** BBB remains the preferred Shape B education pack (native Moodle + attendance + deepest classroom UX). OpenVidu Meet and plugNmeet are the strongest OSS alternatives when embed/white-label and LiveKit lineage matter more than Moodle-native depth. OpenMeetings is a watch-list classroom if Apache optics matter. Jitsi / Galène / MiroTalk / edumeet stay media or reference POCs — not CAP-26 classroom SoT. Nextcloud Talk only if the campus already runs Nextcloud.

**Full OSS vs stated requirements (3 Nov R1–R12), including LiveKit / mediasoup implementation analysis:** [lms-oss-video-requirements.md](lms-oss-video-requirements.md) · published [`#oss-req`](../../diagrams/lms-online-class-options.html#oss-req).

**Open-source + commercial feature-by-feature review pack (3 Nov):** [lms-video-feature-comparison.md](lms-video-feature-comparison.md) · published [`#feature-compare`](../../diagrams/lms-online-class-options.html#feature-compare).

### 2.4 Implementation wireframes (hypothetical)

Low-fidelity “if Raisd implemented this platform” screens — **research only**, not Demo/Live. Published gallery: [`#wireframes`](../../diagrams/lms-online-class-options.html#wireframes).

| Shape | Platforms wired | What the student sees |
|---|---|---|
| **A** Link-out | Meet · Zoom Edu · Teams | Raisd lobby → vendor product chrome (fails R1 unless campus mandates) |
| **B** Classroom API | BBB · OpenVidu · plugNmeet · OpenMeetings | Raisd lobby/roster wrap · education UI inside frame |
| **B watch / POC** | Jitsi · edumeet · Galène · NC Talk · MiroTalk | Thin meeting chrome; Raisd must finish OL pack |
| **C** Embed / SDK | Whereby · Daily · RealtimeKit · Chime · Agora · Zoom Video SDK · LiveKit · self-dev | Raisd owns live chrome; vendor is media plane |

**Raisd always drawn:** timetable-gated lobby, present/enrolled roster, OL-40 share queue overlay (when vendor lacks it), Past Class entry after recording.

---

## 3. Self-paced learning, recordings, and quizzes

These are **Raisd product capabilities** (F03/F12/F13), not video-vendor features. Vendors only supply media; Portal API owns release rules and assessment attempts.

### 3.1 Self-paced learning (topic unlock)

| Concern | Raisd today | Research finding | Proposed direction |
|---|---|---|---|
| Teaching-week release | Partial Materials / CAP-27 | Moodle: section + restriction sets; Classroom: topic order + schedule | Keep **teaching-week** as the default cohort schedule |
| Self-paced unlock | Gap (standup) | Often a **second gate**: “available after previous topic complete” or “open from date X regardless of week” | Add optional **self-paced policy** on module/offering: `cohort_week` \| `sequential_unlock` \| `open_from` — separate from live-class timetable |
| Live vs async | CAP-26 vs materials | Live join should still be timetable-gated even if materials are self-paced | Do **not** reuse live-session open window as the only materials unlock |
| Lecturer control | Discussed 2 Nov | Lecturers may lock future topics for self-paced cohorts | Policy owned in Control / University Flows or module settings — not in the video vendor |

### 3.2 Recordings

| Concern | Vendor behaviour | Raisd need (standup) | Proposed Raisd model |
|---|---|---|---|
| Capture | BBB / OpenVidu Meet / Zoom / Whereby / RealtimeKit / Daily can record | Students who miss live can watch later | Portal API stores **recording metadata** (session id, ready_at, duration, storage URL) |
| Storage | Vendor cloud **or** export to object store | Durable Live needs Raisd-controlled retention | Prefer **export to Raisd file store** when Live; Demo may deep-link vendor URL with expiry |
| Access | Vendor share links leak | Must respect enrolment + release | Serve only through Portal API authz (exact offering) |
| Attendance | Join webhooks ≠ watch progress | Optional later analytics | Phase 1: live join/leave only; Phase 2: playback heartbeats if required |
| Breakout recordings | RealtimeKit records breakouts separately; Zoom/BBB vary | Confirm with Manna whether breakouts must be retained | Default: record **main room only** unless policy says otherwise |

### 3.3 Quizzes and exams (CAP-24 / F13)

| Approach | Pros | Cons | Raisd fit |
|---|---|---|---|
| **Raisd-native quiz** (Portal API attempts, auto/manual mark) | Authz, audit, campus policy, attaches to module/study planner as discussed | Build cost; need question types, timers, integrity later | **Preferred** for pilot coherence with Admissions/Flows patterns |
| Google Forms / Microsoft Forms link-out | Fast | Weak gradebook sync; chrome break; integrity poor | Demo-only stopgap |
| Moodle quiz via LTI | Mature question bank | Second LMS SoR; contradicts ADR-1 “don’t duplicate CMS/LMS ops” | Avoid as primary |
| H5P / SCORM package | Rich interactives | Player + content ops burden | Optional later content type, not exam SoR |
| BBB 3.0 in-meeting quiz | Live engagement | Not a durable exam of record | Use for formative live polls only |

**Standup mapping:**

- Lecturers create quizzes and **attach during module / study-planner setup** → Raisd learning item (`quiz` kind) on the offering, not inside Zoom.  
- Pre-/post-tests → attempt windows on the item.  
- Auto vs manual mark → item setting; Live still needs CMS publish path for official results (CAP-13).  
- Students never create quizzes; lecturer- or faculty-scoped banks only.

---

## 4. Platforms that support breakout rooms

### 4.1 Native / first-class breakouts

| Platform | Breakout model | Notes for Raisd |
|---|---|---|
| **Zoom** | Host creates temporary breakout rooms; assign manual/auto | Familiar; not persistent LMS groups; leave/return to main |
| **Microsoft Teams** | Breakout rooms in meetings | Same temporary model; best if M365-standard campus |
| **BigBlueButton** | Education breakout rooms from moderator UI | Strong teaching fit; API can create meetings — breakout UX is in-BBB |
| **OpenVidu Meet** | Breakout groups on product roadmap | Confirm GA before Live; API/embed already strong for main room |
| **Whereby Embedded** | **Breakout groups** feature on Embedded plans | Good for embed path without building room graph |
| **Cloudflare RealtimeKit** | **Connected meetings / breakout rooms (beta)** — each breakout is a **child meeting**; host APIs to create, assign, switch; record per room | Best documented programmable breakouts for a custom Raisd UI |
| **Engageli / purpose-built virtual classrooms** | Persistent tables / pods | Feature-rich; usually campus SaaS procurement, not embed-in-Raisd |

### 4.2 DIY breakouts (SDK)

| Platform | How | Effort |
|---|---|---|
| **Daily / LiveKit / Agora / Zoom Video SDK** | Spawn N rooms; move participants via server API; build host UI | High — Raisd owns UX, permissions, recording policy |
| **Jitsi** | Separate rooms / iframe swaps | Fragile; not recommended as product breakouts |

### 4.3 Raisd product rules if breakouts ship

1. Only **lecturer/moderator** (or timetable host) may create/open breakouts.  
2. Students remain **participants**; cannot escalate to host via breakout.  
3. Portal API records breakout membership only if needed for attendance/assessment — default omit.  
4. Main-room recording is enough for MVP; breakout recording is an explicit policy flag.  
5. Breakouts are **session-scoped**, not a second CMS group SoR (unless Control later defines persistent seminar groups).

---

## 5. Recommendation for Working Group

| Priority | Choice | Why |
|---|---|---|
| **Now (research → Demo spike)** | Portal API session object + **Whereby** or **Daily** embed | Validates timetable gate, participant role, recording link, attendance webhook with minimal ops on UltaHost |
| **Preferred education feature pack** | **Managed BigBlueButton** behind Portal API | Best OSS classroom depth (excellent features, native Moodle, built-in attendance) without self-hosting media on the Demo node |
| **OSS embed alternative** | **OpenVidu Meet Community** or **plugNmeet** behind Portal API | Good classroom features + white-label/API embed on LiveKit; Raisd builds attendance analytics + LMS glue |
| **OSS watch list** | OpenMeetings · edumeet · Galène · MiroTalk | Spike only if BBB / OpenVidu / plugNmeet rejected |
| **If “must feel like Raisd”** | **Cloudflare RealtimeKit** (confirm breakout beta → GA) | Embed + programmable breakouts + $0.002/min; still build quiz/self-paced in Raisd |
| **Quizzes / self-paced** | **Raisd-native** items + unlock policy | Do not outsource exam of record to Forms or BBB live quiz |
| **Avoid as primary pilot** | Self-host BBB/OpenVidu/Jitsi on current k3s Demo node; Jitsi as classroom SoT; Teams/Meet-only unless campus mandate | Ops and chrome conflicts |

**Explicit non-decisions (still TBC with Faid / Manna):**

- Campus-standard meeting licence (Zoom vs M365 vs none).  
- Recording retention (days) and whether breakout audio is retained.  
- Whether live attendance writes CAP-12 Demo only or also CMS.  
- Exam integrity (lockdown browser / proctoring) — out of scope for this research.

---

## 6. Suggested Demo spike (not Live)

Aligned to design-pack journeys ([lms-online-lesson-ux.md](lms-online-lesson-ux.md) OL-10–14, OL-30–33, OL-22, OL-60):

1. Add Portal API `live_class_sessions` (proposed) — offering id, starts/ends, provider, join mode.  
2. Raisd **lobby** (Week / module / programme / Materials Download / mic-cam prep) → Lecturer Start or Student Join only inside window → host vs viewer token.  
3. Persist join/leave; show roster **present/enrolled** for attendance Demo (CAP-12).  
4. On `recording.ready`, attach Past Class / Materials-style learning item (session-only Demo OK).  
5. Optional Demo stub: screen-share **request** toast + host Accept/Decline queue (OL-40–43) even if v1 only allows host share on the provider.  
6. Document provider secrets in control-plane credentials — never in portals.

---

## Related

| Topic | Path |
|---|---|
| OSS vs stated requirements (3 Nov) | [lms-oss-video-requirements.md](lms-oss-video-requirements.md) · [#oss-req](../../diagrams/lms-online-class-options.html#oss-req) |
| OSS + commercial feature-by-feature (review) | [lms-video-feature-comparison.md](lms-video-feature-comparison.md) · [#feature-compare](../../diagrams/lms-online-class-options.html#feature-compare) |
| Per-platform implementation wireframes | [#wireframes](../../diagrams/lms-online-class-options.html#wireframes) · §2.4 above |
| Online lesson UX requirements (OL-xx) | [lms-online-lesson-ux.md](lms-online-lesson-ux.md) · [#ux-pack gallery](../../diagrams/lms-online-class-options.html#ux-pack) |
| LMS posture | [lms.md](lms.md) |
| Moodle / Classroom map (row 13 live class, row 10 quizzes) | [lms-moodle-classroom-map.md](lms-moodle-classroom-map.md) |
| F12 / F13 steps | [lms-feature-steps.md](lms-feature-steps.md) · [features.html](../../diagrams/lms-reference/features.html) |
| CAP-24 / CAP-26 | [SDD-11](../../sdd/11-capability-catalog.md) |
| Classrooms Demo today | [backend/classrooms.md](../backend/classrooms.md) |
