# Demo Keychain — agent knowledge

**Repository:** [`raisd-campus/keychain`](https://github.com/raisd-campus/keychain)  
**Demo host:** https://keychain.raisd.co  
**Docs:** Canonical Control Plane docs are https://docs.raisd.co/ (same VPS). Keychain **Open filled** and the docs top-right embed use the same `postMessage` protocol against the docs site gate (`site-auth.js`) → https://docs.raisd.co/diagrams/index.html?keychain=1 (credentials from gitignored `control-plane/.credentials/docs-site`).

**Public endpoints:** Keychain also lists the Control Plane [Public endpoints](https://docs.raisd.co/diagrams/index.html#endpoints) hosts (Campus landing, Student, Applicant, Lecturer, Staff, Portal API, docs, Swagger, DB Admin, Keychain) as **Open** links — no auto sign-in.
**Campus agents:** [../AGENTS.md](../AGENTS.md)

## Purpose

Working Group launcher for **Demo** portal logins. Unlock with the master password → pick an account → **Open filled** → the target portal receives **email** and password over `postMessage` (field name remains `username` for protocol compatibility; never via URL query) and auto-submits sign-in.

The same Demo usernames work on **all eight Demo campuses** (`lesotho` … `namibia`). The full Keychain page has a campus picker for Open filled targets; the top-right portal embed resolves the parent host (`apply.botswana.raisd.co`, `staff.cyberjaya.raisd.co`, …) and shows that portal’s accounts.

Demo ≠ Live. Do not store Live CMS passwords outside the documented Demo / WG tooling path.

## Admissions Demo flow (13 Oct 2026)

Keychain shows a **Start here** sequence matching the staged admissions path (payment approval does **not** enrol):

1. **Applicant · Draft ready to submit** (`completed`) — START HERE · submit with fee proof  
2. **Staff Bursary** — Approve payment only (`/payments`)  
3. **Staff Registry** — Verify documents / QA stand-in  
4. **Applicant** — Confirm Eligibility  
5. **Staff Registry** — Release Offer Letter  
6. **Applicant** — Accept Enrolment  
7. **Student · Alya Putri** (`10029841`) — module registration / Finance / LMS  

Each catalog entry includes a **purpose** line explaining when to use that access. Portal sections are ordered Applicant → Staff → Student → Lecturer → tools.

## Master password

Documented in the keychain repo README (GitHub): **`raisdKeychain2026`**. Session unlock uses `sessionStorage`; **Lock** clears it.

## Protocol

1. Keychain opens the portal sign-in URL with `?keychain=1` in a new window.
2. Portal announces `{ type: "raisd.keychain.ready", version: 1 }` to the opener.
3. Keychain replies `{ type: "raisd.keychain.fill", version: 1, username, password, autoSubmit: true }` only to the portal origin.
4. Portal / docs accept fill only from allowlisted keychain origins (`https://keychain.raisd.co`, localhost:5180).

## Secrets

| Source | Contents |
|---|---|
| Master | Public WG password in keychain README + `src/lib/master.ts` |
| Staff | Public Demo emails + passwords (`registry@raisd.demo` / `registry2026`, `bursary@raisd.demo` / `bursary2026`) in keychain catalog |
| SSO | Public Demo emails on `sso.raisd.co` (`alya@raisd.demo` / `alya2026`, `multi@raisd.demo` / `multi2026`, …) — Open filled into SSO email+password |
| Student / applicant | Build-injected from gitignored `control-plane/.credentials/demo-students.json` and `demo-applicants.json`, or env `DEMO_KEYCHAIN_SECRETS` |
| DB Admin | Build-injected from gitignored `control-plane/.credentials/db-admin.json` `login` (or `DEMO_KEYCHAIN_SECRETS.dbAdmin`) |
| Docs (Pages) | Build-injected from gitignored `control-plane/.credentials/docs-site` (or `DEMO_KEYCHAIN_SECRETS.docsSite`) |

`src/generated/secrets.ts` is gitignored. Student and applicant portals still do not ship passwords in their own bundles.

## Agent rules

1. Keep Demo labelling on the page.
2. Never commit generated secrets or Live database connection strings.
3. When adding a portal account, update the keychain catalog (title, purpose, flow step if admissions-related) and the portal’s sign-in fill listener.
4. Keep the **Start here** admissions sequence aligned with Staff / Applicant / Portal API behaviour (Bursary → QA → confirm → Offer → Accept).

## Deploy (Demo)

- **Image:** `ghcr.io/raisd-campus/keychain:main` — built by **Jenkins** (Kaniko Job on push to `main`)
- **GitOps:** [`gitops/apps/keychain/`](../../../gitops/apps/keychain/) · Argo Application `keychain`
- **Trigger:** Jenkins `raisd-main-deploy` builds/pushes GHCR, hard-refreshes Argo, rolls out `deploy/keychain`
- **Jenkins UI embed:** Top-right Keychain on https://jenkins.raisd.co — Simple Theme loads `https://docs.raisd.co/diagrams/keychain-access.js` after sign-in; `/login` (Jenkins simple-page) gets the same script via the `keychain-proxy` nginx sidecar (`gitops/apps/jenkins/nginx-keychain.conf`).
- **Argo CD UI embed:** Top-right Keychain on https://argocd.raisd.co — ingress fronts `argocd-keychain-proxy` nginx, which injects the same docs script into the SPA HTML shell (`gitops/argocd/keychain-proxy/`).
- **Build secrets:** cluster secrets `jenkins/demo-keychain-secrets` + `jenkins/build-npm-token` (from `install-jenkins.sh`; never commit)
- **Fallback:** `npm run deploy:vps` (SSH hostPath) until image is healthy

## Local

```sh
cd ~/src/raisd/keychain
npm install
npm run dev    # http://localhost:5180
npm run check
npm run build:vercel
```
