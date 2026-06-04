# ~/.bashrc — dcfiles-managed
#
# This file is managed by dcfiles. Local overrides go in ~/.bashrc.local.

# If not running interactively, don't do anything
[[ $- == *i* ]] || return

# --- Prompt ---
PS1='[\u@\h \W]\$ '

# --- History ---
HISTSIZE=10000
HISTFILESIZE=20000
HISTCONTROL=ignoreboth:erasedups

# --- Aliases ---
alias ls='ls --color=auto'
alias ll='ls -lah'
alias grep='grep --color=auto'
alias ..='cd ..'

# --- Local overrides ---
[[ -f ~/.bashrc.local ]] && source ~/.bashrc.local
