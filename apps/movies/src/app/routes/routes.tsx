import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import Favorites from './favorites';
import { Root } from './root';
import Homepage from './homepage';
import MovieDetails from './movies-details/movie-details';
import GuardedRoute from './guarded-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetails />,
      },
      {
        path: 'favorites',
        element: <GuardedRoute children={<Favorites />} />,
      },
    ],
  },
]);
