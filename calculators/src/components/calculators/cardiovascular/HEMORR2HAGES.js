import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const HEMORR2HAGES = () => {
  const [hepaticRenalDisease, setHepaticRenalDisease] = useState(false);
  const [ethanolAbuse, setEthanolAbuse] = useState(false);
  const [malignancy, setMalignancy] = useState(false);
  const [age, setAge] = useState('');
  const [reducedPlatelet, setReducedPlatelet] = useState(false);
  const [rebleedingRisk, setRebleedingRisk] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [anemia, setAnemia] = useState(false);
  const [geneticFactors, setGeneticFactors] = useState(false);
  const [elevatedFallRisk, setElevatedFallRisk] = useState(false);
  const [strokeHistory, setStrokeHistory] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    let score = 0;
    score += hepaticRenalDisease ? 1 : 0;
    score += ethanolAbuse ? 1 : 0;
    score += malignancy ? 1 : 0;
    score += ageValue > 75 ? 1 : 0;
    score += reducedPlatelet ? 1 : 0;
    score += rebleedingRisk ? 2 : 0;
    score += hypertension ? 1 : 0;
    score += anemia ? 1 : 0;
    score += geneticFactors ? 1 : 0;
    score += elevatedFallRisk ? 1 : 0;
    score += strokeHistory ? 1 : 0;

    let riskLevel = '';
    if (score <= 1) riskLevel = 'Low risk';
    else if (score <= 3) riskLevel = 'Intermediate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        HEMORR₂HAGES Risk Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Hepatic or Renal Disease
        </Typography>
        <Switch
          checked={hepaticRenalDisease}
          onChange={(e) => setHepaticRenalDisease(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Ethanol Abuse
        </Typography>
        <Switch
          checked={ethanolAbuse}
          onChange={(e) => setEthanolAbuse(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Malignancy
        </Typography>
        <Switch
          checked={malignancy}
          onChange={(e) => setMalignancy(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

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
          Reduced Platelet Count or Function
        </Typography>
        <Switch
          checked={reducedPlatelet}
          onChange={(e) => setReducedPlatelet(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Rebleeding Risk
        </Typography>
        <Switch
          checked={rebleedingRisk}
          onChange={(e) => setRebleedingRisk(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Uncontrolled Hypertension
        </Typography>
        <Switch
          checked={hypertension}
          onChange={(e) => setHypertension(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Anemia
        </Typography>
        <Switch
          checked={anemia}
          onChange={(e) => setAnemia(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Genetic Factors (e.g., CYP2C9)
        </Typography>
        <Switch
          checked={geneticFactors}
          onChange={(e) => setGeneticFactors(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Elevated Fall Risk
        </Typography>
        <Switch
          checked={elevatedFallRisk}
          onChange={(e) => setElevatedFallRisk(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Stroke History
        </Typography>
        <Switch
          checked={strokeHistory}
          onChange={(e) => setStrokeHistory(e.target.checked)}
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
          Calculate HEMORR₂HAGES
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              HEMORR₂HAGES Score
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

export default HEMORR2HAGES;