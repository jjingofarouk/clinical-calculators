import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, FormControlLabel, Checkbox } from '@mui/material';

const calculateTIMI = ({
  age,
  aspirinUseLast7Days,
  anginaEpisodesLast24Hours,
  stChanges,
  elevatedBiomarkers,
  coronaryArteryDisease,
  cardiacRiskFactors,
  setResult,
}) => {
  let score = 0;

  if (parseInt(age) >= 65) score += 1;
  if (aspirinUseLast7Days) score += 1;
  if (parseInt(anginaEpisodesLast24Hours) >= 2) score += 1;
  if (stChanges) score += 1;
  if (elevatedBiomarkers) score += 1;
  if (coronaryArteryDisease) score += 1;
  if (Array.isArray(cardiacRiskFactors) && cardiacRiskFactors.length >= 3) score += 1;

  const risk =
    score === 0 || score === 1
      ? '4.7%'
      : score === 2
      ? '8.3%'
      : score === 3
      ? '13.2%'
      : score === 4
      ? '19.9%'
      : score === 5
      ? '26.2%'
      : '40.9% or higher';

  setResult({ score, risk });
};

const TIMICalculator = () => {
  const [formValues, setFormValues] = useState({
    age: '',
    aspirinUseLast7Days: false,
    anginaEpisodesLast24Hours: '',
    stChanges: false,
    elevatedBiomarkers: false,
    coronaryArteryDisease: false,
    cardiacRiskFactors: [],
  });

  const [result, setResult] = useState(null);

  const handleRiskFactorToggle = (factor) => {
    setFormValues((prev) => ({
      ...prev,
      cardiacRiskFactors: prev.cardiacRiskFactors.includes(factor)
        ? prev.cardiacRiskFactors.filter((f) => f !== factor)
        : [...prev.cardiacRiskFactors, factor],
    }));
  };

  const handleCalculate = () => {
    if (!formValues.age || !formValues.anginaEpisodesLast24Hours) {
      alert('Please fill out all required fields.');
      return;
    }

    calculateTIMI({ ...formValues, setResult });
  };

  return (
    <Box className="min-h-screen bg-gray-200 p-5">
      <Typography variant="h4" className="font-bold text-gray-900 mb-5">
        TIMI Calculator
      </Typography>

      <Box className="w-full bg-white rounded-lg p-5 mb-5">
        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Age:
        </Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Enter age"
          value={formValues.age}
          onChange={(e) => setFormValues((prev) => ({ ...prev, age: e.target.value }))}
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Aspirin use in the last 7 days:
          </Typography>
          <Switch
            checked={formValues.aspirinUseLast7Days}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, aspirinUseLast7Days: e.target.checked }))
            }
          />
        </Box>

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Angina episodes in the last 24 hours:
        </Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="Enter number"
            value={formValues.anginaEpisodesLast24Hours}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, anginaEpisodesLast24Hours: e.target.value }))
            }
            variant="outlined"
            className="mb-4"
            sx={{ backgroundColor: '#fff', borderRadius: 2 }}
          />

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            ST changes (≥0.5 mm):
          </Typography>
          <Switch
            checked={formValues.stChanges}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, stChanges: e.target.checked }))
            }
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Elevated cardiac biomarkers:
          </Typography>
          <Switch
            checked={formValues.elevatedBiomarkers}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, elevatedBiomarkers: e.target.checked }))
            }
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Known coronary artery disease:
          </Typography>
          <Switch
            checked={formValues.coronaryArteryDisease}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, coronaryArteryDisease: e.target.checked }))
            }
          />
        </Box>

        <Typography variant="h6" className="font-bold text-orange-500 mb-3 mt-5">
          Cardiac Risk Factors:
        </Typography>
        {['Hypertension', 'Smoking', 'Low HDL Cholesterol', 'Diabetes Mellitus', 'Family History of Premature CAD'].map(
          (factor) => (
            <FormControlLabel
              key={factor}
              control={
                <Checkbox
                  checked={formValues.cardiacRiskFactors.includes(factor)}
                  onChange={() => handleRiskFactorToggle(factor)}
                />
              }
              label={factor}
              className="mb-2 text-gray-900"
            />
          )
        )}

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg mt-4"
        >
          Calculate TIMI
        </Button>

        {result && (
          <Box className="mt-5 p-4 bg-orange-500 rounded-lg">
            <Typography variant="body1" className="text-white">
              TIMI Score: {result.score}
            </Typography>
            <Typography variant="body1" className="text-white">
              Risk: {result.risk}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TIMICalculator;