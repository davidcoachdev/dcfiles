# Select next free tmux slot. Multiple terminals can run the same Debian distro.
set -l distro_number 1
while command tmux has-session -t "Dc Dev #$distro_number" 2>/dev/null
    set distro_number (math $distro_number + 1)
end
set --export TMUX_SESSION "Dc Dev #$distro_number"

if status is-interactive && isatty stdin && isatty stdout && ! set -q TMUX && command -q tmux
    command tmux -2 new-session -s "$TMUX_SESSION"
end
