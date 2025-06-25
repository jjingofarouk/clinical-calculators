import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const RASTScore = () => {
  const [specificIgE, setSpecificIgE] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const specificIgEValue = parseFloat(specificIgE);

    if (isNaN(specificIgEValue)) {
      setError('Please enter a valid numeric value for specific IgE.');
      return;
    }

    if (specificIgEValue < 0 || specificIgEValue > 100) {
      setError('Specific IgE is outside the plausible range (0-100 kU/L). Please verify.');
      return;
    }

    let classLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (specificIgEValue < 0.35) {
      classLevel = 'Class 0';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Negative; unlikely to be allergic to the tested allergen.';
    } else if (specificIgEValue <= 0.7) {
      classLevel = 'Class 1';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low sensitization; clinical allergy is possible but uncommon.';
    } else if (specificIgEValue <= 3.5) {
      classLevel = 'Class 2';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate sensitization; clinical correlation needed to confirm allergy.';
    } else if (specificIgEValue <= 17.5) {
      classLevel = 'Class 3';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'High sensitization; likely allergic, confirm with clinical history.';
    } else if (specificIgEValue <= 50) {
      classLevel = 'Class 4';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Very high sensitization; strong likelihood of clinical allergy.';
    } else if (specificIgEValue <= 100) {
      classLevel = 'Class 5';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Extremely high sensitization; almost certain clinical allergy, specialist management required.';
    } else {
      classLevel = 'Class 6';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Extremely high sensitization; severe allergy likely, urgent specialist referral recommended.';
    }

    setResult({ specificIgE: specificIgEValue.toFixed(2), classLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        RAST Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The RAST Score evaluates specific IgE levels to assess sensitization to allergens in patients with suspected allergies.
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
          Specific IgE (kU/L)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={specificIgE}
          onChange={(e) => setSpecificIgE(e.target.value)}
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
          Calculate RAST Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Specific IgE
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.specificIgE} kU/L
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Class Level
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.classLevel}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Sampson HA, J Allergy Clin Immunol 2004;113:805-819.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/15131561/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default RASTScore;