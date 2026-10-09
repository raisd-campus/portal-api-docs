import { z } from "zod"
import { admissionsHandoffSchema, admissionsHandoffV2Schema } from "./admissions"
import { evidenceSchema } from "./admissions"
import { collectAdmissionsEvidence } from "./admissions-evidence"
export { collectAdmissionsEvidence } from "./admissions-evidence"
import { demoAdmissionContextSchema } from "./demo-admissions"
export const browserAdmissionsTransferSchema = z.object({ version: z.union([z.literal(1), z.literal(2), z.literal(3)]), handoff: admissionsHandoffSchema, demo: demoAdmissionContextSchema, resourceManifest: z.array(evidenceSchema.extend({ sha256: z.string().regex(/^[a-f0-9]{64}$/) })).max(200).default([]) }).strict().superRefine((value, context) => {
  if (value.version !== 3 && value.version !== value.handoff.version) context.addIssue({ code: "custom", path: ["version"], message: "Envelope and handoff versions must match." })
  if (value.version >= 2 && !admissionsHandoffV2Schema.safeParse(value.handoff).success) context.addIssue({ code: "custom", path: ["handoff"], message: "Transfer v2 requires confirmed letters." })
  if (value.version >= 2 && value.handoff.snapshot.studyPreferences.campusId !== value.demo.campusId) context.addIssue({ code: "custom", path: ["demo", "campusId"], message: "Campus must match the accepted application." })
  const evidence = collectAdmissionsEvidence({ documents: value.handoff.snapshot.documents, academicDetails: value.handoff.snapshot.academicDetails })
  if (new Set(value.resourceManifest.map(item => item.id)).size !== value.resourceManifest.length || value.resourceManifest.some(item => !evidence.some(owned => owned.id === item.id && owned.name === item.name && owned.sizeBytes === item.sizeBytes && owned.mimeType === item.mimeType))) context.addIssue({ code: "custom", path: ["resourceManifest"], message: "Resources must match unique owned admission evidence." })
  if (value.version < 3 && value.resourceManifest.length) context.addIssue({ code: "custom", path: ["resourceManifest"], message: "Evidence resources require transport v3." })
  const first = value.handoff.snapshot.studyPreferences.preferences[0]
  if (first.intakeId !== value.demo.intakeId || first.facultyId !== value.demo.facultyId || first.courseId !== value.demo.programmeId) context.addIssue({ code: "custom", path: ["demo"], message: "The accepted programme and intake must match the demo curriculum." })
  if (value.demo.referenceAt > value.handoff.submittedAt) context.addIssue({ code: "custom", path: ["demo", "referenceAt"], message: "The catalogue reference must precede submission." })
})
export const admissionsSignalSchema = z.object({ kind: z.enum(["admissions-ready", "admissions-complete", "admissions-failed", "admissions-resource-request"]), resourceId: z.string().min(1).optional(), nonce: z.string().regex(/^[a-f0-9]{32}$/) }).strict()
export const admissionsDeliverySchema = z.object({ kind: z.literal("admissions-delivery"), nonce: z.string().regex(/^[a-f0-9]{32}$/), payload: browserAdmissionsTransferSchema }).strict()
export type BrowserAdmissionsTransfer = z.infer<typeof browserAdmissionsTransferSchema>

export const admissionsResourceSchema = z.object({ kind: z.literal("admissions-resource"), nonce: z.string().regex(/^[a-f0-9]{32}$/), resourceId: z.string().min(1), contentBase64: z.string().max(34952536).regex(/^[A-Za-z0-9+/]*={0,2}$/) }).strict()
export type AdmissionsResource = { id: string; name: string; mimeType: string; sizeBytes: number; contentBase64: string }
