// EmbolicRiskScore.js
import React, { useState } from 'react';
import { TextField, Typography, Box, FormControlLabel, Checkbox, Slider } from '@mui/material';
import { AlertTriangle, Zap } from 'lucide-react';

const EmbolicRiskScore = () => {
  const [priorStroke, setPriorStroke] = useState(false);
  const [age, setAge] = useState(65);
  const [systolicBP, setSystolicBP] = useState(120);
  const [diabetes, setDiabetes] = useState(false);
  const [chf, setChf] = useState(false);
  const [vascularDisease, setVascularDisease] = useState(false);
  const [female, setFemale] = useState(false);

  const calculateScore = () => {
    let score = 0;
    if (priorStroke) score += 2;
    if (age >= 75) score += 1;
    if (age >= 65 && age < 75) score += 1;
    if (systolicBP >= 160) score += 1;
    if (diabetes) score += 1;
    if (chf) score += 1;
    if (vascularDisease) score += 1;
    if (female) score += 1;

    let risk = '';
    if (score === 0) risk = '0% risk';
    else if (score === 1) risk = '1.3% risk';
    else if (score === 2) risk = '2.2% risk';
    else if (score === 3) risk = '3.2% risk';
    else if (score === 4) risk = '4.0% risk';
    else if (score === 5) risk = '6.7% risk';
    else if (score === 6) risk = '9.8% risk';
    else if (score === 7) risk = '9.6% risk';
    else risk = '15.2% risk';

    return { score, risk };
  };

  const { score, risk } = calculateScore();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <Zap size={20} className="inline mr-2" />
        Embolic Risk Score (for AF patients)
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormControlLabel
          control={<Checkbox checked={priorStroke} onChange={(e) => setPriorStroke(e.target.checked)} />}
          label="Prior stroke/TIA/thromboembolism"
        />
        <FormControlLabel
          control={<Checkbox checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} />}
          label="Diabetes"
        />
        <FormControlLabel
          control={<Checkbox checked={chf} onChange={(e) => setChf(e.target.checked)} />}
          label="CHF"
        />
        <FormControlLabel
          control={<Checkbox checked={vascularDisease} onChange={(e) => setVascularDisease(e.target.checked)} />}
          label="Vascular disease"
        />
        <FormControlLabel
          control={<Checkbox checked={female} onChange={(e) => setFemale(e.target.checked)} />}
          label="Female"
        />
      </Box>

      <Box className="mt-4">
        <Typography gutterBottom>Age: {age}</Typography>
        <Slider
          value={age}
          onChange={(_, newValue) => setAge(newValue)}
          min={20}
          max={100}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box className="mt-4">
        <Typography gutterBottom>Systolic BP: {systolicBP} mmHg</Typography>
        <Slider
          value={systolicBP}
          onChange={(_, newValue) => setSystolicBP(newValue)}
          min={80}
          max={200}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          Score: {score}
        </Typography>
        <Typography variant="h6" className="text-teal-700 mt-2">
          Annual stroke risk: {risk}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          This score estimates the annual risk of stroke in patients with atrial fibrillation not taking anticoagulants.
        </Typography>
      </Box>
    </Box>
  );
};

export default EmbolicRiskScore;