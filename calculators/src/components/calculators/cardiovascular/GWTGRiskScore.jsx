import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const GWTGRiskScore = () => {
  const [age, setAge] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [weight, setWeight] = useState('');
  const [chronicHeartFailure, setChronicHeartFailure] = useState(false);
  const [chronicLungDisease, setChronicLungDisease] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [hypotension, setHypotension] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const heartRateValue = parseInt(heartRate);
    const systolicBPValue = parseInt(systolicBP);
    const weightValue = parseInt(weight);

    if (
      isNaN(ageValue) ||
      isNaN(heartRateValue) ||
      isNaN(systolicBPValue) ||
      isNaN(weightValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += ageValue >= 80 ? 2 : ageValue >= 60 ? 1 : 0;
    score += heartRateValue >= 100 ? 2 : heartRateValue >= 80 ? 1 : 0;
    score += systolicBPValue < 100 ? 3 : systolicBPValue < 120 ? 2 : systolicBPValue < 140 ? 1 : 0;
    score += weightValue < 60 ? 2 : weightValue < 80 ? 1 : 0;
    score += chronicHeartFailure ? 2 : 0;
    score += chronicLungDisease ? 1 : 0;
    score += diabetes ? 1 : 0;
    score += hypotension ? 2 : 0;

    let riskLevel = '';
    if (score <= 4) riskLevel = 'Low risk';
    else if (score <= 8) riskLevel = 'Intermediate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        GWTG Risk Score Calculator
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
          Heart Rate (bpm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="Enter Heart Rate"
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
          Weight (kg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter Weight"
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
          Chronic Heart Failure
        </Typography>
        <Switch
          checked={chronicHeartFailure}
          onChange={(e) => setChronicHeartFailure(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Chronic Lung Disease
        </Typography>
        <Switch
          checked={chronicLungDisease}
          onChange={(e) => setChronicLungDisease(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Diabetes
        </Typography>
        <Switch
          checked={diabetes}
          onChange={(e) => setDiabetes(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
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
          Calculate GWTG Risk Score
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              GWTG Risk Score
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

export default GWTGRiskScore;