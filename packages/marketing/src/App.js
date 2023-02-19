import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

export default () => {
  return (
    <StylesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};
