import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEvent,
  deleteEvents,
  getAllEvents,
  getSingleEvent,
  registerEvent,
  updateEvent,
} from "../redux/actions/events";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useEvents = (isEdit, isIndex) => {
  const initialState = {
    title: "",
    imageUrl: "",
    date: "",
    time: "",
    venue: "",
    description: "",
  };
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Event Date",
      accessor: "date",
    },
    {
      Header: "Event Time",
      accessor: "time",
    },
    {
      Header: "Event Venue",
      accessor: "venue",
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
  const { events, deleted, loading } = useSelector((state) => state.events);
  const { notify } = useNotification();
  const { toggle, openModal } = useModal();
  const { paramId } = useNavigation();
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteEvent,
    deleteEvents,
    getAllEvents,
    events,
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
      dispatch(updateEvent(paramId, inputs));
      return;
    }
    dispatch(registerEvent(inputs));
  };

  const selectPhoto = (url) => {
    setCredentials("imageUrl", url);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleEvent(paramId)).then((data) => setInputs(data));
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    events,
    columns,
    modalBody,
    removeEvent: remove,
    setPage,
    page,
    loading,
    inputs,
    setCredentials,
    submit,
    selectPhoto,
    toggle,
    openModal,
  };
};
