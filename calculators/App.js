import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import ClinicalCalculators from './src/components/calculators/ClinicalCalculators';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ 
        flex: 1, 
        backgroundColor: '#004C54', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ClinicalCalculators />
      </Box>
    </>
  );
}