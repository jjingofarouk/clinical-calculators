import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const EARatio = () => {
  const [eWave, setEWave] = useState('');
  const [aWave, setAWave] = useState('');

  const calculateEARatio = () => {
    const e = parseFloat(eWave) || 0;
    const a = parseFloat(aWave) || 0;
    let eaRatio = 0, guidance = '';

    if (e && a) {
      eaRatio = (e / a).toFixed(2);
      if (eaRatio < 0.8) {
        guidance = 'Impaired relaxation; consider diastolic dysfunction.';
      } else if (eaRatio > 2.0) {
        guidance = 'Restrictive filling; evaluate for advanced diastolic dysfunction.';
      } else {
        guidance = 'Normal E/A ratio; monitor as needed.';
      }
    }

    return { eaRatio, guidance };
  };

  const { eaRatio, guidance } = calculateEARatio();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        E/A Ratio
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="E Wave Velocity (cm/s)"
          type="number"
          value={eWave}
          onChange={(e) => setEWave(e.target.value)}
          fullWidth
        />
        <TextField
          label="A Wave Velocity (cm/s)"
          type="number"
          value={aWave}
          onChange={(e) => setAWave(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          E/A Ratio: {eaRatio}
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          E/A Ratio evaluates diastolic function. Interpret with other echo parameters.
        </Typography>
      </Box>
    </Box>
  );
};

export default EARatio;