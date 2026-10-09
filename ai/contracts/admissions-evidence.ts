import { evidenceSchema } from "./admissions"
export function collectAdmissionsEvidence(input: unknown): Array<import("zod").infer<typeof evidenceSchema>> {
  const found = new Map<string, import("zod").infer<typeof evidenceSchema>>()
  const visit = (value: unknown) => { const parsed = evidenceSchema.safeParse(value); if (parsed.success) found.set(parsed.data.id, parsed.data); else if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === "object") Object.values(value).forEach(visit) }
  visit(input); return [...found.values()]
}
