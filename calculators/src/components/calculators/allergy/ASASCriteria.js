import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ASASCriteria = () => {
  const [inflammatoryBackPain, setInflammatoryBackPain] = useState(false);
  const [arthritis, setArthritis] = useState(false);
  const [enthesitis, setEnthesitis] = useState(false);
  const [uveitis, setUveitis] = useState(false);
  const [dactylitis, setDactylitis] = useState(false);
  const [psoriasis, setPsoriasis] = useState(false);
  const [ibd, setIBD] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [hlaB27Positive, setHLAB27Positive] = useState(false);
  const [crpElevated, setCRPElevated] = useState(false);
  const [mriSacroiliitis, setMRISacroiliitis] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    let criteriaMet = 0;
    criteriaMet += inflammatoryBackPain ? 1 : 0;
    criteriaMet += arthritis ? 1 : 0;
    criteriaMet += enthesitis ? 1 : 0;
    criteriaMet += uveitis ? 1 : 0;
    criteriaMet += dactylitis ? 1 : 0;
    criteriaMet += psoriasis ? 1 : 0;
    criteriaMet += ibd ? 1 : 0;
    criteriaMet += familyHistory ? 1 : 0;
    criteriaMet += hlaB27Positive ? 2 : 0;
    criteriaMet += crpElevated ? 1 : 0;
    criteriaMet += mriSacroiliitis ? 2 : 0;

    let diagnosis = '';
    let riskColor = '';
    let interpretation = '';

    if (hlaB27Positive && criteriaMet >= 4 || mriSacroiliitis && criteriaMet >= 4) {
      diagnosis = 'Meets ASAS Criteria';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Patient meets ASAS criteria for axial spondyloarthritis; rheumatology consultation and treatment initiation recommended.';
    } else if (criteriaMet >= 2) {
      diagnosis = 'Possible Spondyloarthritis';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Possible axial spondyloarthritis; further evaluation with imaging and specialist consultation recommended.';
    } else {
      diagnosis = 'Unlikely Spondyloarthritis';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Unlikely to have axial spondyloarthritis; consider alternative diagnoses.';
    }

    setResult({ criteriaMet, diagnosis, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        ASAS Criteria Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The ASAS Criteria Calculator assesses the likelihood of axial spondyloarthritis based on clinical and imaging criteria.
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
          { label: 'Inflammatory Back Pain', set: setInflammatoryBackPain, value: inflammatoryBackPain },
          { label: 'Arthritis', set: setArthritis, value: arthritis },
          { label: 'Enthesitis', set: setEnthesitis, value: enthesitis },
          { label: 'Uveitis', set: setUveitis, value: uveitis },
          { label: 'Dactylitis', set: setDactylitis, value: dactylitis },
          { label: 'Psoriasis', set: setPsoriasis, value: psoriasis },
          { label: 'Inflammatory Bowel Disease', set: setIBD, value: ibd },
          { label: 'Family History of Spondyloarthropathy', set: setFamilyHistory, value: familyHistory },
          { label: 'HLA-B27 Positive', set: setHLAB27Positive, value: hlaB27Positive },
          { label: 'Elevated CRP/ESR', set: setCRPElevated, value: crpElevated },
          { label: 'MRI Evidence of Sacroiliitis', set: setMRISacroiliitis, value: mriSacroiliitis }
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
          Calculate ASAS Criteria
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              ASAS Criteria Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.criteriaMet}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Diagnosis
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.diagnosis}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Rudwaleit M, et al., Ann Rheum Dis 2009;68:777-783.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/19066101/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default ASASCriteria;