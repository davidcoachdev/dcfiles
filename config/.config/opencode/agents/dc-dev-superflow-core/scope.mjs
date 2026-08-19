const FORBIDDEN = /kiroExplore|cavekit-|gentle-|sdd-|external-agent/i

export function scanDependencies(source) {
  const match = String(source).match(FORBIDDEN)
  return match ? { status: "blocked", target: match[0] } : { status: "clean" }
}

export function assertAdditivePath(path) {
  const allowed = /^(agents|skills)\/dc-dev-superflow-|^tests\/dc-dev-superflow\/|^fixtures\/dc-dev-superflow\/|^context\/dc-dev-superflow\/(kits|impl|plans)(\/|$)/
  if (!allowed.test(path)) throw new Error(`protected path: ${path}`)
  return true
}

export function validateScopeManifest({ approved = [], changed = [] }) {
  const all = [...approved, ...changed]
  return all.every((path) => /^(agents|skills)\/dc-dev-superflow-|^tests\/dc-dev-superflow\/|^fixtures\/dc-dev-superflow\/|^context\/dc-dev-superflow\/(kits|impl|plans)(\/|$)/.test(path))
    ? { status: "clean" }
    : { status: "blocked", reason: "non-additive-path" }
}
