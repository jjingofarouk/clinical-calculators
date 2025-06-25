import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const LupusActivityIndex = () => {
  const [arthritisScore, setArthritisScore] = useState('');
  const [renalScore, setRenalScore] = useState('');
  const [rash, setRash] = useState(false);
  const [serositis, setSerositis] = useState(false);
  const [hematologic, setHematologic] = useState(false);
  const [antiDsDNA, setAntiDsDNA] = useState(false);
  const [lowComplement, setLowComplement] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const arthritisValue = parseInt(arthritisScore);
    const renalValue = parseInt(renalScore);

    if (isNaN(arthritisValue) || isNaN(renalValue)) {
      setError('Please enter valid numeric values for arthritis and renal scores.');
      return;
    }

    if (arthritisValue < 0 || arthritisValue > 3) {
      setError('Arthritis score must be between 0 and 3. Please verify.');
      return;
    }
    if (renalValue < 0 || renalValue > 3) {
      setError('Renal score must be between 0 and 3. Please verify.');
      return;
    }

    let score = 0;
    score += arthritisValue;
    score += renalValue;
    score += rash ? 1 : 0;
    score += serositis ? 1 : 0;
    score += hematologic ? 1 : 0;
    score += antiDsDNA ? 1 : 0;
    score += lowComplement ? 1 : 0;

    let activity = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 3) {
      activity = 'Low Activity';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low lupus activity; continue monitoring and current therapy.';
    } else if (score <= 7) {
      activity = 'Moderate Activity';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate lupus activity; consider therapy adjustment and specialist follow-up.';
    } else {
      activity = 'High Activity';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High lupus activity; urgent rheumatology evaluation and therapy escalation required.';
    }

    setResult({ score, activity, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Lupus Activity Index Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Lupus Activity Index assesses disease activity in systemic lupus erythematosus patients using clinical and laboratory parameters.
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
          Arthritis Score (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={arthritisScore}
          onChange={(e) => setArthritisScore(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Renal Activity Score (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={renalScore}
          onChange={(e) => setRenalScore(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        {[
          { label: 'Rash', set: setRash, value: rash },
          { label: 'Serositis', set: setSerositis, value: serositis },
          { label: 'Hematologic Abnormalities', set: setHematologic, value: hematologic },
          { label: 'Anti-dsDNA Positive', set: setAntiDsDNA, value: antiDsDNA },
          { label: 'Low Complement (C3/C4)', set: setLowComplement, value: lowComplement }
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

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate Lupus Activity Index
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Lupus Activity Index Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Activity Level
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.activity}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Petri M, et al., Arthritis Rheum 1999;42:2285-2290.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/10555023/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default LupusActivityIndex;