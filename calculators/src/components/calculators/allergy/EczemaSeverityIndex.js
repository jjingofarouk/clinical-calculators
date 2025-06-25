import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const EczemaSeverityIndex = () => {
  const [erythema, setErythema] = useState('');
  const [edema, setEdema] = useState('');
  const [excoriation, setExcoriation] = useState('');
  const [lichenification, setLichenification] = useState('');
  const [extent, setExtent] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const scores = [erythema, edema, excoriation, lichenification].map(parseInt);
    const extentValue = parseFloat(extent);

    if (scores.some(isNaN) || isNaN(extentValue)) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    if (scores.some(v => v < 0 || v > 3)) {
      setError('Intensity scores must be between 0 and 3. Please verify.');
      return;
    }
    if (extentValue < 0 || extentValue > 100) {
      setError('Extent must be between 0 and 100%. Please verify.');
      return;
    }

    const intensityScore = scores.reduce((sum, val) => sum + val, 0);
    const score = intensityScore * (extentValue / 10);

    let severity = '';
    let riskColor = '';
    let interpretation = '';

    if (score < 6) {
      severity = 'Mild';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Mild eczema; topical emollients and low-potency corticosteroids recommended.';
    } else if (score <= 18) {
      severity = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate eczema; moderate-potency corticosteroids and specialist referral advised.';
    } else {
      severity = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Severe eczema; systemic therapy and urgent dermatology consultation required.';
    }

    setResult({ score: score.toFixed(1), severity, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Eczema Severity Index Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Eczema Severity Index assesses eczema severity in patients using intensity and extent of skin involvement.
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
          { label: 'Erythema', set: setErythema, value: erythema },
          { label: 'Edema/Papulation', set: setEdema, value: edema },
          { label: 'Excoriation', set: setExcoriation, value: excoriation },
          { label: 'Lichenification', set: setLichenification, value: lichenification }
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

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Extent (% body surface affected)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={extent}
          onChange={(e) => setExtent(e.target.value)}
          placeholder="Typical range: 0-100"
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
          Calculate Eczema Severity Index
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Eczema Severity Index
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
                Source: Silverberg JI, et al., J Am Acad Dermatol 2015;72:1-17.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/25443697/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default EczemaSeverityIndex;