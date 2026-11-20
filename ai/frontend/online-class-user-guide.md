# Online class — user guide (Demo Partial)

**As of:** 20 November 2026  
**Status:** **Demo Partial** — not Live CAP-26. Sample / session data only.  
**Browse (docs.raisd.co):** [Online class user guide](https://docs.raisd.co/diagrams/guidance/online-class.html)  
**Walkthrough captures:** [live-class-plugnmeet/](../../diagrams/lms-reference/live-class-plugnmeet/)  
**Capability:** [CAP-26](../../sdd/11-capability-catalog.md) · Classrooms API: [classrooms.md](../backend/classrooms.md)  
**Interim SFU issues (20 Nov):** [ultahost interim SFU audit](../architecture/audits/2026-11-20-ultahost-interim-sfu-reconnect.md)  
**Moderator reference:** [plugNmeet Moderator Guide (YouTube)](https://www.youtube.com/watch?v=nDsB9fSMzYM) · [Moderator docs](https://www.plugnmeet.org/docs/user-guide/moderator)

---

## 1. What this guide is for

Use this guide to run a **Demo online class** on Lesotho Raisd portals and the dark Raisd Classroom (`classrooms.raisd.co`):

1. **Lecturer** starts the live class from Classrooms  
2. Both open the **virtual classroom** (plugNmeet)  
3. Host uses **participant, collaboration, recording & AI** tools  
4. **Student** joins (waiting room when enabled) from the module Live class tab  
5. Leave / End and open **Past Class** materials (Re-watch table with recorded timestamps / **Open notes** / **Open material**)  
6. See **Public Chat → Community** sync during the live session (Demo Partial)

Do **not** treat this as Live production training. Media is Demo Partial on borrowed DIV + `classrooms.raisd.co`. Journeys are **screenshot-only** (walkthrough videos removed).

---

## 2. Who and where

| Role | Portal | Path |
|---|---|---|
| Lecturer (host) | https://staff.lesotho.raisd.co | **Classrooms** → module (e.g. GRD301) → **Live class** |
| Student (participant) | https://student.lesotho.raisd.co | **Academic** → **Modules** → module → **Live class** |
| Sign-in | https://sso.raisd.co/login | Prefer Keychain **Open filled** (Lesotho) |

Demo accounts used in captures: **Adam Watson** (lecturer) · **Rizal Hakim** (student) · module **GRD301**.

Join media host: `https://classrooms.raisd.co` (Raisd-branded plugNmeet client, **dark theme only**). Docs pages stay light.

---

## 3. Before you start

1. Sign in with the correct role (lecturer vs student).  
2. Use a module that has a **timetable window open** for live class (Demo includes a rolling window).  
3. Allow camera/microphone when the browser asks (or join as listener).  
4. **Open classroom** shows a preload (“Connecting to virtual classroom…”) while plugNmeet loads in the modal. If the classroom modal cannot use mic/cam, use **Open in new tab** — that **transfers** the call (closes the portal embed, then opens `classrooms.raisd.co` and joins automatically; the classroom tab always keeps the join identity). Auto cloud recording already in progress is **not** restarted by that transfer.

---

## 4. Lecturer — start and host

1. Open Staff Portal → **Classrooms**.  
2. Select the module offering (e.g. Graphic Design / GRD301).  
3. Open the **Live class** tab.  
4. Choose the session if more than one is listed.  
5. Click **Start class**.  
6. The **Virtual classroom** modal opens with plugNmeet. On **Set up microphone and camera**, status under each icon shows Mic/Camera **on**, **off**, or **locked by host**. Use **Turn on microphone and camera**, or **Join with mic and camera off**.  
7. Keep the lobby open behind the modal for **roster**, **Refresh roster**, and **End class**.  
8. Re-open the classroom anytime with **Open classroom**. Closing the modal does **not** end the class.

In the room, footer **Mic** / **Camera** labels sit under those controls; use **More options → Admit students (waiting room)** to let waiting students in. Join/meeting CTAs use the Faid portal button corner radius.

---

## 5. Student — join and leave

1. Open Student Portal → **Academic** → **Modules**.  
2. Open the same module → **Live class**.  
3. Wait until the host has started (Join enables when the session is live).  
4. Click **Join**.  
5. If **waiting room** is on, the join screen title switches to **Waiting room** and explains that the lecturer will admit you — stay on that screen until you enter.  
6. The **Virtual classroom** modal opens. Set mic/cam (status labels under the icons) → join the room.  
7. Refreshing the portal **keeps you in class** (same join URL / classroom identity is restored for the live session). Do not click Join again after refresh unless you intentionally left.  
8. When finished, close the modal if you want, then click **Leave class** in the lobby.

---

## 6. Host features (detailed)

Operational detail matches the [plugNmeet Moderator Guide](https://www.plugnmeet.org/docs/user-guide/moderator) and [YouTube walkthrough](https://www.youtube.com/watch?v=nDsB9fSMzYM). Raisd Classroom is dark-only.

### 6.1 Participants & room

| Feature | How (host) | Capture |
|---|---|---|
| **Participants** | Footer Participants | `30-host-toolbar.png` |
| **Room lock settings** | More options → Lock settings | `31-room-lock-settings.png` |
| **Waiting room** | More options → Admit students | `32`–`35` |
| **Mute everyone** | Participants / More | `36-mute-everyone.png` |
| **Breakout rooms** | More options → Breakout rooms | `37-breakout-rooms.png` |

### 6.2 Collaboration

| Feature | How (host) | Capture |
|---|---|---|
| **Whiteboard** | Footer Whiteboard | `38-whiteboard.png` |
| **Shared notepad** | More options → Shared notepad | `39-shared-notepad.png` |
| **Polls** | More options → Polls | `40-polls.png` |
| **External video / link** | More options | `41`–`42` |
| **Screen Sharing** | Footer Share Screen | `43-screen-share.png` |
| **Chat file share** | Public Chat attach | `49`–`51` |
| **Chat ↔ Community sync** | Real Public Chat ↔ module Community (both directions) + start Join CTA | `22`–`29` |

### 6.2.1 Public Chat ↔ portal Community (Demo Partial)

During a live class, chat stays in sync both ways for the matching **module** Community conversation (`community-group-{moduleOfferingId}`):

- **Classroom → Community:** each sender’s own **Public Chat** line posts via `POST /v1/live-class/chat-mirror` (signed `raisd_mirror` on the Classroom join URL).
- **Community → Classroom:** module Community sends enqueue an outbox; Raisd Classroom pulls `GET /v1/live-class/community-chat` and injects into Public Chat.
- **Start notification:** when the lecturer starts, Community gets an OL-24 system line with a portal Join path. The student dock shows **Lecturer started the live class** + **Join live class** pinned under the conversation header while scrolling, which opens the Live class lobby. Until the classroom embed finishes loading, the lobby shows a **Still connecting — not in the live class yet** banner with a spinner, Join/Open stay on **Connecting…**, and the lecturer roster lists those students as **still connecting (not in class yet)** rather than in class.
- **End clears Join:** after the host **End class** system line (`Class ended …`), the Community **Join live class** CTA is removed so students cannot rejoin that meeting. Lobby **Open classroom** / **Join** also clear once the session phase is `ended` (API already rejects join/start on ended sessions).

Private DMs are not mirrored. Chat stays in Community after End class; Past Class holds transferred media.

| Where | What to look for | Capture |
|---|---|---|
| Student Community (before) | GRD301 module conversation open | `22-chat-mirror-community-before.png` |
| Student Community | Start notification + **Join live class** CTA | `26-chat-sync-start-notification.png` |
| Student Live class lobby | Opened from the Join CTA | `27-chat-sync-join-from-notification.png` |
| Online classroom | Host pre-join with mirror params on the join URL | `23-chat-mirror-classroom-prejoin.png` |
| Online classroom Public Chat | Real lecturer line (assignment brief) | `24-chat-mirror-classroom-sent.png` |
| Student Community (after) | Same lecturer line under **GRD301 Graphic Design 3** | `25-chat-mirror-community-after.png` |
| Student Community | Real student reply | `28-chat-sync-community-sent.png` |
| Online classroom Public Chat | Same student reply after reverse sync | `29-chat-sync-classroom-from-community.png` |

Re-capture:

```bash
INCLUDE_SCREENSHOTS=1 node docs/diagrams/lms-reference/live-class-plugnmeet/capture-chat-mirror.mjs
```

### 6.3 Recording, streaming & AI

| Feature | How (host) | Capture |
|---|---|---|
| **Auto cloud recording** | Starts when host joins (`enable_auto_cloud_recording`); everyone sees a single title-bar **REC** chip while recording | `44a-auto-recording.png` |
| **Cloud / local MP4 recording** | Footer **REC** — cloud (DIV recorder) or local browser recording | `44-recording.png` |
| **RTMP / WHIP live streaming** | More options → Start Live Stream | `45-live-stream.png` |
| **AI Meeting Agent** | More options → AI Tools | `46-ai-tools.png` |
| **Transcription & Translation** | More options → Transcription & Translation | `47-transcription.png` |

---

## 7. End and Past Class

| Who | Action | Result |
|---|---|---|
| Student | **Leave class** | Leaves roster; Past Class history updates |
| Lecturer | **End class** | Ends live phase; media room ends; recordings/artifacts copy into Past Class (lobbies show a visible **Copying recording to the campus server… N%** progress banner until ready); Community gets an end notice (chat already mirrored live) |

### 7.1 Where Past Class lives

Past Class is a panel on the same **Live class** lobby used to start or join — you do not need a separate menu.

| Role | Portal | Path to Past Class |
|---|---|---|
| Lecturer | https://staff.lesotho.raisd.co | **Classrooms** → module (e.g. GRD301) → **Live class** → scroll to **Past Class** |
| Student | https://student.lesotho.raisd.co | **Academic** → **Modules** → module → **Live class** → scroll to **Past Class** |

You can open Past Class **before** a live session (Demo completed timetable fixtures already appear) or **after** Leave / End class. Screenshots: `12-student-past-class.png`, `13-lecturer-ended.png`.

### 7.2 How to open recordings, notes, and shared materials

Each Past Class row shows week, date/time, duration, recording status, and Lecture / Quiz / Assignment tags. Under the row, assets are grouped. Each asset line is a title with its action button aligned in a shared right column (group headings already name the kind). **Date sort (19 Nov 2026):** Past Class defaults to **Newest first** (sessions by start time; Re-watch / Notes / materials by recorded date). Use the panel **Newest first / Oldest first** control, or the **Recorded ↓ / Added ↓** control beside each asset group, to reverse order.

| Group | Button label | What opens |
|---|---|---|
| **Re-watch** | **Re-watch** | Class recording in a **modal player** (Portal-hosted Demo MP4, or cloud recording after End class with plugNmeet via Portal media proxy) |
| **Notes** | **Open notes** | Whiteboard / shared notepad from the live class in a **modal** when plugNmeet transferred an artifact; otherwise the Notes group is empty (no Demo template) |
| **Shared materials** | **Open material** | Week-scoped files for that class only (no invented Demo brief / other-week catalogue); live artifacts when transferred |

Steps:

1. Open the module **Live class** lobby (paths above).
2. Scroll to the **Past Class** panel (optional: set **Newest first** or **Oldest first**).
3. Find the completed session (Demo history shows earlier GRD301 fixtures without needing End class first).
4. Under that session, use the group that matches what you need:
   - **Re-watch** → click **Re-watch** → recording plays in the Past Class modal.
   - **Notes** → click **Open notes** → notes open in the modal.
   - **Shared materials** → review the listed files, then click **Open material** → the file opens in the modal.
5. Use **Open in new tab** in the modal to move the call into `classrooms.raisd.co` (portal embed closes; classroom tab trumps and joins without a second Join click), or **Close** to return to the lobby without ending the class.
6. If a button is missing, that asset has no downloadable `mediaId` yet (status may still be processing or unavailable-demo).

Evidence screenshots: `12b`–`12d` (student re-watch / notes / materials modals), `13b`–`13d` (lecturer).

**Demo Partial note:** without plugNmeet, completed fixtures (including finished terms such as FDN101 2025-JAN) keep a Demo **re-watch** stub in Past Class (`ready-stub`). Past Class does **not** invent Shared notes / assignment-brief HTML. After **End class** with live media, cloud recordings and whiteboard / notepad artifacts appear when transfer lists them.

---

## 8. Screenshots (step order)

See the HTML page for large frames. Files under `docs/diagrams/lms-reference/live-class-plugnmeet/screenshots/`:

| Step | File | Role |
|---|---|---|
| 01–13 | lobby / media modal / Past Class list | Portal + join path |
| 12b–12d | student Past Class asset modals | Re-watch / Open notes / Open material |
| 13b–13d | lecturer Past Class asset modals | Same modal actions on staff lobby |
| 18–21 | conversation | Chat / both in room |
| 22–29 | chat ↔ Community sync | Real messages both ways + start Join CTA → lobby |
| 30–48 | host features | Locks, waiting room, mute, breakouts, whiteboard, notepad, polls, external media, share, REC, stream, AI, transcription, More menu |
| 44a | auto recording | Auto cloud recording after host join |
| 49–51 | file share | Public Chat attach control, host shared file, student receives download |

Re-capture (screenshots only):

```bash
INCLUDE_SCREENSHOTS=1 INCLUDE_VIDEO=0 node docs/diagrams/lms-reference/live-class-plugnmeet/capture.mjs
INCLUDE_SCREENSHOTS=1 INCLUDE_VIDEO=0 node docs/diagrams/lms-reference/live-class-plugnmeet/capture-conversation.mjs
INCLUDE_SCREENSHOTS=1 node docs/diagrams/lms-reference/live-class-plugnmeet/capture-chat-mirror.mjs
INCLUDE_SCREENSHOTS=1 INCLUDE_VIDEO=0 node docs/diagrams/lms-reference/live-class-plugnmeet/capture-host-features.mjs
INCLUDE_SCREENSHOTS=1 node docs/diagrams/lms-reference/live-class-plugnmeet/capture-file-share.mjs
```

When `classrooms.raisd.co` is unreachable, set `PLUGNMEET_JOIN_BASE=https://100.97.217.25:18443` for DIV Tailscale capture.

---

## 9. Known issues — UltaHost interim SFU (20 Nov 2026)

Demo Partial media now runs on the Demo UltaHost VPS (not only DIV). During the cutover:

| Issue | What to do |
|---|---|
| “Connection interrupted. Reconnecting…” looping | Close the classroom modal/tab completely, then **Open classroom** again (loads the LOST-neuter client). Audit: [2026-11-20-ultahost-interim-sfu-reconnect.md](../architecture/audits/2026-11-20-ultahost-interim-sfu-reconnect.md) |
| Mic or camera turns off by itself | Side effect of the same reconnect leave (track unpublished). Re-open after the client fix; click mic/cam if still off |
| Cloud REC / “No recorder” | Expected on this interim box — chromedp recorder stays **off** so the host session stays stable. See [SFU vs chromedp diagram](../../diagrams/classroom-sfu-recorder/) |
| After a Classroom deploy | Always hard-reopen; do not rely on a tab that stayed open |

Compose on the VPS raises LiveKit CPU shares / memory reservation; Jenkins is scaled down during live proof. A dedicated media VPS + UDP TURN remains the Live path.

---

## 10. Demo vs Live

| Demo (today) | Live (not claimed) |
|---|---|
| Shape B tokens + `classrooms.raisd.co` (interim UltaHost SFU) | Production media VPS + Live CAP-26 |
| Process-memory lobby / attendance overlay | Durable `live_class_*` + CMS SoT |
| Auto recording + Past Class history Partial (REC deferred on UltaHost interim) | Policy-backed recording + STT providers |

Status words: [status-language.md](../process/status-language.md).

---

## Related

| Material | Path |
|---|---|
| HTML user guide | [diagrams/guidance/online-class.html](../../diagrams/guidance/online-class.html) |
| Interim SFU reconnect audit | [2026-11-20-ultahost-interim-sfu-reconnect.md](../architecture/audits/2026-11-20-ultahost-interim-sfu-reconnect.md) |
| Capture README | [live-class-plugnmeet/README.md](../../diagrams/lms-reference/live-class-plugnmeet/README.md) |
| Lesotho portal guide | [lesotho-user-guide.md](lesotho-user-guide.md) |
| Online-class options / research | [lms-online-class-options.md](../architecture/lms-online-class-options.md) |
| Infra spike | [lms-video-infra-test.md](../architecture/lms-video-infra-test.md) §7 |
| plugNmeet Moderator Guide | https://www.youtube.com/watch?v=nDsB9fSMzYM |
