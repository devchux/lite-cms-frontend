import ListTableView from "../../../components/tables/ListTableView";
import { useUsers } from "../../../hooks/useUsers";
import { BeatLoader } from "react-spinners";

const Users = ({ isIndex }) => {
  const { users, columns, removeUser, setPage, page, loading } =
    useUsers(isIndex);

  return (
    <>
      {users.data.length > 0 ? (
        <ListTableView
          data={users}
          columns={columns}
          modalBody="Are you sure you want to delete user(s)?"
          activeHeader="Email Address"
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
          <center>No user yet</center>
        </h5>
      )}
    </>
  );
};

export default Users;
