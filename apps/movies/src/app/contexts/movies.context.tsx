import React, { createContext, useContext, useEffect, useState } from 'react';
import { Movie } from '../models/movies.model';
import { API_URL } from '../core/api-url';

interface MovieContextType {
  movies: Movie[];
  favoritesIds: Record<string, string>; // movieId: id
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (favoriteId: string, movieId: string) => void;
}

const MovieContext = createContext<MovieContextType>({} as MovieContextType);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]); // All movies (fetched from API)
  const [favoritesIds, setFavorites] = useState<Record<string, string>>({});

  // Fetch initial movies (replace with your actual API call)
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${API_URL}/movies`);
      const data = await response.json();
      setMovies(data);
    };
    const fetchFavorites = async () => {
      const response = await fetch(`${API_URL}/favorites`);
      const data = (await response.json()) as { id: string; movieId: string }[];
      setFavorites(
        data.reduce((acc: Record<string, string>, curr) => {
          acc[curr.movieId] = curr.id; // movieId: id
          return acc;
        }, {} as Record<string, string>)
      );
    };

    fetchMovies();
    fetchFavorites();
  }, []);

  // Functions to modify state
  const addToFavorites = async (movie: Movie) => {
    const response = await fetch(`${API_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie.id }),
    });
    const result = (await response.json()) as { id: string; movieId: string };
    setFavorites({ ...favoritesIds, [movie.id]: result.id });
  };

  const removeFromFavorites = async (favoriteId: string, movieId: string) => {
    await fetch(`${API_URL}/favorites/${favoriteId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const newFavorites = { ...favoritesIds };
    delete newFavorites[movieId];
    setFavorites(newFavorites);
  };

  const value = {
    movies,
    favoritesIds,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

// Custom hook for easier context consumption
export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}

export function useFavorites() {
  const { favoritesIds, addToFavorites, removeFromFavorites, movies } =
    useMovies();
  const favorites = movies.filter((movie) => !!favoritesIds[movie.id]);

  const isFavorite = (movie: Movie) => !!favoritesIds[movie.id];

  const toggleFavorite = (movie: Movie) => {
    const favoriteId = favoritesIds[movie.id];
    if (favoriteId) {
      removeFromFavorites(favoriteId, movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return {
    isFavorite,
    favoritesIds,
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };
}
