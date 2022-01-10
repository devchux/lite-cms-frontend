import { useState } from "react";
import { useForm } from "./useForm"

export const useAuthForm = (initialState, requiredFields) => {
  const {
    inputs,
    setCredentials,
    isInvalid,
    setInputs
  } = useForm(initialState, requiredFields)
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return {
    inputs,
    setCredentials,
    isInvalid,
    showPassword,
    toggleShowPassword,
    setInputs
  }
}