import axios from "axios";
import { useNotification } from "../../hooks/useNotification";
import actionTypes from "./types";

const { LOGIN, ERROR, LOADING } = actionTypes;

export const uploadUserCredentials = (payload) => ({
  type: LOGIN,
  payload,
});

export const loginUserFailure = (payload) => ({
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
  } catch (error) {
    dispatch(loginUserFailure(error.response.data));
    notify("error", error.response.data.message);
  }
};
