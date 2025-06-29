// ClinicalFrailtyScale.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Button,
  Modal,
  IconButton,
  Alert,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Info,
  Stethoscope,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart2,
  HeartPulse,
  Syringe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClinicalFrailtyScale = () => {
  const [frailtyScore, setFrailtyScore] = useState(null);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showFrailtyGuide, setShowFrailtyGuide] = useState(false);
  const [showAnesthesiaGuide, setShowAnesthesiaGuide] = useState(false);

  const frailtyLevels = [
    { score: 1, description: 'Very Fit - Robust, active, energetic, motivated, and fit; exercise regularly.' },
    { score: 2, description: 'Well - No active disease symptoms, but less fit than level 1.' },
    { score: 3, description: 'Managing Well - Medical problems are well controlled, not regularly active.' },
    { score: 4, description: 'Vulnerable - Not dependent, but symptoms limit activities; slower pace.' },
    { score: 5, description: 'Mildly Frail - Limited dependence on others for daily activities.' },
    { score: 6, description: 'Moderately Frail - Help needed for daily living and instrumental activities.' },
    { score: 7, description: 'Severely Frail - Completely dependent for personal care; stable.' },
    { score: 8, description: 'Very Severely Frail - Completely dependent, approaching end of life.' },
    { score: 9, description: 'Terminally Ill - Life expectancy <6 months, not otherwise frail.' },
  ];

  const anesthesiaGuidance = {
    '1-3': {
      risk: 'Low',
      considerations: [
        'Standard anesthesia protocols generally safe',
        'Monitor for age-related comorbidities (e.g., cardiovascular, pulmonary)',
        'Regional anesthesia preferred to minimize cognitive impact',
        'Use short-acting agents (e.g., propofol, remifentanil) to reduce recovery time',
        'Postoperative pain management with non-opioid analgesics preferred',
        'Routine postoperative monitoring sufficient'
      ],
      icon: <CheckCircle size={20} className="text-green-500" />
    },
    '4-6': {
      risk: 'Moderate',
      considerations: [
        'Increased risk of postoperative complications (delirium, prolonged recovery)',
        'Preoperative optimization of comorbidities (e.g., diabetes, hypertension)',
        'Avoid benzodiazepines to reduce risk of postoperative cognitive dysfunction',
        'Consider TIVA with propofol/remifentanil to minimize hepatic/renal load',
        'Use invasive monitoring (arterial line, CVP) for major procedures',
        'Plan for extended postoperative monitoring in PACU or step-down unit'
      ],
      icon: <AlertTriangle size={20} className="text-yellow-500" />
    },
    '7-9': {
      risk: 'High',
      considerations: [
        'High risk of perioperative morbidity/mortality, including delirium and aspiration',
        'Avoid elective surgery if possible; multidisciplinary consultation required',
        'Use minimal sedation (e.g., low-dose dexmedetomidine, avoid long-acting opioids)',
        'Mandatory invasive monitoring (arterial, CVP, TEE if indicated)',
        'Aggressive preoperative optimization of nutrition and hydration',
        'Prolonged ICU stay with frequent neurocognitive and respiratory monitoring'
      ],
      icon: <XCircle size={20} className="text-red-500" />
    }
  };

  const handleFrailtySelection = (event, newScore) => {
    if (newScore !== null) {
      setFrailtyScore(newScore);
      setError('');
      setShowResults(true);
    }
  };

  const resetForm = () => {
    setFrailtyScore(null);
    setError('');
    setShowResults(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen min-h-screen container bg-gray-50"
    >
      <Box className="p-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <Typography className="header">
            <Stethoscope size={24} className="inline mr-2" />
            Clinical Frailty Scale Calculator
          </Typography>
        </motion.div>

        <Collapse in={!!error}>
          <Alert severity="error" className="mb-4 max-w-4xl mx-auto">
            {error}
          </Alert>
        </Collapse>

        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="card">
            <CardContent>
              <Typography className="header">
                <Activity size={20} className="inline mr-2" />
                Frailty Assessment
              </Typography>
              <Box className="space-y-4">
                <Box>
                  <Box className="flex items-center mb-2">
                    <Typography>Frailty Score</Typography>
                    <IconButton onClick={() => setShowFrailtyGuide(true)}>
                      <Info size={20} />
                    </IconButton>
                  </Box>
                  <ToggleButtonGroup
                    value={frailtyScore}
                    exclusive
                    onChange={handleFrailtySelection}
                    className="w-full flex-wrap"
                  >
                    {frailtyLevels.map((level) => (
                      <ToggleButton key={level.score} value={level.score.toString()} className="flex-1 min-w-[120px]">
                        {level.score}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  <Typography variant="caption" className="text-gray-500">
                    Select the score that best matches the patient’s functional status
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex justify-center space-x-4"
        >
          <Button
            className="btn-primary"
            onClick={() => {
              if (!frailtyScore) {
                setError('Please select a frailty score');
                return;
              }
              setShowResults(true);
            }}
            startIcon={<BarChart2 size={20} />}
          >
            Confirm Score
          </Button>
          <Button
            className="btn-primary"
            onClick={resetForm}
            startIcon={<XCircle size={20} />}
          >
            Reset
          </Button>
        </motion.div>

        <AnimatePresence>
          {showResults && frailtyScore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 max-w-4xl mx-auto"
            >
              <Card className="card">
                <CardContent>
                  <Typography className="header">
                    <BarChart2 size={20} className="inline mr-2" />
                    Results
                  </Typography>
                  <Box className="text-center mb-4">
                    <Typography variant="h3" className="font-bold text-teal-600">
                      {frailtyScore}
                    </Typography>
                    <Typography variant="h5" className="font-semibold text-gray-800">
                      {frailtyLevels.find(level => level.score === parseInt(frailtyScore))?.description.split(' - ')[0]}
                    </Typography>
                  </Box>
                  <Card className="bg-gray-50">
                    <CardContent>
                      <Typography className="font-semibold mb-2">Description:</Typography>
                      <Typography className="text-gray-700">
                        {frailtyLevels.find(level => level.score === parseInt(frailtyScore))?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 mt-4">
                    <CardContent>
                      <Box className="flex items-center mb-2">
                        <Typography className="font-semibold">Anesthesia Considerations</Typography>
                        <IconButton onClick={() => setShowAnesthesiaGuide(true)}>
                          <Info size={20} />
                        </IconButton>
                      </Box>
                      <Box className="flex items-center">
                        {anesthesiaGuidance[frailtyScore <= 3 ? '1-3' : frailtyScore <= 6 ? '4-6' : '7-9'].icon}
                        <Typography className="ml-2 font-semibold">
                          Risk Level: {anesthesiaGuidance[frailtyScore <= 3 ? '1-3' : frailtyScore <= 6 ? '4-6' : '7-9'].risk}
                        </Typography>
                      </Box>
                      <List>
                        {anesthesiaGuidance[frailtyScore <= 3 ? '1-3' : frailtyScore <= 6 ? '4-6' : '7-9'].considerations.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Syringe size={16} className="text-teal-600" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Modal
          open={showFrailtyGuide}
          onClose={() => setShowFrailtyGuide(false)}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
          >
            <Typography className="header text-center">
              Clinical Frailty Scale Guide
            </Typography>
            {frailtyLevels.map((item) => (
              <Box key={item.score} className="mb-4">
                <Typography className="font-semibold">Score {item.score}: {item.description.split(' - ')[0]}</Typography>
                <Typography className="text-gray-700">{item.description.split(' - ')[1]}</Typography>
              </Box>
            ))}
            <Button
              className="btn-primary w-full mt-4"
              onClick={() => setShowFrailtyGuide(false)}
            >
              Close
            </Button>
          </motion.div>
        </Modal>

        <Modal
          open={showAnesthesiaGuide}
          onClose={() => setShowAnesthesiaGuide(false)}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
          >
            <Typography className="header text-center">
              Anesthesia Considerations - Score {frailtyScore}
            </Typography>
            <Box className="flex items-center mb-2">
              {anesthesiaGuidance[frailtyScore <= 3 ? '1-3' : frailtyScore <= 6 ? '4-6' : '7-9'].icon}
              <Typography className="ml-2 font-semibold">
                Risk Level: {anesthesiaGuidance[frailtyScore <= 3 ? '1-3' : frailtyScore <= 6 ? '4-6' : '7-9'].risk}
              </Typography>
            </Box>
            <List>
              {anesthesiaGuidance[frailtyScore <= 3 ? '1-3' : frailtyScore <= 6 ? '4-6' : '7-9'].considerations.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Syringe size={16} className="text-teal-600" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Button
              className="btn-primary w-full mt-4"
              onClick={() => setShowAnesthesiaGuide(false)}
            >
              Close
            </Button>
          </motion.div>
        </Modal>
      </Box>
    </motion.div>
  );
};

export default ClinicalFrailtyScale;