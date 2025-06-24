import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button } from '@mui/material';

const HASBLED = () => {
  const [hypertension, setHypertension] = useState(false);
  const [creatinine, setCreatinine] = useState('');
  const [stroke, setStroke] = useState(false);
  const [bleedingHistory, setBleedingHistory] = useState(false);
  const [age, setAge] = useState('');
  const [drugs, setDrugs] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const creatinineValue = parseFloat(creatinine);
    const ageValue = parseInt(age);
    if (isNaN(creatinineValue) || creatinineValue <= 0) {
      alert("Please enter a valid creatinine value.");
      return;
    }
    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    let score = 0;
    score += hypertension ? 1 : 0;
    score += creatinineValue > 2 ? 1 : 0;
    score += stroke ? 1 : 0;
    score += bleedingHistory ? 1 : 0;
    score += ageValue >= 65 ? 1 : 0;
    score += drugs ? 1 : 0;
    score += alcohol ? 1 : 0;

    let riskLevel = '';
    if (score === 0) riskLevel = 'Low risk for major bleeding';
    else if (score === 1) riskLevel = 'Moderate risk for major bleeding';
    else if (score === 2) riskLevel = 'Moderate to high risk for major bleeding';
    else if (score >= 3 && score <= 4) riskLevel = 'High risk of major bleeding';
    else if (score >= 5) riskLevel = 'Very high risk of major bleeding';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        HAS-BLED Risk Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
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
          Creatinine Level (mg/dl)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
          placeholder="Enter Creatinine Level"
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
          Stroke History
        </Typography>
        <Switch
          checked={stroke}
          onChange={(e) => setStroke(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Bleeding History
        </Typography>
        <Switch
          checked={bleedingHistory}
          onChange={(e) => setBleedingHistory(e.target.checked)}
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
          Medications (Aspirin, NSAIDs)
        </Typography>
        <Switch
          checked={drugs}
          onChange={(e) => setDrugs(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Alcohol Consumption (≥8 units/week)
        </Typography>
        <Switch
          checked={alcohol}
          onChange={(e) => setAlcohol(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="btn-primary w-full py-3"
          sx={{ textTransform: 'none', fontWeight: '600' }}
        >
          Calculate HAS-BLED
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              HAS-BLED Score
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

export default HASBLED;