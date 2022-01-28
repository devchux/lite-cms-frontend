import React from "react";
import { BeatLoader } from "react-spinners";
import { Input } from "reactstrap";
import ListTableView from "../../../components/tables/ListTableView";
import { useVideos } from "../../../hooks/useVideos";

const Videos = ({ isEdit, isIndex }) => {
  const {
    columns,
    setPage,
    page,
    subjects,
    removeVideoSubject,
    loading,
    editSubjectInput,
    setEditSubjectInput,
    isEditSubject,
    setIsEditSubject,
    updateSubject,
  } = useVideos(isEdit, isIndex);

  return (
    <>
      {subjects.data.length > 0 ? (
        <ListTableView
          isSubject
          subject="videos"
          data={subjects}
          columns={columns}
          modalBody={
            !isEditSubject ? (
              "Are you sure you want to delete subject(s)?"
            ) : (
              <Input
                type="text"
                value={editSubjectInput.title}
                onChange={({ target: { value } }) =>
                  setEditSubjectInput({ ...editSubjectInput, title: value })
                }
              />
            )
          }
          activeHeader="Title"
          modalSubmit={removeVideoSubject}
          setPage={setPage}
          page={page}
          loading={loading}
          editSubjectInput={editSubjectInput}
          setEditSubjectInput={setEditSubjectInput}
          isEditSubject={isEditSubject}
          setIsEditSubject={setIsEditSubject}
          updateSubject={updateSubject}
        />
      ) : loading ? (
        <center>
          <BeatLoader color="#fff" loading={loading} />
        </center>
      ) : (
        <h5>
          <center>No subject has been registered</center>
        </h5>
      )}
    </>
  );
};

export default Videos;
