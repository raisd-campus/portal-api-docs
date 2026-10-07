import { z } from "zod"
import { demoAdmissionContextSchema } from "./demo-admissions"

export const calendarDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}, "Enter a valid calendar date.")
const text = z.string().trim()
export const evidenceSchema = /* @__PURE__ */ z.object({ id: z.string().min(1), name: text.min(1), sizeBytes: z.number().int().positive().max(25 * 1024 ** 2), mimeType: text.min(1) })
export const addressSchema = /* @__PURE__ */ z.object({ addressLine: text, country: text, state: text, city: text, postcode: text })
export const contactSchema = /* @__PURE__ */ z.object({ fullName: text, contactNumber: text, emailAddress: text })
export const personalDetailsSchema = /* @__PURE__ */ z.object({
  fullName: text, countryOfCitizenship: text, dateOfBirth: calendarDateSchema.nullable(), placeOfBirth: text,
  gender: text, race: text, religion: text, religionOther: text, contactNumber: text,
  maritalStatus: z.enum(["", "single", "married", "divorced", "widowed"]), emailAddress: text,
  identificationNumber: text, passportNumber: text, passportExpiresOn: calendarDateSchema.nullable(), passportIssuingCountry: text,
  permanentAddress: addressSchema, currentAddress: addressSchema, fatherGuardian: contactSchema, motherGuardian: contactSchema,
  emergencyContact: contactSchema.extend({ relationship: text }), disabilityAnswer: z.enum(["", "yes", "no"]), disabilityDetails: text,
})
export const preferenceSchema = /* @__PURE__ */ z.object({ intakeId: text, facultyId: text, courseId: text })
export const studyPreferencesSchema = /* @__PURE__ */ z.object({ campusId: text.default(""), previousStudentId: text.default(""), studentType: z.enum(["", "local", "international"]), applicantType: z.enum(["", "new", "alumni", "transfer"]), preferences: z.tuple([preferenceSchema, preferenceSchema, preferenceSchema]) })
export const qualificationSchema = /* @__PURE__ */ z.object({ id: z.number().int().positive(), qualificationTypeSelection: text, qualificationType: text, qualificationNameSelection: text, qualificationName: text, institutionName: text, countryOfEducation: text, fieldOfStudy: text, startedOn: calendarDateSchema.nullable(), completedOn: calendarDateSchema.nullable(), result: text, transcript: evidenceSchema.nullable(), academicCertificate: evidenceSchema.nullable() })
export const englishResultSchema = /* @__PURE__ */ z.object({ id: z.number().int().positive(), qualificationNameSelection: text, qualificationName: text, examinedOn: calendarDateSchema.nullable(), score: text, expiresOn: calendarDateSchema.nullable(), certificate: evidenceSchema.nullable() })
export const academicDetailsSchema = /* @__PURE__ */ z.object({ qualifications: z.array(qualificationSchema), englishResults: z.array(englishResultSchema) })
export const documentsSchema = /* @__PURE__ */ z.object({
  passportPhoto: evidenceSchema.nullable(), myKad: evidenceSchema.nullable(), passport: evidenceSchema.nullable(), portfolio: evidenceSchema.nullable(), cv: evidenceSchema.nullable(), recommendationLetter: evidenceSchema.nullable(),
  transferRelease: evidenceSchema.nullable(), transferAttendance: evidenceSchema.nullable(), transferModuleResults: evidenceSchema.nullable(), transferSyllabi: evidenceSchema.nullable(), transferVisaCancellation: evidenceSchema.nullable(),
  medicalExaminationCountry: text, medicalReport: evidenceSchema.nullable(), eligibilityLetter: evidenceSchema.nullable(), scratchCard: evidenceSchema.nullable(),
})
export const stepSchema = /* @__PURE__ */ z.enum(["consent", "study", "personal", "academic", "documents", "fee"])
export const snapshotSchema = /* @__PURE__ */ z.object({ activeStepId: stepSchema, completedStepIds: z.array(stepSchema), consentChecked: z.boolean(), studyPreferences: studyPreferencesSchema, personalDetails: personalDetailsSchema, academicDetails: academicDetailsSchema, documents: documentsSchema, paymentProof: z.object({ bankReference: text, file: evidenceSchema.nullable() }) })
export const messageSchema = /* @__PURE__ */ z.object({ id: z.string().min(1), sequence: z.number().int().positive(), sender: z.enum(["reviewer", "applicant"]), body: text, sentAt: z.iso.datetime(), attachments: z.array(evidenceSchema).max(5) })
export const verificationSchema = /* @__PURE__ */ z.object({ paymentVerifiedAt: z.iso.datetime().nullable(), documentsVerifiedAt: z.iso.datetime().nullable() })
export const acceptedEnrolmentContextSchema = /* @__PURE__ */ z.object({
  status: z.literal("accepted"), reference: z.string().trim().min(1), acceptedAt: z.iso.datetime(),
  personId: z.string().min(1), studentProfileId: z.string().min(1), programmeEnrolmentId: z.string().min(1),
})
export const acceptanceSchema = acceptedEnrolmentContextSchema.extend({ demo: demoAdmissionContextSchema })
export const issuedLetterSchema = z.object({ id: text.min(1), kind: z.enum(["eligibility", "offer"]), department: z.enum(["Quality Assurance", "Registry"]), fileName: text.min(1), releasedAt: z.iso.datetime(), pdfBase64: z.string().min(1).max(1400000).refine(value => { try { return atob(value).startsWith("%PDF-") } catch { return false } }, "A demo PDF resource is required.") }).strict()
export const letterWorkflowSchema = z.object({ eligibility: issuedLetterSchema.nullable(), eligibilityConfirmedAt: z.iso.datetime().nullable(), offer: issuedLetterSchema.nullable() }).strict()
export const applicationSchema = /* @__PURE__ */ z.object({
  id: z.string().min(1), applicantId: z.string().min(1), personId: z.string().min(1), revision: z.number().int().positive(), previewNumber: z.number().int().positive(), status: z.enum(["draft", "pending-review", "action-required", "approved", "accepted"]), snapshot: snapshotSchema,
  letters: letterWorkflowSchema.default({ eligibility: null, eligibilityConfirmedAt: null, offer: null }), acceptance: acceptanceSchema.nullable().default(null), catalogueReferenceAt: z.iso.datetime().default(() => new Date().toISOString()),
  submittedAt: z.iso.datetime().nullable(), updatedAt: z.iso.datetime(), reviewStage: z.enum(["payment", "documents"]), verification: verificationSchema.default({ paymentVerifiedAt: null, documentsVerifiedAt: null }), messages: z.array(messageSchema), readThroughSequence: z.number().int().nonnegative(), repliedThroughSequence: z.number().int().nonnegative(),
})
export type Evidence = z.infer<typeof evidenceSchema>
export type Snapshot = z.infer<typeof snapshotSchema>
export type Application = z.infer<typeof applicationSchema>
export type ApplicationStep = z.infer<typeof stepSchema>
export type Message = z.infer<typeof messageSchema>

