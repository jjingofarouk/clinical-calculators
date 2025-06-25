import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const SkinPrickTest = () => {
  const [whealDiameter, setWhealDiameter] = useState('');
  const [flareDiameter, setFlareDiameter] = useState('');
  const [histamineControl, setHistamineControl] = useState('');
  const [negativeControl, setNegativeControl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const wheal = parseFloat(whealDiameter);
    const flare = parseFloat(flareDiameter);
    const histamine = parseFloat(histamineControl);
    const negative = parseFloat(negativeControl);

    if (isNaN(wheal) {
      setError('Please enter a valid wheal diameter');
      return;
    }

    if (isNaN(flare)) {
      setError('Please enter a valid flare diameter');
      return;
    }

    if (isNaN(histamine)) {
      setError('Please enter a valid histamine control diameter');
      return;
    }

    if (isNaN(negative)) {
      setError('Please enter a valid negative control diameter');
      return;
    }

    const whealIndex = wheal / histamine;
    const flareIndex = flare / histamine;
    const correctedWheal = wheal - negative;
    const correctedFlare = flare - negative;

    let interpretation = '';
    let riskColor = '';

    if (correctedWheal < 3) {
      interpretation = 'Negative reaction - No evidence of IgE-mediated allergy';
      riskColor = 'bg-green-100 text-green-800';
    } else if (correctedWheal >= 3 && correctedWheal < 5) {
      interpretation = 'Mild positive reaction - Possible allergic sensitization';
      riskColor = 'bg-yellow-100 text-yellow-800';
    } else if (correctedWheal >= 5 && correctedWheal < 10) {
      interpretation = 'Moderate positive reaction - Likely clinically relevant allergy';
      riskColor = 'bg-orange-100 text-orange-800';
    } else {
      interpretation = 'Strong positive reaction - High likelihood of clinically significant allergy';
      riskColor = 'bg-red-100 text-red-800';
    }

    setResult({ 
      wheal: wheal.toFixed(1),
      flare: flare.toFixed(1),
      correctedWheal: correctedWheal.toFixed(1),
      correctedFlare: correctedFlare.toFixed(1),
      whealIndex: whealIndex.toFixed(2),
      flareIndex: flareIndex.toFixed(2),
      interpretation,
      riskColor
    });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Skin Prick Test Evaluation
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Evaluates skin prick test results for IgE-mediated allergic reactions.
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
          Test Wheal Diameter (mm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={whealDiameter}
          onChange={(e) => setWhealDiameter(e.target.value)}
          placeholder="Typical range: 0-15mm"
          variant="outlined"
          className="mb-4"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
          }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Test Flare Diameter (mm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={flareDiameter}
          onChange={(e) => setFlareDiameter(e.target.value)}
          placeholder="Typical range: 0-50mm"
          variant="outlined"
          className="mb-4"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
          }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Histamine Control Diameter (mm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={histamineControl}
          onChange={(e) => setHistamineControl(e.target.value)}
          placeholder="Typical range: 3-10mm"
          variant="outlined"
          className="mb-4"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
          }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Negative Control Diameter (mm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={negativeControl}
          onChange={(e) => setNegativeControl(e.target.value)}
          placeholder="Typical range: 0-3mm"
          variant="outlined"
          className="mb-4"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: 2,
          }}
        >
          Evaluate Skin Prick Test
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Test Results
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-1">
              Wheal: {result.wheal}mm (Corrected: {result.correctedWheal}mm)
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-1">
              Flare: {result.flare}mm (Corrected: {result.correctedFlare}mm)
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              Wheal Index: {result.whealIndex} | Flare Index: {result.flareIndex}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Interpretation
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Positive test typically ≥3mm wheal diameter than negative control
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SkinPrickTest;