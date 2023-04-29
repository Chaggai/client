import { FormEvent, useReducer } from "react";
import { Permission, User } from "../../services/usersApi";
import Input from "../FormComponents/Input";
import classes from "./styles.module.scss";
import Button from "../FormComponents/Button";
import Checkbox from "../FormComponents/Checkbox";
import { UserWithoutPassword } from "./UpdateUser";

type Props = {
  user: UserWithoutPassword | User;
  userId?: string;
  click: any;
  buttonText: "create" | "update";
  error: { status: number; data: string };
};

export type ReducerActions =
  | { firstname: string }
  | { lastname: string }
  | { username: string }
  | { password: string }
  | { permissions: Permission[] };

const UserForm = ({ user, userId, click, buttonText, error }: Props) => {
  const [state, dispatch] = useReducer(
    (state: typeof user, action: ReducerActions) => ({
      ...state,
      ...action,
    }),
    { ...user }
  );

  const inputs = Object.keys(state).map((field, i) => {
    const value = state[field];
    return (
      !(field === "permissions") && (
        <Input
          key={field}
          labelText={field}
          setInput={dispatch}
          value={value}
          focused={i === 0}
          inputType={field === "password" ? "password" : "text"}
          error={
            (error?.data.includes(field) && error?.status === 422) ||
            (error?.status === 409 && field === "username")
              ? error?.data
              : ""
          }
        />
      )
    );
  });

  const togglePermission = (label: Permission) => {
    if (state.permissions.includes(label)) {
      const index = state.permissions.indexOf(label);
      const updatedPerms = [...state.permissions];
      updatedPerms.splice(index, 1);
      dispatch({ permissions: [...updatedPerms] });
    } else {
      dispatch({ permissions: [...state.permissions, label] });
    }
  };

  const perms = [Permission.CREATE, Permission.DELETE];

  const Checkboxes = (
    <ul className={classes.permissions}>
      {perms.map((perm) => (
        <li key={perm}>
          <Checkbox
            label={perm}
            changeEvent={togglePermission}
            checked={state.permissions.some((p) => p === perm)}
          />
        </li>
      ))}
    </ul>
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    click({ id: userId, user: state });
  };

  return (
    <>
      <form
        className={`${classes.card} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <h3>Add User</h3>
        {inputs}

        <h3>Permissions</h3>
        {Checkboxes}

        <div style={{ margin: "auto -10px 5px" }}>
          <Button text={buttonText} color="green" />
        </div>
        {error?.status === 401 && (
          <div className={classes.errorMsg}>
            <strong>Error: </strong>
            {error.data}
          </div>
        )}
      </form>
    </>
  );
};

export default UserForm;
