import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchHandler({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query && query.trim()) {
      onSearch(query);
    }
  };

  const handleCategoryClick = (category) => {
    setQuery(category);
    onSearch(category);
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '30px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#999' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#ff4081',
            borderRadius: '30px',
            padding: '12px 30px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#f50057',
            }
          }}
        >
          SEARCH
        </Button>
      </form>

      {/* Popular Categories */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, flexWrap: 'wrap' }}>
        <Typography variant="body1" sx={{ mr: 2, color: '#666' }}>
          Popular:
        </Typography>
        
        {['ACTION', 'COMEDY', 'SCI-FI', 'DRAMA'].map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            sx={{
              mr: 1,
              mb: 1,
              backgroundColor: '#e0e0e0',
              color: '#0074cc',
              borderRadius: '20px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#d0d0d0',
              }
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default SearchHandler;