import { z } from "zod"
export const EVIDENCE_CHUNK_BYTES = 1024 * 1024
export const EVIDENCE_MAX_BYTES = 25 * EVIDENCE_CHUNK_BYTES
export const ownedEvidenceSchema = z
  .object({
    id: z.string().min(1).max(200),
    name: z.string().min(1).max(300),
    mimeType: z.string().min(1).max(200),
    sizeBytes: z.number().int().min(1).max(EVIDENCE_MAX_BYTES),
  })
  .strict()
export const uploadEvidenceSchema = ownedEvidenceSchema
  .extend({
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    purpose: z.enum(["admissions", "message"]).default("admissions"),
  })
  .superRefine((value, context) => {
    const types: Record<string, string[]> = {
      pdf: ["application/pdf"],
      doc: ["application/msword", "application/octet-stream"],
      jpg: ["image/jpeg"],
      jpeg: ["image/jpeg"],
      png: ["image/png"],
    }
    const extension = value.name.split(".").at(-1)?.toLowerCase() ?? ""
    if (
      value.purpose === "admissions" &&
      !types[extension]?.includes(value.mimeType)
    )
      context.addIssue({
        code: "custom",
        path: ["mimeType"],
        message:
          "Choose a supported PDF, Word, JPEG or PNG file with matching file type.",
      })
  })
export const evidenceChunkInputSchema = z
  .object({
    id: z.string().min(1),
    offset: z.number().int().min(0),
    contentBase64: z
      .string()
      .max(1398104)
      .regex(/^[A-Za-z0-9+/]*={0,2}$/),
  })
  .strict()
export const continuationInputSchema = z
  .object({
    applicationId: z.string().min(1),
    expectedRevision: z.number().int().positive(),
    nonce: z.string().regex(/^[a-f0-9]{32}$/),
    studentOrigin: z.string().url(),
  })
  .strict()
export const continuationClaimSchema = z
  .object({
    grant: z.string().min(32).max(128),
    nonce: z.string().regex(/^[a-f0-9]{32}$/),
  })
  .strict()
export const evidenceReadSchema = z
  .object({
    id: z.string().min(1),
    offset: z.number().int().nonnegative().default(0),
  })
  .strict()
export type OwnedEvidence = z.infer<typeof ownedEvidenceSchema>
export const uploadStartedSchema = z
  .object({ id: z.string().min(1), status: z.enum(["uploading", "complete"]) })
  .strict()
export const continuationGrantSchema = z
  .object({
    grant: z.string().min(32).max(128),
    expiresAt: z.number().int().positive(),
  })
  .strict()
export const evidenceDeliveryReplySchema = z.union([
  z
    .object({ status: z.literal("unavailable"), reason: z.string().min(1) })
    .strict(),
  ownedEvidenceSchema
    .extend({
      status: z.literal("available"),
      sha256: z.string().regex(/^[a-f0-9]{64}$/),
      offset: z.number().int().nonnegative(),
      contentBase64: z
        .string()
        .max(1398104)
        .regex(/^[A-Za-z0-9+/]*={0,2}$/),
    })
    .strict(),
])
export const hostedStudentSessionSchema = z
  .object({
    accessToken: z.string().min(32).max(128),
    supportedMethods: z.array(z.string().min(1)).max(200),
    studentProfileId: z.string().min(1),
    programmeEnrolmentId: z.string().min(1),
  })
  .strict()
