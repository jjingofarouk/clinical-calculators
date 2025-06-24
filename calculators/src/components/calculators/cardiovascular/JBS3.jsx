import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const JBS3 = () => {
  const [age, setAge] = useState('');
  const [male, setMale] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [systolicBP, setSystolicBP] = useState('');
  const [totalCholesterol, setTotalCholesterol] = useState('');
  const [hdlCholesterol, setHDLCholesterol] = useState('');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const systolicBPValue = parseInt(systolicBP);
    const totalCholesterolValue = parseInt(totalCholesterol);
    const hdlCholesterolValue = parseInt(hdlCholesterol);

    if (
      isNaN(ageValue) ||
      isNaN(systolicBPValue) ||
      isNaN(totalCholesterolValue) ||
      isNaN(hdlCholesterolValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += ageValue >= 65 ? 3 : ageValue >= 45 ? 2 : ageValue >= 35 ? 1 : 0;
    score += male ? 2 : 0;
    score += smoking ? 2 : 0;
    score += diabetes ? 2 : 0;
    score += systolicBPValue >= 140 ? 2 : systolicBPValue >= 120 ? 1 : 0;
    score += totalCholesterolValue >= 240 ? 2 : totalCholesterolValue >= 200 ? 1 : 0;
    score += hdlCholesterolValue < 40 ? 2 : hdlCholesterolValue < 50 ? 1 : 0;
    score += familyHistory ? 1 : 0;

    let riskLevel = '';
    if (score <= 5) riskLevel = 'Low lifetime risk';
    else if (score <= 10) riskLevel = 'Moderate lifetime risk';
    else riskLevel = 'High lifetime risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        JBS3 Calculator
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
          Current Smoker
        </Typography>
        <Switch
          checked={smoking}
          onChange={(e) => setSmoking(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Diabetes
        </Typography>
        <Switch
          checked={diabetes}
          onChange={(e) => setDiabetes(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Systolic Blood Pressure (mmHg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          placeholder="Enter Systolic BP"
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
          Total Cholesterol (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={totalCholesterol}
          onChange={(e) => setTotalCholesterol(e.target.value)}
          placeholder="Enter Total Cholesterol"
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
          HDL Cholesterol (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={hdlCholesterol}
          onChange={(e) => setHDLCholesterol(e.target.value)}
          placeholder="Enter HDL Cholesterol"
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
          Family History of CVD
        </Typography>
        <Switch
          checked={familyHistory}
          onChange={(e) => setFamilyHistory(e.target.checked)}
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
          Calculate JBS3
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              JBS3 Score
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

export default JBS3;