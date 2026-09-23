# Docs site sign-in (GitHub Pages)

GitHub Pages cannot do real HTTP basic authentication. This site uses a **single shared username + password** checked in the browser against SHA-256 hashes in [`site-auth-config.json`](./site-auth-config.json).

## Credentials

Set (or rotate) via GitHub Actions secrets on `portal-api-docs`:

- `DOCS_SITE_USER`
- `DOCS_SITE_PASSWORD`

On each Pages deploy, the workflow regenerates `site-auth-config.json` from those secrets when both are present. If secrets are unset, the committed hash file is used.

## Limits

- Anyone who can download the static files can still read content offline.
- This stops casual visitors and search indexing of the UI; it is **not** strong access control.
- For stronger protection: private repo Pages (org plan), Cloudflare Access, or a reverse proxy with real basic auth.

## Local preview

Open any `docs/**/*.html` through a local static server (not `file://`) so `site-auth-config.json` can be fetched.
