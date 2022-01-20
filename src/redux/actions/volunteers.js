import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const {
  ADD_SINGLE,
  ERROR,
  LOADING,
  FETCH_BULK,
  FETCH_SINGLE,
  DELETE_SINGLE,
  DELETE_BULK,
  UPDATE,
} = actionTypes;

export const fetchAllVolunteers = (payload) => ({
  type: FETCH_BULK,
  payload
})

export const fetchSingleVolunteer = (payload) => ({
  type: FETCH_SINGLE,
  payload
})

export const addVolunteer = (payload) => ({
  type: ADD_SINGLE,
  payload,
});

export const failure = (payload) => ({
  type: ERROR,
  payload,
});

export const loading = () => ({
  type: LOADING,
});

export const deleteSingleVolunteer = (payload) => ({
  type: DELETE_SINGLE,
  payload,
});

export const deleteBulkVolunteers = (payload) => ({
  type: DELETE_BULK,
  payload,
});

export const updateSingleVolunteer = (payload) => ({
  type: UPDATE,
  payload,
});

export const registerVolunteer = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "http://localhost:8000/api/volunteers",
      {
        ...inputs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addVolunteer(data));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error)
      notify("error", error.message);
    }
  }
};

export const getAllVolunteers =
  ({ page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `http://localhost:8000/api/volunteers?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAllVolunteers(data));
    } catch (error) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    }
  };

export const getSingleVolunteer = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.get(
      `http://localhost:8000/api/volunteers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchSingleVolunteer(data));
    return Promise.resolve(data.volunteer);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error)
      notify("error", error.message);
    }
    return Promise.reject(null)
  }
};

export const deleteVolunteer = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.delete(
      `http://localhost:8000/api/volunteers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(deleteSingleVolunteer({ ...data, id }));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error)
      notify("error", error.message);
    }
  }
};

export const deleteVolunteers = (ids) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.delete("http://localhost:8000/api/volunteers", {
      data: { ids },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteBulkVolunteers({ ...data, ids }));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error)
      notify("error", error.message);
    }
  }
};

export const updateVolunteer = (id, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.put(
      `http://localhost:8000/api/volunteers/${id}`,
      { ...inputs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateSingleVolunteer(data));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      console.error(error)
      notify("error", error.message);
    }
  }
};
