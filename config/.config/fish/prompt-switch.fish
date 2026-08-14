# Use Tide outside tmux and Starship inside tmux.
if set -q TMUX && command -q starship
    starship init fish | source
end
