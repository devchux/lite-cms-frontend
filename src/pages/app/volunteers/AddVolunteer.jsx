import React from "react";
import { BeatLoader } from "react-spinners";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";
import { useVolunteers } from "../../../hooks/useVolunteers";

const AddVolunteer = ({ isEdit, isIndex }) => {
  const { loading, submit, setCredentials, inputs } = useVolunteers(
    isEdit,
    isIndex
  );
  return (
    <CenteredWrapper>
      <FormGroup>
        <Label htmlFor="name">Full Name<span className="required-label">*</span></Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={inputs.name}
          onChange={({ target: { value } }) => setCredentials("name", value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="phoneNumber">Phone Number<span className="required-label">*</span></Label>
        <Input
          type="text"
          name="phoneNumber"
          value={inputs.phoneNumber}
          placeholder="Enter Phone Number"
          onChange={({ target: { value } }) =>
            setCredentials("phoneNumber", value)
          }
        />
      </FormGroup>
      {isEdit && (
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={inputs.email}
            onChange={({ target: { value } }) => setCredentials("email", value)}
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <textarea
          className="form-control"
          rows="5"
          name="message"
          placeholder="Message..."
          value={inputs.message}
          onChange={({ target: { value } }) => setCredentials("message", value)}
        ></textarea>
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

export default AddVolunteer;
