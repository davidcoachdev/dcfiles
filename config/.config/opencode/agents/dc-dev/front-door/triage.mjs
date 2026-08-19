import { createHash, randomUUID } from "node:crypto"
import { chmodSync, existsSync, mkdirSync, readFileSync, realpathSync, renameSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const WORKSPACE_ROOT = realpathSync(join(dirname(fileURLToPath(import.meta.url)), "../../.."))
const DEFAULT_STORE = process.env.DC_DEV_APPROVAL_STORE ?? join(WORKSPACE_ROOT, "context/impl/.dc-dev-approvals.json")

export function createApprovalStore(path = DEFAULT_STORE) {
  const load = () => {
    if (!existsSync(path)) return { approvals: {} }
    return JSON.parse(readFileSync(path, "utf8"))
  }
  const save = (data) => {
    mkdirSync(dirname(path), { recursive: true })
    const temporary = `${path}.${process.pid}.tmp`
    writeFileSync(temporary, JSON.stringify(data, null, 2), { mode: 0o600 })
    chmodSync(temporary, 0o600)
    renameSync(temporary, path)
  }
  return {
    path,
    hash(request) { return createHash("sha256").update(request).digest("hex") },
    put(approval) { const data = load(); data.approvals[approval.approvalId] = approval; save(data); return approval },
    get(id) { return load().approvals[id] },
    revoke(id, revokedAt = Date.now()) { const data = load(); if (data.approvals[id]) data.approvals[id].revokedAt = revokedAt; save(data) },
  }
}

export function triage(request, state = {}) {
  const build = /\b(build|implement|create|add|fix|change)\b/i.test(request)
  if (!build) return { mode: "consultation" }
  if (!isActiveApproval(state.approvalStore?.get(state.approvalId), request, state.now ?? Date.now())) return { mode: "approval-required" }
  return { mode: "build" }
}

export function approveBuild({ actor, request, now = Date.now(), ttlMs = 15 * 60 * 1000, store = createApprovalStore() }) {
  if (!actor || !request || !Number.isFinite(now) || !Number.isFinite(ttlMs) || ttlMs <= 0) {
    throw new TypeError("actor, request, now, and positive ttlMs are required")
  }
  return store.put({
    approvalId: randomUUID(),
    actor,
    approvedAt: now,
    expiresAt: now + ttlMs,
    requestHash: createHash("sha256").update(request).digest("hex"),
  })
}

function isActiveApproval(approval, request, now) {
  if (!approval || approval.revokedAt !== undefined) return false
  return approval.actor && approval.approvalId && approval.approvedAt <= now && now < approval.expiresAt &&
    approval.requestHash === createHash("sha256").update(request).digest("hex")
}
