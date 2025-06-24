import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const QRISK3 = () => {
  const [age, setAge] = useState('');
  const [male, setMale] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [atrialFibrillation, setAtrialFibrillation] = useState(false);
  const [chronicKidneyDisease, setChronicKidneyDisease] = useState(false);
  const [cholesterolHDLRatio, setCholesterolHDLRatio] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [bmi, setBMI] = useState('');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const cholesterolHDLRatioValue = parseFloat(cholesterolHDLRatio);
    const systolicBPValue = parseInt(systolicBP);
    const bmiValue = parseFloat(bmi);

    if (
      isNaN(ageValue) ||
      isNaN(cholesterolHDLRatioValue) ||
      isNaN(systolicBPValue) ||
      isNaN(bmiValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += ageValue >= 65 ? 3 : ageValue >= 45 ? 2 : ageValue >= 35 ? 1 : 0;
    score += male ? 2 : 0;
    score += smoking ? 2 : 0;
    score += diabetes ? 2 : 0;
    score += atrialFibrillation ? 1 : 0;
    score += chronicKidneyDisease ? 2 : 0;
    score += cholesterolHDLRatioValue >= 6 ? 2 : cholesterolHDLRatioValue >= 4 ? 1 : 0;
    score += systolicBPValue >= 140 ? 2 : systolicBPValue >= 120 ? 1 : 0;
    score += bmiValue >= 30 ? 2 : bmiValue >= 25 ? 1 : 0;
    score += familyHistory ? 1 : 0;

    let riskLevel = '';
    if (score <= 5) riskLevel = 'Low risk (<10%)';
    else if (score <= 10) riskLevel = 'Moderate risk (10-20%)';
    else riskLevel = 'High risk (>20%)';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        QRISK3 Calculator
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
          Atrial Fibrillation
        </Typography>
        <Switch
          checked={atrialFibrillation}
          onChange={(e) => setAtrialFibrillation(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Chronic Kidney Disease
        </Typography>
        <Switch
          checked={chronicKidneyDisease}
          onChange={(e) => setChronicKidneyDisease(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Cholesterol/HDL Ratio
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={cholesterolHDLRatio}
          onChange={(e) => setCholesterolHDLRatio(e.target.value)}
          placeholder="Enter Cholesterol/HDL Ratio"
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
          BMI (kg/m²)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={bmi}
          onChange={(e) => setBMI(e.target.value)}
          placeholder="Enter BMI"
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
          Calculate QRISK3
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              QRISK3 Score
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

export default QRISK3;