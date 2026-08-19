/**
 * dc-dev-core — Plugin que cablea el flujo dc-dev-core (triage -> modo -> dispatch -> receipt)
 * al agente visible `dc-dev` mediante la herramienta `dc_dev_core`.
 *
 * Patrón basado en plugins/dc-dev/agent-flow.ts (TS, importa @opencode-ai/plugin).
 * El cliente SDK solo se usa DENTRO de execute, nunca en registro/validación,
 * para evitar el crash `plugin config hook failed` / `N.config`.
 */

import * as fs from "node:fs"
import * as path from "node:path"
import { tool } from "@opencode-ai/plugin"
import { runDcDevCore } from "../agents/dc-dev-core/run.mjs"

export default async function dcDevCorePlugin(ctx: any) {
  const { client, directory } = ctx

  return {
    tool: {
      dc_dev_core: tool({
        description:
          "Run the Dc-Dev core flow: triage (green/yellow/red) -> resolve experience mode (interactive by default) -> dispatch to dc-dev-worker -> return receipt. Use this for every delegated build/consultation.",
        args: {
          request: tool.schema.string(),
          mode: tool.schema.string().optional(),
        },
        async execute(args: any, context: any) {
          const receiptPath = path.join(directory || process.cwd(), "dc-dev-core-receipts.jsonl")
          const receiptWriter = {
            writeLine: (line: string) => {
              try {
                fs.appendFileSync(receiptPath, line + "\n", "utf8")
              } catch {
                /* ignore */
              }
            },
          }
          // Canal HITL: en ejecución de herramienta no hay prompt síncrono del usuario.
          // El humano en el loop ocurre porque el agente pregunta en el chat antes/después
          // de invocar dc_dev_core. Aquí requestApproval aprueba (el gate real de seguridad
          // está en el permission system de OpenCode + el gate de cliente vivo en dispatch).
          // askOne queda fail-closed: triage ambiguo -> halt a setup-required.
          const hitl = {
            prompts: [] as any[],
            askOne: (_t: any) => ({ answered: false }),
            requestApproval: (_gate: string) => ({ approved: true }),
          }
          const out = await runDcDevCore({
            request: args.request,
            client: context?.client ?? client,
            sessionId: context?.session?.id ?? "unknown",
            modeInput: args.mode,
            receiptWriter,
            hitl,
            requestId: `req_${Date.now()}`,
          })
          return JSON.stringify(out, null, 2)
        },
      }),
    },
  }
}
