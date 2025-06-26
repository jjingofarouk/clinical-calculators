import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Card, CardContent, FormControlLabel, Switch, Button } from '@mui/material';
import { Calculator, Stethoscope, AlertTriangle } from 'lucide-react';

const MELDScore = () => {
  const [dialysis, setDialysis] = useState(false);
  const [creatinine, setCreatinine] = useState('');
  const [bilirubin, setBilirubin] = useState('');
  const [inr, setInr] = useState('');
  const [sodium, setSodium] = useState('');
  const [score, setScore] = useState(null);
  const [mortality, setMortality] = useState(null);
  const [meldNaScore, setMeldNaScore] = useState(null);

  const calculateScore = () => {
    if (!creatinine || !bilirubin || !inr) return;

    let creatValue = parseFloat(creatinine);
    const bilirubinValue = parseFloat(bilirubin);
    const inrValue = parseFloat(inr);
    const sodiumValue = sodium ? parseFloat(sodium) : 137;

    if (dialysis) {
      creatValue = 4.0;
    }

    creatValue = Math.max(1.0, Math.min(creatValue, 4.0));
    const bilirubinAdjusted = Math.max(1.0, bilirubinValue);
    const inrAdjusted = Math.max(1.0, inrValue);
    const sodiumAdjusted = Math.max(125, Math.min(137, sodiumValue));

    const rawScore = (
      3.78 * Math.log(bilirubinAdjusted) +
      11.2 * Math.log(inrAdjusted) +
      9.57 * Math.log(creatValue) +
      6.43
    );

    const finalScore = Math.round(Math.max(6, Math.min(40, rawScore)));
    setScore(finalScore);

    const meldNa = Math.round(finalScore + 1.32 * (137 - sodiumAdjusted) - 
      (0.033 * finalScore * (137 - sodiumAdjusted)));
    setMeldNaScore(Math.max(6, Math.min(40, meldNa)));

    const mortalityRates = {
      '40+': '71.3%',
      '30-39': '52.6%',
      '20-29': '19.6%',
      '10-19': '6.0%',
      '<10': '1.9%'
    };

    const getMortality = (score) => {
      if (score >= 40) return mortalityRates['40+'];
      if (score >= 30) return mortalityRates['30-39'];
      if (score >= 20) return mortalityRates['20-29'];
      if (score >= 10) return mortalityRates['10-19'];
      return mortalityRates['<10'];
    };

    setMortality(getMortality(finalScore));
  };

  useEffect(() => {
    calculateScore();
  }, [creatinine, bilirubin, inr, sodium, dialysis]);

  const isValidInput = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const handleInputChange = (value, setter) => {
    if (value === '' || isValidInput(value)) {
      setter(value);
    }
  };

  return (
    <main className="container">
      <Box className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="h-6 w-6 text-teal-600" />
          <Typography className="header">
            MELD Score Calculator
          </Typography>
        </div>
        <Typography className="text-gray-600 mb-6">
          Model for End-Stage Liver Disease (MELD) and MELD-Na for Decompensated Liver Cirrhosis
        </Typography>
      </Box>

      <Card className="card m-4">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-teal-600" />
            <Typography className="header">
              Clinical Parameters
            </Typography>
          </div>

          <FormControlLabel
            control={
              <Switch
                checked={dialysis}
                onChange={(e) => setDialysis(e.target.checked)}
                className="text-teal-600"
              />
            }
            label="Dialysis (twice in past week)"
            className="text-gray-700"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
          />

          <TextField
            label="Sodium (mEq/L)"
            type="number"
            value={sodium}
            onChange={(e) => handleInputChange(e.target.value, setSodium)}
            className="w-full"
            placeholder="Enter value"
            InputLabelProps={{ shrink: true }}
            helperText="Normal range: 135-145 mEq/L"
            variant="outlined"
          />

          <Button
            className="btn-primary"
            onClick={calculateScore}
          >
            Calculate MELD Score
          </Button>
        </CardContent>
      </Card>

      {score !== null && (
        <Card className="card m-4">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-teal-600" />
              <Typography className="header">
                Results
              </Typography>
            </div>
            <Box className="space-y-2">
              <div className="flex justify-between">
                <Typography className="text-gray-700">MELD Score:</Typography>
                <Typography className="font-bold text-gray-800">{score}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography className="text-gray-700">MELD-Na Score:</Typography>
                <Typography className="font-bold text-gray-800">{meldNaScore}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography className="text-gray-700">1-Month Mortality Risk:</Typography>
                <Typography className="font-semibold text-red-600">{mortality}</Typography>
              </div>
            </Box>
          </CardContent>
        </Card>
      )}

      <Card className="card m-4">
        <CardContent>
          <Typography className="header">
            Clinical Interpretation and Guidance
          </Typography>
          <Typography className="text-gray-700 whitespace-pre-line">
            • MELD Score ≥ 40: Immediate transplant evaluation recommended (71.3% 1-month mortality risk).
            • MELD Score 30-39: High priority for transplantation (52.6% 1-month mortality risk).
            • MELD Score 20-29: Evaluate for transplant listing (19.6% 1-month mortality risk).
            • MELD Score 10-19: Close monitoring required (6.0% 1-month mortality risk).
            • MELD Score < 10: Routine follow-up recommended (1.9% 1-month mortality risk).
            {'\n'}
            **Next Steps**:
            - Consult a hepatologist for comprehensive evaluation.
            - Consider imaging (ultrasound, CT, or MRI) to assess liver architecture and portal hypertension.
            - Monitor for complications (e.g., ascites, varices, hepatic encephalopathy).
            - Refer to OPTN guidelines for transplant prioritization: https://optn.transplant.hrsa.gov
            {'\n'}
            **References**:
            - Emenena et al. (2023). Cureus, 15(5):e39267. doi: 10.7759/cureus.39267
            - Kim et al. (2014). Hepatology, 59(3):1010-1015. doi: 10.1002/hep.26517
            - Cleveland Clinic MELD Score Information: https://my.clevelandclinic.org/health/diagnostics/meld-score
            - OPTN MELD Calculator: https://optn.transplant.hrsa.gov/data/allocation-calculators/meld-calculator/
          </Typography>
        </CardContent>
      </Card>
    </main>
  );
};

export default MELDScore;