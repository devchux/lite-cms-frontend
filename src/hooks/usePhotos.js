import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhoto,
  getAllPhotos,
  uploadPhoto,
} from "../redux/actions/photos";
import { useIndex } from "./useIndex";
import { useNotification } from "./useNotification";

export const usePhotos = (isIndex) => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const { notify } = useNotification();
  const dispatch = useDispatch();
  const { loading, photos, deleted } = useSelector((state) => state.photos);
  const [percent, setPercent] = useState(0);

  const handleChange = (e) => {
    if (e.target.files.length) {
      const valid = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ].includes(e.target.files[0].type);
      if (!valid) return notify("error", "Invalid file format");
      setPercent(0);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (loading) return
    const formData = new FormData();
    formData.append("photo", image.raw);
    dispatch(uploadPhoto(formData)).then((percentCompleted) =>
      setPercent(percentCompleted)
    );
  };

  const { remove, size, page, setPage } = useIndex(
    dispatch,
    deletePhoto,
    () => {},
    getAllPhotos,
    photos,
    deleted,
    isIndex,
    loading,
  );
  return {
    image,
    handleChange,
    handleUpload,
    loading,
    percent,
    remove,
    size,
    page,
    setPage,
    photos
  };
};
