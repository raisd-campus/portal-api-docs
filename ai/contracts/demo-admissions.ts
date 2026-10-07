import { z } from "zod"

export const demoCampuses = [
  { value: "campus-lesotho", label: "Lesotho", countryCode: "LS", timeZone: "Africa/Maseru" },
  { value: "campus-cyberjaya", label: "Cyberjaya", countryCode: "MY", timeZone: "Asia/Kuala_Lumpur" },
  { value: "campus-botswana", label: "Botswana", countryCode: "BW", timeZone: "Africa/Gaborone" },
  { value: "campus-eswatini", label: "Eswatini", countryCode: "SZ", timeZone: "Africa/Mbabane" },
  { value: "campus-sierra-leone", label: "Sierra Leone", countryCode: "SL", timeZone: "Africa/Freetown" },
  { value: "campus-cambodia", label: "Cambodia", countryCode: "KH", timeZone: "Asia/Phnom_Penh" },
  { value: "campus-uganda", label: "Uganda", countryCode: "UG", timeZone: "Africa/Kampala" },
  { value: "campus-namibia", label: "Namibia", countryCode: "NA", timeZone: "Africa/Windhoek" },
] as const

/** Existing Cyberjaya Design demo, not a new campus admissions policy. */
export const demoAdmissionsCatalogue = {
  version: 1,
  campusId: "campus-cyberjaya", timeZone: "Asia/Kuala_Lumpur",
  faculty: { value: "faculty-design-innovation", label: "Faculty of Design Innovation" },
  programme: { value: "programme-bdes-visual-communication", label: "Bachelor of Design (Hons) Professional Design (Visual Communication)" },
  programmeVersionId: "programme-version-bdes-vc-2025", intakeId: "demo-first-intake",
  creative: true, postgraduate: false, firstSemesterStartsAfterDays: 6,
} as const
export function demoIntake(reference: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: demoAdmissionsCatalogue.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(reference)
  const part = (name: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === name)!.value
  const date = new Date(`${part("year")}-${part("month")}-${part("day")}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + demoAdmissionsCatalogue.firstSemesterStartsAfterDays)
  return { value: demoAdmissionsCatalogue.intakeId, label: new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(date), startsOn: date.toISOString().slice(0, 10) }
}
export const demoAdmissionContextSchema = z.object({
  catalogueVersion: z.literal(1), campusId: z.enum(demoCampuses.map(campus => campus.value)).default("campus-cyberjaya"), referenceAt: z.iso.datetime(),
  intakeId: z.literal(demoAdmissionsCatalogue.intakeId), startsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  facultyId: z.literal(demoAdmissionsCatalogue.faculty.value), programmeId: z.literal(demoAdmissionsCatalogue.programme.value), programmeVersionId: z.literal(demoAdmissionsCatalogue.programmeVersionId),
}).refine(value => demoIntake(new Date(value.referenceAt)).startsOn === value.startsOn, "Intake dates must match the demo reference date.")
export function demoAdmissionContext(referenceAt: string, campusId: string = "campus-cyberjaya") {
  return demoAdmissionContextSchema.parse({ catalogueVersion: 1, campusId, referenceAt, intakeId: demoAdmissionsCatalogue.intakeId, startsOn: demoIntake(new Date(referenceAt)).startsOn, facultyId: demoAdmissionsCatalogue.faculty.value, programmeId: demoAdmissionsCatalogue.programme.value, programmeVersionId: demoAdmissionsCatalogue.programmeVersionId })
}
export type DemoAdmissionContext = z.infer<typeof demoAdmissionContextSchema>
