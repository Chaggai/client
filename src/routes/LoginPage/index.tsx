import { FormEvent, useEffect, useReducer, useState } from "react";

import classes from "./styles.module.scss";

import Input from "../../components/FormComponents/Input";
import Button from "../../components/FormComponents/Button";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import authApi from "../../services/authApi";
import { useNavigate } from "react-router-dom";

export type ReducerActions = { username: string } | { password: string };

const LoginPage = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const [state, dispatch] = useReducer(
    (state: typeof initialState, action: ReducerActions) => ({
      ...state,
      ...action,
    }),
    initialState
  );

  const authDispatch = useDispatch();
  const [login, { error, isLoading }] = authApi.useLoginMutation();

  const [inputError, setInputError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    !error && setInputError(null);
  }, [error]);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { token, user, isAdmin } = await login({
        username: state.username,
        password: state.password,
      }).unwrap();
      authDispatch(setCredentials({ token, user, isAdmin }));
      navigate("/movies/all");
    } catch (error: any) {
      if (error.status === 422) {
        setInputError(error.data);
      } else {
        setServerError(error.data);
      }
    }
  };

  return (
    <main className={classes.container}>
      <section className={classes.loginPage}>
        <header>
          <h1>Login</h1>
        </header>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Input
            value={state.username}
            labelText="username"
            setInput={dispatch}
            focused
            error={inputError?.includes("username") ? inputError : null}
          />
          <Input
            value={state.password}
            labelText="password"
            inputType="password"
            setInput={dispatch}
            error={inputError?.includes("password") ? inputError : null}
          />
          <Button text="login" color="green" />
        </form>
        {serverError ? (
          <div className={classes.errorMsg}>
            <strong>Error: </strong>
            {serverError}
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default LoginPage;
