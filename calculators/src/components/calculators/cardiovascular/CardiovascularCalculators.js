import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Typography } from '@mui/material';
import ASCVDCalculator from './ASCVD';
import FraminghamRiskCalculator from './Framingham';
import CHA2DS2VASc from './CHA2DS2VASc';
import HASBLED from './HASBLED';
import GRACECalculator from './GRACE';
import TIMICalculator from './TIMI';

const CardiovascularCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState('ASCVD');
  const [searchQuery, setSearchQuery] = useState('');

  const calculators = [
    'ASCVD',
    'Framingham',
    'CHA2DS2VASc',
    'HAS-BLED',
    'GRACE',
    'TIMI'
  ];

  const filteredCalculators = calculators.filter(calculator =>
    calculator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (event, newValue) => {
    setSelectedCalculator(newValue);
  };

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'ASCVD':
        return <ASCVDCalculator />;
      case 'Framingham':
        return <FraminghamRiskCalculator />;
      case 'CHA2DS2VASc':
        return <CHA2DS2VASc />;
      case 'HAS-BLED':
        return <HASBLED />;
      case 'GRACE':
        return <GRACECalculator />;
      case 'TIMI':
        return <TIMICalculator />;
      default:
        return (
          <Typography variant="body1" className="text-gray-500 text-center mt-5">
            Select a calculator to get started
          </Typography>
        );
    }
  };

  return (
    <Box className="min-h-screen bg-gray-200">
      <Box className="p-3 bg-white border-b border-gray-300">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white rounded-lg"
          sx={{ input: { color: '#1F2937', fontFamily: 'Inter, sans-serif' } }}
        />
      </Box>

      <Tabs
        value={selectedCalculator}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          backgroundColor: '#F9FAFB',
          borderBottom: 1,
          borderColor: '#E5E7EB',
          '& .MuiTab-root': {
            borderRadius: 3,
            margin: '0 6px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#1F2937',
            textTransform: 'none',
            padding: '10px 18px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
          },
          '& .Mui-selected': {
            backgroundColor: '#27C7B8',
            color: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            border: 'none',
            boxShadow: '0 2px 4px rgba(39,199,184,0.2)',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#27C7B8',
          },
        }}
      >
        {filteredCalculators.map((calculator) => (
          <Tab
            key={calculator}
            label={calculator}
            value={calculator}
          />
        ))}
      </Tabs>

      <Box className="p-4">
        {renderCalculator()}
      </Box>
    </Box>
  );
};

export default CardiovascularCalculators;