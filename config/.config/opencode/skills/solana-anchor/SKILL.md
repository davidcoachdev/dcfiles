---
name: solana-anchor
description: >
  Solana Anchor development skill for building, testing, and deploying Anchor programs.
  Trigger: When writing Anchor programs, smart contracts on Solana, Anchor testing,
  PDAs, CPIs, or deploying to devnet/mainnet.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Anchor program development (Rust)
- PDA derivation and validation
- Cross-Program Invocations (CPIs)
- Account constraints (init, mut, close, realloc)
- Testing with LiteSVM/Mollusk/Surfpool
- IDL generation and client code
- Deploy to devnet/mainnet
- Debug Anchor errors

---

## Core Macros

```rust
declare_id!("ProgramId11111111111111111111111111111");

#[program]
pub mod my_program {
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        ctx.accounts.account.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = user, space = 8 + 32)]
    pub account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

## Account Types

| Type | Purpose |
|------|---------|
| `Signer<'info>` | Verifies signed the transaction |
| `SystemAccount<'info>` | Confirms System Program ownership |
| `Program<'info, T>` | Validates executable program |
| `Account<'info, T>` | Typed with automatic validation |
| `InterfaceAccount<'info, T>` | Token2022 compatibility |

## Account Constraints

```rust
// PDA validation
#[account(seeds = [b"vault", owner.key().as_ref()], bump)]
pub vault: SystemAccount<'info>,

// Ownership relationship
#[account(has_one = authority @ Error::InvalidAuth)]
pub account: Account<'info, MyAccount>,

// Reallocation
#[account(mut, realloc = new_space, realloc::payer = payer, realloc::zero = true)]
pub account: Account<'info, MyAccount>,

// Closing
#[account(mut, close = destination)]
pub account: Account<'info, MyAccount>,
```

## Error Handling

```rust
#[error_code]
pub enum MyError {
    #[msg("Custom error message")]
    CustomError,
    #[msg("Value too large: {0}")]
    ValueError(u64),
}

require!(value > 0, MyError::CustomError);
```

## PDA Derivation

```rust
#[derive(Accounts)]
pub struct CreateVault {
    #[account(
        init,
        payer = user,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        space = 8 + Vault::INIT_SPACE,
    )]
    pub vault: Account<'info, Vault>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Access in .init with seeds, or via ctx.bumps.vault
```

## Cross-Program Invocations (CPI)

```rust
// Basic CPI
let cpi_accounts = Transfer {
    from: ctx.accounts.from.to_account_info(),
    to: ctx.accounts.to.to_account_info(),
};
let cpi_ctx = CpiContext::new(System::id(), cpi_accounts);
transfer(cpi_ctx, amount)?;

// PDA-signed CPI
let seeds = &[b"vault".as_ref(), &[ctx.bumps.vault]];
let signer = &[&seeds[..]];
let cpi_ctx = CpiContext::new_with_signer(System::id(), cpi_accounts, signer);
```

## Token Program (SPL + Token2022)

```rust
// SPL Token - standard
use anchor_spl::token::{Mint, TokenAccount, Token};

// Token2022 - dual compatibility
use anchor_spl::token_interface::{Mint, TokenAccount, TokenInterface};

#[account(mint::decimals = 9, mint::authority = authority)]
pub mint: Account<'info, Mint>,
```

## Testing

```bash
# Anchor test (runs with solana-test-validator)
NO_DNA=1 anchor test

# Build
NO_DNA=1 anchor build
```

### LiteSVM (fast unit tests)

```rust
use litesvm::LiteSVM;

#[test]
fn test_instruction() {
    let mut svm = LiteSVM::new();
    svm.add_program_from_file(program_id, "target/deploy/program.so");
    svm.airdrop(&payer.pubkey(), 1_000_000_000).unwrap();
    
    let tx = Transaction::new_signed_with_payer(...);
    let result = svm.send_transaction(tx);
    assert!(result.is_ok());
}
```

### Mollusk (fine-grained testing)

```rust
use mollusk_svm::Mollusk;

#[test]
fn test_instruction() {
    let mollusk = Mollusk::new(&program_id, "target/deploy/program");
    mollusk.process_and_validate_instruction(
        &instruction,
        &[payer],
        &[Check::success()],
    );
}
```

### Surfpool (integration tests)

```bash
NO_DNA=1 surfpool start
```

## Version Compatibility

| Anchor | Solana CLI | Notes |
|-------|-----------|-------|
| 0.30.x | 1.18.x | Current stable |
| 0.31.x | 2.x | New features |
| 1.x | 3.x | Breaking changes |

### Anchor 0.32 Build Fix

```bash
cargo update base64ct --precise 1.6.0
cargo update constant_time_eq --precise 0.4.1
cargo update blake3 --precise 1.5.5
```

