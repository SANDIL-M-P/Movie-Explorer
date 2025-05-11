import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '../context/ThemeContext';

function MovieCard({ movie, onFavoriteChange }) {
  const { darkMode } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let newFavoriteStatus = !isFavorite;
    
    if (newFavoriteStatus) {
      // Add to favorites
      favorites.push(movie);
    } else {
      // Remove from favorites
      favorites = favorites.filter(fav => fav.id !== movie.id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(newFavoriteStatus);
    
    // Notify parent component about the change
    if (onFavoriteChange) {
      onFavoriteChange(favorites);
    }
  };

  // Safe function to format the release date
  const formatReleaseDate = (dateString) => {
    if (!dateString) return '';
    
    // Handle different date formats safely
    try {
      // If it's already a properly formatted date string (YYYY-MM-DD)
      if (typeof dateString === 'string') {
        return dateString;
      }
      
      // If it's a number (just a year)
      if (typeof dateString === 'number') {
        return dateString.toString();
      }
      
      // If it's some other type that could be stringified
      return String(dateString);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{
        backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        }
      }}>
        <Link to={`/movie/${movie.id}`}>
          <CardMedia
            component="img"
            alt={movie.title}
            height="350"
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            sx={{
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px'
            }}
          />
        </Link>
        <CardContent sx={{ padding: '16px' }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: darkMode ? '#fff' : '#000000'  // Added dark/light mode color
            }}
          >
            {movie.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'  // Added dark/light mode color
            }}
          >
            {formatReleaseDate(movie.release_date)} | Rating: {movie.vote_average}
          </Typography>
        </CardContent>
        <Button 
          onClick={handleFavorite} 
          variant="contained" 
          startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          sx={{
            margin: '10px 16px 16px',
            width: 'calc(100% - 32px)',
            backgroundColor: isFavorite ? '#f50057' : darkMode ? 'rgba(255, 255, 255, 0.2)' : '#1976d2',  // Updated button color
            color: '#fff',
            '&:hover': {
              backgroundColor: isFavorite ? '#c51162' : darkMode ? 'rgba(255, 255, 255, 0.3)' : '#1565c0',  // Updated hover color
            }
          }}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card>
    </Grid>
  );
}

export default MovieCard;