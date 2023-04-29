import { Navigate, useParams } from "react-router-dom";
import _ from "lodash";
import moviesApi from "../../services/moviesApi";
import MovieForm from "./MovieForm";

type Props = {};

const UpdateMovie = ({}: Props) => {
  const [updateMovie, { error, isSuccess: isUpdateSuccess }] =
    moviesApi.useUpdateMovieMutation();

  let { movieId } = useParams();
  if (!movieId) return <>404 Movie not found</>;

  const { data: movie, isSuccess } = moviesApi.useGetOneMovieQuery(movieId);
  if (!isSuccess) return <>404 Movie not found</>;

  const movieToUpdate = _.pick(movie, ["name", "genres", "image", "premiered"]);

  return (
    <>
      <MovieForm
        click={updateMovie}
        movie={movieToUpdate}
        movieId={movieId}
        buttonText="update"
        error={error as { status: number; data: string }}
      />
      {isUpdateSuccess ? <Navigate to="/movies/all" /> : null}
    </>
  );
};

export default UpdateMovie;
