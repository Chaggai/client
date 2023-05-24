import { NavLink, Outlet } from "react-router-dom";

import classes from "./styles.module.scss";

const Members = () => {
  return (
    <>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/members/all"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              All Members
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/members/create "
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Add Member
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

export default Members;
