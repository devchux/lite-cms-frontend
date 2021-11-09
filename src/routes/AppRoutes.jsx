import { Redirect, Route } from "react-router";
import Layout from "../layout";
import { appRoutes } from "./constants";

const AppRoutes = ({ match: { url } }) => {
  console.log(url)
  return (
    <Layout>
      {appRoutes.map(({ path, component: Component }) => (
        <Route key={path} exact path={`${url}${path}`}>
          <Component />
        </Route>
      ))}
      <Route path="/" exact render={() => <Redirect to={`${url}/posts`} />} />
    </Layout>
  );
};

export default AppRoutes;
