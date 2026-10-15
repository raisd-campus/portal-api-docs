import { z } from "zod"

const id = z.string().min(1)
const iso = z.iso.datetime({ offset: true })
export const CLASSROOM_CHUNK_BYTES = 1024 * 1024
export const CLASSROOM_MAX_FILE_BYTES = 50 * 1024 * 1024
export const classroomFileSchema = z.object({
  id, name: z.string().min(1).max(240), mimeType: z.enum(["application/pdf", "application/zip"]),
  sizeBytes: z.number().int().positive().max(CLASSROOM_MAX_FILE_BYTES), sha256: z.string().regex(/^[a-f0-9]{64}$/),
})
export const classroomFeedbackSchema = z.object({
  version: z.number().int().positive(), submissionId: id, scorePercent: z.number().min(0).max(100),
  weightedScore: z.number().min(0).max(100), feedback: z.string().max(10000),
  authorName: id, savedAt: iso, publishedAt: iso.nullable(), reason: z.string().max(2000),
})
export const classroomSubmissionSchema = z.object({
  id, fileName: id, mimeType: id, sizeBytes: z.number().int().nonnegative(), submittedAt: iso,
  file: classroomFileSchema.nullable(),
})
export const classroomAssignmentRowSchema = z.object({
  registrationId: id, studentId: id, studentNumber: id, displayName: id,
  submission: classroomSubmissionSchema.nullable(), revision: z.number().int().nonnegative(),
  draft: classroomFeedbackSchema.nullable(), published: classroomFeedbackSchema.nullable(),
  history: z.array(classroomFeedbackSchema),
})
export const classroomSessionSchema = z.object({
  id, startsAt: iso, endsAt: iso, status: z.enum(["scheduled", "completed", "cancelled"]),
  location: z.string().nullable(), revision: z.number().int().nonnegative(),
  attendance: z.array(z.object({ registrationId: id, status: z.enum(["present", "absent"]).nullable() })),
  history: z.array(z.object({ registrationId: id, before: z.enum(["present", "absent"]).nullable(), after: z.enum(["present", "absent"]), reason: z.string(), authorName: id, at: iso })),
  log: z.object({ revision: z.number().int().nonnegative(), covered: z.string(), unfinished: z.string(), followUp: z.string(), authorName: id, savedAt: iso }).nullable(),
})
export const classroomSchema = z.object({
  id, moduleId: id, code: id, title: id, programme: id, term: id, section: id,
  startsOn: z.iso.date(), endsOn: z.iso.date(), timeZone: id, completed: z.boolean(),
  setupIssues: z.array(z.string()),
  students: z.array(z.object({ registrationId: id, studentId: id, studentNumber: id, displayName: id, avatarUrl: z.string().nullable(), semesterNumber: z.number().int().positive(), nationality: z.string().nullable() })),
  sessions: z.array(classroomSessionSchema),
  weeks: z.array(z.object({ id, weekNumber: z.number().int().positive(), startsOn: z.iso.date(), title: id, outcomes: z.array(z.string()), plan: z.string().nullable(), materials: z.array(z.object({ id, title: id })) })),
  assignments: z.array(z.object({ id, learningItemId: id.nullable(), title: id, weightPercent: z.number().positive().max(100), dueAt: iso.nullable(), setupIssue: z.string().nullable(), rows: z.array(classroomAssignmentRowSchema) })),
})
export const classroomsWorkspaceSchema = z.object({ currentPersonId: id, serverNow: iso, classrooms: z.array(classroomSchema) })
export const classroomStudentStateSchema = z.object({
  moduleOfferingId: id, registrationId: id, feedback: z.array(z.object({ learningItemId: id, published: classroomFeedbackSchema, history: z.array(classroomFeedbackSchema) })),
})
export const classroomTargetSchema = z.object({ moduleOfferingId: id }).strict()
export const classroomAssignmentTargetSchema = z.object({ moduleId: id, semesterId: id, programmeEnrolmentId: id.nullable().optional(), moduleLearningItemId: id }).strict()
export const classroomBeginSubmissionSchema = z.object({ target: classroomAssignmentTargetSchema, file: classroomFileSchema.omit({id:true}), previousSubmissionId: id.nullable() }).strict()
export const classroomUploadOperationSchema = z.object({ uploadId: id, offset: z.number().int().nonnegative().multipleOf(CLASSROOM_CHUNK_BYTES).optional(), contentBase64: z.string().max(1400000).optional(), requestId: z.uuid().optional() }).strict()
export const classroomDeleteSubmissionSchema = z.object({ target: classroomAssignmentTargetSchema, previousSubmissionId: id, requestId: z.uuid() }).strict()
export const classroomSubmissionReadSchema = z.object({ moduleOfferingId: id, registrationId: id, submissionId: id, fileId: id, offset: z.number().int().nonnegative().multipleOf(CLASSROOM_CHUNK_BYTES) }).strict()
export const classroomFileChunkSchema = z.object({ metadata: classroomFileSchema, offset: z.number().int().nonnegative().multipleOf(CLASSROOM_CHUNK_BYTES), contentBase64: z.string().max(1400000) })
const mutation = { moduleOfferingId: id, revision: z.number().int().nonnegative(), requestId: z.uuid() }
export const saveClassroomAttendanceSchema = z.object({
  ...mutation, sessionId: id, reason: z.string().trim().max(2000),
  rows: z.array(z.object({ registrationId: id, status: z.enum(["present", "absent"]) }).strict()).min(1).max(1000),
}).strict()
export const saveClassroomFeedbackSchema = z.object({
  ...mutation, assessmentId: id, registrationId: id, submissionId: id,
  scorePercent: z.number().min(0).max(100), feedback: z.string().trim().max(10000), reason: z.string().trim().max(2000),
}).strict()
export const publishClassroomFeedbackSchema = z.object({
  moduleOfferingId: id, assessmentId: id, requestId: z.uuid(),
  rows: z.array(z.object({ registrationId: id, revision: z.number().int().nonnegative(), submissionId: id }).strict()).min(1).max(1000),
}).strict()
export const saveClassroomLogSchema = z.object({
  ...mutation, sessionId: id, covered: z.string().trim().max(10000), unfinished: z.string().trim().max(10000), followUp: z.string().trim().max(10000),
}).strict()
export type Classroom = z.infer<typeof classroomSchema>
export type ClassroomsWorkspace = z.infer<typeof classroomsWorkspaceSchema>
export type ClassroomSession = z.infer<typeof classroomSessionSchema>
export type ClassroomAssignmentRow = z.infer<typeof classroomAssignmentRowSchema>
export type ClassroomFile = z.infer<typeof classroomFileSchema>
export type ClassroomFeedback = z.infer<typeof classroomFeedbackSchema>
