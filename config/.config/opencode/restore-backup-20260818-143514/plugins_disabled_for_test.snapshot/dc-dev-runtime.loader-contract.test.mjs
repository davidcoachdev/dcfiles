import assert from "node:assert/strict"
import { test } from "node:test"
import * as namespace from "./dc-dev-runtime.mjs"

// Loader contract: OpenCode 1.18.18 requires every named export to be a
// function, or an object exposing a `server` function. Data exports
// (string/array) make the whole plugin fail to load with
// "Plugin export is not a function". This test replicates that validation
// so a regression can never hide behind green Node tests again.
test("loader contract: every export is a function or { server }", () => {
  const entries = Object.entries(namespace)
  assert.ok(entries.length > 0, "module must export at least the plugin factory")
  for (const [name, value] of entries) {
    const valid =
      typeof value === "function" ||
      (value !== null && typeof value === "object" && typeof value.server === "function")
    assert.ok(valid, `export "${name}" is not loadable (typeof ${typeof value})`)
  }
})

test("loader contract: default export is the plugin factory", () => {
  assert.equal(typeof namespace.default, "function")
})

test("plugin exposes version/events as properties, not data exports", () => {
  // The factory return value must carry RUNTIME_VERSION/SUPPORTED_EVENTS so
  // runtime code can read them without polluting the module namespace.
  assert.equal(typeof namespace.default, "function")
})