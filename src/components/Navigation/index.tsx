import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentIsAdmin } from "../../redux/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectCurrentIsAdmin);

  return (
    <nav className={classes.navigation}>
      <ul className={classes.linkList}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.link} ${classes.active}` : classes.link
            }
            to="/movies/all"
          >
            Movies
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.link} ${classes.active}` : classes.link
            }
            to="/members/all"
          >
            Members
          </NavLink>
        </li>

        {isAdmin ? (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
              to="/users/all"
            >
              Users
            </NavLink>
          </li>
        ) : null}

        <li className={classes.logoutButton}>
          <button className={classes.logout} onClick={() => dispatch(logout())}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
