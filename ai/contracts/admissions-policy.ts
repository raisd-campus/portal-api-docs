import { validateWorkflow, resolveWorkflowSettings, fixedAdmissionPrice } from "./admissions-workflow"
import { registrationTariffs, currencyDigits } from "./admissions-payments"
import { z } from "zod"
export { z }

export const flowCampusIds = [
  "campus-lesotho",
  "campus-cyberjaya",
  "campus-botswana",
  "campus-eswatini",
  "campus-sierra-leone",
  "campus-cambodia",
  "campus-uganda",
  "campus-namibia",
] as const
export const flowDeskSchema = z.enum([
  "qa",
  "registry",
  "bursary",
  "faculty",
  "international_office",
  "student_services",
])
const days = z.number().int().min(0).max(3650).nullable()
const text = z.string().trim().min(1)
const currency = z
  .string()
  .regex(/^[A-Z]{3}$/)
  .refine(
    (value) => Intl.supportedValuesOf("currency").includes(value),
    "Select a supported currency code."
  )
export const flowEvidenceSchema = z
  .object({
    id: text,
    name: text,
    sizeBytes: z
      .number()
      .int()
      .positive()
      .max(25 * 1024 ** 2),
    mimeType: text,
  })
  .strict()
export const admissionsStageIds = ["eligibility", "eligibility-confirmation", "registration-fee", "english", "offer", "signed-offer", "tuition", "entry", "arrival", "medical", "endorsement", "international-registration", "deadlines"] as const
/** Control-owned defaults for the current unfinished action, including older pinned policies. */
export const defaultAdmissionsPendingStatuses: Record<typeof admissionsStageIds[number], string> = {
  eligibility: "Awaiting {department} Review",
  "eligibility-confirmation": "Awaiting {department} Confirmation",
  "registration-fee": "Awaiting {department} Review",
  english: "Awaiting {department} Review",
  offer: "Awaiting {department} Release",
  "signed-offer": "Awaiting {department} Verification",
  tuition: "Awaiting {department} Clearance",
  entry: "Awaiting {department} Approval",
  arrival: "Awaiting {department} Arrival Confirmation",
  medical: "Awaiting {department} Clearance",
  endorsement: "Awaiting {department} Endorsement",
  "international-registration": "Awaiting {department} Clearance",
  deadlines: "Awaiting {department} Review",
}
export const defaultAdmissionsPresentation = {
  statuses: { pending: "Pending", complete: "Complete", draft: "Draft", actionRequired: "Action Required", accepted: "Enrolment Accepted" },
  departments: { qa: "QA", registry: "Registry", bursary: "Bursary", faculty: "Faculty", international_office: "International Office", student_services: "Student Services", applicant: "Applicant" },
  stages: {
    eligibility: { label: "Eligibility Review", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Eligibility Letter Released.", completeStatus: "Eligibility Letter Released", pendingStatus: defaultAdmissionsPendingStatuses["eligibility"] },
    "eligibility-confirmation": { label: "Confirm Eligibility", pendingUpdate: "Awaiting applicant confirmation.", completeUpdate: "Completed.", completeStatus: "Eligibility Confirmed", pendingStatus: defaultAdmissionsPendingStatuses["eligibility-confirmation"] },
    "registration-fee": { label: "Registration Fee", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["registration-fee"] },
    english: { label: "English Clearance", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["english"] },
    offer: { label: "Offer Letter", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", completeStatus: "Offer Letter Released", pendingStatus: defaultAdmissionsPendingStatuses["offer"] },
    "signed-offer": { label: "Signed Offer", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["signed-offer"] },
    tuition: { label: "Tuition Clearance", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["tuition"] },
    entry: { label: "Entry Approval", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["entry"] },
    arrival: { label: "Arrival", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["arrival"] },
    medical: { label: "Medical Clearance", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["medical"] },
    endorsement: { label: "Student Pass Endorsement", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["endorsement"] },
    "international-registration": { label: "International Registration Clearance", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["international-registration"] },
    deadlines: { label: "Registration Dates and Deadlines", pendingUpdate: "Awaiting {department} review.", completeUpdate: "Completed.", pendingStatus: defaultAdmissionsPendingStatuses["deadlines"] },
  },
}
/** Additive defaults for policies published before per-step completion wording existed. */
export const defaultAdmissionsCompletionStatuses: Partial<Record<typeof admissionsStageIds[number], string>> = {
  eligibility: defaultAdmissionsPresentation.stages.eligibility.completeStatus,
  "eligibility-confirmation": defaultAdmissionsPresentation.stages["eligibility-confirmation"].completeStatus,
  offer: defaultAdmissionsPresentation.stages.offer.completeStatus,
}
const wording = z.string().trim().min(1).max(240)
export type AdmissionsStageId = typeof admissionsStageIds[number]
export type AdmissionsPendingAction = "review" | "quote" | "payment" | "release" | "confirmation" | "submission"
/** Fixed product copy. Persisted presentation overrides are legacy data, not authoring controls. */
export const admissionsPresentationCatalogue = {
  statuses: defaultAdmissionsPresentation.statuses,
  programmeFeeUnavailable: "Programme Fee Unavailable",
  pending: {
    review: "Awaiting {roles} Review", quote: "Awaiting {roles} Quote",
    payment: "Awaiting Payment", release: "Awaiting {roles} Release",
    confirmation: "Awaiting Applicant Confirmation", submission: "Awaiting Applicant Submission",
  } satisfies Record<AdmissionsPendingAction, string>,
  unassigned: "Awaiting Reviewer Assignment",
  stages: Object.fromEntries(admissionsStageIds.map(id => [id, {
    label: defaultAdmissionsPresentation.stages[id].label,
    complete: id === "eligibility" ? "Eligibility Letter Released"
      : id === "eligibility-confirmation" ? "Eligibility Confirmed"
      : id === "offer" ? "Offer Letter Released"
      : id === "registration-fee" || id === "tuition" ? "Payment Verified" : "Reviewed",
  }])) as Record<AdmissionsStageId, { label: string; complete: string }>,
}
export function admissionsPendingLabel(action: AdmissionsPendingAction, roles: string) {
  if (["review", "quote", "release"].includes(action) && !roles.trim()) return admissionsPresentationCatalogue.unassigned
  return admissionsPresentationCatalogue.pending[action].replaceAll("{roles}", roles)
}
/** @deprecated Accepted for old clients and immutable snapshots; display uses the fixed catalogue. */
export const admissionsPresentationSchema = z.object({
  statuses: z.object({pending: wording, complete: wording, draft: wording.default("Draft"), actionRequired: wording.default("Action Required"), accepted: wording.default("Enrolment Accepted")}).strict(),
  departments: z.record(z.enum([...flowDeskSchema.options, "applicant"]), wording),
  stages: z.record(z.enum(admissionsStageIds), z.object({label: wording, pendingUpdate: wording, completeUpdate: wording, pendingStatus: wording.optional(), completeStatus: wording.optional()}).strict()),
}).strict()
export const admissionsProgressRowSchema = z.object({id:z.string(),label:z.string(),department:z.string(),status:z.string(),complete:z.boolean(),update:z.string()}).strict()
export const admissionsDisplaySchema = z.object({
  status: z.object({label: z.string(), tone: z.enum(["neutral", "warning", "success", "destructive"])}).strict(),
  currentStep: admissionsProgressRowSchema.nullable(),
}).strict()
export const admissionsBaseSettingsSchema = z
  .object({
    presentation: admissionsPresentationSchema.default(() => structuredClone(defaultAdmissionsPresentation)),
    eligibility: z
      .object({
        required: z.boolean(),
        confirmationRequired: z.boolean(),
        reviewDesk: z.enum(["qa", "registry"]),
      })
      .strict(),
    documents: z
      .object({
        requirements: z
          .array(
            z
              .object({
                field: z.enum([
                  "passportPhoto",
                  "myKad",
                  "passport",
                  "portfolio",
                  "cv",
                  "recommendationLetter",
                  "transferRelease",
                  "transferAttendance",
                  "transferModuleResults",
                  "transferSyllabi",
                  "transferVisaCancellation",
                  "medicalReport",
                  "eligibilityLetter",
                  "scratchCard",
                ]),
                cohort: z.enum(["all", "local", "international", "transfer"]),
                requirement: z.enum(["required", "optional", "hidden"]),
              })
              .strict()
          )
          .max(40),
        /** @deprecated Inert compatibility field; unanswered messages never gate eligibility approval. */
        correctionsRequired: z.boolean(),
      })
      .strict(),
    registrationFee: z
      .object({
        applies: z.boolean(),
        /** @deprecated Inert; readiness and payment methods control submission. */
        collectionEnabled: z.boolean(),
        methods: z.array(z.enum(["bank-transfer", "counter"])).max(2),
        /** @deprecated Inert; enabled state and step order control payment gates. */
        requiredBefore: z.enum([
          "offer",
          "acceptance",
          "registration",
          "manual",
          "never",
        ]),
        internationalDueDays: days,
        localDueDays: days,
        creditTreatment: z.enum(["manual", "none", "tuition", "resource"]),
      })
      .strict(),
    tuition: z
      .object({
        newInternational: z.enum(["first-year", "semester", "manual"]),
        otherStudents: z.enum(["manual", "semester", "none"]),
        approvedSemesterAllowed: z.boolean(),
        dueDays: days,
      })
      .strict(),
    offers: z
      .object({
        conditionalAllowed: z.boolean(),
        signedCopyRequired: z.boolean(),
        acceptanceDays: days,
      })
      .strict(),
    english: z
      .object({
        requiredFor: z.enum(["international", "all", "none"]),
        fulfilmentYears: z.number().int().min(1).max(5),
        reviewDesk: z.enum(["qa", "registry"]),
      })
      .strict(),
    international: z
      .object({
        entryApprovalRequired: z.boolean(),
        arrivalRequired: z.boolean(),
        medicalRequired: z.boolean(),
        endorsementRequired: z.boolean(),
        registrationGate: z.enum([
          "manual",
          "eval-approved",
          "medical-cleared",
          "endorsed",
          "none",
        ]),
      })
      .strict(),
    registrationDates: z
      .array(
        z.object({ intakeId: text, registrationOn: z.iso.date() }).strict()
      )
      .max(100),
    /** Lesotho / desk-chain review options (FM-05). Off by default; on for campus-lesotho demo. */
    review: z
      .object({
        showRankScore: z.boolean(),
        extractRequired: z.boolean(),
        /** Ordered desks that must record a recommendation (e.g. faculty → qa → registry). */
        reviewStepsRequired: z.array(flowDeskSchema).max(5),
      })
      .strict()
      .default({
        showRankScore: false,
        extractRequired: false,
        reviewStepsRequired: [],
      }),
    /**
     * FM-05 Admissions Settings catalogues (Demo). Live Lesotho CMS catalogues are not
     * synced; Control edits these Demo lists for intake / certificate / subject / school / entry rules.
     */
    catalogues: z
      .object({
        intakePeriods: z
          .array(
            z
              .object({
                id: text,
                label: text,
                startsOn: z.iso.date().nullable(),
              })
              .strict()
          )
          .max(50),
        certificateTypes: z
          .array(z.object({ id: text, label: text }).strict())
          .max(50),
        subjects: z
          .array(
            z
              .object({
                id: text,
                label: text,
                code: z.string().trim().min(1).max(32).optional(),
              })
              .strict()
          )
          .max(100),
        recognizedSchools: z
          .array(
            z
              .object({
                id: text,
                name: text,
                countryCode: z.string().length(2).optional(),
              })
              .strict()
          )
          .max(200),
        entryRequirements: z
          .array(
            z
              .object({
                id: text,
                programmeHint: text,
                ruleSummary: text,
              })
              .strict()
          )
          .max(100),
      })
      .strict()
      .default({
        intakePeriods: [],
        certificateTypes: [],
        subjects: [],
        recognizedSchools: [],
        entryRequirements: [],
      }),
  })
  .strict()
export const admissionStepIds = ["eligibility", "eligibility-confirmation", "registration-fee", "english", "offer", "signed-offer", "tuition", "entry", "arrival", "medical", "endorsement", "international-registration"] as const
export const admissionGroupIds = ["eligibility", "registration-fee", "english", "offer", "tuition", "entry", "arrival", "medical", "endorsement", "international-registration"] as const
export const admissionTemplateFields = ["applicantName", "applicationNumber", "campus", "programme", "faculty", "intake", "releaseDate", "registrationFee", "tuitionQuote", "englishRequirement"] as const
const letterTemplate = z.object({ title: z.string().trim().min(1).max(200), body: z.string().trim().min(1).max(12000) }).strict()
const pricingSchema = z.object({ mode: z.enum(["quote", "fixed", "programme-semester"]), campuses: z.array(z.object({ campusId: z.enum(flowCampusIds), currency: z.union([currency, z.literal("")]), amountMinor: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER), coverage: z.enum(["partial", "full"]).optional(), basis: z.enum(["first-year", "semester"]).optional() }).strict()).max(8), methods: z.array(z.enum(["bank-transfer", "counter"])).max(2).optional() }).strict().superRefine((price, context) => {
  price.campuses.forEach((row, index) => {
    if (price.mode !== "programme-semester" || row.coverage === "partial") {
      if (row.amountMinor <= 0) context.addIssue({ code: "custom", path: ["campuses", index, "amountMinor"], message: "Enter a positive fee amount." })
      try { currencyDigits(row.currency) } catch { context.addIssue({ code: "custom", path: ["campuses", index, "currency"], message: "Select a supported ISO currency." }) }
    }
  })
})
export const admissionsWorkflowSchema = z.object({
  templateId: z.literal("admissions"), templateVersion: z.literal(1),
  cohorts: z.record(z.enum(["local", "international"]), z.object({
    order: z.array(z.enum(admissionGroupIds)).length(admissionGroupIds.length),
    enabled: z.record(z.enum(admissionStepIds), z.boolean()),
    settings: admissionsBaseSettingsSchema,
    pricing: z.object({ "registration-fee": pricingSchema, tuition: pricingSchema }).strict(),
    documents: z.record(z.enum(["eligibility", "conditional", "full"]), letterTemplate),
  }).strict()),
}).strict()
export const admissionsRegistrationWindowSchema = z.object({
  startDate: z.iso.date().optional(),
  closingDate: z.iso.date().optional(),
}).strict()
// Version-wide, deliberately outside the Local/International operational overrides.
export const admissionsSettingsSchema = admissionsBaseSettingsSchema.extend({ workflow: admissionsWorkflowSchema.optional(), registrationWindow: admissionsRegistrationWindowSchema.optional() })
export type AdmissionsBaseSettings = z.infer<typeof admissionsBaseSettingsSchema>
export type AdmissionsWorkflow = z.infer<typeof admissionsWorkflowSchema>
export type AdmissionStepId = typeof admissionStepIds[number]
export type AdmissionStudentType = "local" | "international"
export type AdmissionsSettings = z.infer<typeof admissionsSettingsSchema>
export function validateRegistrationWindow(settings: AdmissionsSettings): string[] {
  const window = settings.registrationWindow
  if (!window?.startDate || !window.closingDate) return ["Registration Start Date and Registration Closing Date are required before applying a version. Copy legacy published versions into a draft to add them."]
  return window.closingDate < window.startDate ? ["Registration Closing Date must be on or after Registration Start Date."] : []
}
export const admissionsCampusTimeZones: Record<typeof flowCampusIds[number], string> = {
  "campus-lesotho": "Africa/Maseru", "campus-cyberjaya": "Asia/Kuala_Lumpur", "campus-botswana": "Africa/Gaborone",
  "campus-eswatini": "Africa/Mbabane", "campus-sierra-leone": "Africa/Freetown", "campus-cambodia": "Asia/Phnom_Penh",
  "campus-uganda": "Africa/Kampala", "campus-namibia": "Africa/Windhoek",
}
export const admissionsAvailabilitySchema = z.object({
  campusId: z.enum(flowCampusIds), timeZone: z.string(), today: z.iso.date(), policyId: z.string().nullable(),
  window: admissionsRegistrationWindowSchema.nullable(),
  status: z.enum(["unrestricted", "open", "upcoming", "closed", "unavailable"]), available: z.boolean(), message: z.string(),
}).strict()
export type AdmissionsAvailability = z.infer<typeof admissionsAvailabilitySchema>
export function admissionsAvailability(campusId: string, policy: AdmissionsPolicyVersion | null, now: Date): AdmissionsAvailability {
  const campus = z.enum(flowCampusIds).parse(campusId), timeZone = admissionsCampusTimeZones[campus]
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now)
  const part = (type: string) => parts.find(p => p.type === type)!.value
  const today = `${part("year")}-${part("month")}-${part("day")}`, window = policy?.settings.registrationWindow ?? null
  const status = !window ? "unrestricted" : validateRegistrationWindow(policy!.settings).length ? "unavailable" : today < window.startDate! ? "upcoming" : today > window.closingDate! ? "closed" : "open"
  const message = status === "upcoming" ? `Applications open on ${window!.startDate} (${timeZone}).` : status === "closed" ? `Applications closed after ${window!.closingDate} (${timeZone}). Existing drafts remain saved and editable.` : status === "unavailable" ? "Applications are unavailable. Contact the campus or try again later." : "Applications are open."
  return { campusId: campus, timeZone, today, policyId: policy?.id ?? null, window, status, available: status === "open" || status === "unrestricted", message }
}
export const admissionsPolicyVersionSchema = z
  .object({
    id: text,
    flowId: z.literal("admissions"),
    campusId: z.enum(flowCampusIds),
    configurationId: text.optional(),
    version: z.number().int().positive(),
    effectiveFrom: z.iso.datetime(),
    publishedAt: z.iso.datetime(),
    publishedBy: text,
    reason: z.string().trim(),
    settings: admissionsSettingsSchema,
    source: z.enum(["owner-demo-template", "control-published"]),
  })
  .strict()
