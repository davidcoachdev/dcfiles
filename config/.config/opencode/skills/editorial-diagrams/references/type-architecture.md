# Architecture

**Best for:** system overviews, data-flow, integration maps, infra topology.

## Layout
- Group by tier/trust boundary (frontend → backend → data)
- Primary flow: left→right or top→down
- Draw arrows before boxes (z-order)
- 1-2 focal nodes: primary integration, data store, key decision

## Anti-patterns
- Coral on every box → hierarchy collapses
- Bidirectional arrow when obvious from context
- Legend inside diagram area

## Examples
- `assets/example-architecture.html`