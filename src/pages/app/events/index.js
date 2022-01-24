import React from "react";
import { BeatLoader } from "react-spinners";
import ListTableView from "../../../components/tables/ListTableView";
import { useEvents } from "../../../hooks/useEvents";

const Events = ({ isEdit, isIndex }) => {
  const { columns, setPage, page, events, removeEvent, loading } = useEvents(
    isEdit,
    isIndex
  );

  return (
    <>
      {events.data.length > 0 ? (
        <ListTableView
          data={events}
          columns={columns}
          modalBody="Are you sure you want to delete event(s)?"
          activeHeader="Title"
          modalSubmit={removeEvent}
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
          <center>No event has been registered</center>
        </h5>
      )}
    </>
  );
};

export default Events;
