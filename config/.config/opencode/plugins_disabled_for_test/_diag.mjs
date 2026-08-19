import { appendFileSync } from "node:fs"

const LOG = "/tmp/plugin-diag.log"
function log(m) { try { appendFileSync(LOG, `${new Date().toISOString()} ${m}\n`, "utf8") } catch (e) {} }

export default async function diag({ client, directory }) {
  log("factory start")
  try {
    const toolMod = await import("@opencode-ai/plugin")
    const tool = toolMod.tool
    log("tool=" + typeof tool + "; tool.schema=" + typeof tool?.schema)
    return {
      tool: {
        dc_dev_superflow_dispatch: {
          description: "diag args-empty with SDK import",
          args: {},
          execute: async (a, c) => ({ output: "diag ok" }),
        },
      },
    }
  } catch (e) {
    log("ERROR: " + e.message + "\n" + (e.stack || ""))
    throw e
  }
}