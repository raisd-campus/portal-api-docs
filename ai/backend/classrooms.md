# Classrooms — shared memory Demo

Status: verified and activated local memory Demo, 15 October 2026. Demo only; no CMS write, migration or durable file storage. Lecturer aggregate verification remains on hold.

## Verification completed — 15 October 2026

The owner resumed the deferred verification. Student's full gate passed (809 unit,
278 Chromium/41 WebKit cases with existing intentional skips), Lecturer's complete
candidate gate passed (63 tests plus lint/production build), shared checks passed
(21 unit/35 consumer browser), and API/type/metadata/PDF/session regressions passed.
Paired browser and navigation flows passed at 375/768/1440px. All saves/resets used
isolated services. The current user's API/portals and saved Demo state were preserved.
The clean registry 0.7.0 Lecturer build remains blocked by the unreleased AuditTrail;
candidate success does not claim published-package readiness. The resource-projection
fix needs the next separately authorised current API restart. No commit, push,
publication, dependency pin change, migration or deployment.

See the [complete verification receipt](../frontend/student-portal/audits/2026-10-15-classrooms-materials-verification.md) for fixes, commands, evidence and release limitations.

## Same-day session Demo fixture — 15 October 2026, unverified

Owner-approved fixture: Graphic Design 3, offering-semester-2026-aug-grd301,
Tuesday 1 September 2026 (Week 3), Asia/Kuala_Lumpur. The existing 09:00–12:00
session retains its ID. A single additional dated occurrence runs 14:00–16:00,
ID session-demo-offering-semester-2026-aug-grd301-2026-09-01-afternoon, referencing
the existing schedule. This is deliberately supplied Demo data for the conditional
session selector, not inferred campus scheduling policy or a second weekly schedule.
No existing sessions or seeded attendance marks are altered; the extra occurrence
has no pre-recorded attendance. Lecturer and Student use the same canonical graph.
Record/API schemas, Faculty weights and deadlines are unchanged.

The existing local memory API on 8087 was restarted to load this fixture (and the
already prepared Materials metadata changes). Startup reached the listening state;
no tests, lint, separate verification build, browser checks or attendance saves were
run, as requested. Sessions and saved process-memory changes reset; sign in again.
The startup launcher performs its normal runtime bundling. Current portal dev
servers were left running. No migration, hosted write, commit, push or deployment.

## Bundled Demo PDFs — 15 October 2026, unverified

The local memory Materials adapter bundles two generic, clearly labelled PDF assets:
sample lecture notes and a sample assignment brief. Seeded canonical PDF attachments
receive a DEMO-prefixed filename, the actual byte length and SHA-256, while their
material IDs, assessment IDs/weights, week releases, deadlines and persisted graph
remain unchanged. The PDFs explicitly say they are not approved teaching or assessment
content; they are not the missing original campus documents.

The source PDFs live in portal-api/fixtures/materials, with an embedded generated
TypeScript byte manifest for local and bundled API runtimes. The dedicated memory
store lazily rehydrates their scoped descriptors/chunks after each restart. User
uploads, sessions, attendance, submissions and marks still reset; no durable storage
or public static-file URL is added. Unsupported/non-PDF sample metadata stays
explicitly unavailable.

Lecturer and Student use the existing authenticated fileChunk operation and preview/
download components. Student lecture-note responses now include these available file
descriptors while preserving canonical progress and list ordering. Exact registration,
campus/teaching assignment checks, scheduled release denial and session checks are
unchanged. Lecturer remains read-only; no admin/upload write flow is restored.

No API restart, tests, builds, PDF rendering or download/restart verification was run
for this increment at the owner's request. The current running API is unchanged;
bundled PDFs become available after the next separately authorised API restart.


## Experience and ownership

UI refinement (unverified): Today contains today’s sessions only; All is a flat list of assigned offerings with enrolments, code above module name. No enrolment selector, programme headings, leading list icons, next-class card or selector footer buttons. Classrooms title sits in the selector column. Nonzero issues use shared IssueCards; selector scrolling uses shared hidden-scrollbar/fades. Attendance groups navigation by day with a conditional time-range session selector, student avatars and red Not recorded labels; informational banners/helper text are removed without relaxing read-only rules. Tests/builds remain deferred.

