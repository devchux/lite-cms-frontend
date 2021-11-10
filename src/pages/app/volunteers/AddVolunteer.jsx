import React from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";

const AddVolunteer = () => {
  return (
    <CenteredWrapper>
      <FormGroup>
        <Label htmlFor="name">Full Name</Label>
        <Input type="text" name="name" placeholder="Enter Full Name" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input type="email" name="email" placeholder="Enter Email Address" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <textarea
          className="form-control"
          rows="5"
          name="message"
          placeholder="Message..."
        ></textarea>
      </FormGroup>
      <hr />
      <FormGroup className="d-flex justify-content-end">
        <Button color="primary">Save</Button>
      </FormGroup>
    </CenteredWrapper>
  );
};

export default AddVolunteer;
