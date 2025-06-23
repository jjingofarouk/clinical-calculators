import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MMRCCalculator = () => {
  const [score, setScore] = useState('');
  const [showGuidelines, setShowGuidelines] = useState(false);

  const dyspneaOptions = [
    { value: '0', label: 'Grade 0 - Dyspnea only with strenuous exercise' },
    { value: '1', label: 'Grade 1 - Dyspnea when hurrying or walking up a slight hill' },
    { value: '2', label: 'Grade 2 - Walks slower than people of same age due to breathlessness' },
    { value: '3', label: 'Grade 3 - Stops for breath after walking 100 yards or few minutes' },
    { value: '4', label: 'Grade 4 - Too breathless to leave house or dress' },
  ];

  const getResultInterpretation = () => {
    if (!score) return null;
    const interpretations = {
      '0': 'Minimal impact on respiratory function',
      '1': 'Mild respiratory limitation',
      '2': 'Moderate respiratory limitation',
      '3': 'Severe respiratory limitation',
      '4': 'Very severe impact on respiratory capacity'
    };
    return interpretations[score];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Typography variant="h4" className="font-bold text-gray-800 text-center mb-2">
          mMRC Dyspnea Score
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          Assess breathlessness severity in respiratory conditions
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="mb-6">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="dyspnea-select-label">Select Dyspnea Grade</InputLabel>
                <Select
                  labelId="dyspnea-select-label"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  label="Select Dyspnea Grade"
                >
                  {dyspneaOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {score && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-800 mb-4">
                      Assessment Result
                    </Typography>
                    <Typography variant="h5" className="font-bold text-blue-600 mb-2">
                      mMRC Grade: {score}
                    </Typography>
                    <Typography variant="body1" className="font-medium text-gray-800 mb-2">
                      {getResultInterpretation()}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {dyspneaOptions.find(option => option.value === score)?.label}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
              onClick={() => setShowGuidelines(!showGuidelines)}
            >
              {showGuidelines ? 'Hide Guidelines' : 'Show Clinical Guidelines'}
            </Button>

            {showGuidelines && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-800 mb-4">
                      Clinical Guidelines
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                      • Score ≥2 may indicate need for further assessment including spirometry
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                      • Consider GOLD staging for COPD patients
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      • Evaluate need for pulmonary rehabilitation
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MMRCCalculator;