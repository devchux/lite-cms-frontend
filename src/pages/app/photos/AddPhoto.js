import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import CenteredWrapper from "../../../components/wrappers/CenteredWrapper";

const AddPhoto = () => {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };
  return (
    <CenteredWrapper>
      <div className="add-photo">
        <label htmlFor="upload-button">
          {image.preview ? (
            <img src={image.preview} alt="" width="300" height="300" />
          ) : (
            <>
              <span className="upload-icon">
                <FontAwesomeIcon icon={faUpload} />
              </span>
              <h5 className="text-center">Upload your photo</h5>
            </>
          )}
        </label>
        <Input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <br />
        <FormGroup className="d-flex justify-content-end">
          <Button color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </FormGroup>
      </div>
    </CenteredWrapper>
  );
};

export default AddPhoto;
