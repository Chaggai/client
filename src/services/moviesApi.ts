import { api } from "./api";

export type MovieDocument = {
  _id: string;
  name: string;
  genres: string[] | string;
  image: string;
  premiered: string;
};

export type Movie = Omit<MovieDocument, "_id">;

const moviesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<MovieDocument[], void>({
      query: () => "movies/get/",
      providesTags: ["Movies"],
    }),
    getOneMovie: builder.query<MovieDocument, string>({
      query: (id) => `movies/get/${id}`,
      providesTags: ["Movies"],
    }),
    createMovie: builder.mutation<Movie, { movie: Movie }>({
      query: ({ movie }) => {
        const genres =
          typeof movie.genres === "string"
            ? movie.genres.split(",")
            : movie.genres;
        movie.genres = genres;

        return {
          url: "movies/create/",
          method: "POST",
          body: { ...movie },
        };
      },
      invalidatesTags: ["Movies"],
    }),
    updateMovie: builder.mutation<Movie, { id: string; movie: Movie }>({
      query: ({ id, movie }) => {
        const genres =
          typeof movie.genres === "string"
            ? movie.genres.split(",")
            : movie.genres;
        movie.genres = genres;

        return {
          url: `movies/update/${id}`,
          method: "PUT",
          body: { ...movie },
        };
      },
      invalidatesTags: ["Movies"],
    }),
    deleteMovie: builder.mutation<string, string>({
      query: (id) => ({
        url: `movies/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movies"],
    }),
  }),
  overrideExisting: false,
});

export default moviesApi;
