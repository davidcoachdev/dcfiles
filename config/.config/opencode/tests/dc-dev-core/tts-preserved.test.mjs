import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const ROOT = new URL("../../", import.meta.url).pathname
const TTS = join(ROOT, "plugins/agent-flow-tts.ts")
const CORE = new URL("../../agents/dc-dev-core/", import.meta.url).pathname

test("R2: agent-flow-tts.ts exists and is non-empty (preserved, not deleted)", () => {
  assert.ok(existsSync(TTS))
  assert.ok(readFileSync(TTS, "utf8").length > 0)
})

test("R2: core modules do NOT import agent-flow-tts (TTS never a gate)", () => {
  const mods = ["contract", "experience-mode", "triage", "receipt", "dispatch", "run"].map(
    (m) => join(CORE, m + ".mjs"),
  )
  for (const p of mods) {
    const text = readFileSync(p, "utf8")
    assert.equal(/agent-flow-tts/.test(text), false, `${p} references TTS`)
  }
})
