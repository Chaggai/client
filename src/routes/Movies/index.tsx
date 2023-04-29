import { NavLink, Outlet } from "react-router-dom";

import classes from "./styles.module.scss";

const Movies = () => {
  return (
    <>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/movies/all"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              All Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies/create "
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Add Movie
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

export default Movies;
