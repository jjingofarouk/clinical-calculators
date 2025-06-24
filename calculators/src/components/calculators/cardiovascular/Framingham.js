import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button } from '@mui/material';

const FraminghamRiskCalculator = () => {
  const [age, setAge] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [hdl, setHdl] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [smoking, setSmoking] = useState(false);
  const [result, setResult] = useState(null);

  const calculateFramingham = () => {
    const ageNum = parseInt(age);
    const cholesterolNum = parseInt(cholesterol);
    const hdlNum = parseInt(hdl);
    const systolicBPNum = parseInt(systolicBP);

    if (isNaN(ageNum) || isNaN(cholesterolNum) || isNaN(hdlNum) || isNaN(systolicBPNum)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    let score = 0;

    if (ageNum >= 20 && ageNum <= 34) score += 0;
    else if (ageNum >= 35 && ageNum <= 39) score += 2;
    else if (ageNum >= 40 && ageNum <= 44) score += 3;
    else if (ageNum >= 45 && ageNum <= 49) score += 4;
    else if (ageNum >= 50 && ageNum <= 54) score += 5;
    else if (ageNum >= 55 && ageNum <= 59) score += 6;
    else if (ageNum >= 60 && ageNum <= 64) score += 7;
    else if (ageNum >= 65) score += 8;

    score += cholesterolNum > 240 ? 3 : cholesterolNum >= 200 && cholesterolNum <= 240 ? 1 : 0;

    score += hdlNum < 40 ? 1 : 0;

    score += systolicBPNum > 140 ? 3 : systolicBPNum >= 130 && systolicBPNum <= 140 ? 1 : 0;

    score += smoking ? 2 : 0;

    setResult(score);
  };

  return (
    <Box className="min-h-screen bg-gray-50 w-full max-w-full p-2">
      <Typography variant="h4" className="font-semibold text-gray-900 mb-4">
        Framingham Risk Calculator
      </Typography>

      <Box className="w-full max-w-full bg-white rounded-xl shadow-md p-2">
        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          Age (years)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
          variant="outlined"
          className="mb-2"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
            '& .MuiInputBase-input': { color: '#1f2937' },
          }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          Total Cholesterol (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={cholesterol}
          onChange={(e) => setCholesterol(e.target.value)}
          placeholder="Enter Cholesterol"
          variant="outlined"
          className="mb-2"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
            '& .MuiInputBase-input': { color: '#1f2937' },
          }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          HDL (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={hdl}
          onChange={(e) => setHdl(e.target.value)}
          placeholder="Enter HDL"
          variant="outlined"
          className="mb-2"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
            '& .MuiInputBase-input': { color: '#1f2937' },
          }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          Systolic Blood Pressure (mmHg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          placeholder="Enter Systolic BP"
          variant="outlined"
          className="mb-2"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
            '& .MuiInputBase-input': { color: '#1f2937' },
          }}
        />

        <Box className="flex items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-1">
            Smoker
          </Typography>
          <Switch
            checked={smoking}
            onChange={(e) => setSmoking(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#0d9488',
                '& + .MuiSwitch-track': { backgroundColor: '#0d9488' },
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={calculateFramingham}
          sx={{
            width: '100%',
            backgroundColor: '#0d9488',
            '&:hover': {
              backgroundColor: '#0f766e',
            },
            color: '#fff',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Calculate Framingham Risk
        </Button>

        {result !== null && (
          <Box className="mt-2 pt-2 border-t border-gray-300">
            <Typography variant="h6" className="font-semibold text-teal-600">
              Framingham Risk Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              Your 10-year risk of cardiovascular disease: {result}%
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              Risk Category: {result < 6 ? 'Low' : result <= 20 ? 'Intermediate' : 'High'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FraminghamRiskCalculator;