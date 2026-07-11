# TypeScript Generics & Type Safety

## Generic Functions

```typescript
function identity<T>(value: T): T {
  return value;
}

function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

## Generic Interfaces

```typescript
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

interface Repository<T> {
  find(id: string): T | null;
  save(item: T): void;
  delete(id: string): void;
}
```

## Generic Constraints

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

## Type Inference

```typescript
const arr = [1, 2, 3]; // T inferred as number
const result = first(arr); // result type is number | undefined
```

## Best Practices

1. **Use generics for reusable code** - Don't repeat types
2. **Constrain generics** - Use `extends` to limit types
3. **Avoid over-generalization** - Keep it simple
4. **Use meaningful names** - T, U, K are OK for simple cases

## References

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
