import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const KIT_DIR = new URL("../../context/kits/dc-dev-core/", import.meta.url).pathname

function kitFiles() {
  return readdirSync(KIT_DIR).filter((f) => f.endsWith(".md"))
}
function readKits() {
  return kitFiles().map((f) => ({ f, text: readFileSync(join(KIT_DIR, f), "utf8") }))
}

test("R1/T-002: 0 ACTIVE superflow wiring in core kits (archive mentions exempt)", () => {
  for (const { f, text } of readKits()) {
    // active wiring = an actual import/registration statement, not the Out-of-Scope archive marker
    assert.equal(/import\b.*superflow/i.test(text), false, `${f} imports superflow`)
    assert.equal(/register\w*\(\s*["']dc-dev-superflow/i.test(text), false, `${f} registers superflow`)
  }
})

test("R1: core kit index lists exactly the 3 core kits + index file", () => {
  const idx = JSON.parse(readFileSync(join(KIT_DIR, "kit-index.json"), "utf8"))
  assert.equal(idx.kits.length, 3)
  const files = idx.kits.map((k) => k.file)
  assert.ok(files.includes("context/kits/dc-dev-core/overview.md"))
  assert.ok(files.includes("context/kits/dc-dev-core/dispatch.md"))
  assert.ok(files.includes("context/kits/dc-dev-core/receipt.md"))
})

test("T-000: superflow namespace is referenced only as archive-only in kits", () => {
  for (const { f, text } of readKits()) {
    if (/superflow/i.test(text)) {
      // when mentioned, it must be in an archive-only / out-of-scope context
      assert.ok(/archive-only|out of scope|never (reactivated|edit|rename|wire)/i.test(text), `${f} mentions superflow outside archive context`)
    }
  }
})
