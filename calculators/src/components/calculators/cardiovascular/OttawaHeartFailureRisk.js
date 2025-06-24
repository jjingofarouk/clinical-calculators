import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const OttawaHeartFailureRisk = () => {
  const [strokeHistory, setStrokeHistory] = useState(false);
  const [intubationHistory, setIntubationHistory] = useState(false);
  const [heartRate, setHeartRate] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [ntProBNP, setNTProBNP] = useState('');
  const [chestXRayCongestion, setChestXRayCongestion] = useState(false);
  const [ecgIschemia, setECGIschemia] = useState(false);
  const [urea, setUrea] = useState('');
  const [sodium, setSodium] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const heartRateValue = parseInt(heartRate);
    const oxygenSaturationValue = parseFloat(oxygenSaturation);
    const ntProBNPValue = parseFloat(ntProBNP);
    const ureaValue = parseFloat(urea);
    const sodiumValue = parseFloat(sodium);

    if (
      isNaN(heartRateValue) ||
      isNaN(oxygenSaturationValue) ||
      isNaN(ntProBNPValue) ||
      isNaN(ureaValue) ||
      isNaN(sodiumValue)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;
    score += strokeHistory ? 1 : 0;
    score += intubationHistory ? 2 : 0;
    score += heartRateValue > 90 ? 1 : 0;
    score += oxygenSaturationValue < 90 ? 1 : 0;
    score += ntProBNPValue > 5000 ? 2 : ntProBNPValue > 1000 ? 1 : 0;
    score += chestXRayCongestion ? 1 : 0;
    score += ecgIschemia ? 1 : 0;
    score += ureaValue > 12 ? 1 : 0;
    score += sodiumValue < 136 ? 1 : 0;

    let riskLevel = '';
    if (score <= 2) riskLevel = 'Low risk';
    else if (score <= 4) riskLevel = 'Moderate risk';
    else riskLevel = 'High risk';

    setResult({ score, riskLevel });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        Ottawa Heart Failure Risk Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Stroke/TIA History
        </Typography>
        <Switch
          checked={strokeHistory}
          onChange={(e) => setStrokeHistory(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          History of Mechanical Ventilation
        </Typography>
        <Switch
          checked={intubationHistory}
          onChange={(e) => setIntubationHistory(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Heart Rate (bpm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="Enter Heart Rate"
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
          Oxygen Saturation (%)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={oxygenSaturation}
          onChange={(e) => setOxygenSaturation(e.target.value)}
          placeholder="Enter Oxygen Saturation"
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
          NT-proBNP (pg/mL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={ntProBNP}
          onChange={(e) => setNTProBNP(e.target.value)}
          placeholder="Enter NT-proBNP"
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
          Chest X-Ray Congestion
        </Typography>
        <Switch
          checked={chestXRayCongestion}
          onChange={(e) => setChestXRayCongestion(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          ECG Ischemia
        </Typography>
        <Switch
          checked={ecgIschemia}
          onChange={(e) => setECGIschemia(e.target.checked)}
          className="mb-4"
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Urea (mmol/L)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={urea}
          onChange={(e) => setUrea(e.target.value)}
          placeholder="Enter Urea"
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
          Sodium (mEq/L)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={sodium}
          onChange={(e) => setSodium(e.target.value)}
          placeholder="Enter Sodium"
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
          className="w-full py-3"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
          }}
        >
          Calculate Ottawa Heart Failure Risk
        </Button>

        {result && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              Ottawa Heart Failure Risk Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="header">
              Risk Level
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result.riskLevel}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OttawaHeartFailureRisk;