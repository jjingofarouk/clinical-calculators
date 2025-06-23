import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box, Chip, Switch, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';
import Select from 'react-select';

const CKD_STAGES = {
  1: { range: '≥90', description: 'Normal or High', color: '#4CAF50' },
  2: { range: '60-89', description: 'Mildly Decreased', color: '#8BC34A' },
  3: { range: '30-59', description: 'Moderately Decreased', color: '#FFC107' },
  4: { range: '15-29', description: 'Severely Decreased', color: '#FF9800' },
  5: { range: '<15', description: 'Kidney Failure', color: '#F44336' },
};

const GFRCalculator = () => {
  const [inputs, setInputs] = useState({
    creatinine: '',
    age: '',
    gender: 'female',
    isBlack: false,
    weight: '',
    height: '',
  });
  const [results, setResults] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const genderOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' }
  ];

  const calculateMDRD = () => {
    const { creatinine, age, gender, isBlack } = inputs;
    if (!creatinine || !age) return null;

    let gfr = 175 * Math.pow(parseFloat(creatinine), -1.154) 
              * Math.pow(parseFloat(age), -0.203);
    
    if (gender === 'female') gfr *= 0.742;
    if (isBlack) gfr *= 1.212;

    return gfr.toFixed(2);
  };

  const calculateCockcroftGault = () => {
    const { creatinine, age, gender, weight } = inputs;
    if (!creatinine || !age || !weight) return null;

    let cgClearance = ((140 - parseFloat(age)) * parseFloat(weight)) /
                      (72 * parseFloat(creatinine));
    
    if (gender === 'female') cgClearance *= 0.85;

    return cgClearance.toFixed(2);
  };

  const getCKDStage = (gfr) => {
    const gfrValue = parseFloat(gfr);
    if (gfrValue >= 90) return 1;
    if (gfrValue >= 60) return 2;
    if (gfrValue >= 30) return 3;
    if (gfrValue >= 15) return 4;
    return 5;
  };

  const handleCalculate = () => {
    const mdrdResult = calculateMDRD();
    const cgResult = calculateCockcroftGault();
    
    if (mdrdResult && cgResult) {
      const stage = getCKDStage(mdrdResult);
      setResults({
        mdrd: mdrdResult,
        cg: cgResult,
        stage,
        stageInfo: CKD_STAGES[stage],
      });
      setShowRecommendations(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-6">
          <Typography variant="h4" className="text-center font-bold mb-6">
            GFR Calculator
          </Typography>

          <Box className="space-y-4">
            <Box>
              <Typography variant="subtitle2" className="mb-1">Serum Creatinine</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Creatinine (mg/dL)"
                value={inputs.creatinine}
                onChange={(e) => setInputs({...inputs, creatinine: e.target.value})}
                type="number"
                size="small"
              />
              <Typography variant="caption" className="text-gray-500 mt-1">
                Reference Range: 0.6 - 1.2 mg/dL
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Age</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Age (years)"
                value={inputs.age}
                onChange={(e) => setInputs({...inputs, age: e.target.value})}
                type="number"
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Weight</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Weight (kg)"
                value={inputs.weight}
                onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                type="number"
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Sex at Birth</Typography>
              <Select
                options={genderOptions}
                value={genderOptions.find(opt => opt.value === inputs.gender)}
                onChange={(selected) => setInputs({...inputs, gender: selected.value})}
                className="text-sm"
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={inputs.isBlack}
                    onChange={() => setInputs({...inputs, isBlack: !inputs.isBlack})}
                    color="primary"
                  />
                }
                label="Black Race (Optional)"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
              onClick={handleCalculate}
            >
              Calculate GFR
            </Button>

            {results && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                <Card className="p-4 mb-4" sx={{ borderLeft: `4px solid ${results.stageInfo.color}` }}>
                  <Chip
                    label={`CKD Stage ${results.stage} - ${results.stageInfo.description}`}
                    style={{ backgroundColor: results.stageInfo.color, color: 'white' }}
                    className="mb-4"
                  />
                  <Box className="flex justify-between">
                    <Box className="text-center">
                      <Typography variant="caption" className="text-gray-600">MDRD GFR</Typography>
                      <Typography variant="h5" className="font-bold">{results.mdrd}</Typography>
                      <Typography variant="caption" className="text-gray-500">mL/min/1.73m²</Typography>
                    </Box>
                    <Box className="text-center">
                      <Typography variant="caption" className="text-gray-600">Cockcroft-Gault</Typography>
                      <Typography variant="h5" className="font-bold">{results.cg}</Typography>
                      <Typography variant="caption" className="text-gray-500">mL/min</Typography>
                    </Box>
                  </Box>
                </Card>

                {showRecommendations && (
                  <Card className="p-4">
                    <Typography variant="h6" className="font-bold mb-4">Clinical Recommendations</Typography>
                    <Box className="space-y-2">
                      <Typography variant="body2">
                        • Monitoring Frequency: {results.stage <= 2 ? 'Annually' : results.stage === 3 ? 'Every 3-6 months' : 'Monthly'}
                      </Typography>
                      <Typography variant="body2">
                        • Referral to Nephrology: {results.stage >= 4 ? 'Strongly Recommended' : results.stage === 3 ? 'Consider based on progression' : 'Not typically needed'}
                      </Typography>
                      <Typography variant="body2">
                        • Key Interventions:<br />
                        - BP Target: below 130/80 mmHg<br />
                        - Diabetes Control: HbA1c below 7%<br />
                        - Avoid nephrotoxic medications
                        {results.stage >= 3 ? '<br />- Consider dose adjustments for medications' : ''}
                      </Typography>
                      {results.stage >= 3 && (
                        <Typography variant="body2" className="text-red-600 font-medium mt-2">
                          ⚠️ Consider dose adjustments for medications cleared by kidneys
                        </Typography>
                      )}
                    </Box>
                  </Card>
                )}
              </motion.div>
            )}
          </Box>
        </Card>
      </motion.div>
    </div>
  );
};

export default GFRCalculator;