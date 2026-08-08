---
name: lightpanda-browser
description: >
  Lightpanda: the headless browser built from scratch for AI agents and automation.
  Written in Zig with V8, MCP-integrated browser automation.
  Trigger: When AI agents need high-performance browser automation, web scraping,
  CDP server access, or MCP browser tools for navigating websites and extracting data.
license: AGPL-3.0
metadata:
  author: lightpanda-io
  version: "1.0"
---

## What is Lightpanda?

A headless browser built from scratch for AI agents and automation:
- **Not a Chromium fork** — written from scratch in Zig with V8 engine
- **~16x less memory** than headless Chrome (123MB vs 2GB for 100 pages)
- **~9x faster** than headless Chrome (5s vs 46s for 100 pages)
- MCP server integrated (stdio and HTTP transport)
- CDP-compatible with Puppeteer/Playwright
- Agent mode with native AI integration
- Zero graphical rendering engine (text-only, memory efficient)

## MCP Workflow (PREFERRED for Agents)

Lightpanda ships with MCP tools that agents should use directly.

### MCP Tools Available

| Tool | Parameters | Description |
|------|------------|-------------|
| `goto` | `url`, `wait?`, `timeout?` | Navigate to a URL |
| `title` | - | Get the page title |
| `tree` | `selector?`, `backendNodeId?`, `maxDepth?`, `maxBytes?` | Semantic DOM tree overview |
| `markdown` | `selector?`, `backendNodeId?`, `maxBytes?`, `url?` | Extract readable markdown from page/subtree |
| `html` | `selector?`, `backendNodeId?`, `url?` | Get raw HTML of page/subtree |
| `findElement` | `role`, `name` | Locate element by role/name |
| `nodeDetails` | `backendNodeId` | Get CSS selector and attributes for a node |
| `interactiveElements` | - | List clickable/typeable elements |
| `click` | `selector`, `backendNodeId?` | Click an element |
| `fill` | `selector`, `value` | Fill input field |
| `type` | `selector`, `text` | Type text into input |
| `selectOption` | `selector`, `value` | Select dropdown option |
| `setChecked` | `selector`, `checked` | Check/uncheck checkbox |
| `evaluate` | `expression`, `await?` | Run JavaScript |
| `waitForSelector` | `selector`, `timeout?` | Wait for element |
| `waitForState` | `state`, `timeout?` | Wait for network idle/load |
| `extract` | `schema`, `selector?` | Extract structured data via schema |
| `getUrl` | - | Get current URL |
| `back` | - | Navigate back |
| `forward` | - | Navigate forward |
| `reload` | `ignoreCache?` | Reload page |
| `close` | - | Close the browser |
| `getEnv` | `name?` | List available environment vars (LP_*) |
| `search` | `query`, `maxResults?` | Web search (uses connected LLM) |
| `session_new` | - | Create a new browsing session |
| `session_list` | - | List sessions (HTTP mode) |
| `session_close` | `id` | Close a session (HTTP mode) |

### MCP Server Configuration

**stdio** (default) - for OpenCode subprocess:
```json
{
  "mcpServers": {
    "lightpanda": {
      "command": "lightpanda",
      "args": ["mcp"]
    }
  }
}
```

**HTTP** - for network connection (supports multiple isolated sessions):
```bash
lightpanda mcp --port 9223
```

Or with explicit bind address:
```bash
lightpanda mcp --port 9223 --host 0.0.0.0
```

### MCP Exploration Pattern

Before scraping, follow this sequence:

1. **Navigate** with `goto <url>` or combine with read: `markdown <url>` / `html <url>` / `tree <url>`
2. **Snapshot structure** with `tree` for a semantic overview
3. **Interact** with forms/elements using `click`, `fill`, `type`
4. **Extract data** with `extract <schema>` or `markdown` / `html`
5. **Verify** with `title`, `getUrl`

> Avoid standalone `goto` — prefer `markdown <url>` or `html <url>` to navigate and read in one call.

## CLI Workflow

### Fetch a page (CLI mode)
```bash
lightpanda fetch https://example.com                           # prints markdown
lightpanda fetch --obey-robots --dump html https://example.com  # dump HTML
lightpanda fetch --dump markdown https://example.com           # dump markdown
lightpanda fetch --dump links https://example.com              # dump links
lightpanda fetch --dump assets https://example.com             # dump assets
lightpanda fetch --obey-robots --dump markdown --log-level info https://example.com
```

### Waiting options
```bash
lightpanda fetch --wait-selector "#content" https://example.com
lightpanda fetch --wait-ms 2000 https://example.com
lightpanda fetch --wait-until networkidle0 https://example.com
```

