import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box, Divider, Chip, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import Select from 'react-select';
import { AlertTriangle } from 'lucide-react';

// Constants for clinical staging and guidance
const CKD_STAGES = {
  G1: { 
    range: '≥90', 
    description: 'Normal or Increased', 
    color: '#34C759',
    guidance: {
      monitoring: 'Annual screening if risk factors present',
      referral: 'Primary care monitoring',
      labs: ['Serum creatinine', 'eGFR', 'UACR annually'],
      management: 'Lifestyle modification, risk factor control'
    }
  },
  G2: { 
    range: '60-89', 
    description: 'Mildly Decreased', 
    color: '#30B0C7',
    guidance: {
      monitoring: 'Annual screening',
      referral: 'Primary care monitoring',
      labs: ['Serum creatinine', 'eGFR', 'UACR', 'Basic metabolic panel annually'],
      management: 'Blood pressure control, glycemic control in diabetes'
    }
  },
  G3a: { 
    range: '45-59', 
    description: 'Mild-Moderately Decreased', 
    color: '#FFD60A',
    guidance: {
      monitoring: 'Every 6 months',
      referral: 'Consider nephrology referral if rapid progression',
      labs: ['CBC', 'CMP', 'PTH', 'Vitamin D', 'UACR every 6 months'],
      management: 'ACEi/ARB if proteinuric, avoid nephrotoxics'
    }
  },
  G3b: { 
    range: '30-44', 
    description: 'Moderate-Severely Decreased', 
    color: '#FF9500',
    guidance: {
      monitoring: 'Every 3-4 months',
      referral: 'Nephrology referral recommended',
      labs: ['CBC, CMP, PTH, Vitamin D, Phosphorus every 3-4 months'],
      management: 'Anemia management, mineral bone disease prevention'
    }
  },
  G4: { 
    range: '15-29', 
    description: 'Severely Decreased', 
    color: '#FF3B30',
    guidance: {
      monitoring: 'Every 2-3 months',
      referral: 'Urgent nephrology referral required',
      labs: ['Monthly labs if rapid progression'],
      management: 'RRT planning, vascular access planning if needed'
    }
  },
  G5: { 
    range: '<15', 
    description: 'Kidney Failure', 
    color: '#AF2A2A',
    guidance: {
      monitoring: 'Monthly or more frequently',
      referral: 'Immediate nephrology care',
      labs: ['Frequent comprehensive metabolic monitoring'],
      management: 'Urgent RRT preparation if not initiated'
    }
  }
};

