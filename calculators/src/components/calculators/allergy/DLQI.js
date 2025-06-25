import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const DLQI = () => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q7, setQ7] = useState('');
  const [q8, setQ8] = useState('');
  const [q9, setQ9] = useState('');
  const [q10, setQ10] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const scores = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10].map(parseInt);

    if (scores.some(isNaN)) {
      setError('Please enter valid numeric values (0-3) for all questions.');
      return;
    }

    if (scores.some(v => v < 0 || v > 3)) {
      setError('All scores must be between 0 and 3. Please verify.');
      return;
    }

    const score = scores.reduce((sum, val) => sum + val, 0);

    let impact = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 1) {
      impact = 'No effect';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'No effect on quality of life; minimal intervention needed.';
    } else if (score <= 5) {
      impact = 'Small effect';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Small effect on quality of life; consider topical treatments and counseling.';
    } else if (score <= 10) {
      impact = 'Moderate effect';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate effect on quality of life; specialist referral and targeted therapy recommended.';
    } else if (score <= 20) {
      impact = 'Very large effect';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Very large effect on quality of life; systemic therapy and psychological support may be required.';
    } else {
      impact = 'Extremely large effect';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Extremely large effect on quality of life; urgent specialist intervention and comprehensive management needed.';
    }

    setResult({ score, impact, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        DLQI Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The DLQI assesses the impact of skin disease on quality of life in patients with dermatological conditions.
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
          { label: 'Q1: Itchy, sore, painful, or stinging skin', set: setQ1, value: q1 },
          { label: 'Q2: Embarrassment or self-consciousness', set: setQ2, value: q2 },
          { label: 'Q3: Interference with shopping or household', set: setQ3, value: q3 },
          { label: 'Q4: Influence on clothing choices', set: setQ4, value: q4 },
          { label: 'Q5: Effect on social or leisure activities', set: setQ5, value: q5 },
          { label: 'Q6: Difficulty with sports', set: setQ6, value: q6 },
          { label: 'Q7: Impact on work or study', set: setQ7, value: q7 },
          { label: 'Q8: Problems with partner or close relationships', set: setQ8, value: q8 },
          { label: 'Q9: Sexual difficulties', set: setQ9, value: q9 },
          { label: 'Q10: Treatment-related burden', set: setQ10, value: q10 }
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
              placeholder="Score: 0 (not at all) to 3 (very much)"
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
          Calculate DLQI Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              DLQI Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Impact
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.impact}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Finlay AY, Khan GK, Br J Dermatol 1994;132:942-949.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/7515773/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default DLQI;