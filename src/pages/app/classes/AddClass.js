import React from "react";
import { BeatLoader } from "react-spinners";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";
import { useClasses } from "../../../hooks/useClass";

const AddClass = ({ isEdit, isIndex }) => {
  const { loading, submit, setCredentials, inputs } = useClasses(
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
          placeholder="Enter Phone Number"
          value={inputs.phoneNumber}
          onChange={({ target: { value } }) =>
            setCredentials("phoneNumber", value)
          }
        />
      </FormGroup>
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
      <FormGroup>
        <Label htmlFor="class">Select Class<span className="required-label">*</span></Label>
        <br />
        <Input
          type="radio"
          name="class"
          onChange={() => setCredentials("classTitle", "counselling")}
          checked={inputs.classTitle === "counselling"}
        />{" "}
        Counselling <br />
        <Input
          type="radio"
          name="classTitle"
          onChange={() => setCredentials("classTitle", "guidance")}
          checked={inputs.classTitle === "guidance"}
        />{" "}
        Guidance <br />
        <Input
          type="radio"
          name="classTitle"
          onChange={() => setCredentials("classTitle", "mentorship")}
          checked={inputs.classTitle === "mentorship"}
        />{" "}
        Mentorship <br />
        <Input
          type="radio"
          name="classTitle"
          onChange={() => setCredentials("classTitle", "teaching")}
          checked={inputs.classTitle === "teaching"}
        />{" "}
        Teaching <br />
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

export default AddClass;
