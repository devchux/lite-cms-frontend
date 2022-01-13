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

export const addUser = (payload) => ({
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

export const fetchUsers = (payload) => ({
  type: FETCH_BULK,
  payload,
});

export const fetchUser = (payload) => ({
  type: FETCH_SINGLE,
  payload,
});

export const deleteSingleUser = (payload) => ({
  type: DELETE_SINGLE,
  payload,
});

export const deleteBulkUsers = (payload) => ({
  type: DELETE_BULK,
  payload,
});

export const updateSingleUser = (payload) => ({
  type: UPDATE,
  payload,
});

export const registerUser = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "http://localhost:8000/api/members",
      {
        ...inputs,
        role: "member",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addUser(data));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      notify("error", error.message);
    }
  }
};

export const getAllUsers =
  ({ page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `http://localhost:8000/api/members?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchUsers(data));
      notify("success", data.message);
    } catch (error) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    }
  };

export const getSingleUser = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.get(
      `http://localhost:8000/api/members/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchUser(data));
    notify("success", data.message);
    return Promise.resolve(data.user);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      notify("error", error.message);
    }
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.delete(
      `http://localhost:8000/api/members/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(deleteSingleUser({ ...data, id }));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      notify("error", error.message);
    }
  }
};

export const deleteUsers = (ids) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.delete("http://localhost:8000/api/members", {
      data: { ids },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteBulkUsers({ ...data, ids }));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      notify("error", error.message);
    }
  }
};

export const updateUser = (id, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.put(
      `http://localhost:8000/api/members/${id}`,
      { ...inputs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateSingleUser(data));
    notify("success", data.message);
  } catch (error) {
    if (error.response) {
      dispatch(failure(error.response.data));
      notify("error", error.response.data.message);
    } else {
      notify("error", error.message);
    }
  }
};
