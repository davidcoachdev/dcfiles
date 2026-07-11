# Angular Core Skill

## Structure

```
angular/core/
├── SKILL.md                 # Main skill definition (208 lines)
├── references/              # Supporting documentation
│   ├── signals-reactive-state.md
│   ├── standalone-control-flow.md
│   └── zoneless-change-detection.md
├── assets/                  # Code examples
│   └── angular-core-complete-example.ts
└── scripts/                 # Utility scripts (empty)
```

## Quick Start

1. **Read SKILL.md** - Understand Angular core patterns
2. **Study references/** - Deep dive into specific techniques
3. **Review assets/** - Real-world code examples

## Key Concepts

- **Standalone Components** - Default, no NgModule needed
- **Signals** - Reactive state management
- **Computed** - Derived state that auto-updates
- **Effect** - Side effects when signals change
- **Input/Output Functions** - Function-based props
- **Control Flow** - @if, @for, @switch syntax
- **Zoneless** - No Zone.js for better performance
- **OnPush** - Change detection strategy

## When to Use

- Building Angular components
- Managing component state
- Creating reactive UIs
- Setting up change detection
- Handling side effects
- Building forms

## Key Patterns

### Signals

```typescript
readonly count = signal(0);
readonly doubled = computed(() => this.count() * 2);
this.count.set(5);
```

### Input/Output

```typescript
readonly user = input.required<User>();
readonly selected = output<User>();
```

### Effects

```typescript
private userEffect = effect(() => {
  this.loadUser(this.userId());
});
```

### Control Flow

```html
@if (loading()) { <spinner /> }
@for (item of items(); track item.id) { <item /> }
@switch (status()) { @case ('active') { ... } }
```

## Common Commands

```bash
ng generate component my-component
ng serve
ng build
ng test
```

## Related Skills

- `angular-expert` - Advanced Angular patterns
- `angular-forms` - Form handling with Angular
- `angular-architecture` - Project structure
