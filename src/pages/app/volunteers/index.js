import React from "react";
import { BeatLoader } from "react-spinners";
import ListTableView from "../../../components/tables/ListTableView";
import { useVolunteers } from "../../../hooks/useVolunteers";

const Volunteers = ({ isEdit, isIndex }) => {
  const { columns, setPage, page, volunteers, removeVolunteer, loading } = useVolunteers(
    isEdit,
    isIndex
  );

  return (
    <>
      {volunteers.data.length > 0 ? (
        <ListTableView
          data={volunteers}
          columns={columns}
          modalBody="Are you sure you want to delete volunteer(s)?"
          activeHeader="Full Name"
          modalSubmit={removeVolunteer}
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
          <center>No volunteer has been registered</center>
        </h5>
      )}
    </>
  );
};

export default Volunteers;
