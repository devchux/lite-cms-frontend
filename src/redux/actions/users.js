import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const {
  USER_ADD_SINGLE,
  USER_ERROR,
  USER_LOADING,
  USER_FETCH_BULK,
  USER_FETCH_SINGLE,
  USER_DELETE_SINGLE,
  USER_DELETE_BULK,
  USER_UPDATE,
} = actionTypes;

export const addUser = (payload) => ({
  type: USER_ADD_SINGLE,
  payload,
});

export const failure = (payload) => ({
  type: USER_ERROR,
  payload,
});

export const loading = () => ({
  type: USER_LOADING,
});

export const fetchUsers = (payload) => ({
  type: USER_FETCH_BULK,
  payload,
});

export const fetchUser = (payload) => ({
  type: USER_FETCH_SINGLE,
  payload,
});

export const deleteSingleUser = (payload) => ({
  type: USER_DELETE_SINGLE,
  payload,
});

export const deleteBulkUsers = (payload) => ({
  type: USER_DELETE_BULK,
  payload,
});

export const updateSingleUser = (payload) => ({
  type: USER_UPDATE,
  payload,
});

export const registerUser = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "https://lite-cms.herokuapp.com/api/members",
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
      console.error(error);
      notify("error", error.message);
      dispatch(failure(error.message));
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
        `https://lite-cms.herokuapp.com/api/members?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchUsers(data));
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

export const getSingleUser = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.get(
      `https://lite-cms.herokuapp.com/api/members/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchUser(data));
    return Promise.resolve(data.user);
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

export const deleteUser =
  (id, { page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete(
        `https://lite-cms.herokuapp.com/api/members/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllUsers({ page, size }));
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

export const deleteUsers =
  (ids, { page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete("https://lite-cms.herokuapp.com/api/members", {
        data: { ids },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllUsers({ page, size }));
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

export const updateUser = (id, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.put(
      `https://lite-cms.herokuapp.com/api/members/${id}`,
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
      console.error(error);
      notify("error", error.message);
      dispatch(failure(error.message));
    }
  }
};
