import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const { LOGIN, ERROR, LOADING } = actionTypes;

export const uploadUserCredentials = (payload) => ({
  type: LOGIN,
  payload,
});

export const failure = (payload) => ({
  type: ERROR,
  payload,
});

export const loginLoading = () => ({
  type: LOADING,
});

export const loginUser = (inputs) => async (dispatch) => {
  const { notify } = useNotification();
  try {
    dispatch(loginLoading());
    const { data } = await axios.post(
      "http://localhost:8000/api/members/login",
      { ...inputs }
    );
    dispatch(uploadUserCredentials(data));
    localStorage.setItem("auth_token", data.member.token);
    return Promise.resolve(null)
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
