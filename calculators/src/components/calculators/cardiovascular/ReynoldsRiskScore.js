import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const INTERCHESTScore = () => {
  const [age, setAge] = useState('');
  const [male, setMale] = useState(false);
  const [chestPain, setChestPain] = useState(false);
  const [ecgSTChanges, setECGSTChanges] = useState(false);
  const [troponin, setTroponin] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);

    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    let score = 0;
    score += ageValue >= 65 ? 2 : ageValue >= 45 ? 1 : 0;
    score += male ? 1 : 0;
    score += chestPain ? 2 : 0;
    score += ecgSTChanges ? 2 : 0;
    score += troponin ? 3 : 0;

    let probability = '';
    if (score <= 2) probability = 'Low probability of MI';
    else if (score <= 5) probability = 'Moderate probability of MI';
    else probability = 'High probability of MI';

    setResult({ score, probability });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        INTERCHEST Score Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Age
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
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

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Male
        </Typography>
        <Switch
          checked={male}
          onChange={(e) => setMale(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Typical Chest Pain
        </Typography>
        <Switch
          checked={chestPain}
          onChange={(e) => setChestPain(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          ECG ST Changes
        </Typography>
        <Switch
          checked={ecgSTChanges}
          onChange={(e) => setECGSTChanges(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Positive Troponin
        </Typography>
        <Switch
          checked={troponin}
          onChange={(e) => setTroponin(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
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
          Calculate INTERCHEST
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              INTERCHEST Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="header">
              Probability
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result.probability}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default INTERCHESTScore;