const CKDEpiCalculator = () => {
  const [inputs, setInputs] = useState({
    creatinine: '',
    age: '',
    gender: null
  });
  const [gfrResult, setGfrResult] = useState(null);

  const genderOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' }
  ];

  const calculate2021CKDEpi = () => {
    const scr = parseFloat(inputs.creatinine);
    const age = parseFloat(inputs.age);
    
    if (!scr || !age || !inputs.gender) {
      alert('Please fill in all required fields');
      return;
    }

    let kappa = inputs.gender === 'female' ? 0.7 : 0.9;
    let alpha = inputs.gender === 'female' ? -0.241 : -0.302;
    
    let scrKappa = scr / kappa;
    let scrKappaAlpha = Math.pow(scrKappa, alpha);
    let ageExp = Math.pow(0.9938, age);
    
    let gfr = 142 * Math.min(scrKappa, 1) * scrKappaAlpha * ageExp;
    
    if (inputs.gender === 'female') {
      gfr *= 1.012;
    }
    
    const roundedGFR = Math.round(gfr * 10) / 10;
    const stage = getCKDStage(roundedGFR);
    const stageInfo = CKD_STAGES[stage];

    setGfrResult({
      value: roundedGFR,
      stage: stage,
      stageInfo: stageInfo
    });
  };

  const getCKDStage = (gfr) => {
    if (gfr >= 90) return 'G1';
    if (gfr >= 60) return 'G2';
    if (gfr >= 45) return 'G3a';
    if (gfr >= 30) return 'G3b';
    if (gfr >= 15) return 'G4';
    return 'G5';
  };

  const renderDetailedGuidance = () => {
    if (!gfrResult) return null;
    const { stage } = gfrResult;
    const guidance = CKD_STAGES[stage].guidance;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
        <Card className="p-6">
          <Typography variant="h6" className="mb-4 font-bold">
            Clinical Management Guidelines
          </Typography>
          
          <Box className="mb-4">
            <Typography variant="subtitle1" className="font-semibold">Monitoring Frequency</Typography>
            <Typography variant="body2" className="text-gray-600">{guidance.monitoring}</Typography>
          </Box>

          <Box className="mb-4">
            <Typography variant="subtitle1" className="font-semibold">Specialty Referral</Typography>
            <Typography variant="body2" className="text-gray-600">{guidance.referral}</Typography>
          </Box>

          <Box className="mb-4">
            <Typography variant="subtitle1" className="font-semibold">Recommended Labs</Typography>
            <List>
              {guidance.labs.map((lab, index) => (
                <ListItem key={index} className="py-1">
                  <ListItemText primary={`• ${lab}`} className="text-gray-600" />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box className="mb-4">
            <Typography variant="subtitle1" className="font-semibold">Management Focus</Typography>
            <Typography variant="body2" className="text-gray-600">{guidance.management}</Typography>
          </Box>

          {stage >= 'G3a' && (
            <Box className="bg-red-50 p-4 rounded-lg mb-4">
              <Box className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <Typography variant="subtitle1" className="font-semibold text-red-600">
                  Critical Considerations
                </Typography>
              </Box>
              <Typography variant="body2" className="text-red-600 whitespace-pre-line">
                • Dose adjust medications for renal function
                {'\n'}• Monitor for anemia (CBC q 3-6 months)
                {'\n'}• Assess mineral bone disease (Ca, Phos, PTH)
                {'\n'}• Consider dietary protein restriction
                {'\n'}• Evaluate cardiovascular risk factors
              </Typography>
            </Box>
          )}

          <Button
            variant="outlined"
            className="w-full"
            onClick={() => window.open('https://www.kidney.org/professionals/guidelines', '_blank')}
          >
            View Full KDOQI Guidelines
          </Button>
        </Card>
      </motion.div>
    );
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
            CKD-EPI GFR Calculator
          </Typography>
          <Typography variant="subtitle2" className="text-center text-gray-500 mb-6">
            2021 CKD-EPI Equation (ASN/NKF Standard)
          </Typography>

          <Box className="space-y-4">
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
                Reference Range: Male 0.7-1.3 mg/dL, Female 0.6-1.1 mg/dL
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
              <Typography variant="subtitle2" className="mb-1">Sex at Birth*</Typography>
              <Select
                options={genderOptions}
                value={genderOptions.find(opt => opt.value === inputs.gender)}
                onChange={(selected) => setInputs({...inputs, gender: selected.value})}
                className="text-sm"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
              onClick={calculate2021CKDEpi}
            >
              Calculate GFR
            </Button>
          </Box>

          {gfrResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
              <Card className="p-6 border-2" sx={{ borderColor: gfrResult.stageInfo.color }}>
                <Box className="flex justify-between items-center mb-4">
                  <Typography variant="h6" className="font-bold">
                    eGFR Result
                  </Typography>
                  <Chip
                    label={`CKD Stage ${gfrResult.stage}`}
                    style={{ backgroundColor: gfrResult.stageInfo.color, color: 'white' }}
                  />
                </Box>

                <Box className="text-center mb-4">
                  <Typography variant="h3" className="font-bold">
                    {gfrResult.value}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    mL/min/1.73m²
                  </Typography>
                </Box>

                <Box className="bg-gray-50 p-4 rounded-lg">
                  <Typography variant="subtitle1" className="font-semibold mb-2">
                    Clinical Interpretation
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {gfrResult.stageInfo.description}
                    {'\n'}Normal Range: above 90 mL/min/1.73m²
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          )}

          {renderDetailedGuidance()}
        </Card>
      </motion.div>
    </div>
  );
};

export default CKDEpiCalculator;