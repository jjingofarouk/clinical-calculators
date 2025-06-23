import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, TextField, Button, Typography } from '@mui/material';

const FEV1FVCCalculator = () => {
  const [fev1, setFEV1] = useState('');
  const [fvc, setFVC] = useState('');
  const [ratio, setRatio] = useState('');

  const calculateRatio = () => {
    const fev1Value = parseFloat(fev1);
    const fvcValue = parseFloat(fvc);

    if (isNaN(fev1Value) || isNaN(fvcValue)) {
      alert('Please enter valid numeric values for FEV1 and FVC.');
      return;
    }

    if (fvcValue > 0) {
      const result = (fev1Value / fvcValue) * 100;
      setRatio(result.toFixed(2) + '%');
    } else {
      alert('FVC must be greater than 0.');
    }
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
          FEV1/FVC Ratio Calculator
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-6">
              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Enter FEV1 (L):
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={fev1}
                  onChange={(e) => setFEV1(e.target.value)}
                  placeholder="e.g., 2.5"
                  variant="outlined"
                  inputProps={{ step: '0.1' }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Enter FVC (L):
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={fvc}
                  onChange={(e) => setFVC(e.target.value)}
                  placeholder="e.g., 3.0"
                  variant="outlined"
                  inputProps={{ step: '0.1' }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateRatio}
              >
                Calculate
              </Button>

              {ratio && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-cyan-50 border border-cyan-200"
                >
                  <Typography variant="h6" className="font-bold text-blue-600 text-center">
                    FEV1/FVC Ratio: {ratio}
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

export default FEV1FVCCalculator;