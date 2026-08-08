---
name: headroom-integration
description: Install and configure headroom context compression for OpenCode workflows using native tools and hooks (no proxy). Trigger: when setting up headroom, integrating headroom with OpenCode, compressing LLM context, or reducing token usage in OpenCode sessions.
---

# Headroom Integration for OpenCode (Native Tools & Hooks)

## What is Headroom

Headroom is a context compression layer that compresses tool outputs, logs, files, RAG chunks, and conversation history before they reach the LLM — 60-95% fewer tokens for JSON, 20% fewer for coding agents, same answers.

This integration uses **native OpenCode tools and hooks** instead of a persistent proxy. Headroom runs on-demand via shell scripts, no background process needed.

## Prerequisites

- Python 3.10+ (you have 3.13.5 — compatible)
- `uv` available
- OpenCode installed at `~/.config/opencode/opencode.json`

## Installation

### Step 1 — Install headroom

```bash
uv tool install "headroom-ai[all]"
```

Verify:

```bash
/home/dcdebian/.local/share/uv/tools/headroom-ai/bin/python -c "from headroom import compress; print('OK')"
```

### Step 2 — Tools are already installed

The following tools are at `~/.local/bin/headroom-tools/`:

| Tool | Purpose |
|---|---|
| `headroom-compress` | Compress conversation messages via stdin or file |
| `headroom-retrieve` | Retrieve previously compressed context by key |

Usage:

```bash
# Compress messages from stdin
echo '[{"role": "user", "content": "Hello"}]' | headroom-compress kimi-k3-free

# Compress from a file
headroom-compress kimi-k3-free /path/to/messages.json

# Retrieve by key
headroom-retrieve <compression_key>
```

Compressed messages are saved to `~/.local/share/headroom/compress/<key>.json`.

### Step 3 — Hooks are already installed

OpenCode hooks at `~/.config/opencode/hooks/`:

| Hook | Purpose |
|---|---|
| `on-session-start/02-headroom.sh` | Initializes headroom storage directory |
| `on-before-llm-call/01-headroom-compress.sh` | Compresses conversation context before LLM calls |
| `on-session-end/01-headroom-cleanup.sh` | Cleans up temporary files |

### Step 4 — Commands are in opencode.json

Two commands are registered in `opencode.json`:

- `headroom-compress` — compress conversation context
- `headroom-retrieve` — retrieve previously compressed context by key

## How It Works (No Proxy)

Unlike the proxy-based approach, this integration:

1. **No persistent proxy** — headroom runs on-demand via shell scripts
2. **No provider injection** — you keep using your TokenRouter provider directly
3. **Hooks auto-compress** — the `on-before-llm-call` hook compresses context before each LLM call
4. **File-based retrieval** — compressed messages are saved to disk and can be retrieved by key

## Key Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `HEADROOM_STORAGE_DIR` | Directory for compressed context files | `~/.local/share/headroom/compress` |
| `HEADROOM_MODEL` | Model for compression | `kimi-k3-free` |

## Failure Learning

Mine your past OpenCode sessions for failures and auto-write corrections to `AGENTS.md`:

```bash
headroom learn --agent opencode --apply
```

Dry run first:

```bash
headroom learn --agent opencode
```

## Troubleshooting

**`headroom-compress` command not found**
The scripts are at `~/.local/bin/headroom-tools/`. Make sure `~/.local/bin` is in your PATH, or use the full path.

**Hook not running**
OpenCode auto-discovers hooks from `~/.config/opencode/hooks/`. Verify the hook files are executable (`chmod +x`).

**Compression not reducing tokens**
Small messages may not compress well. Headroom is most effective with large conversation histories and tool outputs.

## Resources

- Repo: https://github.com/headroomlabs-ai/headroom
- Docs: https://headroom-docs.vercel.app/docs/opencode
