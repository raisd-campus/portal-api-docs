# Online class — user guide (Demo Partial)

**As of:** 7 November 2026  
**Status:** **Demo Partial** — not Live CAP-26. Sample / session data only.  
**Browse (docs.raisd.co):** [Online class user guide](https://docs.raisd.co/diagrams/guidance/online-class.html)  
**Walkthrough captures:** [live-class-plugnmeet/](../../diagrams/lms-reference/live-class-plugnmeet/)  
**Capability:** [CAP-26](../../sdd/11-capability-catalog.md) · Classrooms API: [classrooms.md](../backend/classrooms.md)  
**Moderator reference:** [plugNmeet Moderator Guide (YouTube)](https://www.youtube.com/watch?v=nDsB9fSMzYM) · [Moderator docs](https://www.plugnmeet.org/docs/user-guide/moderator)

---

## 1. What this guide is for

Use this guide to run a **Demo online class** on Lesotho Raisd portals and the dark Raisd Classroom (`classrooms.raisd.co`):

1. **Lecturer** starts the live class from Classrooms  
2. Both open the **virtual classroom** (plugNmeet)  
3. Host uses **participant, collaboration, recording & AI** tools  
4. **Student** joins (waiting room when enabled) from the module Live class tab  
5. Leave / End and see Past Class

Do **not** treat this as Live production training. Media is Demo Partial on borrowed DIV + `classrooms.raisd.co`.

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
4. If the classroom modal cannot use mic/cam, use **Open in new tab**.

---

## 4. Lecturer — start and host

1. Open Staff Portal → **Classrooms**.  
2. Select the module offering (e.g. Graphic Design / GRD301).  
3. Open the **Live class** tab.  
4. Choose the session if more than one is listed.  
5. Click **Start class**.  
6. The **Virtual classroom** modal opens with plugNmeet. Set mic/cam preferences → **Join**.  
7. Keep the lobby open behind the modal for **roster**, **Refresh roster**, and **End class**.  
8. Re-open the classroom anytime with **Open classroom**. Closing the modal does **not** end the class.

In the room, use the footer toolbar and **More options** for the host features below.

---

## 5. Student — join and leave

1. Open Student Portal → **Academic** → **Modules**.  
2. Open the same module → **Live class**.  
3. Wait until the host has started (Join enables when the session is live).  
4. Click **Join**.  
5. If **waiting room** is on, wait until the host Approves / Admit All.  
6. The **Virtual classroom** modal opens. Set mic/cam → join the room.  
7. When finished, close the modal if you want, then click **Leave class** in the lobby.

---

## 6. Host features (detailed)

Operational detail matches the [plugNmeet Moderator Guide](https://www.plugnmeet.org/docs/user-guide/moderator) and [YouTube walkthrough](https://www.youtube.com/watch?v=nDsB9fSMzYM). Raisd Classroom is dark-only.

### 6.1 Participant & room management

| Feature | How (host) | Capture |
|---|---|---|
| **Meeting Lock Settings** | More options → Meeting Lock Settings — lock mic, camera, screen share, whiteboard, notepad, reactions, chat (public / send / files / private) | `31-room-lock-settings.png` |
| **Waiting Room** | More options → Manage Waiting Room — Approve / Reject / Deny & Block; Admit All / Remove All; waiting message | `32`–`35` |
| **Mute controls** | More options → Mute Everyone; or mute per participant on the Participants list | `36-mute-everyone.png` |
| **Breakout Rooms** | More options → Manage Breakout Rooms — create rooms, assign manually/randomly, timers, return to main | `37-breakout-rooms.png` |

### 6.2 Collaboration & presentation

| Feature | How (host) | Capture |
|---|---|---|
| **Chat file upload & share** | Public Chat → paperclip / paste image / drag-and-drop (≤50&nbsp;MB; jpg/png/pdf/docx/txt/xlsx/pptx/zip/mp4/webm/mp3). Peers download from the chat card. Host can lock via Meeting Lock Settings → chat files | `49`–`51` |
| **Mirror into classroom chat** | Public Chat lines (and the “Video call started” system line) are copied into the module **Community** classroom conversation for the offering — Demo Partial stub CMS, not Live | Community module chat |
| **Interactive Whiteboard** | Footer Whiteboard (or More options) — draw, office files, export; AI text-to-diagram when Insights AI is on | `38-whiteboard.png` |
| **Shared Notepad (BlockNote)** | More options → Enable Shared Notepad | `39-shared-notepad.png` |
| **Polls & Surveys** | More options → Enable polls | `40-polls.png` |
| **External video / link** | More options → Play External Video / Share External Link | `41`–`42` |
| **Screen Sharing** | Footer Share Screen | `43-screen-share.png` |

### 6.3 Recording, streaming & AI

| Feature | How (host) | Capture |
|---|---|---|
| **Cloud / local MP4 recording** | Footer **REC** — cloud (DIV recorder) or local browser recording; analytics on room close (Partial) | `44-recording.png` |
| **RTMP / WHIP live streaming** | More options → Start Live Stream — YouTube / Facebook / OBS | `45-live-stream.png` |
| **AI Meeting Agent** | More options → AI Tools — assistant chat + meeting summarization | `46-ai-tools.png` |
| **Transcription & Translation** | More options → Transcription & Translation — captions / spoken languages | `47-transcription.png` |

---

## 7. End and Past Class

| Who | Action | Result |
|---|---|---|
| Student | **Leave class** | Leaves roster; Past Class stub appears |
| Lecturer | **End class** | Ends live phase for everyone; Past Class stub (“Recording unavailable in Demo” unless a recording was published) |

---

## 8. Videos

| Video | What it shows |
|---|---|
| [walkthrough-full.webm](../../diagrams/lms-reference/live-class-plugnmeet/video/walkthrough-full.webm) | Lecturer Start → media → Student Join → Leave/End (2× playback encode) |
| [walkthrough-lecturer-and-media.webm](../../diagrams/lms-reference/live-class-plugnmeet/video/walkthrough-lecturer-and-media.webm) | Lecturer path only (2×) |
| [walkthrough-student-and-media.webm](../../diagrams/lms-reference/live-class-plugnmeet/video/walkthrough-student-and-media.webm) | Student path only (2×) |
| [conversation-online.webm](../../diagrams/lms-reference/live-class-plugnmeet/video/conversation-online.webm) | Both in room + Public Chat (2×) |
| [features-walkthrough.webm](../../diagrams/lms-reference/live-class-plugnmeet/video/features-walkthrough.webm) | Host features: locks, waiting room, breakouts, whiteboard, notepad, polls, REC, RTMP, AI (2×) |

Embedded on the HTML guide: [online-class.html](../../diagrams/guidance/online-class.html).

---

## 9. Screenshots (step order)

See the HTML page for large frames. Files under `docs/diagrams/lms-reference/live-class-plugnmeet/screenshots/`:

| Step | File | Role |
|---|---|---|
| 01–13 | lobby / modal / Past Class | Portal + join path |
| 18–21 | conversation | Chat / both in room |
| 30–48 | host features | Locks, waiting room, mute, breakouts, whiteboard, notepad, polls, external media, share, REC, stream, AI, transcription, More menu |
| 49–51 | file share | Public Chat attach control, host shared file, student receives download |

Re-capture features:

```bash
INCLUDE_SCREENSHOTS=1 INCLUDE_VIDEO=1 node docs/diagrams/lms-reference/live-class-plugnmeet/capture-host-features.mjs
INCLUDE_SCREENSHOTS=1 node docs/diagrams/lms-reference/live-class-plugnmeet/capture-file-share.mjs
```

---

## 10. Demo vs Live

| Demo (today) | Live (not claimed) |
|---|---|
| Shape B tokens + `classrooms.raisd.co` | Production media VPS + Live CAP-26 |
| Process-memory lobby / attendance overlay | Durable `live_class_*` + CMS SoT |
| Recording / AI Partial on DIV | Policy-backed recording + STT providers |

Status words: [status-language.md](../process/status-language.md).

---

## Related

| Material | Path |
|---|---|
| HTML user guide | [diagrams/guidance/online-class.html](../../diagrams/guidance/online-class.html) |
| Capture README | [live-class-plugnmeet/README.md](../../diagrams/lms-reference/live-class-plugnmeet/README.md) |
| Lesotho portal guide | [lesotho-user-guide.md](lesotho-user-guide.md) |
| Online-class options / research | [lms-online-class-options.md](../architecture/lms-online-class-options.md) |
| Infra spike | [lms-video-infra-test.md](../architecture/lms-video-infra-test.md) §7 |
| plugNmeet Moderator Guide | https://www.youtube.com/watch?v=nDsB9fSMzYM |
