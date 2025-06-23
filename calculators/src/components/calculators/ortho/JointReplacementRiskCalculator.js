import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, TextField, Typography, Box } from '@mui/material';

const JointReplacementRiskCalculator = () => {
  const [age, setAge] = useState('');
  const [comorbidities, setComorbidities] = useState('');
  const [previousSurgeries, setPreviousSurgeries] = useState('');
  const [risk, setRisk] = useState(null);

  const validateInput = (value) => {
    if (value === '' || Number(value) >= 0) {
      return value;
    } else {
      alert('Value must be a positive number.');
      return '';
    }
  };

  const handleAgeChange = (value) => setAge(validateInput(value));
  const handleComorbiditiesChange = (value) => setComorbidities(validateInput(value));
  const handlePreviousSurgeriesChange = (value) => setPreviousSurgeries(validateInput(value));

  const calculateJointReplacementRisk = () => {
    const ageValue = Number(age) || 0;
    const comorbiditiesValue = Number(comorbidities) || 0;
    const previousSurgeriesValue = Number(previousSurgeries) || 0;

    if (ageValue < 0 || comorbiditiesValue < 0 || previousSurgeriesValue < 0) {
      setRisk('Invalid input. Please enter positive numbers.');
      return;
    }

    const calculatedRisk = (ageValue + comorbiditiesValue + previousSurgeriesValue) / 10;
    setRisk((calculatedRisk * 100).toFixed(2));
  };

  const resetInputs = () => {
    setAge('');
    setComorbidities('');
    setPreviousSurgeries('');
    setRisk(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Typography variant="h4" className="font-bold text-gray-800 text-center mb-4">
          Joint Replacement Risk Calculator
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          Enter the following values to calculate the risk of joint replacement surgery.
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-4">
              <TextField
                fullWidth
                type="number"
                label="Age"
                value={age}
                onChange={(e) => handleAgeChange(e.target.value)}
                variant="outlined"
              />
              <TextField
                fullWidth
                type="number"
                label="Comorbidities (count)"
                value={comorbidities}
                onChange={(e) => handleComorbiditiesChange(e.target.value)}
                variant="outlined"
              />
              <TextField
                fullWidth
                type="number"
                label="Previous Surgeries (count)"
                value={previousSurgeries}
                onChange={(e) => handlePreviousSurgeriesChange(e.target.value)}
                variant="outlined"
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateJointReplacementRisk}
              >
                Calculate Risk
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="mt-2"
                onClick={resetInputs}
              >
                Reset
              </Button>

              {risk !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <Typography variant="h6" className="font-bold text-gray-800 text-center">
                    Joint Replacement Risk: {risk}%
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

export default JointReplacementRiskCalculator;