**15 October attendance-first UI pass (unverified):** Lecturer now composes Today / All in one shared selector TabbedPagePanel and Attendance / Assessments / Materials / Overview in another. Narrow layouts switch between selector and workspace; Lesson plan and Students tabs are hidden without deleting data. Session radios and complete-roster Submit validation are UI-only in this pass; server partial saves, contracts and the existing memory store remain unchanged until UI approval. Tests/builds/browser checks and current API restart are explicitly deferred. The experience paragraphs below describe the previously verified baseline.

Lecturer `/classrooms` replaces the former Modules workspace. Today shows scheduled sessions and outstanding attendance/marking/publication tasks; Timetable combines assigned sessions; All classrooms retains programme grouping and enrolment filters. The separate Dashboard stays empty. Modules is reserved for future setup, which is not implemented.

Each exact module offering contains Overview, Attendance, Assignments, Lesson plan, Materials and Students. Old `/modules` and nested material URLs redirect, retaining query state; old authoring URLs still normalize to read-only Materials. Community stays mounted; follow-up actions open its existing student conversation.

Only Faculty-owned definitions, canonical sessions, registrations, teaching weeks and applied Materials versions are used. The current canonical graph has topics but no approved lesson-plan body or structured outcomes: the UI explicitly reports those omissions. No session or assessment is invented. Missing calendars block affected assignment/material setup and are explained. Module setup, material editing, scheduling writes, moderation, extensions, leave approvals, announcements, booking and risk scoring remain deferred.

## Shared state and access

`createDemoClassrooms` owns a dedicated process-memory overlay alongside `createDemoMaterials`, enabled when `DEMO_REUSABLE_MATERIALS=true` (Demo stub only — not Live CMS). The overlay may read the Demo graph from memory or Postgres RecordStore; mutable attendance/marks/files stay in process memory. `GET /v1/meta/classrooms` advertises version 1, one MiB chunks, 50 MiB submissions and memory persistence for that overlay. Saved attendance/logs/feedback/files survive portal navigation and sign-out, then reset on API restart. Unsaved Lecturer edits live in session-owned client memory and reset on refresh/logout/account change. Hosted Demo sets the flag in `gitops/apps/portal-api/deployment.yaml`.

Every operation validates the active role and identity. Lecturer access checks campus and exact teaching assignment; Student access checks the exact registration, programme enrolment and offering. Student responses exclude marking drafts and teaching logs. Lecturer browser mock retains read-only classroom details and Materials; connected activities show unavailable guidance. Configured HTTP errors never switch to mock.

Writes are serialized, revision-checked and retry-safe through actor/method/request UUID receipts. A reused UUID with changed data is rejected. Identity changes invalidate late responses; clients dispose temporary preview URLs. The canonical graph/schema version and persisted record tables are unchanged.

## Attendance grouped by day — 15 October 2026, unverified

The approved navigation represents one campus-local scheduled day for the selected
classroom offering. Controls appear in this order: Previous scheduled day, shared
date DropdownSelect, conditional shared session DropdownSelect, Next scheduled day.
Each date appears once and arrows skip dates with no configured sessions. The
session selector appears only for multiple sessions on that day, using supplied
start/end times and a Cancelled suffix where applicable. The date and session selectors share equal widths. The central controls wrap
within narrow content widths while the navigation buttons remain at the ends.

Valid sessionId links select the exact session and its day. Date changes pick the
first applicable non-cancelled session: happening now (start inclusive/end exclusive),
already started with unrecorded attendance, next upcoming, then latest past. Ties
use start time and session ID; an all-cancelled day selects its earliest session.
Initial day choice retains today/outstanding/upcoming/latest-day precedence. The
initial default is pinned to sessionId with a history replacement; explicit changes
use normal browser history and preserve other query parameters. Invalid supplied
session IDs keep the unavailable state until a valid date is chosen.

The roster and separate audit card use the same resolver. Per-session drafts,
corrections, submission, saved history and read-only eligibility remain independent;
navigation does not aggregate or copy attendance. Switching an unsubmitted draft
retains it in existing session-owned client memory. No sessions are generated and
no API/schema, shared component source, package pin or persistence change is made.

Tests, lint, typechecks, builds and browser verification are deferred by owner.
Pending acceptance scenarios: one/multiple sessions per day; current/pending/default
selection and ties; date boundaries in campus time; cancelled/future/empty states;
arrows and first/last dates; exact links, refresh and Back/Forward; independent
drafts, saves and audit trails; narrow wrapping and keyboard dropdown controls.
No API restart, commit, push, migration, publication or deployment was performed.

