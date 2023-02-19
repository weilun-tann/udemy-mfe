import { mount } from "marketing/MarketingApp";
import React, { useEffect, useRef } from "react";

const MarketingApp = () => {
  // Get a reference to the HTML element that
  // the marketing app will be mounted to
  const ref = useRef(null);

  // Make sure the mounting of the marketing app
  // only happens once when the container's
  // <MarketingApp /> component is first rendered
  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default MarketingApp;
