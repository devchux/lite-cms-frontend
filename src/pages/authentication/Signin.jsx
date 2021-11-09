import { Button, FormGroup, Input, Label } from "reactstrap"
import PageWrapper from "../../components/wrappers/PageWrapper"

const Signin = () => {
  return (
    <PageWrapper>
      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input type="text" name="email" placeholder="Enter Email Address" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="Enter Password" />
      </FormGroup>
      <FormGroup>
        <Button color="primary" block>Sign In</Button>
      </FormGroup>
    </PageWrapper>
  )
}

export default Signin
