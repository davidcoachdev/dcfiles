import assert from "node:assert/strict"
import { test } from "node:test"
import { transition } from "./lifecycle.mjs"

test("gold lifecycle accepts only ordered phase transitions", () => {
  assert.equal(transition("retrieve", "sketch").ok, true)
  assert.equal(transition("retrieve", "make").ok, false)
})
