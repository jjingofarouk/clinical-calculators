import React, { useState } from 'react';
import { TextField, Typography, Box, Select, MenuItem } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const PEWS = () => {
  const [respRate, setRespRate] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [behavior, setBehavior] = useState('');
  const [respEffort, setRespEffort] = useState('');

  const calculatePEWS = () => {
    let score = 0;
    let guidance = '';

    const rr = parseFloat(respRate) || 0;
    const hr = parseFloat(heartRate) || 0;

    if (rr > 30) score += 2;
    else if (rr > 20) score += 1;
    if (hr > 120) score += 2;
    else if (hr > 100) score += 1;
    if (behavior === 'lethargic') score += 2;
    else if (behavior === 'irritable') score += 1;
    if (respEffort === 'severe') score += 2;
    else if (respEffort === 'mild') score += 1;

    if (score >= 4) {
      guidance = 'High PEWS score; urgent pediatric evaluation required.';
    } else if (score >= 2) {
      guidance = 'Moderate PEWS score; close monitoring needed.';
    } else {
      guidance = 'Low PEWS score; routine monitoring.';
    }

    return { score, guidance };
  };

  const { score, guidance } = calculatePEWS();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Pediatric Early Warning Score (PEWS)
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Respiratory Rate (breaths/min)"
          type="number"
          value={respRate}
          onChange={(e) => setRespRate(e.target.value)}
          fullWidth
        />
        <TextField
          label="Heart Rate (bpm)"
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          fullWidth
        />
        <Select
          value={behavior}
          onChange={(e) => setBehavior(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Behavior</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="irritable">Irritable</MenuItem>
          <MenuItem value="lethargic">Lethargic</MenuItem>
        </Select>
        <Select
          value={respEffort}
          onChange={(e) => setRespEffort(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="None">Respiratory Effort</MenuItem>
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="mild">Mild</MenuItem>
          <MenuItem value="severe">Severe</MenuItem>
        </Select>
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          PEWS Score: {score}
        </Typography>
          <Typography variant="body1" className="text-teal-700 mt-2">
            Guidance: {guidance}
          </Typography>
        </Box>

        <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          PEWS identifies pediatric deterioration. Use in hospital settings with clinical judgment.
        </Typography>
      </Box>
    </Box>
  );
};

export default PEWS;