import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from './MovieCard';

function MoviesGrid({ movies }) {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <Grid container spacing={4}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  );
}

export default MoviesGrid;
