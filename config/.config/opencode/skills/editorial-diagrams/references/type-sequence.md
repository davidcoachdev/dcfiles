# Sequence

**Best for:** time-ordered messages between actors, API flows, interactions.

## Layout
- Lifelines: vertical dashed lines
- Actors: boxes at top
- Messages: horizontal arrows with labels
- Activations: thin vertical bars
- Returns: dashed arrows going back

## Anti-patterns
- Too many lifelines (max 5)
- Messages crossing lifeline boundaries unnecessarily
- Activation bars overlapping

## Examples
- `assets/example-sequence.html`