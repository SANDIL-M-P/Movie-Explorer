import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem } from '@mui/material';

const TopBar = ({ onSortChange }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#222' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          All Movies
        </Typography>
        <Select
          defaultValue="latest"
          onChange={onSortChange}
          sx={{ backgroundColor: 'white', color: 'black' }}
        >
          <MenuItem value="latest">Sort by Latest</MenuItem>
          <MenuItem value="rating">Sort by Rating</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
