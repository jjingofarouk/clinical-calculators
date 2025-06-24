import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const BAGADHFScore = () => {
  const [bun, setBUN] = useState('');
  const [age, setAge] = useState('');
  const [gfr, setGFR] = useState('');
  const [diureticResponse, setDiureticResponse] = useState('');
  const [hypotension, setHypotension] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const bunValue = parseFloat(bun);
    const ageValue = parseInt(age);
    const gfrValue = parseFloat(gfr);
    const diureticResponseValue = parseFloat(diureticResponse);

    if (
      isNaN(bunValue) || bunValue < 0 || bunValue > 200 ||
      isNaN(ageValue) || ageValue < 18 || ageValue > 120 ||
      isNaN(gfrValue) || gfrValue < 0 || gfrValue > 200 ||
      isNaN(diureticResponseValue) || diureticResponseValue < 0 || diureticResponseValue > 10
    ) {
      setError('Please enter valid values: BUN (0-200 mg/dL), Age (18-120 years), eGFR (0-200 mL/min/1.73 m²), Diuretic Response (0-10 kg/mg).');
      return;
    }

    let score = 0;
    score += bunValue > 30 ? 2 : bunValue > 20 ? 1 : 0;
    score += ageValue >= 70 ? 2 : ageValue >= 50 ? 1 : 0;
    score += gfrValue < 60 ? 2 : gfrValue < 90 ? 1 : 0;
    score += diureticResponseValue < 0.5 ? 2 : diureticResponseValue < 1 ? 1 : 0;
    score += hypotension ? 2 : 0;

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 3) {
      riskLevel = 'Low Risk';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of adverse outcomes in acute decompensated heart failure; standard management and follow-up recommended.';
    } else if (score <= 6) {
      riskLevel = 'Moderate Risk';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk of adverse outcomes; consider intensified therapy and close monitoring.';
    } else {
      riskLevel = 'High Risk';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of adverse outcomes; urgent intervention and intensive care may be required.';
    }

    setResult({ score, riskLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        BAG-ADHF Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The BAG-ADHF Score predicts adverse outcomes in acute decompensated heart failure patients using BUN, age, eGFR, diuretic response, and hypotension status.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="error" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Blood Urea Nitrogen (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={bun}
          onChange={(e) => setBUN(e.target.value)}
          placeholder="Normal range: 7-20"
          variant="outlined"
          className="mb-4"
          inputProps={{ min: 0, max: 200, step: 0.1 }}
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
          Age (years)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Normal range: 18-120"
          variant="outlined"
          className="mb-4"
          inputProps={{ min: 18, max: 120 }}
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
          placeholder="Normal range: 90-120"
          variant="outlined"
          className="mb-4"
          inputProps={{ min: 0, max: 200, step: 0.1 }}
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
          placeholder="Normal range: 0-10"
          variant="outlined"
          className="mb-4"
          inputProps={{ min: 0, max: 10, step: 0.01 }}
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

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Hypotension (SBP < 90 mmHg)
          </Typography>
          <Switch
            checked={hypotension}
            onChange={(e) => setHypotension(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: 2,
          }}
        >
          Calculate BAG-ADHF Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              BAG-ADHF Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Risk Level
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.riskLevel}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Valente et al., JACC Heart Fail 2014;2(2):141-148.{' '}
                <a
                  href="https://www.jacc.org/doi/10.1016/j.jchf.2013.10.008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline"
                >
                  Read study
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BAGADHFScore;