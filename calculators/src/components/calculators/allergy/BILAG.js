import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const BILAG = () => {
  const [constitutional, setConstitutional] = useState('');
  const [mucocutaneous, setMucocutaneous] = useState('');
  const [neuropsychiatric, setNeuropsychiatric] = useState('');
  const [musculoskeletal, setMusculoskeletal] = useState('');
  const [cardiorespiratory, setCardiorespiratory] = useState('');
  const [gastrointestinal, setGastrointestinal] = useState('');
  const [renal, setRenal] = useState('');
  const [hematologic, setHematologic] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const scores = [
      constitutional,
      mucocutaneous,
      neuropsychiatric,
      musculoskeletal,
      cardiorespiratory,
      gastrointestinal,
      renal,
      hematologic
    ].map(parseInt);

    if (scores.some(isNaN)) {
      setError('Please enter valid numeric values (0-4) for all systems.');
      return;
    }

    if (scores.some(score => score < 0 || score > 4)) {
      setError('All scores must be between 0 and 4. Please verify.');
      return;
    }

    const score = scores.reduce((acc, val) => {
      if (val === 4) return acc + 12; // Category A
      if (val === 3) return acc + 9;  // Category B
      if (val === 2) return acc + 1;  // Category C
      if (val === 1) return acc + 0;  // Category D
      return acc;                     // Category E
    }, 0);

    let activity = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 1) {
      activity = 'Minimal Activity';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Minimal SLE activity; continue current management and monitoring.';
    } else if (score <= 20) {
      activity = 'Moderate Activity';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate SLE activity; consider therapy escalation and specialist follow-up.';
    } else {
      activity = 'Severe Activity';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Severe SLE activity; urgent rheumatology consultation and aggressive therapy required.';
    }

    setResult({ score, activity, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        BILAG Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The BILAG (British Isles Lupus Assessment Group) Index assesses systemic lupus erythematosus activity across eight organ systems.
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
          { label: 'Constitutional', set: setConstitutional, value: constitutional },
          { label: 'Mucocutaneous', set: setMucocutaneous, value: mucocutaneous },
          { label: 'Neuropsychiatric', set: setNeuropsychiatric, value: neuropsychiatric },
          { label: 'Musculoskeletal', set: setMusculoskeletal, value: musculoskeletal },
          { label: 'Cardiorespiratory', set: setCardiorespiratory, value: cardiorespiratory },
          { label: 'Gastrointestinal', set: setGastrointestinal, value: gastrointestinal },
          { label: 'Renal', set: setRenal, value: renal },
          { label: 'Hematologic', set: setHematologic, value: hematologic }
        ].map(({ label, set, value }, index) => (
          <Box key={index} className="mb-4">
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              {label} (0-4: A=4, B=3, C=2, D=1, E=0)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder="Score: 0-4"
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
          Calculate BILAG Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              BILAG Score
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
                Source: Isenberg DA, et al., Rheumatology 2005;44:902-906.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/15814577/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default BILAG;