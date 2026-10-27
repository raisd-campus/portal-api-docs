# Demo role playback videos

Per-scene WebM clips for [demo-role-playback.html](../demo-role-playback.html).

## Re-record

From the control-plane repo root (requires Playwright browsers + `.credentials/`):

```bash
node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs
node docs/diagrams/old-cms-lesotho/record-playback-videos.mjs --only=app-signin,bur-pay
```

Writes `{sceneId}.webm`, optional `{sceneId}.poster.jpg`, and `manifest.json`.
