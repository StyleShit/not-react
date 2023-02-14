import { createElement } from "not-react";
import Heading from "./Heading.js";
import Counter from "./Counter.js";

export default function Container(props) {
  console.log("render <Container />");

  return createElement(
    "div",
    {},
    createElement(Heading, {}, props.appTitle),
    createElement(Counter)
  );
}
