import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const HEARTRiskScore = () => {
  const [history, setHistory] = useState('');
  const [ecg, setECG] = useState('');
  const [age, setAge] = useState('');
  const [riskFactors, setRiskFactors] = useState('');
  const [troponin, setTroponin] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const historyValue = parseInt(history);
    const ecgValue = parseInt(ecg);
    const ageValue = parseInt(age);
    const riskFactorsValue = parseInt(riskFactors);
    const troponinValue = parseInt(troponin);

    if (
      isNaN(historyValue) ||
      isNaN(ecgValue) ||
      isNaN(ageValue) ||
      isNaN(riskFactorsValue) ||
      isNaN(troponinValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = historyValue + ecgValue + ageValue + riskFactorsValue + troponinValue;

    let riskLevel = '';
    if (score <= 3) riskLevel = 'Low risk';
    else if (score <= 6) riskLevel = 'Moderate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        HEART Risk Score Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          History (0-2)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          placeholder="Enter History Score (0-2)"
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
          ECG (0-2)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={ecg}
          onChange={(e) => setECG(e.target.value)}
          placeholder="Enter ECG Score (0-2)"
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
          Age (0-2)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age Score (0-2)"
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
          Risk Factors (0-2)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={riskFactors}
          onChange={(e) => setRiskFactors(e.target.value)}
          placeholder="Enter Risk Factors Score (0-2)"
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
          Troponin (0-2)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={troponin}
          onChange={(e) => setTroponin(e.target.value)}
          placeholder="Enter Troponin Score (0-2)"
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
          Calculate HEART Risk Score
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              HEART Risk Score
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

export default HEARTRiskScore;