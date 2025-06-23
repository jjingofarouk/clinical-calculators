import React, { useState } from 'react';
import Select from 'react-select';
import { Card, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slider } from '@mui/material';
import { motion } from 'framer-motion';
import InfoIcon from '@mui/icons-material/Info';

const GUIDANCE_TEXT = {
  general: "Please indicate which statements best describe your health state today",
  visualAnalog: "We would like to know how good or bad your health is TODAY.\n• This scale is numbered from 0 to 100\n• 100 means the best health you can imagine\n• 0 means the worst health you can imagine"
};

const CLINICAL_INTERPRETATION = {
  general: `The EQ-5D-5L provides three key metrics for patient health assessment:

1. Health State Profile (5-digit number)
- Each digit represents severity (1-5) for each dimension
- Example: 11111 indicates perfect health
- Example: 55555 indicates worst health state

2. EQ VAS Score (0-100)
- Patient's self-rated health
- Useful for tracking subjective health changes
- Independent of the dimension scores

3. Index Value (0-1)
- Derived from population preference weights
- 1 represents full health
- Negative values possible (states worse than death)
- Country-specific value sets available`,

  visualAnalog: `We would like to know how good or bad your health is TODAY.
• This scale is numbered from 0 to 100
• 100 means the best health you can imagine
• 0 means the worst health you can imagine`,

  dimensionScoring: `Dimension Severity Levels:
1 = No problems
2 = Slight problems
3 = Moderate problems
4 = Severe problems
5 = Extreme problems/Unable to`,

  clinicalRelevance: `Clinical Significance:

• Minimal Important Difference (MID):
- Index Value: 0.037-0.069
- VAS Score: 7-10 points

• Red Flags:
- Two-level deterioration in any dimension
- VAS score drop >10 points
- Index value drop >0.1`,

  recommendations: `Treatment Considerations:

• Score 1-2 in dimensions: 
- Monitor and preventive care
- Consider maintenance therapy

• Score 3:
- Active intervention likely needed
- Specialist referral may be indicated

• Score 4-5:
- Urgent intervention often required
- Comprehensive care plan needed
- Multi-disciplinary approach recommended`
};

const dimensionOptions = {
  mobility: [
    { label: "I have no problems in walking about", value: "1" },
    { label: "I have slight problems in walking about", value: "2" },
    { label: "I have moderate problems in walking about", value: "3" },
    { label: "I have severe problems in walking about", value: "4" },
    { label: "I am unable to walk about", value: "5" }
  ],
  selfCare: [
    { label: "I have no problems washing or dressing myself", value: "1" },
    { label: "I have slight problems washing or dressing myself", value: "2" },
    { label: "I have moderate problems washing or dressing myself", value: "3" },
    { label: "I have severe problems washing or dressing myself", value: "4" },
    { label: "I am unable to wash or dress myself", value: "5" }
  ],
  usualActivities: [
    { label: "I have no problems doing my usual activities", value: "1" },
    { label: "I have slight problems doing my usual activities", value: "2" },
    { label: "I have moderate problems doing my usual activities", value: "3" },
    { label: "I have severe problems doing my usual activities", value: "4" },
    { label: "I am unable to do my usual activities", value: "5" }
  ],
  painDiscomfort: [
    { label: "I have no pain or discomfort", value: "1" },
    { label: "I have slight pain or discomfort", value: "2" },
    { label: "I have moderate pain or discomfort", value: "3" },
    { label: "I have severe pain or discomfort", value: "4" },
    { label: "I have extreme pain or discomfort", value: "5" }
  ],
  anxietyDepression: [
    { label: "I am not anxious or depressed", value: "1" },
    { label: "I am slightly anxious or depressed", value: "2" },
    { label: "I am moderately anxious or depressed", value: "3" },
    { label: "I am severely anxious or depressed", value: "4" },
    { label: "I am extremely anxious or depressed", value: "5" }
  ]
};

