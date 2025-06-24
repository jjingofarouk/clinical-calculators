// MAPCalculator.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const MAPCalculator = () => {
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');

  const calculateMAP = () => {
    if (!systolicBP || !diastolicBP) return '';
    const sbp = parseFloat(systolicBP);
    const dbp = parseFloat(diastolicBP);
    return ((2 * dbp + sbp) / 3).toFixed(1);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Mean Arterial Pressure (MAP) Calculator
      </Typography>
      <TextField
        label="Systolic BP (mmHg)"
        type="number"
        value={systolicBP}
        onChange={(e) => setSystolicBP(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diastolic BP (mmHg)"
        type="number"
        value={diastolicBP}
        onChange={(e) => setDiastolicBP(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        MAP: {calculateMAP()} mmHg
      </Typography>
    </Box>
  );
};

export default MAPCalculator;