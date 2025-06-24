import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const StrokeVolumeIndex = () => {
  const [strokeVolume, setStrokeVolume] = useState('');
  const [bsa, setBSA] = useState('');

  const calculateSVI = () => {
    const sv = parseFloat(strokeVolume) || 0;
    const bodySurface = parseFloat(bsa) || 0;
    let svi = 0, guidance = '';

    if (sv && bodySurface) {
      svi = (sv / bodySurface).toFixed(2);
      if (svi < 35) {
        guidance = 'Low SVI; consider heart failure or hypovolemia evaluation.';
      } else if (svi > 65) {
        guidance = 'High SVI; consider hyperdynamic states.';
      } else {
        guidance = 'Normal SVI; monitor as needed.';
      }
    }

    return { svi, guidance };
  };

  const { svi, guidance } = calculateSVI();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Stroke Volume Index
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
          label="BSA (m²)"
          type="number"
          value={bsa}
          onChange={(e) => setBSA(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          SVI: {svi} mL/m²
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          SVI assesses cardiac performance. Use with echocardiographic or hemodynamic data.
        </Typography>
      </Box>
    </Box>
  );
};

export default StrokeVolumeIndex;