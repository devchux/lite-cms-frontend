import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Button, Col, Row } from "reactstrap";
import PromptModal from "../../../components/modal/Modal";
import Pagination from "../../../components/pagination";
import { useSubList } from "../../../hooks/useSubList";
import { deleteVideo, getAllVideos } from "../../../redux/actions/videos";
import "./scss/videoList.scss";

const VideoList = ({ isIndex }) => {
  const {
    data,
    remove,
    setPage,
    page,
    loading,
    openModal,
    toggle,
    showMore,
    toggleShowMore,
  } = useSubList("videos", deleteVideo, () => {}, getAllVideos, isIndex);
  const [id, setId] = useState("");

  return (
    <>
      <Row>
        {data.data.length > 0 ? (
          <>
            {data.data.map(({ id, videoUrl, title, description }) => (
              <Col key={id} className="my-3" sm={6}>
                <div className="video-wrapper">
                  <iframe
                    title={title}
                    width="100%"
                    height="315"
                    src={videoUrl}
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                  <div className="content">
                    <h5>{title}</h5>
                    <span className="show-more" onClick={() => toggleShowMore(!showMore)}>
                      Show More
                    </span>
                    {showMore && (
                      <>
                        <p>{description}</p>
                        <hr />
                        <Button
                          color="danger"
                          disabled={loading}
                          onClick={() => {
                            setId(id);
                            toggle();
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            ))}
            <Pagination
              data={data.data}
              dataLimit={data.total}
              pageLimit={data.totalPages}
              current={data.currentPage}
              setPage={setPage}
              page={page}
            />
          </>
        ) : loading ? (
          <center>
            <BeatLoader color="#fff" />
          </center>
        ) : (
          <center>No video available</center>
        )}
      </Row>
      <PromptModal
        isOpen={openModal}
        toggle={toggle}
        onCancel={toggle}
        body="Are you sure you want to delete video?"
        onSubmit={() => {
          remove(id, false);
          toggle();
        }}
      />
    </>
  );
};

export default VideoList;
