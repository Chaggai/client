import usersApi from "../../services/usersApi";

import UserCard from "./UserCard";

import classes from "./styles.module.scss";

const ShowAllUsers = () => {
  const { data: users, isSuccess } = usersApi.useGetUsersQuery();

  return (
    <div className={classes.usersList}>
      {isSuccess &&
        users.map((user) => (
          <UserCard user={user} key={user._id} userId={user._id} />
        ))}
    </div>
  );
};

export default ShowAllUsers;
