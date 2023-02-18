import NotReact, { useEffect, useState, useMemo } from "not-react";
import Container from "./Container.js";

export default function App() {
  console.log("render <App />");

  const [appTitle, setAppTitle] = useState("Initial App Title");

  useEffect(() => {
    const t = setTimeout(() => setAppTitle("New App Title"), 5000);

    return () => clearTimeout(t);
  }, []);

  const memoedValue = useMemo(() => "Memoed Value", []);

  return (
    <div id="app-inner" className="app-inner">
      <Container appTitle={appTitle} />
      <br />
      {memoedValue}
    </div>
  );
}
