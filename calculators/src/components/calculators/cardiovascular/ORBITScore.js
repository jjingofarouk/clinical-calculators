import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const ORBITScore = () => {
  const [age, setAge] = useState('');
  const [anemia, setAnemia] = useState(false);
  const [bleedingHistory, setBleedingHistory] = useState(false);
  const [renalFunction, setRenalFunction] = useState('');
  const [antiplateletTherapy, setAntiplateletTherapy] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const renalValue = parseFloat(renalFunction);
    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age.");
      return;
    }
    if (isNaN(renalValue) || renalValue <= 0) {
      alert("Please enter a valid GFR value.");
      return;
    }

    let score = 0;
    score += ageValue >= 75 ? 1 : 0;
    score += anemia ? 2 : 0;
    score += bleedingHistory ? 2 : 0;
    score += renalValue < 60 ? 1 : 0;
    score += antiplateletTherapy ? 1 : 0;

    let riskLevel = '';
    if (score <= 2) riskLevel = 'Low risk';
    else if (score === 3) riskLevel = 'Medium risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        ORBIT Bleeding Risk Calculator
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
          Anemia (Hb &lt; 13 g/dL men, <&lt;12 g/dL women)
        </Typography>
        <Switch
          checked={anemia}
          onChange={(e) => setAnemia(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          History of Bleeding
        </Typography>
        <Switch
          checked={bleedingHistory}
          onChange={(e) => setBleedingHistory(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Estimated GFR (mL/min/1.73 m²)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={renalFunction}
          onChange={(e) => setRenalFunction(e.target.value)}
          placeholder="Enter GFR"
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
          Antiplatelet Therapy
        </Typography>
        <Switch
          checked={antiplateletTherapy}
          onChange={(e) => setAntiplateletTherapy(e.target.checked)}
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
          Calculate ORBIT
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              ORBIT Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="header">
              Risk Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result.riskLevel}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ORBITScore;