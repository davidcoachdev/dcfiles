# ============================================
# Rust/Cargo Environment para Fish
# Traducción de ~/.cargo/env a sintaxis Fish
# ============================================

# Agregar ~/.cargo/bin al PATH si no existe
if not contains "$HOME/.cargo/bin" $PATH
    set -gx PATH "$HOME/.cargo/bin" $PATH
end