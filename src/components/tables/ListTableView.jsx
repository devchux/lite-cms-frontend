import { useState } from "react";
import { Button } from "reactstrap";
import { useModal } from "../../hooks/useModal";
import PromptModal from "../modal/Modal";
import Pagination from "../pagination";
import TableView from "../tables/TableView";
import PageWrapper from "../wrappers/PageWrapper";

const ListTableView = ({
  data,
  columns,
  activeHeader,
  modalBody,
  modalSubmit,
  setPage,
  page,
  loading,
  noEdit,
  isSubject,
  subject,
  editSubjectInput,
  setEditSubjectInput,
  isEditSubject,
  setIsEditSubject,
  updateSubject,
}) => {
  const { openModal, toggle } = useModal();
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [isBulk, setIsBulk] = useState(false);
  const bulkApply = () => {
    setIsBulk(true);
    toggle();
  };
  const modalConfirm = () => {
    if (isEditSubject) {
      const { id, title } = editSubjectInput;
      updateSubject(id, title);
      toggle();
      return;
    }
    if (isBulk) {
      modalSubmit(selectedRows, isBulk);
    } else {
      modalSubmit(deleteId);
    }
    setIsBulk(false);
    toggle();
  };


  return (
    <div className="list-table-view">
      <div className="list-table-header d-flex gap-2 my-3">
        {!isSubject && (
          <>
            <select>
              <option>Delete</option>
            </select>
            <Button
              color="primary"
              disabled={selectedRows.length === 0}
              onClick={bulkApply}
            >
              Apply
            </Button>
          </>
        )}
      </div>
      <PageWrapper className="rounded">
        <div className="overflow-auto">
          <TableView
            noEdit={noEdit}
            loading={loading}
            modalToggle={toggle}
            data={data.data}
            columns={columns}
            activeHeader={activeHeader}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setDeleteId={setDeleteId}
            isSubject={isSubject}
            subject={subject}
            setEditInput={setEditSubjectInput}
            setIsEditSubject={setIsEditSubject}
          />
        </div>
        <Pagination
          data={data.data}
          dataLimit={data.total}
          pageLimit={data.totalPages}
          current={data.currentPage}
          setPage={setPage}
          page={page}
        />
      </PageWrapper>
      <PromptModal
        isOpen={openModal}
        toggle={toggle}
        onCancel={toggle}
        body={modalBody}
        onSubmit={modalConfirm}
      />
    </div>
  );
};

export default ListTableView;
