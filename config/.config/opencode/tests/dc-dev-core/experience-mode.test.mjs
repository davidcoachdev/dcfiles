import { test } from "node:test"
import assert from "node:assert/strict"
import {
  resolveExperienceMode,
  requiresHumanPrompt,
} from "../../agents/dc-dev-core/experience-mode.mjs"

test("R5: no mode supplied -> interactive (default preserved)", () => {
  assert.equal(resolveExperienceMode(undefined), "interactive")
  assert.equal(resolveExperienceMode(""), "interactive")
})

test("R5: unknown/invalid mode -> interactive (fail-closed, never automatic)", () => {
  assert.equal(resolveExperienceMode("autopilot"), "interactive")
  assert.equal(resolveExperienceMode("AUTO"), "interactive")
})

test("R5: automatic without approved scope -> downgrade to interactive", () => {
  assert.equal(resolveExperienceMode("automatic", { approvedScope: null }), "interactive")
  assert.equal(resolveExperienceMode("automatic", {}), "interactive")
})

test("R5: automatic with approved scope -> automatic", () => {
  assert.equal(resolveExperienceMode("automatic", { approvedScope: { id: "scope1" } }), "automatic")
})

test("R5: explicit interactive/minimal preserved", () => {
  assert.equal(resolveExperienceMode("interactive"), "interactive")
  assert.equal(resolveExperienceMode("minimal"), "minimal")
})

test("R6: interactive prompts at admission/security/scope-expansion/final-approval, not noncritical", () => {
  assert.equal(requiresHumanPrompt("interactive", "admission"), true)
  assert.equal(requiresHumanPrompt("interactive", "security"), true)
  assert.equal(requiresHumanPrompt("interactive", "scope-expansion"), true)
  assert.equal(requiresHumanPrompt("interactive", "final-approval"), true)
  assert.equal(requiresHumanPrompt("interactive", "noncritical"), false)
})

test("R7: minimal prompts only at critical decisions", () => {
  assert.equal(requiresHumanPrompt("minimal", "admission"), false)
  assert.equal(requiresHumanPrompt("minimal", "scope-expansion"), true)
  assert.equal(requiresHumanPrompt("minimal", "security"), true)
  assert.equal(requiresHumanPrompt("minimal", "critical-decision"), true)
  assert.equal(requiresHumanPrompt("minimal", "noncritical"), false)
})

test("R8: automatic prompts only on security/blocked/out-of-scope (never in-scope routine)", () => {
  assert.equal(requiresHumanPrompt("automatic", "admission"), false)
  assert.equal(requiresHumanPrompt("automatic", "scope-expansion"), false)
  assert.equal(requiresHumanPrompt("automatic", "security"), true)
  assert.equal(requiresHumanPrompt("automatic", "blocked"), true)
  assert.equal(requiresHumanPrompt("automatic", "out-of-scope"), true)
})
