# ============================================
# Variables de Entorno
# fuente: ~/.config/fish/env.fish
# ============================================

# --- Zoxide (navegación avanzada) ---
zoxide init fish | source

# --- Google Cloud SDK ---
if test -f '/mnt/c/Users/Dc Laptop/dc20dev26/google-cloud-sdk/path.fish.inc'
    source '/mnt/c/Users/Dc Laptop/dc20dev26/google-cloud-sdk/path.fish.inc'
end

# --- Bun (runtime JS) ---
set --export BUN_INSTALL "$HOME/.bun"
set --export PATH $BUN_INSTALL/bin $PATH

# --- OpenCode ---
set --export OPENCODE_PORT 4096

# --- Rust / Cargo (usar versión fish, NO bash) ---
if test -f ~/.config/fish/rust.fish
    source ~/.config/fish/rust.fish
end

# --- Solana Anchor ---
set --export ANCHOR_PROVIDER_URL https://api.devnet.solana.com
set --export ANCHOR_WALLET /home/dcdebian/.config/solana/id.json

# --- SDKMAN ---
# Agregar solo el PATH manualmente
fish_add_path "$HOME/.sdkman/candidates/-current/bin"

# --- CodeBurn (opcional) ---
set --export CODEBURN_PROVIDER opencode

# --- Tmux ---
set --export TMUX_SESSION "David_Coach_Dev"