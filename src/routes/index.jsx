import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Redirect, Route } from "react-router";
import { routes } from "./constants";
import NotFound from "../components/404/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
        {routes.map(({ path, component: Component, isLogin }) => (
          <Route
            key={path}
            path={path}
            render={(props) => <Component {...props} isLogin={isLogin} />}
          />
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
