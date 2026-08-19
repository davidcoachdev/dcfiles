# Dc-Dev Skill Cache

Skill resolution is session-scoped. A registry change or cache miss invalidates
the entry and forces a fresh registry lookup. An unavailable skill is recorded
in the Result Contract and does not block unrelated phases unless its capability
is required by an acceptance criterion.
