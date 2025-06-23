import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const CLINICAL_THEME = {
  primary: '#2E3052',
  secondary: '#557BA8',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  error: '#D32F2F',
  text: '#333333',
  textLight: '#666666',
  border: '#DDDDDD',
  success: '#2E7D32',
};

const DYSPNEA_SCALE = [
  { score: 0, description: 'Dyspnea only with strenuous exercise' },
  { score: 1, description: 'Dyspnea when hurrying or walking up a slight hill' },
  { score: 2, description: 'Walks slower than people of same age because of dyspnea or stops for breath when walking at own pace' },
  { score: 3, description: 'Stops for breath after walking 100 yards (91 m) or after a few minutes' },
  { score: 4, description: 'Too dyspneic to leave house or breathless when dressing' }
];

const CLINICAL_GUIDANCE = {
  exclusions: [
    'Acute exacerbations of COPD',
    'Patients requiring immediate clinical intervention',
    'Unable to perform 6-minute walk test'
  ],
  usage: [
    'Use for stable COPD patients only',
    'Best used for prognostic discussions',
    'Should not guide therapy decisions'
  ],
  interpretation: {
    0: { risk: 'Low risk', survival: '80% 4-year survival' },
    1: { risk: 'Low risk', survival: '80% 4-year survival' },
    2: { risk: 'Low risk', survival: '80% 4-year survival' },
    3: { risk: 'Moderate risk', survival: '67% 4-year survival' },
    4: { risk: 'Moderate risk', survival: '67% 4-year survival' },
    5: { risk: 'High risk', survival: '57% 4-year survival' },
    6: { risk: 'High risk', survival: '57% 4-year survival' },
    7: { risk: 'Very high risk', survival: '18% 4-year survival' },
    8: { risk: 'Very high risk', survival: '18% 4-year survival' },
    9: { risk: 'Very high risk', survival: '18% 4-year survival' },
    10: { risk: 'Very high risk', survival: '18% 4-year survival' }
  }
};

const BODECalculator = () => {
  const [inputs, setInputs] = useState({
    bmi: '',
    fev1Percentage: '',
    dyspnea: '',
    sixMinuteWalk: '',
  });
  const [score, setScore] = useState(null);
  const [showGuidance, setShowGuidance] = useState(true);

  const calculateBODEIndex = useCallback(() => {
    const { bmi, fev1Percentage, dyspnea, sixMinuteWalk } = inputs;
    let totalScore = 0;

    if (!bmi || !fev1Percentage || dyspnea === '' || !sixMinuteWalk) {
      alert('Please fill in all fields.');
      return;
    }

    if (parseFloat(bmi) <= 21) totalScore += 1;

    const fev1 = parseFloat(fev1Percentage);
    if (fev1 >= 65) totalScore += 0;
    else if (fev1 >= 50 && fev1 < 65) totalScore += 1;
    else if (fev1 >= 36 && fev1 < 50) totalScore += 2;
    else if (fev1 < 36) totalScore += 3;

    totalScore += parseInt(dyspnea);

    const walkDistance = parseInt(sixMinuteWalk);
    if (walkDistance >= 350) totalScore += 0;
    else if (walkDistance >= 250 && walkDistance < 350) totalScore += 1;
    else if (walkDistance >= 150 && walkDistance < 250) totalScore += 2;
    else totalScore += 3;

    setScore(totalScore);
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Typography variant="h4" className="font-bold text-gray-800 text-center mb-4">
          BODE Index Calculator
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          Clinical Assessment Tool for COPD Prognosis
        </Typography>

        {showGuidance && (
          <Card className="shadow-lg mb-6">
            <CardContent className="p-6">
              <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                Important Clinical Guidance
              </Typography>
              <Typography variant="body2" className="text-red-600 font-semibold mb-4">
                Do not use during acute exacerbations or to guide therapy
              </Typography>
              <Typography variant="subtitle2" className="font-medium text-gray-800 mb-2">
                Exclusion Criteria:
              </Typography>
              {CLINICAL_GUIDANCE.exclusions.map((item, index) => (
                <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                  • {item}
                </Typography>
              ))}
              <Typography variant="subtitle2" className="font-medium text-gray-800 mt-4 mb-2">
                Appropriate Usage:
              </Typography>
              {CLINICAL_GUIDANCE.usage.map((item, index) => (
                <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                  • {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-6">
              <Box>
                <Typography variant="subtitle2" className="font-medium text-gray-800 mb-2">
                  Body Mass Index (BMI)
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  Points: ≤21 kg/m² = 1 point, >21 kg/m² = 0 points
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={inputs.bmi}
                  onChange={(e) => setInputs(prev => ({ ...prev, bmi: e.target.value }))}
                  placeholder="Enter BMI"
                  variant="outlined"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" className="font-medium text-gray-800 mb-2">
                  FEV₁ (% of predicted)
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  ≥65%: 0pts | 50-64%: 1pt | 36-49%: 2pts | ≤35%: 3pts
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={inputs.fev1Percentage}
                  onChange={(e) => setInputs(prev => ({ ...prev, fev1Percentage: e.target.value }))}
                  placeholder="Enter FEV₁ percentage"
                  variant="outlined"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" className="font-medium text-gray-800 mb-2">
                  mMRC Dyspnea Scale (0-4)
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  Select appropriate score based on symptoms
                </Typography>
                <RadioGroup
                  value={inputs.dyspnea}
                  onChange={(e) => setInputs(prev => ({ ...prev, dyspnea: e.target.value }))}
                >
                  {DYSPNEA_SCALE.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={index.toString()}
                      control={<Radio />}
                      label={`Score ${item.score}: ${item.description}`}
                      className="mb-2"
                    />
                  ))}
                </RadioGroup>
              </Box>

              <Box>
                <Typography variant="subtitle2" className="font-medium text-gray-800 mb-2">
                  6-Minute Walk Distance (meters)
                </Typography>
<Typography variant="body2" className="text-gray-600 mb-2">
  &ge;350m: 0pts | 250–349m: 1pt | 150–249m: 2pts | &lt;150m: 3pts
</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={inputs.sixMinuteWalk}
                  onChange={(e) => setInputs(prev => ({ ...prev, sixMinuteWalk: e.target.value }))}
                  placeholder="Enter distance in meters"
                  variant="outlined"
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateBODEIndex}
              >
                Calculate BODE Index
              </Button>

              {score !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <Typography variant="h6" className="font-bold text-gray-800">
                    BODE Index Score: {score}
                  </Typography>
                  <Typography variant="body1" className="text-gray-800 mt-2">
                    Risk Assessment: {CLINICAL_GUIDANCE.interpretation[score].risk}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mt-1">
                    {CLINICAL_GUIDANCE.interpretation[score].survival}
                  </Typography>
                  <Box className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="font-medium text-gray-800 mb-2">
                      Clinical Application:
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      • Use for prognostic assessment only<br />
                      • Do not use to guide therapy<br />
                      • Higher scores indicate increased risk of mortality<br />
                      • Consider in conjunction with other clinical factors<br />
                      • Reassess periodically in stable patients
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BODECalculator;