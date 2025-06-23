import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';

const PSICalculator = () => {
  const initialState = {
    age: '',
    sex: 'male',
    nursingHomeResident: false,
    neoplasticDisease: false,
    liverDisease: false,
    chfHistory: false,
    cerebrovascularDisease: false,
    renalDisease: false,
    mentalStatus: false,
    respiratoryRate: '',
    systolicBP: '',
    temperature: '',
    pulse: '',
    ph: '',
    bun: '',
    sodium: '',
    glucose: '',
    hematocrit: '',
    oxygenPressure: '',
    pleuralEffusion: false,
  };

  const [inputs, setInputs] = useState(initialState);
  const [score, setScore] = useState(null);
  const [showGuidance, setShowGuidance] = useState(false);

  const calculateScore = useCallback(() => {
    const requiredFields = [
      'age', 'respiratoryRate', 'systolicBP', 'temperature',
      'pulse', 'ph', 'bun', 'sodium', 'glucose', 'hematocrit'
    ];

    const missingFields = requiredFields.filter(field => !inputs[field]);
    if (missingFields.length > 0) {
      alert('Please fill in all required numeric fields to calculate the score accurately.');
      return;
    }

    let totalScore = parseInt(inputs.age, 10);
    if (inputs.sex === 'female') totalScore -= 10;
    if (inputs.nursingHomeResident) totalScore += 10;
    if (inputs.neoplasticDisease) totalScore += 30;
    if (inputs.liverDisease) totalScore += 20;
    if (inputs.chfHistory) totalScore += 10;
    if (inputs.cerebrovascularDisease) totalScore += 10;
    if (inputs.renalDisease) totalScore += 10;
    if (inputs.mentalStatus) totalScore += 20;
    if (parseInt(inputs.respiratoryRate, 10) >= 30) totalScore += 20;
    if (parseInt(inputs.systolicBP, 10) < 90) totalScore += 20;
    const temp = parseFloat(inputs.temperature);
    if (temp < 35 || temp > 39.9) totalScore += 15;
    if (parseInt(inputs.pulse, 10) >= 125) totalScore += 10;
    if (parseFloat(inputs.ph) < 7.35) totalScore += 30;
    if (parseFloat(inputs.bun) >= 30) totalScore += 20;
    if (parseFloat(inputs.sodium) < 130) totalScore += 20;
    if (parseFloat(inputs.glucose) >= 250) totalScore += 10;
    if (parseFloat(inputs.hematocrit) < 30) totalScore += 10;
    if (parseFloat(inputs.oxygenPressure) < 60) totalScore += 10;
    if (inputs.pleuralEffusion) totalScore += 10;

    setScore(totalScore);
  }, [inputs]);

  const getInterpretation = useCallback((score) => {
    if (!score) return null;
    if (score <= 70) return {
      class: 'Class I-II',
      risk: 'Low Risk',
      mortality: '0.1-0.7%',
      disposition: 'Consider Outpatient Management',
      color: '#4CAF50'
    };
    if (score <= 90) return {
      class: 'Class III',
      risk: 'Moderate Risk',
      mortality: '0.9-2.8%',
      disposition: 'Short Stay/Observation Unit',
      color: '#FFC107'
    };
    if (score <= 130) return {
      class: 'Class IV',
      risk: 'High Risk',
      mortality: '8.2-9.3%',
      disposition: 'Inpatient Admission Required',
      color: '#FF9800'
    };
    return {
      class: 'Class V',
      risk: 'Very High Risk',
      mortality: '27-31.1%',
      disposition: 'ICU Admission Consider',
      color: '#F44336'
    };
  }, []);

  const renderNumericInput = useCallback(({ label, field, placeholder, unit, normalRange }) => (
    <Box mb={3}>
      <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
        {label}
      </Typography>
      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          type="number"
          value={inputs[field]}
          onChange={(e) => setInputs(prev => ({ ...prev, [field]: e.target.value }))}
          placeholder={placeholder}
          variant="outlined"
          inputProps={{ step: '0.1' }}
        />
        {unit && <Typography variant="body2" className="text-gray-600 ml-2">{unit}</Typography>}
      </Box>
      {normalRange && (
        <Typography variant="caption" className="text-gray-500 italic mt-1">
          Normal range: {normalRange}
        </Typography>
      )}
    </Box>
  ), [inputs]);

  const renderToggle = useCallback(({ label, field }) => (
    <Box mb={2}>
      <FormControlLabel
        control={<Switch checked={inputs[field]} onChange={() => setInputs(prev => ({ ...prev, [field]: !prev[field] }))} />}
        label={label}
      />
    </Box>
  ), [inputs]);

  const interpretation = getInterpretation(score);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h4" className="font-bold text-gray-800 text-center mb-2">
              PSI/PORT Score Calculator
            </Typography>
            <Typography variant="subtitle1" className="text-gray-600 text-center mb-4">
              Pneumonia Severity Index
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              className="mb-4"
              onClick={() => setShowGuidance(!showGuidance)}
            >
              {showGuidance ? 'Hide Clinical Guidance' : 'Show Clinical Guidance'}
            </Button>

            {showGuidance && (
              <Card className="mb-4 bg-blue-50 border border-blue-200">
                <CardContent>
                  <Typography variant="h6" className="font-bold text-blue-800 mb-2">
                    Clinical Guidance
                  </Typography>
                  <Typography variant="body2" className="text-blue-700">
                    • Use for adult patients with community-acquired pneumonia<br />
                    • COVID-19 Consideration: Can be used after diagnosis to determine disposition<br />
                    • Validated for predicting mortality and identifying low-risk patients<br />
                    • Consider social factors and clinical judgment alongside score
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Box className="space-y-6">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-blue-800 mb-4">
                    Demographics
                  </Typography>
                  {renderNumericInput({
                    label: 'Age',
                    field: 'age',
                    placeholder: 'Enter age',
                    unit: 'years'
                  })}
                  <ToggleButtonGroup
                    value={inputs.sex}
                    exclusive
                    onChange={(e, value) => value && setInputs(prev => ({ ...prev, sex: value }))}
                    sx={{ mt: 2 }}
                  >
                    <ToggleButton value="male">Male</ToggleButton>
                    <ToggleButton value="female">Female</ToggleButton>
                  </ToggleButtonGroup>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-blue-800 mb-4">
                    Comorbidities
                  </Typography>
                  {renderToggle({ label: 'Nursing Home Resident', field: 'nursingHomeResident' })}
                  {renderToggle({ label: 'Neoplastic Disease', field: 'neoplasticDisease' })}
                  {renderToggle({ label: 'Liver Disease', field: 'liverDisease' })}
                  {renderToggle({ label: 'CHF History', field: 'chfHistory' })}
                  {renderToggle({ label: 'Cerebrovascular Disease', field: 'cerebrovascularDisease' })}
                  {renderToggle({ label: 'Renal Disease', field: 'renalDisease' })}
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-blue-800 mb-4">
                    Vital Signs
                  </Typography>
                  {renderNumericInput({
                    label: 'Respiratory Rate',
                    field: 'respiratoryRate',
                    placeholder: 'Enter rate',
                    unit: 'breaths/min',
                    normalRange: '12-20 breaths/min'
                  })}
                  {renderNumericInput({
                    label: 'Systolic BP',
                    field: 'systolicBP',
                    placeholder: 'Enter BP',
                    unit: 'mmHg',
                    normalRange: '90-120 mmHg'
                  })}
                  {renderNumericInput({
                    label: 'Temperature',
                    field: 'temperature',
                    placeholder: 'Enter temp',
                    unit: '°C',
                    normalRange: '36.5-37.5°C'
                  })}
                  {renderNumericInput({
                    label: 'Pulse',
                    field: 'pulse',
                    placeholder: 'Enter pulse',
                    unit: 'bpm',
                    normalRange: '60-100 bpm'
                  })}
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-blue-800 mb-4">
                    Laboratory Values
                  </Typography>
                  {renderNumericInput({
                    label: 'Arterial pH',
                    field: 'ph',
                    placeholder: 'Enter pH',
                    normalRange: '7.35-7.45'
                  })}
                  {renderNumericInput({
                    label: 'BUN',
                    field: 'bun',
                    placeholder: 'Enter BUN',
                    unit: 'mg/dL',
                    normalRange: '7-20 mg/dL'
                  })}
                  {renderNumericInput({
                    label: 'Sodium',
                    field: 'sodium',
                    placeholder: 'Enter sodium',
                    unit: 'mmol/L',
                    normalRange: '135-145 mmol/L'
                  })}
                  {renderNumericInput({
                    label: 'Glucose',
                    field: 'glucose',
                    placeholder: 'Enter glucose',
                    unit: 'mg/dL',
                    normalRange: '70-99 mg/dL (fasting)'
                  })}
                  {renderNumericInput({
                    label: 'Hematocrit',
                    field: 'hematocrit',
                    placeholder: 'Enter hematocrit',
                    unit: '%',
                    normalRange: '37-47% (F), 42-52% (M)'
                  })}
                  {renderNumericInput({
                    label: 'PaO2',
                    field: 'oxygenPressure',
                    placeholder: 'Enter PaO2',
                    unit: 'mmHg',
                    normalRange: '75-100 mmHg'
                  })}
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-blue-800 mb-4">
                    Additional Findings
                  </Typography>
                  {renderToggle({ label: 'Altered Mental Status', field: 'mentalStatus' })}
                  {renderToggle({ label: 'Pleural Effusion', field: 'pleuralEffusion' })}
                </CardContent>
              </Card>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateScore}
                sx={{ backgroundColor: '#005EB8', padding: 2 }}
              >
                Calculate PSI Score
              </Button>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className="mt-2"
                onClick={() => {
                  setInputs(initialState);
                  setScore(null);
                }}
              >
                Reset Calculator
              </Button>

              {score !== null && interpretation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <Card sx={{ border: `2px solid ${interpretation.color}` }}>
                    <CardContent className="p-6">
                      <Typography variant="h5" sx={{ color: interpretation.color, fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                        Score: {score} points
                      </Typography>
                      <Typography variant="h6" className="font-semibold text-gray-800 text-center mb-2">
                        {interpretation.class}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800 text-center mb-2">
                        {interpretation.risk}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 text-center mb-2">
                        Mortality Risk: {interpretation.mortality}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800 text-center">
                        Recommended Disposition: {interpretation.disposition}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PSICalculator;