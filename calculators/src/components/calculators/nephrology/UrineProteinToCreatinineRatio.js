import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box, Alert } from '@mui/material';
import { motion } from 'framer-motion';

const UrineProteinToCreatinineRatio = () => {
  const [protein, setProtein] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [ratio, setRatio] = useState(null);
  const [error, setError] = useState('');

  const calculateRatio = () => {
    setError('');
    
    if (!protein || !creatinine) {
      setError('Please enter both values');
      return;
    }

    const proteinValue = parseFloat(protein);
    const creatinineValue = parseFloat(creatinine);

    if (isNaN(proteinValue) || isNaN(creatinineValue)) {
      setError('Please enter valid numbers');
      return;
    }

    if (creatinineValue === 0) {
      setError('Creatinine value cannot be zero');
      return;
    }

    const ratioValue = proteinValue / creatinineValue;
    setRatio(ratioValue.toFixed(2));
  };

  const interpretResult = (ratio) => {
    if (!ratio) return null;
    const numericRatio = parseFloat(ratio);
    
    if (numericRatio < 0.2) {
      return { text: 'Normal range', color: '#4CAF50' };
    } else if (numericRatio >= 0.2 && numericRatio < 0.5) {
      return { text: 'Mild proteinuria', color: '#FFC107' };
    } else if (numericRatio >= 0.5 && numericRatio < 3.0) {
      return { text: 'Moderate proteinuria', color: '#FF9800' };
    } else {
      return { text: 'Severe proteinuria', color: '#F44336' };
    }
  };

  const result = ratio ? interpretResult(ratio) : null;

  return (
    <Box className="min-h-screen bg-gray-100 p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-6">
          <Typography variant="h4" className="text-center font-bold mb-2">
            UPCR Calculator
          </Typography>
          <Typography variant="subtitle1" className="text-center text-gray-600 mb-2">
            Professional Edition
          </Typography>
          <Typography variant="body2" className="text-center text-gray-500 mb-6">
            Precise Proteinuria Quantification Tool
          </Typography>

          <Box className="space-y-4">
            <Box>
              <Typography variant="subtitle2" className="mb-1">Urine Protein (mg/dL)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter protein value"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                type="number"
                size="small"
              />
              <Typography variant="caption" className="text-gray-500 mt-1">Reference: Less than 150 mg/dL</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Urine Creatinine (mg/dL)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter creatinine value"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
                type="number"
                size="small"
              />
              <Typography variant="caption" className="text-gray-500 mt-1">Reference: 20-370 mg/dL</Typography>
            </Box>

            {error && (
              <Alert severity="error" className="mt-4">{error}</Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateRatio}
              sx={{ borderRadius: '12px', py: 1.5 }}
            >
              Calculate UPCR
            </Button>

            {ratio && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <Typography variant="h6" className="text-center">
                  Ratio: {ratio} mg/mg
                </Typography>
                {result && (
                  <Typography 
                    variant="body1" 
                    className="text-center mt-2"
                    sx={{ color: result.color }}
                  >
                    {result.text}
                  </Typography>
                )}
              </motion.div>
            )}
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default UrineProteinToCreatinineRatio;