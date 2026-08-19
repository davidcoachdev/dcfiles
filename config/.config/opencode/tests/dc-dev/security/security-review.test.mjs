import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { test } from "node:test"
test("security review artifact exists", () => assert.equal(existsSync(new URL("../../../context/plans/dc-dev-security-review.md", import.meta.url)), true))
