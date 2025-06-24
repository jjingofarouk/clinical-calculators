import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const BAGADHFScore = () => {
  const [bun, setBUN] = useState('');
  const [age, setAge] = useState('');
  const [gfr, setGFR] = useState('');
  const [diureticResponse, setDiureticResponse] = useState('');
  const [hypotension, setHypotension] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const bunValue = parseFloat(bun);
    const ageValue = parseInt(age);
    const gfrValue = parseFloat(gfr);
    const diureticResponseValue = parseFloat(diureticResponse);

    if (
      isNaN(bunValue) ||
      isNaN(ageValue) ||
      isNaN(gfrValue) ||
      isNaN(diureticResponseValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += bunValue > 30 ? 2 : bunValue > 20 ? 1 : 0;
    score += ageValue >= 70 ? 2 : ageValue >= 50 ? 1 : 0;
    score += gfrValue < 60 ? 2 : gfrValue < 90 ? 1 : 0;
    score += diureticResponseValue < 0.5 ? 2 : diureticResponseValue < 1 ? 1 : 0;
    score += hypotension ? 2 : 0;

    let riskLevel = '';
    if (score <= 3) riskLevel = 'Low risk';
    else if (score <= 6) riskLevel = 'Moderate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        BAG-ADHF Score Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Blood Urea Nitrogen (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={bun}
          onChange={(e) => setBUN(e.target.value)}
          placeholder="Enter BUN"
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
          eGFR (mL/min/1.73 m²)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={gfr}
          onChange={(e) => setGFR(e.target.value)}
          placeholder="Enter eGFR"
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
          Diuretic Response (kg weight loss/mg furosemide)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={diureticResponse}
          onChange={(e) => setDiureticResponse(e.target.value)}
          placeholder="Enter Diuretic Response"
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
          Hypotension (SBP <90 mmHg)
        </Typography>
        <Switch
          checked={hypotension}
          onChange={(e) => setHypotension(e.target.checked)}
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
          Calculate BAG-ADHF
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              BAG-ADHF Score
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

export default BAGADHFScore;