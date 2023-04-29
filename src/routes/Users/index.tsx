import { NavLink, Outlet, useNavigate } from "react-router-dom";

import classes from "./styles.module.scss";
import { useSelector } from "react-redux";
import { selectCurrentIsAdmin } from "../../redux/authSlice";
import { useEffect } from "react";

const Users = () => {
  const isAdmin = useSelector(selectCurrentIsAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/movies/all");
    }
  }, []);

  return (
    <>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/users/all"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users/create "
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Add User
            </NavLink>
          </li>
        </ul>
      </nav>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Users;
