import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Container, Box } from '@mui/material';
import axiosInstance from '../api/tmdb';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '50px' }} />;

  return (
    <Container sx={{ marginTop: '40px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
          {movie.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: '10px', textAlign: 'center', maxWidth: '800px' }}>
          {movie.overview}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
          <strong>Genres: </strong>{movie.genres.map((g) => g.name).join(', ')}
        </Typography>
      </Box>
    </Container>
  );
}

export default MovieDetails;
