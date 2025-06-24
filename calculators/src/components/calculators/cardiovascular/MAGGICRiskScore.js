import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const MAGGICRiskScore = () => {
  const [age, setAge] = useState('');
  const [male, setMale] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [copd, setCOPD] = useState(false);
  const [heartFailureDuration, setHeartFailureDuration] = useState('');
  const [nyhaClass, setNYHAClass] = useState('');
  const [ejectionFraction, setEjectionFraction] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [bmi, setBMI] = useState('');
  const [smoking, setSmoking] = useState(false);
  const [betaBlocker, setBetaBlocker] = useState(false);
  const [aceiArb, setACEIARB] = useState(false);
  const [systolicBP, setSystolicBP] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const hfDurationValue = parseFloat(heartFailureDuration);
    const nyhaValue = parseInt(nyhaClass);
    const efValue = parseInt(ejectionFraction);
    const creatinineValue = parseFloat(creatinine);
    const bmiValue = parseFloat(bmi);
    const systolicBPValue = parseInt(systolicBP);

    if (
      isNaN(ageValue) ||
      isNaN(hfDurationValue) ||
      isNaN(nyhaValue) ||
      isNaN(efValue) ||
      isNaN(creatinineValue) ||
      isNaN(bmiValue) ||
      isNaN(systolicBPValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += Math.floor(ageValue / 10);
    score += male ? 2 : 0;
    score += diabetes ? 3 : 0;
    score += copd ? 2 : 0;
    score += hfDurationValue > 18 ? 2 : 0;
    score += nyhaValue === 3 ? 3 : nyhaValue === 4 ? 5 : 0;
    score += efValue < 20 ? 5 : efValue < 30 ? 3 : efValue < 40 ? 1 : 0;
    score += creatinineValue > 2 ? 3 : creatinineValue > 1.5 ? 2 : 0;
    score += bmiValue < 20 ? 2 : bmiValue > 30 ? 1 : 0;
    score += smoking ? 2 : 0;
    score += betaBlocker ? -2 : 0;
    score += aceiArb ? -2 : 0;
    score += systolicBPValue < 120 ? 3 : systolicBPValue < 140 ? 1 : 0;

    let riskLevel = '';
    if (score <= 10) riskLevel = 'Low risk';
    else if (score <= 20) riskLevel = 'Moderate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        MAGGIC Risk Score Calculator
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
          Diabetes
        </Typography>
        <Switch
          checked={diabetes}
          onChange={(e) => setDiabetes(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          COPD
        </Typography>
        <Switch
          checked={copd}
          onChange={(e) => setCOPD(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Heart Failure Duration (months)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={heartFailureDuration}
          onChange={(e) => setHeartFailureDuration(e.target.value)}
          placeholder="Enter Duration"
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
          NYHA Class (1-4)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={nyhaClass}
          onChange={(e) => setNYHAClass(e.target.value)}
          placeholder="Enter NYHA Class"
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
          Ejection Fraction (%)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={ejectionFraction}
          onChange={(e) => setEjectionFraction(e.target.value)}
          placeholder="Enter Ejection Fraction"
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
          Creatinine (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
          placeholder="Enter Creatinine"
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
          Current Smoker
        </Typography>
        <Switch
          checked={smoking}
          onChange={(e) => setSmoking(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Beta-Blocker Use
        </Typography>
        <Switch
          checked={betaBlocker}
          onChange={(e) => setBetaBlocker(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          ACEI/ARB Use
        </Typography>
        <Switch
          checked={aceiArb}
          onChange={(e) => setACEIARB(e.target.checked)}
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
          Calculate MAGGIC Risk
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              MAGGIC Risk Score
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

export default MAGGICRiskScore;