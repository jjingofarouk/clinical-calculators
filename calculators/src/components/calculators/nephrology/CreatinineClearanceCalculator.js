import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box, List, ListItem, ListItemText, Chip, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import Select from 'react-select';
import { AlertTriangle } from 'lucide-react';

// Clinical reference ranges and guidelines
const REFERENCE_RANGES = {
  creatinine: {
    male: { min: 0.7, max: 1.3 },
    female: { min: 0.6, max: 1.1 }
  },
  bmi: {
    underweight: 18.5,
    normal: 24.9,
    overweight: 29.9,
    obese: 30
  }
};

const CKD_STAGES = {
  1: { range: '≥90', description: 'Normal or High', color: '#4CAF50' },
  2: { range: '60-89', description: 'Mildly Decreased', color: '#8BC34A' },
  3: { range: '30-59', description: 'Moderately Decreased', color: '#FFC107' },
  4: { range: '15-29', description: 'Severely Decreased', color: '#FF5722' },
  5: { range: '<15', description: 'Kidney Failure', color: '#F44336' }
};

const CreatinineClearanceCalculator = () => {
  const [inputs, setInputs] = useState({
    creatinine: '',
    age: '',
    weight: '',
    height: '',
    gender: null,
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const genderOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' }
  ];

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const calculateClearance = () => {
    // Validate inputs
    if (!inputs.creatinine || !inputs.age || !inputs.weight || !inputs.height || !inputs.gender) {
      setError('Please fill in all required fields');
      return;
    }

    const age = parseFloat(inputs.age);
    const weight = parseFloat(inputs.weight);
    const height = parseFloat(inputs.height);
    const creatinine = parseFloat(inputs.creatinine);
    const bmi = calculateBMI(weight, height);

    // Cockcroft-Gault equation
    let clearance = ((140 - age) * weight) / (72 * creatinine);
    if (inputs.gender === 'female') {
      clearance *= 0.85;
    }

    // Adjust for body surface area if BMI is outside normal range
    let adjustedClearance = clearance;
    if (bmi > REFERENCE_RANGES.bmi.normal) {
      const idealWeight = (REFERENCE_RANGES.bmi.normal * (height/100) * (height/100));
      adjustedClearance = ((140 - age) * idealWeight) / (72 * creatinine);
      if (inputs.gender === 'female') {
        adjustedClearance *= 0.85;
      }
    }

    setResults({
      clearance: Math.round(clearance * 10) / 10,
      adjustedClearance: Math.round(adjustedClearance * 10) / 10,
      bmi: Math.round(bmi * 10) / 10,
      stage: getCKDStage(clearance)
    });
    setError(null);
  };

  const getCKDStage = (clearance) => {
    if (clearance >= 90) return CKD_STAGES[1];
    if (clearance >= 60) return CKD_STAGES[2];
    if (clearance >= 30) return CKD_STAGES[3];
    if (clearance >= 15) return CKD_STAGES[4];
    return CKD_STAGES[5];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-6">
          <Typography variant="h4" className="text-center font-bold mb-2">
            Creatinine Clearance Calculator
          </Typography>
          <Typography variant="subtitle2" className="text-center text-gray-500 mb-6">
            Cockcroft-Gault Equation
          </Typography>

          <Box className="space-y-4">
            <Box>
              <Typography variant="subtitle2" className="mb-1">Sex at Birth*</Typography>
              <Select
                options={genderOptions}
                value={genderOptions.find(opt => opt.value === inputs.gender)}
                onChange={(selected) => setInputs({...inputs, gender: selected.value})}
                className="text-sm"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Serum Creatinine*</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="mg/dL"
                value={inputs.creatinine}
                onChange={(e) => setInputs({...inputs, creatinine: e.target.value})}
                type="number"
                size="small"
              />
              <Typography variant="caption" className="text-gray-500 mt-1">
                Reference Range: {inputs.gender === 'male' ? '0.7-1.3' : inputs.gender === 'female' ? '0.6-1.1' : 'Select gender'} mg/dL
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Age*</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Years"
                value={inputs.age}
                onChange={(e) => setInputs({...inputs, age: e.target.value})}
                type="number"
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Weight*</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="kg"
                value={inputs.weight}
                onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                type="number"
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Height*</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="cm"
                value={inputs.height}
                onChange={(e) => setInputs({...inputs, height: e.target.value})}
                type="number"
                size="small"
              />
            </Box>

            {error && (
              <Alert severity="error" className="mt-4">
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
              onClick={calculateClearance}
            >
              Calculate
            </Button>
          </Box>

          {results && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
              <Card className="p-6 border-2" sx={{ borderColor: results.stage.color }}>
                <Typography variant="h6" className="font-bold mb-4 text-center">
                  Creatinine Clearance
                </Typography>
                
                <Typography variant="h3" className="text-center font-bold mb-2">
                  {results.clearance}
                </Typography>
                <Typography variant="body2" className="text-center text-gray-500 mb-4">
                  mL/min
                </Typography>

                {results.adjustedClearance !== results.clearance && (
                  <Box className="text-center mb-4">
                    <Typography variant="caption" className="text-gray-700">
                      Adjusted for Ideal Body Weight:
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                      {results.adjustedClearance} mL/min
                    </Typography>
                  </Box>
                )}

                <Chip
                  label={`CKD Stage - ${results.stage.description}`}
                  style={{ 
                    backgroundColor: results.stage.color,
                    color: 'white',
                    width: '100%',
                    padding: 8
                  }}
                  className="mb-4"
                />

                <Box className="flex justify-center gap-2">
                  <Typography variant="body2" className="text-gray-700">
                    BMI:
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    {results.bmi} kg/m²
                  </Typography>
                </Box>
              </Card>

              <Card className="p-6 mt-4">
                <Typography variant="h6" className="font-bold mb-4">
                  Clinical Guidance
                </Typography>

                <Box className="mb-4">
                  <Typography variant="subtitle1" className="font-semibold mb-2">
                    Medication Adjustments
                  </Typography>
                  <List>
                    {[
                      'Review medication dosing for renal adjustment',
                      'Consider anticoagulation modifications if CrCl < 30',
                      'Adjust antibiotics based on CrCl'
                    ].map((item, index) => (
                      <ListItem key={index} className="py-0">
                        <ListItemText primary={`•${item}`} className="text-gray-700" />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box className="mb-4">
                  <Typography variant="subtitle1" className="font-semibold mb-2">
                    Monitoring
                  </Typography>
                  <List>
                    {[
                      'Regular monitoring of renal function',
                      'Assessment of fluid status',
                      'Electrolyte monitoring'
                    ].map((item, index) => (
                      <ListItem key={index} className="py-0">
                        <ListItemText primary={`• ${item}`} className="text-gray-700" />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {results.clearance < 60 && (
                  <Box className="bg-red-50 p-4 rounded-lg">
                    <Box className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-700 mr-2" />
                      <Typography variant="subtitle1" className="font-semibold text-red-700">
                        Critical Considerations
                      </Typography>
                    </Box>
                    <List>
                      {[
                        'Nephrology referral recommended',
                        'Monitor for anemia',
                        'Assess bone mineral metabolism',
                        'Evaluate cardiovascular risk'
                      ].map((item, index) => (
                        <ListItem key={index} className="py-0">
                          <ListItemText primary={`• ${item}`} className="text-red-700" />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Card>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default CreatinineClearanceCalculator;