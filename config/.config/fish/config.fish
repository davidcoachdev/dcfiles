# Fish startup entry point.
# Load every root-level module except this entry point.
# Fish already auto-loads conf.d/*.fish and functions/*.fish.
for module in $__fish_config_dir/*.fish
    if test (path basename $module) != config.fish
        source $module
    end
end

# Pi
fish_add_path "/home/dcdebian/.local/share/fnm/node-versions/v24.14.0/installation/bin"


# Added by Antigravity CLI installer
set -gx PATH "/home/dcdebian/.local/bin" $PATH
