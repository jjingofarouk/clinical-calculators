import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const BasophilActivation = () => {
  const [cd63, setCd63] = useState('');
  const [cd203c, setCd203c] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const cd63Value = parseFloat(cd63);
    const cd203cValue = parseFloat(cd203c);

    if (isNaN(cd63Value) {
      setError('Please enter a valid CD63 percentage');
      return;
    }

    if (isNaN(cd203cValue)) {
      setError('Please enter a valid CD203c percentage');
      return;
    }

    let interpretation = '';
    let riskColor = '';

    if (cd63Value < 5 && cd203cValue < 5) {
      interpretation = 'Negative basophil activation - No evidence of IgE-mediated allergy';
      riskColor = 'bg-green-100 text-green-800';
    } else if ((cd63Value >= 5 && cd63Value < 15) || (cd203cValue >= 5 && cd203cValue < 15)) {
      interpretation = 'Low positive basophil activation - Possible mild allergic response';
      riskColor = 'bg-yellow-100 text-yellow-800';
    } else if ((cd63Value >= 15 && cd63Value < 30) || (cd203cValue >= 15 && cd203cValue < 30)) {
      interpretation = 'Moderate positive basophil activation - Likely allergic response';
      riskColor = 'bg-orange-100 text-orange-800';
    } else {
      interpretation = 'Strong positive basophil activation - Strong evidence of IgE-mediated allergy';
      riskColor = 'bg-red-100 text-red-800';
    }

    setResult({ 
      cd63: cd63Value.toFixed(1), 
      cd203c: cd203cValue.toFixed(1), 
      interpretation, 
      riskColor 
    });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Basophil Activation Test
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Measures CD63 and CD203c expression on basophils to detect IgE-mediated allergic responses.
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
          CD63 Expression (%)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={cd63}
          onChange={(e) => setCd63(e.target.value)}
          placeholder="Typical range: 0-50%"
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
          CD203c Expression (%)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={cd203c}
          onChange={(e) => setCd203c(e.target.value)}
          placeholder="Typical range: 0-50%"
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
          className="w-full py-3 btn-primary"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: 2,
          }}
        >
          Evaluate Basophil Activation
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Test Results
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              CD63: {result.cd63}% | CD203c: {result.cd203c}%
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Interpretation
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Reference: Positive test typically >5% expression (varies by lab)
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BasophilActivation;