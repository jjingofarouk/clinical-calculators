import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Card, CardContent, FormControlLabel, Switch, Button } from '@mui/material';

const MELDScore = () => {
  const [dialysis, setDialysis] = useState(false);
  const [creatinine, setCreatinine] = useState('');
  const [bilirubin, setBilirubin] = useState('');
  const [inr, setInr] = useState('');
  const [score, setScore] = useState(null);
  const [mortality, setMortality] = useState(null);

  const calculateScore = () => {
    if (!creatinine || !bilirubin || !inr) return;

    let creatValue = parseFloat(creatinine);
    const bilirubinValue = parseFloat(bilirubin);
    const inrValue = parseFloat(inr);

    if (dialysis) {
      creatValue = 4.0;
    }

    creatValue = Math.max(1.0, Math.min(creatValue, 4.0));
    
    const rawScore = (
      9.57 * Math.log(inrValue) +
      3.78 * Math.log(bilirubinValue) +
      11.2 * Math.log(creatValue) +
      6.43
    );

    const finalScore = Math.round(Math.max(6, Math.min(40, rawScore)));
    setScore(finalScore);

    const mortalityRates = {
      '40+': '71.3%',
      '30-39': '52.6%',
      '20-29': '19.6%',
      '10-19': '6.0%',
      '<10': '1.9%'
    };

    if (finalScore >= 40) setMortality(mortalityRates['40+']);
    else if (finalScore >= 30) setMortality(mortalityRates['30-39']);
    else if (finalScore >= 20) setMortality(mortalityRates['20-29']);
    else if (finalScore >= 10) setMortality(mortalityRates['10-19']);
    else setMortality(mortalityRates['<10']);
  };

  useEffect(() => {
    calculateScore();
  }, [creatinine, bilirubin, inr, dialysis]);

  const isValidInput = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const handleInputChange = (value, setter) => {
    if (value === '' || isValidInput(value)) {
      setter(value);
    }
  };

  return (
    <Box className="bg-gray-100 min-h-screen">
      <Box className="p-5 bg-white">
        <Typography variant="h4" className="font-bold text-gray-800">
          MELD Score Calculator
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Model for End-Stage Liver Disease
        </Typography>
      </Box>

      <Card className="m-4">
        <CardContent className="space-y-4">
          <Typography variant="h6" className="font-semibold">
            Clinical Parameters
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={dialysis}
                onChange={(e) => setDialysis(e.target.checked)}
                color="primary"
              />
            }
            label="Dialysis (twice in past week)"
          />

          <TextField
            label="Creatinine (mg/dL)"
            type="number"
            value={creatinine}
            onChange={(e) => handleInputChange(e.target.value, setCreatinine)}
            className="w-full"
            placeholder="Enter value"
            InputLabelProps={{ shrink: true }}
            helperText="Normal range: 0.7-1.3 mg/dL"
          />

          <TextField
            label="Bilirubin (mg/dL)"
            type="number"
            value={bilirubin}
            onChange={(e) => handleInputChange(e.target.value, setBilirubin)}
            className="w-full"
            placeholder="Enter value"
            InputLabelProps={{ shrink: true }}
            helperText="Normal range: 0.3-1.2 mg/dL"
          />

          <TextField
            label="INR"
            type="number"
            value={inr}
            onChange={(e) => handleInputChange(e.target.value, setInr)}
            className="w-full"
            placeholder="Enter value"
            InputLabelProps={{ shrink: true }}
            helperText="Normal range: 0.8-1.1"
          />
        </CardContent>
      </Card>

      {score !== null && (
        <Card className="m-4">
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Results
            </Typography>
            <Box className="flex justify-between mb-2">
              <Typography className="text-gray-700">MELD Score:</Typography>
              <Typography variant="h5" className="font-bold text-gray-800">
                {score}
              </Typography>
            </Box>
            <Box className="flex justify-between">
              <Typography className="text-gray-700">3-Month Mortality Rate:</Typography>
              <Typography variant="h6" className="font-semibold text-red-600">
                {mortality}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      <Card className="m-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Clinical Interpretation
          </Typography>
          <Typography className="text-gray-700 whitespace-pre-line">
            • MELD Score ≥ 40: Consider immediate transplant evaluation
            • MELD Score 30-39: High priority for transplantation
            • MELD Score 20-29: Evaluate for transplant listing
            • MELD Score 10-19: Monitor closely
            • MELD Score below 10: Routine follow-up
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MELDScore;