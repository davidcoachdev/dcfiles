---
name: boneyard-skeleton-screens
description: "Use when building loading states, skeleton screens, or perceived-performance placeholders in Next.js/React (or Vue/Svelte) apps to avoid layout shift."
license: Apache-2.0
metadata:
  author: dcdebian
  version: "1.0"
---

# Boneyard Skeleton Screens

## Overview
`boneyard-js` auto-generates pixel-perfect skeleton screens by snapshotting your real rendered UI with a headless browser. Wrap a component in `<Skeleton>`, run the CLI, and it emits `.bones.json` placeholders that match the real layout — killing hand-measured skeletons and layout shift (CLS).

## When to Use
- Async loading UIs (data fetch, Suspense, `useSuspenseQuery`) in Next.js + React.
- You currently hand-roll skeleton placeholders or suffer CLS.
- Vue / Svelte 5 projects when the same need arises.

When NOT to use:
- Qwik or vanilla HTML/JS — no framework wrapper exists.
- A critical/production-only path today — package is v1.9.0, ~6 days old. Validate in a non-critical project first.

## Supported vs Not
| Framework | Use Boneyard? |
| React / Next | ✅ primary |
| Vue, Svelte 5, Preact, Angular, React Native | ✅ |
| Astro | ⚠️ via React/Vue/Svelte island only |
| Qwik | ❌ |
| Vanilla JS/HTML | ❌ |

## Execution (Next.js + React)
- Use the **CLI**, not the Vite plugin — Next is not Vite-based: `npx boneyard-js build http://localhost:3000` (auto-detects dev server).
- `<Skeleton>` must be a client component (`'use client'`) in App Router.
- For Suspense data, use `<BoneSuspense>`; no `placeholderData` needed.
- Import the generated registry once at app entry: `import './bones/registry'`.
- Exact flags, breakpoints, dark-mode and `fixture` options: run `npx boneyard-js --help` and read https://boneyard.vercel.app. Do NOT pin exact flags here — the API is young and churns.

## Hard Rules
- CI cost: requires Chromium (Playwright). Reuse an existing browser with `--cdp 9222` to skip the download behind auth.
- Pages needing auth or dynamic data need a `fixture` for capture.
- Treat as UX polish, not core infra.

## Common Mistakes
- Using the Vite plugin in a Next project (won't apply) → use the CLI.
- Forgetting `'use client'` in App Router → bones never resolve.
- Trusting download-count hype (~45k/wk at 6 days) as a maturity signal → spike first.

## References
- Docs: https://boneyard.vercel.app
- npm: https://www.npmjs.com/package/boneyard-js
- Repo: https://github.com/0xGF/boneyard
