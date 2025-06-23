import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box, Typography } from '@mui/material';
import GastroenterologyCalculators from './components/calculators/git/GastroenterologyCalculators';

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Routes>
          <Route path="/" element={<GastroenterologyCalculators />} />
          <Route path="*" element={<Typography variant="h5">404 - Page Not Found</Typography>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}