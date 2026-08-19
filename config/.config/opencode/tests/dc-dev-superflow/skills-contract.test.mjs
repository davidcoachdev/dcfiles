import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const root = new URL("../../skills", import.meta.url)
const names = readdirSync(root).filter((name) => name.startsWith("dc-dev-superflow-"))

test("new Dc-Dev skills have frontmatter, triggers, workflow, failure behavior, and result contract", () => {
  assert.equal(names.length, 16)
  for (const name of names) {
    const text = readFileSync(join(root.pathname, name, "SKILL.md"), "utf8")
    assert.match(text, /^---\nname: dc-dev-superflow-/)
    assert.match(text, /description:/)
    assert.match(text, /Trigger:/)
    assert.match(text, /Workflow:/)
    assert.match(text, /Failure behavior:/)
    assert.match(text, /Result Contract:/)
  }
})