## Attendance and delivery logs

Present/Absent are the only saved attendance states. Missing records stay Not recorded. Assigned lecturers explicitly save individual or bulk entries for an existing non-cancelled session whose start has arrived. Completed classes are read-only. Corrections require a reason and retain before/after, staff name and server timestamp. Student module attendance and timetable reads apply the same exact-registration overlay and refresh on focus/revisit.

Session delivery logs contain topics covered, unfinished work and follow-up notes. They are revision-checked and restricted to assigned teaching staff. Saving or errors are displayed in PageActionBar; no student read endpoint exposes these notes.

## Submissions and marking

Assignment submission stays one PDF or ZIP, maximum 50 MiB, with existing release, deadline, registration and format eligibility. The advertised transport replaces metadata-only submit/delete RPC writes in this memory Demo. Student uploads bounded one MiB chunks; the server verifies total size, SHA-256, extension and PDF/ZIP signature before publishing the current submission. Uploads expire after 15 minutes, allow two pending uploads per student and reserve against a 512 MiB process budget. Failed uploads can be discarded. Existing seed submission metadata is retained; missing bytes remain explicitly unavailable.

Submissions are addressed by exact registration, learning item and submission version. Both replacement and deletion check the previous version. Original-name downloads verify chunk metadata and SHA-256. Old unreferenced files are discarded; files referenced by published marking history are retained for authorized history. There is no hosted persistence claim.

Lecturers save percentage marks and written feedback privately, then deliberately publish selected drafts. Weights are read-only Faculty values; weighted contribution is calculated server-side. Marking binds to a specific submitted file version, rejecting stale submissions or revisions. A new submission does not inherit a prior mark. Corrections require a reason; published feedback stays visible until republished, retaining prior versions. Student material details expose only published feedback/history and authorized current submission files. Official module/term results are not created or recalculated.

## API operations

All POST operations use `/v1/classrooms/{method}` with bearer sessions and `{result}` responses. Shared Zod boundaries live in Student `src/contracts/classrooms.ts`, mirrored as Lecturer's transport contract; API imports the canonical contract at its existing Node build boundary.

| Method | Audience | Purpose |
|---|---|---|
| workspace | Assigned Lecturer | Canonical classroom/session/roster/assessment reads, saved attendance, drafts, published history and teaching logs |
| saveAttendance | Assigned Lecturer | Revision-checked session entries and correction reason |
| saveLog | Assigned Lecturer | Private session delivery log |
| saveFeedback / publishFeedback | Assigned Lecturer | Save private marks/feedback; atomically publish selected current-submission drafts |
| studentState | Exact Student registration | Published feedback only |
| beginSubmission / submissionChunk / finishSubmission / discardSubmission | Owning Student | Bounded original-file submission lifecycle |
| deleteSubmission | Owning Student | Version-checked deletion under existing submission policy |
| submissionFile | Owning Student or assigned Lecturer | Authorized original file chunks |
| listLiveClassSessions | Registered Student or assigned Lecturer | CAP-26 Demo Partial stub lobby sessions (timetable windows + rolling Demo session) + Past Class history |
| listPastClassItems | Registered Student or assigned Lecturer | Past Class history only (week, duration, tags, recording status, assets) |
| startLiveClass | Assigned Lecturer (host) | Start only inside window; mint stub join URL; open roster |
| joinLiveClass | Registered Student (participant) | Join only inside window after host start; mint stub join URL |
| leaveLiveClass | Joined Student or host | Record leave; mark CAP-12 Demo attendance present for participants |
| endLiveClass | Assigned Lecturer (host) | End live phase; end media room; transfer recordings/artifacts into Past Class; Community end notice |
| getPastClassAssetDownload | Registered Student or assigned Lecturer | Mint short-lived download URL for a Past Class recording/artifact |
| mirrorLiveClassChat | Registered Student or assigned Lecturer | Session-authenticated batch ingest of Public Chat into the module Community conversation (idempotent `pnm:{id}`) |

### Live class → Community chat mirror (7 Nov 2026; transfer 11 Nov 2026)

