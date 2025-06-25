import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const FoodAllergyScore = () => {
  const [specificIgE, setSpecificIgE] = useState('');
  const [skinPrickTest, setSkinPrickTest] = useState('');
  const [historyReaction, setHistoryReaction] = useState(false);
  const [atopyHistory, setAtopyHistory] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const specificIgEValue = parseFloat(specificIgE);
    const skinPrickTestValue = parseFloat(skinPrickTest);

    if (isNaN(specificIgEValue) || isNaN(skinPrickTestValue)) {
      setError('Please enter valid numeric values for specific IgE and skin prick test.');
      return;
    }

    if (specificIgEValue < 0 || specificIgEValue > 100) {
      setError('Specific IgE is outside the plausible range (0-100 kU/L). Please verify.');
      return;
    }
    if (skinPrickTestValue < 0 || skinPrickTestValue > 20) {
      setError('Skin prick test wheal is outside the plausible range (0-20 mm). Please verify.');
      return;
    }

    let score = 0;
    score += specificIgEValue >= 15 ? 3 : specificIgEValue >= 0.35 ? 1 : 0;
    score += skinPrickTestValue >= 8 ? 2 : skinPrickTestValue >= 3 ? 1 : 0;
    score += historyReaction ? 3 : 0;
    score += atopyHistory ? 1 : 0;

    let probability = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 3) {
      probability = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low probability of food allergy; consider alternative diagnoses or oral food challenge.';
    } else if (score <= 6) {
      probability = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate probability of food allergy; allergist evaluation and possible food challenge recommended.';
    } else {
      probability = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High probability of food allergy; avoid allergen and pursue allergist consultation for management.';
    }

    setResult({ score, probability, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Food Allergy Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Food Allergy Score assesses the likelihood of food allergy based on specific IgE, skin prick test, and clinical history.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Specific IgE (kU/L)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={specificIgE}
          onChange={(e) => setSpecificIgE(e.target.value)}
          placeholder="Typical range: 0-100"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Skin Prick Test Wheal (mm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={skinPrickTest}
          onChange={(e) => setSkinPrickTest(e.target.value)}
          placeholder="Typical range: 0-20"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            History of Allergic Reaction to Food
          </Typography>
          <Switch
            checked={historyReaction}
            onChange={(e) => setHistoryReaction(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Personal or Family History of Atopy
          </Typography>
          <Switch
            checked={atopyHistory}
            onChange={(e) => setAtopyHistory(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate Food Allergy Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Food Allergy Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Probability
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.probability}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Sicherer SH, Sampson HA, J Allergy Clin Immunol 2018;141:41-58.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/29307414/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
                  Read study
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FoodAllergyScore;