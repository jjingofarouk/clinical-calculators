import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const EASI = () => {
  const [headExtent, setHeadExtent] = useState('');
  const [headErythema, setHeadErythema] = useState('');
  const [headEdema, setHeadEdema] = useState('');
  const [headExcoriation, setHeadExcoriation] = useState('');
  const [headLichenification, setHeadLichenification] = useState('');
  const [trunkExtent, setTrunkExtent] = useState('');
  const [trunkErythema, setTrunkErythema] = useState('');
  const [trunkEdema, setTrunkEdema] = useState('');
  const [trunkExcoriation, setTrunkExcoriation] = useState('');
  const [trunkLichenification, setTrunkLichenification] = useState('');
  const [armsExtent, setArmsExtent] = useState('');
  const [armsErythema, setArmsErythema] = useState('');
  const [armsEdema, setArmsEdema] = useState('');
  const [armsExcoriation, setArmsExcoriation] = useState('');
  const [armsLichenification, setArmsLichenification] = useState('');
  const [legsExtent, setLegsExtent] = useState('');
  const [legsErythema, setLegsErythema] = useState('');
  const [legsEdema, setLegsEdema] = useState('');
  const [legsExcoriation, setLegsExcoriation] = useState('');
  const [legsLichenification, setLegsLichenification] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const inputs = [
      headExtent, headErythema, headEdema, headExcoriation, headLichenification,
      trunkExtent, trunkErythema, trunkEdema, trunkExcoriation, trunkLichenification,
      armsExtent, armsErythema, armsEdema, armsExcoriation, armsLichenification,
      legsExtent, legsErythema, legsEdema, legsExcoriation, legsLichenification
    ].map(parseFloat);

    if (inputs.some(isNaN)) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    if (inputs.slice(0, 5).some(v => v < 0 || v > (v === headExtent ? 100 : 3)) ||
        inputs.slice(5, 10).some(v => v < 0 || v > (v === trunkExtent ? 100 : 3)) ||
        inputs.slice(10, 15).some(v => v < 0 || v > (v === armsExtent ? 100 : 3)) ||
        inputs.slice(15).some(v => v < 0 || v > (v === legsExtent ? 100 : 3))) {
      setError('Extent must be 0-100%; intensity scores must be 0-3. Please verify.');
      return;
    }

    const regionScores = [
      { extent: headExtent, erythema: headErythema, edema: headEdema, excoriation: headExcoriation, lichenification: headLichenification, multiplier: 0.1 },
      { extent: trunkExtent, erythema: trunkErythema, edema: trunkEdema, excoriation: trunkExcoriation, lichenification: trunkLichenification, multiplier: 0.4 },
      { extent: armsExtent, erythema: armsErythema, edema: armsEdema, excoriation: armsExcoriation, lichenification: armsLichenification, multiplier: 0.2 },
      { extent: legsExtent, erythema: legsErythema, edema: legsEdema, excoriation: legsExcoriation, lichenification: legsLichenification, multiplier: 0.3 }
    ];

    const score = regionScores.reduce((total, region) => {
      const intensity = parseFloat(region.erythema) + parseFloat(region.edema) + parseFloat(region.excoriation) + parseFloat(region.lichenification);
      return total + (intensity * parseFloat(region.extent) * region.multiplier);
    }, 0);

    let severity = '';
    let riskColor = '';
    let interpretation = '';

    if (score < 7) {
      severity = 'Mild';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Mild eczema; topical emollients and low-potency corticosteroids are usually sufficient.';
    } else if (score <= 21) {
      severity = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate eczema; consider moderate-potency corticosteroids and specialist referral.';
    } else {
      severity = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Severe eczema; systemic therapy and urgent dermatology consultation may be required.';
    }

    setResult({ score: score.toFixed(1), severity, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        EASI Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The EASI assesses eczema severity in patients by evaluating extent and intensity across four body regions.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        {['Head/Neck', 'Trunk', 'Upper Limbs', 'Lower Limbs'].map((region, index) => (
          <Box key={region} className="mb-6">
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              {region}
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Extent (% affected)"
              value={[headExtent, trunkExtent, armsExtent, legsExtent][index]}
              onChange={(e) => [setHeadExtent, setTrunkExtent, setArmsExtent, setLegsExtent][index](e.target.value)}
              placeholder="Typical range: 0-100"
              variant="outlined"
              className="mb-4"
              sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
            />
            <TextField
              fullWidth
              type="number"
              label="Erythema (0-3)"
              value={[headErythema, trunkErythema, armsErythema, legsErythema][index]}
              onChange={(e) => [setHeadErythema, setTrunkErythema, setArmsErythema, setLegsErythema][index](e.target.value)}
              placeholder="Score: 0 (none) to 3 (severe)"
              variant="outlined"
              className="mb-4"
              sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
            />
            <TextField
              fullWidth
              type="number"
              label="Edema/Papulation (0-3)"
              value={[headEdema, trunkEdema, armsEdema, legsEdema][index]}
              onChange={(e) => [setHeadEdema, setTrunkEdema, setArmsEdema, setLegsEdema][index](e.target.value)}
              placeholder="Score: 0 (none) to 3 (severe)"
              variant="outlined"
              className="mb-4"
              sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
            />
            <TextField
              fullWidth
              type="number"
              label="Excoriation (0-3)"
              value={[headExcoriation, trunkExcoriation, armsExcoriation, legsExcoriation][index]}
              onChange={(e) => [setHeadExcoriation, setTrunkExcoriation, setArmsExcoriation, setLegsExcoriation][index](e.target.value)}
              placeholder="Score: 0 (none) to 3 (severe)"
              variant="outlined"
              className="mb-4"
              sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
            />
            <TextField
              fullWidth
              type="number"
              label="Lichenification (0-3)"
              value={[headLichenification, trunkLichenification, armsLichenification, legsLichenification][index]}
              onChange={(e) => [setHeadLichenification, setTrunkLichenification, setArmsLichenification, setLegsLichenification][index](e.target.value)}
              placeholder="Score: 0 (none) to 3 (severe)"
              variant="outlined"
              className="mb-4"
              sx={{ backgroundColor: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#0d9488' }, '&.Mui-focused fieldset': { borderColor: '#0d9488' } } }}
            />
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0b8276' }, textTransform: 'none', fontWeight: '600', borderRadius: 2 }}
        >
          Calculate EASI Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              EASI Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Severity
            </Typography>
            <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
              {result.severity}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: Hanifin et al., Exp Dermatol 2001;10:11-18.{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/11168575/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">
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

export default EASI;