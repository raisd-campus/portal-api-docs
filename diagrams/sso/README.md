# Raisd SSO — identity & login channels

**Published:** https://docs.raisd.co/diagrams/sso/  
**Markdown SoT:** [docs/ai/backend/sso.md](../../ai/backend/sso.md)  
**Contract:** [openapi-sso.yaml](../../../openapi-sso.yaml)

How Demo SSO authenticates (password, passkey, Google OIDC), stays invite-only on email identity, and hands portals a code / role picker. All flowcharts are left-to-right (`flowchart LR`).

## Render PNGs

```bash
cd docs/diagrams/sso
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
| `mermaid/01-sso-in-stack.mmd` | `images/01-sso-in-stack.png` |
| `mermaid/02-login-channels.mmd` | `images/02-login-channels.png` |
| `mermaid/03-google-oauth-sequence.mmd` | `images/03-google-oauth-sequence.png` |
| `mermaid/04-secrets-and-enable.mmd` | `images/04-secrets-and-enable.png` |
