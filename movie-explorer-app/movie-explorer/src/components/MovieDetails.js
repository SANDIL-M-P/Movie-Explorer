import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Container, Box, Grid, Button, Paper } from '@mui/material';
import axiosInstance from '../api/tmdb';
import { useTheme } from '../context/ThemeContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function MovieDetails() {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetching movie details
        const response = await axiosInstance.get(`/movie/${id}`);
        setMovie(response.data);
        console.log('Movie details fetched: ', response.data); // Debug log

        // Fetching cast data
        const castResponse = await axiosInstance.get(`/movie/${id}/credits`);
        setCast(castResponse.data.cast.slice(0, 5)); // Getting top 5 cast members
        console.log('Cast details fetched: ', castResponse.data.cast); // Debug log

        // Fetching trailer data
        const videoResponse = await axiosInstance.get(`/movie/${id}/videos`);
        const trailer = videoResponse.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  if (!movie) return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '50px' }} />;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ 
        backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: { xs: 2, md: 4 },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Movie Title */}
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold',
            color: darkMode ? '#fff' : '#1a1a1a',
            mb: 4,
            textAlign: 'center'
          }}
        >
          {movie.title}
        </Typography>

        <Grid container spacing={4}>
          {/* Left Column - Poster and Trailer */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              position: 'relative',
              mb: 4,
              '&:hover .trailer-overlay': {
                opacity: 1
              }
            }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                style={{ 
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
              />
              {trailerKey && !showTrailer && (
                <Box 
                  className="trailer-overlay"
                  onClick={handleTrailerClick}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                    borderRadius: '12px',
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 80, color: '#fff' }} />
                </Box>
              )}
            </Box>

            {/* Embedded Trailer */}
            {trailerKey && showTrailer && (
              <Box sx={{ 
                position: 'relative',
                paddingTop: '56.25%',
                width: '100%',
                mb: 4,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="Movie Trailer"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            )}
          </Grid>

          {/* Right Column - Details */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                color: darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                lineHeight: 1.6
              }}
            >
              {movie.overview}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}
            >
              <strong style={{ color: darkMode ? '#fff' : '#000' }}>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}
            </Typography>

            {/* Cast Section */}
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                color: darkMode ? '#fff' : '#1a1a1a',
                fontWeight: 'bold'
              }}
            >
              Cast
            </Typography>

            <Grid container spacing={2}>
              {cast.map((actor) => (
                <Grid item xs={6} sm={4} key={actor.id}>
                  <Paper 
                    elevation={3}
                    sx={{ 
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#fff',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: '100px',
                        height: '100px',
                        margin: '0 auto',
                        mb: 2,
                        borderRadius: '50%',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        alt={actor.name}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: darkMode ? '#fff' : '#1a1a1a'
                      }}
                    >
                      {actor.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
                      }}
                    >
                      {actor.character}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default MovieDetails;
