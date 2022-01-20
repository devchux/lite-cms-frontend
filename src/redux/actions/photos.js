import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const {
  PHOTO_ADD_SINGLE,
  PHOTO_ERROR,
  PHOTO_LOADING,
  PHOTO_FETCH_BULK,
  PHOTO_DELETE_SINGLE,
} = actionTypes;

export const fetchAllPhotos = (payload) => ({
  type: PHOTO_FETCH_BULK,
  payload,
});

export const deleteSinglePhoto = (payload) => ({
  type: PHOTO_DELETE_SINGLE,
  payload,
});

export const addSinglePhoto = (payload) => ({
  type: PHOTO_ADD_SINGLE,
  payload,
});

export const failure = (payload) => ({
  type: PHOTO_ERROR,
  payload,
});

export const loading = () => ({
  type: PHOTO_LOADING,
});

export const uploadPhoto = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  let percentCompleted = 0;
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "http://localhost:8000/api/photos",
      inputs,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress(progressEvent) {
          percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        },
      }
    );
    dispatch(addSinglePhoto(data));
    notify("success", data.message);
    return Promise.resolve(percentCompleted);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error);
      notify("error", error.message);
    }
    return Promise.reject(null);
  }
};

export const getAllPhotos =
  ({ page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `http://localhost:8000/api/photos?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAllPhotos(data));
    } catch (error) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    }
  };

export const deletePhoto = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.delete(
      `http://localhost:8000/api/photos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(deleteSinglePhoto({ ...data, id }));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error);
      notify("error", error.message);
    }
  }
};
