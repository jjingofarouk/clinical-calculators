import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Button, Alert } from '@mui/material';
import { HeartPulse, Info, AlertTriangle } from 'lucide-react';

const AorticValveCalciumScore = () => {
  const [agatstonScore, setAgatstonScore] = useState('');
  const [calciumVolume, setCalciumVolume] = useState('');
  const [valveArea, setValveArea] = useState('');
  const [aorticRoot, setAorticRoot] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateScore = () => {
    setError('');
    const score = parseFloat(agatstonScore);
    const volume = parseFloat(calciumVolume);
    const area = parseFloat(valveArea);

    if (
      (agatstonScore && isNaN(score)) ||
      (calciumVolume && isNaN(volume)) ||
      (valveArea && isNaN(area))
    ) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    if (agatstonScore && (score < 0 || score > 20000)) {
      setError('Agatston Score is outside the plausible range (0-20000 HU). Please verify.');
      return;
    }
    if (calciumVolume && (volume < 0 || volume > 10000)) {
      setError('Calcium Volume is outside the plausible range (0-10000 mm³). Please verify.');
      return;
    }
    if (valveArea && (area < 0 || area > 10)) {
      setError('Valve Area is outside the plausible range (0-10 cm²). Please verify.');
      return;
    }

    if (agatstonScore && (score < 0 || score > 10000)) {
      setError('Warning: Agatston Score is outside the typical range (0-10000 HU). Results may be less accurate.');
    }
    if (calciumVolume && (volume < 0 || volume > 5000)) {
      setError('Warning: Calcium Volume is outside the typical range (0-5000 mm³). Results may be less accurate.');
    }
    if (valveArea && (area < 0 || area > 5)) {
      setError('Warning: Valve Area is outside the typical range (0-5 cm²). Results may be less accurate.');
    }

    let riskLevel = 'None';
    let riskColor = 'bg-green-100 text-green-800';
    let interpretation = 'No significant calcification detected; routine follow-up recommended.';

    if (score > 2000 || volume > 1000) {
      riskLevel = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of severe aortic stenosis; consider TAVR or surgical intervention per ACC/AHA guidelines.';
    } else if (score > 1000 || volume > 500) {
      riskLevel = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk of aortic stenosis progression; monitor closely with echocardiography every 6-12 months.';
    } else if (score > 0 || volume > 0) {
      riskLevel = 'Mild';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of significant aortic stenosis; annual follow-up with echocardiography recommended.';
    }

    if (area && area < 1.0) {
      interpretation += ' Severe aortic stenosis indicated by valve area; urgent evaluation needed.';
      riskLevel = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
    } else if (area && area < 1.5) {
      interpretation += ' Moderate aortic stenosis indicated by valve area; close monitoring advised.';
      if (riskLevel !== 'Severe') {
        riskLevel = 'Moderate';
        riskColor = 'bg-yellow-100 text-yellow-800';
      }
    }

    if (aorticRoot === 'aneurysmal') {
      interpretation += ' Aneurysmal aortic root detected; urgent imaging and surgical consultation recommended.';
      riskLevel = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
    } else if (aorticRoot === 'dilated') {
      interpretation += ' Dilated aortic root detected; regular imaging follow-up required.';
      if (riskLevel !== 'Severe') {
        riskLevel = 'Moderate';
        riskColor = 'bg-yellow-100 text-yellow-800';
      }
    }

    setResult({ riskLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Aortic Valve Calcium Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Aortic Valve Calcium Score Calculator assesses aortic stenosis severity in adults using Agatston score, calcium volume, valve area, and aortic root status.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Box>
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              Agatston Score (HU)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={agatstonScore}
              onChange={(e) => setAgatstonScore(e.target.value)}
              placeholder="Typical range: 0-10000"
              variant="outlined"
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
          </Box>
          <Box>
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              Calcium Volume (mm³)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={calciumVolume}
              onChange={(e) => setCalciumVolume(e.target.value)}
              placeholder="Typical range: 0-5000"
              variant="outlined"
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
          </Box>
        </Box>

        <Box className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Box>
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              Valve Area (cm²)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={valveArea}
              onChange={(e) => setValveArea(e.target.value)}
              placeholder="Typical range: 0-5"
              variant="outlined"
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
          </Box>
          <Box>
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              Aortic Root Status
            </Typography>
            <Select
              value={aorticRoot}
              onChange={(e) => setAorticRoot(e.target.value)}
              displayEmpty
              fullWidth
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#0d9488' },
                  '&.Mui-focused fieldset': { borderColor: '#0d9488' },
                },
              }}
            >
              <MenuItem value="">Select Aortic Root Status</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="dilated">Dilated</MenuItem>
              <MenuItem value="aneurysmal">Aneurysmal</MenuItem>
            </Select>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={calculateScore}
          className="w-full mt-6 py-3 btn-primary"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: 2,
          }}
        >
          <HeartPulse className="w-5 h-5 mr-2" />
          Calculate Aortic Valve Calcium Score
        </Button>

        {result && (
          <Box className="mt-6 p-4 rounded-lg border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Risk Level
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.riskLevel}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: 2017 ESC/EACTS Guidelines for the Management of Valvular Heart Disease.{' '}
                <a
                  href="https://academic.oup.com/eurheartj/article/38/36/2739/4096483"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline"
                >
                  Read guideline
                </a>
              </Typography>
            </Box>
          </Box>
        )}

        <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
          <Typography variant="body2" className="text-yellow-800">
            Aortic valve calcium scoring should be interpreted alongside echocardiography and clinical findings for accurate aortic stenosis assessment.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AorticValveCalciumScore;