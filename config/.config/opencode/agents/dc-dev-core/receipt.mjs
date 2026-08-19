import { validateReceipt, RECEIPT_FIELDS } from "./contract.mjs"

const SECRET_PATTERNS = [
  /\b(api[_-]?key|secret|password|token|credential|private[_-]?key|access[_-]?token)\b/i,
  /sk-[a-zA-Z0-9]{10,}/,
  /AKIA[0-9A-Z]{16}/,
]

export function containsSecret(text) {
  if (typeof text !== "string") return false
  return SECRET_PATTERNS.some((re) => re.test(text))
}

export function redactSecrets(text) {
  if (typeof text !== "string") return text
  return text
    .replace(/sk-[a-zA-Z0-9]{10,}/g, "[REDACTED]")
    .replace(/AKIA[0-9A-Z]{16}/g, "[REDACTED]")
    .replace(/(api[_-]?key|secret|password|token|credential|private[_-]?key|access[_-]?token)\s*[:=]\s*\S+/gi, "$1=[REDACTED]")
}

// R14: build a receipt object (validated against the 8-field schema).
// Gap 1: reject `undefined` for EVERY field before serializing. JSON.stringify
// silently drops `undefined` keys, which would lose data without error, so we
// fail closed. We also distinguish a key that is *absent* (missing-field) from
// one that is *present but undefined* (undefined-field).
const REQUIRED_FIELDS = ["status", "requestId", "experienceMode"]
// Nullable fields may legitimately be `null` (e.g. no child observed); they must
// never be `undefined`.
export function buildReceipt(fields) {
  if (fields === null || typeof fields !== "object" || Array.isArray(fields)) {
    throw new Error("invalid-receipt:not-object")
  }
  const receipt = {}
  for (const field of RECEIPT_FIELDS) {
    const present = Object.prototype.hasOwnProperty.call(fields, field)
    if (!present) {
      // timestamp is server-generated: an absent key defaults to now() and is
      // never a data-loss risk. Every other absent key is a hard error.
      if (field === "timestamp") {
        receipt.timestamp = new Date().toISOString()
        continue
      }
      throw new Error(`invalid-receipt:missing-field:${field}`)
    }
    if (fields[field] === undefined) {
      // Reject undefined for every field (silent serialization loss).
      throw new Error(`invalid-receipt:undefined-field:${field}`)
    }
    receipt[field] = fields[field]
  }
  // Non-nullable data fields must not be null either.
  for (const field of REQUIRED_FIELDS) {
    if (receipt[field] === null) {
      throw new Error(`invalid-receipt:null-field:${field}`)
    }
  }
  const v = validateReceipt(receipt)
  if (!v.valid) throw new Error(`invalid-receipt:${v.reason}`)
  return receipt
}

// R16: never persist secrets. Reject outright if a secret-like value is present;
// otherwise redact defensively before building.
export function safeReceipt(fields) {
  const risky = [fields.verdict, fields.evidenceRef, fields.resultRef].filter(
    (x) => typeof x === "string" && containsSecret(x),
  )
  if (risky.length > 0) throw new Error("secret-in-receipt")
  const safe = { ...fields }
  if (typeof safe.verdict === "string") safe.verdict = redactSecrets(safe.verdict)
  return buildReceipt(safe)
}

export function appendReceiptLine(writer, receipt) {
  const line = JSON.stringify(receipt)
  writer.writeLine(line)
  return line
}
