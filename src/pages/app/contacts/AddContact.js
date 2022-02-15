import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";
import { useContacts } from "../../../hooks/useContacts";

const AddContact = ({ isEdit, isIndex }) => {
  const { setCredentials, inputs } = useContacts(
    isEdit,
    isIndex
  );
  return (
    <CenteredWrapper>
      <FormGroup>
        <Label htmlFor="name">Full Name</Label>
        <Input
          disabled
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={inputs.name}
          onChange={({ target: { value } }) => setCredentials("name", value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input
          disabled
          type="email"
          name="email"
          placeholder="Enter Email Address"
          value={inputs.email}
          onChange={({ target: { value } }) => setCredentials("email", value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="subject">Mail Subject</Label>
        <Input
          disabled
          type="text"
          name="subject"
          value={inputs.subject}
          placeholder="Enter Mail Subject"
          onChange={({ target: { value } }) => setCredentials("subject", value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <textarea
          disabled
          className="form-control"
          rows="5"
          name="message"
          placeholder="Message..."
          value={inputs.message}
          onChange={({ target: { value } }) => setCredentials("message", value)}
        ></textarea>
      </FormGroup>
    </CenteredWrapper>
  );
};

export default AddContact;
