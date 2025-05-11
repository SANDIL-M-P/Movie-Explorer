import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, IconButton, TextField, Select, MenuItem } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // UseEffect to get the last search and year from localStorage when the component mounts
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    const lastYear = localStorage.getItem('lastYear');
    if (lastSearch) setQuery(lastSearch);
    if (lastYear) setYear(lastYear);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = query.trim() || year.trim() ? `${query.trim()} ${year.trim()}`.trim() : '';
    if (searchQuery) {
      // Save the search query and year to localStorage for persistence
      localStorage.setItem('lastSearch', query);
      localStorage.setItem('lastYear', year);
      onSearch(searchQuery); // Trigger the search action with combined query
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (query.trim() || year.trim())) {
      const searchQuery = `${query.trim()} ${year.trim()}`.trim();
      // Save the search query and year to localStorage for persistence
      localStorage.setItem('lastSearch', query);
      localStorage.setItem('lastYear', year);
      onSearch(searchQuery); // Trigger the search action with combined query
    }
  };

  // Generate years from 1990 to current year (2025)
  const currentYear = 2025;
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => 1990 + i);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex gap-4 w-full">
          <TextField
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for movies..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: isFocused ? '#f50057' : '#fff', transition: 'color 0.3s ease' }} />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setQuery('')}
                    sx={{ color: '#fff', transition: 'color 0.3s ease', '&:hover': { color: '#f50057' } }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: '#fff',
                '& input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1
                },
                '& input': {
                  color: '#fff'
                }
              }
            }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '30px',
              padding: '14px 16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f50057',
                borderWidth: '2px'
              },
              transition: 'all 0.3s ease',
            }}
          />
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            displayEmpty
            renderValue={(selected) => selected || 'Year'}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '30px',
              padding: '14px 16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f50057',
                borderWidth: '2px'
              },
              transition: 'all 0.3s ease',
              minWidth: '150px',
              '& .MuiSelect-icon': {
                color: '#fff',
              },
              '& .MuiMenuItem-root': {
                color: '#fff'
              }
            }}
          >
            <MenuItem value="" sx={{ color: '#000' }}>
              <em>Year</em>
            </MenuItem>
            {years.map((yearOption) => (
              <MenuItem key={yearOption} value={yearOption} sx={{ color: '#000' }}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
        </div>
      </form>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        variant="contained"
        color="secondary"
        sx={{
          marginTop: '20px',
          padding: '14px 28px',
          borderRadius: '50px',
          background: 'linear-gradient(45deg, #ff4081, #ff80ab)',
          '&:hover': {
            background: 'linear-gradient(45deg, #f50057, #ff4081)',
          },
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontWeight: 'bold',
        }}
      >
        Search
      </Button>

      {/* Trending Keywords (Spread Across Full Width) */}
      <div className="w-full mt-6">
        <span className="text-xs text-white block mb-4">Popular:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {['Action', 'Comedy', 'Sci-Fi', 'Drama'].map((tag) => (
            <Button
              key={tag}
              onClick={() => {
                setQuery(tag);
                onSearch(tag);
                localStorage.setItem('lastSearch', tag);
              }}
              size="medium"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                borderRadius: '20px',
                padding: '8px 16px',
                width: '100%',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.02)',
                },
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                fontWeight: 'bold',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
              }}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;