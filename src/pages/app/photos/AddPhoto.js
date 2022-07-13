import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BeatLoader } from "react-spinners";
import { Button, FormGroup, Input, Progress } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";
import { usePhotos } from "../../../hooks/usePhotos";

const AddPhoto = ({ isIndex }) => {
  const { image, handleChange, handleUpload, loading, percent } =
    usePhotos(isIndex);

  return (
    <CenteredWrapper>
      <div className="add-photo">
        <label htmlFor="upload-button">
          <span className="upload-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
          <h5 className="text-center">Upload your photo</h5>
        </label>
        <Input
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <br />
        <Progress value={percent} />
        <br />
        <FormGroup className="d-flex justify-content-end">
          <Button color="primary" disabled={loading} onClick={handleUpload}>
            {loading ? <BeatLoader color="#fff" /> : "Upload"}
          </Button>
        </FormGroup>
        {image.preview ? (
          <div className="preview-wrapper">
            <img src={image.preview} alt="" />
          </div>
        ) : (
          ""
        )}
      </div>
    </CenteredWrapper>
  );
};

export default AddPhoto;
