import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const EosinophilCount = () => {
  const [absoluteCount, setAbsoluteCount] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const count = parseFloat(absoluteCount);

    if (isNaN(count)) {
      setError('Please enter a valid numeric value');
      return;
    }

    let interpretation = '';
    let riskColor = '';

    if (count < 0.05) {
      interpretation = 'Normal eosinophil count';
      riskColor = 'bg-green-100 text-green-800';
    } else if (count <= 0.5) {
      interpretation = 'Mild eosinophilia - Possible causes: allergies, asthma, atopic dermatitis, drug reactions';
      riskColor = 'bg-yellow-100 text-yellow-800';
    } else if (count <= 1.5) {
      interpretation = 'Moderate eosinophilia - Possible causes: parasitic infections, autoimmune diseases, some malignancies';
      riskColor = 'bg-orange-100 text-orange-800';
    } else {
      interpretation = 'Severe eosinophilia - Possible causes: hypereosinophilic syndrome, eosinophilic leukemia, parasitic infections';
      riskColor = 'bg-red-100 text-red-800';
    }

    setResult({ count: count.toFixed(2), interpretation, riskColor });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Eosinophil Count Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Evaluates absolute eosinophil count (cells/μL) to assess for eosinophilia and potential underlying conditions.
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
          Absolute Eosinophil Count (cells/μL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={absoluteCount}
          onChange={(e) => setAbsoluteCount(e.target.value)}
          placeholder="Typical range: 0-500 cells/μL"
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
          Evaluate Eosinophil Count
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Eosinophil Count
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.count} cells/μL
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
                Reference: Normal range typically 0-500 cells/μL (0.05-0.5 × 10⁹/L)
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EosinophilCount;