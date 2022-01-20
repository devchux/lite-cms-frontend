import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  deleteContacts,
  getAllContacts,
  getSingleContact,
  registerContact,
  updateContact,
} from "../redux/actions/contacts";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useContacts = (isEdit, isIndex) => {
  const initialState = {
    name: "",
    email: "",
    Subject: "",
    message: "",
  };
  const columns = [
    {
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Full Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
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
  const { contacts, deleted, loading } = useSelector((state) => state.contacts);
  const { notify } = useNotification();
  const { toggle, openModal } = useModal();
  const { paramId } = useNavigation();
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteContact,
    deleteContacts,
    getAllContacts,
    contacts,
    deleted,
    isIndex,
    loading
  );

  const { inputs, setCredentials, isInvalid, setInputs } = useForm(
    initialState,
    Object.keys(initialState)
  );

  const submit = () => {
    if (loading) return
    if (isInvalid) return notify("error", "Enter all fields");
    if (isEdit) {
      dispatch(updateContact(paramId, inputs));
      return;
    }
    dispatch(registerContact(inputs));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleContact(paramId)).then((data) => {
        data && setInputs(data)
      });
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    contacts,
    columns,
    modalBody,
    removeContact: remove,
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
