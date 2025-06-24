// GorlinEquation.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const GorlinEquation = () => {
  const [cardiacOutput, setCardiacOutput] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [systolicEjectionPeriod, setSystolicEjectionPeriod] = useState('');
  const [meanGradient, setMeanGradient] = useState('');

  const calculateValveArea = () => {
    if (!cardiacOutput || !heartRate || !systolicEjectionPeriod || !meanGradient) return '';
    const co = parseFloat(cardiacOutput);
    const hr = parseFloat(heartRate);
    const sep = parseFloat(systolicEjectionPeriod);
    const mg = parseFloat(meanGradient);
    return (co / (hr * sep * 0.85 * Math.sqrt(mg))).toFixed(2);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Gorlin Equation (Valve Area)
      </Typography>
      <TextField
        label="Cardiac Output (mL/min)"
        type="number"
        value={cardiacOutput}
        onChange={(e) => setCardiacOutput(e.target.value)}
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
      <TextField
        label="Systolic Ejection Period (ms)"
        type="number"
        value={systolicEjectionPeriod}
        onChange={(e) => setSystolicEjectionPeriod(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mean Gradient (mmHg)"
        type="number"
        value={meanGradient}
        onChange={(e) => setMeanGradient(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Valve Area: {calculateValveArea()} cm²
      </Typography>
    </Box>
  );
};

export default GorlinEquation;