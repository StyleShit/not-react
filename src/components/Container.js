import NotReact from "not-react";
import Heading from "./Heading.js";
import Counter from "./Counter.js";

export default function Container(props) {
  console.log("render <Container />");

  return (
    <div>
      <Heading>{props.appTitle}</Heading>
      <Counter />
    </div>
  );
}
