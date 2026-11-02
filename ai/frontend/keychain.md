# Demo Keychain — agent knowledge

## Learner conversion and reusable Cyberjaya Demo flow — 21 October 2026

Accept Enrolment replaces Applicant access with Student access for the same SSO identity, using durable retry/recovery and a one-use Student exchange. Student continues outstanding admissions evidence; Control can preview/reset only a registered Demo journey. The [current lifecycle contract, ownership/reset rules, account checkpoints and verification](../backend/learner-lifecycle.md) supersedes earlier Applicant-session handoff/reset descriptions below. Hosted rollout remains a separate coordinated release.


**Repository:** [`raisd-campus/keychain`](https://github.com/raisd-campus/keychain)  
**Demo host:** https://keychain.raisd.co  
**Docs:** Canonical Control Plane docs are https://docs.raisd.co/ (same VPS). Keychain **Open filled** and the docs top-right embed use the same `postMessage` protocol against the docs site gate (`site-auth.js`) → https://docs.raisd.co/diagrams/index.html?keychain=1 (credentials from gitignored `control-plane/.credentials/docs-site`).

**Public endpoints:** Keychain also lists the Control Plane [Public endpoints](https://docs.raisd.co/diagrams/index.html#endpoints) hosts (Campus landing, Student, Applicant, Staff portal, Portal API, docs, Swagger, DB Admin, Keychain) as **Open** links — no auto sign-in. The staff-portal catalog label is **Staff portal**. The endpoint id remains `ep-{slug}-teach`.
**Campus agents:** [../AGENTS.md](../AGENTS.md)

## Purpose

Working Group launcher for **Demo** logins. Unlock with the master password → search by name, email, portal, or purpose → pick an account → **Open filled** → **Raisd SSO** (`sso.raisd.co/login`) receives email and password over `postMessage` and auto-submits. The portal embed has the same search. Multi-role and single-role accounts then continue via the **campus landing** portal picker / redirect. Portals no longer host password forms.

The same Demo usernames work on **all eight Demo campuses** (`lesotho` … `namibia`). The full Keychain page has a campus picker for Open filled targets; the top-right portal embed resolves the parent host (`apply.botswana.raisd.co`, `staff.cyberjaya.raisd.co`, …) and shows that portal’s accounts. `staff.{slug}.raisd.co` is the Staff portal. `admin.{slug}.raisd.co` redirects to `staff.{slug}.raisd.co/admin`. `teach.{slug}.raisd.co` redirects to `staff.{slug}.raisd.co`.

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

1. Keychain opens `https://sso.raisd.co/login?keychain=1&returnUrl=https://{slug}.raisd.co/?sso=1` (or infra login URLs for docs/Jenkins/Argo/DB Admin).
2. SSO announces `{ type: "raisd.keychain.ready", version: 1 }` to the opener.
3. Keychain replies `{ type: "raisd.keychain.fill", version: 1, username, password, autoSubmit: true }` only to the SSO origin.
4. SSO / docs accept fill only from allowlisted keychain origins (`https://keychain.raisd.co`, localhost:5180).

## Secrets

| Source | Contents |
|---|---|
| Master | Public WG password in keychain README + `src/lib/master.ts` |
| Staff | Public Demo emails + passwords (`registry@raisd.demo` / `registry2026`, `bursary@raisd.demo` / `bursary2026`, and one campus Admin per campus: `admin.{slug}@raisd.demo` / `{slug}2026`, Sierra Leone `sierraleone2026`) in keychain catalog |
| SSO | Public Demo emails on `sso.raisd.co` (`alya@raisd.demo` / `alya2026`, `multi@raisd.demo` / `multi2026`, `iman.suherman@gmail.com` / `raisd2026` for Control plus Lesotho staff and student, …) — Open filled into SSO email+password |
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
- **Jenkins UI embed:** Top-right Keychain on https://jenkins.raisd.co **login only** — `/login` via the `keychain-proxy` nginx sidecar; authenticated pages load the script but the widget unmounts off `/login`.
- **Argo CD UI embed:** Same docs script via `argocd-keychain-proxy`; widget mounts on `/login` only and unmounts after sign-in.
- **Docs:** Widget mounts while the site auth gate is visible; after unlock it is replaced by a **Sign out** control (`site-auth.js`) that clears the docs session.
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

## Embedded account picker — 19 October 2026

Keychain pins released shared library 0.9.0. Its embed composes ContentSection,
DetailSectionCard, DropdownSelect, Button, Input and Badge with semantic tokens
and Rubik/type utilities. The standalone campus control also uses DropdownSelect.
No shared component source is changed.

The SSO account picker has labelled Campus and Role selectors beside each other,
plus case-insensitive search and an announced result count. All campuses/All roles
are available; empty results offer Clear filters. Campus context comes from a
campus-scoped trusted parent or a validated SSO hint; global/local SSO defaults
to All campuses. Role and campus must match the same recorded Demo assignment.
Campus Admins are campus-only; multi-role accounts retain each matching role.
Iman's Gmail account has global Control plus Lesotho Student/Lecturer scopes:
its global role must not make it a Botswana Student or Admin. Unknown metadata
is never inferred from display labels. The adapter mirrors existing SSO seed
records and is only a discovery filter, not an authorization decision.

Selecting a filter does not change the caller's return URL, grant a campus/role,
or replace the existing SSO role picker. Fill and Fill & submit keep protocol
version 1, the exact parent-origin target and their respective autoSubmit values.
Locked and unavailable-account behavior is retained. Infrastructure embeds keep
their existing portal-specific account list without irrelevant role controls.

The embed owns one viewport-height scroll region so filters and account actions
remain reachable at short heights. SSO fits the iframe below its trigger using
actual margins/borders and passes only a campus-filter hint from campusId or the
return URL hostname. Host origins, password injection and real auth state remain
with their existing owners. Browser verification uses isolated loopback parent
and child servers with no generated infrastructure credentials; it does not run
reset-password or outbound-email operations on hosted accounts.

Acceptance: Keychain lint, 16 units, production build and 14 Chromium/WebKit
iframe checks passed, including actual 343px phone/384px desktop picker widths.
SSO build and complete auth gate passed 51 checks with one WebKit virtual-device
skip. Scope matching, empty/reset filters, Fill/Fill & submit, lock, keyboard, axe
and short-frame reachability are covered. Generated credentials remain ignored.

HTML entry points use `Cache-Control: no-cache` through nginx `expires -1` so
normal iframe navigations revalidate and discover changed bundle filenames.
Existing static-asset caching and frame-ancestors policy remain in place. SSO sends
explicit `campus=all` for its global/local-return case; this also moves existing
clients off the older unversioned embed URL during the filter rollout.

## Local SSO picker - 21 October 2026

The Windows workspace launcher now includes Keychain on `http://localhost:5180` alongside the four portals, Portal API and SSO. It starts the Vite server on loopback with a strict port and leaves existing listeners alone. Local SSO at `http://localhost:8090` embeds that local picker; hosted SSO keeps its hosted picker. The hosted iframe policy is unchanged.

Keychain accepts exactly `http://localhost:8090` and `http://127.0.0.1:8090` as additional embed parents and resolves them to the SSO account catalogue. Other ports and lookalike hosts are not implicitly trusted. The existing fresh applicant card uses an injected Demo value when present, otherwise its existing public SSO Demo seed value; it remains one account card. No identity, role or permission is created or changed.

For a new local application, open the Applicant portal on port 5174, open Keychain on the redirected SSO login, unlock using the existing Demo instructions and search for the fresh applicant. Fill populates the form; Fill & submit signs in. Cyberjaya/Applicant filters retain that account. The existing return URL is preserved; choose Cyberjaya in the application form.

Verification: Keychain lint, 18 unit tests and production build passed; 14 isolated Chromium/WebKit embed checks passed during this change. SSO's complete build/API/authentication gate passed with 51 browser checks and one unsupported WebKit virtual-authenticator skip. Actual running-stack walks passed at Chromium 375/1440px and WebKit 375px: unlock, Cyberjaya/Applicant filtering, Fill without a login request, Lock/unlock, Fill & submit, HTTP 200 password login/token exchange and Applicant My Applications with zero applications. All three walks had no page errors or failed requests; no application was created. Four host-routing assertions also cover hosted SSO and a loopback lookalike. These are local Demo results, not hosted deployment or Live CMS proof.

The draft and verified-application cards also fall back to their existing public SSO Demo seed values when the optional local applicant credential map is absent. Injected values still take precedence; enabling a picker action does not grant permissions or verify an application.

## Distinct Applicant scenario accounts - 21 October 2026

The owner confirmed four independent local Demo checkpoints. Keychain no longer presents two scenario labels for the same completed-applicant identity.

| Keychain scenario | SSO identity | Initial application state | Intended next action |
|---|---|---|---|
| New applicant | fresh@raisd.demo | No applications | Create an application |
| Draft ready to submit | draft@raisd.demo | Fully filled, unsubmitted Cyberjaya draft | Review the five completed steps and submit |
| Applicant completed | completed@raisd.demo | Submitted; eligibility review pending | Await staff QA review |
| Verified application | approved@raisd.demo | Eligibility verified; Eligibility Letter released and unconfirmed | Confirm Eligibility |

The latter three fixtures use the current resolved Cyberjaya policy. They have distinct application/person/evidence identifiers and matching applicant names/emails. No initial Registration Fee receipt, payment verification, Offer, signature or acceptance is fabricated. Policy-disabled English/international stages are not required for these local Malaysian examples. Seed evidence has actual synthetic PDF/PNG bytes, available only to its owner; first-login seeding is serialized so concurrent catalogue/application requests cannot race. Existing persisted application records are retained rather than migrated or overwritten. The local memory stack was activated after a read-only account audit and confirmation that no saved workflow mutations existed; existing campus policy was preserved.

Keychain's sequential walkthrough stays on the same draft account as it progresses. The submitted/verified accounts are separate checkpoints. The guide now follows eligibility review, applicant confirmation, quoted Registration Fee/payment verification, Offer, signed acceptance and continuation from that same accepted application. Staff accounts still need the corresponding desk permission; Registry alone does not imply QA access.

Verification: each of the four Keychain entries signed in and opened its intended actual Applicant page on Chromium; the ready draft also passed on 375px WebKit. All seeded file reads were available, with no page errors or failed requests. An isolated API suite passed 130 scenario/ownership/original-file/next-action assertions, SSO exchange passed 84, existing legacy admissions continuation passed 73 and configured flows passed 60. Applicant lint, 95 tests, build and production exclusions passed; Keychain lint/tests/build and Staff build passed. SSO build/API gate passed; its browser suite initially had 50 passes, one unsupported virtual-authenticator skip and one WebKit page-load timeout before the Keychain button appeared. The unchanged isolated repeat passed. No hosted deployment, CMS write or existing role expansion is claimed.

## Local SSO credential source — 23 October 2026

Local Keychain reads the ignored `control-plane/.credentials/demo-sso.json` map keyed by SSO email, or `DEMO_KEYCHAIN_SECRETS.sso`. These credentials take precedence for SSO cards and determine their enabled state. They are separate from Portal API's scenario-keyed `demo-students.json` and `demo-applicants.json`; a portal-local password must not be assumed to authenticate the same account through SSO. Existing injected/fallback behavior remains when no email override exists.

The local Demo SSO map was populated from existing Demo seed credentials, and the missing applicant scenario map restored. Existing Student/API credentials, SSO hashes, roles, passkeys and application state were retained. All application-flow accounts use the same login before/after conversion; Keychain does not reset passwords or grant roles. Startup/build regenerates the ignored secrets module. Infrastructure logins (DB Admin/docs/Jenkins/Argo) remain separate optional secrets and are not fabricated.