Demo Partial (not Live CAP-25/26). When `DEMO_COMMUNITY_CHAT=true` and plugNmeet join is minted, Portal API appends `raisd_mirror` + `raisd_api` query params to the Classroom join URL. **Classroom → Community:** Raisd Classroom posts each **sender’s own Public Chat** line to `POST /v1/live-class/chat-mirror` (`X-Raisd-Mirror-Token`) into `community-group-{moduleOfferingId}` (stub CMS ack). **Community → Classroom:** module Community sends enqueue an outbox; the client pulls `GET /v1/live-class/community-chat` and injects into Public Chat. **Start** posts OL-24 system line with a portal Join path (`Video call started…` + `/academic/modules/…?tab=live`); Student Community shows a **sticky Join live class** CTA pinned under the conversation header (header + CTA stick together while scrolling). Clicking it opens the module Live class lobby beside Community and auto-joins (`?autoJoin=1`) into the virtual classroom modal as soon as the host session is live. Join/Start keep a clear **still connecting** state until the classroom embed finishes loading; roster shows `connecting` until `reportLiveClassMediaConnected` (Demo Partial). **End** posts that Past Class holds transferred media and that chat remains in Community. Private DMs are not mirrored. File cards are flattened to plain text. Requires `PORTAL_API_PUBLIC_URL` (e.g. `https://api.lesotho.raisd.co`) and `PLUGNMEET_API_SECRET` (or `LIVE_CLASS_CHAT_MIRROR_SECRET`); CORS must allow `https://classrooms.raisd.co`. Advertised on `GET /v1/meta/classrooms` as `liveClassChatMirror`.

### Auto recording + Past Class transfer (11 Nov 2026)

