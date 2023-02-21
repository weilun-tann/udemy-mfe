import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Host will provide a HTML element
// for us to mount the < App /> component
// belonging to the dashboard remote
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// If we're in local dev mode and running without a host, then we will mount the <Marketing/> component immediately
if (process.env.NODE_ENV === "development") {
  // Check we're running without a host - in other words, our own HTML template is rendered
  const el = document.querySelector("#root-dashboard-dev");

  if (el) {
    mount(el);
  }
}

// Allows hosts to call the mount()
// function to mount the marketing's
// < App /> component
export { mount };
