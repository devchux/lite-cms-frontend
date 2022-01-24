import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardImg, Col, Row } from "reactstrap";
import PageWrapper from "../wrappers/PageWrapper";
import { usePhotos } from "../../hooks/usePhotos";
import PromptModal from "../modal/Modal";
import Pagination from "../pagination";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import ReactTooltip from "react-tooltip";

const Gallery = ({ onSelect, isIndex, isModal, col }) => {
  const { photos, loading, setPage, page, remove } = usePhotos(isIndex);
  const { toggle, openModal } = useModal();
  const [id, setId] = useState("");

  return photos.data.length > 0 ? (
    <PageWrapper className="p-3 gallery">
      <Row>
        {photos.data.map((photo) => (
          <Col sm={col} className="my-3" key={photo.id}>
            <Card>
              <CardImg
                onClick={!isModal ? () => {} : () => onSelect(photo.photoUrl)}
                width="100%"
                height="100px"
                src={photo.photoUrl}
                alt=""
              />
              <CardBody>
                <div className="d-flex justify-content-between">
                  {!isModal && (
                    <span className="delete-icon">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => {
                          setId(photo.id);
                          toggle();
                        }}
                      />
                    </span>
                  )}
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(photo.photoUrl);
                    }}
                    className="copy-icon"
                  >
                    <FontAwesomeIcon data-tip="click to copy" icon={faCopy} />
                  </span>
                  <ReactTooltip />
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        data={photos.data}
        dataLimit={photos.total}
        pageLimit={photos.totalPages}
        current={photos.currentPage}
        setPage={setPage}
        page={page}
      />
      {isIndex && (
        <PromptModal
          isOpen={openModal}
          toggle={toggle}
          onCancel={toggle}
          body="Are you sure you want to delete photo?"
          onSubmit={() => {
            remove(id, false);
            toggle();
          }}
        />
      )}
    </PageWrapper>
  ) : loading ? (
    <center>
      <BeatLoader color="#fff" loading={loading} />
    </center>
  ) : (
    <h5>
      <center>No image uploaded</center>
    </h5>
  );
};

Gallery.defaultProps = {
  index: true,
  isModal: false,
  onSelect: () => {},
  col: 2,
};

export default Gallery;
