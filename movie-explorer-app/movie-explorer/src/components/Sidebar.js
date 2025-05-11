import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

function Sidebar({ genres, onGenreSelect, selectedGenre }) {
  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: '#1a1a1a',
        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto'
      }}
    >
      <List>
        {genres.map((genre) => (
          <ListItem
            button
            key={genre}
            onClick={() => onGenreSelect(genre)}
            sx={{
              backgroundColor: selectedGenre === genre ? 'rgba(255, 64, 129, 0.2)' : 'transparent',
              borderLeft: selectedGenre === genre ? '4px solid #ff4081' : '4px solid transparent',
              '&:hover': {
                backgroundColor: selectedGenre === genre 
                  ? 'rgba(255, 64, 129, 0.3)' 
                  : 'rgba(255, 255, 255, 0.08)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <ListItemText 
              primary={genre} 
              sx={{
                color: selectedGenre === genre ? '#ff4081' : '#fff',
                '& .MuiTypography-root': {
                  fontWeight: selectedGenre === genre ? 'bold' : 'normal'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
