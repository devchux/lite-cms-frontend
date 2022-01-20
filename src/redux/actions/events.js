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

export const fetchAllEvents = (payload) => ({
  type: FETCH_BULK,
  payload
})

export const fetchSingleEvent = (payload) => ({
  type: FETCH_SINGLE,
  payload
})

export const addEvent = (payload) => ({
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

export const deleteSingleEvent = (payload) => ({
  type: DELETE_SINGLE,
  payload,
});

export const deleteBulkEvents = (payload) => ({
  type: DELETE_BULK,
  payload,
});

export const updateSingleEvent = (payload) => ({
  type: UPDATE,
  payload,
});

export const registerEvent = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "http://localhost:8000/api/events",
      {
        ...inputs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addEvent(data));
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

export const getAllEvents =
  ({ page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `http://localhost:8000/api/events?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAllEvents(data));
    } catch (error) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    }
  };

export const getSingleEvent = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.get(
      `http://localhost:8000/api/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchSingleEvent(data));
    return Promise.resolve(data.event);
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

export const deleteEvent = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.delete(
      `http://localhost:8000/api/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(deleteSingleEvent({ ...data, id }));
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

export const deleteEvents = (ids) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.delete("http://localhost:8000/api/events", {
      data: { ids },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteBulkEvents({ ...data, ids }));
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

export const updateEvent = (id, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.put(
      `http://localhost:8000/api/events/${id}`,
      { ...inputs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateSingleEvent(data));
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
