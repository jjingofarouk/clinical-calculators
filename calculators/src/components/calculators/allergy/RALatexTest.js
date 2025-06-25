import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const RALatexTest = () => {
  const [rfLevel, setRFLevel] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const rfValue = parseFloat(rfLevel);

    if (isNaN(rfValue)) {
      setError('Please enter a valid numeric value for rheumatoid factor.');
      return;
    }

    if (rfValue < 0 || rfValue > 500) {
      setError('Rheumatoid factor is outside the plausible range (0-500 IU/mL). Please verify.');
      return;
    }

    let level = '';
    let riskColor = '';
    let interpretation = '';

    if (rfValue < 20) {
      level = 'Negative';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Negative RF; unlikely to indicate rheumatoid arthritis, consider alternative diagnoses.';
    } else if (rfValue <= 50) {
      level = 'Low Positive';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Low positive RF; possible rheumatoid arthritis, correlate with clinical findings and anti-CCP.';
    } else {
      level = 'High Positive';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High positive RF; strongly suggestive of rheumatoid arthritis, rheumatology evaluation required.';
    }

    setResult({ rf: rfValue.toFixed(1), level, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        RA Latex Test Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The RA Latex Test assesses rheumatoid factor levels to evaluate for rheumatoid arthritis.
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
          Rheumatoid Factor (IU/mL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={rfLevel}
          onChange={(e) => setRFLevel(e.target.value)}
          placeholder="Typical range: 0-20"
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
          Calculate RA Latex Test Result
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Rheumatoid Factor Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.rf} IU/mL
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
                Source: Aletaha D, et al., Arthritis Rheum 2010;62:2569-2581.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/20872595/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default RALatexTest;