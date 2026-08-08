/** @jsxImportSource @opentui/solid */
import type { TuiPlugin, TuiThemeCurrent } from "@opencode-ai/plugin/tui"
import { createSignal, createRoot, createEffect, onCleanup, Show } from "solid-js"

const id = "context-mode-stats"

// ─── Plugin ──────────────────────────────────────────────

const tui: TuiPlugin = async (api) => {
  createRoot((disposeRoot) => {
    api.lifecycle.onDispose(disposeRoot)

    // ── State ──────────────────────────────────────────
    const [keptOut, setKeptOut] = createSignal("—")
    const [rate, setRate] = createSignal("—")
    const [connected, setConnected] = createSignal(false)
    // Collapse state: collapsed (default) shows only the total;
    // expanded shows every metric (kept out + rate).
    const [expanded, setExpanded] = createSignal(false)

    // ── Fetch stats from context-mode ─────────────────
    async function refreshStats() {
      try {
        const { execSync } = await import("child_process")

        const output = execSync("context-mode statusline 2>/dev/null", {
          encoding: "utf8",
          timeout: 3000,
        }).trim()

        if (output) {
          // Real format:
          // "context-mode  ●  67.5 KB kept out  ·  67.5 KB/day  ·  preserved across compact, restart & upgrade"
          const keptMatch = output.match(/([\d.]+ ?[KMG]?B)\s+kept out/i)
          const rateMatch = output.match(/([\d.]+ ?[KMG]?B)\/day/i)

          if (keptMatch) setKeptOut(keptMatch[1])
          if (rateMatch) setRate(rateMatch[1])
          setConnected(true)
          return
        }
      } catch {
        // statusline unavailable
      }

      setConnected(false)
    }

    // ── Poll every 15 seconds ─────────────────────────
    const timer = setInterval(refreshStats, 15000)
    refreshStats()
    onCleanup(() => clearInterval(timer))

    // ── Slot: sidebar_content (matches quota plugin style) ─
    const disposeSidebar = api.slots.register({
      id,
      order: 95,
      slots: {
        sidebar_content(ctx) {
          const theme = ctx.theme.current
          const toggle = () => setExpanded((e) => !e)
          return (
            <box gap={0}>
              {/* Clickable header (quota-style): toggles collapse */}
              <box
                flexDirection="row"
                gap={1}
                alignItems="center"
                focusable
                onMouseDown={toggle}
              >
                <text fg={theme.textMuted} wrapMode="none">
                  {expanded() ? "▾" : "▸"}
                </text>
                <text fg={theme.text}>
                  <b>context-mode</b>
                </text>
                <text
                  fg={connected() ? theme.success : theme.textMuted}
                  wrapMode="none"
                >
                  {connected() ? "●" : "○"}
                </text>
              </box>
              <box gap={0}>
                <Show when={!connected()}>
                  <text fg={theme.textMuted} wrapMode="none">
                    {"—"}
                  </text>
                </Show>
                {/* Collapsed: total only */}
                <Show when={connected() && !expanded()}>
                  <text fg={theme.success} wrapMode="none">
                    {keptOut()}
                  </text>
                </Show>
                {/* Expanded: every metric */}
                <Show when={connected() && expanded()}>
                  <box flexDirection="row" gap={1} alignItems="center">
                    <text fg={theme.textMuted} wrapMode="none">
                      {"kept out:"}
                    </text>
                    <text fg={theme.success} wrapMode="none">
                      {keptOut()}
                    </text>
                  </box>
                  <box flexDirection="row" gap={1} alignItems="center">
                    <text fg={theme.textMuted} wrapMode="none">
                      {"rate:"}
                    </text>
                    <text fg={theme.success} wrapMode="none">
                      {rate()}
                    </text>
                  </box>
                </Show>
              </box>
            </box>
          )
        },
      },
    })
    api.lifecycle.onDispose(disposeSidebar)
  })
}

const plugin = { id, tui }
export default plugin
