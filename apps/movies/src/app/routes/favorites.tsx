import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/movies.context';
import { Alert, Box, Button, Grid } from '@mui/material';
import MovieCard from '../components/movie-card';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div style={{ padding: '10px' }}>
      <h1>Favorites</h1>
      {favorites.length === 0 && (
        <Alert severity="warning">
          <h3 style={{ margin: 0, paddingBottom: '10px' }}>
            You have no favorites yet.
          </h3>
          <Link to="/">
            <Button variant="outlined" color="warning">
              Go to movies and add some favorites.
            </Button>
          </Link>
        </Alert>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {favorites.length > 0 &&
            favorites
              .filter((movie) => movie?.title)
              .map((movie) => (
                <Grid item xs={12} sm={6} md={3} key={movie.title}>
                  <MovieCard
                    movie={movie}
                    showActions={false}
                    isFavorite={true}
                    onFavoriteClick={() => toggleFavorite(movie)}
                  />
                </Grid>
              ))}
        </Grid>
      </Box>
    </div>
  );
}