export type AdmissionsPolicyVersion = z.infer<
  typeof admissionsPolicyVersionSchema
>
export const flowEventSchema = z
  .object({
    id: text,
    at: z.iso.datetime(),
    actorId: text,
    actorName: z.string().optional(),
    desk: flowDeskSchema.nullable(),
    action: text,
    note: z.string().trim().max(10000),
    documentId: z.string().nullable(),
  })
  .strict()
export const flowQuoteSchema = z
  .object({
    id: text,
    currency: currency,
    amountMinor: z.number().int().positive(),
    basis: z.enum(["first-year", "semester"]),
    source: text,
    verifiedPaidMinor: z.number().int().nonnegative(),
    approvedSemesterAt: z.iso.datetime().nullable(),
    approvedBy: z.string().nullable(),
  })
  .strict()
  .refine(
    (q) => q.verifiedPaidMinor <= q.amountMinor,
    "Verified funds exceed the quoted charge."
  )
export const admissionsFlowSchema = z
  .object({
    policy: admissionsPolicyVersionSchema,
    pinnedAt: z.iso.datetime(),
    registrationOn: z.iso.date().nullable(),
    arrivalOn: z.iso.date().nullable(),
    englishVerifiedAt: z.iso.datetime().nullable(),
    entryApprovedAt: z.iso.datetime().nullable(),
    medicalClearedAt: z.iso.datetime().nullable(),
    endorsedAt: z.iso.datetime().nullable(),
    internationalClearedAt: z.iso.datetime().nullable(),
    financialClearedAt: z.iso.datetime().nullable(),
    deadlineExceptionAt: z.iso.datetime().nullable(),
    quote: flowQuoteSchema.nullable(),
    /** Versioned fee source snapshot. Never recalculated after payment evidence exists. */
    tuitionRequirement: z.object({ feePlanId: text, feePlanRevision: z.number().int().positive(), programmeVersionId: text, semesterNumber: z.number().int().positive(), currency, totalMinor: z.number().int().positive(), requiredMinor: z.number().int().positive(), coverage: z.enum(["partial", "full"]) }).strict().refine(v => v.requiredMinor <= v.totalMinor && (v.coverage === "full" ? v.requiredMinor === v.totalMinor : v.requiredMinor < v.totalMinor), "Invalid semester tuition requirement.").optional(),
    tuitionPricingPending: z.boolean().optional(),
    tuitionPayments: z.array(z.object({ id: text, evidence: flowEvidenceSchema, bankReference: text, method: z.enum(["bank-transfer", "counter"]), amountMinor: z.number().int().positive(), currency, submittedAt: z.iso.datetime(), status: z.enum(["pending", "verified", "rejected"]), reviewedAt: z.iso.datetime().nullable(), reviewedBy: z.string().nullable(), reason: z.string() }).strict()).optional(),
    pricingConversion: z.literal("semester-payments-v1").optional(),
    registrationCharge: z
      .object({
        id: text,
        currency: currency,
        amountMinor: z.number().int().positive(),
        source: text,
      })
      .strict()
      .nullable()
      .default(null),
    externalRegistrationPayment: z
      .object({
        chargeId: text,
        amountMinor: z.number().int().positive(),
        currency,
        verifiedAt: z.iso.datetime(),
        verifiedBy: text,
        evidenceReference: text,
      })
      .strict()
      .nullable()
      .default(null),
    deadlineExceptions: z
      .array(
        z
          .object({
            kind: z.enum([
              "registration-date",
              "registration-fee",
              "tuition",
              "english",
              "offer",
            ]),
            dueOn: z.iso.date().nullable(),
            scopeId: z.string().nullable(),
            recordedAt: z.iso.datetime(),
            actorId: text,
            reason: text,
          })
          .strict()
      )
      .default([]),
    rejectedPayments: z
      .array(
        z
          .object({
            evidence: flowEvidenceSchema,
            bankReference: z.string(),
            reason: text,
            at: z.iso.datetime(),
            actorId: text,
          })
          .strict()
      )
      .default([]),
    signatures: z.array(
      z
        .object({
          offerId: text,
          evidence: flowEvidenceSchema,
          submittedAt: z.iso.datetime(),
          verifiedAt: z.iso.datetime().nullable(),
          verifiedBy: z.string().nullable(),
        })
        .strict()
    ),
    offerHistory: z.array(
      z
        .object({
          id: text,
          kind: z.enum(["conditional", "full"]),
          releasedAt: z.iso.datetime(),
          fileName: text,
          pdfBase64: z.string().min(1),
        })
        .strict()
    ),
    credits: z.array(
      z
        .object({
          id: text,
          targetInvoiceId: text,
          applicationChargeId: text,
          category: z.enum(["tuition", "resource"]),
          currency: currency,
          amountMinor: z.number().int().positive(),
          at: z.iso.datetime(),
          actorId: text,
        })
        .strict()
    ),
    events: z.array(flowEventSchema),
    /** FM-03: optional rank/score for Lesotho desk queue. */
    reviewMetrics: z
      .object({
        rank: z.number().int().positive().nullable(),
        score: z.number().nullable(),
      })
      .strict()
      .nullable()
      .default(null),
    /** FM-03: desk recommendation chain (n/required). */
    reviewSteps: z
      .array(
        z
          .object({
            desk: flowDeskSchema,
            outcome: z.enum(["recommended", "not-recommended"]),
            reason: text,
            at: z.iso.datetime(),
            actorId: text,
          })
          .strict()
      )
      .default([]),
    /** FM-04: LGCSE / certificate extract recorded by Document review desk. */
    documentExtract: z
      .object({
        status: z.enum(["pending", "extracted", "verified"]),
        certificateNumber: z.string().nullable(),
        institution: z.string().nullable(),
        subjects: z
          .array(
            z
              .object({
                subject: text,
                grade: text,
              })
              .strict()
          )
          .default([]),
        extractedAt: z.iso.datetime().nullable(),
        extractedBy: z.string().nullable(),
      })
      .strict()
      .nullable()
      .default(null),
  })
  .strict()
