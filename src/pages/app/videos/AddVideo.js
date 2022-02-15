import React from "react";
import { BeatLoader } from "react-spinners";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";
import { useVideos } from "../../../hooks/useVideos";

const AddVideo = ({ isEdit, isIndex }) => {
  const { loading, submit, setCredentials, inputs } = useVideos(
    isEdit,
    isIndex
  );
  return (
    <CenteredWrapper>
      <FormGroup>
        <Label htmlFor="title">Subject Title<span className="required-label">*</span></Label>
        <Input
          type="text"
          name="title"
          placeholder="Enter Subject Title"
          value={inputs.title}
          disabled={isEdit}
          onChange={({ target: { value } }) => setCredentials("title", value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="videoTitle">Video Title<span className="required-label">*</span></Label>
        <Input
          type="text"
          name="videoTitle"
          value={inputs.videoTitle}
          placeholder="Enter Video Title"
          onChange={({ target: { value } }) =>
            setCredentials("videoTitle", value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="videoUrl">Video Url<span className="required-label">*</span></Label>
        <Input
          type="text"
          name="videoUrl"
          value={inputs.videoUrl}
          placeholder="Enter Video Url"
          onChange={({ target: { value } }) =>
            setCredentials("videoUrl", value)
          }
        />
      </FormGroup>
          <FormGroup>
            <Label htmlFor="videoDescription">Video Description</Label>
            <textarea
              rows="5"
              className="form-control"
              value={inputs.videoDescription}
              onChange={({ target: { value } }) =>
                setCredentials("videoDescription", value)
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
  );
};

export default AddVideo;
