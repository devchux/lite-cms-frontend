import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import PageWrapper from "../wrappers/PageWrapper";

const Gallery = ({ onSelect }) => {
  return (
    <PageWrapper className="p-3 gallery">
      <Row>
        <Col sm={2}>
          <Card>
            <CardTitle>
            <span className="delete-icon">
              <FontAwesomeIcon icon={faTrash} /></span>
            </CardTitle>
            <CardImg
              width="100%"
              src="https://res.cloudinary.com/dcrshimso/image/upload/v1639000203/sample.jpg"
              alt=""
            />
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
      {/* <Pagination /> */}
    </PageWrapper>
  );
};

export default Gallery;
