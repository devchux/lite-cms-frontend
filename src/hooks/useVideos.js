import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteVideo,
  deleteVideos,
  getAllVideos,
  getSingleVideo,
  registerVideo,
  updateVideo,
} from "../redux/actions/videos";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useVideos = (isEdit, isIndex) => {
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
  const { videos, deleted, loading } = useSelector((state) => state.videos);
  const { notify } = useNotification();
  const { toggle, openModal } = useModal();
  const { paramId } = useNavigation();
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteVideo,
    deleteVideos,
    getAllVideos,
    videos,
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
      dispatch(updateVideo(paramId, inputs));
      return;
    }
    dispatch(registerVideo(inputs));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleVideo(paramId)).then((data) => {
        const format = {
          name: data.User.name,
          email: data.User.email,
          phoneNumber: data.User.phoneNumber,
          message: data.message
        }
        setInputs(format)
      });
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    videos,
    columns,
    modalBody,
    removeVideo: remove,
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
