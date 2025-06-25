import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ComplementDeficiency = () => {
  const [recurrentInfections, setRecurrentInfections] = useState(false);
  const [neisseriaInfections, setNeisseriaInfections] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [ch50Level, setCH50Level] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const ch50Value = parseFloat(ch50Level);

    if (isNaN(ch50Value)) {
      setError('Please enter a valid numeric value for CH50 level.');
      return;
    }

    if (ch50Value < 0 || ch50Value > 500) {
      setError('CH50 level is outside the plausible range (0-500 U/mL). Please verify.');
      return;
    }

    let score = 0;
    score += recurrentInfections ? 2 : 0;
    score += neisseriaInfections ? 3 : 0;
    score += familyHistory ? 2 : 0;
    score += ch50Value < 50 ? 3 : ch50Value < 100 ? 1 : 0;

    let probability = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 3) {
      probability = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low probability of complement deficiency; consider alternative diagnoses.';
    } else if (score <= 6) {
      probability = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate probability of complement deficiency; specialist evaluation and specific complement testing recommended.';
    } else {
      probability = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High probability of complement deficiency; urgent immunologist consultation and detailed complement pathway analysis required.';
    }

    setResult({ score, probability, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Complement Deficiency Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Complement Deficiency Calculator assesses the likelihood of complement deficiency based on clinical and laboratory findings.
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
          { label: 'Recurrent Bacterial Infections', set: setRecurrentInfections, value: recurrentInfections },
          { label: 'History of Neisseria Infections', set: setNeisseriaInfections, value: neisseriaInfections },
          { label: 'Family History of Complement Deficiency', set: setFamilyHistory, value: familyHistory }
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
          CH50 Level (U/mL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={ch50Level}
          onChange={(e) => setCH50Level(e.target.value)}
          placeholder="Typical range: 100-300"
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
          Calculate Complement Deficiency Probability
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Complement Deficiency Score
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
                Source: Figueroa JE, Densen P, N Engl J Med 1991;324:430-436.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/1987552/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default ComplementDeficiency;