### Start a CDP server (for Puppeteer/Playwright)
```bash
lightpanda serve --host 127.0.0.1 --port 9222
lightpanda serve --obey-robots --log-level info --port 9222
```

### Agent mode
```bash
lightpanda agent                                     # auto-detects API key from env
lightpanda agent --task "top story on news.ycombinator.com?"
lightpanda agent --no-llm                            # basic REPL, no LLM
lightpanda agent session.js                          # run a recorded script
lightpanda agent --provider gemini --task "..."      # force a specific provider
```

## Puppeteer / Playwright Integration

Connect to Lightpanda's CDP server as a drop-in replacement:

### Puppeteer
```javascript
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({
  browserWSEndpoint: "ws://127.0.0.1:9222",
});

const context = await browser.createBrowserContext();
const frame = await context.newPage();

await frame.goto('https://example.com', {waitUntil: "networkidle0"});
console.log(await frame.title());

await frame.close();
await context.close();
await browser.disconnect();
```

### Playwright
```javascript
import { chromium } from 'playwright-core';

const browser = await chromium.connectOverCDP({
  wsEndpoint: "ws://127.0.0.1:9222",
});

const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://example.com');
console.log(await page.title());

await browser.close();
```

## Agent Mode

`lightpanda agent` provides an interactive AI agent that controls the browser natively:

- Describe tasks in plain English or slash commands
- Navigate, click, fill forms, extract structured data
- Output is a PandaScript (vanilla JS with native browser primitives)
- Supports Anthropic, OpenAI, Gemini, Google Vertex AI, Hugging Face, Ollama
- Can run without LLM using `--no-llm` (REPL mode)

### Providers
```bash
lightpanda agent --provider openai --task "..."
lightpanda agent --provider anthropic --task "..."
lightpanda agent --provider gemini --task "..."
lightpanda agent --provider vertex --task "..."
lightpanda agent --provider ollama --task "..."
lightpanda agent --provider huggingface --task "..."
```

### Environment Variables
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`
- `VERTEX_API_KEY` + `GOOGLE_CLOUD_PROJECT`
- `HF_TOKEN`
- `OLLAMA_HOST`

## Telemetry and Privacy

By default, Lightpanda collects usage telemetry. Disable with:
```bash
export LIGHTPANDA_DISABLE_TELEMETRY=true
```

Privacy policy: https://lightpanda.io/privacy-policy

## Installation

### Homebrew (macOS / Linux)
```bash
brew install lightpanda-io/browser/lightpanda
```

### Arch AUR
```bash
yay -S lightpanda-nightly-bin
```

### Download binary
```bash
# Linux x86_64
curl -L -o lightpanda https://github.com/lightpanda-io/browser/releases/download/nightly/lightpanda-x86_64-linux
chmod a+x ./lightpanda

# macOS aarch64
curl -L -o lightpanda https://github.com/lightpanda-io/browser/releases/download/nightly/lightpanda-aarch64-macos
chmod a+x ./lightpanda
```

### Docker
```bash
docker run -d --name lightpanda -p 127.0.0.1:9222:9222 lightpanda/browser:nightly
```

### Build from source
```bash
git clone https://github.com/lightpanda-io/browser.git
cd browser
make build
```

## When to Use Lightpanda vs Obscura vs Playwright

| Scenario | Recommendation |
|----------|----------------|
| AI agent MCP automation | **Lightpanda** or **Obscura** (native MCP tools) |
| High-performance scraping | **Lightpanda** (~9x faster, 16x less memory) |
| Scraping with bot detection | **Obscura** (stealth mode) |
| Complex E2E testing | **Playwright** (better debugging) |
| Test suites with tracing | **Playwright** (built-in) |
| Agent mode (AI-driven) | **Lightpanda** (native agent, PandaScript) |
| Teams without Zig/Rust | **Playwright** or **Obscura** (Node.js easier) |

## Supported Web APIs

Lightpanda implements:
- DOM tree, DOM APIs, DOM dump
- JavaScript support (V8)
- Ajax: XHR API, Fetch API
- HTML parser (html5ever)
- HTTP loader (Libcurl)
- CDP/WebSocket server
- Click, input form, cookies, custom headers, proxy, network interception
- CORS support
- `robots.txt` respect with `--obey-robots`

## Core Dumps

Suppress crash core dumps:
```bash
export LIGHTPANDA_DISABLE_CORE_DUMP=true
```

## Resources

- **Docs**: https://lightpanda.io/docs
- **GitHub**: https://github.com/lightpanda-io/browser
- **Nightly builds**: https://github.com/lightpanda-io/browser/releases/tag/nightly
- **Docker**: https://hub.docker.com/r/lightpanda/browser
- **Discord**: https://discord.gg/K63XeymfB5