import assert from "node:assert/strict"
import { test } from "node:test"
import { validateArtifact } from "./artifact-validation.mjs"

test("artifact validation accepts neutral English technical artifacts", () => {
  assert.equal(validateArtifact("# Result Contract\n\nStatus: APPROVE").valid, true)
  assert.equal(validateArtifact("<script>alert(1)</script>").valid, false)
})
