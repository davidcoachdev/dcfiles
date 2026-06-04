function sdk
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk $argv"
    set -gx JAVA_HOME (bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && echo \$JAVA_HOME")
    set -gx PATH "$JAVA_HOME/bin" (string split : $PATH | string match -rv '.sdkman/candidates/java')
end
