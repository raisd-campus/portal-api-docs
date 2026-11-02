# Raisd LMS — online lesson UX requirements (design pack)

**Source pack:** Faid / Limkokwing “7.0 Chat” `online-lessons.zip` (2 Nov 2026) — 21 curated screens under [`docs/diagrams/lms-reference/online-lessons/`](../../diagrams/lms-reference/online-lessons/).  
**Published gallery:** [`online-lessons.html`](../../diagrams/lms-reference/online-lessons.html) · vendor research [`lms-online-class-options.md`](lms-online-class-options.md).  
**Status:** **Proposed / research** — absorb **behaviours**, do **not** clone Limkokwing chrome into Raisd portals ([website-ai-guidance.md](../website-ai-guidance.md)). Demo ≠ Live.  
**Raisd anchors:** F12 / CAP-26 · CAP-12 attendance · CAP-18 materials · F13 / CAP-24 quizzes (archive tags only in this pack).

---

## 1. Product framing from the designs

| Design signal | Raisd requirement |
|---|---|
| Classroom lives inside Faculty portal shell (Classroom, Materials, Timetable, …) | Shape **C preferred for target UX** — Raisd chrome + media SDK / managed classroom API behind Portal API. Shape A link-out fails the “feel integrated” test. |
| Programme → Module → Week → live session | Session metadata owned by Portal API; join gated by **timetable window**. |
| Students are participants; lecturer hosts | Host vs viewer tokens minted **server-side**. |
| Moderated screen-share queue | Students **request**; lecturer **Accept / Decline / Stop** — not free-for-all share. |
| Past Class + Shared Files + module chat | Recording catalogue + materials + chat are Raisd surfaces; vendor supplies media/recording bytes. |

**Gaps vs standup research (not in this pack):** breakout rooms, whiteboard, in-meeting polls/quizzes. Treat as out of pack — still covered in [lms-online-class-options.md](lms-online-class-options.md) §3–4.

---

## 2. Journey map (required screens)

```text
Community / module context
        │
        ├─ Shared Files feed (announcements, posts, starred)
        ├─ Module chat ──► system “Video call started…” · Rejoin Call
        └─ Past Class archive (Lecture / Quiz / Assignment tags)
                │
                ▼
        Virtual Classroom lobby
        (Week · module · programme · date · Materials Download · mic/cam prep)
                │  Join CTA shows timetable window (e.g. 10:00–12:00)
                ▼
        Live session (host or student)
        (featured lecturer · grid · roster · toolbar · chat · record)
                │
                ├─ Screen-share request queue (host)
                ├─ Choose screen modal (student) → toast “sent to lecturer”
                └─ Moderation: mute / kick / stop-share confirmations
                │
                ▼
        Post-class rating (stars · Skip / Submit)  →  Past Class recording entry
```

---

## 3. Requirements catalogue

### 3.1 Shell & context (always on)

| ID | Requirement | Design evidence |
|---|---|---|
| OL-01 | Classroom opens inside campus portal Faculty IA — not a separate Meet product. | Faculty nav · Classroom active |
| OL-02 | Show programme name + active module list with unread badges. | Community rail modules |
| OL-03 | Community rail tabs: Messages / Community / Updates. | Mid column tabs |
| OL-04 | Upcoming Meet Ups card (title, datetime, attendee avatars). | Study Session #1 card |
| OL-05 | Module header shows member count; actions Search, Files, Call, Settings. | Chat header |

### 3.2 Pre-join lobby

| ID | Requirement | Design evidence |
|---|---|---|
| OL-10 | Lobby titled Virtual Classroom with live clock. | `04` / `05` |
| OL-11 | Show Week badge, module title, programme subtitle. | Week 7 · Design Principles |
| OL-12 | Show Date, Day, and **Materials Download**. | Info bar |
| OL-13 | Mic + camera toggles with **device source dropdowns** before join. | Footer controls |
| OL-14 | Primary Join CTA displays **timetable window** (start–end) — join only inside window (Raisd rule). | Green `10:00 am – 12:00 pm` |
| OL-15 | Optional instructor preview (name, faculty, rating) — TBC whether Live Raisd ships ratings. | `05` |

### 3.3 Live session — layout & media

| ID | Requirement | Design evidence |
|---|---|---|
| OL-20 | Featured lecturer (or active speaker) tile + participant gallery. | `06`–`07`, `19` |
| OL-21 | Toggle **Full screen** and **Grid View**. | Top actions |
| OL-22 | Bottom toolbar: effects/filter, mic (+source), cam (+source), **End Call**, Share Screen, Chat, **Record**. | Toolbar |
| OL-23 | In-call chat with lecturer (blue) vs student (grey) bubbles; timestamps; attachment affordance. | `07` |
| OL-24 | System message when video call starts (datetime). | Chat centre line |
| OL-25 | Side panels during live: Shared Files, Past Class, Chat Search, Settings — without leaving session. | `12`–`15` |

