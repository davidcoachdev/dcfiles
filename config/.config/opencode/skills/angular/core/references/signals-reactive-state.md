# Angular Signals & Reactive State

## Overview

Signals are Angular's new reactive primitive. They replace RxJS for most component state management.

## Creating Signals

```typescript
readonly count = signal(0);
readonly name = signal('John');
readonly items = signal<Item[]>([]);
readonly user = signal<User | null>(null);
```

## Reading Signals

```typescript
// In component class
const value = this.count();

// In template
{{ count() }}
```

## Updating Signals

```typescript
// Set new value
this.count.set(5);

// Update based on previous value
this.count.update(prev => prev + 1);
```

## Computed Signals

Derived state that updates automatically:

```typescript
readonly doubled = computed(() => this.count() * 2);
readonly displayName = computed(() => this.user()?.name ?? 'Guest');
```

## Effects

Run side effects when signals change:

```typescript
private userEffect = effect(() => {
  const userId = this.userId();
  this.loadUser(userId);
});

private storageEffect = effect(() => {
  localStorage.setItem('count', this.count().toString());
});
```

## Signal Inputs

```typescript
readonly user = input.required<User>();
readonly disabled = input(false);
readonly count = input(0);
```

## Signal Outputs

```typescript
readonly selected = output<User>();
readonly deleted = output<string>();

// Emit
this.selected.emit(user);
```

## Model Signals (Two-Way Binding)

```typescript
readonly checked = model(false);

// In template
<input [(ngModel)]="checked()" />
```

## Best Practices

1. **Use signals for component state** - Default choice
2. **Use computed for derived values** - Auto-updates
3. **Use effect for side effects** - Replaces ngOnInit/ngOnChanges
4. **Use input/output for props** - Function-based API
5. **Avoid RxJS for simple state** - Use signals instead

## References

- [Angular Signals](https://angular.dev/guide/signals)
- [Computed Signals](https://angular.dev/guide/signals#computed)
- [Effects](https://angular.dev/guide/signals#effects)
