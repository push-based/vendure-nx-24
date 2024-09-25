import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Movie } from '../models/movies.model';
import { Link } from 'react-router-dom';
import { IMAGE_PATH } from '../core/image-path';
import FavoriteButton from './favorite-btn';

export default function MovieCard({
  movie,
  showActions,
  isFavorite,
  onFavoriteClick,
}: {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  showActions?: boolean;
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          sx={{ height: 300 }}
          image={IMAGE_PATH + movie.poster_path}
          title={movie.title}
          style={{ backgroundPosition: 'top' }}
        />
      </Link>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview.substring(0, 100) + '...'}
        </Typography>
      </CardContent>
      {showActions && (
        <CardActions>
          <FavoriteButton
            isFavorite={isFavorite}
            handleClick={onFavoriteClick}
          />
        </CardActions>
      )}
    </Card>
  );
}
