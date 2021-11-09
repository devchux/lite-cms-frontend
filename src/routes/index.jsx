import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Redirect, Route } from "react-router";
import { routes } from "./constants";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            render={(props) => <Component {...props} />}
          />
        ))}
        <Route path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
