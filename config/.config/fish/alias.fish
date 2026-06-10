# ============================================
# Aliases para Fish
# fuente: ~/.config/fish/alias.fish
# ============================================

# --- List / Navigation ---
abbr --add ll ls -l
abbr --add la ls -A
abbr --add l ls -CF
abbr --add c clear

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

# --- CodeBurn ---
abbr --add cb codeburn report --provider opencode
abbr --add cbs codeburn status --provider opencode
abbr --add cbo codeburn optimize --provider opencode

# --- System ---
abbr --add x exit
abbr --add rz source ~/.config/fish/config.fish
