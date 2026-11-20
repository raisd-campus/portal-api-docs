# Whiteboard → Past Class MP4 confirm (18 Nov 2026)

**Ask:** Draw on whiteboard during a live class, End, confirm strokes appear in the cloud recording / Past Class re-watch.

**Status:** **FAIL (Demo Partial)** — host UI shows strokes; cloud MP4 shows whiteboard chrome (`Page 1`) only. Same failure class as the 16 Nov GRD301 sample.

**Evidence:** `docs/diagrams/lms-reference/live-class-plugnmeet/evidence/2026-11-18-whiteboard-past-class-confirm/`

| Artifact | Result |
|---|---|
| `01-whiteboard-live.png` / `02-whiteboard-held.png` | **Pass** — `WB-VERIFY-18NOV` + rectangle visible while REC active |
| `recording.mp4` / `recording-final.mp4` (rooms `raisd_wb_verify_1794944346818`, `raisd_wb_verify_1794944565920`) | **Fail** — frames are dark canvas + `Page 1`; no bright/color ink |
| Corrected frame heuristic (`bright` / `colorful`) | **FAIL** (earlier `nonblack`/`mean` check was a false PASS on dark empty UI) |

## What is deployed

| Piece | State |
|---|---|
| Raisd Classroom `wb-recorder-paint` (SVG overlay for `RECORDER_BOT`) | **In DIV `client/dist`** (chunk `whiteboard.4okadRUE.js`, built/synced 18 Nov 05:52 AEDT) |
| `plugnmeet-recorder` chromedp join | `http://100.97.217.25:18480/?access_token=` — on-box edge OK |
| Auto cloud recording | Starts; raw + post-transcode MP4 written under `recording_files/node_01/<room>/` |

## Interpretation

1. Host Excalidraw scene is fine (live screenshots).
2. Recorder composite still captures an **empty** whiteboard page (DOM chrome only). Either `RECORDER_BOT`’s collaborative scene never receives the strokes, or the SVG paint overlay stays empty / hidden (`:empty { display: none }`) so chromedp keeps the black GPU canvas.
3. Mitigation from [2026-11-17-screen-share-recording.md](./2026-11-17-screen-share-recording.md) is **shipped in client** but **not confirmed in MP4** on this re-verify.

## Next (Demo Partial)

1. Instrument `RECORDER_BOT` console for `recorder whiteboard paint failed` / scene element counts while host draws.
2. Confirm Yjs/NATS whiteboard sync reaches hidden recorder identity; force donor sync if needed.
3. Keep verify script heuristic on **bright/colorful** ink (not charcoal `nonblack`).
4. **20 Nov client:** whiteboard share forces **light theme + white canvas + black ink** (and recorder SVG paint remaps near-white strokes) so dark-room chrome no longer records an empty black plane — re-verify MP4 after deploy.

## Related

- Public media path (TCP `:7881` via Demo VPS) — separate; see capacity audit update 18 Nov.
- Verify runner: `docs/diagrams/lms-reference/live-class-plugnmeet/verify-whiteboard-recording.mjs`
