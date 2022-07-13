import Signin from "./Signin";
import logo from "../../assets/images/logo.png";
import "./scss/auth.scss";
import Signup from "./Signup";

const Auth = ({ isLogin }) => {
  return (
    <div className="auth-wrapper">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" />
      </div>
      {isLogin ? <Signin /> : <Signup />}
    </div>
  );
};

export default Auth;
