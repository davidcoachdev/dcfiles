# wallet-adapter examples (Rust / WASM)

All snippets assume `WalletAdapter::init()` ran once at startup and a wallet is connected.
`web-sys` features are already enabled by the crate — do NOT re-add them.

## Cargo.toml

```toml
[dependencies]
wallet-adapter = "1.4.2"

# Only needed for sign / sign-and-send flows:
solana-sdk = "^2.1.2"
bincode = "=1.3.3"
jzon = "0.12.5"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0.133"
# Only for the SOL-transfer instruction example:
solana-system-interface = { version = "3.0.0", features = ["bincode"] }
```

Build for the browser:
```sh
rustup target add wasm32-unknown-unknown
# Dioxus:
dx build --platform web
# or trunk / wasm-pack / wasm-bindgen as your frontend requires
```

## Init + connect + listen for events

```rust
use wallet_adapter::{WalletAdapter, WalletResult, WalletEvent};

async fn setup() -> WalletResult<()> {
    // Run EXACTLY ONCE at startup.
    let mut adapter = WalletAdapter::init()?;

    adapter.connect_by_name("Phantom").await?;

    // In a background task, react to wallet events:
    if let Ok(WalletEvent::Disconnected { .. }) = adapter.events().recv().await {
        // show "connect wallet" UI
    }
    Ok(())
}
```

## Sign In With Solana (SIWS) — NOTE set_address is required

```rust
use wallet_adapter::{WalletAdapter, WalletResult, SigninInput, Cluster};

async fn login(adapter: &mut WalletAdapter) -> WalletResult<()> {
    let public_key = adapter.connection_info().await.connected_account()?.public_key();
    let address = adapter.connection_info().await.connected_account()?.address().to_string();

    let mut input = SigninInput::new();
    input
        .set_domain(&adapter.window())?
        .set_statement("Login To Dev Website")
        .set_chain_id(Cluster::DevNet)
        .set_address(&address)?; // REQUIRED — omitting throws MessageResponseMismatch

    let _output = adapter.sign_in(&input, public_key).await?;
    Ok(())
}
```

## Sign message (off-chain ownership proof)

```rust
use wallet_adapter::{WalletAdapter, WalletResult};

async fn prove(adapter: &mut WalletAdapter) -> WalletResult<()> {
    if adapter.solana_sign_message().await? {
        let _signed = adapter.sign_message(b"SOLANA ROCKS!!!").await?;
    }
    Ok(())
}
```

## Sign transaction (you broadcast it yourself)

```rust
use wallet_adapter::{WalletAdapter, WalletResult, Cluster, Utils};
use solana_sdk::{native_token::LAMPORTS_PER_SOL, pubkey::Pubkey, transaction::Transaction};
use solana_system_interface::instruction::transfer;

async fn sign_tx(adapter: &mut WalletAdapter) -> WalletResult<()> {
    let public_key = adapter.connection_info().await.connected_account()?.public_key();
    let pubkey = Pubkey::new_from_array(public_key);
    let recipient = Pubkey::new_from_array(Utils::public_key_rand()); // use a REAL recipient in prod
    let instr = transfer(&pubkey, &recipient, LAMPORTS_PER_SOL);
    let tx = Transaction::new_with_payer(&[instr], Some(&pubkey));
    let tx_bytes = bincode::serialize(&tx).unwrap();

    if adapter.is_connected().await {
        let output = adapter.sign_transaction(&tx_bytes, Some(Cluster::DevNet)).await?;
        let _signed = bincode::deserialize::<Transaction>(&output[0]).unwrap();
    }
    Ok(())
}
```

## Sign and send transaction (wallet broadcasts)

```rust
use wallet_adapter::{WalletAdapter, WalletResult, Cluster, Utils, SendOptions};
use solana_sdk::{native_token::LAMPORTS_PER_SOL, pubkey::Pubkey, transaction::Transaction, hash::Hash};
use solana_system_interface::instruction::transfer;
use std::str::FromStr;

async fn sign_and_send(adapter: &mut WalletAdapter, blockhash: Hash) -> WalletResult<()> {
    let public_key = adapter.connection_info().await.connected_account()?.public_key();
    let pubkey = Pubkey::new_from_array(public_key);
    let recipient = Pubkey::new_from_array(Utils::public_key_rand()); // use a REAL recipient in prod
    let instr = transfer(&pubkey, &recipient, LAMPORTS_PER_SOL);

    let mut tx = Transaction::new_with_payer(&[instr], Some(&pubkey));
    if adapter.is_connected().await {
        tx.message.recent_blockhash = blockhash; // REQUIRED — fetch getLatestBlockhash from RPC
        let tx_bytes = bincode::serialize(&tx).unwrap();
        let signature = adapter
            .sign_and_send_transaction(&tx_bytes, Cluster::DevNet, SendOptions::default())
            .await?;
        let _explorer = format!(
            "https://explorer.solana.com/tx/{}?cluster=devnet",
            Utils::base58_signature(signature)
        );
    }
    Ok(())
}
```

Fetch the blockhash with the browser `fetch` API or `gloo-net` / `reqwest` against
`Cluster::DevNet.endpoint()` using the `getLatestBlockhash` JSON-RPC method.
