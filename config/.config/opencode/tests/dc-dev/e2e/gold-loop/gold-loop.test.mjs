import assert from "node:assert/strict"
import { test } from "node:test"
import { parseVerdict } from "../../../../agents/dc-dev/check/verdict/verdict.mjs"
test("gold loop e2e blocks P1", () => assert.equal(parseVerdict("Verdict: APPROVE", [{ severity: "P1" }]).verdict, "REJECT"))
