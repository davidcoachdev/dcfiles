---
name: dioxus
description: "Trigger: dioxus, Dioxus 0.7, RSX, use_signal, use_resource, Router, dx, WASM, TUI. Build cross-platform Rust apps (web/desktop/mobile/fullstack) with Dioxus 0.7."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Dioxus 0.7 — Fullstack Rust (RSX + Signals + Router)

## Activation Contract
Activate when user mentions Dioxus, RSX, `dx`, `dioxus` 0.7 bench, `use_signal`/`use_resource`/`use_coroutine`, `Router`/`Route`, `Dioxus.toml`, `rsx!`, WASM/web/desktop/mobile/fullstack, or `landing/` crate.

## Hard Rules
- `dx` must be `=0.7.9` when `dioxus = "=0.7.9"` (mismatch → `incompatible!`). Use `cargo install dioxus-cli --version 0.7.9`.
- RSX is `rsx! { div { "hi" } }` — attributes use `class: "foo"` (colon) and event `onclick: move |_| {}`. Never JSX `className`/`onClick`.
- State via `use_signal(|| 0)` + `*signal.write() +=1` + `signal()` read. For async use `use_resource(|| async { fetch().await })` (not `use_effect` for data). `use_coroutine` for channels.
- Router `dioxus-router 0.7`: `#[derive(Routable)] enum Route { #[route("/")] Home {}, #[route("/:id")] Job { id: String } }` + `<Router<Route> />`, `use_navigator().push(Route::Job {id})`. Do not use `yew-router`/`react-router` patterns.
- Tailwind v4 via `Dioxus.toml` `[tailwind] input/output` + `tailwind.css` `@import "tailwindcss"; @source "./src";` (landing uses `dx` integration). Do not add `postcss` manually.
- Theming via `data-theme`/`data-mode` on `<html>` + CSS variables (see `landing/src/i18n/mod.rs` `tr()` + `themes/dcdev/tokens.md`).

## Decision Gates

| Need | Action |
|---|---|
| Web/WASM only | `dioxus = { version="=0.7.9", features=["web","router"] }` + `Dioxus.toml` + `dx serve --port 8080` |
| Desktop/mobile | Add `desktop`/`mobile` features + `dioxus-desktop`/`magnus` per `learn/0.6/guides/desktop` |
| Fullstack/SSR | `features=["fullstack","server","router"]` + `server_fn` + `dioxus::launch` + `axum` per `learn/0.6/guides/fullstack` |
| Data fetching | `use_resource` + `Suspense` boundary, not `spawn` in `use_effect` |
| Navigation | `Link { to: Route::... }` vs `use_navigator().push/go_back()` |

## Execution Steps
1. Check `landing/Dioxus.toml` + `Cargo.toml` versions (`dx --version`, `dioxus = "=0.7.9"`). Fix mismatch first.
2. Scaffold RSX: `rsx! { div { class: "bg-bg text-fg", h1 { "Title" } } }` with `class:` + `onclick:` handlers.
3. Add state: `let mut count = use_signal(|| 0);` + `onclick: move |_| *count.write() +=1` + `{count()}`.
4. Add routing: `#[derive(Routable, Clone)]` + `<Router<Route> />` in `main.rs` `dioxus::launch(app)`, add `Route` enum.
5. Style: `tailwind.css` + `assets/tailwind.css` via `dx`, tokens `design/themes/dcdev/tokens.md` (`bg #120808`, `primary #FF3C3C`), `i18n` via `tr(lang,"key")`.
6. Build: `dx build --release` (web `dist/`) or `dx serve`, verify `wasm-bindgen` + `dioxus-cli` 0.7.9.

## Output Contract
- RSX that compiles with `dioxus 0.7.9` + `dx 0.7.9`, no `any` props, correct `Routable` + `use_signal`/`use_resource` patterns.
- `Dioxus.toml` + `Cargo.toml` version-aligned, `landing/src/main.rs` launches via `dioxus::launch`.
- Typed `Route` enum, `Link` navigation, and `use_navigator` programmatic nav where needed.

## References
- `landing/README.md` — Stack Dioxus 0.7.9 + Tailwind v4 + theming/i18n
- `landing/Dioxus.toml` — `[tailwind] input/output` + `title`
- `landing/src/main.rs` — `dioxus::launch(app::App)` + `Router<Route>`
- `landing/src/features/*` — RSX components `rsx!` + `use_signal`
- `design/themes/dcdev/tokens.md` — Tokens dcdev `bg #120808` / `primary #FF3C3C`
- `https://dioxuslabs.com/learn/0.7/` — Learn 0.7 (guide, essentials, router, fullstack)
- `https://dioxuslabs.com/components` — Components
- `https://github.com/dioxuslabs/dioxus` — Repo
