# Not-React

A straightforward & simple implementation of a [React](https://github.com/facebook/react/)-like library.

Created for fun and learning purposes 🤷‍♀️

## Demo:

You can see a live demo with all of the code [here](https://githubbox.com/StyleShit/not-react).

## Usage:

Basically the same as React, either with or without JSX.

### Without JSX:

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

NotReactDOM.render(createElement(App), document.getElementById("root"));
```

### With JSX:

```js
import NotReact from "not-react";
import * as NotReactDOM from "not-react-dom";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Hello World!</h1>
    </div>
  );
};

NotReactDOM.render(<App />, document.getElementById("root"));
```

> **Note**
>
> Same as React, in order to use JSX, you need to add the `@babel/plugin-transform-react-jsx`
> plugin to your Babel config.
>
> The difference is that you'll need to set the `pragma` option to `NotReact.createElement`
> (see the [.babelrc](./.babelrc)) file), and import `NotReact` instead of `React`.

## Available Hooks:

- `useState`
- `useEffect`
- `useRef`
- `useMemo`
- `useReducer`
- `useCallback`