const EQ5D = () => {
  const [dimensions, setDimensions] = useState({
    mobility: "1",
    selfCare: "1",
    usualActivities: "1",
    painDiscomfort: "1",
    anxietyDepression: "1"
  });
  const [visualAnalogScore, setVisualAnalogScore] = useState(100);
  const [score, setScore] = useState(null);
  const [showInterpretationGuide, setShowInterpretationGuide] = useState(false);

  const calculateScore = () => {
    const dimensionScore = Object.values(dimensions)
      .map(value => parseInt(value, 10) - 1)
      .reduce((a, b) => a + b, 0);
    
    const utilityScore = (100 - dimensionScore * 5) / 100;
    const healthState = Object.values(dimensions).join('');
    
    setScore({
      dimensions: dimensionScore,
      visualAnalog: visualAnalogScore,
      utilityScore: utilityScore,
      healthState: healthState,
      interpretation: interpretScore(dimensionScore, visualAnalogScore, utilityScore)
    });
  };

  const interpretScore = (dimensionScore, vas, utility) => {
    let interpretation = [];

    if (dimensionScore <= 4) {
      interpretation.push("Patient reports relatively good health status with minimal impairments.");
    } else if (dimensionScore <= 10) {
      interpretation.push("Patient shows moderate health impairment. Consider targeted interventions.");
    } else {
      interpretation.push("Significant health impairment indicated. Comprehensive care plan recommended.");
    }

    if (vas < 50) {
      interpretation.push("Patient's self-rated health is concerning. Detailed assessment recommended.");
    } else if (vas < 70) {
      interpretation.push("Moderate self-rated health. Monitor for changes.");
    }

    if (utility < 0.5) {
      interpretation.push("Quality of life significantly impacted. Consider specialist referral.");
    }

    return interpretation;
  };

  const renderDimensionSection = (dimension, title, subtitle = '') => {
    return (
      <Card className="p-4 mb-4" sx={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <Typography variant="h6" className="font-bold mb-2">{title}</Typography>
        {subtitle && <Typography variant="body2" className="text-gray-600 mb-2">{subtitle}</Typography>}
        <Select
          options={dimensionOptions[dimension]}
          value={dimensionOptions[dimension].find(opt => opt.value === dimensions[dimension])}
          onChange={(option) => setDimensions(prev => ({ ...prev, [dimension]: option.value }))}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: '5px',
              borderColor: '#e0e0e0',
              backgroundColor: '#fff',
            }),
            menu: (base) => ({
              ...base,
              borderRadius: '5px',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#e3f2fd' : '#fff',
              color: '#333',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }),
          }}
        />
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-6" sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="font-bold" sx={{ color: '#2c3e50' }}>
              EQ-5D-5L Clinical Assessment
            </Typography>
            <Button
              variant="outlined"
              startIcon={<InfoIcon />}
              onClick={() => setShowInterpretationGuide(true)}
              sx={{ borderRadius: '10px' }}
            >
              Clinical Guide
            </Button>
          </Box>

          <Typography variant="body1" className="text-gray-600 mb-4">
            {GUIDANCE_TEXT.general}
          </Typography>

          {renderDimensionSection('mobility', 'MOBILITY', 'Walking ability')}
          {renderDimensionSection('selfCare', 'SELF-CARE', 'Washing and dressing')}
          {renderDimensionSection('usualActivities', 'USUAL ACTIVITIES', 'e.g. work, study, housework, family or leisure activities')}
          {renderDimensionSection('painDiscomfort', 'PAIN / DISCOMFORT')}
          {renderDimensionSection('anxietyDepression', 'ANXIETY / DEPRESSION')}

          <Card className="p-4 mb-4" sx={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
            <Typography variant="h6" className="font-bold mb-2">Your health today</Typography>
            <Typography variant="body2" className="text-gray-600 mb-2">{GUIDANCE_TEXT.visualAnalog}</Typography>
            <Box className="flex items-center">
              <Typography variant="body2" className="mr-2">0</Typography>
              <Slider
                value={visualAnalogScore}
                onChange={(_, newValue) => setVisualAnalogScore(newValue)}
                min={0}
                max={100}
                step={1}
                sx={{
                  flex: 1,
                  mx: 2,
                  '& .MuiSlider-rail': { backgroundColor: '#000' },
                  '& .MuiSlider-track': { backgroundColor: '#2196F3' },
                }}
              />
              <Typography variant="body2">100</Typography>
            </Box>
            <Typography variant="body2" className="text-center mt-2">
              Selected value: {visualAnalogScore}
            </Typography>
          </Card>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={calculateScore}
            sx={{ borderRadius: '8px', py: 1.5, backgroundColor: '#2196F3' }}
          >
            Calculate EQ-5D Score
          </Button>

          {score && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <Card className="p-4" sx={{ backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
                <Typography variant="h6" className="font-bold mb-3">Clinical Assessment Results</Typography>
                
                <Box className="mb-3">
                  <Typography variant="subtitle2" className="font-semibold">Health State:</Typography>
                  <Typography variant="h6" className="text-primary">{score.healthState}</Typography>
                  <Typography variant="caption" className="text-gray-600">
                    5-digit profile representing severity in each dimension
                  </Typography>
                </Box>

                <Box className="mb-3">
                  <Typography variant="subtitle2" className="font-semibold">EQ VAS Score:</Typography>
                  <Typography variant="h6" className="text-primary">{score.visualAnalog}/100</Typography>
                  <Typography variant="caption" className="text-gray-600">
                    Patient's self-rated health status
                  </Typography>
                </Box>

                <Box className="mb-3">
                  <Typography variant="subtitle2" className="font-semibold">Utility Index:</Typography>
                  <Typography variant="h6" className="text-primary">{score.utilityScore.toFixed(3)}</Typography>
                  <Typography variant="caption" className="text-gray-600">
                    Population-weighted health state value
                  </Typography>
                </Box>

                <Box className="p-3 bg-gray-50 rounded-md">
                  <Typography variant="subtitle2" className="font-semibold mb-2">Clinical Interpretation:</Typography>
                  {score.interpretation.map((note, index) => (
                    <Typography key={index} variant="body2" className="mb-1">• {note}</Typography>
                  ))}
                </Box>
              </Card>
            </motion.div>
          )}
        </Card>

        <Dialog
          open={showInterpretationGuide}
          onClose={() => setShowInterpretationGuide(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 'bold', color: '#333' }}>
            EQ-5D-5L Clinical Interpretation Guide
          </DialogTitle>
          <DialogContent>
            {Object.entries(CLINICAL_INTERPRETATION).map(([key, text]) => (
              <Box key={key} className="mb-4">
                <Typography variant="body1" sx={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowInterpretationGuide(false)}
              color="primary"
              sx={{ borderRadius: '10px' }}
            >
              Close Guide
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default EQ5D;