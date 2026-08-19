import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { test } from "node:test"
test("operational verification artifact exists", () => assert.equal(existsSync(new URL("../../../context/plans/dc-dev-operational-verification.md", import.meta.url)), true))
