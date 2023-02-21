import { mount } from "auth/AuthApp";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const AuthApp = ({ onSignIn }) => {
  // Get a reference to the HTML element that
  // the auth app will be mounted to
  const ref = useRef(null);

  // Get a reference to our own BrowserHistory object in container
  const history = useHistory();

  // Make sure the mounting of the auth app
  // only happens once when the container's
  // <AuthApp /> component is first rendered
  useEffect(() => {
    // auth MFE has its own Router which internally
    // uses the MemoryHistory object, which is separate
    // from the BrowserHistory object used by the BrowserRouter
    // in the container's <App /> component. This means that
    // we need auth MemoryHistory to broadcast its changes to
    // our container's BrowserHistory, so that the address bar URL
    // will update when navigating within auth MFE
    const onNavigateAuth = ({ pathname: currentAuthPath }) => {
      history.push(currentAuthPath);
    };

    const { onNavigateContainer } = mount(
      ref.current,
      onNavigateAuth,
      history.location.pathname,
      onSignIn
    );
    history.listen(onNavigateContainer);
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
