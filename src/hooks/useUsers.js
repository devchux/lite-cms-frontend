import { useSelector, useDispatch } from "react-redux";
import { deleteUser, deleteUsers, getAllUsers } from "../redux/actions/users";
import { useIndex } from "./useIndex";

export const useUsers = (isIndex) => {
  const columns = [
    {
      Header: "Email Address",
      accessor: "User.email",
    },
    {
      Header: "Full Name",
      accessor: "name",
    },
    {
      Header: "Phone Number",
      accessor: "User.phoneNumber",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Date Created",
      accessor: "createdAt",
    },
    {
      Header: "Date Updated",
      accessor: "updatedAt",
    },
  ];
  const dispatch = useDispatch();
  const { users, deleted, loading } = useSelector((state) => state.users);
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteUser,
    deleteUsers,
    getAllUsers,
    users,
    deleted,
    isIndex,
    loading
  );

  return {
    users,
    columns,
    modalBody,
    removeUser: remove,
    setPage,
    page,
    loading,
  };
};
