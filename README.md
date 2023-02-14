# Not-React

A straightforward & simple implementation of a [React](https://github.com/facebook/react/)-like library.

Created for fun and learning purposes 🤷‍♀️

## Demo:

You can see a live demo with all of the code [here](https://githubbox.com/StyleShit/not-react).

> **Note**
>
> This demo might not work on older browsers due to the use of [ES6 modules](https://caniuse.com/#feat=es6-module)
> and [Import Maps](https://caniuse.com/#feat=import-maps) (it was basically for fun).
> I've added a [polyfill](https://github.com/guybedford/es-module-shims) for the import maps,
> but it doesn't work properly.

## Usage:

Basically the same as React, without the JSX.

```js
import * as NotReactDOM from "not-react-dom";
import { createElement, useState } from "not-react";

const App = () => {
  const [count, setCount] = useState(0);

  return createElement(
    "div",
    { className: "app" },
    createElement("h1", {}, "Hello World!")
  );
};

NotReactDOM.render(App, document.getElementById("root"));
```

## Available Hooks:

- `useState`
- `useEffect`
- `useRef`
- `useMemo`
