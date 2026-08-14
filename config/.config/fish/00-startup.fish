# Interactive Fish starts at the user's home with a clean terminal.
if status is-interactive && isatty stdin && isatty stdout
    cd "$HOME"
    command clear
end
