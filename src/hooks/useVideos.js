import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import slug from "slug";
import {
  deleteVideoSubject,
  getAllVideoSubjects,
  getSingleVideoSubject,
  registerVideo,
  updateVideoSubject,
  uploadMoreVideos,
} from "../redux/actions/videos";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useVideos = (isEdit, isIndex) => {
  const { toggle, openModal } = useModal();
  const initialState = {
    title: "",
    videoDescription: "",
    videoTitle: "",
    videoUrl: "",
    slug: "",
  };
  const columns = [
    {
      Header: "Title",
      accessor: "title",
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
  const { videos, subjects, deleted, loading } = useSelector(
    (state) => state.videos
  );
  const { notify } = useNotification();
  const { paramId, goTo } = useNavigation();
  const [isEditSubject, setIsEditSubject] = useState(false)
  const [editSubjectInput, setEditSubjectInput] = useState({ id: "", title: "" })
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteVideoSubject,
    () => {},
    getAllVideoSubjects,
    subjects,
    deleted,
    isIndex,
    loading
  );

  const { inputs, setCredentials, isInvalid, setInputs } = useForm(
    initialState,
    ["title", "videoTitle", "videoUrl"]
  );

  const submit = () => {
    if (loading) return;
    if (isInvalid) return notify("error", "Enter all fields");
    if (isEdit) {
      dispatch(uploadMoreVideos(paramId, { ...inputs, slug: slug(inputs.title) }));
      goTo('/dashboard/videos')
      return;
    }
    dispatch(registerVideo({ ...inputs, slug: slug(inputs.title) }));
    goTo('/dashboard/videos')
  };

  const updateSubject = (id, title) => {
    dispatch(updateVideoSubject(id, { title, slug: slug(title) }))
  }

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleVideoSubject(paramId)).then((data) => {
        const format = {
          title: data.title,
          videoDescription: "",
          videoTitle: "",
          videoUrl: "",
          slug: "",
        }
        setInputs(format)
      });
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    videos,
    columns,
    modalBody,
    removeVideoSubject: remove,
    setPage,
    page,
    loading,
    inputs,
    setCredentials,
    submit,
    toggle,
    openModal,
    subjects,
    editSubjectInput,
    setEditSubjectInput,
    isEditSubject,
    setIsEditSubject,
    updateSubject,
  };
};
