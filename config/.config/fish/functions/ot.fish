# ============================================
# OpenCode + Tmux Wrapper
# fuente: ~/.config/fish/functions/ot.fish
# ============================================

function ot --description 'OpenCode with tmux'
    # Verificar si hay sesiones tmux
    set -l count (tmux list-sessions 2>/dev/null | wc -l)
    
    if test "$count" = "0"
        # No hay sesión, crear una
        tmux new-session -d -s main
    end
    
    # Ahora abrir opentmux
    opentmux $argv
end