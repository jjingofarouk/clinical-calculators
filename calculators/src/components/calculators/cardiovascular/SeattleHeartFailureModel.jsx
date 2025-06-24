import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const SeattleHeartFailureModel = () => {
  const [age, setAge] = useState('');
  const [male, setMale] = useState(false);
  const [nyhaClass, setNYHAClass] = useState('');
  const [ejectionFraction, setEjectionFraction] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [sodium, setSodium] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [hemoglobin, setHemoglobin] = useState('');
  const [weight, setWeight] = useState('');
  const [diureticDose, setDiureticDose] = useState('');
  const [betaBlocker, setBetaBlocker] = useState(false);
  const [aceiArb, setACEIARB] = useState(false);
  const [statin, setStatin] = useState(false);
  const [allopurinol, setAllopurinol] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const nyhaValue = parseInt(nyhaClass);
    const efValue = parseInt(ejectionFraction);
    const systolicBPValue = parseInt(systolicBP);
    const sodiumValue = parseFloat(sodium);
    const creatinineValue = parseFloat(creatinine);
    const hemoglobinValue = parseFloat(hemoglobin);
    const weightValue = parseFloat(weight);
    const diureticValue = parseFloat(diureticDose);

    if (
      isNaN(ageValue) ||
      isNaN(nyhaValue) ||
      isNaN(efValue) ||
      isNaN(systolicBPValue) ||
      isNaN(sodiumValue) ||
      isNaN(creatinineValue) ||
      isNaN(hemoglobinValue) ||
      isNaN(weightValue) ||
      isNaN(diureticValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += Math.floor(ageValue / 10) * 0.03;
    score += male ? 0.1 : 0;
    score += nyhaValue === 3 ? 0.3 : nyhaValue === 4 ? 0.5 : 0;
    score += efValue < 20 ? 0.4 : efValue < 30 ? 0.2 : 0;
    score += systolicBPValue < 100 ? 0.3 : systolicBPValue < 120 ? 0.1 : 0;
    score += sodiumValue < 135 ? 0.2 : 0;
    score += creatinineValue > 2 ? 0.3 : creatinineValue > 1.5 ? 0.1 : 0;
    score += hemoglobinValue < 12 ? 0.2 : 0;
    score += weightValue > 80 ? 0.1 : weightValue < 60 ? 0.2 : 0;
    score += diureticValue > 40 ? 0.2 : 0;
    score += betaBlocker ? -0.2 : 0;
    score += aceiArb ? -0.2 : 0;
    score += statin ? -0.1 : 0;
    score += allopurinol ? 0.1 : 0;

    let riskLevel = '';
    if (score <= 1) riskLevel = 'Low risk (1-year survival >90%)';
    else if (score <= 2) riskLevel = 'Moderate risk (1-year survival 70-90%)';
    else riskLevel = 'High risk (1-year survival <70%)';

    setResult({ score: score.toFixed(2), riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        Seattle Heart Failure Model Calculator
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
          Serum Sodium (mEq/L)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={sodium}
          onChange={(e) => setSodium(e.target.value)}
          placeholder="Enter Sodium"
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
          Hemoglobin (g/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={hemoglobin}
          onChange={(e) => setHemoglobin(e.target.value)}
          placeholder="Enter Hemoglobin"
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
          Weight (kg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter Weight"
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
          Daily Diuretic Dose (mg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={diureticDose}
          onChange={(e) => setDiureticDose(e.target.value)}
          placeholder="Enter Diuretic Dose"
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
          Statin Use
        </Typography>
        <Switch
          checked={statin}
          onChange={(e) => setStatin(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Allopurinol Use
        </Typography>
        <Switch
          checked={allopurinol}
          onChange={(e) => setAllopurinol(e.target.checked)}
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
          Calculate Seattle Heart Failure
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              Seattle Heart Failure Score
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

export default SeattleHeartFailureModel;