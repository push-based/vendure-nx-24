import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from './movie-card'; // Adjust path if necessary
import { IMAGE_PATH } from '../core/image-path';
import { Movie } from '../models/movies.model';

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: '1',
    title: 'Test Movie',
    overview: 'This is a test movie overview.',
    poster_path: '/test-poster.jpg',
    // ... other movie properties
  } as Movie;

  test('renders movie details correctly', () => {
    render(
      <MemoryRouter>
        <MovieCard
          movie={mockMovie}
          isFavorite={false}
          onFavoriteClick={() => void 0}
        />
      </MemoryRouter>
    );

    // Check if title is rendered
    const titleElement = screen.getByText('Test Movie');
    expect(titleElement).toBeInTheDocument();

    // Check if overview is rendered (truncated)
    const overviewElement = screen.getByText(
      'This is a test movie overview....'
    );
    expect(overviewElement).toBeInTheDocument();
  });

  test('renders FavoriteButton when showActions is true', () => {
    render(
      <MemoryRouter>
        <MovieCard
          movie={mockMovie}
          isFavorite={true}
          onFavoriteClick={() => void 0}
          showActions
        />
      </MemoryRouter>
    );

    // Check if FavoriteButton is rendered
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toBeInTheDocument();
  });

  test('does not render FavoriteButton when showActions is false or undefined', () => {
    render(
      <MemoryRouter>
        <MovieCard
          movie={mockMovie}
          isFavorite={true}
          onFavoriteClick={() => void 0}
        />
      </MemoryRouter>
    );

    // Check if FavoriteButton is not rendered
    const favoriteButton = screen.queryByRole('button');
    expect(favoriteButton).toBeNull();
  });

  test('calls onFavoriteClick when FavoriteButton is clicked', () => {
    const onFavoriteClickMock = jest.fn();
    render(
      <MemoryRouter>
        <MovieCard
          movie={mockMovie}
          isFavorite={false}
          onFavoriteClick={onFavoriteClickMock}
          showActions
        />
      </MemoryRouter>
    );

    // Click on the FavoriteButton
    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(onFavoriteClickMock).toHaveBeenCalledTimes(1);
  });
});
