import { appendFileSync } from "node:fs"

function redact(value) {
  return String(value).replace(/(token|secret|password|api[_-]?key)\s*[:=]\s*[^\s,;]+/gi, "$1=[REDACTED]")
}

export function appendTrace(path, event) {
  const safe = Object.entries(event).map(([key, value]) => {
    const safeValue = /token|secret|password|api[_-]?key/i.test(key) ? "[REDACTED]" : redact(value)
    return `${key}: ${safeValue}`
  }).join(" | ")
  appendFileSync(path, `${new Date().toISOString()} | ${safe}\n`)
}
