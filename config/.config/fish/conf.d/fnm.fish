
# fnm
set FNM_PATH "/home/dcdebian/.local/share/fnm"
if [ -d "$FNM_PATH" ]
  set PATH "$FNM_PATH" $PATH
  fnm env --shell fish | source
end
