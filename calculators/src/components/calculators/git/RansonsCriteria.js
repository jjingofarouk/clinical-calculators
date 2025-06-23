import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Card, CardContent, Tabs, Tab, Grid } from '@mui/material';

const RansonsCriteria = () => {
  const initialState = {
    age: '',
    wbc: '',
    glucose: '',
    ldh: '',
    ast: '',
    hctDrop: '',
    bunIncrease: '',
    calcium: '',
    pO2: '',
    baseDeficit: '',
    fluidNeeds: '',
  };

  const [values, setValues] = useState(initialState);
  const [timePoint, setTimePoint] = useState('admission');
  const [admissionScore, setAdmissionScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const getMortalityRate = (score) => {
    const mortalityRates = {
      0: '0-3%',
      1: '0-3%',
      2: '15%',
      3: '40%',
      4: '40%',
      5: '100%',
      6: '100%',
      7: '100%',
      8: '100%',
    };
    return mortalityRates[score] || '100%';
  };

  const calculateScores = () => {
    let admissionPoints = 0;
    let totalPoints = 0;

    if (Number(values.age) > 55) admissionPoints++;
    if (Number(values.wbc) > 16000) admissionPoints++;
    if (Number(values.glucose) > 200) admissionPoints++;
    if (Number(values.ldh) > 350) admissionPoints++;
    if (Number(values.ast) > 250) admissionPoints++;

    totalPoints = admissionPoints;

    if (Number(values.hctDrop) > 10) totalPoints++;
    if (Number(values.bunIncrease) > 5) totalPoints++;
    if (Number(values.calcium) < 8) totalPoints++;
    if (Number(values.pO2) < 60) totalPoints++;
    if (Number(values.baseDeficit) > 4) totalPoints++;
    if (Number(values.fluidNeeds) > 6) totalPoints++;

    setAdmissionScore(admissionPoints);
    setTotalScore(totalPoints);
  };

  useEffect(() => {
    calculateScores();
  }, [values]);

  const getSeverityColor = (score) => {
    if (score <= 2) return '#4CAF50';
    if (score <= 4) return '#FFC107';
    return '#F44336';
  };

  const renderInputField = (label, key, unit, placeholder) => (
    <Box className="mb-4">
      <Typography className="font-semibold text-gray-700 mb-1">{label}</Typography>
      <Box className="flex items-center">
        <TextField
          type="number"
          value={values[key]}
          onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          placeholder={placeholder}
          className="w-full"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1 }}
        />
        <Typography className="ml-2 text-gray-600">{unit}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box className="bg-gray-100 min-h-screen">
      <Box className="p-5 bg-blue-600 text-white text-center">
        <Typography variant="h4" className="font-bold">
          Ranson's Criteria Calculator
        </Typography>
        <Typography variant="subtitle1">
          Pancreatitis Severity Assessment
        </Typography>
      </Box>

      <Tabs
        value={timePoint}
        onChange={(e, newValue) => setTimePoint(newValue)}
        className="bg-white"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="On Admission" value="admission" />
        <Tab label="48 Hours" value="48hour" />
      </Tabs>

      <Card className="m-4">
        <CardContent>
          {timePoint === 'admission' ? (
            <>
              {renderInputField('Age', 'age', 'years', '0-100')}
              {renderInputField('White Blood Cell Count', 'wbc', 'cells/mm³', '4000-20000')}
              {renderInputField('Blood Glucose', 'glucose', 'mg/dL', '70-500')}
              {renderInputField('Serum LDH', 'ldh', 'IU/L', '100-1000')}
              {renderInputField('AST (SGOT)', 'ast', 'IU/L', '0-1000')}
            </>
          ) : (
            <>
              {renderInputField('Hematocrit Drop', 'hctDrop', '%', '0-50')}
              {renderInputField('BUN Increase', 'bunIncrease', 'mg/dL', '0-50')}
              {renderInputField('Serum Calcium', 'calcium', 'mg/dL', '5-12')}
              {renderInputField('Arterial pO2', 'pO2', 'mmHg', '0-100')}
              {renderInputField('Base Deficit', 'baseDeficit', 'mEq/L', '0-20')}
              {renderInputField('Fluid Sequestration', 'fluidNeeds', 'L', '0-20')}
            </>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={2} className="mx-4 mb-4">
        <Grid item xs={6}>
          <Card sx={{ bgcolor: getSeverityColor(admissionScore), color: 'white', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                Admission Score
              </Typography>
              <Typography variant="h4" className="font-bold">
                {admissionScore}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: getSeverityColor(totalScore), color: 'white', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                Total Score
              </Typography>
              <Typography variant="h4" className="font-bold">
                {totalScore}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#34495E', color: 'white', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                Predicted Mortality Rate
              </Typography>
              <Typography variant="h5" className="font-bold">
                {getMortalityRate(totalScore)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card className="m-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Clinical Interpretation
          </Typography>
          <Typography className="text-gray-600 whitespace-pre-line">
            • Score ≤2: Mild pancreatitis (0-3% mortality)
            • Score 3-4: Moderate pancreatitis (15-40% mortality)
            • Score ≥5: Severe pancreatitis (above 40% mortality)
            {'\n'}
            Consider ICU admission for scores ≥3
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RansonsCriteria;