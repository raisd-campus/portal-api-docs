#!/usr/bin/env python3
"""Finalize GitHub Pages auth config + ensure site-auth.js is on gated HTML pages.

Standalone report packs (E2E walkthroughs, executive/weekly PDF-HTML packs, briefings)
ship without site chrome CSS. Injecting site-auth.js there dumps an unstyled sign-in
form at the bottom of the page — skip those. Only pages that already load the docs
shell (styles.css / site-chrome.css / Primary nav) get the gate.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

ROOT = Path("_site")
AUTH_JS = ROOT / "diagrams" / "site-auth.js"
CFG = ROOT / "diagrams" / "site-auth-config.json"


def has_site_chrome(text: str) -> bool:
    return (
        "styles.css" in text
        or "site-chrome.css" in text
        or 'aria-label="Primary"' in text
        or "aria-label='Primary'" in text
    )


def main() -> None:
    user = os.environ.get("DOCS_SITE_USER", "").strip()
    password = os.environ.get("DOCS_SITE_PASSWORD", "").strip()
    if user and password:
        cfg = {
            "userHash": hashlib.sha256(user.encode()).hexdigest(),
            "passHash": hashlib.sha256(password.encode()).hexdigest(),
        }
        CFG.write_text(json.dumps(cfg, indent=2) + "\n", encoding="utf-8")
        print("site-auth-config.json regenerated from secrets")
    elif not CFG.exists():
        raise SystemExit("missing site-auth-config.json and no DOCS_SITE_* secrets")

    for html in ROOT.rglob("*.html"):
        text = html.read_text(encoding="utf-8", errors="ignore")
        if "site-auth.js" in text or "</head>" not in text:
            continue
        if not has_site_chrome(text):
            print("auth skip (no site chrome)", html)
            continue
        rel = os.path.relpath(AUTH_JS, html.parent).replace(os.sep, "/")
        html.write_text(
            text.replace("</head>", f'  <script src="{rel}"></script>\n</head>', 1),
            encoding="utf-8",
        )
        print("auth inject", html)


if __name__ == "__main__":
    main()
