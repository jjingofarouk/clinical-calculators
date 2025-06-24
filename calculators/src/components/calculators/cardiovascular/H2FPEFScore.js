import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const H2FPEFScore = () => {
  const [obesity, setObesity] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [atrialFibrillation, setAtrialFibrillation] = useState(false);
  const [pulmonaryHypertension, setPulmonaryHypertension] = useState(false);
  const [age, setAge] = useState('');
  const [eERatio, setEERatio] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const eERatioValue = parseFloat(eERatio);
    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age.");
      return;
    }
    if (isNaN(eERatioValue) || eERatioValue <= 0) {
      alert("Please enter a valid E/e' ratio.");
      return;
    }

    let score = 0;
    score += obesity ? 2 : 0;
    score += hypertension ? 2 : 0;
    score += atrialFibrillation ? 1 : 0;
    score += pulmonaryHypertension ? 1 : 0;
    score += ageValue > 60 ? 1 : 0;
    score += eERatioValue > 9 ? 3 : 0;

    let probability = '';
    if (score <= 1) probability = 'Low probability of HFpEF';
    else if (score <= 5) probability = 'Intermediate probability of HFpEF';
    else probability = 'High probability of HFpEF';

    setResult({ score, probability });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        H₂FPEF Score Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Obesity (BMI >30 kg/m²)
        </Typography>
        <Switch
          checked={obesity}
          onChange={(e) => setObesity(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Hypertension (≥2 meds or uncontrolled)
        </Typography>
        <Switch
          checked={hypertension}
          onChange={(e) => setHypertension(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Atrial Fibrillation
        </Typography>
        <Switch
          checked={atrialFibrillation}
          onChange={(e) => setAtrialFibrillation(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Pulmonary Hypertension (RVSP >35 mmHg)
        </Typography>
        <Switch
          checked={pulmonaryHypertension}
          onChange={(e) => setPulmonaryHypertension(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Age
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
          variant="outlined"
          className="mb-4"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
          }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          E/e' Ratio
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={eERatio}
          onChange={(e) => setEERatio(e.target.value)}
          placeholder="Enter E/e' Ratio"
          variant="outlined"
          className="mb-4"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
          }}
        >
          Calculate H₂FPEF
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              H₂FPEF Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="header">
              Probability
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result.probability}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default H2FPEFScore;