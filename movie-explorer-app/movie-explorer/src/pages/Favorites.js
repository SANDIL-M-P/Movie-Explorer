import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };

    loadFavorites();
    // Add event listener for storage changes
    window.addEventListener('storage', loadFavorites);

    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  const handleFavoriteChange = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          marginBottom: '30px',
          color: '#333',  // Changed to dark color
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Light background for contrast
          padding: '10px 20px',
          borderRadius: '8px',
          display: 'inline-block'
        }}
      >
        My Favorites
      </Typography>
      
      {favorites.length === 0 ? (
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',  // Made the "no favorites" text more visible
            marginTop: '50px'
          }}
        >
          No favorites added yet
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites;