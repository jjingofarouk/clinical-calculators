import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const FeNO = () => {
  const [feno, setFeNO] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const fenoValue = parseFloat(feno);

    if (isNaN(fenoValue)) {
      setError('Please enter a valid numeric value for FeNO.');
      return;
    }

    if (fenoValue < 0 || fenoValue > 300) {
      setError('FeNO is outside the plausible range (0-300 ppb). Please verify.');
      return;
    }

    let level = '';
    let riskColor = '';
    let interpretation = '';

    if (fenoValue < 25) {
      level = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low FeNO; unlikely eosinophilic airway inflammation, consider alternative diagnoses.';
    } else if (fenoValue <= 50) {
      level = 'Intermediate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Intermediate FeNO; possible eosinophilic inflammation, correlate with clinical symptoms.';
    } else {
      level = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High FeNO; likely eosinophilic airway inflammation, consider corticosteroids and specialist referral.';
    }

    setResult({ feno: fenoValue.toFixed(1), level, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        FeNO Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The FeNO Calculator assesses fractional exhaled nitric oxide to evaluate airway inflammation in asthma patients.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          FeNO (ppb)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={feno}
          onChange={(e) => setFeNO(e.target.value)}
          placeholder="Typical range: 5-50"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate FeNO Level
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              FeNO Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.feno} ppb
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Level
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.level}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Dweik RA, et al., Am J Respir Crit Care Med 2011;184:602-615.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/21885636/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default FeNO;