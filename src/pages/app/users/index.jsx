import ListTableView from "../../../components/tables/ListTableView";
import { useUsers } from "../../../hooks/useUsers";

const Users = ({ isIndex }) => {
  const { users, columns, modalBody, removeUser, setPage, page, loading } = useUsers(isIndex);

  return (
    <>
      {users.data.length > 0 ? (
        <ListTableView
          data={users}
          columns={columns}
          modalBody={modalBody}
          activeHeader="Full Name"
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
          <center>No user yet</center>
        </h5>
      )}
    </>
  );
};

export default Users;
