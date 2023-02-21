import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

export default ({ history }) => {
  return (
    <StylesProvider>
      <Router history={history}>
        <Switch>
          <Route path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </StylesProvider>
  );
};
