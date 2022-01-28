import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const {
  EVENT_ADD_SINGLE,
  EVENT_ERROR,
  EVENT_LOADING,
  EVENT_FETCH_BULK,
  EVENT_FETCH_SINGLE,
  EVENT_DELETE_SINGLE,
  EVENT_DELETE_BULK,
  EVENT_UPDATE,
} = actionTypes;

export const fetchAllEvents = (payload) => ({
  type: EVENT_FETCH_BULK,
  payload
})

export const fetchSingleEvent = (payload) => ({
  type: EVENT_FETCH_SINGLE,
  payload
})

export const addEvent = (payload) => ({
  type: EVENT_ADD_SINGLE,
  payload,
});

export const failure = (payload) => ({
  type: EVENT_ERROR,
  payload,
});

export const loading = () => ({
  type: EVENT_LOADING,
});

export const deleteSingleEvent = (payload) => ({
  type: EVENT_DELETE_SINGLE,
  payload,
});

export const deleteBulkEvents = (payload) => ({
  type: EVENT_DELETE_BULK,
  payload,
});

export const updateSingleEvent = (payload) => ({
  type: EVENT_UPDATE,
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
      return Promise.resolve(null)
    } catch (error) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
      return Promise.reject(null)
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

export const deleteEvent = (id, { page, size }) => async (dispatch) => {
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
    dispatch(getAllEvents({ page, size }));
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

export const deleteEvents = (ids, { page, size }) => async (dispatch) => {
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
    dispatch(getAllEvents({ page, size }));
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
