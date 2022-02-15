import { BeatLoader } from "react-spinners";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Gallery from "../../../components/gallery/Gallery";
import PromptModal from "../../../components/modal/Modal";
import PageWrapper from "../../../components/wrappers/PageWrapper";
import { useEvents } from "../../../hooks/useEvents";

const AddEvent = ({ isEdit, isIndex }) => {
  const {
    loading,
    submit,
    setCredentials,
    inputs,
    openModal,
    selectPhoto,
    toggle,
  } = useEvents(isEdit, isIndex);
  return (
    <Row>
      <Col>
        <Button color="success" onClick={toggle}>
          Upload cover photo
        </Button>
        {inputs.imageUrl && (
          <PageWrapper className="rounded mt-2 p-3">
            <img src={inputs.imageUrl} width="100%" height="300" alt="" />
          </PageWrapper>
        )}
      </Col>
      <Col>
        <PageWrapper className="rounded p-3">
          <FormGroup>
            <Label htmlFor="title">Event title<span className="required-label">*</span></Label>
            <Input
              type="text"
              value={inputs.title}
              placeholder="Enter Event Title"
              name="title"
              onChange={({ target: { value } }) =>
                setCredentials("title", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="venue">Venue<span className="required-label">*</span></Label>
            <Input
              type="text"
              value={inputs.venue}
              placeholder="Enter Event Location"
              name="venue"
              onChange={({ target: { value } }) =>
                setCredentials("venue", value)
              }
            />
          </FormGroup>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="date">Event Date<span className="required-label">*</span></Label>
                <Input
                  type="date"
                  value={inputs.date}
                  placeholder="Enter Event Date"
                  name="date"
                  onChange={({ target: { value } }) =>
                    setCredentials("date", value)
                  }
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="time">Event Time<span className="required-label">*</span></Label>
                <Input
                  type="time"
                  value={inputs.time}
                  placeholder="Enter Event Time"
                  name="time"
                  onChange={({ target: { value } }) =>
                    setCredentials("time", value)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label htmlFor="description">Event description</Label>
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

export default AddEvent;