Room create sets `enable_auto_cloud_recording: true` so cloud recording starts when the host joins (DIV `plugnmeet-recorder` required). **UI branding (17 Nov 2026):** student/staff-facing Classroom copy uses **Raisd Classroom** only — welcome chat and Room settings hide the upstream plugNmeet “Powered by” / vendor name (standup action). **Recording button (20 Nov 2026 / Read.ai 19 Nov):** footer REC stays **solid red** (`bg-Red-600`) in light and dark while capture is active — not gray with a faint border; preparing remains amber until the recorder bot is ready (local capture goes red as soon as started). **Student join waiting-room bounce (17 Nov 2026):** `reportLiveClassMediaConnected` reuses the attendee’s minted join URL (portals also keep the existing `stubJoinUrl`) so reporting embed-ready does not remint a new LiveKit identity and drop the student back into the waiting room. **Waiting-room admit notify (20 Nov 2026 / Read.ai 19 Nov):** Classroom defers NATS registration until the student clicks **Join** on the pre-join Landing — the lecturer’s admit/reject notification and waiting list only appear then, not on iframe load / device setup. Prefer camera on before Join; mic-only / listen-only still allowed so missing camera does not block join. Recorders and “Open in new tab” transfer still auto-join. **Student media after admit (20 Nov 2026):** after lecturer Admit, public students can hit **Connection Error** and never appear in-room — LiveKit signalling may start then ICE dies (`SIGNAL_SOURCE_CLOSE`, no `participant active`) because Demo only forwards **TCP `:7881`** while UDP `50000–50100` / TURN stay closed. Client keeps a healthy waiting-room NATS session (avoids post-admit reconnect flapping) and raises LiveKit `peerConnectionTimeout` to 45s for ICE-TCP; reliable public join still needs UDP TURN / media VPS — see [capacity audit](../architecture/audits/2026-11-18-class-connection-capacity.md). Screen share is enabled on create (`allow_screen_share: true`, `lock_screen_sharing: false`, `only_record_admin_webcams: false`) so the cloud composite is expected to include screen-share tracks the same way as camera media — see [screen-share recording verification (17 Nov 2026)](../architecture/audits/2026-11-17-screen-share-recording.md). The 16 Nov GRD301 sample showed whiteboard chrome in the MP4 with a **black Excalidraw canvas** (chromedp GPU paint gap). **Whiteboard paint-in-recording (17 Nov 2026; white-board share 20 Nov 2026):** Raisd Classroom’s recorder bot keeps a software SVG paint overlay (`wb-recorder-paint`) of the scene so drawings can appear in the full-screen cloud composite; live GPU canvases stay hidden for the bot only. **Whiteboard share sessions force light theme + white canvas + black ink** (room chrome stays dark) and the recorder export remaps near-white strokes so dark-theme ink is visible in MP4. **Re-verify 18 Nov 2026: FAIL** before that paint/theme fix — host UI strokes OK, MP4 still `Page 1` chrome only ([whiteboard Past Class confirm](../architecture/audits/2026-11-18-whiteboard-past-class-confirm.md)); re-check after 20 Nov client deploy. That GRD301 sample was not a screen-share proof. Host mint recreates the media room if an active session is missing that flag. Raisd Classroom starts cloud recording for any admin once the flag is live (not only the presenter). **Open in new tab transfer (13 Nov 2026):** after `raisd_auto_join=1` rejoin, Classroom waits longer for room metadata / recorder-bot presence and skips a second `START_RECORDING` when capture is already running — so moving the host from the portal embed to `classrooms.raisd.co` does not restart recording (standup 12 Nov). **End meet → portal processing (13 Nov 2026):** portal embed / Open in new tab attach `raisd_portal_return` (staff/student Live class URL). After host End meet, Classroom posts `raisd-live-class-ended`, BroadcastChannels open portal tabs, and a top-level classrooms tab redirects to `?tab=live&recording=processing#past-class` so Past Class processing % shows on the portal instead of only a classrooms toast. **Failed START cool-down (13 Nov 2026):** after a failed/timed-out cloud `START_RECORDING`, Classroom waits **90s** before auto re-attempt (up to 3 retries) so a recovering UltaHost edge is not hammered — ops cool-down after VPS self-defence is longer ([ultahost-vps-self-defence.md](../architecture/ultahost-vps-self-defence.md)). **Auto-start race fix (13 Nov 2026):** client waits ~5s and skips START when preparing / RECORDER_BOT already present / “request in progress”, so server `enable_auto_cloud_recording` and the Raisd client do not double-dispatch (that race closed the DIV recorder on `#errorPage`). Recorder chromedp joins via DIV Tailscale `https://100.97.217.25:18443` (not UltaHost hairpin). **Recording awareness (13 Nov 2026; trimmed same day):** while cloud recording is preparing or active, every participant (not the recorder bot) sees a single title-bar **REC** chip beside the room name (banner + on-stage badge removed). Hosts still use the footer recording control. **After End (13 Nov 2026; lobby status live-update same day; copy progress 17 Nov 2026):** Past Class rows with `recordingStatus: processing` expose `recordingProgressPercent` (0–100). The async transfer job keeps `processing` for at least ~10s (even when the cloud MP4 is already listed) so lobbies can paint progress; catalog hydrate will not flip those rows to `ready` while the job is active. Student and Lecturer lobbies show a raised **Copying recording to the campus server… N%** banner (spinner + progress bar) on Virtual Classroom and under the Past Class session, with a local % ticker + sessionStorage so a fast finalize or refresh still shows copy progress; lobbies poll every 3s after Classroom End meet (`raisd-live-class-ended` then Past Class polls). Classroom End meet toasts the same copy-percent summary. On **End class** / host leave **or host End meet inside Raisd Classroom**, Portal API ends the media room, fetches recordings + artifacts, and stores them on the Past Class item (`recordingStatus` `ready` / `ready-stub` / `processing`, `assets[]`, `communityChatLinked`). Classroom End meet uses `POST /v1/live-class/session-end` with `X-Raisd-Mirror-Token` (same mint as chat-mirror) and `postMessage`s `raisd-live-class-ended` to the embedding portal so the modal closes and Past Class refreshes (live on `classrooms.raisd.co` + DIV client dist as of 12 Nov 2026). **End returns immediately** with Past Class `recordingStatus: processing`; an in-process async job polls plugNmeet recordings for up to ~2 minutes and updates Past Class (plus a Community ready notice). Lobby list re-schedules the job if a row is still `processing`. Demo Partial process memory — not a durable worker queue. Portals open assets via `getPastClassAssetDownload` (short-lived media download token). Without plugNmeet env, a just-ended session stays `unavailable-demo`. Shared notepad / whiteboard binary export is limited to whatever plugNmeet lists as artifacts (Past Class **Notes** — Whiteboard / Shared notepad — never an invented Demo lecture-notes HTML stub); chat history relies on the live Community mirror (room chat is cleared when the media room ends). After End, `joinOpen` is false and `joinLiveClass` / `startLiveClass` return 403; Student Community hides the OL-24 **Join live class** CTA once the `Class ended` system line is newer than the start notice, and lobby **Open classroom** clears when phase is `ended`.

