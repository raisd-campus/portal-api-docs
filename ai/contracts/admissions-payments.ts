/** Approved local campus tariffs, not an inferred rate for other campuses. */
export const registrationTariffs: Record<string, Record<"local" | "international", { currency: string; amountMinor: number }>> = {
  "campus-cyberjaya": { local: { currency: "MYR", amountMinor: 50_000 }, international: { currency: "MYR", amountMinor: 100_000 } },
  "campus-lesotho": { local: { currency: "LSL", amountMinor: 30_000 }, international: { currency: "LSL", amountMinor: 30_000 } },
}
export const paymentMethods = ["bank-transfer", "counter"] as const
export type SemesterFeeSource = { feePlanId: string; feePlanRevision: number; programmeVersionId: string; semesterNumber: number; currency: string; totalMinor: number }
export function currencyDigits(currency: string) {
  if (!Intl.supportedValuesOf("currency").includes(currency)) throw new Error("Select a supported ISO currency.")
  return new Intl.NumberFormat("en", { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2
}
export function parseMoney(value: string, currency: string): number {
  const digits = currencyDigits(currency)
  if (!new RegExp(`^\\d+(?:\\.\\d{0,${digits}})?$`).test(value)) throw new Error("Enter a valid amount for this currency.")
  const [whole, decimal = ""] = value.split(".")
  const amount = BigInt(whole) * 10n ** BigInt(digits) + BigInt(decimal.padEnd(digits, "0") || "0")
  if (amount <= 0n || amount > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("Enter a positive amount within the supported range.")
  return Number(amount)
}
