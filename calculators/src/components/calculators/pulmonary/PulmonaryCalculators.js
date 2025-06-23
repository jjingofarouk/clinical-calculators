import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, TextField, Tabs, Tab, Typography } from '@mui/material';
import CURB65Calculator from './CURB65';
import WellsScoreCalculator from './Wells';
import PSICalculator from './PSICalculator';
import PERCCalculator from './PERCCalculator';
import BODECalculator from './BODECalculator';
import ACTCalculator from './ACTCalculator';
import CATCalculator from './CATCalculator';
import PEFRCalculator from './PEFRCalculator';
import MMRCCalculator from './MMRCCalculator';

const PulmonaryCalculators = () => {
  const calculators = [
    { title: 'CURB-65 Pneumonia Severity', component: CURB65Calculator },
    { title: 'Wells Score for PE', component: WellsScoreCalculator },
    { title: 'PSI/PORT Score', component: PSICalculator },
    { title: 'PERC Rule for PE', component: PERCCalculator },
    { title: 'BODE Index', component: BODECalculator },
    { title: 'Asthma Control Test (ACT)', component: ACTCalculator },
    { title: 'COPD Assessment Test (CAT)', component: CATCalculator },
    { title: 'Peak Expiratory Flow Rate (PEFR) Calculator', component: PEFRCalculator },
    { title: 'Modified Medical Research Council (mMRC) Dyspnea Scale', component: MMRCCalculator },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const filteredCalculators = calculators.filter((calc) =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderCalculator = () => {
    if (selectedTab < filteredCalculators.length) {
      const CalculatorComponent = filteredCalculators[selectedTab].component;
      return <CalculatorComponent />;
    }
    return (
      <Typography variant="h6" className="text-gray-600 text-center mt-8">
        Select a calculator to get started.
      </Typography>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        <Box className="space-y-6">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FFFFFF',
                '& fieldset': { borderColor: '#E5E7EB' },
              },
              '& .MuiInputBase-input': { color: '#1F2937' },
            }}
          />

          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: '#F9FAFB',
              borderBottom: 1,
              borderColor: '#E5E7EB',
              mb: 4,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '14px',
                fontFamily: '"Inter", sans-serif',
                color: '#1F2937',
                borderRadius: '12px',
                mx: 1,
                bgcolor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                '&:hover': { bgcolor: '#F3F4F6' },
              },
              '& .Mui-selected': {
                bgcolor: '#27C7B8',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: '0 2px 4px rgba(39,199,184,0.2)',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': { display: 'none' },
            }}
          >
            {filteredCalculators.map((calculator, index) => (
              <Tab key={calculator.title} label={calculator.title} value={index} />
            ))}
          </Tabs>

          <Box className="bg-white rounded-lg shadow-lg p-6">
            {renderCalculator()}
          </Box>
        </Box>
      </motion.div>
    </div>
  );
};

export default PulmonaryCalculators;