**Past Class recording playback (12–13 Nov 2026):** Demo history recordings are served from Portal API (`/v1/demo/past-class-assets?token=…` → bundled `DEMO-class-recording.mp4`) with `Content-Disposition: inline` so the lobby modal `<video>` can play without a third-party host. Live plugNmeet cloud recordings/artifacts use `/v1/past-class-media?token=…` proxy URLs (same inline headers) instead of raw download tokens that often force attachment. Portal proxy tokens go in the **query string** (and Fastify `maxParamLength` is raised) because path tokens with recording UUIDs hit `FST_ERR_MAX_PARAM_LENGTH` and broke inline Re-watch. Upstream plugNmeet file URLs use `/download/recording/{jwt}` (path JWT — not `?token=`). Portal modals fetch media into a blob URL for reliable cross-origin playback.

### Past Class history area (11 Nov 2026 · OL-60-lite)

Alya S1 Demo offerings (e.g. DIG101-A) seed weekly `classSessions` from their class schedules (S1 term `current`); without those rows the Live tab only exposed the rolling Demo window. `listLiveClassSessions` / `listPastClassItems` auto-seed Past Class for **completed** graph sessions and timetable windows already past. History items carry teaching **week** (`weekNumber` / `weekTitle`), **durationMinutes**, tags (`lecture` / …), recording status, and Demo history assets (`ready-stub` with a listed recording). Student and Lecturer Past Class panels show week, duration, camera/recording status, and tags — usable history now; DVD file-grouping design and Faid recording UX remain later. Past Class asset groups (**Re-watch**, **Notes**, **Shared materials**, **Other**) each use a design-system `DataTable` (item · timestamp · Size · action) so multiple rows are distinguishable. Re-watch keeps the primary blue **Re-watch** button; notes/materials use secondary open actions. **Notes / Shared materials (19 Nov 2026):** Past Class does **not** invent Demo HTML (`DEMO-lecture-notes.html` / assignment brief). Completed-history rows keep a Demo **re-watch** stub only. Notes and files appear after **End class** when plugNmeet lists whiteboard / shared-notepad artifacts or transferred media; otherwise those groups stay empty. Module week materials remain on the **Materials** tab. **Recording copy progress (19 Nov 2026):** Portal API owns the transfer job and `recordingProgressPercent` (never decreases; job resume continues from the latest %). Lobbies show **one** Past Class progress banner and poll `listLiveClassSessions` — no client-side fake % ticker, so a page refresh resumes from the server value. **MEETING_ANALYTICS (19 Nov 2026):** plugNmeet still writes analytics JSON after End, but Past Class **does not** list `MEETING_ANALYTICS` rows — they open blank in the asset modal (no CAP analytics viewer yet) and empty rooms are `users:[]` / `events:[]`. **Date sort (19 Nov 2026):** API lists Past Class newest session-start first; staff/student lobbies add **Newest first / Oldest first** sorting for sessions and for Re-watch / Notes / materials by recorded date. **Completed-term history (19 Nov 2026):** Demo timetable remapping keeps **historical** completed weeks in the graph (for Past Class `ready-stub` re-watch) while still padding open retest windows for current + completed offerings — so classrooms such as FDN101 (2025-JAN) show Past Class without needing End class first. **Past Class row chrome (19 Nov 2026):** history stubs no longer repeat a long Demo/plugNmeet note + Community line on every week — one panel intro covers Re-watch / Community; rows keep title, time, week, short status, and asset tables. **Shared materials stay week-scoped** to that class session (standup 16 Nov): Past Class does not invent a generic Demo assignment-brief placeholder or dump other weeks’ module catalogue into the recording materials list. Demo Partial ≠ Live CAP-26.

### CAP-26 stub live class (5 Nov 2026) · plugNmeet Shape B (6 Nov 2026)

