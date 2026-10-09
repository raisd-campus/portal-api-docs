# Cambodia QR + Verification systems — CMS integration

**Standup:** CMS 2026 Daily Stand-up 7 Oct 2026 — *Mohd. Paramasvara will send Iman the Cambodia QR-system code; Iman will review how the QR system works and update the CMS documentation.*  
**Unblocked:** WhatsApp 8 Oct 2026 — Vara shared QR System + Verification Drive packs and pointed at the CMS Cambodia call site.  
**Inventory closed:** 8 October 2026 — CMS call site + QR System (CI4 + `qrcode.sql`) + Verification front controller.  
**GitHub Pages (full detail):** [`diagrams/old-cms-cambodia/certificate-qr.html`](../../diagrams/old-cms-cambodia/certificate-qr.html) · live: [portal-api-docs …/certificate-qr.html](https://raisd-campus.github.io/portal-api-docs/diagrams/old-cms-cambodia/certificate-qr.html).

## Sources (outside git)

| Pack | Drive | Local | Inventory |
|---|---|---|---|
| CMS Cambodia (code + DB) | [1iTKUKqR…](https://drive.google.com/file/d/1iTKUKqREd4dzJ5tXWKCO71Qn5Rl4Xp6v/view?usp=drive_link) (7 Oct) | `raisd/_local/cambodia-cms-2026-10-07/` | Registry `qrcode_gen*` + SP `GetStudentCertInfo` |
| QR System Source Code & Database | [1GNjv0kQ…](https://drive.google.com/file/d/1GNjv0kQIfGPomhtRgWPOCMgtr-XsCeSV/view?usp=drive_link) (8 Oct) | `raisd/_local/cambodia-qr-2026-10-08/qr-system/` | CI4 `qrcode-lkwn` + DB `qrcode` |
| Verification Source Code | [19rI2A6l…](https://drive.google.com/file/d/19rI2A6lI9a7cvxQVWom7Bym3CGmNUtKw/view?usp=sharing) (8 Oct) | `…/verification/` | `index.php` + `lib/` + docker stubs |

**Do not commit** PHP trees, DB dumps, credentials, AES keys, user password hashes, or live certificate payloads.

## End-to-end behaviour

```text
Issue:
  Registry → POST create_qrcode_api(name, category=LUCT, short_code=KHM-PNH_{id}, url=verification…/cambodia/{token})
  QR SaaS stores slug+url; PNG encodes https://qr.limkokwing.net/qrcode/{slug}
  Registry downloads PNG as {StudentID}_{ProgramCode}.png

Scan:
  Public → GET /qrcode/{slug} → 302 → verification…/cambodia/{token}
  Verification decrypts token → CALL GetStudentCertInfo(StdProgramID) on campus2_cambodia
  HTML: verified student + programme + CertSN + cert image blob (upload type 11)
```

## QR System (CodeIgniter 4)

| Concern | Detail |
|---|---|
| App | `qr.limkokwing.net/qrcode-lkwn` — CI4, PHP ≥8.1, Endroid QR |
| Create route | `POST /api/create_qrcode_api` → `ApiController::create_qrcode_api` (**no auth filter**) |
| Redirect | `GET /qrcode/{slug}` → 302 to stored `url` |
| DB | MariaDB dump `qrcode.sql` (8 Oct 2026) — tables `qrcode`, `categories`, `users`, `forgetpass`, `migrations` |
| Dump volume | ~697 QR rows; **685** `KHM-PNH_*` → Verification; also namecards / events / publicity |
| Categories | General · Events · Publicity · Namecard LUCT/CCC/Raisd · **LUCT** (certs) |
| Idempotency | Existing slug returns PNG with `status: 0` “already exists” |
| `subcategory` | Accepted in POST but **not stored** |

## Verification site

| Concern | Detail |
|---|---|
| Shape | Thin PHP front controller (not a full framework) |
| Path | `/{country}/{token}` via Apache rewrite → `index.php` |
| Crypto | AES-256-CBC decrypt of token → `StdProgramID` |
| Data | `CALL GetStudentCertInfo(?)` on `campus2_cambodia` (`r_studentcert_cambodia` + `s_upload` type 11) |
| UI | Photo, name, StudentID, programme, campus “Cambodia”, graduation, CertSN, cert PNG |
| Ops risk | Pack AES key/IV **differs** from CMS `qrcode_gen.php` — live keys must stay in sync |

## CMS Registry call site

| File | Role |
|---|---|
| `qrcode_gen.php` | Current-style (Mar 2026) — create API + PNG download |
| `qrcode_gen4.php` / `qrcode_gen3.php` | Older `qrcode.limkokwing.net` host |
| `qrcode_gen_onthespot.php` / `_18092025.php` | Same API shape |
| `qrcode.php` / `qrcode_gen1.php` | Legacy local/mcrypt paths |

## Manual certificate ops (standup 8 Oct — not in CMS code)

Dexter described a Cambodia ↔ Cyberjaya **manual** exchange (print / courier / return of physical certificates and QR packs) that Registry `qrcode_gen*` scripts do **not** model. Document as an ops swimlane on Pages; do not invent a Portal API courier method. Automated create/scan remains M5 Cambodia integration.

## Implications for Raisd

1. Certificate QR is a **campus integration** (M5), not Lesotho M4 Applicant Demo.  
2. Scan path is **three hops**: PNG → QR short URL → Verification → CMS SP.  
3. QR SaaS is **shared** Limkokwing infrastructure; this dump’s cert prefixes are Cambodia-only.  
4. Adapters: TLS verify on, vault secrets, tolerate idempotent create, align AES keys with Verification.  
5. Verification’s direct MySQL read of CMS is high-trust — least privilege, no credentials in git.  
6. Manual Cambodia↔Cyberjaya print/return stays outside Applicant CAP-02/03.

## Standup closure

| Action | Status |
|---|---|
| Vara send Cambodia QR-system code (7 Oct) | **Done** |
| Iman review + update CMS docs (7 Oct) | **Done** — Pages [`certificate-qr.html`](../../diagrams/old-cms-cambodia/certificate-qr.html) + this note (full pack inventory) |
| Document QR generation incl. manual ops (8 Oct) | **Done** — this § + Pages manual swimlane + [applicant-qr-fee-mechanisms.md](applicant-qr-fee-mechanisms.md) |

## Related

| Topic | Path |
|---|---|
| **GitHub Pages (full)** | [`certificate-qr.html`](../../diagrams/old-cms-cambodia/certificate-qr.html) |
| Cambodia CMS inventory | [old-cms-cambodia.md](old-cms-cambodia.md) |
| Pages integrations snippet | [`index.html#integrations`](../../diagrams/old-cms-cambodia/index.html#integrations) |
| Lesotho CMS vs Applicant | [lesotho-cms-vs-applicant-portal.md](lesotho-cms-vs-applicant-portal.md) |
