import Signin from "./Signin"
import logo from "../../assets/images/logo.png"
import "./scss/auth.scss"

const Auth = () => {
  return (
    <div className="auth-wrapper">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" />
      </div>
      <Signin />
    </div>
  )
}

export default Auth
