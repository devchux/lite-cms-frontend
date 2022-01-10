import TextEditor from "../../../components/text-editor/TextEditor";
import PageWrapper from "../../../components/wrappers/PageWrapper";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useArticles } from "../../../hooks/useArticles";
import "./scss/addArticles.scss";

const AddArticles = ({ isEdit }) => {
  const { inputs, setCredentials, createPost } = useArticles(isEdit);

  return (
    <Row className="add-articles">
      <Col xs="12" md="7" className="mb-3">
        <PageWrapper className="rounded p-2">
          <TextEditor
            text={inputs.body}
            handleChange={(value) => setCredentials("body", value)}
          />
        </PageWrapper>
      </Col>
      <Col xs="12" md="5">
        <PageWrapper className="rounded p-1 px-2">
          <FormGroup>
            <Label htmlFor="title">Post title</Label>
            <Input
              type="text"
              value={inputs.title}
              placeholder="Enter Post Title"
              name="title"
              onChange={({ target: { value } }) =>
                setCredentials("title", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="slug">Post slug</Label>
            <Input
              type="text"
              value={inputs.slug}
              placeholder="Enter Post Slug"
              name="slug"
              onChange={({ target: { value } }) =>
                setCredentials("slug", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Button type="button" color="success">
              upload image
            </Button>
          </FormGroup>
          {inputs.imageUrl ? (
            <div className="image-wrapper">
              <img src={inputs.imageUrl} alt="" />
            </div>
          ) : (
            ""
          )}
          <hr />
          <FormGroup>
            <Button
              className="btn-default me-2"
              onClick={() => createPost(false)}
            >
              Save to draft
            </Button>
            <Button color="primary" onClick={() => createPost(true)}>
              Publish
            </Button>
          </FormGroup>
        </PageWrapper>
      </Col>
    </Row>
  );
};

export default AddArticles;
