# Classroom SFU vs chromedp recorder

**Published:** https://docs.raisd.co/diagrams/classroom-sfu-recorder/  
**Knowledge:** [2026-11-20 UltaHost interim SFU audit](../../ai/architecture/audits/2026-11-20-ultahost-interim-sfu-reconnect.md)

Explains **“SFU not co-located with chromedp”**: LiveKit (live class media) and the headless Chrome cloud-recorder bot must not share the same small VPS.

## Render PNGs

```bash
cd docs/diagrams/classroom-sfu-recorder
cat > /tmp/mmdc-puppeteer.json <<'EOF'
{"executablePath":"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome","args":["--no-sandbox"]}
EOF
mkdir -p images
for f in mermaid/*.mmd; do
  base=$(basename "$f" .mmd)
  mmdc -i "$f" -o "images/${base}.png" -b white -w 1400 -s 2 -p /tmp/mmdc-puppeteer.json
done
```

| Source | Image |
|---|---|
| `mermaid/01-colocated-bad.mmd` | `images/01-colocated-bad.png` |
| `mermaid/02-split-target.mmd` | `images/02-split-target.png` |
