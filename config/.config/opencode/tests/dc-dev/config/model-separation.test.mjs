import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { test } from "node:test"

const config = JSON.parse(
  readFileSync(new URL("../../../opencode.json", import.meta.url), "utf8"),
)

test("Make and Check use distinct runtime-available models", () => {
  const makeModel = config.agent?.["cavekit-make"]?.model
  const checkModel = config.agent?.["cavekit-check"]?.model

  assert.ok(makeModel, "cavekit-make must declare a model")
  assert.ok(checkModel, "cavekit-check must declare a model")
  assert.notEqual(makeModel, checkModel, "Make and Check must not share a model")

  for (const model of [makeModel, checkModel]) {
    const [provider] = model.split("/")
    const available = execFileSync("opencode", ["models", provider], {
      encoding: "utf8",
    })
    assert.match(
      available,
      new RegExp(`^${model.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"),
      `${model} must be available in the configured runtime`,
    )
  }
})