const requiredContact = contactSchema.extend({ fullName: text.min(1), contactNumber: text.min(7), emailAddress: z.email() })
const requiredAddress = addressSchema.extend({ addressLine: text.min(1), country: text.min(1), state: text.min(1), city: text.min(1), postcode: text.min(1) })
const submittedPersonalSchema = personalDetailsSchema.extend({ fullName: text.min(1), countryOfCitizenship: text.regex(/^[A-Z]{2}$/), dateOfBirth: calendarDateSchema, placeOfBirth: text.min(1), gender: text.min(1), race: text.min(1), religion: text.min(1), contactNumber: text.min(7), emailAddress: z.email(), maritalStatus: z.enum(["single", "married", "divorced", "widowed"]), identificationNumber: text.min(1), fatherGuardian: requiredContact, motherGuardian: requiredContact, emergencyContact: requiredContact.extend({ relationship: text.min(1) }), permanentAddress: requiredAddress, currentAddress: requiredAddress, disabilityAnswer: z.enum(["yes", "no"]) })
export const admissionsHandoffV1Schema = /* @__PURE__ */ z.object({
  version: z.literal(1), applicationId: z.string().min(1), applicantId: z.string().min(1), personId: z.string().min(1), submittedAt: z.iso.datetime(),
  acceptedContext: acceptedEnrolmentContextSchema,
  snapshot: snapshotSchema.extend({ consentChecked: z.literal(true), personalDetails: submittedPersonalSchema, academicDetails: academicDetailsSchema.extend({ qualifications: z.array(qualificationSchema.extend({ qualificationType: text.min(1), qualificationName: text.min(1), institutionName: text.min(1), countryOfEducation: text.min(1), startedOn: calendarDateSchema, completedOn: calendarDateSchema, result: text.min(1), transcript: evidenceSchema, academicCertificate: evidenceSchema })).min(1), englishResults: z.array(englishResultSchema.extend({ qualificationName: text.min(1), examinedOn: calendarDateSchema, score: text.min(1) })) }), paymentProof: snapshotSchema.shape.paymentProof.extend({ bankReference: text.min(1), file: evidenceSchema }), documents: documentsSchema.extend({ passportPhoto: evidenceSchema }) }),
}).superRefine((handoff, context) => {
  const snapshot = handoff.snapshot, personal = snapshot.personalDetails
  const submissionDate = handoff.submittedAt.slice(0, 10)
  const issue = (path: (string | number)[], message: string) => context.addIssue({ code: "custom", path: ["snapshot", ...path], message })
  if (personal.dateOfBirth >= submissionDate) issue(["personalDetails", "dateOfBirth"], "Date of birth must precede submission.")
  if (personal.religion === "other" && !personal.religionOther) issue(["personalDetails", "religionOther"], "Custom religion is required when selected.")
  if (!snapshot.studyPreferences.studentType || !snapshot.studyPreferences.applicantType) issue(["studyPreferences"], "Student and applicant types are required.")
  const programmes = new Set<string>()
  snapshot.studyPreferences.preferences.forEach((preference, index) => {
    if (index > 0 && !Object.values(preference).some(Boolean)) return
    if (!preference.intakeId || !preference.facultyId || !preference.courseId) issue(["studyPreferences", "preferences", index], "A supplied preference must be complete.")
    if (programmes.has(preference.courseId)) issue(["studyPreferences", "preferences", index], "Supplied programmes must be distinct.")
    programmes.add(preference.courseId)
  })
  const uniqueRows = (rows: { id: number }[], path: string) => { if (new Set(rows.map(row => row.id)).size !== rows.length) issue(["academicDetails", path], "Record identifiers must be unique.") }
  uniqueRows(snapshot.academicDetails.qualifications, "qualifications"); uniqueRows(snapshot.academicDetails.englishResults, "englishResults")
  snapshot.academicDetails.qualifications.forEach((record, index) => {
    if (record.startedOn > record.completedOn || record.completedOn > submissionDate) issue(["academicDetails", "qualifications", index], "Qualification dates must be chronological and completed by submission.")
  })
  snapshot.academicDetails.englishResults.forEach((record, index) => {
    if (record.examinedOn > submissionDate || record.expiresOn && record.expiresOn < record.examinedOn) issue(["academicDetails", "englishResults", index], "English result dates must be chronological and examined by submission.")
  })
  if (handoff.personId !== handoff.acceptedContext.personId) context.addIssue({ code: "custom", path: ["acceptedContext", "personId"], message: "Accepted enrolment must belong to the applicant person." })
  if (handoff.acceptedContext.acceptedAt < handoff.submittedAt) context.addIssue({ code: "custom", path: ["acceptedContext", "acceptedAt"], message: "Acceptance cannot precede submission." })
  if (handoff.snapshot.personalDetails.disabilityAnswer === "yes" && !handoff.snapshot.personalDetails.disabilityDetails) context.addIssue({ code: "custom", path: ["snapshot", "personalDetails", "disabilityDetails"], message: "Disability details are required when answered yes." })
})
export const admissionsHandoffV2Schema = z.object({ ...admissionsHandoffV1Schema.shape, version: z.literal(2), letters: letterWorkflowSchema }).superRefine((handoff, context) => {
  const legacy = admissionsHandoffV1Schema.safeParse({ ...handoff, version: 1 })
  if (!legacy.success) for (const issue of legacy.error.issues) context.addIssue({ code: "custom", path: issue.path, message: issue.message })
  const w = handoff.letters, p = handoff.snapshot.studyPreferences
  if (!["campus-lesotho", "campus-cyberjaya", "campus-botswana", "campus-eswatini", "campus-sierra-leone", "campus-cambodia", "campus-uganda", "campus-namibia"].includes(p.campusId) || p.applicantType === "alumni" && !p.previousStudentId) context.addIssue({ code: "custom", path: ["snapshot", "studyPreferences"], message: "Campus and applicable previous student ID are required." })
  if (!w.eligibility || !w.offer || w.eligibility.id !== `${handoff.applicationId}:eligibility` || w.offer.id !== `${handoff.applicationId}:offer` || !w.eligibilityConfirmedAt || w.eligibility.kind !== "eligibility" || w.offer.kind !== "offer" || w.eligibility.department !== "Quality Assurance" || w.offer.department !== "Registry" || w.eligibility.releasedAt < handoff.submittedAt || w.eligibilityConfirmedAt < w.eligibility.releasedAt || w.offer.releasedAt < w.eligibilityConfirmedAt || handoff.acceptedContext.acceptedAt < w.offer.releasedAt) context.addIssue({ code: "custom", path: ["letters"], message: "Released letters and confirmations must follow the admissions sequence." })
})
export const admissionsHandoffSchema = z.union([admissionsHandoffV2Schema, admissionsHandoffV1Schema])
export type AdmissionsHandoff = z.infer<typeof admissionsHandoffSchema>
export type AcceptedEnrolmentContext = z.infer<typeof acceptedEnrolmentContextSchema>

export const saveApplicationInputSchema = /* @__PURE__ */ z.object({ id: text.min(1), requestId: text.min(1), expectedRevision: z.number().int().nonnegative(), snapshot: snapshotSchema }).strict()
export const sendApplicationMessageInputSchema = /* @__PURE__ */ z.object({ id: text.min(1), requestId: text.min(1), expectedRevision: z.number().int().nonnegative(), body: text.max(10000), attachments: z.array(evidenceSchema).max(5) }).strict()

export const acceptApplicationEnrolmentInputSchema = z.object({ id: text.min(1), expectedRevision: z.number().int().positive(), requestId: text.min(1) }).strict()
