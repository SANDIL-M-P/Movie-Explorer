import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ background: darkMode ? '#1a1a1a' : 'linear-gradient(to right, #1a237e, #0d47a1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <MovieIcon sx={{ fontSize: 32, color: '#fff' }} />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '1px',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Movie Explorer
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ ml: 1 }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button
            component={Link}
            to="/"
            startIcon={<MovieIcon />}
            sx={{
              color: location.pathname === '/' ? '#ff4081' : '#fff',
              '&:hover': {
                color: '#ff4081',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Movies
          </Button>

          <Button
            component={Link}
            to="/favorites"
            startIcon={<FavoriteIcon />}
            sx={{
              color: location.pathname === '/favorites' ? '#ff4081' : '#fff',
              '&:hover': {
                color: '#ff4081',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              fontWeight: location.pathname === '/favorites' ? 'bold' : 'normal',
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Favorites
          </Button>

          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              marginLeft: 2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