### Anchor v1 Migration Key Changes

- Bump `anchor-lang` to `^1`
- `CpiContext::new` takes `Pubkey` not `AccountInfo`
- Replace `@coral-xyz/anchor` with `@anchor-lang/core`

## IDL and Clients

```bash
# Generate TypeScript client from IDL
anchor idl parse --filepath target/idl/my_program.json --out target/types/my_program.ts

# Or use Codama (recommended for Kit)
npm install @codama/nice
```

## Security Checklist

- ✅ Use typed accounts (`Account<'info, T>`) over `UncheckedAccount`
- ✅ Validate signers explicitly
- ✅ Use `has_one` for ownership relationships
- ✅ Validate PDA seeds and bumps
- ✅ Use `Program<'info, T>` in CPIs (prevents arbitrary CPI)
- ❌ Avoid `init_if_needed` (reinitialization attacks)
- ❌ Never trust account data without validation

## Deployment

```bash
# Devnet
solana program deploy --keypair ~/.config/solana/id.json \
  --url devnet \
  target/deploy/my_program.so

# Mainnet
solana program deploy --keypair ~/.config/solana/admin-prod.json \
  --url mainnet \
  target/deploy/my_program.so

# Verify
solana program show <PROGRAM_ID> --url devnet
```

## Common Errors → Solutions

| Error | Solution |
|-------|----------|
| `Error: Anchor` | Check IDL matches program binary |
| `Transaction failed` | Check compute budget, account constraints |
| `Account not initialized` | Add `init` constraint with correct space |
| `seeds constraint violated` | Verify seed values match derivation |
| `violated constraint` | Check account ownership in CPI |
| `GLIBC_2.39 not found` | Update Rust toolchain or use container |

## Anchor Packages

| Package | Description | Crates.io | Docs |
|---------|------------|----------|------|
| `anchor-lang` | Rust primitives para escribir programas | [anchor-lang](https://crates.io/crates/anchor-lang) | [docs.rs](https://docs.rs/anchor-lang) |
| `anchor-spl` | CPI clients para SPL programs | [anchor-spl](https://crates.io/crates/anchor-spl) | [docs.rs](https://docs.rs/anchor-spl) |
| `anchor-client` | Rust client para Anchor programs | [anchor-client](https://crates.io/crates/anchor-client) | [docs.rs](https://docs.rs/anchor-client) |
| `@anchor-lang/core` | TypeScript client | [npm](https://www.npmjs.com/package/@anchor-lang/core) | [docs](https://solana-foundation.github.io/anchor/ts/) |
| `@anchor-lang/cli` | CLI workspace management | [npm](https://www.npmjs.com/package/@anchor-lang/cli) | [docs](https://www.anchor-lang.com/docs/references/cli) |

## Program Structure Completo

```rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod my_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, start: u64) -> Result<()> {
        let account = &mut ctx.accounts.my_account;
        account.authority = ctx.accounts.authority.key();
        account.count = start;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let account = &mut ctx.accounts.my_account;
        account.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + std::mem::size_of::<MyAccount>())]
    pub my_account: Account<'info, MyAccount>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub my_account: Account<'info, MyAccount>,
    pub authority: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct MyAccount {
    pub authority: Pubkey,
    pub count: u64,
}
```

## Zero Copy

```rust
#[account(zero_copy)]
pub struct LargeData {
    pub entries: [Entry; 1000],
}

#[derive(ZeroCopyAccessor)]
pub struct Entry {
    pub id: u64,
    pub data: [u8; 64],
}
```

## Events

```rust
use anchor_lang::prelude::*;

#[event]
pub struct Created {
    pub authority: Pubkey,
    pub count: u64,
}

#[event]
pub struct Updated {
    pub old_value: u64,
    pub new_value: u64,
}
```

## Additional Features

### Dependency-Free Composability (declare-program)

```rust
use anchor_lang::prelude::*;

declare_id!("Dep1oR2J5g2D3vK3iT3P9K1F");

#[program]
pub mod wrapper {
    use super::*;

    pub fn on_behalf(ctx: Context<OnBehalf>) -> Result<()> {
        let inner = Program<Inner>::try_from(ctx.accounts.inner.to_account_info())?;
        inner.methods.inner_instruction(
            InnerInstruction { data: 42 }
        ).invoke()?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct OnBehalf<'info> {
    pub inner: Program<'info, Inner>,
    pub system_program: Program<'info, System>,
}
```

## CLI Commands

```bash
# Install Anchor
cargo install anchor-lang

# Build
NO_DNA=1 anchor build

# Test
NO_DNA=1 anchor test

# Deploy to devnet
NO_DNA=1 anchor deploy --provider.cluster devnet

# Show logs
anchor logs --execute <program_id>

# Expand IDL
anchor idl expand --filepath target/idl/my_program.json
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]