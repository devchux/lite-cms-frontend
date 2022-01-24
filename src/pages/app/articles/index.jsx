import React from "react";
import { BeatLoader } from "react-spinners";
import ListTableView from "../../../components/tables/ListTableView";
import { useArticles } from "../../../hooks/useArticles";

const Articles = ({ isEdit, isIndex }) => {
  const { columns, setPage, page, articles, removeUser, loading } = useArticles(
    isEdit,
    isIndex
  );

  return (
    <>
      {articles.data.length > 0 ? (
        <ListTableView
          data={articles}
          columns={columns}
          modalBody="Are you sure you want to delete post(s)?"
          activeHeader="Title"
          modalSubmit={removeUser}
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
          <center>No post yet</center>
        </h5>
      )}
    </>
  );
};

export default Articles;
