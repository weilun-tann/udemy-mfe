import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Router } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

export default ({ history, onSignIn }) => {
  return (
    <StylesProvider>
      <Router history={history}>
        <Route path="/auth/signin">
          <Signin onSignIn={onSignIn} />
        </Route>
        <Route path="/auth/signup" component={Signup} />
      </Router>
    </StylesProvider>
  );
};
