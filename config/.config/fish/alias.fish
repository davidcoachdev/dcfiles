# ============================================
# Aliases para Fish
# fuente: ~/.config/fish/alias.fish
# Nota: abbr expande visiblemente; las lógicas complejas son functions.
# ============================================

# --- List / Navigation ---
abbr --add ll ls -l
abbr --add la ls -A
abbr --add l ls -CF

# --- General / navegación ---
abbr --add c clear
abbr --add lr 'cd ~'
abbr --add p pwd
abbr --add vp 'cd ~/.config/nvim/lua/plugins'
abbr --add lu 'sudo apt update && sudo apt upgrade -y'
abbr --add mw 'free -h --giga'
abbr --add es 'echo $SHELL'

# --- Sistema / logs / troubleshooting ---
abbr --add el 'sudo journalctl -r -p err'
abbr --add ss 'sudo systemctl status'

# --- fzf + bat (gruvbox) ---
abbr --add fzfbat 'fzf --preview="bat --theme=gruvbox-dark --color=always {}"'
abbr --add fzfnvim 'nvim (fzf --preview="bat --theme=gruvbox-dark --color=always {}")'
# Atajo corto: fp = fzf fullscreen con preview bat arriba a todo el ancho
abbr --add fp 'fzf --height=100% --preview="bat --color=always {}" --preview-window=down,50% --bind "ctrl-p:toggle-preview,ctrl-down:preview-down,ctrl-up:preview-up,ctrl-right:preview-page-down,ctrl-left:preview-page-up"'
# glow: abrir directo (sin TUI lila) con nuestro tema
abbr --add gw 'glow -p'
abbr --add gwm 'glow'

# --- eza (listados) ---
abbr --add le 'eza --group-directories-first --icons'
abbr --add le1 'eza -1 --group-directories-first --icons'
abbr --add lea 'eza -a --group-directories-first --icons'
abbr --add lea1 'eza -1a --group-directories-first --icons'
abbr --add lel 'eza -lh --group-directories-first --icons'
abbr --add lela 'eza -lah --group-directories-first --icons'
abbr --add let 'eza -aT --color=always --group-directories-first --icons'
abbr --add leth 'eza -alhT --color=always --group-directories-first --icons'

# --- Vim ---
abbr --add lv nvim

# --- Git (core) ---
abbr --add gs git status
abbr --add ga git add
abbr --add gc git commit
abbr --add gp git push
abbr --add gl git pull
abbr --add gd git diff
abbr --add gco git checkout
abbr --add gb git branch
abbr --add gk git stash

# --- Tmux ---
abbr --add ta 'tmux attach -t'
abbr --add tn 'tmux new-session -s'
abbr --add tl 'tmux list-sessions'
abbr --add td 'tmux detach'
abbr --add tkp 'tmux kill-pane -t'
abbr --add tkw 'tmux kill-window -t'
abbr --add tks 'tmux kill-session -t'
abbr --add tksa 'tmux kill-session -a'
abbr --add tca 'tmux swap-window -t -1'
abbr --add ti tmux
abbr --add tk 'tmux kill-server'

# --- CodeBurn ---
abbr --add cb codeburn report --provider opencode
abbr --add cbs codeburn status --provider opencode
abbr --add cbo codeburn optimize --provider opencode

# --- System ---
abbr --add x exit
abbr --add rz source ~/.config/fish/config.fish

# ============================================
# Functions (lógica que no entra en un abbr)
# ============================================

# --- Archivos ---
function ca --description 'Crear archivo vacío'
    touch $argv
end

function cae --description 'Crear archivo y abrirlo en nvim'
    touch "$argv[1]" && nvim "$argv[1]"
end

function cc --description 'Crear directorio'
    mkdir $argv
end

function cce --description 'Crear directorio y entrar'
    mkdir "$argv[1]" && cd "$argv[1]"
end

function cs --description 'Crear directorios (mkdir -p)'
    mkdir -p $argv
end

function cse --description 'Crear directorios anidados y entrar'
    mkdir -p "$argv[1]" && cd "$argv[1]"
end

