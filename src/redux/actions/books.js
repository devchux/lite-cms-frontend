import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const {
  BOOK_ADD_SINGLE,
  BOOK_ERROR,
  BOOK_LOADING,
  BOOK_FETCH_BULK,
  BOOK_FETCH_SINGLE,
  BOOK_DELETE_SINGLE,
  BOOK_DELETE_BULK,
  BOOK_UPDATE,
} = actionTypes;

export const fetchAllBooks = (payload) => ({
  type: BOOK_FETCH_BULK,
  payload,
});

export const fetchSingleBook = (payload) => ({
  type: BOOK_FETCH_SINGLE,
  payload,
});

export const addBook = (payload) => ({
  type: BOOK_ADD_SINGLE,
  payload,
});

export const failure = (payload) => ({
  type: BOOK_ERROR,
  payload,
});

export const loading = () => ({
  type: BOOK_LOADING,
});

export const deleteSingleBook = (payload) => ({
  type: BOOK_DELETE_SINGLE,
  payload,
});

export const deleteBulkBooks = (payload) => ({
  type: BOOK_DELETE_BULK,
  payload,
});

export const updateSingleBook = (payload) => ({
  type: BOOK_UPDATE,
  payload,
});

export const registerBook = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.post(
      "https://lite-cms.herokuapp.com/api/books",
      {
        ...inputs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addBook(data));
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

export const getAllBooks =
  ({ page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `https://lite-cms.herokuapp.com/api/books?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAllBooks(data));
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

export const getSingleBook = (id) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.get(`https://lite-cms.herokuapp.com/api/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchSingleBook(data));
    return Promise.resolve(data.book);
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

export const deleteBook =
  (id, { page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete(
        `https://lite-cms.herokuapp.com/api/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllBooks({ page, size }));
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

export const deleteBooks =
  (ids, { page, size }) =>
  async (dispatch) => {
    const { notify } = useNotification();
    const token = localStorage.getItem("auth_token");
    try {
      dispatch(loading());
      const { data } = await axios.delete("https://lite-cms.herokuapp.com/api/books", {
        data: { ids },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllBooks({ page, size }));
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

export const updateBook = (id, inputs) => async (dispatch) => {
  const { notify } = useNotification();
  const token = localStorage.getItem("auth_token");
  try {
    dispatch(loading());
    const { data } = await axios.put(
      `https://lite-cms.herokuapp.com/api/books/${id}`,
      { ...inputs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateSingleBook(data));
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
