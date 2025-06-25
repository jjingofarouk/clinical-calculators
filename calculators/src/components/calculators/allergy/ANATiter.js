import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ANATiter = () => {
  const [anaTiter, setANATiter] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const titerValue = parseInt(anaTiter);

    if (isNaN(titerValue) || titerValue < 0) {
      setError('Please enter a valid numeric value for ANA titer (e.g., 40, 80, 160).');
      return;
    }

    let level = '';
    let riskColor = '';
    let interpretation = '';

    if (titerValue < 80) {
      level = 'Negative/Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Negative or low ANA titer; unlikely to indicate autoimmune disease, consider alternative diagnoses.';
    } else if (titerValue <= 320) {
      level = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate ANA titer; may indicate autoimmune disease, further specific antibody testing recommended.';
    } else {
      level = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High ANA titer; strongly suggestive of autoimmune disease, specialist evaluation and specific antibody testing required.';
    }

    setResult({ titer: titerValue, level, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        ANA Titer Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The ANA Titer Calculator assesses antinuclear antibody levels to evaluate for autoimmune diseases.
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
          ANA Titer (e.g., 40, 80, 160)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={anaTiter}
          onChange={(e) => setANATiter(e.target.value)}
          placeholder="Typical range: 40-1280"
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
          Calculate ANA Titer Level
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              ANA Titer
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              1:{result.titer}
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
                Source: Solomon DH, et al., Arthritis Rheum 2002;47:434-444.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/12209416/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default ANATiter;