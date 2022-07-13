import React from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const {
    inputs: { email, password, confirmPassword },
    setCredentials,
    showPassword,
    toggleShowPassword,
    submit,
    loading,
  } = useAuth(false, false);
  return (
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
            onChange={({ target: { value } }) => setCredentials("email", value)}
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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={({ target: { value } }) =>
              setCredentials("confirmPassword", value)
            }
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" color="primary" block disabled={loading}>
            {loading ? <BeatLoader color="#fff" /> : "Register"}
          </Button>
        </FormGroup>
      </Form>
      <div className="my-3">
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </PageWrapper>
  );
};

export default Signup;
