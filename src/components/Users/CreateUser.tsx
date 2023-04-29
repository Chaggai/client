import { Navigate } from "react-router-dom";
import usersApi, { User } from "../../services/usersApi";
import UserForm from "./UserForm";
import { useEffect, useState } from "react";

type CreateUserProps = {};

const CreateUser = ({}: CreateUserProps) => {
  const initialState: User = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    permissions: [],
  };

  const [createUser, { error, isSuccess }] = usersApi.useCreateUserMutation();

  return (
    <>
      <UserForm
        buttonText="create"
        user={initialState}
        click={createUser}
        error={error as { status: number; data: string }}
      />
      {isSuccess ? <Navigate to="/users/all" /> : null}
    </>
  );
};

export default CreateUser;
