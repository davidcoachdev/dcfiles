import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { test } from "node:test"
test("runtime validation artifact exists", () => assert.equal(existsSync(new URL("../../../context/plans/dc-dev-runtime-validation.md", import.meta.url)), true))
