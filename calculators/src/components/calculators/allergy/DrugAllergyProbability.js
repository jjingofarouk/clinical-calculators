import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const DrugAllergyProbability = () => {
  const [immediateReaction, setImmediateReaction] = useState(false);
  const [cutaneousSymptoms, setCutaneousSymptoms] = useState(false);
  const [respiratorySymptoms, setRespiratorySymptoms] = useState(false);
  const [anaphylaxisHistory, setAnaphylaxisHistory] = useState(false);
  const [multipleDrugReactions, setMultipleDrugReactions] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    let score = 0;
    score += immediateReaction ? 2 : 0;
    score += cutaneousSymptoms ? 1 : 0;
    score += respiratorySymptoms ? 2 : 0;
    score += anaphylaxisHistory ? 3 : 0;
    score += multipleDrugReactions ? 1 : 0;

    let probability = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 2) {
      probability = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low probability of drug allergy; consider alternative diagnoses or cautious re-administration.';
    } else if (score <= 5) {
      probability = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate probability of drug allergy; allergist evaluation and possible skin testing recommended.';
    } else {
      probability = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High probability of drug allergy; avoid drug and pursue allergist consultation for confirmation.';
    }

    setResult({ score, probability, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Drug Allergy Probability Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Drug Allergy Probability Calculator assesses the likelihood of a drug allergy based on clinical symptoms and history.
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
          { label: 'Immediate Reaction (<1 hour)', set: setImmediateReaction, value: immediateReaction },
          { label: 'Cutaneous Symptoms (Rash, Urticaria)', set: setCutaneousSymptoms, value: cutaneousSymptoms },
          { label: 'Respiratory Symptoms (Dyspnea, Wheezing)', set: setRespiratorySymptoms, value: respiratorySymptoms },
          { label: 'History of Anaphylaxis', set: setAnaphylaxisHistory, value: anaphylaxisHistory },
          { label: 'Multiple Drug Reactions', set: setMultipleDrugReactions, value: multipleDrugReactions }
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
          Calculate Drug Allergy Probability
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Drug Allergy Probability Score
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
                Source: Demoly P, et al., Allergy 2014;69:420-437.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/24628791/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default DrugAllergyProbability;