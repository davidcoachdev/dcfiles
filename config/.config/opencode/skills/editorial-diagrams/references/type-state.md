# State Machine

**Best for:** states, transitions, guards, finite state automata.

## Layout
- States: rounded rectangles
- Transitions: arrows with labels (event/condition)
- Start: filled circle
- End: double circle
- Guards: in brackets [condition]

## Anti-patterns
- Too many states (max 9)
- Missing guards on conditional transitions
- Self-transitions hard to read

## Examples
- `assets/example-state.html`