### 3.4 Roster & attendance

| ID | Requirement | Design evidence |
|---|---|---|
| OL-30 | Roster shows **present / enrolled** (e.g. STUDENTS 13/32). | Left list |
| OL-31 | Search students; online indicator; per-student mute control. | Roster rows |
| OL-32 | Host **Mute All**. | Roster header |
| OL-33 | Portal API persists join/leave for CAP-12 attendance (standup). | Implied by present count |

### 3.5 Moderated screen share (critical)

| ID | Requirement | Design evidence |
|---|---|---|
| OL-40 | Student selects Entire screen **or** Window (multi-monitor thumbnails) then **Request**. | `20` |
| OL-41 | Student receives toast: request sent to lecturer. | `21` |
| OL-42 | Host sees request queue / overlays with **Decline** / **Accept**. | `06`, `08`, `10` |
| OL-43 | Active share shows timer + **Stop**; confirm before stop. | `09`, `17` |
| OL-44 | Only one student share active at a time unless policy later allows more. | Active row + pending queue |

### 3.6 Moderation

| ID | Requirement | Design evidence |
|---|---|---|
| OL-50 | Host can mute a student; confirmation UI. | `18` |
| OL-51 | Host can kick a student from the class; confirmation UI. | `16` |
| OL-52 | Request badge count on host controls (pending interactions). | Request · 13 |

### 3.7 Archive, materials, feedback

| ID | Requirement | Design evidence |
|---|---|---|
| OL-60 | Past Class list: week, title, date/time, **duration**, camera icon, tags Lecture / Quiz / Assignment. | `02`, `14` |
| OL-61 | Recording playback entry appears after session (vendor recording → Raisd catalogue). | Past Class |
| OL-62 | Shared Files / announcements searchable in module context. | `01`, `12` |
| OL-63 | Chat search across history (keyword highlight). | `13` |
| OL-64 | Post-class rating modal (1–5 stars, Skip / Submit) — **policy TBC** for Raisd Live. | `11` |

---

## 4. Role matrix

| Capability | Lecturer (host) | Student (participant) |
|---|---|---|
| Start / end class · Record | Yes | No |
| Join inside timetable window | Yes | Yes |
| Mute self | Yes | Yes |
| Mute All / mute other / kick | Yes | No |
| Share screen freely | Yes (host) | **Request → host approve** |
| Open request queue | Yes | No |
| Download materials from lobby | Yes | Yes |
| Rate class after session | Optional | Yes (if policy on) |

---

## 5. Implications for vendor shortlist

| Need from this UX pack | Fit |
|---|---|
| Raisd-owned chrome + lobby + roster + request queue | **Shape C** (RealtimeKit / Chime / LiveKit / Whereby Embedded) or Shape B iframe with **Raisd shell around** BBB/OpenVidu |
| Moderated student screen-share queue | Rare as stock Meet UX — expect **custom host UI** on SDK, or build queue in Portal API + provider APIs |
| Built-in classroom depth (whiteboard, polls) | Still favors **managed BBB** if those ship later; **not** evidenced in this pack |
| Recording → Past Class | All shortlisted vendors; Raisd owns catalogue + authz |
| Breakouts | **Not in pack** — keep RealtimeKit / Whereby / BBB on research shortlist |

**Demo spike alignment:** Prefer an embed provider that can prove OL-14 (timetable Join), OL-30–33 (roster/attendance), OL-22 Record, and a **stub** of OL-40–43 (request queue can be Raisd UI even if provider share is host-only in v1).

---

## 6. Non-goals from this pack

- Cloning Limkokwing dark theme or Faculty menu set into Raisd DS.  
- Shipping lecturer star-ratings or “Friend RM2,000” promo cards as Raisd product.  
- Treating Past Class Quiz/Assignment tags as CAP-24 exam of record (quizzes stay Raisd-native per online-class research).  
- Claiming Live CAP-26 until durable save, authz, and a named owner exist.

---

## Related

| Topic | Path |
|---|---|
| Cost / vendor matrix | [lms-online-class-options.md](lms-online-class-options.md) |
| Gallery | [online-lessons.html](../../diagrams/lms-reference/online-lessons.html) |
| Capture sources | [SOURCES.md](../../diagrams/lms-reference/online-lessons/SOURCES.md) |
| F12 steps | [lms-feature-steps.md](lms-feature-steps.md) |
| Classrooms Demo today | [backend/classrooms.md](../backend/classrooms.md) |
