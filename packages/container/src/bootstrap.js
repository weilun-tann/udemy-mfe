import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Render the container straightaway
// No need to expose any mount functions since container is automatically
// mounted on startup of the container/host
ReactDOM.render(<App />, document.querySelector("#root"));
