import { createElement } from "not-react";

export default function Button(props) {
  console.log("render <Button />");

  return createElement("button", {
    onClick: () => props.onClick(),
  });
}
