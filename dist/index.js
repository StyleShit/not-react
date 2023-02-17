import NotReact from "not-react";
import * as NotReactDOM from "not-react-dom";
import App from "./components/App.js";
NotReactDOM.render(NotReact.createElement(App, null), document.getElementById("app"));