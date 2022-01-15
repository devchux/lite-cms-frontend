import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import PageWrapper from "../wrappers/PageWrapper";
import { usePhotos } from "../../hooks/usePhotos";
import PromptModal from "../modal/Modal";
import Pagination from "../pagination";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Gallery = ({ onSelect, isIndex, isModal, col }) => {
  const { photos, loading, setPage, page, remove } = usePhotos(isIndex);
  const { toggle, openModal } = useModal();
  const [id, setId] = useState("");
  return (
    <PageWrapper className="p-3 gallery">
      <Row>
        {photos.data.length > 0 ? (
          <>
            {photos.data.map((photo) => (
              <Col sm={col} className="my-3" key={photo.id}>
                <Card
                  onClick={!isModal ? () => {} : () => onSelect(photo.photoUrl)}
                >
                  <CardImg
                    width="100%"
                    height="100px"
                    src={photo.photoUrl}
                    alt=""
                  />
                  <CardBody>
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
                  </CardBody>
                </Card>
              </Col>
            ))}
            <Pagination
              data={photos.data}
              dataLimit={photos.total}
              pageLimit={photos.totalPages}
              current={photos.currentPage}
              setPage={setPage}
              page={page}
            />
          </>
        ) : loading ? (
          <center>
            <BeatLoader loading={loading} />
          </center>
        ) : (
          <h5>
            <center>No images yet</center>
          </h5>
        )}
      </Row>
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
  );
};

Gallery.defaultProps = {
  index: true,
  isModal: false,
  onSelect: () => {},
  col: 2,
};

export default Gallery;
