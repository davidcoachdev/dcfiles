// ✅ React 19: No need for useMemo/useCallback
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  // ✅ Automatically memoized by React Compiler
  const handleClick = () => {
    setCount(count + 1);
  };

  // ✅ Automatically memoized by React Compiler
  const expensiveValue = count * 2;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {expensiveValue}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
