import type { AdmissionsSettings, AdmissionsWorkflow, AdmissionStepId } from "./admissions-policy"

export const admissionGroups = ["eligibility", "registration-fee", "english", "offer", "tuition", "entry", "arrival", "medical", "endorsement", "international-registration"] as const
export const admissionChildren: Partial<Record<AdmissionStepId, AdmissionStepId>> = { eligibility: "eligibility-confirmation", offer: "signed-offer" }
export const admissionCapabilities: Record<AdmissionStepId, readonly string[]> = {
  eligibility: ["review", "document-release"], "eligibility-confirmation": ["applicant-action"],
  "registration-fee": ["payment", "review"], english: ["applicant-action", "review"], offer: ["document-release"],
  "signed-offer": ["applicant-action", "review"], tuition: ["payment", "review"], entry: ["review"], arrival: ["review"],
  medical: ["review"], endorsement: ["review"], "international-registration": ["review"],
}
const internationalSteps = ["entry", "arrival", "medical", "endorsement", "international-registration"]
export const templatePlaceholders = ["applicantName", "applicationNumber", "campus", "programme", "faculty", "intake", "releaseDate", "registrationFee", "tuitionQuote", "englishRequirement"]
export function templateIssues(template: { title: string; body: string }): string[] {
  const content = `${template.title}\n${template.body}`
  const tokens = [...content.matchAll(/\{\{([^{}]+)\}\}/g)].map(match => match[1])
  const stripped = content.replace(/\{\{[^{}]+\}\}/g, "")
  return [...new Set(tokens.filter(token => !templatePlaceholders.includes(token)).map(token => `Unknown document placeholder: ${token}.`)),
    ...(/[{}<>]|\p{Cc}/u.test(stripped.replace(/[\n\r\t]/g, "")) ? ["Document text must contain plain text and approved placeholders only."] : [])]
}
export function workflowCohort(settings: AdmissionsSettings, studentType: string) {
  return settings.workflow?.cohorts[studentType === "international" ? "international" : "local"]
}
export function resolveWorkflowSettings(settings: AdmissionsSettings, studentType: string): AdmissionsSettings {
  const cohort = workflowCohort(settings, studentType)
  if (!cohort) return settings
  const s = structuredClone(cohort.settings), enabled = cohort.enabled
  s.eligibility.required = enabled.eligibility
  s.eligibility.confirmationRequired = enabled.eligibility && enabled["eligibility-confirmation"]
  s.registrationFee.applies = enabled["registration-fee"]
  s.english.requiredFor = enabled.english ? "all" : "none"
  s.offers.signedCopyRequired = enabled["signed-offer"]
  if (!enabled.tuition) s.tuition.otherStudents = "none"
  s.international.entryApprovalRequired = enabled.entry
  s.international.arrivalRequired = enabled.arrival
  s.international.medicalRequired = enabled.medical
  s.international.endorsementRequired = enabled.endorsement
  if (!enabled["international-registration"]) s.international.registrationGate = "none"
  return s
}
export function workflowOrder(settings: AdmissionsSettings, studentType: string): string[] | null {
  const cohort = workflowCohort(settings, studentType)
  return cohort ? [...cohort.order.flatMap(id => admissionChildren[id] ? [id, admissionChildren[id]!] : [id]), "deadlines"] : null
}
export function createAdmissionsWorkflow(settings: AdmissionsSettings): AdmissionsWorkflow {
  const { workflow: _workflow, ...base } = structuredClone(settings)
  const makeCohort = (type: "local" | "international"): AdmissionsWorkflow["cohorts"]["local"] => {
    const international = type === "international"
    return { order: [...admissionGroups], settings: structuredClone(base), enabled: {
      eligibility: base.eligibility.required, "eligibility-confirmation": base.eligibility.confirmationRequired,
      "registration-fee": base.registrationFee.applies, english: base.english.requiredFor === "all" || international && base.english.requiredFor === "international",
      offer: true, "signed-offer": base.offers.signedCopyRequired,
      tuition: international || base.tuition.otherStudents !== "none", entry: international && base.international.entryApprovalRequired,
      arrival: international && base.international.arrivalRequired, medical: international && base.international.medicalRequired,
      endorsement: international && base.international.endorsementRequired, "international-registration": international && base.international.registrationGate !== "none",
    }, pricing: { "registration-fee": { mode: "quote", campuses: [] }, tuition: { mode: "quote", campuses: [] } }, documents: {
      eligibility: { title: "Eligibility Letter", body: "Dear {{applicantName}},\nApplication {{applicationNumber}} for {{programme}} at {{campus}} has passed eligibility review.\nPlease confirm whether you wish to continue to enrolment." },
      conditional: { title: "Conditional Offer Letter", body: "Dear {{applicantName}},\nWe offer you a place in {{programme}}, {{intake}}, at {{campus}}.\n{{englishRequirement}}" },
      full: { title: "Full Offer Letter", body: "Dear {{applicantName}},\nWe offer you a place in {{programme}}, {{intake}}, at {{campus}}." },
    } }
  }
  const cohorts = { local: makeCohort("local"), international: makeCohort("international") }
  return { templateId: "admissions", templateVersion: 1, cohorts }
}
export function validateWorkflow(settings: AdmissionsSettings, campuses?: readonly string[]): string[] {
  if (!settings.workflow) return []
  const issues: string[] = []
  for (const type of ["local", "international"] as const) {
    const c = settings.workflow.cohorts[type], e = c.enabled
    const problem = (message: string) => issues.push(`${type}: ${message}`)
    if (new Set(c.order).size !== admissionGroups.length || admissionGroups.some(id => !c.order.includes(id))) problem("Each predefined group must occur exactly once.")
    if (c.order.at(-1) !== "international-registration") problem("International registration must retain its fixed final position.")
    if (!e.offer) problem("Offer Letter is mandatory.")
    if (type === "international" && !e.tuition) problem("New international tuition clearance is mandatory.")
    if (type === "local" && internationalSteps.some(id => e[id as AdmissionStepId])) problem("International-only steps cannot apply to Local students.")
    const before = (a: typeof admissionGroups[number], b: typeof admissionGroups[number]) => {
      if (e[a] && e[b] && c.order.indexOf(a) >= c.order.indexOf(b)) problem(`${a} must precede ${b}.`)
    }
    before("eligibility", "registration-fee"); before("eligibility", "offer")
    if (c.settings.registrationFee.requiredBefore === "offer") before("registration-fee", "offer")
    before("arrival", "medical"); before("arrival", "endorsement"); before("medical", "endorsement")
    for (const kind of ["registration-fee", "tuition"] as const) {
      const price = c.pricing[kind]
      if (new Set(price.campuses.map(row => row.campusId)).size !== price.campuses.length) problem(`${kind}: duplicate campus prices.`)
      if (price.mode === "fixed" && e[kind]) {
        for (const campus of campuses ?? []) if (!price.campuses.some(row => row.campusId === campus)) problem(`${kind}: missing fixed price for ${campus}.`)
        if (!price.campuses.length) problem(`${kind}: configure at least one campus price.`)
        if (kind === "tuition" && price.campuses.some(row => !row.basis)) problem("Fixed tuition requires an explicit payment basis.")
        if (kind === "tuition" && type === "international" && c.settings.tuition.newInternational === "first-year" && price.campuses.some(row => row.basis !== "first-year") && !c.settings.tuition.approvedSemesterAllowed) problem("Semester pricing cannot bypass first-year tuition requirements.")
      }
    }
    for (const template of Object.values(c.documents)) for (const message of templateIssues(template)) problem(message)
  }
  return issues
}
export function fixedAdmissionPrice(settings: AdmissionsSettings, studentType: string, campusId: string, kind: "registration-fee" | "tuition") {
  const cohort = workflowCohort(settings, studentType)
  const pricing = cohort?.enabled[kind] ? cohort.pricing[kind] : undefined
  return pricing?.mode === "fixed" ? pricing.campuses.find(row => row.campusId === campusId) ?? null : null
}
