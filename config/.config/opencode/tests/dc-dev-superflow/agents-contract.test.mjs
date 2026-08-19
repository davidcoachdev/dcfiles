import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const root = new URL("../../agents", import.meta.url)
const names = readdirSync(root).filter((name) => name.startsWith("dc-dev-superflow-") && name !== "dc-dev-superflow-core")

test("new Dc-Dev agents have narrow roles and result contracts", () => {
  assert.equal(names.length, 7)
  for (const name of names) {
    const text = readFileSync(join(root.pathname, name, "agent.mjs"), "utf8")
    assert.match(text, /role:/)
    assert.match(text, /Result Contract:/)
    assert.doesNotMatch(text, /kiroExplore|cavekit-|gentle-|sdd-|external-agent/)
  }
})

test("primary Dc-Dev registration exposes only additive owned children", () => {
  const config = JSON.parse(readFileSync(new URL("../../opencode.json", import.meta.url), "utf8"))
  assert.equal(config.agent["dc-dev"].mode, "primary")
  for (const name of ["dc-dev-superflow-coordinator", "dc-dev-superflow-research", "dc-dev-superflow-planner", "dc-dev-superflow-security", "dc-dev-superflow-reviewer", "dc-dev-superflow-evaluator", "dc-dev-superflow-recovery"]) {
    assert.equal(config.agent[name].hidden, true)
    assert.equal(config.agent[name].mode, "subagent")
    assert.match(config.agent[name].prompt, /dc-dev-superflow-/)
  }
})
