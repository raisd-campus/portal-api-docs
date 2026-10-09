import { z } from "zod"

const id = z.string().trim().min(1)
const timestamp = z.string().datetime({ offset: true })
export const departmentReviewSchema = z.object({
  id, department: id, status: z.enum(["pending", "under-review", "action-required", "approved", "rejected"]),
  note: z.string().max(4000).nullable(), decidedAt: timestamp.nullable(),
})
export const registrationRequestSchema = z.object({
  id, studentProfileId: id, programmeEnrolmentId: id, studyPeriodId: id,
  moduleOfferingIds: z.array(id).min(1), invoiceIds: z.array(id).min(1),
  status: z.enum(["under-review", "action-required", "completed", "rejected", "withdrawn"]),
  reviews: z.array(departmentReviewSchema).length(2), revision: z.number().int().nonnegative(),
  submittedAt: timestamp, completedAt: timestamp.nullable(),
  clearanceBasis: z.enum(["verified-payment", "approved-arrangement"]).nullable(),
  arrangementNote: z.string().max(4000).nullable(), requestId: id,
}).superRefine((record, context) => {
  if (record.reviews[0]?.id !== "bursary" || record.reviews[1]?.id !== "faculty" || new Set(record.moduleOfferingIds).size !== record.moduleOfferingIds.length || new Set(record.invoiceIds).size !== record.invoiceIds.length) context.addIssue({ code: "custom", message: "Registration requires distinct selections and ordered Bursary / Faculty reviews." })
  if (record.reviews[1]?.status === "approved" && record.reviews[0]?.status !== "approved" || record.status === "completed" && (!record.completedAt || record.reviews.some(item => item.status !== "approved") || !record.clearanceBasis) || record.reviews[0]?.status === "approved" && (!record.clearanceBasis || record.clearanceBasis === "approved-arrangement" && !record.arrangementNote)) context.addIssue({ code: "custom", message: "Completion requires recorded Bursary clearance and Faculty approval." })
})
export const academicAwardSchema = z.object({
  id, studentProfileId: id, programmeEnrolmentId: id, awardedAt: timestamp, qualification: id,
})
export const approvedLeaveSchema = z.object({ id, studentProfileId: id, programmeEnrolmentId: id, submissionId: id, returnOn: id, approvedAt: timestamp })
export const studentDocumentDeliverySchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("available"), documentId: id, fileName: id, mimeType: id, contentBase64: z.string().max(34952536) }),
  z.object({ status: z.literal("unavailable"), documentId: id, reason: id }),
])
export const documentDeliveryInputSchema = z.object({ documentId: id, programmeEnrolmentId: id.nullable().optional() }).strict()
export const submitRegistrationRequestInputSchema = z.object({ studyPeriodId: id, moduleOfferingIds: z.array(id).min(1), requestId: id, programmeEnrolmentId: id.nullable().optional() }).strict()
export type DepartmentReview = z.infer<typeof departmentReviewSchema>
export type RegistrationRequest = z.infer<typeof registrationRequestSchema>
export type StudentDocumentDelivery = z.infer<typeof studentDocumentDeliverySchema>
export type DocumentDeliveryInput = z.infer<typeof documentDeliveryInputSchema>
export type SubmitRegistrationRequestInput = z.infer<typeof submitRegistrationRequestInputSchema>

/** Repeated source-form records are typed values, never JSON encoded into an answer string. */
export const courseRowSchema = z.object({
  id, courseCode: z.string().max(200), courseName: z.string().max(300), term: z.string().max(200),
  credits: z.string().max(12), grade: z.string().max(100).default(""),
  registrationId: z.string().nullable().default(null), offeringId: z.string().nullable().default(null),
})
export type CourseRow = z.infer<typeof courseRowSchema>

export function generatedDocumentIds(enrolmentId: string) { return Object.fromEntries(["partial", "final", "enrolment", "completion", "certificate"].map(kind => [kind, `generated:${encodeURIComponent(enrolmentId)}:${kind}`])) as Record<"partial" | "final" | "enrolment" | "completion" | "certificate", string> }

export const documentReceiptInputSchema = documentDeliveryInputSchema.extend({ revision: z.number().int().nonnegative() })
export type DocumentReceiptInput = z.infer<typeof documentReceiptInputSchema>
