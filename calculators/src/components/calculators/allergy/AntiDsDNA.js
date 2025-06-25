import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const AntiDsDNA = () => {
  const [antiDsDNA, setAntiDsDNA] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const antiDsDNAValue = parseFloat(antiDsDNA);

    if (isNaN(antiDsDNAValue)) {
      setError('Please enter a valid numeric value for anti-dsDNA.');
      return;
    }

    if (antiDsDNAValue < 0 || antiDsDNAValue > 1000) {
      setError('Anti-dsDNA is outside the plausible range (0-1000 IU/mL). Please verify.');
      return;
    }

    let level = '';
    let riskColor = '';
    let interpretation = '';

    if (antiDsDNAValue < 10) {
      level = 'Negative';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Negative anti-dsDNA; unlikely to indicate active SLE, consider alternative diagnoses.';
    } else if (antiDsDNAValue <= 100) {
      level = 'Low/Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Low to moderate anti-dsDNA; possible SLE activity, correlate with clinical findings.';
    } else {
      level = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High anti-dsDNA; strongly suggestive of active SLE, rheumatology evaluation required.';
    }

    setResult({ antiDsDNA: antiDsDNAValue.toFixed(1), level, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Anti-dsDNA Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Anti-dsDNA Calculator assesses anti-double-stranded DNA antibody levels to evaluate systemic lupus erythematosus activity.
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
          Anti-dsDNA (IU/mL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={antiDsDNA}
          onChange={(e) => setAntiDsDNA(e.target.value)}
          placeholder="Typical range: 0-100"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate Anti-dsDNA Level
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Anti-dsDNA Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.antiDsDNA} IU/mL
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Level
            </Typography>
            <Typography variant="body1" className="font-medium p-2 rounded ${result.riskColor}">
              {result.level}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Tseng CE, et al., Arthritis Res Ther 2006;8:R146.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/16934147/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default AntiDsDNA;