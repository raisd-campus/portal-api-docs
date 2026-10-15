import { z } from "zod"

const id = z.string().min(1).max(300)
const stamp = z.string().datetime({ offset: true })
export const MATERIAL_CHUNK_BYTES = 1024 * 1024
export const MATERIAL_MAX_FILE_BYTES = 50 * 1024 * 1024
export const materialScheduleSchema = z.object({ week: z.number().int().positive(), day: z.number().int().min(0).max(6), time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/) }).strict()
export const materialArtifactSchema = z.object({ id, name: z.string().min(1).max(240), mimeType: z.string().min(1).max(120), sizeBytes: z.number().int().positive().max(MATERIAL_MAX_FILE_BYTES), sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(), source: z.enum(["bundled-demo", "uploaded"]).nullable().optional() }).strict()
export const reusableMaterialSchema = z.object({
  id, kind: z.enum(["lectureNote", "reading", "video", "link", "assignment"]), title: z.string().max(300), description: z.string().max(20000),
  instructions: z.string().max(20000), release: materialScheduleSchema, deadline: materialScheduleSchema.nullable(),
  assessmentKey: id.nullable(), acceptedFormats: z.array(z.enum(["pdf", "zip"])).max(2), url: z.string().max(4000).nullable(), files: z.array(materialArtifactSchema).max(5),
}).strict()
export const materialRevisionSchema = z.object({ version: z.number().int().positive(), publishedAt: stamp, authorId: id, authorName: id, reason: z.string().min(1).max(2000), files: z.array(materialArtifactSchema).max(5), content: reusableMaterialSchema.optional() })
export const resolvedMaterialSchema = reusableMaterialSchema.extend({ availableFrom: stamp, dueAt: stamp.nullable(), weekId: id, assessmentId: id.nullable(), blockedReason: z.string().nullable(), history: z.array(materialRevisionSchema), seed: z.boolean(), publishedBy: id.nullable().optional(), lastUpdatedAt: stamp.nullable().optional() })
export const reusableMaterialsBundleSchema = z.object({
  moduleOfferingId: id, moduleId: id, campusId: id, timeZone: id, now: stamp, startsAt: stamp, endsAt: stamp,
  state: z.enum(["upcoming", "active", "completed"]), canPublishPlan: z.boolean(),
  weeks: z.array(z.object({ id, weekNumber: z.number().int().positive(), title: id, startsOn: z.string().date() })),
  assessments: z.array(z.object({ id, key: id.nullable(), title: id, weightPercent: z.number(), kind: id })),
  plan: z.object({ revision: z.number().int().nonnegative(), publishedVersion: z.number().int().nonnegative(), draft: z.array(reusableMaterialSchema), published: z.array(reusableMaterialSchema), bindingVersion: z.number().int().nonnegative().nullable() }),
  items: z.array(resolvedMaterialSchema), classDrafts: z.array(reusableMaterialSchema), classRevision: z.number().int().nonnegative(),
  readOnlyItems: z.array(z.object({ id, weekNumber: z.number().int().positive(), kind: z.enum(["quiz", "exam"]), title: id, availableFrom: stamp, assessmentId: id, description: z.string().max(20000).nullable().optional(), instructions: z.string().max(20000).nullable().optional(), publishedBy: id.nullable().optional(), lastUpdatedAt: stamp.nullable().optional() })).optional(),
})
export const saveMaterialsSchema = z.object({ moduleOfferingId: id, scope: z.enum(["plan", "class"]), expectedRevision: z.number().int().nonnegative(), requestId: id, items: z.array(reusableMaterialSchema).max(200) }).strict()
export const publishMaterialsSchema = z.object({ moduleOfferingId: id, scope: z.enum(["plan", "class"]), expectedRevision: z.number().int().nonnegative(), requestId: id, reason: z.string().trim().min(1).max(2000), itemId: id.optional() }).strict()
export type MaterialSchedule = z.infer<typeof materialScheduleSchema>
export type MaterialArtifact = z.infer<typeof materialArtifactSchema>
export type ReusableMaterial = z.infer<typeof reusableMaterialSchema>
export type ResolvedMaterial = z.infer<typeof resolvedMaterialSchema>
export type ReusableMaterialsBundle = z.infer<typeof reusableMaterialsBundleSchema>
export type MaterialRevision = z.infer<typeof materialRevisionSchema>

/** Calendar-day arithmetic, followed by conversion of the local wall clock. */
export function resolveMaterialSchedule(rule: MaterialSchedule, weeks: Array<{ weekNumber: number; startsOn: string }>, timeZone: string) {
  materialScheduleSchema.parse(rule)
  const week = weeks.find(w => w.weekNumber === rule.week)
  if (!week) throw new Error(`Teaching week ${rule.week} is not configured.`)
  const date = new Date(`${week.startsOn}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + rule.day)
  const wall = Date.parse(`${date.toISOString().slice(0, 10)}T${rule.time}:00Z`)
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
  const local = (at: number) => { const p = formatter.formatToParts(new Date(at)); const v = (key: string) => p.find(x => x.type === key)!.value; return Date.parse(`${v("year")}-${v("month")}-${v("day")}T${v("hour")}:${v("minute")}:00Z`) }
  let at = wall
  for (let i = 0; i < 4; i++) at += wall - local(at)
  if (local(at) !== wall) throw new Error("This time does not exist in the class time zone.")
  return new Date(at).toISOString()
}
