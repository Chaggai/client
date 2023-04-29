import moment from "moment";
import usersApi, { UserDocument } from "../../services/usersApi";

import classes from "./styles.module.scss";
import Button from "../FormComponents/Button";
import { NavLink } from "react-router-dom";

type UserCardProps = {
  user: UserDocument;
  userId: string;
};

const UserCard = ({ user }: UserCardProps) => {
  const [deleteUser] = usersApi.useDeleteUserMutation();
  return (
    <section className={classes.userCard}>
      <header>
        <h2 style={{ textTransform: "capitalize" }}>
          {user.firstname} {user.lastname}
        </h2>
      </header>
      <div className={classes.body}>
        <ul>
          <li>
            <strong>Username: </strong> {user.username}
          </li>
          <li>
            <strong>Created at: </strong> {moment(user.createdAt).format("LL")}
          </li>
          {user.permissions.length > 0 ? (
            <li>
              <strong>Permissions: </strong>
              <ul>
                {user.permissions.map((per) => (
                  <li style={{ textTransform: "uppercase" }} key={per}>
                    {per}
                  </li>
                ))}
              </ul>
            </li>
          ) : null}
        </ul>
      </div>
      <footer className={classes.footer}>
        <Button text="Delete" color="red" click={() => deleteUser(user._id)} />
        <NavLink to={`/users/update/${user._id}`}>
          {() => <Button text="Update" color="green" />}
        </NavLink>
      </footer>
    </section>
  );
};

export default UserCard;
