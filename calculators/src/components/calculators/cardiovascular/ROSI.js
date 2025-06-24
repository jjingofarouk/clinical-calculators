import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const ROSI = () => {
  const [heartRate, setHeartRate] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [spo2, setSpo2] = useState('');

  const calculateROSI = () => {
    const hr = parseFloat(heartRate) || 0;
    const sbp = parseFloat(systolicBP) || 0;
    const oxygen = parseFloat(spo2) || 0;
    let rosi = 0, guidance = '';

    if (hr && sbp && oxygen) {
      rosi = (hr / sbp * (100 / oxygen)).toFixed(2);
      if (rosi > 0.7) {
        guidance = 'Elevated ROSI; assess for respiratory or circulatory compromise.';
      } else {
        guidance = 'Normal ROSI; monitor as needed.';
      }
    }

    return { rosi, guidance };
  };

  const { rosi, guidance } = calculateROSI();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Respiratory Adjusted Shock Index (ROSI)
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
        <TextField
          label="SpO2 (%)"
          type="number"
          value={spo2}
          onChange={(e) => setSpo2(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          ROSI: {rosi}
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          ROSI integrates oxygenation with shock index. Use in critical care settings.
        </Typography>
      </Box>
    </Box>
  );
};

export default ROSI;