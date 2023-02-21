import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";

// Lazily import the MFE components (AuthApp and MarketingApp)
// Otherwise, the container App.js will load all the MFEs at once
// due to the above imports
const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));

export default () => {
  const [signedIn, setSignedIn] = useState(false);

  const onSignOut = () => {
    setSignedIn(false);
  };

  const onSignIn = () => {
    setSignedIn(true);
  };

  return (
    <BrowserRouter>
      <div>
        <Header signedIn={signedIn} onSignOut={onSignOut} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={onSignIn} />
            </Route>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};
