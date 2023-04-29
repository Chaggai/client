import { ChangeEvent, Dispatch, useEffect, useRef } from "react";

import classes from "./styles.module.scss";

type InputProps = {
  labelText: string;
  setInput: Dispatch<any>;
  inputType?: "text" | "date" | "password" | "number";
  value: string;
  focused?: boolean;
  error?: string | null;
};

const Input = ({
  labelText,
  setInput,
  inputType = "text",
  value,
  focused = false,
  error,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focused && inputRef.current?.focus();
  }, []);

  useEffect(() => {
    error && inputRef.current?.focus();
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ [labelText]: e.target.value });
  };

  return (
    <label className={classes.label}>
      <div>{labelText}</div>
      <input
        className={error ? classes.error : ""}
        type={inputType}
        ref={inputRef}
        value={value}
        onChange={(e) => handleChange(e)}
      />
      {error && <div className={classes.errorText}>{error}</div>}
    </label>
  );
};

export default Input;
