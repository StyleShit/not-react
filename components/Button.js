import { useState, createElement } from "not-react";

export default function Button() {
  console.log("render <Button />");

  const [count, setCount] = useState(0);
  const text = "Clicks: " + count;

  return createElement(
    "button",
    {
      onClick: () => setCount((prev) => prev + 1),
    },
    text
  );
}
