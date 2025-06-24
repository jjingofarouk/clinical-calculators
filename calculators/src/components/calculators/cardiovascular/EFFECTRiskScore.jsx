import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const EFFECTRiskScore = () => {
  const [age, setAge] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [bun, setBUN] = useState('');
  const [sodium, setSodium] = useState('');
  const [hemoglobin, setHemoglobin] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const respiratoryRateValue = parseInt(respiratoryRate);
    const systolicBPValue = parseInt(systolicBP);
    const bunValue = parseFloat(bun);
    const sodiumValue = parseInt(sodium);
    const hemoglobinValue = parseFloat(hemoglobin);

    if (
      isNaN(ageValue) ||
      isNaN(respiratoryRateValue) ||
      isNaN(systolicBPValue) ||
      isNaN(bunValue) ||
      isNaN(sodiumValue) ||
      isNaN(hemoglobinValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += ageValue >= 80 ? 20 : ageValue >= 70 ? 15 : ageValue >= 60 ? 10 : ageValue >= 50 ? 5 : 0;
    score += respiratoryRateValue >= 30 ? 15 : respiratoryRateValue >= 20 ? 10 : 0;
    score += systolicBPValue < 90 ? 20 : systolicBPValue < 100 ? 15 : systolicBPValue < 120 ? 10 : 0;
    score += bunValue >= 60 ? 15 : bunValue >= 30 ? 10 : bunValue >= 15 ? 5 : 0;
    score += sodiumValue < 130 ? 10 : sodiumValue < 135 ? 5 : 0;
    score += hemoglobinValue < 10 ? 10 : hemoglobinValue < 12 ? 5 : 0;

    let riskLevel = '';
    if (score <= 60) riskLevel = 'Low risk';
    else if (score <= 90) riskLevel = 'Intermediate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        EFFECT Risk Score Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
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
          Respiratory Rate (breaths/min)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={respiratoryRate}
          onChange={(e) => setRespiratoryRate(e.target.value)}
          placeholder="Enter Respiratory Rate"
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
          Systolic Blood Pressure (mmHg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          placeholder="Enter Systolic BP"
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
          Sodium (mEq/L)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={sodium}
          onChange={(e) => setSodium(e.target.value)}
          placeholder="Enter Sodium"
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
          Hemoglobin (g/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={hemoglobin}
          onChange={(e) => setHemoglobin(e.target.value)}
          placeholder="Enter Hemoglobin"
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
          Calculate EFFECT Risk Score
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              EFFECT Risk Score
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

export default EFFECTRiskScore;