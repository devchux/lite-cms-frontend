import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useAuth } from "../../hooks/useAuth";

const Signin = () => {
  const {
    email,
    password,
    setCredentials,
    submit,
    showPassword,
    toggleShowPassword,
    loading,
  } = useAuth(true);

  return (
    <PageWrapper className="p-4 m-auto">
      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={({ target: { value } }) => setCredentials("email", value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type={!showPassword ? "password" : "text"}
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={({ target: { value } }) =>
            setCredentials("password", value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="checkbox"
          name="showPassword"
          onChange={toggleShowPassword}
          checked={showPassword}
        />{" "}
        <Label htmlFor="showPassword">Show Password</Label>
      </FormGroup>
      <FormGroup>
        <Button color="primary" block onClick={submit} disabled={loading}>
          {loading ? "Loading" : "Sign In"}
        </Button>
      </FormGroup>
    </PageWrapper>
  );
};

export default Signin;
