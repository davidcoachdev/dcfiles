---
name: obscura-browser
description: >
  Obscura headless browser for AI agents and web scraping.
  MCP-integrated browser automation with stealth mode and anti-detection.
  Trigger: When AI agents need browser automation, web scraping, or MCP browser tools.
license: Apache-2.0
metadata:
  author: h4ckf0r0day
  version: "1.0"
---

## What is Obscura?

An open-source headless browser engine built in Rust for AI agents and web scraping:
- **30 MB memory** vs 200+ MB of headless Chrome
- **70 MB binary** vs 300+ MB
- **85 ms startup** vs 2s
- MCP server integrated (stdio and HTTP transport)
- CDP-compatible with Puppeteer/Playwright
- Built-in stealth mode for anti-detection

## MCP Workflow (PREFERRED for Agents)

Obscura ships with MCP tools that agents should use directly:

### MCP Tools Available

| Tool | Parameters | Description |
|------|------------|-------------|
| `browser_navigate` | `url`, `waitUntil?` | Navigate to a URL |
| `browser_snapshot` | - | Return page URL, title, and body text |
| `browser_click` | `selector` | Click element by CSS selector |
| `browser_fill` | `selector`, `value` | Set input value (triggers input + change events) |
| `browser_type` | `selector`, `text` | Append text to input |
| `browser_press_key` | `key`, `selector?` | Dispatch keyboard event |
| `browser_select_option` | `selector`, `value/text` | Select option by value or text |
| `browser_evaluate` | `expression` | Evaluate JS and return result |
| `browser_wait_for` | `selector`, `timeout?` | Wait for CSS selector |
| `browser_network_requests` | - | List network requests |
| `browser_console_messages` | - | Return console messages |
| `browser_close` | - | Close page and reset state |

### MCP Server Configuration

**stdio** (default) - for OpenCode subprocess:
```json
{
  "mcpServers": {
    "obscura": {
      "command": "obscura",
      "args": ["mcp"]
    }
  }
}
```

**HTTP** - for network connection:
```bash
obscura mcp --http --port 8080
```

### MCP Exploration Pattern

**Before creating scraping scripts, agents should:**

1. **Navigate** to target page with `browser_navigate`
2. **Snapshot** to see structure with `browser_snapshot`
3. **Interact** with forms/elements using `browser_click`, `browser_fill`
4. **Evaluate** JS with `browser_evaluate` for data extraction
5. **Wait** for dynamic content with `browser_wait_for`
6. **Verify** network requests if needed

## CLI Workflow

### Fetch a page
```bash
obscura fetch https://example.com --eval "document.title"
obscura fetch https://example.com --dump html
obscura fetch https://example.com --dump text --output page.txt
obscura fetch https://example.com --dump markdown
obscura fetch https://example.com --dump links
obscura fetch https://example.com --dump assets
obscura fetch https://example.com --stealth
```

### Scrape in parallel
```bash
obscura scrape url1 url2 url3 \
  --concurrency 25 \
  --eval "document.querySelector('h1').textContent" \
  --format json
```

### Start CDP server
```bash
obscura serve --port 9222 --stealth
```

## Puppeteer / Playwright Integration

Can connect to Obscura's CDP server as drop-in replacement:

### Puppeteer
```javascript
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
});
```

### Playwright
```javascript
import { chromium } from 'playwright-core';

const browser = await chromium.connectOverCDP({
  endpointURL: 'ws://127.0.0.1:9222',
});
```

## Stealth Mode

Enable with `--stealth` flag or `--features stealth` at build time.

### Features
- Per-session fingerprint randomization (GPU, screen, canvas, audio)
- Realistic `navigator.userAgentData` (Chrome 145)
- `navigator.webdriver = undefined`
- Tracker blocking (3,520 domains blocked)
- Native function masking

### Use Cases
- Scraping sites with bot detection (Cloudflare, Akamai, etc.)
- AI agents that need to appear as real browsers
- Automation at scale where Chrome is too heavy

## Installation

### Download binary
```bash
curl -LO https://github.com/h4ckf0r0day/obscura/releases/latest/download/obscura-x86_64-linux.tar.gz
tar xzf obscura-x86_64-linux.tar.gz
sudo mv obscura /usr/local/bin/
```

### Docker
```bash
docker run -d --name obscura -p 127.0.0.1:9222:9222 h4ckf0r0day/obscura
```

### Build from source
```bash
git clone https://github.com/h4ckf0r0day/obscura.git
cd obscura
cargo build --release --features stealth
```

## When to Use Obscura vs Playwright

| Scenario | Recommendation |
|----------|----------------|
| AI agent MCP automation | **Obscura** (native MCP tools) |
| Scraping with bot detection | **Obscura** (stealth mode) |
| High-performance scraping | **Obscura** (lower memory) |
| Complex E2E testing | **Playwright** (better debugging) |
| Test suites with tracing | **Playwright** (built-in) |
| Teams without Rust | **Playwright** (Node.js easier) |

## CDP API Coverage

Obscura implements:
- **Target**: createTarget, closeTarget, attachToTarget
- **Page**: navigate, getFrameTree, lifecycleEvents
- **Runtime**: evaluate, callFunctionOn
- **DOM**: getDocument, querySelector, querySelectorAll
- **Network**: enable, setCookies, getCookies
- **Fetch**: enable, continueRequest, fulfillRequest
- **Storage**: getCookies, setCookies, deleteCookies
- **Input**: dispatchMouseEvent, dispatchKeyEvent
- **LP**: getMarkdown (DOM-to-Markdown)

## Resources

- **Docs**: https://obscura.sh
- **GitHub**: https://github.com/h4ckf0r0day/obscura
- **Releases**: https://github.com/h4ckf0r0day/obscura/releases
- **Docker**: https://hub.docker.com/r/h4ckf0r0day/obscura