import React from "react";
import { BeatLoader } from "react-spinners";
import AudioPlayer from "react-h5-audio-player";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";
import { useAudios } from "../../../hooks/useAudios";

const AddAudio = ({ isEdit, isIndex }) => {
  const { loading, submit, setCredentials, inputs, uploadAudio, audio } =
    useAudios(isEdit, isIndex);
  return (
    <Row>
      <Col className="my-3" sm={6}>
        <CenteredWrapper>
          <FormGroup>
            <Label htmlFor="audio">Upload Audio<span className="required-label">*</span></Label>
            <Input
              type="file"
              accept="audio/mp3, audio/mpeg"
              name="audio"
              placeholder="Enter Upload Audio"
              onChange={uploadAudio}
            />
            {audio.preview && (
              <div className="my-3">
                <AudioPlayer src={audio.preview} />
              </div>
            )}
          </FormGroup>
        </CenteredWrapper>
      </Col>
      <Col className="my-3" sm={6}>
        <CenteredWrapper>
          <FormGroup>
            <Label htmlFor="title">Subject Title<span className="required-label">*</span></Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter Subject Title"
              disabled={isEdit}
              value={inputs.title}
              onChange={({ target: { value } }) =>
                setCredentials("title", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="audioTitle">Audio Title<span className="required-label">*</span></Label>
            <Input
              type="text"
              name="audioTitle"
              value={inputs.audioTitle}
              placeholder="Enter Audio Title"
              onChange={({ target: { value } }) =>
                setCredentials("audioTitle", value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="audioDescription">Audio Description</Label>
            <textarea
              rows="5"
              className="form-control"
              value={inputs.audioDescription}
              onChange={({ target: { value } }) =>
                setCredentials("audioDescription", value)
              }
            ></textarea>
          </FormGroup>
          <hr />
          <FormGroup className="d-flex justify-content-end">
            <Button color="primary" disabled={loading} onClick={submit}>
              {loading ? <BeatLoader color="#fff" /> : "Save"}
            </Button>
          </FormGroup>
        </CenteredWrapper>
      </Col>
    </Row>
  );
};

export default AddAudio;
