import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';

const APGARScore = () => {
  const [heartRate, setHeartRate] = useState('');
  const [respiration, setRespiration] = useState('');
  const [muscleTone, setMuscleTone] = useState('');
  const [reflexResponse, setReflexResponse] = useState('');
  const [color, setColor] = useState('');
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  const calculateAPGAR = () => {
    const hr = parseInt(heartRate) || 0;
    const resp = parseInt(respiration) || 0;
    const muscle = parseInt(muscleTone) || 0;
    const reflex = parseInt(reflexResponse) || 0;
    const skinColor = parseInt(color) || 0;

    if ([hr, resp, muscle, reflex, skinColor].some((value) => value < 0 || value > 2)) {
      setError('Each category must have a score between 0 and 2.');
      return;
    }

    setError('');
    const totalScore = hr + resp + muscle + reflex + skinColor;
    setScore(totalScore);
  };

  const handleInputChange = (setter) => (value) => {
    const numericValue = parseInt(value);
    if (value === '' || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 2)) {
      setter(value);
    }
  };

  const getInterpretation = (score) => {
    if (score >= 7) return { text: 'Normal (Healthy)', color: 'success.main' };
    if (score >= 4) return { text: 'Moderately Depressed', color: 'warning.main' };
    return { text: 'Severely Depressed', color: 'error.main' };
  };

  const fields = [
    { label: 'Heart Rate (0-2)', value: heartRate, setter: setHeartRate },
    { label: 'Respiration (0-2)', value: respiration, setter: setRespiration },
    { label: 'Muscle Tone (0-2)', value: muscleTone, setter: setMuscleTone },
    { label: 'Reflex Response (0-2)', value: reflexResponse, setter: setReflexResponse },
    { label: 'Skin Color (0-2)', value: color, setter: setColor },
  ];

  return (
    <Container maxWidth="sm" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
          APGAR Score Calculator
        </Typography>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            {fields.map(({ label, value, setter }) => (
              <Box key={label} className="mb-4">
                <Typography className="font-semibold text-gray-900 mb-2">
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleInputChange(setter)(e.target.value)}
                  placeholder={`Enter ${label.split(' ')[0]} Score`}
                  InputProps={{
                    inputProps: { min: 0, max: 2 },
                    sx: { borderRadius: '8px', bgcolor: '#F5F7FA' },
                  }}
                />
              </Box>
            ))}

            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              className="bg-gray-900 text-white"
              onClick={calculateAPGAR}
            >
              Calculate APGAR Score
            </Button>

            {score !== null && (
              <Box className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                  APGAR Score: {score}
                </Typography>
                <Typography
                  className="font-semibold"
                  sx={{ color: getInterpretation(score).color }}
                >
                  {getInterpretation(score).text}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default APGARScore;