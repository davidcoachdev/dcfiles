import assert from "node:assert/strict"
import { test } from "node:test"
import { verifyAdversarial } from "./adversarial.mjs"

test("adversarial verifier rejects missing evidence or equal models", () => {
  assert.equal(verifyAdversarial({ makeModel: "a", checkModel: "a", evidence: true }).verdict, "REJECT")
  assert.equal(verifyAdversarial({ makeModel: "a", checkModel: "b", evidence: false }).verdict, "REJECT")
  assert.equal(verifyAdversarial({ makeModel: "a", checkModel: "b", evidence: true }).verdict, "REVISE")
})
