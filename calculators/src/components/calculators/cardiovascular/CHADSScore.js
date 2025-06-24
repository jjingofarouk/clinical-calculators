import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const CHADSScore = () => {
  const [congestiveHeartFailure, setCongestiveHeartFailure] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [age, setAge] = useState('');
  const [diabetes, setDiabetes] = useState(false);
  const [strokeHistory, setStrokeHistory] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    let score = 0;
    score += congestiveHeartFailure ? 1 : 0;
    score += hypertension ? 1 : 0;
    score += ageValue >= 75 ? 1 : 0;
    score += diabetes ? 1 : 0;
    score += strokeHistory ? 2 : 0;

    let riskLevel = '';
    if (score === 0) riskLevel = 'Low risk (0%)';
    else if (score === 1) riskLevel = 'Low-moderate risk (1.3%)';
    else if (score === 2) riskLevel = 'Moderate risk (2.2%)';
    else if (score === 3) riskLevel = 'Moderate-high risk (3.2%)';
    else if (score === 4) riskLevel = 'High risk (4.0%)';
    else if (score === 5) riskLevel = 'Very high risk (6.7%)';
    else riskLevel = 'Extremely high risk (9.8%)';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        CHADS₂ Risk Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Congestive Heart Failure
        </Typography>
        <Switch
          checked={congestiveHeartFailure}
          onChange={(e) => setCongestiveHeartFailure(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Hypertension
        </Typography>
        <Switch
          checked={hypertension}
          onChange={(e) => setHypertension(e.target.checked)}
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
          Diabetes Mellitus
        </Typography>
        <Switch
          checked={diabetes}
          onChange={(e) => setDiabetes(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Stroke/TIA History
        </Typography>
        <Switch
          checked={strokeHistory}
          onChange={(e) => setStrokeHistory(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
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
          Calculate CHADS₂
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              CHADS₂ Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="header">
              Risk Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result.riskLevel}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CHADSScore;