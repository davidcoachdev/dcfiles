#!/usr/bin/env bun
/**
 * tts_ensure — On-demand TTS health check + auto-start.
 *
 * LLM-callable tool. Usage:
 *   - "Chequeá que el TTS esté activo"
 *   - "Si el TTS está caído, arrancalo"
 *
 * Checks the HTTP bridge (:9877). If down, starts the full stack
 * (Windows PowerShell service + HTTP bridge) and waits up to 10s
 * for it to come back.
 */

import { tool } from "@opencode-ai/plugin"
import * as path from "node:path"
import * as os from "node:os"

const TTS_DIR = path.join(os.homedir(), "Proyects", "tts-control")
const START_SCRIPT = path.join(TTS_DIR, "scripts", "start-all.sh")
const BRIDGE_HEALTH = "http://127.0.0.1:9877/health"
const MAX_WAIT_SECS = 10

async function isTtsUp(): Promise<boolean> {
  try {
    const res = await fetch(BRIDGE_HEALTH, { signal: AbortSignal.timeout(2000) })
    return res.ok
  } catch {
    return false
  }
}

async function startTts(): Promise<string> {
  try {
    // start-all.sh detaches the bridge (setsid) and Windows service
    // (Start-Process hidden). We run it synchronously so we can wait
    // for the health endpoint to come back.
    const proc = Bun.spawn(["bash", START_SCRIPT], {
      stdin: "ignore",
      stdout: "ignore",
      stderr: "ignore",
    })
    const exited = await proc.exited
    if (exited !== 0) {
      return `error al arrancar (exit code ${exited})`
    }
    return "arrancado"
  } catch (e: any) {
    return `error al arrancar: ${e?.message ?? e}`
  }
}

export default tool({
  description:
    "Verifica que el TTS esté activo (bridge HTTP :9877). Si está caído, lo arranca y espera a que responda. Útil antes de pedir al agente que lea texto con voz.",
  args: {},
  async execute() {
    const up = await isTtsUp()

    if (up) {
      return "✅ TTS activo — bridge HTTP en 127.0.0.1:9877 responde OK."
    }

    // Not running — start it
    const result = await startTts()

    if (result !== "arrancado") {
      return `❌ TTS no pudo arrancar: ${result}`
    }

    // Wait for health endpoint to come back (poll every 1s, max 10s)
    let waited = 0
    while (waited < MAX_WAIT_SECS) {
      await Bun.sleep(1000)
      waited++
      if (await isTtsUp()) {
        return `✅ TTS arrancado y activo (bridge en 127.0.0.1:9877). [esperó ${waited}s]`
      }
    }

    return `⚠️ TTS está arrancando pero el bridge no respondió en ${MAX_WAIT_SECS}s. Revisá service-manager.log.`
  },
})
