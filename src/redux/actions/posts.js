import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const {
  POST_ADD_SINGLE,
  POST_ERROR,
  POST_LOADING,
  POST_FETCH_BULK,
  POST_FETCH_SINGLE,
  POST_DELETE_SINGLE,
  POST_DELETE_BULK,
  POST_UPDATE,
} = actionTypes;

export const addPost = (payload) => ({
  type: POST_ADD_SINGLE,
  payload,
});

export const failure = (payload) => ({
  type: POST_ERROR,
  payload,
});

export const loading = () => ({
  type: POST_LOADING,
});

export const fetchPosts = (payload) => ({
  type: POST_FETCH_BULK,
  payload,
});

export const fetchPost = (payload) => ({
  type: POST_FETCH_SINGLE,
  payload,
});

export const deleteSinglePost = (payload) => ({
  type: POST_DELETE_SINGLE,
  payload,
});

export const deleteBulkPosts = (payload) => ({
  type: POST_DELETE_BULK,
  payload,
});

export const updateSinglePost = (payload) => ({
  type: POST_UPDATE,
  payload,
});

export const registerPost = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "https://lite-cms.herokuapp.com/api/posts",
      {
        ...inputs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addPost(data));
    notify("success", data.message);
  } catch (error) {
    if (error.message) console.error(error.message);
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

export const getAllPosts =
  ({ page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `https://lite-cms.herokuapp.com/api/posts?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchPosts(data));
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

export const getSinglePost = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.get(`https://lite-cms.herokuapp.com/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchPost(data));
    return Promise.resolve(data.article);
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

export const deletePost =
  (id, { page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete(
        `https://lite-cms.herokuapp.com/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllPosts({ page, size }));
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

export const deletePosts =
  (ids, { page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete("https://lite-cms.herokuapp.com/api/posts", {
        data: { ids },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllPosts({ page, size }));
      notify("success", data.message);
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

export const updatePost = (id, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.put(
      `https://lite-cms.herokuapp.com/api/posts/${id}`,
      { ...inputs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateSinglePost(data));
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
