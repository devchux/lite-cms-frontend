import { BeatLoader } from "react-spinners";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Gallery from "../../../components/gallery/Gallery";
import PromptModal from "../../../components/modal/Modal";
import PageWrapper from "../../../components/wrappers/PageWrapper";
import { useBooks } from "../../../hooks/useBooks";

const AddBook = ({ isEdit, isIndex }) => {
  const {
    loading,
    submit,
    setCredentials,
    inputs,
    openModal,
    selectPhoto,
    toggle,
  } = useBooks(isEdit, isIndex);
  return (
    <Row>
      <Col>
        <Button color="success" onClick={toggle}>
          Upload cover photo
        </Button>
        <PageWrapper className="rounded mt-2 p-3">
          {inputs.imageUrl && (
            <img src={inputs.imageUrl} width="100%" height="300" alt="" />
          )}
        </PageWrapper>
      </Col>
      <Col>
        <PageWrapper className="rounded p-3">
          <FormGroup>
            <Label htmlFor="title">Book title<span className="required-label">*</span></Label>
            <Input
              type="text"
              value={inputs.title}
              placeholder="Enter Book Title"
              name="title"
              onChange={({ target: { value } }) =>
                setCredentials("title", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="author">Author<span className="required-label">*</span></Label>
            <Input
              type="text"
              value={inputs.author}
              placeholder="Enter Author's Full Name"
              name="author"
              onChange={({ target: { value } }) =>
                setCredentials("author", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">Price<span className="required-label">*</span>: (&#8358;)</Label>
            <Input
              type="number"
              value={inputs.price}
              placeholder="Enter Price"
              name="price"
              onChange={({ target: { value } }) =>
                setCredentials("price", +value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Book description</Label>
            <textarea
              rows="5"
              className="form-control"
              value={inputs.description}
              onChange={({ target: { value } }) =>
                setCredentials("description", value)
              }
            ></textarea>
          </FormGroup>
          <hr />
          <FormGroup className="d-flex justify-content-end">
            <Button color="primary" disabled={loading} onClick={submit}>
              {loading ? <BeatLoader color="#fff" /> : "Save"}
            </Button>
          </FormGroup>
        </PageWrapper>
        <PromptModal
          isOpen={openModal}
          toggle={toggle}
          onCancel={toggle}
          body={<Gallery isIndex isModal col={4} onSelect={selectPhoto} />}
          noSubmit
        />
      </Col>
    </Row>
  );
};

export default AddBook;
