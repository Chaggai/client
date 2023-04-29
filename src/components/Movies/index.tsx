import { useReducer } from "react";
import _ from "lodash";
import moviesApi from "../../services/moviesApi";
import Input from "../FormComponents/Input";

import MovieCard from "./MovieCard";

import classes from "./styles.module.scss";

export type ReducerActions = { search: string };

const ShowAllMovies = () => {
  const { data: movies, isSuccess } = moviesApi.useGetMoviesQuery();

  const initialState = {
    search: "",
  };

  const [state, dispatch] = useReducer(
    (state: typeof initialState, action: ReducerActions) => ({
      ...state,
      ...action,
    }),
    initialState
  );

  const filtered = isSuccess
    ? movies
        .filter((movie) =>
          movie.name.toLowerCase().includes(state.search.toLowerCase())
        )
        .map((movie) => (
          <MovieCard movie={movie} key={movie._id} movieId={movie._id} />
        ))
    : null;

  return (
    <>
      <Input labelText="search" setInput={dispatch} value={state.search} />
      {filtered?.length ? (
        <div className={classes.moviesList}>{filtered}</div>
      ) : (
        <div className={classes.errorMsg}>No movies</div>
      )}
    </>
  );
};

export default ShowAllMovies;
