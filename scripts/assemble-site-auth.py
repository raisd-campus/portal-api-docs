#!/usr/bin/env python3
"""Finalize GitHub Pages auth config + ensure site-auth.js is on every HTML page."""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

ROOT = Path("_site")
AUTH_JS = ROOT / "diagrams" / "site-auth.js"
CFG = ROOT / "diagrams" / "site-auth-config.json"


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
        rel = os.path.relpath(AUTH_JS, html.parent).replace(os.sep, "/")
        html.write_text(
            text.replace("</head>", f'  <script src="{rel}"></script>\n</head>', 1),
            encoding="utf-8",
        )
        print("auth inject", html)


if __name__ == "__main__":
    main()
