import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import slug from "slug";
import {
  deleteAudioSubject,
  getAllAudioSubjects,
  getSingleAudioSubject,
  registerAudio,
  updateAudioSubject,
  uploadMoreAudios,
} from "../redux/actions/audios";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useAudios = (isEdit, isIndex) => {
  const { toggle, openModal } = useModal();
  const initialState = {
    title: "",
    audioDescription: "",
    audioTitle: "",
    audio: "",
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
  const { audios, subjects, deleted, loading } = useSelector(
    (state) => state.audios
  );
  const { notify } = useNotification();
  const { paramId } = useNavigation();
  const [audio, setAudio] = useState({ preview: "" });
  const [isEditSubject, setIsEditSubject] = useState(false);
  const [editSubjectInput, setEditSubjectInput] = useState({
    id: "",
    title: "",
  });
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteAudioSubject,
    () => {},
    getAllAudioSubjects,
    subjects,
    deleted,
    isIndex,
    loading
  );

  const { inputs, setCredentials, isInvalid, setInputs } = useForm(
    initialState,
    ["title", "audioTitle", "audio"]
  );

  const uploadAudio = (e) => {
    if (!e.target.files.length) return;
    const fileIsAudio = ["audio/mp3", "audio/mpeg"].includes(
      e.target.files[0].type
    );
    if (!fileIsAudio) return notify("error", "Invalid file format");
    setAudio({ preview: URL.createObjectURL(e.target.files[0])})
    setCredentials('audio', e.target.files[0])
  };

  const submit = () => {
    if (loading) return;
    if (isInvalid) return notify("error", "Enter all fields");
    const formData = new FormData()
    formData.append("title", inputs.title)
    formData.append("slug", slug(inputs.title))
    formData.append("audioTitle", inputs.audioTitle)
    formData.append("audioDescription", inputs.audioDescription)
    formData.append("audio", inputs.audio)
    if (isEdit) {
      dispatch(
        uploadMoreAudios(paramId, formData)
      );
      return;
    }
    dispatch(registerAudio(formData));
  };

  const updateSubject = (id, title) => {
    dispatch(updateAudioSubject(id, { title, slug: slug(title) }));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleAudioSubject(paramId)).then((data) => {
        const format = {
          title: data.title,
          audioDescription: "",
          audioTitle: "",
          audio: "",
          slug: "",
        };
        setInputs(format);
      });
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    audios,
    columns,
    modalBody,
    removeAudioSubject: remove,
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
    uploadAudio,
    audio,
  };
};
