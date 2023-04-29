import { Navigate, useParams } from "react-router-dom";
import _ from "lodash";
import usersApi, { User } from "../../services/usersApi";
import UserForm from "./UserForm";

type Props = {};

export type UserWithoutPassword = Omit<User, "password">;

const UpdateUser = ({}: Props) => {
  const [updateUser, { error, isSuccess: isUpdateSuccess }] =
    usersApi.useUpdateUserMutation();

  let { userId } = useParams();
  if (!userId) return <>404 User not found</>;

  const { data: user, isSuccess } = usersApi.useGetOneUserQuery(userId);
  if (!isSuccess) return <>404 User not found</>;

  const userToUpdate = _.pick(user, [
    "firstname",
    "lastname",
    "username",
    "permissions",
  ]);

  return (
    <>
      <UserForm
        click={updateUser}
        user={userToUpdate}
        userId={userId}
        buttonText="update"
        error={error as { status: number; data: string }}
      />
      {isUpdateSuccess ? <Navigate to="/users/all" /> : null}
    </>
  );
};

export default UpdateUser;
