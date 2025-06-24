import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ADHERE = () => {
  const [bun, setBUN] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const bunValue = parseFloat(bun);
    const systolicBPValue = parseInt(systolicBP);
    const creatinineValue = parseFloat(creatinine);

    if (
      isNaN(bunValue) || bunValue < 0 || bunValue > 200 ||
      isNaN(systolicBPValue) || systolicBPValue < 0 || systolicBPValue > 300 ||
      isNaN(creatinineValue) || creatinineValue < 0 || creatinineValue > 20
    ) {
      setError('Please enter valid values: BUN (0-200 mg/dL), Systolic BP (0-300 mmHg), Creatinine (0-20 mg/dL).');
      return;
    }

    let score = 0;
    score += bunValue >= 43 ? 1 : 0;
    score += systolicBPValue < 115 ? 1 : 0;
    score += creatinineValue >= 2.75 ? 1 : 0;

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score === 0) {
      riskLevel = 'Low Risk';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of in-hospital mortality; standard heart failure management is recommended.';
    } else if (score === 1) {
      riskLevel = 'Intermediate Risk';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk of in-hospital mortality; consider closer monitoring and optimized therapy.';
    } else {
      riskLevel = 'High Risk';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of in-hospital mortality; urgent intervention and intensive care may be required.';
    }

    setResult({ score, riskLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        ADHERE Risk Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The ADHERE Risk Score predicts in-hospital mortality risk in acute decompensated heart failure patients using BUN, systolic BP, and creatinine levels.
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
          Systolic Blood Pressure (mmHg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          placeholder="Normal range: 90-120"
          variant="outlined"
          className="mb-4"
          inputProps={{ min: 0, max: 300 }}
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
          placeholder="Normal range: 0.6-1.2"
          variant="outlined"
          className="mb-4"
          inputProps={{ min: 0, max: 20, step: 0.01 }}
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
          className="w-full py-3 btn-primary"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: 2,
          }}
        >
          Calculate ADHERE Risk Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              ADHERE Risk Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              Score: {result.score}
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
                Source: Fonarow et al., JAMA 2005;293(5):572-580.{' '}
                <a
                  href="https://jamanetwork.com/journals/jama/fullarticle/200331"
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

export default ADHERE;