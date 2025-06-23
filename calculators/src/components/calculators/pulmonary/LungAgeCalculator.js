import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, TextField, Button, Typography } from '@mui/material';

const LungAgeCalculator = () => {
  const [age, setAge] = useState('');
  const [fev1, setFEV1] = useState('');
  const [lungAge, setLungAge] = useState('');

  const calculateLungAge = () => {
    const ageValue = parseFloat(age);
    const fev1Value = parseFloat(fev1);

    if (isNaN(ageValue) || isNaN(fev1Value)) {
      alert('Please enter valid numeric values for Age and FEV1.');
      return;
    }

    if (ageValue <= 0 || fev1Value <= 0) {
      alert('Age and FEV1 must be greater than 0.');
      return;
    }

    const result = Math.round(60 - (fev1Value / 2));
    setLungAge(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Typography variant="h4" className="font-bold text-gray-800 text-center mb-6">
          Lung Age Calculator
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-6">
              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Age (years)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                  variant="outlined"
                  inputProps={{ min: 0 }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  FEV1 (L)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={fev1}
                  onChange={(e) => setFEV1(e.target.value)}
                  placeholder="Enter FEV1"
                  variant="outlined"
                  inputProps={{ min: 0, step: '0.1' }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateLungAge}
              >
                Calculate Lung Age
              </Button>

              {lungAge && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-cyan-50 border border-cyan-200"
                >
                  <Typography variant="h6" className="font-bold text-blue-600 text-center">
                    Lung Age: {lungAge} years
                  </Typography>
                </motion.div>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LungAgeCalculator;