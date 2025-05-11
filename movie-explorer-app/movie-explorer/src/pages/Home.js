import React, { useEffect, useState } from 'react';
import MoviesGrid from '../components/MoviesGrid';
import axiosInstance from '../api/tmdb';
import { Container, Grid, CircularProgress, Typography, Box, TextField, IconButton, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const { darkMode } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Genre mapping object
  const genreMap = {
  
    'Action': '28',
    'Adventure': '12',
    'Animation': '16',
    'Comedy': '35',
    'Crime': '80',
    'Documentary': '99',
    'Drama': '18',
    'Family': '10751',
    'Fantasy': '14',
    'History': '36',
    'Horror': '27',
    'Music': '10402',
    'Mystery': '9648',
    'Romance': '10749',
    'Sci-Fi': '878',
    'Thriller': '53',
    'War': '10752',
    'Western': '37'
  };

  const genres = [

    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
    'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi',
    'Thriller', 'War', 'Western'
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let response;
        
        if (selectedGenre === 'trending') {
          // Fetch now playing (most recent) movies
          response = await axiosInstance.get('/movie/now_playing', {
            params: {
              page: 1,
              sort_by: 'release_date.desc',
              language: 'en-US'
            }
          });
          
          // Sort by release date to ensure most recent first
          const sortedMovies = response.data.results.sort((a, b) => 
            new Date(b.release_date) - new Date(a.release_date)
          );
          
          setMovies(sortedMovies);
        } else {
          // Fetch movies by genre
          const genreId = genreMap[selectedGenre];
          response = await axiosInstance.get('/discover/movie', {
            params: {
              with_genres: genreId,
              sort_by: 'popularity.desc'
            }
          });
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  // Generate years array (from current year to 1990)
  const years = Array.from(
    { length: new Date().getFullYear() - 1989 },
    (_, i) => new Date().getFullYear() - i
  );

  const fetchMovies = async (isLoadMore = false) => {
    setLoading(true);
    try {
      let response;
      const currentPage = isLoadMore ? page : 1;
      
      if (selectedGenre === 'trending') {
        response = await axiosInstance.get('/movie/now_playing', {
          params: {
            page: currentPage,
            sort_by: 'release_date.desc',
            language: 'en-US',
            ...(selectedYear && { year: selectedYear })
          }
        });
        
        const sortedMovies = response.data.results.sort((a, b) => 
          new Date(b.release_date) - new Date(a.release_date)
        );
        
        if (isLoadMore) {
          setMovies(prev => [...prev, ...sortedMovies]);
        } else {
          setMovies(sortedMovies);
        }
      } else {
        const genreId = genreMap[selectedGenre];
        response = await axiosInstance.get('/discover/movie', {
          params: {
            with_genres: genreId,
            sort_by: 'popularity.desc',
            page: currentPage,
            ...(selectedYear && { primary_release_year: selectedYear })
          }
        });

        if (isLoadMore) {
          setMovies(prev => [...prev, ...response.data.results]);
        } else {
          setMovies(response.data.results);
        }
      }

      setHasMore(response.data.page < response.data.total_pages);
      if (!isLoadMore) {
        setPage(1);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      if (!isLoadMore) {
        setMovies([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(false);
  }, [selectedGenre, selectedYear]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    fetchMovies(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get('/search/movie', {
        params: {
          query: searchQuery,
          language: 'en-US',
          page: 1,
          ...(selectedYear && { year: selectedYear })
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar 
        genres={genres} 
        onGenreSelect={setSelectedGenre}
        selectedGenre={selectedGenre}
      />

      <Container sx={{ paddingTop: '40px', paddingBottom: '40px', flex: 1 }}>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: '30px' }}>
          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              variant="outlined"
              sx={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#ffffff' : '#000000',
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              }}
            />
            <IconButton 
              type="submit"
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                padding: '10px',
              }}
            >
              <SearchIcon />
            </IconButton>
          </form>

          {/* Year Filter */}
          <FormControl 
            sx={{ 
              minWidth: 120,
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                color: darkMode ? '#ffffff' : '#000000',
                '& fieldset': {
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
              },
              '& .MuiSelect-icon': {
                color: darkMode ? '#ffffff' : '#000000',
              },
            }}
          >
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
                    '& .MuiMenuItem-root': {
                      color: darkMode ? '#ffffff' : '#000000',
                    },
                  },
                },
              }}
            >
              <MenuItem value="">Years</MenuItem>
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography 
          variant="h5" 
          sx={{ 
            marginTop: '20px', 
            marginBottom: '20px',
            color: darkMode ? '#ffffff' : '#333',
            fontWeight: 'bold',
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            padding: '10px 20px',
            borderRadius: '8px',
            display: 'inline-block'
          }}
        >
          {`${searchQuery ? 'Search Results' : selectedGenre === 'trending' ? 'Latest Releases' : `${selectedGenre} Movies`}${selectedYear ? ` (${selectedYear})` : ''}`}
        </Typography>
        
        {loading && page === 1 ? (
          <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
        ) : (
          <>
            <MoviesGrid movies={movies} />
            {hasMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button 
                  variant="contained" 
                  onClick={handleLoadMore}
                  disabled={loading}
                  sx={{
                    backgroundColor: darkMode ? '#1976d2' : '#1976d2',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    minWidth: '200px',
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  ) : null}
                  {loading ? 'Loading...' : 'Load More Movies'}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default Home;
