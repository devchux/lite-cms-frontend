import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const {
  AUDIO_ADD_SINGLE,
  AUDIO_ERROR,
  AUDIO_LOADING,
  AUDIO_FETCH_BULK,
  AUDIO_FETCH_SINGLE_SUBJECT,
  AUDIO_FETCH_BULK_SUBJECT,
  AUDIO_DELETE_SUBJECT,
  AUDIO_DELETE_SINGLE,
  AUDIO_UPDATE_SUBJECT,
} = actionTypes;

export const fetchAllAudios = (payload) => ({
  type: AUDIO_FETCH_BULK,
  payload,
});

export const fetchAllAudioSubjects = (payload) => ({
  type: AUDIO_FETCH_BULK_SUBJECT,
  payload,
});

export const fetchSingleAudioSubject = (payload) => ({
  type: AUDIO_FETCH_SINGLE_SUBJECT,
  payload,
});

export const addAudio = (payload) => ({
  type: AUDIO_ADD_SINGLE,
  payload,
});

export const failure = (payload) => ({
  type: AUDIO_ERROR,
  payload,
});

export const loading = () => ({
  type: AUDIO_LOADING,
});

export const deleteSingleAudio = (payload) => ({
  type: AUDIO_DELETE_SINGLE,
  payload,
});

export const deleteSingleAudioSubject = (payload) => ({
  type: AUDIO_DELETE_SUBJECT,
  payload,
});

export const updateSingleAudioSubject = (payload) => ({
  type: AUDIO_UPDATE_SUBJECT,
  payload,
});

export const registerAudio = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "https://lite-cms.herokuapp.com/api/audios",
      inputs,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(addAudio(data));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error);
      notify("error", error.message);
      dispatch(failure(error.message));
    }
  }
};

export const getAllAudioSubjects =
  ({ page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `https://lite-cms.herokuapp.com/api/audios/subjects?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data)
      dispatch(fetchAllAudioSubjects(data));
      return Promise.resolve(null);
    } catch (error) {
      if (error.response) {
        dispatch(failure(error.response.data));
        notify("error", error.response.data.message);
      } else {
        console.error(error);
        notify("error", error.message);
        dispatch(failure(error.message));
      }
      return Promise.reject(null);
    }
  };

export const getAllAudios =
  ({ page, size }, slug) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `https://lite-cms.herokuapp.com/api/audios/list/${slug}?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAllAudios(data));
      return Promise.resolve(null);
    } catch (error) {
      if (error.response) {
        dispatch(failure(error.response.data));
        notify("error", error.response.data.message);
      } else {
        console.error(error);
        notify("error", error.message);
        dispatch(failure(error.message));
      }
      return Promise.reject(null);
    }
  };

export const getSingleAudioSubject = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.get(
      `https://lite-cms.herokuapp.com/api/audios/subjects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchSingleAudioSubject(data));
    return Promise.resolve(data.subject);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error);
      notify("error", error.message);
      dispatch(failure(error.message));
    }
    return Promise.reject(null);
  }
};

export const deleteAudio =
  (id, { page, size, slug }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete(
        `https://lite-cms.herokuapp.com/api/audios/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllAudios({ page, size }, slug));
      notify("success", data.message);
    } catch (error) {
      if (error.response) {
        dispatch(failure(error.response.data));
        notify("error", error.response.data.message);
      } else {
        console.error(error);
        notify("error", error.message);
        dispatch(failure(error.message));
      }
    }
  };

export const deleteAudioSubject =
  (id, { page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete(
        `https://lite-cms.herokuapp.com/api/audios/subjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllAudioSubjects({ page, size }));
      notify("success", data.message);
    } catch (error) {
      if (error.response) {
        dispatch(failure(error.response.data));
        notify("error", error.response.data.message);
      } else {
        console.error(error);
        notify("error", error.message);
        dispatch(failure(error.message));
      }
    }
  };

export const updateAudioSubject = (id, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.put(
      `https://lite-cms.herokuapp.com/api/audios/subjects/${id}`,
      { ...inputs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateSingleAudioSubject(data));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error);
      notify("error", error.message);
      dispatch(failure(error.message));
    }
  }
};

export const uploadMoreAudios = (subjectId, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      `https://lite-cms.herokuapp.com/api/audios/${subjectId}`,
      inputs,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    dispatch(addAudio(data));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error);
      notify("error", error.message);
      dispatch(failure(error.message));
    }
  }
};
