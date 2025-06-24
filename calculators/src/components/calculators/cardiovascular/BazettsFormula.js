import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { HeartPulse, Info, AlertCircle } from 'lucide-react';

const BazettsFormula = () => {
  const [qtInterval, setQtInterval] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateQTc = () => {
    setError('');
    const qt = parseFloat(qtInterval);
    const hr = parseFloat(heartRate);

    if (isNaN(qt) || isNaN(hr)) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    if (qt < 0 || qt > 1000) {
      setError('QT Interval is outside the plausible range (0-1000 ms). Please verify.');
      return;
    }
    if (hr < 0 || hr > 300) {
      setError('Heart Rate is outside the plausible range (0-300 bpm). Please verify.');
      return;
    }

    if (qt < 200 || qt > 600) {
      setError('Warning: QT Interval is outside the typical range (200-600 ms). Results may be less accurate.');
    }
    if (hr < 30 || hr > 200) {
      setError('Warning: Heart Rate is outside the typical range (30-200 bpm). Results may be less accurate.');
    }

    const qtc = (qt / Math.sqrt(60 / hr)).toFixed(0);
    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (qtc <= 440) {
      riskLevel = 'Normal';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Normal QTc duration; no further action required unless clinical symptoms present.';
    } else if (qtc <= 460) {
      riskLevel = 'Borderline';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Borderline QTc prolongation; monitor for symptoms or drug-related causes.';
    } else {
      riskLevel = 'Prolonged';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Prolonged QTc; evaluate for electrolyte imbalances, medications, or genetic causes; consider specialist referral.';
    }

    setResult({ qtc, riskLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Bazett's QTc Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Bazett's Formula Calculator corrects the QT interval for heart rate to assess risk of arrhythmias in adults.
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
          QT Interval (ms)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={qtInterval}
          onChange={(e) => setQtInterval(e.target.value)}
          placeholder="Typical range: 200-600"
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
          Heart Rate (bpm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="Typical range: 30-200"
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
          onClick={calculateQTc}
          className="w-full py-3 btn-primary"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: 2,
          }}
        >
          <HeartPulse className="w-5 h-5 mr-2" />
          Calculate QTc
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Corrected QT (QTc)
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.qtc} ms
            </Typography>
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
                Source: Bazett HC. Heart 1920;7:353-370.{' '}
                <a
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5891352/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline"
                >
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

export default BazettsFormula;