import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const CORE = new URL("../../agents/dc-dev-core/", import.meta.url).pathname

test("R13: 0 inflation modules referenced in core dispatch module", () => {
  const mods = ["contract", "experience-mode", "triage", "receipt", "dispatch", "run"].map(
    (m) => join(CORE, m + ".mjs"),
  )
  for (const p of mods) {
    const text = readFileSync(p, "utf8")
    assert.equal(
      /(capability-gate|recovery|provenance|token-efficien)/i.test(text),
      false,
      `${p} references an inflation module`,
    )
  }
})