export type AdmissionsFlow = z.infer<typeof admissionsFlowSchema>
export type FlowDesk = z.infer<typeof flowDeskSchema>
export const flowActionInputSchema = z
  .object({
    applicationId: text,
    expectedRevision: z.number().int().positive(),
    requestId: text,
    action: z.enum([
      "quote-registration-fee",
      "verify-documents",
      "verify-payment",
      "verify-external-registration-payment",
      "reject-payment",
      "release-offer",
      "verify-signature",
      "verify-english",
      "record-arrival",
      "approve-entry",
      "clear-medical",
      "endorse-pass",
      "clear-international",
      "quote-tuition",
      "verify-tuition",
      "verify-tuition-receipt",
      "reject-tuition-receipt",
      "approve-semester",
      "clear-finance",
      "deadline-exception",
      "reviewer-message",
      "record-desk-recommendation",
      "set-review-metrics",
      "extract-document",
    ]),
    note: z.string().trim().max(10000).default(""),
    deadlineKind: z
      .enum([
        "registration-date",
        "registration-fee",
        "tuition",
        "english",
        "offer",
      ])
      .optional(),
    date: z.iso.date().optional(),
    amountMinor: z.number().int().positive().optional(),
    currency: currency.optional(),
    paymentId: text.optional(),
    basis: z.enum(["first-year", "semester"]).optional(),
    recommendationOutcome: z
      .enum(["recommended", "not-recommended"])
      .optional(),
    rank: z.number().int().positive().optional(),
    score: z.number().optional(),
    certificateNumber: z.string().trim().max(200).optional(),
    institution: z.string().trim().max(400).optional(),
    subjects: z
      .array(
        z
          .object({
            subject: text,
            grade: text,
          })
          .strict()
      )
      .max(40)
      .optional(),
  })
  .strict()
