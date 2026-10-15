# Notifications service

**Status:** Demo — outbound email via CMS mailbox.  
**Repo:** [`raisd-campus/notifications`](https://github.com/raisd-campus/notifications)  
**Host:** `https://notify.raisd.co`  
**Upstream SMTP:** `mail.raisd.co:465` as `Limkokwing <noreply@raisd.co>` (CMS notification mailbox). Templates use Limkokwing black/white brand + wordmark.

## Role

Central send API for Raisd services (SSO magic links, future Portal API / CMS hooks). Portals do not call it directly; services use a shared `NOTIFY_SERVICE_TOKEN`.

```text
SSO / Portal API / CMS tooling
        │  x-notify-service-token
        ▼
 notify.raisd.co  ──SMTP──►  mail.raisd.co (UltaCP)
                              From: Limkokwing <noreply@raisd.co>
```

## API (v0.2)

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/health` | none | Liveness |
| `GET` | `/v1/meta` | none | From address, SMTP host, template ids |
| `GET` | `/v1/templates` | none | Full template catalogue |
| `POST` | `/v1/templates/preview` | none | Render subject/text/html without sending |
| `GET` | `/v1/ready` | none | `transport.verify()` against SMTP |
| `POST` | `/v1/send/template` | `x-notify-service-token` | **Preferred** — `{ templateId, to, vars }` |
| `POST` | `/v1/send` | token | Raw `{ to, subject, text?, html? }` escape hatch |
| `GET` | `/v1/dev/last-send` | token | Last send metadata (no bodies) |

Templates (SoT `design-system/email/`): `magic_link`, `applicant_submitted`, `enrolment_accepted`, `learner_access_granted`, `transactional_generic`.  
Catalogue: [email-templates.md](https://github.com/raisd-campus/design-system/blob/main/docs/email-templates.md) · published [design-system/email-templates.html](../../design-system/email-templates.html).

Callers: SSO magic link + learner create; Portal API submit/enrol. Contract: [`openapi-notifications.yaml`](../../../openapi-notifications.yaml).

## Credentials (never commit)

| File | Contents |
|---|---|
| `control-plane/.credentials/notify-smtp.env` | `SMTP_HOST/PORT/USER/PASS/FROM` (+ IMAP notes for ops) |
| `control-plane/.credentials/notify-service-token` | Shared secret for `/v1/send` |

Deploy injects SMTP env into the k8s Deployment via `kubectl set env` (not in git YAML).

## Deliverability (anti-spam)

Checked 15 Oct 2026:

| Check | Result |
|---|---|
| `mail.raisd.co` A | `146.103.45.1` DNS-only (not Cloudflare-proxied) |
| PTR | `146.103.45.1` → `cp8.sgp1.ultacp.com` |
| SPF (`raisd.co` TXT) | includes `ip4:146.103.45.1/32` |
| DKIM | `dkim._domainkey.raisd.co` published |
| DMARC | `_dmarc.raisd.co` `p=none` (rua → faisal@raisd.co) |
| SMTP auth | 465 SSL + 587 STARTTLS OK for `noreply@raisd.co` |

Notes:

- Port **465** uses **implicit TLS** (not STARTTLS). STARTTLS is available on **587**; the service defaults to 465/`SMTP_SECURE=true`.
- `email.raisd.co` was Cloudflare-proxied; mail hosts must stay DNS-only. Prefer `mail.raisd.co` for SMTP/IMAP clients.
- MX for `raisd.co` includes `cp8.sgp1.ultacp.com` (same IP as `mail.raisd.co`). Do not point MX at the VPS (`38.127.216.221`).
- Service host `notify.raisd.co` is an **API** A→VPS; it does not send mail from the VPS IP (SMTP client → UltaCP).

## Deploy

```bash
# from control-plane
bash scripts/deploy-vps.sh notify
# smoke (sends to NOTIFY_SMOKE_TO or iman.suherman@raisd.co)
bash ../notifications/scripts/smoke.sh
```

## Related

- [sso.md](sso.md) — magic links call notifications when `NOTIFY_BASE_URL` is set  
- [vps-topology.md](../architecture/vps-topology.md) — `notify.raisd.co`  
- CMS historical email path: Lesotho `OnlineAppEmailNotification` (gap vs Applicant Demo)
