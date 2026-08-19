const OWNED = /^dc-dev-superflow-[a-z0-9-]+$/
const FORBIDDEN = /^(kiroExplore|cavekit-|gentle-|sdd-|external-agent)/

export function normalizeReceipt(input) {
  const required = ["id", "role", "model", "capability", "writeScope"]
  if (required.some((key) => !input?.[key])) throw new Error("parent receipt is incomplete")
  return { ...input, admitted: true }
}

export function routeChild(target, parentReceipt) {
  if (!parentReceipt?.admitted) return { status: "blocked", reason: "parent-not-admitted" }
  if (FORBIDDEN.test(target) || !OWNED.test(target)) return { status: "blocked", target, reason: "child-not-owned" }
  return { status: "admitted", target, parentReceipt: parentReceipt.id }
}
