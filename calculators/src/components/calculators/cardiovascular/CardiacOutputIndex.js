// CardiacOutputIndex.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const CardiacOutputIndex = () => {
  const [cardiacOutput, setCardiacOutput] = useState('');
  const [bsa, setBsa] = useState('');

  const calculateCI = () => {
    if (!cardiacOutput || !bsa) return '';
    const co = parseFloat(cardiacOutput);
    const b = parseFloat(bsa);
    return (co / b).toFixed(2);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Cardiac Index Calculator
      </Typography>
      <TextField
        label="Cardiac Output (L/min)"
        type="number"
        value={cardiacOutput}
        onChange={(e) => setCardiacOutput(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Body Surface Area (m²)"
        type="number"
        value={bsa}
        onChange={(e) => setBsa(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Cardiac Index: {calculateCI()} L/min/m²
      </Typography>
    </Box>
  );
};

export default CardiacOutputIndex;