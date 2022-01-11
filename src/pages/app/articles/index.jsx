import React from "react";
import ListTableView from "../../../components/tables/ListTableView";
import { useArticles } from "../../../hooks/useArticles";

const Articles = ({ isEdit, isIndex }) => {
  const { columns, setPage, page, articles, modalBody, removeUser, loading } = useArticles(isEdit, isIndex);

  return (
    <>
      {articles.data.length > 0 ? (
        <ListTableView
          data={articles}
          columns={columns}
          modalBody={modalBody}
          activeHeader="Title"
          modalSubmit={removeUser}
          setPage={setPage}
          page={page}
        />
      ) : loading ? (
        <h5>
          <center>Loading..</center>
        </h5>
      )  : (
        <h5>
          <center>No post yet</center>
        </h5>
      )}
    </>
  );
};

export default Articles;