function cf --description 'Copiar archivo/dir de <origen> a <destino>'
    if test (count $argv) -ne 2
        echo "Uso: copy_file <archivo_origen> <archivo_destino>"
        return 1
    end
    if not test -e "$argv[1]"
        echo "Error: El archivo \"$argv[1]\" no existe."
        return 1
    end
    cp -r "$argv[1]" "$argv[2]" && echo "Copiado de \"$argv[1]\" a \"$argv[2]\" OK"
end

function ra --description 'Renombrar/mover <archivo_actual> <nuevo_nombre>'
    if test (count $argv) -ne 2
        echo "Uso: rename <archivo_actual> <nuevo_nombre>"
        return 1
    end
    if not test -e "$argv[1]"
        echo "Error: El archivo \"$argv[1]\" no existe."
        return 1
    end
    mv "$argv[1]" "$argv[2]" && echo "Renombrado \"$argv[1]\" a \"$argv[2]\" OK" || echo "Error al renombrar."
end

function ba --description 'Borrar recursivo (confirmación única)'
    rm -rf --interactive=once $argv
end

function fd --description 'Buscar por nombre bajo ~'
    find ~ -name "$argv[1]" 2>/dev/null
end

function fl --description 'dmesg filtrando error/warn/fail'
    dmesg | grep -i "error\|warn\|fail"
end

function fzfls --description 'ls -l del archivo elegido con fzf'
    set -l f (fzf --preview="bat --theme=gruvbox-dark --color=always {}")
    test -n "$f"; and ls -l "$f"
end

# --- Git ---
function gcl --description 'Clone ssh: gcl <llave> <repo> [carpeta]'
    if test (count $argv) -lt 2 -o (count $argv) -gt 3
        echo "Uso: gcl <llave> <repo> [<ruta_carpeta>]"
        return 1
    end
    echo "llave: $argv[1]"
    echo "repo: $argv[2]"
    if test (count $argv) -eq 3
        if not test -d "$argv[3]"
            echo "Error: La carpeta \"$argv[3]\" no existe."
            return 1
        end
        echo "ruta: $argv[3]"
        git clone git@$argv[1]:$argv[2].git "$argv[3]"
    else
        git clone git@$argv[1]:$argv[2].git
    end
end

# --- Tmux ---
function twp --description 'tmux join-pane -s <src> -t <dst>'
    tmux join-pane -s "$argv[1]" -t "$argv[2]"
end

function tcw --description 'tmux swap-window -s <src> -t <dst>'
    tmux swap-window -s "$argv[1]" -t "$argv[2]"
end

function trw --description 'tmux rename-window -t <win> <nombre>'
    tmux rename-window -t "$argv[1]" "$argv[2]"
end

function tr --description 'Recargar config de tmux'
    tmux source-file ~/.tmux.conf
end

# --- Reset configuración de terminal ---
function reset_tool_selection --description 'Reiniciar selección de terminal'
    if set -q TERMINAL_SELECTION_FILE; and test -n "$TERMINAL_SELECTION_FILE"
        rm -f "$TERMINAL_SELECTION_FILE" && echo "Configuración de terminal reiniciada."
    else
        echo "TERMINAL_SELECTION_FILE no está definida"
    end
end

# --- Árbol: leh [nivel] (default 1) ---
function leh --description 'eza árbol (aT icons dirs primero), nivel configurable (default 1)'
    set -l nivel $argv[1]
    if test -z "$nivel"
        set nivel 1
    else if not string match -qr '^\d+$' -- $nivel
        echo "leh: el nivel debe ser un número entero (ej: leh 3)"
        return 1
    end
    eza -aT --icons --group-directories-first --level $nivel
end

# --- Árbol ignorando .gitignore: lehi [nivel] (default 1) ---
function lehi --description 'eza árbol largo respetando .gitignore (default nivel 1)'
    set -l nivel $argv[1]
    if test -z "$nivel"
        set nivel 1
    else if not string match -qr '^\d+$' -- $nivel
        echo "lehi: el nivel debe ser un número entero (ej: lehi 3)"
        return 1
    end
    eza -lah --tree --icons --git-ignore --group-directories-first --level $nivel
end
