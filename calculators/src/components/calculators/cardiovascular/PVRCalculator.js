// PVRCalculator.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const PVRCalculator = () => {
  const [mpap, setMpap] = useState('');
  const [pcwp, setPcwp] = useState('');
  const [cardiacOutput, setCardiacOutput] = useState('');

  const calculatePVR = () => {
    if (!mpap || !pcwp || !cardiacOutput || cardiacOutput === '0') return '';
    const m = parseFloat(mpap);
    const p = parseFloat(pcwp);
    const co = parseFloat(cardiacOutput);
    return ((m - p) * 80 / co).toFixed(0);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Pulmonary Vascular Resistance (PVR) Calculator
      </Typography>
      <TextField
        label="Mean Pulmonary Artery Pressure (mmHg)"
        type="number"
        value={mpap}
        onChange={(e) => setMpap(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pulmonary Capillary Wedge Pressure (mmHg)"
        type="number"
        value={pcwp}
        onChange={(e) => setPcwp(e.target.value)}
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
        PVR: {calculatePVR()} dyn·s/cm⁵
      </Typography>
    </Box>
  );
};

export default PVRCalculator;