import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ImmunodeficiencyRisk = () => {
  const [recurrentInfections, setRecurrentInfections] = useState(false);
  const [severeInfections, setSevereInfections] = useState(false);
  const [opportunisticInfections, setOpportunisticInfections] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [autoimmuneDisease, setAutoimmuneDisease] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    let score = 0;
    score += recurrentInfections ? 2 : 0;
    score += severeInfections ? 3 : 0;
    score += opportunisticInfections ? 3 : 0;
    score += familyHistory ? 2 : 0;
    score += autoimmuneDisease ? 1 : 0;

    let risk = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 3) {
      risk = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of immunodeficiency; monitor symptoms and consider routine evaluation.';
    } else if (score <= 6) {
      risk = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk of immunodeficiency; immunologist evaluation and basic immune workup recommended.';
    } else {
      risk = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of immunodeficiency; urgent immunologist consultation and comprehensive immune testing required.';
    }

    setResult({ score, risk, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Immunodeficiency Risk Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Immunodeficiency Risk Calculator assesses the likelihood of primary immunodeficiency based on clinical history.
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
          { label: 'Recurrent Infections (>6/year)', set: setRecurrentInfections, value: recurrentInfections },
          { label: 'Severe Infections Requiring IV Antibiotics', set: setSevereInfections, value: severeInfections },
          { label: 'Opportunistic Infections', set: setOpportunisticInfections, value: opportunisticInfections },
          { label: 'Family History of Immunodeficiency', set: setFamilyHistory, value: familyHistory },
          { label: 'Associated Autoimmune Disease', set: setAutoimmuneDisease, value: autoimmuneDisease }
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
          Calculate Immunodeficiency Risk
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Immunodeficiency Risk Score
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
                Source: Bonilla FA, et al., J Allergy Clin Immunol 2015;136:1186-1205.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/26371839/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default ImmunodeficiencyRisk;