import assert from "node:assert/strict"
import { test } from "node:test"
import { routeRequest } from "../../../../agents/dc-dev/entry/entry.mjs"
test("front door e2e preserves approval boundary", () => assert.equal(routeRequest("build", { approved: false }).route, "approval-required"))
