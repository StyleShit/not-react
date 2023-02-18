import NotReact, { useCallback, useReducer } from "not-react";

export default function Counter() {
  console.log("render <Counter />");

  const [count, dispatch] = useReducer((action, prev) => {
    switch (action) {
      case "increment":
        return prev + 1;
      case "decrement":
        return prev - 1;
      default:
        return prev;
    }
  }, 0);

  // There is no reason to use `useCallback` here, it's just for demonstration.
  const increment = useCallback(() => dispatch("increment"), []);
  const decrement = useCallback(() => dispatch("decrement"), []);

  return (
    <div>
      <button onClick={decrement}>-</button>
      {` ${count} `}
      <button onClick={increment}>+</button>
    </div>
  );
}
