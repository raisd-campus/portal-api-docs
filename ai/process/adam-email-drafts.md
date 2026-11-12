# Adam emails — LegalAdvice HTML style + Gmail Draft only

**Purpose:** Operator process for drafting emails to Adam Canceri (HugeShop, LegalAdvice, MGP/DIV, and other projects).  
**Imported from:** practice proven in `hugeshop-infra-iac` packs under `tmp/**/adam-reply-draft.html`, plus always-on Cursor rules `~/.cursor/rules/adam-email-legaladvice-styles.mdc` and `~/.cursor/rules/adam-email-gmail-draft-only.mdc`.  
**Scope:** This is **not** Raisd product outbound mail (`notify.raisd.co` / Notifications service). Use [backend/notifications.md](../backend/notifications.md) for campus transactional email.

Rule extracts in this repo: [rules/adam-email-legaladvice-styles.mdc](../rules/adam-email-legaladvice-styles.mdc), [rules/adam-email-gmail-draft-only.mdc](../rules/adam-email-gmail-draft-only.mdc).

---

## Hard delivery rules

| Rule | Value |
|---|---|
| From | Always **`iman.suherman@gmail.com`** (Mail.app account name `Gmail` is fine) |
| To (HugeShop) | Prefer **`adam@hugeshop.com`** unless Adam explicitly asks otherwise |
| Agent action | Always create / update a **Gmail Draft** — **never send** |
| “Send” / “email Adam” / “go ahead” | Still means **draft only**; the human sends from Gmail/Mail |
| Forbidden From | `suherman.fb@gmail.com`, `admin@hugeshop.com`, `support@hugeshop.com`, or any other mailbox unless Adam asked in writing |
| Forbidden send paths | Mail.app Send, SMTP, `gog gmail send`, Gmail API send, or any automated send |

After placing the draft, confirm: **From**, **To**, **Subject**, attachment filenames, and status **draft / not sent**.

---

## HTML style (LegalAdvice reply)

Do **not** use plain monospace dumps, markdown-only tables, or WhatsApp-style bullet walls as the sendable body. The **HTML draft is the source of truth**; keep a plain-text twin only as fallback.

### Shell

```html
<body style="margin:0;padding:0;background:#ffffff;color:#1a1a1a;">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;color:#1a1a1a;max-width:720px;margin:0;padding:8px 4px;">
  <!-- content -->
</div>
</body>
```

### Type

| Role | Style |
|---|---|
| Body copy / paragraphs | Georgia, Times New Roman, serif · 15px · line-height 1.55 · `#1a1a1a` · `margin:0 0 14px` (section closing paras often `0 0 22px`) |
| Numbered section headings | Arial, Helvetica, sans-serif · 14px · font-weight 700 · `margin:0 0 10px` (often `margin:22px 0 10px` after a prior block) |
| Tables / dense data | Arial, Helvetica, sans-serif · 13px · line-height 1.4 |
| Sign-off | Same Georgia body; `Kind regards,` then `Iman Suherman` |

### Tables

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
  style="border-collapse:collapse;margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;">
  <tr>
    <th align="left" style="border:1px solid #c5d0da;background:#f4f7fa;padding:9px 10px;">…</th>
  </tr>
  <tr>
    <td style="border:1px solid #c5d0da;padding:9px 10px;vertical-align:top;">…</td>
  </tr>
  <tr>
    <td style="border:1px solid #c5d0da;padding:9px 10px;vertical-align:top;background:#fafbfc;">…</td>
  </tr>
</table>
```

- Header cells: border `#c5d0da`, background `#f4f7fa`, padding `9px 10px`
- Body cells: same border/padding; alternate rows with background `#fafbfc`
- Muted secondary notes: `color:#555`
- Prefer HTML tables for status / ownership / amounts / URLs / checkpoints; keep short prose in Georgia paragraphs

### Structure habits

