import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CircularProgress from '@mui/material/CircularProgress';

import { AuthContext } from '../contexts/auth.context';
import { useFavorites } from '../contexts/movies.context';
import { Link, useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';

const pages = ['Watchlist', 'History'];

function ResponsiveAppBar() {
  const { user, login, isLoading, logout } = React.useContext(AuthContext);
  const { favorites } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get('search') || '');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchParams({ search });
  }

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalMoviesIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOVIES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/favorites">
                    <Button color="primary">
                      Favorites{' '}
                      {favorites.length ? `(${favorites.length})` : ''}
                    </Button>
                  </Link>
                </MenuItem>
              )}
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalMoviesIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOVIES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user && (
              <Link to="/favorites">
                <Button sx={{ my: 2 }}>
                  Favorites {favorites.length ? `(${favorites.length})` : ''}
                </Button>
              </Link>
            )}

            {/*{pages.map((page) => (*/}
            {/*  <Button*/}
            {/*    key={page}*/}
            {/*    onClick={handleCloseNavMenu}*/}
            {/*    sx={{ my: 2, color: "white", display: "block" }}*/}
            {/*  >*/}
            {/*    {page}*/}
            {/*  </Button>*/}
            {/*))}*/}
          </Box>
          <Box sx={{ flexGrow: 0, paddingRight: '20px' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Search movies"
                variant="standard"
                color="primary"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <UserMenu isLoading={isLoading} login={login} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function UserMenu({
  isLoading,
  login,
}: {
  isLoading: boolean;
  login: (email: string) => void;
}) {
  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <Button
      onClick={() => login('test@gmail.com')}
      color="info"
      variant="contained"
    >
      Login
    </Button>
  );
}

export default ResponsiveAppBar;
