import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const HereditaryAngioedema = () => {
  const [familyHistory, setFamilyHistory] = useState(false);
  const [recurrentAngioedema, setRecurrentAngioedema] = useState(false);
  const [noUrticaria, setNoUrticaria] = useState(false);
  const [c1InhibitorLevel, setC1InhibitorLevel] = useState('');
  const [c4Level, setC4Level] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const c1InhibitorValue = parseFloat(c1InhibitorLevel);
    const c4Value = parseFloat(c4Level);

    if (isNaN(c1InhibitorValue) || isNaN(c4Value)) {
      setError('Please enter valid numeric values for C1 inhibitor and C4 levels.');
      return;
    }

    if (c1InhibitorValue < 0 || c1InhibitorValue > 100) {
      setError('C1 inhibitor level is outside the plausible range (0-100 mg/dL). Please verify.');
      return;
    }
    if (c4Value < 0 || c4Value > 50) {
      setError('C4 level is outside the plausible range (0-50 mg/dL). Please verify.');
      return;
    }

    let score = 0;
    score += familyHistory ? 3 : 0;
    score += recurrentAngioedema ? 3 : 0;
    score += noUrticaria ? 2 : 0;
    score += c1InhibitorValue < 18 ? 3 : c1InhibitorValue < 25 ? 1 : 0;
    score += c4Value < 15 ? 2 : 0;

    let probability = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 4) {
      probability = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low probability of hereditary angioedema; consider alternative diagnoses.';
    } else if (score <= 8) {
      probability = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate probability of hereditary angioedema; specialist evaluation and genetic testing recommended.';
    } else {
      probability = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High probability of hereditary angioedema; urgent specialist consultation and possible C1-inhibitor therapy required.';
    }

    setResult({ score, probability, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Hereditary Angioedema Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Hereditary Angioedema Calculator assesses the likelihood of hereditary angioedema based on clinical and laboratory findings.
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
          { label: 'Family History of Hereditary Angioedema', set: setFamilyHistory, value: familyHistory },
          { label: 'Recurrent Angioedema Episodes', set: setRecurrentAngioedema, value: recurrentAngioedema },
          { label: 'Absence of Urticaria', set: setNoUrticaria, value: noUrticaria }
        ].map(({ label, set, value }, index) => (
          <Box key={index} className="flex items-center mb-4">
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
              {label}
            </Typography>
            <Switch
              checked={value}
              onChange={(e) => set(e.target.checked)}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
            />
          </Box>
        ))}

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          C1 Inhibitor Level (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={c1InhibitorLevel}
          onChange={(e) => setC1InhibitorLevel(e.target.value)}
          placeholder="Typical range: 18-40"
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
          placeholder="Typical range: 15-50"
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
          Calculate Hereditary Angioedema Probability
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Hereditary Angioedema Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Probability
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.probability}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Zuraw BL, et al., J Allergy Clin Immunol 2013;131:1491-1493.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/23726531/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default HereditaryAngioedema;