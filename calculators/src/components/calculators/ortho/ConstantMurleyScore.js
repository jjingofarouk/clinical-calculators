import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, TextField, Typography, Box } from '@mui/material';

const ConstantMurleyScore = () => {
  const [pain, setPain] = useState('');
  const [functionScore, setFunctionScore] = useState('');
  const [activeMotion, setActiveMotion] = useState('');
  const [totalScore, setTotalScore] = useState(null);

  const validateInput = (value, max) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= max)) {
      return value;
    } else {
      alert(`Value must be between 0 and ${max}.`);
      return '';
    }
  };

  const handlePainChange = (value) => setPain(validateInput(value, 15));
  const handleFunctionChange = (value) => setFunctionScore(validateInput(value, 35));
  const handleActiveMotionChange = (value) => setActiveMotion(validateInput(value, 20));

  const calculateConstantMurleyScore = () => {
    const painValue = Number(pain) || 0;
    const functionValue = Number(functionScore) || 0;
    const activeMotionValue = Number(activeMotion) || 0;

    if (painValue < 0 || functionValue < 0 || activeMotionValue < 0) {
      setTotalScore('Invalid input. Please enter positive numbers.');
      return;
    }

    const total = painValue + functionValue + activeMotionValue;
    setTotalScore(total);
  };

  const resetScores = () => {
    setPain('');
    setFunctionScore('');
    setActiveMotion('');
    setTotalScore(null);
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
          Constant-Murley Shoulder Score
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          Use this tool to calculate the Constant-Murley Shoulder Score. Enter values for each category below.
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-4">
              <TextField
                fullWidth
                type="number"
                label="Pain Score (0-15)"
                value={pain}
                onChange={(e) => handlePainChange(e.target.value)}
                variant="outlined"
                inputProps={{ maxLength: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Function Score (0-35)"
                value={functionScore}
                onChange={(e) => handleFunctionChange(e.target.value)}
                variant="outlined"
                inputProps={{ maxLength: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Active Motion Score (0-20)"
                value={activeMotion}
                onChange={(e) => handleActiveMotionChange(e.target.value)}
                variant="outlined"
                inputProps={{ maxLength: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateConstantMurleyScore}
              >
                Calculate Score
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="mt-2"
                onClick={resetScores}
              >
                Reset
              </Button>

              {totalScore !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <Typography variant="h6" className="font-bold text-gray-800 text-center">
                    Constant-Murley Score: {totalScore}
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

export default ConstantMurleyScore;