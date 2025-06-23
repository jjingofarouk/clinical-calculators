import React, { useState } from 'react';
import { Box, Typography, Button, Modal, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, FormControlLabel, Checkbox } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const BISAPCalculator = () => {
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [criteria, setCriteria] = useState({
    bun: { value: false, detail: '> 25 mg/dL (8.92 mmol/L)' },
    mentalStatus: { value: false, detail: 'Disorientation, lethargy, somnolence, coma or stupor' },
    sirs: { value: false, detail: '≥2 SIRS Criteria (Temp >38°C/100.4°F or <36°C/96.8°F, HR >90, RR >20, WBC >12k or <4k)' },
    age: { value: false, detail: '> 60 years' },
    pleuralEffusion: { value: false, detail: 'Present on imaging' },
  });

  const calculateRisk = () => {
    const totalScore = Object.values(criteria).filter(c => c.value).length;
    setScore(totalScore);
    setShowResults(true);
  };

  const RecommendationItem = ({ text, priority }) => (
    <ListItem className="py-1">
      <ListItemIcon>
        <Box className={`w-2 h-2 rounded-full ${priority === 'high' ? 'bg-red-500' : 'bg-gray-500'}`} />
      </ListItemIcon>
      <ListItemText 
        primary={text} 
        className={`${priority === 'high' ? 'text-red-600 font-medium' : 'text-gray-700'}`}
      />
    </ListItem>
  );

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      <Box className="bg-white p-5 rounded-lg shadow-sm mb-4">
        <Typography variant="h4" className="font-bold text-gray-800 mb-1">
          BISAP Score
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Bedside Index for Severity in Acute Pancreatitis
        </Typography>
      </Box>

      <Card className="mb-4 bg-blue-50 border-l-4 border-blue-600">
        <CardContent className="p-4">
          <Typography className="text-blue-800 font-medium">
            ⏰ Evaluate within first 24 hours of presentation
          </Typography>
        </CardContent>
      </Card>

      <Box className="space-y-3">
        {Object.entries(criteria).map(([key, { value, detail }]) => (
          <Card 
            key={key}
            className={`p-4 cursor-pointer transition-colors ${value ? 'bg-blue-600 text-white' : 'bg-white'}`}
            onClick={() => setCriteria({
              ...criteria,
              [key]: { ...criteria[key], value: !value }
            })}
          >
            <Box className="flex justify-between items-center">
              <Box>
                <Typography className={`font-semibold ${value ? 'text-white' : 'text-gray-800'}`}>
                  {key.replace(/([A-Z])/g, ' $1').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Typography>
                <Typography className={`text-sm ${value ? 'text-gray-200' : 'text-gray-600'}`}>
                  {detail}
                </Typography>
              </Box>
              <FormControlLabel
                control={<Checkbox checked={value} readOnly />}
                label=""
                className="m-0"
              />
            </Box>
          </Card>
        ))}
      </Box>

      <Button
        variant="contained"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
        onClick={calculateRisk}
      >
        Calculate Risk
      </Button>

      <Modal
        open={showResults}
        onClose={() => setShowResults(false)}
        className="flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
        >
          <Box className="text-center mb-6">
            <Typography variant="h6" className="font-semibold text-gray-800">
              BISAP Score
            </Typography>
            <Typography variant="h3" className="font-bold text-blue-600">
              {score}
            </Typography>
          </Box>

          <Card className="mb-6 bg-blue-50">
            <CardContent>
              <Typography className="font-semibold text-blue-800 mb-2">
                Risk Assessment
              </Typography>
              <Typography className="text-blue-800">
                {score === 0
                  ? "Less than 1% mortality risk"
                  : score <= 2
                  ? "Approximately 1.9% mortality risk"
                  : "Significantly elevated mortality risk (>15%)"}
              </Typography>
            </CardContent>
          </Card>

          <Box className="mb-6">
            <Typography className="font-semibold text-gray-800 mb-3">
              Recommended Actions
            </Typography>
            <Card className="bg-gray-50">
              <List className="p-4">
                {score === 0 ? (
                  <>
                    <RecommendationItem text="Consider outpatient management" />
                    <RecommendationItem text="Monitor for 24-48 hours" />
                    <RecommendationItem text="Standard supportive care" />
                  </>
                ) : score <= 2 ? (
                  <>
                    <RecommendationItem text="Inpatient admission recommended" />
                    <RecommendationItem text="Serial vital sign monitoring" />
                    <RecommendationItem text="Early enteral nutrition if possible" />
                    <RecommendationItem text="Consider CT if deterioration occurs" />
                  </>
                ) : (
                  <>
                    <RecommendationItem text="Consider ICU admission" priority="high" />
                    <RecommendationItem text="Aggressive fluid resuscitation" priority="high" />
                    <RecommendationItem text="Monitor organ function closely" />
                    <RecommendationItem text="Early surgical consultation" />
                    <RecommendationItem text="CT imaging recommended" />
                  </>
                )}
              </List>
            </Card>
          </Box>

          <Box className="flex gap-2">
            <Button
              variant="contained"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowResults(false)}
            >
              Close
            </Button>
            <Button
              variant="outlined"
              className="flex-1 border-gray-300 text-gray-800 hover:bg-gray-100"
              onClick={() => console.log('Saving to EMR...')}
            >
              Save to EMR
            </Button>
          </Box>
        </motion.div>
      </Modal>
    </Box>
  );
};

export default BISAPCalculator;