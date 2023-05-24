import { FormEvent, useReducer } from "react";
import { Member } from "../../services/membersApi";
import Input from "../FormComponents/Input";
import classes from "./styles.module.scss";
import Button from "../FormComponents/Button";

type Props = {
  member: Member;
  memberId?: string;
  click: any;
  buttonText: "create" | "update";
  error: { status: number; data: string };
};

export type ReducerActions =
  | { name: string }
  | { email: string }
  | { city: string };

const MemberForm = ({ member, memberId, click, buttonText, error }: Props) => {
  const [state, dispatch] = useReducer(
    (state: typeof member, action: ReducerActions) => ({
      ...state,
      ...action,
    }),
    { ...member }
  );

  const inputs = Object.keys(state).map((field, i) => {
    const value = state[field];
    return (
      <Input
        key={field}
        labelText={field}
        setInput={dispatch}
        value={value}
        focused={i === 0}
        inputType={field === "premiered" ? "date" : "text"}
        error={
          (error?.data.includes(field) && error?.status === 422) ||
          (error?.status === 409 && field === "username")
            ? error?.data
            : ""
        }
      />
    );
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    click({ id: memberId, member: state });
  };

  return (
    <>
      <form
        className={`${classes.card} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <h3>Add Member</h3>
        {inputs}

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

export default MemberForm;
