import { useReducer } from "react";
import _ from "lodash";
import membersApi from "../../services/membersApi";
import Input from "../FormComponents/Input";

import MemberCard from "./MemberCard";

import classes from "./styles.module.scss";

export type ReducerActions = { search: string };

const ShowAllMembers = () => {
  const { data: members, isSuccess } = membersApi.useGetMembersQuery();

  const initialState = {
    search: "",
  };

  const [state, dispatch] = useReducer(
    (state: typeof initialState, action: ReducerActions) => ({
      ...state,
      ...action,
    }),
    initialState
  );

  const filtered = isSuccess
    ? members
        .filter((member) =>
          member.name.toLowerCase().includes(state.search.toLowerCase())
        )
        .map((member) => (
          <MemberCard member={member} key={member._id} memberId={member._id} />
        ))
    : null;

  return (
    <>
      <Input labelText="search" setInput={dispatch} value={state.search} />
      {filtered?.length ? (
        <div className={classes.membersList}>{filtered}</div>
      ) : (
        <div className={classes.errorMsg}>No members</div>
      )}
    </>
  );
};

export default ShowAllMembers;
