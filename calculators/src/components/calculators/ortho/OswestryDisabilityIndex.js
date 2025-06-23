import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, TextField, Typography, Box } from '@mui/material';

const OswestryDisabilityIndex = () => {
  const [answers, setAnswers] = useState(Array(10).fill(''));
  const [oswestryScore, setOswestryScore] = useState(null);

  const handleScoreChange = (index, value) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 5)) {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    } else {
      alert('Score must be between 0 and 5.');
    }
  };

  const calculateOswestry = () => {
    const totalScore = answers.reduce((sum, score) => sum + (Number(score) || 0), 0);
    const percentage = ((totalScore / 50) * 100).toFixed(2);
    setOswestryScore(percentage);
  };

  const resetAnswers = () => {
    setAnswers(Array(10).fill(''));
    setOswestryScore(null);
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
          Oswestry Disability Index Calculator
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          The Oswestry Disability Index (ODI) is used to measure a patient's level of disability in performing daily activities due to back pain. Please input a score (0-5) for each question.
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-4">
              {answers.map((answer, index) => (
                <TextField
                  key={index}
                  fullWidth
                  type="number"
                  label={`Question ${index + 1}`}
                  value={answer}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  variant="outlined"
                  inputProps={{ maxLength: 1, min: 0, max: 5 }}
                />
              ))}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateOswestry}
              >
                Calculate ODI Score
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="mt-2"
                onClick={resetAnswers}
              >
                Reset Answers
              </Button>

              {oswestryScore !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <Typography variant="h6" className="font-bold text-gray-800 text-center">
                    Oswestry Disability Index Score: {oswestryScore}%
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 text-center mt-2">
                    - 0-20%: Minimal disability<br />
                    - 21-40%: Moderate disability<br />
                    - 41-60%: Severe disability<br />
                    - 61-80%: Crippling disability<br />
                    - 81-100%: Bed-bound or exaggerated symptoms
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

export default OswestryDisabilityIndex;