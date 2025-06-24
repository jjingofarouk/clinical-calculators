// SVRCalculator.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const SVRCalculator = () => {
  const [map, setMap] = useState('');
  const [cvp, setCvp] = useState('');
  const [cardiacOutput, setCardiacOutput] = useState('');

  const calculateSVR = () => {
    if (!map || !cvp || !cardiacOutput || cardiacOutput === '0') return '';
    const m = parseFloat(map);
    const c = parseFloat(cvp);
    const co = parseFloat(cardiacOutput);
    return ((m - c) * 80 / co).toFixed(0);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Systemic Vascular Resistance (SVR) Calculator
      </Typography>
      <TextField
        label="Mean Arterial Pressure (mmHg)"
        type="number"
        value={map}
        onChange={(e) => setMap(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Central Venous Pressure (mmHg)"
        type="number"
        value={cvp}
        onChange={(e) => setCvp(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cardiac Output (L/min)"
        type="number"
        value={cardiacOutput}
        onChange={(e) => setCardiacOutput(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        SVR: {calculateSVR()} dyn·s/cm⁵
      </Typography>
    </Box>
  );
};

export default SVRCalculator;