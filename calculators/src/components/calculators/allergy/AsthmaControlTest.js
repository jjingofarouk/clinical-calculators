import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const AsthmaControlTest = () => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const scores = [q1, q2, q3, q4, q5].map(parseInt);

    if (scores.some(isNaN)) {
      setError('Please enter valid numeric values (1-5) for all questions.');
      return;
    }

    if (scores.some(v => v < 1 || v > 5)) {
      setError('All scores must be between 1 and 5. Please verify.');
      return;
    }

    const score = scores.reduce((sum, val) => sum + val, 0);

    let control = '';
    let riskColor = '';
    let interpretation = '';

    if (score >= 20) {
      control = 'Well-controlled';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Asthma is well-controlled; continue current management and regular follow-up.';
    } else if (score >= 16) {
      control = 'Not well-controlled';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Asthma is not well-controlled; review treatment plan and consider specialist referral.';
    } else {
      control = 'Poorly controlled';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Asthma is poorly controlled; urgent reassessment and possible therapy escalation needed.';
    }

    setResult({ score, control, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Asthma Control Test Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Asthma Control Test assesses asthma control in patients aged 12+ using a five-question survey.
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
          { label: 'Q1: Asthma interference with daily activities', set: setQ1, value: q1 },
          { label: 'Q2: Frequency of shortness of breath', set: setQ2, value: q2 },
          { label: 'Q3: Frequency of nighttime symptoms', set: setQ3, value: q3 },
          { label: 'Q4: Use of rescue inhaler', set: setQ4, value: q4 },
          { label: 'Q5: Self-rated asthma control', set: setQ5, value: q5 }
        ].map(({ label, set, value }, index) => (
          <Box key={index} className="mb-4">
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              {label} (1-5)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder="Score: 1 (all the time) to 5 (not at all)"
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
          Calculate ACT Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              ACT Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Control Level
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.control}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Nathan RA, et al., J Allergy Clin Immunol 2004;113:59-65.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/14713908/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default AsthmaControlTest;