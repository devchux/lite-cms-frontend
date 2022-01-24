import React from "react";
import { Col, Row } from "reactstrap";
import CardTitle from "../../../components/subjects/CardTitle";
import { BeatLoader } from "react-spinners";
import ListTableView from "../../../components/tables/ListTableView";
import { useClasses } from "../../../hooks/useClass";

const Enrol = ({ isEdit, isIndex }) => {
  const { columns, setPage, page, classes, removeClass, loading, fetchByTitle, fetchState } = useClasses(
    isEdit,
    isIndex
  );

  return (
    <>
      <div className="subject-title-wrapper mb-3">
        <Row>
          <Col>
            <CardTitle onClick={() => fetchByTitle('counselling')} isActive={fetchState==='counselling'} title="Counselling" />
          </Col>
          <Col>
            <CardTitle onClick={() => fetchByTitle('guidance')} isActive={fetchState==='guidance'} title="Guidance" />
          </Col>
          <Col>
            <CardTitle onClick={() => fetchByTitle('teaching')} isActive={fetchState==='teaching'} title="Teaching" />
          </Col>
          <Col>
            <CardTitle onClick={() => fetchByTitle('mentorship')} isActive={fetchState==='mentorship'} title="Mentorship" />
          </Col>
        </Row>
      </div>
      {classes.data.length > 0 ? (
        <ListTableView
          noEdit
          data={classes}
          columns={columns}
          modalBody="Are you sure you want to delete class(s)?"
          modalSubmit={removeClass}
          setPage={setPage}
          page={page}
          loading={loading}
        />
      ) : loading ? (
        <center>
          <BeatLoader color="#fff" loading={loading} />
        </center>
      ) : (
        <h5>
          <center>No enrollment yet</center>
        </h5>
      )}
    </>
  );
};

export default Enrol;
