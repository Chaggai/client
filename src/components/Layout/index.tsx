import { Outlet } from "react-router-dom";

import Header from "../Header";
import Navigation from "../Navigation";

import classes from "./styles.module.scss";

const Layout = () => {
  return (
    <>
      <Header />

      <main className={classes.page}>
        <Navigation />

        <div className={classes.outlet}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
