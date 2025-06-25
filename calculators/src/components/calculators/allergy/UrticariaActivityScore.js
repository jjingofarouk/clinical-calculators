import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const UrticariaActivityScore = () => {
  const [wheals, setWheals] = useState('');
  const [pruritus, setPruritus] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const whealsValue = parseInt(wheals);
    const pruritusValue = parseInt(pruritus);

    if (isNaN(whealsValue) || isNaN(pruritusValue)) {
      setError('Please enter valid numeric values (0-3) for wheals and pruritus.');
      return;
    }

    if (whealsValue < 0 || whealsValue > 3 || pruritusValue < 0 || pruritusValue > 3) {
      setError('Scores must be between 0 and 3. Please verify.');
      return;
    }

    const score = whealsValue + pruritusValue;

    let severity = '';
    let riskColor = '';
    let interpretation = '';

    if (score === 0) {
      severity = 'None';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'No urticaria activity; continue monitoring and current management.';
    } else if (score <= 2) {
      severity = 'Mild';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Mild urticaria; non-sedating antihistamines typically sufficient.';
    } else if (score <= 4) {
      severity = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate urticaria; consider up-dosing antihistamines or specialist referral.';
    } else {
      severity = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Severe urticaria; urgent specialist consultation and possible systemic therapy required.';
    }

    setResult({ score, severity, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Urticaria Activity Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Urticaria Activity Score (UAS) assesses daily urticaria severity in patients with chronic urticaria using wheals and pruritus.
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
          Wheals (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={wheals}
          onChange={(e) => setWheals(e.target.value)}
          placeholder="Score: 0 (none) to 3 (>50 wheals)"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Pruritus (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={pruritus}
          onChange={(e) => setPruritus(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
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
          Calculate Urticaria Activity Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Urticaria Activity Score
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
                Source: Zuberbier T, et al., Allergy 2018;73:1393-1414.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/29336054/" target="_blank" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default UrticariaActivityScore;