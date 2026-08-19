// Tier-0 contract (R4 result contract + R14 receipt schema). Pure spec, no impl deps.
export const STATUS = Object.freeze(["dispatched", "done", "blocked", "setup-required"])
export const EXPERIENCE_MODES = Object.freeze(["interactive", "minimal", "automatic"])
export const RECEIPT_FIELDS = Object.freeze([
  "status",
  "selectedChild",
  "requestId",
  "timestamp",
  "resultRef",
  "evidenceRef",
  "verdict",
  "experienceMode",
])

export function isValidStatus(value) {
  return STATUS.includes(value)
}

export function isValidExperienceMode(value) {
  return EXPERIENCE_MODES.includes(value)
}

// R4 fail-closed: when no child was observed, never dispatched/done.
export function failClosedStatusWhenNoChild() {
  return "blocked"
}

// R14: every receipt must carry all 8 fields and valid enums.
export function validateReceipt(receipt) {
  if (receipt === null || typeof receipt !== "object" || Array.isArray(receipt)) {
    return { valid: false, reason: "not-object" }
  }
  for (const field of RECEIPT_FIELDS) {
    if (!(field in receipt)) {
      return { valid: false, reason: `missing-field:${field}` }
    }
  }
  if (!isValidStatus(receipt.status)) {
    return { valid: false, reason: `invalid-status:${receipt.status}` }
  }
  if (!isValidExperienceMode(receipt.experienceMode)) {
    return { valid: false, reason: `invalid-experienceMode:${receipt.experienceMode}` }
  }
  return { valid: true }
}
