---
name: solana-wallet-adapter
description: "Trigger: wallet-adapter, Solana wallet connect, Phantom, SIWS, sign message, sign transaction, WASM wallet. Connect browser-extension Solana wallets from Rust/WASM frontends via the wallet-adapter crate."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Solana Wallet Adapter (Rust / WASM)

## Activation Contract
Use when building a Rust frontend (Dioxus, Leptos, Yew, Sycamore, or any `trunk`/`wasm-bindgen` app) that must connect to a browser-extension Solana wallet (Phantom, Solflare, Backpack) and sign messages or transactions through the Wallet Standard. This crate is NOT for native/CLI clients.

## Hard Rules
- **WASM-only**: compile to `wasm32-unknown-unknown` with a bundler (trunk or `dioxus web`). It will not link in a native binary.
- **Init once**: call `WalletAdapter::init()` (or `init_with_channel_capacity` / `init_custom`) exactly once at startup. It registers `wallet-standard:register-wallet` and `wallet-standard:app-ready` events on `window`/`document`. Without it, `adapter.wallets()` stays empty.
- **No web-sys flags needed**: the crate already enables the required `web-sys` features in its own manifest. Add `solana-sdk`, `bincode`, `jzon`, `serde` only for the sign/send flows.
- **SIWS needs address**: `sign_in` REQUIRES `SigninInput::set_address(&address)`; omitting it throws `MessageResponseMismatch`.
- **Async connection info**: `adapter.connection_info()` / `connected_account()` are `async` (RwLock-wrapped). Await them. Clone `ConnectionInfo` / `WalletStorage` before moving into closures or `async move` background tasks.
- **Tx = bincode bytes**: serialize with `bincode::serialize(&tx)`; the wallet deserializes from bytes. Build with `solana_sdk::transaction::Transaction`.
- **Send needs blockhash**: `sign_and_send_transaction` requires a valid recent blockhash in the tx (fetch `getLatestBlockhash`) plus `SendOptions`.
- **Verify signatures**: every `sign_*` returns `WalletError` on mismatch — never trust output without handling the error.

## Decision Gates
| Goal | Method |
| Connect a wallet | `connect_by_name("Phantom")` or `connect(wallet)` |
| Disconnect | `disconnect().await` |
| Login / auth (SIWS) | `sign_in(&SigninInput, pubkey).await` |
| Prove ownership off-chain | `sign_message(bytes).await` |
| Sign, send yourself | `sign_transaction(&tx_bytes, Some(cluster)).await` |
| Sign + broadcast | `sign_and_send_transaction(&tx_bytes, cluster, SendOptions).await` |

## Execution Steps
1. Add deps — see `assets/examples.md#cargo`.
2. `let mut adapter = WalletAdapter::init()?;` once at startup.
3. `adapter.connect_by_name("Phantom").await?;` then guard with `if adapter.is_connected().await { .. }`.
4. Check support before calling: `if adapter.solana_sign_transaction().await? { .. }`.
5. Perform the action from the table above.
6. Listen for `WalletEvent`s (`Register`, `Disconnected`, `AccountChanged`) via `adapter.events().recv().await`.

## Output Contract
Return a snippet tailored to the requested operation (connect / SIWS / sign message / sign tx / sign+send) plus the matching Cargo deps and the init-once reminder.

## References
- `references/upstream.md` — docs.rs, book, and repo links.
- `assets/examples.md` — full runnable Cargo.toml and code per operation.
