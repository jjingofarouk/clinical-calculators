import React, { useState } from 'react";
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
    <Box className="min-h-screen bg-gray-100 p-5">
      <Typography variant="h4" className="font-semibold text-gray-900 mb-8">
        CHA₂DS₂-VASc Risk Calculator
      </Typography>

      <Box className="w-full bg-white rounded-xl p-5 shadow-md">
        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
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
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Gender
        </Typography>
        <TextField
          fullWidth
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Enter Gender (male/female)"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Diabetes
          </Typography>
          <Switch checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Hypertension
          </Typography>
          <Switch checked={hypertension} onChange={(e) => setHypertension(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Heart Failure
          </Typography>
          <Switch checked={heartFailure} onChange={(e) => setHeartFailure(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Stroke
          </Typography>
          <Switch checked={stroke} onChange={(e) => setStroke(e.target.checked)} />
        </Box>

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg"
        >
          Calculate CHA₂DS₂-VASc
        </Button>

        {result !== '' && (
          <Box className="mt-5 pt-4 border-t border-gray-300">
            <Typography variant="h6" className="font-semibold text-teal-500">
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