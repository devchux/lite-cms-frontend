import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import PageWrapper from "../../../components/wrappers/PageWrapper";

const AddVolunteer = () => {
  return (
    <Row>
      <Col md="8">
        <PageWrapper>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type="text" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input type="email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <textarea className="form-control"></textarea>
          </FormGroup>
        </PageWrapper>
      </Col>
      <Col md="4"></Col>
    </Row>
  );
};

export default AddVolunteer;
