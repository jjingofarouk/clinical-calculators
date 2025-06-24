// ModifiedDukeCriteria.js
import React, { useState } from 'react';
import { TextField, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Activity, AlertOctagon } from 'lucide-react';

const ModifiedDukeCriteria = () => {
  const [majorCriteria, setMajorCriteria] = useState({
    positiveBloodCulture: false,
    endocardialInvolvement: false,
  });
  const [minorCriteria, setMinorCriteria] = useState({
    fever: false,
    vascularPhenomena: false,
    immunologicPhenomena: false,
    microbiologicEvidence: false,
    predisposingCondition: false,
  });

  const calculateDiagnosis = () => {
    const majorCount = Object.values(majorCriteria).filter(Boolean).length;
    const minorCount = Object.values(minorCriteria).filter(Boolean).length;

    if (majorCount >= 2) return 'Definite Infective Endocarditis';
    if (majorCount === 1 && minorCount >= 3) return 'Definite Infective Endocarditis';
    if (majorCount === 1 && minorCount < 3) return 'Possible Infective Endocarditis';
    if (majorCount === 0 && minorCount >= 5) return 'Possible Infective Endocarditis';
    return 'Rejected';
  };

  const diagnosis = calculateDiagnosis();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <Activity size={20} className="inline mr-2" />
        Modified Duke Criteria for Infective Endocarditis
      </Typography>

      <Typography variant="subtitle1" className="font-semibold mt-4 text-teal-700">
        Major Criteria
      </Typography>
      <Box className="grid grid-cols-1 gap-2 mt-2">
        <FormControlLabel
          control={<Checkbox checked={majorCriteria.positiveBloodCulture} onChange={(e) => setMajorCriteria({...majorCriteria, positiveBloodCulture: e.target.checked})} />}
          label="Positive blood culture for typical IE microorganisms"
        />
        <FormControlLabel
          control={<Checkbox checked={majorCriteria.endocardialInvolvement} onChange={(e) => setMajorCriteria({...majorCriteria, endocardialInvolvement: e.target.checked})} />}
          label="Evidence of endocardial involvement (echocardiographic findings)"
        />
      </Box>

      <Typography variant="subtitle1" className="font-semibold mt-4 text-teal-700">
        Minor Criteria
      </Typography>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <FormControlLabel
          control={<Checkbox checked={minorCriteria.fever} onChange={(e) => setMinorCriteria({...minorCriteria, fever: e.target.checked})} />}
          label="Fever >38°C"
        />
        <FormControlLabel
          control={<Checkbox checked={minorCriteria.vascularPhenomena} onChange={(e) => setMinorCriteria({...minorCriteria, vascularPhenomena: e.target.checked})} />}
          label="Vascular phenomena"
        />
        <FormControlLabel
          control={<Checkbox checked={minorCriteria.immunologicPhenomena} onChange={(e) => setMinorCriteria({...minorCriteria, immunologicPhenomena: e.target.checked})} />}
          label="Immunologic phenomena"
        />
        <FormControlLabel
          control={<Checkbox checked={minorCriteria.microbiologicEvidence} onChange={(e) => setMinorCriteria({...minorCriteria, microbiologicEvidence: e.target.checked})} />}
          label="Microbiologic evidence (not meeting major criteria)"
        />
        <FormControlLabel
          control={<Checkbox checked={minorCriteria.predisposingCondition} onChange={(e) => setMinorCriteria({...minorCriteria, predisposingCondition: e.target.checked})} />}
          label="Predisposing heart condition or IV drug use"
        />
      </Box>

      <Box className={`mt-6 p-4 rounded-lg ${
        diagnosis.includes('Definite') ? 'bg-green-50 text-green-800' :
        diagnosis.includes('Possible') ? 'bg-yellow-50 text-yellow-800' :
        'bg-red-50 text-red-800'
      }`}>
        <Typography variant="h6" className="font-bold">
          Diagnosis: {diagnosis}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start">
        <AlertOctagon className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-blue-800">
          The Modified Duke Criteria are used to diagnose infective endocarditis with high sensitivity and specificity.
        </Typography>
      </Box>
    </Box>
  );
};

export default ModifiedDukeCriteria;