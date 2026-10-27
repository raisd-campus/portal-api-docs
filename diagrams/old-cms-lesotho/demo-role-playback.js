/**
 * Lesotho Raisd Demo W1–W3 role-by-role storyboard playback.
 * Demo ≠ Live. No Portal API calls.
 */
export const ROLES = [
  {
    id: "applicant",
    label: "Applicant",
    portal: "applicant.lesotho.raisd.co",
    summary: "Apply → fee proof → offer accept (FM-02 / FM-09)",
    scenes: [
      {
        id: "app-signin",
        title: "Sign in to Applicant",
        route: "/sign-in",
        fm: ["FM-01", "FM-02", "FM-14"],
        body: "Open the Lesotho Applicant host and sign in with a Demo applicant account (Keychain or SSO).",
        durationMs: 5500,
      },
      {
        id: "app-draft",
        title: "Draft and submit application",
        route: "/apply",
        fm: ["FM-02"],
        body: "Complete study preferences for campus-lesotho, academic evidence, and submit. Policy pins to the Lesotho Admissions profile.",
        durationMs: 6000,
      },
      {
        id: "app-fee",
        title: "Application fee proof",
        route: "/apply · payment",
        fm: ["FM-09", "FM-02"],
        body: "Upload bank proof for the LSL application fee from the campus finance profile (Demo amount LSL 300).",
        durationMs: 5500,
      },
      {
        id: "app-eligibility",
        title: "Confirm eligibility",
        route: "/apply · eligibility",
        fm: ["FM-02", "FM-03"],
        body: "After QA verifies documents, confirm eligibility and continue towards Offer.",
        durationMs: 5500,
      },
      {
        id: "app-offer",
        title: "Accept Offer Letter",
        route: "/apply · offer",
        fm: ["FM-02"],
        body: "When Registry releases the Demo Offer, preview and Accept Enrolment to hand off into Student.",
        durationMs: 6000,
      },
    ],
  },
  {
    id: "faculty",
    label: "Faculty Review",
    portal: "admin.lesotho.raisd.co · Applicants",
    summary: "Rank / score / recommendation desk (FM-03 / FM-05 / FM-15)",
    scenes: [
      {
        id: "fac-open",
        title: "Open Admissions review",
        route: "/admin/applicants",
        fm: ["FM-03", "FM-15"],
        body: "Sign in as Lesotho Faculty Review. Open the submitted Lesotho application in the Staff Applicants queue.",
        durationMs: 5500,
      },
      {
        id: "fac-rank",
        title: "Set rank and score",
        route: "/admin/applicants · review",
        fm: ["FM-03", "FM-05"],
        body: "Lesotho policy enables showRankScore. Record the Demo rank and score on the case.",
        durationMs: 5500,
      },
      {
        id: "fac-rec",
        title: "Record faculty recommendation",
        route: "/admin/applicants · recommendation",
        fm: ["FM-03", "FM-05"],
        body: "Complete the first desk in the faculty → QA → Registry n/3 recommendation chain.",
        durationMs: 6000,
      },
    ],
  },
  {
    id: "qa",
    label: "QA",
    portal: "admin.lesotho.raisd.co · Document review",
    summary: "LGCSE extract and document verify (FM-04 / FM-03)",
    scenes: [
      {
        id: "qa-open",
        title: "Open Document review",
        route: "/admin/document-review",
        fm: ["FM-04", "FM-15"],
        body: "Sign in as Lesotho QA. Open the case that needs extract and document verification.",
        durationMs: 5500,
      },
      {
        id: "qa-extract",
        title: "Run LGCSE extract",
        route: "/admin/document-review · extract",
        fm: ["FM-04", "FM-05"],
        body: "Lesotho policy sets extractRequired. Record Demo certificate subject rows (LGCSE seed).",
        durationMs: 6000,
      },
      {
        id: "qa-verify",
        title: "Verify documents",
        route: "/admin/document-review · verify",
        fm: ["FM-04", "FM-03"],
        body: "After extract and prior recommendations, complete QA verify-documents so eligibility can proceed.",
        durationMs: 5500,
      },
    ],
  },
  {
    id: "bursary",
    label: "Bursary",
    portal: "admin.lesotho.raisd.co · Payments / Fees / Registrations",
    summary: "Fee verify, Fees & Fines preview, registration clearance (FM-09 / FM-08)",
    scenes: [
      {
        id: "bur-pay",
        title: "Verify application payment",
        route: "/admin/payments",
        fm: ["FM-09", "FM-03"],
        body: "Open Admissions Payments / payment queue and approve the Demo fee proof (not Live CMS).",
        durationMs: 5500,
      },
      {
        id: "bur-fees",
        title: "Fees & Fines catalogue preview",
        route: "/admin/fees",
        fm: ["FM-09"],
        body: "Open Fees & Fines to review the Demo LSL catalogue (Application 300, Acceptance 550, Registration 550, walk seeds).",
        durationMs: 6000,
      },
      {
        id: "bur-reg",
        title: "Bursary registration clearance",
        route: "/admin/registrations",
        fm: ["FM-08", "FM-09"],
        body: "On a module-registration request, record verified-payment or approved-arrangement clearance. Note sponsor / borrower when present.",
        durationMs: 6000,
      },
    ],
  },
  {
    id: "registry",
    label: "Registry",
    portal: "admin.lesotho.raisd.co · Applicants / Registrations / Students",
    summary: "Offer release, registration desk, 12-tab file (FM-03 / FM-08 / FM-07)",
    scenes: [
      {
        id: "reg-offer",
        title: "Release Offer Letter",
        route: "/admin/applicants · offer",
        fm: ["FM-03"],
        body: "As Lesotho Registry, release the Demo Offer after eligibility confirmation (n/3 desks complete).",
        durationMs: 5500,
      },
      {
        id: "reg-queue",
        title: "Module registration desk",
        route: "/admin/registrations",
        fm: ["FM-08"],
        body: "Review student module requests. Faculty side checks modules after Bursary clearance; sponsor/borrower columns show NMDS Demo fields.",
        durationMs: 6000,
      },
      {
        id: "reg-list",
        title: "Students list",
        route: "/admin/students",
        fm: ["FM-07"],
        body: "Open the Demo registry list (graph-backed). Select a student such as the Lesotho fixture.",
        durationMs: 5500,
      },
      {
        id: "reg-file-academics",
        title: "Student file — Academics",
        route: "/admin/students · Academics",
        fm: ["FM-07"],
        body: "Twelve-tab Demo file: programme, term, module grid (Code, Name, Status, Cr, Mk, Gd). Not Live CAP-53.",
        durationMs: 5500,
      },
      {
        id: "reg-file-sponsors",
        title: "Student file — Sponsors / Registration",
        route: "/admin/students · Sponsors",
        fm: ["FM-07", "FM-08"],
        body: "Sponsors tab shows funding awards and borrower reference; Registration tab lists requests with sponsorCode.",
        durationMs: 6000,
      },
    ],
  },
  {
    id: "year-leader",
    label: "Year Leader",
    portal: "admin.lesotho.raisd.co · Students",
    summary: "Narrow Students view (FM-07 / FM-15)",
    scenes: [
      {
        id: "yl-signin",
        title: "Sign in as Year Leader",
        route: "/sign-in",
        fm: ["FM-01", "FM-15"],
        body: "Use the Lesotho Year Leader custom role (Students + Overview; no Access).",
        durationMs: 5000,
      },
      {
        id: "yl-list",
        title: "Browse enrolled students",
        route: "/admin/students",
        fm: ["FM-07"],
        body: "Open the Demo Students list scoped to campus access.",
        durationMs: 5500,
      },
      {
        id: "yl-file",
        title: "Read registry file",
        route: "/admin/students · file",
        fm: ["FM-07", "FM-15"],
        body: "Open a student file read-only for year follow-up. Same 12-tab Demo shell as Registry.",
        durationMs: 5500,
      },
    ],
  },
  {
    id: "student",
    label: "Student",
    portal: "student.lesotho.raisd.co",
    summary: "Registration with NMDS + finance / CAF (FM-06 / FM-08 / FM-09)",
    scenes: [
      {
        id: "stu-signin",
        title: "Sign in to Student",
        route: "/sign-in",
        fm: ["FM-01", "FM-06", "FM-14"],
        body: "Open the Lesotho Student host with the Demo Lesotho student (or post-acceptance account).",
        durationMs: 5500,
      },
      {
        id: "stu-reg",
        title: "Submit module registration",
        route: "/registration",
        fm: ["FM-06", "FM-08"],
        body: "Select modules for the term. Where NMDS applies, supply sponsorCode and borrowerReference on the request.",
        durationMs: 6000,
      },
      {
        id: "stu-finance",
        title: "Finance and CAF",
        route: "/finance",
        fm: ["FM-06", "FM-09"],
        body: "After Bursary + Faculty clearance, review Demo invoices / CAF artefacts. Amounts come from the finance profile, not Live CMS.",
        durationMs: 6000,
      },
    ],
  },
  {
    id: "control",
    label: "Control",
    portal: "control.raisd.co",
    summary: "Lesotho Flows catalogues and position seeds (FM-05 / FM-15)",
    scenes: [
      {
        id: "ctl-flows",
        title: "Open Lesotho Admissions Flows",
        route: "/flows/admissions/campus-lesotho",
        fm: ["FM-05"],
        body: "Control editor with flows.configure opens the campus-lesotho Admissions policy draft.",
        durationMs: 5500,
      },
      {
        id: "ctl-review",
        title: "Desk review flags",
        route: "/flows · Desk review",
        fm: ["FM-05"],
        body: "Confirm showRankScore, extractRequired, and faculty → QA → Registry recommendation desks.",
        durationMs: 5500,
      },
      {
        id: "ctl-catalogues",
        title: "Load Demo catalogues",
        route: "/flows · Admissions catalogues",
        fm: ["FM-05"],
        body: "Load Lesotho Demo catalogues: intakes, certificate types, subjects, recognized schools, entry requirements.",
        durationMs: 6000,
      },
      {
        id: "ctl-positions",
        title: "Positions note",
        route: "/campuses · roles",
        fm: ["FM-15", "FM-01"],
        body: "Lesotho Registry / QA / Bursary / Faculty Review / Year Leader custom roles are seeded in SSO + Keychain for Demo desks.",
        durationMs: 6000,
      },
    ],
  },
]

