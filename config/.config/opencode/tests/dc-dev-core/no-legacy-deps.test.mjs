import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const CORE = new URL("../../agents/dc-dev-core/", import.meta.url).pathname
const KIT = new URL("../../context/kits/dc-dev-core/", import.meta.url).pathname

function files(dir, ext) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(ext))
    .map((f) => join(dir, f))
}

test("R3: 0 requires/imports of cavekit-*/gentle-orchestrator/sdd-* in core sources", () => {
  const targets = [...files(CORE, ".mjs"), ...files(KIT, ".md")]
  for (const p of targets) {
    const text = readFileSync(p, "utf8")
    // only real import/require statements count, not documentation mentions
    assert.equal(
      /(import|require)\b.*(cavekit-|gentle-orchestrator|sdd-)/i.test(text),
      false,
      `${p} imports/requires legacy runtime`,
    )
  }
})
