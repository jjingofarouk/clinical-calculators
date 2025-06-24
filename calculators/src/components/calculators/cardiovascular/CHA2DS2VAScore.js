import React, { useState } from 'react';
import { TextField, Typography, Box, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const CHA2DS2VAScore = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [chf, setCHF] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [vascularDisease, setVascularDisease] = useState(false);
  const [diabetes, setDiabetes] = useState(false);

  const calculateCHA2DS2VAScore = () => {
    let score = 0;
    let guidance = '';

    const ageNum = parseFloat(age) || 0;
    if (ageNum >= 75) score += 2;
    else if (ageNum >= 65) score += 1;

    if (gender === 'female') score += 1;
    if (chf) score += 1;
    if (hypertension) score += 1;
    if (stroke) score += 2;
    if (vascularDisease) score += 1;
    if (diabetes) score += 1;

    if (score >= 2) {
      guidance = 'High stroke risk; anticoagulation recommended.';
    } else if (score === 1) {
      guidance = 'Moderate stroke risk; consider anticoagulation.';
    } else {
      guidance = 'Low stroke risk; anticoagulation may not be needed.';
    }

    return { score, guidance };
  };

  const { score, guidance } = calculateCHA2DS2VAScore();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        CHA₂DS₂-VASc Score
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Age (years)"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
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

      <Box className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormControlLabel
          control={<Checkbox checked={chf} onChange={(e) => setCHF(e.target.checked)} />}
          label="Congestive Heart Failure"
        />
        <FormControlLabel
          control={<Checkbox checked={hypertension} onChange={(e) => setHypertension(e.target.checked)} />}
          label="Hypertension"
        />
        <FormControlLabel
          control={<Checkbox checked={stroke} onChange={(e) => setStroke(e.target.checked)} />}
          label="Prior Stroke/TIA"
        />
        <FormControlLabel
          control={<Checkbox checked={vascularDisease} onChange={(e) => setVascularDisease(e.target.checked)} />}
          label="Vascular Disease"
        />
        <FormControlLabel
          control={<Checkbox checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} />}
          label="Diabetes Mellitus"
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          CHA₂DS₂-VASc Score: {score}
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          CHA₂DS₂-VASc assesses stroke risk in atrial fibrillation. Use with clinical guidelines for anticoagulation decisions.
        </Typography>
      </Box>
    </Box>
  );
};

export default CHA2DS2VAScore;