export function flattenScenes(roles = ROLES) {
  const flat = []
  roles.forEach((role, roleIndex) => {
    role.scenes.forEach((scene, sceneIndex) => {
      flat.push({ role, roleIndex, scene, sceneIndex })
    })
  })
  return flat
}

export function createPlayer(options) {
  const {
    roles = ROLES,
    roleListEl,
    stageEl,
    roleBadgeEl,
    portalEl,
    routeEl,
    titleEl,
    bodyEl,
    fmEl,
    progressRoleEl,
    progressAllEl,
    statusEl,
    playBtn,
    pauseBtn,
    prevBtn,
    nextBtn,
    speedBtn,
  } = options

  const flat = flattenScenes(roles)
  let index = 0
  let playing = false
  let speed = 1
  let timer = null

  function totalCount() {
    return flat.length
  }

  function current() {
    return flat[index] ?? flat[0]
  }

  function clearTimer() {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
  }

  function schedule() {
    clearTimer()
    if (!playing) return
    const { scene } = current()
    const ms = Math.max(2000, Math.round((scene.durationMs || 5500) / speed))
    timer = setTimeout(() => {
      if (index >= totalCount() - 1) {
        playing = false
        updateChrome()
        if (statusEl) statusEl.textContent = "Finished all roles"
        return
      }
      index += 1
      render()
      schedule()
    }, ms)
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
        playing = false
        clearTimer()
        index = first
        render()
        updateChrome()
        const url = new URL(location.href)
        url.searchParams.set("role", role.id)
        history.replaceState(null, "", url)
      })
      roleListEl.appendChild(btn)
    })
  }

  function render() {
    const { role, scene, sceneIndex } = current()
    if (roleBadgeEl) roleBadgeEl.textContent = role.label
    if (portalEl) portalEl.textContent = role.portal
    if (routeEl) routeEl.textContent = scene.route
    if (titleEl) titleEl.textContent = scene.title
    if (bodyEl) bodyEl.textContent = scene.body
    if (fmEl) {
      fmEl.innerHTML = ""
      for (const tag of scene.fm) {
        const span = document.createElement("span")
        span.className = "tag tag-partial"
        span.textContent = tag
        fmEl.appendChild(span)
      }
      const demo = document.createElement("span")
      demo.className = "tag tag-out"
      demo.textContent = "Demo ≠ Live"
      fmEl.appendChild(demo)
    }
    if (stageEl) {
      stageEl.dataset.role = role.id
      stageEl.dataset.scene = scene.id
    }
    if (progressRoleEl) {
      const n = role.scenes.length
      progressRoleEl.style.width = `${((sceneIndex + 1) / n) * 100}%`
      progressRoleEl.parentElement?.setAttribute(
        "aria-valuenow",
        String(sceneIndex + 1)
      )
      progressRoleEl.parentElement?.setAttribute("aria-valuemax", String(n))
    }
    if (progressAllEl) {
      progressAllEl.style.width = `${((index + 1) / totalCount()) * 100}%`
      progressAllEl.parentElement?.setAttribute("aria-valuenow", String(index + 1))
      progressAllEl.parentElement?.setAttribute(
        "aria-valuemax",
        String(totalCount())
      )
    }
    if (statusEl) {
      statusEl.textContent = `Role ${current().roleIndex + 1}/${roles.length} · Scene ${sceneIndex + 1}/${role.scenes.length} · ${index + 1}/${totalCount()}`
    }
    renderRoleList()
    updateChrome()
  }

  function updateChrome() {
    if (playBtn) playBtn.disabled = playing
    if (pauseBtn) pauseBtn.disabled = !playing
    if (prevBtn) prevBtn.disabled = index <= 0
    if (nextBtn) nextBtn.disabled = index >= totalCount() - 1
    if (speedBtn) speedBtn.textContent = `${speed}×`
  }

  function play() {
    playing = true
    if (statusEl && index >= totalCount() - 1) {
      /* restart from beginning when finished */
      index = 0
      render()
    }
    updateChrome()
    schedule()
  }

  function pause() {
    playing = false
    clearTimer()
    updateChrome()
    if (statusEl) {
      const { role, sceneIndex } = current()
      statusEl.textContent = `Paused · Role ${current().roleIndex + 1}/${roles.length} · Scene ${sceneIndex + 1}/${role.scenes.length}`
    }
  }

  function prev() {
    if (index <= 0) return
    clearTimer()
    index -= 1
    render()
    if (playing) schedule()
  }

  function next() {
    if (index >= totalCount() - 1) {
      playing = false
      clearTimer()
      updateChrome()
      if (statusEl) statusEl.textContent = "Finished all roles"
      return
    }
    clearTimer()
    index += 1
    render()
    if (playing) schedule()
  }

  function toggleSpeed() {
    speed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1
    updateChrome()
    if (playing) schedule()
  }

  playBtn?.addEventListener("click", play)
  pauseBtn?.addEventListener("click", pause)
  prevBtn?.addEventListener("click", prev)
  nextBtn?.addEventListener("click", next)
  speedBtn?.addEventListener("click", toggleSpeed)

  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) || ""
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return
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
  const roleParam = params.get("role")
  if (roleParam) {
    const first = flat.findIndex((f) => f.role.id === roleParam)
    if (first >= 0) index = first
  }

  render()
  return { play, pause, prev, next, render }
}
