import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const WATCHDMScore = () => {
  const [age, setAge] = useState('');
  const [bmi, setBMI] = useState('');
  const [hba1c, setHbA1c] = useState('');
  const [diabetesDuration, setDiabetesDuration] = useState('');
  const [albuminuria, setAlbuminuria] = useState(false);
  const [egfr, setEGFR] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const bmiValue = parseFloat(bmi);
    const hba1cValue = parseFloat(hba1c);
    const diabetesDurationValue = parseInt(diabetesDuration);
    const egfrValue = parseFloat(egfr);

    if (
      isNaN(ageValue) ||
      isNaN(bmiValue) ||
      isNaN(hba1cValue) ||
      isNaN(diabetesDurationValue) ||
      isNaN(egfrValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += ageValue >= 65 ? 2 : ageValue >= 50 ? 1 : 0;
    score += bmiValue >= 30 ? 2 : bmiValue >= 25 ? 1 : 0;
    score += hba1cValue >= 7 ? 2 : hba1cValue >= 6 ? 1 : 0;
    score += diabetesDurationValue >= 10 ? 2 : diabetesDurationValue >= 5 ? 1 : 0;
    score += albuminuria ? 2 : 0;
    score += egfrValue < 60 ? 2 : egfrValue < 90 ? 1 : 0;

    let riskLevel = '';
    if (score <= 4) riskLevel = 'Low risk';
    else if (score <= 8) riskLevel = 'Moderate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        WATCH-DM Score Calculator
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
          BMI (kg/m²)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={bmi}
          onChange={(e) => setBMI(e.target.value)}
          placeholder="Enter BMI"
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
          HbA1c (%)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={hba1c}
          onChange={(e) => setHbA1c(e.target.value)}
          placeholder="Enter HbA1c"
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
          Diabetes Duration (years)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={diabetesDuration}
          onChange={(e) => setDiabetesDuration(e.target.value)}
          placeholder="Enter Diabetes Duration"
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
          Albuminuria
        </Typography>
        <Switch
          checked={albuminuria}
          onChange={(e) => setAlbuminuria(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          eGFR (mL/min/1.73 m²)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={egfr}
          onChange={(e) => setEGFR(e.target.value)}
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
          Calculate WATCH-DM
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              WATCH-DM Score
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

export default WATCHDMScore;