import React from 'react';
import { Container, Grid, Typography } from '@mui/material'; // Removed Button import
import MovieCard from '../components/MovieCard';

function FavoritesPage() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <Container sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Typography variant="h5" sx={{ marginBottom: '20px', color: '#333' }}>
        Your Favorite Movies
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ width: '100%', textAlign: 'center' }}>
          No favorite movies yet
        </Typography>
      )}
    </Container>
  );
}

export default FavoritesPage;
