import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import AuthTab from "../../components/tabs/AuthTab";

const Signin = () => {
  const {
    email,
    role,
    password,
    setCredentials,
    submit,
    showPassword,
    toggleShowPassword,
    loading,
    setInputs,
    inputs,
  } = useAuth(true);

  return (
    <Fragment>
      <AuthTab
        role={role}
        onChange={(value) => {
          setInputs({
            ...inputs,
            role: value,
            email:
              value === "admin" ? "test@email.com" : "member-test@email.com",
            password: "1234567",
          });
        }}
      />
      <PageWrapper className="p-4 m-auto">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              required
              type="text"
              name="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={({ target: { value } }) =>
                setCredentials("email", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              required
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
            <Button color="primary" block type="submit" disabled={loading}>
              {loading ? <BeatLoader color="#fff" /> : "Sign in"}
            </Button>
          </FormGroup>
        </Form>
        <div className="my-3">
          <p>
            New to Lite CMS? <Link to="/register">Register</Link>
          </p>
        </div>
      </PageWrapper>
    </Fragment>
  );
};

export default Signin;
