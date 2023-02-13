import Br from "./Br.js";
import Container from "./Container.js";
import { useEffect, useState, useMemo, createElement } from "not-react";

export default function App() {
  console.log("render <App />");

  const [appTitle, setAppTitle] = useState("Initial App Title");

  useEffect(() => {
    const t = setTimeout(() => setAppTitle("New App Title"), 5000);

    return () => clearTimeout(t);
  }, []);

  const memoedValue = useMemo(() => "Memoed Value", []);

  return createElement(
    "div",
    { id: "app-inner" },
    createElement(Container, { appTitle }),
    createElement(Br),
    memoedValue
  );
}
