import assert from "node:assert/strict"
import { test } from "node:test"
import { validateLoaderExports } from "../../agents/dc-dev-superflow-core/loader.mjs"
import { validateScopeManifest } from "../../agents/dc-dev-superflow-core/scope.mjs"
import { validateSuperflowSchema } from "../../agents/dc-dev-superflow-core/schema.mjs"

test("loader accepts function and server forms and rejects data exports", () => {
  assert.equal(validateLoaderExports({ default: () => ({}) }).status, "valid")
  assert.equal(validateLoaderExports({ default: { server: () => ({}) } }).status, "valid")
  assert.equal(validateLoaderExports({ default: () => ({}), version: "1" }).status, "blocked")
})

test("scope manifest remains additive and protects legacy families", () => {
  const result = validateScopeManifest({ approved: ["agents/dc-dev-superflow-x/agent.mjs"], changed: ["tests/dc-dev-superflow/w0-contracts.test.mjs"] })
  assert.equal(result.status, "clean")
  assert.equal(validateScopeManifest({ approved: ["agents/dc-dev/entry/entry.mjs"], changed: [] }).status, "blocked")
})

test("superflow schema requires lineage, provenance, verification, and recovery", () => {
  const schema = validateSuperflowSchema()
  for (const key of ["receipt", "lineage", "provenance", "verification", "recovery"]) assert.ok(schema.required.includes(key))
})
