import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Host will provide a HTML element
// for us to mount the < App /> component
// belonging to the marketing remote
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// If we're in local dev mode and running without a host, then we will mount the <Marketing/> component immediately
if (process.env.NODE_ENV === "development") {
  // Check we're running without a host - in other words, our own HTML template is rendered
  const el = document.querySelector("#root-marketing-dev");

  if (el) {
    mount(el);
  }
}

// Allows hosts to call the mount()
// function to mount the marketing's
// < App /> component
export { mount };
