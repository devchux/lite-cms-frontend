import { Redirect, Route, Switch } from "react-router";
import NotFound from "../components/404/NotFound";
import Layout from "../layout";
import { appRoutes } from "./constants";

const AppRoutes = ({ match: { url } }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) return <Redirect to="/signin" />;
  return (
    <Switch>
      <Route
        path="/dashboard"
        exact
        render={() => <Redirect to="/dashboard/posts" />}
      />
      {appRoutes.map(({ path, isEdit, isIndex, component: Component }) => (
        <Route key={path} exact path={`${url}${path}`}>
          <Layout>
            <Component isEdit={isEdit} isIndex={isIndex} />
          </Layout>
        </Route>
      ))}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
