import { Navigate } from "react-router-dom";
import moviesApi, { Movie } from "../../services/moviesApi";
import MovieForm from "./MovieForm";

type CreateMovieProps = {};

const CreateMovie = ({}: CreateMovieProps) => {
  const initialState: Movie = {
    name: "",
    genres: [],
    image: "",
    premiered: "",
  };

  const [createMovie, { error, isSuccess }] =
    moviesApi.useCreateMovieMutation();

  return (
    <>
      <MovieForm
        buttonText="create"
        movie={initialState}
        click={createMovie}
        error={error as { status: number; data: string }}
      />
      {isSuccess ? <Navigate to="/movies/all" /> : null}
    </>
  );
};

export default CreateMovie;
