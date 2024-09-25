import { Movie } from '../models/movies.model';

export const searchMoviesByTitle = (
  movies: Movie[],
  query?: string | null
): Movie[] => {
  if (!query || query?.length === 0) {
    return movies;
  }

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};
