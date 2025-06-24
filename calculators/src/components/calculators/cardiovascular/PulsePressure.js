// PulsePressure.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const PulsePressure = () => {
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');

  const calculatePP = () => {
    if (!systolicBP || !diastolicBP) return '';
    const sbp = parseFloat(systolicBP);
    const dbp = parseFloat(diastolicBP);
    return (sbp - dbp).toFixed(0);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Pulse Pressure Calculator
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
        Pulse Pressure: {calculatePP()} mmHg
      </Typography>
    </Box>
  );
};

export default PulsePressure;