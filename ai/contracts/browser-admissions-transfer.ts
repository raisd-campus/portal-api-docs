import { z } from "zod"
import { admissionsHandoffSchema, admissionsHandoffV2Schema } from "./admissions"
import { demoAdmissionContextSchema } from "./demo-admissions"
export const browserAdmissionsTransferSchema = z.object({ version: z.union([z.literal(1), z.literal(2)]), handoff: admissionsHandoffSchema, demo: demoAdmissionContextSchema }).strict().superRefine((value, context) => {
  if (value.version !== value.handoff.version) context.addIssue({ code: "custom", path: ["version"], message: "Envelope and handoff versions must match." })
  if (value.version === 2 && !admissionsHandoffV2Schema.safeParse(value.handoff).success) context.addIssue({ code: "custom", path: ["handoff"], message: "Transfer v2 requires confirmed letters." })
  if (value.version === 2 && value.handoff.snapshot.studyPreferences.campusId !== value.demo.campusId) context.addIssue({ code: "custom", path: ["demo", "campusId"], message: "Campus must match the accepted application." })
  const first = value.handoff.snapshot.studyPreferences.preferences[0]
  if (first.intakeId !== value.demo.intakeId || first.facultyId !== value.demo.facultyId || first.courseId !== value.demo.programmeId) context.addIssue({ code: "custom", path: ["demo"], message: "The accepted programme and intake must match the demo curriculum." })
  if (value.demo.referenceAt > value.handoff.submittedAt) context.addIssue({ code: "custom", path: ["demo", "referenceAt"], message: "The catalogue reference must precede submission." })
})
export const admissionsSignalSchema = z.object({ kind: z.enum(["admissions-ready", "admissions-complete", "admissions-failed"]), nonce: z.string().regex(/^[a-f0-9]{32}$/) }).strict()
export const admissionsDeliverySchema = z.object({ kind: z.literal("admissions-delivery"), nonce: z.string().regex(/^[a-f0-9]{32}$/), payload: browserAdmissionsTransferSchema }).strict()
export type BrowserAdmissionsTransfer = z.infer<typeof browserAdmissionsTransferSchema>
