import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from './favorite-btn';

describe('FavoriteButton', () => {
  test('calls the handleClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<FavoriteButton isFavorite={false} handleClick={handleClick} />);

    const favoriteIcon = screen.getByRole('button');
    fireEvent.click(favoriteIcon);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
