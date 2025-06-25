import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const AllergicRhinitisScore = () => {
  const [nasalCongestion, setNasalCongestion] = useState('');
  const [rhinorrhea, setRhinorrhea] = useState('');
  const [sneezing, setSneezing] = useState('');
  const [nasalItching, setNasalItching] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const scores = [nasalCongestion, rhinorrhea, sneezing, nasalItching].map(parseInt);

    if (scores.some(isNaN)) {
      setError('Please enter valid numeric values (0-3) for all symptoms.');
      return;
    }

    if (scores.some(v => v < 0 || v > 3)) {
      setError('All scores must be between 0 and 3. Please verify.');
      return;
    }

    const score = scores.reduce((sum, val) => sum + val, 0);

    let severity = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 4) {
      severity = 'Mild';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Mild allergic rhinitis; non-sedating antihistamines or nasal corticosteroids may suffice.';
    } else if (score <= 8) {
      severity = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate allergic rhinitis; consider combination therapy and allergen avoidance.';
    } else {
      severity = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Severe allergic rhinitis; specialist referral and immunotherapy may be required.';
    }

    setResult({ score, severity, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Allergic Rhinitis Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Allergic Rhinitis Score assesses symptom severity in patients with allergic rhinitis using a four-symptom scale.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        {[
          { label: 'Nasal Congestion', set: setNasalCongestion, value: nasalCongestion },
          { label: 'Rhinorrhea', set: setRhinorrhea, value: rhinorrhea },
          { label: 'Sneezing', set: setSneezing, value: sneezing },
          { label: 'Nasal Itching', set: setNasalItching, value: nasalItching }
        ].map(({ label, set, value }, index) => (
          <Box key={index} className="mb-4">
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              {label} (0-3)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder="Score: 0 (none) to 3 (severe)"
              variant="outlined"
              sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
            />
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate Allergic Rhinitis Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Allergic Rhinitis Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Severity
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.severity}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Bousquet J, et al., J Allergy Clin Immunol 2008;122:S1-84.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/19014771/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default AllergicRhinitisScore;