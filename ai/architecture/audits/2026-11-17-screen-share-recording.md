# Screen share in class recordings — verification (17 Nov 2026)

**Standup action (Read.ai 16 Nov):** *Iman Suherman will test whether screen sharing is captured in class recordings.*

**Status:** Config + sample-recording inspection done. Full pixel E2E (share distinctive desktop → End → Past Class re-watch) still needs a short interactive host pass (OS display picker).

## Verdict

| Surface | Result |
|---|---|
| Room allows screen share | **Pass** — `allow_screen_share: true`, `lock_screen_sharing: false` |
| Cloud auto-record on | **Pass** — `enable_auto_cloud_recording: true`, `only_record_admin_webcams: false` |
| Recorder model | **Expected Pass for screen share** — DIV `plugnmeet-recorder` (chromedp) joins as `RECORDER_BOT` and composites `#main-area`, which mounts LiveKit `screen_share` video (`.screen-share-video` / `remote-screen-share`) when someone is sharing |
| Whiteboard in saved MP4 (16 Nov GRD301) | **Fail on that sample** — frames show whiteboard chrome (`Page 1`, collaborator cursor) but a **black canvas**. **Mitigation shipped 17 Nov** (`wb-recorder-paint` in client). **Re-verify 18 Nov: still FAIL** in MP4 (live host strokes OK; composite still `Page 1` only) — [2026-11-18-whiteboard-past-class-confirm.md](./2026-11-18-whiteboard-past-class-confirm.md) |
| Fresh automated share→record pixel proof | **Not completed this session** — Playwright join stalled on classrooms **Connecting…**; `getDisplayMedia` still needs an interactive OS picker on this Mac |

**Practical answer for standup:** Screen share is **configured and expected to be in the cloud composite** (same path as camera/media). It is **not the same bug as whiteboard** (whiteboard content failed to paint in the 16 Nov recording). Confirm with one interactive share of a bright marker page before treating the gap as closed.

## Evidence gathered

1. **Unit:** `portal-api/tests/plugnmeet-room-features.ts` asserts screen-share + cloud-record flags (including `only_record_admin_webcams: false`).
2. **Live catalog:** Listed recent DIV recordings via plugNmeet `recording/fetch` (hosts reachable: `classrooms.raisd.co`, Tailscale DIV).
3. **Sample file:** Downloaded `session-schedule-offering-semester-2026-aug-grd301-2026-11-16` (~230s, 1280×720). Extracted frames under `/tmp/raisd-screen-share-test/frame_*.jpg` — whiteboard UI only, black content plane.
4. **Probe room:** Created `raisd-ss-test-*` with screen share + auto cloud record enabled (ended after probe; no durable Past Class row expected outside Portal API session).

## Interactive confirmation (≈5–8 min)

1. Lecturer Start on Lesotho Staff Live class (or open a mint join on `classrooms.raisd.co`).
2. Wait for REC / cloud recorder bot.
3. Open a full-screen page with unique text (e.g. `RAISD_SS_MARKER_17NOV` on a saturated background).
4. Classroom footer → **Share Screen** → share that window/screen for ≥30s.
5. End class → wait Past Class processing % → **Re-watch**.
6. Pass if the marker text/colour is visible in the MP4; fail if only webcam/black/whiteboard chrome.

## Related

- Whiteboard paint-in-recording: client fix in `plugnmeet-client` (`useRecorderWhiteboardPaint` + `exportWhiteboardPaintSvg`); DIV client dist synced 17 Nov. Still Demo Partial until a fresh Past Class re-watch confirms drawings in the MP4.
- Server capacity / intermittent connection still affect capture reliability (same standup). Follow-up capacity vs ICE audit: [2026-11-18-class-connection-capacity.md](2026-11-18-class-connection-capacity.md).
