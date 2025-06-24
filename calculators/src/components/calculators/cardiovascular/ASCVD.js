import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, FormControlLabel } from '@mui/material';

const ASCVDCalculator = () => {
  const [age, setAge] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [hdl, setHdl] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [sex, setSex] = useState('male');
  const [diabetes, setDiabetes] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [result, setResult] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const calculateASCVD = () => {
    const ageNum = Number(age);
    const cholesterolNum = Number(cholesterol);
    const hdlNum = Number(hdl);
    const systolicBPNum = Number(systolicBP);

    if ([ageNum, cholesterolNum, hdlNum, systolicBPNum].some((val) => isNaN(val) || val <= 0)) {
      alert("Please enter positive numbers for all fields.");
      return;
    }

    const smokingFactor = smoking ? 20 : 0;
    const bpAdjustment = Math.max(systolicBPNum - 120, 0);

    let riskScore = (ageNum + cholesterolNum - hdlNum + smokingFactor + bpAdjustment) / 2;

    if (diabetes) riskScore += 5;
    if (sex === 'female') riskScore -= 5;

    const riskPercentage = riskScore.toFixed(2);

    let interpretation = '';
    if (riskPercentage < 5) {
      interpretation = 'Low risk: Healthy lifestyle recommended.';
    } else if (riskPercentage >= 5 && riskPercentage <= 7.4) {
      interpretation = 'Borderline risk: Statin therapy may be considered based on risk enhancers.';
    } else if (riskPercentage > 7.4 && riskPercentage <= 20) {
      interpretation = 'Intermediate risk: Moderate-intensity statin therapy recommended.';
    } else {
      interpretation = 'High risk: High-intensity statin therapy recommended.';
    }

    setResult(riskPercentage);
    setRecommendation(interpretation);
  };

  return (
    <Box className="min-h-screen bg-gray-50 w-full max-w-full p-2">
      <Typography variant="h4" className="font-semibold text-gray-900 mb-4">
        ASCVD Risk Calculator
      </Typography>

      <Box className="w-full max-w-full bg-white rounded-xl shadow-md p-2">
        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          Age (years)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
          variant="outlined"
          className="mb-2"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          Total Cholesterol (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={cholesterol}
          onChange={(e) => setCholesterol(e.target.value)}
          placeholder="Enter Cholesterol"
          variant="outlined"
          className="mb-2"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          HDL (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={hdl}
          onChange={(e) => setHdl(e.target.value)}
          placeholder="Enter HDL"
          variant="outlined"
          className="mb-2"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
          Systolic Blood Pressure (mmHg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          placeholder="Enter Systolic BP"
          variant="outlined"
          className="mb-2"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Box className="flex items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-1">
            Smoker
          </Typography>
          <Switch checked={smoking} onChange={(e) => setSmoking(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-1">
            Diabetes
          </Typography>
          <Switch checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-2">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-1">
            Sex (Male/Female)
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={sex === 'female'}
                onChange={() => setSex(sex === 'male' ? 'female' : 'male')}
              />
            }
            label={sex === 'male' ? 'Male' : 'Female'}
          />
        </Box>

        <Button
          variant="contained"
          onClick={calculateASCVD}
          sx={{
            width: '100%',
            backgroundColor: '#0d9488',
            '&:hover': {
              backgroundColor: '#0f766e',
            },
            color: '#fff',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Calculate ASCVD
        </Button>

        {result && (
          <Box className="mt-2 pt-2 border-t border-gray-300">
            <Typography variant="h6" className="font-semibold text-teal-600">
              ASCVD Risk Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result}%
            </Typography>
            <Typography variant="h6" className="font-semibold text-teal-600 mt-2">
              Recommendation
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {recommendation}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ASCVDCalculator;