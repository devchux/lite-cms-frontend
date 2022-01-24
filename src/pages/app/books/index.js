import React from "react";
import { BeatLoader } from "react-spinners";
import ListTableView from "../../../components/tables/ListTableView";
import { useBooks } from "../../../hooks/useBooks";

const Books = ({ isEdit, isIndex }) => {
  const { columns, setPage, page, books, removeBook, loading } = useBooks(
    isEdit,
    isIndex
  );

  return (
    <>
      {books.data.length > 0 ? (
        <ListTableView
          data={books}
          columns={columns}
          modalBody="Are you sure you want to delete book(s)?"
          activeHeader="Title"
          modalSubmit={removeBook}
          setPage={setPage}
          page={page}
        />
      ) : loading ? (
        <center>
          <BeatLoader color="#fff" loading={loading} />
        </center>
      ) : (
        <h5>
          <center>No book has been registered</center>
        </h5>
      )}
    </>
  );
};

export default Books;
