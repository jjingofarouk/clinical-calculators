import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const ShockIndex = () => {
  const [heartRate, setHeartRate] = useState('');
  const [systolicBP, setSystolicBP] = useState('');

  const calculateShockIndex = () => {
    const hr = parseFloat(heartRate) || 0;
    const sbp = parseFloat(systolicBP) || 0;
    let shockIndex = 0, guidance = '';

    if (hr && sbp) {
      shockIndex = (hr / sbp).toFixed(2);
      if (shockIndex > 0.9) {
        guidance = 'Elevated shock index; assess for shock or hemodynamic instability.';
      } else {
        guidance = 'Normal shock index; monitor as needed.';
      }
    }

    return { shockIndex, guidance };
  };

  const { shockIndex, guidance } = calculateShockIndex();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Shock Index
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Heart Rate (bpm)"
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          fullWidth
        />
        <TextField
          label="Systolic BP (mmHg)"
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          Shock Index: {shockIndex}
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          Shock Index screens for hemodynamic instability. Use in acute settings with clinical correlation.
        </Typography>
      </Box>
    </Box>
  );
};

export default ShockIndex;