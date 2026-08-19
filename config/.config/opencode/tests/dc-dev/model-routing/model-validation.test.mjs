import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { test } from "node:test"
test("model validation artifact exists", () => assert.equal(existsSync(new URL("../../../context/plans/dc-dev-model-validation.md", import.meta.url)), true))
