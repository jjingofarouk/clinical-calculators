// BazettsFormula.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const BazettsFormula = () => {
  const [qtInterval, setQtInterval] = useState('');
  const [heartRate, setHeartRate] = useState('');

  const calculateQTc = () => {
    if (!qtInterval || !heartRate) return '';
    const qt = parseFloat(qtInterval);
    const hr = parseFloat(heartRate);
    return (qt / Math.sqrt(60 / hr)).toFixed(0);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bazett's Formula (QTc)
      </Typography>
      <TextField
        label="QT Interval (ms)"
        type="number"
        value={qtInterval}
        onChange={(e) => setQtInterval(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Heart Rate (bpm)"
        type="number"
        value={heartRate}
        onChange={(e) => setHeartRate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        QTc: {calculateQTc()} ms
      </Typography>
    </Box>
  );
};

export default BazettsFormula;