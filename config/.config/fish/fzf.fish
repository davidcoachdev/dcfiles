# fzf shell integration (official Fish bindings).
if status is-interactive
    set -gx FZF_DEFAULT_OPTS '--style=full
      --height=40%
      --layout=reverse
      --border=rounded
      --info=inline-right
      --header-first
      --preview-border=rounded
      --border-label-pos=40
      --preview-label-pos=40
      --color=fg:#ffcccc,bg:#0d0d0d,hl:#ff9999,fg+:#000000,bg+:#ff3333
      --color=hl+:#ff4d4d,info:#ff6666,prompt:#ff6666,pointer:#ff3333
      --color=marker:#ff4d4d,spinner:#ff9999,header:#262626,border:#404040
      --color=gutter:#262626'
    fzf --fish | source
end
