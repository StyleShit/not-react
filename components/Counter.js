import { createElement, useReducer } from "not-react";

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

  return createElement(
    "div",
    {},
    createElement("button", { onClick: () => dispatch("decrement") }, "-"),
    " ",
    count,
    " ",
    createElement("button", { onClick: () => dispatch("increment") }, "+")
  );
}
