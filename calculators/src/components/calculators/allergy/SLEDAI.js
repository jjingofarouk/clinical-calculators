import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const SLEDAI = () => {
  const [seizure, setSeizure] = useState(false);
  const [psychosis, setPsychosis] = useState(false);
  const [organicBrain, setOrganicBrain] = useState(false);
  const [visual, setVisual] = useState(false);
  const [cranialNerve, setCranialNerve] = useState(false);
  const [lupusHeadache, setLupusHeadache] = useState(false);
  const [cva, setCVA] = useState(false);
  const [vasculitis, setVasculitis] = useState(false);
  const [arthritis, setArthritis] = useState(false);
  const [myositis, setMyositis] = useState(false);
  const [urinaryCasts, setUrinaryCasts] = useState(false);
  const [hematuria, setHematuria] = useState(false);
  const [proteinuria, setProteinuria] = useState(false);
  const [pyuria, setPyuria] = useState(false);
  const [rash, setRash] = useState(false);
  const [alopecia, setAlopecia] = useState(false);
  const [mucosalUlcers, setMucosalUlcers] = useState(false);
  const [pleurisy, setPleurisy] = useState(false);
  const [pericarditis, setPericarditis] = useState(false);
  const [lowComplement, setLowComplement] = useState(false);
  const [antiDsDNA, setAntiDsDNA] = useState(false);
  const [fever, setFever] = useState(false);
  const [thrombocytopenia, setThrombocytopenia] = useState(false);
  const [leukopenia, setLeukopenia] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    let score = 0;
    score += seizure ? 8 : 0;
    score += psychosis ? 8 : 0;
    score += organicBrain ? 8 : 0;
    score += visual ? 8 : 0;
    score += cranialNerve ? 8 : 0;
    score += lupusHeadache ? 8 : 0;
    score += cva ? 8 : 0;
    score += vasculitis ? 8 : 0;
    score += arthritis ? 4 : 0;
    score += myositis ? 4 : 0;
    score += urinaryCasts ? 4 : 0;
    score += hematuria ? 4 : 0;
    score += proteinuria ? 4 : 0;
    score += pyuria ? 4 : 0;
    score += rash ? 2 : 0;
    score += alopecia ? 2 : 0;
    score += mucosalUlcers ? 2 : 0;
    score += pleurisy ? 2 : 0;
    score += pericarditis ? 2 : 0;
    score += lowComplement ? 2 : 0;
    score += antiDsDNA ? 2 : 0;
    score += fever ? 1 : 0;
    score += thrombocytopenia ? 1 : 0;
    score += leukopenia ? 1 : 0;

    let activity = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 4) {
      activity = 'No/Mild Activity';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'No or mild SLE activity; continue current management and monitoring.';
    } else if (score <= 10) {
      activity = 'Moderate Activity';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate SLE activity; consider therapy escalation and specialist follow-up.';
    } else {
      activity = 'High Activity';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High SLE activity; urgent rheumatology consultation and aggressive therapy required.';
    }

    setResult({ score, activity, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        SLEDAI Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The SLEDAI (Systemic Lupus Erythematosus Disease Activity Index) assesses disease activity in SLE patients using clinical and laboratory findings.
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
          { label: 'Seizure', set: setSeizure, value: seizure },
          { label: 'Psychosis', set: setPsychosis, value: psychosis },
          { label: 'Organic Brain Syndrome', set: setOrganicBrain, value: organicBrain },
          { label: 'Visual Disturbance', set: setVisual, value: visual },
          { label: 'Cranial Nerve Disorder', set: setCranialNerve, value: cranialNerve },
          { label: 'Lupus Headache', set: setLupusHeadache, value: lupusHeadache },
          { label: 'Cerebrovascular Accident (CVA)', set: setCVA, value: cva },
          { label: 'Vasculitis', set: setVasculitis, value: vasculitis },
          { label: 'Arthritis', set: setArthritis, value: arthritis },
          { label: 'Myositis', set: setMyositis, value: myositis },
          { label: 'Urinary Casts', set: setUrinaryCasts, value: urinaryCasts },
          { label: 'Hematuria (>5 RBC/hpf)', set: setHematuria, value: hematuria },
          { label: 'Proteinuria (>0.5 g/day)', set: setProteinuria, value: proteinuria },
          { label: 'Pyuria (>5 WBC/hpf)', set: setPyuria, value: pyuria },
          { label: 'Rash', set: setRash, value: rash },
          { label: 'Alopecia', set: setAlopecia, value: alopecia },
          { label: 'Mucosal Ulcers', set: setMucosalUlcers, value: mucosalUlcers },
          { label: 'Pleurisy', set: setPleurisy, value: pleurisy },
          { label: 'Pericarditis', set: setPericarditis, value: pericarditis },
          { label: 'Low Complement (C3/C4)', set: setLowComplement, value: lowComplement },
          { label: 'Anti-dsDNA Antibody', set: setAntiDsDNA, value: antiDsDNA },
          { label: 'Fever (>38°C)', set: setFever, value: fever },
          { label: 'Thrombocytopenia (<100,000/mm³)', set: setThrombocytopenia, value: thrombocytopenia },
          { label: 'Leukopenia (<3,000/mm³)', set: setLeukopenia, value: leukopenia }
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
          Calculate SLEDAI Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              SLEDAI Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Activity Level
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.activity}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Bombardier C, et al., Arthritis Rheum 1992;35:630-640.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/1599520/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default SLEDAI;