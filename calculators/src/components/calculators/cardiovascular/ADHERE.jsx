import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ADHERE = () => {
  const [bun, setBUN] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const bunValue = parseFloat(bun);
    const systolicBPValue = parseInt(systolicBP);
    const creatinineValue = parseFloat(creatinine);

    if (
      isNaN(bunValue) ||
      isNaN(systolicBPValue) ||
      isNaN(creatinineValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += bunValue >= 43 ? 1 : 0;
    score += systolicBPValue < 115 ? 1 : 0;
    score += creatinineValue >= 2.75 ? 1 : 0;

    let riskLevel = '';
    if (score === 0) riskLevel = 'Low risk';
    else if (score === 1) riskLevel = 'Intermediate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        ADHERE Risk Score Calculator
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
          Creatinine (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
          placeholder="Enter Creatinine"
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
          Calculate ADHERE Risk Score
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              ADHERE Risk Score
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

export default ADHERE;