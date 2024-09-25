import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../../core/api-url';
import { Movie } from '../../models/movies.model';

export default function useMovieDetails() {
  // Params
  const { movieId } = useParams();

  // State variables
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_URL}/movies/${movieId}`);

        if (!response.ok) {
          throw new Error('Movie not found'); // Or a more descriptive error
        }

        const data = await response.json();
        setMovie(data);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false); // Always set loading to false, even with errors
      }
    };

    fetchMovie();
  }, [movieId]); // Fetch only when movieId changes

  return { movie, isLoading, error };
}
