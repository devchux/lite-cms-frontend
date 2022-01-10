import { Redirect, Route } from "react-router";
import Layout from "../layout";
import { appRoutes } from "./constants";

const AppRoutes = ({ match: { url } }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) return <Redirect to="/signin" />;
  return (
    <Layout>
      {appRoutes.map(({ path, isEdit, isIndex, component: Component }) => (
        <Route key={path} exact path={`${url}${path}`}>
          <Component isEdit={isEdit} isIndex={isIndex} />
        </Route>
      ))}
    </Layout>
  );
};

export default AppRoutes;
