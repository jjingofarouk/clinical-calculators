// FloatingSearch.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Fab,
  Collapse,
  IconButton,
} from '@mui/material';
import { Search, Close } from '@mui/icons-material';

const FloatingSearch = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Search calculators...",
  position = { top: 16, right: 16 }
}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen && searchQuery) {
      onSearchChange(''); // Clear search when closing if there's a query
    }
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <>
      {/* Floating Search Button */}
      <Fab
        color="primary"
        aria-label="search"
        onClick={handleSearchToggle}
        sx={{
          position: 'fixed',
          top: position.top,
          right: position.right,
          bgcolor: '#0d9488',
          '&:hover': {
            bgcolor: '#0f766e',
          },
          zIndex: 1000,
          width: 48,
          height: 48,
        }}
      >
        {searchOpen ? <Close /> : <Search />}
      </Fab>

      {/* Collapsible Search Bar */}
      <Collapse in={searchOpen}>
        <Box className="p-4 border-b border-gray-200 bg-white w-full shadow-sm">
          <TextField
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#d1d5db' },
                '&:hover fieldset': { borderColor: '#0d9488' },
                '&.Mui-focused fieldset': { borderColor: '#0d9488' },
              },
              input: {
                fontFamily: 'Inter, sans-serif',
                color: '#1F2937'
              },
              width: '100%',
              maxWidth: '100%'
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={handleClearSearch}
                  sx={{ visibility: searchQuery ? 'visible' : 'hidden' }}
                >
                  <Close fontSize="small" />
                </IconButton>
              )
            }}
          />
        </Box>
      </Collapse>
    </>
  );
};

export default FloatingSearch;