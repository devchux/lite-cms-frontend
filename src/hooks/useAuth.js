import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/auth";
import {
  getSingleUser,
  registerUser,
  updateUser,
} from "../redux/actions/users";
import { useAuthForm } from "./useAuthForm";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useAuth = (isLogin, isEdit = false) => {
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const { goTo, paramId } = useNavigation();

  const member = useSelector((state) => state.member);
  const { loading } = useSelector((state) => state.users);
  const initialState = {
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const requiredFields = isLogin
    ? ["email", "password"]
    : ["email", "password", "confirmPassword"];

  const {
    inputs,
    setCredentials,
    showPassword,
    toggleShowPassword,
    setInputs,
    isInvalid: inValidLoginCred,
  } = useAuthForm(initialState, requiredFields);
  const { email, password, confirmPassword } = inputs;

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleUser(paramId)).then((data) => {
        const state = {
          email: data.User.email,
          name: data.name,
          phoneNumber: data.User.phoneNumber,
          password: "",
          confirmPassword: "",
        };
        setInputs(state);
      });
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  const submit = () => {
    if (loading || member.loading) return
    if (inValidLoginCred) return notify("error", "Invalid Credentials");
    if (isLogin) {
      if (loading || member.loading) return
      return dispatch(loginUser({ email, password })).then(() =>
        goTo("/dashboard/posts")
      );
    }
    if (password !== confirmPassword)
      return notify("error", "Passwords do not match");
    if (isEdit) return dispatch(updateUser(paramId, inputs));
    return dispatch(registerUser(inputs));
  };

  return {
    email,
    password,
    setCredentials,
    submit,
    showPassword,
    toggleShowPassword,
    goTo,
    inValid: inValidLoginCred,
    loading: member.loading || loading,
    isLoggedIn: member.isLoggedIn,
    member,
    inputs,
  };
};
