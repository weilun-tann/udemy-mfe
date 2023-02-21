import { mount } from "dashboard/DashboardApp";
import React, { useEffect, useRef } from "react";

const DashboardApp = () => {
  // Get a reference to the HTML element that
  // the dashboard app will be mounted to
  const ref = useRef(null);

  // Make sure the mounting of the dashboard app
  // only happens once when the container's
  // <DashboardApp /> component is first rendered
  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default DashboardApp;
