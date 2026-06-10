function le --description 'List directories with eza tree view'
    set -l level 1
    set -l use_icons 1

    # Examples:
    #   le
    #   le -l 3
    #   le -n

    argparse 'l/level=' 'i/icons' 'n/no-icons' -- $argv
    or return

    if set -q _flag_level[1]
        set level $_flag_level[1]
    end

    if set -q _flag_no_icons
        set use_icons 0
    end

    if set -q _flag_icons
        set use_icons 1
    end

    if test $use_icons -eq 1
        command eza -lah --tree --icons --level $level $argv
    else
        command eza -lah --tree --level $level $argv
    end
end