# ============================================
# Paths - Agregar directorios al PATH
# fuente: ~/.config/fish/paths.fish
# ============================================

# OpenCode (ubicación correcta)
fish_add_path /home/linuxbrew/.linuxbrew/bin

# Local bin
fish_add_path /home/dcdebian/.local/bin

# Solana/Anza CLI tools, including solana-test-validator
fish_add_path "$HOME/.local/share/solana/install/active_release/bin"
