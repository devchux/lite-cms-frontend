import { Button, FormGroup, Input, Label } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";

const AddUser = () => {
  return (
    <CenteredWrapper>
      <FormGroup>
        <Label htmlFor="name">Full Name</Label>
        <Input type="text" name="name" placeholder="Enter Full Name" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input type="email" placeholder="Enter Email Address" name="email" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="Enter Password" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password2">Confirm Password</Label>
        <Input
          type="password"
          name="password2"
          placeholder="Confirm Password"
        />
      </FormGroup>
      <hr />
      <FormGroup className="d-flex justify-content-end">
        <Button color="primary">Save</Button>
      </FormGroup>
    </CenteredWrapper>
  );
};

export default AddUser;
