import moment from "moment";
import moviesApi, { MovieDocument } from "../../services/moviesApi";

import classes from "./styles.module.scss";
import Button from "../FormComponents/Button";
import { NavLink } from "react-router-dom";

type MovieCardProps = {
  movie: MovieDocument;
  movieId: string;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const [deleteMovie] = moviesApi.useDeleteMovieMutation();
  return (
    <section className={classes.movieCard}>
      <header>
        <h2 style={{ textTransform: "capitalize" }}>{movie.name}</h2>
      </header>
      <div className={classes.body}>
        <img src={movie.image} alt={movie.name} title={movie.name} />
        {movie.genres.length > 0 ? (
          <div>
            <strong style={{ display: "block" }}>Genres: </strong>
            {typeof movie.genres !== "string" &&
              movie.genres.map((genre) => (
                <span className={classes.tag} key={genre}>
                  {genre.trim()}
                </span>
              ))}
          </div>
        ) : null}
        <div>
          <strong>Premiered: </strong> {moment(movie.premiered).format("ll")}
        </div>
      </div>
      <footer className={classes.footer}>
        <Button
          text="Delete"
          color="red"
          click={() => deleteMovie(movie._id)}
        />
        <NavLink to={`/movies/update/${movie._id}`}>
          {() => <Button text="Update" color="green" />}
        </NavLink>
      </footer>
    </section>
  );
};

export default MovieCard;
