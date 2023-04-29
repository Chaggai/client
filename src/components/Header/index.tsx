import { useSelector } from "react-redux";
import Avatar from "../Avatar";

import classes from "./styles.module.scss";
import { RootState } from "../../store";

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <header className={classes.header}>
      <h1>Movies</h1>

      <div className={classes.wellcome}>
        Hello, {auth.user}
        <Avatar letter="A" />
      </div>
    </header>
  );
};

export default Header;
