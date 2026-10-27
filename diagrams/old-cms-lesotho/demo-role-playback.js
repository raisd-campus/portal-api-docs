/**
 * Lesotho Raisd Demo W1–W3 role-by-role recorded video playback.
 * Each scene plays a WebM from ./playback-videos/{sceneId}.webm and tracks FM tags.
 */
export const ROLES = [
  {
    id: "applicant",
    label: "Applicant",
    portal: "https://apply.lesotho.raisd.co",
    account: "Keychain · completed@raisd.demo / completed2026",
    summary: "Apply → fee proof → offer accept (FM-02 / FM-09)",
    scenes: [
      {
        id: "app-signin",
        title: "Sign in to Applicant",
        route: "/sign-in",
        fm: ["FM-01", "FM-02", "FM-14"],
        body: "Open the Lesotho Applicant host and enter via Keychain or SSO.",
        steps: [
          "Open https://apply.lesotho.raisd.co (or Keychain → Applicant Lesotho).",
          "Pick completed@raisd.demo to continue a prepared Demo case, or fresh@raisd.demo for an empty draft.",
          "Land on the Applicant shell.",
        ],
        durationMs: 7000,
      },
      {
        id: "app-draft",
        title: "Draft and submit application",
        route: "/apply",
        fm: ["FM-02", "FM-05"],
        body: "Complete Lesotho study preferences and submit so the Admissions policy pins.",
        steps: [
          "Open Apply / continue draft.",
          "Set campus to Lesotho; complete personal, academic, and document sections required by the Demo form.",
          "Submit. The case pins campus-lesotho Admissions policy (review flags + catalogues).",
        ],
        durationMs: 7500,
      },
      {
        id: "app-fee",
        title: "Application fee proof",
        route: "/apply · payment",
        fm: ["FM-09", "FM-02"],
        body: "Upload bank proof for the profile-backed LSL application fee (Demo LSL 300).",
        steps: [
          "When the flow asks for payment proof, enter a bank reference.",
          "Upload any small Demo PDF/image as proof (not a real bank receipt).",
          "Save — queue moves to Bursary verification (FM-09).",
        ],
        durationMs: 7000,
      },
      {
        id: "app-eligibility",
        title: "Confirm eligibility",
        route: "/apply · eligibility",
        fm: ["FM-02", "FM-03"],
        body: "After QA verifies documents, confirm eligibility and continue to Offer.",
        steps: [
          "Wait until Staff QA has verified documents (see QA role scenes).",
          "Open the eligibility confirmation popup (intake / faculty / programme).",
          "Confirm — does not enrol yet; unlocks Registry Offer release.",
        ],
        durationMs: 7000,
      },
      {
        id: "app-offer",
        title: "Accept Offer Letter",
        route: "/apply · offer",
        fm: ["FM-02"],
        body: "After Registry releases the Demo Offer, accept enrolment and hand off to Student.",
        steps: [
          "Wait until Registry releases the Offer (Registry role).",
          "Preview / download the DEMO Offer PDF.",
          "Accept Enrolment — Applicant signs out; open Student with the new Demo account.",
        ],
        durationMs: 7500,
      },
    ],
  },
  {
    id: "faculty",
    label: "Faculty Review",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.faculty@raisd.demo / lesotho2026",
    summary: "Rank / score / recommendation desk (FM-03 / FM-05 / FM-15)",
    scenes: [
      {
        id: "fac-open",
        title: "Open Admissions review",
        route: "/admin/applicants",
        fm: ["FM-03", "FM-15"],
        body: "Sign in as Lesotho Faculty Review and open the submitted application.",
        steps: [
          "Keychain → lesotho.faculty@raisd.demo → staff.lesotho.raisd.co.",
          "Open Admin → Applicants (Admissions workspace).",
          "Select the submitted Lesotho application from the queue.",
        ],
        durationMs: 7000,
      },
      {
        id: "fac-rank",
        title: "Set rank and score",
        route: "/admin/applicants · review",
        fm: ["FM-03", "FM-05"],
        body: "Lesotho policy enables showRankScore — record Demo rank and score.",
        steps: [
          "On the case detail, find Rank / Score fields (FM-05 flag).",
          "Enter Demo values (any integers in range).",
          "Save the review fields before recording the recommendation.",
        ],
        durationMs: 7000,
      },
      {
        id: "fac-rec",
        title: "Record faculty recommendation",
        route: "/admin/applicants · recommendation",
        fm: ["FM-03", "FM-05"],
        body: "Complete desk 1 of 3 in the faculty → QA → Registry chain.",
        steps: [
          "Choose recommendation outcome (approve / action-required).",
          "Add a short Demo note.",
          "Submit — Progress shows 1/3; next desk is QA.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "qa",
    label: "QA",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.qa@raisd.demo / lesotho2026",
    summary: "LGCSE extract and document verify (FM-04 / FM-03)",
    scenes: [
      {
        id: "qa-open",
        title: "Open Document review",
        route: "/admin/document-review",
        fm: ["FM-04", "FM-15"],
        body: "Sign in as Lesotho QA and open the case awaiting extract / verify.",
        steps: [
          "Keychain → lesotho.qa@raisd.demo → staff.lesotho.raisd.co.",
          "Open Admin → Document review (or Applicants → documents desk).",
          "Select the same Lesotho application Faculty just recommended.",
        ],
        durationMs: 7000,
      },
      {
        id: "qa-extract",
        title: "Run LGCSE extract",
        route: "/admin/document-review · extract",
        fm: ["FM-04", "FM-05"],
        body: "Policy sets extractRequired — record Demo LGCSE subject rows.",
        steps: [
          "Trigger extract-document / open extract panel.",
          "Confirm Demo LGCSE (or COSC) certificate rows appear.",
          "Save extract — required before verify-documents succeeds.",
        ],
        durationMs: 7500,
      },
      {
        id: "qa-verify",
        title: "Verify documents",
        route: "/admin/document-review · verify",
        fm: ["FM-04", "FM-03"],
        body: "Complete QA verify so eligibility can proceed for the applicant.",
        steps: [
          "Ensure faculty recommendation and extract are present.",
          "Run Verify documents on the case.",
          "Record QA recommendation if still required for n/3 — Progress moves toward Registry.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "bursary",
    label: "Bursary",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.bursary@raisd.demo / lesotho2026",
    summary: "Fee verify, Fees & Fines preview, registration clearance (FM-09 / FM-08)",
    scenes: [
      {
        id: "bur-pay",
        title: "Verify application payment",
        route: "/admin/payments",
        fm: ["FM-09", "FM-03"],
        body: "Approve the Demo application-fee proof in the payments queue.",
        steps: [
          "Keychain → lesotho.bursary@raisd.demo → staff.lesotho.raisd.co.",
          "Open Admin → Payments (Admissions payment reviews).",
          "Select the pending proof → Approve payment (Demo stub).",
        ],
        durationMs: 7000,
      },
      {
        id: "bur-fees",
        title: "Fees & Fines catalogue preview",
        route: "/admin/fees",
        fm: ["FM-09"],
        body: "Open the Demo LSL catalogue from the campus finance profile.",
        steps: [
          "Open Admin → Fees & Fines.",
          "Confirm Application LSL 300, AcceptanceFee 550, Registration Fee 550, plus walk seeds.",
          "Note: Configure rates / banks / plans may be stubs in Demo.",
        ],
        durationMs: 7000,
      },
      {
        id: "bur-reg",
        title: "Bursary registration clearance",
        route: "/admin/registrations",
        fm: ["FM-08", "FM-09"],
        body: "Clear a student module-registration request; capture NMDS fields when shown.",
        steps: [
          "Open Admin → Registrations → Module requests.",
          "Select a pending request (Lesotho student preferred).",
          "Choose verified-payment or approved-arrangement, add note, approve Bursary desk — watch sponsor/borrower columns.",
        ],
        durationMs: 8000,
      },
    ],
  },
  {
    id: "registry",
    label: "Registry",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.registry@raisd.demo / lesotho2026",
    summary: "Offer release, registration desk, 12-tab file (FM-03 / FM-08 / FM-07)",
    scenes: [
      {
        id: "reg-offer",
        title: "Release Offer Letter",
        route: "/admin/applicants · offer",
        fm: ["FM-03"],
        body: "Release the Demo Offer after eligibility + n/3 desks.",
        steps: [
          "Keychain → lesotho.registry@raisd.demo → staff.lesotho.raisd.co.",
          "Open Applicants; select the case with eligibility confirmed and desks complete.",
          "Release Offer Letter — Applicant can now Accept Enrolment.",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-queue",
        title: "Module registration desk",
        route: "/admin/registrations",
        fm: ["FM-08"],
        body: "Complete Faculty side after Bursary clearance; NMDS columns visible.",
        steps: [
          "Open Registrations → Module requests.",
          "If next desk is faculty, approve modules / availability with a note.",
          "Confirm sponsorCode / borrowerReference display for NMDS Demo requests.",
        ],
        durationMs: 7500,
      },
      {
        id: "reg-list",
        title: "Students list",
        route: "/admin/students",
        fm: ["FM-07"],
        body: "Open the Demo registry list from the record graph.",
        steps: [
          "Open Admin → Students.",
          "Confirm Demo enrolled students load (including Lesotho fixture when seeded).",
          "Click a row to open the 12-tab registry file.",
        ],
        durationMs: 6500,
      },
      {
        id: "reg-file-academics",
        title: "Student file — Academics",
        route: "/admin/students · Academics",
        fm: ["FM-07"],
        body: "Walk the Academics tab: programme, term, module grid.",
        steps: [
          "On the open file, select Academics.",
          "Read programme status, term, and module grid (Code / Name / Status / Cr / Mk / Gd).",
          "Remember: Demo graph projection for CAP-53 enrolment.",
        ],
        durationMs: 7000,
      },
      {
        id: "reg-file-sponsors",
        title: "Student file — Sponsors / Registration",
        route: "/admin/students · Sponsors",
        fm: ["FM-07", "FM-08"],
        body: "Confirm NMDS awards and registration request sponsor fields.",
        steps: [
          "Open Sponsors — funding awards + borrower reference.",
          "Open Registration — requests list with sponsorCode / clearance.",
          "Optionally skim Finance / Documents / Audit tabs for Demo projections.",
        ],
        durationMs: 7500,
      },
    ],
  },
  {
    id: "year-leader",
    label: "Year Leader",
    portal: "https://staff.lesotho.raisd.co",
    account: "Keychain · lesotho.yearleader@raisd.demo / lesotho2026",
    summary: "Narrow Students view (FM-07 / FM-15)",
    scenes: [
      {
        id: "yl-signin",
        title: "Sign in as Year Leader",
        route: "/sign-in",
        fm: ["FM-01", "FM-15"],
        body: "Use the narrow Lesotho Year Leader custom role.",
        steps: [
          "Keychain → lesotho.yearleader@raisd.demo.",
          "Land on staff.lesotho.raisd.co Admin with Overview + Students only (no Access).",
          "Confirm Payments / Access menus are hidden.",
        ],
        durationMs: 6500,
      },
      {
        id: "yl-list",
        title: "Browse enrolled students",
        route: "/admin/students",
        fm: ["FM-07"],
        body: "Open the Demo Students list in campus scope.",
        steps: [
          "Open Admin → Students.",
          "Scan list for programme / term / sponsor columns.",
          "Select a student for read follow-up.",
        ],
        durationMs: 6500,
      },
      {
        id: "yl-file",
        title: "Read registry file",
        route: "/admin/students · file",
        fm: ["FM-07", "FM-15"],
        body: "Open the same 12-tab Demo file read-only for year follow-up.",
        steps: [
          "Open the selected student file.",
          "Step through Academics → Student → Registration tabs.",
          "Demo read shell for year follow-up.",
        ],
        durationMs: 7000,
      },
    ],
  },
  {
    id: "student",
    label: "Student",
    portal: "https://student.lesotho.raisd.co",
    account: "Keychain · alya@raisd.demo / alya2026",
    summary: "Registration with NMDS + finance / CAF (FM-06 / FM-08 / FM-09)",
    scenes: [
      {
        id: "stu-signin",
        title: "Sign in to Student",
        route: "/sign-in",
        fm: ["FM-01", "FM-06", "FM-14"],
        body: "Open the Lesotho Student host with a Demo student account.",
        steps: [
          "Open https://student.lesotho.raisd.co (Keychain Student).",
          "Use alya@raisd.demo or the account created by Accept Enrolment / Lesotho fixture.",
          "Confirm Dashboard loads for the Demo enrolment.",
        ],
        durationMs: 6500,
      },
      {
        id: "stu-reg",
        title: "Submit module registration",
        route: "/registration",
        fm: ["FM-06", "FM-08"],
        body: "Select modules and, when NMDS applies, enter sponsor + borrower.",
        steps: [
          "Open Registration / module selection for the current term.",
          "Choose modules allowed by Demo curriculum rules.",
          "If prompted, enter sponsorCode (e.g. nmds) and borrowerReference — Submit for Staff clearance.",
        ],
        durationMs: 8000,
      },
      {
        id: "stu-finance",
        title: "Finance and CAF",
        route: "/finance",
        fm: ["FM-06", "FM-09"],
        body: "After Staff clearance, review Demo invoices / CAF.",
        steps: [
          "Complete Bursary + Faculty clearance on Staff (see those roles).",
          "Return to Student → Finance / documents.",
          "Open CAF / invoice artefacts labelled DEMO — amounts from finance profile JSON.",
        ],
        durationMs: 7500,
      },
    ],
  },
  {
    id: "control",
    label: "Control",
    portal: "https://control.raisd.co",
    account: "Keychain · sso.admin@raisd.demo / admin2026",
    summary: "Lesotho Flows catalogues and position seeds (FM-05 / FM-15)",
    scenes: [
      {
        id: "ctl-flows",
        title: "Open Lesotho Admissions Flows",
        route: "/flows/admissions/campus-lesotho",
        fm: ["FM-05"],
        body: "Open the Control Admissions policy editor for campus-lesotho.",
        steps: [
          "Keychain → sso.admin@raisd.demo → control.raisd.co.",
          "Open Flows → Admissions → Lesotho.",
          "Load current / draft settings (Demo storage).",
        ],
        durationMs: 7000,
      },
      {
        id: "ctl-review",
        title: "Desk review flags",
        route: "/flows · Desk review",
        fm: ["FM-05"],
        body: "Confirm Lesotho review flags for rank, extract, and n/3 desks.",
        steps: [
          "Scroll to Desk review (Lesotho).",
          "Ensure showRankScore and extractRequired are on.",
          "Confirm recommendation desks: faculty → qa → registry (or Use faculty → QA → Registry).",
        ],
        durationMs: 7000,
      },
      {
        id: "ctl-catalogues",
        title: "Load Demo catalogues",
        route: "/flows · Admissions catalogues",
        fm: ["FM-05"],
        body: "Load intake / certificate / subject / school / entry Demo lists.",
        steps: [
          "Open Admissions catalogues (Demo) card.",
          "Click Load Lesotho Demo catalogues.",
          "Validate draft (optional) — publish only if you intend to bump the Demo policy version.",
        ],
        durationMs: 7500,
      },
      {
        id: "ctl-positions",
        title: "Positions note",
        route: "/campuses · roles",
        fm: ["FM-15", "FM-01"],
        body: "Lesotho desk roles are seeded in SSO + Keychain for Demo.",
        steps: [
          "Open Campus members / roles for Lesotho (or rely on Keychain presets).",
          "Confirm custom roles: Registry, QA, Bursary, Faculty Review, Year Leader.",
          "Publishing a Flow never grants portal access — assignments stay on Members.",
        ],
        durationMs: 7500,
      },
    ],
  },
]

/** Demo portal URLs used by the recorder (and “Open portal” link). */
export const SCENE_URLS = {
  "app-signin": "https://apply.lesotho.raisd.co/applications",
  "app-draft": "https://apply.lesotho.raisd.co/applications",
  "app-fee": "https://apply.lesotho.raisd.co/applications",
  "app-eligibility": "https://apply.lesotho.raisd.co/applications",
  "app-offer": "https://apply.lesotho.raisd.co/applications",
  "fac-open": "https://staff.lesotho.raisd.co/admin/applicants",
  "fac-rank": "https://staff.lesotho.raisd.co/admin/applicants",
  "fac-rec": "https://staff.lesotho.raisd.co/admin/applicants",
  "qa-open": "https://staff.lesotho.raisd.co/admin/document-review",
  "qa-extract": "https://staff.lesotho.raisd.co/admin/document-review",
  "qa-verify": "https://staff.lesotho.raisd.co/admin/document-review",
  "bur-pay": "https://staff.lesotho.raisd.co/admin/payments",
  "bur-fees": "https://staff.lesotho.raisd.co/admin/fees",
  "bur-reg": "https://staff.lesotho.raisd.co/admin/registrations",
  "reg-offer": "https://staff.lesotho.raisd.co/admin/applicants",
  "reg-queue": "https://staff.lesotho.raisd.co/admin/registrations",
  "reg-list": "https://staff.lesotho.raisd.co/admin/students",
  "reg-file-academics": "https://staff.lesotho.raisd.co/admin/students",
  "reg-file-sponsors": "https://staff.lesotho.raisd.co/admin/students",
  "yl-signin": "https://staff.lesotho.raisd.co/admin",
  "yl-list": "https://staff.lesotho.raisd.co/admin/students",
  "yl-file": "https://staff.lesotho.raisd.co/admin/students",
  "stu-signin": "https://student.lesotho.raisd.co/",
  "stu-reg": "https://student.lesotho.raisd.co/registration",
  "stu-finance": "https://student.lesotho.raisd.co/finance",
  "ctl-flows": "https://control.raisd.co/flows/admissions/campus-lesotho",
  "ctl-review": "https://control.raisd.co/flows/admissions/campus-lesotho",
  "ctl-catalogues": "https://control.raisd.co/flows/admissions/campus-lesotho",
  "ctl-positions": "https://control.raisd.co/campuses/campus-lesotho",
}

export function sceneUrl(role, scene) {
  if (SCENE_URLS[scene.id]) return SCENE_URLS[scene.id]
  if (scene.href) return scene.href
  const path = (scene.route || "").split("·")[0].trim()
  if (!path || path === "/") return role.portal
  return `${role.portal.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`
}

export function flattenScenes(roles = ROLES) {
  const flat = []
  roles.forEach((role, roleIndex) => {
    role.scenes.forEach((scene, sceneIndex) => {
      flat.push({ role, roleIndex, scene, sceneIndex })
    })
  })
  return flat
}

export function buildFeatureIndex(roles = ROLES) {
  const map = new Map()
  for (const entry of flattenScenes(roles)) {
    for (const fm of entry.scene.fm || []) {
      if (!map.has(fm)) map.set(fm, [])
      map.get(fm).push(entry)
    }
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([fm, scenes]) => ({ fm, scenes }))
}

const VIDEO_BASE = "./playback-videos"

export function createPlayer(options) {
  const {
    roles = ROLES,
    roleListEl,
    featureListEl,
    stageEl,
    roleBadgeEl,
    portalEl,
    accountEl,
    routeEl,
    titleEl,
    bodyEl,
    stepsEl,
    fmEl,
    videoEl,
    missingEl,
    videoStatusEl,
    openPortalBtn,
    progressRoleEl,
    progressAllEl,
    statusEl,
    playBtn,
    pauseBtn,
    prevBtn,
    nextBtn,
    speedBtn,
    manifestUrl = `${VIDEO_BASE}/manifest.json`,
  } = options

  const flat = flattenScenes(roles)
  const featureIndex = buildFeatureIndex(roles)
  /** @type {Record<string, { file?: string, poster?: string }>} */
  let manifestById = {}
  let index = 0
  let playing = false
  let speed = 2
  let stepTimer = null
  let stepHighlight = 0
  let activeFm = null
  let loadToken = 0

  function totalCount() {
    return flat.length
  }

  function current() {
    return flat[index] ?? flat[0]
  }

  function clearStepTimer() {
    if (stepTimer != null) {
      clearInterval(stepTimer)
      stepTimer = null
    }
  }

  function videoSrcFor(sceneId) {
    const entry = manifestById[sceneId]
    if (entry?.file) return `${VIDEO_BASE}/${entry.file}`
    return `${VIDEO_BASE}/${sceneId}.webm`
  }

  function posterFor(sceneId) {
    const entry = manifestById[sceneId]
    if (entry?.poster) return `${VIDEO_BASE}/${entry.poster}`
    return `${VIDEO_BASE}/${sceneId}.poster.jpg`
  }

  function setVideoStatus(text) {
    if (videoStatusEl) videoStatusEl.textContent = text
  }

  function highlightSteps(steps) {
    if (!stepsEl) return
    const items = stepsEl.querySelectorAll("li")
    items.forEach((li, i) => {
      li.setAttribute("data-active", i === stepHighlight ? "true" : "false")
    })
  }

  function startStepPulse(steps) {
    clearStepTimer()
    if (!steps?.length) return
    stepHighlight = 0
    highlightSteps(steps)
    if (!playing) return
    const per = Math.max(
      1400,
      Math.round(((current().scene.durationMs || 7000) / speed) / steps.length)
    )
    stepTimer = setInterval(() => {
      stepHighlight = Math.min(steps.length - 1, stepHighlight + 1)
      highlightSteps(steps)
      if (stepHighlight >= steps.length - 1 && stepTimer) {
        clearInterval(stepTimer)
        stepTimer = null
      }
    }, per)
  }

  function syncUrl() {
    const { role, scene } = current()
    const url = new URL(location.href)
    url.searchParams.set("role", role.id)
    url.searchParams.set("scene", scene.id)
    if (activeFm) url.searchParams.set("fm", activeFm)
    else url.searchParams.delete("fm")
    history.replaceState(null, "", url)
  }

  function showMissing(sceneId) {
    if (videoEl) {
      videoEl.pause()
      videoEl.removeAttribute("src")
      videoEl.removeAttribute("poster")
      videoEl.hidden = true
    }
    if (missingEl) {
      missingEl.hidden = false
      const idEl = missingEl.querySelector("[data-missing-id]")
      if (idEl) idEl.textContent = sceneId
    }
    setVideoStatus(`Video not recorded yet · ${sceneId}`)
  }

  function hideMissing() {
    if (missingEl) missingEl.hidden = true
    if (videoEl) videoEl.hidden = false
  }

  function loadSceneVideo({ autoplay = false } = {}) {
    const { scene } = current()
    const video = videoEl
    if (!video) return
    const token = ++loadToken
    const src = videoSrcFor(scene.id)
    const poster = posterFor(scene.id)
    setVideoStatus(`Loading ${scene.id}…`)
    hideMissing()
    video.pause()
    // Drop prior media listeners by cloning is heavy; detach known handlers via replace.
    video.onerror = null
    video.onloadeddata = null
    video.onloadedmetadata = null
    video.playbackRate = speed
    // Avoid broken poster URLs flipping UI; set poster only after media proves present.
    video.removeAttribute("poster")

    const fail = () => {
      if (token !== loadToken) return
      showMissing(scene.id)
      if (playing) {
        window.setTimeout(() => {
          if (token !== loadToken || !playing) return
          next()
        }, Math.max(1800, Math.round((scene.durationMs || 5000) / speed)))
      }
    }

    const ok = () => {
      if (token !== loadToken) return
      hideMissing()
      video.poster = poster
      setVideoStatus(`Ready · ${scene.id}`)
      if (autoplay || playing) {
        video.playbackRate = speed
        video.play().catch(() => {
          setVideoStatus(`Paused · click Play on the video · ${scene.id}`)
        })
      }
    }

    // Prefer an existence check so a 404 never leaves a half-broken <video> state.
    fetch(src, { method: "HEAD", cache: "no-cache" })
      .then((res) => {
        if (token !== loadToken) return
        if (!res.ok) {
          fail()
          return
        }
        video.onerror = fail
        video.onloadeddata = ok
        video.src = src
        video.load()
      })
      .catch(() => {
        // HEAD may be blocked; fall back to direct media load.
        if (token !== loadToken) return
        video.onerror = fail
        video.onloadeddata = ok
        video.src = src
        video.load()
      })
  }

  function renderRoleList() {
    if (!roleListEl) return
    roleListEl.innerHTML = ""
    roles.forEach((role, roleIndex) => {
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "role-item"
      btn.dataset.roleId = role.id
      btn.setAttribute("aria-current", current().roleIndex === roleIndex ? "true" : "false")
      btn.innerHTML = `<span class="role-ord">${roleIndex + 1}</span><span class="role-meta"><strong>${role.label}</strong><span>${role.summary}</span></span>`
      btn.addEventListener("click", () => {
        const first = flat.findIndex((f) => f.roleIndex === roleIndex)
        if (first < 0) return
        pause({ keepStatus: true })
        index = first
        activeFm = null
        render()
      })
      roleListEl.appendChild(btn)
    })
  }

  function renderFeatureList() {
    if (!featureListEl) return
    featureListEl.innerHTML = ""
    for (const { fm, scenes } of featureIndex) {
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "fm-item"
      const sceneIds = current().scene.fm || []
      const isActive = activeFm === fm || sceneIds.includes(fm)
      btn.setAttribute("aria-current", isActive ? "true" : "false")
      const labels = [...new Set(scenes.map((s) => s.role.label))].slice(0, 3).join(" · ")
      btn.innerHTML = `<span class="fm-code">${fm}</span><span class="fm-meta"><strong>${scenes.length} scene${scenes.length === 1 ? "" : "s"}</strong><span>${labels}</span></span>`
      btn.addEventListener("click", () => {
        const first = flat.findIndex((f) => (f.scene.fm || []).includes(fm))
        if (first < 0) return
        pause({ keepStatus: true })
        index = first
        activeFm = fm
        render()
      })
      featureListEl.appendChild(btn)
    }
  }

  function render() {
    const { role, scene, sceneIndex } = current()
    const url = sceneUrl(role, scene)
    if (roleBadgeEl) roleBadgeEl.textContent = role.label
    if (portalEl) {
      portalEl.textContent = role.portal
      if (role.portal.startsWith("http")) portalEl.href = role.portal
      else portalEl.removeAttribute("href")
    }
    if (accountEl) accountEl.textContent = role.account || ""
    if (routeEl) routeEl.textContent = scene.route
    if (titleEl) titleEl.textContent = scene.title
    if (bodyEl) bodyEl.textContent = scene.body
    if (openPortalBtn) {
      openPortalBtn.href = url
      openPortalBtn.hidden = !url
    }
    if (stepsEl) {
      stepsEl.innerHTML = ""
      const heading = document.createElement("h3")
      heading.className = "exec-heading"
      heading.textContent = "How executed"
      stepsEl.appendChild(heading)
      const ol = document.createElement("ol")
      ol.className = "exec-steps"
      for (const step of scene.steps || []) {
        const li = document.createElement("li")
        li.textContent = step
        ol.appendChild(li)
      }
      stepsEl.appendChild(ol)
      stepHighlight = 0
      highlightSteps(scene.steps || [])
    }
    if (fmEl) {
      fmEl.innerHTML = ""
      for (const tag of scene.fm) {
        const span = document.createElement("button")
        span.type = "button"
        span.className = "tag tag-partial"
        span.textContent = tag
        if (activeFm === tag) span.setAttribute("data-active", "true")
        span.addEventListener("click", () => {
          activeFm = tag
          const first = flat.findIndex((f) => (f.scene.fm || []).includes(tag))
          if (first >= 0) {
            pause({ keepStatus: true })
            index = first
            render()
          } else {
            renderFeatureList()
            syncUrl()
          }
        })
        fmEl.appendChild(span)
      }
      const recorded = document.createElement("span")
      recorded.className = "tag tag-out"
      recorded.textContent = "Recorded video"
      fmEl.appendChild(recorded)
    }
    if (stageEl) {
      stageEl.dataset.role = role.id
      stageEl.dataset.scene = scene.id
    }
    if (progressRoleEl) {
      const n = role.scenes.length
      progressRoleEl.style.width = `${((sceneIndex + 1) / n) * 100}%`
      progressRoleEl.parentElement?.setAttribute("aria-valuenow", String(sceneIndex + 1))
      progressRoleEl.parentElement?.setAttribute("aria-valuemax", String(n))
    }
    if (progressAllEl) {
      progressAllEl.style.width = `${((index + 1) / totalCount()) * 100}%`
      progressAllEl.parentElement?.setAttribute("aria-valuenow", String(index + 1))
      progressAllEl.parentElement?.setAttribute("aria-valuemax", String(totalCount()))
    }
    if (statusEl) {
      statusEl.textContent = `Role ${current().roleIndex + 1}/${roles.length} · Scene ${sceneIndex + 1}/${role.scenes.length} · ${index + 1}/${totalCount()}`
    }
    renderRoleList()
    renderFeatureList()
    syncUrl()
    updateChrome()
    loadSceneVideo({ autoplay: playing })
    if (playing) startStepPulse(scene.steps || [])
  }

  function updateChrome() {
    if (playBtn) playBtn.disabled = playing
    if (pauseBtn) pauseBtn.disabled = !playing
    if (prevBtn) prevBtn.disabled = index <= 0
    if (nextBtn) nextBtn.disabled = index >= totalCount() - 1
    if (speedBtn) speedBtn.textContent = `${speed}×`
    if (videoEl) videoEl.playbackRate = speed
  }

  function play() {
    playing = true
    if (index >= totalCount() - 1 && videoEl?.ended) {
      index = 0
      render()
      return
    }
    updateChrome()
    startStepPulse(current().scene.steps || [])
    if (videoEl && !videoEl.hidden) {
      videoEl.playbackRate = speed
      videoEl.play().catch(() => {})
      setVideoStatus(`Playing · ${current().scene.id}`)
    } else {
      loadSceneVideo({ autoplay: true })
    }
  }

  function pause({ keepStatus = false } = {}) {
    playing = false
    clearStepTimer()
    videoEl?.pause()
    updateChrome()
    if (!keepStatus && statusEl) {
      const { sceneIndex } = current()
      statusEl.textContent = `Paused · Role ${current().roleIndex + 1}/${roles.length} · Scene ${sceneIndex + 1}/${current().role.scenes.length}`
    }
  }

  function prev() {
    if (index <= 0) return
    const wasPlaying = playing
    clearStepTimer()
    index -= 1
    render()
    if (wasPlaying) play()
  }

  function next() {
    if (index >= totalCount() - 1) {
      playing = false
      clearStepTimer()
      videoEl?.pause()
      updateChrome()
      if (statusEl) statusEl.textContent = "Finished all roles"
      setVideoStatus("Finished all scenes")
      return
    }
    const wasPlaying = playing
    clearStepTimer()
    index += 1
    render()
    if (wasPlaying) play()
  }

  function toggleSpeed() {
    // Cycle faster rates for walkthrough review.
    const rates = [2, 3, 4, 1.5]
    const i = rates.indexOf(speed)
    speed = rates[(i + 1) % rates.length]
    updateChrome()
    if (playing) startStepPulse(current().scene.steps || [])
  }

  videoEl?.addEventListener("ended", () => {
    if (!playing) {
      setVideoStatus(`Ended · ${current().scene.id}`)
      return
    }
    next()
  })

  playBtn?.addEventListener("click", play)
  pauseBtn?.addEventListener("click", pause)
  prevBtn?.addEventListener("click", prev)
  nextBtn?.addEventListener("click", next)
  speedBtn?.addEventListener("click", toggleSpeed)

  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) || ""
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "VIDEO") return
    if (e.code === "Space") {
      e.preventDefault()
      if (playing) pause()
      else play()
    } else if (e.code === "ArrowLeft") {
      e.preventDefault()
      prev()
    } else if (e.code === "ArrowRight") {
      e.preventDefault()
      next()
    }
  })

  const params = new URLSearchParams(location.search)
  const sceneParam = params.get("scene")
  const roleParam = params.get("role")
  const fmParam = params.get("fm")
  if (sceneParam) {
    const found = flat.findIndex((f) => f.scene.id === sceneParam)
    if (found >= 0) index = found
  } else if (roleParam) {
    const first = flat.findIndex((f) => f.role.id === roleParam)
    if (first >= 0) index = first
  }
  if (fmParam) {
    activeFm = fmParam
    if (!sceneParam) {
      const first = flat.findIndex((f) => (f.scene.fm || []).includes(fmParam))
      if (first >= 0) index = first
    }
  }

  fetch(manifestUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data?.scenes) return
      for (const entry of data.scenes) {
        if (entry?.sceneId) manifestById[entry.sceneId] = entry
      }
    })
    .catch(() => {})
    .finally(() => {
      render()
    })

  return { play, pause, prev, next, render }
}
