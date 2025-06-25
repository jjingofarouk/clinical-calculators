import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const C3C4Levels = () => {
  const [c3Level, setC3Level] = useState('');
  const [c4Level, setC4Level] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const c3Value = parseFloat(c3Level);
    const c4Value = parseFloat(c4Level);

    if (isNaN(c3Value) || isNaN(c4Value)) {
      setError('Please enter valid numeric values for C3 and C4 levels.');
      return;
    }

    if (c3Value < 0 || c3Value > 200) {
      setError('C3 level is outside the plausible range (0-200 mg/dL). Please verify.');
      return;
    }
    if (c4Value < 0 || c4Value > 50) {
      setError('C4 level is outside the plausible range (0-50 mg/dL). Please verify.');
      return;
    }

    let level = '';
    let riskColor = '';
    let interpretation = '';

    if (c3Value >= 90 && c4Value >= 15) {
      level = 'Normal';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Normal C3 and C4 levels; unlikely to indicate active autoimmune disease or complement deficiency.';
    } else if (c3Value >= 50 && c4Value >= 10) {
      level = 'Moderately Low';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderately low C3 and/or C4; possible autoimmune disease activity, correlate with clinical findings.';
    } else {
      level = 'Low';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Low C3 and/or C4; strongly suggestive of autoimmune disease or complement deficiency, specialist evaluation required.';
    }

    setResult({ c3: c3Value.toFixed(1), c4: c4Value.toFixed(1), level, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        C3/C4 Levels Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The C3/C4 Levels Calculator assesses complement levels to evaluate autoimmune diseases or complement deficiencies.
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
          C3 Level (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={c3Level}
          onChange={(e) => setC3Level(e.target.value)}
          placeholder="Typical range: 90-180"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          C4 Level (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={c4Level}
          onChange={(e) => setC4Level(e.target.value)}
          placeholder="Typical range: 15-45"
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
          Calculate C3/C4 Levels
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              C3 Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.c3} mg/dL
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              C4 Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.c4} mg/dL
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
              <Typography variant="body2" class="text-gray-600">
                Source: Pickering MC, et al., Adv Immunol 2000;76:227-324. {' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/11079100/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default C3C4Levels;