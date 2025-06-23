import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import BMICalculator from './BMICalculator';
import CaloricNeedsCalculator from './CaloricNeedsCalculator';
import WaistCircumferenceCalculator from './WaistCircumferenceCalculator';
import IdealBodyWeightCalculator from './IdealBodyWeightCalculator';
import BMRCalculator from './BMRCalculator';
import HarrisBenedictCalculator from './HarrisBenedictCalculator';
import MifflinStJeorCalculator from './MifflinStJeorCalculator';
import BodyFatPercentageCalculator from './BodyFatPercentageCalculator';

const GeneralCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('BMI');

  const handleChange = (event, newValue) => {
    setActiveCalculator(newValue);
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'BMI':
        return <BMICalculator />;
      case 'Caloric Needs':
        return <CaloricNeedsCalculator />;
      case 'Waist Circumference':
        return <WaistCircumferenceCalculator />;
      case 'Ideal Body Weight':
        return <IdealBodyWeightCalculator />;
      case 'BMR':
        return <BMRCalculator />;
      case 'Harris-Benedict':
        return <HarrisBenedictCalculator />;
      case 'Mifflin-St Jeor':
        return <MifflinStJeorCalculator />;
      case 'Body Fat Percentage':
        return <BodyFatPercentageCalculator />;
      default:
        return null;
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 p-5">
      <Typography variant="h4" className="font-bold text-center mb-5 text-gray-900">
        Health Calculators
      </Typography>

      <Tabs
        value={activeCalculator}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          backgroundColor: '#dfe4e5',
          borderRadius: 1,
          mb: 3,
          '& .MuiTab-root': {
            backgroundColor: '#dfe4e5',
            borderRadius: 1,
            m: 0.5,
            color: '#002432',
            fontWeight: 600,
            fontSize: '14px',
            textTransform: 'none',
            padding: '10px 15px',
          },
          '& .Mui-selected': {
            backgroundColor: '#27c7b8',
            color: '#fff',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#27c7b8',
          },
        }}
      >
        {[
          'BMI',
          'Caloric Needs',
          'Waist Circumference',
          'Ideal Body Weight',
          'BMR',
          'Harris-Benedict',
          'Mifflin-St Jeor',
          'Body Fat Percentage'
        ].map((calculator) => (
          <Tab key={calculator} label={calculator} value={calculator} />
        ))}
      </Tabs>

      <Box className="pt-5 border-t border-gray-300">
        {renderCalculator()}
      </Box>
    </Box>
  );
};

export default GeneralCalculators;