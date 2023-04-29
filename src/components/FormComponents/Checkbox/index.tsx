import { useState } from "react";

import classes from "./styles.module.scss";

type CheckboxProps = {
  label: string;
  checked: boolean;
  changeEvent: any;
};

const Checkbox = ({ label, checked, changeEvent }: CheckboxProps) => {
  const [focused, setFocused] = useState(false);

  const inputId = label.split(" ").join("");

  return (
    <label className={classes.label} htmlFor={inputId}>
      <input
        className={classes.input}
        type="checkbox"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={() => changeEvent(label)}
        checked={checked}
        id={label.split(" ").join("")}
      />
      <i
        className={`
          ${classes.checkbox}
          ${checked ? classes.checked : ""}
          ${focused ? classes.focused : ""}`}
      ></i>
      {label}
    </label>
  );
};

export default Checkbox;
