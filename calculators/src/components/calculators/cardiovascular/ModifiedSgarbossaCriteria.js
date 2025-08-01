import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const ModifiedSgarbossaCriteria = () => {
  const [concordantSTElevation, setConcordantSTElevation] = useState(false);
  const [concordantSTDepression, setConcordantSTDepression] = useState(false);
  const [discordantSTRatio, setDiscordantSTRatio] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const discordantSTRatioValue = parseFloat(discordantSTRatio);

    if (isNaN(discordantSTRatioValue) && discordantSTRatio !== '') {
      alert("Please enter a valid discordant ST/S ratio.");
      return;
    }

    let score = 0;
    score += concordantSTElevation ? 5 : 0;
    score += concordantSTDepression ? 3 : 0;
    score += discordantSTRatioValue <= -0.25 ? 2 : 0;

    let diagnosis = '';
    if (score >= 3) diagnosis = 'High likelihood of acute MI';
    else diagnosis = 'Low likelihood of acute MI';

    setResult({ score, diagnosis });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        Modified Sgarbossa Criteria Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Concordant ST Elevation ≥1 mm
        </Typography>
        <Switch
          checked={concordantSTElevation}
          onChange={(e) => setConcordantSTElevation(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Concordant ST Depression ≥1 mm in V1-V3
        </Typography>
        <Switch
          checked={concordantSTDepression}
          onChange={(e) => setConcordantSTDepression(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Discordant ST/S Ratio
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={discordantSTRatio}
          onChange={(e) => setDiscordantSTRatio(e.target.value)}
          placeholder="Enter Discordant ST/S Ratio"
          variant="outlined"
          className="mb-4"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
          }}
        >
          Calculate Modified Sgarbossa
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              Modified Sgarbossa Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="header">
              Diagnosis
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result.diagnosis}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModifiedSgarbossaCriteria;