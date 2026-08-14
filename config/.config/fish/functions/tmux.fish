# Fish wrapper for tmux.
# No args: attach to the configured session or create it.
# Args: pass through to tmux with 256-color support.
function tmux
    if test (count $argv) -eq 0
        set -l session main
        if set -q TMUX_SESSION
            set session $TMUX_SESSION
        end
        command tmux -2 new-session -A -s "$session"
    else
        command tmux -2 $argv
    end
end
