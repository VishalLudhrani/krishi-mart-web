import { useState } from "react";

const useInput = (validate) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const hasError = isTouched && !validate(inputValue);
  const isValid = validate(inputValue);

  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const resetHandler = () => {
    setInputValue("");
    setIsTouched(false);
  }

  return {
    inputValue,
    isValid,
    hasError,
    onChange: changeHandler,
    onBlur: blurHandler,
    onReset: resetHandler,
  };
};

export default useInput;