1. Open with `Hi Adam,` (or `Dear Adam,` only when matching his formal register).
2. Numbered sections with Arial bold headings (`1. …`, `2. …`).
3. Put evidence, owners, amounts, URLs, and status in tables.
4. List screenshot/PDF attachment filenames explicitly when evidence is attached.
5. Sign off Georgia: `Kind regards,` / `Iman Suherman`.

### Do not

- Inter / Roboto / system-ui / purple-gradient “marketing” email templates
- Card-heavy or multi-column newsletter layouts
- Replacing this style with WhatsApp chat formatting for email bodies

### Reference examples (outside this repo)

- `legaladvice-foundation/docs/evidence/2026-11-09-adam-followup/adam-reply-draft.html`
- `legaladvice-foundation/docs/evidence/2026-11-06-recovery/adam-reply-draft.html`
- HugeShop packs: `hugeshop-infra-iac/tmp/**/adam-reply-draft.html` (e.g. `tmp/adam-hs-receipt-2026-11-10/`)

---

## Artifact pack layout

When preparing a reply pack (same pattern as HugeShop `tmp/adam-*/`):

| File | Role |
|---|---|
| `adam-reply-draft.html` | Sendable HTML body (source of truth) |
| `adam-reply-draft.txt` | Plain-text companion + To/Subject headers |
| Attachments (PDF/PNG/JPG) | Evidence listed in the HTML and attached to the draft |
| `STATUS.md` | From / To / Subject / attachment names / **draft not sent** |

Keep packs out of git unless the project explicitly versions them. HugeShop uses ignored `tmp/`; Raisd agent packs should stay under private local paths (not student data, not `.env`).

---

## How to place the draft (Mail.app → Gmail Drafts)

**Preferred path used successfully in hugeshop-infra-iac:** AppleScript via `osascript` creating a Mail.app outgoing message with `html content`, From the Gmail account, To Adam, optional file attachments, then `save` — **do not** call Send.

### Minimal pattern

1. Write `adam-reply-draft.html` in LegalAdvice style.
2. Load HTML as UTF-8 into AppleScript (`read … as «class utf8»`).
3. Create outgoing message:

```applescript
tell application "Mail"
  activate
  -- prefer account whose name contains "Gmail" / "gmail" / "Google"
  set newMsg to make new outgoing message with properties {subject:"…", visible:true}
  tell newMsg
    set sender to "iman.suherman@gmail.com" -- or first email address of the Gmail account
    make new to recipient at end of to recipients with properties {address:"adam@hugeshop.com", name:"Adam Canceri"}
    set html content to htmlData
  end tell
  -- optional: make new attachment with properties {file name:POSIX file "/abs/path"} at after the last paragraph
  try
    save newMsg
  end try
end tell
```

4. Confirm outgoing/draft window: subject, to, From, attachment count.
5. Tell the user the draft is in **Gmail → Drafts** for `iman.suherman@gmail.com` and is **not sent**.

### Optional helpers (also used in HugeShop packs)

- Build a multipart `.eml` with `X-Unsent: 1` as a portable twin of the draft (HTML + attachments). Mail sometimes opens `.eml` read-only; **AppleScript `html content` + save** is clearer for review.
- For inline comparison images in the HTML body, data-URI embed in the Mail HTML body when CID multipart is unreliable; still attach the same files for download.

### Never

- Interpret user “send” as permission to send from the agent.
- Draft from a non-Gmail From account.
- Leave only a markdown file in chat without placing the Mail/Gmail draft when the user asked to email Adam.

---

## Confirmation checklist

- [ ] HTML uses Georgia body + Arial headings + bordered `#c5d0da` / `#f4f7fa` tables  
- [ ] From = `iman.suherman@gmail.com`  
- [ ] To = correct Adam address for the project (HugeShop → `adam@hugeshop.com`)  
- [ ] Subject set  
- [ ] Attachments named in the body and attached on the draft  
- [ ] Status = **draft / not sent** (recorded in `STATUS.md` when a pack exists)
)
