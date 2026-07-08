# ============================================
# Fish Shell Config
# ============================================

# --- Cargar archivos separados ---
# Environment (primero - define vars como TMUX_SESSION)
if test -f ~/.config/fish/env.fish
    source ~/.config/fish/env.fish
end

# Paths
if test -f ~/.config/fish/paths.fish
    source ~/.config/fish/paths.fish
end

# Aliases
if test -f ~/.config/fish/alias.fish
    source ~/.config/fish/alias.fish
end

# --- INTERACTIVE: comandos al iniciar Fish ---
if status is-interactive
    # Solo iniciar si NO está dentro de tmux
    if not set -q TMUX
        tmux
    end
end


# >>> opencode-agent-tmux >>>
export OPENCODE_PORT=4096
alias opencode='opencode-tmux'
# <<< opencode-agent-tmux <<<
