import React, { useState } from 'react';
import { TextField, Typography, Box, Select, MenuItem } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const AorticValveCalciumScore = () => {
  const [agatstonScore, setAgatstonScore] = useState('');
  const [calciumVolume, setCalciumVolume] = useState('');
  const [valveArea, setValveArea] = useState('');
  const [aorticRoot, setAorticRoot] = useState('');

  const calculateScore = () => {
    let riskLevel = 'Low';
    let guidance = '';

    const score = parseFloat(agatstonScore) || 0;
    const volume = parseFloat(calciumVolume) || 0;

    if (score > 2000 || volume > 1000) {
      riskLevel = 'Severe';
      guidance = 'High risk of severe aortic stenosis; consider TAVR or surgical intervention.';
    } else if (score > 1000 || volume > 500) {
      riskLevel = 'Moderate';
      guidance = 'Moderate risk; monitor closely with echocardiography.';
    } else if (score > 0 || volume > 0) {
      riskLevel = 'Mild';
      guidance = 'Low risk; routine follow-up recommended.';
    } else {
      guidance = 'No significant calcification detected.';
    }

    return { riskLevel, guidance };
  };

  const { riskLevel, guidance } = calculateScore();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Aortic Valve Calcium Score
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Agatston Score (HU)"
          type="number"
          value={agatstonScore}
          onChange={(e) => setAgatstonScore(e.target.value)}
          fullWidth
        />
        <TextField
          label="Calcium Volume (mm³)"
          type="number"
          value={calciumVolume}
          onChange={(e) => setCalciumVolume(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Valve Area (cm²)"
          type="number"
          value={valveArea}
          onChange={(e) => setValveArea(e.target.value)}
          fullWidth
        />
        <Select
          value={aorticRoot}
          onChange={(e) => setAorticRoot(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Aortic Root Status</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="dilated">Dilated</MenuItem>
          <MenuItem value="aneurysmal">Aneurysmal</MenuItem>
        </Select>
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          Risk Level: {riskLevel}
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          Aortic valve calcium scoring aids in assessing aortic stenosis severity. Consult imaging guidelines for accurate interpretation.
        </Typography>
      </Box>
    </Box>
  );
};

export default AorticValveCalciumScore;