import { IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';

export default function FavoriteButton({
  isFavorite,
  handleClick,
}: {
  isFavorite: boolean;
  handleClick: () => void;
}) {
  return (
    <IconButton size="small" color="inherit" onClick={handleClick}>
      <Favorite color={isFavorite ? 'secondary' : 'inherit'} />
    </IconButton>
  );
}
