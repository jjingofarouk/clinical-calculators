import React, { useState, useRef } from 'react';
import { Button, Card, TextField, Typography, Box, List, ListItem, ListItemText, Chip } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ChronicKidneyDiseaseStageCalculator = () => {
  const [gfr, setGfr] = useState('');
  const [age, setAge] = useState('');
  const [albuminuria, setAlbuminuria] = useState('');
  const [stage, setStage] = useState(null);
  const [error, setError] = useState('');
  const controls = useAnimation();

  const fadeIn = async () => {
    await controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
  };

  const getStageDetails = (gfrValue) => {
    const stages = {
      'Stage 1': {
        range: '≥90',
        description: 'Kidney damage with normal or increased GFR',
        recommendations: [
          'Monitor BP closely (target <130/80)',
          'Annual screening for albuminuria',
          'Lifestyle modifications',
          'Manage cardiovascular risk factors'
        ],
        complications: [
          'Usually asymptomatic',
          'May have hypertension',
          'Early metabolic changes'
        ]
      },
      'Stage 2': {
        range: '60-89',
        description: 'Mild reduction in GFR',
        recommendations: [
          'BP control',
          'Glycemic control if diabetic',
          'Consider ACE/ARB therapy',
          'Dietary sodium restriction'
        ],
        complications: [
          'PTH may begin to rise',
          'Early vitamin D reduction',
          'Increased cardiovascular risk'
        ]
      },
      'Stage 3a': {
        range: '45-59',
        description: 'Mild to moderate reduction in GFR',
        recommendations: [
          'Nephrology referral',
          'Anemia screening',
          'Bone disease screening',
          'Nutritional assessment'
        ],
        complications: [
          'Anemia may develop',
          'Early bone disease',
          'Metabolic acidosis risk'
        ]
      },
      'Stage 3b': {
        range: '30-44',
        description: 'Moderate to severe reduction in GFR',
        recommendations: [
          'Regular nephrology care',
          'Medication dose adjustments',
          'Mineral metabolism monitoring',
          'Vaccination status review'
        ],
        complications: [
          'Hypertension common',
          'Anemia',
          'Bone disease',
          'Malnutrition risk'
        ]
      },
      'Stage 4': {
        range: '15-29',
        description: 'Severe reduction in GFR',
        recommendations: [
          'RRT planning',
          'Vascular access planning',
          'Dietary protein restriction',
          'Regular cardiovascular assessment'
        ],
        complications: [
          'Cardiovascular disease',
          'Hyperphosphatemia',
          'Metabolic acidosis',
          'Hyperkalemia risk'
        ]
      },
      'Stage 5': {
        range: '<15',
        description: 'Kidney failure',
        recommendations: [
          'Immediate RRT consideration',
          'Palliative care discussion',
          'Strict fluid management',
          'Complex medication adjustments'
        ],
        complications: [
          'Uremia',
          'Fluid overload',
          'Resistant hypertension',
          'High mortality risk'
        ]
      }
    };

    if (gfrValue >= 90) return { stage: 'Stage 1', details: stages['Stage 1'] };
    if (gfrValue >= 60) return { stage: 'Stage 2', details: stages['Stage 2'] };
    if (gfrValue >= 45) return { stage: 'Stage 3a', details: stages['Stage 3a'] };
    if (gfrValue >= 30) return { stage: 'Stage 3b', details: stages['Stage 3b'] };
    if (gfrValue >= 15) return { stage: 'Stage 4', details: stages['Stage 4'] };
    return { stage: 'Stage 5', details: stages['Stage 5'] };
  };

  const calculateRiskCategory = (gfrValue, albuminuriaValue) => {
    const albuminuriaCategory = 
      albuminuriaValue < 30 ? 'A1' :
      albuminuriaValue <= 300 ? 'A2' : 'A3';

    const riskMatrix = {
      'Stage 1': { A1: 'Low', A2: 'Moderate', A3: 'High' },
      'Stage 2': { A1: 'Low', A2: 'Moderate', A3: 'High' },
      'Stage 3a': { A1: 'Moderate', A2: 'High', A3: 'Very High' },
      'Stage 3b': { A1: 'High', A2: 'Very High', A3: 'Very High' },
      'Stage 4': { A1: 'Very High', A2: 'Very High', A3: 'Very High' },
      'Stage 5': { A1: 'Very High', A2: 'Very High', A3: 'Very High' }
    };

    const stage = getStageDetails(gfrValue).stage;
    return {
      riskLevel: riskMatrix[stage][albuminuriaCategory],
      albuminuriaCategory
    };
  };

  const determineCKDStage = () => {
    setError('');
    
    if (!gfr) {
      setError('Please enter GFR value');
      return;
    }

    const gfrValue = parseFloat(gfr);
    if (isNaN(gfrValue)) {
      setError('Please enter a valid number for GFR');
      return;
    }

    const stageInfo = getStageDetails(gfrValue);
    const riskInfo = albuminuria ? calculateRiskCategory(gfrValue, parseFloat(albuminuria)) : null;
    
    setStage({ ...stageInfo, riskInfo });
    fadeIn();
  };

  const riskColors = {
    Low: '#48BB78',
    Moderate: '#ECC94B',
    High: '#ED8936',
    'Very High': '#E53E3E'
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
            CKD Stage Calculator
          </Typography>
          <Typography variant="subtitle2" className="text-center text-gray-500 mb-2">
            Advanced Clinical Edition
          </Typography>
          <Typography variant="caption" className="text-center text-gray-500 mb-6 block">
            Comprehensive CKD staging and risk assessment tool
          </Typography>

          <Box className="space-y-4">
            <Box>
              <Typography variant="subtitle2" className="mb-1">eGFR (mL/min/1.73m²)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter eGFR value"
                value={gfr}
                onChange={(e) => setGfr(e.target.value)}
                type="number"
                size="small"
              />
              <Typography variant="caption" className="text-gray-500 mt-1">
                Reference: ≥90 mL/min/1.73m²
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Urine Albumin-to-Creatinine Ratio (mg/g)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter ACR value (optional)"
                value={albuminuria}
                onChange={(e) => setAlbuminuria(e.target.value)}
                type="number"
                size="small"
              />
              <Typography variant="caption" className="text-gray-500 mt-1">
                For risk stratification
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Patient Age (years)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter patient age (optional)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                size="small"
              />
              <Typography variant="caption" className="text-gray-500 mt-1">
                For context-specific recommendations
              </Typography>
            </Box>

            {error && (
              <Box className="bg-red-50 p-3 rounded-lg">
                <Typography variant="body2" className="text-red-600">{error}</Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
              onClick={determineCKDStage}
            >
              Calculate CKD Stage
            </Button>
          </Box>

          {stage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              className="mt-6"
            >
              <Typography variant="h6" className="font-bold mb-4">
                Clinical Assessment
              </Typography>

              <Card className="p-4 mb-4">
                <Typography variant="h5" className="font-bold mb-2">{stage.stage}</Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  GFR Range: {stage.details.range} mL/min/1.73m²
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  {stage.details.description}
                </Typography>

                {stage.riskInfo && (
                  <Box className="bg-gray-50 p-3 rounded-lg">
                    <Typography variant="subtitle1" className="font-semibold mb-2">
                      Risk Category
                    </Typography>
                    <Chip
                      label={stage.riskInfo.riskLevel}
                      style={{ backgroundColor: riskColors[stage.riskInfo.riskLevel], color: 'white' }}
                      className="mb-2"
                    />
                    <Typography variant="body2" className="text-gray-600">
                      Albuminuria Category: {stage.riskInfo.albuminuriaCategory}
                    </Typography>
                  </Box>
                )}
              </Card>

              <Card className="p-4 mb-4">
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Key Recommendations
                </Typography>
                <List>
                  {stage.details.recommendations.map((rec, index) => (
                    <ListItem key={index} className="py-1">
                      <ListItemText primary={`• ${rec}`} className="text-gray-600" />
                    </ListItem>
                  ))}
                </List>
              </Card>

              <Card className="p-4 mb-4">
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Monitor for Complications
                </Typography>
                <List>
                  {stage.details.complications.map((comp, index) => (
                    <ListItem key={index} className="py-1">
                      <ListItemText primary={`• ${comp}`} className="text-gray-600" />
                    </ListItem>
                  ))}
                </List>
              </Card>

              <Card className="p-4">
                <Typography variant="h6" className="font-bold mb-2">
                  Clinical Notes
                </Typography>
                <List>
                  {[
                    'eGFR should be stable over 3 months',
                    'Consider age-related GFR decline',
                    'Assess cardiovascular risk factors',
                    'Review medication dosing per GFR',
                    'Consider nephrology referral for stages 3b-5'
                  ].map((note, index) => (
                    <ListItem key={index} className="py-1">
                      <ListItemText primary={`• ${note}`} className="text-gray-600" />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ChronicKidneyDiseaseStageCalculator;