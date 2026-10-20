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
export const admissionsSettingsSchema = z
  .object({
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
        correctionsRequired: z.boolean(),
      })
      .strict(),
    registrationFee: z
      .object({
        applies: z.boolean(),
        collectionEnabled: z.boolean(),
        methods: z.array(z.enum(["bank-transfer", "counter"])).max(2),
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
  })
  .strict()
export type AdmissionsSettings = z.infer<typeof admissionsSettingsSchema>
export const admissionsPolicyVersionSchema = z
  .object({
    id: text,
    flowId: z.literal("admissions"),
    campusId: z.enum(flowCampusIds),
    version: z.number().int().positive(),
    effectiveFrom: z.iso.datetime(),
    publishedAt: z.iso.datetime(),
    publishedBy: text,
    reason: text,
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
      "approve-semester",
      "clear-finance",
      "deadline-exception",
      "reviewer-message",
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
    basis: z.enum(["first-year", "semester"]).optional(),
  })
  .strict()
export type FlowActionInput = z.infer<typeof flowActionInputSchema>
export const defaultAdmissionsSettings: AdmissionsSettings = {
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
}
export function defaultAdmissionsPolicy(
  campusId: string
): AdmissionsPolicyVersion {
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
    settings: structuredClone(defaultAdmissionsSettings),
    source: "owner-demo-template",
  })
}
export function newAdmissionsFlow(
  policy: AdmissionsPolicyVersion,
  intakeId: string,
  now: string
): AdmissionsFlow {
  return admissionsFlowSchema.parse({
    policy,
    pinnedAt: now,
    registrationOn:
      policy.settings.registrationDates.find((d) => d.intakeId === intakeId)
        ?.registrationOn ?? null,
    arrivalOn: null,
    englishVerifiedAt: null,
    entryApprovedAt: null,
    medicalClearedAt: null,
    endorsedAt: null,
    internationalClearedAt: null,
    financialClearedAt: null,
    deadlineExceptionAt: null,
    quote: null,
    registrationCharge: null,
    rejectedPayments: [],
    deadlineExceptions: [],
    externalRegistrationPayment: null,
    signatures: [],
    offerHistory: [],
    credits: [],
    events: [],
  })
}
export function validateAdmissionsSettings(input: unknown): string[] {
  const parsed = admissionsSettingsSchema.safeParse(input)
  if (!parsed.success)
    return parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
  const s = parsed.data,
    issues: string[] = []
  if (
    s.registrationFee.applies &&
    s.registrationFee.requiredBefore !== "never" &&
    s.registrationFee.requiredBefore !== "manual" &&
    (!s.registrationFee.collectionEnabled || !s.registrationFee.methods.length)
  )
    issues.push(
      "A required Registration Fee needs an enabled collection route; choose manual clearance if collection is handled separately."
    )
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
  if (
    new Set(s.registrationDates.map((d) => d.intakeId)).size !==
    s.registrationDates.length
  )
    issues.push("Each intake must have one registration date.")
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
