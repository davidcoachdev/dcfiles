---
name: rust
description: >
  Rust programming language for systems development.
  Trigger: When writing Rust code, building CLI tools, or working with Solana/Anchor programs.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building CLI tools in Rust
- Working with Solana Anchor programs
- Creating SDKs or libraries
- Systems programming requiring memory safety
- Any Rust codebase in the project

## Critical Patterns

### 1. Project Setup

```bash
# Create new binary
cargo new --bin my-app

# Create new library
cargo new --lib my-lib

# Create workspace
mkdir my-workspace
cd my-workspace
cargo new --lib core
cargo new --bin app
# Then edit Cargo.toml:
# [workspace]
# members = ["core", "app"]
```

### 2. Dependencies (Cargo.toml)

```toml
[dependencies]
# Async
tokio = { version = "1", features = ["full"] }

# Error handling
anyhow = "1"
thiserror = "1"

# Serialization
serde = { version = "1", features = ["derive"] }
serde_json = "1"

# CLI
clap = { version = "4", features = ["derive"] }

# Logging
tracing = "0.1"
tracing-subscriber = "0.3"

# Time
chrono = { version = "0.4", features = ["serde"] }

# Async runtime
rayon = "1"  # parallel iteration

[dev-dependencies]
tempfile = "3"
```

### 3. Error Handling Pattern

```rust
use anyhow::{Result, Context};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum MyError {
    #[error("Failed to connect: {0}")]
    Connection(String),
    
    #[error("Invalid input: {0}")]
    InvalidInput(String),
    
    #[error("Not found: {0}")]
    NotFound(String),
}

// With context for better errors
fn fetch_data() -> Result<String> {
    let response = client.get("/data")
        .context("Failed to fetch data")?;
    Ok(response)
}
```

### 4. Async HTTP (reqwest)

```rust
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Response {
    data: String,
}

async fn fetch(client: &Client, url: &str) -> Result<Response> {
    let resp = client.get(url).send().await?;
    let data = resp.json::<Response>().await?;
    Ok(data)
}
```

### 5. CLI with clap

```rust
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "my-cli")]
#[command(about = "My CLI tool")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
    
    /// RPC URL
    #[arg(long, default_value = "http://localhost:8899")]
    rpc: String,
    
    /// Verbose output
    #[arg(short, long)]
    verbose: bool,
}

#[derive(Subcommand)]
enum Commands {
    /// Issue a license
    Issue {
        /// Product ID
        #[arg(long)]
        product_id: String,
    },
    /// Verify a license
    Verify {
        /// License key
        #[arg(long)]
        key: String,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Commands::Issue { product_id } => issue_license(&cli.rpc, &product_id)?,
        Commands::Verify { key } => verify_license(&cli.rpc, &key)?,
    }
    Ok(())
}
```

### 6. Logging

```rust
use tracing::{info, error, warn};

fn main() {
    tracing_subscriber::fmt()
        .with_target(false)
        .init();
    
    info!("Starting application");
    warn!("Configuration missing, using defaults");
    error!("Failed to connect: {}", e);
}
```

### 7. State Management

```rust
use std::sync::Arc;
use tokio::sync::Mutex;

struct AppState {
    client: Client,
    config: Config,
}

// Shared across async tasks
async fn handle_request(state: Arc<Mutex<AppState>>) -> Result<()> {
    let state = state.lock().await;
    let response = state.client.get("/data").await?;
    Ok(())
}
```

### 8. Parallel Processing (rayon)

```rust
use rayon::prelude::*;

fn process_items(items: &[Item]) -> Vec<Result<Item>> {
    items.par_iter()
        .map(|item| process(item))
        .collect()
}
```

## Common Patterns

### Iterating with Error

```rust
fn process_all(items: &[Item]) -> Result<()> {
    for item in items {
        process(item).context(format!("Failed to process {}", item.id))?;
    }
    Ok(())
}
```

### Option Handling

```rust
fn get_name(opt: Option<String>) -> String {
    opt.unwrap_or_else(|| "default".into())
}

// Or with unwrap_or (panics on None - avoid)
fn get_name_wrong(opt: Option<String>) -> String {
    opt.unwrap_or("default".into()) // This panics!
}
```

### Results in Loops

```rust
fn validate_all(licenses: &[License]) -> Vec<ValidationError> {
    licenses.iter()
        .filter_map(|lic| validate(lic).err())
        .collect()
}
```

## Commands

```bash
# Build
cargo build

# Build release
cargo build --release

# Run
cargo run -- --rpc http://localhost:8899 issue --product-id foo

# Test
cargo test

# Clippy (linting)
cargo clippy -- -D warnings

# Format
cargo fmt -- --check

# Docs
cargo doc --open

# Release
cargo build --release --locked
```

## Unsafe Rust (Nomicon)

### Unsafe Primitives

```rust
// Dereferencing raw pointers
unsafe fn deref_ptr(ptr: *const i32) -> i32 {
    *ptr
}

// Calling unsafe functions
unsafe {
    unsafe_fn();
}

// Implementing unsafe traits
unsafe trait MyUnsafeTrait {
    fn unsafe_method();
}

// Mutable statics (unsafe)
static mut COUNTER: u32 = 0;
unsafe {
    COUNTER += 1;
}
```

### Unsafe Blocks

```rust
// Safe abstraction over unsafe code
fn get_unchecked<T>(slice: &[T], index: usize) -> &T {
    assert!(index < slice.len());
    unsafe { slice.get_unchecked(index) }
}
```

### Common Unsafe Patterns

```rust
// Manual Drop implementation
struct MyResource {
    ptr: *mut std::ffi::c_void,
}

impl Drop for MyResource {
    fn drop(&mut self) {
        unsafe { libc::free(self.ptr); }
    }
}

// Unsafe trait implementations
unsafe impl Send for MyResource {}
unsafe impl Sync for MyResource {}
```

## Advanced Patterns (Microsoft)

### Type-Driven Correctness

```rust
// Type-state for state machines
struct Locked;
struct Unlocked;

struct Mutex<T, S> {
    data: T,
    _state: std::marker::PhantomData<S>,
}

impl<T> Mutex<T, Unlocked> {
    fn lock(self) -> Mutex<T, Locked> {
        Mutex { data: self.data, _state: std::marker::PhantomData }
    }
}

impl<T> Mutex<T, Locked> {
    fn unlock(self) -> Mutex<T, Unlocked> {
        Mutex { data: self.data, _state: std::marker::PhantomData }
    }
}
```

### Capability Tokens

```rust
// Capability-based access control
struct ReadOnly;
struct ReadWrite;

fn read<T>(_: Mutex<T, ReadOnly>) {}
fn write<T>(_: Mutex<T, ReadWrite>) {}
```

## Practice Resources (rust-by-practice)

### Key Exercises

- **Tuple structs**: `struct Color(i32, i32, i32);`
- **Partial moves**: `let ref name = &f.name;` in destructuring
- **Match guards**: `Some(x) if x > 5 => {}`
- **Deref coercions**: Custom `Deref` implementations
- **Async/await**: ` FuturesRuntime`, cancellation
- **Atomics**: `AtomicU32`, `AtomicUsize`, ordering

## Commands

```bash
# Build
cargo build

# Build release
cargo build --release

# Run
cargo run -- --rpc http://localhost:8899 issue --product-id foo

# Test
cargo test

# Clippy (linting)
cargo clippy -- -D warnings

# Format
cargo fmt -- --check

# Docs
cargo doc --open

# Miri (undefined behavior)
cargo +nightly miri run

# Release
cargo build --release --locked
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]