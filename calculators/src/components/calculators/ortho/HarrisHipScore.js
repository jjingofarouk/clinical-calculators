import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, TextField, Typography, Box } from '@mui/material';

const HarrisHipScore = () => {
  const [pain, setPain] = useState('');
  const [functionScore, setFunctionScore] = useState('');
  const [rangeOfMotion, setRangeOfMotion] = useState('');
  const [totalScore, setTotalScore] = useState(null);

  const validateInput = (value, max) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= max)) {
      return value;
    } else {
      alert(`Value must be between 0 and ${max}.`);
      return '';
    }
  };

  const handlePainChange = (value) => setPain(validateInput(value, 44));
  const handleFunctionChange = (value) => setFunctionScore(validateInput(value, 47));
  const handleRangeOfMotionChange = (value) => setRangeOfMotion(validateInput(value, 5));

  const calculateHarrisHipScore = () => {
    const painScore = Number(pain) || 0;
    const functionValue = Number(functionScore) || 0;
    const romScore = Number(rangeOfMotion) || 0;
    const total = painScore + functionValue + romScore;
    setTotalScore(total);
  };

  const resetScores = () => {
    setPain('');
    setFunctionScore('');
    setRangeOfMotion('');
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
          Harris Hip Score Calculator
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          The Harris Hip Score is used to assess the outcomes of hip surgeries or treatments. Enter the scores for each category below.
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-4">
              <TextField
                fullWidth
                type="number"
                label="Pain (0-44)"
                value={pain}
                onChange={(e) => handlePainChange(e.target.value)}
                variant="outlined"
                inputProps={{ maxLength: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Function (0-47)"
                value={functionScore}
                onChange={(e) => handleFunctionChange(e.target.value)}
                variant="outlined"
                inputProps={{ maxLength: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Range of Motion (0-5)"
                value={rangeOfMotion}
                onChange={(e) => handleRangeOfMotionChange(e.target.value)}
                variant="outlined"
                inputProps={{ maxLength: 1 }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateHarrisHipScore}
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
                    Harris Hip Score: {totalScore}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 text-center mt-2">
                    - 90-100: Excellent<br />
                    - 80-89: Good<br />
                    - 70-79: Fair<br />
                    - below 70: Poor
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

export default HarrisHipScore;