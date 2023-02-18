import * as NotReact from "not-react";

let currentApp = null;
let currentRoot = null;

export function render(app = currentApp, root = currentRoot) {
  currentApp = app;
  currentRoot = root;

  const element = renderElement(app);

  root.replaceChildren(element);

  NotReact.setRender(() => render());
}

function renderElement({ type, props = {} }) {
  // Functional component.
  if (typeof type === "function") {
    const element = type(props);

    type = element.type;
    props = element.props;
  }

  const domElement = document.createElement(type);

  Object.entries(props).forEach(([prop, value]) => {
    // Skip children, we'll handle them later.
    if (prop === "children") {
      return;
    }

    // Event listeners.
    if (prop.startsWith("on")) {
      const eventName = prop.substring(2).toLowerCase();

      domElement.addEventListener(eventName, value);

      return;
    }

    // DOM attributes (e.g. `className`, `htmlFor`, etc).
    if (prop in domElement) {
      domElement[prop] = value;

      return;
    }

    // Regular Attributes.
    domElement.setAttribute(prop, value);
  });

  // Render children recursively.
  props.children.forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      domElement.appendChild(document.createTextNode(child));
    } else {
      domElement.appendChild(
        renderElement({ type: child.type, props: child.props })
      );
    }
  });

  return domElement;
}
