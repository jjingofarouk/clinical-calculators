import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const AtopyRisk = () => {
  const [familyHistory, setFamilyHistory] = useState(false);
  const [eczemaHistory, setEczemaHistory] = useState(false);
  const [asthmaHistory, setAsthmaHistory] = useState(false);
  const [rhinitisHistory, setRhinitisHistory] = useState(false);
  const [foodAllergyHistory, setFoodAllergyHistory] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    let score = 0;
    score += familyHistory ? 2 : 0;
    score += eczemaHistory ? 2 : 0;
    score += asthmaHistory ? 2 : 0;
    score += rhinitisHistory ? 1 : 0;
    score += foodAllergyHistory ? 2 : 0;

    let risk = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 2) {
      risk = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of atopy; routine monitoring and education recommended.';
    } else if (score <= 5) {
      risk = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk of atopy; consider early screening and allergen avoidance strategies.';
    } else {
      risk = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of atopy; allergist consultation and preventive measures strongly recommended.';
    }

    setResult({ score, risk, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Atopy Risk Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Atopy Risk Calculator evaluates the likelihood of developing atopic diseases based on personal and family history.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        {[
          { label: 'Family History of Atopy', set: setFamilyHistory, value: familyHistory },
          { label: 'Personal History of Eczema', set: setEczemaHistory, value: eczemaHistory },
          { label: 'Personal History of Asthma', set: setAsthmaHistory, value: asthmaHistory },
          { label: 'Personal History of Allergic Rhinitis', set: setRhinitisHistory, value: rhinitisHistory },
          { label: 'Personal History of Food Allergy', set: setFoodAllergyHistory, value: foodAllergyHistory }
        ].map(({ label, set, value }, index) => (
          <Box key={index} className="flex items-center mb-4">
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
              {label}
            </Typography>
            <Switch
              checked={value}
              onChange={(e) => set(e.target.checked)}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
            />
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate Atopy Risk
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Atopy Risk Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Risk Level
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.risk}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Von Mutius E, J Allergy Clin Immunol 2009;123:3-11.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/19130928/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default AtopyRisk;