import React, { useState } from 'react';
import { TextField, Typography, Box, Select, MenuItem } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const LVMassIndex = () => {
  const [lvMass, setLVMass] = useState('');
  const [bsa, setBSA] = useState('');
  const [gender, setGender] = useState('');

  const calculateLVMassIndex = () => {
    const mass = parseFloat(lvMass) || 0;
    const bodySurface = parseFloat(bsa) || 0;
    let lvmi = 0;
    let guidance = '';

    if (mass && bodySurface) {
      lvmi = (mass / bodySurface).toFixed(2);
      if (gender === 'male' && lvmi > 115 || gender === 'female' && lvmi > 95) {
        guidance = 'Elevated LVMI; consider left ventricular hypertrophy evaluation.';
      } else {
        guidance = 'Normal LVMI; monitor as needed.';
      }
    }

    return { lvmi, guidance };
  };

  const { lvmi, guidance } = calculateLVMassIndex();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Left Ventricular Mass Index
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="LV Mass (g)"
          type="number"
          value={lvMass}
          onChange={(e) => setLVMass(e.target.value)}
          fullWidth
        />
        <TextField
          label="BSA (m²)"
          type="number"
          value={bsa}
          onChange={(e) => setBSA(e.target.value)}
          fullWidth
        />
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          LVMI: {lvmi} g/m²
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          LVMI is used to assess left ventricular hypertrophy. Confirm with echocardiography.
        </Typography>
      </Box>
    </Box>
  );
};

export default LVMassIndex;