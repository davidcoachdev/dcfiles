# Override de tmux para fish:
# - Forza 256 colores (-2)
# - Sin args: attach a $TMUX_SESSION si existe, si no la crea
# - Cambiá TMUX_SESSION en env.fish para renombrar

 function tmux
    if test (count $argv) -eq 0
#        if command tmux has-session -t "$TMUX_SESSION" 2>/dev/null
#            command tmux attach-session -t "$TMUX_SESSION"
#        else
           command tmux new-session -s "$TMUX_SESSION"
#        end
    else
        command tmux -2 $argv
    end
end
