import { useState } from "react";

export const useForm = (initialState, requiredFields) => {
  const [inputs, setInputs] = useState(initialState);

  const setCredentials = (input, value) => {
    setInputs({ ...inputs, [input]: value });
  };

  const getInvalidFields = requiredFields.filter(field => {
    return !inputs[field]
  });
  const isInvalid = getInvalidFields.length >= 1 
  
  return {
    inputs,
    setCredentials,
    setInputs,
    isInvalid
  }
}