export type FlowActionInput = z.infer<typeof flowActionInputSchema>
export const defaultAdmissionsSettings: AdmissionsSettings = {
  presentation: structuredClone(defaultAdmissionsPresentation),
  eligibility: { required: true, confirmationRequired: true, reviewDesk: "qa" },
  documents: {
    requirements: [
      {
        field: "medicalReport",
        cohort: "international",
        requirement: "optional",
      },
    ],
    correctionsRequired: true,
  },
  registrationFee: {
    applies: true,
    collectionEnabled: true,
    methods: ["bank-transfer", "counter"],
    requiredBefore: "offer",
    internationalDueDays: 35,
    localDueDays: null,
    creditTreatment: "manual",
  },
  tuition: {
    newInternational: "first-year",
    otherStudents: "manual",
    approvedSemesterAllowed: true,
    dueDays: 7,
  },
  offers: {
    conditionalAllowed: true,
    signedCopyRequired: true,
    acceptanceDays: null,
  },
  english: {
    requiredFor: "international",
    fulfilmentYears: 1,
    reviewDesk: "qa",
  },
  international: {
    entryApprovalRequired: true,
    arrivalRequired: true,
    medicalRequired: true,
    endorsementRequired: true,
    registrationGate: "manual",
  },
  registrationDates: [],
  review: {
    showRankScore: false,
    extractRequired: false,
    reviewStepsRequired: [],
  },
  catalogues: {
    intakePeriods: [],
    certificateTypes: [],
    subjects: [],
    recognizedSchools: [],
    entryRequirements: [],
  },
}
export function defaultAdmissionsPolicy(
  campusId: string
): AdmissionsPolicyVersion {
  const settings = structuredClone(defaultAdmissionsSettings)
  if (campusId === "campus-lesotho") {
    settings.review = {
      showRankScore: true,
      extractRequired: true,
      reviewStepsRequired: ["faculty", "qa", "registry"],
    }
    settings.catalogues = {
      intakePeriods: [
        {
          id: "demo-first-intake",
          label: "Demo first intake",
          startsOn: "2026-02-01",
        },
        {
          id: "ls-2026-07",
          label: "2026-07",
          startsOn: "2026-07-01",
        },
      ],
      certificateTypes: [
        { id: "lgcse", label: "LGCSE" },
        { id: "cosc", label: "COSC" },
        { id: "other", label: "Other secondary certificate" },
      ],
      subjects: [
        { id: "eng", label: "English Language", code: "ENG" },
        { id: "math", label: "Mathematics", code: "MATH" },
        { id: "sesotho", label: "Sesotho", code: "SES" },
      ],
      recognizedSchools: [
        {
          id: "ls-demo-high",
          name: "Demo High School (Maseru)",
          countryCode: "LS",
        },
      ],
      entryRequirements: [
        {
          id: "ls-design-demo",
          programmeHint: "Design (Demo)",
          ruleSummary:
            "Demo rule — LGCSE/COSC English + Maths; not Live Lesotho entry policy.",
        },
      ],
    }
  }
  return admissionsPolicyVersionSchema.parse({
    id: `admissions:${campusId}:1`,
    flowId: "admissions",
    campusId,
    version: 1,
    effectiveFrom: "1970-01-01T00:00:00.000Z",
    publishedAt: "2026-10-20T00:00:00.000Z",
    publishedBy: "owner-demo-template",
    reason:
      "Owner-selected starting template; jurisdictional and unresolved rules require operational confirmation.",
    settings,
    source: "owner-demo-template",
  })
}
export function newAdmissionsFlow(
  policy: AdmissionsPolicyVersion,
  intakeId: string,
  now: string,
  studentType: string = "local",
  applicationId: string = policy.id,
  applicantType: string = "new"
): AdmissionsFlow {
  const settings = resolveWorkflowSettings(policy.settings, studentType)
  const fixedFee = fixedAdmissionPrice(policy.settings, studentType, policy.campusId, "registration-fee")
  const fee = fixedFee ?? (settings.registrationFee.applies ? registrationTariffs[policy.campusId]?.[studentType === "international" ? "international" : "local"] : null)
  const tuition = (studentType === "international" && applicantType === "new" || settings.tuition.otherStudents !== "none") ? fixedAdmissionPrice(policy.settings, studentType, policy.campusId, "tuition") : null
  return admissionsFlowSchema.parse({
    policy: policy.settings.workflow ? { ...policy, settings: { ...settings, workflow: policy.settings.workflow } } : policy,
    pinnedAt: now,
    registrationOn:
      settings.registrationDates.find((d) => d.intakeId === intakeId)
        ?.registrationOn ?? null,
    arrivalOn: null,
    englishVerifiedAt: null,
    entryApprovedAt: null,
    medicalClearedAt: null,
    endorsedAt: null,
    internationalClearedAt: null,
    financialClearedAt: null,
    deadlineExceptionAt: null,
    ...(settings.workflow?.cohorts[studentType === "international" ? "international" : "local"].enabled.tuition && settings.workflow.cohorts[studentType === "international" ? "international" : "local"].pricing.tuition.mode === "programme-semester" ? { tuitionPricingPending: true } : {}),
    quote: tuition ? { id: `tuition:${applicationId}`, amountMinor: tuition.amountMinor, currency: tuition.currency, basis: tuition.basis!, source: `Fixed published price: ${policy.id}`, verifiedPaidMinor: 0, approvedSemesterAt: null, approvedBy: null } : null,
    registrationCharge: fee ? { id: `registration-fee:${applicationId}`, amountMinor: fee.amountMinor, currency: fee.currency, source: fixedFee ? `Fixed published price: ${policy.id}` : "Approved campus tariff: semester-payments-v1" } : null,
    rejectedPayments: [],
    deadlineExceptions: [],
    externalRegistrationPayment: null,
    signatures: [],
    offerHistory: [],
    credits: [],
    events: [],
    reviewMetrics: null,
    reviewSteps: [],
    documentExtract: policy.settings.review.extractRequired
      ? {
          status: "pending",
          certificateNumber: null,
          institution: null,
          subjects: [],
          extractedAt: null,
          extractedBy: null,
        }
      : null,
  })
}
export function validateAdmissionsSettings(input: unknown): string[] {
  const parsed = admissionsSettingsSchema.safeParse(input)
  if (!parsed.success)
    return parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
  if (parsed.data.workflow) {
    const issues = validateWorkflow(parsed.data)
    for (const studentType of ["local", "international"] as const)
      issues.push(...validateAdmissionsSettings(resolveWorkflowSettings(parsed.data, studentType)).map(message => `${studentType}: ${message}`))
    return issues
  }
  const s = parsed.data,
    issues: string[] = []
  if (s.eligibility.confirmationRequired && !s.eligibility.required)
    issues.push("Eligibility confirmation requires an eligibility review.")
  if (
    s.international.registrationGate === "eval-approved" &&
    !s.international.entryApprovalRequired
  )
    issues.push("Entry approval must apply when it gates registration.")
  if (
    s.international.registrationGate === "medical-cleared" &&
    !s.international.medicalRequired
  )
    issues.push("Medical review must apply when it gates registration.")
  if (
    s.international.registrationGate === "endorsed" &&
    !s.international.endorsementRequired
  )
    issues.push("Endorsement must apply when it gates registration.")
  for (const r of s.documents.requirements)
    if (["passport", "myKad"].includes(r.field) && r.requirement !== "required")
      issues.push("Core identity evidence cannot be hidden or made optional.")
  if (s.international.medicalRequired && !s.international.arrivalRequired)
    issues.push("Post-arrival medical review requires arrival recording.")
  for (const r of s.documents.requirements)
    if (
      r.field === "medicalReport" &&
      r.requirement === "required" &&
      ["all", "local"].includes(r.cohort)
    )
      issues.push(
        "Local medical screening is disabled; medical documents cannot be required for local students."
      )
  const core = new Set(["passportPhoto", "passport", "myKad"])
  for (const r of s.documents.requirements)
    if (core.has(r.field) && r.requirement !== "required")
      issues.push("Identity evidence is mandatory.")
  const keys = s.documents.requirements.map((r) => `${r.field}:${r.cohort}`)
  if (new Set(keys).size !== keys.length)
    issues.push("A document/cohort requirement can be configured only once.")
  if (
    new Set(s.registrationFee.methods).size !== s.registrationFee.methods.length
  )
    issues.push("Collection methods must be distinct.")
  // Historical intake dates are compatibility data; the version window owns availability.
  return issues
}

