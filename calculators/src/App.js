import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import GeneralCalculators from './components/calculators/general/GeneralCalculators';

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
        <GeneralCalculators />
      </Box>
    </>
  );
}
