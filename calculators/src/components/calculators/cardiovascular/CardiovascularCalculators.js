import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

import ASCVDCalculator from './ASCVD';
import FraminghamRiskCalculator from './Framingham';
import CHA2DS2VASc from './CHA2DS2VASc';
import HASBLED from './HASBLED';
import GRACECalculator from './GRACE';
import TIMICalculator from './TIMI';

const calculators = [
  { label: 'ASCVD', component: <ASCVDCalculator /> },
  { label: 'Framingham', component: <FraminghamRiskCalculator /> },
  { label: 'CHA2DS2VASc', component: <CHA2DS2VASc /> },
  { label: 'HAS-BLED', component: <HASBLED /> },
  { label: 'GRACE', component: <GRACECalculator /> },
  { label: 'TIMI', component: <TIMICalculator /> }
];

const CardiovascularCalculators = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredCalculators = calculators.filter(c =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (_, newIndex) => {
    setSelectedTab(newIndex);
  };

  return (
    <Box className="h-full w-full overflow-hidden flex flex-col bg-white">
      {/* Search Bar */}
      <Box className="p-4 border-b border-gray-200 bg-white">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedTab(0); // reset tab when filtering
          }}
          sx={{
            input: {
              fontFamily: 'Inter, sans-serif',
              color: '#1F2937'
            }
          }}
        />
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#E5E7EB', px: 2, bgcolor: '#F9FAFB' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={isMobile ? 'auto' : false}
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              borderRadius: 3,
              m: 0.5,
              bgcolor: '#fff',
              border: '1px solid #E5E7EB',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              textTransform: 'none',
              color: '#1F2937',
              px: 2,
              py: 1,
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            },
            '& .Mui-selected': {
              bgcolor: '#27C7B8',
              color: '#fff',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(39,199,184,0.2)',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#27C7B8',
            },
          }}
        >
          {filteredCalculators.map((calc, index) => (
            <Tab key={calc.label} label={calc.label} />
          ))}
        </Tabs>
      </Box>

      {/* Calculator Display Area */}
      <Box className="flex-1 overflow-y-auto p-4 bg-white">
        {filteredCalculators.length > 0 ? (
          filteredCalculators[selectedTab]?.component
        ) : (
          <Typography variant="body1" className="text-gray-500 text-center mt-8">
            No calculators match your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CardiovascularCalculators;