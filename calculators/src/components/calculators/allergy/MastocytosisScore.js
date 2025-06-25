import React, { useState
} from 'react';
import { 
Box, 
Typography, 
TextField, 
Switch, 
Button, 
Alert 
} from '@mui/material';
import { 
AlertCircle, 
Info 
} from 'lucide-react';

const MastocytosisScore = () => {
  const [skinLesions, setSkinLesions] = useState(false);
  const [urticariaPigmentosa, setUrticariaPigmentosa] = useState(false);
  const [anaphylaxisHistory, setAnaphylaxisHistory] = useState(false);
  const [elevatedTryptase, setElevatedTryptase] = useState('');
  const [boneMarrowFindings, setBoneMarrowFindings] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const tryptaseValue = parseFloat(elevatedTryptase);

    if (isNaN(tryptaseValue)) {
      setError('Please enter a valid numeric value for serum tryptase.');
      return;
    }

    if (tryptaseValue < 0 || tryptaseValue > 200) {
      setError('Serum tryptase is outside the plausible range (0-200 ng/mL). Please verify.');
      return;
    }

    let score = 0;
    score += skinLesions ? 2 : 0;
    score += urticariaPigmentosa ? 3 : 0;
    score += anaphylaxisHistory ? 2 : 0;
    score += tryptaseValue >= 20 ? 3 : tryptaseValue >= 11.4 ? 1 : 0;
    score += boneMarrowFindings ? 3 : 0;

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 3) {
      riskLevel = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of mastocytosis; monitor symptoms and consider alternative diagnoses.';
    } else if (score <= 7) {
      riskLevel = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk of mastocytosis; specialist evaluation with possible biopsy recommended.';
    } else {
      riskLevel = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of mastocytosis; urgent specialist referral to a specialist consultation and and possible systemic therapy required.';
    }

    setResult({ score: score, riskLevel: riskColor, interpretation: riskLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Mastocytosis Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Mastocytosis Score assesses the likelihood of systemic mastocytosis in patients with suggestive clinical and laboratory findings.
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
          { label: 'Presence of Skin Lesions', set: setSkinLesions, value: skinLesions },
          { label: 'Urticaria Pigmentosa', set: setUrticariaPigmentosa, value: urticariaPigmentosa },
          { label: 'History of Anaphylaxis', set: setAnaphylaxisHistory, value: anaphylaxisHistory },
          { label: 'Bone Marrow Mast Cell Findings', set: setBoneMarrowFindings, value: boneMarrowFindings }
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

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Serum Tryptase (ng/mL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={elevatedTryptase}
          onChange={(e) => setElevatedTryptase(e.target.value)}
          placeholder="Typical range: 0-11.4"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate Mastocytosis Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-bold text-gray-800 mb-2">
              Mastocytosis Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Risk Level
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.riskLevel}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Valent P, et al., Blood 2017;129:1420-1427.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/28031180/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default MastocytosisScore;