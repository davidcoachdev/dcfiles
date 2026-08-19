import { execFileSync, spawn } from "node:child_process"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("../../../", import.meta.url))
const pluginTypes = fileURLToPath(
  new URL("../../../node_modules/@opencode-ai/plugin/dist/index.d.ts", import.meta.url),
)

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function serverSmoke() {
  const port = 41991 + (process.pid % 1000)
  const child = spawn(
    "opencode",
    ["serve", "--pure", "--port", String(port), "--hostname", "127.0.0.1"],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  )
  let output = ""
  child.stdout.on("data", (chunk) => {
    output += chunk.toString()
  })
  child.stderr.on("data", (chunk) => {
    output += chunk.toString()
  })

  try {
    for (let attempt = 0; attempt < 300; attempt += 1) {
      if (output.includes(`server listening on http://127.0.0.1:${port}`)) return true
      await sleep(50)
    }
    return false
  } finally {
    child.kill("SIGTERM")
  }
}

export async function runProbe() {
  const version = execFileSync("opencode", ["--version"], { cwd: root, encoding: "utf8" }).trim()
  const declarations = readFileSync(pluginTypes, "utf8")
  const supported = [
    ...declarations.matchAll(/^    "([^"]+)"\?: \(/gm),
  ].map((match) => match[1])

  return {
    runtime: {
      version,
      server_smoke: await serverSmoke(),
    },
    hooks: {
      supported,
      unsupported_desired: ["command.executed", "permission.*"],
    },
    enforcement_fallback: "check-phase",
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(await runProbe(), null, 2))
}
