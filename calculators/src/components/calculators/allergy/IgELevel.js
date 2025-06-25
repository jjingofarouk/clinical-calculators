import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const IgELevel = () => {
  const [ige, setIgE] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const igeValue = parseFloat(ige);

    if (isNaN(igeValue)) {
      setError('Please enter a valid numeric value for IgE.');
      return;
    }

    if (igeValue < 0 || igeValue > 10000) {
      setError('IgE is outside the plausible range (0-10000 IU/mL). Please verify.');
      return;
    }

    let level = '';
    let riskColor = '';
    let interpretation = '';

    if (igeValue <= 100) {
      level = 'Normal';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Normal IgE level; unlikely to indicate significant allergic disease.';
    } else if (igeValue <= 1000) {
      level = 'Elevated';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Elevated IgE; may indicate allergic conditions or parasitic infections, consider further evaluation.';
    } else {
      level = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High IgE; strongly suggestive of allergic disease or other conditions, specialist referral recommended.';
    }

    setResult({ ige: igeValue.toFixed(1), level, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        IgE Level Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The IgE Level Calculator evaluates serum IgE to assess allergic or atopic conditions in patients.
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
          Serum IgE (IU/mL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={ige}
          onChange={(e) => setIgE(e.target.value)}
          placeholder="Typical range: 0-100"
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
          Calculate IgE Level
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              IgE Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.ige} IU/mL
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
                Source: Bernstein IL, et al., Ann Allergy Asthma Immunol 2008;100:S1-148.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/18431924/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default IgELevel;