import { createBrowserHistory, createMemoryHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Host will provide a HTML element
// for us to mount the < App /> component
// belonging to the marketing remote
const mount = (el, onNavigate, initalLocation, onSignIn) => {
  // If in prod, we will use a MemoryHistory and force it to listen
  // to the callback provided by the host container
  let history;

  if (process.env.NODE_ENV === "production" && onNavigate) {
    history = createMemoryHistory({
      initalEntries: [initalLocation],
    });
    history.listen(onNavigate);
  } else {
    history = createBrowserHistory();
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  // Make our own Marketing's MemoryHistory aware of path changes
  // in the host container's BrowserHistory
  return {
    onNavigateContainer({ pathname: currentContainerPath }) {
      const addressBarPath = history.location.pathname;

      if (addressBarPath !== currentContainerPath)
        history.push(currentContainerPath);
    },
  };
};

// If we're in local dev mode and running without a host, then we will mount the <Marketing/> component immediately
if (process.env.NODE_ENV === "development") {
  // Check we're running without a host - in other words, our own HTML template is rendered
  const el = document.querySelector("#root-auth-dev");

  if (el) {
    // Since we're in dev mode, we'll use BrowserHistory
    // so the current path is shown in address bar, and
    // make navigation easier during development/debugging
    mount(el, createBrowserHistory());
  }
}

// Allows hosts to call the mount()
// function to mount the marketing's
// < App /> component
export { mount };
