import { test } from "node:test"
import assert from "node:assert/strict"
import { classify, isAmbiguous, clarify } from "../../agents/dc-dev-core/triage.mjs"

test("R19: classify is read-only (pure) and returns a verdict shape before any build", () => {
  const v = classify({ text: "fix the button label typo" })
  assert.ok(["green", "yellow", "red", "ambiguous"].includes(v.tier))
  assert.equal(v.readOnly, true)
  assert.ok("recommendedExperienceMode" in v)
  assert.ok("recommendedDepth" in v)
})

test("R20: green fixtures classify green; security-adjacent not green", () => {
  for (const t of [
    "change the button color to blue",
    "fix the typo in the heading",
    "update a single config value",
    "cosmetic tweak to the icon",
  ]) {
    assert.equal(classify({ text: t }).tier, "green", t)
  }
  assert.notEqual(classify({ text: "rotate the database secret" }).tier, "green")
})

test("R20: determinism across 50 repeated runs", () => {
  for (let i = 0; i < 50; i++) assert.equal(classify({ text: "fix the typo" }).tier, "green")
})

test("R21: yellow multi-file feature; single trivial fix not yellow", () => {
  assert.equal(classify({ text: "implement a new feature across multiple files" }).tier, "yellow")
  assert.notEqual(classify({ text: "fix a typo" }).tier, "yellow")
})

test("R22: red fixtures classify red and force interactive", () => {
  for (const t of [
    "rotate the api key secret",
    "change rbac permissions",
    "run a db schema migration",
    "modify the auth flow",
  ]) {
    const v = classify({ text: t })
    assert.equal(v.tier, "red", t)
    assert.equal(v.recommendedExperienceMode, "interactive")
    assert.equal(v.forcedInteractive, true)
  }
})

test("R22: red never recommends automatic", () => {
  const red = classify({ text: "rotate the secret" })
  assert.equal(red.recommendedExperienceMode, "interactive")
})

test("R23: green with approved scope may recommend automatic; green without does not", () => {
  const withScope = classify({ text: "fix the typo" }, { approvedScope: { id: "s" } })
  assert.equal(withScope.recommendedExperienceMode, "automatic")
  const without = classify({ text: "fix the typo" })
  assert.notEqual(without.recommendedExperienceMode, "automatic")
})

test("R24: depth mapping green->shallow, yellow->standard, red->deep", () => {
  assert.equal(classify({ text: "fix typo" }).recommendedDepth, "shallow")
  assert.equal(classify({ text: "implement feature across files" }).recommendedDepth, "standard")
  assert.equal(classify({ text: "rotate secret" }).recommendedDepth, "deep")
})

test("R25: ambiguous emits exactly one question and halts; re-classifies post-answer", () => {
  const v = classify({ text: "" })
  assert.equal(v.tier, "ambiguous")
  assert.equal(v.needsQuestion, true)
  const after = clarify(v, "fix the button color")
  assert.equal(after.tier, "green")
  assert.equal(after.needsQuestion, false)
})

test("R25: vague phrase is ambiguous (needsQuestion true)", () => {
  assert.equal(isAmbiguous(""), true)
  assert.equal(classify({ text: "do something about it" }).needsQuestion, true)
})
