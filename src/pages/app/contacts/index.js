import React from "react";
import { BeatLoader } from "react-spinners";
import ListTableView from "../../../components/tables/ListTableView";
import { useContacts } from "../../../hooks/useContacts";

const Contacts = ({ isEdit, isIndex }) => {
  const { columns, setPage, page, contacts, removeContact, loading } = useContacts(
    isEdit,
    isIndex
  );

  return (
    <>
      {contacts.data.length > 0 ? (
        <ListTableView
          data={contacts}
          columns={columns}
          modalBody="Are you sure you want to delete contact(s)?"
          activeHeader="Subject"
          modalSubmit={removeContact}
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
          <center>No message has been received</center>
        </h5>
      )}
    </>
  );
};

export default Contacts;
