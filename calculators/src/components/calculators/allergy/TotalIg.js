import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const TotalIgG = () => {
  const [iggLevel, setIggLevel] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const level = parseFloat(iggLevel);
    const ageValue = parseInt(age);

    if (isNaN(level)) {
      setError('Please enter a valid IgG level');
      return;
    }

    if (isNaN(ageValue)) {
      setError('Please enter a valid age');
      return;
    }

    let normalRange = '';
    let interpretation = '';
    let riskColor = '';

    if (ageValue >= 18) {
      // Adult ranges
      normalRange = '700-1600 mg/dL';
      if (level < 400) {
        interpretation = 'Severe IgG deficiency - High risk of recurrent infections';
        riskColor = 'bg-red-100 text-red-800';
      } else if (level < 600) {
        interpretation = 'Moderate IgG deficiency - Increased infection risk';
        riskColor = 'bg-orange-100 text-orange-800';
      } else if (level < 700) {
        interpretation = 'Mild IgG deficiency - Possible increased infection risk';
        riskColor = 'bg-yellow-100 text-yellow-800';
      } else if (level <= 1600) {
        interpretation = 'Normal IgG level';
        riskColor = 'bg-green-100 text-green-800';
      } else {
        interpretation = 'Elevated IgG - Possible chronic infection or autoimmune disease';
        riskColor = 'bg-purple-100 text-purple-800';
      }
    } else {
      // Pediatric ranges (simplified)
      normalRange = 'Age-dependent (typically 300-1200 mg/dL in children)';
      if (level < 200) {
        interpretation = 'Severe IgG deficiency - High risk of recurrent infections';
        riskColor = 'bg-red-100 text-red-800';
      } else if (level < 400) {
        interpretation = 'Moderate IgG deficiency - Increased infection risk';
        riskColor = 'bg-orange-100 text-orange-800';
      } else if (level < ageValue * 20 + 200) { // Simplified pediatric calculation
        interpretation = 'Mild IgG deficiency - Possible increased infection risk';
        riskColor = 'bg-yellow-100 text-yellow-800';
      } else if (level <= 1200) {
        interpretation = 'Normal IgG level for age';
        riskColor = 'bg-green-100 text-green-800';
      } else {
        interpretation = 'Elevated IgG - Possible chronic infection or autoimmune disease';
        riskColor = 'bg-purple-100 text-purple-800';
      }
    }

    setResult({ 
      level: level.toFixed(0),
      normalRange,
      interpretation,
      riskColor
    });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Total IgG Level Evaluation
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Assesses total immunoglobulin G (IgG) levels for evaluation of immune function.
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
          IgG Level (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={iggLevel}
          onChange={(e) => setIggLevel(e.target.value)}
          placeholder="Typical adult range: 700-1600 mg/dL"
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
          Patient Age (years)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter patient age for appropriate reference range"
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
          Evaluate IgG Level
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              IgG Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.level} mg/dL (Normal range: {result.normalRange})
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
                Reference: IgG levels vary by age and laboratory methods
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TotalIgG;