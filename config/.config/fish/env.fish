# ============================================
# Variables de Entorno
# fuente: ~/.config/fish/env.fish
# ============================================

# --- Zoxide (navegación avanzada) ---
zoxide init fish | source

# --- Atuin (historial compartido; no tocar CTRL-R, lo mantiene fzf) ---
set -gx ATUIN_NOBIND "true"
atuin init fish | source
bind up _atuin_bind_up
bind -M insert up _atuin_bind_up

# --- Google Cloud SDK ---
if test -f '/mnt/c/Users/Dc Laptop/dc20dev26/google-cloud-sdk/path.fish.inc'
    source '/mnt/c/Users/Dc Laptop/dc20dev26/google-cloud-sdk/path.fish.inc'
end

# --- Bun (runtime JS) ---
set --export BUN_INSTALL "$HOME/.bun"
set --export PATH $BUN_INSTALL/bin $PATH

# --- OpenCode ---
set --export OPENCODE_PORT 4096

# --- Solana Anchor ---
set --export ANCHOR_PROVIDER_URL https://api.devnet.solana.com
set --export ANCHOR_WALLET /home/dcdebian/.config/solana/id.json

# --- SDKMAN ---
# Agregar solo el PATH manualmente
fish_add_path "$HOME/.sdkman/candidates/-current/bin"

# --- CodeBurn (opcional) ---
set --export CODEBURN_PROVIDER opencode

# --- Glow (markdown) — forzar tema dc-studio ---
set --export GLAMOUR_STYLE /home/dcdebian/.config/glow/glow-dc-studio.json
set --export GLOW_STYLE /home/dcdebian/.config/glow/glow-dc-studio.json

# --- Homebrew (silenciar hints y auto-update) ---
set --export HOMEBREW_NO_AUTO_UPDATE 1
set --export HOMEBREW_NO_ENV_HINTS 1
