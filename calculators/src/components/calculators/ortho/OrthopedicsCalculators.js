import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, TextField, Typography, Tabs, Tab } from '@mui/material';
import WellsScoreCalculator from '../pulmonary/Wells';
import HarrisHipScore from './HarrisHipScore';
import WOMACCalculator from './WOMACCalculator';
import JointReplacementRiskCalculator from './JointReplacementRiskCalculator';
import ConstantMurleyScore from './ConstantMurleyScore';
import OswestryDisabilityIndex from './OswestryDisabilityIndex';

const OrthopedicsCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState('Wells Score Calculator');
  const [searchQuery, setSearchQuery] = useState('');

  const calculators = [
    'Wells Score Calculator',
    'Oswestry Disability Index',
    'Harris Hip Score',
    'WOMAC Calculator',
    'Joint Replacement Risk Calculator',
    'Constant Murley Score',
  ];

  const filteredCalculators = calculators.filter((calculator) =>
    calculator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (event, newValue) => {
    setSelectedCalculator(newValue);
  };

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'Wells Score Calculator':
        return <WellsScoreCalculator />;
      case 'Oswestry Disability Index':
        return <OswestryDisabilityIndex />;
      case 'Harris Hip Score':
        return <HarrisHipScore />;
      case 'WOMAC Calculator':
        return <WOMACCalculator />;
      case 'Joint Replacement Risk Calculator':
        return <JointReplacementRiskCalculator />;
      case 'Constant Murley Score':
        return <ConstantMurleyScore />;
      default:
        return <Typography className="text-center mt-8 text-gray-600">Select a calculator to get started</Typography>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h4" className="font-bold text-gray-800 text-center mb-4">
              Orthopedics Calculators
            </Typography>

            <Box className="mb-6">
              <TextField
                fullWidth
                label="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                className="bg-white"
              />
            </Box>

            <Tabs
              value={selectedCalculator}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="orthopedics calculators tabs"
              className="mb-6"
            >
              {filteredCalculators.map((calculator) => (
                <Tab
                  key={calculator}
                  label={calculator}
                  value={calculator}
                  className="text-gray-700"
                />
              ))}
            </Tabs>

            <Box className="mt-6">
              {renderCalculator()}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrthopedicsCalculators;