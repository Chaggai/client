import { useNavigate, useRouteError } from "react-router-dom";
import classes from "./styles.module.scss";

export default function ErrorPage() {
  const error: unknown = useRouteError();

  const navigate = useNavigate();

  return (
    <div className={classes.ErrorPage}>
      <h1>Oops!</h1>
      <h2>
        {(error as { status: number }).status === 404
          ? 404
          : "Sorry, an unexpected error has occurred."}
      </h2>
      <i>
        {(error as Error).message ||
          (error as { statusText?: string }).statusText}
      </i>
      <button className={classes.link} onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}
