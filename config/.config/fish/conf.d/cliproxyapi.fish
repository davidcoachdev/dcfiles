# ~/.config/fish/conf.d/cliproxyapi.fish
#
# Separation of responsibilities:
#   config.yaml        -> owns secrets + server runtime config.
#                         The management secret-key lives ONLY there, never here.
#   this file (fish)   -> UX helpers + service autostart (orchestration only).
#   systemd --user     -> owns the actual background process.
#
# Fish auto-loads every file in conf.d/ on startup, so this stays isolated
# from your main config.fish and is safe to delete.

# --- Paths (no secrets ever go here) ---
set -gx CLIPROXY_CONFIG "$HOME/.cli-proxy-api/config.yaml"
set -gx CLIPROXY_API_URL "http://localhost:8317"
set -gx CLIPROXY_MGMT_URL "$CLIPROXY_API_URL/management.html"

# --- Autostart (tmux-style): start only if not already active ---
# Runs once per interactive shell. `systemctl --user is-active` is a read-only
# probe that no-ops when systemd isn't up, so it's safe outside WSL/Linux too.
if status is-interactive; and command -q brew
    if not systemctl --user is-active --quiet homebrew.cliproxyapi.service 2>/dev/null
        brew services start cliproxyapi 2>/dev/null
    end
end

# --- Helper ---
function cliproxy -d "CLIProxyAPI helper: status|start|stop|restart|logs|mgmt|config"
    set -l svc homebrew.cliproxyapi.service
    switch "$argv[1]"
        case "" status
            if systemctl --user is-active --quiet $svc 2>/dev/null
                echo "cliproxyapi: active"
            else
                echo "cliproxyapi: inactive"
            end
        case start
            brew services start cliproxyapi
        case stop
            brew services stop cliproxyapi
        case restart
            brew services restart cliproxyapi
        case logs
            journalctl --user -u $svc -f
        case mgmt
            if command -q xdg-open
                xdg-open $CLIPROXY_MGMT_URL
            else
                echo $CLIPROXY_MGMT_URL
            end
        case config
            $EDITOR $CLIPROXY_CONFIG
        case '*'
            echo "usage: cliproxy [status|start|stop|restart|logs|mgmt|config]"
    end
end
