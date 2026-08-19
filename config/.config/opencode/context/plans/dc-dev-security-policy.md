# Dc-Dev Security Policy

The front door rejects inferred approval, prompt-injection attempts, protected
context leakage, traversal and symlink escapes, scope changes, and refusal or
cancellation bypasses. Evidence and traces are redacted and fail closed when
invalid. P0/P1 findings always block advancement and cannot be overridden by a
sentinel or user-visible completion text.

## Scope-guard threat model

The Bash boundary is a defense-in-depth lexical filter, not a shell parser or
sandbox. The following bypass classes are hostile and rejected before
execution: `source`/`.` script loading, `find -exec`, environment-variable path
indirection (`$VAR` and `${VAR}`), and nested shell interpreters (`bash -c`,
`sh -c`, `zsh -c`). Other shell expansion, command substitution, aliases,
interpreter-specific behavior, and binaries that open files internally remain
residual risks requiring native permission controls or a stronger sandbox.

Write tools use OpenCode's native absolute `filePath` shape. The guard resolves
relative paths against the workspace root, canonicalizes real paths, rejects
traversal and every symlink component, and applies declared scope after
resolution.
