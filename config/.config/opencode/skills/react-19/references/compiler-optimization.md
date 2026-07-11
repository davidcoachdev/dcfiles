# React 19 Compiler & Optimization

## Overview

React 19 introduces the React Compiler, which automatically optimizes your components. You no longer need manual memoization with `useMemo` and `useCallback`.

## Key Changes

### No Manual Memoization

```typescript
// ✅ React Compiler handles optimization automatically
function Component({ items }) {
  const filtered = items.filter(x => x.active);
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  const handleClick = (id) => {
    console.log(id);
  };

  return <List items={sorted} onClick={handleClick} />;
}

// ❌ NEVER: Manual memoization (unnecessary now)
const filtered = useMemo(() => items.filter(x => x.active), [items]);
const handleClick = useCallback((id) => console.log(id), []);
```

## Why This Matters

- **Simpler code** - No dependency arrays to maintain
- **Fewer bugs** - No missing dependencies
- **Better performance** - Compiler optimizes automatically
- **Easier to read** - Focus on logic, not optimization

## When Compiler Optimizes

The React Compiler automatically memoizes:
- Derived state (filtered, sorted, computed values)
- Event handlers
- Callbacks passed to child components
- Expensive computations

## Compiler Configuration

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  },
  "plugins": [
    ["babel-plugin-react-compiler"]
  ]
}
```

## Best Practices

1. **Write natural code** - Don't think about optimization
2. **Trust the compiler** - It handles memoization
3. **Focus on logic** - Write clean, readable code
4. **Profile when needed** - Use React DevTools Profiler

## References

- [React Compiler](https://react.dev/learn/react-compiler)
- [React 19 Release](https://react.dev/blog/2024/04/25/react-19)
- [Performance Optimization](https://react.dev/learn/render-and-commit)
