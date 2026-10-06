# Published design system catalogue source

These five HTML pages are the canonical source for the public mirror at
`raisd-campus/portal-api-docs/design-system/`. They describe the **released**
`@raisd-campus/design-system` package and separate portal-owned compositions.
The PNGs contain mock data. The `captures.json` manifest records each capture's
viewport, owner, source route, package version, and owning portal commit.
Top-level provenance applies to entries unless an entry overrides its source
route, package version, or source commit.

Update this catalogue only when a shared token, public prop, visual state,
interaction, ownership rule, or portal-owned reusable pattern observably
changes. Edit only affected text, examples, and captures. An unrelated task or
an internal refactor without an observable change needs no edit.

For a shared package change, prepare captures from the package consumer fixture
or a portal running the candidate release with mock data. For portal-owned
examples, use the relevant portal feature route with mock data. Applicant entries use
`owner: applicant` and `applicantPortalCommit`; Student entries use `owner: student`
and `studentPortalCommit`. Mark uncommitted capture source state explicitly. Record the
release that consumers can install in `captures.json`; do not publish candidate
changes before their package release. Capture affected phone, tablet, and
desktop states when their layouts differ. Keep historical provenance for
unchanged images; update each changed image's metadata and source commit.

For `system/portal-shell`, start the package's `examples/consumer` Vite fixture
on port 4183 and run `node capture-shell.mjs <this-directory>/assets` from that
fixture. It writes mock phone, tablet, and desktop PNGs. Review all three before
updating their entries in `captures.json` and rebuilding the pages.

For `system/detail-field`'s `editableUndivided` example, use the same fixture
and run `node capture-detail-field.mjs <this-directory>/assets`. Review the
desktop and phone captures and update their manifest entries.

From the `control-plane` root, regenerate and validate:

```sh
# Edit docs/site-nav.yaml for Primary header, design-system strip, and site search index
python scripts/build-design-system-pages.py
python docs/sdd/_pages/build-dropdown-nav.py
python scripts/validate-design-system.py docs
```

Primary site navigation and search are **only** defined in [`docs/site-nav.yaml`](../site-nav.yaml). Do not hand-edit `<nav class="nav">` or search chrome in HTML — re-run the generator so control-plane and `portal-api-docs` stay identical. The magnifier opens a modal fed by `diagrams/site-search-index.json`.

Mirror the five HTML files, `styles.css`, `assets/`, and `captures.json` into
`portal-api-docs/design-system/`, then run
`python scripts/validate-design-system.py .` in that repository. Compare at
phone, tablet, and desktop widths before pushing. The navigation generator may
also update existing site pages when a top-level section changes.

The 6 October 2026 acceptance captures use shared 0.6.1 without a package change: Applicant confirmation belongs to Applicant, and the transferred Module Registration composition belongs to Student. They use only synthetic demo identities and evidence metadata.

The 0.6.2 release adds Popup footerAfterDismiss. New Applicant save-before-leaving captures use that released slot; historical images retain their original package provenance.
