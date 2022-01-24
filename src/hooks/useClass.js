import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteClass,
  deleteClasses,
  getAllClasses,
  getClassesByTitle,
  getSingleClass,
  registerClass,
  updateClass,
} from "../redux/actions/class";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useClasses = (isEdit, isIndex) => {
  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    classTitle: "",
  };
  const columns = [
    {
      Header: "Full Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Class",
      accessor: "classTitle",
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
  const [fetchState, setFetchState] = useState("");
  const { classes, deleted, loading } = useSelector((state) => state.classes);
  const { notify } = useNotification();
  const { toggle, openModal } = useModal();
  const { paramId } = useNavigation();
  const { remove, page, setPage, modalBody, size } = useIndex(
    dispatch,
    deleteClass,
    deleteClasses,
    getAllClasses,
    classes,
    deleted,
    isIndex,
    loading,
  );

  const { inputs, setCredentials, isInvalid, setInputs } = useForm(
    initialState,
    Object.keys(initialState)
  );

  const submit = () => {
    if (loading) return;
    if (isInvalid) return notify("error", "Enter all fields");
    if (isEdit) {
      dispatch(updateClass(paramId, inputs));
      return;
    }
    dispatch(registerClass(inputs));
  };

  const fetchByTitle = (title) => {
    if (loading) return
    if (title === fetchState) {
      dispatch(getAllClasses({ page: 0, size }));
      setPage(1);
      setFetchState('');
      return;
    }
    dispatch(getClassesByTitle({ page: page - 1, size }, title));
    setFetchState(title);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleClass(paramId)).then((data) => {
        data && setInputs(data);
      });
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    classes,
    columns,
    modalBody,
    removeClass: remove,
    setPage,
    page,
    loading,
    inputs,
    setCredentials,
    submit,
    toggle,
    openModal,
    fetchByTitle,
    fetchState,
  };
};