Process-memory Demo lobby — no durable `live_class_*` tables, not Live CAP-26. Browser talks only to `POST /v1/classrooms/{method}`. Without media env, join URLs stay `https://stub.raisd.demo/live/{sessionId}?role=…`. With `PLUGNMEET_API_URL` / `PLUGNMEET_API_KEY` / `PLUGNMEET_API_SECRET` (optional `PLUGNMEET_JOIN_BASE`), Portal API mints plugNmeet room tokens server-side (`portal-api/src/plugnmeet.ts`) and returns them in `stubJoinUrl` (Shape B). Each mint uses a unique LiveKit `user_id` (`{personId}__{hex}`) so the same Raisd person can join from two browsers/devices without LiveKit `DUPLICATE_IDENTITY` kicking the first session (standup 10 Nov 2026). Reusing the **same** join URL in a portal iframe and a `classrooms.raisd.co` tab still shares one identity: **Open in new tab** unloads the embed first, opens with `raisd_auto_join=1` so Classroom skips pre-join, and broadcasts a same-origin trump so top-level `classrooms.raisd.co` always takes over (standup 12 Nov 2026). **Open classroom** remints a fresh Shape B join (`isRoomActive` → `create` if needed → token) so plugNmeet `empty_timeout` / media restarts do not leave a stale “room is not active” URL; host remint does not post a second Community start line. **Start/Join tunnel blip (19 Nov 2026):** plugNmeet API calls use an 8s timeout with **one retry**; transport failures are **not** treated as “room inactive” (that previously queued a doomed `create` and surfaced as a ~16s lobby **Virtual classroom is unavailable** / 502). Lecturer lobby refresh remints the host join when restoring an open classroom. Room `empty_timeout` is 4h to match Demo token validity. Community chat mirror still attributes with the stable person id from `raisd_mirror`. Renewed Classroom join tokens are persisted to `sessionStorage` + the URL so refresh does not fall back to an expired original join link (standup 10 Nov 2026); DIV `token_validity` is **4h** for Demo. Room create uses `raisdClassroomRoomMetadata`: waiting room (default student message names the lecturer), breakouts (up to 16), whiteboard, shared notepad, polls, screen share / external media / external links, recording + RTMP flags with **auto cloud recording on host join**, analytics, raise-hand, and Insights/AI feature flags. Hosts join with `is_admin` so mute/lock/admit controls appear in the client. Pre-join and waiting-room copy use classroom language (mic/camera on·off·locked status, Admit students) so live-class controls are clearer (standup 10 Nov 2026). Student and Lecturer lobbies persist the live join URL in `sessionStorage` for the tab so a portal refresh restores the classroom modal with the **same** join token / LiveKit identity instead of reminting (which previously felt like a kick-out into waiting room) (standup 10 Nov 2026). **Server deps (7 Nov 2026):** DIV Colima runs `plugnmeet-recorder` (`node_01`) and `livekit/ingress` (RTMP `:1935`, WHIP `:8089`). Insights uses **DIV local MLX** (OpenAI-compatible): dedicated Qwen3-4B on `:8011` via host proxy `:8010` → Colima `http://192.168.64.1:8010/v1` for AI text chat, meeting summarization, and text translation. Live speech transcription / spoken translation are **not** enabled (no realtime Whisper on DIV). Spike host: MGP DIV — see [lms-video-infra-test.md](../architecture/lms-video-infra-test.md) §1.1 / §7. Public join host: `https://classrooms.raisd.co` (Raisd-branded `plugnmeet-client`; Demo Partial). Lecturer Classrooms **Live class** tab and Student module **Live class** tab render the Raisd lobby (OL-10–14). After **Start** / **Join**, portals open a full-viewport **Virtual classroom** modal that embeds the join URL in an iframe (camera/mic permissions allowed); **Open in new tab** remains the fallback when iframe WebRTC is blocked. Closing the modal returns to the lobby without Leave/End. Timetable gate is server-enforced. Advertised on `GET /v1/meta/lms` as Partial. See [lms-online-class-options.md](../architecture/lms-online-class-options.md) §6.

### UltaHost interim SFU cutover (20 Nov 2026 evening)

Demo Partial media path moved onto the Demo UltaHost VPS (`/opt/raisd-classroom`, `docker-compose.ultahost.yaml`) so public `classrooms.raisd.co` no longer depends on DIV Tailscale for the SFU. LiveKit advertises `node_ip: 38.127.216.221` with UDP `50000–50100` and TCP `:7882`; Caddy `:18480` terminates NATS `/ws` + LiveKit `/rtc` behind Traefik/tunnel-proxy.

**Issues seen after cutover**

| Symptom | Cause |
|---|---|
| “Connection interrupted. Reconnecting…” ~every 17s | LiveKit client **LOST quality → full reconnect** (`CLIENT_REQUEST_LEAVE`) under VPS steal / host contention |
| Mic / camera turn off after Join | Same leave cycle **unpublishes** tracks; not `muteOnStart` |
| Cloud REC fails / “No recorder” | Chromedp recorder on the same 4 vCPU box (~180% CPU) fights the host; REC **deferred** on this interim |
| “Increase container CPU/RAM” | Containers already had **no** Docker caps; LiveKit idle use is tiny — use `cpu_shares` / `mem_reservation` / stop Jenkins+recorder instead |

