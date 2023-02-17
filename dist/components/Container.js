import NotReact from "not-react";
import Heading from "./Heading.js";
import Counter from "./Counter.js";
export default function Container(props) {
  console.log("render <Container />");
  return NotReact.createElement("div", null, NotReact.createElement(Heading, null, props.appTitle), NotReact.createElement(Counter, null));
}