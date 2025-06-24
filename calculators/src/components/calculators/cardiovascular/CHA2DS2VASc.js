import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button } from "@mui/material";

const CHA2DS2VASc = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diabetes, setDiabetes] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [heartFailure, setHeartFailure] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    const ageScore = (ageNum >= 75) ? 2 : (ageNum >= 65) ? 1 : 0;
    const genderScore = (gender.toLowerCase() === 'female') ? 1 : 0;
    const conditionsScore = (diabetes ? 1 : 0) + (hypertension ? 1 : 0) + (heartFailure ? 1 : 0);
    const strokeScore = stroke ? 2 : 0;

    const score = ageScore + genderScore + conditionsScore + strokeScore;
    setResult(score);
  };

  return (
    <Box className="min-h-screen bg-gray-50 w-full max-w-full p-2">
      <Typography variant="h4" className="font-semibold text-gray-900 mb-4">
        CHA₂DS₂-VASc Risk Calculator
      </Typography>

      <Box className="w-full max-w-full bg-white rounded-xl shadow-md p-2">
        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          Age
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
          Gender
        </Typography>
        <TextField
          fullWidth
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Enter Gender (male/female)"
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
            Diabetes
          </Typography>
          <Switch
            checked={diabetes}
            onChange={(e) => setDiabetes(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#0d9488',
                '& + .MuiSwitch-track': { backgroundColor: '#0d9488' },
              },
            }}
          />
        </Box>

        <Box className="flex items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-1">
            Hypertension
          </Typography>
          <Switch
            checked={hypertension}
            onChange={(e) => setHypertension(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#0d9488',
                '& + .MuiSwitch-track': { backgroundColor: '#0d9488' },
              },
            }}
          />
        </Box>

        <Box className="flex items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-1">
            Heart Failure
          </Typography>
          <Switch
            checked={heartFailure}
            onChange={(e) => setHeartFailure(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#0d9488',
                '& + .MuiSwitch-track': { backgroundColor: '#0d9488' },
              },
            }}
          />
        </Box>

        <Box className="flex items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-1">
            Stroke
          </Typography>
          <Switch
            checked={stroke}
            onChange={(e) => setStroke(e.target.checked)}
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
          onClick={handleCalculate}
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
          Calculate CHA₂DS₂-VASc
        </Button>

        {result !== '' && (
          <Box className="mt-2 pt-2 border-t border-gray-300">
            <Typography variant="h6" className="font-semibold text-teal-600">
              CHA₂DS₂-VASc Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CHA2DS2VASc;