import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteVolunteer,
  deleteVolunteers,
  getAllVolunteers,
  getSingleVolunteer,
  registerVolunteer,
  updateVolunteer,
} from "../redux/actions/volunteers";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useVolunteers = (isEdit, isIndex) => {
  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  };
  const columns = [
    {
      Header: "Full Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "User.email",
    },
    {
      Header: "Phone Number",
      accessor: "User.phoneNumber",
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
  const { volunteers, deleted, loading } = useSelector((state) => state.volunteers);
  const { notify } = useNotification();
  const { toggle, openModal } = useModal();
  const { paramId } = useNavigation();
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteVolunteer,
    deleteVolunteers,
    getAllVolunteers,
    volunteers,
    deleted,
    isIndex,
    loading
  );

  const { inputs, setCredentials, isInvalid, setInputs } = useForm(
    initialState,
    ["name", "phoneNumber", "message"]
  );

  const submit = () => {
    if (loading) return
    if (isInvalid) return notify("error", "Enter all fields");
    if (isEdit) {
      dispatch(updateVolunteer(paramId, inputs));
      return;
    }
    dispatch(registerVolunteer(inputs));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleVolunteer(paramId)).then((data) => {
        const format = {
          name: data.name,
          email: data.User.email,
          phoneNumber: data.User.phoneNumber,
          message: data.message
        }
        setInputs(format)
      });
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    volunteers,
    columns,
    modalBody,
    removeVolunteer: remove,
    setPage,
    page,
    loading,
    inputs,
    setCredentials,
    submit,
    toggle,
    openModal,
  };
};
