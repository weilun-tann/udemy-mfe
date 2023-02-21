import { mount } from "marketing/MarketingApp";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const MarketingApp = () => {
  // Get a reference to the HTML element that
  // the marketing app will be mounted to
  const ref = useRef(null);

  // Get a reference to our own BrowserHistory object in container
  const history = useHistory();

  // Make sure the mounting of the marketing app
  // only happens once when the container's
  // <MarketingApp /> component is first rendered
  useEffect(() => {
    // Marketing MFE has its own Router which internally
    // uses the MemoryHistory object, which is separate
    // from the BrowserHistory object used by the BrowserRouter
    // in the container's <App /> component. This means that
    // we need Marketing MemoryHistory to broadcast its changes to
    // our container's BrowserHistory, so that the address bar URL
    // will update when navigating within Marketing MFE
    const onNavigateMarketing = ({ pathname: currentMarketingPath }) => {
      history.push(currentMarketingPath);
    };

    const { onNavigateContainer } = mount(ref.current, onNavigateMarketing);
    history.listen(onNavigateContainer);
  }, []);

  return <div ref={ref} />;
};

export default MarketingApp;
