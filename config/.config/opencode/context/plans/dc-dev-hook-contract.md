# Dc-Dev Hook Contract

Only direct hook keys returned by the runtime probe may be registered. The
allowlist is versioned with the probe result and must be revalidated when the
OpenCode version changes. Payload validation fails closed and emits a structured
failure without including protected contents.

Unsupported desired enforcement is not silently dropped: it is recorded as a
risk and verified during Check.
