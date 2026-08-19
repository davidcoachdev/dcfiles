import { EXPERIENCE_MODES, isValidExperienceMode } from "./contract.mjs"

// R5 fail-closed resolver. interactive is the default; unrecognized/missing -> interactive (never automatic).
export function resolveExperienceMode(input, opts = {}) {
  const mode = typeof input === "string" ? input.trim().toLowerCase() : ""
  if (!isValidExperienceMode(mode)) {
    return "interactive" // fail-closed, never automatic
  }
  if (mode === "automatic") {
    // R5/R8: automatic only with an approved-scope document; otherwise downgrade.
    if (!opts.approvedScope) {
      return opts.downgradeTo === "setup-required" ? "setup-required" : "interactive"
    }
  }
  return mode
}

// R6/R7/R8 gate behavior. Returns true if a human prompt is REQUIRED at this gate.
// gateType in: admission | scope-expansion | security | final-approval | critical-decision | noncritical
export function requiresHumanPrompt(mode, gateType) {
  switch (mode) {
    case "interactive":
      // R6: prompt at every relevant gate (the four listed); noncritical is not a relevant gate.
      return ["admission", "scope-expansion", "security", "final-approval"].includes(gateType)
    case "minimal":
      // R7: prompt only at critical decisions.
      return ["scope-expansion", "security", "critical-decision", "final-approval"].includes(gateType)
    case "automatic":
      // R8: no prompt in-scope; halt only on security/block/out-of-scope.
      return ["security", "blocked", "out-of-scope"].includes(gateType)
    default:
      // fail-closed: anything unrecognized still prompts.
      return true
  }
}