export const stageDecisionSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    status: z.enum(["complete", "pending", "manual", "not-required"]),
    reason: z.string(),
    desk: flowDeskSchema.nullable(),
  })
  .strict()
export const admissionsDecisionSchema = z
  .object({
    policyId: z.string(),
    policyVersion: z.number().int().positive(),
    stages: z.array(stageDecisionSchema),
    progress: z.array(admissionsProgressRowSchema),
    display: admissionsDisplaySchema,
    deadlines: z
      .object({
        registrationFee: z.string().nullable(),
        tuition: z.string().nullable(),
        english: z.string().nullable(),
        offer: z.string().nullable(),
      })
      .strict(),
    deadlineReview: z.boolean(),
    canCollect: z.boolean(),
    offerReady: z.boolean(),
    acceptanceReady: z.boolean(),
    registrationReady: z.boolean(),
    englishRequired: z.boolean(),
    offerKind: z.enum(["conditional", "full"]),
    registrationBlockers: z.array(z.string()),
  })
  .strict()
export const flowDefinitionSchema = z
  .object({
    id: z.string().regex(/^[a-z][a-z-]*$/),
    name: z.string(),
    description: z.string(),
    schemaVersion: z.number().int().positive(),
  })
  .strict()

export const flowActionBodySchema = flowActionInputSchema.omit({
  applicationId: true,
})
