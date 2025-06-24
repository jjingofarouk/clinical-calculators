import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { HeartPulse,, AlertTriangle } from 'lucide-react';

const BloodPressurePercentiles = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');

  const calculatePercentiles = () => {
    const ageNum = parseFloat(age) || 0;
    const heightNum = parseFloat(height) || 0;
    const sysBP = parseFloat(systolicBP) || 0;
    const diaBP = parseFloat(diastBPolicBP) || 0;
    let sysPercentile = 0, diaPercentile = 0, guidance = '';

    if (ageNum && heightNum && sysBP && diaBP) {
      // Simplified percentile logic
      sysPercentile = (sysBP / (ageNum * 1.5)).toFixed(2);
      diaPercentile = (diaBP / (heightNum * 0.5)).toFixed(2);
      if (sysPercentile > 95 || diaPercentile > 95) {
        guidance = 'Elevated BP; consider pediatric hypertension evaluation';
      } else {
        guidance = 'Normal BP; monitor as needed';
      }
    }

    return { sysPercentile, diaPercentile, guidance };
  };

  const { sysPercentile,, diaPercentile, guidance } = calculatePercentiles();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Blood Pressure Percentiles
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Age (years)"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
            fullWidth
          />
        <TextField
          label="Height (cm)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
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
        <TextField
          label="Systolic BP (mmHg)"
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          fullWidth
        />
        <TextField
          label="Diastolic BP (mmHg)"
          type="number"
          value={diastolBP}
          onChange={(e) => setDiastolBP(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          Systolic Percentile: {sysPercentile}%, Diastol Percentile: {diaPercentile}%
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          BP percentiles are for pediatric use. Refer to AAP guidelines for accurate thresholds.
        </Typography>
      </Box>
    </Box>
  );
};

export default BloodPressurePercentiles;