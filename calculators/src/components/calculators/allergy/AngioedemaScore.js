import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const AngioedemaScore = () => {
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [triggersIdentified, setTriggersIdentified] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');

    const frequencyValue = parseInt(frequency);
    const durationValue = parseFloat(duration);
    const severityValue = parseInt(severity);

    if (isNaN(frequencyValue) || isNaN(durationValue) || isNaN(severityValue)) {
      setError('Please enter valid numeric values for frequency, duration, and severity.');
      return;
    }

    if (frequencyValue < 0 || frequencyValue > 5) {
      setError('Frequency must be between 0 and 5 episodes per month. Please verify.');
      return;
    }
    if (durationValue < 0 || durationValue > 168) {
      setError('Duration must be between 0 and 168 hours. Please verify.');
      return;
    }
    if (severityValue < 0 || severityValue > 3) {
      setError('Severity must be between 0 and 3. Please verify.');
      return;
    }

    let score = 0;
    score += frequencyValue;
    score += durationValue >= 72 ? 3 : durationValue >= 24 ? 2 : 1;
    score += severityValue;
    score += triggersIdentified ? 1 : 0;
    score += familyHistory ? 2 : 0;

    let severityLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 5) {
      severityLevel = 'Mild';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Mild angioedema; antihistamines and trigger avoidance may suffice.';
    } else if (score <= 10) {
      severityLevel = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate angioedema; consider specialist referral and targeted therapy.';
    } else {
      severityLevel = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Severe angioedema; urgent specialist consultation and possible C1-inhibitor therapy required.';
    }

    setResult({ score, severityLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Angioedema Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Angioedema Score assesses the severity of angioedema in patients based on frequency, duration, and clinical factors.
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
          Frequency (episodes per month, 0-5)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          placeholder="Typical range: 0-5"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Duration (hours per episode)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Typical range: 0-168"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Severity (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          placeholder="Score: 0 (none) to 3 (life-threatening)"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Known Triggers Identified
          </Typography>
          <Switch
            checked={triggersIdentified}
            onChange={(e) => setTriggersIdentified(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Family History of Angioedema
          </Typography>
          <Switch
            checked={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate Angioedema Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Angioedema Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Severity
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.severityLevel}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong by>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Cicardi M, et al., J Allergy Clin Immunol 2014;133:1236-44.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/24565617/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default AngioedemaScore;