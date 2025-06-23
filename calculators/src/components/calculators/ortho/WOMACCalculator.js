import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, TextField, Typography, Box } from '@mui/material';

const WOMACCalculator = () => {
  const [scores, setScores] = useState(Array(24).fill(''));
  const [result, setResult] = useState(null);

  const handleScoreChange = (index, value) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 4)) {
      const newScores = [...scores];
      newScores[index] = value;
      setScores(newScores);
    } else {
      alert('Score must be between 0 and 4.');
    }
  };

  const calculateWOMAC = () => {
    const totalScore = scores.reduce((sum, score) => sum + (Number(score) || 0), 0);
    const scorePercentage = ((totalScore / 120) * 100).toFixed(2);
    setResult(scorePercentage);
  };

  const resetScores = () => {
    setScores(Array(24).fill(''));
    setResult(null);
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
          WOMAC Index Calculator
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          The WOMAC Index assesses pain, stiffness, and physical function in patients with osteoarthritis. Please input scores (0-4) for each question.
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-6">
              <Box>
                <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                  Pain (Questions 1-5)
                </Typography>
                {scores.slice(0, 5).map((score, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    type="number"
                    label={`Question ${index + 1}`}
                    value={score}
                    onChange={(e) => handleScoreChange(index, e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 1, min: 0, max: 4 }}
                    className="mb-4"
                  />
                ))}
              </Box>

              <Box>
                <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                  Stiffness (Questions 6-8)
                </Typography>
                {scores.slice(5, 8).map((score, index) => (
                  <TextField
                    key={index + 5}
                    fullWidth
                    type="number"
                    label={`Question ${index + 6}`}
                    value={score}
                    onChange={(e) => handleScoreChange(index + 5, e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 1, min: 0, max: 4 }}
                    className="mb-4"
                  />
                ))}
              </Box>

              <Box>
                <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                  Physical Function (Questions 9-24)
                </Typography>
                {scores.slice(8).map((score, index) => (
                  <TextField
                    key={index + 8}
                    fullWidth
                    type="number"
                    label={`Question ${index + 9}`}
                    value={score}
                    onChange={(e) => handleScoreChange(index + 8, e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 1, min: 0, max: 4 }}
                    className="mb-4"
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateWOMAC}
              >
                Calculate WOMAC Score
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

              {result !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <Typography variant="h6" className="font-bold text-gray-800 text-center">
                    WOMAC Score: {result}%
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 text-center mt-2">
                    - Higher scores indicate worse symptoms.<br />
                    - Use this score to track patient progress or assess treatment effectiveness.
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

export default WOMACCalculator;