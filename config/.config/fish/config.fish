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
    # ── TTS bridge auto-start ──────────────────────────────────
    # Arranca bridge HTTP (9877 → TCP 9876) si no está corriendo
    if not pgrep -f "bun.*tts-bridge" > /dev/null 2>&1
        nohup bun run /home/dcdebian/Proyects/tts-control/src/tts-bridge.ts \
            > /dev/null 2>&1 &
    end

    # ── TTS service (Windows PowerShell) auto-start ────────────
    # Si no hay nadie escuchando 9876 en Windows, copia el repo a Temp
    # y levanta el service. NOTA: el servicio corre desde
    # C:\Windows\Temp\tt-service.ps1 (NO desde el repo); por eso copiamos
    # siempre el archivo del repo antes de arrancar para evitar desfasaje.
    if not powershell.exe -NoProfile -Command "(Get-NetTCPConnection -LocalPort 9876 -State Listen -ErrorAction SilentlyContinue).LocalPort -eq 9876" 2>/dev/null | grep -q 9876
        cp /home/dcdebian/Proyects/tts-control/scripts/tt-service.ps1 /mnt/c/Windows/Temp/tt-service.ps1 2>/dev/null
        powershell.exe -NoProfile -Command "Start-Process pwsh -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File','C:\Windows\Temp\tt-service.ps1' -WindowStyle Hidden" 2>/dev/null &
    end

    # Solo iniciar si NO está dentro de tmux
    if not set -q TMUX
        tmux
    end
end








# >>> opencode-agent-tmux >>>
export OPENCODE_PORT=4096
alias opencode='opencode-tmux'
# <<< opencode-agent-tmux <<<
