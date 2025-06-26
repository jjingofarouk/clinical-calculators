import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

const BispectralIndex = () => {
  const [bis, setBis] = useState(0);

  const handleBisChange = (event, newValue) => {
    setBis(newValue);
  };

  const getBisInterpretation = (value) => {
    if (value >= 80) return 'Awake or lightly sedated';
    if (value >= 60) return 'Moderate sedation, responsive';
    if (value >= 40) return 'General anesthesia, unconscious';
    return 'Deep anesthesia, risk of burst suppression';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Bispectral Index (BIS) for Depth of Anesthesia</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Monitors depth of anesthesia via EEG analysis. BIS 40-60 is typical for general anesthesia. Adjust anesthetic agents to maintain target range and avoid awareness or over-sedation.
      </Typography>
      <Typography>BIS: 0 (deep suppression) to 100 (awake)</Typography>
      <Slider
        value={bis}
        onChange={handleBisChange}
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        sx={{ mt: 2 }}
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        BIS Value: {bis} ({getBisInterpretation(bis)})
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Source: Sigl JC, Chamoun NG. Anesth Analg 1994;79(6):1150-8<br />
        References: Gan TJ, et al. Anesthesiology 1997;87(4):808-15; Avidan MS, et al. N Engl J Med 2011;364(12):1095-105
      </Typography>
    </Box>
  );
};

export default BispectralIndex;