**Mitigations shipped:** client LOST reconnect neutered in the served i18n bundle + reconnect toast suppressed + `enableAdaptiveMedia: false`; LiveKit compose `cpu_shares: 2048`, `mem_reservation: 1g`, `shm_size: 512mb`, `oom_score_adj: -500`, `nice -10`; Jenkins scaled to 0 during proof; lecturer lobby skips 15s/3s polls while the Classroom embed is open. After any client deploy, hosts must **close and reopen** the classroom (cached JS keeps the old loop). Full audit: [2026-11-20-ultahost-interim-sfu-reconnect.md](../architecture/audits/2026-11-20-ultahost-interim-sfu-reconnect.md). **SFU vs chromedp co-location diagram:** [classroom-sfu-recorder/](../../diagrams/classroom-sfu-recorder/) (LiveKit and the cloud-REC bot must not share the same small VPS). Dedicated media VPS + UDP TURN remain the Live path ([capacity audit](../architecture/audits/2026-11-18-class-connection-capacity.md)).

**Hosted Demo proof (Lesotho):** Lecturer Start → modal classroom → Student Join → modal classroom → Leave / End → Past Class stub. Per-screen guide: [live-class-stub/README.md](../../diagrams/lms-reference/live-class-stub/README.md) · gallery [lms-online-class-options.html#demo-stub](../../diagrams/lms-online-class-options.html#demo-stub).
**User guide (screenshots + video):** [online-class-user-guide.md](../frontend/online-class-user-guide.md) · [HTML](../../diagrams/guidance/online-class.html).
**plugNmeet DIV walkthrough (6 Nov 2026):** Raisd lobby + Shape B tokens + pre-join — page [live-class-plugnmeet/index.html](../../diagrams/lms-reference/live-class-plugnmeet/index.html) · gallery [#demo-plugnmeet](../../diagrams/lms-online-class-options.html#demo-plugnmeet) · [lms-video-infra-test.md](../architecture/lms-video-infra-test.md) §7.

Materials remains read-only and independently enforces teaching-week start release using server time. No Classrooms operation can author plans, change weights or publish Materials.

## Verification and activation — 15 October 2026

Local verification passed: API Classrooms scenarios, 72 Materials checks, 20 exact-offering roster checks, 46 Community checks and API local typecheck; Lecturer lint/TypeScript/build, canonical snapshot parity and 56 focused tests; Student full check:all with 808 unit/component tests, 278 Chromium cases (46 intentional skips) and 41 WebKit cases (31 intentional skips). Lecturer aggregate verification remains on hold. Paired original submission → Lecturer preview/download/mark → Student published feedback, shared attendance, private logs/drafts, revisions, conflict/reload recovery, exact bytes, authorization, browser-mock separation and HTTP failure handling passed. Responsive checks cover 375/768/1440px, Back/keyboard navigation, Community preservation and temporary URL cleanup.

Current local API 8087 was restarted once after verification, and Lecturer 5173 / Student 5175 were refreshed and signed in against the shared memory Demo. API restart resets saved Demo mutations/files and sessions; local credentials and canonical sample records are retained. GRD301's sample assignment deadlines are in the past, so current submission locks remain; the complete submission/marking flow was verified using an isolated September 2026 clock. No deadline was shifted for activation. No package change/publication, migration, hosted write, commit, push or deployment. Isolated verification servers were stopped.

Verification corrected an unavailable checkbox import, editable DetailField slot usage, campus-offset/UTC comparisons, duplicate tab history entries, stale-form reload recovery and publication selection isolation. Original-file descriptors are normalized before comparison; cached Lecturer files and completed-upload retries recheck access. Failed saves preserve dirty edits; explicit reload adopts the latest server revision. No shared component changes were needed.

Evidence remains in Student's ignored `logs/classrooms-verification/` receipts/captures, `logs/classrooms-student-full-gate-final.log`, focused API/portal logs, and the checked-in focused regression sources. The Student-owned published-feedback catalogue card has three reviewed captures with uncommitted synthetic-Demo provenance; both local catalogues validate 191 captures. These local assets have not been published.
