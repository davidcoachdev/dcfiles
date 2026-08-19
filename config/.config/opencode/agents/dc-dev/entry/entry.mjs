export function routeRequest(request, state = {}) {
  const build = /\b(build|implement|create|add|fix|change)\b/i.test(request)
  if (!build) return { route: "consultation" }
  const approval = state.approvalStore?.get(state.approvalId)
  const now = state.now ?? Date.now()
  const active = approval && approval.actor && approval.approvalId && approval.revokedAt === undefined &&
    approval.approvedAt <= now && now < approval.expiresAt && approval.requestHash === state.approvalStore?.hash?.(request)
  if (!active) return { route: "approval-required" }
  return { route: "preflight" }
}
