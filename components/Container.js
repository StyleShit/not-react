import Br from "./Br.js";
import Button from "./Button.js";
import { createElement } from "not-react";
import Heading from "./Heading.js";

export default function Container(props) {
  console.log("render <Container />");

  return createElement(
    "div",
    {},
    createElement(Heading, {}, props.appTitle),
    createElement(Button)
  );
}
