import { Button, FormGroup, Input, Label } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";
import { useAuth } from "../../../hooks/useAuth";
import { BeatLoader } from "react-spinners";

const AddUser = ({ isEdit }) => {
  const {
    inputs,
    setCredentials,
    showPassword,
    toggleShowPassword,
    submit,
    loading,
  } = useAuth(false, isEdit);
  return (
    <CenteredWrapper>
      {isEdit && (
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={inputs.name}
            onChange={({ target: { value } }) => setCredentials("name", value)}
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label htmlFor="email">Email Address<span className="required-label">*</span></Label>
        <Input
          type="email"
          placeholder="Enter Email Address"
          name="email"
          value={inputs.email}
          onChange={({ target: { value } }) => setCredentials("email", value)}
        />
      </FormGroup>

      {isEdit && (
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="tel"
            placeholder="Enter Phone Number"
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={({ target: { value } }) =>
              setCredentials("phoneNumber", value)
            }
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label htmlFor="password">Password<span className="required-label">*</span></Label>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={inputs.password}
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
        <Label htmlFor="confirmPassword">Confirm Password<span className="required-label">*</span></Label>
        <Input
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          placeholder="Confirm Password"
          onChange={({ target: { value } }) =>
            setCredentials("confirmPassword", value)
          }
        />
      </FormGroup>
      <hr />
      <FormGroup className="d-flex justify-content-end">
        <Button color="primary" disabled={loading} onClick={submit}>
          {loading ? <BeatLoader color="#fff" /> : "Save"}
        </Button>
      </FormGroup>
    </CenteredWrapper>
  );
};

export default AddUser;
