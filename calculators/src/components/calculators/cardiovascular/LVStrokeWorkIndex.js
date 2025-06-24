import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const LVStrokeWorkIndex = () => {
  const [strokeVolume, setStrokeVolume] = useState('');
  const [meanBP, setMeanBP] = useState('');
  const [pcwp, setPCWP] = useState('');
  const [bsa, setBSA] = useState('');

  const calculateLVSWI = () => {
    const sv = parseFloat(strokeVolume) || 0;
    const mbp = parseFloat(meanBP) || 0;
    const wedge = parseFloat(pcwp) || 0;
    const bodySurface = parseFloat(bsa) || 0;
    let lvswi = 0, guidance = '';

    if (sv && mbp && wedge && bodySurface) {
      lvswi = ((sv * (mbp - wedge) * 0.6) / bodySurface).toFixed(2);
      if (lvswi < 35) {
        guidance = 'Low LVSWI; assess for cardiogenic shock or LV dysfunction';
      } else {
        guidance = 'Normal LVSWI; monitor as needed.';
      }
    }

    return { lvswi, guidance };
  };

  const { lvswi, guidance } = calculateLVSWI();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Left Ventricular Stroke Work Index
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Stroke Volume (mL)"
          type="number"
          value={strokeVolume}
          onChange={(e) => setStrokeVolume(e.target.value)}
          fullWidth
        />
        <TextField
          label="Mean BP (mmHg)"
          type="number"
          value={meanBP}
          onChange={(e) => setMeanBP(e.target.value)}
          fullWidth
        />
        <TextField
          label="PCWP (mmHg)"
          type="number"
          value={pcwp}
          onChange={(e) => setPCWP(e.target.value)}
          fullWidth
        />
        <TextField
          label="BSA (m²)"
          type="number"
          value={bsa}
          onChange={(e) => setBSA(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          LVSWI: {lvswi} g·m/m²
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          LVSWI evaluates LV performance. Use in critical care settings with hemodynamic data.
        </Typography>
      </Box>
    </Box>
  );
};

export default LVStrokeWorkIndex;